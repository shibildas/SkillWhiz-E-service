import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getCounts } from '../../../Services/adminApi'
import {useDispatch} from 'react-redux'
import {showAlertError} from "../../../Services/showAlert"
import {FcAssistant, FcBearish, FcBullish, FcBusinessman} from 'react-icons/fc'
const AllCards = () => {
    const dispatch=useDispatch()
    const [count,setCount]=useState()
    useEffect(()=>{
        getCounts().then((res)=>{
            if(res.data.status==='success'){
                setCount(res.data.result)
            }else{
                showAlertError(dispatch,"something went Wrong")
            }
        }).catch(error=>{
            showAlertError(dispatch,error.message)
        })

    },[])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
            <Card bg="bg-success" value={count?.userCount} topic="Users" route="/admin/users" icon={<FcBusinessman style={{ width: '50px', height: 'auto' }}/>}/>
            <Card bg="bg-purple-400" value={count?.expertCount} topic="Experts" route="/admin/experts" icon={<FcAssistant style={{ width: '50px', height: 'auto' }}/>}/>    
            <Card bg="bg-info" value={count?.bookingCount} topic="Bookings" route="/admin/bookings" icon={<FcBullish style={{ width: '50px', height: 'auto' }}/>}/>
            <Card bg="bg-warning" value={count?.cancelCount} topic="Cancellations" route="/admin/bookings" icon={<FcBearish style={{ width: '50px', height: 'auto' }}/>}/>
            </div>
  )
}

export default AllCards