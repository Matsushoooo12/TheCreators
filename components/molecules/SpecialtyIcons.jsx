import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiCodeBlock } from "react-icons/bi";
import { BsFillPhoneFill } from "react-icons/bs";
import { GiPalette } from "react-icons/gi";
import { ImEarth } from "react-icons/im";
import { IoLogoGameControllerB } from "react-icons/io";
import {
  MdAnimation,
  MdDesignServices,
  MdOutlineOndemandVideo,
} from "react-icons/md";
import { Tb3DCubeSphere, TbBulb, TbWritingSign } from "react-icons/tb";
import PrimaryIcon from "../atoms/PrimaryIcon";

const SpecialtyIcons = () => {
  const router = useRouter();
  return (
    <Flex flexWrap="wrap">
      <PrimaryIcon
        icon={BiCodeBlock}
        text="エンジニア"
        onClick={() => router.push(`/search/specialty/エンジニア`)}
      />
      <PrimaryIcon
        icon={GiPalette}
        text="デザイナー"
        onClick={() => router.push(`/search/specialty/デザイナー`)}
      />
      <PrimaryIcon
        icon={TbWritingSign}
        text="ライター"
        onClick={() => router.push(`/search/specialty/ライター`)}
      />
      <PrimaryIcon
        icon={MdOutlineOndemandVideo}
        text="動画編集者"
        onClick={() => router.push(`/search/specialty/動画編集者`)}
      />
      <PrimaryIcon
        icon={TbBulb}
        text="プランナー"
        onClick={() => router.push(`/search/specialty/プランナー`)}
      />
      <PrimaryIcon
        icon={Tb3DCubeSphere}
        text="3DCGモデラー"
        onClick={() => router.push(`/search/specialty/3DCGモデラー`)}
      />
      <PrimaryIcon
        icon={MdAnimation}
        text="アニメーター"
        onClick={() => router.push(`/search/specialty/アニメーター`)}
      />
    </Flex>
  );
};

export default SpecialtyIcons;
