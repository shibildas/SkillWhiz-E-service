import { useState } from "react";
import Swal from "sweetalert2";
import { adminAxiosInstance } from "../../../axios/instance";
const AddJobs = ({handleLoad ,load}) => {
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
      Swal.fire(
        "Sorry",
        "Invalid file type or size. Please select a valid image file.",
        "error"
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (job === "" || bRate === "" || adRate === "" || selectedFile === null) {
      Swal.fire("Sorry", "Please enter all details", "error");
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("job", job);
      formData.append("bRate", bRate);
      formData.append("adRate", adRate);

      adminAxiosInstance
        .post("/addjobs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            Swal.fire("Success", "Job added successfully", "success");
            const addJob = document.getElementById("Add-jobs")
            addJob.checked=false
            handleLoad(!load)
            setJob("");
            setBRate("");
            setAdRate("");
            setSelectedFile(null);
          } else {
            Swal.fire("Sorry", "Job adding failed", "error");
          }
        }).catch((error) => {
          console.error(error);
          Swal.fire("Error", error.message, "error");
        });
    }
  };

  
  return (
    <>
      <input type="checkbox" id="Add-jobs" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-auto">
          <label htmlFor="Add-jobs" className="btn  float-right btn-circle">
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
        </div>
      </div>
    </>
  );
};
export default AddJobs;
