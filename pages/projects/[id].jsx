import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { GrGroup } from "react-icons/gr";
import Labels from "../../components/molecules/Labels";
import { FiMapPin } from "react-icons/fi";
import { GiStairsGoal } from "react-icons/gi";
import { useScroll } from "../../hooks/useScroll";
import { AuthContext } from "../_app";
import { useRouter } from "next/router";
import DetailProduct from "../../components/templates/DetailProduct";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const DetailProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const { summaryRef, memberRef, whatRef, whyRef, howRef, hopeRef, goalRef } =
    React.useContext(AuthContext);
  const [project] = useDocumentData(doc(db, "projects", id));

  return <DetailProduct project={project} />;
};

export default DetailProject;
