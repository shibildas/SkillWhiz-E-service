import { useEffect, useState } from "react";
import AddSkill from "./AddSkill";
import { Swal, axios } from "../ExpertOTP/import";


const Skills = () => {
    const [datas,setData]=useState([])
    const [load,setLoad]=useState(false)
    const [id,setId]=useState()
    const handleLoad=()=>{
        setLoad(!load)
    }
    
    useEffect(() => {
    axios.get('/expert/getMyJobs',{headers:{"x-access-experttoken":localStorage.getItem("experttoken")}}).then((res)=>{
        if(res.data.status==="success"){
            setData(res.data.result)
        }else{
            Swal.fire("Sorry","Network Error","error")
        }
    }).catch(error=>{
        Swal.fire("error",error.message,"error")
    })
    }, [load])

    const handleClick=(arg)=>{
        setId(arg)
        Swal.fire({
            title: "Are you sure?",
            text: "Selected Jobs will be Removed from your Profile !!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes,  Remove!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          }).then((res) => {
            if (res.isConfirmed) {
                axios.get(`/expert/removeSkill/${arg}`,{headers:{"x-access-experttoken":localStorage.getItem("experttoken")}}).then(res=>{
                    if(res.data.status==="success"){
                        handleLoad()
                        Swal.fire("success","Skill Removed","success")
                    }else{
                        Swal.fire("Sorry","Couldn't complete the request","error")

                    }
                }).catch(error=>{
                    Swal.fire("Error", error.message, "error");
                })


            }else if (res.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelled',
                  'Your data is safe :)',
                  'error'
                );
            }
        })
    }
  return (
    <>
      <div className=" min-h-fit p-3 rounded-xl bg-orange-200 bg-opacity-80 my-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold">My Skills</h1>
          <label className="btn btn-primary" htmlFor="addSkill">
            AddSkill
          </label>
        </div>
       
        {datas.length!=0 ? 
      <div className="stats stats-vertical shadow m-2 sm:grid-cols-1 md:grid-cols-3 bg-opacity-50">
        {datas?.map((data,index)=>{ return(<>
          <div key={index+"20"} className="stat ">
          <button onClick={()=>handleClick(data?._id)} className="rounded-full w-6 h-6 p-1 hover:bg-orange-400 bg-slate-100">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
            <div className="stat-figure text-secondary ">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src={data?.image} />
                </div>
              </div>
            </div>
         
            <div className="stat-value text-2xl max-w-[300px] truncate ">{data?.job_role?.toUpperCase()}</div>
            <div className="stat-title font-bold text-xl">Earn: ₹ {data?.base_rate *.8}</div>
            <div className="stat-desc text-secondary">Additional: ₹ {data?.add_rate*.85}/hr </div>
          </div>
        </>)})}
          </div>
        :<div className="flex justify-center p-5"> <label htmlFor="addSkill" className="text-3xl text-center font-extrabold">No Skills Yet.. + ADD SKILLS </label></div>}
  
      </div>
      <AddSkill load={load} handleLoad={handleLoad}/>
    </>
  );
};
export default Skills;
