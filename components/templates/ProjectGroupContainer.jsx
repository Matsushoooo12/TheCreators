import { Flex, IconButton } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { db } from "../../firebase/config";
import ProjectGroupCard from "../organisms/projects/ProjectGroupCard";

const ProjectGroupContainer = (props) => {
  const { alignItems } = props;
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = React.useState(true);
  const [project] = useDocumentData(doc(db, "projects", id));
  return (
    <Flex
      h="100%"
      w="100%"
      overflowX="scroll"
      direction="column"
      alignItems="center"
      pb="80px"
      px="80px"
    >
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          position="absolute"
          top="76px"
          left="40px"
          p="8px"
          as={MdOutlineStickyNote2}
          cursor="pointer"
        />
      )}
      <ProjectGroupCard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={project}
      />
      <Flex
        flex={1}
        direction="column"
        w="800px"
        bg="blue.100"
        transition="all 0.3s ease-in-out"
        mt={isOpen ? "200px" : "64px"}
        alignItems={alignItems}
      >
        {/* ここに中身を記述 */}
      </Flex>
    </Flex>
  );
};

export default ProjectGroupContainer;
