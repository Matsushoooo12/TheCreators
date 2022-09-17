import {
  Center,
  Flex,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import ProductCard from "../../components/molecules/ProductCard";
import ProjectIndex from "../../components/organisms/projects/ProjectIndex";
import UserIndex from "../../components/organisms/users/UserIndex";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";

const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const tabIndex = React.useRef(0);

  const { currentUser } = React.useContext(AuthContext);

  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userJoinProjects = (user) => {
    return projects?.filter((project) =>
      project.members?.find((member) => member.uid === user.id)
    );
  };

  const [worksSnapshot] = useCollection(collection(db, "works"));
  const works = worksSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("projects", projects);

  React.useEffect(() => {
    if (router.query.tab === "projects") {
      tabIndex.current = 0;
    } else if (router.query.tab === "users") {
      tabIndex.current = 1;
    } else if (router.query.tab === "works") {
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
      colorScheme="teal"
      variant="soft-rounded"
      h="100vh"
      w="100%"
      defaultIndex={tabIndex.current}
    >
      <Flex direction="column" w="100%" alignItems="center">
        <TabList
          bg="white"
          position="absolute"
          zIndex="10"
          w="800px"
          pt="40px"
          justifyContent="space-between"
        >
          <Flex>
            <Tab
              onClick={() =>
                router.push("?tab=projects", undefined, { shallow: true })
              }
            >
              プロジェクト
            </Tab>
            <Tab
              onClick={() =>
                router.push("?tab=users", undefined, { shallow: true })
              }
            >
              ユーザー
            </Tab>
            <Tab
              onClick={() =>
                router.push("?tab=works", undefined, { shallow: true })
              }
            >
              作品
            </Tab>
          </Flex>
          <HStack fontSize="12px" spacing="16px" alignItems="center">
            <Text cursor="pointer">並び替え</Text>
            <Text cursor="pointer">絞り込み</Text>
          </HStack>
        </TabList>
      </Flex>
      <TabPanels
        h="100%"
        overflowX="scroll"
        pt="80px"
        w="100%"
        className="scrollbar-off"
        pb="80px"
      >
        <TabPanel>
          {/* project一覧 */}
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {projects?.map((project) => (
                <ProjectIndex
                  currentUser={currentUser}
                  key={project.id}
                  project={project}
                  onClick={() => router.push(`/projects/${project.id}`)}
                />
              ))}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          {/* user一覧 */}
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {users?.map((user) => (
                <UserIndex
                  hover={{ bg: "gray.100" }}
                  currentUser={currentUser}
                  userJoinProjects={userJoinProjects(user)}
                  cursor="pointer"
                  key={user.id}
                  user={user}
                  id={user.id}
                  borderBottom="1px solid #ddd"
                  width="100%"
                  onClick={() => router.push(`/users/${user?.id}?tab=projects`)}
                />
              ))}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          {/* works一覧 */}
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              <Flex flexWrap="wrap">
                {works?.map((work) => (
                  <ProductCard
                    key={work.id}
                    width="230px"
                    mr="16px"
                    mb="16px"
                    uid={work.user.uid}
                    title={work.title}
                    thumbnail={work.thumbnail}
                    photoURL={work.user.photoURL}
                    displayName={work.user.displayName}
                    date={work.date}
                    onClick={() => router.push(`/works/${work.id}`)}
                    tags={work.tags}
                    roles={work.roles}
                    likeUsers={work.likeUsers}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Search;
