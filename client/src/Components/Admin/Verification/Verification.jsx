import { useEffect, useState } from "react";
import Reason from "./Reason";
import { verifyExpert } from "../../../Services/adminApi";
import Confirm from "../../Confirm/Confirm";
import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../../Services/showAlert";

const Verification = ({ expert, handleLoad }) => {
  const dispatch=useDispatch()
  const [id, setId] = useState("");
  useEffect(() => {
    setId(expert?._id);
  }, [expert]);

  const handleApprove = () => {
          const confirmodal= document.getElementById('confirm')
          const verifyex = document.getElementById("exVerify");
          verifyExpert(id).then((res) => {
            if (res.data.status === "success") {
              handleLoad();
              confirmodal.checked=false
              verifyex.checked = false;
              showAlertSuccess(dispatch,"Expert has been Approved.")
        }else{
          showAlertError(dispatch,'something went wrong')
        }
      })
      .catch((error) => {
        console.error(error);
        showAlertError(dispatch,error.message)
      });
  };

  return (
    <>
      <input type="checkbox" id="exVerify" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative text-white bg-cyan-900">
          <label
            htmlFor="exVerify"
            className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl text-center p-3 font-extrabold">
            Verify the Expert
          </h3>
          <div className="">
            <img
              className="w-full p-2"
              src={expert?.identity?.front}
              alt="image"
            />
            <img
              className="w-full p-2"
              src={expert?.identity?.back}
              alt="image"
            />
          </div>
          <h1 className="p-3 font-bold">Status: {expert?.identity?.status}</h1>
          <h1 className="p-3">
            Name as per ID: <b> {expert?.identity?.name}</b>
          </h1>
          <div className="p-3 flex justify-between">
            <label htmlFor="Reject" className="btn btn-error btn-outline">
              Reject
            </label>
            <Reason id={id} handleLoad={handleLoad} />
            <label
            htmlFor="confirm"
              className="btn btn-success btn-outline"
            >
              Approve
            </label>
          </div>
        </div>
      </div>
      <Confirm handleFunction={handleApprove}/>
    </>
  );
};
export default Verification;
