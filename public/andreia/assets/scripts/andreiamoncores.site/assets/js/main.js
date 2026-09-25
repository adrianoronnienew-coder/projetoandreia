/**
 * Andreia Monçores Website - Main JavaScript
 * Versão estabilizada: depoimentos + botões sociais corrigidos.
 */

const CONFIG = {
  whatsappNumber: '5531989167511',
  apiUrl: 'api/contact.php',
  whatsappMessages: {
    curso: 'Olá Andreia! Tenho interesse na Formação Digital. Pode me enviar mais informações?',
    mentoria: 'Olá Andreia! Gostaria de saber mais sobre a gestão de perfil nas redes sociais.',
    analise: 'Olá Andreia! Quero fazer uma análise da minha presença nas redes sociais.'
  }
};

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
  setupTestimonialsDrag();
  setupAndreiaRailTyping();
  animateCounters();
  setupNavbarEffects();
  console.log('Andreia Monçores Website initialized successfully!');
}

function setupAndreiaRailTyping() {
  const rail = document.getElementById('andreia-native-rail');
  if (!rail) return;

  const descriptions = Array.from(rail.querySelectorAll('.andreia-rail-item small'));
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

  if (!document.getElementById('andreia-rail-typing-style')) {
    const style = document.createElement('style');
    style.id = 'andreia-rail-typing-style';
    style.textContent = `
      #andreia-native-rail .andreia-rail-item small::after {
        content: '|';
        display: inline-block;
        margin-left: 2px;
        opacity: .9;
        animation: andreiaTypingCursor .8s steps(1) infinite;
      }
      @keyframes andreiaTypingCursor {
        0%, 48% { opacity: .9; }
        49%, 100% { opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        #andreia-native-rail .andreia-rail-item small::after { animation: none; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

function setupTestimonialsStyle() {
  if (document.getElementById('andreia-testimonials-photo-slow-style')) return;
  const style = document.createElement('style');
  style.id = 'andreia-testimonials-photo-slow-style';
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
  const viewport = document.getElementById('testimonialsCarousel');
  if (!viewport || viewport.dataset.dragReady === '1') return;
  const track = viewport.querySelector('.testimonials-track');
  if (!track) return;
  viewport.dataset.dragReady = '1';

  const originals = Array.from(track.children).map(el => el.cloneNode(true));
  if (!originals.length) return;
  const N = originals.length;

  // Trilho realmente circular: várias voltas idênticas e sempre trabalhamos no miolo.
  track.replaceChildren();
  for (let copy = 0; copy < 9; copy++) originals.forEach(el => track.appendChild(el.cloneNode(true)));

  let x = 0;
  let targetX = 0;
  let pressed = false;
  let pointerId = null;
  let lastClientX = 0;
  let lastTime = 0;
  let velocity = 0;
  let resumeAt = 0;
  let lastFrame = performance.now();
  const AUTO_SPEED = 11;

  const cards = () => track.children;
  const cycleWidth = () => {
    const c = cards();
    return c.length > N ? c[N].offsetLeft - c[0].offsetLeft : 0;
  };

  const render = () => {
    track.style.setProperty('transform', 'translate3d(' + x.toFixed(3) + 'px,0,0)', 'important');
  };

  const wrap = () => {
    const w = cycleWidth();
    if (!w) return;
    // Reposicionamento invisível por uma volta inteira; nunca corta/encaixa card.
    while (x > -3 * w) { x -= w; targetX -= w; }
    while (x < -5 * w) { x += w; targetX += w; }
  };

  const down = e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pressed = true;
    pointerId = e.pointerId;
    lastClientX = e.clientX;
    lastTime = performance.now();
    velocity = 0;
    targetX = x;
    resumeAt = Infinity;
    viewport.style.cursor = 'grabbing';
    try { viewport.setPointerCapture(pointerId); } catch (_) {}
  };

  const move = e => {
    if (!pressed || e.pointerId !== pointerId) return;
    const now = performance.now();
    const dx = e.clientX - lastClientX;
    const dt = Math.max(now - lastTime, 8);
    lastClientX = e.clientX;
    lastTime = now;

    // Movimento direto e contínuo, pixel por pixel, sem snap de card.
    x += dx;
    targetX = x;
    velocity = velocity * 0.55 + (dx / dt) * 0.45;
    wrap();
    render();
    if (e.cancelable) e.preventDefault();
  };

  const end = e => {
    if (!pressed || (e.pointerId != null && e.pointerId !== pointerId)) return;
    pressed = false;
    pointerId = null;
    viewport.style.cursor = 'grab';
    try { viewport.releasePointerCapture?.(e.pointerId); } catch (_) {}
    // Pequena inércia natural após soltar; depois o automático retoma devagar.
    velocity = Math.max(-1.2, Math.min(1.2, velocity));
    resumeAt = performance.now() + 1400;
  };

  const frame = now => {
    const dtMs = Math.min(now - lastFrame, 34);
    const dt = dtMs / 1000;
    lastFrame = now;

    if (!pressed) {
      if (Math.abs(velocity) > 0.003) {
        x += velocity * dtMs;
        velocity *= Math.pow(0.90, dtMs / 16.67);
      } else {
        velocity = 0;
        if (now >= resumeAt) x -= AUTO_SPEED * dt;
      }
      targetX = x;
      wrap();
      render();
    }
    requestAnimationFrame(frame);
  };

  // Nenhum CSS antigo pode disputar o transform controlado pelo JS.
  track.style.setProperty('animation', 'none', 'important');
  track.style.setProperty('transition', 'none', 'important');
  track.style.setProperty('scroll-snap-type', 'none', 'important');
  track.style.setProperty('width', 'max-content', 'important');
  track.style.setProperty('will-change', 'transform', 'important');
  track.style.setProperty('backface-visibility', 'hidden', 'important');
  viewport.style.setProperty('overflow-x', 'hidden', 'important');
  viewport.style.setProperty('touch-action', 'pan-y', 'important');
  viewport.style.setProperty('overscroll-behavior-x', 'contain', 'important');
  viewport.style.cursor = 'grab';

  viewport.addEventListener('pointerdown', down, {passive:true});
  viewport.addEventListener('pointermove', move, {passive:false});
  viewport.addEventListener('pointerup', end, {passive:true});
  viewport.addEventListener('pointercancel', end, {passive:true});
  viewport.addEventListener('lostpointercapture', end, {passive:true});
  viewport.addEventListener('dragstart', e => e.preventDefault());

  track.querySelectorAll('img, a').forEach(el => {
    el.draggable = false;
    el.style.setProperty('user-select','none','important');
    el.style.setProperty('-webkit-user-drag','none','important');
  });

  const start = () => {
    const w = cycleWidth();
    if (!w) return requestAnimationFrame(start);
    x = targetX = -4 * w;
    render();
    lastFrame = performance.now();
    resumeAt = performance.now() + 700;
    requestAnimationFrame(frame);
  };

  if (document.fonts?.ready) document.fonts.ready.then(() => requestAnimationFrame(start));
  else requestAnimationFrame(start);
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