import { Flex, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { collection, doc, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { BiUser } from "react-icons/bi";
import { BsFillPinFill } from "react-icons/bs";
import { HiBookOpen } from "react-icons/hi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { db } from "../../firebase/config";
import { AuthContext } from "../../pages/_app";
import PrimaryFind from "../atoms/PrimaryFind";
import ProductCard from "../molecules/ProductCard";
import SpecialtyIcons from "../molecules/SpecialtyIcons";
import TagIcons from "../molecules/TagIcons";
import ProjectPinnedModal from "../molecules/users/ProjectPinnedModal";
import UserInfoCard from "../molecules/users/UserInfoCard";
import DashboardItemContainer from "../organisms/DashboardItemContainer";
import ProjectIndex from "../organisms/projects/ProjectIndex";
import dayjs from "dayjs";

const Dashboard = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = React.useContext(AuthContext);
  const [user] = useDocumentData(doc(db, "users", currentUser?.uid));

  const followsQuery = query(
    collection(db, `users/${currentUser?.uid}/follows`)
  );
  const [follows] = useCollectionData(followsQuery);
  const followersQuery = query(
    collection(db, `users/${currentUser?.uid}/followers`)
  );
  const [followers] = useCollectionData(followersQuery);
  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const userPinnedProject = projects?.find(
    (project) => project.id === user?.pinnedProjectId
  );
  const userAllProjects = projects?.filter(
    (project) => project.user.uid === currentUser?.uid
  );

  const userJoinProjects = projects?.filter((project) =>
    project.members?.find((member) => member.uid === currentUser?.uid)
  );

  const likeProjects = projects?.filter((project) =>
    project.likeUsers?.includes(currentUser?.uid)
  );

  console.log("likeProject", likeProjects);

  const [worksSnapshot] = useCollection(collection(db, "works"));
  const works = worksSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userWorks = works?.filter((work) => work.user.uid === currentUser?.uid);

  return (
    <>
      <UserInfoCard
        userAllProjects={userAllProjects}
        userJoinProjectsNumber={userJoinProjects?.length}
        displayName={user?.displayName}
        photoURL={user?.photoURL}
        profileUrl={() => router.push(`/users/${currentUser?.uid}`)}
        userWorksNumber={userWorks?.length}
        follows={follows}
        followers={followers}
        currentUser={currentUser}
      />
      <Flex direction="column" mb="16px">
        {userAllProjects?.length ? (
          <>
            {userPinnedProject ? (
              <>
                <Flex
                  mb="8px"
                  color="gray.500"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Icon as={BsFillPinFill} mr="8px" />
                  <Text onClick={onOpen}>Pinned Project</Text>
                </Flex>

                <ProjectIndex
                  currentUser={currentUser}
                  bg="gray.100"
                  onClick={() =>
                    router.push(`/projects/${userPinnedProject?.id}`)
                  }
                  project={userPinnedProject}
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
          <></>
        )}
      </Flex>
      <DashboardItemContainer
        title="最近ブックマークしたプロジェクト"
        mb="56px"
      >
        <HStack spacing="24px">
          {likeProjects?.slice(-3).map((project) => (
            <ProductCard
              key={project.id}
              width="250px"
              mr="0"
              mb="0"
              title={project.title}
              photoURL={project.user.photoURL}
              displayName={project.user.displayName}
              date={`~ ${dayjs(project.deadline).format("YYYY/MM/DD")}`}
              onClick={() => router.push(`/projects/${project.id}`)}
              roles={project.roles.slice(0, 1)}
              tags={project.tags.slice(0, 1)}
              likeUsers={project.likeUsers}
              uid={project.user.uid}
            />
          ))}
        </HStack>
      </DashboardItemContainer>
      <HStack spacing="32px" mb="32px">
        <PrimaryFind
          title="プロジェクトを探す"
          text="200プロジェクト"
          icon={MdOutlineStickyNote2}
          color="blue.100"
          onClick={() => router.push("/search?tab=projects")}
        />
        <PrimaryFind
          title="クリエイターを探す"
          text="500ユーザー"
          icon={BiUser}
          color="red.100"
          onClick={() => router.push("/search?tab=users")}
        />
        <PrimaryFind
          title="作品を見る"
          text="300作品"
          icon={HiBookOpen}
          color="yellow.100"
          onClick={() => router.push("/search?tab=works")}
        />
      </HStack>
      <DashboardItemContainer title="専門で絞る" mb="32px">
        <SpecialtyIcons />
      </DashboardItemContainer>
      <DashboardItemContainer title="おすすめのタグで絞る" mb="32px">
        <TagIcons />
      </DashboardItemContainer>
      <ProjectPinnedModal
        userPinnedProject={userPinnedProject}
        isOpen={isOpen}
        onClose={onClose}
        id={currentUser?.uid}
        userAllProjects={userAllProjects}
      />
    </>
  );
};

export default Dashboard;
