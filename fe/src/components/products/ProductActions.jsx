'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductActions({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setTotalPrice(parseInt(product.harga_produk) * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = () => {
    if (!product || isAdding) return;

    setIsAdding(true);
    const cartItem = {
      id_produk: product.id_produk,
      nama_produk: product.nama_produk,
      link_produk: product.link_produk,
      harga_produk: parseInt(product.harga_produk),
      gambar: product.gambar,
      quantity: quantity,
    };
      const cartKey = process.env.NEXT_PUBLIC_CART_KEY;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id_produk === cartItem.id_produk);

    if (existingItemIndex > -1) {
      // Item already in cart, update quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsAdding(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };
  
  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div>
        {/* <label className="text-sm font-medium text-gray-700 block mb-2">
          Jumlah
        </label> */}
        <div className="flex items-center gap-4 bg-white rounded-2xl p-1 flex-row justify-center w-[50%] md:w-[32%]">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            -
          </button>
          <span className="text-lg font-medium w-12 text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
           
          <span className="md:text-2xl text-md font-bold text-primary-600">
            Rp {totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`flex-1 py-3 w-[80%] md:px-6 rounded-lg font-semibold transition ${
            isAdding
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#6DD870] text-white hover:bg-[#7fde81e3]'
          }`}
        >
          {showSuccess ? '✓ Ditambahkan' : 'Tambah Ke Keranjang'}
        </button>
        {/* <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Beli Sekarang
        </button> */}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Produk berhasil ditambahkan ke keranjang!
        </div>
      )}
    </div>
  );
}