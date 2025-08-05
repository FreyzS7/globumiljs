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
        className={`grid ${gridColumns} grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center w-full`}
      >
        {products?.map((product, index) => (
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
                {/* <span className="font-semibold text-xs md:text-sm text-center line-clamp-2 group-hover:black transition-colors">
                  {product.nama_produk}
                </span> */}
                {/* <span className="text-xs md:text-sm text-green-600 font-medium mt-1">
                  Rp. {parseInt(product.harga_produk).toLocaleString()}
                </span> */}
              </Link>
        
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
