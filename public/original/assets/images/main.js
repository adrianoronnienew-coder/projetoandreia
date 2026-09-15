/**
 * Anna Karoliny Website - Main JavaScript
 */

// Configuration
const CONFIG = {
    whatsappNumber: '5531989167511', // Substitua pelo número real
    apiUrl: 'api/contact.php',
    whatsappMessages: {
        curso: 'Olá Anna! Tenho interesse no Curso Monetize TikTok. Pode me enviar mais informações sobre o conteúdo, metodologia e como posso me inscrever?',
        mentoria: 'Olá Anna! Gostaria de saber mais sobre a gestao de perfil. Quando podemos conversar para discutir meus objetivos no TikTok?',
        analise: 'Olá Anna! Quero fazer a análise do meu perfil do TikTok. Como funciona o processo e quando posso receber o relatório?'
    }
};

// DOM Elements
const elements = {
    serviceButtons: document.querySelectorAll('.btn-service'),
    contactForm: document.getElementById('contactForm'),
    newsletterForm: document.getElementById('newsletterForm'),
    backToTopBtn: document.getElementById('backToTop'),
    whatsappFloat: document.getElementById('whatsappFloat'),
    testimonialsCarousel: document.getElementById('testimonialsCarousel'),
    statNumbers: document.querySelectorAll('.stat-number')
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    setupServiceButtons();
    setupContactForm();
    setupNewsletterForm();
    setupScrollEffects();
    setupSmoothScrolling();
    loadTestimonials();
    animateCounters();
    setupNavbarEffects();
    
    console.log('Anna Karoliny Website initialized successfully!');
}

// Service buttons with WhatsApp integration
function setupServiceButtons() {
    elements.serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const service = this.dataset.service;
            const message = CONFIG.whatsappMessages[service];
            
            if (message) {
                // Track click
                trackServiceClick(service);
                
                // Open WhatsApp
                openWhatsApp(message);
                
                // Visual feedback
                showClickFeedback(this);
            }
        });
    });
}

// Track service clicks for analytics
function trackServiceClick(service) {
    fetch(CONFIG.apiUrl + '?action=click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            servico: service
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Click tracked:', data);
    })
    .catch(error => {
        console.error('Error tracking click:', error);
    });
}

// Open WhatsApp with pre-filled message
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
}

// Visual feedback for button clicks
function showClickFeedback(button) {
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check me-2"></i>Redirecionando...';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.transform = 'scale(1)';
    }, 2000);
}

// Contact form handling
function setupContactForm() {
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
}

// Submit contact form
function submitContactForm() {
    const formData = new FormData(elements.contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    // Submit to API
    fetch(CONFIG.apiUrl + '?action=contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 200) {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            elements.contactForm.reset();
        } else {
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    })
    .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Newsletter form handling
function setupNewsletterForm() {
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (validateEmail(email)) {
                showNotification('Email cadastrado com sucesso!', 'success');
                this.reset();
            } else {
                showNotification('Por favor, insira um email válido.', 'error');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            ${message}
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-green)' : type === 'error' ? '#ff4444' : 'var(--accent-blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar hide/show on scroll
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        // Back to top button
        if (elements.backToTopBtn) {
            if (scrollTop > 300) {
                elements.backToTopBtn.classList.add('show');
            } else {
                elements.backToTopBtn.classList.remove('show');
            }
        }
        
        // WhatsApp float button
        if (elements.whatsappFloat) {
            if (scrollTop > 200) {
                elements.whatsappFloat.style.opacity = '1';
                elements.whatsappFloat.style.visibility = 'visible';
            } else {
                elements.whatsappFloat.style.opacity = '0';
                elements.whatsappFloat.style.visibility = 'hidden';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Back to top functionality
    if (elements.backToTopBtn) {
        elements.backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Load testimonials from API
function loadTestimonials() {
    if (!elements.testimonialsCarousel) return;
    
    fetch(CONFIG.apiUrl + '?action=testimonials')
        .then(response => response.json())
        .then(result => {
            if (result.status === 200 && result.data) {
                renderTestimonials(result.data);
            }
        })
        .catch(error => {
            console.error('Error loading testimonials:', error);
            // Load default testimonials if API fails
            loadDefaultTestimonials();
        });
}

// Render testimonials
function renderTestimonials(testimonials) {
    const carousel = elements.testimonialsCarousel;
    carousel.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        carousel.appendChild(card);
    });
}

// Create testimonial card
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const initials = testimonial.nome_cliente.split(' ').map(n => n[0]).join('').toUpperCase();
    const stars = '★'.repeat(testimonial.nota) + '☆'.repeat(5 - testimonial.nota);
    
    card.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">${initials}</div>
            <div class="testimonial-info">
                <h4>${testimonial.nome_cliente}</h4>
                <p>${getServiceName(testimonial.servico)}</p>
            </div>
        </div>
        <div class="testimonial-text">
            "${testimonial.depoimento}"
        </div>
        <div class="testimonial-rating">
            ${stars.split('').map(star => `<i class="fas fa-star${star === '☆' ? '-o' : ''}">${star}</i>`).join('')}
        </div>
    `;
    
    return card;
}

// Get service name in Portuguese
function getServiceName(service) {
    const names = {
        curso: 'Curso Monetize TikTok',
        mentoria: 'Mentoria Individual',
        analise: 'Análise de Perfil'
    };
    return names[service] || service;
}

// Load default testimonials if API fails
function loadDefaultTestimonials() {
    const defaultTestimonials = [
        {
            nome_cliente: 'Desireé',
            depoimento: 'Estou em choque com a qualidade da análise. Você realmente vai profundamente na pesquisa, todo material é valioso, sozinha jamais conseguiria. @desidesiculy',
            servico: 'analise',
            nota: 5
        },
        {
            nome_cliente: 'Alda Mendes',
            depoimento: 'Mulher amanha vou dar um estrevista pra uma filial da Globo, em pesar que foi você que me ajudou. Não tinha nenhum seguidor e agora aparecer na TV! @apenasalda',
            servico: 'analise',
            nota: 5
        },
        {
            nome_cliente: 'Anne Danielle',
            depoimento: 'Ontem bati meus 10k, hoje tenho 3 semanas que abrir minha conta e 2 que iniciamos a mentoria, não estava conseguir tão rapido mas consegui! @annedeliverymassas',
            servico: 'mentoria',
            nota: 5
        }
    ];
    
    renderTestimonials(defaultTestimonials);
}

// Animate counters
function animateCounters() {
    const counters = elements.statNumbers;
    const options = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate individual counter
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString('pt-BR');
    }, 16);
}

// Navbar effects
function setupNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Utility functions
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        utils,
        openWhatsApp,
        validateEmail
    };
}

