import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userAxiosInstance } from "../../axios/instance";
import { useDispatch, useSelector } from "react-redux";
import Estimate from "../../Components/Estimate/Estimate";
import { addBooking, login } from "../../redux/user";
import { applyVoucher, payOnline, removeVoucher, verifyCancel, verifyPayment } from "../../Services/userApi";
import { showAlertError, showAlertSuccess, showAlertWarning } from "../../Services/showAlert";
import Review from "../../Components/Review/Review";
import ViewReview from "../../Components/Review/ViewReview";
import CancelBook from "../../Components/CancelBooking/CancelBook";
import Alert from "../../Components/Alert/Alert";
import Confirm from '../../Components/Confirm/Confirm'

const BookingDetail = () => {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.user.value.vouchers);
  const book = useSelector((state) => state.user.value.bookings);
  const { id } = useParams();
  const [show,setShow]=useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [load, setLoad] = useState(false);
  const handleLoad = () => {
    setLoad(!load);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    userAxiosInstance
      .get(`/booking/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(addBooking(res.data.result));
        } else {
          showAlertError(dispatch, "NetworkError");
        }
      })
      .catch((error) => {
        showAlertError(dispatch, error.message);
      });
  }, [load]);
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_CBA26h7xqNYbSQ",
      amount: data.amount,
      currency: data.currency,
      name: book?.jobId?.job_role,
      image: book?.jobId?.image,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await verifyPayment(response, id);
          if (data) {
            handleLoad();
            showAlertSuccess(dispatch, "Payment success");
          }
        } catch (error) {
          showAlertError(dispatch, error.message);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  function handleOptionClick(optionValue) {
    setSelectedOption(optionValue);
  }
  const handlePayment = async () => {
    try {
      const { data } = await payOnline((book?.bill_amount)-(book?.discount || 0));
      initPayment(data.data);
    } catch (error) {
      showAlertError(dispatch, error.message);
    }
  };
  const initCancel =(data)=>{
    const options = {
      key: "rzp_test_CBA26h7xqNYbSQ",
      amount: data.amount,
      currency: data.currency,
      name: book?.jobId?.job_role,
      image: book?.jobId?.image,
      order_id: data.id,
      handler: async (response) => {
        try {
          const confirmmodal= document.getElementById('confirm')
          const { data } = await verifyCancel(response, id);
          if (data) {
            confirmmodal.checked=false
            handleLoad();
            showAlertSuccess(dispatch, "Payment success");
          }
        } catch (error) {
          showAlertError(dispatch, error.message);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  }
  const handleCancel= async ()=>{
    try {
      const {data} = await payOnline(((book?.estimate.amount)*.2)) 
      initCancel(data.data)
    } catch (error) {
      showAlertError(dispatch, error.message);
    }
  }
  const handleApply = () => {
    if (!selectedOption?._id) {
      showAlertError(dispatch, "Select a voucher to apply");
    } else {
      applyVoucher({ id: selectedOption?._id, bookId: id })
        .then((res) => {
          if (res.data.status === "success") {
            dispatch(login(res.data.result));
            showAlertSuccess(
              dispatch,
              `Voucher Applied Success, You saved Rs.${selectedOption?.discount}`
            );
            setSelectedOption({});
            handleLoad();
          } else {
            showAlertError(dispatch, "Coupon already exists");
          }
        })
        .catch((error) => {
          showAlertError(dispatch, error.message);
        });
    }
  };
  const handleRemove=()=>{
    removeVoucher({id:book?.voucherId?._id,bookId:id}).then((res)=>{
      if(res.data.status==='success'){
        dispatch(login(res.data.result))
        showAlertWarning(dispatch,"Voucher removed")
        setShow(true)
        handleLoad()
      }else{
        showAlertError(dispatch," something Went Wrong")
      }
    }).catch(error=>{
      showAlertError(dispatch, error.message);
    })

  }
  return (
    <>
      <div className="bg-slate-700 p-2 mt-5 rounded-t-xl flex justify-center">
        <h1 className="text-xl md:text-3xl font-extrabold text-white m-5">
          Booking Detail
        </h1>
      </div>
      <div className="bg-purple-100 p-5 bg-opacity-95 flex justify-center ">
        <ul className="steps md:text-2xl text-sm  font-bold">
          <li data-content="📬" className="step step-secondary ">
            Open
          </li>
          <li data-content="⛹" className="step step-secondary">
            Partner Assigned
          </li>
          {book?.status !== "cancelled" && (
            <>
              <li
                data-content="⏲"
                className={`step ${book?.estimate?.status === "approved"} ${
                  book?.status === "invoiced" && "step-secondary"
                } ${book?.status === "completed" && "step-secondary"} ${
                  book?.status === "closed" && "step-secondary"
                }`}
              >
                In Progress
              </li>
              <li
                data-content="✔"
                className={`step ${
                  book?.status === "invoiced" && "step-secondary"
                } ${book?.status === "completed" && "step-secondary"} ${
                  book?.status === "closed" && "step-secondary"
                }`}
              >
                Completed
              </li>
              <li
                data-content="🗐"
                className={`step ${
                  book?.status === "invoiced" && "step-secondary"
                } ${book?.status === "closed" && "step-secondary"}`}
              >
                invoiced
              </li>
              <li
                data-content="📪"
                className={`step ${
                  book?.status === "closed" && "step-secondary"
                }`}
              >
                Closed
              </li>
            </>
          )}
          {book?.status === "cancelled" && (
            <li data-content="🗙" className="step step-secondary">
              Cancelled
            </li>
          )}
        </ul>
      </div>
      <div className="bg-purple-100 p-2 h-fit w-full flex justify-center opacity-95 rounded-b-xl shadow-xl">
        <div className="w-3/5">
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Booking ID: </h1> <h1>{book?._id}</h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between  font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Booking Status: </h1>{" "}
            <h1>{book?.status}</h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Scheduled: </h1> <h1>{book?.slot}</h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Address: </h1>{" "}
            <h1>
              {book?.address?.name?.toUpperCase()} <br />
              {book?.address?.house}
              <br />
              {book?.address?.street}
              <br />
              {book?.address?.pincode}
            </h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Partner Assigned: </h1>{" "}
            <h1>
              {book?.expertId?.username?.toUpperCase()}
              <br /> Ph: +91- {book?.expertId?.mobile}
            </h1>
          </div>
          <div className="divider "></div>
          <div className="flex justify-between   font-semibold p-2 flex-wrap">
            {" "}
            <h1 className="text-xl">Estimate Amount: </h1>{" "}
            <h1>
              {" "}
              {book?.estimate?.amount ? (
                <label
                  htmlFor={`${
                    book?.estimate?.status !== "approved" && "estimate"
                  }`}
                  className={`  ${
                    book?.estimate?.status !== "approved" &&
                    "tooltip btn btn-sm btn-success"
                  } font-extrabold text-xl`}
                  data-tip="View Estimate"
                >
                  Rs : {book?.estimate?.amount}
                </label>
              ) : (
                "Estimation Pending"
              )}
              {book?.estimate?.status !== "approved" &&
                book?.status !== "cancelled" && (
                  <Link to="/chat">
                    <span
                      className="indicator-item badge badge-primary tooltip tooltip-top mx-2"
                      data-tip="Chat to Your Expert"
                    >
                      Chat
                    </span>
                  </Link>
                )}{" "}
            </h1>
          </div>
          <div className="divider "></div>
          {book?.status === "cancelled" && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Cancel Reason:</h1>{" "}
                <div>
                  <h1 className="">{book?.reason}</h1>
                </div>
              </div>
              <div className="divider "></div>
            </>
          )}
          {(book?.status === "pending" && book?.estimate.status==='pending' )&& (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Not Happy?</h1>{" "}
                <div>
                  <label className="btn btn-error" htmlFor="cancelBook">
                    Cancel Job
                  </label>
                </div>
              </div>
              <div className="divider "></div>
            </>
          )}
          {book?.status === "pending" && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Not Happy?</h1>{" "}
                <div>
                  <label className="btn btn-error" htmlFor="confirm">
                    Cancel Job
                  </label>
                </div>
              </div>
              <div>** You will be charged 20% of estimate amount if you cancel the job now on</div>
              <div className="divider "></div>
            </>
          )}
          {(book?.status === "started" ||
            book?.status === "completed" ||
            book?.status === "invoiced" ||
            book?.status === "closed") && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Job Started at:</h1>{" "}
                <div>
                  <h1>
                    {new Date(book?.jobStart)?.toLocaleDateString()} ,{" "}
                    {new Date(book?.jobStart)?.toLocaleTimeString([], {
                      hour12: true,
                    })}
                  </h1>
                </div>
              </div>
              <div className="divider "></div>
            </>
          )}
          {(book?.status === "completed" ||
            book?.status === "invoiced" ||
            book?.status === "closed") && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                <h1 className="text-xl">Job Ended at:</h1>{" "}
                <div>
                  <h1>
                    {new Date(book?.jobEnd)?.toLocaleDateString()} ,{" "}
                    {new Date(book?.jobEnd)?.toLocaleTimeString([], {
                      hour12: true,
                    })}
                  </h1>
                </div>
              </div>
              <div className="divider "></div>
            </>
          )}
          {(book?.status === "completed" || book?.voucherId?._id) && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                {" "}
                <h1 className="text-xl">Vouchers</h1>{" "}
                <div>
                  {!book?.voucherId && (
                    <div className="inline-block relative w-full  ">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between border border-gray-300 p-2 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                        onClick={toggleDropdown}
                      >
                        <span className="block truncate">
                          {selectedOption?._id
                            ? `${selectedOption?.vouchername},Discount: ₹ ${selectedOption?.discount} `
                            : "Select Option"}
                        </span>
                        <svg
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                        </svg>
                      </button>
                      <div className="absolute z-10 left-0 mt-2 w-full h-2/5">
                        {isOpen && (
                          <div className="bg-slate-100  rounded-md shadow-lg ">
                            {option.map((opt) => (
                              <button
                                key={opt?._id}
                                type="button"
                                className={`w-full rounded-md border border-slate-400 text-left flex items-center justify-between px-4 py-2 text-gray-900
                          `}
                                onClick={() => {
                                  handleOptionClick(opt);
                                  setIsOpen(!isOpen);
                                }}
                              >
                                <span className="flex items-center">
                                  <span className="font-extrabold ">
                                    {opt?.vouchername},
                                  </span>
                                  <span className="mx-2 flex-col text-xs">
                                    <b className="">
                                      Discount: ₹ {opt?.discount}
                                    </b>
                                  </span>
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {(book?.status === "completed"  ) && !book?.voucherId?._id && (
                    <label
                      className="btn m-2 btn-success"
                      onClick={handleApply}
                    >
                      Apply
                    </label>
                  )}{" "}
                  {book?.voucherId?._id && <div className="card image-full">
                    <figure>
                      <img src={book?.voucherId?.image} alt="image" />
                    </figure>
                    {show?<div className="card-body">
                      <h2 className="card-title">
                        {book?.voucherId?.vouchername}
                      </h2>
                      <h2 className="card-title text-2xl">
                        Rs. {book?.voucherId?.discount}
                      </h2>
                      <div className="card-actions justify-end">
                       
                       {book?.status === "completed" && <button className="btn btn-warning" onClick={()=>setShow(false)}>Remove</button>}
                      </div>
                    </div>:<div className="card-body rounded-xl">
                        <button className="btn btn-success my-auto" onClick={()=>setShow(true)} >Cancel</button>
                        <button className="btn btn-error my-auto" onClick={handleRemove}>Remove</button>
                      </div>}
                  </div>}
                </div>{" "}
              </div>
              <Alert />
              <div className="divider "></div>
            </>
          )}
          {(book?.status === "completed" ||
            book?.status === "invoiced" ||
            book?.status === "closed") && (
            <>
              <div className="flex justify-between   font-semibold p-2 flex-wrap">
                {" "}
                <h1 className="text-xl">Invoice Amount</h1>{" "}
                <div className="">
                  <h1 className="">Invoice : ₹ {(book?.bill_amount)}</h1>
                  <h1 className="">Discount : - ₹ {(book?.discount || 0)}</h1>
                  <h1 className="text-xl font-semibold">Total : ₹ {(book?.bill_amount)-(book?.discount || 0)}</h1>
                  {book?.status === "completed" && (
                    <label
                      className="btn m-2 btn-warning"
                      onClick={handlePayment}
                    >
                      Pay Online
                    </label>
                  )}{" "}
                </div>{" "}
              </div>
              <div className="divider "></div>
            </>
          )}
          {!book?.review?._id &&
            (book?.status === "invoiced" || book?.status === "closed") && (
              <Review
                user={true}
                reviewBy={book?.userId?._id}
                myId={book?.userId?._id}
                jobId={book?.jobId?._id}
                bookId={book?._id}
                handleLoad={handleLoad}
              />
            )}{" "}
          {book?.review?._id && (
            <ViewReview
              handleLoad={handleLoad}
              user={true}
              review={book?.review}
              img={book?.userId?.image}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center bg-slate-100 bg-opacity-60 mb-5"></div>
      <Estimate
        book={book?.status}
        admin={false}
        address={book?.address}
        user={book?.userId}
        estimate={book?.estimate}
        job={book?.jobId}
        id={id}
        handleLoad={handleLoad}
      />
      <Confirm handleFunction={handleCancel}/>
      <CancelBook admin={false} handleLoad={handleLoad} id={id} />
    </>
  );
};
export default BookingDetail;
