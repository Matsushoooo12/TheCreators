import { Flex, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdOutlineAttachFile,
  MdOutlineSpaceDashboard,
  MdOutlineStickyNote2,
} from "react-icons/md";
import { BiSearch, BiUser } from "react-icons/bi";
import { FiLogIn, FiMail } from "react-icons/fi";
import { ImPencil } from "react-icons/im";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { GiHammerNails } from "react-icons/gi";
import MenuItem from "../molecules/navbar/MenuItem";
import UserPopover from "../molecules/navbar/UserPopover";
import { AuthContext } from "../../pages/_app";
import { IoDocumentAttachOutline } from "react-icons/io5";
import {
  RiArrowGoBackFill,
  RiMailSendFill,
  RiOrganizationChart,
} from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { TbMessages } from "react-icons/tb";
import { FcTodoList } from "react-icons/fc";

const LeftSidebar = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = React.useState(false);

  const { currentUser } = React.useContext(AuthContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  console.log(currentUser);

  const homeUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const messageUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/messages`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const searchUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/search`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const notificationUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/notification`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectsUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}/projects`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const matchingUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}/matching`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const createProjectUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/new`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const profileUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}?tab=projects`
      ) != -1
    ) {
      return true;
    } else if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}?tab=skils`
      ) != -1
    ) {
      return true;
    } else if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}?tab=history`
      ) != -1
    ) {
      return true;
    } else if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}?tab=works`
      ) != -1
    ) {
      return true;
    } else if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/users/${currentUser?.uid}?tab=introduction`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const groupUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupHomeUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupDocumentUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/document`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupFileUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/file`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupRequestUrl = (url) => {
    if (
      url ===
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/request`
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupMessageUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/messages`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const projectGroupMemberUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/members`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const authUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/login`
      ) != -1 ||
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/signup`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Flex
      w={isOpen ? "230px" : "70px"}
      h="100vh"
      bg="white"
      borderRight="1px solid black"
      alignItems="flex-start"
      direction="column"
      transition="all 0.3s ease-in-out"
    >
      <Flex
        mt="20px"
        mb="56px"
        p="20px"
        w="100%"
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        alignItems="center"
        onClick={() => router.push("/")}
      >
        <Image
          alignSelf="center"
          display={isOpen ? "none" : "block"}
          w="100%"
          src="/the_creators_Symbol.png"
          alt=""
        />
        <Image
          w="100%"
          display={isOpen ? "block" : "none"}
          src="/the_creators_logo.png"
          alt=""
        />
      </Flex>
      <Flex direction="column" alignItems="flex-start" mb="40px" w="100%">
        {groupUrl(window.location.href) ? (
          <>
            <MenuItem
              isOpen={isOpen}
              text="Dashboard"
              toolTip="Dashboard"
              url={projectGroupHomeUrl(window.location.href)}
              icon={MdOutlineSpaceDashboard}
              onClick={() => router.push(`/projects/${id}/group`)}
            />
            <MenuItem
              isOpen={isOpen}
              text="File"
              toolTip="File"
              icon={MdOutlineAttachFile}
              url={projectGroupFileUrl(window.location.href)}
              onClick={() => router.push(`/projects/${id}/group/file`)}
            />
            <MenuItem
              isOpen={isOpen}
              text="Request"
              toolTip="Request"
              icon={RiMailSendFill}
              url={projectGroupRequestUrl(window.location.href)}
              onClick={() => router.push(`/projects/${id}/group/request`)}
            />
            <MenuItem
              isOpen={isOpen}
              text="Message"
              toolTip="Goup message"
              icon={TbMessages}
              url={projectGroupMessageUrl(window.location.href)}
              onClick={() => router.push(`/projects/${id}/group/messages`)}
            />
            <MenuItem
              isOpen={isOpen}
              text="Return"
              toolTip="Return to Home"
              icon={RiArrowGoBackFill}
              // url={messageUrl(window.location.href)}
              onClick={() => router.push(`/projects/${id}`)}
            />
          </>
        ) : (
          <>
            <MenuItem
              isOpen={isOpen}
              text="Home"
              toolTip="Home"
              url={homeUrl(window.location.href)}
              icon={AiOutlineHome}
              onClick={() => router.push("/")}
            />
            <MenuItem
              isOpen={isOpen}
              text="Search"
              toolTip="Search"
              icon={BiSearch}
              url={searchUrl(window.location.href)}
              onClick={() => router.push("/search?tab=projects")}
            />
            <MenuItem
              isOpen={isOpen}
              text="Notification"
              toolTip="Notification"
              icon={IoMdNotificationsOutline}
              url={notificationUrl(window.location.href)}
              // onClick={() => router.push("/notification")}
              onClick={
                currentUser?.uid
                  ? () => router.push("/notification")
                  : () => router.push(`/login`)
              }
            />
            <MenuItem
              isOpen={isOpen}
              text="Projects"
              toolTip="Projects"
              icon={MdOutlineStickyNote2}
              url={projectsUrl(window.location.href)}
              // onClick={() =>
              //   router.push(`/users/${currentUser?.uid}/projects?tab=join`)
              // }
              onClick={
                currentUser?.uid
                  ? () =>
                      router.push(
                        `/users/${currentUser?.uid}/projects?tab=join`
                      )
                  : () => router.push(`/login`)
              }
            />
            <MenuItem
              isOpen={isOpen}
              text="Users"
              toolTip="Users"
              icon={BiUser}
              url={matchingUrl(window.location.href)}
              // onClick={() =>
              //   router.push(`/users/${currentUser?.uid}/matching?tab=matching`)
              // }
              onClick={
                currentUser?.uid
                  ? () =>
                      router.push(
                        `/users/${currentUser?.uid}/matching?tab=matching`
                      )
                  : () => router.push(`/login`)
              }
            />
            <MenuItem
              isOpen={isOpen}
              text="Message"
              toolTip="Message"
              icon={FiMail}
              url={messageUrl(window.location.href)}
              // onClick={() => router.push(`/messages`)}
              onClick={
                currentUser?.uid
                  ? () => router.push(`/messages`)
                  : () => router.push(`/login`)
              }
            />
          </>
        )}
      </Flex>
      <Flex direction="column" alignItems="center" onClick={toggleNavbar}>
        <Flex p="20px" _hover={{ cursor: "pointer" }}>
          <Icon
            ml={isOpen ? "6px" : 0}
            as={isOpen ? MdArrowBackIos : MdArrowForwardIos}
            fontSize="24px"
          />
        </Flex>
      </Flex>
      <Flex direction="column" alignItems="flex-start" w="100%">
        {groupUrl(window.location.href) ? (
          <>
            <MenuItem
              isOpen={isOpen}
              text="Member"
              toolTip="Member"
              icon={GrGroup}
              url={projectGroupMemberUrl(window.location.href)}
              onClick={() => router.push(`/projects/${id}/group/members`)}
            />
          </>
        ) : (
          <>
            <MenuItem
              isOpen={isOpen}
              text="Create"
              toolTip="Create a project"
              icon={ImPencil}
              url={createProjectUrl(window.location.href)}
              // onClick={() => router.push("/projects/new")}
              onClick={
                currentUser?.uid
                  ? () => router.push("/projects/new")
                  : () => router.push("/login")
              }
            />
            {currentUser?.uid ? (
              <UserPopover
                onClick={() =>
                  router.push(`/users/${currentUser?.uid}?tab=projects`)
                }
                currentUser={currentUser}
                isOpen={isOpen}
                url={profileUrl(window.location.href)}
              />
            ) : (
              <Tooltip
                label="登録"
                display={isOpen ? "none" : "block"}
                placement="right"
              >
                <Flex
                  p="20px"
                  _hover={
                    authUrl(window.location.href)
                      ? { bg: "teal.100", cursor: "default" }
                      : { bg: "gray.100", cursor: "pointer" }
                  }
                  w="100%"
                  onClick={() => router.push("/login")}
                >
                  <Icon as={FiLogIn} fontSize="28px" />
                  <Text
                    ml="16px"
                    fontSize="20px"
                    fontWeight="bold"
                    display={isOpen ? "block" : "none"}
                  >
                    登録
                  </Text>
                </Flex>
              </Tooltip>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default LeftSidebar;
