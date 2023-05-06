import { Link } from "react-router-dom";
import {
  footerImg,
  footerRay,
  comment,
  icon,
  social,
} from "../../constants/constants";

const Footer = ({teal}) => {
  return (
    <>
      <div className={` bg-slate-400 bg-opacity-20  mt-5 ${teal}`}>
        <div className="max-w-screen-xl mx-auto my-0">
        <Link to="/admin/login"><h1 className={`p-4 xl:text-6xl md:text-3xl font-bold`}>Why Skillwhiz ?</h1></Link>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {footerImg.map((img, index) => {
            return (
              <li
                key={2 + index}
                className="p-2 flex justify-evenly items-center"
              ><div className="mx-2">
                <img className="w-20 p-2"  src={img?.img} alt="image" />
                <h1 className={` mt-2 p-2 font-extrabold font-mono tracking-widest`}>{img?.val}</h1></div>
              </li>
            );
          })}
        </ul>
        <ul className="p-4 md:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
          {footerRay.map((ele, index) => {
            return (
              <li
                key={10 + index}
                className="p-2 flex flex-col justify-center items-center"
              >
                {ele}
              </li>
            );
          })}
        </ul>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-10 p-5">
          <li className="flex justify-center">
            <img className="w-3/4 float-right" src={icon} alt="image" />
          </li>
          <li className="">{comment}</li>
          <li className="">
            <h1 className="p-2 font-mono font-bold text-2xl text-center md:text-start tracking-widest">FOLLOW US</h1>{" "}
            <ul className="flex justify-center md:justify-start md:mx-4  gap-4 p-2">
              {social.map((app, index) => {
                return (
                  <li key={20 + index} className="">
                    <img className="w-5" src={app} alt="image" />
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div></div>
    </>
  );
};
export default Footer;
