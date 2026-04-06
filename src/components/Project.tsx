import React, { useState } from "react";
import pyvisual from '../assets/images/pyvisual.png';
import pysimverse from '../assets/images/pysimverse.png';
import pvdeveloper from '../assets/images/pvdeveloper.png';
import pysimverseLms from '../assets/images/Lms.png';
import lmsAdmin from '../assets/images/lms-admin.png';
import '../assets/styles/Project.scss';

function Project() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewAlt, setPreviewAlt] = useState<string>('');

    const openPreview = (image: string, alt: string) => {
        setPreviewImage(image);
        setPreviewAlt(alt);
    };

    const closePreview = () => {
        setPreviewImage(null);
        setPreviewAlt('');
    };

    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <button className="project-image-btn" type="button" onClick={() => openPreview(pyvisual, 'PyVisual preview')}>
                    <img src={pyvisual} className="zoom" alt="PyVisual thumbnail" width="100%"/>
                </button>
                <a href="https://pyvisual.co" target="_blank" rel="noreferrer"><h2>PyVisual</h2></a>
                <p>Python GUI drag‑and‑drop builder. Create UI visually and generate clean Python code. Integrated with an AI agent (PV Developer) to author Python logic directly inside PyVisual.</p>
            </div>
            <div className="project">
                <button className="project-image-btn" type="button" onClick={() => openPreview(pysimverse, 'PySimverse preview')}>
                    <img src={pysimverse} className="zoom" alt="PySimVerse thumbnail" width="100%"/>
                </button>
                <a href="https://pysimverse.com" target="_blank" rel="noreferrer"><h2>PySimverse</h2></a>
                <p>Unity‑based Python drone simulation environment. Built for rapid prototyping and testing of autonomous behaviors and control algorithms.</p>
            </div>
            <div className="project">
                <button className="project-image-btn" type="button" onClick={() => openPreview(pvdeveloper, 'PV Developer preview')}>
                    <img src={pvdeveloper} className="zoom" alt="PV Developer thumbnail" width="100%"/>
                </button>
                <h2>PV Developer</h2>
                <p>AI agent inside PyVisual that writes Python logic code from prompts, speeding up UI-to-logic development and automating repetitive coding tasks.</p>
            </div>
            <div className="project">
                <button className="project-image-btn" type="button" onClick={() => openPreview(pysimverseLms, 'PySimverse LMS preview')}>
                    <img src={pysimverseLms} className="zoom" alt="PySimVerse LMS thumbnail" width="100%"/>
                </button>
                <h2>PySimverse LMS</h2>
                <p>Built a complete LMS for PySimVerse where users can watch tutorials and video lessons, enroll in courses, and track their learning progress from start to completion.</p>
            </div>
            <div className="project">
                <button className="project-image-btn" type="button" onClick={() => openPreview(lmsAdmin, 'PySimverse LMS admin preview')}>
                    <img src={lmsAdmin} className="zoom" alt="PySimVerse LMS admin dashboard thumbnail" width="100%"/>
                </button>
                <h2>PySimverse LMS Admin Panel</h2>
                <p>Developed the admin side of the LMS to manage users, courses, and course content with a centralized dashboard for platform operations.</p>
            </div>
        </div>
        {previewImage && (
            <div className="image-lightbox" onClick={closePreview} role="presentation">
                <button className="lightbox-close" type="button" onClick={closePreview} aria-label="Close image preview">
                    x
                </button>
                <img
                    src={previewImage}
                    alt={previewAlt}
                    className="lightbox-image"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        )}
    </div>
    );
}

export default Project;