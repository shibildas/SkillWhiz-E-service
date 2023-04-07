import { useEffect, useState } from "react";
import { services } from "../../constants/constants";
import Banner from "../Banner/Banner";
import Invite from "../Invite/Invite";

const MainPage = () => {
  const [show, setShow] = useState();
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <div className="md:mx-60 my-10  border border-stone-400 rounded-2xl shadow-2xl">
        <h1 className="p-5 font-extrabold text-4xl">MOST USED SERVICES</h1>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {services.map((ele, index) => {
            return (
              <span
                className="flex flex-col justify-center items-center"
                key={"A" + index}
              >
                <img className="w-32 rounded-full" src={ele.img} alt="" />
                <h1 className="p-2 font-extrabold">{ele.val}</h1>
              </span>
            );
          })}
        </div>
      </div>
      <Banner />
      <Invite show={show} />
    </>
  );
};
export default MainPage;
