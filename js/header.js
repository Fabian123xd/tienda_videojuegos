// ========== SCRIPT PARA MEJORAR EL HEADER ==========

document.addEventListener('DOMContentLoaded', function() {
    // Detectar página activa automáticamente
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Efecto de typing para el slogan
    const slogan = document.querySelector('.slogan');
    if (slogan) {
        const originalText = slogan.textContent;
        slogan.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                slogan.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar el efecto de typing después de un pequeño delay
        setTimeout(typeWriter, 1000);
    }

    // Efecto de partículas adicionales en el header
    const header = document.querySelector('.header');
    if (header) {
        // Crear partículas flotantes
        for (let i = 0; i < 5; i++) {
            createParticle(header);
        }
    }

    // Efecto hover mejorado para el logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Efecto de scroll suave para los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo aplicar scroll suave si es un enlace interno
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Efecto de parallax sutil en el header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Función para crear partículas flotantes
function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(0, 255, 195, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
        z-index: 1;
    `;
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Animación personalizada
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// Agregar estilos CSS dinámicamente para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
            opacity: 0.8;
        }
        75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(style);

// Función para agregar efecto de "glitch" al logo en hover
function addGlitchEffect() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ff00,
                0 2px #0000ff,
                0 -2px #ffff00
            `;
            this.style.animation = 'none';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.animation = 'logoGlow 3s ease-in-out infinite alternate';
        });
    }
}

// Inicializar efecto glitch
setTimeout(addGlitchEffect, 2000); 