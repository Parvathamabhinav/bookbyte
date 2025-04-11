import React from 'react'
import { useState,useEffect } from 'react'
import Loader from '../components/Loaders/Loader'
import BookCard from '../components/BookCard/BookCard'
import Axios from 'axios'
const AllBooks = () => {
  const [Data,setData]=useState();
    const getData=async(req,res)=>{
        const response=await Axios.get("http://localhost:1010/api/v1/get-all-books");
        
        console.log(response.data.data);
        setData(response.data.data);
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div className='bg-zinc-900  h-auto lg:h-screen px-12 py-8'>
      {" "}
       <h4 className='text-3xl text-yellow-100'>Collection</h4>
       {!Data && <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div>}
  
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"> 
        {Data && Data.map((items,i)=>(
            <div key={i}>
                <BookCard data={items}/>{" "}
            </div>
        ))}
      </div>
    </div>
  )
}

export default AllBooks
