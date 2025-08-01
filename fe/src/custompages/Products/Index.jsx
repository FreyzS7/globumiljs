"use client";
import Link from 'next/link';
import { useFetch } from '../../hooks/useFetch';
import { productService } from '../../services/api';
import { BASE_URL, UPLOADS_URL  , VIEW_PRODUCT_URL} from '../../utils/constant';


export default function Products() {
  const { data: products, loading } = useFetch(productService.getAll);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-8 py-8 px-4 w-[90%] mx-auto">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl text-center font-bold text-gray-900">Produk Globumil</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products?.data?.map((product) => (
          <article 
            key={product.id_produk} 
            className="card transform transition duration-300 hover:scale-105 shadow-lg rounded-lg overflow-hidden animate-fadeInAndScale"
            style={{ animationDelay: `${product.id_produk * 0.1}s`}} // Add a slight delay based on index
          >
            <img
              src={`${UPLOADS_URL}${product.gambar}`}
              alt={product.nama_produk}
              className="w-full h-48 object-scale-down"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-grow">
                {product.nama_produk}
              </h3>
              {/* <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary-600">
                  Rp {parseInt(product.harga_produk).toLocaleString()}
                </span>
              </div> */}
              <div className="flex gap-4 mt-auto">
                <Link style={{color: 'white'}}
                  href={`/${VIEW_PRODUCT_URL}${product.id_produk}`}
                  className="btn btn-primary flex-1 text-center py-2 bg-[#f379d6] text-white"
                >
                  View Details
                </Link>
                 
              </div>
            </div>
          </article>
        ))}
      </div>

      {products?.data?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
} 