import { Navigate } from "react-router-dom"

const ExpertPrivate=(props)=>{
    if(localStorage.getItem("experttoken")){
        return props.children
    }else{
        return <Navigate to="/expertlogin"/>
    }
}
export default ExpertPrivate