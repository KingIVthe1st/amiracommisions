/**
 * Luxury Premium Effects
 * Custom-developed animations and interactions for high-end design
 */

// Initialize when document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Create and append custom cursor elements
    initCustomCursor();
    
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

// Custom cursor implementation
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    
    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    // Add noise texture to background
    const noise = document.createElement('div');
    noise.classList.add('noise-bg');
    document.body.appendChild(noise);
    
    // Set initial position off-screen
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let followerX = -100;
    let followerY = -100;
    
    // After a small delay, show the cursor
    setTimeout(() => {
        cursor.classList.add('cursor-active');
        follower.classList.add('cursor-active');
    }, 1000);
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Check if cursor is over interactive elements
    document.addEventListener('mouseover', (e) => {
        if (
            e.target.tagName === 'A' || 
            e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('artwork-item') || 
            e.target.closest('.btn') || 
            e.target.closest('.artwork-item')
        ) {
            follower.classList.add('cursor-hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (
            e.target.tagName === 'A' || 
            e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('artwork-item') || 
            e.target.closest('.btn') || 
            e.target.closest('.artwork-item')
        ) {
            follower.classList.remove('cursor-hover');
        }
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Smooth cursor movement with easing
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

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
        
        // Get the text content and split into characters
        const text = heading.textContent;
        heading.textContent = '';
        
        // Create spans for each character
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.classList.add('char');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--char-index', i);
            heading.appendChild(span);
        }
        
        // Set up intersection observer to reveal when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
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
    
    // Parallax for section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const rect = title.getBoundingClientRect();
        const centerPoint = window.innerHeight / 2;
        const distanceFromCenter = rect.top - centerPoint;
        
        // Only apply parallax when near viewport center
        if (Math.abs(distanceFromCenter) < window.innerHeight) {
            title.style.transform = `translateY(${distanceFromCenter * -0.05}px)`;
        }
    });
});
