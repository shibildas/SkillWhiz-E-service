import { useState } from "react";
import Swal from "sweetalert2";
import UserOtp from "./UserOtp";
import { userAxiosInstance } from "../../axios/instance";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const handleNumber = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
  };
  const handleclose = () => {
    const modalCheckbox = document.getElementById("my-modal-6");
    modalCheckbox.checked = false;
  };

  const handlesignup = (e) => {
    e.preventDefault();
    if (password === "" || email === "" || name === "" || mobile == "") {
      Swal.fire("sorry","Fields cant be empty","error")
    } else {
      if(password===cPassword){

        userAxiosInstance
        .post("/signup", {
          username: name,
          email: email,
          password: password,
          mobile: mobile,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "success") {
            const modalCheckbox = document.getElementById("my-modal-6");
            const otpCheckbox = document.getElementById("my-modal-otp");
            modalCheckbox.checked = false;
            otpCheckbox.checked=true;
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("sorry",error.message,"error")

        });
      }else{
        Swal.fire("sorry","Passwords doesnt match","error")
      }
    }
  };
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative w-auto max-w-3xl bg-gray-700 bg-opacity-80 text-white shadow-inner shadow-black">
          
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
            >
            ✕
          </label>
          <h1 className="text-center p-5 text-3xl font-extrabold">Signup</h1>
          <form onSubmit={handlesignup} className="md:flex w-auto">
            <div>
            <label className="p-2 font-bold"> Username </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                value={name}
                placeholder="username"
                />
            </div>
            <label className="p-2 font-bold"> E-mail </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                value={email}
                placeholder="some@mail.com"
                />
            </div>
            <label className="p-2 font-bold"> Mobile </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="number"
                min="0"
                onChange={handleNumber}
                required
                value={mobile}
                placeholder="+91-XXXXXXXX"
                />
            </div>
          </div>
          <div className="md:divider md:divider-horizontal"></div> 
          <div>

            <label className="p-2 font-bold"> Password </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                value={password}
                placeholder="Password"
              />
            </div>
            <label className="p-2 font-bold">Confirm Password </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="password"
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
                required
                value={cPassword}
                placeholder="Password"
                />
            </div>
            <p className="p-2 font-bold">
              Already a member{" "}
              <label
                htmlFor="my-modal-3"
                onClick={handleclose}
                className="font-extrabold cursor-pointer text-rose-600 underline"
                >
                Signin
              </label>
            </p>
                  <div className="flex justify-center">
            <button className="btn btn-secondary font-extrabold">
              Sign up
            </button>
                  </div>
                    
                </div>
          </form>
        </div>
      </div>
      <UserOtp mobile={mobile}/>
    </>
  );
};
export default Signup;
