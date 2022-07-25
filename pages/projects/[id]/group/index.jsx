import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
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
        <DashboardItemContainer title="共有ファイル" mb="56px">
          <Flex mb="8px" color="gray.500" alignItems="center" cursor="pointer">
            <Icon as={BsFillPinFill} mr="8px" />
            <Text>Pinned file</Text>
          </Flex>
          <Flex flexWrap="wrap">
            <Flex
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
              w="49%"
              h="160px"
              p="24px"
              bg="teal.500"
              color="white"
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
                デザイン
              </Text>
              <Image
                src="/figma.png"
                mr="16px"
                w="80px"
                objectFit="cover"
                alt=""
              />
              <Flex direction="column">
                <Heading fontSize="24px">デザイン</Heading>
              </Flex>
            </Flex>
          </Flex>
        </DashboardItemContainer>
        <DashboardItemContainer title="自分のTodo" mb="56px">
          <HStack spacing="24px">
            <Flex
              bg="white"
              boxShadow="md"
              cursor="pointer"
              width="250px"
              mr="0"
              mb="0"
              h="100%"
              p="24px"
              alignItems="flex-start"
              borderRadius="lg"
              direction="column"
            >
              <HStack spacing="8px" mb="8px">
                <Text
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  //   border="1px solid black"
                  bg="blue.600"
                  color="white"
                >
                  構想段階
                </Text>
                <Text
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  border="1px solid black"
                  bg="white"
                >
                  エンジニア
                </Text>
              </HStack>
              <Heading fontSize="16px" mb="8px">
                テストテストテストテスト
              </Heading>
              <Flex mb="8px">
                <Avatar src="" w="24px" h="24px" mr="8px" />
                <Text>松本省吾</Text>
              </Flex>
              <Text fontSize="12px">
                {dayjs("2022-11-03").format("MMM-DD HH:mm")}
              </Text>
            </Flex>
            <Flex
              bg="white"
              boxShadow="md"
              cursor="pointer"
              width="250px"
              mr="0"
              mb="0"
              h="100%"
              p="24px"
              alignItems="flex-start"
              borderRadius="lg"
              direction="column"
            >
              <HStack spacing="8px" mb="8px">
                <Text
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  //   border="1px solid black"
                  bg="blue.600"
                  color="white"
                >
                  構想段階
                </Text>
                <Text
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  border="1px solid black"
                  bg="white"
                >
                  エンジニア
                </Text>
              </HStack>
              <Heading fontSize="16px" mb="8px">
                テストテストテストテスト
              </Heading>
              <Flex mb="8px">
                <Avatar src="" w="24px" h="24px" mr="8px" />
                <Text>松本省吾</Text>
              </Flex>
              <Text fontSize="12px">
                {dayjs("2022-11-03").format("MMM-DD HH:mm")}
              </Text>
            </Flex>
            <Flex
              bg="white"
              boxShadow="md"
              cursor="pointer"
              width="250px"
              mr="0"
              mb="0"
              h="100%"
              p="24px"
              alignItems="flex-start"
              borderRadius="lg"
              direction="column"
            >
              <HStack spacing="8px" mb="8px">
                <Text
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  //   border="1px solid black"
                  bg="blue.600"
                  color="white"
                >
                  構想段階
                </Text>
                <Text
                  fontSize="12px"
                  p="4px 8px"
                  borderRadius="full"
                  border="1px solid black"
                  bg="white"
                >
                  エンジニア
                </Text>
              </HStack>
              <Heading fontSize="16px" mb="8px">
                テストテストテストテスト
              </Heading>
              <Flex mb="8px">
                <Avatar src="" w="24px" h="24px" mr="8px" />
                <Text>松本省吾</Text>
              </Flex>
              <Text fontSize="12px">
                {dayjs("2022-11-03").format("MMM-DD HH:mm")}
              </Text>
            </Flex>
          </HStack>
        </DashboardItemContainer>
        <DashboardItemContainer title="最近の参加申請" mb="56px">
          <Flex
            w="100%"
            h="100%"
            // bg="red.100"
            // borderBottom="1px solid black"
            justifyContent="center"
            p="24px"
            boxShadow="md"
          >
            <HStack w="100%" spacing="16px">
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
                  {dayjs("2022-07-23").format("MMM-DD HH:mm")}
                </Text>
              </Flex>
              <VStack spacing="16px" w="160px" alignSelf="flex-start">
                <Button w="100%">フォローする</Button>
                <Button w="100%">許可する</Button>
              </VStack>
            </HStack>
          </Flex>
        </DashboardItemContainer>
      </Flex>
    </Flex>
  );
};

export default Group;
