import MyVouchers from "../../Components/Card/MyVouchers";
import OtherCard from "../../Components/Card/OtherCard";
import ProfileCard from "../../Components/Card/ProfileCard";

const Profile = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="m-2 ">
        <ProfileCard />
      </div>
      <div className="m-2 ">
        <OtherCard />
        <MyVouchers />
      </div>
    </div>
  );
};
export default Profile;
