import { motion } from 'motion/react';
import React, { useState } from 'react';
import { trackEvent, generateEventId } from '../lib/metaPixel';
import { WHATSAPP_GROUP_LINK_PLACEHOLDER } from '../config';

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

export default function FinalCTA() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleJoinGroup = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRedirecting) return;
    setIsRedirecting(true);

    const eventId = generateEventId('Lead');
    try {
      await trackEvent({ eventName: 'Lead', eventId });
    } catch (err) {
      console.error("[Tracking Lead Final Error] Falha no rastreamento:", err);
    } finally {
      window.location.href = WHATSAPP_GROUP_LINK_PLACEHOLDER;
    }
  };

  return (
    <section className="py-12 md:py-16 bg-blue-900 text-white text-center">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
          <span className="block sm:inline whitespace-nowrap">Seu próximo destino</span> pode aparecer no grupo hoje.
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 max-w-lg mx-auto leading-relaxed">
          Entre agora e receba em primeira mão promoções, cruzeiros, pacotes e oportunidades de viagem compartilhadas diretamente no WhatsApp.
        </p>
        <motion.button 
          whileHover={{ scale: isRedirecting ? 1 : 1.05 }}
          onClick={handleJoinGroup}
          disabled={isRedirecting}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-full flex items-center gap-2 mx-auto text-base md:text-lg transition-colors shadow-lg shadow-[#25D366]/20 border border-green-400/30 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          {isRedirecting ? "Redirecionando..." : "QUERO ENTRAR NO GRUPO AGORA"}
        </motion.button>
      </div>
    </section>
  );
}
