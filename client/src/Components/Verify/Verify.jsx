import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { axios } from "../ExpertOTP/import";



const Verify = () => {
  const data = useSelector((state) => state.expert.value);
  const [name,setName]=useState("")
  const [front,setFront]=useState(null)
  const [back,setBack]=useState(null)
  
  const changeFront=(event)=>{
const file= event.target.files[0]
const allowed = ["image/jpeg", "image/png","image/jpg"]
const maxSize= 0.5*1024*1024
if(file && allowed.includes(file.type)&& file.size<=maxSize){
    setFront(file)
}else{
   setFront(null)
   Swal.fire(
    "Sorry",
    "Invalid file type or size. Please select a valid image file.",
    "error"
  ); 
}}
  const changeBack=(event)=>{
const file= event.target.files[0]
const allowed = ["image/jpeg", "image/png","image/jpg"]
const maxSize= 0.5*1024*1024
if(file && allowed.includes(file.type)&& file.size<=maxSize){
    setBack(file)
}else{
    setBack(null)
   Swal.fire(
    "Sorry",
    "Invalid file type or size. Please select a valid image file.",
    "error"
  ); 
}

  }
  const handleSubmit=(event)=>{
    event.preventDefault(); // prevent default form submission behavior

    if (name==="" || back===null || front ===null) {
        Swal.fire("Sorry", "Please enter all details", "error");
      return;
    }else{
        const formData = new FormData()
        formData.append("front",front)
        formData.append("back",back)
        formData.append("name",name)

        axios.post("/expert/initialVerify", formData,{
            headers:{
                "x-access-experttoken": localStorage.getItem("experttoken"),
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            if(res.data.status==="success"){
                Swal.fire("Success", "Verification submitted successfully", "success");
                const verification = document.getElementById("verifyModal")
                verification.checked=false
                setBack(null)
                setFront(null)
                setName("")
            }else{
                Swal.fire("Sorry", "Verification failed", "error");
            }
        }).catch((error) => {
            console.error(error);
            Swal.fire("Error", error.message, "error");
          });
    }

  }

  return (
    <>
      {!data.isVerified && (
        <div className="alert alert-warning shadow-lg flex justify-between">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-extrabold">
              Warning: Verify Your Profile{" "}
            </span>
          </div>
          <label
            htmlFor="verifyModal"
            className="bg-lime-600 text-white px-3 py-1 font-extrabold rounded-3xl"
          >
            Verify
          </label>
          <input type="checkbox" id="verifyModal" className="modal-toggle" />
          <div className="modal">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="modal-box relative border-indigo-300 flex flex-col">
              <label
                htmlFor="verifyModal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-2xl font-extrabold text-center p-3">
                Submit Verification Details
              </h3>
              <div className="flex-grow flex justify-center items-center">
                <div className="p-2">
                  <h1 className=" font-bold py-2">FullName as Per ID</h1>
                  <input
                    type="text"
                    placeholder="Type here" onChange={(e)=>setName(e.target.value)}
                    className="input input-bordered input-info w-full max-w-xs"
                  />
                  
                  <h1 className=" font-bold py-2">Upload ID Proof (Front)</h1>
                  <input
                    type="file" onChange={changeFront}
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  />
                  <h1 className=" font-bold py-2">Upload ID Proof (Back)</h1>
                  <input
                    type="file" onChange={changeBack}
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="flex justify-around">
                {front && <img className="w-36 h-20" src={URL.createObjectURL(front)} alt="front" />}
                {back && <img className="w-36 h-20" src={URL.createObjectURL(back)} alt="back" />}
              </div>
              <div className="flex justify-center">

                <button type="submit" className="btn my-2">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Verify;
