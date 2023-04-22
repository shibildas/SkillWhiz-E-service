import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axios, login } from "../../import"
import { Swal } from "../ExpertOTP/import"
import { userAxiosInstance } from "../../axios/instance"

const EditProfile=()=>{
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user.value)
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [file,setFile]=useState(null)

  useEffect(() => {
    setEmail(user?.email)
    setName(user?.username)
   
    
  }, [user])

  const handleFile=(event)=>{
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif" ,"image/jpg"]; // allowed image types
    const maxSize = 0.5 * 1024 * 1024; // 0.5MB maximum file size
    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      setFile(file);
    } else {
      setFile(null);
      Swal.fire(
        "Sorry",
        "Invalid file type or size. Please select a valid image file.",
        "error"
      );
    }

  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(name==="" || email===""){
      Swal.fire("Sorry", "Please enter all details", "error");
    }else{
      const formData = new FormData()
      if(file){
        formData.append("image",file)
      }
      formData.append("name",name)
      formData.append("email",email)
      userAxiosInstance.post("/editProfile",formData,{headers:{"Content-Type": "multipart/form-data",
      }}).then(res=>{
        const editUser= document.getElementById("editProfile")
        if(res.data.status==="success"){
          Swal.fire("Success", "User Edit successfully", "success");
          dispatch(login(res.data.result))
          setFile(null)
          editUser.checked=false

        }else{
          Swal.fire("Sorry", "User Edit failed", "error");
        }
      }).catch((error) => {
        console.error(error);
        Swal.fire("Error", error.message, "error");
      });

    }


  }
    return(
        <>
        <input type="checkbox" id="editProfile" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-opacity-90 shadow-2xl shadow-black">
          <label
            htmlFor="editProfile"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold text-center p-3">
            Edit Profile
          </h3>
          <div className="flex justify-center ">
            <form className="p-2 form-control" encType="multipart/form-data">
              <label className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" value={name?.toUpperCase()} onChange={(e)=>setName(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" /> 
              <label className="label">
                <span className="label-text">Profile Pic</span>
              </label>
              <input type="file" onChange={handleFile} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              <div>
            {file ? <img className="w-20 h-20 my-3" src={URL.createObjectURL(file)} alt="image"/>: (user?.image && <img className="w-20 h-20 my-3" src={user?.image} alt="image"/>)}
              </div>
              <div className="flex justify-center p-3">
              <button onClick={handleSubmit} type="submit" className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

        </>
    )
}
export default EditProfile