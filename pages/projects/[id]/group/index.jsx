import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { BsFillPinFill } from "react-icons/bs";
import { GrGroup, GrSteps } from "react-icons/gr";
import { MdOutlineBookmarkBorder, MdOutlineStickyNote2 } from "react-icons/md";
import Labels from "../../../../components/molecules/Labels";
import DashboardItemContainer from "../../../../components/organisms/DashboardItemContainer";
import ProjectGroupCard from "../../../../components/organisms/projects/ProjectGroupCard";
import { db } from "../../../../firebase/config";

const Group = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = React.useState(true);
  const [project] = useDocumentData(doc(db, "projects", id));
  const [isMessageOpen, setIsMessageOpen] = React.useState(false);
  const omittedContent = (string) => {
    // 定数で宣言
    const MAX_LENGTH = 30;

    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {
      // substr(何文字目からスタートするか, 最大値);
      return string.substr(0, MAX_LENGTH) + "...";
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
  };
  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const fileQuery = query(
    collection(db, `projects/${id}/files`),
    orderBy("timestamp")
  );
  const [files] = useCollectionData(fileQuery);

  const pinnedFiles = files?.filter((file) =>
    project?.pinnedFileLinks?.includes(file.link)
  );

  const searchUrlImage = (url) => {
    if (url.indexOf("https://docs.google.com/document") != -1) {
      return "/google-docs.png";
    } else if (url.indexOf("https://docs.google.com/presentation") != -1) {
      return "/google-slides.png";
    }
  };

  const requestQuery = query(
    collection(db, `projects/${id}/requests`),
    orderBy("timestamp")
  );
  const [requests] = useCollectionData(requestQuery);

  console.log("requests", requests);
  console.log("project", project);
  return (
    <Flex
      h="100%"
      w="100%"
      overflowX="scroll"
      direction="column"
      alignItems="center"
      pb="80px"
      px="80px"
    >
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          position="absolute"
          top="76px"
          left="40px"
          p="8px"
          as={MdOutlineStickyNote2}
          cursor="pointer"
        />
      )}
      {/* ここに中身を記述 */}
      <ProjectGroupCard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={project}
      />
      <Flex
        flex={1}
        direction="column"
        w="800px"
        // bg="blue.100"
        transition="all 0.3s ease-in-out"
        mt={isOpen ? "200px" : "64px"}
      >
        {/* ここに中身を記述 */}
        {/* InfoCard */}
        <Flex
          justifyContent="center"
          w="100%"
          h="160px"
          bg="gray.100"
          mb="32px"
          py="32px"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRight="1px solid black"
            borderColor="gray.300"
            w="33%"
          >
            <Flex
              direction="column"
              cursor="pointer"
              onClick={() => router.push(`/projects/${id}/group/members`)}
            >
              <HStack spacing="8px" alignItems="center" justifyContent="center">
                <Icon fontSize="32px" as={GrGroup} />
                <Text fontSize="32px" fontWeight="bold">
                  {project?.members?.length ? project?.members?.length : 0}
                </Text>
              </HStack>
              <Text>メンバー数</Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="center" w="33%">
            <Flex direction="column" cursor="pointer">
              <HStack spacing="8px" alignItems="center" justifyContent="center">
                <Icon fontSize="32px" as={MdOutlineBookmarkBorder} />
                <Text fontSize="32px" fontWeight="bold">
                  {project?.likeUsers?.length ? project?.likeUsers?.length : 0}
                </Text>
              </HStack>
              <Text>ブックマーク数</Text>
            </Flex>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="33%"
            borderLeft="1px solid black"
            borderColor="gray.300"
          >
            <Flex direction="column" cursor="pointer">
              <HStack spacing="8px" alignItems="center" justifyContent="center">
                <Icon fontSize="32px" as={GrSteps} />
                <Text fontSize="32px" fontWeight="bold">
                  {project?.status}
                </Text>
              </HStack>
              <Text>プロジェクト状態</Text>
            </Flex>
          </Flex>
        </Flex>
        <DashboardItemContainer title="共有ファイル" mb="40px">
          <Flex mb="8px" color="gray.500" alignItems="center" cursor="pointer">
            <Icon as={BsFillPinFill} mr="8px" />
            <Text>Pinned file</Text>
          </Flex>
          <Flex flexWrap="wrap">
            {pinnedFiles?.length ? (
              <>
                {pinnedFiles?.map((file, i) => (
                  <Link
                    key={i}
                    textDecoration="none"
                    href={file.link}
                    target="_blank"
                    listStyleType="none"
                  >
                    <Flex
                      cursor="pointer"
                      w="240px"
                      h="80px"
                      p="24px"
                      bg="teal.500"
                      color="white"
                      boxShadow="md"
                      alignItems="center"
                      justifyContent="center"
                      mr="16px"
                      mb="16px"
                    >
                      <Image
                        src={searchUrlImage(file.link)}
                        mr="16px"
                        w="40px"
                        objectFit="cover"
                        alt=""
                      />
                      <Flex direction="column">
                        <Heading fontSize="16px">{file.title}</Heading>
                      </Flex>
                    </Flex>
                  </Link>
                ))}
              </>
            ) : (
              <Text>ピン留めされたファイルはありません</Text>
            )}
          </Flex>
        </DashboardItemContainer>
        <DashboardItemContainer title="最近の参加申請" mb="56px">
          {users?.filter((user) =>
            requests?.find((request) => request.uid === user.id)
          ).length ? (
            <>
              {users?.filter((user) =>
                requests?.find((request) => request.uid === user.id)
              ) &&
                users
                  ?.filter((user) =>
                    requests?.find((request) => request.uid === user.id)
                  )
                  .slice(0, 1)
                  .map((user) => (
                    <>
                      <HStack w="100%" spacing="16px" p="24px" boxShadow="md">
                        <Avatar
                          src={
                            user.photoURL
                              ? user.photoURL
                              : "/the_creators_Symbol.png"
                          }
                          w="64px"
                          h="64px"
                          alignSelf="flex-start"
                          bg="white"
                          boxShadow="md"
                        />
                        <Flex direction="column" flex={1}>
                          <Heading fontSize="24px" mb="8px">
                            {user.displayName}
                          </Heading>
                          <Labels roles={user.roles} tags={user.tags} />
                          <HStack spacing="16px" fontSize="12px" my="8px">
                            <Flex>
                              <Text mr="4px">マッチング数</Text>
                              <Text fontWeight="bold">5</Text>
                            </Flex>
                            <Flex>
                              <Text mr="4px">プロジェクト参加数</Text>
                              <Text fontWeight="bold">5</Text>
                            </Flex>
                          </HStack>
                          {isMessageOpen ? (
                            <>
                              <Text
                                mb="16px"
                                whiteSpace="pre-wrap"
                                wordBreak="break-all"
                              >
                                {
                                  requests?.find(
                                    (request) => request.uid === user.id
                                  ).text
                                }
                              </Text>
                              <Text
                                fontSize="12px"
                                cursor="pointer"
                                onClick={() => setIsMessageOpen(false)}
                              >
                                閉じる
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text
                                mb="16px"
                                whiteSpace="pre-wrap"
                                wordBreak="break-all"
                              >
                                {omittedContent(
                                  requests?.find(
                                    (request) => request.uid === user.id
                                  ).text
                                )}
                              </Text>
                              <Text
                                fontSize="12px"
                                cursor="pointer"
                                onClick={() => setIsMessageOpen(true)}
                              >
                                もっと見る
                              </Text>
                            </>
                          )}
                          <Text alignSelf="flex-end" fontSize="12px">
                            {dayjs(
                              requests?.find(
                                (request) => request.uid === user.id
                              ).date
                            ).format("MMM-DD HH:mm")}
                          </Text>
                        </Flex>
                        <VStack spacing="16px" w="160px" alignSelf="flex-start">
                          <Button w="100%">フォローする</Button>
                          <Button
                            w="100%"
                            onClick={() => handleAddMember(user)}
                          >
                            許可する
                          </Button>
                        </VStack>
                      </HStack>
                    </>
                  ))}
            </>
          ) : (
            <Text>まだ参加申請はありません。</Text>
          )}
        </DashboardItemContainer>
      </Flex>
    </Flex>
  );
};

export default Group;
