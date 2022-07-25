import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const PrimaryTag = (props) => {
  const { text, src } = props;
  return (
    <Flex direction="column" alignItems="center" mr="40px" cursor="pointer">
      <Center
        w="56px"
        h="56px"
        bg="white"
        boxShadow="md"
        borderRadius="full"
        mb="4px"
      >
        <Image src={src} w="32px" h="32px" borderRadius="full" alt="" />
        {/* <Box w="24px" h="24px" bg="gray.300" borderRadius="full" /> */}
      </Center>
      <Text fontSize="14px">{text}</Text>
    </Flex>
  );
};

export default PrimaryTag;
