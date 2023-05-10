import React from 'react';

const DateInput = ({ value, onClick }) => {
  return (
    <>
     <label className="label">
              <span className="label-text">
                Select Expiry Date
              </span>
            </label>
    <input
      type="text"
      className="input input-bordered input-accent w-full max-w-xs"
      onClick={onClick}
      value={value}
      placeholder='DD/MM/YYYY'
      readOnly
      />
      </>
  );
};

export default DateInput;
