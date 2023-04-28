import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const EndJob = ({ handleLoad, handleAlert }) => {
  const dispatch = useDispatch()
  const booking = useSelector(state => state.expert.value.bookings)
  const [isEditMode, setIsEditMode] = useState(false)
  const [hours, setHours] = useState(booking?.estimate?.hours || '')
  const [hoursRate, setHoursRate] = useState(booking?.jobId?.add_rate || null)
  const [parts, setParts] = useState(booking?.estimate?.parts || [])
  const [price, setPrice] = useState('')
  const [partsPrice, setPartsPrice] = useState(booking?.estimate?.partsPrice || null)
  const [partName, setPartName] = useState('')
  const [partPrice, setPartPrice] = useState('')

  const handlePartsChange = (index, field, value) => {
    const newParts = [...parts]
    newParts[index][field] = value
    setParts(newParts)
  }

  const handleAddPart = () => {
    setIsEditMode(true)
  }

  const handleDeletePart = (index) => {
    const newParts = [...parts]
    newParts.splice(index, 1)
    setParts(newParts)
  }

  const handleSavePart = (e) => {
    e.preventDefault()
    if (partName && partPrice) {
      const newParts = [...parts, { pName: partName, price: partPrice }]
      setParts(newParts)
      setPartName('')
      setPartPrice('')
      setIsEditMode(false)
    }
  }
  useEffect(() => {
    const res=parts?.reduce((total, part) => total + Number(part.price), 0)
    setPartsPrice(res)
    setPrice((hours*Number(booking?.jobId?.add_rate))+Number(booking?.jobId?.base_rate))
  }, [parts])
  

  const handleSave = () => {
    const estimate = {
      hours: Number(hours),
      parts: parts.filter(part => part.pName && part.price),
      partsPrice: parts.reduce((total, part) => total + Number(part.price), 0)
    }

    setIsEditMode(false)
  }

  useEffect(() => {
    setHours(booking?.estimate?.hours)
    setParts(booking?.estimate?.parts)
    // booking?.estimate.parts?.map(part=>setPartPrice(part.price))
    // setPartsPrice(booking?.estimate?.partsPrice)
  }, [booking])


  return (
    <>
      <input type="checkbox" id="endJob" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="endJob" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
  
          <h3 className="text-xl font-bold text-center">Job Card for {booking?.jobId?.job_role?.toUpperCase()}</h3>
          <p className="mt-2 text-gray-500 text-center">The submitted jobcard will be final and can't be changed later</p>
          <div className="mt-4">
            <h4 className="text-lg font-bold">Parts</h4>
            {parts?.map((part, index) => (
              <div key={index} className="flex justify-between border p-2 m-1 rounded-lg">
                <span>{part.pName}</span>
                <span className="font-bold">₹ {part.price}</span>
                <button onClick={() => handleDeletePart(index)} className="font-bold text-red-500 underline">Delete</button>
              </div>
            ))}
            {isEditMode && (
              <form onSubmit={handleSavePart}>
                <div className="flex justify-between mt-2 p-2">
                  <input
                    type="text"
                    className="w-1/2 px-2 py-1 border rounded-lg"
                    placeholder="Part Name"
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-1/2 px-2 py-1 border rounded-lg mx-2"
                    placeholder="Price"
                    value={partPrice}
                    onChange={(e) => setPartPrice(e.target.value)}
                  />
                  <button type="submit" className="btn mx-2 btn-sm btn-primary">Save</button>
                </div>
              </form>
            )}
            {!isEditMode && (
              <button onClick={() => setIsEditMode(true)} className="btn btn-sm btn-outline-primary mt-2">Add Part</button>
            )}
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-bold">Labor</h4>
            <div className="flex justify-between">
              <span>Base Rate</span>
              <span className="font-bold">₹ {booking?.jobId?.base_rate}</span>
            </div>
            <div className="flex justify-between">
              <span>Hourly Rate</span>
              <span className="font-bold">₹ {booking?.jobId?.add_rate} /hr</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Hours Worked</span>
              <span className="font-bold">{booking?.estimate?.hours} hrs</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Total Labor Cost</span>
              <span className="font-bold">₹{partsPrice+price} </span>
            </div>
          </div>
          <button className="btn btn-primary mt-4">Submit Jobcard</button>
        </div>
      </div>
    </>
  );
  
}
