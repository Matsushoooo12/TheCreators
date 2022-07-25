import {
  Avatar,
  Button,
  Center,
  Flex,
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
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
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
  } = React.useContext(AuthContext);

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
      likeUsers: arrayUnion(user?.uid),
    });
  };

  const handleRemoveBookmark = async () => {
    const projectRef = await doc(db, "projects", id);
    await updateDoc(projectRef, {
      likeUsers: arrayRemove(user?.uid),
    });
  };

  const handleCreateLikeWorks = async () => {
    const worksRef = await doc(db, "works", id);
    await updateDoc(worksRef, {
      likeUsers: arrayUnion(user?.uid),
    });
  };

  const handleRemoveLikeWorks = async () => {
    const worksRef = await doc(db, "works", id);
    await updateDoc(worksRef, {
      likeUsers: arrayRemove(user.uid),
    });
  };

  // 募集期限までの日数
  const now = dayjs().format("YYYY-MM-DD");
  const deadline = dayjs(detailProject?.deadline).format("YYYY-MM-DD");
  const days = dayjs(deadline).diff(now, "day");

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
                  {project?.likeUsers?.includes(user?.uid) ? (
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
                    {detailProject?.members.length}人
                  </Text>
                  {detailProject?.members?.filter(
                    (member) => member.uid === user?.uid
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
                    <Button leftIcon={<GrGroup />} onClick={onOpen}>
                      参加申請
                    </Button>
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
                  <Textarea
                    resize="none"
                    fontSize="16px"
                    fontWeight="bold"
                    placeholder="テーマに沿って自分を表現してみましょう"
                    type="text"
                    h="100px"
                    mb="24px"
                  />
                  <Button w="100%">送信</Button>
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
                  {worksItem?.likeUsers?.includes(user?.uid) ? (
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
            <VStack spacing="16px" w="100%">
              {project?.roles?.map((role) => (
                <Button leftIcon={<MdMovie />} w="100%">
                  {role}
                </Button>
              ))}
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
                p="24px"
                direction="column"
                borderRadius="lg"
              >
                <Labels
                  roles={["エンジニア"]}
                  tags={[{ image: "", text: "Ruby on Rails" }]}
                />
                <Flex alignItems="center" mt="16px">
                  <Avatar src="" w="32px" h="32px" mr="8px" />
                  <Text fontWeight="bold">松本省吾</Text>
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
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
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
                  9
                </Text>
              </Flex>
              <Text>メンバー数</Text>
            </Flex>
            <Flex direction="column" mt="16px">
              <Text fontWeight="bold">内訳</Text>
              <UnorderedList>
                <ListItem>
                  <Flex>
                    <Text mr="8px">エンジニア</Text>
                    <Text fontWeight="bold">5人</Text>
                  </Flex>
                </ListItem>
                <ListItem>
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
                </ListItem>
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
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
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
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
            </Flex>
          </>
        )}
        {searchUrl(window.location.href) && (
          <>
            <Flex w="100%">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column" alignItems="center">
              <Flex direction="column" mt="20px" w="290px">
                <Heading fontSize="16px">分野</Heading>
                <Flex direction="column" fontSize="14px" mt="10px">
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>Web開発エンジニア</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>アプリ開発エンジニア</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>インフラエンジニア</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>UIデザイナー</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>イラストレーター</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>動画編集</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
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
                  >
                    <Text>シナリオライター</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>その他</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" mt="20px" w="290px">
                <Heading fontSize="16px">進行状態</Heading>
                <Flex direction="column" fontSize="14px" mt="10px">
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>未スタート</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>進行中</Text>
                    <Icon as={AiOutlinePlus} />
                  </Flex>
                  <Flex
                    cursor="pointer"
                    mb="6px"
                    _hover={{ bg: "gray.100" }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>完了</Text>
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
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
              <Flex
                direction="column"
                borderBottom="1px solid black"
                borderColor="gray.300"
                py="16px"
              >
                <Text mb="8px">
                  あああああああああああああああ あああああああああああああああ
                  あああああああああああああああ
                  <br />
                </Text>
                <Text fontSize="12px">{dayjs().format("MMM-DD HH:mm")}</Text>
              </Flex>
            </Flex>
          </>
        )}
        {userProjectsUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column">
              <Flex
                mb="8px"
                color="gray.500"
                alignItems="center"
                cursor="pointer"
              >
                <Icon as={BsFillPinFill} mr="8px" />
                <Text>Pinned file</Text>
              </Flex>
              <ProductCard
                key={pinnedProject?.id}
                width="250px"
                mr="0"
                mb="0"
                title={pinnedProject?.title}
                photoURL={pinnedProject?.user.photoURL}
                displayName={pinnedProject?.user.displayName}
                date={`~ ${dayjs(pinnedProject?.deadline).format(
                  "YYYY/MM/DD"
                )}`}
                onClick={() => router.push(`/projects/${pinnedProject?.id}`)}
                roles={pinnedProject?.roles.slice(0, 1)}
                tags={pinnedProject?.tags.slice(0, 1)}
                likeUsers={pinnedProject?.likeUsers}
                uid={pinnedProject?.user.uid}
              />
            </Flex>
          </>
        )}
        {userMatchingUrl() && (
          <>
            <Flex w="100%" mb="16px">
              <Image w="100%" objectFit="cover" src="/add-01.jpeg" alt="" />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold" mb="8px">
                承認待ち
              </Text>
              <Flex
                direction="column"
                bg="gray.100"
                borderBottom="1px solid black"
                borderColor="gray.300"
                p="24px"
              >
                <Labels
                  roles={["エンジニア"]}
                  tags={[{ image: "", text: "Ruby on Rails" }]}
                />
                <Flex my="8px">
                  <Avatar src="" w="24px" h="24px" mr="8px" />
                  <Text>松本省吾</Text>
                </Flex>
                <HStack spacing="16px" fontSize="12px">
                  <Flex>
                    <Text mr="4px">プロジェクト参加数</Text>
                    <Text>5</Text>
                  </Flex>
                  <Flex>
                    <Text mr="4px">マッチング数</Text>
                    <Text>5</Text>
                  </Flex>
                </HStack>
              </Flex>
              <Flex
                direction="column"
                bg="gray.100"
                borderBottom="1px solid black"
                borderColor="gray.300"
                p="24px"
              >
                <Labels
                  roles={["エンジニア"]}
                  tags={[{ image: "", text: "Ruby on Rails" }]}
                />
                <Flex my="8px">
                  <Avatar src="" w="24px" h="24px" mr="8px" />
                  <Text>松本省吾</Text>
                </Flex>
                <HStack spacing="16px" fontSize="12px">
                  <Flex>
                    <Text mr="4px">プロジェクト参加数</Text>
                    <Text>5</Text>
                  </Flex>
                  <Flex>
                    <Text mr="4px">マッチング数</Text>
                    <Text>5</Text>
                  </Flex>
                </HStack>
              </Flex>
              <Flex
                direction="column"
                bg="gray.100"
                borderBottom="1px solid black"
                borderColor="gray.300"
                p="24px"
              >
                <Labels
                  roles={["エンジニア"]}
                  tags={[{ image: "", text: "Ruby on Rails" }]}
                />
                <Flex my="8px">
                  <Avatar src="" w="24px" h="24px" mr="8px" />
                  <Text>松本省吾</Text>
                </Flex>
                <HStack spacing="16px" fontSize="12px">
                  <Flex>
                    <Text mr="4px">プロジェクト参加数</Text>
                    <Text>5</Text>
                  </Flex>
                  <Flex>
                    <Text mr="4px">マッチング数</Text>
                    <Text>5</Text>
                  </Flex>
                </HStack>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default RightSidebar;
