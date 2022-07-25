import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const MainContainer = (props) => {
  const { children } = props;
  return (
    <Flex
      flex={1}
      h="100vh"
      bg="white"
      alignItems="center"
      direction="column"
      position="relative"
    >
      {children}
    </Flex>
  );
};

export default MainContainer;
