import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import QueryContainer from "../../components/templates/QueryContainer";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";

const First = () => {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);
  const [user] = useDocumentData(doc(db, "users", currentUser?.uid));
  const [organization, setOrganization] = React.useState("");
  const [role, setRole] = React.useState("");

  console.log("role", role);
  console.log("currentUser", currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", currentUser?.uid);
    await updateDoc(userRef, {
      organization: organization,
      roles: [role],
    })
      .then(() => {
        router.push("/signup/second-query");
      })
      .catch((e) => {
        alert(e);
      });
  };

  console.log("user", user);
  return (
    <QueryContainer
      step="1/3"
      title="所属組織名・専門役割を教えて下さい"
      width="400px"
    >
      <Flex direction="column" mb="16px">
        <Text fontWeight="bold" mb="8px">
          所属組織名
        </Text>
        <Input
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="デジタルハリウッド大学"
        />
      </Flex>
      <Flex direction="column" mb="40px">
        <Text fontWeight="bold" mb="8px">
          専門役割
        </Text>
        <Select
          placeholder="専門を選んでください"
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
      <VStack spacing="16px">
        <Button w="100%" type="submit" onClick={handleSubmit}>
          次へ
        </Button>
        <Button w="100%" onClick={() => router.push("/signup/second-query")}>
          スキップする
        </Button>
      </VStack>
    </QueryContainer>
  );
};

export default First;
