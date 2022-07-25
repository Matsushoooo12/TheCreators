import {
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { collection, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import UserIndex from "../../../components/organisms/users/UserIndex";
import { db } from "../../../firebase/config";
import { AuthContext } from "../../_app";

const Matchings = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { id } = router.query;
  const { currentUser } = React.useContext(AuthContext);
  const [snapshot] = useCollection(collection(db, "users"));
  const users = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const tabIndex = React.useRef(0);

  const followsQuery = query(collection(db, `users/${id}/follows`));
  const [follows] = useCollectionData(followsQuery);
  const followersQuery = query(collection(db, `users/${id}/followers`));
  const [followers] = useCollectionData(followersQuery);

  console.log("id", id);

  console.log("follows", follows);

  console.log("follwers", followers);

  console.log("users", users);

  React.useEffect(() => {
    if (router.query.tab === "matching") {
      tabIndex.current = 0;
    } else if (router.query.tab === "follow") {
      tabIndex.current = 1;
    } else if (router.query.tab === "follower") {
      tabIndex.current = 2;
    }
    setLoading(false);
  }, [router.query.tab]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }
  return (
    <Tabs
      position="relative"
      h="100vh"
      w="100%"
      variant="soft-rounded"
      colorScheme="teal"
      defaultIndex={tabIndex.current}
    >
      <Flex direction="column" w="100%" alignItems="center">
        <TabList
          bg="white"
          position="absolute"
          zIndex="10"
          w="800px"
          pt="32px"
          justifyContent="flex-start"
        >
          <Tab
            onClick={() =>
              router.push({
                pathname: `/users/${id}/matching`,
                query: { tab: "matching" },
              })
            }
          >
            マッチング　
            {users?.filter(
              (user) =>
                user.id ===
                  followers?.find((follower) => follower.uid === user.id)
                    ?.uid &&
                user.id ===
                  follows?.find((follow) => follow.uid === user.id)?.uid
            )?.length
              ? users?.filter(
                  (user) =>
                    user.id ===
                      followers?.find((follower) => follower.uid === user.id)
                        ?.uid &&
                    user.id ===
                      follows?.find((follow) => follow.uid === user.id)?.uid
                )?.length
              : 0}
          </Tab>
          <Tab
            onClick={() =>
              router.push({
                pathname: `/users/${id}/matching`,
                query: { tab: "follow" },
              })
            }
          >
            フォロー　
            {users?.filter(
              (user) =>
                user.id ===
                follows?.find((follow) => follow.uid === user.id)?.uid
            )?.length
              ? users?.filter(
                  (user) =>
                    user.id ===
                    follows?.find((follow) => follow.uid === user.id)?.uid
                )?.length
              : 0}
          </Tab>
          <Tab
            onClick={() =>
              router.push({
                pathname: `/users/${id}/matching`,
                query: { tab: "follower" },
              })
            }
          >
            フォロワー　
            {users?.filter(
              (user) =>
                user.id ===
                followers?.find((follower) => follower.uid === user.id)?.uid
            )?.length
              ? users?.filter(
                  (user) =>
                    user.id ===
                    followers?.find((follower) => follower.uid === user.id)?.uid
                )?.length
              : 0}
          </Tab>
        </TabList>
      </Flex>
      <TabPanels
        h="100%"
        overflowX="scroll"
        pt="80px"
        w="100%"
        className="scrollbar-off"
      >
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users?.filter(
                (user) =>
                  user.id ===
                    followers?.find((follower) => follower.uid === user.id)
                      ?.uid &&
                  user.id ===
                    follows?.find((follow) => follow.uid === user.id)?.uid
              )?.length ? (
                <>
                  {users
                    ?.filter(
                      (user) =>
                        user.id ===
                          followers?.find(
                            (follower) => follower.uid === user.id
                          )?.uid &&
                        user.id ===
                          follows?.find((follow) => follow.uid === user.id)?.uid
                    )
                    .map((user) => (
                      <UserIndex
                        hover={{ bg: "gray.100" }}
                        currentUser={currentUser}
                        cursor="pointer"
                        key={user.id}
                        user={user}
                        id={user.id}
                        borderBottom="1px solid #ddd"
                        width="100%"
                        onClick={() =>
                          router.push(`/users/${user?.id}?tab=projects`)
                        }
                      />
                    ))}
                </>
              ) : (
                <Flex>まだ該当するユーザーがいません</Flex>
              )}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users?.filter(
                (user) =>
                  user.id ===
                  follows?.find((follow) => follow.uid === user.id)?.uid
              )?.length ? (
                <>
                  {users
                    ?.filter(
                      (user) =>
                        user.id ===
                        follows?.find((follow) => follow.uid === user.id)?.uid
                    )
                    ?.map((user) => (
                      <UserIndex
                        hover={{ bg: "gray.100" }}
                        currentUser={currentUser}
                        cursor="pointer"
                        key={user.id}
                        user={user}
                        id={user.id}
                        borderBottom="1px solid #ddd"
                        width="100%"
                        onClick={() =>
                          router.push(`/users/${user?.id}?tab=projects`)
                        }
                      />
                    ))}
                </>
              ) : (
                <Flex>まだ該当するユーザーがいません</Flex>
              )}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users?.filter(
                (user) =>
                  user.id ===
                  followers?.find((follower) => follower.uid === user.id)?.uid
              )?.length ? (
                <>
                  {users
                    ?.filter(
                      (user) =>
                        user.id ===
                        followers?.find((follower) => follower.uid === user.id)
                          ?.uid
                    )
                    ?.map((user) => (
                      <UserIndex
                        hover={{ bg: "gray.100" }}
                        currentUser={currentUser}
                        cursor="pointer"
                        key={user.id}
                        user={user}
                        id={user.id}
                        borderBottom="1px solid #ddd"
                        width="100%"
                        onClick={() =>
                          router.push(`/users/${user?.id}?tab=projects`)
                        }
                      />
                    ))}
                </>
              ) : (
                <Flex>まだ該当するユーザーがいません</Flex>
              )}
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Matchings;
