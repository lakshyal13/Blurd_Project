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
    setupCardInteractions();
    setupAccessibilityFeatures();
}


// Action Card Interactions
function setupCardInteractions() {
    const cards = document.querySelectorAll('.action-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            handleCardClick(category);
        });
    });
}

// Handle card clicks
function handleCardClick(category) {
    console.log(`Clicked on ${category} card`);
    // Add your navigation logic here
    // Example: window.location.href = `/${category}.html`;
    window.location.href = `/${category}.html`;
}

// Accessibility Features
function setupAccessibilityFeatures() {
    // Make cards keyboard accessible
    const cards = document.querySelectorAll('.action-card');
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
    
    // Add ARIA labels
    const resourcesCard = document.querySelector('[data-category="resources"]');
    const profileCard = document.querySelector('[data-category="profile"]');
    const communityCard = document.querySelector('[data-category="community"]');
    
    if (resourcesCard) resourcesCard.setAttribute('aria-label', 'Access learning resources and tools');
    if (profileCard) profileCard.setAttribute('aria-label', 'View and edit your profile');
    if (communityCard) communityCard.setAttribute('aria-label', 'Connect with the community');
}