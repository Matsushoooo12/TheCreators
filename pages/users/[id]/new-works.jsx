import {
  Button,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";
import QueryContainer from "../../../components/templates/QueryContainer";
import { db, storage } from "../../../firebase/config";
import { AuthContext } from "../../_app";

const CreateWorks = () => {
  const router = useRouter();
  const [id, setId] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const [queryNumber, setQueryNumber] = React.useState("1");
  //   1
  const [title, setTitle] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [thumbnailPreview, setThumbnailPreview] = React.useState("");
  const thumbnailPreviewRef = React.useRef(null);
  const [link, setLink] = React.useState("");
  const [date, setDate] = React.useState("");

  //   ２
  const [role, setRole] = React.useState("");
  const [tag1, setTag1] = React.useState("");
  const [tag2, setTag2] = React.useState("");
  const [tag3, setTag3] = React.useState("");
  const [contentImage1, setContentImage1] = React.useState("");
  const [contentImage2, setContentImage2] = React.useState("");
  const [contentImage1Preview, setContentImage1Preview] = React.useState("");
  const contentImage1PreviewRef = React.useRef(null);
  const [contentImage2Preview, setContentImage2Preview] = React.useState("");
  const contentImage2PreviewRef = React.useRef(null);
  const [contentText, setContentText] = React.useState("");

  const [whyImage1, setWhyImage1] = React.useState("");
  const [whyImage1Preview, setWhyImage1Preview] = React.useState("");
  const whyImage1PreviewRef = React.useRef(null);
  const [whyText, setWhyText] = React.useState("");

  const [currentImage1, setCurrentImage1] = React.useState("");
  const [currentImage1Preview, setCurrentImage1Preview] = React.useState("");
  const currentImage1PreviewRef = React.useRef(null);
  const [currentText, setCurrentText] = React.useState("");

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

  const onClickWhyImage1Preview = () => {
    if (whyImage1PreviewRef.current) {
      whyImage1PreviewRef.current.click();
    }
  };

  const onChangeWhyImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setWhyImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setWhyImage1(e.target.files[0]);
      e.target.value = "";
    }
  };

  const onClickCurrentImage1Preview = () => {
    if (currentImage1PreviewRef.current) {
      currentImage1PreviewRef.current.click();
    }
  };

  const onChangeCurrentImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setCurrentImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setCurrentImage1(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const uploadWorksThumbnail = uploadBytesResumable(
      ref(storage, `works/${thumbnail.name}`),
      thumbnail
    );
    await uploadWorksThumbnail.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `works/${thumbnail.name}`)).then(
          async (url) => {
            try {
              await addDoc(collection(db, "works"), {
                title: title,
                thumbnail: url,
                link: link,
                date: date,
                user: {
                  displayName: currentUser?.displayName,
                  photoURL: currentUser?.photoURL,
                  uid: currentUser?.uid,
                },
              }).then(async (res) => {
                await setId(res.id);
                await setQueryNumber("2");
              });
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    );
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const workRef = await doc(db, "works", id);
    try {
      await updateDoc(workRef, {
        roles: [role],
        tags: [
          {
            image: "",
            text: tag1,
          },
          {
            image: "",
            text: tag2,
          },
          {
            image: "",
            text: tag3,
          },
        ],
      }).then(async () => {
        await setQueryNumber("3");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    const workRef = await doc(db, "works", id);
    const uploadWorksContentImage1 = uploadBytesResumable(
      ref(storage, `works/${contentImage1.name}`),
      contentImage1
    );
    await uploadWorksContentImage1.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `works/${contentImage1.name}`)).then(
          async (url) => {
            try {
              await updateDoc(workRef, {
                content: {
                  images: [url],
                  text: contentText,
                },
              }).then(async () => {
                await setQueryNumber("4");
              });
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    );
  };

  const handleSubmit4 = async (e) => {
    e.preventDefault();
    const workRef = await doc(db, "works", id);
    const uploadWorksWhyImage1 = uploadBytesResumable(
      ref(storage, `works/${whyImage1.name}`),
      whyImage1
    );
    await uploadWorksWhyImage1.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `works/${whyImage1.name}`)).then(
          async (url) => {
            try {
              await updateDoc(workRef, {
                why: {
                  images: [url],
                  text: whyText,
                },
              }).then(async () => {
                await setQueryNumber("5");
              });
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    );
  };

  const handleSubmit5 = async (e) => {
    e.preventDefault();
    const workRef = await doc(db, "works", id);
    const uploadWorksCurrentImage1 = uploadBytesResumable(
      ref(storage, `works/${currentImage1.name}`),
      currentImage1
    );
    await uploadWorksCurrentImage1.on(
      "state_changed",
      () => {},
      (err) => {
        alert(err.message);
      },
      async () => {
        await getDownloadURL(ref(storage, `works/${currentImage1.name}`)).then(
          async (url) => {
            try {
              await updateDoc(workRef, {
                current: {
                  images: [url],
                  text: currentText,
                },
              }).then(async () => {
                router.push("/");
              });
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    );
  };

  return (
    <>
      {queryNumber === "1" && (
        <QueryContainer
          step="1/5"
          title="作品の概要について教えて下さい"
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
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Flex>
            <Flex direction="column" mb="32px">
              <Text fontWeight="bold" mb="8px">
                作成日
              </Text>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Flex>
            <Button my="16px" onClick={handleSubmit1}>
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
              自分の職種
            </Text>
            <Select
              placeholder="自分の担当職種を選択"
              mb="16px"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            <Input
              type="text"
              value={tag1}
              onChange={(e) => setTag1(e.target.value)}
              placeholder="タグ追加"
              mb="16px"
            />
            <Input
              value={tag2}
              onChange={(e) => setTag2(e.target.value)}
              type="text"
              placeholder="タグ追加"
              mb="16px"
            />
            <Input
              value={tag3}
              onChange={(e) => setTag3(e.target.value)}
              type="text"
              placeholder="タグ追加"
              mb="16px"
            />
            {/* <Input type="text" placeholder="タグ追加" mb="16px" />
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
            </Flex> */}
          </Flex>
          <Button my="16px" onClick={handleSubmit2}>
            次へ
          </Button>
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
                  w="100%"
                  h="200px"
                  alt=""
                  src={contentImage1Preview}
                  onClick={onClickContentImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="100%"
                  h="200px"
                  bg="gray.100"
                  onClick={onClickContentImage1Preview}
                ></Flex>
              )}
              {/* {contentImage2Preview ? (
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
              )} */}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage1Handler(e)}
                ref={contentImage1PreviewRef}
              />
              {/* <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage2Handler(e)}
                ref={contentImage2PreviewRef}
              /> */}
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
          <Button my="16px" onClick={handleSubmit3}>
            次へ
          </Button>
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
              {whyImage1Preview ? (
                <Image
                  w="100%"
                  h="200px"
                  alt=""
                  src={whyImage1Preview}
                  onClick={onClickWhyImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="100%"
                  h="200px"
                  bg="gray.100"
                  onClick={onClickWhyImage1Preview}
                ></Flex>
              )}
              {/* {contentImage2Preview ? (
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
              )} */}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeWhyImage1Handler(e)}
                ref={whyImage1PreviewRef}
              />
              {/* <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage2Handler(e)}
                ref={contentImage2PreviewRef}
              /> */}
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={whyText}
              onChange={(e) => setWhyText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={handleSubmit4}>
            次へ
          </Button>
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
              {currentImage1Preview ? (
                <Image
                  w="100%"
                  h="200px"
                  alt=""
                  src={currentImage1Preview}
                  onClick={onClickCurrentImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="100%"
                  h="200px"
                  bg="gray.100"
                  onClick={onClickCurrentImage1Preview}
                ></Flex>
              )}
              {/* {contentImage2Preview ? (
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
              )} */}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeCurrentImage1Handler(e)}
                ref={currentImage1PreviewRef}
              />
              {/* <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeContentImage2Handler(e)}
                ref={contentImage2PreviewRef}
              /> */}
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={handleSubmit5}>
            次へ
          </Button>
        </QueryContainer>
      )}
    </>
  );
};

export default CreateWorks;
