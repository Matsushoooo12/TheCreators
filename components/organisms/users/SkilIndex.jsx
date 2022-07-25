import { Center, Flex, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DoughnutItem from "../../molecules/users/DoughnutItem";
import { AiFillCheckCircle } from "react-icons/ai";

const SkilIndex = (props) => {
  const { currentUser, id, skils, onOpen } = props;

  const omittedContent = (string) => {
    // 定数で宣言
    const MAX_LENGTH = 10;

    // もしstringの文字数がMAX_LENGTH（今回は10）より大きかったら末尾に...を付け足して返す。
    if (string.length > MAX_LENGTH) {
      // substr(何文字目からスタートするか, 最大値);
      return string.substr(0, MAX_LENGTH) + "...";
    }
    //　文字数がオーバーしていなければそのまま返す
    return string;
  };

  const backgroundColor = "#D9D9D9";

  const percentage1 = 25;

  const data1 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage1, 100 - percentage1],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "90%",
      },
    ],
    labels: ["Ruby"],
  };

  const percentage2 = 50;

  const data2 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage2, 100 - percentage2],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "90%",
      },
    ],
  };

  const percentage3 = 75;
  const data3 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage3, 100 - percentage3],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "90%",
      },
    ],
  };

  const percentage4 = 100;
  const data4 = {
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage4, 100 - percentage4],
        backgroundColor: [backgroundColor, "white"],
        borderColor: "white",
        hoverOffset: 0,
        cutout: "90%",
      },
    ],
  };

  const skilChartDisplay = (level) => {
    if (level === "1") {
      return {
        data: data1,
        lavel: "初心者",
      };
    } else if (level === "2") {
      return {
        data: data2,
        lavel: "中級者",
      };
    } else if (level === "3") {
      return {
        data: data3,
        lavel: "上級者",
      };
    } else if (level === "4") {
      return {
        data: data4,
        lavel: "達人",
      };
    }
  };
  return (
    <>
      {/* plus */}
      {currentUser?.uid === id && (
        <Center
          mr="16px"
          mb="16px"
          w="140px"
          h="176px"
          bg="gray.100"
          p="8px"
          direction="column"
          alignItems="center"
          border="1px solid black"
          borderColor="gray.200"
          borderRadius="lg"
          boxShadow="md"
          onClick={onOpen}
          cursor="pointer"
          _hover={{ bg: "gray.300" }}
        >
          <Text fontWeight="bold">
            新しいスキルを追加
            <Icon
              as={AiOutlinePlus}
              ml="8px"
              fontWeight="bold"
              verticalAlign="middle"
            />
          </Text>
        </Center>
      )}
      {currentUser?.uid !== id && (
        <>
          {!skils && <Flex alignSelf="flex-start">まだスキルはありません</Flex>}
        </>
      )}
      {skils?.map((skil) => (
        <Flex
          key={Math.random()}
          mr="16px"
          mb="16px"
          w="140px"
          h="176px"
          bg="white"
          p="8px"
          direction="column"
          alignItems="center"
          border="1px solid black"
          borderColor="gray.200"
          borderRadius="lg"
          boxShadow="md"
        >
          <Tooltip
            hasArrow
            label={skilChartDisplay(skil.level).lavel}
            placement="right"
            bg="gray.500"
          >
            <Flex w="100%" position="relative" mb="4px">
              {skil.image ? (
                <Image
                  position="absolute"
                  top="0"
                  bottom="0"
                  left="0"
                  right="0"
                  margin="auto"
                  src={skil.image}
                  alt=""
                  w="56px"
                  borderRadius="full"
                />
              ) : (
                <Icon
                  position="absolute"
                  top="0"
                  bottom="0"
                  left="0"
                  right="0"
                  margin="auto"
                  src={skil.image}
                  w="56px"
                  h="56px"
                  borderRadius="full"
                  as={AiFillCheckCircle}
                  color="teal.500"
                />
              )}
              <DoughnutItem
                skilChartDisplay={skilChartDisplay(skil.level).data}
                skil={skil}
              />
            </Flex>
          </Tooltip>
          {skil.title.length > 10 ? (
            <Tooltip
              hasArrow
              label={skil.title}
              placement="bottom"
              bg="gray.500"
            >
              <Text
                color="black"
                fontWeight="bold"
                fontSize="20px"
                wordBreak="break-all"
                overflowX="scroll"
                className="scroll-off"
                w="100%"
                textAlign="center"
              >
                {omittedContent(skil.title)}
              </Text>
            </Tooltip>
          ) : (
            <Text
              color="black"
              fontWeight="bold"
              fontSize="20px"
              wordBreak="break-all"
              overflowX="scroll"
              className="scroll-off"
              w="100%"
              textAlign="center"
            >
              {skil.title}
            </Text>
          )}
        </Flex>
      ))}
    </>
  );
};

export default SkilIndex;
