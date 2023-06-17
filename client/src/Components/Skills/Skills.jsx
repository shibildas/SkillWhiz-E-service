import { useEffect, useState } from "react";
import AddSkill from "./AddSkill";
import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { getmyJobs, removeSkill } from "../../Services/expertApi";
import Confirm2 from "../Confirm/Confirm2";

const Skills = () => {
  const dispatch=useDispatch()
  const [datas, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const handleLoad = () => {
    setLoad(!load);
  };

  useEffect(() => {
    getmyJobs().then((res) => {
        if (res.data.status === "success") {
          setData(res.data.result);
        } else {
          showAlertError(dispatch,"Network Error")
        }
      })
      .catch((error) => {
        showAlertError(dispatch,error.message)
      });
  }, [load]);

  const handleClick =() => {
    const modal= document.getElementById('confirm2')

        removeSkill(id).then((res) => {
            if (res.data.status === "success") {
              handleLoad();
              modal.checked=false
              showAlertSuccess(dispatch,"Skill Removed")
              setId(null)
            } else {
              showAlertError(dispatch,"Couldn't complete the request")
            }
          })
          .catch((error) => {
            showAlertError(dispatch,error.message)
          });

  };
  return (
    <>
      <div className=" card min-h-fit p-3 rounded-xl bg-white  my-5">
        <div className="card-body">

        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold">My Skills</h1>
          <label className="btn btn-success" htmlFor="addSkill">
            Add Skill
          </label>
        </div>

        {datas.length != 0 ? (
          <div className=" shadow sm:grid-cols-1 md:grid-cols-3 p-2 ">
            {datas?.map((data, index) => {
              return (
                <div key={index+"20"} className="stat rounded-xl bg-slate-600 m-2">
                    <label htmlFor="confirm2"
                      onClick={() => setId(data?._id)}
                      className="rounded-full w-6 h-6 p-1 hover:bg-orange-400 text-white outline outline-1"
                      >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="5"
                          d="M6 18L18 6M6 6l12 12"
                          />
                      </svg>
                    </label>
                    <div className="stat-figure text-secondary ">
                      <div className="avatar online">
                        <div className="w-16 rounded-full">
                          <img src={data?.image} alt="image"/>
                        </div>
                      </div>
                    </div>

                    <div className="stat-value text-2xl max-w-[300px] break-all text-slate-50 truncate ">
                      {data?.job_role?.toUpperCase()}
                    </div>
                    <div className="stat-title font-bold text-xl text-cyan-100">
                      Earn: ₹ {data?.base_rate * 0.8}
                    </div>
                    <div className="stat-desc font-bold text-lg text-amber-200">
                      Additional: ₹ {data?.add_rate * 0.85}/hr{" "}
                    </div>
                  </div>
             
             );
            })}
          </div>
        ) : (
          <div className="flex justify-center p-5">
            {" "}
            <label
              htmlFor="addSkill"
              className="text-3xl text-center font-extrabold"
              >
              No Skills Yet.. + ADD SKILLS{" "}
            </label>
          </div>
        )}
        </div>
      </div>
      <AddSkill load={load} handleLoad={handleLoad} />
      <Confirm2 handleFunction={handleClick} />
    </>
  );
};
export default Skills;
