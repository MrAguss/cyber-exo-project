document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.bg-video');
    const steps = document.querySelectorAll('.step');
    let currentIndex = -1;

    // Barcha videolarni fon rejimida uzluksiz aylanishga sozlash
    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
    });

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(steps).indexOf(entry.target);

            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                if (currentIndex !== index) {
                    currentIndex = index;

                    videos.forEach((video, vIndex) => {
                        if (vIndex === index) {
                            video.classList.add('active');
                            video.currentTime = 0;
                            video.play().catch(() => {});
                        } else {
                            video.classList.remove('active');
                            setTimeout(() => {
                                if (!video.classList.contains('active')) {
                                    video.pause();
                                }
                            }, 800);
                        }
                    });
                }
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));
});