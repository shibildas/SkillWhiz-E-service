import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom"
// import Chat from "../../Components/Chat/Chat"
import { userAxiosInstance } from "../../axios/instance"

import { useDispatch, useSelector } from "react-redux"
import Estimate from "../../Components/Estimate/Estimate"
import { addBooking } from "../../redux/user"
import { payOnline, verifyPayment } from "../../Services/userApi"
import { showAlertError } from "../../Services/showAlert"

const BookingDetail=()=>{
    const dispatch=useDispatch()
    const book= useSelector(state=>state.user.value.bookings)
   const username=useSelector(state=>state.user.value._id)

 
    const {id}=useParams()
    const [load,setLoad]=useState(false)
    const [user,setUser]=useState({})
    const [other,setOther]=useState({})
    const handleLoad=()=>{
        setLoad(!load)
    }
    useEffect(()=>{
        setUser(book?.userId)
        setOther(book?.expertId)

    },[book])
  

    useEffect(()=>{
        userAxiosInstance.get(`/booking/${id}`).then(res=>{
            if(res.data.status==="success"){
              
                dispatch(addBooking(res.data.result))


            }else{
                showAlertError(dispatch,"NetworkError")
            }
        }).catch(error=>{
            showAlertError(dispatch,error.message)
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
             
             const {data}= await verifyPayment(response,id)
             console.log(data);
             if(data){

                 handleLoad()
             } 
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
        <div className="bg-slate-700 p-2 mt-5 rounded-t-xl flex justify-center">

            <h1 className="text-xl md:text-3xl font-extrabold text-white m-5">Booking Detail</h1>
        </div>
        <div className="bg-purple-300 p-5 bg-opacity-95 flex justify-center ">
        <ul className="steps md:text-2xl text-sm  font-bold">
  <li data-content="📬" className="step step-secondary ">Open</li>
  <li data-content="⛹" className="step step-secondary">Partner Assigned</li>
  <li data-content="⏲" className={`step ${book?.estimate?.status==="approved" } ${book?.status==="invoiced" && "step-secondary"} ${book?.status==="completed"&& "step-secondary"}`}>In Progress</li>
  <li data-content="✔" className={`step ${book?.status==="invoiced"&& "step-secondary"} ${book?.status==="completed"&& "step-secondary"}`}>Completed</li>
  <li data-content="🗐" className={`step ${book?.status==="invoiced"&& "step-secondary"}`}>invoiced</li>
  <li data-content="📪" className="step">Closed</li>
  {(book?.status==="cancelled")&&<li data-content="🗙" className="step">Cancelled</li> }
</ul>
        </div>
<div className="bg-purple-300 p-2 h-fit w-full flex justify-center opacity-95 rounded-b-xl shadow-xl">
    <div className="w-3/5">

<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Booking ID: </h1> <h1>{book?._id}</h1></div>
<div className="divider "></div>
<div className="flex justify-between  font-semibold p-2 flex-wrap"> <h1 className="text-xl">Booking Status: </h1> <h1>{book?.status}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Scheduled: </h1> <h1>{book?.slot}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Address: </h1> <h1>{book?.address?.name?.toUpperCase()} <br/>{book?.address?.house }<br/>{book?.address?.street }<br/>{book?.address?.pincode }</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Partner Assigned: </h1> <h1>{book?.expertId?.username?.toUpperCase()}<br/> Ph: +91- {book?.expertId?.mobile}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Estimate Amount: </h1> <h1> {book?.estimate?.amount ? <label  htmlFor={`${book?.estimate?.status!=="approved" &&"estimate"}`} className={`  ${book?.estimate?.status!=="approved" && "tooltip btn btn-sm btn-success"} font-extrabold text-xl`} data-tip="View Estimate">Rs : {book?.estimate?.amount}</label> :"Estimation Pending"}{book?.estimate?.status!=="approved" && <span className="indicator-item badge badge-primary">view</span>} </h1></div>
<div className="divider "></div>
{(book?.status==="completed" ||book?.status==="invoiced")&& <div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Invoice Amount</h1> <div><h1 className="text-center">₹ {book?.bill_amount}</h1>{(book?.status==="completed" )&& <label className="btn m-2 btn-warning" onClick={handlePayment} >Pay Online</label>} </div> </div>}
{book?.status==="invoiced"&& <>
<div className="divider "></div>
<div className="flex-col">
    <h1>Rate the Job</h1>
<div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
<div className="">
<textarea placeholder="Review here..." className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea> 
</div>
<button className="btn btn-sm md:btn-md my-2">Submit </button>
</div>
<div className="divider "></div>
</>}
    </div>
</div>
<div className="flex justify-center bg-slate-100 bg-opacity-60 mb-5">
        {/* <Chat room={id} username={username} user={user} other={other}/> */}
        </div>
        <Estimate address={book?.address} user={user} estimate={book?.estimate} job={book?.jobId} id={id} handleLoad={handleLoad}/>
        </>
    )
}
export default BookingDetail