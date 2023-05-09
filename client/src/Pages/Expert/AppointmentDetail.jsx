import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddEstimate from "../../Components/Estimate/AddEstimate";
import Startjob from "../../Components/Start/Startjob";
import { EndJob } from "../../Components/Start/EndJob";
import { addBooking } from "../../redux/expert";
import Review from "../../Components/Review/Review";
import ViewReview from "../../Components/Review/ViewReview";
import { getExpertBooking } from "../../Services/expertApi";
import { showAlertError } from "../../Services/showAlert";

const AppointmentDetail = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.expert.value.bookings);
  const { id } = useParams();
  const [load, setLoad] = useState(false);


  const handleLoad = () => {
    setLoad(!load);
  };
  useEffect(() => {
    getExpertBooking(id).then((res) => {
        if (res.data.status === "success") {
          dispatch(addBooking(res.data.result));
        } else {
          showAlertError(dispatch,"NetworkError")
        }
      })
      .catch((error) => {
        showAlertError(dispatch,error.message)
      });
  }, [load]);

  return (
    <>
      
      <div className="bg-slate-500 p-2 mt-5 rounded-t-xl flex justify-center">
        <h1 className="text-xl md:text-3xl font-extrabold text-white p-3">
          Appointment Detail
        </h1>
      </div>
      <div className="bg-slate-100 flex justify-center p-5 ">
        <ul className="steps md:text-2xl text-sm  font-bold">
          <li data-content="📬" className="step step-secondary ">
            Open
          </li>
          <li data-content="⛹" className="step step-secondary">
            Partner Assigned
          </li>
         { book?.status !== "cancelled" && <><li
            data-content="⏲"
            className={`step ${
              book?.estimate?.status === "approved" && "step-secondary"
            } ${book?.status === "completed" && "step-secondary"} ${
              book?.status === "invoiced" && "step-secondary"
            } ${book?.status === "closed" && "step-secondary"}
              
              `}
          >
            In Progress
          </li>
          <li
            data-content="✔"
            className={`step ${
              book?.status === "completed" && "step-secondary"
            } ${book?.status === "invoiced" && "step-secondary"} ${
              book?.status === "closed" && "step-secondary"
            }`}
          >
            Completed
          </li>
          <li
            data-content="🗐"
            className={`step ${
              book?.status === "completed" && "step-secondary"
            } ${book?.status === "invoiced" && "step-secondary"} ${
              book?.status === "closed" && "step-secondary"
            }`}
          >
            invoiced
          </li>
          <li
            data-content="📪"
            className={`step ${
              book?.status === "completed" && "step-secondary"
            } ${book?.status === "closed" && "step-secondary"}`}
          >
            Closed
          </li></>}
          {book?.status === "cancelled" && (
            <li data-content="🗙" className="step step-secondary">
              Cancelled
            </li>
          )}
        </ul>
      </div>
      <div className="bg-slate-100 rounded-b-xl p-2 h-fit w-full flex justify-center shadow-xl">
        <div className="w-3/5">
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Booking ID: </h1> <h1>{book?._id}</h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between  font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Booking Status: </h1>{" "}
            <h1>{book?.status}</h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Scheduled: </h1> <h1>{book?.slot}</h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Address: </h1>{" "}
            <h1>
              {book?.address?.name?.toUpperCase()} <br />
              {book?.address?.house}
              <br />
              {book?.address?.street}
              <br />
              {book?.address?.pincode}
            </h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Estimate Amount: </h1>{" "}
            <h1>
              {" "}
              {book?.estimate?.amount ? (
                `Rs: ${book?.estimate?.amount}`
              ) : (
                (book?.status !== "cancelled"?<label htmlFor="addEstimate" className="btn btn-secondary">
                  Add Estimate{" "}
                </label>: 'Nil')
              )}
            </h1>
          </div>
          <div className="divider "></div>
          {book?.estimate?.status === "approved" &&
            book?.status === "pending" && (
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                {" "}
                <h1 className="text-xl">Estimate Approved:</h1>{" "}
                <label className="btn btn-md " htmlFor="startJob">
                  Start Job
                </label>{" "}
              </div>
            )}
            {(book?.status === "started" ||
              book?.status === "invoiced" ||
              book?.status === "closed") && (
                <>
                <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Job Started at:</h1>{" "}
                <div>
                  <h1>
                    {new Date(book?.jobStart)?.toLocaleDateString()} ,{" "}
                    {new Date(book?.jobStart)?.toLocaleTimeString([], {
                      hour12: true,
                    })}
                  </h1>
                  {book?.status === "started" && (
                    <label htmlFor="endJob" className="btn m-2 btn-warning">
                      End job
                    </label>
                  )}
          </div>
                </div>
                <div className="divider "></div>
              </>
            )}
            
          {(book?.status === "completed" ||
            book?.status === "invoiced" ||
            book?.status === "closed") && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Job Ended at:</h1>{" "}
                <div>
                  <h1>
                    {new Date(book?.jobEnd)?.toLocaleDateString()} ,{" "}
                    {new Date(book?.jobEnd)?.toLocaleTimeString([], {
                      hour12: true,
                    })}
                  </h1>
                </div>
              </div>
              <div className="divider "></div>
            </>
          )}
          {(book?.status === "completed" ||
            book?.status === "invoiced" ||
            book?.status === "closed") && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                {" "}
                <h1 className="text-xl">Invoice Amount</h1>{" "}
                <div>
                  <h1 className="text-center">₹ {book?.bill_amount}</h1>
                  {book?.status === "completed" && (
                    <label className="btn m-2 btn-warning">Recieve Cash</label>
                  )}
                </div>{" "}
              </div>

              <div className="divider "></div>
            </>
          )}
          {(!book?.review?._id &&(book?.status==='invoiced'|| book?.status==='closed'))&& (
            <Review
              user={false}
              reviewBy={book?.expert?._id}
              myId={book?.userId?._id}
              jobId={book?.jobId?._id}
              bookId={book?._id}
              handleLoad={handleLoad}
            />
          )} {book?.review?._id && (
            <>
              <ViewReview
                handleLoad={handleLoad}
                user={false}
                review={book?.review}
                img={book?.expertId?.image}
              />
            </>
          )}
        </div>
      </div>
      <AddEstimate admin={false} bookId={id} jobId={book?.jobId} handleLoad={handleLoad} />
      <Startjob id={id} handleLoad={handleLoad} admin={false} />
      <EndJob booking={book} handleLoad={handleLoad} admin={false} />
    </>
  );
};
export default AppointmentDetail;
