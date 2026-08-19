import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faPython, faDocker } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import SectionHeader from './SectionHeader';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
  "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux",
  "SASS", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs",
  "JWT/Auth", "WebSockets",
];

const labelsSecond = [
  "DigitalOcean", "AWS SES", "Docker", "Git", "GitHub", "CI/CD",
];

const labelsThird = [
  "Python", "LLM", "AI Agent", "OpenAI API", "RAG", "Unity", "Drone Simulation",
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <SectionHeader
          eyebrow="Capabilities"
          title="Expertise"
          subtitle="Three core areas where I deliver end-to-end — from architecture to production deployment."
        />
        <div className="skills-grid">
          <div className="skill skill--mern">
            <div className="skill-icon-wrap">
              <FontAwesomeIcon icon={faReact} size="2x" />
            </div>
            <h3>Full‑Stack MERN Development</h3>
            <p>
              I build end‑to‑end web apps across the MERN stack — clean, accessible frontends in React
              and robust backends with Node.js/Express, backed by MongoDB. REST APIs, auth,
              real‑time features, and production‑ready architectures.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFirst.map((label) => (
                <Chip key={label} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill skill--devops">
            <div className="skill-icon-wrap">
              <FontAwesomeIcon icon={faDocker} size="2x" />
            </div>
            <h3>Deployment &amp; DevOps</h3>
            <p>
              I ship reliably with containerized deployments on <strong>DigitalOcean</strong> and
              <strong> AWS SES</strong> for email. CI/CD pipelines, process managers, reverse proxies,
              and monitoring to keep apps scalable and resilient in production.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsSecond.map((label) => (
                <Chip key={label} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill skill--ai">
            <div className="skill-icon-wrap">
              <FontAwesomeIcon icon={faPython} size="2x" />
            </div>
            <h3>AI, Python &amp; Simulation</h3>
            <p>
              Creator of <strong>PyVisual</strong> and <strong>PySimVerse</strong>, plus
              <strong> PV Developer</strong> — an AI agent that writes Python logic from prompts.
              Integrating LLMs to accelerate development and automate repetitive tasks.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsThird.map((label) => (
                <Chip key={label} className="chip" label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
