import { motion } from 'motion/react';
import { Plane, Globe, Zap, MessageSquare } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.132-1.347a9.96 9.96 0 0 0 4.877 1.277h.005c5.505 0 9.989-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.062C17.199 3.003 14.69 2 12.012 2zm5.728 14.103c-.314.881-1.54 1.62-2.122 1.73-.58.113-1.127.165-3.645-.83-3.218-1.275-5.263-4.545-5.424-4.757-.16-.212-1.285-1.705-1.285-3.253 0-1.548.813-2.311 1.103-2.61.29-.3.637-.375.85-.375.212 0 .424.004.608.012.193.008.455-.074.712.548.263.637.899 2.196.977 2.355.078.16.13.345.024.557-.107.212-.16.345-.318.528-.158.185-.333.41-.476.55-.16.155-.327.324-.142.641.185.317.822 1.353 1.762 2.193.945.84 1.742 1.101 2.06 1.258.318.158.503.133.69-.085.186-.217.81-.944 1.027-1.265.217-.318.435-.265.733-.153.298.112 1.897.891 2.222 1.054.325.162.54.244.62.381.08.137.08 1.01-.234 1.891z"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden py-12 md:py-0">
      <div className="absolute inset-0 bg-gray-900/60 z-10" />
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
        alt="Travel background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6 text-center text-white flex flex-col items-center justify-start md:justify-start h-full pt-6 sm:pt-10 md:pt-14 lg:pt-16 pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-4 md:mb-6 leading-tight max-w-5xl"
        >
          <span className="block sm:inline whitespace-nowrap">Seu próximo embarque</span> pode estar a uma mensagem de distância.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl md:max-w-3xl mx-auto mb-16 sm:mb-24 md:mb-28 lg:mb-32 text-gray-200"
        >
          Entre para a comunidade que descobre promoções, cruzeiros e oportunidades de viagem antes da maioria.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full flex items-center gap-2 mx-auto text-base md:text-lg transition-colors shadow-lg shadow-[#25D366]/20"
        >
          <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          QUERO ENTRAR NO GRUPO AGORA
        </motion.button>
 
        <div className="mt-20 sm:mt-28 md:mt-36 lg:mt-44 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center w-full max-w-4xl pb-4">
            {[
              { icon: Plane, label: "Ofertas exclusivas" },
              { icon: Globe, label: "Destinos incríveis" },
              { icon: Zap, label: "Promoções relâmpago" },
              { icon: MessageSquare, label: "Atendimento personalizado" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + (i * 0.1) }}
                className="flex flex-col items-center gap-2 md:gap-3"
              >
                <item.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400" />
                <span className="text-xs sm:text-sm md:text-base font-medium">{item.label}</span>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
