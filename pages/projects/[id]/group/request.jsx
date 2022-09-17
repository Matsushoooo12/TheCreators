import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { MdOutlineStickyNote2 } from "react-icons/md";
import Labels from "../../../../components/molecules/Labels";
import ProjectGroupCard from "../../../../components/organisms/projects/ProjectGroupCard";
import { db } from "../../../../firebase/config";
import { AuthContext } from "../../../_app";

const Request = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isMessageOpen, setIsMessageOpen] = React.useState(false);
  const { currentUser, isAllRequest, setIsAllRequest } =
    React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(true);
  const [project] = useDocumentData(doc(db, "projects", id));
  console.log("project", project);

  //   const followsQuery = query(collection(db, `users/${id}/follows`));
  //   const [follows] = useCollectionData(followsQuery);
  //   const followersQuery = query(collection(db, `users/${id}/followers`));
  //   const [followers] = useCollectionData(followersQuery);

  const q = query(
    collection(db, `projects/${id}/requests`),
    orderBy("timestamp")
  );
  const [requests] = useCollectionData(q);

  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // const userMatchingCount = (user) => {
  //   const followsQuery = query(collection(db, `users/${user.id}/follows`));
  //   const [follows] = useCollectionData(followsQuery);
  //   const followersQuery = query(collection(db, `users/${user.id}/followers`));
  //   const [followers] = useCollectionData(followersQuery);
  //   return follows;

  //   // const matchingCount = users?.filter(
  //   //   (user) =>
  //   //     user.id ===
  //   //       followers?.find((follower) => follower.uid === user.id)?.uid &&
  //   //     user.id === follows?.find((follow) => follow.uid === user.id)?.uid
  //   // )?.length;
  //   // return matchingCount;
  // };

  // console.log("fff", userMatchingCount(currentUser?.uid));

  // console.log(() => userMatchingCount(currentUser));

  //   const followsQuery = query(
  //     collection(db, `users/${currentUser?.uid}/follows`)
  //   );
  //   const [follows] = useCollectionData(followsQuery);
  //   const followersQuery = query(
  //     collection(db, `users/${currentUser?.uid}/followers`)
  //   );
  //   const [followers] = useCollectionData(followersQuery);

  console.log(
    "requestUsers",
    users?.filter((user) =>
      requests?.find((request) => request.uid === user.id)
    )
  );

  const omittedContent = (string) => {
    // 定数で宣言
    const MAX_LENGTH = 30;

    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {
      // substr(何文字目からスタートするか, 最大値);
      return string.substr(0, MAX_LENGTH) + "...";
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
  };

  console.log("id", project);

  const handleAddMember = async (user) => {
    const projectRef = await doc(db, "projects", id);

    // console.log("user", user);
    await updateDoc(projectRef, {
      members: [
        ...project?.members,
        {
          displayName: user.displayName,
          organization: user.organization,
          photoURL: user.photoURL,
          role: user.roles[0],
          tags: user.tags?.map((tag) => {
            return tag.text;
          }),
          text: user.text,
          uid: user.id,
        },
      ],
    })
      .then(async () => {
        await deleteDoc(doc(db, `projects/${id}/requests`, user.id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(
    "anime",
    users
      ?.filter((user) => requests?.find((request) => request.uid === user.id))
      .filter((user) => user.roles[0] === "アニメーター")
  );

  return (
    <Flex
      h="100%"
      w="100%"
      overflowX="scroll"
      direction="column"
      alignItems="center"
      pb="80px"
      px="80px"
    >
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          position="absolute"
          top="76px"
          left="40px"
          p="8px"
          as={MdOutlineStickyNote2}
          cursor="pointer"
        />
      )}
      <ProjectGroupCard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={project}
      />
      <Flex
        flex={1}
        w="800px"
        transition="all 0.3s ease-in-out"
        mt={isOpen ? "200px" : "64px"}
        direction="column"
        alignItems="center"
      >
        {/* ここに中身 */}
        {users?.filter(
          (user) => requests?.find((request) => request.uid === user.id)?.length
        ) ? (
          users
            ?.filter((user) =>
              requests?.find((request) => request.uid === user.id)
            )
            .map((user) => (
              <>
                <HStack w="100%" spacing="16px" p="24px" boxShadow="md">
                  <Avatar
                    src={
                      user.photoURL ? user.photoURL : "/the_creators_Symbol.png"
                    }
                    w="64px"
                    h="64px"
                    alignSelf="flex-start"
                    bg="white"
                    boxShadow="md"
                  />
                  <Flex direction="column" flex={1}>
                    <Heading fontSize="24px" mb="8px">
                      {user.displayName}
                    </Heading>
                    <Labels roles={user.roles} tags={user.tags} />
                    <HStack spacing="16px" fontSize="12px" my="8px">
                      <Flex>
                        <Text mr="4px">マッチング数</Text>
                        <Text fontWeight="bold">5</Text>
                      </Flex>
                      <Flex>
                        <Text mr="4px">プロジェクト参加数</Text>
                        <Text fontWeight="bold">5</Text>
                      </Flex>
                    </HStack>
                    {isMessageOpen ? (
                      <>
                        <Text
                          mb="16px"
                          whiteSpace="pre-wrap"
                          wordBreak="break-all"
                        >
                          {
                            requests?.find((request) => request.uid === user.id)
                              .text
                          }
                        </Text>
                        <Text
                          fontSize="12px"
                          cursor="pointer"
                          onClick={() => setIsMessageOpen(false)}
                        >
                          閉じる
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          mb="16px"
                          whiteSpace="pre-wrap"
                          wordBreak="break-all"
                        >
                          {omittedContent(
                            requests?.find((request) => request.uid === user.id)
                              .text
                          )}
                        </Text>
                        <Text
                          fontSize="12px"
                          cursor="pointer"
                          onClick={() => setIsMessageOpen(true)}
                        >
                          もっと見る
                        </Text>
                      </>
                    )}
                    <Text alignSelf="flex-end" fontSize="12px">
                      {dayjs(
                        requests?.find((request) => request.uid === user.id)
                          .date
                      ).format("MMM-DD HH:mm")}
                    </Text>
                  </Flex>
                  <VStack spacing="16px" w="160px" alignSelf="flex-start">
                    <Button w="100%">フォローする</Button>
                    <Button w="100%" onClick={() => handleAddMember(user)}>
                      許可する
                    </Button>
                  </VStack>
                </HStack>
              </>
            ))
        ) : (
          <Text>現在参加申請はありません</Text>
        )}
        {!users?.filter((user) =>
          requests?.find((request) => request.uid === user.id)
        )?.length && <Text>現在参加申請はありません</Text>}
      </Flex>
    </Flex>
  );
};

export default Request;
