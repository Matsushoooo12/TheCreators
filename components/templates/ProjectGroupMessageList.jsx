import { Avatar, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { collection, doc, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { AuthContext } from "../../pages/_app";

const ProjectGroupMessageList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { messageId } = router.query;
  const { currentUser } = React.useContext(AuthContext);
  //   メンバー参加時にルーム作成
  const [roomsSnapshot] = useCollection(collection(db, "rooms"));
  const rooms = roomsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const q = query(collection(db, `projects/${id}/messages`));
  const [messages] = useCollectionData(q);

  const [project] = useDocumentData(doc(db, "projects", id));

  const members = project?.members;

  const roomListArray = () => {
    rooms?.filter((room) =>
      room.users?.find((user) =>
        project?.members?.find((member) => member.uid === user.uid)
      )
    );
  };

  console.log(
    "ooo",
    rooms?.filter((room) => room.projectTitle === project?.title)
  );

  const projectGroupMessageUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/messages`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const omittedMessage = (string) => {
    // 定数で宣言
    const MAX_LENGTH = 20;

    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {
      // substr(何文字目からスタートするか, 最大値);
      return string.substr(0, MAX_LENGTH) + "...";
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
  };

  rooms?.sort(function (x, y) {
    let firstDate = new Date(x.lastMessageDate),
      secondDate = new Date(y.lastMessageDate);
    if (firstDate > secondDate) return -1;
    if (firstDate < secondDate) return 1;
    return 0;
  });

  const roomList = () => {
    return rooms
      ?.filter((room) => room.projectTitle === project?.title)
      .map((room) => (
        <Flex
          key={room.id}
          h="100%"
          borderBottom="1px solid black"
          borderColor="gray.100"
          onClick={() =>
            router.push(`/projects/${id}/group/messages/${room.id}`)
          }
          cursor="pointer"
          alignItems="center"
          py="16px"
          px="32px"
          _first={{ borderTop: "1px solid black", borderColor: "gray.100" }}
          _hover={room.id !== id && { backgroundColor: "gray.100" }}
          justifyContent="center"
          bg={room.id === messageId ? "gray.300" : "white"}
        >
          <Flex alignItems="center" w="100%">
            <Avatar
              w="40px"
              h="40px"
              alignSelf="flex-start"
              borderRadius="full"
              src={
                room?.users?.find((user) => user.uid !== currentUser?.uid)
                  .photoURL
                  ? room?.users?.find((user) => user.uid !== currentUser?.uid)
                      .photoURL
                  : "/the_creators_Symbol.png"
              }
              alt=""
              mr="16px"
              boxShadow="lg"
              bg="white"
            />
            <Flex direction="column" alignItems="center">
              <Text alignSelf="flex-start" fontWeight="bold" mb="8px">
                {
                  room?.users?.find((user) => user.uid !== currentUser?.uid)
                    .displayName
                }
              </Text>
              <Text
                alignSelf="flex-start"
                mb="8px"
                fontSize="12px"
                p="4px 8px"
                borderRadius="full"
                border="1px solid black"
              >
                {
                  room?.users?.find((user) => user.uid !== currentUser?.uid)
                    .role
                }
              </Text>
              <Text mb="8px" fontSize="12px" fontWeight="bold">
                {room.lastMessage ? omittedMessage(room.lastMessage) : <></>}
              </Text>
              <Text fontSize="12px" alignSelf="flex-start">
                {dayjs(room.lastMessageDate).format("MMM-DD HH:mm")}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ));
  };
  return (
    <Flex
      w="280px"
      h="100vh"
      alignItems="center"
      direction="column"
      borderRight="1px solid black"
      borderColor="gray.300"
    >
      <Heading
        fontSize="24px"
        mt="24px"
        mb="24px"
        onClick={() => router.push("/messages")}
        cursor="pointer"
      >
        Messages
      </Heading>
      <Input placeholder="ユーザーを検索" mb="24px" w="80%" />
      <Flex
        direction="column"
        w="100%"
        overflowX="scroll"
        className="scrollbar-off"
      >
        <>
          <Flex
            h="100%"
            borderBottom="1px solid black"
            borderColor="gray.100"
            cursor="pointer"
            alignItems="center"
            py="16px"
            px="32px"
            _first={{ borderTop: "1px solid black", borderColor: "gray.100" }}
            _hover={{ bg: "gray.100" }}
            justifyContent="center"
            bg={
              projectGroupMessageUrl(window.location.href)
                ? "gray.300"
                : "white"
            }
            onClick={() => router.push(`/projects/${id}/group/messages`)}
          >
            <VStack spacing="8px">
              <Text fontWeight="bold" color="teal.500">
                {project?.title}
              </Text>
              <Text
                mb="8px"
                fontSize="12px"
                alignSelf="flex-start"
                fontWeight="bold"
              >
                {project?.lastMessage && omittedMessage(project?.lastMessage)}
              </Text>
              <Text fontSize="12px" alignSelf="flex-start">
                {dayjs(project?.lastMessageDate).format("MMM-DD HH:mm")}
              </Text>
            </VStack>
          </Flex>
          {roomList()}
        </>
      </Flex>
    </Flex>
  );
};

export default ProjectGroupMessageList;
