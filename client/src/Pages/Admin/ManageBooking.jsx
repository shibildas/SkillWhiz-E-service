import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingBy } from "../../Services/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../redux/admin";
import Range from "../../Components/Admin/Range/Range";
import AddEstimate from "../../Components/Estimate/AddEstimate";
import Estimate from "../../Components/Estimate/Estimate";
import Startjob from "../../Components/Start/Startjob";
import { EndJob } from "../../Components/Start/EndJob";
import Pay from "../../Components/Admin/Pay/Pay";
import CancelBook from "../../Components/CancelBooking/CancelBook";

const ManageBooking = () => {
  const booking = useSelector((state) => state.admin.value.bookings);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getBookingBy(id).then((res) => {
      if (res.data.status === "success") {
        dispatch(addBooking(res.data.result));
      }
    });
  }, [load]);
  function getInitialValue() {
    switch (booking?.status) {
      case "closed":
        return 100;
      case "invoiced":
        return 80;
      case "completed":
        return 60;
      case "started":
        return 50;
      case "pending":
        return 20;
      default:
        return 10;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (value < getInitialValue()) {
        setValue(value + 1);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [value, booking]);

  const handleLoad = () => {
    setLoad(!load);
  };

  return (
    <>
      <div className="p-6 ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold underline underline-offset-4">
            {booking?.jobId?.job_role?.toUpperCase()} with{" "}
            {booking?.expertId?.username?.toUpperCase()}
          </h2>
          <div className="flex items-center space-x-4">
            {booking?.status === "pending" && (
              <label
                htmlFor="cancelBook"
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                Cancel
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mb-8">
          <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/3 sm:px-6 lg:pr-8 lg:py-0">
            <div className="p-6 bg-slate-700 text-white shadow rounded-xl">
              <h3 className="text-lg font-semibold mb-2 underline underline-offset-2">
                Customer Details
              </h3>
              <div className="">
                <p className="mb-1">
                  <span className="font-semibold">Name:</span>{" "}
                  {booking?.userId?.username?.toUpperCase()}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Email:</span>{" "}
                  {booking?.userId?.email}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {booking?.userId?.mobile}
                </p>
              </div>
            </div>
            <div className="bg-slate-700 text-white p-6 rounded-xl shadow-md mt-6">
              <h2 className="text-2xl font-bold mb-6 underline underline-offset-2">
                Booking Detail
              </h2>
              <div
                className="radial-progress text-xl font-bold "
                style={{
                  "--value": `${value}`,
                  "--size": "12rem",
                  "--thickness": "2rem",
                }}
              >
                {`${value}%`}
              </div>

              <div className="w-full px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Job Role</h3>
                  <p className="text-lg">
                    {booking?.jobId?.job_role?.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="w-full px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Expert Name</h3>
                  <p className="text-lg">
                    {booking?.expertId?.username?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="w-full  px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Expert Mobile</h3>
                  <p className="text-lg">{booking?.expertId?.mobile}</p>
                </div>
              </div>
              <div className="w-full  px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Booking ID: </h3>
                  <p className="text-lg text-justify break-all ml-2">
                    {booking?._id}
                  </p>
                </div>
              </div>
              <div className="w-full  px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Booking Date</h3>
                  <p className="text-lg">
                    {new Date(booking?.booking_date)?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-full  px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Booking Slot</h3>
                  <p className="text-lg ml-2">{booking?.slot}</p>
                </div>
              </div>
              <div className="w-full px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Booking Address</h3>
                  <p className="text-lg ml-2 break-all">
                    {booking?.address.house}, {booking?.address?.street},{" "}
                    {booking?.address.pincode}
                  </p>
                </div>
              </div>
              <div className="w-full px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Booking Estimate</h3>
                  <p className="text-lg">
                    {booking?.estimate?.amount ? booking?.estimate?.amount : 0}{" "}
                    INR
                  </p>
                </div>
              </div>
              <div className="w-full px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Invoice Amount</h3>
                  <p className="text-lg font-bold">
                    {booking?.bill_amount ? booking?.bill_amount : 0} INR
                  </p>
                </div>
              </div>
              <div className="w-full px-2 mb-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">Booking Status</h3>
                  <p className="text-lg">{booking?.status}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/3 sm:px-6 lg:pl-8 lg:pr-4 lg:py-0">
            <div className="p-6 bg-slate-700 text-white rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2 underline underline-offset-2">
                Expert Details
              </h3>
              <div className="">
                <p className="mb-1">
                  <span className="font-semibold">Name:</span>{" "}
                  {booking?.expertId?.username?.toUpperCase()}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Email:</span>{" "}
                  {booking?.expertId?.email}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {booking?.expertId?.mobile}
                </p>
              </div>
            </div>

            <div className="bg-slate-700 text-white p-6 rounded-xl shadow-md mt-6">
              <h3 className="text-lg font-semibold mb-2 underline underline-offset-2">
                Booking Cycle
              </h3>
              <div className="my-2">
                {!booking?.estimate?.amount &&
                  booking?.status !== "cancelled" && (
                    <label
                      className="btn btn-success btn-sm float-right my-2"
                      htmlFor="addEstimate"
                    >
                      Add Estimate
                    </label>
                  )}
              </div>

              <div className="my-2">
                <Range booking={booking} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/3 sm:px-6 lg:pl-4 lg:py-0"></div>
      </div>
      <AddEstimate
        admin={true}
        bookId={booking?._id}
        jobId={booking?.jobId}
        handleLoad={handleLoad}
      />
      <Estimate
        book={booking?.status}
        admin={true}
        address={booking?.address}
        user={booking?.userId}
        estimate={booking?.estimate}
        job={booking?.jobId}
        id={id}
        handleLoad={handleLoad}
      />
      <Startjob id={id} handleLoad={handleLoad} admin={true} />
      <EndJob booking={booking} handleLoad={handleLoad} admin={true} />
      <Pay booking={booking} handleLoad={handleLoad} />
      <CancelBook id={id} handleLoad={handleLoad} admin={true} />
    </>
  );
};

export default ManageBooking;
