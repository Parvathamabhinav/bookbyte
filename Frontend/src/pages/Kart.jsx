import React, { useState,useEffect } from 'react'
import Axios from "axios"
import Loader from "../components/Loaders/Loader"
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const Kart = () => {
  const navigate=useNavigate();
  const [Kart,setKart]=useState([]);
  const [Total,setTotal]=useState(0);
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  const getData=async(req,res)=>{
    const response=await Axios.get("http://localhost:1010/api/v1/get-user-cart",{headers}); 
    setKart(response.data.data);
    // console.log(Profile);
}
useEffect(()=>{
    getData();
},[Kart])
const deleteItem=async(bookid)=>{
  const response=await Axios.put(`http://localhost:1010/api/v1/remove-from-cart/${bookid}`,{},{headers})
  alert(response.data.message)
}
useEffect(()=>{
  if(Kart && Kart.length>0){
    let total=0;
    Kart.map((items)=>{
      total+=items.price;
    });
    setTotal(total);
    total=0;
  }
},[]);
   const PlaceOrder=async()=>{
    try{const response=await Axios.post(`http://localhost:1010/api/v1/place-order`,
      {order:Kart},
      {headers}
    );
    alert(response.data.message);
    navigate("/profile/orderHistory")
   
  }catch(error){
    console.log(error)
  }
}
  return (
  <div className='bg-zinc-900 px-12 py-8 h-screen'>
   {!Kart && <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div>}
   {Kart && Kart.length===0 && (
    <div className="h-screen">
      <div className='h-[100%] flex items-center justify-center flex-col'>
        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
          Empty cart
        </h1>
        <img 
        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
        alt="empty cart" 
        className='lg:h-[50vh]'/>
      </div>
    </div>
   )}
   {Kart && Kart.length>0 && (
    <>
      <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
        Your Cart
      </h1>
      {
        Kart.map((items,i)=>(
          <div
          className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
          key={i}
          >
          <img 
            src={items.url} 
            alt="/"
            className='h-[20vh] md:h-[10vh] object-cover' 
          />
          <div className="w-full md:w-auto">
            <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
              {items.title}
            </h1>
            <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
              {items.desc.slice(0,100)}...
            </p>
            <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
              {items.desc.slice(0,65)}...
            </p>
            <p className="text-normal text-zinc-300 mt-2 block md:hidden">
              {items.desc.slice(0,100)}...
            </p>
          </div>
          <div className="flex mt-4 w-full md:w-auto items-center justify-between">
            <h2 className="text-zinc-100 text-3xl font-semibold flex">
              ${items.price}
            </h2>
            <button className="bg-red100 text-red-700 border border-red-700 rounded p-2 ms-12" onClick={()=>deleteItem(items._id)}>
            <AiFillDelete/>
            </button>
          </div>
          


          </div>
        ))
      }
    </>
   )}
    {Kart && Kart.length>0 &&(
      <div className="mt-4 w-full flex items-center justify-end">
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className="text-3xl text-zinc-200 font-semibold">
            Total Amount
          </h1>
          <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
            <h2>{Kart.length} books</h2> <h2>$ {Total}</h2>
          </div>
          <div className='w-[100%] mt-3'>
            <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
            onClick={PlaceOrder}
            >
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    )}
   </div>
  )
}

export default Kart
