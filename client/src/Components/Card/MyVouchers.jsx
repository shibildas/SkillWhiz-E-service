import React from 'react'
import { useSelector } from 'react-redux'
import VoucherCard from './VoucherCard'

const MyVouchers = () => {
    const vouchers=useSelector(state=>state.user.value.vouchers)
  return (
    <div className="font-sans  rounded-2xl shadow-2xl bg-gray-800 shadow-black flex flex-row justify-center items-center my-3">

<div className='card-body items-center'>
    <h1 className='card-title text-white underline underline-offset-2'>My Vouchers</h1>

    {vouchers?.length && vouchers?.map((vouch,index)=>{
        return(
            <div key={index} className="card w-fit bg-base-100 shadow-xl image-full my-3">
              <VoucherCard voucher={vouch}/>  
            </div>
        )
    })}
</div>
    </div>
  )
}

export default MyVouchers