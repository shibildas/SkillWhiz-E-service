import React, { useEffect, useState } from "react";
import { getAllVouchers, redeemVoucher } from "../../Services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { login } from "../../import";
import Alert from "../Alert/Alert";

const AllVouchers = () => {
  const points = useSelector((state) => state.user.value.loyality);
  const dispatch = useDispatch();
  const [show,setShow]=useState(true)
  const [vouchers, setVouchers] = useState([]);
  const [load, setLoad] = useState(false);
  const [voucher, setVoucher] = useState({});
  useEffect(() => {
    getAllVouchers()
      .then((res) => {
        if (res.data.status === "success") {
          setVouchers(res.data.result);
        } else {
          showAlertError(dispatch, "something went wrong");
        }
      })
      .catch((error) => {
        showAlertError(dispatch, error.message);
      });
  }, [load]);
  const handleLoad = () => {
    setLoad(!load);
  };
  const handleBuy=()=>{
    if(!voucher?._id){
showAlertError(dispatch,'Select First')
    }else{
        redeemVoucher({id:voucher?._id,points:voucher?.points}).then((res)=>{
            if(res.data.status==='success'){
                dispatch(login(res.data.result))
                setShow(true)
                handleLoad()
                const vouchermodal= document.getElementById('allvouchers')
                showAlertSuccess(dispatch,`Voucher Redeemed Success, used Points:${voucher?.points}`)
                setVoucher({})
                vouchermodal.checked=false
            }else{
                showAlertError(dispatch,"Voucher already used")
            }
        }).catch(error=>{
            console.log(error);
            showAlertError(dispatch,error.message)
        })

    }

  }

  return (
    <>
      <input type="checkbox" id="allvouchers" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="allvouchers"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl text-center font-bold underline">
            Choose the Vouchers
          </h3>
          <h3 className="text-xl text-center font-bold">
            You Have {points} Points Left
          </h3>
          {show?<div>
            {vouchers?.length ? (
              vouchers?.map((ele, index) => {
                return (
                  <div
                    key={index + "SS?"}
                    className="card w-fit my-3  bg-base-100 shadow-xl image-full"
                  >
                    <figure>
                      <img src={ele?.image} alt="images" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-2xl font-extrabold">
                        {ele?.vouchername}
                      </h2>
                      <p>
                        This voucher will give a one time ₹{" "}
                        <b className="text-xl">{ele?.discount}</b> discount{" "}
                      </p>
                      <p className="text-2xl font-semibold">
                        {" "}
                        {ele?.points} Points
                      </p>
                      <div className="card-actions justify-end">
                        <label onClick={()=>{setVoucher(ele)
                    setShow(false)    
                    }}
                          className="btn btn-primary"
                          disabled={points < ele?.points}
                        >
                          Redeem
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="card my-3 bg-purple-600 text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">No Vouchers Available</h2>
                    <p>
                      All Vouchers are exhausted for you. Kindly wait until
                      Admin add some...
                    </p>
                    
                    <div className="card-actions justify-end">
                      <label htmlFor="allvouchers" className="btn">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>:
          <div>
            <h1 className="text-xl my-2 font-semibold ">Are You Sure?</h1>
            <div className="card bg-base-100 shadow-xl image-full">
        <figure><img src={voucher?.image} alt="images" /></figure>
  <div className="card-body">
    <h2 className="card-title text-2xl font-extrabold">{voucher?.vouchername}</h2>
    <p>
                        This voucher will give a one time ₹{" "}
                        <b className="text-xl">{  voucher?.discount}</b> discount{" "}
                      </p>
                      <p className="text-2xl font-semibold">
                        {" "}
                         Will deduct your {voucher?.points} Points
                      </p>
    <div className="card-actions justify-end">
      <button onClick={handleBuy} className="btn btn-warning">Buy Now</button>
    </div>
  </div>
</div>

            <div className="my-3">

            <button onClick={()=>setShow(true)} className="btn">Cancel </button>
           
            </div>
            <Alert/>

          </div>
          }
        </div>
      </div>
    </>
  );
};

export default AllVouchers;
