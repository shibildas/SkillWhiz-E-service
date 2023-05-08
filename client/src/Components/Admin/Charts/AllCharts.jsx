import React from 'react'
import Donut from './Donut'
import AreaChart from './AreaChart'

export const AllCharts = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 md:col-12 gap-3 my-10">
<Donut/>
<AreaChart/>
    </div>
    </>
  )
}
