import { useNavigate } from "react-router-dom";
import { error } from "../../constants/constants";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-white text-center bg-gradient-to-r from-orange-300 to-sky-300 h-[100vh] flex justify-center ">
        <div className="m-56">
          <img className="w-96 p-2" src={error} alt="Error" />
          <h1 className="p-2 text-center text-zinc-700 font-mono font-extrabold text-7xl">OOPs...:404 error</h1>
          <h1 className="p-2 text-center text-zinc-700 font-mono font-extrabold text-5xl">Something Went Wrong</h1>
          <button
            className="bg-lime-700 text-white p-2 rounded-lg hover:bg-lime-900"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      </div>  
    </>
  );
};
export default ErrorPage;
