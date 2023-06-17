import { useDispatch } from "react-redux";
import { useState, useNavigate, OTP } from "../../Components/ExpertOTP/import";
import { expertlogin } from "../../import";
import { useEffect } from "react";
import Alert from "../../Components/Alert/Alert";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { expertSignIn, expertSignUp } from "../../Services/expertApi";

const LoginExpert = () => {
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("experttoken");
    if (token) {
      navigate("/expert/home");
    }
  }, []);
  const handleShow = () => {
    setShow(false);
  };

  const handleMobile = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
  };
  const handleClose = () => {
    navigate("/");
  };
  const expertSignup = () => {
    if (password === "" || email === "" || name === "" || mobile === "") {
      showAlertError(dispatch, "Please fill all required ");
    } else if(name.length<3 || mobile.length<10){
      showAlertError(dispatch,"validation error")
    } else {
      if (password === cPassword) {
        expertSignUp({
          username: name,
          email: email,
          password: password,
          mobile: mobile,
        })
          .then((response) => {
            if (response.data.status === "success") {
              const expertModal = document.getElementById("expert-otp");
              expertModal.checked = true;
            }
          })
          .catch((error) => {
            showAlertError(dispatch, error.message);
          });
      } else {
        showAlertError(dispatch, "Passwords doesnt match ");
      }
    }
  };
  const handleExpertLogin = () => {
    if (mobile === "" || password === "") {
      showAlertError(dispatch, "All fields are required!!");
    } else {
      expertSignIn({
        mobile: mobile,
        password: password,
      }).then((response) => {
        if (!response.data.auth) {
          showAlertError(dispatch, response.data.message);
        } else {
          localStorage.setItem("experttoken", response.data.experttoken);
          dispatch(expertlogin(response.data.result));
          showAlertSuccess(dispatch, "Expert Sign In Success");
          navigate("/expert/home");
        }
      });
    }
  };

  return (
    <>
      <div className="bg-slate-400 h-screen flex justify-center items-center">
        <div className="p-5 h-max w-max border-2 rounded-2xl bg-blue-950 text-white">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-warning absolute text-right "
          >
            ✕
          </button>
          <h3 className="text-3xl font-extrabold text-center p-2 underline">
            {!show ? "Sign In" : "Register"}
          </h3>

          <div className="flex-grow flex justify-center items-center">
            <div className={`p-2 ${show && "md:flex"}`}>
              <div className="mx-2">
                {show && (
                  <>
                    <h1 className="font-bold py-2">Name</h1>
                    <input
                      type="text"
                      className="border rounded-md p-2 text-black font-bold"
                      placeholder="Username"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                    <h1 className="font-bold py-2">E-mail</h1>
                    <input
                      type="text"
                      className="border rounded-md p-2 text-black font-bold"
                      placeholder="name@exampple.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </>
                )}
                <h1 className="font-bold py-2">Mobile</h1>
                <input
                  type="number"
                  min="0"
                  className="border rounded-md p-2 text-black font-bold"
                  placeholder="+91-"
                  onChange={handleMobile}
                  value={mobile}
                  required
                />
              </div>
              {show && <div className="md:divider md:divider-horizontal"></div>}
              <div className="mx-2">
                <h1 className="font-bold py-2">Password</h1>
                <input
                  type="password"
                  className="border rounded-md p-2 text-black font-bold"
                  placeholder="Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                {!show ? (
                  <p className="py-2">
                    Not an Expert?{" "}
                    <label
                      htmlFor="my-modal-6"
                      className="font-bold cursor-pointer text-teal-100 underline"
                      onClick={() => setShow(true)}
                    >
                      Signup
                    </label>
                  </p>
                ) : (
                  <>
                    <h1 className="font-bold py-2"> Confirm Password</h1>
                    <input
                      type="password"
                      className="border rounded-md p-2 text-black font-bold"
                      placeholder="Your Password"
                      onChange={(e) => setCPassword(e.target.value)}
                      value={cPassword}
                      required
                    />
                    <p className="py-2">
                      Already an Expert?{"  "}
                      <label
                        htmlFor="my-modal-6"
                        className="font-bold cursor-pointer text-purple-300 underline"
                        onClick={() => setShow(false)}
                      >
                        SignIn
                      </label>
                    </p>
                  </>
                )}
                <div className="p-3 flex justify-center">
                  {!show ? (
                    <>
                      {" "}
                      <button
                        onClick={handleExpertLogin}
                        className="btn btn-warning font-extrabold"
                      >
                        Login
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        onClick={expertSignup}
                        className="btn btn-secondary font-extrabold"
                      >
                        Signup
                      </button>
                    </>
                  )}
                </div>
                <Alert />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OTP mobile={mobile} handleShow={handleShow} />
    </>
  );
};
export default LoginExpert;
