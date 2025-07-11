// src/components/Experience.js
import React from 'react';
import './Experience.css';

const Experience = () => {
    return (
        <section className="experience">
            <h2>Experience</h2>
            <div className="job">
                <h3>Project Engineer at CDAC</h3>
                <p>Leading the migration of FSP Prime to Spring Boot.</p>
            </div>
            <div className="job">
                <h3>Project Associate at CDAC</h3>
                <p>Developed the E Lab Portal using Spring Boot.</p>
            </div>
            {/* Add more experiences as needed */}
        </section>
    );
};

export default Experience;
