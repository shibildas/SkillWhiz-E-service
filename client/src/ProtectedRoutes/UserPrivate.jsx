import { Navigate } from "react-router-dom"

const UserPrivate=(props)=>{

    if(localStorage.getItem("token")){
        return props.children
    }else{

        return(<Navigate to="/"/>)
        
    }

}
export default UserPrivate