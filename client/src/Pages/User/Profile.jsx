import ProfileCard from "../../Components/Card/ProfileCard";
import useAuthUser from "../../hooks/useAuthUser";

const Profile= ()=>{
   useAuthUser()
    return(
    <>
      <ProfileCard/>    
    </>
    )
}
export default Profile