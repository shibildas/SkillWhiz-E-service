import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { expertbookings } from "../../Services/expertApi";
import { showAlertError } from "../../Services/showAlert";
import { useDispatch } from "react-redux";

const MyAppointments = () => {
  const dispatch =useDispatch()
  const arr=[1,2,3,4,5,6]
    const [booking,setBooking]=useState([])
  useEffect(() => {
    expertbookings().then(res=>{
        if(res.data.status==="success"){
            setBooking(res.data.result)
        }
    }).catch(error=>{
      showAlertError(dispatch,error.message)
    })

  }, []);

  return (
    <>
      <div className=" bg-opacity-90 min-h-screen my-2 rounded-lg">
        <h1 className="text-center md:text-3xl text-xl font-extrabold  p-2">
          My Appointments
        </h1>

        <div className="flex flex-wrap justify-center md:mt-10">
          {(booking?.length)? (booking?.map((ele,index)=>{
          return(
          <div key={index+20} className="card w-96 shadow-xl image-full p-2">
            <figure className="p-2">
              <img className="rounded-full brightness-75"
                src={ele?.jobId?.image}
                alt="job"
              />
            </figure>
            <div className="card-body rounded-xl">
              <h2 className="card-title">{ele?.jobId?.job_role?.toUpperCase()}</h2>
              <p>Appointment Id: <b> {ele?._id}</b></p>
              <p>Time: <b>{ele?.slot}</b></p>
              <div className="card-actions justify-end">
                {(moment(ele?.slot, 'MMMM Do YYYY, h:mm:ss a')?.isSameOrBefore()&& ele?.status==='pending')?"Expired":<Link to={`/expert/myappointments/${ele?._id}`}><button className="btn btn-secondary">View</button></Link>}
              </div>
            </div>
          </div>)}))
          :
          (arr.map((ele,index)=>{
         return <div key={index+44} className="card w-96 h-36 bg-base-400 shadow-xl image-full animate-pulse flex m-2 p-2">
           <h1 className="text-3xl text-center font-extrabold"> No Records Found</h1>
          </div>})
          )}
        </div>
      </div>
    </>
  );
};
export default MyAppointments;
