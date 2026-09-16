(() => {
  if (window.__modernEffectsReady) return;
  window.__modernEffectsReady = true;

  const isCoarse = window.matchMedia?.('(hover:none), (pointer:coarse)').matches;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const interactiveSelector = [
    'a.btn','button','.btn','[role="button"]','.ale-action','.social-link','#backToTop',
    '.service-card','.pricing-card','.testimonial-card'
  ].join(',');

  const wireInteractive = (root = document) => {
    root.querySelectorAll?.(interactiveSelector).forEach((el) => {
      if (el.dataset.fxInteractive === '1') return;
      el.dataset.fxInteractive = '1';
      el.classList.add('fx-interactive');

      if (!isCoarse) {
        el.addEventListener('pointermove', (event) => {
          const rect = el.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          el.style.setProperty('--fx-x', `${Math.max(0, Math.min(100, x))}%`);
          el.style.setProperty('--fx-y', `${Math.max(0, Math.min(100, y))}%`);
        }, { passive: true });
      }
    });

    root.querySelectorAll?.('.btn-primary,.cta-button,.hero .btn,.hero-section .btn,.ale-action').forEach((el) => {
      el.classList.add('fx-goo');
    });
  };

  const wireReveal = () => {
    if (reduced || !('IntersectionObserver' in window)) return;
    const selector = [
      'main section','section .card','.service-card','.pricing-card','.testimonial-card','.faq-item',
      '.hero-content > *','.hero-image','.ale-links','.footer .row > *'
    ].join(',');
    const nodes = [...document.querySelectorAll(selector)].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.height > 20 && r.width > 20;
    });
    nodes.forEach((el, index) => {
      if (el.dataset.fxReveal === '1') return;
      el.dataset.fxReveal = '1';
      el.classList.add('fx-reveal');
      el.style.transitionDelay = `${Math.min((index % 6) * 55, 275)}ms`;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fx-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('.fx-reveal:not(.fx-visible)').forEach((el) => io.observe(el));
  };

  // Liquid mouse trail adapted from the user's reference, limited to desktop pointers.
  const wireTrail = () => {
    if (isCoarse || reduced) return;
    const lifetime = 520;
    const widthScale = 1.05;
    const points = [];
    let canvas = null;
    let ctx = null;
    let raf = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let lastPointerTime = 0;

    const ensureCanvas = () => {
      if (canvas?.isConnected && ctx) return true;
      canvas = document.createElement('canvas');
      canvas.dataset.modernTrail = 'true';
      canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:2147482000;pointer-events:none;mix-blend-mode:screen;opacity:.72;';
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      resize();
      return !!ctx;
    };

    const resize = () => {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addPoint = (x, y, time) => {
      const prev = points[points.length - 1];
      if (!prev || time - lastPointerTime > 120) {
        points.push({ x, y, time });
        lastPointerTime = time;
        return;
      }
      const dx = x - prev.x;
      const dy = y - prev.y;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.min(40, Math.ceil(distance / 8)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        points.push({ x: prev.x + dx * t, y: prev.y + dy * t, time: prev.time + (time - prev.time) * t });
      }
      lastPointerTime = time;
    };

    const base = () => Math.max(4, Math.min(width, height) * 0.006) * widthScale;

    const drawLayer = (now, radiusScale, alphaScale, rgb) => {
      const r0 = base();
      for (const p of points) {
        const age = Math.min(1, (now - p.time) / lifetime);
        const radius = r0 * radiusScale * (0.75 + age);
        const alpha = Math.pow(1 - age, 1.8) * alphaScale;
        if (alpha <= 0.01) continue;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        g.addColorStop(0, `rgba(${rgb},${alpha})`);
        g.addColorStop(.5, `rgba(${rgb},${alpha * .38})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!ensureCanvas() || !ctx) return;
      while (points.length && now - points[0].time > lifetime) points.shift();
      ctx.clearRect(0, 0, width, height);
      if (!points.length) return;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      drawLayer(now, 3.0, .10, '122,92,255');
      drawLayer(now, 1.55, .22, '214,59,199');
      drawLayer(now, .72, .28, '255,132,215');
      ctx.restore();
    };

    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      const samples = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : [];
      (samples.length ? samples : [event]).forEach((e) => addPoint(e.clientX, e.clientY, performance.now()));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', () => { lastPointerTime = 0; }, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    raf = requestAnimationFrame(draw);

    window.__modernTrailCleanup = () => {
      cancelAnimationFrame(raf);
      canvas?.remove();
    };
  };

  const start = () => {
    wireInteractive(document);
    wireReveal();
    wireTrail();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          wireInteractive(node.matches?.(interactiveSelector) ? node.parentElement || document : node);
        });
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
