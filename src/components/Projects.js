// src/components/Projects.js
import React from 'react';
import './Projects.css';

const Projects = () => {
    return (
        <section className="projects">
            <h2>Projects</h2>
            <div className="project">
                <h3>Portfolio Website</h3>
                <p>A personal portfolio showcasing my work and skills.</p>
                <p>Technologies: Next.js, Tailwind CSS, Framer Motion</p>
            </div>
            <div className="project">
                <h3>E-Lab Portal</h3>
                <p>A platform for cybersecurity training.</p>
                <p>Technologies: Java, Spring Boot, PostgreSQL</p>
            </div>
            {/* Add more projects as needed */}
        </section>
    );
};

export default Projects;
