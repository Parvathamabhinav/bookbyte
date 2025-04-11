import React from 'react'

const Hero = () => {
  return (
    <div className=" h-screen flex flex-col md:flex-row items-center justify-center">
      <div className=' px-5 w-full lg:w-3/6 flex flex-col lg:items-start justify-center'>
        <h1 className="mt-8  text-4xl lg:text-6xl font-semibold text-yellow-100 lg:text-left">Discover Your Next Great Read</h1>
        <p className="mt-4 text-xl text-zinc-300 lg">Uncover captivating stories,enriching knowledge,and endless inspiration in our collection of books</p>
        <div className='mt-4'>
        <button className="mb-3 text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full">Discover Books</button>      
        </div>
      </div>
      <div className="px-10 lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center mt-5">
        <img src="./bookstore.png" alt="bookstore" />
      </div>
    </div>
  )
}

export default Hero
