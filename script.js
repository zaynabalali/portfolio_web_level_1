// Initialize EmailJS
//document.addEventListener('DOMContentLoaded', function() {
    // Replace with your EmailJS public key
    //emailjs.init("myhdWLG-0CeLFOHDJ");
//});

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
// Projects Data
const projectsData = [
    {
        title: "Small Portfolio",
        image: "images/html-logo.webp",
        description: "A simple portfolio project for beginners, featuring a single-page layout with placeholder information, focusing on...",
        tags: ["HTML", "CSS", "JavaScript"],
        links: {
            github: "https://github.com/zaynabalali",
            demo: "#"
        }
    },
    {
        title: "To Do List", 
        image: "images/css-logo.webp",
        description: "A user-friendly task manager with local storage, allowing task management with dark mode and smooth animations for a...",
        tags: ["HTML", "SCSS", "JavaScript"],
        links: {
            github: "https://github.com/zaynabalali",
            demo: "#"
        }
    },
    {
        title: "Snake Game",
        image: "images/javascript-logo.webp", 
        description: "A simple yet engaging Snake game built with OOP and Turtle. Features multiple food types appearing randomly and...",
        tags: ["Python", "Turtle", "OOP"],
        links: {
            github: "https://github.com/zaynabalali",
            demo: "#"
        }
    }
];

// Initialize phone input
const phoneInput = document.querySelector("#phone");
if (phoneInput) {
    window.intlTelInput(phoneInput, {
        preferredCountries: ["us", "gb"],
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    });
}
// Function to display skills
function displaySkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in';
        
        skillCard.innerHTML = `
            <img src="${skill.image}" alt="${skill.name}" class="skill-icon">
            <h3 class="skill-name">${skill.name}</h3>
        `;
        
        skillsContainer.appendChild(skillCard);
    });
}
// Navybits-compliant contact form handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values for validation
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    alert('Thank you! Your message has been sent successfully. I will respond within 24 hours.');
    
    // Reset form
    this.reset();
    
    // Reset character counter
    const charCounter = document.querySelector('.char-counter');
    if (charCounter) {
        charCounter.textContent = '0/300 words';
        charCounter.style.color = 'var(--gray)';
    }
});

// Call functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    displaySkills();
    displayProjects();
});

// Function to display projects
function displayProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
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
                    <a href="${project.links.demo}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}
// Smooth scrolling for navigation links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
    });
});
// Form validation and character counter
const messageTextarea = document.getElementById('message');
const charCounter = document.querySelector('.char-counter');

if (messageTextarea && charCounter) {
    messageTextarea.addEventListener('input', function() {
        const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
        charCounter.textContent = `${words.length}/300 words`;
        
        if (words.length > 300) {
            charCounter.style.color = 'red';
        } else {
            charCounter.style.color = 'var(--gray)';
        }
    });
}

// Form validation and submission will be added later 