import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { expertlogout } from "../../redux/expert"
const ExpertNav=()=>{
  const dispatch = useDispatch()

const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("experttoken")
    dispatch(expertlogout())
    navigate('/expert/login')

  }
  const data = useSelector((state)=>state.expert.value)
  
  
    return(
        <>
        <div className="navbar bg-blue-900 shadow-2xl">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link to="/expert/home">Home</Link></li>
       {data?.verified && <li><Link to="/expert/schedule">Schedules</Link></li>}
        <li tabIndex={0}>
          <a className="justify-between">
            Services
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul className="p-2 bg-slate-100">
          <li><Link to='/expert/chat'>Chat</Link></li>
          </ul>
        </li>
        <li><Link to='/expert/aboutus'>About us</Link></li>
      </ul>
    </div>
    <Link to="/expert/home" className="px-2 cursor-pointer"><img className="w-14 rounded-full sxhadow-2xl" src={logo} alt="logo" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex text-white text-xl font-bold">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/expert/home">Home</Link></li>
      {data?.verified && <li><Link to="/expert/schedule">Schedules</Link></li>}
      <li tabIndex={0}>
        <a>
          Services
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-blue-900">
        <li><Link to='/expert/chat'>Chat</Link></li>
     
        </ul>
      </li>
      <li><Link to='/expert/aboutus'>About us</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full outline outline-2 text-white">
          <img src={data?.image ? data?.image :"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="image" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow text-white rounded-box w-52 bg-blue-900">
        <li>
          <Link to='/expert/profile' className="items-start flex-col underline">
            <b className="text-2xl" >{data?.username?.toUpperCase()?.substring(0,6)}</b>
          Profile 
          </Link>
        </li>
        {data?.verified && <Link to="/expert/myappointments"><li><a>My Appointments</a></li></Link>}
        <li><Link to='/expert/chat'>Chat</Link></li>
        <li className="font-extrabold underline"><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

        </>
    )
}
export default ExpertNav