import Header from '../app/components/Header/Header'
import Hero from '../app/components/Hero/Hero'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header className="absolute top-0 left-0 w-full z-50" />
      <main className="w-full h-screen">
        <Hero />
      </main>
    </div>
  );
}
