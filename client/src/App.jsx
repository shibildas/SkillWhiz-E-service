import { useEffect, useState } from "react"
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import axios from "./axios/axios"
import { useDispatch } from "react-redux"
import { login } from "./redux/user"
import UserLayout from "./Components/UserLayout/UserLayout"
import ExpertLayout from "./Components/ExpertLayout/ExpertLayout"
import ErrorPage from "./Components/Error/Error"
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin"
import AdminLayout from "./Components/Admin/Layout/AdminLayout"
import { adminlogin } from "./redux/admin"
import { expertlogin } from "./redux/expert"
import LoginExpert from "./Components/ExpertLayout/LoginExpert"

function App() {
  const [user,setuser]=useState(false)
  const [admin,setAdmin]=useState(false)
  const [expert,setExpert]=useState(false)
  const dispatch= useDispatch()
  useEffect(() => {
    axios.get("isUserAuth",{
      headers:{"x-access-token":localStorage.getItem("token")},

    }).then((response)=>{
      console.log(response.data);
      if(!response.data.auth){
      setuser(false)
      }else{
        setuser(true)
        dispatch(login(response.data))
      }
    })
  }, [user])
  useEffect(()=>{
    axios.get("/admin/isAdminAuth",{
      headers:{ "x-access-admintoken":localStorage.getItem("admintoken")}
    }).then((res)=>{
      if(!res.data.auth){
        setAdmin(false)
      }else{
        setAdmin(true)
        dispatch(adminlogin(res.data))
      }
    })
  },[admin])

  useEffect(()=>{

axios.get("/expert/isExpertAuth",{
  headers:{ "x-access-experttoken":localStorage.getItem("experttoken")}
}).then((res)=>{
  if(!res.data.auth){
    setExpert(false)
  }else{
    setAdmin(true)
    dispatch(expertlogin(res.data))
  }
})

  },[expert])


  return (
    <BrowserRouter>
 
      <Routes>

 
      <Route exact path="/" Component={UserLayout}/>
      {expert ? <Route exact path="/expert" Component={ExpertLayout}/>:
      <Route path="/expert" Component={LoginExpert}/>}
      {!admin ? <Route exact path="/admin" Component={AdminLogin}/>:
      <Route exact path="/admin" Component={AdminLayout}/>}
      <Route  path="*" Component={ErrorPage}/>

      </Routes>
    

    </BrowserRouter>
  )
}

export default App
