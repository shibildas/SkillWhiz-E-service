import { services } from "../../constants/constants";
import Banner from "../Banner/Banner";
import Invite from "../Invite/Invite";


const MainPage = () => {
  return (
    <>
      <div className="md:mx-60 my-10 ">
      MOST USED SERVICES
        <div className="grid grid-cols-2 md:grid-cols-4">
{services.map((ele,index)=>{

return <span className="flex flex-col justify-center items-center" key={"A"+index}><img className="w-32 rounded-full" src={ele.img} alt="" /><h1 className="p-2 font-extrabold">{ele.val}</h1></span>
})

}
        </div>
      </div>
      <Banner />
      <Invite/>
    </>
  );
};
export default MainPage;
