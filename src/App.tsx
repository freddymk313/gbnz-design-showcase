import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/gbnz/Navbar";
import { Hero } from "@/components/gbnz/Hero";
import { Marquee } from "@/components/gbnz/Marquee";
import { Services } from "@/components/gbnz/Services";
import { Portfolio } from "@/components/gbnz/Portfolio";
import { About } from "@/components/gbnz/About";
import { Contact } from "@/components/gbnz/Contact";
import { Footer } from "@/components/gbnz/Footer";

function HomePage() {
  return (
    <main className="bg-white text-brand-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
