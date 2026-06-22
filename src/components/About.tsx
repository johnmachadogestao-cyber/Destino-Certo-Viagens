import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-12 md:py-16 bg-blue-100">
      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        <motion.img 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          src="https://i0.wp.com/i.postimg.cc/gJdzdQRn/IMG-2198.avif"
          referrerPolicy="no-referrer"
          alt="Equipe Destino Certo"
          className="rounded-3xl shadow-2xl border-4 border-white max-w-full h-auto mx-auto md:mx-0 object-cover"
        />
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 mb-4 leading-tight">Nossa História</h2>
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-800 font-sans leading-relaxed">
            <p>
              Essa é a Daiana. Desde muito nova, ela sonhava em conhecer o mundo. Na sua imaginação, já viajou o mundo... sabe até os passeios de cada destino!
            </p>
            <p>
              E esse é o Huarley. Ele não sonhava tanto assim, achava até engraçado toda essa paixão da Daiana pelas viagens.
            </p>
            <p>
              Mas logo Daiana ficou conhecida entre amigos e familiares: ela era a expert em encontrar viagens acessíveis e organizar tudo com uma habilidade incrível.
            </p>
            <p>
              Foi então que o Huarley teve uma ideia: <em className="text-blue-900 not-italic font-medium">"E se a gente transformar essa paixão em um propósito? E ajudar outras pessoas a realizarem os seus sonhos de viagem?"</em>
            </p>
            <p className="font-medium text-blue-950">
              E foi assim que nasceu a Destino Certo Viagens. <br />
              Mais do que uma agência, nós somos parceiros na realização de sonhos, fazer você ter memórias e experiências inesquecíveis.
            </p>
            <p className="font-semibold text-blue-900 pt-2 border-t border-blue-200/50">
              Já imaginou seu próximo destino? Entre no grupo e vamos transformar em realidade.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
