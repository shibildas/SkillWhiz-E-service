import { Link } from "react-router-dom"

const Sidebar=()=>{
  
    return(
        <>
   

        <div className="drawer-side">

<label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
<ul className="menu p-4 w-80 bg-slate-700 shadow-2xl text-white font-bold text-2xl">
 
  <li className="p-2  rounded-md hover:bg-slate-900 "><Link to="/admin">Dashboard</Link></li>
  <li className="p-2  rounded-md hover:bg-slate-900"><Link to="/admin/experts">ExpertList</Link></li>
  <li className="p-2  rounded-md hover:bg-slate-900"><Link to="/admin/users">UserList</Link></li>
</ul>

</div>
       
        </>
    )
}
export default Sidebar