import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "../ExpertOTP/import";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { bookJobs } from "../../Services/userApi";

const ConfirmSchedule = ({ selectTime, job, address }) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user = useSelector((state) => state.user.value);
  const [time, setTime] = useState(null);
  const [locate, setLocate] = useState({});
  const [bookId,setBookId]=useState('')
  const [skill, setSkill] = useState(null);
  useEffect(() => {
    setTime(selectTime);
    setLocate(...address);
    setSkill(job);
    console.log(locate?.name);
  }, [job, selectTime]);

  const handleSubmit = () => {
    const data = {
      time: time,
      address: locate,
      date: Date.now(),
      jobId: skill?._id,
    };
    bookJobs({
      time: time,
      address: locate,
      date: Date.now(),
      jobId: skill?._id,
    }).then((res) => {
        setBookId(res?.data?.result)
        if (res.data.status === "success") {
          setBookId(res?.data?.result)
          showAlertSuccess(dispatch,"Job Slot Booked Successfully")
          const confirmModal= document.getElementById("confirm")
          const addressModal= document.getElementById("selectAddress")
          confirmModal.checked=false
          addressModal.checked=false
           navigate(`/bookings`)
        } else {
          showAlertError(dispatch,"Job Slot not Booked")
        }
      })
      .catch((error) => {
        showAlertError(dispatch,error.message)
      });
  };
  return (
    <>
      <input type="checkbox" id="confirm" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="confirm"
            className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl text-center font-bold">
            Confirm !! Are You Sure?
          </h3>
          <div className="card card-side bg-base-100 shadow-xl">
            <figure className="w-44 m-2">
              <img className="w-full" src={job?.image} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Job Requested: <b>{job?.job_role?.toUpperCase()}</b>
              </h2>
              <h2 className="card-title">
                Your Time Slot Starts on: <b>{time} (2 - Hrs)</b>
              </h2>

              <p className="font-bold">Scheduled Address : </p>
              <div className="border rounded-xl shadow-xl p-2">
                <p>
                  Contact Person: <b>{locate?.name?.toUpperCase()}</b>
                </p>
                <p>
                  House: <b>{locate?.house}</b>
                </p>
                <p>
                  Street: <b>{locate?.street}</b>
                </p>
                <p>
                  Pincode: <b>{locate?.pincode}</b>
                </p>
                <p>
                  Contact: <b>{user?.mobile}</b>
                </p>
              </div>
            </div>
          </div>
          <div className="card-actions justify-center p-2">
            <button onClick={handleSubmit} className="btn btn-primary">
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfirmSchedule;
