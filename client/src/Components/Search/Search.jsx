import React, { useState } from 'react'

const Search = ({handleSearch,filterList,setFilter}) => {
    const [searchText, setSearchText]= useState('')
    const [disable,setDisable]=useState(true)

    const handleClick=()=>{
      handleSearch(searchText)
    }
    

  return (
    <>
    <div className="form-control">
  <div className="input-group">
  <select className="select select-accent " onChange={(e)=>{
    setFilter(e.target.value)
    setDisable(false)
  }}>
  <option disabled selected>Select Filter</option>
 { filterList?.map((list,index)=>{
  return(<option value={(index+1)} key={index}>{list}</option>)
 })}
</select>
    <input disabled={disable} type="text" placeholder="Search…" className="input input-accent input-bordered w-36 lg:w-fit " value={searchText} onChange={(e)=>{
             setSearchText(e.target.value)}}/>
    <button className="btn btn-square" onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
    </>
  )
}

export default Search