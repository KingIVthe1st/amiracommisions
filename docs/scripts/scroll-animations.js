/**
 * Scroll Animations for Neumorphic Elements
 * Handles the visibility transitions for the neumorphic and frosted glass elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the intersection observer for revealing elements on scroll
    initScrollObserver();
    
    // Initially show elements that are already in view
    document.querySelectorAll('.step, .testimonial-wrapper, .glass-panel').forEach(element => {
        element.classList.add('is-visible');
    });
});

function initScrollObserver() {
    // Select all the elements we want to observe
    const elements = document.querySelectorAll('.step, .testimonial-wrapper, .glass-panel');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        // For each entry
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the is-visible class
                entry.target.classList.add('is-visible');
                
                // Stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options
        threshold: 0.2, // When 20% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Bottom margin to trigger slightly earlier
    });
    
    // Start observing each element
    elements.forEach(element => {
        observer.observe(element);
    });
}
