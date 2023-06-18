import React from 'react'
const ReviewCard = ({user,msg,rating}) => {
  const stars = [];
  
  for (let i = 0; i < rating; i++) {
    stars.push(<button key={i} className='btn btn-sm md:btn-md btn-warning mask mask-star-2'></button>);
  }
  return (
   <>
   <div className="card w-fit md:w-60 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="md:card-title break-words">{msg}</h2>
    <div>
      {stars}
    </div>
    <div className="avatar">
  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-2">
    <img className='' src={user?.image} />
</div>
    <p>{user?.username?.toUpperCase()}</p>
  </div>
  </div>
</div>
   </>
  )
}

export default ReviewCard