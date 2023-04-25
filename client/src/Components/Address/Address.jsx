import { useEffect, useState } from "react"
import ConfirmSchedule from "./Confirm"
import { userAxiosInstance } from "../../axios/instance"

const Address=({selectTime,job})=>{
    const [load,setLoad]=useState(false)
    const [address,setAddress]=useState([])
    const [select,setSelect]=useState(null)
    useEffect(() => {
        userAxiosInstance.get('/address').then(res=>{
            if(res.data.status==="success"){
                setAddress(res.data.result)
            }
        })
     
    }, [load])

    const handleSelect=(ele)=>{
     
            setSelect(ele)
        
      

    }
    const handleLoad=()=>{
        setLoad(!load)
    }
  
    return(
        <>
        <input type="checkbox" id="selectAddress" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="selectAddress" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <h3 className="text-xl text-center font-bold p-2">Select Address</h3>
    <div className="border-gray-400 border-2 p-2 rounded-2xl">
{address.length!=0 ?
        address.map((ele,index)=>{
         return(<div key={index+20} className={`border border-zinc-400 rounded-xl font-semibold p-2 m-2 ${(select?._id===ele?._id) ? "bg-cyan-200":"bg-indigo-100"}`} onClick={()=>handleSelect(ele)}>
            <h1 className="">{ele?.name}</h1>
            <h1 className="">{ele?.house}</h1>
            <h1 className="">{ele?.street}, PinCode: {ele?.pincode}</h1>

        </div>)}):<div className="border border-zinc-400 rounded-xl font-semibold p-2 m-2 bg-indigo-100 h-24 flex justify-center items-center text-3xl">
            <label className="link" htmlFor="addAddress">+ Add a New Address</label>
            </div>}



    <div className="m-2"><label className="btn btn-success" htmlFor="addAddress">Add New</label></div>
    </div>
    <div className="flex justify-center m-2">{select&&<label htmlFor="confirm" className="btn">Confirm</label>}</div>
    
  </div>
</div>
<AddAddress handleLoad={handleLoad}/>
<ConfirmSchedule selectTime={selectTime} job={job} address={address} />

        </>
    )
}

export default Address