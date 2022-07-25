import {
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "../../../firebase/config";
import ProductCard from "../../molecules/ProductCard";

const WorksIndex = (props) => {
  const { currentUser, id } = props;
  const router = useRouter();
  const [snapshot] = useCollection(collection(db, "works"));
  const works = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  console.log("works", works);
  return (
    <>
      {currentUser?.uid === id && (
        <Center
          onClick={() => router.push(`/users/${currentUser?.uid}/new-works`)}
          //   onClick={onOpen}
          mr="16px"
          mb="16px"
          w="250px"
          h="250px"
          bg="gray.100"
          borderRadius="lg"
          cursor="pointer"
          _hover={{ bg: "gray.300" }}
        >
          <Text fontWeight="bold">
            新しい作品を追加
            <Icon
              as={AiOutlinePlus}
              verticalAlign="middle"
              fontSize="16px"
              ml="8px"
            />
          </Text>
        </Center>
      )}
      {currentUser?.uid !== id && (
        <>
          {!works?.filter((w) => w.user.uid === id).length && (
            <Flex>まだ作品はありません</Flex>
          )}
        </>
      )}
      {works
        ?.filter((work) => work.user.uid === id)
        .map((work) => (
          <ProductCard
            width="250px"
            mr="16px"
            mb="16px"
            key={work.id}
            likeUsers={work.likeUsers}
            title={work.title}
            photoURL={work.user.photoURL}
            displayName={work.user.displayName}
            date={work.date}
            onClick={() => router.push(`/works/${work.id}`)}
            tags={work.tags}
            roles={work.roles}
          />
        ))}
    </>
  );
};

export default WorksIndex;
