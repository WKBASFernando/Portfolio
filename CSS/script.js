document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu setup
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when nav links are clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Scroll animation functions
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    function handleScrollAnimations() {
        // Handle .reveal elements
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
        
        // Handle scroll-animation elements
        const scrollAnimationElements = document.querySelectorAll('.scroll-animation, .scroll-fade-in, .scroll-fade-up, .scroll-fade-right, .scroll-fade-left');
        scrollAnimationElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run once on load
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
});