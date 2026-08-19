import React, {useState, useEffect} from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import ScrollReveal from './components/ScrollReveal';
import './index.scss';
import './assets/styles/ScrollReveal.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        document.body.classList.add('dark-mode');
      }, []);

    useEffect(() => {
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(mode === 'dark' ? 'dark-mode' : 'light-mode');
    }, [mode]);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <div className="site-bg" aria-hidden="true">
            <div className="site-bg__gradient" />
            <div className="site-bg__grid" />
            <div className="site-bg__orb site-bg__orb--1" />
            <div className="site-bg__orb site-bg__orb--2" />
            <div className="site-bg__orb site-bg__orb--3" />
        </div>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <ScrollReveal duration={800} offset={24}>
            <Main/>
        </ScrollReveal>
        <ScrollReveal delay={80}>
            <Expertise/>
        </ScrollReveal>
        <ScrollReveal delay={80}>
            <Timeline/>
        </ScrollReveal>
        <ScrollReveal delay={80}>
            <Project/>
        </ScrollReveal>
        <ScrollReveal delay={80}>
            <Contact/>
        </ScrollReveal>
        <ScrollReveal delay={60} offset={20}>
            <Footer />
        </ScrollReveal>
    </div>
    );
}

export default App;