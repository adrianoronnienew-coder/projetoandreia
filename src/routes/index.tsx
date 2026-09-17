import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({meta:[
    { title: 'Andreia - Especialista em Redes Sociais' },
    { name:'description',content:'Andreia: estratégia, conteúdo e crescimento nas redes sociais.' },
    { property:'og:title',content:'Andreia - Especialista em Redes Sociais' },
    { property:'og:description',content:'Estratégia, conteúdo e crescimento nas redes sociais com Andreia.' },
    { property:'og:type',content:'website' },{ name:'twitter:card',content:'summary_large_image' },
  ]}),component:HomePage,
})

function HomePage(){
 const customize=(frame:HTMLIFrameElement)=>{
  const doc=frame.contentDocument,win=frame.contentWindow
  if(!doc||!win||doc.getElementById('andreia-reform-v4'))return
  doc.title='Andreia - Especialista em Redes Sociais'

  const rebrand=()=>{
   const walker=doc.createTreeWalker(doc.body,win.NodeFilter.SHOW_TEXT),nodes:Text[]=[]
   while(walker.nextNode())nodes.push(walker.currentNode as Text)
   nodes.forEach(n=>{if(n.nodeValue)n.nodeValue=n.nodeValue.replace(/Ale Marques|Ale Max|Ale\b/g,'Andreia')})
   doc.querySelectorAll<HTMLElement>('[alt],[title],[aria-label]').forEach(el=>['alt','title','aria-label'].forEach(a=>{const v=el.getAttribute(a);if(v)el.setAttribute(a,v.replace(/Ale Marques|Ale Max|Ale\b/g,'Andreia'))}))
  }
  rebrand();new win.MutationObserver(rebrand).observe(doc.body,{childList:true,subtree:true})

  const style=doc.createElement('style');style.id='andreia-reform-v4';style.textContent=`
   #andreia-universe{position:fixed;inset:0;width:100%;height:100%;z-index:-30;pointer-events:none;background:transparent}
   #mainNav{border-bottom:1px solid rgba(255,255,255,.06)!important}.navbar-brand strong{letter-spacing:-.8px!important}
   #home .hero-title{font-size:clamp(48px,5.1vw,78px)!important;line-height:1.02!important;letter-spacing:-2.3px!important;font-weight:800!important}
   #home .hero-subtitle{max-width:680px!important;font-size:19px!important;line-height:1.72!important;color:rgba(238,239,247,.78)!important}
   .section-title{font-size:clamp(36px,4vw,56px)!important;letter-spacing:-1.7px!important;line-height:1.08!important}
   .service-card,.testimonial-card,.pricing-card,.contact-card,.ebook-card,.eb-card{border-radius:24px!important;background:linear-gradient(145deg,rgba(25,29,57,.78),rgba(12,15,33,.72))!important;border:1px solid rgba(183,154,255,.17)!important;box-shadow:0 18px 60px rgba(0,0,0,.18)!important;backdrop-filter:blur(16px)!important;transition:.3s ease!important}
   .service-card:hover,.testimonial-card:hover,.pricing-card:hover{transform:translateY(-7px)!important;border-color:rgba(214,92,225,.32)!important;box-shadow:0 26px 80px rgba(0,0,0,.30)!important}
   .btn,.service-btn,.cta-button,.whatsapp-btn,a[class*="btn"]{border-radius:999px!important}
   #andreia-experience{position:relative;padding:95px 20px;color:#fff;background:transparent!important}
   .ax-wrap{width:min(1080px,100%);margin:auto}.ax-head{text-align:center;max-width:780px;margin:0 auto 36px}.ax-pill{display:inline-flex;padding:8px 14px;border:1px solid rgba(190,148,255,.25);background:rgba(108,67,184,.10);border-radius:999px;color:#d0baff;font-size:12px;font-weight:800;letter-spacing:1.5px}.ax-head h2{font-size:clamp(38px,4.8vw,60px);line-height:1.06;letter-spacing:-2px;margin:17px 0 12px;font-weight:800}.ax-head h2 span{background:linear-gradient(90deg,#b7dcff,#c676ff,#ed5dce);-webkit-background-clip:text;background-clip:text;color:transparent}.ax-head p{color:rgba(238,239,247,.7);font-size:17px;line-height:1.65}.ax-progress{height:10px;max-width:760px;margin:0 auto 34px;background:rgba(255,255,255,.07);border-radius:999px;overflow:hidden}.ax-progress i{display:block;width:89%;height:100%;background:linear-gradient(90deg,#725cff,#c047d2,#e05abf);border-radius:inherit}.ax-media{aspect-ratio:16/9;max-width:900px;margin:0 auto 32px;border-radius:26px;border:1px solid rgba(190,148,255,.18);background:linear-gradient(145deg,rgba(25,29,58,.72),rgba(8,11,27,.84));box-shadow:0 30px 90px rgba(0,0,0,.28);display:grid;place-items:center}.ax-play{width:82px;height:82px;border-radius:50%;display:grid;place-items:center;padding-left:5px;background:linear-gradient(135deg,#755cff,#d247c8);box-shadow:0 0 45px rgba(174,76,221,.35);font-size:27px}.ax-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.ax-card{padding:30px;border-radius:24px;border:1px solid rgba(190,148,255,.15);background:linear-gradient(145deg,rgba(25,29,58,.70),rgba(9,12,29,.75));box-shadow:0 18px 60px rgba(0,0,0,.18)}.ax-step{display:inline-flex;padding:7px 12px;border-radius:9px;background:linear-gradient(135deg,#795cff,#c846cb);font-size:12px;font-weight:800;letter-spacing:1px}.ax-card h3{font-size:25px;margin:17px 0 9px}.ax-card p{color:rgba(238,239,247,.68);line-height:1.65;font-size:15px}.ax-button{display:inline-flex;margin-top:9px;padding:14px 21px;border-radius:999px;background:linear-gradient(135deg,#12a84a,#20d878);color:white!important;text-decoration:none!important;font-weight:800}.ax-note{margin-top:17px;padding:14px 15px;border-radius:14px;background:rgba(255,255,255,.045);color:rgba(238,239,247,.72);font-size:14px;line-height:1.55}.ax-bottom{margin-top:20px;padding:26px 30px;border:1px solid rgba(190,148,255,.14);border-radius:22px;background:rgba(15,18,38,.58);display:flex;align-items:center;justify-content:space-between;gap:20px}.ax-bottom h3{margin:0 0 4px;font-size:22px}.ax-bottom p{margin:0;color:rgba(238,239,247,.65)}
   @media(max-width:760px){#andreia-experience{padding:70px 16px}.ax-grid{grid-template-columns:1fr}.ax-card{padding:24px 20px}.ax-bottom{flex-direction:column;text-align:center}.ax-media{border-radius:18px}#home .hero-title{font-size:clamp(42px,10vw,60px)!important}}
  `;doc.head.appendChild(style)

  if(!doc.getElementById('andreia-experience')){
   const s=doc.createElement('section');s.id='andreia-experience';s.innerHTML=`<div class="ax-wrap"><div class="ax-head"><span class="ax-pill">EXPERIÊNCIA ANDREIA</span><h2>Só mais <span>um passo...</span></h2><p>Uma nova área integrada à página para orientar os próximos passos e deixar a experiência mais clara, moderna e própria da Andreia.</p></div><div class="ax-progress"><i></i></div><div class="ax-media"><div class="ax-play">▶</div></div><div class="ax-grid"><article class="ax-card"><span class="ax-step">PASSO 1</span><h3>Entre no grupo do WhatsApp</h3><p>Receba avisos, novidades e materiais importantes diretamente pelo WhatsApp.</p><a class="ax-button" href="#contato">● ENTRAR NO GRUPO</a></article><article class="ax-card"><span class="ax-step">PASSO 2</span><h3>Confirme seu e-mail</h3><p>Procure a mensagem de confirmação na sua caixa de entrada. Se necessário, confira também o spam.</p><div class="ax-note"><b>Importante:</b> confirme o recebimento para não perder nenhum aviso da Andreia.</div></article></div><div class="ax-bottom"><div><h3>Ainda não entrou no grupo?</h3><p>É por lá que os principais avisos e materiais serão enviados.</p></div><a class="ax-button" href="#contato">● ENTRAR NO GRUPO</a></div></div>`
   const target=doc.querySelector('#contato,.contact-section,.footer');target?.parentNode?.insertBefore(s,target)
  }

  const canvas=doc.createElement('canvas');canvas.id='andreia-universe';doc.body.prepend(canvas);const ctx=canvas.getContext('2d');if(!ctx)return
  let w=0,h=0,stars:Array<{x:number;y:number;r:number;s:number;a:number;p:number}>=[]
  const resize=()=>{const dpr=Math.min(win.devicePixelRatio||1,1.5);w=win.innerWidth;h=win.innerHeight;canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(190,Math.max(80,Math.floor(w*h/6800)))},()=>({x:Math.random()*w,y:Math.random()*h,r:.35+Math.random()*1.25,s:.035+Math.random()*.13,a:.22+Math.random()*.55,p:Math.random()*Math.PI*2}))};resize();win.addEventListener('resize',resize);let t=0
  const draw=()=>{t+=.011;ctx.clearRect(0,0,w,h);stars.forEach(st=>{st.y+=st.s;if(st.y>h+3){st.y=-3;st.x=Math.random()*w}const p=.68+.32*Math.sin(t*2+st.p);ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fillStyle=`rgba(220,232,255,${st.a*p})`;ctx.fill()});win.requestAnimationFrame(draw)};if(!win.matchMedia('(prefers-reduced-motion: reduce)').matches)draw()
 }
 return <iframe className="original-frame" src="/original/index.html?v=andreia-reform-v4" title="Andreia - Especialista em Redes Sociais" onLoad={e=>customize(e.currentTarget)}/>
}
