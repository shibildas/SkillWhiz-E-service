import { Navigate } from "react-router-dom"

const AdminPrivate=(props)=>{

    if(localStorage.getItem("admintoken")){

        return props.children
    }else{

       return <Navigate to="/adminlogin"/>
    }
        
}
export default AdminPrivate