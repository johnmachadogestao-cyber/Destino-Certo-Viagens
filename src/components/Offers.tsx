import { motion } from 'motion/react';
import { Plane, Star, Umbrella, Ship, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const offers = [
  { 
    icon: Plane, 
    title: "Destinos Internacionais", 
    desc: "Explore o mundo com pacotes exclusivos.",
    image: "https://i.postimg.cc/HsgQ4rHJ/Whats-App-Image-2026-06-10-at-20-58-50.jpg",
    alt: "Destinos Internacionais"
  },
  { 
    icon: Star, 
    title: "Resorts Premium", 
    desc: "Luxo e conforto em lugares paradisíacos.",
    image: "https://i.postimg.cc/rFVDwxMg/Whats-App-Image-2026-06-10-at-20-58-50-(1).jpg",
    alt: "Resorts Premium"
  },
  { 
    icon: Umbrella, 
    title: "Viagens Nacionais", 
    desc: "Descubra as belezas do nosso Brasil.",
    image: "https://i.postimg.cc/SQrK3RCN/Whats-App-Image-2026-06-10-at-20-58-49-(2).jpg",
    alt: "Viagens Nacionais"
  },
  { 
    icon: Ship, 
    title: "Cruzeiros Inesquecíveis", 
    desc: "Experiências únicas em alto mar.",
    image: "https://i.postimg.cc/9fKmPw6b/Whats-App-Image-2026-06-10-at-20-58-49.jpg",
    alt: "Cruzeiros Inesquecíveis"
  },
];

export default function Offers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  // Auto play every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      touchStartX.current = null;
    }
  };

  return (
    <section className="py-10 bg-blue-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center text-gray-900 mb-8 leading-tight">
          <span className="block sm:inline whitespace-nowrap">Algumas das viagens</span> que já divulgamos no grupo
        </h2>
        
        {/* Carousel Wrapper */}
        <div className="relative max-w-4xl mx-auto px-1 sm:px-4">
          <div 
            className="relative overflow-hidden rounded-3xl shadow-xl border border-gray-100 bg-white h-[580px] sm:h-[600px] md:h-[360px] lg:h-[380px] cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {offers.map((offer, idx) => (
              <motion.div
                key={idx}
                className="absolute inset-0 w-full h-full p-2 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ 
                  opacity: idx === activeIndex ? 1 : 0,
                  scale: idx === activeIndex ? 1 : 0.98,
                  zIndex: idx === activeIndex ? 10 : 0
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <div className="w-full h-full bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden">
                  {/* Image Container with perfect 9:16 alignment */}
                  <div className="relative aspect-[9/16] h-[320px] sm:h-[380px] md:h-full mx-auto md:mx-0 flex-shrink-0 overflow-hidden bg-gray-950 flex items-center justify-center">
                    {/* Blurred background backup to fit 9:16 nicely */}
                    <img 
                      src={offer.image} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Clean, fully visible 9:16 image that dynamically fits without cropping */}
                    <img 
                      src={offer.image} 
                      alt={offer.alt} 
                      className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="w-full md:flex-1 p-4 s:p-6 md:p-8 flex flex-col justify-start md:justify-center text-left pb-16 md:pb-8">
                    <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">Oportunidades</span>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-1.5 sm:mb-3 leading-tight sm:leading-snug">{offer.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-6">{offer.desc}</p>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Disponível com exclusividade no grupo
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Pagination Indicators on the bottom */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5">
              {offers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 transition-all rounded-full ${
                    idx === activeIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
                  }`}
                  aria-label={`Ir para oferta ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute -left-1 sm:-left-3 md:-left-16 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-blue-600 text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Oferta Anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-1 sm:-right-3 md:-right-16 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-blue-600 text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Próxima Oferta"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
