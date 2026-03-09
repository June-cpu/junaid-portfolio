import Intro from '@/components/Intro';
import Work from '@/components/Work';
import About from '@/components/about';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <main>
      <Intro />
      <Work />
      <About />
      <Contact />
    </main>
  );
}