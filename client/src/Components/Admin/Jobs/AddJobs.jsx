import { useState } from "react";
import { addJob } from "../../../Services/adminApi";
import { useDispatch } from "react-redux";
import Alert from '../../Alert/Alert'
import { showAlertError, showAlertSuccess } from "../../../Services/showAlert";
const AddJobs = ({handleLoad ,load}) => {
  const dispatch = useDispatch()
  const [job, setJob] = useState("");
  const [bRate, setBRate] = useState("");
  const [adRate, setAdRate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (job === "" || bRate === "" || adRate === "" || selectedFile === null) {
      showAlertError(dispatch,"Please enter all details")
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("job", job);
      formData.append("bRate", bRate);
      formData.append("adRate", adRate);

      addJob(formData).then((res) => {
          if (res.data.status === "success") {
            showAlertSuccess(dispatch,"Job added successfully")
            const addJobs = document.getElementById("Add-jobs")
            setJob("");
            setBRate("");
            setAdRate("");
            setSelectedFile(null);
            addJobs.checked=false
            handleLoad(!load)
          } else {
           showAlertError(dispatch,res.data.message)
          }
        }).catch((error) => {
          console.error(error);
          showAlertError(dispatch,error.message)
        });
    }
  };

  
  return (
    <>
      <input type="checkbox" id="Add-jobs" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-auto">
          <label htmlFor="Add-jobs" className="btn btn-sm float-right btn-circle">
            x
          </label>
          <h3 className="font-bold text-2xl text-center my-3">Let's Add Some Jobs</h3>
          <form onSubmit={handleSubmit} className="" encType="multipart/form-data">
            <label className="label">
              <span className="label-text">What is the Job Role?</span>
            </label>
            <input
              type="text"
              onChange={(e) => setJob(e.target.value)}
              required
              minLength={3}
              placeholder="eg: Electrician"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">What is the base Rate?</span>
            </label>
            <input
              type="number"
              onChange={(e) => setBRate(e.target.value)}
              min="0"
              placeholder="eg: 400"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">
                What is the Additional Rate Per hour?
              </span>
            </label>
            <input
              type="number"
              onChange={(e) => setAdRate(e.target.value)}
              min="0"
              placeholder="eg: 200"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Add the Job Icon</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              onChange={handleFileChange}
            />
            <div className="my-2 flex-wrap">
              {selectedFile != null ? (
                <img
                  className="h-20 my-4"
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
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
  );
};
export default AddJobs;
