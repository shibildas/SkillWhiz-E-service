import React, { useEffect, useState } from 'react'
import Donut from './Donut'
import AreaChart from './AreaChart'
import { useDispatch } from 'react-redux'
import { getChartData } from '../../../Services/adminApi'
import { showAlertError } from '../../../Services/showAlert'

export const AllCharts = () => {
  const dispatch=useDispatch()
  const [data,setData]=useState()
  useEffect(()=>{
    getChartData().then((res)=>{
      if(res.data.status==='success'){
        setData(res.data.result)
      }else{
        showAlertError(dispatch,"something went wrong")
      }
    }).catch(error=>{
      showAlertError(dispatch,error.message)
    })
  },[])
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 md:col-12 gap-3 my-10">
<Donut val={data?.pieData} heading="Experts by Job Role"/>
<AreaChart val={data?.result} heading="Paid Bookings by Date"/>
    </div>
    </>
  )
}
