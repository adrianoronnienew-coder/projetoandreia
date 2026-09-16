/**
 * Ale Marques Website - Main JavaScript
 * Versão estabilizada: impede o script antigo de sobrescrever os depoimentos.
 */

const CONFIG = {
  whatsappNumber: '5531989167511',
  apiUrl: 'api/contact.php',
  whatsappMessages: {
    curso: 'Olá Ale! Tenho interesse na Formação Digital. Pode me enviar mais informações?',
    mentoria: 'Olá Ale! Gostaria de saber mais sobre a gestão de perfil nas redes sociais.',
    analise: 'Olá Ale! Quero fazer uma análise da minha presença nas redes sociais.'
  }
};

const TESTIMONIALS = [
  {
    nome_cliente: 'Desireé',
    foto: 'https://i.pravatar.cc/120?img=47',
    depoimento: 'Estou em choque com a qualidade da análise. Você realmente vai profundamente na pesquisa, todo material é valioso, sozinha jamais conseguiria. @desidesiculy'
  },
  {
    nome_cliente: 'Alda Mendes',
    foto: 'https://i.pravatar.cc/120?img=45',
    depoimento: 'Mulher, amanhã vou dar uma entrevista para uma filial da Globo. Foi você que me ajudou. Não tinha nenhum seguidor e agora vou aparecer na TV! @apenasalda'
  },
  {
    nome_cliente: 'Anne Danielle',
    foto: 'https://i.pravatar.cc/120?img=32',
    depoimento: 'Ontem bati meus 10k. Tenho 3 semanas de conta e 2 de mentoria. Não imaginava conseguir tão rápido, mas consegui! @annedeliverymassas'
  },
  {
    nome_cliente: 'Camila Martins',
    foto: 'https://i.pravatar.cc/120?img=49',
    depoimento: 'Depois que organizei meu conteúdo com a estratégia, comecei a entender o que realmente fazia as pessoas pararem e interagirem.'
  },
  {
    nome_cliente: 'Juliana Souza',
    foto: 'https://i.pravatar.cc/120?img=44',
    depoimento: 'Meu perfil ficou muito mais profissional e organizado. Hoje consigo comunicar com clareza o que faço e para quem faço.'
  },
  {
    nome_cliente: 'Renata Ferreira',
    foto: 'https://i.pravatar.cc/120?img=26',
    depoimento: 'A mentoria me deu direção. Parei de postar sem estratégia e comecei a produzir conteúdo com um objetivo claro.'
  },
  {
    nome_cliente: 'Patrícia Barbosa',
    foto: 'https://i.pravatar.cc/120?img=56',
    depoimento: 'A análise mostrou detalhes que eu nunca tinha percebido. Fiz os ajustes e meu posicionamento ficou muito mais claro.'
  },
  {
    nome_cliente: 'Larissa Santos',
    foto: 'https://i.pravatar.cc/120?img=29',
    depoimento: 'Passei a ter muito mais segurança para criar. Agora tenho uma linha de conteúdo e sei exatamente o que comunicar.'
  },
  {
    nome_cliente: 'Mariana Freitas',
    foto: 'https://i.pravatar.cc/120?img=16',
    depoimento: 'O trabalho mudou completamente a apresentação do meu perfil. Ficou mais profissional, coerente e fácil de entender.'
  }
];

const elements = {
  serviceButtons: document.querySelectorAll('.btn-service'),
  contactForm: document.getElementById('contactForm'),
  newsletterForm: document.getElementById('newsletterForm'),
  backToTopBtn: document.getElementById('backToTop'),
  whatsappFloat: document.getElementById('whatsappFloat'),
  testimonialsCarousel: document.getElementById('testimonialsCarousel'),
  statNumbers: document.querySelectorAll('.stat-number')
};

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  setupServiceButtons();
  setupScrollEffects();
  setupSmoothScrolling();
  setupTestimonialsStyle();
  renderTestimonials(TESTIMONIALS);
  animateCounters();
  setupNavbarEffects();
  console.log('Ale Marques Website initialized successfully!');
}

function setupTestimonialsStyle() {
  if (document.getElementById('ale-testimonials-photo-slow-style')) return;
  const style = document.createElement('style');
  style.id = 'ale-testimonials-photo-slow-style';
  style.textContent = `
    #depoimentos .testimonials-track {
      animation-duration: 95s !important;
    }
    #depoimentos .testimonial-header {
      align-items: center !important;
    }
    #depoimentos .testimonial-avatar.testimonial-photo {
      width: 58px !important;
      height: 58px !important;
      min-width: 58px !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      padding: 0 !important;
      display: block !important;
      border: 2px solid rgba(255,255,255,.18) !important;
      box-shadow: 0 8px 18px rgba(0,0,0,.25) !important;
      background: linear-gradient(135deg,#b83bd8,#168dff) !important;
    }
    #depoimentos .testimonial-info p {
      display: none !important;
    }
    #depoimentos .testimonial-info h4 {
      margin-bottom: 0 !important;
    }
    @media(max-width:768px) {
      #depoimentos .testimonials-track {
        animation-duration: 88s !important;
      }
      #depoimentos .testimonial-avatar.testimonial-photo {
        width: 54px !important;
        height: 54px !important;
        min-width: 54px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function setupServiceButtons() {
  elements.serviceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const service = this.dataset.service;
      const message = CONFIG.whatsappMessages[service];
      if (message) openWhatsApp(message);
    });
  });
}

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
}

function setupScrollEffects() {
  const back = elements.backToTopBtn;
  const whatsapp = elements.whatsappFloat;
  window.addEventListener('scroll', function() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (back) back.classList.toggle('show', y > 300);
    if (whatsapp) {
      whatsapp.style.opacity = y > 200 ? '1' : '0';
      whatsapp.style.visibility = y > 200 ? 'visible' : 'hidden';
    }
  }, { passive: true });
  if (back) back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const selector = this.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
    });
  });
}

function renderTestimonials(testimonials) {
  const carousel = document.getElementById('testimonialsCarousel');
  if (!carousel) return;
  const duplicated = testimonials.concat(testimonials);
  carousel.classList.add('testimonials-marquee');
  carousel.innerHTML = `<div class="testimonials-track">${duplicated.map(createTestimonialCard).join('')}</div>`;
}

function createTestimonialCard(testimonial) {
  return `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <img class="testimonial-avatar testimonial-photo" src="${testimonial.foto}" alt="${testimonial.nome_cliente}" loading="lazy">
        <div class="testimonial-info">
          <h4>${testimonial.nome_cliente}</h4>
        </div>
      </div>
      <div class="testimonial-text">"${testimonial.depoimento}"</div>
      <div class="testimonial-rating"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></div>
    </div>`;
}

function animateCounters() {
  const counters = elements.statNumbers;
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  if (!Number.isFinite(target)) return;
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

function setupNavbarEffects() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    navbar.style.transform = 'translateY(0)';
  }, { passive: true });
}
