// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe section titles
    document.querySelectorAll('section h1').forEach(title => {
        observer.observe(title);
    });

    // Observe home section elements
    document.querySelectorAll('#home > div').forEach(element => {
        observer.observe(element);
    });

    // Observe about section elements
    document.querySelectorAll('.about-image, .about-content').forEach(element => {
        observer.observe(element);
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe education items
    document.querySelectorAll('.education-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe project items
    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.3}s`;
        observer.observe(item);
    });

    // Observe contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe scroll to top button
    observer.observe(document.querySelector('.scroll-to-top'));
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Show/hide scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
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

// Add hover effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h1');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is visible
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    statObserver.unobserve(entry.target);
                }
            });
        });
        
        statObserver.observe(counter.closest('.stat-item'));
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add typing effect to main heading
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when home section is visible
const homeTitle = document.querySelector('#home h1');
const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                typeWriter(homeTitle, 'From Imagination to Illusion: Making the Unreal Real', 50);
            }, 500);
            homeObserver.unobserve(entry.target);
        }
    });
});

if (homeTitle) {
    homeObserver.observe(homeTitle);
}