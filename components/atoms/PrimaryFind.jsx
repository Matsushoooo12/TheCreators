import { Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { IconType } from "react-icons";

const PrimaryFind = (props) => {
  const { title, icon, color, text, onClick } = props;
  return (
    <Flex
      w="30%"
      h="100%"
      p="16px"
      bg="white"
      boxShadow="md"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      onClick={onClick}
      cursor="pointer"
    >
      <VStack spacing="4px">
        <HStack alignItems="center">
          <Icon fontSize="24px" as={icon} />
          <Text fontSize="18px" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <Text fontSize="12px">登録数{text}以上</Text>
      </VStack>
    </Flex>
  );
};

export default PrimaryFind;
