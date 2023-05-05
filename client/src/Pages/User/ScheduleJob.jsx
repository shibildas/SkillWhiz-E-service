import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Address from "../../Components/Address/Address";
import { userAxiosInstance } from "../../axios/instance";
import { useDispatch } from "react-redux";
import { showAlertError } from "../../Services/showAlert";

const ScheduleJob=()=>{
  const dispatch=useDispatch()
    const today = moment().startOf("day");
    const [slot, setSlot] = useState([]);
    const [job,setJob]=useState({})
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectTime, setSelectedTime] = useState(null);
    const dates = [];
  for (let i = 1; i < 11; i++) {
    const date = today.clone().add(i, "days");
    dates.push(date);
  }
  const handleDateSelect = (date) => {
    setSelectedTime(null);
    setSelectedDate(date);
  };
  const handleTimeSlotSelect = (startTime) => {
    if(selectTime===startTime){
      
      setSelectedTime(null);
    }else{

      setSelectedTime(startTime);
    }    
  };
  const getTimeSlots = () => {
    const timeSlots = [];
    if (selectedDate) {
      for (let i = 10; i < 20; i += 5) {
        const startTime = moment(selectedDate).hour(i).minute(0);
        const endTime = moment(selectedDate)
          .hour(i + 4)
          .minute(59);
        timeSlots.push({ startTime, endTime });
      }
      return timeSlots;
    }
  };

    const {id}= useParams()
    useEffect(()=>{
        userAxiosInstance.get(`/getSlots/${id}`).then(res=>{
            if(res.data.status==="success"){
                setSlot(res.data.result)
                setJob(res.data.job)
            }else{
              showAlertError(dispatch,"networkError")
            }
          }).catch(error=>{
            
            showAlertError(dispatch,error,message)
        })

    },[])
    return(
        <>
        <div className="bg-zinc-400  rounded-xl p-5 md:h-[75vh] my-6">
          <h1 className=" text-3xl border-2 p-2 border-gray-500 rounded-xl font-extrabold">{job?.job_role?.toUpperCase()}</h1>
            <h1 className="text-2xl font-extrabold text-center py-5">
              Book Appointment
            </h1>
            <h1 className="text-xl text-center font-bold">
              Choose Date / Time
            </h1>
            <h1 className="ml-2 my-10 text-xl font-bold">
              Select Your Time Slot
            </h1>
            <div className="carousel carousel-center rounded-box mx-4 py-5">
              {dates.map((date) => (
                <div key={date.valueOf()} className="carousel-item">
                  <div
                    className={`m-2 shadow-xl shadow-black p-2 w-28 rounded-2xl text-white cursor-pointer ${
                      selectedDate && selectedDate?.isSame(date, "day")
                        ? "bg-indigo-600"
                        : "bg-zinc-700 "
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <h1 className="text-center font-bold">
                      {date?.format("dddd")}
                    </h1>
                    <h1 className="text-center text-4xl font-extrabold p-2">
                      {date?.format("D")}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            {selectedDate && (
              <>
                <div className="flex flex-wrap justify-evenly mt-4">
                  {getTimeSlots().map(({ startTime, endTime }) => (
                    (slot?.includes(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        ))&& <button
                      key={`${startTime.format("hh:mm A")}-${endTime.format(
                        "hh:mm A"
                      )}`}
                      className={`${
                        selectTime===
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        
                          ? " bg-zinc-800 text-white"
                          : "bg-purple-500 text-black"
                      } 
                        
                         shadow-inner shadow-black font-bold py-2 px-4 rounded-xl m-2 h-40`}
                      onClick={() =>
                        handleTimeSlotSelect(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        )
                      }
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
                    <label htmlFor="selectAddress"
                      // onClick={handleSubmit}
                      className="btn btn-primary m-5"
                    >
                      Proceed
                    </label>
                  </div>
                )}
              </>
            )}
          </div>
          <Address selectTime={selectTime} job={job} />
          
        </>
    )
}
export default ScheduleJob