import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '../assets/styles/Main.scss';
import pfp from '../assets/images/pfp.jpeg';
import Button from '@mui/material/Button';
import resumePdf from '../assets/resume/Ahmed_Aamir_Resume.pdf';
import Typewriter from './Typewriter';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../constants/contact';

const typewriterPhrases = [
  'Developer Tools & AI Agents',
  'Python GUI Builders',
  'Full-Stack MERN Apps',
  'Drone Simulation Platforms',
];

function Main() {
  return (
    <div className="container" id="home">
      <div className="about-section">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-bg__grid" />
          <div className="hero-bg__glow hero-bg__glow--1" />
          <div className="hero-bg__glow hero-bg__glow--2" />
          <div className="hero-bg__glow hero-bg__glow--3" />
        </div>
        <div className="image-wrapper">
          <img src={pfp} alt="Ahmed Aamir" />
        </div>
        <div className="content">
          <p className="hero-greeting">Hi, I'm</p>
          <h1>Ahmed Aamir</h1>
          <p className="hero-tagline">
            I build <Typewriter phrases={typewriterPhrases} />
          </p>
          <p className="hero-subtitle">
            Creator of <strong>PyVisual</strong> &amp; <strong>PySimverse</strong> — turning ideas into
            production-ready tools with AI, Python, and the MERN stack.
          </p>
          <div className="hero-highlights">
            <span>Python GUI Builder</span>
            <span>LLM Code Agents</span>
            <span>Drone Simulation</span>
            <span>Legal Tech SaaS</span>
          </div>
          <div className="hero-actions">
            <Button
              className="resume-primary"
              size="large"
              variant="contained"
              component="a"
              href="https://pyvisual.co"
              target="_blank"
              rel="noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              View PyVisual
            </Button>
            <Button
              className="resume-secondary"
              size="large"
              variant="outlined"
              component="a"
              href={resumePdf}
              download
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </Button>
          </div>
          <div className="social_icons">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GitHubIcon />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="email-link" aria-label="Send email">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="mobile_social_icons">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GitHubIcon />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
