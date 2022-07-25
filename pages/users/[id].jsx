import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc, query, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { FiMail } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { db } from "../../firebase/config";
import { AuthContext } from "../_app";
import { FaPen } from "react-icons/fa";
import UserIndex from "../../components/organisms/users/UserIndex";
import SkilIndex from "../../components/organisms/users/SkilIndex";
import SkilModal from "../../components/molecules/users/SkilModal";
import HistoryIndex from "../../components/organisms/users/HistoryIndex";
import HistoryModal from "../../components/molecules/users/HistoryModal";
import WorksIndex from "../../components/organisms/users/WorksIndex";
import IntroductionIndex from "../../components/organisms/users/IntroductionIndex";
import IntroductionModal from "../../components/molecules/users/IntroductionModal";
import ProjectIndex from "../../components/organisms/projects/ProjectIndex";
import { BsFillPinFill } from "react-icons/bs";
import ProjectPinnedModal from "../../components/molecules/users/ProjectPinnedModal";
import dayjs from "dayjs";

const DetailUser = () => {
  const router = useRouter();
  const { id } = router.query;
  // const followsQuery = query(collection(db, `users/${id}/follows`));
  // const [follows] = useCollectionData(followsQuery);
  // const followersQuery = query(collection(db, `users/${id}/followers`));
  // const [followers] = useCollectionData(followersQuery);
  const { currentUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const user = users?.find((user) => user.id === id);
  const profileUser = users?.find((user) => user.id === currentUser?.uid);
  console.log("profileUser", profileUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tabIndex = React.useRef(0);

  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userAllProjects = projects?.filter(
    (project) => project.user.uid === id
  );

  const userNotPinnedProjects = projects?.filter(
    (project) => project.user.uid === id && project.id !== user?.pinnedProjectId
  );

  const userPinnedProject = projects?.find(
    (project) => project.id === user?.pinnedProjectId
  );

  const userJoinProjects = projects?.filter((project) =>
    project.members?.find((member) => member.uid === currentUser?.uid)
  );

  console.log("ggg", userAllProjects);

  React.useEffect(() => {
    if (router.query.tab === "projects") {
      tabIndex.current = 0;
    } else if (router.query.tab === "skils") {
      tabIndex.current = 1;
    } else if (router.query.tab === "history") {
      tabIndex.current = 2;
    } else if (router.query.tab === "works") {
      tabIndex.current = 3;
    } else if (router.query.tab === "introduction") {
      tabIndex.current = 4;
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

  const projectsUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=projects`
    ) {
      return true;
    }
  };

  const skilsUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=skils`
    ) {
      return true;
    }
  };
  const historyUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=history`
    ) {
      return true;
    }
  };
  const introductionUrl = () => {
    if (
      window.location.href ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${id}?tab=introduction`
    ) {
      return true;
    }
  };

  console.log("tabIndex", tabIndex.current);

  return (
    <>
      <Flex
        h="100%"
        w="100%"
        direction="column"
        alignItems="center"
        pb="80px"
        zIndex="5"
      >
        <Tabs
          defaultIndex={tabIndex.current}
          h="100vh"
          w="100%"
          colorScheme="teal"
          variant="soft-rounded"
          position="relative"
          top="0"
          justifyContent="center"
        >
          <Flex
            w="100%"
            h="260px"
            bg="white"
            position="absolute"
            top="0"
            pt="32px"
            justifyContent="center"
            zIndex="2"
          >
            <UserIndex
              profileUser={profileUser}
              id={id}
              currentUser={currentUser}
              width="800px"
              user={user}
              borderBottom="none"
              userJoinProjects={userJoinProjects}
            />
          </Flex>
          <Flex
            w="100%"
            bg="white"
            position="absolute"
            top="260px"
            left="0"
            direction="column"
            alignItems="center"
            zIndex="2"
          >
            <Flex w="800px">
              <TabList>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=projects`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  参加プロジェクト
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=skils`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  スキル
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=history`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  経歴
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=works`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  作品
                </Tab>
                <Tab
                  onClick={() =>
                    router.push(`${id}/?tab=introduction`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  自己紹介
                </Tab>
              </TabList>
            </Flex>
          </Flex>
          <Flex w="100%" h="100%" overflowX="scroll" direction="column">
            <TabPanels w="800px" h="100%" mt="320px" zIndex="1">
              <TabPanel w="100%" h="100%">
                <Flex
                  w="100%"
                  h="100%"
                  bg="white"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Flex w="800px" flexWrap="wrap" pb="80px">
                    {userAllProjects?.length ? (
                      <>
                        {userPinnedProject ? (
                          <>
                            <Flex mb="8px" color="gray.500" alignItems="center">
                              <Icon as={BsFillPinFill} mr="8px" />
                              {currentUser?.uid === id ? (
                                <Text cursor="pointer" onClick={onOpen}>
                                  Pinned Project
                                </Text>
                              ) : (
                                <Text>Pinned Project</Text>
                              )}
                            </Flex>

                            <ProjectIndex
                              currentUser={currentUser}
                              bg="gray.100"
                              project={userPinnedProject}
                              onClick={() =>
                                router.push(
                                  `/projects/${userPinnedProject?.id}`
                                )
                              }
                            />
                          </>
                        ) : (
                          <>
                            <Flex
                              mb="8px"
                              color="gray.500"
                              alignItems="center"
                              cursor="pointer"
                            >
                              <Icon as={BsFillPinFill} mr="8px" />
                              <Text onClick={onOpen}>Add Pinned Project</Text>
                            </Flex>
                          </>
                        )}
                      </>
                    ) : (
                      <Flex mb="8px" alignItems="center" cursor="pointer">
                        <Text>まだプロジェクトがありません</Text>
                      </Flex>
                    )}

                    {userNotPinnedProjects?.map((userProject) => (
                      <ProjectIndex
                        currentUser={currentUser}
                        key={userProject.id}
                        project={userProject}
                        onClick={() =>
                          router.push(`/projects/${userProject.id}`)
                        }
                      />
                    ))}
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex
                  w="100%"
                  h="100%"
                  bg="white"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Flex w="800px" flexWrap="wrap">
                    <SkilIndex
                      currentUser={currentUser}
                      id={id}
                      skils={user?.skils}
                      onOpen={onOpen}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex w="100%" h="100%" bg="white">
                  <Flex w="100%" h="100%" justifyContent="center">
                    <HistoryIndex
                      currentUser={currentUser}
                      id={id}
                      history={user?.history}
                      onOpen={onOpen}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex
                  w="100%"
                  h="100%"
                  bg="white"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Flex w="800px" flexWrap="wrap" pb="80px">
                    <WorksIndex currentUser={currentUser} id={id} />
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel w="100%" h="100%">
                <Flex w="100%" h="100%" bg="white">
                  <Flex w="100%" h="100%" justifyContent="center">
                    <IntroductionIndex
                      introductions={user?.introductions}
                      currentUser={currentUser}
                      id={id}
                      onOpen={onOpen}
                    />
                  </Flex>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Flex>
        </Tabs>
      </Flex>
      {projectsUrl() && (
        <ProjectPinnedModal
          userPinnedProject={userPinnedProject}
          userAllProjects={userAllProjects}
          isOpen={isOpen}
          onClose={onClose}
          id={id}
        />
      )}
      {skilsUrl() && (
        <SkilModal user={user} id={id} isOpen={isOpen} onClose={onClose} />
      )}
      {historyUrl() && (
        <HistoryModal user={user} id={id} isOpen={isOpen} onClose={onClose} />
      )}
      {introductionUrl() && (
        <IntroductionModal
          user={user}
          id={id}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default DetailUser;
