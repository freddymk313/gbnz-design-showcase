import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/gbnz/Navbar";
import { Hero } from "@/components/gbnz/Hero";
import { Marquee } from "@/components/gbnz/Marquee";
import { Services } from "@/components/gbnz/Services";
import { Portfolio } from "@/components/gbnz/Portfolio";
import { About } from "@/components/gbnz/About";
import { Contact } from "@/components/gbnz/Contact";
import { Footer } from "@/components/gbnz/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gbnz Design | Studio Créatif à Kinshasa" },
      { name: "description", content: "Studio créatif à Kinshasa, RDC. Logos, affiches et identité visuelle sur mesure pour entreprises ambitieuses." },
      { property: "og:title", content: "Gbnz Design | Studio Créatif à Kinshasa" },
      { property: "og:description", content: "Logos, affiches et branding premium par Gbnz Design — Kinshasa, RDC." },
    ],
  }),
  component: Index,
});

function Index() {
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
