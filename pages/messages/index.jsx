import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Messages = () => {
  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <VStack
        spacing="8px"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading>Direct Messages</Heading>
        <Text>連絡を取りたい人を選んでください</Text>
      </VStack>
    </Flex>
  );
};

export default Messages;
