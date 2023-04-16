import Invite from "../../Components/Invite/Invite"
import { useEffect, useState } from "react"
import Skills from "../../Components/Skills/Skills"

const ExpertHome=()=>{
    const [show,setShow]=useState()
    useEffect(() => {
    
    setShow(false)
    }, [])
    
    return(
        <>
        <div>

        <Invite show={show}/>
        <Skills/>
        </div>
        </>
    )
}
export default ExpertHome