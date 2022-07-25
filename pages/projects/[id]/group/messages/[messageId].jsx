import React from "react";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase/config";
import { AuthContext } from "../../../../_app";
import {
  Avatar,
  Box,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  BsFileEarmarkPlusFill,
  BsFillEmojiWinkFill,
  BsImage,
} from "react-icons/bs";
import { AiOutlineGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { MdScheduleSend, MdSend } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
dayjs.extend(utc);
dayjs.extend(timezone);

const DetailMessaeges = () => {
  const router = useRouter();
  const { id } = router.query;
  const { messageId } = router.query;
  const [project] = useDocumentData(doc(db, "projects", id));
  const [room] = useDocumentData(doc(db, "rooms", messageId));
  const [input, setInput] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const q = query(
    collection(db, `rooms/${messageId}/messages`),
    orderBy("timestamp")
  );
  const [messages] = useCollectionData(q);
  const scrollRef = React.useRef(null);
  const now = dayjs().format();
  const sendMessage = async (e) => {
    e.preventDefault();
    const roomRef = await doc(db, "rooms", messageId);
    await addDoc(collection(db, `rooms/${messageId}/messages`), {
      text: input,
      sender: {
        displayName: currentUser?.displayName || null,
        photoURL: currentUser?.photoURL || null,
        uid: currentUser?.uid || null,
      },
      date: now,
      timestamp: serverTimestamp(),
    });
    await updateDoc(roomRef, {
      lastMessage: input,
      lastMessageDate: now,
    });
    setInput("");
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight + 16;
    }
  }, [messages]);

  const getMessages = () => {
    return (
      <>
        {messages?.length ? (
          <>
            {messages?.map((message) => (
              <Flex
                key={Math.random()}
                my={2}
                mr={message.sender.uid === currentUser?.uid && "32px"}
                ml={message.sender.uid !== currentUser?.uid && "32px"}
                alignSelf={
                  message.sender.uid === currentUser?.uid
                    ? "flex-end"
                    : "flex-start"
                }
                alignItems="center"
              >
                <Avatar
                  display={
                    message.sender.uid === currentUser?.uid ? "none" : "block"
                  }
                  src={
                    message.sender.photoURL
                      ? message.sender.photoURL
                      : "/the_creators_Symbol.png"
                  }
                  boxShadow="lg"
                  bg="white"
                  size="sm"
                  mr="16px"
                  cursor="pointer"
                />
                <Flex direction="column">
                  <Flex
                    direction="column"
                    bg={
                      message.sender.uid === currentUser?.uid
                        ? "red.100"
                        : "blue.100"
                    }
                    w="fit-content"
                    p="8px 16px"
                    borderRadius={
                      message.sender.uid === currentUser?.uid
                        ? "8px 8px 0 8px"
                        : "8px 8px 8px 0"
                    }
                  >
                    <Text whiteSpace="pre-wrap" wordBreak="break-all" mb="16px">
                      {message.text}
                    </Text>
                    <Text fontSize="12px" alignSelf="flex-end">
                      {dayjs(message.date).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </>
        ) : (
          <Center w="100%" h="100%">
            <Flex direction="column">
              <Heading>Direct Messages</Heading>
              <Text>はじめてのメッセージを送ってみましょう。</Text>
            </Flex>
          </Center>
        )}
      </>
    );
  };
  return (
    <Flex direction="column" h="100vh" w="100%">
      <Flex
        h="64px"
        w="100%"
        alignItems="center"
        px="24px"
        borderBottom="1px solid black"
        borderColor="gray.300"
        onClick={() =>
          router.push(
            `/users/${
              room?.users?.find((user) => user.uid !== currentUser?.uid).uid
            }?tab=projects`
          )
        }
        cursor="pointer"
      >
        <Avatar
          src={
            room?.users?.find((user) => user.uid !== currentUser?.uid).photoURL
              ? room?.users?.find((user) => user.uid !== currentUser?.uid)
                  .photoURL
              : "/the_creators_Symbol.png"
          }
          mr="16px"
          w="32px"
          h="32px"
          boxShadow="lg"
          bg="white"
        />
        <Heading fontSize="18px" mr="16px">
          {
            room?.users?.find((user) => user.uid !== currentUser?.uid)
              .displayName
          }
        </Heading>
        <Text
          fontSize="12px"
          borderRadius="full"
          border="1px solid black"
          p="4px 8px"
          mr="8px"
        >
          {room?.users?.find((user) => user.uid !== currentUser?.uid).role}
        </Text>
        {room?.users
          ?.find((user) => user.uid !== currentUser?.uid)
          .tags?.map((tag, i) => (
            <Text
              key={i}
              fontSize="12px"
              borderRadius="full"
              bg="teal.500"
              color="white"
              p="4px 8px"
              mr="8px"
            >
              {tag}
            </Text>
          ))}
      </Flex>
      <Flex
        flex={1}
        direction="column"
        w="100%"
        overflowX="scroll"
        pt="16px"
        pb="16px"
        className="scrollbar-off"
        ref={scrollRef}
      >
        {getMessages()}
      </Flex>
      <FormControl as="form">
        <Box
          spacing="16px"
          h="180px"
          w="100%"
          alignItems="center"
          px="40px"
          borderTop="1px solid black"
          borderColor="gray.300"
          pt="16px"
        >
          <Textarea
            bg="white"
            w="100%"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            resize="none"
            placeholder="Send message..."
            variant="unstyled"
          />
          <Flex justifyContent="space-between" mt="16px">
            <HStack spacing="16px">
              <IconButton cursor="pointer" as={BsImage} p="8px" />
              <IconButton cursor="pointer" as={AiOutlineGif} p="8px" />
              <IconButton cursor="pointer" as={BiPoll} p="8px" />
              <IconButton cursor="pointer" as={BsFillEmojiWinkFill} p="8px" />
              <IconButton cursor="pointer" as={MdScheduleSend} p="8px" />
              <IconButton cursor="pointer" as={FiMapPin} p="8px" />
            </HStack>
            <HStack spacing="8px">
              <IconButton cursor="pointer" as={BsFileEarmarkPlusFill} p="8px" />
              <IconButton
                as={MdSend}
                p="8px"
                type="submit"
                onClick={(e) => sendMessage(e)}
                cursor="pointer"
                disabled={input === "" && true}
              />
            </HStack>
          </Flex>
        </Box>
      </FormControl>
    </Flex>
  );
};

export default DetailMessaeges;
