import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BlurText from '../../components/animations/BlurText';
import Link from 'next/link';

export const ManfaatSection = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed');
  };

  return (
    <div className="w-full h-auto md:h-[582px] flex-wrap md:flex-nowrap flex flex-row items-start md:items-start justify-between md:gap-5 md:mt-8 md:px-0 pb-[30px] md:pb-[84px]">
        {/* Title Section */}
     
        <div className="flex h-full w-full md:w-1/3 flex-col justify-center items-center rounded-xl p-2 md:p-5 text-center order-1 md:order-1">
       
            <p className='w-full text-center text-[1.5rem] md:text-[3rem] font-bold'>
             
              <span className="md:hidden">Pregnancy Supplement</span>
  
            </p>
            <p className='w-full hidden md:block text-center md:text-center text-[2.5rem] font-bold'>Pregnancy </p>
            <p className='w-full hidden md:block text-center md:text-center text-[2.5rem] font-bold pb-2'>Suplement </p>
            <p className='w-full text-center md:text-center text-[0.8rem] md:text-2xl font-medium'>Multivitamin Untuk Ibu Hamil</p> 
        </div>

        {/* Product Image Section */}
        <div className="shadow-xl md:shadow-none pb-auto ml-2 md:ml-0 relative w-[45%] md:w-1/3 aspect-square flex justify-start md:justify-center items-end bg-gradient-to-b from-[#FFCCE1] via-[#FFCCE1] to-[#f9e8ef] rounded-tr-[1rem] md:rounded-tr-[rem] rounded-br-[4rem] md:rounded-br-[10rem] rounded-tl-[4rem] md:rounded-tl-[10rem] order-2 md:order-2 ">
            
            <div className='absolute bottom-[-1rem] w-full h-[95%] flex justify-center items-end z-10'>
                <LazyLoadImage 
                    src='/images/Home/Manfaat/GlobumilProduct.png' 
                    className='w-full h-full object-contain' 
                    alt='Globumil Product'
                />
            </div>
            <div className='z-10 font-bold absolute left-1/2 -translate-x-1/2 bottom-[-10%] md:bottom-[-7%] flex items-center justify-center w-[70%] md:w-[60%] h-[30px] md:h-[50px] bg-[#D8459B] rounded-full'>
              <Link href='/tentang_kami'>
               <p className='text-[0.5rem] md:text-[1.3rem] p-4 text-center text-white text-bold'>Baca Selengkapnya</p>
              </Link>
              
            </div>
        </div>

        {/* Benefits Section */}
        <div className="flex h-full w-[50%] md:w-1/3 flex-col gap-4 md:gap-5 justify-start md:justify-center items-end rounded-xl py-0 md:py-0 order-3 md:order-3">
            <div className='relative flex flex-row items-center justify-around bg-[#FFD1DA] w-[95%] h-[50px] md:h-[30%] rounded-l-full'>
                <div className='absolute left-[10%] md:left-[8%] aspect-square w-[15%] h-auto flex items-center justify-center'>
                    <img src='/images/Home/Manfaat/icons/Janin.png' alt='Manfaat' className='object-cover w-full h-full' />
                </div>
                <p className='text-[0.6rem] md:text-2xl text-left font-medium w-[70%] ml-15 md:ml-35'>Mencegah Cacat Pada Janin</p>
            </div>

            <div className='relative flex flex-row items-center justify-around bg-white w-[86%] h-[50px] md:h-[30%] rounded-l-full'>
                <div className='absolute left-[10%] aspect-square w-[15%] h-auto flex items-center justify-center'>
                    <img src='/images/Home/Manfaat/icons/Darah.png' alt='Manfaat' className='object-cover w-full h-full' />
                </div>
                <p className='text-[0.6rem] md:text-2xl text-left font-medium w-[60%] ml-15 md:ml-30'>Mencegah Pendarahan Saat Persalinan</p>
            </div>

            <div className='relative flex flex-row items-center justify-around bg-white w-[85%] h-[50px] md:h-[30%] rounded-l-full'>
                <div className='absolute left-[10%] aspect-square w-[15%] h-auto flex items-center justify-center'>
                    <img src='/images/Home/Manfaat/icons/Anak.png' alt='Manfaat' className='object-cover w-full h-full' />
                </div>
                <p className='text-[0.6rem] md:text-2xl text-left font-medium w-[60%] ml-15 md:ml-30'>Menjaga Imunitas Tubuh Bunda Dan Bayi</p>
            </div>
        </div>
    </div>
  );
}
  