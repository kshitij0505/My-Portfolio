// src/components/Skills.js
import React from 'react';
import './Skills.css';

const Skills = () => {
    return (
        <section className="skills">
            <h2>Skills</h2>
            <div className="skill-category">
                <h3>Languages / Databases</h3>
                <ul>
                    <li>Java</li>
                    <li>Python</li>
                    <li>JavaScript</li>
                    <li>Node.js</li>
                    <li>HTML5</li>
                    <li>MySQL</li>
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                </ul>
            </div>
            <div className="skill-category">
                <h3>Frameworks / Libraries</h3>
                <ul>
                    <li>Spring Boot</li>
                    <li>React.js</li>
                    <li>Next.js</li>
                </ul>
            </div>
            {/* Add more categories as needed */}
        </section>
    );
};

export default Skills;
