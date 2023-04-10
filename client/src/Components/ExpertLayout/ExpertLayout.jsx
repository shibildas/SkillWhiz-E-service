import useAuthExpert from "../../hooks/useAuthExpert"
import {Route,Routes,ExpertHome,ExpertNav,Footer,ErrorPage} from "./import"

const ExpertLayout = ()=>{
    useAuthExpert()
    return(
        <>
        <ExpertNav/>
        <Routes>
            <Route path="/" element={<ExpertHome />}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes> 
        <Footer/>
        </>
    )
}
export default ExpertLayout