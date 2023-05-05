import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { adminCancelBook } from "../../Services/adminApi";
import { userCancelBook } from "../../Services/userApi";
import Alert from "../Alert/Alert";

const CancelBook = ({ admin, handleLoad, id }) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const handleCancel = () => {
    if (reason === "") {
      showAlertError(dispatch, "reason can't be empty");
    } else {
      const cancelModal = document.getElementById("cancelBook");
      if (admin) {
        adminCancelBook({ id, reason })
          .then((res) => {
            if (res.data.status === "success") {
              handleLoad();
              showAlertSuccess(dispatch, "Booking Cancelled Success");
              cancelModal.checked = false;
            } else {
              showAlertError(dispatch, "something went Wrong");
              cancelModal.checked = false;
            }
          })
          .catch((error) => {
            showAlertError(dispatch, error.message);
            cancelModal.checked = false;
          });
      } else {
        userCancelBook({ id, reason })
          .then((res) => {
            if (res.data.status === "success") {
              handleLoad();
              showAlertSuccess(dispatch, "Booking Cancelled Success");
              cancelModal.checked = false;
            } else {
              showAlertError(dispatch, "something went Wrong");
              cancelModal.checked = false;
            }
          })
          .catch((error) => {
            showAlertError(dispatch, error.message);
            cancelModal.checked = false;
          });
      }
    }
  };
  return (
    <>
      <input type="checkbox" id="cancelBook" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="cancelBook"
            className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl text-center font-bold">
            Are You Sure to Cancel the Job?
          </h3>
          <div className=" p-2">
            <div className="flex justify-center">
              <div className="form-control p-2">
                <label className="label p-2">
                  <span className="label-text font-semibold">Tell us Why?</span>
                </label>
                <textarea
                  placeholder="Reason for Cancellation"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="textarea textarea-bordered textarea-secondary textarea-lg w-full"
                ></textarea>
              </div>
            </div>
            <Alert/>
            <div className="flex justify-evenly p-2">
              <label htmlFor="setReason" className="btn btn-success my-2">
                No
              </label>
              <button onClick={handleCancel} className="btn btn-error my-2">
                Yes,Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelBook;
