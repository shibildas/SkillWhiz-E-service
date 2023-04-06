import { useEffect } from "react"
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import axios from "./axios/axios"
import { useDispatch } from "react-redux"
import { login } from "./redux/user"
import UserLayout from "./Components/UserLayout/UserLayout"
import ExpertLayout from "./Components/ExpertLayout/ExpertLayout"
import ErrorPage from "./Components/Error/Error"

function App() {
  const dispatch= useDispatch()
  useEffect(() => {
    axios.get("isUserAuth",{
      headers:{"x-access-token":localStorage.getItem("token")},

    }).then((response)=>{
      console.log(response.data);
      if(!response.data.auth){
      
      }else{
        dispatch(login(response.data))
      }
    })
    
  
   
  }, [])
  


  return (
    <BrowserRouter>
 
      <Routes>

 
      <Route exact path="/" Component={UserLayout}/>
      <Route exact path="/expert" Component={ExpertLayout}/>
      <Route  path="*" Component={ErrorPage}/>

      </Routes>
    

    </BrowserRouter>
  )
}

export default App
