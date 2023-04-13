import { useEffect, useState } from "react";
import { axios } from "../../ExpertOTP/import";
import Swal from "sweetalert2";

const EditUser = ({ user, handleLoad }) => {
  const [email,setEmail]=useState(user?.email || "")
  const [mobile,setMobile]=useState(user?.mobile || "")
  const [name,setName]=useState(user?.username || "")
  const [id,setId]=useState()
  const [file,setFile]=useState(null)
  useEffect(() => {
    setEmail(user?.email)
    setMobile(user?.mobile)
    setName(user?.username)
    setId(user?._id)
    
  }, [user])
  
  const handleNumber=(e)=>{
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
    
  }
  const handleBlock=(e)=>{
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: 'User will be Banned !!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,  Confirm!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((res)=>{
      if(res.isConfirmed){
        const editUser= document.getElementById("editUser")
        
        if(user?.isBanned){
          axios.post("admin/unBlockUser",{headers:{"x-access-admintoken": localStorage.getItem("admintoken")},_id:id}).then((res)=>{
            if(res.data.status==="success"){
              handleLoad()
              editUser.checked=false
              Swal.fire(
                'UnBlocked!',
                'User has been unBlocked.',
                'success'
                );

            }
          })
        }else if(!user?.isBanned){
          axios.post("admin/blockUser",{headers:{"x-access-admintoken": localStorage.getItem("admintoken")},_id:id}).then((res)=>{
            if(res.data.status==="success"){
              handleLoad()
              editUser.checked=false
              Swal.fire(
                'Blocked!',
                'User has been blocked.',
                'success'
              );
            }
          })
        }
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        );
      }
    })

  }
  const handleSubmit=(e)=>{
    e.preventDefault()

  }
  return (
    <>
      <input type="checkbox" id="editUser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-opacity-90 shadow-2xl shadow-black">
          <label
            htmlFor="editUser"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold text-center p-3">
            Edit Profile of {user?.username?.toUpperCase()}
          </h3>
          <div className="flex justify-center ">
            <form className="p-2 form-control" encType="multipart/formData">
              <label className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Mobile</span>
              </label>
              <input type="number" min="0" value={mobile} onChange={handleNumber} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Profile Pic</span>
              </label>
              <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              <div>
            {file ? <img className="w-20 h-20 my-3" src={URL.createObjectURL(file)} alt="image"/>: (user?.image && <img className="w-20 h-20 my-3" src={user?.image} alt="image"/>)}
              </div>
              <div className="flex justify-around p-3">

              <button onClick={handleBlock} className="btn btn-outline btn-warning font-extrabold">{user?.isBanned ? "UnBlock" : "Block"}</button>
              <button onClick={handleSubmit} type="submit" className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditUser;
