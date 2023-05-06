import { useEffect, useState } from "react";
import { Swal} from "../ExpertOTP/import";
import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { addSkill, getJobList } from "../../Services/expertApi";

const AddSkill = ({handleLoad,load}) => {
  const dispatch=useDispatch()
  const [options, setOptions] = useState([]);
 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getJobList().then((res) => {
        if (res.data.status === "success") {
          setOptions(res.data.result);
        } else {
          showAlertError(dispatch,"Network Error")
        }
      });
  }, [load]);

  function handleOptionClick(optionValue) {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== optionValue)
      );
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  }

  function handleSubmit() {
    if (selectedOptions.length == 0) {
      showAlertError(dispatch,"Select a Job First")
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Selected Jobs will added to your Profile !!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,  Confirm!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((res) => {
        if (res.isConfirmed) {
          addSkill({ skills: selectedOptions }).then((res) => {
              if(res.data.status==="success"){
                const addSkillModal= document.getElementById("addSkill")
                addSkillModal.checked=false
                handleLoad()
                setSelectedOptions([])
                showAlertSuccess(dispatch,"Skills Added Successfully")
              }

            }).catch((error)=>{
              showAlertError(dispatch,"Error:"+error.message)
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your data is safe :)", "error");
        }
      });
    }
  }
  return (
    <>
      <input type="checkbox" id="addSkill" className="modal-toggle" />
      <div className="modal">
        <div
          className="modal-box bg-cover h-2/4"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dpfnxwvps/image/upload/c_crop,e_auto_color,h_4523,w_1988/v1681457149/5232_tppors.jpg)",
          }}
        >
          <label
            htmlFor="addSkill"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-ghost"
          >
            ✕
          </label>
          <h3 className="text-2xl text-center font-bold">Add Skills</h3>
          <div>
            <div className="">
              <div className="inline-block relative w-full p-5 ">
                <button
                  type="button"
                  className="w-full flex items-center justify-between border border-gray-300 p-2 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                  onClick={toggleDropdown}
                >
                  <span className="block truncate">
                    {selectedOptions.length > 0
                      ? `${selectedOptions.length} options selected`
                      : "Select options"}
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                  </svg>
                </button>
                <div className="absolute z-10 left-0 mt-2 w-full h-2/5">
                  {isOpen && (
                    <div className="bg-slate-100  rounded-md shadow-lg ">
                      {options.map((option) => (
                        <button
                          key={option._id}
                          type="button"
                          className={`w-full rounded-md border border-slate-400 text-left flex items-center justify-between px-4 py-2 ${
                            selectedOptions.includes(option._id)
                              ? "bg-blue-500 text-white"
                              : "text-gray-900"
                          }`}
                          onClick={() => handleOptionClick(option._id)}
                        >
                          <span className="flex items-center">
                            <img
                              src={option?.image}
                              alt=""
                              className="h-8 w-8 object-cover rounded-full mr-3"
                            />
                            <span className="font-extrabold ">
                              {option?.job_role}
                            </span>
                            <span className="mx-2 flex-col text-xs">
                              <span>
                                Base Rate: ₹ <b> {option?.base_rate * 0.8}</b>,{" "}
                              </span>
                              <span>
                                Additional: ₹ <b> {option?.add_rate * 0.85}</b>
                                /hr
                              </span>
                            </span>
                          </span>
                          {selectedOptions.includes(option._id) && (
                            <span className="flex-shrink-0"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center align-bottom">
                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddSkill;
