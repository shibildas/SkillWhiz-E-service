import React, { useEffect, useState } from "react";
import { expertAxiosInstance } from "../../axios/instance";

function AddEstimate({ bookId,jobId ,handleLoad}) {
  const [hours, setHours] = useState("");
  const [hoursRate, setHoursRate] = useState(null)
  const [parts, setParts] = useState("");
  const [price, setPrice] = useState("");
  const [partsPrice, setPartsPrice] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleSelect = (e) => {
    e.preventDefault()
    if (parts === "" || price === "") {
      setMessage("Both Price and PartName Required");
      setError(true);
    } else {
      const add = { pName: parts, price: price };
      setSelected([...selected, add]);
      setError(false);
      setParts("");
      setPrice("");
    }
  };
  const sendEstimate=()=>{
    if(hours===""){
        setMessage("Select Hours First")
        setError(true)
    }else{
        expertAxiosInstance.post('/sendEstimate',{bookId:bookId,hours:hours,parts:selected, amount:(Number(hoursRate)+Number(partsPrice))}).then((res)=>{
            if(res.data.status==="success"){
                setParts("");
                setPrice("");
                setSelected([])
                handleLoad()
                const modal= document.getElementById("addEstimate")
                modal.checked=false
            }else{
                setMessage("Something Went Wrong")
                setError(true)
            }
        }).catch(error=>{
            setMessage(error.message)
            setError(true)
        })
    }

  }
  useEffect(() => {
    setPartsPrice(selected?.reduce((acc,curr)=>{
    acc= parseInt(acc)+parseInt(curr.price)
       return(
            acc
       )

   },[0]))

   setHoursRate((jobId?.base_rate+(jobId?.add_rate*(parseInt(hours)-2))))

  }, [selected,hours])
  
  
  return (
    <>
      <input type="checkbox" id="addEstimate" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box ">
          <label
            htmlFor="addEstimate"
            className="btn btn-sm btn-circle absolute btn-ghost right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center py-2">
            Send Estimate for the {jobId?.job_role?.toUpperCase()} Job
          </h3>
          <label className="p-2 font-bold underline">Select Estimated Hours </label>
          <div className="border rounded-xl">
            <div className="p-2">
              <select
                className="select select-success w-full max-w-xs"
                value={hours}
                onChange={(e) => {setHours(e.target.value) 
                    setError(false)}}
              >
                <option disabled value="">
                  Select hours...
                </option>
                <option value="2">Two Hours</option>
                <option value="3">Three Hours</option>
                <option value="4">Four Hours</option>
                <option value="5">Five Hours</option>
                <option value="6">Six Hours</option>
              </select>
            </div>
            <div className="my-2 flex justify-between px-2">

            <label className="p-2 font-bold underline"> Added Parts</label>
                    <label onClick={()=>setSelected([])} className="btn btn-sm btn-info" >Clear Parts</label>
            </div>
            <div className="border rounded-xl m-2 h-40 overflow-y-scroll">
              {selected?.length != 0 &&
                selected?.map((ele,index) => {
                  return (
                    <p className="border text-center " key={index}>
                      Partname: {ele?.pName}, <br /> Price: ₹ {ele?.price}
                      <br />
                    </p>
                  );
                })
                
            }
            {selected?.length != 0 &&
            <>

                <div className="divider"></div> 
                <p className="p-2"> Total Parts Price: ₹ {partsPrice}</p>
                </>
            
            }
                {hours&&<>
                 <div className="divider"></div> 
                 <b className="p-2">Total hour Rate: ₹ {hoursRate} </b>
                 <div className="divider"></div> 
                </>}
                
            </div>
            <div className="border rounded-xl m-2">
              <div className="form-control">
                <label className="input-group input-group-vertical p-2">
                  <span>Parts</span>
                  <input
                    type="text"
                    value={parts}
                    onChange={(e) => {
                      setParts(e.target.value);
                      setError(false);
                    }}
                    placeholder="eg:Araldite"
                    className="input input-bordered"
                  />
                </label>
                <label className="input-group input-group-vertical p-2">
                  <span>Parts price</span>
                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setError(false);
                    }}
                    placeholder="Rs:100"
                    className="input input-bordered"
                  />
                </label>
                <button onClick={handleSelect} className="btn btn-sm mx-2">
                  {" "}
                  Add Parts List
                </button>
              </div>
            </div>
            {hours&&<div className="p-2" >
               
               <div className="divider"></div> 
               <b className="p-2 font-semibold text-xl">Estimation Total: ₹ {Number(hoursRate)+Number(partsPrice)} </b>
            
              </div>}
            <div className="flex justify-center p-2">
              <button onClick={sendEstimate} className="btn btn-success">Send Estimation</button>
            </div>

            {error && (
              <div className="alert alert-warning  shadow-lg">
                <div>
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
                  <span>Warning: {message}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEstimate;
