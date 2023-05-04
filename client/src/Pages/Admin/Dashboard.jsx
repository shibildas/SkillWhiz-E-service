import Card from "../../Components/Admin/Cards/Card"

const Dashboard=()=>{
    return(
        <>
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
            <Card/>
            <Card/>    
            <Card/>
            <Card/>
            </div>

        </div>
        </>
    )
}
export default Dashboard