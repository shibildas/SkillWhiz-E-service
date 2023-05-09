import Signin from "./Signin";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/user";

const Navbar = () => {
  const dispatch=useDispatch()
  const isUserAuth = useSelector((state)=>state.user.value.isUserAuth)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout())
    navigate("/");
  };
  const data = useSelector((state) => state.user.value);
 

  return (
    <>
      <div className="navbar bg-purple-500 shadow-2xl text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Services
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2 absolute bg-white underline">
                  <li>
                    <Link to='/chat' className="">Chat</Link>
                  </li>
                  <li>
                    <Link to='/alljobs'>All Services</Link>
                  </li>
                </ul>
              </li>
              <li>
              <Link to='/aboutus'> About us</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="px-2">
            <img
              className="w-14 rounded-full shadow-2xl cursor-pointer"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-extrabold text-xl ">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li tabIndex={0}>
              <a>
                Services
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-purple-500 underline">
                <li>
                  <Link to="/chat" className="text-slate-100">Chat 1</Link>
                </li>
              </ul>
            </li>
                <li>
                  <Link to='/alljobs' className="">All Services</Link>
                </li>
            <li>
              <Link to='/aboutus'> About us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end text-black">
          {isUserAuth ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="image"
                      src={
                        data?.image
                          ? data.image
                          : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="items-start flex-col">
                      <b className="text-2xl">{data?.username?.toUpperCase()?.substring(0,6)}</b>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookings">My Bookings</Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <label htmlFor="my-modal-3" className="btn btn-secondary shadow shadow-black">
              Login
            </label>
          )}
          <Signin />
          <Signup />
        </div>
      </div>
    </>
  );
};
export default Navbar;
