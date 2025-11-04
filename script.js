// Skills Data
const skillsData = [
    {
        name: "HTML",
        image: "images/html-logo.webp"
    },
    {
        name: "CSS", 
        image: "images/css-logo.webp"
    },
    {
        name: "JavaScript",
        image: "images/javascript-logo.webp"
    },
    {
        name: "Node.js",
        image: "images/node-logo.webp"
    },
    {
        name: "React.js",
        image: "images/react-logo.webp"
    }
];

// Projects Data
const projectsData = [
    {
        title: "Small Portfolio",
        description: "A simple portfolio project for beginners, featuring a single-page layout with placeholder information, focusing on responsive design and clean aesthetics.",
        tags: ["HTML", "CSS", "JavaScript"],
        links: {
            github: "https://github.com/zaynabalali",
            demo: "#"
        }
    },
    {
        title: "To Do List",
        description: "A user-friendly task manager with local storage, allowing task management with dark mode and smooth animations for an enhanced user experience.",
        tags: ["HTML", "SCSS", "JavaScript"],
        links: {
            github: "https://github.com/zaynabalali",
            demo: "#"
        }
    },
    {
        title: "Snake Game",
        description: "A simple yet engaging Snake game built with OOP and Turtle. Features multiple food types appearing randomly and score tracking functionality.",
        tags: ["Python", "Turtle", "OOP"],
        links: {
            github: "https://github.com/zaynabalali",
            demo: "#"
        }
    }
];

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contact-form');
const messageTextarea = document.getElementById('message');
const charCounter = document.querySelector('.char-counter');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);

    // Initialize components
    displaySkills();
    displayProjects();
    setupEventListeners();
    setupIntersectionObserver();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Scroll event for back to top button
    window.addEventListener('scroll', toggleBackToTop);
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Message character counter
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', updateCharacterCounter);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card, .testimonial-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

// Back to top functions
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling function
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        const headerHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Display skills
function displaySkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        skillCard.innerHTML = `
            <img src="${skill.image}" alt="${skill.name}" class="skill-icon" loading="lazy">
            <h3 class="skill-name">${skill.name}</h3>
        `;
        
        skillsContainer.appendChild(skillCard);
    });
}

// Display projects
function displayProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.title}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.links.github}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.links.demo}" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Contact form handling
// Contact form handling for Netlify Forms
// Contact form handling (EmailJS)
function handleFormSubmit(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    const formData = {
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Validate input
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Send the email
    emailjs.init("5mo1V_OMmEQvKkOKs");
    emailjs.send("service_zbmjari", "template_9l680cr", {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
    })
    .then(() => {
        showNotification('✅ Message sent successfully! I’ll get back to you soon.', 'success');
        contactForm.reset();
        updateCharacterCounter();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        showNotification('⚠️ Failed to send message. Please try again later.', 'error');
    })
    .finally(() => {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    });
}
// Character counter for message textarea
function updateCharacterCounter() {
    const words = messageTextarea.value.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    charCounter.textContent = `${wordCount}/300 words`;
    
    if (wordCount > 300) {
        charCounter.classList.add('warning');
    } else {
        charCounter.classList.remove('warning');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    return colors[type] || '#3498db';
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = 'Come back! 👋 - Zaynab Alali';
    } else {
        document.title = 'Zaynab Alali - Portfolio';
    }
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }, 0);
    });
}