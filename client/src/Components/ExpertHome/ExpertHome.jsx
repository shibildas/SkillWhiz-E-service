import Invite from "../Invite/Invite"
import { useEffect, useState } from "react"

const ExpertHome=()=>{
    const [show,setShow]=useState()
    useEffect(() => {
    
    setShow(false)
    }, [])
    
    return(
        <>
        <Invite show={show}/>
        </>
    )
}
export default ExpertHome