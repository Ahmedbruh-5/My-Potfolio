import { useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/chrome/CustomCursor';
import { PageIntro } from './components/chrome/PageIntro';
import { ScrollProgress } from './components/chrome/ScrollProgress';
import { SmoothScroll } from './components/chrome/SmoothScroll';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Footer } from './components/Footer';
import { GitHubActivity } from './components/GitHubActivity';
import { Hero } from './components/Hero';
import { HowIWork } from './components/HowIWork';
import { Nav } from './components/Nav';
import { ProjectIndex } from './components/ProjectIndex';
import { ProofStrip } from './components/ProofStrip';
import { Services } from './components/Services';
import { Skills } from './components/Skills';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="noise-bg relative min-h-screen bg-bg text-text">
      <PageIntro onDone={() => setReady(true)} />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main className={ready ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.4s ease' }}>
        <Hero />
        <ProofStrip />
        <About />
        <FeaturedProjects />
        <GitHubActivity />
        <ProjectIndex />
        <Skills />
        <HowIWork />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
