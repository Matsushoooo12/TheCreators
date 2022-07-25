import {
  Box,
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
  VStack,
} from "@chakra-ui/react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaFileUpload } from "react-icons/fa";
import { db, storage } from "../../../firebase/config";

const SkilModal = (props) => {
  const { isOpen, onClose, id, user } = props;
  const [skilLevel, setSkilLevel] = React.useState("1");
  const [skilTitle, setSkilTitle] = React.useState("");
  const [skilImage, setSkilImage] = React.useState("");
  const [skilImagePreview, setSkilImagePreview] = React.useState("");
  const skilImagePreviewRef = React.useRef(null);

  // skil suggestion
  const [tagSnapshot] = useCollection(collection(db, "tags"));
  const skils = tagSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("skils", skils);
  const [suggestions, setSuggestions] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);
  const [skilImageUrlText, setSkilImageUrlText] = React.useState("");

  const handleSkilTitleChange = (text) => {
    let matches = [];
    if (text.length > 1) {
      matches = skils.filter((skil) => {
        const regex = new RegExp(`${text}`, "gi");
        return skil.text.match(regex);
      });
    }
    setSuggestions(matches);
    setSkilTitle(text);
  };

  // skil
  const onClickSkilImagePreview = () => {
    if (skilImagePreviewRef.current) {
      skilImagePreviewRef.current.click();
    }
  };

  const onChangeSkilImageHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSkilImagePreview(window.URL.createObjectURL(file));
      setSkilImage(e.target.files[0]);
      e.target.value = "";
      setSkilImageUrlText("");
    }
  };

  const handleSkilSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", id);
    const uploadSkilImage = uploadBytesResumable(
      ref(storage, `skil/${skilImage.name}`),
      skilImage
    );
    uploadSkilImage.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `skil/${skilImage.name}`)).then(
          async (url) => {
            try {
              if (skilImageUrlText) {
                if (user?.skils) {
                  await updateDoc(userRef, {
                    skils: [
                      ...user.skils,
                      {
                        level: skilLevel,
                        title: skilTitle,
                        image: skilImageUrlText,
                      },
                    ],
                  }).then(() => {
                    onClose();
                  });
                } else {
                  await updateDoc(userRef, {
                    skils: [
                      {
                        level: skilLevel,
                        title: skilTitle,
                        image: skilImageUrlText,
                      },
                    ],
                  }).then(() => {
                    onClose();
                  });
                }
              } else {
                if (user?.skils) {
                  if (skilImage) {
                    await updateDoc(userRef, {
                      skils: [
                        ...user.skils,
                        {
                          level: skilLevel,
                          title: skilTitle,
                          image: url,
                        },
                      ],
                    }).then(() => {
                      onClose();
                    });
                  } else {
                    await updateDoc(userRef, {
                      skils: [
                        ...user.skils,
                        {
                          level: skilLevel,
                          title: skilTitle,
                        },
                      ],
                    }).then(() => {
                      onClose();
                    });
                  }
                } else {
                  if (skilImage) {
                    await updateDoc(userRef, {
                      skils: [
                        {
                          level: skilLevel,
                          title: skilTitle,
                          image: url,
                        },
                      ],
                    }).then(() => {
                      onClose();
                    });
                  } else {
                    await updateDoc(userRef, {
                      skils: [
                        {
                          level: skilLevel,
                          title: skilTitle,
                        },
                      ],
                    }).then(() => {
                      onClose();
                    });
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
            setSkilLevel("1");
            setSkilTitle("");
            setSkilImage("");
            setSkilImagePreview("");
            setSkilImageUrlText("");
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
            スキル追加
          </Flex>
          <InputGroup as="form" onSubmit={handleSkilSubmit}>
            <Flex direction="column" w="100%">
              <Flex direction="column" mb="16px">
                <Text fontWeight="bold" mb="8px">
                  スキル・ツール名
                </Text>
                <Flex direction="column" position="relative">
                  <Input
                    onFocus={() => setIsFocus(true)}
                    type="text"
                    value={skilTitle}
                    onChange={(e) => handleSkilTitleChange(e.target.value)}
                    fontSize="24px"
                    fontWeight="bold"
                    placeholder="例）Photoshop"
                  />
                  {isFocus && (
                    <Box
                      position="absolute"
                      top="40px"
                      left="0"
                      w="100%"
                      boxShadow="md"
                      bg="white"
                      mt="8px"
                      borderRadius="lg"
                      zIndex="30"
                    >
                      <Box h="100%" overflowY="scroll">
                        {suggestions?.map((suggestion) => (
                          <Text
                            cursor="pointer"
                            bg="white"
                            _hover={{ bg: "gray.100" }}
                            key={suggestion.id}
                            p="8px 8px"
                            color="24px"
                            onClick={async () => {
                              await setSkilTitle(suggestion.text);
                              await setSkilImagePreview(suggestion.image);
                              await setSkilImageUrlText(suggestion.image);
                              await setIsFocus(false);
                            }}
                          >
                            {suggestion.text}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Flex direction="column" mb="16px" w="100%">
                <Text fontWeight="bold" mb="8px">
                  ロゴ・アイコン画像
                </Text>
                {skilImagePreview ? (
                  <Image
                    objectFit="cover"
                    loading="lazy"
                    type="text"
                    borderRadius="xl"
                    h="140px"
                    w="200px"
                    src={skilImagePreview}
                    onClick={onClickSkilImagePreview}
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
                    onClick={onClickSkilImagePreview}
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
                  onChange={(e) => onChangeSkilImageHandler(e)}
                  style={{ display: "none" }}
                  name="image"
                  id="image"
                  ref={skilImagePreviewRef}
                />
              </Flex>
              <Flex direction="column" mb="16px">
                <Text fontWeight="bold" mb="8px">
                  自己評価
                </Text>
                <RadioGroup onChange={setSkilLevel} value={skilLevel} mb="16px">
                  <Stack direction="row" fontWeight="bold">
                    <Radio value="1">初心者</Radio>
                    <Radio value="2">中級者</Radio>
                    <Radio value="3">上級者</Radio>
                    <Radio value="4">達人</Radio>
                  </Stack>
                </RadioGroup>
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

export default SkilModal;
