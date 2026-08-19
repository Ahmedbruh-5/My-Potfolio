import React, { useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionHeader from './SectionHeader';
import '../assets/styles/Project.scss';
import {
  projects,
  projectCategories,
  ProjectCategory,
  Project as ProjectType,
} from '../data/projects';

function ProjectCard({
  project,
  onPreview,
  featured = false,
  featuredHero = false,
}: {
  project: ProjectType;
  onPreview: (image: string, alt: string) => void;
  featured?: boolean;
  featuredHero?: boolean;
}) {
  const title = project.url ? (
    <a href={project.url} target="_blank" rel="noreferrer">
      <h2>{project.title} <OpenInNewIcon className="external-icon" /></h2>
    </a>
  ) : (
    <h2>{project.title}</h2>
  );

  return (
    <article className={`project${featured ? ' project--featured' : ''}${featuredHero ? ' project--featured-hero' : ''}`}>
      <button
        className="project-image-btn"
        type="button"
        onClick={() => onPreview(project.image, `${project.title} preview`)}
        aria-label={`Preview ${project.title}`}
      >
        <img src={project.image} className="zoom" alt={`${project.title} thumbnail`} />
      </button>
      {title}
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}

function Project() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewAlt, setPreviewAlt] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const featuredProjects = projects.filter((p) => p.featured);
  const filteredProjects =
    activeCategory === 'all'
      ? projects.filter((p) => !p.featured)
      : projects.filter((p) => p.category === activeCategory && !p.featured);

  const openPreview = (image: string, alt: string) => {
    setPreviewImage(image);
    setPreviewAlt(alt);
  };

  const closePreview = () => {
    setPreviewImage(null);
    setPreviewAlt('');
  };

  return (
    <div className="projects-container" id="projects">
      <SectionHeader
        eyebrow="Work"
        title="Projects"
        subtitle="From AI-powered developer tools to full-scale legal platforms — here's what I've shipped."
      />

      <section className="featured-section">
        <h2>Featured Work</h2>
        <div className="projects-grid featured-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPreview={openPreview}
              featured
              featuredHero={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="all-projects-section">
        <div className="projects-header">
          <h2>All Projects</h2>
          <div className="category-filters" role="tablist" aria-label="Filter projects by category">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-btn${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPreview={openPreview}
            />
          ))}
        </div>
      </section>

      {previewImage && (
        <div className="image-lightbox" onClick={closePreview} role="presentation">
          <button
            className="lightbox-close"
            type="button"
            onClick={closePreview}
            aria-label="Close image preview"
          >
            ×
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
