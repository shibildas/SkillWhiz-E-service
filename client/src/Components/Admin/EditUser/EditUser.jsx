const EditUser = ({ user, handleLoad }) => {
  return (
    <>
      <input type="checkbox" id="editUser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editUser"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center">
            Edit Profile of {user?.username?.toUpperCase()}
          </h3>
          <div className="flex justify-center">
            <div className="p-2 form-control">
              <label className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input type="email" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Mobile</span>
              </label>
              <input type="number" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditUser;
