import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import QueryContainer from "../../components/templates/QueryContainer";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";

const Second = () => {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);
  const [user] = useDocumentData(doc(db, "users", currentUser?.uid));
  const [snapshot] = useCollection(collection(db, "tags"));

  const [tags, setTags] = React.useState([]);
  console.log("tags", tags);
  const userTags = snapshot?.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((tag) => tag.role?.includes(user?.roles[0]));

  console.log("userTags", userTags);

  const toggleTags = (t) => {
    if (tags?.filter((tag) => tag.text === t).length) {
      setTags(tags?.filter((tag) => tag.text !== t));
    } else {
      setTags([
        ...tags,
        {
          text: t,
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = await doc(db, "users", currentUser?.uid);
    await updateDoc(userRef, {
      tags: tags,
    })
      .then(() => {
        router.push("/signup/third-query");
      })
      .catch((e) => {
        alert(e);
      });
  };

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
            // bg="teal.100"
            mr="16px"
            borderRadius="full"
            mb="16px"
            p="8px 16px"
            cursor="pointer"
            _hover={{ bg: "teal.300" }}
            alignItems="center"
            bg={
              tags?.find((t) => t.text === tag.text) ? "teal.500" : "teal.100"
            }
            onClick={() => toggleTags(tag.text)}
          >
            <Text mr="8px">{tag?.text}</Text>
            <Icon as={AiOutlinePlus} />
          </Flex>
        ))}
      </Flex>
      <VStack spacing="16px">
        <Button w="100%" onClick={handleSubmit}>
          次へ
        </Button>
        <Button w="100%" onClick={() => router.push("/signup/third-query")}>
          スキップする
        </Button>
      </VStack>
    </QueryContainer>
  );
};

export default Second;
