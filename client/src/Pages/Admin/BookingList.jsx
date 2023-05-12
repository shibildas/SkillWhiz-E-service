import React, { useEffect, useState } from 'react'
import { bookingList } from '../../Services/adminApi';
import { Link } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import { useDispatch } from 'react-redux';
import { showAlertError } from '../../Services/showAlert';
import { filterbooking } from '../../Services/useSearch';

const BookingList = () => {
  const dispatch=useDispatch()
    const arra = [0, 1, 2, 3, 4];
    const [filter,setFilter]=useState(null)
    const [datas,setDatas]=useState([])
    const [filteredDatas,setFilteredDatas]=useState([])
    useEffect(() => {
     bookingList().then((res)=>{
        if(res.data.status==="success"){
            setDatas(res.data.result)
            setFilteredDatas(res.data.result)
        }else{
showAlertError(dispatch,'network Error')
        }
     }).catch(error=>{
showAlertError(dispatch,error.message)
     })
    }, [])
    const handleFilters=(args)=>{
      setFilter(args)
    }
    const handleSearch=(searchText)=>{
      const data=filterbooking([searchText,filter],datas)
      setFilteredDatas(data)
    }
  return (
    <>
    <div className="p-3">
      <h1 className="p-3 font-extrabold  md:text-5xl sm:text-2xl tracking-widest">
        Bookings
      </h1>
      <div className='flex justify-center mb-2'>
        <Search handleSearch={handleSearch} filterList={['Job','Status','Estimate','Slot','Book Date','Payment']} setFilter={handleFilters}/>
      </div>
      <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl ">
        <table className="table w-full ">
          <thead>
            <tr className="">
              <th className="text-2xl bg-slate-400 text-stone-700">Sl no.</th>
              <th className="text-2xl bg-slate-400 text-stone-700">
                Booked Job
              </th>
              <th className="text-2xl bg-slate-400 text-stone-700">Status</th>
              <th className="text-2xl bg-slate-400 text-stone-700">Estimate</th>
              <th className="text-2xl bg-slate-400 text-stone-700">
                Slot Time
              </th>
              <th className="text-2xl bg-slate-400 text-stone-700">
                Booking Date
              </th>
              <th className="text-2xl bg-slate-400 text-stone-700">Payment </th>
              <th className="text-2xl bg-slate-400 text-stone-700">Details </th>
            </tr>
          </thead>
          <tbody>
            {filteredDatas?.length != 0
              ? filteredDatas?.map((data, index) => {
                  return (
                    <tr
                      key={index + 10}
                      className={index % 2 == 0 ? "active" : "hover"}
                    >
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={
                                  data?.jobId?.image
                                    ? data.jobId?.image
                                    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                }
                                alt="PIC"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data?.jobId?.job_role?.toUpperCase()}</div>
                            <div className="text-sm opacity-50">
                              {data?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='font-bold'>
                         {data?.status}
                        <br />
                        bookingId:
                        <br />
                        <span className="badge badge-ghost badge-sm flex flex-wrap">
                       {data?._id}
                        </span>
                      </td>
                      <td>
                        
                       {data?.estimate?.status} 
                      </td>
                      <td className=" font-bold">
                       {data?.slot}
                      </td>
                      <th>
                        {new Date(data?.booking_date)?.toLocaleString('en-US', {
  timeZone: 'UTC'
})}
                      </th>
                      <th>
                        {data?.payment?.payment_status}
                      </th>
                      <th>
                        <Link to={`/admin/bookings/${data?._id}`}><label className='underline font-bold text-gray-800 cursor-pointer' htmlFor="">View Detail</label></Link>
                      </th>
                    </tr>
                  );
                })
              : arra.map((e) => {
                  return (
                    <tr key={e} className={e % 2 == 0 ? "active" : ""}>
                      <td colSpan="8">
                        <div className="animate-pulse flex space-x-4">
                          <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                          <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-400 rounded"></div>
                              <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      
    </div>
  </>
  )
}

export default BookingList