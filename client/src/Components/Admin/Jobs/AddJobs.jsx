import { useState } from "react";
import axios from "../../../axios/axios"
const AddJobs=()=>{
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('image', selectedFile);
      try {
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    return(
        <>
        {/* The button to open modal */}


{/* Put this part before </body> tag */}
<input type="checkbox" id="Add-jobs" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Let's Add Some Jobs</h3>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
    <div className="modal-action">
      <label htmlFor="Add-jobs" className="btn">Yay!</label>
    </div>
  </div>
</div>
        
        </>
    )
}
export default AddJobs