import { useSelector } from "react-redux";
import ChangePassword from "../ChangePassword/ChangePassword";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import Swal from "sweetalert2";
import ReVerify from "./VerifyOTP";
import EditProfile from "./EditProfile";

const ProfileCard = () => {
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState("");
  const data = useSelector((state) => state.user.value);
  const handleshow = () => {
    setShow(false);
  };
  useEffect(() => {
    setMobile(data?.mobile);
  }, [data]);

  const handleNumber = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
  };
  const handleVerify = () => {
    if (mobile.length > 9) {
      if (mobile === data?.mobile) {
        setShow(false);
      } else {
        axios
          .post(
            "/re-Verify",
            { mobile: mobile },
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.status === "success") {
              const modalOTP = document.getElementById("modalOtp");
              modalOTP.checked = true;
            }
          })
          .catch((error) => {
            Swal.fire("error", "Network Error:" + error.message, "error");
          });
      }
    } else {
      Swal.fire("error", "Invalid mobile number", "error");
    }
  };

  return (
    <>
      <div
        className="font-sans bg-cover bg-center my-10 rounded-2xl shadow-2xl shadow-black h-screen flex flex-row justify-center items-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dpfnxwvps/image/upload/v1681450055/bc_scaulu.png)",
        }}
      >
        <div className="card w-96 mx-auto bg-slate-300 opacity-95  shadow-2xl shadow-black hover:shadow">
          <div className="flex justify-end">
            <label
              htmlFor="editProfile"
              className="m-2 cursor-pointer btn btn-ghost"
            >
              {" "}
              Edit{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </label>
          </div>
          <img
            className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
            src={
              data?.image
                ? data?.image
                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt=""
          />
          <div className="text-center mt-4 text-3xl flex justify-around items-center font-bold">
            {data?.username}
          </div>
          <div className="text-center mt-4 font-mono font-bold flex justify-around  items-center text-sm">
            E-mail: {data?.email}
          </div>
          <div className="text-center font-normal flex justify-center  items-center text-lg">
            Mob:{" "}
            {!show ? (
              <>
                +91-{" "}
                <b
                  onClick={() => setShow(true)}
                  className="mx-2 cursor-pointer flex"
                >
                  {data?.mobile}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill mx-2 my-1 text-primary-focus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </b>
              </>
            ) : (
              <>
                <input
                  type="number"
                  value={mobile}
                  onChange={handleNumber}
                  min="0"
                  placeholder="Type here"
                  className=" ml-1 input input-ghost w-1/2"
                />
                <button
                  onClick={handleVerify}
                  className="btn btn-circle btn-ghost mr-2 text-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </button>
              </>
            )}{" "}
          </div>

          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <button className="font-bold btn btn-ghost btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-share-fill mx-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                </svg>{" "}
                Share
              </button>
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center flex justify-center items-center">
              <label
                htmlFor="chPass"
                className="cursor-pointer font-bold underline underline-offset-4"
              >
                Change Password
              </label>
            </div>
          </div>
        </div>
      </div>
      <ChangePassword />
      <ReVerify handleshow={handleshow} mobile={mobile} />
      <EditProfile />
    </>
  );
};
export default ProfileCard;
