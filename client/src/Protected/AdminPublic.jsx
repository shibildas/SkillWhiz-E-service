import { Navigate } from "react-router-dom"

const AdminPublic=(props)=>{

    if(localStorage.getItem("admintoken")){
        return <Navigate to="/admin"/>
    }else{
        return props.children
    }
       
}
export default AdminPublic