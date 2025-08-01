import React from 'react'
import Image from 'next/image'

export const HeroSection = () => {
  return (
      
        <div className='w-full h-auto flex items-start justify-center pb-[30px] md:pb-[84px]'>
          <div className='w-full flex items-center justify-center'>
            <Image
              className='object-cover'
              src='/images/Hero1.webp'
              alt='Hero'
              width={1920}
              height={1080}
              priority
            />
          </div>
        </div>
     
   
  )
}
