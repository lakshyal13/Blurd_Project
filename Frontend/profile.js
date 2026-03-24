fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });




// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Add event listeners
    addEventListeners();
});



// Add event listeners
function addEventListeners() {
    // Edit icon click handler
    const editIcon = document.querySelector('.edit-icon');
    if (editIcon) {
        editIcon.addEventListener('click', handleEditClick);
    }
    
    // Contact item click handlers
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', handleContactClick);
    });
    
   
}

// Event handlers
function handleEditClick(e) {
    e.preventDefault();
    const aboutText = document.querySelector('.about-text');
    
    if (aboutText) {
        // Toggle edit mode
        if (aboutText.contentEditable === 'true') {
            aboutText.contentEditable = 'false';
            aboutText.style.background = 'transparent';
            aboutText.style.padding = '0';
            e.target.textContent = '✏️';
            alert('Changes saved!');
        } else {
            aboutText.contentEditable = 'true';
            aboutText.style.background = '#f8f9fa';
            aboutText.style.padding = '10px';
            aboutText.style.borderRadius = '5px';
            aboutText.focus();
            e.target.textContent = '💾';
        }
    }
}

function handleContactClick(e) {
    const contactText = e.currentTarget.querySelector('.contact-text').textContent;
    
    if (contactText.includes('@')) {
        // Email
        window.open(`mailto:${contactText}`, '_blank');
    } else if (contactText.includes('-')) {
        // Phone
        window.open(`tel:${contactText}`, '_blank');
    }
}

