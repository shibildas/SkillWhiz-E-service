import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useDispatch } from "react-redux";
import { adminlogout } from "../../../redux/admin";
const NavbarAdmin = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()


    const handleLogout=()=>{
      dispatch(adminlogout())
        localStorage.removeItem("admintoken")
        navigate("/admin/login")
    }
  return (
    <>
      <div className="navbar bg-cyan-950 text-neutral-content shadow-2xl">
      <div className="navbar-start">
      
        <label htmlFor="my-drawer-2" className="px-2 ">
          <img className="w-14 rounded-full cursor-pointer" src={logo} alt="logo" />
        </label></div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-white">
                <img
                  alt="image"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a className="items-start flex-col">
                  <b></b>
                  Profile
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/">SkillWhiz</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavbarAdmin;
