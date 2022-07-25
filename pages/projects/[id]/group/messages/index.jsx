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
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { AiOutlineGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import {
  BsFileEarmarkPlusFill,
  BsFillEmojiWinkFill,
  BsImage,
} from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { MdScheduleSend, MdSend } from "react-icons/md";
import Labels from "../../../../../components/molecules/Labels";
import { db } from "../../../../../firebase/config";
import { AuthContext } from "../../../../_app";

const GroupMessage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project] = useDocumentData(doc(db, "projects", id));
  const [input, setInput] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const q = query(
    collection(db, `projects/${id}/messages`),
    orderBy("timestamp")
  );
  const [messages] = useCollectionData(q);
  const scrollRef = React.useRef(null);
  const now = dayjs().format();
  const sendMessage = async (e) => {
    e.preventDefault();
    const projectRef = await doc(db, "projects", id);
    await addDoc(collection(db, `projects/${id}/messages`), {
      text: input,
      sender: {
        displayName: currentUser?.displayName || null,
        photoURL: currentUser?.photoURL || null,
        uid: currentUser?.uid || null,
      },
      date: now,
      timestamp: serverTimestamp(),
    });
    await updateDoc(projectRef, {
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
              <Heading>Group Messages</Heading>
              <Text>はじめてのメッセージを送ってみましょう。</Text>
            </Flex>
          </Center>
        )}
      </>
    );
  };
  return (
    <>
      <Flex direction="column" h="100vh" w="100%">
        <Flex
          // h="64px"
          w="100%"
          alignItems="center"
          p="24px"
          borderBottom="1px solid black"
          borderColor="gray.300"
          // onClick={() =>
          //   router.push(
          //     `/users/${
          //       room?.users?.find((user) => user.uid !== currentUser?.uid).uid
          //     }?tab=projects`
          //   )
          // }
          cursor="pointer"
          justifyContent="center"
        >
          <Flex direction="column" w="80%">
            <Labels roles={project?.roles} tags={project?.tags} />
            <Heading fontSize="24px" mt="8px">
              {project?.title}
            </Heading>
          </Flex>
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
                <IconButton
                  cursor="pointer"
                  as={BsFileEarmarkPlusFill}
                  p="8px"
                />
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
    </>
  );
};

export default GroupMessage;
