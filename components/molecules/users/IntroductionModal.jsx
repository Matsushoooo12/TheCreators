import {
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { db, storage } from "../../../firebase/config";

const IntroductionModal = (props) => {
  const { isOpen, onClose, id, user } = props;

  // introduction
  const [introductionTitle, setIntroductionTitle] = React.useState("");
  const [introductionContent, setIntroductionContent] = React.useState("");
  const [introductionImage, setIntroductionImage] = React.useState("");
  const [introductionImagePreview, setIntroductionImagePreview] =
    React.useState("");
  const introductionImagePreviewRef = React.useRef(null);

  const onClickIntroductionImagePreview = () => {
    if (introductionImagePreviewRef.current) {
      introductionImagePreviewRef.current.click();
    }
  };

  const onChangeIntroductionImageHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setIntroductionImagePreview(window.URL.createObjectURL(file));
      setIntroductionImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleIntroductionSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    const uploadIntroductionImage = uploadBytesResumable(
      ref(storage, `introduction/${introductionImage.name}`),
      introductionImage
    );
    uploadIntroductionImage.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(
          ref(storage, `introduction/${introductionImage.name}`)
        ).then(async (url) => {
          try {
            if (user?.introductions) {
              if (introductionImage) {
                await updateDoc(userRef, {
                  introductions: [
                    ...user.introductions,
                    {
                      title: introductionTitle,
                      content: introductionContent,
                      image: url,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              } else {
                await updateDoc(userRef, {
                  introductions: [
                    ...user.introductions,
                    {
                      title: introductionTitle,
                      content: introductionContent,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              }
            } else {
              if (introductionImage) {
                await updateDoc(userRef, {
                  introductions: [
                    {
                      title: introductionTitle,
                      content: introductionContent,
                      image: url,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              } else {
                await updateDoc(userRef, {
                  introductions: [
                    {
                      title: introductionTitle,
                      content: introductionContent,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              }
            }
          } catch (e) {
            console.log(e);
          }
          setIntroductionTitle("");
          setIntroductionContent("");
          setIntroductionImage("");
          setIntroductionImagePreview("");
        });
      }
    );
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.100">
        <ModalCloseButton />
        <ModalBody my="40px">
          <Flex mb="16px" fontWeight="bold" fontSize="24px">
            自己紹介追加
          </Flex>
          <InputGroup as="form" onSubmit={handleIntroductionSubmit}>
            <Flex direction="column" w="100%">
              <Flex direction="column" mb="16px">
                <Text fontWeight="bold" mb="8px">
                  タイトル
                </Text>
                <Input
                  type="text"
                  value={introductionTitle}
                  onChange={(e) => setIntroductionTitle(e.target.value)}
                  fontSize="24px"
                  fontWeight="bold"
                  placeholder="例）好きな食べ物"
                />
              </Flex>
              <Flex direction="column" mb="16px" w="100%">
                <Text fontWeight="bold" mb="8px">
                  内容
                </Text>
                <Textarea
                  resize="none"
                  fontSize="16px"
                  fontWeight="bold"
                  placeholder="テーマに沿って自分を表現してみましょう"
                  type="text"
                  value={introductionContent}
                  onChange={(e) => setIntroductionContent(e.target.value)}
                />
              </Flex>
              <Flex direction="column" mb="16px" w="100%">
                <Text fontWeight="bold" mb="8px">
                  画像
                </Text>
                {introductionImagePreview ? (
                  <Image
                    objectFit="cover"
                    loading="lazy"
                    type="text"
                    borderRadius="xl"
                    h="140px"
                    w="200px"
                    src={introductionImagePreview}
                    onClick={onClickIntroductionImagePreview}
                    bg="gray.100"
                    alt="project-thumbnail"
                    cursor="pointer"
                    border="1px solid teal"
                  />
                ) : (
                  <Center
                    cursor="pointer"
                    w="200px"
                    h="140px"
                    bg="gray.300"
                    borderRadius="lg"
                    onClick={onClickIntroductionImagePreview}
                  >
                    <Flex direction="column" alignItems="center">
                      <VStack spacing="16px">
                        <Icon as={FaFileUpload} fontSize="20px" />
                        <Text fontSize="16px" fontWeight="bold">
                          画像を追加
                        </Text>
                      </VStack>
                    </Flex>
                  </Center>
                )}
                <Input
                  type="file"
                  onChange={(e) => onChangeIntroductionImageHandler(e)}
                  style={{ display: "none" }}
                  name="image"
                  id="image"
                  ref={introductionImagePreviewRef}
                />
              </Flex>
              <Button bg="teal.300" mt="16px" type="submit">
                追加
              </Button>
            </Flex>
          </InputGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IntroductionModal;
