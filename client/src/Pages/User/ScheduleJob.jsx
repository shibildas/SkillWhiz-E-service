import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"
import { axios } from "../../import"
import useAuthUser from "../../hooks/useAuthUser"

const ScheduleJob=()=>{
    useAuthUser()
    const today = moment().startOf("day");
    const [slot, setSlot] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectTime, setSelectedTime] = useState(null);
    const dates = [];
  for (let i = 1; i < 11; i++) {
    const date = today.clone().add(i, "days");
    dates.push(date);
  }
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const handleTimeSlotSelect = (startTime) => {
    if (selectTime ===startTime) {
      setSelectedTime(null);
    } else {
      setSelectedTime(startTime);
    }
  };
  const getTimeSlots = () => {
    const timeSlots = [];
    if (selectedDate) {
      for (let i = 10; i < 20; i += 2) {
        const startTime = moment(selectedDate).hour(i).minute(0);
        const endTime = moment(selectedDate)
          .hour(i + 1)
          .minute(59);
        timeSlots.push({ startTime, endTime });
      }
      return timeSlots;
    }
  };
  const handleSubmit = () => {
    if (!selectTime) {

    }
}

    const {id}= useParams()
    useEffect(()=>{
        axios.get(`/getSlots/${id}`,{headers:{"x-access-token":localStorage.getItem("token")}}).then(res=>{
            if(res.data.status==="success"){
                setSlot(res.data.result)
            }
        })

    },[])
    return(
        <>
        {id}
        <div className="bg-blue-100 rounded-xl p-5 h-[75vh]">
            <h1 className="text-2xl font-extrabold text-center py-5">
              Book Appointment
            </h1>
            <h1 className="text-xl text-center font-bold">
              Choose Date / Time
            </h1>
            <h1 className="ml-2 my-10 text-xl font-bold">
              Mark Only Available day & hour
            </h1>
            <div className="carousel carousel-center rounded-box mx-4">
              {dates.map((date) => (
                <div key={date.valueOf()} className="carousel-item">
                  <div
                    className={`m-2 shadow-2xl shadow-black p-2 w-28 rounded-2xl cursor-pointer ${
                      selectedDate && selectedDate.isSame(date, "day")
                        ? "bg-indigo-400"
                        : ""
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <h1 className="text-center font-bold">
                      {date.format("dddd")}
                    </h1>
                    <h1 className="text-center text-4xl font-extrabold p-2">
                      {date.format("D")}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            {selectedDate && (
              <>
                <div className="flex flex-wrap justify-center mt-4">
                  {getTimeSlots().map(({ startTime, endTime }) => (
                    <button
                      key={`${startTime.format("hh:mm A")}-${endTime.format(
                        "hh:mm A"
                      )}`}
                      className={`${
                        selectTime===
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        
                          ? " bg-indigo-600 text-white"
                          : "bg-indigo-300 text-black"
                      } ${
                        slot.includes(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        )
                          ? "bg-slate-300 cursor-not-allowed text-slate-100"
                          : ""
                      } font-bold py-2 px-4 rounded-xl m-2`}
                      onClick={() =>
                        handleTimeSlotSelect(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        )
                      }
                      
                     disabled={slot.includes(
                        startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )}
                    >
                      <b className="p-3">{`${startTime.format(
                        "hh:mm A"
                      )} - ${endTime.format("hh:mm A")}`}</b>
                    </button>
                  ))}
                </div>
                {selectTime && (
                  <div className="flex justify-center">
                    {" "}
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary m-5"
                    >
                      Update
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
    )
}
export default ScheduleJob