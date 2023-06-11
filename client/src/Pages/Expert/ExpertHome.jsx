import Invite from "../../Components/Invite/Invite";
import { useEffect, useState } from "react";
import Skills from "../../Components/Skills/Skills";

const ExpertHome = () => {
  const [show, setShow] = useState();
  useEffect(() => {
    setShow(false);
  }, []);

  return (
    <>
      <Invite show={show} />
      <Skills />
    </>
  );
};
export default ExpertHome;
