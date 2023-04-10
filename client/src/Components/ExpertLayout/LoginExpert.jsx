import { useDispatch } from "react-redux";
import { useState,useNavigate,Swal,axios,OTP} from "./import";
import { expertlogin } from "../../import";
import { useEffect } from "react";

const LoginExpert = () => {
    const [show,setShow]=useState(true)
    const [mobile,setMobile]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("experttoken")
    if(token){
      navigate("/expert")
    }
  }, [])
  

    const handleMobile = (e) => {
        const trimValue = e.target.value.replace(/[^0-9]/g, "");
        if (trimValue.length <= 10) {
          setMobile(trimValue);
        }
      }
    const handleClose=()=>{
    navigate('/')
    }
    const expertSignup=()=>{
        if(password ==="" || email ==="" || name ==="" || mobile ===""){
            Swal.fire("sorry","Please fill all required ","error")
        }else{

            axios.post('/expert/signup',{
                username:name,
                email:email,
                password:password,
                mobile:mobile
            }).then((response)=>{
                console.log(response.data);
                if(response.data.status === "success"){
                  const expertModal= document.getElementById("expert-otp")
                  expertModal.checked=true 
                  navigate('/expert')     
                }

            }).catch((error)=>{
              Swal.fire("sorry",error.message,"error")
            })
        }

    }
    const handleExpertLogin=()=>{
      if(mobile==="" || password===""){
        Swal.fire("sorry","All fields are required!!","error")
      }else{
        axios.post('/expert/signin',{
          mobile:mobile,
          password:password
        }).then((response)=>{
          console.log(response.data);
          if(!response.data.auth){
            Swal.fire("sorry",response.data.message,"error")
          }else{
            localStorage.setItem("experttoken",response.data.experttoken)
            dispatch(expertlogin(response.data))
            Swal.fire("success",response.data.message,"success")
            navigate("/expert")
          }
        })
      }

    }

  return (
    <>
      <div className="bg-gradient-to-r from-fuchsia-400 to-amber-400 h-screen flex justify-center items-center">
        <div className="p-5 h-max w-max border-2 rounded-2xl bg-gradient-to-r from-lime-300 to-blue-200 ">
        

            <button onClick={ handleClose } className="btn btn-sm btn-circle absolute text-right ">✕</button>
          <h3 className="text-3xl font-extrabold text-center p-2">{!show ? "Sign In" : "Register"}</h3>
            
          <div className="flex-grow flex justify-center items-center">
            <div className="p-2">
                {show && <>
                
              <h1 className="font-bold py-2">Name</h1>
              <input
                type="text"
           
                className="border rounded-md p-2"
                placeholder="Username"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                required
              />
              <h1 className="font-bold py-2">E-mail</h1>
              <input
                type="text"
                
                className="border rounded-md p-2"
                placeholder="name@exampple.com"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
              />
                </>}
              <h1 className="font-bold py-2">Mobile</h1>
              <input
                type="number"
                min="0"
                className="border rounded-md p-2"
                placeholder="+91-"
                onChange={handleMobile}
                value={mobile}
                required
              />
              <h1 className="font-bold py-2">Password</h1>
              <input
                type="password"
                className="border rounded-md p-2"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
             {!show ? 
             <p className="py-2">
                Not an Expert?{" "}
                <label
                  htmlFor="my-modal-6"
                  className="font-bold cursor-pointer"
                    onClick={()=>setShow(true)}
                >
                  Signup
                </label>
              </p>:
             <p className="py-2">
                Already an Expert?{"  "}
                <label
                  htmlFor="my-modal-6"
                  className="font-bold cursor-pointer"
                    onClick={()=>setShow(false)}
                >
                  SignIn
                </label>
              </p>
              }
              <div className="p-3 flex justify-center">
              {!show ? <> <button onClick={handleExpertLogin} className="btn btn-outline font-extrabold">
                  Login
                </button></> :
              <> <button onClick={expertSignup} className="btn btn-outline font-extrabold">
                  Signup
                </button></> }
              </div>
            </div>
          </div>
        </div>
      </div>
      <OTP mobile={mobile}/>
    </>
  );
};
export default LoginExpert;
