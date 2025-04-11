import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios"
const SignUp = () => {
  const [Values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:"",
  })
  const navigate=useNavigate()
  //change function
  const change =(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value});
  };

  //submit
  const submit=async()=>{
    // console.log(Values); //Debug to check the payload
    try{
      if(Values.username===""|| Values.email==""||Values.password===""||Values.address===""){
        alert("All fields are required")
      }else{
        // console.log("i");
        const response=await Axios.post("http://localhost:1010/api/v1/sign-up",Values);
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch(error){
      alert(error.response.data.message)
    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
      <p className="text-zinc-200 text-xl">
        SignUp</p>
        {/*Username */}
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="username"
            name="username"
            value={Values.username}
            onChange={change}
            required
             />
          </div>
        </div>
        {/*Email */}
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input 
            type="email"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="email"
            name="email"
            value={Values.email}
            onChange={change}
            required
             />
          </div>
        </div>
        {/*Password */}
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input 
            type="password"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="password"
            name="password"
            value={Values.password}
            onChange={change}
            required
             />
          </div>
        </div>
        {/*Adress */}
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>
            <textarea 
            className='w-full p-2 pb-12 mt-2 bg-zinc-900 text-zinc-100 outline-none'
            rows="5"
            placeholder="Address"
            name="address"
            value={Values.address}
            onChange={change}
            required
            //  style={{verticalAlign:"top"}}
             />
          </div>
        </div>
        {/*Signup  */}
        <div className="mt-4">
          <button className="w-full bg-blue-900 text-white font-semibold py-2 rounded hover:bg-zinc-600 " onClick={submit}>
            SignUp
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/login" className='hover:text-blue-500'>
          <u>LogIn</u>
          </Link>
        </p>

  
      </div>
      
    </div>
  )
}

export default SignUp
