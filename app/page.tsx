import { Biography } from "@/components/Biography";
import { Contact } from "@/components/Contact";
import { Events } from "@/components/Events";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { HeroSlider } from "@/components/HeroSlider";
import { MediaCenter } from "@/components/MediaCenter";
import { Navbar } from "@/components/Navbar";
import { News } from "@/components/News";
import { Newsletter } from "@/components/Newsletter";
import { Vision } from "@/components/Vision";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <Biography />
        <Experience />
        <Vision />
        <Gallery />
        <Events />
        <News />
        <MediaCenter />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
