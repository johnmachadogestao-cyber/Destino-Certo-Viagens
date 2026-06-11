import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const feedbackImages = [
  "https://i.postimg.cc/13G6HhyJ/Whats-App-Image-2026-06-09-at-01-08-20.jpg",
  "https://i.postimg.cc/52z05wS6/Whats-App-Image-2026-06-09-at-01-08-20-(1).jpg",
  "https://i.postimg.cc/t4Gyj8FP/Whats-App-Image-2026-06-09-at-01-08-21.jpg",
  "https://i.postimg.cc/HxrsxXnG/Whats-App-Image-2026-06-09-at-01-08-21-(1).jpg",
  "https://i.postimg.cc/CxpZQP15/Whats-App-Image-2026-06-09-at-01-08-21-(2).jpg",
  "https://i.postimg.cc/g0k3gSSM/Whats-App-Image-2026-06-09-at-01-08-21-(3).jpg",
  "https://i.postimg.cc/c4RY0yPc/Whats-App-Image-2026-06-09-at-01-08-21-(4).jpg",
  "https://i.postimg.cc/Vk4C09fD/Whats-App-Image-2026-06-09-at-01-08-32.jpg",
  "https://i.postimg.cc/brQGykV9/Whats-App-Image-2026-06-09-at-01-08-32-(1).jpg",
  "https://i.postimg.cc/P5fLHLWm/Whats-App-Image-2026-06-09-at-01-08-32-(2).jpg"
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % feedbackImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + feedbackImages.length) % feedbackImages.length);
  };

  // Auto play every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
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
    <section id="feedbacks" className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3 leading-tight">
            Experiências reais de quem confiou na Destino Certo
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Por trás de cada mensagem existe uma viagem realizada, uma experiência vivida e uma história para recordar.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-xl mx-auto px-1 sm:px-4">
          <div 
            className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-gray-100 bg-gray-50 aspect-[3/4] md:aspect-[4/5] cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {feedbackImages.map((img, idx) => (
              <motion.div
                key={idx}
                className="absolute inset-0 w-full h-full p-2 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: idx === activeIndex ? 1 : 0,
                  scale: idx === activeIndex ? 1 : 0.95,
                  zIndex: idx === activeIndex ? 10 : 0
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <img
                  src={img}
                  alt={`Feedback de Viagem ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </motion.div>
            ))}

            {/* Overlay indicators on bottom */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-1.5">
              {feedbackImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 transition-all rounded-full ${
                    idx === activeIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute -left-1 sm:-left-3 md:-left-16 top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-blue-600 text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Depoimento Anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-1 sm:-right-3 md:-right-16 top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-blue-600 text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Próximo Depoimento"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Continuous Infinite Marquee underneath for visual premium flair */}
        <div className="mt-10 relative w-full overflow-hidden py-4 bg-gray-50 rounded-2xl flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex gap-12 animate-infinite-scroll whitespace-nowrap min-w-max justify-around items-center text-sm font-semibold tracking-wider text-blue-900/60 uppercase">
            {/* First stream */}
            <span className="inline-flex gap-12 items-center">
              <span>🌍 MELHORES PREÇOS GARANTIDOS</span>
              <span>⭐ VIAGENS FEITAS SOB MEDIDA</span>
              <span>💬 ATENDIMENTO PREMIUM VIA WHATSAPP</span>
              <span>🔒 RESERVA SEGURA & INTEGRADA</span>
              <span>🔥 OFERTAS EM TEMPO REAL</span>
            </span>
            {/* Second stream identical to first to make transition seamless */}
            <span className="inline-flex gap-12 items-center">
              <span>🌍 MELHORES PREÇOS GARANTIDOS</span>
              <span>⭐ VIAGENS FEITAS SOB MEDIDA</span>
              <span>💬 ATENDIMENTO PREMIUM VIA WHATSAPP</span>
              <span>🔒 RESERVA SEGURA & INTEGRADA</span>
              <span>🔥 OFERTAS EM TEMPO REAL</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

