import { Center, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

const PrimaryIcon = (props) => {
  const { icon, text } = props;
  return (
    <Flex
      direction="column"
      alignItems="center"
      mr="40px"
      cursor="pointer"
      mb="16px"
    >
      <Center
        w="56px"
        h="56px"
        bg="white"
        boxShadow="md"
        borderRadius="full"
        mb="4px"
      >
        <Icon fontSize="24px" as={icon} />
      </Center>
      <Text fontSize="14px">{text}</Text>
    </Flex>
  );
};

export default PrimaryIcon;
