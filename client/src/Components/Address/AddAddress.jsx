import { useState } from "react"
import { Swal } from "../ExpertOTP/import"
import { userAxiosInstance } from "../../axios/instance"

const AddAddress=({handleLoad})=>{
    const [name,setName]=useState('')
    const [house,setHouse]=useState('')
    const [street,setStreet]=useState('')
    const [pincode,setPincode]=useState()
    const handleSubmit=()=>{
        if(name===""||house===''||street===''||pincode===''){
            Swal.fire("sorry","Fill all details",'error')
        }else{
            if(pincode.length<6){
                Swal.fire("sorry","Wrong Pin, pincode supposed to be 6 digits",'error')

            }else{
                userAxiosInstance.post('/addAddress',{name:name,
                    house:house,
                    street:street,
                    pincode:pincode
                }).then((res)=>{
                        if(res.data.status==="success"){
                            const closemodal= document.getElementById("addAddress")
                            Swal.fire("success","Address Added Successfully","success")
                            handleLoad()
                            closemodal.checked=false

                        }
                })
            }
        }
    }
    const handleNumber=(e)=>{
        const trimValue=e.target.value.replace(/[^0-9]/g, "")
        if(trimValue.length<=6){
            setPincode(trimValue)
        }

    }

    return(
        <>
        <input type="checkbox" id="addAddress" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="addAddress" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-lg text-center font-bold p-2">Add New Address</h3>
    <div className="justify-center p-5">
    <label className="input-group input-group-vertical p-2">
    <span className="font-bold p-1 bg-slate-300 px-3 ">Name</span>
    <input type="text" placeholder="name " onChange={(e)=>setName(e.target.value)} className="input input-bordered" />
  </label>
    <label className="input-group input-group-vertical p-2">
    <span className="font-bold p-1 bg-slate-300 px-3 ">House No</span>
    <textarea type="text" placeholder="House Name/Number " onChange={(e)=>setHouse(e.target.value)} className="textarea textarea-bordered h-24" />
  </label>
    <label className="input-group input-group-vertical p-2">
    <span className="font-bold p-1 bg-slate-300 px-3 ">Street</span>
    <input type="text" placeholder="Street Name " onChange={(e)=>setStreet(e.target.value)} className="input input-bordered" />
  </label>
    <label className="input-group input-group-vertical p-2">
    <span className="font-bold p-1 bg-slate-300 px-3 ">Pincode</span>
    <input type="number" min="0" value={pincode} onChange={handleNumber} placeholder="123134 " className="input input-bordered" />
  </label>

    </div> 
    <div className="flex justify-center p-2">
  <button className="btn" onClick={handleSubmit}>Add</button>
    </div>
  </div>
</div>
        </>
    )
}
export default AddAddress