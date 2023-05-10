import React from 'react'
import { Link } from 'react-router-dom'

const VoucherCard = ({voucher}) => {
  return (
    
        <>
  <figure><img src={voucher?.image} alt="image" /></figure>
  <div className="card-body">
    <h2 className="card-title">{voucher?.vouchername}</h2>
     <p>
                        This voucher will give a one time ₹{" "}
                        <b className="text-xl">{voucher?.discount}</b> discount{" "}
                      </p>
    <div className="card-actions justify-end">
     <Link to='/alljobs'> <button className="btn btn-primary">Book Now</button></Link>
    </div>
  </div>
  </>
  )
}

export default VoucherCard