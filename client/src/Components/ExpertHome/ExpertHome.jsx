import ExpertNav from "./ExpertNav"
import Invite from "../Invite/Invite"
import { useState } from "react"

const ExpertHome=()=>{
    const [show,setShow]=useState(false)
    return(
        <>
        <ExpertNav/>
        <Invite show={show}/>
        </>
    )
}
export default ExpertHome