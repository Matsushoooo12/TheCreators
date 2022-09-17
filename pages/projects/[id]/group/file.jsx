import {
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPinFill } from "react-icons/bs";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { VscDebugStackframe } from "react-icons/vsc";
import PrimaryTag from "../../../../components/atoms/PrimaryTag";
import ProjectGroupCard from "../../../../components/organisms/projects/ProjectGroupCard";
import { db } from "../../../../firebase/config";

const File = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isInfoOpen, setIsInfoOpen] = React.useState(true);
  const [project] = useDocumentData(doc(db, "projects", id));
  const {
    isOpen: isOpenAddFile,
    onOpen: onOpenAddFile,
    onClose: onCloseAddFile,
  } = useDisclosure();

  const {
    isOpen: isOpenPinnedFile,
    onOpen: onOpenPinnedFile,
    onClose: onClosePinnedFile,
  } = useDisclosure();
  const [contentTag, setContentTag] = React.useState("すべて");
  const [role, setRole] = React.useState("すべて");
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  const q = query(collection(db, `projects/${id}/files`), orderBy("timestamp"));
  const [files] = useCollectionData(q);

  console.log("files", files);

  const searchUrlImage = (url) => {
    if (url.indexOf("https://docs.google.com/document") != -1) {
      return "/google-docs.png";
    } else if (url.indexOf("https://docs.google.com/presentation") != -1) {
      return "/google-slides.png";
    }
  };

  const handleAddFile = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `projects/${id}/files`), {
      role: role,
      title: title,
      link: link,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        onClose();
      })
      .catch((e) => {
        console.log(e);
      });
    setRole("");
    setTitle("");
    setLink("");
  };

  const [fileLink, setFileLink] = React.useState("");

  const pinnedFiles = files?.filter((file) =>
    project?.pinnedFileLinks?.includes(file.link)
  );

  const notPinnedFiles = files?.filter(
    (file) => !project?.pinnedFileLinks?.includes(file.link)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectRef = await doc(db, "projects", id);
    try {
      await updateDoc(projectRef, {
        pinnedFileLinks: arrayUnion(fileLink),
      }).then(() => {
        onClose();
      });
    } catch (e) {
      console.log(e);
    }
    setFileLink("");
  };

  console.log("role2", role);

  console.log("fileLink", fileLink);
  return (
    <>
      <Flex
        h="100%"
        w="100%"
        overflowX="scroll"
        direction="column"
        alignItems="center"
        pb="80px"
        px="80px"
      >
        {!isInfoOpen && (
          <IconButton
            onClick={() => setIsInfoOpen(true)}
            position="absolute"
            top="76px"
            left="40px"
            p="8px"
            as={MdOutlineStickyNote2}
            cursor="pointer"
          />
        )}
        <ProjectGroupCard
          isOpen={isInfoOpen}
          setIsOpen={setIsInfoOpen}
          project={project}
        />
        <Flex
          flex={1}
          direction="column"
          w="800px"
          // bg="blue.100"
          transition="all 0.3s ease-in-out"
          mt={isInfoOpen ? "200px" : "64px"}
        >
          <Text fontWeight="bold" mb="16px">
            ファイル・ツール内容
          </Text>
          <Select
            w="460px"
            placeholder="内容からおすすめファイル・ツールリンクを表示します"
            defaultChecked="すべて"
            defaultValue="すべて"
            value={contentTag}
            onChange={(e) => setContentTag(e.target.value)}
            mb="24px"
          >
            <option value="すべて">すべて</option>
            <option value="ドキュメント">ドキュメント</option>
            <option value="デザイン">デザイン</option>
            <option value="チーム開発">チーム開発</option>
            <option value="タスク管理">タスク管理</option>
            <option value="コミュニケーションツール">
              コミュニケーションツール
            </option>
          </Select>
          <Flex flexWrap="wrap" mb="40px">
            {contentTag === "すべて" && (
              <>
                <Text mb="8px">
                  <PrimaryTag text="Google Docs" src="/google-docs.png" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="Google Slides" src="/google-slides.png" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="Google Drive" src="/google-drive.png" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="Jira" src="/jira.png" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="Github" src="/github-icon.svg" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="XD" src="/github-icon.svg" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="Slack" src="/github-icon.svg" />
                </Text>
                <Text mb="8px">
                  <PrimaryTag text="ZOOM" src="/github-icon.svg" />
                </Text>
              </>
            )}
          </Flex>
          {/* ここに中身を記述 */}
          <Flex
            mb="8px"
            color="gray.500"
            alignItems="center"
            cursor="pointer"
            onClick={onOpenPinnedFile}
          >
            <Icon as={BsFillPinFill} mr="8px" />
            <Text>Pinned file</Text>
          </Flex>
          <Flex flexWrap="wrap">
            {pinnedFiles?.map((file, i) => (
              <Link
                key={i}
                textDecoration="none"
                href={file.link}
                target="_blank"
                listStyleType="none"
              >
                <Flex
                  cursor="pointer"
                  w="240px"
                  h="80px"
                  p="24px"
                  bg="teal.500"
                  color="white"
                  boxShadow="md"
                  alignItems="center"
                  justifyContent="center"
                  mr="16px"
                  mb="16px"
                >
                  <Image
                    src={searchUrlImage(file.link)}
                    mr="16px"
                    w="40px"
                    objectFit="cover"
                    alt=""
                  />
                  <Flex direction="column">
                    <Heading fontSize="16px">{file.title}</Heading>
                  </Flex>
                </Flex>
              </Link>
            ))}
            {notPinnedFiles?.map((file, i) => (
              <Link
                key={i}
                textDecoration="none"
                href={file.link}
                target="_blank"
                listStyleType="none"
              >
                <Flex
                  cursor="pointer"
                  w="240px"
                  h="80px"
                  p="24px"
                  bg="white"
                  color="black"
                  boxShadow="md"
                  alignItems="center"
                  justifyContent="center"
                  mr="16px"
                  mb="16px"
                >
                  <Image
                    src={searchUrlImage(file.link)}
                    mr="16px"
                    w="40px"
                    objectFit="cover"
                    alt=""
                  />
                  <Flex direction="column">
                    <Heading fontSize="16px">{file.title}</Heading>
                  </Flex>
                </Flex>
              </Link>
            ))}
            {/* <Flex
              onClick={() =>
                router.push("https://www.google.com/intl/ja_jp/docs/about/")
              }
              cursor="pointer"
              w="240px"
              h="80px"
              p="24px"
              bg="teal.500"
              color="white"
              boxShadow="md"
              alignItems="center"
              justifyContent="center"
              mr="16px"
              mb="16px"
            >
              <Image
                src="/google-docs.png"
                mr="16px"
                w="40px"
                objectFit="cover"
                alt=""
              />
              <Flex direction="column">
                <Heading fontSize="16px">基本的なきまり</Heading>
              </Flex>
            </Flex>
            <Flex
              onClick={() =>
                router.push("https://www.google.com/intl/ja_jp/docs/about/")
              }
              cursor="pointer"
              w="240px"
              h="80px"
              p="24px"
              bg="white"
              color="black"
              boxShadow="md"
              alignItems="center"
              justifyContent="center"
              mr="16px"
              mb="16px"
            >
              <Image
                src="/google-docs.png"
                mr="16px"
                w="40px"
                objectFit="cover"
                alt=""
              />
              <Flex direction="column">
                <Heading fontSize="16px">基本的なきまり</Heading>
              </Flex>
            </Flex>
            <Flex
              onClick={() =>
                router.push("https://www.google.com/intl/ja_jp/docs/about/")
              }
              cursor="pointer"
              w="240px"
              h="80px"
              p="24px"
              bg="white"
              color="black"
              boxShadow="md"
              alignItems="center"
              justifyContent="center"
              mr="16px"
              mb="16px"
            >
              <Image
                src="/google-docs.png"
                mr="16px"
                w="40px"
                objectFit="cover"
                alt=""
              />
              <Flex direction="column">
                <Heading fontSize="16px">基本的なきまり</Heading>
              </Flex>
            </Flex>
            <Flex
              onClick={() =>
                router.push("https://www.google.com/intl/ja_jp/docs/about/")
              }
              cursor="pointer"
              w="240px"
              h="80px"
              p="24px"
              bg="white"
              color="black"
              boxShadow="md"
              alignItems="center"
              justifyContent="center"
              mr="16px"
              mb="16px"
            >
              <Image
                src="/google-docs.png"
                mr="16px"
                w="40px"
                objectFit="cover"
                alt=""
              />
              <Flex direction="column">
                <Heading fontSize="16px">基本的なきまり</Heading>
              </Flex>
            </Flex>
            <Flex
              onClick={() =>
                router.push("https://www.google.com/intl/ja_jp/docs/about/")
              }
              cursor="pointer"
              w="240px"
              h="80px"
              p="24px"
              bg="white"
              color="black"
              boxShadow="md"
              alignItems="center"
              justifyContent="center"
              mr="16px"
              mb="16px"
            >
              <Image
                src="/google-docs.png"
                mr="16px"
                w="40px"
                objectFit="cover"
                alt=""
              />
              <Flex direction="column">
                <Heading fontSize="16px">基本的なきまり</Heading>
              </Flex>
            </Flex> */}
            <Flex
              onClick={onOpenAddFile}
              cursor="pointer"
              w="240px"
              h="80px"
              p="24px"
              bg="gray.100"
              // boxShadow="md"
              border="1px dashed black"
              alignItems="center"
              justifyContent="center"
              mb="16px"
            >
              <Flex alignItems="center">
                <Icon as={AiOutlinePlus} w="16px" h="16px" mr="8px" />
                <Text fontWeight="bold">ファイルを追加</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal isCentered isOpen={isOpenAddFile} onClose={onCloseAddFile}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody my="40px">
            <FormControl as="form" onSubmit={handleAddFile}>
              <Flex mb="24px" fontWeight="bold" fontSize="24px">
                ファイル・ツール追加
              </Flex>
              <Text fontWeight="bold" mb="16px">
                タイトル
              </Text>
              <Input
                mb="24px"
                placeholder="使用内容のタイトルを付けてください"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fontWeight="bold"
              />
              <Text fontWeight="bold" mb="16px">
                紐付ける専門を選んでください。
              </Text>
              <Select
                placeholder="専門を選んでください"
                defaultChecked="すべて"
                defaultValue="すべて"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                mb="24px"
              >
                <option value="すべて">すべて</option>
                <option value="エンジニア">エンジニア</option>
                <option value="デザイナー">デザイナー</option>
                <option value="ライター">ライター</option>
                <option value="動画編集者">動画編集者</option>
                <option value="プランナー">プランナー</option>
                <option value="3DCGモデラー">3DCGモデラー</option>
                <option value="アニメーター">アニメーター</option>
              </Select>
              <Text fontWeight="bold" mb="16px">
                リンク
              </Text>
              <Input
                mb="32px"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="リンクを貼ってください"
              />
              <Button w="100%" type="submit">
                追加
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        isOpen={isOpenPinnedFile}
        onClose={onClosePinnedFile}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg="gray.100">
          <ModalCloseButton />
          <ModalBody my="40px">
            <Flex mb="16px" fontWeight="bold" fontSize="24px">
              ピン止めするファイルを選んでください。
            </Flex>
            <InputGroup as="form" onSubmit={handleSubmit}>
              <Flex direction="column" w="100%">
                <RadioGroup value={fileLink} onChange={setFileLink}>
                  <VStack spacing="16px">
                    <Radio alignSelf="flex-start" value="">
                      ピンを外す
                    </Radio>
                    {files?.map((file, i) => (
                      <Radio alignSelf="flex-start" key={i} value={file.link}>
                        {file.title}
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
    </>
  );
};

export default File;
