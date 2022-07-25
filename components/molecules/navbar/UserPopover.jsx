import {
  Avatar,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../../../firebase/config";

const UserPopover = (props) => {
  const { isOpen, currentUser, onClick, url } = props;
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      router.push("/");
    });
  };

  console.log("currentUser", currentUser);
  return (
    <Tooltip
      label="Edit profile"
      display={isOpen ? "none" : "block"}
      placement="right"
    >
      <Popover placement="right">
        <PopoverTrigger>
          <Flex
            p="18px"
            w="100%"
            _hover={!url && { bg: "gray.100", cursor: "pointer" }}
            bg={url && "teal.100"}
          >
            <Avatar
              w="32px"
              h="32px"
              src={
                currentUser?.photoURL
                  ? currentUser?.photoURL
                  : "/the_creators_Symbol.png"
              }
              bg="white"
              boxShadow="lg"
            />
            <Text
              ml="16px"
              fontSize="20px"
              fontWeight="bold"
              display={isOpen ? "block" : "none"}
              minW="160px"
            >
              {currentUser?.displayName}
            </Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent w="200px" h="100%" bg="white">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Flex
              w="100%"
              h="100%"
              p="4px 8px"
              borderBottom="1px solid black"
              borderColor="gray.300"
              mb="8px"
            >
              <Text fontWeight="bold">{currentUser?.displayName}</Text>
            </Flex>
            <VStack
              spacing="4px"
              alignItems="flex-start"
              p="4px 8px"
              fontSize="14px"
            >
              <Text cursor="pointer" onClick={onClick}>
                プロフィール詳細
              </Text>
              <Text
                cursor="pointer"
                onClick={() =>
                  router.push(`/users/${currentUser?.uid}/new-works`)
                }
              >
                作品投稿
              </Text>
              <Text cursor="pointer">設定</Text>
              <Text cursor="pointer">ヘルプ</Text>
              <Text cursor="pointer" onClick={handleSignOut}>
                ログアウト
              </Text>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Tooltip>
  );
};

export default UserPopover;
