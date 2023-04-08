const Sidebar=()=>{
    return(
        <>
        <div className="drawer-side">

<label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
<ul className="menu p-4 w-80 bg-slate-700 shadow-2xl text-white font-bold text-2xl">
 
  <li className="p-2  rounded-md hover:bg-slate-900 "><a>Dashboard</a></li>
  <li className="p-2  rounded-md hover:bg-slate-900"><a>ExpertList</a></li>
  <li className="p-2  rounded-md hover:bg-slate-900"><a>UserList</a></li>
</ul>

</div>
        </>
    )
}
export default Sidebar