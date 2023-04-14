import { useSelector } from "react-redux"
import ChangePassword from "../ChangePassword/ChangePassword"


const ProfileCard=()=>{
  const data=useSelector(state=>state.user.value)
    return(<>
    <div className="font-sans bg-cover bg-center my-10 rounded-2xl shadow-2xl shadow-black h-screen w-full flex flex-row justify-center items-center" style={{ backgroundImage: "url(https://res.cloudinary.com/dpfnxwvps/image/upload/v1681450055/bc_scaulu.png)"}}>
          <div className="card w-96 mx-auto bg-slate-300 opacity-95  shadow-2xl shadow-black hover:shadow">
             <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src={data?.image ? data?.image :"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt=""/>
             <div className="text-center mt-4 text-3xl font-bold">{data?.username}</div>
             <div className="text-center mt-4 font-mono font-bold text-sm">E-mail: {data?.email}</div>
             <div className="text-center font-normal text-lg">Mob: {data?.mobile}</div>
             
             <hr className="mt-8"/>
             <div className="flex p-4">
               <div className="w-1/2 text-center">
                 <button className="font-bold btn btn-ghost btn-outline"><svg className="mx-2" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c8c1c1"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 21C12 20.4477 12.4477 20 13 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21Z" fill="#a01c84"></path> <path fillRule="evenodd" clipRule="evenodd" d="M20.7736 8.09994C22.3834 6.48381 22.315 4.36152 21.113 3.06183C20.5268 2.4281 19.6926 2.0233 18.7477 2.00098C17.7993 1.97858 16.8167 2.34127 15.91 3.09985C15.8868 3.11925 15.8645 3.13969 15.8432 3.16111L2.87446 16.1816C2.31443 16.7438 2 17.5051 2 18.2987V19.9922C2 21.0937 2.89197 22 4.00383 22H5.68265C6.48037 22 7.24524 21.6823 7.80819 21.1171L20.7736 8.09994ZM17.2071 5.79295C16.8166 5.40243 16.1834 5.40243 15.7929 5.79295C15.4024 6.18348 15.4024 6.81664 15.7929 7.20717L16.7929 8.20717C17.1834 8.59769 17.8166 8.59769 18.2071 8.20717C18.5976 7.81664 18.5976 7.18348 18.2071 6.79295L17.2071 5.79295Z" fill="#a01c84"></path> </g></svg> Edit</button>
               </div>
               <div className="w-0 border border-gray-300">
                 
               </div>
               <div className="w-1/2 text-center flex justify-center items-center">
                 <label htmlFor="chPass" className="cursor-pointer font-bold underline underline-offset-4">Change Password</label>
               </div>
             </div>
          </div>
          <ChangePassword/>
        </div>
    
    </>)
}
export default ProfileCard