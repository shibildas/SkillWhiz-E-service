import React, { useState } from "react";
import Alert from "../Alert/Alert";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { useDispatch } from "react-redux";
import { adminDecline } from "../../Services/adminApi";
import { userDecline } from "../../Services/userApi";

function CancelEstimate({ handleLoad, admin, id }) {
  const dispatch = useDispatch()
  const [text, setText] = useState("");
  const handleDecline = () => {
    if (text === "") {
      showAlertError(dispatch, "Reason can't be empty");
    } else {
      const declinemodal = document.getElementById("cancelEst");
      const estmodal = document.getElementById("estimate");

      if (admin) {
        adminDecline({ id, text })
          .then((res) => {
            if (res.data.status === "success") {
              showAlertSuccess(dispatch, "Your have Declined the Estimate");
              handleLoad();
              estmodal.checked = false;
              declinemodal.checked = false;
            } else {
              estmodal.checked = false;
              showAlertError(dispatch, "something went wrong");
            }
          })
          .catch((error) => {
            estmodal.checked = false;
            showAlertError(dispatch, error.message);
          });
      } else {
        userDecline({ id, text })
          .then((res) => {
            if (res.data.status === "success") {
              showAlertSuccess(dispatch, "Your have Declined the Estimate");
              handleLoad();
              estmodal.checked = false;
              declinemodal.checked = false;
            } else {
              estmodal.checked = false;
              showAlertError(dispatch, "something went wrong");
            }
          })
          .catch((error) => {
            estmodal.checked = false;
            showAlertError(dispatch, error.message);
          });
      }
    }
  };
  return (
    <>
      <input type="checkbox" id="cancelEst" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="cancelEst"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl text-center font-bold p-3">Tell us Why?</h3>
          <div className="flex justify-center">
            <div className="py-2 form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  What can I Improve?
                </span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Please mention the reason.."
                className="textarea textarea-warning textarea-lg w-full max-w-md font-bold"
              ></textarea>
            </div>
          </div>
          <Alert />
          <div className="flex justify-evenly my-2">
            <label htmlFor="cancelEst" className="btn btn-success">
              Close
            </label>
            <button onClick={handleDecline} className="btn btn-warning">
              Decline{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CancelEstimate;
