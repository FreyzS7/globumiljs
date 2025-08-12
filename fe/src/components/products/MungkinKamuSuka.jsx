
'use client';
import { UPLOADS_URL, VIEW_PRODUCT_URL, PRODUCT_URL } from '@/utils/constant'
import formatUrlTitle from '@/utils/String'
import { productService } from '@/services/api'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function MungkinKamuSuka() {
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoadingRecommendations(true);
        const response = await productService.getAll();
        const products = response.data?.data.data || [];
        console.log('Fetched products for recommendations:', products);
        console.log('Fetched products for recommendations:', products.length);
        const lenght = products.length;
        // Get random products for recommendations
        if (lenght > 0) {
          if (lenght <= 4) {
            // If 4 or fewer products, use all of them
            setRecommendations(products);
          } else {
            // If more than 4 products, get 4 random ones
            const shuffled = products.sort(() => 0.5 - Math.random());
            setRecommendations(shuffled.slice(0, 4));
          }
        } else {
          setRecommendations([]);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      } finally {
        setLoadingRecommendations(false);
      }
    };
    
    fetchRecommendations();
  }, []);
    const gridColumns = recommendations.lenght == 3 ? `lg:grid-cols-${recommendations.lenght}` : 'lg:grid-cols-4';

  return (
   <div className="w-full max-w-5xl mt-6 md:mt-10 bg-pink-50 rounded-2xl p-4 md:p-6 flex flex-col items-center">
     
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Mungkin Kamu Suka</h2>
        {loadingRecommendations ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-gray-500">Memuat produk...</div>
          </div>
        ) : (
          <div className={`grid grid-cols-2 ${recommendations.length == "3" ? `lg:grid-cols-${recommendations.length}` : 'lg:grid-cols-4'} gap-3 md:gap-6 w-full`}>
            {recommendations.map((product) => (
              <Link
                key={product.id_produk}
                href={`/${VIEW_PRODUCT_URL}${product.id_produk}/${formatUrlTitle(product.nama_produk)}`}
                className="flex flex-col items-center group hover:bg-white rounded-lg p-2 md:p-3 transition-all duration-200 hover:shadow-md"
              >
                <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={`${UPLOADS_URL}${product.gambar}`}
                    alt={product.nama_produk}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <span className="font-semibold text-xs md:text-sm text-center line-clamp-2 group-hover:black transition-colors">
                  {product.nama_produk}
                </span>
                {/* <span className="text-xs md:text-sm text-green-600 font-medium mt-1">
                  Rp. {parseInt(product.harga_produk).toLocaleString()}
                </span> */}
              </Link>
            ))}
          </div>
        )}
        
        {!loadingRecommendations && recommendations.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>Tidak ada produk rekomendasi tersedia</p>
            <Link href={PRODUCT_URL} className="text-blue-500 hover:underline mt-2 inline-block">
              Lihat semua produk
            </Link>
          </div>
        )}
      </div>
  )
}
