import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { GrGroup } from "react-icons/gr";
import PrimaryLabel from "../../atoms/PrimaryLabel";
import Labels from "../../molecules/Labels";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const ProjectIndex = (props) => {
  const { onClick, project, bg, currentUser } = props;
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requestInput, setRequestInput] = React.useState("");

  const now = dayjs().format();

  const q = query(
    collection(db, `projects/${project?.id}/requests`),
    orderBy("timestamp")
  );
  const [requests] = useCollectionData(q);

  // request
  const sendRequest = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(db, `/projects/${project?.id}/requests`, currentUser?.uid),
      {
        text: requestInput,
        uid: currentUser?.uid,
        date: now,
        timestamp: serverTimestamp(),
      }
    ).then(() => onClose());
    setRequestInput("");
  };

  console.log("request", requestInput);
  console.log("project", project);
  return (
    <>
      <Flex
        w="100%"
        h="100%"
        p="32px 16px 32px"
        borderBottom="1px solid #ddd"
        cursor="pointer"
        bg={bg && bg}
        _hover={{ bg: "gray.100" }}
      >
        <Flex mr="40px">
          <Image
            src={project.thumbnail}
            w="180px"
            h="140px"
            // bg="purple.100"
            alt=""
            objectFit="cover"
          />
        </Flex>
        <Flex flex={1} h="100%" direction="column">
          <Flex
            h="32px"
            alignItems="center"
            mb="16px"
            justifyContent="space-between"
          >
            <Labels roles={project?.roles} tags={project?.tags} />
            <HStack spacing="16px">
              <Flex alignItems="center">
                <Text mr="4px">{project?.members?.length}</Text>
                <Icon fontSize="24px" as={RiShieldUserLine} />
              </Flex>
              <Flex alignItems="center">
                <Text mr="4px">
                  {project?.likeUsers?.length ? (
                    <>{project?.likeUsers?.length}</>
                  ) : (
                    0
                  )}
                </Text>
                <Icon fontSize="24px" as={MdOutlineBookmarkBorder} />
              </Flex>
            </HStack>
          </Flex>
          <Flex direction="column" mb="16px">
            <Heading fontSize="20px" mb="8px" onClick={onClick}>
              {project?.title}
            </Heading>
            <Box whiteSpace="pre-wrap" wordBreak="break-all" fontSize="14px">
              {project?.summary}
            </Box>
          </Flex>
          <Flex alignItems="center" mb="16px">
            <Flex
              alignItems="center"
              mr="16px"
              onClick={() =>
                router.push(`/users/${project?.user.uid}?tab=projects`)
              }
            >
              <Avatar
                src={
                  project?.user?.photoURL
                    ? project?.user?.photoURL
                    : "/the_creators_Symbol.png"
                }
                bg="white"
                boxShadow="lg"
                w="32px"
                h="32px"
                mr="8px"
              />
              <Text fontWeight="bold">{project?.user?.displayName}</Text>
            </Flex>
            {currentUser?.uid && (
              <>
                {project?.members?.filter(
                  (member) => member.uid === currentUser?.uid
                ).length ? (
                  <Button
                    leftIcon={<GrGroup />}
                    bg="teal.100"
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
              </>
            )}
          </Flex>
          <HStack spacing="16px" alignItems="center">
            <Flex alignItems="center">
              <Text fontSize="14px" mr="4px" alignSelf="center">
                参加申請
              </Text>
              <Text fontSize="16px" fontWeight="bold" alignSelf="center">
                {requests?.length ? requests?.length : 0}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="14px" mr="4px" alignSelf="center">
                募集締め切り
              </Text>
              <Text fontSize="16px" fontWeight="bold" alignSelf="center">
                ~ {dayjs(project?.deadline).format("YYYY/MM/DD")}
              </Text>
            </Flex>
          </HStack>
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
            <FormControl as="form" onSubmit={sendRequest}>
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
  );
};

export default ProjectIndex;
