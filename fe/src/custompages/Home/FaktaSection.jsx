import React from 'react'

export const FaktaSection = () => {
  return (
    <section className="w-full bg-[#FBF8EF] py-8">
      
      {/* Top horizontal line */}
      <div className='flex justify-center mb-8'>
        <div className="w-[90%] h-1 bg-[#E3F9D3] rounded-full"></div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center gap-6 px-4">
        
        {/* WHO Facts Section */}
        <div className="bg-[#FFF5CC] w-full border-4 border-[#E3F9D3] rounded-3xl flex flex-col items-center justify-center py-8 px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black">Fakta Dari WHO</h2>
          <img src="/images/Home/isto.png" alt="WHO" className="w-16 h-10 mx-auto mb-1" />
          <p className="text-[0.6rem] md:text-lg text-black leading-relaxed">
            11% Pasien Mengalami Infeksi Setelah Operasi<br/>
            20% Wanita Mengalami Infeksi Setelah Operasi Caesar,<br/>
            Sehingga Kesulitan Dalam Merawat Bayi Mereka Setelah Operasi!
          </p>
        </div>
        
        {/* Globumil Ingredients Section */}
        <div className="bg-[#FBF8EF] w-full border-4 border-[#E3F9D3] rounded-3xl flex flex-col items-center justify-center pt-8 pb-4 px-6">
          <h2 className="text-2xl md:text-3xl font-bold  text-black text-center">Globumil Mengandung</h2>
          <div className="flex flex-row gap-8 w-full items-start justify-center">
            
            {/* Ekstrak Ikan Gabus */}
            <div className="flex flex-col justify-start items-center w-1/2">
              <div className="w-10 h-10 bg-[#4A5568] rounded-full flex items-center justify-center mb-4">
                <img src="/images/Home/gabus.png" alt="Ekstrak Ikan Gabus" className="w-10 h-10" />
              </div>
              <span className="font-bold text-[1rem] text-black mb-2 text-center">Ekstrak Ikan Gabus</span>
              <span className="text-[0.6rem] md:text-lg text-black text-center leading-relaxed">
                Menggantikan Sel Tubuh Yang<br/>
                Rusak Dan Menangkal Infeksi<br/>
                Di Luka
              </span>
            </div>
            
            {/* Royal Jelly */}
            <div className="flex flex-col justify-start items-center w-1/2">
              <div className="w-10 h-10 bg-[#F6AD55] rounded-full flex items-center justify-center mb-4">
                <img src="/images/Home/Madu.png" alt="Royal Jelly" className="w-10 h-10" />
              </div>
              <span className="font-bold text-[1rem] text-black mb-2 text-center">Royal Jelly</span>
              <span className="text-[0.6rem] md:text-lg text-black text-center leading-relaxed">
                Mempercepat Proses<br/>
                Penyembuhan Luka Dan<br/>
                Melancarkan Produksi ASI
              </span>
            </div>
            
          </div>
        </div>
        
      </div>
      
      {/* Bottom horizontal line */}
      <div className='flex justify-center mt-8'>
        <div className="w-[90%] h-1 bg-[#E3F9D3] rounded-full"></div>
      </div>
      
    </section>
  )
}
