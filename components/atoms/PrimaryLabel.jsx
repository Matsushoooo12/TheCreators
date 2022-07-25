import { Text } from "@chakra-ui/react";
import React from "react";

const PrimaryLabel = (props) => {
  const { text, bg, border, color } = props;
  return (
    <Text p="4px 8px" border={border} borderRadius="full" color={color} bg={bg}>
      {text}
    </Text>
  );
};

export default PrimaryLabel;
