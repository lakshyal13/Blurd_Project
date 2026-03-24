


document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const targetUrl = link.getAttribute('data-url');
        
        // Mark active if current URL matches the link
        if (window.location.href.includes(targetUrl)) {
            link.classList.add('active');
        }

        // Click redirects to another page
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });
});
