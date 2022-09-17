import {
  Button,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";
import QueryContainer from "../../../components/templates/QueryContainer";
import { db, storage } from "../../../firebase/config";

const FirstQuery = () => {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [thumbnailPreview, setThumbnailPreview] = React.useState("");
  const thumbnailPreviewRef = React.useRef(null);
  const [purpose, setPurpose] = React.useState("");

  const onClickThumbnailPreview = () => {
    if (thumbnailPreviewRef.current) {
      thumbnailPreviewRef.current.click();
    }
  };

  const onChangeThumbnailHandler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setThumbnailPreview(window.URL.createObjectURL(file));
      // サムネイル
      setThumbnail(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, "projects"));
    const project = [];
    querySnapshot.forEach((doc) => {
      project.push(doc.id);
    });
    const uploadProjectThumbnail = uploadBytesResumable(
      ref(storage, `projects/${thumbnail.name}`),
      thumbnail
    );
    uploadProjectThumbnail.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `projects/${thumbnail.name}`)).then(
          async (url) => {
            try {
              await addDoc(collection(db, "projects"), {
                title: title,
                summary: summary,
                thumbnail: url,
                purpose: purpose,
              }).then(() => router.push("/projects/new/second-query"));
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    );
  };
  return (
    <QueryContainer
      step="1/8"
      title="プロジェクトの概要について教えて下さい"
      width="560px"
    >
      <>
        <Flex direction="column" mb="16px">
          <Text fontWeight="bold" mb="8px">
            タイトル
          </Text>
          <Input
            type="text"
            fontSize="24px"
            fontWeight="bold"
            h="40px"
            placeholder="プロジェクトのタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Flex>
        <Flex direction="column" mb="16px">
          <Text fontWeight="bold" mb="8px">
            概要
          </Text>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            resize="none"
            placeholder="プロジェクトの概要"
          />
        </Flex>
        <Flex direction="column" mb="16px">
          <Text fontWeight="bold" mb="8px">
            サムネイル
          </Text>
          {/* <Image alt="" /> */}
          {thumbnailPreview ? (
            <Image
              src={thumbnailPreview}
              onClick={onClickThumbnailPreview}
              alt=""
              w="100%"
              h="200px"
              objectFit="cover"
            />
          ) : (
            <Flex
              w="100%"
              h="200px"
              bg="gray.300"
              onClick={onClickThumbnailPreview}
            ></Flex>
          )}
          <Input
            style={{ display: "none" }}
            name="image"
            id="image"
            type="file"
            onChange={(e) => onChangeThumbnailHandler(e)}
            ref={thumbnailPreviewRef}
          />
        </Flex>
        <Flex direction="column" mb="32px">
          <Text fontWeight="bold" mb="8px">
            目的
          </Text>
          <Select
            placeholder="目的を選択"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="ポートフォリオ">ポートフォリオ</option>
            <option value="コンテスト">コンテスト</option>
            <option value="起業">起業</option>
            <option value="新規事業">新規事業</option>
            <option value="学習">学習</option>
          </Select>
        </Flex>
        <Button my="16px" onClick={handleSubmit}>
          次へ
        </Button>
      </>
    </QueryContainer>
  );
};

export default FirstQuery;
