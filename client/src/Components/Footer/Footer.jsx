import { footerImg,footerRay,comment,icon,social } from "../../constants/constants"


const Footer = ()=>{
    return(
        <>
        <div className="vw-100 h-full bg-slate-300">
            <h1 className="p-4 text-6xl font-bold mx-10">Why Skillwhiz ?</h1>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {footerImg.map((img,index)=>{
                   return <li key={2+index} className="p-2 flex flex-col justify-center items-center"><img className="w-20" src={img?.img} alt="image" /><h1 className="mt-2 font-extrabold font-mono ">{img?.val}</h1></li>
                })}
            </ul>
            <ul className="p-4 mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
                {footerRay.map((ele,index)=>{
                    return <li key={10+index} className="p-2 flex flex-col justify-center items-center">{ele}</li>
                })}
            </ul>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20 p-5">
                <li className="flex"><img className="w-full float-right" src={icon} alt="image" /></li>
                <li className="w-full">{comment}</li>
                <li className="w-80"><h1 className="p-2 font-mono font-bold">FOLLOW US</h1> <ul className="flex gap-4 p-2">
                    {social.map((app,index)=>{

                        
                        return <li key={20+index} className=""><img src={app} alt="image" /></li>
                    })
                    }
                    
                    </ul></li>
            </ul>


        </div>
        </>
    )
}
export default Footer