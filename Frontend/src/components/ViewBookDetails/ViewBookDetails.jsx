import React, { useEffect, useState } from 'react'
import Axios from "axios";
import Loader from '../Loaders/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import {GrLanguage} from "react-icons/gr"
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
const ViewBookDetails = () => {
    const {id} =useParams();
    // console.log(id);
    const navigate=useNavigate();
    const [Data,setData]=useState();
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    // console.log(isLoggedIn);
    // console.log(role);
    const getData=async(req,res)=>{
        const response=await Axios.get(`http://localhost:1010/api/v1/get-book-by-id/${id}`);
        
        // console.log(response.data.data);
        setData(response.data.data);
    }
    useEffect(()=>{
        getData();
    },[])
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:id,
      };
      
    const handlefavourite=async()=>{
        const response=await Axios.put("http://localhost:1010/api/v1/add-book-to-favourite",
            {},
            {headers}
        );
        alert(response.data.message);
        navigate("/all-books")
    }
    const handleCart=async()=>{
        console.log(localStorage.getItem("id"));   // Should log the correct user ID
        console.log(localStorage.getItem("token")); // Should log the correct JWT token

        // console.log("hii----<>")
        const response=await Axios.put("http://localhost:1010/api/v1/add-to-cart",
            {},
            {headers}
        );
        // console.log(response.data);
         alert(response.data.message);
    }
    const deleteBook=async()=>{
        const response=await Axios.put("http://localhost:1010/api/v1/delete-book",{},
            {headers}
        )
       alert(response.data.message);
    }
  return (
   <>
    {Data && (
        <div className='  px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row lg:flex-row gap-8 items-start'>
           <div className='h-[80vh] w-full lg:w-2/6'>
               {" "}{/*why?*/}
               <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded '>
                    {" "}
                    <img src={Data.url} alt="image" className='h-[50vh] md:h-[80vh] lg:h-[50vh] rounded  '/>
                    {isLoggedIn===true && role==="user"&&(
                        <div className='flex flex-col md:flex-row  lg:flex-col mt-4 items-center justify-between lg:justify-start lg:mt-0'>
                            <button className='bg-white rounded lg:rounded-full text-3xl p-3  text-red-500 flex items-center justify-center' onClick={handlefavourite}>
                            {<FaHeart/>}<span className='ms-4 block lg:hidden'>Favourites </span>
                            </button>
                            <button className='text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 text-blue-500 bg-blue-500 flex items-center justify-center' onClick={handleCart}>
                             {<FaShoppingCart/>}<span className='ms-4 block lg:hidden'>Add to cart </span>
                            </button>
                        </div>
                    )}
                    {/*admin */}
                    {isLoggedIn===true && role==="admin"&&(
                        <div className='flex flex-col md:flex-row lg:flex-col mt-4 items-center justify-between lg:justify-start lg:mt-0'>
                            <Link  to={`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-3xl p-3  text-red-500 flex items-center justify-center'>
                            {<MdModeEdit/>}<span className='ms-4 block lg:hidden'>Edit</span>
                            </Link>
                            <button className='text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 text-blue-500 bg-blue-500 flex items-center justify-center' onClick={deleteBook}>
                             {<MdDelete/>}<span className='ms-4 block lg:hidden'>Delete Book </span>
                            </button>
                        </div>
                    )}

               </div>
            </div>
            <div className="p-4  w-full lg:w-3/6">
                <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
                <p className="text-zinc-400 mt-1">by {Data.author}</p>
                <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
                <p className="flex mt-4 items-center justify-start text-zinc-400"><GrLanguage className="me-3"/>{Data.language}</p>
                <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price : ${Data.price}{" "}</p>
            </div>
 
        </div>
    )}
    {!Data && (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
            <Loader/>{" "}
        </div>
    )}
   </>
  );
}

export default ViewBookDetails
