import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import QueryContainer from "../../components/templates/QueryContainer";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";

const Third = () => {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);
  const [user] = useDocumentData(doc(db, "users", currentUser?.uid));
  const [text, setText] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", currentUser?.uid);
    await updateDoc(userRef, {
      text: text,
    })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <QueryContainer step="3/3" title="自己紹介を書いてみましょう" width="400px">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        mb="32px"
        resize="none"
        h="120px"
      />
      <VStack spacing="16px">
        <Button w="100%" onClick={handleSubmit}>
          登録を完了する
        </Button>
        <Button w="100%" onClick={() => router.push("/")}>
          スキップして登録を完了する
        </Button>
      </VStack>
    </QueryContainer>
  );
};

export default Third;
