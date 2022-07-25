import { Flex } from "@chakra-ui/react";
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
  return (
    <Flex flexWrap="wrap">
      <PrimaryIcon icon={BiCodeBlock} text="エンジニア" />
      <PrimaryIcon icon={GiPalette} text="デザイナー" />
      <PrimaryIcon icon={TbWritingSign} text="ライター" />
      <PrimaryIcon icon={MdOutlineOndemandVideo} text="動画編集者" />
      <PrimaryIcon icon={TbBulb} text="プランナー" />
      <PrimaryIcon icon={Tb3DCubeSphere} text="3DCGモデラー" />
      <PrimaryIcon icon={MdAnimation} text="アニメーター" />
    </Flex>
  );
};

export default SpecialtyIcons;
