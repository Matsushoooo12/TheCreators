import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { ImFire } from "react-icons/im";
import Labels from "../../molecules/Labels";
import { AiOutlineGithub, AiOutlineUserAdd } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io";
import { MdFacebook } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { FiMail } from "react-icons/fi";

const UserIndex = (props) => {
  const {
    user,
    borderBottom,
    width,
    onClick,
    cursor,
    currentUser,
    id,
    userJoinProjects,
    hover,
    profileUser,
  } = props;
  const router = useRouter();

  const [roomSnapshot] = useCollection(collection(db, "rooms"));
  const rooms = roomSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const roomExist = (uid) => {
    const idUserRoom = rooms?.filter((room) =>
      room.users.find((user) => user.uid === uid)
    );
    const room = idUserRoom.find((room) =>
      room.users.find((user) => user.uid === currentUser.uid)
    );
    return room?.id;
  };

  console.log("displayname", currentUser);
  const now = dayjs().format();

  const handleCreateDm = async (e) => {
    e.preventDefault();
    if (!roomExist(id)) {
      await addDoc(collection(db, "rooms"), {
        users: [
          {
            uid: currentUser.uid || null,
            displayName: currentUser?.displayName || null,
            photoURL: currentUser?.photoURL || null,
            role: profileUser?.roles[0],
            tags: profileUser?.tags?.map((tag) => {
              return tag.text;
            }),
          },
          {
            uid: id || null,
            displayName: user?.displayName || null,
            photoURL: user?.photoURL || null,
            role: user?.roles[0],
            tags: user?.tags?.map((tag) => {
              return tag.text;
            }),
          },
        ],
        lastMessageDate: now,
      }).then((res) => {
        router.push(`/messages/${res.id}`);
      });
    } else {
      router.push(`/messages/${roomExist(id)}`);
    }
  };

  const followsQuery = query(collection(db, `users/${id}/follows`));
  const [follows] = useCollectionData(followsQuery);
  const followersQuery = query(collection(db, `users/${id}/followers`));
  const [followers] = useCollectionData(followersQuery);

  console.log("bbb", follows);

  const handleFollow = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, `users/${id}/followers`, currentUser?.uid), {
      uid: currentUser?.uid,
      date: now,
    });
    await setDoc(doc(db, `users/${currentUser?.uid}/follows`, id), {
      uid: id,
      date: now,
    });
  };

  const handleUnFollow = async (e) => {
    e.preventDefault();
    await deleteDoc(doc(db, `users/${id}/followers`, currentUser?.uid));
    await deleteDoc(doc(db, `users/${currentUser?.uid}/follows`, id));
  };

  const matching = () => {
    if (follows?.length && followers?.length) {
      if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return "マッチング中";
      } else if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid !== currentUser?.uid)
      ) {
        return "マッチング申請許可";
      } else if (
        follows?.find((follow) => follow.uid !== currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return "マッチング申請中";
      } else {
        return "マッチング申請";
      }
    } else if (follows?.length && !followers?.length) {
      if (follows?.find((follow) => follow.uid === currentUser?.uid)) {
        return "マッチング申請許可";
      } else {
        return "マッチング申請";
      }
    } else if (!follows?.length && followers?.length) {
      if (followers?.find((follower) => follower.uid === currentUser?.uid)) {
        return "マッチング申請中";
      } else {
        return "マッチング申請";
      }
    }
  };

  const followingToggle = () => {
    if (follows?.length && followers?.length) {
      if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return false;
      } else if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid !== currentUser?.uid)
      ) {
        return true;
      } else if (
        follows?.find((follow) => follow.uid !== currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return false;
      } else {
        return true;
      }
    } else if (follows?.length && !followers?.length) {
      if (follows?.find((follow) => follow.uid === currentUser?.uid)) {
        return true;
      } else {
        return true;
      }
    } else if (!follows?.length && followers?.length) {
      if (followers?.find((follower) => follower.uid === currentUser?.uid)) {
        return false;
      } else {
        return true;
      }
    }
  };

  const dmButtonToggle = () => {
    if (follows?.length && followers?.length) {
      if (
        follows?.find((follow) => follow.uid === currentUser?.uid) &&
        followers?.find((follower) => follower.uid === currentUser?.uid)
      ) {
        return true;
      }
    }
  };

  return (
    <Flex
      w={width}
      h="100%"
      // mb="32px"
      // borderBottom="1px solid #ddd"
      borderBottom={borderBottom}
      p="32px 16px 32px"
      _hover={hover}
    >
      <Flex mr="24px">
        <Avatar
          w="60px"
          h="60px"
          src={user?.photoURL ? user?.photoURL : "/the_creators_Symbol.png"}
          bg="white"
          boxShadow="lg"
        />
      </Flex>
      <Flex direction="column">
        <Flex mb="16px">
          <Flex alignItems="center" mr="24px">
            <Flex alignItems="center" mr="32px">
              <Text
                fontSize="24px"
                fontWeight="bold"
                mr="8px"
                onClick={onClick}
                cursor={cursor}
              >
                {user?.displayName}
              </Text>
              <Icon fontSize="20px" color="red.500" as={ImFire} />
            </Flex>
            <Labels roles={user?.roles} tags={user?.tags} />
          </Flex>
        </Flex>
        <Text mb="16px">{user?.text}</Text>
        <Flex justifyContent="space-between">
          <VStack spacing="8px">
            <HStack spacing="16px" alignItems="center">
              <Flex alignItems="center">
                <Text fontSize="14px" mr="4px" alignSelf="center">
                  参加プロジェクト
                </Text>
                <Text fontSize="16px" fontWeight="bold" alignSelf="center">
                  {userJoinProjects?.length ? userJoinProjects?.length : 0}
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                onClick={() => router.push(`/users/${id}/matching?tab=follow`)}
                cursor="pointer"
              >
                <Text fontSize="14px" mr="4px" alignSelf="center">
                  フォロー数
                </Text>
                <Text fontSize="16px" fontWeight="bold" alignSelf="center">
                  {follows?.length ? follows?.length : 0}
                </Text>
              </Flex>
              <Flex
                alignItems="center"
                onClick={() =>
                  router.push(`/users/${id}/matching?tab=follower`)
                }
                cursor="pointer"
              >
                <Text fontSize="14px" mr="4px" alignSelf="center">
                  フォロワー数
                </Text>
                <Text fontSize="16px" fontWeight="bold" alignSelf="center">
                  {followers?.length ? followers?.length : 0}
                </Text>
              </Flex>
            </HStack>
            <HStack spacing="8px" alignSelf="flex-start">
              <Icon w="20px" h="20px" as={AiOutlineGithub} />
              <Icon w="20px" h="20px" as={AiOutlineTwitter} />
              <Icon w="20px" h="20px" as={MdFacebook} />
              <Icon w="20px" h="20px" as={IoEarth} />
            </HStack>
          </VStack>
          <HStack spacing="8px">
            {id !== currentUser?.uid && (
              <>
                <Button
                  // disabled={dmButtonToggle()}
                  onClick={followingToggle() ? handleFollow : handleUnFollow}
                  bg="gray.300"
                >
                  {matching()}
                </Button>
                {dmButtonToggle() && (
                  <IconButton p="8px" onClick={handleCreateDm} as={FiMail} />
                )}
              </>
            )}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserIndex;
