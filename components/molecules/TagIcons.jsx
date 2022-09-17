import { Flex } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { AuthContext } from "../../pages/_app";
import PrimaryTag from "../atoms/PrimaryTag";

const TagIcons = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = React.useContext(AuthContext);
  const [projectsSnapshot] = useCollection(collection(db, "projects"));
  const projects = projectsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const [usersSnapshot] = useCollection(collection(db, "users"));
  const users = usersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const [worksSnapshot] = useCollection(collection(db, "works"));
  const works = worksSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userProjects = projects?.filter(
    (project) => project.user?.uid === currentUser?.uid
  );

  const userWorks = works?.filter((work) => work.user.uid === currentUser?.uid);

  const user = users?.find((user) => user.id === currentUser?.uid);

  console.log("user", user);
  console.log("projects", userProjects);
  console.log("works", userWorks);

  // const userTags = () => {
  //   let utags = [];
  //   utags.push(user?.tags);
  //   let ptags = [];
  //   projects?.map((project) => ptags.push(project.tags));
  //   let wtags = [];
  //   userWorks?.map((work) => wtags.push(work.tags));

  //   let newArray = utags.concat(ptags, wtags);

  //   return newArray
  // };

  // console.log("q", userTags());

  return (
    <Flex>
      <PrimaryTag
        src="https://firebasestorage.googleapis.com/v0/b/kokuri-v4.appspot.com/o/skil%2Frails.png?alt=media&token=0dae773f-51ef-4691-82f3-136705414da0"
        text="Ruby on Rails"
      />
      <PrimaryTag
        src="https://firebasestorage.googleapis.com/v0/b/kokuri-v4.appspot.com/o/skil%2Ficons8-react-native-48.png?alt=media&token=9bc3928c-9763-4000-8e22-b0a04ddf019c"
        text="React"
      />
      <PrimaryTag
        src="https://firebasestorage.googleapis.com/v0/b/kokuri-v4.appspot.com/o/skil%2Faws.png?alt=media&token=c1fd80f1-a4f1-4a0d-a43c-48c68f3d8b6b"
        text="AWS"
      />
      <PrimaryTag
        src="https://firebasestorage.googleapis.com/v0/b/kokuri-v4.appspot.com/o/skil%2Funreal-engine.png?alt=media&token=0ba62157-b2a5-49d4-b18d-54528f55604f"
        text="Unreal Engine"
      />
      <PrimaryTag
        src="https://firebasestorage.googleapis.com/v0/b/kokuri-v4.appspot.com/o/skil%2Fxd.png?alt=media&token=b8dc1da7-1e7f-4845-8af6-acfdbc1a0c48"
        text="XD"
      />
    </Flex>
  );
};

export default TagIcons;
