import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import pfp from '../assets/images/pfp.jpeg';
import Button from '@mui/material/Button';
import resumePdf from '../assets/resume/Ahmed_Aamir.pdf';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={pfp} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/Ahmedbruh-5" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/ahmed-aamir1/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Ahmed Aamir</h1>
          <p>Full Stack Mern Developer</p>
          <div className="hero-actions">
            <Button
              className="resume-primary"
              size="large"
              variant="contained"
              component="a"
              href={resumePdf}
              download
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </Button>
          </div>
          <div className="mobile_social_icons">
            <a href="https://github.com/Ahmedbruh-5" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/ahmed-aamir1/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;