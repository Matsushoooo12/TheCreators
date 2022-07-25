import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import PrimaryLabel from "../atoms/PrimaryLabel";

const Labels = (props) => {
  const { roles, tags } = props;
  return (
    <HStack spacing="8px" fontSize="12px" alignSelf="flex-start">
      {/* role */}
      {roles?.map((role) => (
        <PrimaryLabel
          key={Math.random()}
          text={role}
          bg="white"
          border="1px solid black"
          color="black"
        />
      ))}
      {tags?.map((tag) => (
        <PrimaryLabel
          key={Math.random()}
          text={tag.text}
          bg="teal.500"
          border="none"
          color="white"
        />
      ))}
    </HStack>
  );
};

export default Labels;
