import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const DashboardItemContainer = (props) => {
  const { title, mb, children } = props;
  return (
    <Flex direction="column" mb={mb}>
      <Text fontWeight="bold" fontSize="24px" mb="8px">
        {title}
      </Text>
      {children}
    </Flex>
  );
};

export default DashboardItemContainer;
