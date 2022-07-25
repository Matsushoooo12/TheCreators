import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const QueryContainer = (props) => {
  const { children, step, title, width } = props;
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      p="24px"
    >
      <Flex direction="column" w={width}>
        <Text fontSize="24px" fontWeight="bold" color="gray.500" mb="8px">
          Step {step}
        </Text>
        <Heading fontSize="24px" mb="16px">
          {title}
        </Heading>
        {children}
      </Flex>
    </Flex>
  );
};

export default QueryContainer;
