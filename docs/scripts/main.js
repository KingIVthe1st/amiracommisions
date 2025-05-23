document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth artwork transitions are now handled entirely by CSS
    // No JavaScript manipulation needed for artwork hover effects

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    // Observe all sections and elements with animation classes
    document.querySelectorAll('section, .step, .artwork-item, .glass-panel').forEach(item => {
        item.classList.add('fade-in');
        appearOnScroll.observe(item);
    });
    // No movement/transform is applied to .artwork-item on scroll or reveal.

    // For steps staggered animation
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
    });

    // Initialize artwork items with a subtle fade-in (no movement)
    const artworks = document.querySelectorAll('.artwork-item');
    artworks.forEach((artwork, index) => {
        // Add a very small delay for initial fade in only
        artwork.style.animationDelay = `${index * 0.05}s`;
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        }
    });
});

// Add CSS class when document is fully loaded
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
    
    // Add fade-in animation to body
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(item => {
            item.classList.add('appear');
        });
    }, 300);
});
