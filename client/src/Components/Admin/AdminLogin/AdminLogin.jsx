import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "../../../axios/axios"
import { AppContext } from "../../../context/context"
import {adminlogin} from "../../../redux/admin"

const AdminLogin=()=>{
  const {setAdmin} = useContext(AppContext)
    const navigate= useNavigate()
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const dispatch= useDispatch()

    const handleAdmin=()=>{
        if(email==="" || password===""){
            Swal.fire("sorry","Credentials can't be empty","error")
        }else{
            axios.post('/admin',{email,password}).then((resp)=>{
                console.log("admin");
                if(!resp.data.auth){

                    Swal.fire(resp?.data?.message)
                }else{
                    dispatch(adminlogin(resp.data))
                    localStorage.setItem("admintoken",resp.data.token)
                    Swal.fire("success",resp.data.message,"success")
                    setAdmin(true)
                    navigate('/admin')
                }
            }).catch((err)=>{
                Swal.fire('sorry',err.message,'error')
            })
        }


    }
    const handleClose=()=>{
        navigate('/')

    }

return(
    <>
    <div className="bg-gradient-to-r from-slate-400 to-teal-300 h-screen flex justify-center items-center">
        <div className="p-5 h-max w-max border-2 rounded-2xl bg-gradient-to-r from-black to-teal-600 ">
        

            <button onClick={ handleClose } className="btn btn-sm btn-circle btn-ghost absolute text-right text-white ">✕</button>
          <h3 className="text-3xl font-extrabold text-center p-2 text-white"> Admin</h3>
            
          <div className="flex-grow flex justify-center items-center">
            <div className="p-2">
             
              <h1 className="font-bold py-2 text-white">E-mail</h1>
              <input
                type="text"
                
                className="border rounded-md p-2"
                placeholder="name@exampple.com"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
              />
          
           
              <h1 className="font-bold py-2 text-white">Password</h1>
              <input
                type="password"
                className="border rounded-md p-2"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
             <p className="py-2 text-white">
                Not an Admin?{"  "}
                <b
                
                  className="font-bold cursor-pointer"
                    onClick={handleClose}
                >
                  Go Back
                </b>
              </p>
              
              <div className="p-3 flex justify-center">
             <button onClick={handleAdmin} className="text-white btn btn-outline btn-success font-extrabold">
                  Login
                </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
)
}
export default AdminLogin