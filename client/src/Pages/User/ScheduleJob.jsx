import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { axios } from "../../import"

const ScheduleJob=()=>{
    const {id}= useParams()
    useEffect(()=>{
        axios.get(`/getSlots/${id}`,{headers:{"x-access-token":localStorage.getItem("token")}})

    },[])
    return(
        <>
        {id}
        </>
    )
}
export default ScheduleJob