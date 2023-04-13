import { useEffect, useState } from "react"
import axios from "../../../axios/axios"
import Swal from "sweetalert2"


const EditJobs=({job,handleLoad})=>{

    const [role ,setRole]=useState('')
    const [bRate,setBRate]= useState(0)
    const [adRate,setAdRate]=useState(0)
    const [id,setId]=useState('')
    const [listed,SetListed]=useState(false)
    const [file,setFile]=useState(null)
    useEffect(() => {
        setRole(job?.job_role)
        setBRate(job?.base_rate)
        setAdRate(job?.add_rate)
        setId(job?._id)
        SetListed(job?.listed)
    }, [job])
    
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
        if(job==="" || bRate===null || adRate===null){
            Swal.fire("Sorry", "Please enter all details", "error");

        }else{
            const formData = new FormData()
            if(file){
                formData.append("image",file)
              }
              formData.append("id",id)
              formData.append("role",role)
              formData.append("bRate",bRate)
              formData.append("adRate",adRate)

              axios.post("admin/editJob",formData,{headers:{ "x-access-admintoken": localStorage.getItem("admintoken"),
                    "Content-Type": "multipart/form-data"
              }}).then(res=>{
                const editJob=document.getElementById("editJobs")
                if(res.data.status==="success"){
                    Swal.fire("Success", "Job Edit successfully", "success");
                    handleLoad()
                    setFile(null)
                    editJob.checked=false
                }else{
                    Swal.fire("Sorry", "Job Edit failed", "error");
                }

              }).catch((error) => {
                console.error(error);
                Swal.fire("Error", error.message, "error");
              });

        }


    }

    const handleUnList=(e)=>{
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: 'Job will be Affected !!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,  Confirm!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((res)=>{
            if(res.isConfirmed){
              const editJob= document.getElementById("editJobs")

              if(listed){
                axios.get(`/admin/unListJob/${id}`,{headers:{"x-access-admintoken": localStorage.getItem("admintoken")} }).then(res=>{
                    if(res.data.status==="success"){
                        handleLoad()
                        editJob.checked=false
                        Swal.fire(
                            'UnListed!',
                            'Job has been unListed.',
                            'success'
                            );
                    }
                })

              }else if(!listed){
                axios.get(`/admin/listJob/${id}`,{headers:{"x-access-admintoken": localStorage.getItem("admintoken")} }).then(res=>{
                    if(res.data.status==="success"){
                        handleLoad()
                        editJob.checked=false
                        Swal.fire(
                            'Listed!',
                            'Job has been Listed.',
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
    return(


        <>
        <input type="checkbox" id="editJobs" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-opacity-90 shadow-2xl shadow-black">
          <label
            htmlFor="editJobs"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold text-center p-3">
            Edit Job of  {job?.job_role.toUpperCase()}
          </h3>
          <div className="flex justify-center ">
            <form className="p-2 form-control" encType="multipart/form-data">
              <label className="label">
                <span className="label-text">Job Role</span>
              </label>
              <input type="email" value={role?.toUpperCase()} onChange={(e)=>setRole(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Base Rate</span>
              </label>
              <input type="number" value={bRate} min="0" onChange={(e)=>setBRate(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Additional Rate / Hr</span>
              </label>
              <input type="number" min="0" value={adRate} onChange={(e)=>setAdRate(e.target.value)} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Job Icon</span>
              </label>
              <input type="file" onChange={handleFile} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              <div>
            {file ? <img className="w-20 h-20 my-3" src={URL.createObjectURL(file)} alt="image"/>: (job?.image && <img className="w-20 h-20 my-3" src={job?.image} alt="image"/>)}
              </div>
              <div className="flex justify-around p-3">

              <button onClick={handleUnList} className="btn btn-outline btn-warning font-extrabold">{listed ? "UnList" : "List"}</button> 
               <button onClick={handleSubmit} type="submit" className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div> 
        </>
    )
}
export default EditJobs