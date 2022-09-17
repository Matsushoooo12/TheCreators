import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import React from "react";
import QueryContainer from "../../../components/templates/QueryContainer";

const SecondQuery = () => {
  return (
    <QueryContainer
      step="2/8"
      title="プロジェクト状況を教えて下さい"
      width="560px"
    >
      <Flex direction="column" mb="16px">
        <Text fontWeight="bold" mb="8px">
          プロジェクトの状態
        </Text>
        <Select
          placeholder="状態を選択"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="構想段階">構想段階（0~10%）</option>
          <option value="序盤">序盤（11~40%）</option>
          <option value="中盤">中盤（41~70%）</option>
          <option value="終盤">終盤（71%~99%）</option>
        </Select>
      </Flex>
      <Flex direction="column" mb="16px">
        <Text fontWeight="bold" mb="8px">
          募集期限
        </Text>
        <Input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          type="date"
        />
      </Flex>
      <Button my="16px" onClick={() => setQueryNumber("3")}>
        次へ
      </Button>
      <Button onClick={() => setQueryNumber("1")}>戻る</Button>
    </QueryContainer>
  );
};

export default SecondQuery;
