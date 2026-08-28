import Hero from "@/components/hero/Hero";
import Stack from "@/components/sections/Stack";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Stack />
      <section id="work" className="min-h-svh px-(--gut) py-32">
        <p className="label">Selected work &#183; next</p>
      </section>
    </main>
  );
}