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

    // Artwork hover effects
    const artworkItems = document.querySelectorAll('.artwork-item');

    artworkItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            artworkItems.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.6';
                    other.style.transform = 'scale(0.98)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            artworkItems.forEach(other => {
                other.style.opacity = '1';
                other.style.transform = 'translateY(0)';
            });
        });
    });

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

    // For steps staggered animation
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
    });

    // For artwork staggered animation
    const artworks = document.querySelectorAll('.artwork-item');
    artworks.forEach((artwork, index) => {
        artwork.style.transitionDelay = `${index * 0.1}s`;
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
