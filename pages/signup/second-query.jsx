import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import QueryContainer from "../../components/templates/QueryContainer";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";

const Second = () => {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);
  const [user] = useDocumentData(doc(db, "users", currentUser?.uid));
  const [snapshot] = useCollection(collection(db, "tags"));
  const userTags = snapshot?.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((tag) => tag.role?.includes(user?.role));

  return (
    <QueryContainer
      step="2/3"
      title="あなたに関連するタグを3つまで選んでください"
      width="400px"
    >
      <Flex flexWrap="wrap" mb="32px">
        {userTags?.map((tag) => (
          <Flex
            key={tag.id}
            bg="red.100"
            mr="16px"
            borderRadius="full"
            mb="16px"
            p="8px 16px"
            cursor="pointer"
            _hover={{ bg: "red.300" }}
          >
            {tag?.text}
          </Flex>
        ))}
      </Flex>
      <VStack spacing="16px">
        <Button w="100%">次へ</Button>
        <Button w="100%" onClick={() => router.push("/signup/third-query")}>
          スキップする
        </Button>
      </VStack>
    </QueryContainer>
  );
};

export default Second;
