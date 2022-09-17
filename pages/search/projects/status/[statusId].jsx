import {
  Flex,
  HStack,
  Icon,
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
import { useCollection } from "react-firebase-hooks/firestore";
import { BiCodeBlock } from "react-icons/bi";
import { GiPalette } from "react-icons/gi";
import { MdAnimation, MdOutlineOndemandVideo } from "react-icons/md";
import { Tb3DCubeSphere, TbBulb, TbWritingSign } from "react-icons/tb";
import ProjectIndex from "../../../../components/organisms/projects/ProjectIndex";
import UserIndex from "../../../../components/organisms/users/UserIndex";
import { db } from "../../../../firebase/config";
import { AuthContext } from "../../../_app";

const Status = () => {
  const router = useRouter();
  const { statusId } = router.query;
  const [loading, setLoading] = React.useState(true);
  const tabIndex = React.useRef(0);
  const { currentUser } = React.useContext(AuthContext);

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

  const suggestProjects = projects?.filter(
    (project) => project.status === statusId
  );

  console.log("status", suggestProjects);

  const divideIcon = (statusId) => {
    if (statusId === "エンジニア") {
      return BiCodeBlock;
    } else if (statusId === "デザイナー") {
      return GiPalette;
    } else if (statusId === "ライター") {
      return TbWritingSign;
    } else if (statusId === "動画編集者") {
      return MdOutlineOndemandVideo;
    } else if (statusId === "プランナー") {
      return TbBulb;
    } else if (statusId === "3DCGモデラー") {
      return Tb3DCubeSphere;
    } else if (statusId === "アニメーター") {
      return MdAnimation;
    }
  };
  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      alignItems="center"
      pb="80px"
      zIndex="5"
    >
      <Tabs
        // defaultIndex={tabIndex.current}
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
          h="200px"
          bg="white"
          position="absolute"
          top="0"
          pt="32px"
          justifyContent="center"
          zIndex="2"
        >
          <Flex
            w="800px"
            h="100%"
            p="32px 16px 32px"
            justifyContent="center"
            direction="column"
          >
            <Flex alignItems="center" mb="16px">
              {/* <Icon as={divideIcon(specialtyId)} w="80px" h="80px" mr="24px" /> */}
              <Text fontWeight="bold" fontSize="32px">
                {statusId}
              </Text>
            </Flex>
            <HStack spacing="24px">
              <Flex>
                <Text mr="8px">プロジェクト数</Text>
                <Text fontWeight="bold">
                  {suggestProjects?.length ? suggestProjects?.length : 0}
                </Text>
              </Flex>
            </HStack>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          bg="white"
          position="absolute"
          top="200px"
          left="0"
          direction="column"
          alignItems="center"
          zIndex="2"
        >
          <Flex w="800px">
            <TabList>
              <Tab>プロジェクト</Tab>
            </TabList>
          </Flex>
        </Flex>
        <Flex w="100%" h="100%" overflowX="scroll" direction="column">
          <TabPanels w="800px" h="100%" mt="240px" zIndex="1">
            <TabPanel w="100%" h="100%">
              <Flex w="100%" h="100%" justifyContent="center">
                <Flex w="800px" h="100%" direction="column" px="24px">
                  {suggestProjects?.length ? (
                    <>
                      {suggestProjects?.map((project) => (
                        <ProjectIndex
                          currentUser={currentUser}
                          key={project.id}
                          project={project}
                          onClick={() => router.push(`/projects/${project.id}`)}
                        />
                      ))}
                    </>
                  ) : (
                    <Text>まだプロジェクトがありません</Text>
                  )}
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
};

export default Status;
