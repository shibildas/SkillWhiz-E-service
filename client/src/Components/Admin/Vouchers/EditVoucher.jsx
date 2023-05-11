import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showAlertError, showAlertSuccess } from '../../../Services/showAlert';
import Alert from '../../Alert/Alert';
import DateInput from './DateInput';

const EditVoucher = ({id}) => {
    const dispatch=useDispatch()
    const [name,setName]=useState('')
    const [code,setCode]=useState('')
    const [points,setPoints]=useState('')
    const [discount,setDiscount]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [date,setDate]=useState('')

    useEffect(()=>{
        setName(id?.vouchername)
        setCode(id?.code)
        setPoints(id?.points)
        setDiscount(id?.discount)
        // const mydate= new Date(id?.endDate)?.toLocaleDateString()
        // setDate(formatDate(id?.endDate))

    },[id])

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
      const handleSubmit=(e)=>{
    e.preventDefault()
    if(name===''|| code===''|| points===''|| discount===''|| selectedFile===null){
      showAlertError(dispatch,"Please enter all details")
    }else{
      const formData=new FormData()
      formData.append('image',selectedFile)
      formData.append('code',code)
      formData.append('name',name)
      formData.append('endDate',date)
      formData.append('discount',discount)
      formData.append('points',points)
      
    
    }
    
      }
      function formatDate(date) {
        return date?.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
      const today = new Date();
      today.setDate(today.getDate()+1)
      today.setHours(0, 0, 0, 0);
      
  return (
    <>
      <input type="checkbox" id="editvoucher" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-auto">
          <label htmlFor="editvoucher" className="btn btn-sm float-right btn-circle">
            x
          </label>
          <h3 className="font-bold text-2xl text-center my-3">Edit Voucher</h3>
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
              placeholder="eg: WELCOME@200"
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
              placeholder="eg: 20"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">
                Points Needed
              </span>
            </label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
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
            minDate={today}
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
              ) : <img src={id?.image} className="h-20 my-4"/>}
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

export default EditVoucher