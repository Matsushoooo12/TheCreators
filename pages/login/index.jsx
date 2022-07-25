import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { auth, db, googleProvider } from "../../firebase/config";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const now = dayjs().format();
  const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider).then(async (res) => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.id);
      });
      if (!user.includes(res.user.uid)) {
        await setDoc(doc(db, "users", res.user.uid), {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          createdAt: now,
        }).then(() => router.push("/signup/first-query"));
      } else {
        router.push("/");
      }
    });
  };

  const EmailLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickHome = () => {
    router.push("/");
  };
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Flex mb="30px">
        <Icon
          color="teal.600"
          as={BiArrowBack}
          alignSelf="center"
          mr="16px"
          fontSize="24px"
          cursor="pointer"
          onClick={() => router.push("/")}
        />
        <Heading fontSize="40px" color="teal.600" mr="8px" alignSelf="center">
          Welcom Back
        </Heading>
        <Image
          alt=""
          onClick={onClickHome}
          cursor="pointer"
          // w="200px"
          h="80px"
          // bg="teal.100"
          src="/the_creators_logo.png"
        />
      </Flex>
      <Flex
        direction="column"
        w="392px"
        boxShadow="2xl"
        p="24px"
        borderRadius="md"
      >
        <InputGroup as="form" w="100%">
          <Box w="100%">
            <Flex direction="column" mb="16px">
              <Text fontWeight="500" mb="8px">
                Email
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please type your email."
                borderRadius="md"
              />
            </Flex>
            <Flex direction="column" mb="16px">
              <Text fontWeight="500" mb="8px">
                password
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please type your password."
                borderRadius="md"
              />
            </Flex>
            <Button
              _hover={{ bg: "teal.400" }}
              w="100%"
              bg="teal.500"
              color="white"
              mb="24px"
              type="submit"
              onClick={EmailLogin}
            >
              ログイン
            </Button>
            <Flex justifyContent="space-around" mb="48px">
              <Text>or sign up with</Text>
              <HStack spacing="16px">
                <Image
                  onClick={googleLogin}
                  src="/google-icon.svg"
                  w="24px"
                  h="24px"
                  alt="google"
                  cursor="pointer"
                />
                <Image
                  src="/twitter-icon.svg"
                  w="24px"
                  h="24px"
                  alt="twitter"
                />
                <Image
                  src="/facebook-icon.svg"
                  w="24px"
                  h="24px"
                  alt="facebook"
                />
                <Image src="/github-icon.svg" w="24px" h="24px" alt="github" />
              </HStack>
            </Flex>
            <Flex justifyContent="space-around" color="teal.500">
              <Text color="black">Dont`t have an account?</Text>
              <Link href="/signup">
                <a style={{ fontWeight: "bold" }}>Sign up</a>
              </Link>
            </Flex>
          </Box>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default Login;
