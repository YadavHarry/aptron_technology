
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic form validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '#28a745';
        }
    });

    // Email validation
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#dc3545';
    }

    // Phone validation (basic)
    const phoneField = document.getElementById('phone');
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phoneField.value)) {
        isValid = false;
        phoneField.style.borderColor = '#dc3545';
    }

    if (isValid) {
        // Simulate form submission
        setTimeout(() => {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            contactForm.reset();

            // Reset field border colors
            requiredFields.forEach(field => {
                field.style.borderColor = '#e9ecef';
            });
        }, 500);
    } else {
        // Scroll to first invalid field
        const firstInvalid = contactForm.querySelector('[style*="border-color: rgb(220, 53, 69)"]');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid.focus();
        }
    }
});

// Modal close function
function closeModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        closeModal();
    }
});

// Real-time form validation
const formInputs = contactForm.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#dc3545';
        } else if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.style.borderColor = emailRegex.test(this.value) ? '#28a745' : '#dc3545';
        } else if (this.type === 'tel' && this.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            this.style.borderColor = phoneRegex.test(this.value) ? '#28a745' : '#dc3545';
        } else if (this.value) {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = '#667eea';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe contact items and FAQ items
document.querySelectorAll('.contact-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Auto-fill demo data (for testing purposes)
function fillDemoData() {
    document.getElementById('firstName').value = 'John';
    document.getElementById('lastName').value = 'Doe';
    document.getElementById('email').value = 'john.doe@example.com';
    document.getElementById('phone').value = '+91 9876543210';
    document.getElementById('college').value = 'ABC Engineering College';
    document.getElementById('course').value = 'electronics';
    document.getElementById('year').value = '3rd';
    document.getElementById('interest').value = 'electronics-internship';
    document.getElementById('duration').value = '6-weeks';
    document.getElementById('message').value = 'I am interested in the electronics internship program and would like to know more about the curriculum and application process.';
}

// Uncomment the line below to auto-fill demo data for testing
// fillDemoData();
