import Link from 'next/link';
import React from 'react'

export const Footer = () => {
  return (
    <footer className="w-full bg-[#FFF6F6]">
      {/* WhatsApp Section */}
      <div className="bg-[#E9FDF2] flex flex-col md:flex-row items-center justify-around px-6 py-8 rounded-t-lg">
        <p className="text-[1.5rem] md:text-3xl font-bold text-center mb-4 md:mb-0 w-full md:w-[50%]">
          Konsultasi dan Informasi<br />Produk Lebih Lanjut
        </p>
        <div className="flex items-center justify-center w-[50%]">
          <div className="bg-[#FFF6F6] rounded-full p-2 shadow-md">
            <img src="/logo/sosmed/Whatapp.png" alt="WhatsApp" className="h-14 w-18 object-contain" />
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-6 py-10 gap-8">
        {/* Social Media */}
        <div className="w-[50%] md:ml-[5%] flex flex-col items-center md:items-start">
          <div className="mb-3 font-medium text-center md:text-left">Sosial Media Kami</div>
          <div className="flex gap-4">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="/logo/sosmed/Instagram.png" alt="Instagram" className="h-10 w-10 object-contain" />
            </a>
            <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer">
              <img src="/logo/sosmed/Tiktok.png" alt="TikTok" className="h-10 w-10 object-contain" />
            </a>
          </div>
        </div>

        {/* Info and Help */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-10 w-full md:mr-[5%] md:w-auto justify-center items-center md:items-start">
          <div>
            <div className="mb-3 font-medium text-center md:text-left">Info dan Bantuan</div>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li><a href="#" className="hover:underline" style={{color: "#000"}}>Tentang Kami</a></li>
              <li><a href="#" className="hover:underline" style={{color: "#000"}}>Hubungi Kami</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 font-medium text-center md:text-left">Bantuan</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link aria-label='Keranjang Belanja' href={"/cart"} className="block">Keranjang Belanja</Link>
              </li>
              <li>
                <a href="#" className="hover:underline block" style={{color: "#000"}}>Testimoni Pelanggan</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-black text-sm pb-4">
        © Copyright Globumil All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer;