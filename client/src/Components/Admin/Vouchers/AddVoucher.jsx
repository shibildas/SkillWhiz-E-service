import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showAlertError } from '../../../Services/showAlert';
import Alert from '../../Alert/Alert';
import DateInput from './DateInput';

const AddVoucher = () => {
    const dispatch=useDispatch()
    const [name,setName]=useState('')
    const [code,setCode]=useState('')
    const [discount,setDiscount]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [date,setDate]=useState('')


     const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/jpg"]; // allowed image types
    const maxSize = 1 * 1024 * 1024; // 1MB maximum file size
    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
     showAlertError(dispatch,"Invalid file type or size. Please select a valid image file.")
    }
  };
  const handleSubmit=()=>{

  }
  function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  return (
    <>
      <input type="checkbox" id="Add-vouchers" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-auto">
          <label htmlFor="Add-vouchers" className="btn btn-sm float-right btn-circle">
            x
          </label>
          <h3 className="font-bold text-2xl text-center my-3">Let's Add Some Vouchers</h3>
          <form onSubmit={handleSubmit} className="" encType="multipart/form-data">
            <label className="label">
              <span className="label-text">Voucher Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              placeholder="eg: Electrician"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Voucher Code Name</span>
            </label>
            <input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              placeholder="eg: WRSX400"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">
                Discount Amount
              </span>
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              placeholder="eg: 200"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Add Voucher Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              onChange={handleFileChange}
            />
            <div>

            <DatePicker 
            selected={date}
            onChange={(date)=>setDate(date)}
            dateFormat="dd/MM/yyyy"
            customInput={<DateInput value={date ? formatDate(date) : ''} onClick={() => document.activeElement.blur()} />}
            
            />
            </div>
            <div className="my-2 flex-wrap">
              {selectedFile != null ? (
                <img
                  className="h-20 my-4"
                  src={URL.createObjectURL(selectedFile)}
                  alt="image"
                />
              ) : null}
              <button className=" btn btn-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        <Alert/>
        </div>
      </div>
    </>
  )
}

export default AddVoucher