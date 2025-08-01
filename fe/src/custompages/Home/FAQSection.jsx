import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Mengapa bunda harus memilih Globumil sebagai Vitamin pendamping Kehamilan ?",
    answer: "Globumil diformulasikan oleh dokter-dokter spesialis kandungan fetomaternal agar bisa memberikan nutrisi yang terbaik untuk ibu hamil. Komposisi yang terkandung didalam globumil merupakan multivitamin dan mineral terbaik yang sangat diperlukan oleh ibu hamil untuk memastikan perkembangan janin didalam kandungan tumbuh secara optimal. Dan ibu tetap sehat selama masa kehamilan.",
  },
  {
    question: "Apa saja nutrisi yang terkandung didalam Globumil ?",
    answer: "Globumil merupakan Produk Multivitamin dan Mineral terbaik untuk Ibu Hamil. Beberapa Nutrisi yang terkandung didalamnya adalah Calcium, Folid Acid, Iodine, Iron, Vit B1, Vit B12, Vit B6, Vit C, Vit D3, Zinc, Biotin, DHA Powder",
  },
  {
    question: "Apa saja fungsi multivitamin dan mineral yang terkandung didalam globumil ?",
    answer: [
      "Globumil mengandung asam folat untuk mencegah kecacatan pada janin",
      "Terdapat kandungan zat besi atau FE untuk mencegah terjadinya anemia selama kehamilan dan mencegah pendarahan saat persalinan",
      "Mengandung Kalsium untuk mencegah terjadinya osteoporosis selama kehamilan",
      "Mengandung Zinc untuk menjaga Imunitas Tubuh bunda dan bayi"
    ],
  },
  {
    question: "Dapatkah saya mengonsumsi Globumil bersamaan dengan obat dokter ?",
    answer: "Jika bunda ingin mengonsumsi obat dari dokter, konsultasikan terlebih dahulu dengan dokter sebelum mengkonsumsi suplemen.",
  },{
    question: "Dimanakah saya bisa membeli produk Globumil?",
    answer: "Bunda bisa mendapatkan Globumil pada apotek Kimia Farma terdekat atau melalui Marketplace seperti Shopee, Tiktokshop, Lazada dan Tokopedia." },
];

export const FAQSection = () => {
  return (
    <div className="w-full flex flex-col  justify-center items-center  pb-[30px] md:pb-[84px] px-2"> 
      <div className='w-full flex justify-center items-center'>
        <h2 className="w-[90%] text-2xl md:text-4xl font-bold text-center mb-5"> Hal Yang Sering Ditanyakan </h2>
      </div>
     <div className="w-[90%] flex flex-col md:flex-row justify-center items-center px-2"> 
    
      {/* Left: Product Image */}
      <div className="hidden md:block  md:w-[35%] flex justify-center items-center mb-8 md:mb-0">
        <div className="rounded-xl p-6 flex justify-center items-center">
          <img
            src="/images/Home/Faq/GlobumilProduct.png"
            alt="Globumil Product"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      {/* Right: FAQ Accordion */}
      <div className="grow-3 flex-1 flex flex-col gap-4 max-w-xl w-full">
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className={`mb-4 rounded-xl border-0 shadow ${
                idx === 0 ? "bg-[#FFF6F8]" : "bg-white"
              }`}
            >
              <AccordionTrigger 
                className={`flex items-center px-6 py-5 rounded-xl text-left gap-3 "text-black" font-semibold text-lg [&[data-state=open]]:bg-[#FFF6F8]`}
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#FFD1DA] rounded-full mr-3">
                  <p className="text-2xl text-[#1d1c1c] font-bold">?</p>
                </div>
                <div className="text-left w-[90%]">
                        {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-base text-black">
                {Array.isArray(faq.answer) ? (
                  <ol className="list-decimal pl-5">
                    {faq.answer.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  faq.answer
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    </div>
  );
};
