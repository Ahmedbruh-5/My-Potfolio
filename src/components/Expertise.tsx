import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faPython, faDocker } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import advokateDesk from '../assets/images/AdvokateDesk.png';
import deployments from '../assets/images/deployments.png';
import pvdeveloper from '../assets/images/pvdeveloper.png';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Redux",
    "SASS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "REST APIs",
    "JWT/Auth",
    "WebSockets"
];

const labelsSecond = [
    "DigitalOcean",
    "AWS SES",
    "Docker",
    "Git",
    "GitHub",
    "CI/CD",
];

const labelsThird = [
    "Python",
    "LLM",
    "AI Agent",
    "OpenAI API",
    "RAG",
    "Unity",
    "Drone Simulation",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <img src={advokateDesk} alt="Full-stack work preview" className="expertise-image" />
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Full‑Stack MERN Development</h3>
                    <p>
                        I build end‑to‑end web apps across the MERN stack—clean, accessible frontends in React
                        and robust backends with Node.js/Express, backed by MongoDB. I design REST APIs, handle
                        authentication/authorization, real‑time features, and production‑ready architectures.
                    </p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <img src={deployments} alt="Deployment and DevOps preview" className="expertise-image" />
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Deployment & DevOps</h3>
                    <p>
                        I ship reliably with containerized deployments on <strong>DigitalOcean</strong> and leverage
                        <strong> AWS</strong> services such as <strong>SES</strong> for email. I set up CI/CD, process
                        managers, reverse proxies, and monitoring to keep apps scalable and resilient in production.
                    </p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <img src={pvdeveloper} alt="AI and Python preview" className="expertise-image" />
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>AI, Python & Simulation</h3>
                    <p>
                        I created <strong>PyVisual</strong>, a Python GUI drag‑and‑drop builder, and
                        <strong> PySimVerse</strong>, a Unity‑based Python drone simulation. I also built
                        <strong> PV Developer</strong>, an AI agent that writes Python logic for PyVisual—integrating LLMs to
                        accelerate development and automate repetitive tasks.
                    </p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;