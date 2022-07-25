import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { GrGroup } from "react-icons/gr";
import PrimaryLabel from "../../atoms/PrimaryLabel";
import Labels from "../../molecules/Labels";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const ProjectIndex = (props) => {
  const { onClick, project, bg, currentUser } = props;
  const router = useRouter();
  return (
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
          src={project?.thumbnail}
          w="180px"
          h="140px"
          bg="purple.100"
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
              <Text mr="4px">{project?.members.length}</Text>
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
          <Box fontSize="14px">{project?.summary}</Box>
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
                project?.user.photoURL
                  ? project?.user.photoURL
                  : "/the_creators_Symbol.png"
              }
              bg="white"
              boxShadow="lg"
              w="32px"
              h="32px"
              mr="8px"
            />
            <Text fontWeight="bold">{project?.user.displayName}</Text>
          </Flex>
          {project?.members?.filter((member) => member.uid === currentUser?.uid)
            .length ? (
            <Button
              leftIcon={<GrGroup />}
              bg="teal.100"
              onClick={() => router.push(`/projects/${project?.id}/group`)}
            >
              グループへ
            </Button>
          ) : (
            <Button leftIcon={<GrGroup />} bg="teal.100">
              参加申請
            </Button>
          )}
        </Flex>
        <HStack spacing="16px" alignItems="center">
          <Flex alignItems="center">
            <Text fontSize="14px" mr="4px" alignSelf="center">
              参加申請
            </Text>
            <Text fontSize="16px" fontWeight="bold" alignSelf="center">
              5
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
  );
};

export default ProjectIndex;
