import React, { useState } from "react";
import { userReview } from "../../Services/userApi";
import { showAlertError, showAlertSuccess } from "../../Services/showAlert";
import { useDispatch } from "react-redux";
import { expertReview } from "../../Services/expertApi";
import Alert from "../Alert/Alert";


function Review(props) {
  const {handleLoad,bookId,jobId,myId,reviewBy,user}=props
  const dispatch=useDispatch()
  const [rating, setRating] = useState(2);
  const [message, setMessage] = useState("");
  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {
    if(message===""){
      showAlertError(dispatch,"message cant be empty")
    }else{

      if(user){
        userReview({bookId:bookId,
          jobId:jobId,
          myId:myId,
          reviewBy:reviewBy,
          reviewModel:'user',
          myIdModel:'expert',
          rating:rating,
          message:message
    }).then((resp)=>{
        if(resp.data.status==="success"){
          showAlertSuccess(dispatch,'review success')
          handleLoad()
        }else{
          showAlertError(dispatch,'something went wrong')
        }
      }).catch(error=>{
        showAlertError(dispatch,error.message)
      })
    }else{
      expertReview({bookId:bookId,
          jobId:jobId,
          myId:myId,
          reviewBy:reviewBy,
          reviewModel:'expert',
          myIdModel:'user',
          rating:rating,
          message:message
    }
      ).then((resp)=>{
        if(resp.data.status==="success"){
          showAlertSuccess(dispatch,'review success')
          handleLoad()
        }else{
          showAlertError(dispatch,'something went wrong')
        }
      }).catch(error=>{
        showAlertError(dispatch,error.message)
      })
    }
  }
  };
  return (
    <>
    <Alert/>
      <div className="flex-col p-2">
        <h1 className="font-bold py-2">Rate the Job</h1>
        <div className="rating rating-lg py-2">
          <input
            type="radio"
            name="rating-2"
            value='1'
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
            checked={rating === 3 }
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
        <div className="">
          <textarea
            placeholder="Review here..."
            onChange={handleMessageChange}
            className="textarea textarea-bordered textarea-success bg-gray-200 focus:bg-white textarea-xl w-full p-3 max-w-xs"
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="btn btn-success btn-sm md:btn-md my-2">
          Submit{" "}
        </button>
      </div>
      <div className="divider "></div>
    </>
  );
}

export default Review;
