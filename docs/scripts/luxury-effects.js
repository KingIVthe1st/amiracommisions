/**
 * Luxury Premium Effects
 * Custom-developed animations and interactions for high-end design
 */

// Initialize when document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize magnetic buttons
    initMagneticElements();
    
    // Initialize text splitting for refined typography animations
    initTextSplitting();
    
    // Add decorative shapes
    addLuxuryShapes();
    
    // Initialize section transitions
    initSectionTransitions();
    
    // Initialize particle backgrounds
    initParticles();
});

// Custom cursor implementation removed - using default browser cursor

// Magnetic elements that attract the cursor
function initMagneticElements() {
    // Add magnetic class to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.add('magnetic-button');
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate how far the cursor is from center (as a percentage)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Set the maximum movement distance (in pixels)
            const maxMovement = 15;
            
            // Calculate movement based on cursor position
            const moveX = (x / centerX) * maxMovement;
            const moveY = (y / centerY) * maxMovement;
            
            // Apply the transform
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            // Reset position when mouse leaves
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Text splitting for character-by-character animations
function initTextSplitting() {
    // Apply to headings
    const headings = document.querySelectorAll('h1, h2, .hero-subtitle');
    
    headings.forEach(heading => {
        // Skip if already processed
        if (heading.classList.contains('split-text')) return;
        
        heading.classList.add('split-text');
        
        // Get the text content and split into words
        const text = heading.textContent;
        const words = text.split(' ');
        heading.textContent = '';
        
        // For section titles, create a container for better centering
        if (heading.classList.contains('section-title')) {
            const container = document.createElement('div');
            container.classList.add('section-title-container');
            heading.appendChild(container);
            
            // Create spans for each word
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.classList.add('word');
                span.textContent = word;
                span.style.setProperty('--word-index', index);
                container.appendChild(span);
                
                // Don't add space after the last word
                if (index < words.length - 1) {
                    container.appendChild(document.createTextNode(' '));
                }
            });
        } else {
            // For non-section titles, add words directly
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.classList.add('word');
                span.textContent = word;
                span.style.setProperty('--word-index', index);
                heading.appendChild(span);
                
                // Don't add space after the last word
                if (index < words.length - 1) {
                    heading.appendChild(document.createTextNode(' '));
                }
            });
        }
        
        // Add the ornamental divider after the section title
        if (heading.classList.contains('section-title') && 
            (!heading.nextElementSibling || !heading.nextElementSibling.classList.contains('section-ornament'))) {
            const ornament = document.createElement('span');
            ornament.classList.add('section-ornament');
            heading.parentNode.insertBefore(ornament, heading.nextSibling);
        }
        
        // Set up intersection observer to reveal when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add revealed class to the title
                    entry.target.classList.add('revealed');
                    
                    // Also reveal the subtitle if it exists
                    const subtitle = entry.target.nextElementSibling;
                    if (subtitle && subtitle.classList.contains('section-subtitle')) {
                        setTimeout(() => {
                            subtitle.classList.add('revealed');
                        }, 300);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
        
        observer.observe(heading);
    });
    
    // Also setup observers for section subtitles
    document.querySelectorAll('.section-subtitle').forEach(subtitle => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        observer.observe(subtitle);
    });
}

// Add decorative shapes to sections
function addLuxuryShapes() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Only add shapes to even sections for contrast
        if (index % 2 === 0) {
            const circle = document.createElement('div');
            circle.classList.add('luxury-shape', 'shape-circle');
            circle.style.top = '10%';
            circle.style.right = '-150px';
            
            const square = document.createElement('div');
            square.classList.add('luxury-shape', 'shape-square');
            square.style.bottom = '10%';
            square.style.left = '-100px';
            
            section.appendChild(circle);
            section.appendChild(square);
        }
    });
}

// Create smooth transitions between sections
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Don't add to last section
        if (index < sections.length - 1) {
            const transition = document.createElement('div');
            transition.classList.add('section-transition');
            
            // Add dark class for sections with dark backgrounds
            if (section.classList.contains('testimonial-section')) {
                transition.classList.add('dark-section');
            }
            
            section.appendChild(transition);
        }
    });
}

// Initialize particle background in hero section
function initParticles() {
    // Create canvas for particles
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-js');
    particlesContainer.id = 'particles-js';
    hero.appendChild(particlesContainer);
    
    // Script will be loaded dynamically since particles.js is an external library
    // We'll simulate the effect with pure CSS for this project
    
    // Add small animated dots to the particle container
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(212, 175, 55, ' + (Math.random() * 0.2 + 0.1) + ')';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        
        // Add random animation
        const duration = Math.random() * 40 + 20;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        particle.style.animation = `float-particle ${duration}s infinite ease-in-out`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Add keyframe animation dynamically
        const keyframes = `
            @keyframes float-particle {
                0%, 100% {
                    transform: translate(0, 0);
                }
                50% {
                    transform: translate(${Math.random() * 40 * direction}px, ${Math.random() * 40}px);
                }
            }
        `;
        
        // Add style tag with keyframes
        if (!document.querySelector('#particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Apply subtle parallax to sections on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Parallax for artwork items
    document.querySelectorAll('.artwork-item').forEach((item, index) => {
        const speed = 0.03 + (index * 0.01);
        item.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
    
    // Enhanced hover effect for section titles
    document.querySelectorAll('.section-title').forEach(title => {
        // Skip parallax effect since we have more sophisticated animations now
        // Instead, add subtle glow effect on hover interaction
        if (title.classList.contains('revealed')) {
            // Track mouse position for subtle glow effect
            title.addEventListener('mousemove', (e) => {
                const rect = title.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                
                // Update glow position based on mouse
                title.style.setProperty('--x-position', `${x}px`);
                title.style.setProperty('--y-position', `${y}px`);
            });
        }
    });
});
