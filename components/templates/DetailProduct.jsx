import {
  Avatar,
  Button,
  Divider,
  Flex,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { GrGroup } from "react-icons/gr";
import Labels from "../../components/molecules/Labels";
import { FiMapPin } from "react-icons/fi";
import { GiStairsGoal } from "react-icons/gi";
import { useScroll } from "../../hooks/useScroll";
import { useRouter } from "next/router";
import { AuthContext } from "../../pages/_app";
import ArticleItem from "../organisms/ArticleItem";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const DetailProduct = (props) => {
  const { project } = props;
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { summaryRef, memberRef, whatRef, whyRef, howRef, hopeRef, goalRef } =
    React.useContext(AuthContext);

  const [memberText, setMemberText] = React.useState("");
  const [memberHover, setMemberHover] = React.useState(0);

  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(memberText);

  const onMemberHover = (text, i) => {
    setMemberText(text);
    setMemberHover(i);
  };

  return (
    <>
      <Flex
        h="100%"
        w="100%"
        bg="gray.100"
        overflowX="scroll"
        direction="column"
        alignItems="center"
      >
        <Flex
          direction="column"
          w="800px"
          // bg="green.100"
          mx="40px"
          pt="40px"
          mb="80px"
          ref={summaryRef}
        >
          {/* <Image alt="" /> */}
          <Image
            src={project?.thumbnail}
            mb="16px"
            w="100%"
            h="280px"
            bg="gray.500"
            alt=""
            objectFit="cover"
          />
          <Labels roles={project?.roles} tags={project?.tags} />
          <Heading fontSize="32px" my="16px">
            {project?.title}
          </Heading>
          <Flex alignItems="center" mb="16px">
            <Flex
              alignItems="center"
              mr="16px"
              cursor="pointer"
              onClick={() => router.push(`/users/${project?.user.uid}`)}
            >
              <Avatar
                //   src="/the_creators_Symbol.png"
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
            <Button
              leftIcon={<GrGroup />}
              onClick={() => router.push(`/projects/${id}/group`)}
            >
              グループへ
            </Button>
          </Flex>
          <Text mb="16px">{project?.summary}</Text>
          <HStack spacing="16px">
            <Flex alignItems="center">
              <Icon mr="8px" as={FiMapPin} />
              <Text fontWeight="bold">東京</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon mr="8px" as={GiStairsGoal} />
              <Text fontWeight="bold">{project?.purpose}</Text>
            </Flex>
          </HStack>
          <Flex direction="column" ref={memberRef} pt="40px">
            <Flex mb="16px" alignItems="center">
              <Heading fontSize="24px" fontWeight="bold" mr="16px">
                メンバー {project?.members?.length}人
              </Heading>
              {project?.members?.length > 3 && (
                <Text fontSize="12px" cursor="pointer" onClick={onOpen}>
                  もっと見る
                </Text>
              )}
            </Flex>
            <Flex
              flexWrap="wrap"
              borderBottom="1px solid black"
              borderColor="gray.300"
              mb="16px"
            >
              {project?.members?.slice(0, 3).map((member, i) => (
                <Flex
                  key={member.uid}
                  direction="column"
                  alignItems="center"
                  mr="32px"
                  _hover={{
                    borderBottom: "5px solid black",
                    borderColor: "teal.500",
                  }}
                  borderBottom={memberHover === i && "5px solid black"}
                  borderColor={memberHover === i && "teal.500"}
                  pb="8px"
                  cursor="pointer"
                  onMouseOver={() => onMemberHover(member.text, i)}
                >
                  <Avatar
                    w="96px"
                    h="96px"
                    //   src="/the_creators_Symbol.png"
                    src={
                      member.photoURL
                        ? member.photoURL
                        : "/the_creators_Symbol.png"
                    }
                    bg="white"
                    boxShadow="lg"
                    mb="8px"
                  />
                  <Text
                    fontWeight="bold"
                    color={i === 0 ? "teal.500" : "black"}
                  >
                    {member.displayName}
                  </Text>
                  <Text fontSize="12px">{member.organization}</Text>
                </Flex>
              ))}
            </Flex>
            <Text>{memberText ? memberText : project?.members[0].text}</Text>
          </Flex>
          <Flex direction="column" ref={whatRef} pt="40px">
            <ArticleItem
              images={project?.what.images}
              title="実現したいもの"
              text={project?.what.text.replaceAll("\\n", "\n")}
            />
          </Flex>
          <Flex direction="column" pt="40px" ref={whyRef}>
            <ArticleItem
              images={project?.why?.images}
              title="なぜ作りたいのか"
              text={project?.why?.text.replaceAll("\\n", "\n")}
            />
          </Flex>
          <Flex direction="column" pt="40px" ref={howRef}>
            <ArticleItem
              images={project?.how?.images}
              title="どうやって実現するのか"
              text={project?.how?.text.replaceAll("\\n", "\n")}
            />
          </Flex>
          <Flex direction="column" pt="40px" ref={hopeRef}>
            <ArticleItem
              images={project?.hope?.images}
              title="協力して欲しい人"
              text={project?.hope?.text.replaceAll("\\n", "\n")}
            />
          </Flex>
          <Flex direction="column" pt="40px" ref={goalRef}>
            <ArticleItem
              images={project?.goal?.images}
              title="最終的な目標"
              text={project?.goal?.text.replaceAll("\\n", "\n")}
            />
          </Flex>
        </Flex>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.100">
          <ModalCloseButton />
          <ModalBody my="40px">
            <Flex mb="16px" fontWeight="bold" fontSize="24px">
              メンバー一覧
            </Flex>
            <VStack spacing="16px">
              {users
                ?.filter((user) =>
                  project?.members?.find((member) => member.uid === user.id)
                )
                .map((user) => (
                  <Flex
                    key={user.id}
                    alignSelf="flex-start"
                    alignItems="center"
                  >
                    <Avatar
                      w="32px"
                      h="32px"
                      mr="8px"
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "/the_creators_Symbol.png"
                      }
                      bg="white"
                      boxShadow="md"
                    />
                    <Text fontWeight="bold" mr="8px">
                      {user.displayName}
                    </Text>
                    <Labels roles={user.roles} tags={user.tags} />
                  </Flex>
                ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailProduct;
