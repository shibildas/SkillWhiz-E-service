import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { expertAxiosInstance } from "../../axios/instance";

const Schedules = () => {
  const today = moment().startOf("day");
  const [load, setLoad] = useState(false);
  const [slot, setSlot] = useState([]);
  const [bookedslot, setBookedSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectTime, setSelectedTime] = useState([]);
  const dates = [];
  for (let i = 1; i < 11; i++) {
    const date = today.clone().add(i, "days");
    dates.push(date);
  }
  const handleLoad = () => {
    setLoad(!load);
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
  }

  const handleTimeSlotSelect = (startTime) => {
    if (selectTime.includes(startTime)) {
      setSelectedTime(selectTime.filter((val) => val !== startTime));
    } else {
      setSelectedTime([...selectTime, startTime]);
    }
  }

  const handleSubmit = () => {
    if (selectTime.length != 0) {
      expertAxiosInstance
        .post(
          "/addSchedule",
          { dates: selectTime },
        )
        .then((res) => {
          if (res.data.status === "success") {
            Swal.fire("success", "Slots Added Successfully", "success");
            setSelectedTime([]);
            handleLoad();
          } else {
            Swal.fire("sorry", "Slots not Added ", "error");
          }
        })
        .catch((error) => {
          Swal.fire("sorry", error.message, "error");
        });
    } else {
      Swal.fire("sorry", "Select Time slots First", "error");
    }
  }
  useEffect(() => {
    expertAxiosInstance
      .get("/getSchedule")
      .then((res) => {
        if (res.data.status === "success") {
          setSlot(res.data.result?.slots);
          setBookedSlot(res.data.result?.bookedSlots);
        } else {
          Swal.fire("sorry", "something went wrong", "error");
        }
      })
      .catch((error) => {
        Swal.fire("sorry", error.message, "error");
      });
  }, [load]);

  return (
    <>
      <div className="w-full h-full my-3">
        <div className="bg-teal-800 rounded-xl p-5 md:h-[75vh] shadow-2xl text-white">
         
          <h1 className="text-2xl font-extrabold text-center py-5">
            Fix Schedules
          </h1>
          <h1 className="text-xl text-center font-bold">Choose Date / Time</h1>
          <h1 className="ml-2 my-10 text-xl font-bold">
            Mark Only Available hours
          </h1>
          <div className="carousel carousel-center rounded-box mx-4">
            {dates.map((date) => (
              <div key={date.valueOf()} className="carousel-item">
                <div
                  className={`m-2 shadow-2xl shadow-black p-2 w-28 rounded-2xl cursor-pointer ${
                    selectedDate && selectedDate.isSame(date, "day")
                      ? "bg-slate-800"
                      : "bg-indigo-600"
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
              <div className="flex flex-wrap justify-evenly mt-4">
                {getTimeSlots().map(({ startTime, endTime }) => (
                  <button
                    key={`${startTime.format("hh:mm A")}-${endTime.format(
                      "hh:mm A"
                    )}`}
                    className={`${
                      selectTime.includes(
                        startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )
                        ? " bg-indigo-600 text-white"
                        : " text-black"
                    } ${
                      slot.includes(startTime.format("MMMM Do YYYY, h:mm:ss a"))
                        && "bg-slate-500 cursor-not-allowed text-slate-100 outline outline-slate-900"
                        
                    } ${
                      bookedslot.includes(startTime.format("MMMM Do YYYY, h:mm:ss a"))
                        ? "bg-green-400 cursor-not-allowed text-black" :"bg-indigo-300"
                        
                    } font-bold py-2 px-4 rounded-xl m-2  h-40 shadow-inner shadow-black `}
                    onClick={() =>
                      handleTimeSlotSelect(
                        startTime.format("MMMM Do YYYY, h:mm:ss a")
                      )
                    }
                    disabled={(slot.includes(
                      startTime.format("MMMM Do YYYY, h:mm:ss a")
                    )) || (bookedslot.includes(startTime.format("MMMM Do YYYY, h:mm:ss a")))}
                  >
                    <b className="p-3">{`${startTime.format(
                      "hh:mm A"
                    )} - ${endTime.format("hh:mm A")}`}</b>
                  </button>
                ))}
              </div>
              {(selectTime.length != 0) && <div className="flex justify-center">
                {" "}
                <button onClick={handleSubmit} className="btn btn-warning m-5">
                  Update
                </button>
              </div>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Schedules;
