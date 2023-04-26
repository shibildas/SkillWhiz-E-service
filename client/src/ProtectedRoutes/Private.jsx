import { Navigate } from "react-router-dom"

const Private=(props)=>{
    if(localStorage.getItem("token")){
        return props.children
    }else{
        return(<Navigate to="/"/>)    
    }
}
export default Private