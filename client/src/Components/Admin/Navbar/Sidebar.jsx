import { Link } from "react-router-dom"

const Sidebar=()=>{
  
    return(
        <>
        <div className="drawer-side max-w-fit">
<label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
<ul className="menu p-4 w-80 bg-cyan-950 shadow-2xl text-white font-bold text-2xl max-w-full">
 
  <li className="p-2 my-2 border shadow-black shadow-2xl rounded-md hover:bg-slate-900"><Link to="/admin">Dashboard</Link></li>
  <li className="p-2 my-2 border shadow-black shadow-2xl rounded-md hover:bg-slate-900"><Link to="/admin/experts">ExpertList</Link></li>
  <li className="p-2 my-2 border shadow-black shadow-2xl rounded-md hover:bg-slate-900"><Link to="/admin/users">UserList</Link></li>
  <li className="p-2 my-2 border shadow-black shadow-2xl rounded-md hover:bg-slate-900"><Link to="/admin/jobs">Jobs</Link></li>
</ul>
</div>  
        </>
    )
}
export default Sidebar