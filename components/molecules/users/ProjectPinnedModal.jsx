import {
  Button,
  Flex,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase/config";

const ProjectPinnedModal = (props) => {
  const { isOpen, onClose, userPinnedProject, userAllProjects, id } = props;

  const [projectId, setProjectId] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    try {
      await updateDoc(userRef, {
        pinnedProjectId: projectId,
      }).then(() => {
        onClose();
      });
    } catch (e) {
      console.log(e);
    }
    setProjectId("");
  };

  console.log("projectId", projectId);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.100">
        <ModalCloseButton />
        <ModalBody my="40px">
          <Flex mb="16px" fontWeight="bold" fontSize="24px">
            ピン止めするプロジェクトを選んでください。
          </Flex>
          <InputGroup as="form" onSubmit={handleSubmit}>
            <Flex direction="column" w="100%">
              <RadioGroup value={projectId} onChange={setProjectId}>
                <VStack spacing="16px">
                  <Radio alignSelf="flex-start" value="">
                    ピンを外す
                  </Radio>
                  {userAllProjects?.map((pinnedProject) => (
                    <Radio
                      alignSelf="flex-start"
                      key={pinnedProject.id}
                      value={pinnedProject.id}
                    >
                      {pinnedProject.title}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
              <Button bg="teal.300" mt="16px" type="submit">
                更新
              </Button>
            </Flex>
          </InputGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectPinnedModal;
