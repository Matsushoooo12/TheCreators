import { Avatar, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { GrGroup } from "react-icons/gr";
import { HiBookOpen } from "react-icons/hi";
import { db } from "../../../firebase/config";
import { AuthContext } from "../../../pages/_app";

const UserInfoCard = (props) => {
  const {
    displayName,
    photoURL,
    profileUrl,
    userWorksNumber,
    userJoinProjectsNumber,
    followers,
    follows,
    userAllProjects,
    currentUser,
  } = props;
  // const { currentUser } = React.useContext(AuthContext);
  // const [user] = useDocumentData(doc(db, "users", currentUser?.uid));
  // console.log("user", user);
  const router = useRouter();
  return (
    <Flex
      justifyContent="center"
      w="100%"
      h="160px"
      bg="gray.100"
      mb="32px"
      py="32px"
    >
      <HStack
        spacing="16px"
        alignItems="center"
        justifyContent="center"
        borderRight="1px solid black"
        borderColor="gray.300"
        w="33%"
      >
        <Avatar
          w="40px"
          h="40px"
          src={photoURL ? photoURL : "/the_creators_Symbol.png"}
          bg="white"
          onClick={profileUrl}
          cursor="pointer"
        />
        <Flex direction="column">
          <Text
            fontWeight="bold"
            cursor="pointer"
            fontSize="18px"
            onClick={profileUrl}
          >
            {displayName}
          </Text>
          <Flex
            alignItems="center"
            cursor="pointer"
            onClick={() =>
              router.push(`/users/${currentUser?.uid}/matching?tab=follow`)
            }
          >
            <Text fontSize="12px" mr="8px">
              フォロー数
            </Text>
            <Text fontWeight="bold">
              {follows?.length ? follows?.length : 0}
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            cursor="pointer"
            onClick={() =>
              router.push(`/users/${currentUser?.uid}/matching?tab=follower`)
            }
          >
            <Text fontSize="12px" mr="8px">
              フォロワー数
            </Text>
            <Text fontWeight="bold">
              {followers?.length ? followers?.length : 0}
            </Text>
          </Flex>
        </Flex>
      </HStack>
      <Flex alignItems="center" justifyContent="center" w="33%">
        <Flex
          direction="column"
          onClick={() =>
            router.push(`/users/${currentUser?.uid}/projects?tab=join`)
          }
          cursor="pointer"
        >
          <HStack spacing="8px" alignItems="center" justifyContent="center">
            <Icon fontSize="32px" as={GrGroup} />
            <Text fontSize="32px" fontWeight="bold">
              {userJoinProjectsNumber}
            </Text>
          </HStack>
          <Text>総プロジェクト参加数</Text>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        w="33%"
        borderLeft="1px solid black"
        borderColor="gray.300"
      >
        <Flex
          direction="column"
          onClick={() => router.push(`/users/${currentUser?.uid}?tab=works`)}
          cursor="pointer"
        >
          <HStack spacing="8px" alignItems="center" justifyContent="center">
            <Icon fontSize="32px" as={HiBookOpen} />
            <Text fontSize="32px" fontWeight="bold">
              {userWorksNumber ? userWorksNumber : 0}
            </Text>
          </HStack>
          <Text>総作品数</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserInfoCard;
