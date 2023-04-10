import {Route, Routes,React,Footer,MainPage,Navbar,ErrorPage} from "./import"

const UserLayout=()=>{
    return(
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={ <MainPage/>}/>
        <Route path="*" element={<ErrorPage/>} />
    </Routes>
    <Footer/>
    </>)
}
export default UserLayout
