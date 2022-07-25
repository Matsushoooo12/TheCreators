import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { MdOutlineStickyNote2 } from "react-icons/md";
import Labels from "../../../../components/molecules/Labels";
import ProjectGroupCard from "../../../../components/organisms/projects/ProjectGroupCard";
import { db } from "../../../../firebase/config";

const Request = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = React.useState(true);
  const [project] = useDocumentData(doc(db, "projects", id));
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
        w="800px"
        transition="all 0.3s ease-in-out"
        mt={isOpen ? "200px" : "64px"}
        direction="column"
        alignItems="center"
      >
        <HStack w="100%" spacing="16px" p="24px" boxShadow="md">
          <Avatar src="" w="64px" h="64px" alignSelf="flex-start" />
          <Flex direction="column" flex={1}>
            <Heading fontSize="24px" mb="8px">
              松本省吾
            </Heading>
            <Labels
              roles={["エンジニア"]}
              tags={[
                { image: "", text: "Ruby on Rails" },
                { image: "", text: "Go" },
              ]}
            />
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
            <Text mb="16px">
              ああああああああああああああああああああああああああああああ
              あああああああああああああああああああああああああああああああああ
            </Text>
            <Text alignSelf="flex-end" fontSize="12px">
              {dayjs().format("MMM-DD HH:mm")}
            </Text>
          </Flex>
          <VStack spacing="16px" w="160px" alignSelf="flex-start">
            <Button w="100%">フォローする</Button>
            <Button w="100%">許可する</Button>
          </VStack>
        </HStack>
        <HStack w="100%" spacing="16px" p="24px" boxShadow="md">
          <Avatar src="" w="64px" h="64px" alignSelf="flex-start" />
          <Flex direction="column" flex={1}>
            <Heading fontSize="24px" mb="8px">
              松本省吾
            </Heading>
            <Labels
              roles={["エンジニア"]}
              tags={[
                { image: "", text: "Ruby on Rails" },
                { image: "", text: "Go" },
              ]}
            />
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
            <Text>
              ああああああああああああああああああああああああああああああ
              あああああああああああああああああああああああああああああああああ
            </Text>
            <Text alignSelf="flex-end" fontSize="12px">
              {dayjs().format("MMM-DD HH:mm")}
            </Text>
          </Flex>
          <VStack spacing="16px" w="160px" alignSelf="flex-start">
            <Button w="100%">フォローする</Button>
            <Button w="100%">許可する</Button>
          </VStack>
        </HStack>
        <HStack w="100%" spacing="16px" p="24px" boxShadow="md">
          <Avatar src="" w="64px" h="64px" alignSelf="flex-start" />
          <Flex direction="column" flex={1}>
            <Heading fontSize="24px" mb="8px">
              松本省吾
            </Heading>
            <Labels
              roles={["エンジニア"]}
              tags={[
                { image: "", text: "Ruby on Rails" },
                { image: "", text: "Go" },
              ]}
            />
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
            <Text>
              ああああああああああああああああああああああああああああああ
              あああああああああああああああああああああああああああああああああ
            </Text>
            <Text alignSelf="flex-end" fontSize="12px">
              {dayjs().format("MMM-DD HH:mm")}
            </Text>
          </Flex>
          <VStack spacing="16px" w="160px" alignSelf="flex-start">
            <Button w="100%">フォローする</Button>
            <Button w="100%">許可する</Button>
          </VStack>
        </HStack>
        <HStack w="100%" spacing="16px" p="24px" boxShadow="md">
          <Avatar src="" w="64px" h="64px" alignSelf="flex-start" />
          <Flex direction="column" flex={1}>
            <Heading fontSize="24px" mb="8px">
              松本省吾
            </Heading>
            <Labels
              roles={["エンジニア"]}
              tags={[
                { image: "", text: "Ruby on Rails" },
                { image: "", text: "Go" },
              ]}
            />
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
            <Text>
              ああああああああああああああああああああああああああああああ
              あああああああああああああああああああああああああああああああああ
            </Text>
            <Text alignSelf="flex-end" fontSize="12px">
              {dayjs().format("MMM-DD HH:mm")}
            </Text>
          </Flex>
          <VStack spacing="16px" w="160px" alignSelf="flex-start">
            <Button w="100%">フォローする</Button>
            <Button w="100%">許可する</Button>
          </VStack>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Request;
