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

// ─── Reviews Scroll ───
const reviewsScroll = document.getElementById('reviewsScroll');

document.getElementById('revNext').addEventListener('click', () => {
    reviewsScroll.scrollBy({ left: 320, behavior: 'smooth' });
});

document.getElementById('revPrev').addEventListener('click', () => {
    reviewsScroll.scrollBy({ left: -320, behavior: 'smooth' });
});



// ─── Formulario → WhatsApp ───
const formSubmit = document.querySelector('.form-submit');

if (formSubmit) {
    formSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        const nombreInput    = document.querySelector('input[placeholder="Tu nombre"]');
        const telefonoInput  = document.querySelector('input[placeholder="Teléfono"]');
        const fechaInput     = document.querySelector('input[type="date"]');
        const invitadosInput = document.querySelector('input[placeholder="Cantidad de invitados"]');

        const nombre    = nombreInput.value.trim();
        const telefono  = telefonoInput.value.trim();
        const fecha     = fechaInput.value;
        const invitados = invitadosInput.value.trim();

        // ── Limpiar errores anteriores ──
        [nombreInput, telefonoInput, fechaInput, invitadosInput].forEach(el => {
            el.style.borderColor = '';
            const prev = el.parentNode.querySelector('.form-error');
            if (prev) prev.remove();
        });

        let valido = true;

        function marcarError(input, mensaje) {
            input.style.borderColor = '#c0392b';
            const span = document.createElement('span');
            span.className = 'form-error';
            span.style.cssText = 'color:#c0392b; font-size:0.72rem; margin-top:0.3rem; display:block;';
            span.textContent = mensaje;
            input.insertAdjacentElement('afterend', span);
            valido = false;
        }

        // ── Validaciones ──
        const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
        if (!nombre) {
            marcarError(nombreInput, 'El nombre es obligatorio.');
        } else if (!soloLetras.test(nombre)) {
            marcarError(nombreInput, 'El nombre solo puede contener letras.');
        } else if (nombre.length > 50) {
            marcarError(nombreInput, 'El nombre no puede superar los 50 caracteres.');
        }

        const soloNumeros = /^\+?[\d\s\-()]{7,15}$/;
        if (!telefono) {
            marcarError(telefonoInput, 'El teléfono es obligatorio.');
        } else if (!soloNumeros.test(telefono)) {
            marcarError(telefonoInput, 'Ingresá solo números (máx. 15 dígitos).');
        }

        if (!fecha) {
            marcarError(fechaInput, 'La fecha es obligatoria.');
        } else {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const fechaEvento = new Date(fecha + 'T00:00:00');
            if (fechaEvento < hoy) {
                marcarError(fechaInput, 'La fecha no puede ser en el pasado.');
            }
        }

        if (!invitados) {
            marcarError(invitadosInput, 'La cantidad de invitados es obligatoria.');
        }

        if (!valido) return;

        // ── Armar mensaje ──
        const mensaje =
`¡Hola! Me gustaría consultar disponibilidad para mi evento.

Nombre: ${nombre}
Fecha: ${fecha}
Invitados: ${invitados}
Telefono: ${telefono}`;

        const url = `https://wa.me/5492612073027?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    });
}