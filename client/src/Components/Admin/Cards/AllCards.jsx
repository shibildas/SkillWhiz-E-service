import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getCounts } from '../../../Services/adminApi'
import {useDispatch} from 'react-redux'
import {showAlertError} from "../../../Services/showAlert"
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
            <Card bg="bg-success" value={count?.userCount} topic="Users" route="/admin/users"/>
            <Card bg="bg-warning" value={count?.expertCount} topic="Experts" route="/admin/experts"/>    
            <Card bg="bg-info" value={count?.bookingCount} topic="Bookings" route="/admin/bookings"/>
            <Card bg="bg-error" value={count?.cancelCount} topic="Cancellations" route="/admin/bookings"/>
            </div>
  )
}

export default AllCards