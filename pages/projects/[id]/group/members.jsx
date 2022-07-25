import {
  Avatar,
  Button,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Labels from "../../../../components/molecules/Labels";
import ProjectGroupCard from "../../../../components/organisms/projects/ProjectGroupCard";
import { db } from "../../../../firebase/config";
import { FiCreditCard } from "react-icons/fi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { AuthContext } from "../../../_app";

const Members = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = React.useState(true);
  const { currentUser } = React.useContext(AuthContext);
  const [project] = useDocumentData(doc(db, "projects", id));
  console.log("project", project);

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
      {/* ここに中身を記述 */}
      <ProjectGroupCard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={project}
      />
      <Flex
        flex={1}
        direction="column"
        w="800px"
        // bg="blue.100"
        transition="all 0.3s ease-in-out"
        mt={isOpen ? "200px" : "64px"}
      >
        <TableContainer bg="white">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Organization</Th>
                <Th>Role</Th>
                <Th>Tags</Th>
                <Th>Todo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {project?.members?.map((member, i) => (
                <Tr key={i}>
                  <Td>
                    <Flex alignItems="center">
                      <Avatar
                        bg="white"
                        boxShadow="md"
                        src={
                          member.photoURL
                            ? member.photoURL
                            : "/the_creators_Symbol.png"
                        }
                        w="32px"
                        h="32px"
                        mr="16px"
                      />
                      <Text
                        fontWeight="bold"
                        color={
                          member.uid === project?.user.uid
                            ? "teal.500"
                            : "black"
                        }
                      >
                        {member.displayName}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text>{member.organization}</Text>
                  </Td>
                  <Td>
                    <Text
                      display="inline-block"
                      bg="white"
                      borderRadius="full"
                      p="4px 8px"
                      border="1px solid black"
                    >
                      {member.role}
                    </Text>
                  </Td>
                  <Td>
                    {member.tags?.map((tag, i) => (
                      <Text
                        key={i}
                        display="inline-block"
                        bg="teal.500"
                        borderRadius="full"
                        p="4px 8px"
                        mr="8px"
                        color="white"
                      >
                        {tag}
                      </Text>
                    ))}
                  </Td>
                  <Td>
                    <Flex>
                      <Text>1</Text>
                      <Text>, 2</Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default Members;
