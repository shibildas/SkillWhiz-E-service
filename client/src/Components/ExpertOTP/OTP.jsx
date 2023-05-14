import { useDispatch } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { useState } from "./import";
import { expertVerifyOTP } from "../../Services/expertApi";
import Alert from "../Alert/Alert";

const OTP = ({ mobile }) => {
  const dispatch=useDispatch()
  const [otp, setOtp] = useState("");
  const handleOtp = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 6) {
      setOtp(e.target.value);
    }
  };
  const handleOTP = () => {
    if (otp.length < 6 || otp === "") {
      showAlertError(dispatch,"Invalid Entry")
    } else {
      expertVerifyOTP({ otp: otp, mobile: mobile })
        .then((response) => {
          console.log("verified: " + response.data);
          if (response.data.status == "success") {
            showAlertSuccess(dispatch,response.data.message)
            const otpbox = document.getElementById("expert-otp");
            otpbox.checked = false;
            handleShow()
          } else {
            showAlertError(dispatch,"Wrong OTP")
          }
        })
        .catch((error) => {
          showAlertError(dispatch,error.message)
        });
    }
  };
  return (
    <>
      <input type="checkbox" id="expert-otp" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-full bg-orange-200">
          <label
            htmlFor="expert-otp"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-center p-5 text-3xl font-extrabold">Enter OTP</h1>
          <h1 className="text-center p-2 text-2xl font-bold">
            Enter the OTP sent to +91-{mobile}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <input
              className="m-2 border h-10 w-36 text-center form-control rounded border-slate-500 my-2 tracking-widest"
              min="0"
              type="number"
              onChange={handleOtp}
              value={otp}
            />
            <button onClick={handleOTP} className="btn m-2">
              {" "}
              Submit
            </button>
          </div>
          <Alert/>
        </div>
      </div>
    </>
  );
};
export default OTP;
