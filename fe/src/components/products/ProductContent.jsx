// Server component for displaying product content
import Image from 'next/image';
import { UPLOADS_URL } from '../../utils/constant';
import ProductActions from './ProductActions';

export default function ProductContent({ product }) {
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h1>
        <p className="text-gray-600">Maaf, produk yang Anda cari tidak dapat ditemukan.</p>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col items-center p-5 lg:p-10">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={`${UPLOADS_URL}${product.gambar}`}
              alt={product.nama_produk}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.nama_produk}
              </h1>
              <p className="text-3xl font-semibold text-primary-600">
                Rp {parseInt(product.harga_produk).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Product Description */}
            <div>
              <h2 className="text-[1rem] md:text-xl font-medium mb-3"> {product.deskripsi}</h2>
            {/* <div 
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: product.deskripsi ? product.deskripsi : 'Tidak ada deskripsi tersedia.' 
              }}
            />
            </div> */}
            </div>
            {/* Product Actions - Client Component */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>

      <div className='w-full h-auto  flex-col gap-5 flex justify-start items-start pt-15'>
        <div className='relative w-full md:max-w-[70%] h-[40vh] md:h-[400px] md:rounded-[4rem] rounded-[2rem] mx-auto py-8 px-4 bg-[#FFD1DA] md:ml-[10%]'>
          <img src='/images/Products/Artboard1.png' className="hidden md:block absolute bottom-0 right-[-25%] w-auto h-[100%] aspect-square object-contain" />
          <div className='flex flex-col  w-full md:w-[80%] md:ml-15 h-full'>
            <h2 className='text-[3.5vw] md:text-3xl font-bold text-center md:pb-4'>Manfaat Globumil</h2>
            
            <ul className='list-disc ml-6 flex flex-col gap-2 justify-start items-start  text-[3vw] sm:text-[2vw] md:text-lg w-full md:w-[60%]'>
              <li className='font-medium'>Mencegah Terjadinya Kecacatan Pada Janin</li>
              <li className='font-medium'>Dapat Mengoptimalkan Perkembangan Otak Janin</li>
             <li className='font-medium'>Mencegah Pendarahan Saat Masa Persalinan</li>
             <li className='font-medium'>Menjaga Daya Tahan Folic Acid : 1000 mg</li>
             
            </ul>
          </div>
        </div>

    
        <div className='relative flex flex-col justify-center items-center w-full md:max-w-[70%] h-[400px] md:rounded-[4rem] rounded-[2rem] mx-auto py-8 px-4 bg-[#FFD1DA] md:mr-[10%]'>
          <img src='/images/Products/Artboard2.png' className="hidden md:block absolute bottom-0 left-[-30%] w-auto h-[100%] aspect-square object-contain" />
          <div className='flex flex-col justify-center items-center w-[80%] h-full'>
            <h2 className='text-[3.5vw] md:text-3xl font-bold text-center pb-2 md:pb-4'>Komposisi Globumil</h2>
            <div className='flex flex-col md:flex-row justify-start md:justify-center items-center md:items-start md:w-[80%] w-full h-full gap-2 md:gap-6'>
               <div className='flex flex-col justify-center md:justify-start md:items-start items-center gap-4 w-full md:w-[40%]' >
                 <ul className='list-disc ml-1 flex flex-col gap-1 md:justify-start justify-center md:items-start items-center  text-[0.7rem] md:text-[1.2rem]  w-full]'>
                  <li className='font-medium'>Folic Acid : 1000 mg</li>
                  <li className='font-medium'>Calcium : 31,25 mg</li>
                  <li className='font-medium'>Iron /Fe : 7,5 mg</li>
                 
                  <li className='font-medium'>Vitamin B1 : 0.35 mg</li>
                  <li className='font-medium'>Vitamin B12 1 mcg</li>
                  </ul>
               </div>

                 <div className='flex flex-col justify-center md:justify-start md:items-start items-center gap-4 w-full md:w-[40%]' >
                <ul className='list-disc ml-1 flex flex-col gap-1 md:justify-start justify-center md:items-start items-center  text-[0.7rem] md:text-[1.2rem] w-full]'>
                    <li className='font-medium'>Vitamin B6 : 1.25 mg</li>
                  <li className='font-medium'>Vitamin C : 22,5 mg</li>
                  <li className='font-medium'>Vitamin D3 100 IU : 2.5 mcg</li>
                 
                  <li className='font-medium'>Biotin : 8 mcg</li>
                  <li className='font-medium'>DHA : 100 mg</li>
                    
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}