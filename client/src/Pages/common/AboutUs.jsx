import React from "react";
import SideCard from "../../Components/Card/SideCard";
import {
  customerrest,
  customersatisfy,
  goal,
  goalrest,
  introRest,
  introduction,
  servicerest,
  servicesprovided,
} from "../../constants/constants";

const AboutUs = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-extrabold p-2 m-2 underline underline-offset-4">
        About Us
      </h1>
      <div className="lg:grid lg:grid-cols-2">
        <SideCard
          title="Introduction"
          image="https://res.cloudinary.com/dpfnxwvps/image/upload/c_scale,h_358,w_541/v1683370374/63ebb4044469c79e99808a78_intro-1-p-500_nofo6b.avif"
          content={introduction}
          rest={introRest}
        />
        <SideCard
          title="Services"
          image="https://res.cloudinary.com/dpfnxwvps/image/upload/c_scale,h_358,w_541/v1683371161/conceptual-hand-writing-showing-our-services-concept-meaning-occupation-function-serving-intangible-products-male-wear-160644151_nuo4b1.avif"
          content={servicesprovided}
          rest={servicerest}
        />
        <SideCard
          title="Customer Satisfaction"
          image="https://res.cloudinary.com/dpfnxwvps/image/upload/c_scale,h_358,w_541/v1683371273/customer-satisfaction_ncu3oe.avif"
          content={customersatisfy}
          rest={customerrest}
        />
        <SideCard
          title="Our Goal"
          image="https://res.cloudinary.com/dpfnxwvps/image/upload/c_scale,h_358,w_541/v1683371515/goal-setting-header_n6bvzp.avif"
          content={goal}
          rest={goalrest}
        />
      </div>
    </div>
  );
};

export default AboutUs;
