import { useEffect, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Link } from "react-router-dom";
import { userAxiosInstance } from "../../axios/instance";
import { useDispatch } from "react-redux";
import { showAlertError } from "../../Services/showAlert";


const BookingList = () => {
  const dispatch=useDispatch()
  const arr=[1,2,3,4,5,6]
    const [booking,setBooking]=useState([])
  useEffect(() => {
    userAxiosInstance.get('/myBookings').then(res=>{
        if(res.data.status==="success"){
            setBooking(res.data.result)
        }
    }).catch(error=>{
      showAlertError(dispatch,error.message)
    })

  }, []);


  return (
    <>
      <div className="bg-purple-300 bg-opacity-90 my-5 h-screen">
        <h1 className="text-center md:text-3xl text-xl font-bold">
          My Bookings
        </h1>

        <div className="flex flex-wrap justify-center md:mt-10">
          {(booking?.length)? (booking?.map((ele,index)=>{
          return(
          <div key={index+20} className="card w-96 bg-base-400 shadow-xl image-full p-2">
            <figure>
              <img
                src={ele?.jobId?.image}
                alt="job"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{ele?.jobId?.job_role?.toUpperCase()}</h2>
              <p>Booking Id: <b> {ele?._id}</b></p>
              <p>Time: <b>{ele?.slot}</b></p>
              <div className="card-actions justify-end">
                <Link to={`/bookings/${ele?._id}`}><button className="btn btn-primary">View</button></Link>
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
export default BookingList;
