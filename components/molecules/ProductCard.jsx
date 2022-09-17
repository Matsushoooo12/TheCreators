import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { MdDateRange } from "react-icons/md";
import Labels from "./Labels";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { useRouter } from "next/router";

const ProductCard = (props) => {
  const {
    title,
    photoURL,
    displayName,
    date,
    mr,
    mb,
    width,
    onClick,
    likeUsers,
    tags,
    roles,
    uid,
    thumbnail,
  } = props;
  const router = useRouter();
  return (
    <VStack
      bg="gray.100"
      cursor="pointer"
      w={width}
      h="250px"
      direction="column"
      p="8px 8px 24px"
      alignItems="flex-start"
      borderRadius="lg"
      mr={mr}
      mb={mb}
    >
      {/* image */}
      <Box
        // bg="green.100"
        w="100%"
        h="96px"
        borderTopRadius="lg"
        position="relative"
      >
        <Flex
          position="absolute"
          zIndex="10"
          top="8px"
          right="8px"
          alignItems="center"
        >
          <Icon color="teal.500" fontSize="16px" as={MdOutlineBookmarkBorder} />
          <Text color="teal.500" fontSize="16px" fontWeight="bold">
            {likeUsers?.length ? likeUsers.length : 0}
          </Text>
        </Flex>
        <Image
          position="absolute"
          left="0"
          top="0"
          w="100%"
          h="100%"
          src={thumbnail}
          alt=""
          zIndex="5"
          objectFit="cover"
        />
      </Box>
      <Labels tags={tags?.slice(0, 1)} roles={roles?.slice(0, 1)} />
      <Heading fontSize="16px" onClick={onClick}>
        {title}
      </Heading>
      <Flex
        alignItems="center"
        mb="16px"
        onClick={() => router.push(`/users/${uid}`)}
      >
        <Avatar
          src={photoURL ? photoURL : "/the_creators_Symbol.png"}
          bg="white"
          boxShadow="lg"
          w="16px"
          h="16px"
          mr="8px"
        />
        <Text fontSize="12px">{displayName}</Text>
      </Flex>
      <HStack>
        <Flex alignItems="center">
          <Icon as={MdDateRange} mr="8px" />
          <Text fontSize="12px" fontWeight="bold">
            {date}
          </Text>
        </Flex>
      </HStack>
    </VStack>
  );
};

export default ProductCard;
