import { useState } from "react";
import { login } from "../../import";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user";
import { userAxiosInstance } from "../../axios/instance";
import { icon } from "../../constants/constants";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import Alert from "../Alert/Alert";
import UserOtp from "./UserOtp";
import { resetPassword } from "../../Services/userApi";

const Signin = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState();
  const handleMobile = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
  };
  const handleReset=(e)=>{
    e.preventDefault();
    const modalCheckbox = document.getElementById("my-modal-3");
    const otpCheckbox = document.getElementById("my-modal-otp");
    if(mobile===""|| mobile.length<10){
      showAlertError(dispatch,"Enter valid Number")
    }else{
      modalCheckbox.checked = false;
      resetPassword({mobile}).then((res)=>{
        if(res.data.status==="success"){
          otpCheckbox.checked=true
        }
      }).catch((error)=>{
        if(error.response.status==304){
          showAlertError(dispatch,"Mobile not registered, Signup")
        }
        showAlertError(dispatch,error.message)
      })
      
    }
  }
  const handleclick = () => {
    const modalCheckbox = document.getElementById("my-modal-3");
    modalCheckbox.checked = false;
  };
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    if (mobile === "" || password === ""|| mobile.length<10) {
      showAlertError(dispatch,"All fields are required!!")
    } else {
      userAxiosInstance
        .post("/signin", {
          mobile: mobile,
          password: password,
        })
        .then((response) => {
          if (!response.data.auth) {
            if(response.data.status==="blocked"){
            showAlertError(dispatch,"You are banned")
            }else{
              showAlertError(dispatch,"invalid Credentials")
            }
            dispatch(logout())
          } else {
            localStorage.setItem("token", response.data.token);
            dispatch(login(response.data.result));
            setMobile('')
            setPassword('')
            handleclick();
            showAlertSuccess(dispatch,"login success")
          }
        });
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-auto overflow-y-hidden shadow-inner bg-slate-700 text-white shadow-black">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex justify-center rounded-full">
            <img className="w-36 h-32 rounded-full filter brightness-200 saturate-200  " src={icon} alt="image"  />
          </div>
          <h3 className="text-3xl font-extrabold text-center p-2">Sign In</h3>
          <Alert/>
          <div className=" p-5 ">
            <form onSubmit={handleLogin}>
              <h1 className="font-bold py-2">Mobile</h1>
              <input
                type="number"
                min="0"
                className="border rounded-md p-1 text-black font-bold"
                placeholder="+91-"
                onChange={handleMobile}
                value={mobile}
                required
              />
              <h1 className="font-bold py-2">Password</h1>
              <input
                type="password"
                className="border rounded-md p-1 text-black font-bold"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <p className="py-2">
                Forgot Password?{" "}
                <label
                  className="font-bold cursor-pointer text-yellow-500 underline"
                  onClick={handleReset}
                >
                  OTP Login
                </label>{" "}
              </p>
              <p className="py-2">
                Not a member?{" "}
                <label
                  htmlFor="my-modal-6"
                  className="font-bold cursor-pointer text-yellow-500 underline"
                  onClick={handleclick}
                >
                  Signup
                </label>{" "}
              </p>
              <div className="p-3 flex justify-center">
                <button className="btn btn-secondary font-extrabold">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <UserOtp mobile={mobile} reset={true}/>
    </>
  );
};
export default Signin;
