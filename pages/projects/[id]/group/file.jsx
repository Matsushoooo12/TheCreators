import { Flex, Heading, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { BsFillPinFill } from "react-icons/bs";
import { MdOutlineStickyNote2 } from "react-icons/md";
import ProjectGroupCard from "../../../../components/organisms/projects/ProjectGroupCard";
import { db } from "../../../../firebase/config";

const File = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = React.useState(true);
  const [project] = useDocumentData(doc(db, "projects", id));
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
        <Flex mb="8px" color="gray.500" alignItems="center" cursor="pointer">
          <Icon as={BsFillPinFill} mr="8px" />
          <Text>Pinned file</Text>
        </Flex>
        <Flex flexWrap="wrap">
          <Flex
            onClick={() =>
              router.push("https://www.google.com/intl/ja_jp/docs/about/")
            }
            cursor="pointer"
            w="49%"
            h="160px"
            p="24px"
            bg="teal.500"
            color="white"
            boxShadow="md"
            alignItems="center"
            justifyContent="center"
            mr="16px"
            mb="16px"
            position="relative"
          >
            <Text
              p="4px 16px"
              bg="teal.800"
              color="white"
              position="absolute"
              top="0"
              left="0"
              fontWeight="bold"
              borderColor="teal.500"
            >
              すべて
            </Text>
            <Image
              src="/google-docs.png"
              mr="16px"
              w="80px"
              objectFit="cover"
              alt=""
            />
            <Flex direction="column">
              <Heading fontSize="24px">基本的なきまり</Heading>
            </Flex>
          </Flex>
          <Flex
            cursor="pointer"
            w="49%"
            h="160px"
            p="24px"
            bg="white"
            boxShadow="md"
            alignItems="center"
            justifyContent="center"
            mb="16px"
            position="relative"
          >
            <Text
              p="4px 16px"
              bg="teal.800"
              color="white"
              position="absolute"
              top="0"
              left="0"
              fontWeight="bold"
              borderColor="teal.500"
            >
              すべて
            </Text>
            <Image
              src="/google-slides.png"
              mr="16px"
              w="80px"
              objectFit="cover"
              alt=""
            />
            <Flex direction="column">
              <Heading fontSize="24px">プレゼン資料</Heading>
            </Flex>
          </Flex>
          <Flex
            cursor="pointer"
            w="49%"
            h="160px"
            p="24px"
            bg="white"
            boxShadow="md"
            alignItems="center"
            justifyContent="center"
            mr="16px"
            mb="16px"
            position="relative"
          >
            <Text
              p="4px 16px"
              bg="teal.800"
              color="white"
              position="absolute"
              top="0"
              left="0"
              fontWeight="bold"
              borderColor="teal.500"
            >
              デザイナー
            </Text>
            <Image
              src="/figma.png"
              mr="16px"
              w="80px"
              objectFit="cover"
              alt=""
            />
            <Flex direction="column">
              <Heading fontSize="24px">デザイン管理</Heading>
            </Flex>
          </Flex>
          <Flex
            cursor="pointer"
            w="49%"
            h="160px"
            p="24px"
            bg="white"
            boxShadow="md"
            alignItems="center"
            justifyContent="center"
            mb="16px"
            position="relative"
          >
            <Text
              p="4px 16px"
              bg="teal.800"
              color="white"
              position="absolute"
              top="0"
              left="0"
              fontWeight="bold"
              borderColor="teal.500"
            >
              エンジニア
            </Text>
            <Image
              src="/Jira.png"
              mr="16px"
              w="80px"
              objectFit="cover"
              alt=""
            />
            <Flex direction="column">
              <Heading fontSize="24px">エンジニアタスク管理</Heading>
            </Flex>
          </Flex>
          <Flex
            cursor="pointer"
            w="49%"
            h="160px"
            p="24px"
            bg="white"
            boxShadow="md"
            alignItems="center"
            justifyContent="center"
            mr="16px"
            mb="16px"
            position="relative"
          >
            <Text
              p="4px 16px"
              bg="teal.800"
              color="white"
              position="absolute"
              top="0"
              left="0"
              fontWeight="bold"
              borderColor="teal.500"
            >
              すべて
            </Text>
            <Image
              src="/google-drive.png"
              mr="16px"
              w="80px"
              objectFit="cover"
              alt=""
            />
            <Flex direction="column">
              <Heading fontSize="24px">ファイル管理</Heading>
            </Flex>
          </Flex>
          <Flex
            cursor="pointer"
            w="49%"
            h="160px"
            p="24px"
            bg="gray.100"
            // boxShadow="md"
            border="1px dashed black"
            alignItems="center"
            justifyContent="center"
            mb="16px"
          ></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default File;
