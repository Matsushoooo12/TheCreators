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
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { db, storage } from "../../../firebase/config";

const HistoryModal = (props) => {
  const { isOpen, onClose, id, user } = props;

  const [historyCategory, setHistoryCategory] = React.useState("1");
  const [historyTitle, setHistoryTitle] = React.useState("");
  const [historySubTitle, setHistorySubTitle] = React.useState("");
  const [historyContent, setHistoryContent] = React.useState("");
  const [historyImage, setHistoryImage] = React.useState("");
  const [historyStartTime, setHistoryStartTime] = React.useState("");
  const [historyEndTime, setHistoryEndTime] = React.useState("");
  const [historyImagePreview, setHistoryImagePreview] = React.useState("");
  const historyImagePreviewRef = React.useRef(null);

  const onClickHistoryImagePreview = () => {
    if (historyImagePreviewRef.current) {
      historyImagePreviewRef.current.click();
    }
  };

  const onChangeHistoryImageHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setHistoryImagePreview(window.URL.createObjectURL(file));
      setHistoryImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    const uploadHistoryImage = uploadBytesResumable(
      ref(storage, `history/${historyImage.name}`),
      historyImage
    );
    uploadHistoryImage.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `history/${historyImage.name}`)).then(
          async (url) => {
            try {
              if (user?.history) {
                await updateDoc(userRef, {
                  history: [
                    ...user.history,
                    {
                      category: historyCategory,
                      title: historyTitle,
                      subTitle: historySubTitle,
                      content: historyContent,
                      image: url,
                      startTime: historyStartTime,
                      endTime: historyEndTime,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              } else {
                await updateDoc(userRef, {
                  history: [
                    {
                      category: historyCategory,
                      title: historyTitle,
                      subTitle: historySubTitle,
                      content: historyContent,
                      image: url,
                      startTime: historyStartTime,
                      endTime: historyEndTime,
                    },
                  ],
                }).then(() => {
                  onClose();
                });
              }
            } catch (e) {
              console.log(e);
            }
            setHistoryCategory("1");
            setHistoryTitle("");
            setHistorySubTitle("");
            setHistoryContent("");
            setHistoryStartTime("");
            setHistoryEndTime("");
            setHistoryImage("");
            setHistoryImagePreview("");
          }
        );
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
            経歴追加
          </Flex>
          <InputGroup as="form" onSubmit={handleHistorySubmit}>
            <Flex direction="column" w="100%">
              <RadioGroup
                onChange={setHistoryCategory}
                value={historyCategory}
                mb="16px"
              >
                <Stack direction="row" fontWeight="bold">
                  <Radio value="1">職歴</Radio>
                  <Radio value="2">学歴</Radio>
                </Stack>
              </RadioGroup>
              {historyCategory === "1" ? (
                <>
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      会社名
                    </Text>
                    <Input
                      type="text"
                      value={historyTitle}
                      onChange={(e) => setHistoryTitle(e.target.value)}
                      fontSize="24px"
                      fontWeight="bold"
                      placeholder="デジタルハリウッド株式会社"
                    />
                  </Flex>
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      部署 / 役職
                    </Text>
                    <Input
                      type="text"
                      value={historySubTitle}
                      onChange={(e) => setHistorySubTitle(e.target.value)}
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="プロダクト部 / フロントエンドエンジニア"
                    />
                  </Flex>
                </>
              ) : (
                <>
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      学校名
                    </Text>
                    <Input
                      type="text"
                      value={historyTitle}
                      onChange={(e) => setHistoryTitle(e.target.value)}
                      fontSize="24px"
                      fontWeight="bold"
                      placeholder="デジタルハリウッド大学"
                    />
                  </Flex>
                  <Flex direction="column" mb="16px">
                    <Text fontWeight="bold" mb="8px">
                      学部名 / 学科名
                    </Text>
                    <Input
                      type="text"
                      value={historySubTitle}
                      onChange={(e) => setHistorySubTitle(e.target.value)}
                      fontSize="16px"
                      fontWeight="bold"
                      placeholder="デジタルコミュニケーション学部 / デジタルコンテンツ学科"
                    />
                  </Flex>
                </>
              )}
              <Flex>
                <Flex direction="column" mb="16px" w="50%">
                  <Text fontWeight="bold" mb="8px">
                    いつから
                  </Text>
                  <Input
                    fontSize="16px"
                    fontWeight="bold"
                    placeholder="Select Date and Time"
                    type="date"
                    value={historyStartTime}
                    onChange={(e) => setHistoryStartTime(e.target.value)}
                  />
                </Flex>
                <Flex direction="column" mb="16px" w="50%">
                  <Text fontWeight="bold" mb="8px">
                    いつまで
                  </Text>
                  <Input
                    fontSize="16px"
                    fontWeight="bold"
                    placeholder="Select Date and Time"
                    type="date"
                    value={historyEndTime}
                    onChange={(e) => setHistoryEndTime(e.target.value)}
                  />
                </Flex>
              </Flex>
              <Flex direction="column" mb="16px" w="100%">
                <Text fontWeight="bold" mb="8px">
                  内容
                </Text>
                <Textarea
                  resize="none"
                  fontSize="16px"
                  fontWeight="bold"
                  placeholder="あなたがここで目指したこと、役割だと思ったこと"
                  type="text"
                  value={historyContent}
                  onChange={(e) => setHistoryContent(e.target.value)}
                />
              </Flex>
              <Flex direction="column" mb="16px" w="100%">
                <Text fontWeight="bold" mb="8px">
                  画像
                </Text>
                {historyImagePreview ? (
                  <Image
                    objectFit="cover"
                    loading="lazy"
                    type="text"
                    borderRadius="xl"
                    h="140px"
                    w="200px"
                    src={historyImagePreview}
                    onClick={onClickHistoryImagePreview}
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
                    onClick={onClickHistoryImagePreview}
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
                  onChange={(e) => onChangeHistoryImageHandler(e)}
                  style={{ display: "none" }}
                  name="image"
                  id="image"
                  ref={historyImagePreviewRef}
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

export default HistoryModal;
