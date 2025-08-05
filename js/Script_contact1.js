// Mail Compose Redirect Functionality
// This file handles redirecting to mail compose with pre-filled form data

// Configuration
const RECIPIENT_EMAIL = 'aptrontech@gmail.com';

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
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
    }
});

// Function to encode text for URL
function encodeForURL(text) {
    return encodeURIComponent(text || '');
}

// Function to create email subject
function createEmailSubject(formData) {
    const name = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
    const interest = formData.interest || 'General Inquiry';
    
    return `Contact Form Submission - ${name} - ${interest}`;
}

// Function to create email body
function createEmailBody(formData) {
    const lines = [
        'Hello,',
        '',
        'I am contacting you through your website contact form. Here are my details:',
        '',
        '--- PERSONAL INFORMATION ---',
        `Name: ${formData.firstName || ''} ${formData.lastName || ''}`,
        `Email: ${formData.email || ''}`,
        `Phone: ${formData.phone || ''}`,
        `College/Institution: ${formData.college || 'Not specified'}`,
        '',
        '--- ACADEMIC INFORMATION ---',
        `Course/Branch: ${formData.course || 'Not specified'}`,
        `Current Year: ${formData.year || 'Not specified'}`,
        '',
        '--- INTEREST & REQUIREMENTS ---',
        `Area of Interest: ${formData.interest || 'Not specified'}`,
        `Preferred Duration: ${formData.duration || 'Not specified'}`,
        '',
        '--- MESSAGE ---',
        formData.message || 'No additional message provided.',
        '',
        '--- ADDITIONAL INFO ---',
        `Form submitted on: ${new Date().toLocaleString()}`,
        `User Agent: ${navigator.userAgent}`,
        '',
        'Please get back to me at your earliest convenience.',
        '',
        'Best regards,',
        `${formData.firstName || ''} ${formData.lastName || ''}`,
        formData.email || ''
    ];

    return lines.join('\n');
}

// Function to open mail compose
function openMailCompose(formData) {
    const subject = createEmailSubject(formData);
    const body = createEmailBody(formData);
    
    // Create mailto URL
    const mailtoURL = `mailto:${RECIPIENT_EMAIL}?subject=${encodeForURL(subject)}&body=${encodeForURL(body)}`;
    
    // Check if URL is too long (some email clients have limits)
    if (mailtoURL.length > 2000) {
        // Fallback with shorter body
        const shortBody = [
            'Hello,',
            '',
            `Name: ${formData.firstName || ''} ${formData.lastName || ''}`,
            `Email: ${formData.email || ''}`,
            `Phone: ${formData.phone || ''}`,
            `Interest: ${formData.interest || ''}`,
            '',
            'Message:',
            formData.message || '',
            '',
            'Please contact me for more details.',
            '',
            'Best regards,',
            `${formData.firstName || ''} ${formData.lastName || ''}`
        ].join('\n');
        
        const shortMailtoURL = `mailto:${RECIPIENT_EMAIL}?subject=${encodeForURL(subject)}&body=${encodeForURL(shortBody)}`;
        window.open(shortMailtoURL, '_blank');
    } else {
        window.open(mailtoURL, '_blank');
    }
}

// Alternative function for Gmail compose
function openGmailCompose(formData) {
    const subject = createEmailSubject(formData);
    const body = createEmailBody(formData);
    
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeForURL(RECIPIENT_EMAIL)}&su=${encodeForURL(subject)}&body=${encodeForURL(body)}`;
    
    window.open(gmailURL, '_blank');
}

// Alternative function for Outlook compose
function openOutlookCompose(formData) {
    const subject = createEmailSubject(formData);
    const body = createEmailBody(formData);
    
    const outlookURL = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeForURL(RECIPIENT_EMAIL)}&subject=${encodeForURL(subject)}&body=${encodeForURL(body)}`;
    
    window.open(outlookURL, '_blank');
}

// Function to show email client selection modal
function showEmailClientModal(formData) {
    // Create modal HTML
    const modalHTML = `
        <div id="emailClientModal" class="email-client-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                width: 90%;
                text-align: center;
            ">
                <h3 style="margin-bottom: 20px; color: #333;">Choose Email Client</h3>
                <p style="margin-bottom: 25px; color: #666;">Select how you'd like to send your message:</p>
                
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button id="defaultMailBtn" class="email-btn" style="
                        padding: 12px 20px;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background 0.3s;
                    ">📧 Default Mail App</button>
                    
                    <button id="gmailBtn" class="email-btn" style="
                        padding: 12px 20px;
                        background: #db4437;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background 0.3s;
                    ">📮 Gmail</button>
                    
                    <button id="outlookBtn" class="email-btn" style="
                        padding: 12px 20px;
                        background: #0078d4;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background 0.3s;
                    ">📨 Outlook</button>
                    
                    <button id="copyInfoBtn" class="email-btn" style="
                        padding: 12px 20px;
                        background: #28a745;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background 0.3s;
                    ">📋 Copy Information</button>
                </div>
                
                <button id="closeModalBtn" style="
                    margin-top: 20px;
                    background: transparent;
                    border: 1px solid #ccc;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    color: #666;
                ">Cancel</button>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('emailClientModal');
    
    // Add event listeners
    document.getElementById('defaultMailBtn').addEventListener('click', () => {
        openMailCompose(formData);
        modal.remove();
    });
    
    document.getElementById('gmailBtn').addEventListener('click', () => {
        openGmailCompose(formData);
        modal.remove();
    });
    
    document.getElementById('outlookBtn').addEventListener('click', () => {
        openOutlookCompose(formData);
        modal.remove();
    });
    
    document.getElementById('copyInfoBtn').addEventListener('click', () => {
        copyFormDataToClipboard(formData);
        modal.remove();
    });
    
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add hover effects
    document.querySelectorAll('.email-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.opacity = '0.9';
            btn.style.transform = 'translateY(-1px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        });
    });
}

// Function to copy form data to clipboard
async function copyFormDataToClipboard(formData) {
    const emailContent = `
To: ${RECIPIENT_EMAIL}
Subject: ${createEmailSubject(formData)}

${createEmailBody(formData)}
    `.trim();
    
    try {
        await navigator.clipboard.writeText(emailContent);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '✅ Information copied to clipboard!';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
        
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Information copied to clipboard!');
    }
}

// Form Validation and Mail Redirect
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic form validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        const formData = {};

        // Collect form data and validate
        const formElements = contactForm.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
            formData[element.name] = element.value;
        });

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
        if (emailField) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#dc3545';
            }
        }

        // Phone validation
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phoneField.value)) {
                isValid = false;
                phoneField.style.borderColor = '#dc3545';
            }
        }

        if (isValid) {
            // Show email client selection modal
            showEmailClientModal(formData);
            
            // Optional: Reset form after showing modal
            // contactForm.reset();
            // requiredFields.forEach(field => {
            //     field.style.borderColor = '#e9ecef';
            // });
        } else {
            // Scroll to first invalid field
            const firstInvalid = contactForm.querySelector('[style*="border-color: rgb(220, 53, 69)"]');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        }
    });
}

// Real-time form validation
const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

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
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const college = document.getElementById('college');
    const course = document.getElementById('course');
    const year = document.getElementById('year');
    const interest = document.getElementById('interest');
    const duration = document.getElementById('duration');
    const message = document.getElementById('message');

    if (firstName) firstName.value = 'John';
    if (lastName) lastName.value = 'Doe';
    if (email) email.value = 'john.doe@example.com';
    if (phone) phone.value = '+91 9876543210';
    if (college) college.value = 'ABC Engineering College';
    if (course) course.value = 'electronics';
    if (year) year.value = '3rd';
    if (interest) interest.value = 'electronics-internship';
    if (duration) duration.value = '6-weeks';
    if (message) message.value = 'I am interested in the electronics internship program and would like to know more about the curriculum and application process.';
}

// Quick test function (uncomment to use)
// fillDemoData();

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openMailCompose,
        openGmailCompose,
        openOutlookCompose,
        copyFormDataToClipboard,
        createEmailSubject,
        createEmailBody
    };
}