import {Route,Routes,ExpertHome,ExpertNav,Footer,ErrorPage} from "./import"

const ExpertLayout = ()=>{
    
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