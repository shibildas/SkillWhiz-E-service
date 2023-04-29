import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom"
import { Swal } from "../../Components/ExpertOTP/import"
import Chat from "../../Components/Chat/Chat"
import { userAxiosInstance } from "../../axios/instance"

import { useDispatch, useSelector } from "react-redux"
import Estimate from "../../Components/Estimate/Estimate"
import { addBooking } from "../../redux/user"
import { payOnline, verifyPayment } from "../../Services/userApi"

const BookingDetail=()=>{
    const dispatch=useDispatch()
    const book= useSelector(state=>state.user.value.bookings)
   const username=useSelector(state=>state.user.value._id)

 
    const {id}=useParams()
    const [booking,setBooking]=useState({})
    const [load,setLoad]=useState(false)
    const [estimate,setEstimate]=useState({})
    const [user,setUser]=useState({})
    const [job,setJob]=useState({})
    const [other,setOther]=useState({})
    const [address,setAddress]=useState({})
    const handleLoad=()=>{
        setLoad(!load)
    }
    useEffect(()=>{
        setUser(booking?.userId)
        setOther(booking?.expertId)
        setAddress(booking?.address)
        setEstimate(booking?.estimate)
        setJob(booking?.jobId)

    },[booking])
  

    useEffect(()=>{
        userAxiosInstance.get(`/booking/${id}`).then(res=>{
            if(res.data.status==="success"){
                setBooking(res.data.result)
                dispatch(addBooking(res.data.result))


            }else{
                Swal.fire("error","NetworkError","error")
            }
        }).catch(error=>{
            Swal.fire("error",error.message,"error")
        })
    },[load])
    const initPayment=(data)=>{
        const options={
           key:"rzp_test_CBA26h7xqNYbSQ",
           amount:data.amount,
           currency:data.currency,
           name:book?.jobId?.job_role,
           image:book?.jobId?.image,
           order_id:data.id,
           handler:async(response)=>{
            try {
             const {data}= await verifyPayment(response)
             console.log(data); 
            } catch (error) {
                console.log(error);
            }
           },
           theme:{
            color:"#3399cc"
           }
        }
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    }  
const handlePayment=async()=>{
    try {
        const {data}= await payOnline(book?.bill_amount)
        console.log(data);
        initPayment(data.data)
    } catch (error) {
        console.log(error);
    }

}
    return(
        <>
        <div className="bg-slate-50 p-2 mt-5 rounded-t-xl flex justify-center">

            <h1 className="text-xl md:text-3xl font-extrabold">Booking Detail</h1>
        </div>
        <div className="bg-slate-50 p-2  flex justify-center ">
        <ul className="steps md:text-2xl text-sm  font-bold">
  <li data-content="📬" className="step step-secondary ">Open</li>
  <li data-content="⛹" className="step step-secondary">Partner Assigned</li>
  <li data-content="⏲" className={`step ${estimate?.status==="approved" && "step-secondary"}`}>In Progress</li>
  <li data-content="✔" className="step">Completed</li>
  <li data-content="🗐" className="step">invoiced</li>
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
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Partner Assigned: </h1> <h1>{booking?.expertId?.username?.toUpperCase()}<br/> Ph: +91- {booking?.expertId?.mobile}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Estimate Amount: </h1> <h1> {booking?.estimate?.amount ? <label  htmlFor={`${estimate?.status!=="approved" &&"estimate"}`} className={`  ${estimate?.status!=="approved" && "tooltip btn btn-sm btn-success"} font-extrabold text-xl`} data-tip="View Estimate">Rs : {booking?.estimate?.amount}</label> :"Estimation Pending"}{estimate?.status!=="approved" && <span className="indicator-item badge badge-primary">view</span>} </h1></div>
<div className="divider "></div>
{(book?.status==="completed" )&& <div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Invoice Amount</h1> <div><h1 className="text-center">₹ {book?.bill_amount}</h1><label className="btn m-2 btn-warning" onClick={handlePayment} >Pay Online</label> </div> </div>}
<div className="divider "></div>
    </div>
</div>
        <div className="flex justify-center bg-slate-100 bg-opacity-60 mb-5">
        {/* <Chat room={id} username={username} user={user} other={other}/> */}
        </div>
        <Estimate address={address} user={user} estimate={estimate} job={job} id={id} handleLoad={handleLoad}/>
        </>
    )
}
export default BookingDetail