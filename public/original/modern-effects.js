(() => {
  if (window.__modernEffectsReady) return;
  window.__modernEffectsReady = true;

  const isCoarse = window.matchMedia?.('(hover:none), (pointer:coarse)').matches;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const interactiveSelector = ['a.btn','button','.btn','[role="button"]','.ale-action','.social-link','#backToTop','.service-card','.pricing-card','.testimonial-card'].join(',');

  const wireInteractive = (root = document) => {
    root.querySelectorAll?.(interactiveSelector).forEach((el) => {
      if (el.dataset.fxInteractive === '1') return;
      el.dataset.fxInteractive = '1'; el.classList.add('fx-interactive');
      if (!isCoarse) el.addEventListener('pointermove', (event) => {
        const rect = el.getBoundingClientRect(); if (!rect.width || !rect.height) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100, y = ((event.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--fx-x', `${Math.max(0, Math.min(100, x))}%`); el.style.setProperty('--fx-y', `${Math.max(0, Math.min(100, y))}%`);
      }, { passive: true });
    });
    root.querySelectorAll?.('.btn-primary,.cta-button,.hero .btn,.hero-section .btn,.ale-action').forEach((el) => el.classList.add('fx-goo'));
  };

  const wireReveal = () => {
    if (reduced || !('IntersectionObserver' in window)) return;
    const selector = ['main section','section .card','.service-card','.pricing-card','.testimonial-card','.faq-item','.hero-content > *','.hero-image','.ale-links','.footer .row > *'].join(',');
    const nodes = [...document.querySelectorAll(selector)].filter((el) => { const r = el.getBoundingClientRect(); return r.height > 20 && r.width > 20; });
    nodes.forEach((el, index) => { if (el.dataset.fxReveal === '1') return; el.dataset.fxReveal = '1'; el.classList.add('fx-reveal'); el.style.transitionDelay = `${Math.min((index % 6) * 55, 275)}ms`; });
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('fx-visible'); io.unobserve(entry.target); }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.fx-reveal:not(.fx-visible)').forEach((el) => io.observe(el));
  };

  const addEbooks = () => {
    if (document.getElementById('ebooks-area')) return;
    const section = document.createElement('section'); section.id = 'ebooks-area'; section.className = 'py-5';
    section.innerHTML = `<style>
      #ebooks-area{position:relative;background:var(--secondary-bg,#11121e);overflow:hidden;padding:72px 0}
      #ebooks-area .eb-wrap{max-width:980px;margin:auto;padding:0 16px}.eb-head{text-align:center;margin-bottom:28px}.eb-kicker{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#f2c45c;font-weight:900}.eb-head h2{font-size:clamp(30px,4vw,44px);font-weight:900;margin:7px 0;color:#fff}.eb-head p{color:rgba(255,255,255,.62);margin:0}
      .eb-card{display:grid;grid-template-columns:42% 58%;min-height:410px;border-radius:30px;overflow:hidden;border:1px solid rgba(244,193,71,.24);background:linear-gradient(135deg,#070707,#11100c 58%,#090909);box-shadow:0 28px 70px rgba(0,0,0,.34),0 0 55px rgba(224,170,40,.07)}
      .eb-art{position:relative;display:flex;align-items:center;justify-content:center;text-align:center;padding:30px;background:radial-gradient(circle at 50% 45%,rgba(255,190,42,.22),transparent 30%),linear-gradient(145deg,#050505,#151109);overflow:hidden}.eb-art:before,.eb-art:after{content:'';position:absolute;width:125%;height:2px;background:linear-gradient(90deg,transparent,#ffc84d,transparent);box-shadow:0 0 16px #ffb800}.eb-art:before{top:26%;transform:rotate(-9deg)}.eb-art:after{bottom:24%;transform:rotate(8deg)}.eb-visual{position:relative;z-index:2}.eb-bag{font-size:70px;filter:drop-shadow(0 0 18px rgba(255,192,54,.5))}.eb-kit{font-size:42px;line-height:.95;font-weight:1000;color:#f8d77b;text-shadow:0 0 18px rgba(255,183,31,.28)}.eb-tiktok{font-size:28px;font-weight:900;color:#fff;margin-top:7px}.eb-shop{display:inline-block;margin-top:10px;padding:5px 17px;border:1px solid #e7b53d;border-radius:999px;color:#ffd96c;font-size:12px;font-weight:900;letter-spacing:1px}
      .eb-copy{padding:42px 44px;display:flex;flex-direction:column;justify-content:center}.eb-copy h3{font-size:clamp(28px,3.5vw,42px);font-weight:900;line-height:1.05;color:#fff;margin:7px 0 12px}.eb-copy p{color:rgba(255,255,255,.68);line-height:1.55}.eb-pills{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 21px}.eb-pill{padding:8px 11px;border-radius:999px;border:1px solid rgba(245,194,73,.24);background:rgba(245,194,73,.07);color:#f8e6b2;font-size:12px;font-weight:700}.eb-cta{display:inline-flex;align-items:center;justify-content:center;gap:9px;width:max-content;padding:14px 24px;border-radius:999px;background:linear-gradient(135deg,#f2c94c,#d79b17);color:#151008!important;text-decoration:none!important;font-weight:900;box-shadow:0 12px 34px rgba(230,174,37,.2);transition:.25s}.eb-cta:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 17px 42px rgba(230,174,37,.3)}.eb-more{font-size:11px;color:rgba(255,255,255,.44);margin-top:12px}
      @media(max-width:768px){#ebooks-area{padding:50px 0}.eb-card{grid-template-columns:1fr}.eb-art{min-height:270px}.eb-copy{padding:28px 22px}.eb-cta{width:100%}}
    </style><div class="eb-wrap"><div class="eb-head"><div class="eb-kicker">Biblioteca digital</div><h2>E-books & Kits</h2><p>Materiais práticos para acelerar sua criação de conteúdo e suas vendas.</p></div><article class="eb-card"><div class="eb-art"><div class="eb-visual"><div class="eb-bag">🛍️</div><div class="eb-kit">KIT VIRAL</div><div class="eb-tiktok">TikTok Shop</div><div class="eb-shop">COMPLETO</div></div></div><div class="eb-copy"><div class="eb-kicker">Primeiro material</div><h3>Kit Viral TikTok Shop</h3><p>Conteúdo pronto para você criar com mais velocidade e transformar ideias em vendas.</p><div class="eb-pills"><span class="eb-pill">✓ 500 ganchos</span><span class="eb-pill">✓ 500 desenvolvimentos</span><span class="eb-pill">✓ 500 legendas</span><span class="eb-pill">✓ 500 CTAs</span><span class="eb-pill">✓ 50 nichos</span><span class="eb-pill">✓ Bônus: 105 lojas</span></div><a class="eb-cta btn" href="https://pay.kiwify.com.br/F8l31Dt?afid=VqkVFZcW" target="_blank" rel="noopener noreferrer">📘 Quero acessar o Kit Viral</a><div class="eb-more">Novos e-books e materiais poderão ser adicionados aqui futuramente.</div></div></article></div>`;
    const about = [...document.querySelectorAll('section')].find(s => /Quem é Ale|Sobre/i.test(s.textContent || ''));
    const anchor = document.getElementById('gemini-acesso');
    if (anchor) anchor.insertAdjacentElement('afterend', section); else if (about) about.insertAdjacentElement('beforebegin', section); else document.querySelector('main')?.appendChild(section) || document.body.appendChild(section);
    wireInteractive(section); wireReveal();
  };

  const wireTrail = () => {
    if (isCoarse || reduced) return;
    const lifetime = 520, widthScale = 1.05, points = []; let canvas=null,ctx=null,raf=0,width=1,height=1,dpr=1,lastPointerTime=0;
    const resize=()=>{if(!canvas||!ctx)return;dpr=Math.min(window.devicePixelRatio||1,2);width=Math.max(1,innerWidth);height=Math.max(1,innerHeight);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0)};
    const ensureCanvas=()=>{if(canvas?.isConnected&&ctx)return true;canvas=document.createElement('canvas');canvas.dataset.modernTrail='true';canvas.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:2147482000;pointer-events:none;mix-blend-mode:screen;opacity:.72;';document.body.appendChild(canvas);ctx=canvas.getContext('2d');resize();return !!ctx};
    const addPoint=(x,y,time)=>{const prev=points[points.length-1];if(!prev||time-lastPointerTime>120){points.push({x,y,time});lastPointerTime=time;return}const dx=x-prev.x,dy=y-prev.y,distance=Math.hypot(dx,dy),steps=Math.max(1,Math.min(40,Math.ceil(distance/8)));for(let i=1;i<=steps;i++){const t=i/steps;points.push({x:prev.x+dx*t,y:prev.y+dy*t,time:prev.time+(time-prev.time)*t})}lastPointerTime=time};
    const base=()=>Math.max(4,Math.min(width,height)*.006)*widthScale;
    const drawLayer=(now,radiusScale,alphaScale,rgb)=>{const r0=base();for(const p of points){const age=Math.min(1,(now-p.time)/lifetime),radius=r0*radiusScale*(.75+age),alpha=Math.pow(1-age,1.8)*alphaScale;if(alpha<=.01)continue;const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,radius);g.addColorStop(0,`rgba(${rgb},${alpha})`);g.addColorStop(.5,`rgba(${rgb},${alpha*.38})`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fill()}};
    const draw=(now)=>{raf=requestAnimationFrame(draw);if(!ensureCanvas()||!ctx)return;while(points.length&&now-points[0].time>lifetime)points.shift();ctx.clearRect(0,0,width,height);if(!points.length)return;ctx.save();ctx.globalCompositeOperation='lighter';drawLayer(now,3,.10,'122,92,255');drawLayer(now,1.55,.22,'214,59,199');drawLayer(now,.72,.28,'255,132,215');ctx.restore()};
    const onMove=(event)=>{if(event.pointerType==='touch')return;const samples=typeof event.getCoalescedEvents==='function'?event.getCoalescedEvents():[];(samples.length?samples:[event]).forEach(e=>addPoint(e.clientX,e.clientY,performance.now()))};
    addEventListener('pointermove',onMove,{passive:true});addEventListener('pointerleave',()=>{lastPointerTime=0},{passive:true});addEventListener('resize',resize,{passive:true});raf=requestAnimationFrame(draw);window.__modernTrailCleanup=()=>{cancelAnimationFrame(raf);canvas?.remove()};
  };

  const start=()=>{addEbooks();wireInteractive(document);wireReveal();wireTrail();const observer=new MutationObserver(mutations=>{for(const mutation of mutations)mutation.addedNodes.forEach(node=>{if(!(node instanceof Element))return;wireInteractive(node.matches?.(interactiveSelector)?node.parentElement||document:node)})});observer.observe(document.documentElement,{childList:true,subtree:true})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
