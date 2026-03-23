import Intro from '@/components/Intro';
import Work from '@/components/Work';
import Services from '@/components/Services';
import About from '@/components/about';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <main>
      <Intro />
      <Work />
      <Services />
      <About />
      <Contact />
    </main>
  );
}