import React, { useState } from 'react'
import Card from './Card'


const AllCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
            <Card bg="bg-white"/>
            <Card bg="bg-error"/>    
            <Card bg="bg-info"/>
            <Card bg="bg-warning"/>
            </div>
  )
}

export default AllCards