import React, { useEffect } from 'react'
import Axios from "axios";
import {Link} from "react-router-dom"
import { useState } from 'react';
import Loader from "../Loaders/Loader"
const UserOrderHistory = () => {
  const [OrderHistory,setOrderHistory]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  const getData=async()=>{
    const response=await Axios.get("http://localhost:1010/api/v1/get-order-history",
      {headers}
    )
    //  console.log(response.data.data)
    setOrderHistory(response.data.data);
    // console.log(OrderHistory.status)
  }
  useEffect(()=>{
   getData();
  },[])
  return (
    <div className=''>
        {!OrderHistory && <div className='h-[100%] flex items-center justify-center'><Loader/></div>}
        {OrderHistory && OrderHistory.length===0 && (
          <div className='h-[80vh] p-4 text-zinc-100'>
            <div className='h-[100%] flex flex-col items-center justify-center'>
              <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
                No order History
              </h1>
              <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhTpyWmwtyAmUotDgSTEEf5UFQz3nqF5yHQ&s" 
              alt="" 
              className='h-[20vh] mb-8'/>
            </div>
          </div>
        )}
        {OrderHistory && OrderHistory.length>0 && (
          <div className='h-[100%] md: text-zinc-100'>
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              Your Order History
            </h1>
            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%]'>
                <h1 className="text-center">Sr</h1>
              </div>
              <div className='w-[22%]'>
                <h1 className="">Books</h1>
              </div>
              <div className='w-[45%]'>
                <h1 className="">Description</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className="">price</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className="">Status</h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className="">Mode</h1>
              </div>
            </div>
            {OrderHistory.map((items,i)=>(
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
                <div className='w-[3%]'>
                  <h1 className="text-center">{i+1}</h1>
                </div>
                <div className='w-[22%]'>
                  <Link 
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300">
                    {items.book.title}
                    </Link>  
                </div>
                <div className='w-[45%]'>
                  <h1 className="">{items.book.desc.slice(0,50)}...</h1>
                </div>
                <div className='w-[9%]'>
                  <h1 className="">{items.book.price}</h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className="font-semibold text-green-500">
                    {items.status === "Order Placed"?(
                      <div className='text-green-500'>
                        {items.status}
                      </div>
                    ):items.status==="Canceled"?(
                      <div className='text-red-500'>{items.status}</div>
                    ):(
                      items.status
                    )}
                  </h1>
                </div>
                <div className='w-none md:w-[5%] hidden md:block'>
                    <h1 className="text-sm text-zinc-400">COD</h1>
                </div>
                
                
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default UserOrderHistory
