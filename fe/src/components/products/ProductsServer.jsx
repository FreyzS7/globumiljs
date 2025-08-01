import Link from 'next/link';
import { UPLOADS_URL, VIEW_PRODUCT_URL } from '../../utils/constant';
import formatUrlTitle from '../../utils/String';
import ProductsPagination from './ProductsPagination';

export default function ProductsServer({ products, total, currentPage, showPagination = true }) {
  // Dynamically set grid columns based on product count
  const gridColumns = products.length <= 3 ? `lg:grid-cols-${products.length}` : 'lg:grid-cols-4';

  return (
    <div className="flex flex-col justify-center items-center space-y-8 py-8 px-4 w-[90%] mx-auto">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl text-center font-bold text-gray-900">Produk Globumil</h1>
      </div>

      <div
        className={`grid ${gridColumns} sm:grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center w-full`}
      >
        {products?.map((product, index) => (
          
          <article
            key={product.id_produk}
            className="card transform transition duration-300 hover:scale-105 shadow-lg rounded-lg overflow-hidden animate-fadeInAndScale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={`${UPLOADS_URL}${product.gambar}`}
              alt={`Image of ${product.nama_produk}`}
              className="w-full h-48 object-scale-down"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-grow text-center">
                {product.nama_produk}
              </h3>
              {/* Uncomment if product prices are to be shown */}
              {/* <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary-600">
                  Rp {parseInt(product.harga_produk).toLocaleString()}
                </span>
              </div> */}
              <div className="flex gap-4 mt-auto">
                <Link
                  style={{ color: 'white' }}
                  href={`/${VIEW_PRODUCT_URL}${product.id_produk}/${formatUrlTitle(product.nama_produk)}`}
                  className="btn btn-primary flex-1 text-center py-2 bg-[#f692a6] hover:bg-[#c77283] text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}

      {/* Pagination - only show if showPagination is true */}
      {showPagination && <ProductsPagination total={total} currentPage={currentPage} />}
    </div>
  );
}
