import {
  Button,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import QueryContainer from "../../../../components/templates/QueryContainer";
import { db } from "../../../../firebase/config";
import dayjs from "dayjs";

const CreateProjectWork = () => {
  const router = useRouter();
  const { id } = router.query;
  const [queryNumber, setQueryNumber] = React.useState("1");

  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const project = projects?.find((project) => project.id === id);
  //   1
  const [title, setTitle] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [thumbnailPreview, setThumbnailPreview] = React.useState("");
  const thumbnailPreviewRef = React.useRef(null);
  const [link, setLink] = React.useState("");

  //   ２
  const [contentImage1, setContentImage1] = React.useState("");
  const [contentImage2, setContentImage2] = React.useState("");
  const [contentImage1Preview, setContentImage1Preview] = React.useState("");
  const contentImage1PreviewRef = React.useRef(null);
  const [contentImage2Preview, setContentImage2Preview] = React.useState("");
  const contentImage2PreviewRef = React.useRef(null);
  const [contentText, setContentText] = React.useState("");

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

  const onClickContentImage1Preview = () => {
    if (contentImage1PreviewRef.current) {
      contentImage1PreviewRef.current.click();
    }
  };

  const onChangeContentImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setContentImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setContentImage1(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickContentImage2Preview = () => {
    if (contentImage2PreviewRef.current) {
      contentImage2PreviewRef.current.click();
    }
  };

  const onChangeContentImage2Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setContentImage2Preview(window.URL.createObjectURL(file));
      // サムネイル
      setContentImage2(e.target.files[0]);
      e.target.value = "";
    }
  };

  return (
    <>
      {queryNumber === "1" && (
        <QueryContainer
          step="1/5"
          title="プロジェクト作品の概要について教えて下さい"
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
                value={project?.title}
                onChange={(e) => setTitle(e.target.value)}
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
                リンク
              </Text>
              <Input
                type="text"
                placeholder="作品に関するリンクを記入してください"
              />
            </Flex>
            <Flex direction="column" mb="32px">
              <Text fontWeight="bold" mb="8px">
                作成日
              </Text>
              <Input type="date" />
            </Flex>
            <Button my="16px" onClick={() => setQueryNumber("2")}>
              次へ
            </Button>
          </>
        </QueryContainer>
      )}
      {queryNumber === "2" && (
        <QueryContainer
          step="2/5"
          title="追加したいタグについて教えて下さい"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              必要職種
            </Text>
            <Select
              placeholder="自分の担当職種を選択"
              mb="16px"
              //   value={role1}
              //   onChange={(e) => setRole1(e.target.value)}
            >
              <option value="エンジニア">エンジニア</option>
              <option value="デザイナー">デザイナー</option>
              <option value="ライター">ライター</option>
              <option value="動画編集者">動画編集者</option>
              <option value="プランナー">プランナー</option>
              <option value="3DCGモデラー">3DCGモデラー</option>
              <option value="アニメーター">アニメーター</option>
            </Select>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              タグ（３つまで）
            </Text>
            <Input type="text" placeholder="タグ追加" mb="16px" />
            <Flex flexWrap="wrap" mb="16px">
              <Text
                p="4px 16px"
                borderRadius="full"
                fontWeight="bold"
                mr="8px"
                bg="teal.500"
                color="white"
              >
                Ruby on Rails
              </Text>
              <Text
                p="4px 16px"
                borderRadius="full"
                fontWeight="bold"
                mr="8px"
                bg="teal.500"
                color="white"
              >
                React
              </Text>
              <Text
                p="4px 16px"
                borderRadius="full"
                fontWeight="bold"
                mr="8px"
                bg="teal.500"
                color="white"
              >
                Webアプリ開発
              </Text>
            </Flex>
          </Flex>
          <Button my="16px" onClick={() => setQueryNumber("3")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("1")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "3" && (
        <QueryContainer
          step="3/5"
          title="作品の内容について教えて下さい"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {contentImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={contentImage1Preview}
                  onClick={onClickContentImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickContentImage1Preview}
                ></Flex>
              )}
              {contentImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={contentImage2Preview}
                  onClick={onClickContentImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickContentImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage1Handler(e)}
                ref={contentImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage2Handler(e)}
                ref={contentImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={() => setQueryNumber("4")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("2")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "4" && (
        <QueryContainer
          step="4/5"
          title="なぜこの作品を作ったのですか？"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {contentImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={contentImage1Preview}
                  onClick={onClickContentImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickContentImage1Preview}
                ></Flex>
              )}
              {contentImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={contentImage2Preview}
                  onClick={onClickContentImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickContentImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage1Handler(e)}
                ref={contentImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage2Handler(e)}
                ref={contentImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={() => setQueryNumber("5")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("3")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "5" && (
        <QueryContainer
          step="5/5"
          title="現在の状況を教えて下さい"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {contentImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={contentImage1Preview}
                  onClick={onClickContentImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickContentImage1Preview}
                ></Flex>
              )}
              {contentImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={contentImage2Preview}
                  onClick={onClickContentImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickContentImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage1Handler(e)}
                ref={contentImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage2Handler(e)}
                ref={contentImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={() => router.push("/")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("4")}>戻る</Button>
        </QueryContainer>
      )}
    </>
  );
};

export default CreateProjectWork;
