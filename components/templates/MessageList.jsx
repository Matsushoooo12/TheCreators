import { Avatar, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { AuthContext } from "../../pages/_app";
import React from "react";
import dayjs from "dayjs";

const MessageListBar = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = React.useContext(AuthContext);
  const [roomsSnapshot] = useCollection(collection(db, "rooms"));
  const rooms = roomsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const q = query(collection(db, `rooms/${id}/messages`));
  const [messages] = useCollectionData(q);

  console.log("ooo", messages);

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
      ?.filter((room) =>
        room.users?.find((user) => user.uid === currentUser?.uid)
      )
      .map((room) => (
        <Flex
          key={room.id}
          h="100%"
          borderBottom="1px solid black"
          borderColor="gray.100"
          onClick={() => router.push(`/messages/${room.id}`)}
          cursor="pointer"
          alignItems="center"
          py="16px"
          px="32px"
          _first={{ borderTop: "1px solid black", borderColor: "gray.100" }}
          _hover={room.id !== id && { backgroundColor: "gray.100" }}
          justifyContent="center"
          bg={room.id === id ? "gray.300" : "white"}
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
            <Flex direction="column">
              <Text mb="8px" fontWeight="bold">
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
              <Text fontSize="12px">
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
        {roomList()}
      </Flex>
    </Flex>
  );
};

export default MessageListBar;
