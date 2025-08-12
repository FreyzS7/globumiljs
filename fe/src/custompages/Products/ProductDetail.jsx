import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { productService } from '../../services/api';
import { UPLOADS_URL } from '../../utils/constant';
import { Comment } from '../../components/Comment';

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading } = useFetch(() => productService.getById(id));

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (product?.data) {
      setTotalPrice(parseInt(product.data.harga_produk) * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = () => {
    if (!product?.data) return;

    const cartItem = {
      id_produk: product.data.id_produk,
      nama_produk: product.data.nama_produk,
      harga_produk: parseInt(product.data.harga_produk),
      gambar: product.data.gambar,
      quantity: quantity,
    };
 const cartKey = process.env.NEXT_PUBLIC_CART_KEY;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id_produk === cartItem.id_produk);

    if (existingItemIndex > -1) {
      // Item already in cart, update quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Item not in cart, add new item
      existingCart.push(cartItem);
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    alert(`${quantity} x ${product.data.nama_produk} added to cart!`); // Simple confirmation
    setQuantity(1); // Reset quantity after adding to cart
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const { nama_produk, gambar, deskripsi, harga_produk, link_produk } = product.data;

  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto gap-10 py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6">
        {/* Left Column: Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-sm md:max-w-md rounded-lg overflow-hidden bg-pink-100/50">
             {/* Placeholder for the top curved banner effect */}
            
            <img
              src={`${UPLOADS_URL}${gambar}`}
              alt={nama_produk}
              className="w-full h-auto object-contain p-4"
            />
             {/* Placeholder for bottom overlay or details if needed */}
             <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-pink-200 to-transparent"></div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-normal text-gray-900">{nama_produk}</h1>
          {/* Assuming there's a category or subtitle field, add it here if available */}
          {/* <p className="text-gray-600">[Product Category/Subtitle]</p> */}
          
          <div className="text-2xl font-medium text-black">
            Rp {totalPrice.toLocaleString()}
          </div>

          {/* Simple Description Display */}
           {/* <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: deskripsi }}></div> */}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => handleQuantityChange(-1)} 
                className="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-100 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-1 text-gray-800">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)} 
                className="px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-100 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-4">
            <button
              onClick={handleAddToCart}
              className="w-[70%] bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-200"
            >
              Masukkan Keranjang
            </button>
          </div>

           {/* You might want to add product specifications or other details here */}
        </div>
      </div>
      <div className='w-full h-auto bg-white flex-col gap-5   flex justify-start items-start'>
        <div className='relative w-full md:max-w-[70%] h-[30vh] md:h-[400px] rounded-[4rem] mx-auto py-8 px-4 bg-[#FFD1DA] md:ml-[10%]'>
          <img src='/images/Products/Artboard1.png' className="hidden md:block absolute bottom-0 right-[-25%] w-auto h-[100%] aspect-square object-contain" />
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <h2 className='text-[6.5vw] xm:text-4xl sm:text-[3vw] md:text-3xl font-bold text-center pb-4'>Manfaat Globumil</h2> 
            <ul className='list-disc ml-6  text-[3vw] sm:text-[2vw] md:text-lg w-[80%] md:w-[60%]'>
              <li className='font-medium'>Mencegah Terjadinya Kecacatan Pada Janin</li>
              <li className='font-medium'>Dapat Mengoptimalkan Perkembangan Otak Janin</li>
              <li className='font-medium'>Mencegah Pendarahan Saat Masa Persalinan</li>
              <li className='font-medium'>Menjaga Daya Tahan Tubuh Selama Kehamilan</li>
            </ul>
          </div>
        </div>
        <div className='relative flex flex-col justify-center items-center w-full md:max-w-[70%] h-[400px] rounded-[4rem] mx-auto py-8 px-4 bg-[#FFD1DA] md:mr-[10%]'>
          <img src='/images/Products/Artboard2.png' className="hidden md:block absolute bottom-0 left-[-30%] w-auto h-[100%] aspect-square object-contain" />
          <div className='flex flex-col justify-center items-center w-[80%] h-full'>
            <h2 className='text-[6.5vw] mobile:text-[2vw] sm:text-[3vw] md:text-3xl font-bold text-center pb-4'>Komposisi Globumil</h2>
            <div className='flex flex-row justify-center items-center gap-4'>
            <ul className='list-disc text-[3vw]  sm:text-[2.5vw] md:text-sm ml-6 w-[45%] h-full'>
              <li className='font-medium'>Mencegah Terjadinya Kecacatan Pada Janin</li>
              <li className='font-medium'>Dapat Mengoptimalkan Perkembangan Otak Janin</li>
              <li className='font-medium'>Mencegah Pendarahan Saat Masa Persalinan</li>
              <li className='font-medium'>Menjaga Daya Tahan Tubuh Selama Kehamilan</li>
            </ul>
            <ul className='list-disc text-[3vw] sm:text-[2.5vw] md:text-sm ml-6 w-[50%] h-full'>
              <li className='font-medium'>Mencegah Terjadinya Kecacatan Pada Janin</li>
              <li className='font-medium'>Dapat Mengoptimalkan Perkembangan Otak Janin</li>
              <li className='font-medium'>Mencegah Pendarahan Saat Masa Persalinan</li>
              <li className='font-medium'>Menjaga Daya Tahan Tubuh Selama Kehamilan</li>
            </ul>
            </div> 
          
          </div>
        </div>
      </div>
      <Comment Id={id} type="product" />
    </div>
  );
} 