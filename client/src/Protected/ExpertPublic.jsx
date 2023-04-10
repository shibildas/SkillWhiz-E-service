import { Navigate } from "react-router-dom"

const ExpertPublic=(props)=>{
    if(localStorage.getItem("experttoken")){
        return <Navigate to="/expert"/>
    }else{
        return props.children
    }
}
export default ExpertPublic