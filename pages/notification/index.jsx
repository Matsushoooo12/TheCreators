import {
  Avatar,
  Button,
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AuthContext } from "../_app";

const Notification = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    setLoading(false);
  }, []);

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
          <Tab>すべて　23</Tab>
          <Tab>プロジェクト　5</Tab>
          <Tab>ユーザー　3</Tab>
          <Tab>DM　15</Tab>
        </TabList>
      </Flex>
      <TabPanels
        h="100%"
        overflowX="scroll"
        pt="100px"
        w="100%"
        className="scrollbar-off"
      >
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px" pb="80px">
              {/* すべて内容 */}
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">1件</Text>
                    <Text>の返信を送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたへのフォローを解除しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                justifyContent="space-between"
              >
                <Flex>
                  <Avatar src="" mr="16px" alignSelf="center" />
                  <Flex direction="column" w="100%">
                    <Flex mb="8px">
                      <Text fontWeight="bold" color="teal.500">
                        松本省吾
                      </Text>
                      <Text>さんがあなたのマッチング申請を許可しました。</Text>
                    </Flex>
                    <Text fontSize="12px">Jul-23 14:07</Text>
                  </Flex>
                </Flex>
                <Button>DM</Button>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたをフォローしました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんが</Text>
                    <Text color="teal.500" fontWeight="bold">
                      Cocoda! 『電源wifiカフェがわかるアプリが欲しい!』
                    </Text>
                    <Text>
                      プロジェクトへの参加申請メッセージを送信しました。
                    </Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんが</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトをブックマークに追加しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんが</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトのメンバーに入りました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text>ブックマークしていた</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトの募集期限はあと</Text>
                    <Text fontWeight="bold" color="teal.500">
                      3日です。
                    </Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text>参加していた</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトの</Text>
                    <Text fontWeight="bold">完成作品</Text>
                    <Text>が投稿されました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {/* プロジェクト内容 */}
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんが</Text>
                    <Text color="teal.500" fontWeight="bold">
                      Cocoda! 『電源wifiカフェがわかるアプリが欲しい!』
                    </Text>
                    <Text>
                      プロジェクトへの参加申請メッセージを送信しました。
                    </Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんが</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトをブックマークに追加しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんが</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトのメンバーに入りました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text>ブックマークしていた</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトの募集期限はあと</Text>
                    <Text fontWeight="bold" color="teal.500">
                      3日です。
                    </Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px" flexWrap="wrap" w="100%">
                    <Text>参加していた</Text>
                    <Text color="teal.500" fontWeight="bold">
                      テストテストテスト
                    </Text>
                    <Text>プロジェクトの</Text>
                    <Text fontWeight="bold">完成作品</Text>
                    <Text>が投稿されました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {/* ユーザー内容 */}
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたをフォローしました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                justifyContent="space-between"
              >
                <Flex>
                  <Avatar src="" mr="16px" alignSelf="center" />
                  <Flex direction="column" w="100%">
                    <Flex mb="8px">
                      <Text fontWeight="bold" color="teal.500">
                        松本省吾
                      </Text>
                      <Text>さんがあなたのマッチング申請を許可しました。</Text>
                    </Flex>
                    <Text fontSize="12px">Jul-23 14:07</Text>
                  </Flex>
                </Flex>
                <Button>DM</Button>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたへのフォローを解除しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex w="100%" h="100%" justifyContent="center">
            <Flex w="800px" h="100%" direction="column" px="24px">
              {/* DM内容 */}
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">1件</Text>
                    <Text>の返信を送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                h="100%"
                p="32px 40px 32px"
                borderBottom="1px solid #ddd"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src="" mr="16px" alignSelf="center" />
                <Flex direction="column" w="100%">
                  <Flex mb="8px">
                    <Text fontWeight="bold" color="teal.500">
                      松本省吾
                    </Text>
                    <Text>さんがあなたのDMに</Text>
                    <Text fontWeight="bold">3件</Text>
                    <Text>のメッセージを送信しました。</Text>
                  </Flex>
                  <Text fontSize="12px">Jul-23 14:07</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Notification;
