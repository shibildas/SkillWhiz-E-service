import { useEffect, useState } from "react";
import { axios } from "../../import";
import useAuthUser from "../../hooks/useAuthUser";
import { Link } from "react-router-dom";

const BookingList = () => {
    const [booking,setBooking]=useState([])
  useEffect(() => {
    axios.get('/myBookings',{headers:{"x-access-token":localStorage.getItem("token")}}).then(res=>{
        if(res.data.status==="success"){
            setBooking(res.data.result)
        }
    })

  }, []);
  useAuthUser()

  return (
    <>
      <div className="bg-teal-100 opacity-90">
        <h1 className="text-center md:text-3xl text-xl font-bold">
          My Bookings
        </h1>

        <div className="flex flex-wrap">
          {(booking?.length)&& (booking?.map((ele)=>{
          return(
          <div className="card w-96 bg-base-400 shadow-xl image-full p-2">
            <figure>
              <img
                src={ele?.jobId?.image}
                alt="job"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{ele?.jobId?.job_role?.toUpperCase()}</h2>
              <p>Order Id: <b> {ele?._id}</b></p>
              <p>Time: <b>{ele?.slot}</b></p>
              <div className="card-actions justify-end">
                <Link to={`/bookings/${ele?._id}`}><button className="btn btn-primary">View</button></Link>
              </div>
            </div>
          </div>)}))}
        </div>
      </div>
    </>
  );
};
export default BookingList;
