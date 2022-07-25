import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import dayjs from "dayjs";
import { BsBuilding } from "react-icons/bs";
import { IoIosSchool } from "react-icons/io";
import { FaPen } from "react-icons/fa";

const HistoryIndex = (props) => {
  const { currentUser, id, history, onOpen } = props;
  const dayjsFormat = (d) => {
    const day = dayjs(d);
    return day.format("YYYY/MM/DD");
  };
  console.log("history", history?.slice(-1)[0]);
  return (
    <Flex w="800px" alignItems="center" direction="column">
      {currentUser?.uid === id && (
        <Flex alignItems="flex-start" pb="24px" position="relative">
          <Flex alignItems="center">
            <Flex direction="column" fontSize="14px" mr="16px" w="73px">
              <Text color="gray.500" fontSize="14px" mr="16px"></Text>
              <Text color="gray.500" fontSize="14px">
                年 / 月 / 日
              </Text>
              <Text color="gray.500" fontSize="14px" mr="16px"></Text>
            </Flex>
            <Flex direction="column" zIndex="2">
              <Flex
                w="48px"
                h="48px"
                bg="gray.100"
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
                mr="16px"
                cursor="pointer"
                onClick={onOpen}
                _hover={{ bg: "gray.300" }}
              >
                <Icon as={AiOutlinePlus} fontSize="28px" />
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" w="600px">
            <Heading fontSize="20px" mt="10px">
              新しい職歴・学歴を追加
            </Heading>
          </Flex>
        </Flex>
      )}
      {currentUser?.uid !== id && (
        <>
          {!history && <Flex alignSelf="flex-start">まだ経歴はありません</Flex>}
        </>
      )}
      {history?.map((h) => (
        <Flex
          key={Math.random()}
          alignItems="flex-start"
          pb="40px"
          position="relative"
        >
          {h === history?.slice(-1)[0] ? (
            <></>
          ) : (
            <Box
              w="5px"
              h="100%"
              bg="gray.300"
              position="absolute"
              top="0"
              left="120px"
              zIndex="1"
            />
          )}
          <Flex alignItems="center">
            <Flex direction="column">
              <Text color="gray.500" fontSize="14px" mr="16px">
                {dayjsFormat(h.startTime)}
              </Text>
              <Text color="gray.500" fontSize="14px">
                ~
              </Text>
              <Text color="gray.500" fontSize="14px" mr="16px">
                {h.endTime ? <>{dayjsFormat(h.endTime)}</> : <>現在</>}
              </Text>
            </Flex>
            <Flex direction="column" zIndex="2">
              <Flex
                w="64px"
                h="64px"
                bg="gray.300"
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
                mr="16px"
              >
                {h.category === "1" && <Icon as={BsBuilding} fontSize="28px" />}
                {h.category === "2" && (
                  <Icon as={IoIosSchool} fontSize="28px" />
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <Flex direction="column" w="600px">
              <Flex justifyContent="space-between">
                <Flex direction="column">
                  <Heading fontSize="24px">{h.title}</Heading>
                  <Text fontWeight="bold" fontSize="14px" mb="24px">
                    {h.subTitle}
                  </Text>
                </Flex>
                {currentUser?.uid === id && (
                  <Icon as={FaPen} cursor="pointer" alignSelf="flex-start" />
                )}
              </Flex>
              <Text mb="16px">{h.content}</Text>
              <Image
                objectFit="cover"
                src={h.image}
                w="70%"
                h="280px"
                bg="gray.300"
                alt=""
              />
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default HistoryIndex;
