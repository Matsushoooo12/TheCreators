import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const ArticleItem = (props) => {
  const { title, text, images } = props;
  return (
    <>
      <Heading fontSize="24px" mb="16px" fontWeight="bold">
        {title}
      </Heading>
      {/* <Image alt="" /> */}
      <Flex mb="16px">
        {images?.map((image) => (
          <Image
            key={Math.random()}
            src={image}
            w="50%"
            h="250px"
            bg="gray.500"
            alt=""
          />
        ))}
      </Flex>
      <Text whiteSpace="pre-wrap" wordBreak="break-all">
        {text}
      </Text>
    </>
  );
};

export default ArticleItem;
