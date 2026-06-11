/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import About from './components/About';
import Offers from './components/Offers';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="font-sans">
      <Hero />
      <About />
      <Offers />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
