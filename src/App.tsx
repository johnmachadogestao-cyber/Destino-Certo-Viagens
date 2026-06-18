/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Offers from './components/Offers';
import RecentTrip from './components/RecentTrip';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { trackEvent, generateEventId } from './lib/metaPixel';

export default function App() {
  useEffect(() => {
    // Dispara o evento de PageView automático ao carregar a página
    const pageViewId = generateEventId('PageView');
    trackEvent({ eventName: 'PageView', eventId: pageViewId });
  }, []);

  return (
    <main className="font-sans">
      <Hero />
      <About />
      <Offers />
      <RecentTrip />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
