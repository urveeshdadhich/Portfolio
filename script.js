// DOM Elements
const body = document.body;
const modeToggle = document.getElementById('mode-toggle');
const toggleOptions = document.querySelectorAll('.toggle-option');
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const closeMenu = document.querySelector('.close-menu');
const projectCards = document.querySelectorAll('.project-card');
const heroElements = document.querySelectorAll('.hero h1, .bio, .location');
const workProjects = document.querySelector('.work-projects');
const playProjects = document.querySelector('.play-projects');

// State
let currentMode = 'work'; // Default mode

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active state for toggle
    toggleOptions.forEach(option => {
        if (option.dataset.mode === currentMode) {
            option.classList.add('active');
        }
    });
    
    // Initialize animations
    initAnimations();
    
    // Initialize intersection observer for project cards
    initIntersectionObserver();
});

// Mode Toggle Functionality
if (modeToggle) {
    modeToggle.addEventListener('click', (e) => {
        const clickedOption = e.target.closest('.toggle-option');
        
        if (clickedOption && clickedOption.dataset.mode !== currentMode) {
            // Update mode
            currentMode = clickedOption.dataset.mode;
            
            // Update active classes
            toggleOptions.forEach(option => {
                option.classList.remove('active');
            });
            clickedOption.classList.add('active');
            
            // Toggle body class
            body.classList.remove('work-mode', 'play-mode');
            body.classList.add(`${currentMode}-mode`);
            
            // Animate content change
            animateModeChange();
        }
    });
}

// Side Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-open');
    sideMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Close Side Menu
if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        menuToggle.classList.remove('menu-open');
        sideMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
}

// Close side menu when clicking on a link
const sideMenuLinks = document.querySelectorAll('.side-menu-link');
sideMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('menu-open');
        sideMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.startsWith('http') || targetId.includes('.html')) return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations
function initAnimations() {
    // Hero elements animation
    heroElements.forEach((el, index) => {
        // Reset animation to ensure it plays again
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
    });
    
    // Project cards animation with staggered delay
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
    });
}

// Animate mode change
function animateModeChange() {
    // Prepare for transition
    const projectsSection = document.getElementById('projects-section');
    
    if (currentMode === 'work') {
        // Switch from play to work
        playProjects.style.opacity = '0';
        
        setTimeout(() => {
            workProjects.style.opacity = '0';
            workProjects.style.visibility = 'visible';
            workProjects.style.position = 'relative';
            workProjects.style.height = 'auto';
            
            // Force reflow
            workProjects.offsetHeight;
            
            // Fade in work projects
            workProjects.style.opacity = '1';
            
            // Reset project cards animation
            const workCards = workProjects.querySelectorAll('.project-card');
            workCards.forEach((card, index) => {
                card.classList.remove('in-view');
                setTimeout(() => {
                    card.classList.add('in-view');
                }, 100 + (index * 100));
            });
        }, 300);
    } else {
        // Switch from work to play
        workProjects.style.opacity = '0';
        
        setTimeout(() => {
            playProjects.style.opacity = '0';
            playProjects.style.visibility = 'visible';
            playProjects.style.position = 'relative';
            playProjects.style.height = 'auto';
            
            // Force reflow
            playProjects.offsetHeight;
            
            // Fade in play projects
            playProjects.style.opacity = '1';
            
            // Reset project cards animation
            const playCards = playProjects.querySelectorAll('.project-card');
            playCards.forEach((card, index) => {
                card.classList.remove('in-view');
                setTimeout(() => {
                    card.classList.add('in-view');
                }, 100 + (index * 100));
            });
        }, 300);
    }
    
    // Animate hero elements
    heroElements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Handle initial animations on page load
window.addEventListener('load', () => {
    // Add animation classes to project cards with staggered delay
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('in-view');
        }, 500 + (index * 100));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuContent = document.querySelector(".menu-content");
    const closeMenu = document.querySelector(".close-menu");

    // Toggle dropdown menu when the hamburger button is clicked
    menuToggle.addEventListener("click", () => {
        menuContent.classList.toggle("active");
    });

    // Close dropdown menu when the close button is clicked
    closeMenu.addEventListener("click", () => {
        menuContent.classList.remove("active");
    });

    // Close dropdown menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!menuContent.contains(event.target) && !menuToggle.contains(event.target)) {
            menuContent.classList.remove("active");
        }
    });

    // Smooth scroll for "About" link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#" || targetId.startsWith("mailto:")) return; // Skip email links

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust offset if needed
                    behavior: "smooth",
                });
            }
        });
    });
});

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const { clientX: mouseX, clientY: mouseY } = e;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05; // Adjust speed based on shape index
        const x = (window.innerWidth / 2 - mouseX) * speed;
        const y = (window.innerHeight / 2 - mouseY) * speed;

        shape.style.transform = `translate(${x}px, ${y}px) rotate(15deg)`;
    });
});

document.addEventListener('mousemove', (e) => {
    const playModeShapes = document.querySelectorAll('.play-shape');
    const { clientX: mouseX, clientY: mouseY } = e;

    playModeShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05; // Adjust speed based on shape index
        const x = (window.innerWidth / 2 - mouseX) * speed;
        const y = (window.innerHeight / 2 - mouseY) * speed;

        shape.style.transform = `translate(${x}px, ${y}px) rotate(15deg)`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const shapes = document.querySelectorAll(".shape, .play-shape");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        shapes.forEach((shape, index) => {
            const scatterDistance = 150 + index * 30; // Vary the scatter distance for each shape
            const angle = (index * 36) % 360; // Spread shapes in different directions
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * scatterDistance;
            const y = Math.sin(radians) * scatterDistance;

            // Apply scatter effect
            shape.style.transform = `translate(${x}px, ${y}px) scale(0.8)`;
            shape.style.opacity = "0.5";
        });

        // Reset shapes when scrolling back to the top
        if (scrollY === 0) {
            shapes.forEach((shape) => {
                shape.style.transform = "translate(0, 0) scale(1)";
                shape.style.opacity = "1";
            });
        }
    });
});