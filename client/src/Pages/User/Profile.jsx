import { useSelector } from "react-redux"
import ProfileCard from "../../Components/Card/ProfileCard";


const Profile= ()=>{
    const data=useSelector(state=>state.user.value)
    console.log(data);
    return(
    <>
      <ProfileCard data={data}/>  
       
    </>
    )
}
export default Profile