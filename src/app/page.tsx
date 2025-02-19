import Header from '../app/components/Header/Header'
import Hero from '../app/components/Hero/Hero'
import Ico from '../app/components/ICO/Ico'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="w-full h-screen">
        <Hero />
        <Ico/>
       
      </main>
    </div>
  );
}
