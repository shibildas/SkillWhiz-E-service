import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PencilIcon } from "@heroicons/react/solid";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { userUpdateReview } from "../../Services/userApi";
import { expertUpdateReview } from "../../Services/expertApi";
const ViewReview = ({handleLoad,user, review, img }) => {
  const [rating, setRating] = useState(review?.rating);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setRating(review?.rating);
    setMessage(review?.message);
  }, [review]);

  const handleRatingChange = (e) => {
    setEdit(true)
    setRating(parseInt(e.target.value));
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleUpdate=()=>{
    if(message===""){
        showAlertError(dispatch,"text cant be empty")
    }else{
        if(user){
            userUpdateReview({id:review._id,rating,message}).then((resp)=>{
                if(resp.data.status==="success"){
                  showAlertSuccess(dispatch,'review success')
                  setEdit(false)
                  handleLoad()
                }else{
                  showAlertError(dispatch,'something went wrong')
                }
              }).catch(error=>{
                showAlertError(dispatch,error.message)
              })

        }else{
            expertUpdateReview({id:review._id,rating,message}).then((resp)=>{
                if(resp.data.status==="success"){
                  showAlertSuccess(dispatch,'review success')
                  setEdit(false)
                  handleLoad()
                }else{
                  showAlertError(dispatch,'something went wrong')
                }
              }).catch(error=>{
                showAlertError(dispatch,error.message)
              })

        }

    }
  }
  return (
    <>
      <div className="p-2">
        <div className="flex">
        <h1 className="text-lg font-bold underline ">My Review</h1>
        {!edit&&<PencilIcon className="w-8 mx-2 cursor-pointer text-blue-500" onClick={()=>setEdit(true)}/>}
        </div>

        <div className="sm:flex">
          <div>
            <img className="w-12 mx-2 rounded-full" src={img} alt="avatar" />
          </div>
          <div>
            <div className="rating rating-md py-2">
              <input
                type="radio"
                name="rating-2"
                value="1"
                checked={rating === 1}
                onChange={handleRatingChange}
                className="mask mask-star-2 bg-yellow-400"
              />
              <input
                type="radio"
                name="rating-2"
                value="2"
                checked={rating === 2}
                onChange={handleRatingChange}
                className="mask mask-star-2 bg-yellow-400"
              />
              <input
                type="radio"
                name="rating-2"
                value="3"
                checked={rating === 3}
                onChange={handleRatingChange}
                className="mask mask-star-2 bg-yellow-400"
              />
              <input
                type="radio"
                name="rating-2"
                value="4"
                checked={rating === 4}
                onChange={handleRatingChange}
                className="mask mask-star-2 bg-yellow-400"
              />
              <input
                type="radio"
                name="rating-2"
                value="5"
                checked={rating === 5}
                onChange={handleRatingChange}
                className="mask mask-star-2 bg-yellow-400"
              />
            </div>
            <div className="font-bold">{!edit?review?.message:<textarea placeholder="Bio" value={message} onChange={handleMessageChange} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>}</div>
        {edit&&<button onClick={handleUpdate} className="btn btn-success my-2">Update</button>}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default ViewReview;
