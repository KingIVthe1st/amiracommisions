document.addEventListener('DOMContentLoaded', () => {
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

    // Form handling
    const commissionForm = document.getElementById('commission-form');

    if (commissionForm) {
        commissionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = commissionForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }

            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            alert('Thank you for your inquiry! We will contact you soon.');
            commissionForm.reset();
        });
    }
});
