document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada com Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.benefit, .steps li, .features-list li, .pricing-plan, .custom-img, .testimonial');
hiddenElements.forEach((el) => observer.observe(el));

// Sistema de avaliação com estrelas
document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            stars.forEach(s => {
                s.setAttribute('aria-checked', s.getAttribute('data-value') <= value ? 'true' : 'false');
                s.classList.toggle('selected', s.getAttribute('data-value') <= value);
            });

            // Criar ou atualizar mensagem de feedback
            let message = rating.nextElementSibling;
            if (!message || !message.classList.contains('rating-message')) {
                message = document.createElement('div');
                message.classList.add('rating-message');
                message.setAttribute('aria-live', 'polite');
                rating.parentNode.appendChild(message);
            }
            message.textContent = `Obrigado por avaliar com ${value} estrela${value > 1 ? 's' : ''}!`;
            message.classList.add('show');

            // Remover mensagem após 3 segundos
            setTimeout(() => {
                message.classList.remove('show');
                setTimeout(() => message.remove(), 500);
            }, 3000);
        });

        // Suporte para teclado
        star.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                star.click();
            }
        });
    });
});

// Formulário de inscrição
document.querySelector('.lead-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.log('E-mail cadastrado:', email);
        alert('Obrigado por se inscrever! Entraremos em contato em breve.');
        e.target.reset();
    } else {
        alert('Por favor, insira um e-mail válido.');
    }
});