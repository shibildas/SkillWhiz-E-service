import React from 'react'
import { useSelector } from 'react-redux'
import AllVouchers from '../Vouchers/AllVouchers'

function Reward() {
    const user=useSelector(state=>state.user.value)
  return (
    <>
    <div className="card bg-base-100  shadow-xl image-full">
  <figure><img src='https://res.cloudinary.com/dpfnxwvps/image/upload/c_crop,h_778,q_59,w_1179/v1683291213/what-are-employee-rewards-and-recognition_rxzdvi.avif' alt="Reward" /></figure>
  <div className="card-body">
    <h2 className="card-title text-2xl">Rewards</h2>
    <p>You have <b className='text-3xl font-extrabold text-yellow-300'> {user?.loyality ? user?.loyality : 0  } </b>  Loyality Points </p>
    <div className="card-actions justify-end">
      <label htmlFor='allvouchers' className="btn btn-primary" disabled={user?.loyality===0}>Get Vouchers</label>
    </div>
  </div>
</div>
<AllVouchers/>
    </>
  )
}

export default Reward