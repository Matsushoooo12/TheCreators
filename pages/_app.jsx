import React from "react";
import "../styles/globals.css";
import { Center, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import MainContainer from "../components/templates/MainContainer";
import LeftSidebar from "../components/templates/LeftSidebar";
import RightSidebar from "../components/templates/RightSidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useScroll } from "../hooks/useScroll";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import MessageListBar from "../components/templates/MessageList";
import ProjectGroupMessageList from "../components/templates/ProjectGroupMessageList";

export const AuthContext = React.createContext({});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // 目次
  // project
  const [moveTo] = useScroll();
  const summaryRef = React.useRef(null);
  const memberRef = React.useRef(null);
  const whatRef = React.useRef(null);
  const whyRef = React.useRef(null);
  const howRef = React.useRef(null);
  const hopeRef = React.useRef(null);
  const goalRef = React.useRef(null);

  const summaryScroll = () => {
    moveTo(summaryRef);
  };

  const memberScroll = () => {
    moveTo(memberRef);
  };
  const whatScroll = () => {
    moveTo(whatRef);
  };
  const whyScroll = () => {
    moveTo(whyRef);
  };
  const howScroll = () => {
    moveTo(howRef);
  };
  const hopeScroll = () => {
    moveTo(hopeRef);
  };
  const goalScroll = () => {
    moveTo(goalRef);
  };
  // works
  const currentRef = React.useRef(null);
  const currentScroll = () => {
    moveTo(currentRef);
  };
  const topRef = React.useRef(null);
  const topScroll = () => {
    moveTo(topRef);
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

  const projectGroupTodoUrl = (url) => {
    if (
      url.indexOf(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/projects/${id}/group/todo`
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner />
        </Center>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <AuthContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          loading,
          setLoading,
          summaryScroll,
          summaryRef,
          memberScroll,
          memberRef,
          whatScroll,
          whatRef,
          whyScroll,
          whyRef,
          howScroll,
          howRef,
          hopeScroll,
          hopeRef,
          goalScroll,
          goalRef,
          currentScroll,
          currentRef,
          topScroll,
          topRef,
        }}
      >
        {!authUrl(window.location.href) ? (
          <Flex>
            <LeftSidebar />
            <MainContainer>
              {messageUrl(window.location.href) ? (
                <Flex w="100%">
                  <MessageListBar />
                  <Flex flex={1} h="100vh" minW="560px">
                    <Component {...pageProps} />
                  </Flex>
                </Flex>
              ) : (
                <>
                  {projectGroupMessageUrl(window.location.href) ? (
                    <Flex w="100%">
                      <ProjectGroupMessageList />
                      <Flex flex={1} h="100vh" minW="560px">
                        <Component {...pageProps} />
                      </Flex>
                    </Flex>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </>
              )}
            </MainContainer>
            <RightSidebar />
          </Flex>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
