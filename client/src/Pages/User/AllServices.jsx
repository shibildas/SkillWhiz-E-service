import React, { useEffect, useState } from 'react'
import { getAllJobs } from '../../Services/userApi'
import { useDispatch } from 'react-redux';
import { showAlertError } from '../../Services/showAlert';
import { Link } from 'react-router-dom';

const AllServices = () => {
    const dispatch=useDispatch()
 
  const [jobs,setJobs]= useState()
    useEffect(()=>{
        getAllJobs().then(res=>{
            if(res.data.status==='success'){
                setJobs(res.data.result)
            }else{
showAlertError(dispatch,'something went wrong')
            }
        }).catch(error=>{
            showAlertError(dispatch,error.message)

        })
    },[])
  return (
    <>
    <div>
    <div className=" my-10  border border-stone-400 rounded-2xl shadow-2xl bg-opacity-80 bg-slate-200">
        <h1 className="p-5 font-extrabold md:text-4xl">All SERVICES</h1>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {jobs?.map((ele, index) => {
            return (
              <Link to={`/job/${encodeURIComponent(ele?.job_role)}`}
                className="flex flex-col justify-center items-center "
                key={"B" + index}
              >
                <img className="w-32 rounded-full cursor-pointer shadow-black shadow-2xl" src={ele?.image} alt="image" />
                <h1 className="p-2 font-extrabold cursor-pointer ">{ele?.job_role?.toUpperCase()}</h1>
              </Link>
            );
          })}

    </div>
    </div>
    </div>
    
    </>
  )
}

export default AllServices