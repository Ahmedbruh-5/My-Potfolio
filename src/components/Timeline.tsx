import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import SectionHeader from './SectionHeader';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <SectionHeader
          eyebrow="Experience"
          title="Career History"
          subtitle="From internships to production deployments — building full-stack systems that ship."
        />
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Nov 2024 – Present"
            iconStyle={{ background: '#06b6d4', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">MERN Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">CvZone — Lahore, PK</h4>
            <p>
              Full‑stack development across the MERN stack. Built and maintained production React frontends and
              Node.js/Express APIs with MongoDB, authentication, and real‑time features. Led deployments on
              DigitalOcean, integrated AWS SES for email, and improved CI/CD reliability.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2024 – Oct 2024"
            iconStyle={{ background: '#06b6d4', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">MERN Stack Developer Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Softa Solutions — Gujranwala, PK</h4>
            <p>
              Contributed to frontend and backend features with React, Node.js/Express, and MongoDB. Gained
              hands‑on experience in REST API design, component development, and team Git workflows during
              my final‑semester summer internship.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;