fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });


// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    addEventListeners();
    addAnimations();
});

// Initialize the page
function initializePage() {
    console.log('ADHD Information Page Initialized');
    
    // Add accessibility attributes
    addAccessibilityAttributes();
    
    // Set up intersection observer for animations
    setupScrollAnimations();
}

// Add event listeners
function addEventListeners() {
    // Symptom cards click handlers
    const symptomCards = document.querySelectorAll('.symptom-card');
    symptomCards.forEach(card => {
        card.addEventListener('click', handleSymptomCardClick);
        card.addEventListener('keydown', handleSymptomCardKeydown);
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
    
    // Understanding card click handler
    const understandingCard = document.querySelector('.understanding-card');
    if (understandingCard) {
        understandingCard.addEventListener('click', handleUnderstandingCardClick);
    }
    
    // Add smooth scroll behavior for any internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

// Event handlers
function handleSymptomCardClick(e) {
    const card = e.currentTarget;
    const cardType = getCardType(card);
    
    // Add a visual feedback
    addClickFeedback(card);
    
    // Log interaction for analytics (in a real app)
    console.log(`Symptom card clicked: ${cardType}`);
    
    // Could expand card or show more details
    showSymptomDetails(cardType, card);
}

function handleSymptomCardKeydown(e) {
    // Handle Enter and Space key for accessibility
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSymptomCardClick(e);
    }
}

function handleUnderstandingCardClick(e) {
    console.log('Understanding ADHD card clicked');
    addClickFeedback(e.currentTarget);
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Helper functions
function getCardType(card) {
    if (card.classList.contains('inattention')) return 'Inattention';
    if (card.classList.contains('hyperactivity')) return 'Hyperactivity';
    if (card.classList.contains('impulsivity')) return 'Impulsivity';
    return 'Unknown';
}

function addClickFeedback(element) {
    // Add a temporary class for visual feedback
    element.classList.add('clicked');
    
    // Create a ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove the ripple and feedback class after animation
    setTimeout(() => {
        element.classList.remove('clicked');
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function showSymptomDetails(cardType, cardElement) {
    // Create detailed information based on card type
    const details = getSymptomDetails(cardType);
    
    // Create a modal or expanded view (simplified version)
    const existingDetails = cardElement.querySelector('.symptom-details');
    
    if (existingDetails) {
        // Toggle existing details
        existingDetails.style.display = existingDetails.style.display === 'none' ? 'block' : 'none';
    } else {
        // Create new details section
        const detailsElement = document.createElement('div');
        detailsElement.className = 'symptom-details';
        detailsElement.innerHTML = `
            <div class="details-content">
                <h4>More about ${cardType}:</h4>
                <p>${details}</p>
            </div>
        `;
        
        detailsElement.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            font-size: 0.9rem;
            line-height: 1.5;
            animation: fadeIn 0.3s ease-out;
        `;
        
        cardElement.appendChild(detailsElement);
    }
}

function getSymptomDetails(cardType) {
    const details = {
        'Inattention': 'May include difficulty sustaining attention, making careless mistakes, not listening, losing things, and being easily distracted.',
        'Hyperactivity': 'Often involves fidgeting, difficulty remaining seated, running or climbing excessively, and feeling restless.',
        'Impulsivity': 'Includes difficulty waiting turns, interrupting others, making hasty decisions without considering consequences.'
    };
    
    return details[cardType] || 'Learn more about ADHD symptoms and management strategies.';
}

function addAccessibilityAttributes() {
    // Add ARIA labels and roles
    const symptomCards = document.querySelectorAll('.symptom-card');
    symptomCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${getCardType(card)} symptoms`);
    });
    
    // Add landmark roles
    const header = document.querySelector('.page-header');
    if (header) {
        header.setAttribute('role', 'banner');
    }
    
    const symptomsSection = document.querySelector('.symptoms-section');
    if (symptomsSection) {
        symptomsSection.setAttribute('role', 'main');
    }
}

function setupScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for symptom cards
                if (entry.target.classList.contains('symptom-card')) {
                    const cards = document.querySelectorAll('.symptom-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.understanding-card, .symptom-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function addAnimations() {
    // Add CSS animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .symptom-card.clicked {
            transform: scale(0.98);
            transition: transform 0.1s ease;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Enhanced hover effects */
        .symptom-card:hover .card-title {
            transform: translateX(5px);
            transition: transform 0.3s ease;
        }
        
        .understanding-card:hover {
            transform: translateY(-2px);
            transition: all 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
}

// Utility functions
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(function() {
    console.log('Window resized - adjusting layout if needed');
    // Could add responsive layout adjustments here
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        // Could refresh animations or data when page becomes visible
    }
});