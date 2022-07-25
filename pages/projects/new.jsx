import {
  Button,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import QueryContainer from "../../components/templates/QueryContainer";
import dayjs from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { addDoc, collection, doc } from "firebase/firestore";
import { AuthContext } from "../_app";
import { useDocumentData } from "react-firebase-hooks/firestore";

const CreateProject = () => {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);

  const [user] = useDocumentData(doc(db, "users", currentUser?.uid));

  const [queryNumber, setQueryNumber] = React.useState("1");
  // 1
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [thumbnailPreview, setThumbnailPreview] = React.useState("");
  const thumbnailPreviewRef = React.useRef(null);
  const [purpose, setPurpose] = React.useState("");
  // 2
  const [status, setStatus] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  //   3
  const [role1, setRole1] = React.useState("");
  const [role2, setRole2] = React.useState("");
  const [tags, setTags] = React.useState([]);
  //   4
  const [whatImage1, setWhatImage1] = React.useState("");
  const [whatImage2, setWhatImage2] = React.useState("");
  const [whatImage1Preview, setWhatImage1Preview] = React.useState("");
  const whatImage1PreviewRef = React.useRef(null);
  const [whatImage2Preview, setWhatImage2Preview] = React.useState("");
  const whatImage2PreviewRef = React.useRef(null);
  const [whatText, setWhatText] = React.useState("");
  //   5
  const [whyImage1, setWhyImage1] = React.useState("");
  const [whyImage2, setWhyImage2] = React.useState("");
  const [whyImage1Preview, setWhyImage1Preview] = React.useState("");
  const whyImage1PreviewRef = React.useRef(null);
  const [whyImage2Preview, setWhyImage2Preview] = React.useState("");
  const whyImage2PreviewRef = React.useRef(null);
  const [whyText, setWhyText] = React.useState("");
  // 6
  const [howImage1, setHowImage1] = React.useState("");
  const [howImage2, setHowImage2] = React.useState("");
  const [howImage1Preview, setHowImage1Preview] = React.useState("");
  const howImage1PreviewRef = React.useRef(null);
  const [howImage2Preview, setHowImage2Preview] = React.useState("");
  const howImage2PreviewRef = React.useRef(null);
  const [howText, setHowText] = React.useState("");
  //   7
  const [hopeImage1, setHopeImage1] = React.useState("");
  const [hopeImage2, setHopeImage2] = React.useState("");
  const [hopeImage1Preview, setHopeImage1Preview] = React.useState("");
  const hopeImage1PreviewRef = React.useRef(null);
  const [hopeImage2Preview, setHopeImage2Preview] = React.useState("");
  const hopeImage2PreviewRef = React.useRef(null);
  const [hopeText, setHopeText] = React.useState("");
  //   8
  const [goalImage1, setGoalImage1] = React.useState("");
  const [goalImage2, setGoalImage2] = React.useState("");
  const [goalImage1Preview, setGoalImage1Preview] = React.useState("");
  const goalImage1PreviewRef = React.useRef(null);
  const [goalImage2Preview, setGoalImage2Preview] = React.useState("");
  const goalImage2PreviewRef = React.useRef(null);
  const [goalText, setGoalText] = React.useState("");

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

  const onClickWhatImage1Preview = () => {
    if (whatImage1PreviewRef.current) {
      whatImage1PreviewRef.current.click();
    }
  };

  const onChangeWhatImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setWhatImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setWhatImage1(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickWhatImage2Preview = () => {
    if (whatImage2PreviewRef.current) {
      whatImage2PreviewRef.current.click();
    }
  };

  const onChangeWhatImage2Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setWhatImage2Preview(window.URL.createObjectURL(file));
      // サムネイル
      setWhatImage2(e.target.files[0]);
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
  const onClickWhyImage2Preview = () => {
    if (whyImage2PreviewRef.current) {
      whyImage2PreviewRef.current.click();
    }
  };

  const onChangeWhyImage2Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setWhyImage2Preview(window.URL.createObjectURL(file));
      // サムネイル
      setWhyImage2(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickHowImage1Preview = () => {
    if (howImage1PreviewRef.current) {
      howImage1PreviewRef.current.click();
    }
  };

  const onChangeHowImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setHowImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setHowImage1(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickHowImage2Preview = () => {
    if (howImage2PreviewRef.current) {
      howImage2PreviewRef.current.click();
    }
  };

  const onChangeHowImage2Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setHowImage2Preview(window.URL.createObjectURL(file));
      // サムネイル
      setHowImage2(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickHopeImage1Preview = () => {
    if (hopeImage1PreviewRef.current) {
      hopeImage1PreviewRef.current.click();
    }
  };

  const onChangeHopeImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setHopeImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setHopeImage1(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickHopeImage2Preview = () => {
    if (hopeImage2PreviewRef.current) {
      hopeImage2PreviewRef.current.click();
    }
  };

  const onChangeHopeImage2Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setHopeImage2Preview(window.URL.createObjectURL(file));
      // サムネイル
      setHopeImage2(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickGoalImage1Preview = () => {
    if (goalImage1PreviewRef.current) {
      goalImage1PreviewRef.current.click();
    }
  };

  const onChangeGoalImage1Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setGoalImage1Preview(window.URL.createObjectURL(file));
      // サムネイル
      setGoalImage1(e.target.files[0]);
      e.target.value = "";
    }
  };
  const onClickGoalImage2Preview = () => {
    if (goalImage2PreviewRef.current) {
      goalImage2PreviewRef.current.click();
    }
  };

  const onChangeGoalImage2Handler = (e) => {
    if (e.target.files[0]) {
      // プレビュー機能
      const file = e.target.files[0];
      setGoalImage2Preview(window.URL.createObjectURL(file));
      // サムネイル
      setGoalImage2(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "projects"), {
      title: title,
      summary: summary,
      thumbnail: "",
      purpose: purpose,
      status: status,
      deadline: deadline,
      roles: [role1, role2],
      tags: [],
      members: [
        {
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          uid: currentUser?.uid,
          text: user?.text,
          organization: user?.organization,
          tags: user?.tags?.map((tag) => {
            return tag.text;
          }),
          role: user?.roles[0],
        },
      ],
      what: {
        images: [],
        text: whatText,
      },
      why: {
        images: [],
        text: whyText,
      },
      how: {
        images: [],
        text: howText,
      },
      hope: {
        images: [],
        text: hopeText,
      },
      goal: {
        images: [],
        text: goalText,
      },
      user: {
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
        uid: currentUser?.uid,
      },
    }).then(() => {
      router.push("/");
    });
    const uploadProjectThumbnail = uploadBytesResumable(
      ref(storage, `projects/${thumbnail.name}`),
      thumbnail
    );
    // uploadProjectThumbnail.on(
    //   "state_changed",
    //   () => {},
    //   (err) => {
    //     alert(err.message);
    //   },
    //   async () => {
    //     await getDownloadURL(ref(storage, `projects/${thumbnail.name}`)).then(
    //       async (url) => {
    //         try {
    //           setThumbnail(url);
    //         } catch (e) {
    //           console.log(e);
    //         }
    //       }
    //     );
    //   }
    // );
    const uploadProjectWhatImage1 = uploadBytesResumable(
      ref(storage, `projects/${whatImage1.name}`),
      whatImage1
    );
    const uploadProjectWhatImage2 = uploadBytesResumable(
      ref(storage, `projects/${whatImage2.name}`),
      whatImage2
    );
    const uploadProjectWhyImage1 = uploadBytesResumable(
      ref(storage, `projects/${whyImage1.name}`),
      whyImage1
    );
    const uploadProjectWhyImage2 = uploadBytesResumable(
      ref(storage, `projects/${whyImage2.name}`),
      whyImage2
    );
    const uploadProjectHowImage1 = uploadBytesResumable(
      ref(storage, `projects/${howImage1.name}`),
      howImage1
    );
    const uploadProjectHowImage2 = uploadBytesResumable(
      ref(storage, `projects/${howImage2.name}`),
      howImage2
    );
    const uploadProjectHopeImage1 = uploadBytesResumable(
      ref(storage, `projects/${hopeImage1.name}`),
      hopeImage1
    );
    const uploadProjectHopeImage2 = uploadBytesResumable(
      ref(storage, `projects/${hopeImage2.name}`),
      hopeImage2
    );
    const uploadProjectGoalImage1 = uploadBytesResumable(
      ref(storage, `projects/${goalImage1.name}`),
      goalImage1
    );
    const uploadProjectGoalImage2 = uploadBytesResumable(
      ref(storage, `projects/${goalImage2.name}`),
      goalImage2
    );
  };

  return (
    <>
      {queryNumber === "1" && (
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
            <Button my="16px" onClick={() => setQueryNumber("2")}>
              次へ
            </Button>
          </>
        </QueryContainer>
      )}
      {queryNumber === "2" && (
        <QueryContainer
          step="2/8"
          title="プロジェクト状況を教えて下さい"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              プロジェクトの状態
            </Text>
            <Select
              placeholder="状態を選択"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="構想段階">構想段階（0~10%）</option>
              <option value="序盤">序盤（11~40%）</option>
              <option value="中盤">中盤（41~70%）</option>
              <option value="終盤">終盤（71%~99%）</option>
            </Select>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              募集期限
            </Text>
            <Input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date"
            />
          </Flex>
          <Button my="16px" onClick={() => setQueryNumber("3")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("1")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "3" && (
        <QueryContainer
          step="3/8"
          title="追加したいタグについて教えて下さい"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              必要職種
            </Text>
            <Select
              placeholder="メイン職種を選択"
              mb="16px"
              value={role1}
              onChange={(e) => setRole1(e.target.value)}
            >
              <option value="エンジニア">エンジニア</option>
              <option value="デザイナー">デザイナー</option>
              <option value="ライター">ライター</option>
              <option value="動画編集者">動画編集者</option>
              <option value="プランナー">プランナー</option>
              <option value="3DCGモデラー">3DCGモデラー</option>
              <option value="アニメーター">アニメーター</option>
            </Select>
            <Select
              placeholder="サブ職種を選択"
              value={role2}
              onChange={(e) => setRole2(e.target.value)}
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
          <Button my="16px" onClick={() => setQueryNumber("4")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("2")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "4" && (
        <QueryContainer
          step="4/8"
          title="実現したいものについて教えて下さい"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {whatImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={whatImage1Preview}
                  onClick={onClickWhatImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickWhatImage1Preview}
                ></Flex>
              )}
              {whatImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={whatImage2Preview}
                  onClick={onClickWhatImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickWhatImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeWhatImage1Handler(e)}
                ref={whatImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeWhatImage2Handler(e)}
                ref={whatImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={whatText}
              onChange={(e) => setWhatText(e.target.value)}
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
        <QueryContainer step="5/8" title="なぜ作りたいのですか？" width="560px">
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {whyImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={whyImage1Preview}
                  onClick={onClickWhyImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickWhyImage1Preview}
                ></Flex>
              )}
              {whyImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={whyImage2Preview}
                  onClick={onClickWhyImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickWhyImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeWhyImage1Handler(e)}
                ref={whyImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeWhyImage2Handler(e)}
                ref={whyImage2PreviewRef}
              />
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
          <Button my="16px" onClick={() => setQueryNumber("6")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("4")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "6" && (
        <QueryContainer
          step="6/8"
          title="どのような流れで実現するのですか？"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {howImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={howImage1Preview}
                  onClick={onClickHowImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickHowImage1Preview}
                ></Flex>
              )}
              {howImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={howImage2Preview}
                  onClick={onClickHowImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickHowImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeHowImage1Handler(e)}
                ref={howImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeHowImage2Handler(e)}
                ref={howImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={howText}
              onChange={(e) => setHowText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={() => setQueryNumber("7")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("5")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "7" && (
        <QueryContainer
          step="7/8"
          title="どのようなクリエイターに協力してほしいですか？"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {hopeImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={hopeImage1Preview}
                  onClick={onClickHopeImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickHopeImage1Preview}
                ></Flex>
              )}
              {hopeImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={hopeImage2Preview}
                  onClick={onClickHopeImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickHopeImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeHopeImage1Handler(e)}
                ref={hopeImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeHopeImage2Handler(e)}
                ref={hopeImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={hopeText}
              onChange={(e) => setHopeText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button my="16px" onClick={() => setQueryNumber("8")}>
            次へ
          </Button>
          <Button onClick={() => setQueryNumber("6")}>戻る</Button>
        </QueryContainer>
      )}
      {queryNumber === "8" && (
        <QueryContainer
          step="8/8"
          title="最終的な目標はなんですか？"
          width="560px"
        >
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              画像
            </Text>
            <Flex>
              {goalImage1Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={goalImage1Preview}
                  onClick={onClickGoalImage1Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.100"
                  onClick={onClickGoalImage1Preview}
                ></Flex>
              )}
              {goalImage2Preview ? (
                <Image
                  w="50%"
                  h="120px"
                  alt=""
                  src={goalImage2Preview}
                  onClick={onClickGoalImage2Preview}
                  objectFit="cover"
                />
              ) : (
                <Flex
                  w="50%"
                  h="120px"
                  bg="gray.300"
                  onClick={onClickGoalImage2Preview}
                ></Flex>
              )}
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeGoalImage1Handler(e)}
                ref={goalImage1PreviewRef}
              />
              <Input
                style={{ display: "none" }}
                name="image"
                id="image"
                type="file"
                onChange={(e) => onChangeGoalImage2Handler(e)}
                ref={goalImage2PreviewRef}
              />
            </Flex>
          </Flex>
          <Flex direction="column" mb="16px">
            <Text fontWeight="bold" mb="8px">
              テキスト
            </Text>
            <Textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              type="text"
              h="320px"
              resize="none"
            />
          </Flex>
          <Button type="submit" my="16px" onClick={handleSubmit}>
            投稿する
          </Button>
          <Button onClick={() => setQueryNumber("7")}>戻る</Button>
        </QueryContainer>
      )}
    </>
  );
};

export default CreateProject;
