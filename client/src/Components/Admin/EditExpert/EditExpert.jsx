import { useEffect, useState } from "react";
import { axios } from "../../ExpertOTP/import";
import Swal from "sweetalert2";

const EditExpert = ({ expert, handleLoad }) => {
  const [email,setEmail]=useState("")
  const [mobile,setMobile]=useState("")
  const [name,setName]=useState("")
  const [id,setId]=useState()
  const [file,setFile]=useState(null)
  useEffect(() => {
    setEmail(expert?.email)
    setMobile(expert?.mobile)
    setName(expert?.username)
    setId(expert?._id)
    
  }, [expert])
  
  const handleNumber=(e)=>{
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
    
  }
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
    if(name==="" || email===""|| mobile===""){
      Swal.fire("Sorry", "Please enter all details", "error");
    }else{
      const formData = new FormData()
      if(file){
        formData.append("image",file)
      }
      formData.append("id",id)
      formData.append("name",name)
      formData.append("email",email)
      axios.post("admin/editExpert",formData,{headers:{
        "x-access-admintoken": localStorage.getItem("admintoken"),
            "Content-Type": "multipart/form-data",
      }}).then(res=>{
        const editUser= document.getElementById("editExpert")
        if(res.data.status==="success"){
          Swal.fire("Success", "User Edit successfully", "success");
          handleLoad()
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
  return (
    <>
      <input type="checkbox" id="editExpert" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-opacity-90 shadow-2xl shadow-black">
          <label
            htmlFor="editExpert"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold text-center p-3">
            Edit Profile of {expert?.username?.toUpperCase()}
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
                <span className="label-text">Mobile</span>
              </label>
              <input type="number" min="0" value={mobile} onChange={handleNumber} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Profile Pic</span>
              </label>
              <input type="file" onChange={handleFile} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              <div>
            {file ? <img className="w-20 h-20 my-3" src={URL.createObjectURL(file)} alt="image"/>: (expert?.image && <img className="w-20 h-20 my-3" src={expert?.image} alt="image"/>)}
              </div>
              <div className="flex justify-around p-3">

              
              <button onClick={handleSubmit} type="submit" className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditExpert;
