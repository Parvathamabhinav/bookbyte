import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import BookCard from '../BookCard/BookCard';
const Favourites = () => {
  const [FavouriteBooks,setFavouriteBooks]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  const getData=async(req,res)=>{
    const response=await Axios.get("http://localhost:1010/api/v1/get-favourite-books",
    {headers}
  );
   setFavouriteBooks(response.data.data);
  }
  useEffect(()=>{
    getData();
  },[FavouriteBooks])
  return (
    <>
    {FavouriteBooks && FavouriteBooks.length===0 && (
    <div className='text-5xl h-[100%] font-semibold text-zinc-500 flex  flex-col items-center justify-center  w-full gap-8 '>
      <h1>No favourites</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/892/892337.png" alt="Picture" className='h-[40vh] ' />
      </div>
    )}
    <div className='grid grid-cols-4 gap-4'>{/*grid cols-4 made favourite book as grid */}
    {FavouriteBooks &&
    FavouriteBooks.map((items,i)=>(
      <div key={i}>
        <BookCard data={items} favourite={true}/>
      </div>
    ))}
    </div>
    </>
  )
}

export default Favourites
