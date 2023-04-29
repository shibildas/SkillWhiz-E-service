import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom"
import { Swal } from "../../Components/ExpertOTP/import"
import Chat from "../../Components/Chat/Chat"
import { expertAxiosInstance } from "../../axios/instance"
import { useDispatch, useSelector } from "react-redux"
import AddEstimate from "../../Components/Estimate/AddEstimate"
import Startjob from "../../Components/Start/Startjob"
import { EndJob } from "../../Components/Start/EndJob"
import { addBooking } from "../../redux/expert"




const AppointmentDetail=()=>{
    const dispatch=useDispatch()
    const book=useSelector(state=> state.expert.value.bookings)
    const username= useSelector(state=>state.expert.value._id)
    const {id}=useParams()
    const [show,setShow]=useState(false)
    const [type,setType] = useState(false)
    const [message,setMessage]=useState('')
    const [booking,setBooking]=useState({})
    const [job,setJob]=useState({})
    const [user,setUser]=useState({})
    const [other,setOther]=useState({})
    const [load,setLoad]=useState(false)
    const [start,setStart]=useState('')
    const [estimate,setEstimate]=useState({})

    const handleLoad=()=>{
        setLoad(!load)
    }
    const handleAlert=(alert,msg)=>{
        setType(alert)
        setMessage(msg)
        setShow(true)
    }
    const handleClose=()=>{
        setMessage('')
        setShow(false)
    }

    useEffect(()=>{
        setUser(booking?.expertId)
        setOther(booking?.userId)
        setJob(booking?.jobId)
        setStart(new Date(booking?.jobStart))
        setEstimate(booking?.estimate)
    },[booking])

  

    useEffect(()=>{
        expertAxiosInstance.get(`/booking/${id}`).then(res=>{
            if(res.data.status==="success"){
                dispatch(addBooking(res.data.result))
                setBooking(res.data.result)

            }else{
                Swal.fire("error","NetworkError","error")
            }
        }).catch(error=>{
            Swal.fire("error",error.message,"error")
        })
    },[load])
   
    

    return(
        <>
        {show && <div className={`alert ${type ? "alert-success" :"alert-error" } shadow-lg`}>
 

    <span>{message}</span>
    <button onClick={handleClose} className="btn btn-ghost btn-sm btn-circle">x</button>

</div>}
        <div className="bg-slate-50 p-2 mt-5 rounded-t-xl flex justify-center">
            

            <h1 className="text-xl md:text-3xl font-extrabold">Booking Detail</h1>
        </div>
        <div className="bg-slate-50 p-2  flex justify-center ">
        <ul className="steps md:text-2xl text-sm  font-bold">
  <li data-content="📬" className="step step-secondary ">Open</li>
  <li data-content="⛹" className="step step-secondary">Partner Assigned</li>
  <li data-content="⏲" className={`step ${booking?.estimate?.status==="approved" && "step-secondary"}`}>In Progress</li>
  <li data-content="✔" className={`step ${book?.status===("completed") && "step-secondary"}`}>Completed</li>
  <li data-content="🗐" className={`step ${book?.status==="invoiced" && "step-secondary"}`}>invoiced</li>
  <li data-content="📪" className="step">Closed</li>
  {(booking?.status==="cancelled")&&<li data-content="🗙" className="step">Cancelled</li> }
</ul>
        </div>
<div className="bg-slate-50 p-2 h-fit w-full flex justify-center opacity-90 shadow-xl">
    <div className="w-3/5">

<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Booking ID: </h1> <h1>{booking?._id}</h1></div>
<div className="divider "></div>
<div className="flex justify-between  font-semibold p-2 flex-wrap"> <h1 className="text-xl">Booking Status: </h1> <h1>{booking?.status}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Scheduled: </h1> <h1>{booking?.slot}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Address: </h1> <h1>{booking?.address?.name?.toUpperCase()} <br/>{booking?.address?.house }<br/>{booking?.address?.street }<br/>{booking?.address?.pincode }</h1></div>
<div className="divider "></div>
{/* <div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Partner Assigned: </h1> <h1>{booking?.expertId?.username?.toUpperCase()}<br/> Ph: +91- {booking?.expertId?.mobile}</h1></div> */}
{/* <div className="divider "></div> */}
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Estimate Amount: </h1> <h1> {booking?.estimate?.amount ? `Rs: ${booking?.estimate?.amount}` :<label htmlFor="addEstimate" className="btn btn-secondary">Add Estimate </label>}</h1></div>
<div className="divider "></div>
{(book?.estimate?.status==="approved" && book?.status==="pending" )&& <div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Estimate Approved:</h1> <label className="btn btn-md " htmlFor="startJob">Start Job</label> </div>}
{(book?.status==="started" )&& <div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Job Started at:</h1> <div><h1>{start?.toLocaleDateString()} , {start?.toLocaleTimeString([], { hour12: true })}</h1><label htmlFor="endJob" className="btn m-2 btn-warning" >End job</label> </div> </div>}
{(book?.status==="completed" )&& <div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Invoice Amount</h1> <div><h1 className="text-center">₹ {book?.bill_amount}</h1><label className="btn m-2 btn-warning" >Recieve Cash</label> </div> </div>}
<div className="divider "></div>

    </div>
</div>
        <div className="flex justify-center bg-slate-100 bg-opacity-60 mb-5 h-screen">
        {/* <Chat room={id} username={username} user={user} other={other}/> */}
        <AddEstimate bookId={id} jobId={job} handleLoad={handleLoad}/>
        <Startjob id={id} handleLoad={handleLoad} handleAlert={handleAlert}/>
        <EndJob  handleLoad={handleLoad} handleAlert={handleAlert}/>
        </div>
        </>
    )
}
export default AppointmentDetail