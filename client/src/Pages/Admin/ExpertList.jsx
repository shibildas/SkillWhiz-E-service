import useGerExperts from "../../Services/useGetExperts";


const ExpertList = () => {
    const datas = useGerExperts()
    const arra=[0,1,2,3,4]
    
  return (
    <>
      <div className="p-3">
        <h1 className="p-3 font-extrabold text-amber-100 md:text-5xl sm:text-2xl tracking-widest">Experts</h1>
        <div className="overflow-x-auto w-full shadow-black shadow-2xl rounded-xl ">
          <table className="table w-full ">
            <thead >
              <tr  className="">
                <th className="text-2xl bg-slate-400 text-stone-700">Sl no.</th>
                <th className="text-2xl bg-slate-400 text-stone-700">Name & E-mail</th>
                <th className="text-2xl bg-slate-400 text-stone-700">Jobs</th>
                <th className="text-2xl bg-slate-400 text-stone-700">Status</th>
                <th className="text-2xl bg-slate-400 text-stone-700">Block / Unblock</th>
                <th className="text-2xl bg-slate-400 text-stone-700">Edit Details</th>
                <th className="text-2xl bg-slate-400 text-stone-700">Slots </th>
              </tr>
            </thead>
            <tbody>
            {datas?.length!=0 ? (datas?.map((data,index)=>{return(
              <tr key={index+10} className={(index%2==0)? "active":"hover"}>
                <th>{index+1}</th>
                <td >
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={data?.image ? data.image : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                          alt="PIC"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data?.username}</div>
                      <div className="text-sm opacity-50">{data?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Contact:{data?.mobile}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>{data?.isBanned ? "Blocked" : "Unblocked"}</td>
                <td className="flex justify-center">{(data?.identity?.status ==="pending") ? <button className="btn">Verify</button>  : <button className="btn">Re-verify</button> }</td>
                <th>
                  <button className="btn btn-ghost btn-outline">Edit</button>
                </th>
                <th>
                  <button className="btn btn-secondary btn-outline">Add Slots</button>
                </th>
              </tr> )})):(arra.map((e)=>{
                return(<tr key={e} className={(e%2==0)? "active":""}>
                  <td colSpan="6">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-400 rounded"></div>
                          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>)
              }))} 
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ExpertList;
