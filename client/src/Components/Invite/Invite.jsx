import worker from "../../assets/Worker.png";
import money from "../../assets/money.png";
import improve from "../../assets/improve.png";
import users from "../../assets/users.png";
import { useNavigate } from "react-router-dom";
const Invite = ({show}) => {
  const navigate= useNavigate()
  return (
    <>
      <div className="md:mx-60 mt-10">
       {(show===true) && <>  <div
          className="border-yellow-400 border-8 w-[75%]
            h-full"
        >
         
          <div className="flex justify-between p-4 grid-col-1">
            <h1 className="text-5xl font-extrabold">
              ARE YOU A SERVICE EXPERT ?
            </h1>
            <button onClick={()=>navigate("/expert")} className="bg-black p-2 rounded-xl font-bold hover:bg-yellow-400 hover:text-black text-yellow-400">
              REGISTER AS A PARTNER{" "}
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold tracking-widest">
              JOIN WORLDS LARGEST SERVICE NETWORK
            </h2>
          </div>
        </div></>}
        <div className="md:flex">
        <div className="w-full py-5">
          <div className="flex p-2"><img className="w-20 h-20 rounded-full" src={money} alt="money" /><div className="px-5">
            <h1 className="font-bold tracking-widest py-3">INCREASE YOUR EARNINGS</h1><p className="text-slate-600">with Skillwhiz, you do more than your usual jobs, and earn more. No more bargaining with your customers!</p></div> </div>
          <div className="flex p-2"><img className="w-20 h-20 rounded-full" src={improve} alt="improve" /><div className="px-5"> 
          <h1 className="font-bold tracking-widest py-3">IMPROVE PRODUCTIVITY</h1><p className="text-slate-600">You get jobs near to your location, travel less, thereby saving time and money. You get more jobs too!</p> </div> </div>
          <div className="flex p-2"><img className="w-20 h-20 rounded-full" src={users} alt="users" /><div className="px-5"><h1 className="font-bold tracking-widest py-3">LARGE CUSTOMER BASE</h1><p className="text-slate-600">With us, you are visible to a much larger customer base, without any marketing costs. We do your marketing for you!</p> </div>
          </div>
        </div>
        <div className="w-full md:flex items-end"><img className="w-full " src={worker} alt="worker" /></div>
      </div>
      </div>
    </>
  );
};
export default Invite;
