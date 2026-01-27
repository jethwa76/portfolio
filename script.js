// ============================================
// DOM Elements
// ============================================

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const scrollTop = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const typingText = document.getElementById('typingText');
const particlesCanvas = document.getElementById('particlesCanvas');

// ============================================
// Theme Management
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ============================================
// Mobile Navigation
// ============================================

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    mobileToggle.setAttribute(
        'aria-expanded',
        navLinks.classList.contains('active')
    );
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Typing Animation
// ============================================

const roles = [
    'Computer Engineering Student',
    'Web Developer',
    'UI/UX Enthusiast',
    'JAVA Developer',
    'PYTHON Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
typeRole();

// ============================================
// Particles Animation
// ============================================

function initParticles() {
    const canvas = particlesCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            const theme = document.documentElement.getAttribute('data-theme');
            const color = theme === 'dark' ? '230, 238, 243' : '10, 10, 10';
            
            ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect particles
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    function connectParticles() {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'dark' ? '230, 238, 243' : '10, 10, 10';
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    animate();
}

// Initialize particles
initParticles();

// ============================================
// Skills Progress Animation
// ============================================

function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}

animateSkills();

// ============================================
// Project Filtering
// ============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all') {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.display = 'block';
                }, 10);
            } else if (categories.includes(filter)) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.display = 'block';
                }, 10);
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// Project Modal
// ============================================

const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

const projectDetails = {
    'qr-project': {
        title: 'QR Code Scanner & Generator',
        description: 'A comprehensive Java-based application that allows users to scan existing QR codes and generate new ones. The application features a modern GUI built with Java Swing and uses the ZXing library for QR code processing.',
        image: 'assets/project-qr.jpg',
        features: [
            'Scan QR codes from images or camera',
            'Generate custom QR codes with text or URLs',
            'Save generated QR codes as image files',
            'User-friendly graphical interface',
            'Real-time QR code validation',
            'Support for multiple QR code formats'
        ],
        techStack: ['Java', 'Swing', 'ZXing Library', 'AWT'],
        github: '#',
        demo: '#'
    },
    'todo-project': {
        title: 'To-Do List Application',
        description: 'A responsive and intuitive web-based to-do list application that helps users manage their daily tasks efficiently. The app features local storage persistence, ensuring tasks are saved even after closing the browser.',
        image: 'assets/project-todo.jpg',
        features: [
            'Add, edit, and delete tasks',
            'Mark tasks as complete',
            'Filter tasks by status (all, active, completed)',
            'Local storage for data persistence',
            'Responsive design for all devices',
            'Clean and minimalist UI'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage API'],
        github: '#',
        demo: '#'
    },
    'calculator-project': {
        title: 'Basic Calculator',
        description: 'A clean and functional calculator application with a modern interface. Supports all standard arithmetic operations and features a responsive design that works perfectly on all devices.',
        image: 'assets/project-calculator.jpg',
        features: [
            'Basic arithmetic operations (+, -, ×, ÷)',
            'Clear and delete functions',
            'Decimal number support',
            'Keyboard input support',
            'Error handling',
            'Responsive design'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript'],
        github: '#',
        demo: '#'
    },
    'food-project': {
        title: 'Food Waste Management System',
        description: 'A comprehensive system designed to help reduce food waste in communities. The application connects food donors with recipients and provides analytics on food waste reduction.',
        image: 'assets/project-food.jpg',
        features: [
            'User registration for donors and recipients',
            'Food donation listing and management',
            'Real-time notification system',
            'Analytics dashboard',
            'Location-based matching',
            'Database-driven architecture'
        ],
        techStack: ['Java', 'MySQL', 'JDBC', 'Java Swing'],
        github: '#',
        demo: '#'
    }
};

function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 1rem; margin-bottom: 2rem;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.8;">${project.description}</p>
        
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">Key Features</h3>
        <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
            ${project.features.map(feature => `
                <li style="padding: 0.5rem 0; color: var(--text-secondary); display: flex; align-items: start; gap: 0.75rem;">
                    <i class="fas fa-check-circle" style="color: var(--accent-color); margin-top: 0.25rem; flex-shrink: 0;"></i>
                    <span>${feature}</span>
                </li>
            `).join('')}
        </ul>
        
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">Tech Stack</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
            ${project.techStack.map(tech => `
                <span class="tag">${tech}</span>
            `).join('')}
        </div>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${project.demo}" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${project.github}" class="btn btn-outline">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ============================================
// Contact Form Validation & Submission
// ============================================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const honeypot = contactForm.querySelector('[name="honeypot"]').value;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validation
    let isValid = true;
    
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Please enter a valid name (at least 2 characters)';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (subject.length < 3) {
        document.getElementById('subjectError').textContent = 'Please enter a subject (at least 3 characters)';
        isValid = false;
    }
    
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Please enter a message (at least 10 characters)';
        isValid = false;
    }
    
    // Check honeypot (spam protection)
    if (honeypot !== '') {
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend call)
    try {
        // This is where you would make an API call to your backend
        // For demonstration, we'll simulate a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        const formStatus = document.getElementById('formStatus');
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
        
    } catch (error) {
        // Error
        const formStatus = document.getElementById('formStatus');
        formStatus.textContent = 'Oops! Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
    } finally {
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// ============================================
// Scroll to Top Button
// ============================================

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================

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

// Observe all sections for fade-in animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ============================================
// Active Navigation Link on Scroll
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
});

// ============================================
// Timeline Progress Animation
// ============================================

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.timeline-progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const progressTimeline = document.querySelector('.progress-timeline');
if (progressTimeline) {
    timelineObserver.observe(progressTimeline);
}

// ============================================
// Prevent Default on Hash Links
// ============================================

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ============================================
// Initialize Everything on Load
// ============================================

window.addEventListener('load', () => {
    initTheme();
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Preload images for better UX
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
});

// ============================================
// Accessibility: Focus Management
// ============================================

// Trap focus in modal
projectModal.addEventListener('keydown', (e) => {
    if (!projectModal.classList.contains('active')) return;
    
    if (e.key === 'Tab') {
        const focusableElements = projectModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// ============================================
// Performance: Debounce Resize Events
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250));

// ============================================
// Console Message
// ============================================

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #0F62FE;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #00BFA6;');
console.log('%chttps://github.com/yourusername', 'font-size: 12px; color: #5A5A5A;');