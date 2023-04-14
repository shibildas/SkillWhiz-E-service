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
      <div className="navbar bg-gradient-to-b to-purple-400 from-violet-800 shadow-2xl text-white">
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
                <a>Home</a>
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
                <ul className="p-2 absolute">
                  <li>
                    <a className="">Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
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
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
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
              <ul className="p-2 absolute">
                <li>
                  <a className="text-black">Submenu 1</a>
                </li>
                <li>
                  <a className="text-black">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a> About us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end text-black">
          {/* <a className="btn">Get started</a> */}
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
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <label htmlFor="my-modal-3" className="btn btn-accent">
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
