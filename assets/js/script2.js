document.addEventListener('DOMContentLoaded', function () {
    // Ensure the Bootstrap mobile navbar collapses when navigating to in-page links
    document.querySelectorAll(".navbar-collapse .nav-link")
        .forEach((link) => {
            link.addEventListener("click", function (e) {
                let section = document.querySelector(e.target.getAttribute("href"));
                if (section) {
                    e.preventDefault(); // Prevent default anchor click behavior
                    let navbarHeight = document.querySelector(".navbar-toggler").offsetHeight;
                    window.scroll({
                        top: section.offsetTop - navbarHeight, // Adjust for navbar height
                        behavior: "smooth",
                    });
                    document
                        .querySelector(".navbar-collapse")
                        .classList.remove("show"); // Collapse navbar
                }
            });
        });

    // Print functionality
    document.querySelectorAll('.print-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const printPath = this.getAttribute('data-print');
            const printWindow = window.open(printPath, '_blank');

            printWindow.onload = function () {
                printWindow.print();
            };
        });
    });

    const lazyVideos = document.querySelectorAll('.lazy-load');

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.src = video.dataset.src;
                    videoObserver.unobserve(video);
                }
            });
        }, { rootMargin: '100px' });

        lazyVideos.forEach(video => videoObserver.observe(video));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyVideos.forEach(video => {
            video.src = video.dataset.src;
        });
    }

});