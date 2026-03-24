// script.js
fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigationEffects();
    setupCardAnimations();
    setupAccessibilityFeatures();
}



// Card Animation Effects
function setupCardAnimations() {
    const cards = document.querySelectorAll('.symptom-card');
    
    // Add staggered animation on load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add click interaction
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Accessibility Features
function setupAccessibilityFeatures() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Screen reader announcements for dynamic content
    const cards = document.querySelectorAll('.symptom-card');
    cards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Smooth scrolling utility function
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Text-to-speech functionality (optional enhancement)
function readAloud(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slower rate for better comprehension
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Add reading assistance (can be activated by clicking on text)
document.addEventListener('DOMContentLoaded', function() {
    const readableElements = document.querySelectorAll('p, h1, h2, h3');
    
    readableElements.forEach(element => {
        element.addEventListener('dblclick', function() {
            readAloud(this.textContent);
        });
        
        // Add visual indicator that text can be read
        element.style.cursor = 'help';
        element.title = 'Double-click to read aloud';
    });
});

// Performance optimization: Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.symptom-card, .understanding-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize intersection observer when DOM is ready
document.addEventListener('DOMContentLoaded', setupIntersectionObserver);

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScrollTo,
        readAloud,
        setupNavigationEffects,
        setupCardAnimations
    };
}