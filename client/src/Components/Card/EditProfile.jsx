import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../import"
import { showAlertError, showAlertSuccess } from "../../Services/showAlert"
import Alert from "../Alert/Alert"
import { editProfileApi } from "../../Services/userApi"

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
      showAlertError(dispatch,"Invalid file type or size. Please select a valid image file.")
    }

  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(name==="" || email===""){
      showAlertError(dispatch,"Please enter all details")
    }else{
      const formData = new FormData()
      if(file){
        formData.append("image",file)
      }
      formData.append("name",name)
      formData.append("email",email)
      editProfileApi(formData).then(res=>{
        const editUser= document.getElementById("editProfile")
        if(res.data.status==="success"){
          showAlertSuccess(dispatch,"User Edit successfully")
          dispatch(login(res.data.result))
          setFile(null)
          editUser.checked=false
        }else{
          showAlertError(dispatch,"User Edit failed")
        }
      }).catch((error) => {
        showAlertError(dispatch,error.message)
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
          <Alert/>
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