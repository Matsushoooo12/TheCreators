import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const IntroductionIndex = (props) => {
  const { currentUser, id, introductions, onOpen } = props;
  return (
    <Flex w="800px" flexWrap="wrap" justifyContent="flex-start">
      {currentUser?.uid !== id && (
        <>
          {!introductions && (
            <Flex alignSelf="flex-start">まだ経歴はありません</Flex>
          )}
        </>
      )}
      <Flex direction="column" w="100%">
        {currentUser?.uid === id && (
          <Flex py="20px" position="relative">
            <Flex w="100%" h="5px" bg="gray.300"></Flex>
            <Flex
              w="100%"
              justifyContent="center"
              position="absolute"
              top="6px"
            >
              <Text
                border="1px solid black"
                borderColor="gray.300"
                p="4px 16px"
                borderRadius="full"
                bg="white"
                onClick={onOpen}
                cursor="pointer"
                fontWeight="bold"
                _hover={{ bg: "gray.300" }}
              >
                新しい内容を追加
              </Text>
            </Flex>
          </Flex>
        )}
        {introductions?.map((introduction) => (
          <Flex
            key={Math.random()}
            direction="column"
            mb="48px"
            borderBottom="1px solid black"
            borderColor="gray.300"
          >
            <Heading fontSize="24px" mb="16px">
              {introduction.title}
            </Heading>
            <Text mb="16px" whiteSpace="pre-wrap" wordBreak="break-all">
              {introduction.content}
            </Text>
            {introduction.image && (
              <Image
                w="400px"
                h="250px"
                bg="gray.300"
                alt=""
                mb="16px"
                src={introduction.image}
                objectFit="cover"
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default IntroductionIndex;
