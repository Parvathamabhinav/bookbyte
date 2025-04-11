import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {FaGripLines} from "react-icons/fa";
import {useSelector} from "react-redux";
const Navbar = () => {
  const links=[
    {
      title:"Home",
      path:"/",
    },
    {
      title:"All Books",
      path:"/all-books",
    },
    {
      title:"Cart",
      path:"/kart",
    },
    {
      title:"Profile",
      path:"/profile",
    },
    {
      title:"AdminProfile",
      path:"/profile",
    }
  ];
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  const role=useSelector((state)=>state.auth.role);

  if(isLoggedIn==false){
    links.splice(2,3); 
    {/*Splice-1st parameter is from which link and 2nd parameter is how many.
      Basically this thing is not showing us cart and profile when user is not logged in */}
  } 
  if(isLoggedIn===true && role==="admin"){
    links.splice(3,1);
  }
  if(isLoggedIn===true && role==="user"){
    links.splice(4,1);
  }

  const [mobileNav,setmobileNav]=useState("hidden")
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
      <div className='flex items-center'>
       <img 
       className='h-10 me-10' 
       src="data:image/jpeg;base64,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"
        alt="logo" />
        <Link to="/" className='text-2xl font-semibold'>BookHeaven</Link>
      </div>
      <div>
        <div className="nav-links-bookheaven block flex items-center gap-4"> 
         {/*Below div is for links*/ }
         <div className=' hidden md:flex gap-4'>
         {
            links.map((items,i)=>(
            <div className='flex items-center' key={i}>
              {items.title==="Profile"|| items.title==="AdminProfile" ?(
                <Link 
                to={items.path}
                className=" px-4 py-2 border border-blue-500 rounded  hover:bg-white hover:text-zinc-800" 
                  >
                {items.title}{" "}
                </Link>
              ):
              (
                <Link 
                to={items.path}
                className=" hover:text-blue-500 transition-all duration-300" 
                key={i}  >
                {items.title}{" "}
                </Link>
              )}
            </div>
            ))
          }
         </div>
         {isLoggedIn==false&&(
          <div className=' hidden md:flex gap-4'>{/* hidden and md -> only for medium devices(md) links will appear */}
          <Link to="/LogIn" className='px-4 py-2 border border-blue-500 rounded  hover:bg-white hover:text-zinc-800'>LogIn</Link>
          <Link to="/SignUp" className='px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
         </div>
         )}
         <button className=' block md:hidden text-white text-2xl hover:text-zinc-400 ' 
         onClick={
          ()=>mobileNav==="hidden"?
          setmobileNav("block"):
          setmobileNav("hidden")
          }>
          <FaGripLines/>
         </button>
        </div>
      </div>
      </nav>
          {/*mobileNav is usestate .when we click home the homw will be displayed  */}
          {/*we can place usestate like this in divs */}
      <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-between items-center justify-center`}>
         {
          links.map((items,i)=>(
            <Link 
              to={items.path}
              className={`${mobileNav} m-6 text-4xl text-white font-semibold hover:text-blue-500 transition-all duration-300`} 
               key={i}  
               onClick={
                ()=>mobileNav==="hidden"?
                setmobileNav("block"):
                setmobileNav("hidden")
                }>
              {items.title}{" "}
              </Link>
            ))
          }
          {isLoggedIn===false&&(
            <>
            <Link to="/LogIn" className={`${mobileNav} text-4xl font-semibold mb-8 px-8 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800  transition-all duration-300`} 
          onClick={
            ()=>mobileNav==="hidden"?
            setmobileNav("block"):
            setmobileNav("hidden")
            }
            >LogIn</Link>
          <Link to="/SignUp" className={`${mobileNav} text-4xl font-semibold mb-8 px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
         /*Onclick-when we press on signup it will redirect to signup page in responsive nature */
         onClick={
            ()=>mobileNav==="hidden"?
            setmobileNav("block"):
            setmobileNav("hidden")
            }
            >SignUp</Link>
            </>
          )}
          </div>
    </>
  )
}

export default Navbar
