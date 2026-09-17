import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Andreia - Especialista em Redes Sociais' },
      { name: 'description', content: 'Andreia: estratégia, conteúdo e crescimento nas redes sociais.' },
      { property: 'og:title', content: 'Andreia - Especialista em Redes Sociais' },
      { property: 'og:description', content: 'Estratégia, conteúdo e crescimento nas redes sociais com Andreia.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const customize = (frame: HTMLIFrameElement) => {
    const doc = frame.contentDocument
    const win = frame.contentWindow
    if (!doc || !win || doc.getElementById('andreia-unified-theme')) return

    doc.title = 'Andreia - Especialista em Redes Sociais'

    const walker = doc.createTreeWalker(doc.body, win.NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    nodes.forEach((node) => {
      if (node.nodeValue?.includes('Ale Marques')) node.nodeValue = node.nodeValue.replaceAll('Ale Marques', 'Andreia')
      if (node.nodeValue?.includes('Quem é Ale')) node.nodeValue = node.nodeValue.replaceAll('Quem é Ale', 'Quem é Andreia')
    })

    const style = doc.createElement('style')
    style.id = 'andreia-unified-theme'
    style.textContent = `
      :root{--andreia-bg:#050711;--andreia-panel:rgba(15,18,36,.68);--andreia-line:rgba(164,119,255,.16)}
      html,body{background:var(--andreia-bg)!important}
      html{min-height:100%;background:#050711!important}
      body{position:relative!important;isolation:isolate!important;min-height:100vh!important;background:transparent!important}
      #andreia-universe{position:fixed;inset:0;width:100%;height:100%;z-index:-30;pointer-events:none;background:linear-gradient(145deg,#050711 0%,#081321 48%,#090817 100%)}
      body:before{content:"";position:fixed;inset:-15%;z-index:-29;pointer-events:none;background:radial-gradient(circle at 12% 18%,rgba(31,126,125,.14),transparent 38%),radial-gradient(circle at 78% 24%,rgba(74,93,190,.17),transparent 40%),radial-gradient(circle at 58% 78%,rgba(151,56,181,.11),transparent 42%);filter:blur(24px)}
      body:after{content:"";position:fixed;inset:0;z-index:-28;pointer-events:none;background:linear-gradient(180deg,rgba(3,5,13,.10),rgba(3,5,13,.30))}

      /* Um único fundo para toda a página: nenhuma seção pinta uma faixa própria. */
      body section,body footer,#home,#servicos,#sobre,#depoimentos,.contact-section,.footer,
      .hero-section,.services-section,.about-section,.testimonials-section,.pricing-section,
      [class*="section"],[id*="section"]{background-color:transparent!important;background-image:none!important}
      #home .hero-background{background:transparent!important;opacity:.24!important}
      #home:before,#home:after,#servicos:before,#servicos:after,#sobre:before,#sobre:after,#depoimentos:before,#depoimentos:after,
      .contact-section:before,.contact-section:after,.footer:before,.footer:after{background:none!important;box-shadow:none!important;border:0!important}

      /* Faz o encontro entre blocos desaparecer, inclusive em elementos internos de largura total. */
      section+section,section+footer,[class*="section"]+[class*="section"]{border-top:0!important;box-shadow:none!important}
      section{position:relative!important}
      section>.container,section>.container-fluid{position:relative;z-index:1}

      .service-card,.testimonial-card,.pricing-card,.contact-card{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:var(--andreia-panel)!important;border-color:var(--andreia-line)!important}
      #mainNav{background:rgba(4,5,14,.76)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important}
      .footer{background:rgba(4,5,12,.34)!important}
      .ale-brand-animated{background:linear-gradient(90deg,#fff 0%,#b8d7ff 32%,#bd8cff 58%,#fff 100%)!important;background-size:220% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;animation:andreiaGlow 7s ease-in-out infinite!important}
      @keyframes andreiaGlow{0%,100%{background-position:100% 50%;filter:drop-shadow(0 0 5px rgba(126,153,255,.15))}50%{background-position:0% 50%;filter:drop-shadow(0 0 12px rgba(170,120,255,.38))}}
      @media(prefers-reduced-motion:reduce){.ale-brand-animated{animation:none!important}}
    `
    doc.head.appendChild(style)

    const canvas = doc.createElement('canvas')
    canvas.id = 'andreia-universe'
    doc.body.prepend(canvas)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0
    let stars: Array<{x:number;y:number;r:number;s:number;a:number;p:number}> = []
    const resize = () => {
      const dpr = Math.min(win.devicePixelRatio || 1, 1.5)
      w = win.innerWidth; h = win.innerHeight
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr,0,0,dpr,0,0)
      const count = Math.min(190, Math.max(80, Math.floor((w*h)/6800)))
      stars = Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:.35+Math.random()*1.25,s:.035+Math.random()*.13,a:.22+Math.random()*.55,p:Math.random()*Math.PI*2}))
    }
    resize(); win.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      t += .011
      ctx.clearRect(0,0,w,h)
      const g1=ctx.createRadialGradient(w*.18,h*.26,0,w*.18,h*.26,Math.max(w,h)*.62)
      g1.addColorStop(0,'rgba(31,118,122,.13)');g1.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g1;ctx.fillRect(0,0,w,h)
      const g2=ctx.createRadialGradient(w*.78,h*.55,0,w*.78,h*.55,Math.max(w,h)*.58)
      g2.addColorStop(0,'rgba(77,78,170,.13)');g2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,w,h)
      stars.forEach(st=>{st.y+=st.s;if(st.y>h+3){st.y=-3;st.x=Math.random()*w}const pulse=.68+.32*Math.sin(t*2+st.p);ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fillStyle=`rgba(220,232,255,${st.a*pulse})`;ctx.fill()})
      win.requestAnimationFrame(draw)
    }
    if (!win.matchMedia('(prefers-reduced-motion: reduce)').matches) draw()
  }

  return <iframe className="original-frame" src="/original/index.html?v=andreia-unified-bg-2" title="Andreia - Especialista em Redes Sociais" onLoad={(e) => customize(e.currentTarget)} />
}
