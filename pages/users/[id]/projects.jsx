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
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ProjectIndex from "../../../components/organisms/projects/ProjectIndex";
import { db } from "../../../firebase/config";
import { AuthContext } from "../../_app";

const Projects = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = React.useState(true);
  const { currentUser } = React.useContext(AuthContext);
  const [snapshot] = useCollection(collection(db, "projects"));
  const projects = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("projects", projects);

  const tabIndex = React.useRef(0);

  React.useEffect(() => {
    if (router.query.tab === "join") {
      tabIndex.current = 0;
    } else if (router.query.tab === "create") {
      tabIndex.current = 1;
    } else if (router.query.tab === "bookmark") {
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
                pathname: `/users/${id}/projects`,
                query: { tab: "join" },
              })
            }
          >
            参加プロジェクト　
            {projects?.filter((project) =>
              project.members?.find((member) => member.uid === currentUser?.uid)
            ).length
              ? projects?.filter((project) =>
                  project.members?.find(
                    (member) => member.uid === currentUser?.uid
                  )
                ).length
              : 0}
          </Tab>
          <Tab
            onClick={() =>
              router.push({
                pathname: `/users/${id}/projects`,
                query: { tab: "create" },
              })
            }
          >
            作成プロジェクト　
            {projects?.filter(
              (project) => project.user.uid === currentUser?.uid
            )?.length
              ? projects?.filter(
                  (project) => project.user.uid === currentUser?.uid
                )?.length
              : 0}
          </Tab>
          <Tab
            onClick={() =>
              router.push({
                pathname: `/users/${id}/projects`,
                query: { tab: "bookmark" },
              })
            }
          >
            ブックマーク　
            {projects?.filter((project) =>
              project.likeUsers?.includes(currentUser?.uid)
            )?.length
              ? projects?.filter((project) =>
                  project.likeUsers?.includes(currentUser?.uid)
                ).length
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
              {projects?.filter((project) =>
                project.members?.find(
                  (member) => member.uid === currentUser?.uid
                )
              ).length ? (
                <>
                  {projects
                    ?.filter((project) =>
                      project.members?.find(
                        (member) => member.uid === currentUser?.uid
                      )
                    )
                    .map((project) => (
                      <ProjectIndex
                        key={project.id}
                        onClick={() => router.push(`/projects/${project.id}`)}
                        project={project}
                        currentUser={currentUser}
                      />
                    ))}
                </>
              ) : (
                <Flex>まだ該当するプロジェクトがありません</Flex>
              )}
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              <>
                {projects?.filter(
                  (project) => project.user.uid === currentUser?.uid
                )?.length ? (
                  <>
                    {projects
                      ?.filter(
                        (project) => project.user.uid === currentUser?.uid
                      )
                      ?.map((project) => (
                        <ProjectIndex
                          key={project.id}
                          onClick={() => router.push(`/projects/${project.id}`)}
                          project={project}
                          currentUser={currentUser}
                        />
                      ))}
                  </>
                ) : (
                  <Flex>まだ該当するプロジェクトがありません</Flex>
                )}
              </>
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {projects?.filter((project) =>
                project.likeUsers?.includes(currentUser?.uid)
              )?.length ? (
                <>
                  {projects
                    ?.filter((project) =>
                      project.likeUsers?.includes(currentUser?.uid)
                    )
                    ?.map((project) => (
                      <ProjectIndex
                        key={project.id}
                        onClick={() => router.push(`/projects/${project.id}`)}
                        project={project}
                        currentUser={currentUser}
                      />
                    ))}
                </>
              ) : (
                <Flex>まだ該当するプロジェクトがありません</Flex>
              )}
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Projects;
