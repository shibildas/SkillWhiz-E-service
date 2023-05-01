import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Reason from "./Reason";
import { verifyExpert } from "../../../Services/adminApi";

const Verification = ({ expert, handleLoad }) => {
  const [id, setId] = useState("");
  useEffect(() => {
    setId(expert?._id);
  }, [expert]);

  const handleApprove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to approve an Expert !!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,  Confirm!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
      .then((res) => {
        if (res.isConfirmed) {
          const verifyex = document.getElementById("exVerify");
          verifyExpert.then((res) => {
            if (res.data.status === "success") {
              handleLoad();
              verifyex.checked = false;
              Swal.fire("Approved!", "Expert has been Approved.", "success");
            } else if (res.dismiss === Swal.DismissReason.cancel) {
              Swal.fire("Cancelled", "Your data is safe :)", "error");
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", error.message, "error");
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
            <button
              onClick={handleApprove}
              className="btn btn-success btn-outline"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Verification;
