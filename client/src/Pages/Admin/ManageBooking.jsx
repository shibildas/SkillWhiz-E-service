import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBookingBy } from '../../Services/adminApi'
import { useDispatch, useSelector } from 'react-redux'
import { addBooking } from '../../redux/admin'

const ManageBooking = () => {
    const booking = useSelector(state=> state.admin.value.addBooking)
    const dispatch=useDispatch()
    const {id}= useParams()
    useEffect(() => {
        getBookingBy(id).then(res=>{
            if(res.data.status==="success"){
                dispatch(addBooking(res.data.result))
            }
        })
     
    }, [])
    
  return (
   <>
   <h1>{booking?._id}</h1>
   </>
  )
}

export default ManageBooking