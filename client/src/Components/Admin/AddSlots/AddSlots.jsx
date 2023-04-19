import { axios } from "../../../import";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddSlots = ({ expert, handleLoad }) => {
  const today = moment().startOf("day");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [slot, setSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectTime, setSelectedTime] = useState([]);
  const dates = [];
  for (let i = 1; i < 11; i++) {
    const date = today.clone().add(i, "days");
    dates.push(date);
  }
  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
  const handleTimeSlotSelect = (startTime) => {
    if (selectTime.includes(startTime)) {
      setSelectedTime(selectTime.filter((val) => val !== startTime));
    } else {
      setSelectedTime([...selectTime, startTime]);
    }
  };
  const handleSubmit = () => {
    if (selectTime.length != 0) {
      axios
        .post(
          "/admin/addSchedule",
          { dates: selectTime, _id: id },
          {
            headers: {
              "x-access-admintoken": localStorage.getItem("admintoken"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.status === "success") {
            const modal = document.getElementById("addSlots");
            Swal.fire("success", "Slots Added Successfully", "success");
            modal.checked = false;
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
  };

  useEffect(() => {
    setName(expert?.username);
    setId(expert?._id);
    setSlot(expert?.slots)
  }, [expert]);

  return (
    <>
      <input type="checkbox" id="addSlots" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addSlots"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl text-center font-bold">
            Add Slots For {name?.toLocaleUpperCase()}{" "}
          </h3>
          <div className="bg-blue-100 rounded-xl p-5 h-[75vh]">
            <h1 className="text-2xl font-extrabold text-center py-5">
              Fix Schedules
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
                        selectTime.includes(
                          startTime.format("MMMM Do YYYY, h:mm:ss a")
                        )
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
                {selectTime.length != 0 && (
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
        </div>
      </div>
    </>
  );
};
export default AddSlots;
