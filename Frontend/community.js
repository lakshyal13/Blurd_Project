fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });

// Add smooth hover effect to the button
document.addEventListener('DOMContentLoaded', function() {
    const joinButton = document.querySelector('.join-button');
    
    if (joinButton) {
        joinButton.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        joinButton.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    }
});