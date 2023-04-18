import { useParams } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import { useEffect, useState } from "react";
import { axios } from "../../import";
import { Swal } from "../../Components/ExpertOTP/import";

const Detail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    axios
      .get(`/jobDetail/${jobId}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setJob(res.data.result);
        } else {
          Swal.fire("sorry", "coudnt fetch data", "error");
        }
      })
      .catch((error) => {
        Swal.fire("error", error.message, "error");
      });
  }, []);

  useAuthUser();
  return (
    <>
      <>
        <div className="bg-white p-5 mt-5 sm:flex sm:justify-between border border-y-2">
          <h1 className="md:text-3xl sm:text-xl font-extrabold">
            {jobId.toUpperCase()}
          </h1>
          <button className="btn btn-warning shadow-2xl shadow-black">
            Book Now
          </button>
        </div>
        <div className="bg-white p-2 border border-y-4">
          <h1 className="text-xl font-bold">
            HOW CAN YOU FIND EXPERT {job?.job_role?.toUpperCase()} NEAR YOU?
          </h1>
          <p className="p-2">
            SkillWhiz connects you to professional {job?.job_role} services. we
            have it all. Connect with SkillWhiz for expert {job?.job_role}{" "}
            services. Are {job?.job_role} problems disrupting your routine? .
            Connect with us and get efficient services at the best rates.
          </p>
        </div>
        <div tabIndex={0} className="collapse group bg-white py-2">

          <div className="collapse-title text-xl rounded-t-lg font-bold bg-slate-100 text-slate-800 group-focus:bg-yellow-500 group-focus:text-black">
            Rate Chart
          </div>
          <div className="collapse-content bg-slate-200 text-black ">
            <div className="overflow-x-auto">
              <table className="table w-full text-black my-2">
                <tbody>
                  <tr className="active">
                    <td>Basic Rate** (up to 2 hrs)</td>
                    <td className="">₹ {job.base_rate}</td>
                    <td>₹ {job.base_rate}</td>
                  </tr>

                  <tr>
                    <td>Additional</td>
                    <td>₹ {job.add_rate}</td>
                    <td>₹ {job.add_rate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              ** Material charges extra. For work of more than 4 hours, a
              detailed quote will be given in advance, and work will start on
              approval
            </p>
          </div>
        </div>
        <div tabIndex={0} className="collapse group bg-white py-2">
          <div className="collapse-title text-xl rounded-t-lg font-bold bg-slate-100 text-slate-800 group-focus:bg-yellow-500 group-focus:text-black">
            Terms & Conditions
          </div>
          <div className="collapse-content bg-slate-200 text-black ">
            <p>
              SkillWhiz charges for unit of 2 hour of service initially, and
              every 60 minutes thereon Material charges are additional. Customer
              can either purchase the material directly or request the service
              partner to procure it. Time for material procurement will be
              charged in the final bill.Our service partner will help you with a
              quotation in case of long hour work schedules. Please confirm the
              quotation before initiating work to avoid any conflict on service
              completion.
            </p>
          </div>
        </div>
        <div tabIndex={0} className="collapse group bg-white py-2">
          <div className="collapse-title text-xl rounded-t-lg font-bold bg-slate-100 text-slate-800 group-focus:bg-yellow-500 group-focus:text-black">
            How it works?
          </div>
          <div className="collapse-content bg-slate-200 text-black ">
            <p className="p-2 text-black">
              After you book the service, {job?.job_role} in your area will
              receive a notification coordinated by SkillWhiz customer service.
              Kindly wait for the confirmation message. Our service partner will
              call and note the details of the problem, to bring along the
              necessary tools and other equipment. Make sure all materials for
              service are kept ready before service starts. In case you want the
              Skillwhiz partner to purchase the materials, let them know
              beforehand. The time taken for purchase of materials will be added
              as part of service charges. Skillwhiz partner will give you a
              quotation if required for work that requires more than 4 hours.
              Work will be done only after your approval of the quote When the
              work is over, our agent will let you know the service charge.
              Please make the payment accordingly online on our platform or by
              cash to the service provider
            </p>
          </div>
        </div>
        <div tabIndex={0} className="collapse group bg-white py-2">
          <div className="collapse-title text-xl rounded-t-lg font-bold bg-slate-100 text-slate-800 group-focus:bg-yellow-500 group-focus:text-black">
            FAQs
          </div>
          <div className="collapse-content bg-slate-200 text-black ">
            <b>How do I ensure the authenticity of electricians who delivers service at my place?</b>
            <p>We have partnered with the most experienced {job?.job_role} near you, verified by SkillWhiz for their background, education, and experience. They are also trained for high levels of customer service</p>
            <b>Do they charge amount for the time spent on material purchase during service delivery?</b>
            <p>Yes, but our partner will ensure the purchase is done in minimum time. It is preferable to discuss with the electricians and get the necessary materials before the delivery to avoid additional costs. </p>
          </div>
        </div>
        <div className="bg-white p-5">
         <h1 className="text-xl font-bold">Customer Review</h1> 
        </div>
      </>
    </>
  );
};
export default Detail;
