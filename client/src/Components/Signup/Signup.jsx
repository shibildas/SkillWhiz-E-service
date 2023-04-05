import { useState } from "react";
import axios from "../../axios/axios"
import swal from "sweetalert2"


const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handlesignup = (e) => {
    e.preventDefault();
    if (password === "" || email === "" || name === "" || mobile == "") {
    }else{
      axios.post("/signup",{
        username:name,
        email:email,
        password:password,
        mobile:mobile
      }).then((response)=>{
            console.log(response.data);
            if(response.data.status === "success"){
                swal.fire({
                    title: 'Enter OTP',
                    input: 'text',
                    inputPlaceholder: 'Enter OTP here...',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    showLoaderOnConfirm: true,
                    preConfirm: (otpCode) => {
                      // Return OTP code to be used in the next Axios request
                      return otpCode;
                    },
                    allowOutsideClick: () => !swal.isLoading()
                  })
                  .then(otpCode => {
                    otp=otpCode?.value
                    // Make Axios request with OTP code
                    axios.post('/verify-otp', {  otp,mobile:mobile})
                      .then(response => {
                        console.log(response.data);
                        const modalCheckbox = document.getElementById('my-modal-6');
                        modalCheckbox.checked = false;
                      })
                      .catch(error => {
                        console.log(error);
                      
                      });
                  });
            }
        })
    }
  };
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-middle ">
        <div className="modal-box flex justify-center">
          <form onSubmit={handlesignup}>
            <h1 className="m-10">Signup</h1>
            <label className="p-2"> Username </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="username"
              />
            </div>
            <label className="p-2"> E-mail </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder="some@mail.com"
              />
            </div>
            <label className="p-2"> Mobile </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="number"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
                placeholder="+91-XXXXXXXX"
              />
            </div>
            <label className="p-2"> Password </label>
            <div className="p-2">
              <input
                className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                placeholder="Password"
              />
            </div>

            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn">
                Close
              </label>
            </div>
              <button className="ml-24 hover:bg-black bg-purple-800 mt-2 p-1 pr-2 pl-2 rounded-lg text-white">
                Sign up
              </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
