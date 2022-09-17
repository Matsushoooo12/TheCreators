import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { GrGroup } from "react-icons/gr";
import Labels from "../../components/molecules/Labels";
import { FiMapPin } from "react-icons/fi";
import { GiStairsGoal } from "react-icons/gi";
import { useScroll } from "../../hooks/useScroll";
import { AuthContext } from "../_app";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ArticleItem from "../../components/organisms/ArticleItem";

const DetailWorks = () => {
  const router = useRouter();
  const { id } = router.query;
  const { summaryRef, whyRef, currentRef, topRef } =
    React.useContext(AuthContext);

  const [works] = useDocumentData(doc(db, "works", id));

  console.log("works2", works);

  return (
    <Flex
      h="100%"
      w="100%"
      bg="gray.100"
      overflowX="scroll"
      direction="column"
      alignItems="center"
    >
      <Flex
        direction="column"
        w="800px"
        // bg="green.100"
        mx="40px"
        pt="40px"
        mb="80px"
        ref={topRef}
      >
        {/* <Image alt="" /> */}
        <Image
          src={works?.thumbnail}
          mb="16px"
          w="100%"
          h="280px"
          bg="gray.500"
          alt=""
          objectFit="cover"
        />
        <Labels roles={works?.roles} tags={works?.tags} />
        <Heading fontSize="32px" my="16px">
          {works?.title}
        </Heading>
        <Flex alignItems="center">
          <Flex alignItems="center" mr="16px">
            <Avatar
              //   src="/the_creators_Symbol.png"
              src={
                works?.user.photoURL
                  ? works?.user.photoURL
                  : "/the_creators_Symbol.png"
              }
              bg="white"
              boxShadow="lg"
              w="32px"
              h="32px"
              mr="8px"
            />
            <Text fontWeight="bold">{works?.user.displayName}</Text>
          </Flex>
        </Flex>
        <Flex direction="column" pt="40px" ref={summaryRef}>
          <ArticleItem
            images={works?.content.images}
            title="作品内容"
            text={works?.content.text.replaceAll("\\n", "\n")}
          />
        </Flex>
        <Flex direction="column" pt="40px" ref={whyRef}>
          <ArticleItem
            images={works?.why.images}
            title="なぜ作ったのか"
            text={works?.why.text.replaceAll("\\n", "\n")}
          />
        </Flex>
        <Flex direction="column" pt="40px" ref={currentRef}>
          <ArticleItem
            images={works?.current.images}
            title="現在の状況"
            text={works?.current.text.replaceAll("\\n", "\n")}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailWorks;
