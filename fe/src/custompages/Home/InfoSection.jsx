import React from 'react'

export const InfoSection = () => {
  return (
    <section className='w-full flex flex-col items-center justify-center'>
      <div className='w-full h-full grid grid-cols-2 items-stretch justify-center bg-[#FBF8EF] rounded-3xl shadow-lg'>
        {/* Left Side - Content */}
        <div className='w-full flex flex-col items-center justify-center bg-white p-8 md:p-16 text-center md:text-left'>
          <h1 className='text-xl md:text-5xl font-bold mb-2'>Globumil</h1>
          <h2 className='text-[1rem] md:text-2xl mb-4'>Pengering Luka Operasi</h2>
          <p className='text-[0.6rem] md:text-xl font-semibold mb-8 md:text-center'>7x Mempercepat Proses Penyembuhan Luka</p>
          <button className=' bg-[#E8D62B] hover:bg-[#f3e12f] text-black font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300'>
            Beli Sekarang
          </button>
        </div>

        {/* Right Side - Image */}
        <div className='w-full relative'>
          <img 
            src="/images/Home/Natalie Channamix 2.jpg" 
            alt="Nathalie Holscher" 
            className='w-full h-full object-cover'
          />
          {/* Name Tag */}
          <button className='absolute w-[80%] md:w-[50%] bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D62B]  py-2 rounded-full'>
            <span className='text-[0.8rem] md:text-[1.2rem] text-black font-semibold text-center'>Nathalie Holscher</span>
          </button>
        </div>
      </div>
    </section>
  )
}
