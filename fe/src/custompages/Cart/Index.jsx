"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCT_URL, UPLOADS_URL, VIEW_PRODUCT_URL } from '../../utils/constant';
import MungkinKamuSuka from '@/components/products/MungkinKamuSuka';


export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const cartKey = process.env.NEXT_PUBLIC_CART_KEY;
  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);
    setTotal(storedCart.reduce((sum, item) => sum + item.harga_produk * item.quantity, 0));
  }, []);

  const handleQuantityChange = (id_produk, amount) => {
    const updatedCart = cart.map(item => {
      if (item.id_produk === id_produk) {
        const newQty = Math.max(1, item.quantity + amount);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + item.harga_produk * item.quantity, 0));
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const handleRemove = (id_produk) => {
    const updatedCart = cart.filter(item => item.id_produk !== id_produk);
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + item.harga_produk * item.quantity, 0));
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Keranjang Kosong</h2>
        <Link href={PRODUCT_URL} className="text-blue-500 underline">Lihat Produk</Link>
      </div>
    );
  }
   
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-4 md:py-8 px-2 md:px-0">
      {/* Header - Hidden on mobile */}
      <div className="hidden md:flex w-full rounded-full bg-green-400 flex-row justify-between items-center px-10 py-3 mb-4">
        <span className="text-white text-lg font-semibold w-1/3 text-center">Produk</span>
        <span className="text-white text-lg font-semibold w-1/6 text-center">Kuantitas</span>
        <span className="text-white text-lg font-semibold w-1/6 text-center">Total</span>
        <span className="text-white text-lg font-semibold w-1/6 text-center">Pesan</span>
      </div>

      {/* Cart Items */}
      <div className="w-full bg-white rounded-2xl shadow-md px-3 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6">
        {cart.map(item => (
          <div key={item.id_produk} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-transparent rounded-2xl border-b border-gray-100 pb-4 md:pb-0 md:border-b-0">
            {/* Mobile Layout */}
            <div className="md:hidden w-full">
              {/* Product Info */}
              <div className="flex flex-row items-center gap-3 mb-4">
                <img
                  src={`${UPLOADS_URL}${item.gambar}`}
                  alt={item.nama_produk}
                  className="w-16 h-16 rounded-full object-cover bg-pink-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900 leading-tight">{item.nama_produk}</div>
                  <div className="text-xs text-gray-700 mt-1">Rp. {item.harga_produk.toLocaleString()}</div>
                </div>
                <button
                  onClick={() => handleRemove(item.id_produk)}
                  className="text-xs text-red-500 hover:underline p-1"
                >Hapus</button>
              </div>
              
              {/* Quantity and Total */}
              <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-row items-center">
                  <span className="text-sm font-medium text-gray-700 mr-3">Kuantitas:</span>
                  <button
                    onClick={() => handleQuantityChange(item.id_produk, -1)}
                    className="px-2 py-1 bg-gray-200 rounded-l-full text-sm font-bold hover:bg-gray-300"
                  >-</button>
                  <span className="px-3 py-1 text-sm font-semibold bg-white border border-gray-200">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id_produk, 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r-full text-sm font-bold hover:bg-gray-300"
                  >+</button>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  Total: Rp. {(item.harga_produk * item.quantity).toLocaleString()}
                </div>
              </div>
              
              {/* Order Buttons */}
              <div className="flex flex-row items-center gap-2">
                <span className="text-xs text-gray-600 mr-2">Pesan via:</span>
                <a href={item.link_produk} target="_blank" rel="noopener noreferrer">
                  <img src="/logo/sosmed/Shoope.png" alt="Shopee" className="w-6 h-6" />
                </a>
                <a href={item.link_produk} target="_blank" rel="noopener noreferrer">
                  <img src="/logo/sosmed/Tiktok.png" alt="TikTok" className="w-6 h-6" />
                </a>
                <a href={item.link_produk} target="_blank" rel="noopener noreferrer">
                  <img src="/logo/sosmed/Whatapp.png" alt="WhatsApp" className="w-6 h-6" />
                </a>
              </div>
              <hr className="my-4 w-full bg-amber-200" />
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:contents">
              {/* Product Info */}
              <div className="flex flex-row items-center w-1/3 gap-4">
                <img
                  src={`${UPLOADS_URL}${item.gambar}`}
                  alt={item.nama_produk}
                  className="w-24 h-24 rounded-full object-cover bg-pink-100"
                />
                <div className="flex flex-col justify-center">
                  <div className="font-semibold text-base md:text-lg text-gray-900 leading-tight">{item.nama_produk}</div>
                  <div className="text-sm text-gray-700 mt-1">Rp. {item.harga_produk.toLocaleString()}</div>
                </div>
              </div>
              {/* Quantity */}
              <div className="w-1/6 flex flex-row items-center justify-center">
                <button
                  onClick={() => handleQuantityChange(item.id_produk, -1)}
                  className="px-3 py-1 bg-gray-200 rounded-l-full text-lg font-bold hover:bg-gray-300"
                >-</button>
                <span className="px-5 py-1 text-lg font-semibold bg-white border border-gray-200">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id_produk, 1)}
                  className="px-3 py-1 bg-gray-200 rounded-r-full text-lg font-bold hover:bg-gray-300"
                >+</button>
              </div>
              {/* Total */}
              <div className="w-1/6 text-center text-lg font-semibold text-gray-900">
                Rp. {(item.harga_produk * item.quantity).toLocaleString()}
              </div>
              {/* Order Buttons */}
              <div className="w-1/6 flex flex-col items-center gap-2">
               
                <div className="flex flex-row gap-3 mb-1">
                  <a href= {`${item.link_produk}`}  target="_blank" rel="noopener noreferrer">
                    <img src="/logo/sosmed/Shoope.png" alt="Shopee" className="w-8 h-8" />
                  </a>
                  <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/logo/sosmed/Tiktok.png" alt="TikTok" className="w-8 h-8" />
                  </a>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    <img src="/logo/sosmed/Whatapp.png" alt="WhatsApp" className="w-8 h-8" />
                  </a>
                </div>
                <button
                  onClick={() => handleRemove(item.id_produk)}
                  className="text-xs text-red-500 hover:underline mt-1"
                >Hapus</button>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Total Row */}
      <div className="w-full max-w-5xl flex justify-center md:justify-end items-center mt-6 px-3 md:pr-8">
        <div className="bg-green-50 rounded-lg p-4 md:p-3 border border-green-200">
          <span className="text-base md:text-lg font-bold mr-4">Total:</span>
          <span className="text-xl md:text-2xl font-bold text-green-600">Rp. {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Mungkin Kamu Suka Section */}
      <MungkinKamuSuka />
    </div>
  );
}
