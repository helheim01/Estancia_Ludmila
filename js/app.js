// ─── Mobile Nav Toggle ───
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Scroll Reveal ───
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));


//Reseñas--------------------------------------------------------------------------------------------------//
function moveToSlide(index) {
    const width = carousel.offsetWidth;
    track.style.transform = `translateX(-${index * width}px)`;
}

// ─── Carrusel de Reseñas ───
const carousel = document.querySelector('.reviews-carousel');
const track    = document.getElementById('reviewsTrack');

if (carousel && track) {

    const originalCards = Array.from(document.querySelectorAll('.review-card'));
    let index = 0;
    let autoSlide;

    // Clonar cards para loop infinito
    originalCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    function getCardWidth() {
        const card    = track.querySelector('.review-card');
        const style   = window.getComputedStyle(track);
        const gap     = parseFloat(style.gap) || 0;
        return card.offsetWidth + gap;
    }

    function goTo(i, animated = true) {
        if (!animated) track.style.transition = 'none';
        else track.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        track.style.transform = `translateX(-${i * getCardWidth()}px)`;
    }

    track.addEventListener('transitionend', () => {
        if (index >= originalCards.length) {
            index = 0;
            goTo(index, false);
            track.offsetHeight; // reflow
        }
    });

    function next() {
        index++;
        goTo(index);
    }

    function startAuto() { autoSlide = setInterval(next, 3000); }
    function stopAuto()  { clearInterval(autoSlide); }

    startAuto();

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);

    // Recalcular posición al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
        goTo(index, false);
    });
}