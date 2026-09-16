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
    servico: 'Análise de Perfil',
    depoimento: 'Estou em choque com a qualidade da análise. Você realmente vai profundamente na pesquisa, todo material é valioso, sozinha jamais conseguiria. @desidesiculy'
  },
  {
    nome_cliente: 'Alda Mendes',
    servico: 'Análise de Perfil',
    depoimento: 'Mulher, amanhã vou dar uma entrevista para uma filial da Globo. Foi você que me ajudou. Não tinha nenhum seguidor e agora vou aparecer na TV! @apenasalda'
  },
  {
    nome_cliente: 'Anne Danielle',
    servico: 'Mentoria Individual',
    depoimento: 'Ontem bati meus 10k. Tenho 3 semanas de conta e 2 de mentoria. Não imaginava conseguir tão rápido, mas consegui! @annedeliverymassas'
  },
  {
    nome_cliente: 'Camila Martins',
    servico: 'Estratégia de Conteúdo',
    depoimento: 'Depois que organizei meu conteúdo com a estratégia, comecei a entender o que realmente fazia as pessoas pararem e interagirem.'
  },
  {
    nome_cliente: 'Juliana Souza',
    servico: 'Gestão de Perfil',
    depoimento: 'Meu perfil ficou muito mais profissional e organizado. Hoje consigo comunicar com clareza o que faço e para quem faço.'
  },
  {
    nome_cliente: 'Renata Ferreira',
    servico: 'Mentoria Individual',
    depoimento: 'A mentoria me deu direção. Parei de postar sem estratégia e comecei a produzir conteúdo com um objetivo claro.'
  },
  {
    nome_cliente: 'Patrícia Barbosa',
    servico: 'Análise de Perfil',
    depoimento: 'A análise mostrou detalhes que eu nunca tinha percebido. Fiz os ajustes e meu posicionamento ficou muito mais claro.'
  },
  {
    nome_cliente: 'Larissa Santos',
    servico: 'Estratégia de Conteúdo',
    depoimento: 'Passei a ter muito mais segurança para criar. Agora tenho uma linha de conteúdo e sei exatamente o que comunicar.'
  },
  {
    nome_cliente: 'Mariana Freitas',
    servico: 'Gestão de Perfil',
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
  renderTestimonials(TESTIMONIALS);
  animateCounters();
  setupNavbarEffects();
  console.log('Ale Marques Website initialized successfully!');
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
  const initials = testimonial.nome_cliente
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-avatar">${initials}</div>
        <div class="testimonial-info">
          <h4>${testimonial.nome_cliente}</h4>
          <p>${testimonial.servico}</p>
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
