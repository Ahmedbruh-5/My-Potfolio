import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Footer.scss';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../constants/contact';

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <GitHubIcon />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <LinkedInIcon />
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Send email">
          <EmailIcon />
        </a>
      </div>
      <p>Designed &amp; built by Ahmed Aamir</p>
      <p className="footer-email">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </footer>
  );
}

export default Footer;
