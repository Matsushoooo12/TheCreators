import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { IoMdNotificationsOutline } from "react-icons/io";

const MenuItem = (props) => {
  const { isOpen, text, icon, toolTip, onClick, url } = props;
  return (
    <Tooltip
      label={toolTip}
      display={isOpen ? "none" : "block"}
      placement="right"
    >
      <Flex
        p="20px"
        _hover={!url && { bg: "gray.100", cursor: "pointer" }}
        w="100%"
        onClick={onClick}
        bg={url && "teal.100"}
      >
        <Icon as={icon} fontSize="28px" alignSelf="center" />
        <Text
          ml="16px"
          fontSize="20px"
          fontWeight="bold"
          display={isOpen ? "block" : "none"}
        >
          {text}
        </Text>
      </Flex>
    </Tooltip>
  );
};

export default MenuItem;
