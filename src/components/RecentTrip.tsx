import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const recentTrips = [
  {
    image: "https://i0.wp.com/i.postimg.cc/TPp0swP7/IMG-1990.png",
    title: "Cruzeiros em Família",
    tag: "Viagem do Grupo",
    location: "Caribe & Bahamas",
    date: "Junho 2026"
  },
  {
    image: "https://i0.wp.com/i.postimg.cc/fW24t39N/IMG-1989.png", // The main user-provided image
    title: "Eurotrip Exclusiva",
    tag: "Mais Recente!",
    location: "itália, Suíça e França",
    date: "Junho 2026"
  },
  {
    image: "https://i0.wp.com/i.postimg.cc/NMNgjdcd/2620.png",
    title: "Paraísos Nacionais",
    tag: "Divulgação VIP",
    location: "Nordeste Brasileiro",
    date: "Maio 2026"
  },
  {
    image: "https://i0.wp.com/i.postimg.cc/vBKpKkMs/IMG-2427.avif",
    title: "Aventuras de Inverno",
    tag: "Incrível",
    location: "Estações de Esqui",
    date: "Junho 2026"
  },
  {
    image: "https://i0.wp.com/i.postimg.cc/bwTY5yBB/IMG-2177.avif",
    title: "Destino Paradisíaco",
    tag: "Novidade",
    location: "Praias Paradisíacas",
    date: "Junho 2026"
  },
  {
    image: "https://i0.wp.com/i.postimg.cc/YqBpqLKt/2224.png",
    title: "Experiência Inesquecível",
    tag: "Exclusivo",
    location: "Roteiros Premium",
    date: "Junho 2026"
  }
];

export default function RecentTrip() {
  // Start with the user's main image (index 1) active in the center
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % recentTrips.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + recentTrips.length) % recentTrips.length);
  };

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

  const getDiff = (idx: number) => {
    let diff = idx - activeIndex;
    const len = recentTrips.length;
    while (diff <= -len / 2) diff += len;
    while (diff > len / 2) diff -= len;
    return diff;
  };

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Same styling and layout as "Algumas das viagens" */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center text-gray-900 mb-2 leading-tight">
          <span className="block sm:inline whitespace-nowrap">Nossa mais recente</span> viagem
        </h2>
        
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-md sm:max-w-xl mx-auto mb-10 leading-relaxed font-sans">
          Acompanhe em tempo real os roteiros e as maiores oportunidades desfrutadas por nossos clientes exclusivos.
        </p>

        {/* 3D Carousel Stage */}
        <div className="relative w-full max-w-4xl mx-auto px-1 sm:px-4 py-8 flex flex-col items-center">
          
          <div 
            className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ perspective: 1200 }}
          >
            {recentTrips.map((trip, idx) => {
              const diff = getDiff(idx);
              const isActive = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isHidden = Math.abs(diff) >= 2;

              // Compute position variables
              // On mobile, reduce side card translation to fit exactly in screen limits
              const xOffset = isHidden ? "0%" : isMobile ? (isLeft ? "-45%" : isRight ? "45%" : "0%") : (isLeft ? "-65%" : isRight ? "65%" : "0%");
              const zOffset = isActive ? 100 : isHidden ? -300 : -150;
              const rotateY = isActive ? 0 : isLeft ? 24 : isRight ? -24 : 0;
              const scale = isActive ? 1 : isHidden ? 0.6 : isMobile ? 0.75 : 0.8;
              const opacity = isActive ? 1 : isHidden ? 0 : isMobile ? 0.45 : 0.6;
              const zIndex = isActive ? 30 : isHidden ? 0 : 10;

              return (
                <motion.div
                  key={idx}
                  className="absolute w-[240px] h-[380px] sm:w-[290px] sm:h-[460px] md:w-[320px] md:h-[510px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col justify-between overflow-hidden bg-white"
                  style={{
                    transformStyle: 'preserve-3d',
                    pointerEvents: isHidden ? 'none' : 'auto',
                  }}
                  animate={{
                    translateX: xOffset,
                    translateZ: zOffset,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 18,
                  }}
                  onClick={() => {
                    if (!isActive && !isHidden) {
                      setActiveIndex(idx);
                    }
                  }}
                >
                  {/* Trip image only - no text overlays or tag indicators */}
                  <div className="relative w-full h-full bg-gray-900 group">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      className="w-full h-full object-cover transition-transform duration-700 select-none group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-6 mt-4 z-40">
            <button
              onClick={prevSlide}
              className="bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white p-3 rounded-full shadow-md border border-gray-100 transition-all hover:scale-110 active:scale-95"
              aria-label="Voltar Imagem"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {recentTrips.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 transition-all rounded-full ${
                    idx === activeIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Visualizar slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white p-3 rounded-full shadow-md border border-gray-100 transition-all hover:scale-110 active:scale-95"
              aria-label="Avançar Imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
