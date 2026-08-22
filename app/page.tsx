import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <section id="work" className="min-h-svh px-(--gut) py-32">
        <p className="legend">Selected work · Phase 06</p>
      </section>
    </main>
  );
}