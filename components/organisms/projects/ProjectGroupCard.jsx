import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Labels from "../../molecules/Labels";

const ProjectGroupCard = (props) => {
  const { project, isOpen, setIsOpen } = props;
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Flex
        zIndex="5"
        w="100%"
        bg="white"
        boxShadow="md"
        position="absolute"
        top="0"
        left="0"
        direction="column"
        py="24px"
        alignItems="center"
        px="24px"
        display={isOpen ? "flex" : "none"}
      >
        <Flex direction="column">
          <Labels roles={project?.roles} tags={project?.tags} />
          <Heading fontSize="24px" my="16px">
            {project?.title}
          </Heading>
          <Flex alignItems="center">
            <Flex alignItems="center" mr="16px">
              <Avatar
                mr="16px"
                w="40px"
                h="40px"
                src={
                  project?.user.photoURL
                    ? project?.user.photoURL
                    : "/the_creators_Symbol.png"
                }
                bg="white"
                boxShadow="md"
              />
              <Text fontWeight="bold">{project?.user.displayName}</Text>
            </Flex>
            <Button onClick={() => router.push(`/projects/${id}`)} mr="16px">
              詳細
            </Button>
            <Button onClick={() => setIsOpen(false)}>閉じる</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ProjectGroupCard;
