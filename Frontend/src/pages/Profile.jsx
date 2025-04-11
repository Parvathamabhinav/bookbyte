import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/sidebar'
import {Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import Axios from "axios"
import Loader from "../components/Loaders/Loader"
import MobileNav from '../components/Profile/MobileNav'
const Profile = () => {
  // const isLoggedIn=useSelector();
  const [Profile,setProfile]= useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  const getData=async(req,res)=>{
    const response=await Axios.get("http://localhost:1010/api/v1/get-user-information",{headers}); 
    setProfile(response.data);
    // console.log(Profile);
}
useEffect(()=>{
    getData();
},[])
  return (
    <div className=' bg-zinc-900  text-white h-screen px-2 py-8 md:px-12 flex flex-col md:flex:row gap-4 '>
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader/>
        </div> )}
      {Profile && (
        <div className='flex flex-col  md:flex-row lg:flex-row gap-4 '>
          <div className='md:w-1/6 '>
          <Sidebar data={Profile}/>
          <MobileNav/>
          </div>
          <div className='w-3/6 lg:w-5/6 md:w-5/6'>
          <Outlet/>
          </div> 
        </div>
      )}
         
        
    </div>
  )
}

export default Profile
