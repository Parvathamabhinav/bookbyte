import {React,useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios"
import { authActions } from '../store/auth'
import {useDispatch} from "react-redux"
const LogIn = () => {
  const [Values,setValues]=useState({
    username:"",
    password:"",
  })
  const navigate=useNavigate()
  const dispatch=useDispatch();
  //change function
  const change =(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value});
  };

  //submit
  const submit=async(req,res)=>{
    // console.log(Values); //Debug to check the payload
    try{
      if(Values.username===""||Values.password===""){
        alert("All fields are required")
      }else{
        // console.log("i");
        const response=await Axios.post("http://localhost:1010/api/v1/sign-in",Values);
        console.log(response.data);
        
        dispatch(authActions.login());
        dispatch(authActions.changedRole(response.data.role))
        
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        
         console.log(response.data);
         navigate("/profile");
      }
    } catch(error){
      console.log(error)
    }
  }
  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
    <div className="bg-zinc-800 rounded-lg  px-8 py-5 w-full md:w-3/6 lg:w-2/6">
    <p className="text-zinc-200 text-xl">
      Login</p>
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
      {/* <div className="mt-4">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Email
          </label>
          <input 
          type="email"
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder="email"
          name="email"
          required
           />
        </div>
      </div> */}
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
      {/* <div className="mt-4">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Address
          </label>
          <textarea 
          className='w-full p-2 pb-12 mt-2 bg-zinc-900 text-zinc-100 outline-none'
          rows="5"
          placeholder="Adress"
          name=""
          required
          //  style={{verticalAlign:"top"}}
           />
        </div>
      </div> */}
      {/*Login  */}
      <div className="mt-4">
        <button className="w-full bg-blue-900 text-white font-semibold py-2 rounded hover:bg-zinc-600 " onClick={submit}>
          Login
        </button>
      </div>
      <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
        Or
      </p>
      <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
        Don't  have an account? &nbsp;
        <Link to="/signup" className='hover:text-blue-500'>
        <u>Sign Up</u>
        </Link>
      </p>


    </div>
    
  </div>
  )
}

export default LogIn
