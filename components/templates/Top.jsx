import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AuthContext } from "../../pages/_app";
import ProductCard from "../molecules/ProductCard";

const Top = () => {
  const router = useRouter();
  return (
    <>
      <HStack
        spacing="24px"
        //   w="100%"
        //   h="100%"
        p="80px"
        bg="white"
        boxShadow="md"
        justifyContent="center"
      >
        <Flex direction="column" alignItems="flex-start">
          <Image
            h="85px"
            w="300px"
            objectFit="cover"
            src="/the_creators_logo.png"
          />
          <Heading fontSize="28px" mb="8px" w="400px">
            あなたの作りたいを現実に
          </Heading>
          <Text fontWeight="bold" mb="16px">
            繋がりたいクリエイターと協力してものづくりができる
          </Text>
          <Button
            bg="teal.500"
            color="white"
            onClick={() => router.push("/signup")}
          >
            はじめる
          </Button>
        </Flex>
        <Image h="320px" src="/about-image.svg" />
      </HStack>
      <Flex w="100%" h="100%" justifyContent="center">
        <Flex w="800px" h="100%" direction="column">
          <Heading fontSize="24px" alignSelf="center" pb="40px" pt="80px">
            こんなケースで使われています。
          </Heading>
          <VStack spacing={8}>
            <Flex justify="center" width="100%" height="100%" align="center">
              <HStack spacing={4}>
                <Box>
                  <VStack spacing={4}>
                    <Text fontSize="24px" color="teal">
                      「創りたいものがあるけど、自分ひとりじゃ難しい。」
                    </Text>
                    <UnorderedList fontSize="16px">
                      <ListItem>
                        「この企画を作るにはデザイナーが必要・エンジニアが必要」
                      </ListItem>
                      <ListItem>
                        「自分の専門ではない人と繋がって一緒にものづくりがしたい」
                      </ListItem>
                      <ListItem>
                        「いいアイデアが思いついたのに形にする方法がわからない」
                      </ListItem>
                      <ListItem>
                        「ものづくりの中で自分の領域でない部分を、専門にしている人に手伝ってほしい」
                      </ListItem>
                    </UnorderedList>
                    <Text fontSize="14px">
                      人によって創りたいものの規模や目標は様々です。「創りたいものはあっても自分ひとりでは創れない。でも一緒に創ってくれる人や、自分の領域以外の分野で知り合いがいない。」という人が多くいます。
                      そんなときに、この「The
                      Creators」を使うことで一緒にアイデアを形にする仲間を見つけることができます。
                    </Text>
                  </VStack>
                </Box>
                <Box>
                  <Box width="312px" height="362px" p="16px">
                    <ProductCard w="250px" />
                  </Box>
                </Box>
              </HStack>
            </Flex>
            <Flex justify="center" width="100%" height="100%" align="center">
              <HStack spacing={4}>
                <Box>
                  <Box width="312px" height="362px" p="16px">
                    <ProductCard w="250px" />
                  </Box>
                </Box>
                <Box>
                  <VStack spacing={4}>
                    <Text fontSize="24px" color="teal">
                      「自分の専門・専門外のクリエイターと繋がりたい。」
                    </Text>
                    <UnorderedList fontSize="16px">
                      <ListItem>
                        「自分が専攻している分野で知り合いが少ないから知り合いたい」
                      </ListItem>
                      <ListItem>
                        「専門外の人と知り合って、気が合う人と後にものづくりをしたい」
                      </ListItem>
                      <ListItem>
                        「アイデアを一緒に形にする共同創業者を見つけて起業したい」
                      </ListItem>
                      <ListItem>
                        「クリエイターのコミュニティーを作りたい」
                      </ListItem>
                    </UnorderedList>
                    <Text fontSize="14px" width="600px">
                      自分が勉強している領域で知り合いが少なくて、切磋琢磨したいと思っているクリエイターはたくさんいます。
                      また、今後ものづくりをするときに他の領域の技術が必要だけど、知り合いがいないと悩んでいる人も多くいます。
                      そんなときに、この「The
                      Creators」を使うことで一緒にものづくりをしたいクリエイターを探して繋がることができます。
                    </Text>
                  </VStack>
                </Box>
              </HStack>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Top;
