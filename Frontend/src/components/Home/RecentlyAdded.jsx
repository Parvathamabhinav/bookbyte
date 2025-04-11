import React, { useEffect, useState } from 'react'
import Axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loaders/Loader';
const RecentlyAdded = () => {
    const [Data,setData]=useState();
    const getData=async(req,res)=>{
        const response=await Axios.get("http://localhost:1010/api/v1/get-recent-books");
        
        // console.log(response.data.data);
        setData(response.data.data);
    }
    useEffect(()=>{
        getData();
    },[])
    
    return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently added</h4>
      {!Data && (<div className='flex items-center justify-center my-8'>
            <Loader/>
            </div>)}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8"> 
        {Data && Data.map((items,i)=>(
            <div key={i}>
                <BookCard data={items}/>{" "}
            </div>
        ))}
      </div>
    </div>
    )
   
 
  } 

export default RecentlyAdded
