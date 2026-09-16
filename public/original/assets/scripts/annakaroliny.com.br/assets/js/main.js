/**
 * Ale Marques Website - Main JavaScript
 * Versão estabilizada: depoimentos + botões sociais corrigidos.
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
  { nome_cliente: 'Desireé', foto: 'https://i.pravatar.cc/120?img=47', depoimento: 'Estou em choque com a qualidade da análise. Você realmente vai profundamente na pesquisa, todo material é valioso, sozinha jamais conseguiria.' },
  { nome_cliente: 'Alda Mendes', foto: 'https://i.pravatar.cc/120?img=45', depoimento: 'Mulher, amanhã vou dar uma entrevista para uma filial da Globo. Foi você que me ajudou. Não tinha nenhum seguidor e agora vou aparecer na TV!' },
  { nome_cliente: 'Anne Danielle', foto: 'https://i.pravatar.cc/120?img=32', depoimento: 'Ontem bati meus 10k. Tenho 3 semanas de conta e 2 de mentoria. Não imaginava conseguir tão rápido, mas consegui!' },
  { nome_cliente: 'Camila Martins', foto: 'https://i.pravatar.cc/120?img=49', depoimento: 'Depois que organizei meu conteúdo com a estratégia, comecei a entender o que realmente fazia as pessoas pararem e interagirem.' },
  { nome_cliente: 'Juliana Souza', foto: 'https://i.pravatar.cc/120?img=44', depoimento: 'Meu perfil ficou muito mais profissional e organizado. Hoje consigo comunicar com clareza o que faço e para quem faço.' },
  { nome_cliente: 'Renata Ferreira', foto: 'https://i.pravatar.cc/120?img=26', depoimento: 'A mentoria me deu direção. Parei de postar sem estratégia e comecei a produzir conteúdo com um objetivo claro.' },
  { nome_cliente: 'Patrícia Barbosa', foto: 'https://i.pravatar.cc/120?img=56', depoimento: 'A análise mostrou detalhes que eu nunca tinha percebido. Fiz os ajustes e meu posicionamento ficou muito mais claro.' },
  { nome_cliente: 'Larissa Santos', foto: 'https://i.pravatar.cc/120?img=29', depoimento: 'Passei a ter muito mais segurança para criar. Agora tenho uma linha de conteúdo e sei exatamente o que comunicar.' },
  { nome_cliente: 'Mariana Freitas', foto: 'https://i.pravatar.cc/120?img=16', depoimento: 'O trabalho mudou completamente a apresentação do meu perfil. Ficou mais profissional, coerente e fácil de entender.' }
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
  setupTestimonialsDrag();
  setupAleRailButtons();
  setupAleRailTyping();
  animateCounters();
  setupNavbarEffects();
  console.log('Ale Marques Website initialized successfully!');
}

function setupAleRailButtons() {
  const rail = document.getElementById('ale-native-rail');
  if (!rail) return;

  const items = Array.from(rail.querySelectorAll('.ale-rail-item'));
  const info = [
    {
      match: 'Hndy5zUtIi6LyFJdrmcCk1',
      title: 'Mentoria Profissional',
      description: 'Grupo para interessados na Mentoria Gold',
      label: 'Entrar no grupo da Mentoria Gold'
    },
    {
      match: 'FjQNMkhQcO13fQYq9TExiZ',
      title: 'Comunidade Ale',
      description: 'Conversas, lives, produtos e avisos',
      label: 'Entrar na comunidade da Ale'
    },
    {
      match: 'instagram.com/ale.marques.social',
      title: 'Instagram',
      description: 'Conteúdos, bastidores e novidades',
      label: 'Acessar Instagram da Ale'
    },
    {
      match: 'tiktok.com/@alemarques.com.br',
      title: 'Novo TikTok',
      description: 'Siga o novo perfil oficial da Ale',
      label: 'Acessar novo TikTok da Ale'
    },
    {
      match: 'tiktok.com/@alesocialmedia.com.br',
      title: 'Lives no TikTok',
      description: 'Perfil atual das lives e transmissões',
      label: 'Acessar perfil de lives da Ale'
    }
  ];

  items.forEach(item => {
    const href = item.getAttribute('href') || '';
    const data = info.find(entry => href.includes(entry.match));
    if (!data) return;
    const title = item.querySelector('b');
    const desc = item.querySelector('small');
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.description;
    item.setAttribute('aria-label', data.label);
  });

  // Mantém a ordem correta: Mentoria Gold primeiro, Comunidade depois, Instagram, Novo TikTok, Lives.
  info.forEach(entry => {
    const found = items.find(item => (item.getAttribute('href') || '').includes(entry.match));
    if (found) rail.appendChild(found);
  });

  const style = document.createElement('style');
  style.id = 'ale-rail-text-fix-v28';
  style.textContent = `
    #ale-native-rail .ale-rail-item {
      min-height: 86px !important;
    }
    #ale-native-rail .ale-rail-item.active,
    #ale-native-rail .ale-rail-item:hover,
    #ale-native-rail .ale-rail-item:focus {
      width: min(390px, calc(100vw - 34px)) !important;
      min-height: 92px !important;
    }
    #ale-native-rail .ale-rail-item span {
      min-width: 0 !important;
      max-width: 260px !important;
      line-height: 1.12 !important;
    }
    #ale-native-rail .ale-rail-item span b {
      font-size: 18px !important;
      line-height: 1.05 !important;
      white-space: normal !important;
    }
    #ale-native-rail .ale-rail-item span small {
      font-size: 13px !important;
      line-height: 1.18 !important;
      white-space: normal !important;
      max-width: 260px !important;
      overflow: visible !important;
      text-overflow: unset !important;
      display: block !important;
      opacity: .86 !important;
    }
    @media(max-width:600px) {
      #ale-native-rail .ale-rail-item,
      #ale-native-rail .ale-rail-item.active {
        width: min(100%, 330px) !important;
        min-height: 88px !important;
      }
      #ale-native-rail .ale-rail-item span { max-width: 210px !important; }
      #ale-native-rail .ale-rail-item span b { font-size: 16px !important; }
      #ale-native-rail .ale-rail-item span small { font-size: 12px !important; max-width: 210px !important; }
    }
  `;
  document.head.appendChild(style);
}


function setupAleRailTyping() {
  const rail = document.getElementById('ale-native-rail');
  if (!rail) return;

  const descriptions = Array.from(rail.querySelectorAll('.ale-rail-item small'));
  descriptions.forEach((desc, index) => {
    const fullText = desc.textContent.trim();
    if (!fullText) return;

    desc.setAttribute('aria-label', fullText);
    desc.textContent = '';

    let position = 0;
    let deleting = false;

    const tick = () => {
      if (!deleting) {
        position++;
        desc.textContent = fullText.slice(0, position);
        if (position >= fullText.length) {
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 105);
      } else {
        position--;
        desc.textContent = fullText.slice(0, Math.max(0, position));
        if (position <= 0) {
          deleting = false;
          setTimeout(tick, 900);
          return;
        }
        setTimeout(tick, 45);
      }
    };

    // Pequeno desencontro entre os botões para a animação ficar natural.
    setTimeout(tick, 350 + (index * 500));
  });

  if (!document.getElementById('ale-rail-typing-style')) {
    const style = document.createElement('style');
    style.id = 'ale-rail-typing-style';
    style.textContent = `
      #ale-native-rail .ale-rail-item small::after {
        content: '|';
        display: inline-block;
        margin-left: 2px;
        opacity: .9;
        animation: aleTypingCursor .8s steps(1) infinite;
      }
      @keyframes aleTypingCursor {
        0%, 48% { opacity: .9; }
        49%, 100% { opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        #ale-native-rail .ale-rail-item small::after { animation: none; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

function setupTestimonialsStyle() {
  if (document.getElementById('ale-testimonials-photo-slow-style')) return;
  const style = document.createElement('style');
  style.id = 'ale-testimonials-photo-slow-style';
  style.textContent = `
    #depoimentos .testimonials-marquee { overflow-x: auto !important; overflow-y: hidden !important; -webkit-overflow-scrolling: touch !important; scrollbar-width: none !important; cursor: grab !important; touch-action: pan-x !important; }
    #depoimentos .testimonials-marquee::-webkit-scrollbar { display: none !important; }
    #depoimentos .testimonials-track { width: max-content !important; animation-duration: 110s !important; }
    #depoimentos .testimonials-marquee.is-reading .testimonials-track { animation-play-state: paused !important; }
    #depoimentos .testimonial-header { align-items: center !important; }
    #depoimentos .testimonial-avatar.testimonial-photo {
      width: 62px !important; height: 62px !important; min-width: 62px !important;
      border-radius: 50% !important; object-fit: cover !important; padding: 0 !important;
      display: block !important; border: 2px solid rgba(255,255,255,.18) !important;
      box-shadow: 0 8px 18px rgba(0,0,0,.25) !important;
      background: linear-gradient(135deg,#b83bd8,#168dff) !important;
    }
    #depoimentos .testimonial-info p { display: none !important; }
    #depoimentos .testimonial-info h4 { margin-bottom: 0 !important; }
    @media(max-width:768px) {
      #depoimentos .testimonial-avatar.testimonial-photo { width: 58px !important; height: 58px !important; min-width: 58px !important; }
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

function setupTestimonialsDrag() {
  const carousel = document.getElementById('testimonialsCarousel');
  if (!carousel || carousel.dataset.dragReady === '1') return;
  const track = carousel.querySelector('.testimonials-track');
  if (!track) return;
  carousel.dataset.dragReady = '1';

  // Começa no conjunto central para existir conteúdo real dos dois lados.
  const original = Array.from(track.children);
  if (!original.length) return;
  track.innerHTML = '';
  for (let copy = 0; copy < 3; copy++) {
    original.forEach(card => track.appendChild(card.cloneNode(true)));
  }

  let holding = false, dragging = false, startX = 0, currentX = 0;
  let resumeTimer = null, raf = 0, last = performance.now();
  const SPEED = 18;

  const setX = value => {
    currentX = value;
    track.style.setProperty('transform', 'translate3d(' + currentX + 'px,0,0)', 'important');
  };

  const segmentWidth = () => track.scrollWidth / 3;

  const recenter = () => {
    const w = segmentWidth();
    if (!w) return;
    // Mantém sempre a cópia do meio visível: visualmente é um círculo sem começo/fim.
    while (currentX > -w * 0.5) currentX -= w;
    while (currentX < -w * 1.5) currentX += w;
  };

  const startCentered = () => {
    const w = segmentWidth();
    if (w) setX(-w);
  };

  const tick = now => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!holding && Date.now() >= (carousel._resumeAt || 0)) {
      currentX -= SPEED * dt;
      recenter();
      setX(currentX);
    }
    raf = requestAnimationFrame(tick);
  };

  const down = e => {
    clearTimeout(resumeTimer);
    holding = true; dragging = false; startX = e.clientX;
    carousel.style.cursor = 'grabbing';
    try { carousel.setPointerCapture?.(e.pointerId); } catch (_) {}
  };

  const move = e => {
    if (!holding) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 2) dragging = true;
    if (!dragging) return;
    currentX += delta;
    startX = e.clientX;
    recenter();
    setX(currentX);
  };

  const up = e => {
    if (!holding) return;
    holding = false; dragging = false;
    try { carousel.releasePointerCapture?.(e.pointerId); } catch (_) {}
    carousel.style.cursor = 'grab';
    carousel._resumeAt = Date.now() + 900;
  };

  carousel.addEventListener('pointerdown', down, { passive: true });
  carousel.addEventListener('pointermove', move, { passive: true });
  carousel.addEventListener('pointerup', up, { passive: true });
  carousel.addEventListener('pointercancel', up, { passive: true });
  window.addEventListener('pointerup', up, { passive: true });
  carousel.addEventListener('dragstart', e => e.preventDefault());
  carousel.querySelectorAll('img').forEach(img => { img.draggable = false; img.style.userSelect = 'none'; });

  track.style.setProperty('animation', 'none', 'important');
  requestAnimationFrame(() => { startCentered(); requestAnimationFrame(tick); });
}

function createTestimonialCard(testimonial) {
  return `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <img class="testimonial-avatar testimonial-photo" src="${testimonial.foto}" alt="${testimonial.nome_cliente}" loading="lazy">
        <div class="testimonial-info"><h4>${testimonial.nome_cliente}</h4></div>
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