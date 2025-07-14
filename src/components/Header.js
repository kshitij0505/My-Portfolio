import React, { useState, useEffect } from 'react';

// Import your image
import kshitijImage from './../img/kshitij.JPEG';

const Header = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [displayedText, setDisplayedText] = useState('');
    const [displayedSubtitle, setDisplayedSubtitle] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [bubbles, setBubbles] = useState([]);

    const name = "Kshitij";
    const titles = ["Frontend Developer", "Web Developer", "Project Engineer"];

    // Generate random bubbles with better visibility
    useEffect(() => {
        const generateBubbles = () => {
            const newBubbles = [];
            for (let i = 0; i < 20; i++) {
                newBubbles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 100 + 40,
                    speed: Math.random() * 0.3 + 0.1,
                    opacity: Math.random() * 0.4 + 0.2,
                    direction: Math.random() * Math.PI * 2
                });
            }
            setBubbles(newBubbles);
        };

        generateBubbles();

        const animateBubbles = () => {
            setBubbles(prevBubbles =>
                prevBubbles.map(bubble => ({
                    ...bubble,
                    x: (bubble.x + Math.cos(bubble.direction) * bubble.speed) % 100,
                    y: (bubble.y + Math.sin(bubble.direction) * bubble.speed) % 100
                }))
            );
        };

        const bubbleInterval = setInterval(animateBubbles, 50);
        return () => clearInterval(bubbleInterval);
    }, []);

    // Typewriter effect for name and rotating titles
    useEffect(() => {
        let nameIndex = 0;
        const typeNameTimer = setInterval(() => {
            if (nameIndex < name.length) {
                setDisplayedText(name.slice(0, nameIndex + 1));
                nameIndex++;
            } else {
                clearInterval(typeNameTimer);
                
                // Start typing the first title after name is complete
                setTimeout(() => {
                    startTitleRotation();
                }, 500);
            }
        }, 150);

        return () => clearInterval(typeNameTimer);
    }, []);

    const startTitleRotation = () => {
        const typeTitle = (titleIndex) => {
            const currentTitle = titles[titleIndex];
            let charIndex = 0;
            
            // Clear previous title
            setDisplayedSubtitle('');
            setIsTyping(true);
            
            const typeTimer = setInterval(() => {
                if (charIndex < currentTitle.length) {
                    setDisplayedSubtitle(currentTitle.slice(0, charIndex + 1));
                    charIndex++;
                } else {
                    clearInterval(typeTimer);
                    setIsTyping(false);
                    
                    // Wait 2 seconds before starting to delete
                    setTimeout(() => {
                        deleteTitle(titleIndex);
                    }, 2000);
                }
            }, 100);
        };

        const deleteTitle = (titleIndex) => {
            const currentTitle = titles[titleIndex];
            let charIndex = currentTitle.length;
            setIsTyping(true);
            
            const deleteTimer = setInterval(() => {
                if (charIndex > 0) {
                    setDisplayedSubtitle(currentTitle.slice(0, charIndex - 1));
                    charIndex--;
                } else {
                    clearInterval(deleteTimer);
                    
                    // Move to next title
                    const nextIndex = (titleIndex + 1) % titles.length;
                    setCurrentTitleIndex(nextIndex);
                    
                    // Wait a bit before typing next title
                    setTimeout(() => {
                        typeTitle(nextIndex);
                    }, 300);
                }
            }, 50);
        };

        // Start with the first title
        typeTitle(0);
    };

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Custom Logo Component
    const CustomLogo = () => (
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }}>
            {/* Network nodes pattern */}
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                {/* Main central circle */}
                <circle cx="17.5" cy="17.5" r="3" fill="white" opacity="0.9"/>
                
                {/* Surrounding circles */}
                <circle cx="8" cy="8" r="2" fill="white" opacity="0.7"/>
                <circle cx="27" cy="8" r="2" fill="white" opacity="0.7"/>
                <circle cx="8" cy="27" r="2" fill="white" opacity="0.7"/>
                <circle cx="27" cy="27" r="2" fill="white" opacity="0.7"/>
                <circle cx="17.5" cy="6" r="1.5" fill="white" opacity="0.6"/>
                <circle cx="17.5" cy="29" r="1.5" fill="white" opacity="0.6"/>
                
                {/* Connection lines */}
                <line x1="8" y1="8" x2="17.5" y2="17.5" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="27" y1="8" x2="17.5" y2="17.5" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="8" y1="27" x2="17.5" y2="17.5" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="27" y1="27" x2="17.5" y2="17.5" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="17.5" y1="6" x2="17.5" y2="17.5" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="17.5" y1="29" x2="17.5" y2="17.5" stroke="white" strokeWidth="1.5" opacity="0.5"/>
            </svg>
        </div>
    );

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
            color: 'white',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden'
        },
        // Header with Custom Logo
        header: {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: 1000,
            backgroundColor: 'rgba(15, 15, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 0'
        },
        headerContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        logoText: {
            fontSize: '24px',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '1px'
        },
        navLinks: {
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0
        },
        navLink: {
            fontSize: '16px',
            fontWeight: '500',
            color: '#a0a0a0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: '8px 0',
            position: 'relative',
            textDecoration: 'none'
        },
        navLinkActive: {
            color: '#00ff87'
        },
        bubblesContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
        },
        bubble: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 255, 135, 0.3) 0%, rgba(96, 239, 255, 0.15) 50%, rgba(0, 255, 135, 0.05) 100%)',
            border: '2px solid rgba(0, 255, 135, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.1s ease-out',
            boxShadow: '0 0 20px rgba(0, 255, 135, 0.2), inset 0 0 20px rgba(0, 255, 135, 0.1)'
        },
        heroSection: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px'
        },
        heroContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 10
        },
        heroText: {
            flex: 1,
            maxWidth: '600px',
            opacity: 0,
            transform: 'translateY(50px)',
            animation: 'fadeInUp 1s ease-out 0.5s forwards'
        },
        heroIntro: {
            color: '#00ff87',
            fontSize: '1.2rem',
            marginBottom: '8px',
            fontWeight: '600'
        },
        heroTitle: {
            fontSize: '4rem',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '16px',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative'
        },
        cursor: {
            display: 'inline-block',
            width: '3px',
            height: '4rem',
            backgroundColor: '#00ff87',
            marginLeft: '2px',
            animation: isTyping ? 'blink 1s infinite' : 'none'
        },
        heroSubtitle: {
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#a0a0a0',
            marginBottom: '32px',
            minHeight: '60px'
        },
        subtitleCursor: {
            display: 'inline-block',
            width: '2px',
            height: '2.5rem',
            backgroundColor: '#00ff87',
            marginLeft: '2px',
            animation: 'blink 1s infinite'
        },
        heroDescription: {
            fontSize: '1.1rem',
            color: '#a0a0a0',
            lineHeight: '1.8',
            marginBottom: '32px',
            maxWidth: '600px'
        },
        profileImageContainer: {
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00ff87, #60efff)',
            padding: '3px',
            marginLeft: '48px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 255, 135, 0.3)',
            opacity: 0,
            transform: 'scale(0.8)',
            animation: 'scaleIn 1s ease-out 1s forwards'
        },
        profileImage: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.5s ease',
            filter: 'brightness(1.1) contrast(1.1)'
        },
        section: {
            padding: '80px 0',
            position: 'relative'
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '60px',
            color: '#00ff87',
            opacity: 0,
            transform: 'translateY(50px)',
            animation: 'fadeInUp 1s ease-out forwards'
        },
        // Skills Section - 4 Cards Layout
        skillsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
        },
        skillCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 135, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transform: 'translateY(20px)',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards'
        },
        skillCardTitle: {
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#00ff87',
            marginBottom: '20px'
        },
        skillItem: {
            color: '#ffffff',
            fontSize: '0.95rem',
            marginBottom: '12px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
        },
        // Projects Section - 3 Cards per row
        projectsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
        },
        projectCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 135, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            transition: 'all 0.4s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateY(20px)',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards'
        },
        projectTitle: {
            fontSize: '1.3rem',
            fontWeight: '700',
            color: '#00ff87',
            marginBottom: '16px'
        },
        projectBadge: {
            backgroundColor: 'rgba(0, 255, 135, 0.1)',
            color: '#00ff87',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            position: 'absolute',
            top: '16px',
            right: '16px',
            border: '1px solid rgba(0, 255, 135, 0.3)'
        },
        projectDescription: {
            color: '#b0b0b0',
            marginBottom: '20px',
            lineHeight: '1.6',
            fontSize: '0.95rem'
        },
        skillTags: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
        },
        skillTag: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: '500',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        // Experience Section
        experienceList: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 24px'
        },
        experienceItem: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 135, 0.2)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateY(20px)',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards'
        },
        experienceTitle: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#00ff87',
            marginBottom: '8px'
        },
        experienceCompany: {
            color: '#ffffff',
            marginBottom: '16px',
            fontSize: '1rem',
            fontWeight: '500'
        },
        experienceDescription: {
            color: '#b0b0b0',
            lineHeight: '1.7',
            fontSize: '0.95rem'
        },
        // Contact Section
        contactSection: {
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 24px'
        },
        contactCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 135, 0.2)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            margin: '40px auto 0',
            transform: 'translateY(20px)',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out forwards'
        },
        contactInfo: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '16px',
            color: '#b0b0b0',
            fontSize: '1rem'
        },
        primaryButton: {
            backgroundColor: 'rgba(0, 255, 135, 0.1)',
            color: '#00ff87',
            border: '2px solid #00ff87',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '20px'
        },
        footer: {
            padding: '40px 0',
            textAlign: 'center',
            color: '#666',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }
    };

    // Add CSS animations
    const cssAnimations = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        @keyframes bubbleFloat {
            0% { transform: translateY(0px) scale(1) rotate(0deg); }
            33% { transform: translateY(-15px) scale(1.05) rotate(120deg); }
            66% { transform: translateY(-10px) scale(0.95) rotate(240deg); }
            100% { transform: translateY(0px) scale(1) rotate(360deg); }
        }

        @keyframes bubblePulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
        }

        .skill-card:hover {
            transform: translateY(-8px) !important;
            border-color: rgba(0, 255, 135, 0.4) !important;
            box-shadow: 0 15px 40px rgba(0, 255, 135, 0.2) !important;
        }

        .project-card:hover {
            transform: translateY(-8px) !important;
            border-color: rgba(0, 255, 135, 0.4) !important;
            box-shadow: 0 15px 40px rgba(0, 255, 135, 0.2) !important;
        }

        .experience-card:hover {
            transform: translateY(-8px) !important;
            border-color: rgba(0, 255, 135, 0.4) !important;
            box-shadow: 0 15px 40px rgba(0, 255, 135, 0.2) !important;
        }

        .nav-link:hover {
            color: #00ff87 !important;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #00ff87;
            transition: width 0.3s ease;
        }

        .nav-link-active::after {
            width: 100%;
        }

        .primary-button:hover {
            background-color: #00ff87 !important;
            color: #0f0f23 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 10px 30px rgba(0, 255, 135, 0.3) !important;
        }

        .custom-logo:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 6px 25px rgba(147, 51, 234, 0.6) !important;
        }

        @media (max-width: 1024px) {
            .skills-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            .projects-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }

        @media (max-width: 768px) {
            .skills-grid {
                grid-template-columns: 1fr !important;
            }
            .projects-grid {
                grid-template-columns: 1fr !important;
            }
            .hero-content {
                flex-direction: column !important;
                text-align: center !important;
            }
            .profile-image-container {
                margin-left: 0 !important;
                margin-top: 32px !important;
            }
        }
    `;

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = cssAnimations;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div style={styles.container}>
            {/* Moving Bubbles Background */}
            <div style={styles.bubblesContainer}>
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        style={{
                            ...styles.bubble,
                            left: `${bubble.x}%`,
                            top: `${bubble.y}%`,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            opacity: bubble.opacity,
                            animation: `bubbleFloat ${4 + bubble.speed * 3}s ease-in-out infinite, bubblePulse ${2 + bubble.speed}s ease-in-out infinite alternate`
                        }}
                    />
                ))}
            </div>

            {/* Header with Custom Logo */}
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.logo}>
                        <div className="custom-logo">
                            <CustomLogo />
                        </div>
                        <span style={styles.logoText}>KSHITIJ</span>
                    </div>
                    <nav>
                        <ul style={styles.navLinks}>
                            {['Home', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                                <li key={item}>
                                    <button
                                        className={`nav-link ${activeSection === item.toLowerCase() ? 'nav-link-active' : ''}`}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        style={{
                                            ...styles.navLink,
                                            ...(activeSection === item.toLowerCase() ? styles.navLinkActive : {})
                                        }}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" style={styles.heroSection}>
                <div style={styles.heroContent} className="hero-content">
                    <div style={styles.heroText}>
                        <p style={styles.heroIntro}>
                            Hi, my name is
                        </p>
                        <h1 style={styles.heroTitle}>
                            {displayedText}
                            <span style={styles.cursor}></span>
                        </h1>
                        <h2 style={styles.heroSubtitle}>
                            {displayedSubtitle}
                            <span style={styles.subtitleCursor}></span>
                        </h2>
                        <p style={styles.heroDescription}>
                            I'm a passionate software developer who loves building modern, scalable applications.
                            I specialize in front-end and back-end technologies, creating seamless user experiences.
                            With expertise in Java, JavaScript, React.js, and Deployment Management, I develop efficient and elegant solutions.
                        </p>
                    </div>

                    <div style={styles.profileImageContainer} className="profile-image-container">
                        <img
                            src={kshitijImage}
                            alt="Kshitij Kumar"
                            style={styles.profileImage}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" style={styles.section}>
                <h2 style={styles.sectionTitle}>Skills</h2>
                <div style={styles.skillsGrid} className="skills-grid">
                    <div className="skill-card" style={{ ...styles.skillCard, animationDelay: '0s' }}>
                        <h3 style={styles.skillCardTitle}>Language / Database</h3>
                        <div style={styles.skillItem}>Java</div>
                        <div style={styles.skillItem}>JavaScript</div>
                        <div style={styles.skillItem}>Node.js</div>
                        <div style={styles.skillItem}>HTML5</div>
                        <div style={styles.skillItem}>MySQL</div>
                        <div style={styles.skillItem}>PostgreSQL</div>
                    </div>

                    <div className="skill-card" style={{ ...styles.skillCard, animationDelay: '0.2s' }}>
                        <h3 style={styles.skillCardTitle}>Framework / Library</h3>
                        <div style={styles.skillItem}>Spring Boot</div>
                        <div style={styles.skillItem}>React.js</div>
                    </div>

                    <div className="skill-card" style={{ ...styles.skillCard, animationDelay: '0.4s' }}>
                        <h3 style={styles.skillCardTitle}>Developer Tool</h3>
                        <div style={styles.skillItem}>Git</div>
                        <div style={styles.skillItem}>Docker</div>
                        <div style={styles.skillItem}>AWS</div>
                        <div style={styles.skillItem}>Jenkins</div>
                        <div style={styles.skillItem}>Maven</div>
                        <div style={styles.skillItem}>Gradle</div>
                    </div>

                    <div className="skill-card" style={{ ...styles.skillCard, animationDelay: '0.6s' }}>
                        <h3 style={styles.skillCardTitle}>Subject</h3>
                        <div style={styles.skillItem}>Software Engineering</div>
                        <div style={styles.skillItem}>Database Management</div>
                        <div style={styles.skillItem}>System Design</div>
                        <div style={styles.skillItem}>Web Development</div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" style={styles.section}>
                <h2 style={styles.sectionTitle}>Projects</h2>
                <div style={styles.projectsGrid} className="projects-grid">
                    <div className="project-card" style={{ ...styles.projectCard, animationDelay: '0s' }}>
                        <div style={styles.projectBadge}>Frontend</div>
                        <h3 style={styles.projectTitle}>Maharashtra University Health And Science (MUHS) Website</h3>
                        <p style={styles.projectDescription}>
                            A comprehensive university website showcasing programs, faculty, and student resources with modern design and seamless user experience.
                        </p>
                        <div style={styles.skillTags}>
                            <span style={styles.skillTag}>React.js</span>
                            <span style={styles.skillTag}>CSS</span>
                            <span style={styles.skillTag}>Framer Motion</span>
                            <span style={styles.skillTag}>Card</span>
                            <span style={styles.skillTag}>PDF Viewer</span>
                            <span style={styles.skillTag}>Video Streaming</span>
                        </div>
                    </div>

                    <div className="project-card" style={{ ...styles.projectCard, animationDelay: '0.2s' }}>
                        <div style={styles.projectBadge}>Full Stack</div>
                        <h3 style={styles.projectTitle}>Automation Maharashtra University Health And Science (MUHS)</h3>
                        <p style={styles.projectDescription}>
                            This project was developed for Maharashtra University of Health Sciences (MUHS) to automate various administrative workflows including student data management, faculty records, and examination processes.
                        </p>
                        <div style={styles.skillTags}>
                            <span style={styles.skillTag}>Java</span>
                            <span style={styles.skillTag}>Spring Boot</span>
                            <span style={styles.skillTag}>Micro-Services</span>
                            <span style={styles.skillTag}>PostgreSQL</span>
                            <span style={styles.skillTag}>React</span>
                            <span style={styles.skillTag}>HTML</span>
                            <span style={styles.skillTag}>CSS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    Work Experience
                </h2>
                <div style={styles.experienceList}>
                    {[
                        {
                            title: "Project Engineer",
                            company: "CDAC (Centre for Development of Advanced Computing)",
                            description: "Contributed to both the development and enhancement of the MUHS Automation System and the official MUHS Website. Responsibilities included building and maintaining microservice-based Java Spring Boot backends, designing responsive frontends using React.js, and implementing secure, scalable workflows for student, faculty, and exam management. Also integrated features like PDF viewing, video streaming, and dashboard analytics to improve usability."
                        },
                        {
                            title: "Project Associate",
                            company: "CDAC (Centre for Development of Advanced Computing)",
                            description: "Worked on the Automation System for Maharashtra University of Health Sciences (MUHS). Developed Java-based backend services using Spring Boot and PostgreSQL to digitize and automate internal university processes including faculty records, application tracking, and student data management. Contributed to building modular APIs and collaborated with frontend developers for seamless integration."
                        }
                    ].map((exp, index) => (
                        <div key={index} className="experience-card" style={{ ...styles.experienceItem, animationDelay: `${index * 0.2}s` }}>
                            <h3 style={styles.experienceTitle}>{exp.title}</h3>
                            <p style={styles.experienceCompany}>{exp.company}</p>
                            <p style={styles.projectDescription}>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={styles.section}>
                <div style={styles.contactSection}>
                    <h2 style={styles.sectionTitle}>
                        Get In Touch
                    </h2>
                    <div style={styles.contactCard}>
                        <p style={styles.heroDescription}>
                            Let's build something amazing together. Your ideas, my implementation.
                            I'm always interested in new opportunities and exciting projects.
                        </p>
                        <div style={styles.contactInfo}>
                            <span style={{ color: '#00ff87', fontSize: '1.5rem' }}>📧</span>
                            <span>kshitijkumar20@gmail.com</span>
                        </div>
                        <div style={styles.contactInfo}>
                            <span style={{ color: '#00ff87', fontSize: '1.5rem' }}>📱</span>
                            <span>+91 9560578771</span>
                        </div>
                        <button
                            className="primary-button"
                            style={styles.primaryButton}
                        >
                            Say Hello
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2024 Kshitij Kumar. Built with React & Advanced CSS.</p>
            </footer>
        </div>
    );
};

export default Header;