import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  UnorderedList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { VscRequestChanges } from "react-icons/vsc";
import { AuthContext } from "../../pages/_app";
import { RiShieldUserLine } from "react-icons/ri";
import { MdDateRange, MdMovie } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import ProductCard from "../molecules/ProductCard";
import { BsFillPinFill } from "react-icons/bs";
import { HiBookOpen } from "react-icons/hi";
import { IoEarth } from "react-icons/io5";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import dayjs from "dayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import Labels from "../molecules/Labels";
import { FiMail } from "react-icons/fi";

const RightSidebar = () => {
  const router = useRouter();
  const { id } = router.query;
  const [requestInput, setRequestInput] = React.useState("");
  const {
    topScroll,
    summaryScroll,
    memberScroll,
    whatScroll,
    whyScroll,
    howScroll,
    hopeScroll,
    goalScroll,
    currentScroll,
    currentUser,
    isAllRequest,
    setIsAllRequest,
  } = React.useContext(AuthContext);

  // 展示用
  const [exhibitionName, setExhibitionName] = React.useState("");
  const [exhibitionContent, setExhibitionContent] = React.useState("");

  const handleExhibition = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "exhibition"), {
        name: exhibitionName,
        content: exhibitionContent,
      }).then(() => {
        onClose();
        setExhibitionContent("");
        setExhibitionName("");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const followsQuery = query(
    collection(db, `users/${currentUser?.uid}/follows`)
  );
  const [follows] = useCollectionData(followsQuery);
  const followersQuery = query(
    collection(db, `users/${currentUser?.uid}/followers`)
  );
  const [followers] = useCollectionData(followersQuery);

  const q = query(
    collection(db, `projects/${id}/requests`),
    orderBy("timestamp")
  );
  const [requests] = useCollectionData(q);

  const [articlesSnapshot] = useCollection(collection(db, "articles"));
  const articles = articlesSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("article", articles);

  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const user = users?.find((user) => user.id === currentUser?.uid);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // project
  // const [project] = useDocumentData(doc(db, "projects", id));
  const [worksSnapshot] = useCollection(collection(db, "works"));
  const works = worksSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("works", works);

  const detailWorks = works?.find((work) => work.id === id);

  console.log("detailWork", detailWorks);

  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const project = projects?.find((project) => project.id === id);

  const pinnedProject = projects?.find(
    (project) => project.id === user?.pinnedProjectId
  );

  const worksItem = works?.find((work) => work.id === id);

  const userWorks = works?.filter((work) => work.user.uid === id);

  const detailProject = projects?.find((project) => project.id === id);

  const userJoinProjects = projects?.filter((project) =>
    project.members?.find((member) => member.uid === id)
  );

  const handleCreateBookmark = async () => {
    const projectRef = await doc(db, "projects", id);
    await updateDoc(projectRef, {
      likeUsers: arrayUnion(user?.id),
    });
  };

  const handleRemoveBookmark = async () => {
    const projectRef = await doc(db, "projects", id);
    await updateDoc(projectRef, {
      likeUsers: arrayRemove(user?.id),
    });
  };

  const handleCreateLikeWorks = async () => {
    const worksRef = await doc(db, "works", id);
    await updateDoc(worksRef, {
      likeUsers: arrayUnion(user?.id),
    });
  };

  const handleRemoveLikeWorks = async () => {
    const worksRef = await doc(db, "works", id);
    await updateDoc(worksRef, {
      likeUsers: arrayRemove(user?.id),
    });
  };

  console.log("eee", user);

  // 募集期限までの日数
  const now = dayjs().format();
  const deadline = dayjs(detailProject?.deadline).format("YYYY-MM-DD");
  const days = dayjs(deadline).diff(now, "day");

  console.log(
    "yyy",
    users?.filter(
      (user) =>
        user.id ===
          followers?.find((follower) => follower.uid === user.id)?.uid &&
        user.id === follows?.find((follow) => follow.uid === user.id)?.uid
    )?.length
  );

  // request
  const sendRequest = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, `/projects/${id}/requests`, currentUser?.uid), {
      text: requestInput,
      uid: currentUser?.uid,
      date: now,
      timestamp: serverTimestamp(),
    }).then(() => onClose());
    setRequestInput("");
  };

  const searchUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/search`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const detailProjectUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}`
    ) {
      return true;
    }
  };
  const detailUserUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=projects`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=skils`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=history`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=works`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=introduction`
    ) {
      return true;
    }
  };

  const detailWorksUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/works/${id}`
    ) {
      return true;
    }
  };

  const homeUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`
    ) {
      return true;
    }
  };

  const createProjectUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/new`
    ) {
      return true;
    }
  };

  const groupDashboardUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group`
    ) {
      return true;
    }
  };

  const groupNotificationUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/notification`
    ) {
      return true;
    }
  };

  const groupRequestUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/request`
    ) {
      return true;
    }
  };

  const groupFileUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/file`
    ) {
      return true;
    }
  };

  const groupMemberUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/members`
    ) {
      return true;
    }
  };

  const messageUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/messages`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupMessageUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/messages`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const userProjectsUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}/projects?tab=join`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}/projects?tab=create`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}/projects?tab=bookmark`
    ) {
      return true;
    }
  };

  const userMatchingUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}/matching?tab=matching`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}/matching?tab=follow`
    ) {
      return true;
    } else if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}/matching?tab=follower`
    ) {
      return true;
    }
  };

  const result = project?.members?.filter(
    (member, index, self) =>
      self.findIndex((e) => e.role === member.role) === index
  );

  console.log("result", result);

  console.log("vvv", isAllRequest);
  return (
    <Flex
      minW="350px"
      h="100vh"
      borderLeft="1px solid black"
      justifyContent="center"
      zIndex="50"
      bg="white"
      px="40px"
    >
      <Flex direction="column" w="100%">
        <InputGroup mt="50px" alignSelf="center" mb="16px">
          <Input borderRadius="xl" placeholder="キーワードで検索" />
          <InputRightElement>
            <Icon as={BiSearch} />
          </InputRightElement>
        </InputGroup>
        {detailProjectUrl() && (
          <>
            <Flex
              w="100%"
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              p="16px 16px 0"
              direction="column"
              mb="16px"
            >
              <Flex direction="column" mb="16px">
                <Flex alignItems="center">
                  <Icon as={MdOutlineBookmarkBorder} mr="8px" />
                  <Text>ブックマーク数</Text>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="space-between">
                  <Text fontSize="40px" fontWeight="bold">
                    {project?.likeUsers?.length ? (
                      <>{project?.likeUsers?.length}</>
                    ) : (
                      0
                    )}
                  </Text>
                  {project?.likeUsers?.includes(user?.id) ? (
                    <Button
                      leftIcon={<MdOutlineBookmarkBorder />}
                      onClick={handleRemoveBookmark}
                    >
                      削除する
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<MdOutlineBookmarkBorder />}
                      onClick={handleCreateBookmark}
                    >
                      追加する
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Flex direction="column" mb="16px">
                <Flex alignItems="center">
                  <Icon as={RiShieldUserLine} mr="8px" />
                  <Text>メンバー数</Text>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="space-between">
                  <Text fontSize="40px" fontWeight="bold">
                    {/* {project?.members.length}人 */}
                    {detailProject?.members?.length}人
                  </Text>
                  {detailProject?.members?.filter(
                    (member) => member.uid === currentUser?.uid
                  ).length ? (
                    <Button
                      leftIcon={<GrGroup />}
                      onClick={() =>
                        router.push(`/projects/${project?.id}/group`)
                      }
                    >
                      グループへ
                    </Button>
                  ) : (
                    <>
                      {requests?.find(
                        (request) => request.uid === currentUser?.uid
                      ) ? (
                        <Button leftIcon={<GrGroup />} disabled>
                          参加申請中
                        </Button>
                      ) : (
                        <Button leftIcon={<GrGroup />} onClick={onOpen}>
                          参加申請
                        </Button>
                      )}
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex direction="column" mb="16px">
                <Flex alignItems="center">
                  <Icon as={MdDateRange} mr="8px" />
                  <Text>募集終了まで</Text>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="space-between">
                  <Text fontSize="40px" fontWeight="bold">
                    {days}日
                  </Text>
                  <Text
                    p="8px 16px"
                    fontWeight="bold"
                    borderBottom="5px solid black"
                    borderColor="teal.500"
                  >
                    {detailProject?.status}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              w="100%"
              bg="gray.100"
              borderRadius="lg"
              boxShadow="lg"
              p="16px 16px 0"
              direction="column"
            >
              <Text fontSize="24px" fontWeight="bold" mb="8px">
                目次
              </Text>
              <Flex direction="column" mb="16px">
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={summaryScroll}
                >
                  概要
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={memberScroll}
                >
                  メンバー
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={whatScroll}
                >
                  実現したいもの
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={whyScroll}
                >
                  なぜ作りたいのか
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={howScroll}
                >
                  どうやって実現するのか
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={hopeScroll}
                >
                  協力して欲しい人
                </Text>
                <Text
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={goalScroll}
                >
                  最終的な目標
                </Text>
              </Flex>
            </Flex>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody my="40px">
                  <Flex mb="16px" fontWeight="bold" fontSize="24px">
                    参加希望メッセージを送る
                  </Flex>
                  <FormControl as="form" onSubmit={(e) => sendRequest(e)}>
                    <Textarea
                      value={requestInput}
                      onChange={(e) => setRequestInput(e.target.value)}
                      resize="none"
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="テーマに沿って自分を表現してみましょう"
                      type="text"
                      h="100px"
                      mb="24px"
                    />
                    <Button w="100%" type="submit">
                      送信
                    </Button>
                  </FormControl>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
        {detailUserUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex
              direction="column"
              w="100%"
              bg="gray.100"
              h="400px"
              px="32px"
              mb="16px"
            >
              <Flex
                direction="column"
                h="50%"
                w="100%"
                justifyContent="center"
                alignItems="center"
                borderBottom="1px solid black"
                borderColor="gray.300"
              >
                <HStack spacing="8px" alignItems="center">
                  <Icon fontSize="32px" as={GrGroup} />
                  <Text fontSize="32px" fontWeight="bold">
                    {userJoinProjects?.length ? userJoinProjects?.length : 0}
                  </Text>
                </HStack>
                <Text>総プロジェクト数</Text>
              </Flex>
              <Flex
                direction="column"
                h="50%"
                w="100%"
                justifyContent="center"
                alignItems="center"
              >
                <HStack spacing="8px" alignItems="center">
                  <Icon fontSize="32px" as={HiBookOpen} />
                  <Text fontSize="32px" fontWeight="bold">
                    {userWorks?.length ? userWorks?.length : 0}
                  </Text>
                </HStack>
                <Text>総作品数</Text>
              </Flex>
            </Flex>
          </>
        )}
        {detailWorksUrl() && (
          <>
            <Flex
              w="100%"
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              p="16px 16px 0"
              direction="column"
              mb="16px"
            >
              <Flex direction="column" mb="16px">
                <Flex alignItems="center">
                  <Icon as={MdOutlineBookmarkBorder} mr="8px" />
                  <Text>ブックマーク数</Text>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="space-between">
                  <Text fontSize="40px" fontWeight="bold">
                    {worksItem?.likeUsers?.length ? (
                      <>{worksItem?.likeUsers?.length}</>
                    ) : (
                      0
                    )}
                  </Text>
                  {worksItem?.likeUsers?.includes(user?.id) ? (
                    <Button
                      leftIcon={<MdOutlineBookmarkBorder />}
                      onClick={handleRemoveLikeWorks}
                    >
                      削除する
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<MdOutlineBookmarkBorder />}
                      onClick={handleCreateLikeWorks}
                    >
                      追加する
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Flex direction="column" mb="16px">
                <Flex alignItems="center" mb="8px">
                  <Icon as={RiShieldUserLine} mr="8px" />
                  <Text>リンク</Text>
                </Flex>
                <Button
                  leftIcon={<IoEarth />}
                  onClick={() => router.push(worksItem?.link)}
                >
                  {worksItem?.link}
                </Button>
              </Flex>
            </Flex>
            <Flex
              w="100%"
              bg="gray.100"
              borderRadius="lg"
              boxShadow="lg"
              p="16px 16px 0"
              direction="column"
            >
              <Text fontSize="24px" fontWeight="bold" mb="8px">
                目次
              </Text>
              <Flex direction="column" mb="16px">
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={topScroll}
                >
                  トップ
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={summaryScroll}
                >
                  作品内容
                </Text>
                <Text
                  pb="8px"
                  mb="8px"
                  borderBottom="1px solid black"
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={whyScroll}
                >
                  なぜ作ったのか
                </Text>
                <Text
                  borderColor="gray.300"
                  cursor="pointer"
                  onClick={currentScroll}
                >
                  現在の状況
                </Text>
              </Flex>
            </Flex>
          </>
        )}
        {groupRequestUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex
              w="100%"
              bg="gray.100"
              mb="24px"
              p="24px"
              alignItems="center"
              justifyContent="center"
            >
              <Flex direction="column">
                <Flex>
                  <Text fontSize="14px" mr="4px" alignSelf="center">
                    募集締め切り
                  </Text>
                </Flex>
                <Text fontSize="24px" fontWeight="bold" alignSelf="center">
                  ~ {dayjs(project?.deadline).format("YYYY/MM/DD")}
                </Text>
              </Flex>
            </Flex>
            <Heading fontSize="24px" mb="16px">
              必要な専門
            </Heading>
            <Labels roles={project?.roles} tags={[]} />
            <Heading fontSize="24px" my="16px">
              参加希望者の専門
            </Heading>
            <VStack spacing="16px" w="100%">
              <Button w="100%" onClick={() => setIsAllRequest("All")}>
                すべて
              </Button>
              {users
                ?.filter((user) =>
                  requests?.find((request) => request.uid === user.id)
                )
                .map((user) => (
                  <Button
                    key={user.id}
                    leftIcon={<MdMovie />}
                    w="100%"
                    onClick={() => setIsAllRequest(user.roles[0])}
                  >
                    {user.roles[0]}
                  </Button>
                ))}
              {/* <Button leftIcon={<MdMovie />} w="100%"></Button> */}
            </VStack>
          </>
        )}
        {groupFileUrl() && (
          <VStack spacing="16px" w="100%">
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex
              w="100%"
              p="24px"
              bg="blue.100"
              direction="column"
              alignItems="center"
              cursor="pointer"
              borderRadius="lg"
            >
              <Icon as={FiMail} w="40px" h="40px" mb="8px" />
              <Text fontWeight="bold" mb="4px">
                メンバーのメールアドレス一覧
              </Text>
              <Text fontSize="14px">各種サービスに使ってください</Text>
            </Flex>
            <Button w="100%">すべて</Button>
            <Button w="100%">デザイナー</Button>
            <Button w="100%">エンジニア</Button>
            <Button w="100%">ライター</Button>
          </VStack>
        )}
        {groupDashboardUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Button
              mb="16px"
              onClick={() => router.push(`/projects/${id}/new`)}
            >
              プロジェクトを完了する
            </Button>
            <Heading fontSize="24px" mb="16px">
              編集権限者
            </Heading>
            <VStack spacing="16px">
              <Flex
                w="100%"
                h="100%"
                bg="gray.100"
                p="16px"
                direction="column"
                borderRadius="lg"
                flexWrap="wrap"
              >
                <Labels
                  roles={
                    users?.find((user) => project?.user.uid === user.id)?.roles
                  }
                  tags={
                    users?.find((user) => project?.user.uid === user.id)?.tags
                  }
                />
                <Flex alignItems="center" mt="16px">
                  <Avatar
                    src={
                      users?.find((user) => project?.user.uid === user.id)
                        ?.photoURL
                        ? users?.find((user) => project?.user.uid === user.id)
                            ?.photoURL
                        : "/the_creators_Symbol.png"
                    }
                    w="32px"
                    h="32px"
                    mr="8px"
                    bg="white"
                    boxShadow="md"
                  />
                  <Text fontWeight="bold">
                    {
                      users?.find((user) => project?.user.uid === user.id)
                        ?.displayName
                    }
                  </Text>
                </Flex>
              </Flex>
            </VStack>
          </>
        )}
        {projectGroupMessageUrl(window.location.href) && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
        {groupMemberUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex
              w="100%"
              p="24px"
              bg="gray.100"
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Flex alignItems="center">
                <Icon mr="8px" fontSize="32px" as={GrGroup} />
                <Text fontSize="32px" fontWeight="bold">
                  {project?.members.length}
                </Text>
              </Flex>
              <Text>メンバー数</Text>
            </Flex>
            <Flex direction="column" mt="16px">
              <Text fontWeight="bold">内訳</Text>
              <UnorderedList>
                {result?.map((r, i) => (
                  <ListItem key={i}>
                    <Flex>
                      <Text mr="8px">{r.role}</Text>
                      <Text fontWeight="bold">
                        {
                          project?.members?.filter(
                            (member) => member.role === r.role
                          ).length
                        }
                        人
                      </Text>
                    </Flex>
                  </ListItem>
                ))}

                {/* <ListItem>
                  <Flex>
                    <Text mr="8px">デザイナー</Text>
                    <Text fontWeight="bold">2人</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex>
                    <Text mr="8px">プランナー</Text>
                    <Text fontWeight="bold">2人</Text>
                  </Flex>
                </ListItem> */}
              </UnorderedList>
            </Flex>
          </>
        )}
        {messageUrl(window.location.href) && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
        {groupNotificationUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
        {searchUrl(window.location.href) && (
          <>
            <Flex direction="column" alignItems="center">
              <Flex direction="column" mt="20px" w="290px">
                <Heading
                  fontSize="20px"
                  cursor="pointer"
                  mb="16px"
                  onClick={() => router.push("/search?tab=projects")}
                  color="teal.500"
                >
                  すべて
                </Heading>
                <Heading fontSize="16px">専門</Heading>
                <Flex direction="column" fontSize="14px" mt="10px">
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push("/search/specialty/エンジニア")}
                  >
                    <Text>エンジニア</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push("/search/specialty/デザイナー")}
                  >
                    <Text>デザイナー</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push("/search/specialty/ライター")}
                  >
                    <Text>ライター</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push("/search/specialty/動画編集者")}
                  >
                    <Text>動画編集者</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push("/search/specialty/プランター")}
                  >
                    <Text>プランナー</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() =>
                      router.push("/search/specialty/3DCGモデラー")
                    }
                  >
                    <Text>3DCGモデラー</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() =>
                      router.push("/search/specialty/アニメーター")
                    }
                  >
                    <Text>アニメーター</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" mt="20px" w="290px">
                <Heading fontSize="20px" cursor="pointer" mb="16px">
                  プロジェクト
                </Heading>
                <Heading fontSize="16px">進行状態</Heading>
                <Flex direction="column" fontSize="14px" mt="10px">
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() =>
                      router.push(`/search/projects/status/構想段階`)
                    }
                  >
                    <Text>構想段階</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push(`/search/projects/status/序盤`)}
                  >
                    <Text>序盤</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push(`/search/projects/status/中盤`)}
                  >
                    <Text>中盤</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => router.push(`/search/projects/status/終盤`)}
                  >
                    <Text>終盤</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" mt="20px" w="290px">
                <Heading fontSize="16px">募集状況</Heading>
                <Flex direction="column" fontSize="14px" mt="10px">
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>募集中</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>締め切り</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" mt="20px" w="290px">
                <Heading fontSize="16px">目的</Heading>
                <Flex direction="column" fontSize="14px" mt="10px">
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>ポートフォリオ</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>コンテスト</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>起業</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>新規事業</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>学習</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
        {homeUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
            <Button mt="40px" bg="teal.500" color="white" onClick={onOpen}>
              感想フォーム
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody my="40px">
                  <Flex mb="16px" fontWeight="bold" fontSize="24px">
                    感想を送る
                  </Flex>
                  <FormControl as="form" onSubmit={(e) => handleExhibition(e)}>
                    <Input
                      placeholder="お名前を入力して下さい"
                      value={exhibitionName}
                      onChange={(e) => setExhibitionName(e.target.value)}
                      mb="16px"
                    />
                    <Textarea
                      value={exhibitionContent}
                      onChange={(e) => setExhibitionContent(e.target.value)}
                      resize="none"
                      placeholder="感想を記入してください"
                      type="text"
                      h="100px"
                      mb="24px"
                    />
                    <Button w="100%" type="submit">
                      送信
                    </Button>
                  </FormControl>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
        {userProjectsUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
        {userMatchingUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
        {createProjectUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" w="290px" p="24px" bg="gray.100">
              <Text fontWeight="bold" mb="16px">
                The Creatorsのおすすめ記事
              </Text>
              {articles
                ?.filter((article) => article.roles.includes(user?.roles[0]))
                ?.slice(0, 3)
                .map((article) => (
                  <Flex
                    key={article.id}
                    direction="column"
                    borderBottom="1px solid black"
                    borderColor="gray.300"
                    py="16px"
                  >
                    <Text mb="8px">{article.title}</Text>
                    <Text fontSize="12px">
                      {dayjs(article.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default RightSidebar;
