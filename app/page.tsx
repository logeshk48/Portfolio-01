import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import LetsCook from "@/components/sections/LetsCook";
import Stack from "@/components/sections/Stack";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stack />
      <Work />
      <About />
      <LetsCook />
    </main>
  );
}