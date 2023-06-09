import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAxiosInstance } from "../../axios/instance";
import { useDispatch } from "react-redux";
import { showAlertError } from "../../Services/showAlert";
import moment from "moment";

const BookingList = () => {
  const dispatch = useDispatch();
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    userAxiosInstance
      .get("/myBookings")
      .then((res) => {
        if (res.data.status === "success") {
          setBooking(res.data.result);
        }
      })
      .catch((error) => {
        showAlertError(dispatch, error.message);
      });
  }, []);

  return (
    <>
      <div className="bg-purple-400 min-h-screen card my-5">
        <div className="card-body">
          <h1 className="text-center md:text-3xl text-xl font-extrabold">
            My Bookings
          </h1>
          <div className="flex flex-wrap justify-center md:mt-10">
            {booking?.length
              ? booking?.map((ele, index) => {
                  return (
                    <div
                      key={index + 20}
                      className="card w-fit md:w-96 bg-base-400 shadow-xl image-full p-2"
                    >
                      <figure>
                        <img src={ele?.jobId?.image} alt="job" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">
                          {ele?.jobId?.job_role?.toUpperCase()}
                        </h2>
                        <p>
                          Booking Id: <b> {ele?._id}</b>
                        </p>
                        <p>
                          Time: <b>{ele?.slot}</b>
                        </p>
                        <div className="card-actions justify-end">
                          {moment(
                            ele?.slot,
                            "MMMM Do YYYY, h:mm:ss a"
                          )?.isSameOrBefore() && ele?.status === "pending" ? (
                            "Expired"
                          ) : (
                            <Link to={`/bookings/${ele?._id}`}>
                              <button className="btn btn-primary">View</button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              : 
                   (
                    <div
                      className="card w-fit md:w-96 h-36 bg-base-400 shadow-xl image-full flex m-2 p-2"
                    >
                      <h1 className="text-3xl text-center font-extrabold">
                        {" "}
                        No Records Found
                      </h1>
                    </div>
                  )
                }
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingList;
