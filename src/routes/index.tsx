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
    if (!doc || !win || doc.getElementById('andreia-cosmic-theme')) return

    doc.title = 'Andreia - Especialista em Redes Sociais'

    const replaceName = () => {
      const walker = doc.createTreeWalker(doc.body, win.NodeFilter.SHOW_TEXT)
      const nodes: Text[] = []
      while (walker.nextNode()) nodes.push(walker.currentNode as Text)
      nodes.forEach((node) => {
        if (node.nodeValue?.includes('Ale Marques')) node.nodeValue = node.nodeValue.replaceAll('Ale Marques', 'Andreia')
        if (node.nodeValue?.includes('Quem é Ale')) node.nodeValue = node.nodeValue.replaceAll('Quem é Ale', 'Quem é Andreia')
      })
    }
    replaceName()

    const style = doc.createElement('style')
    style.id = 'andreia-cosmic-theme'
    style.textContent = `
      html,body{background:#03040c!important}
      body{position:relative!important;isolation:isolate!important}
      #andreia-universe{position:fixed;inset:0;width:100%;height:100%;z-index:-20;pointer-events:none;background:#02030a}
      body:before{content:"";position:fixed;inset:0;z-index:-19;pointer-events:none;background:radial-gradient(circle at 18% 24%,rgba(82,62,190,.20),transparent 34%),radial-gradient(circle at 82% 65%,rgba(16,110,190,.16),transparent 36%),linear-gradient(180deg,rgba(2,3,10,.22),rgba(2,3,10,.68))}
      #home,#servicos,#sobre,#depoimentos,.contact-section,.footer{background:transparent!important}
      #home .hero-background{background:transparent!important;opacity:.35!important}
      #servicos:after,#sobre:after,#depoimentos:after,#home:after{opacity:.30!important}
      .service-card,.testimonial-card,.pricing-card,.contact-card{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background-color:rgba(18,18,35,.72)!important}
      #mainNav{background:rgba(4,5,14,.78)!important;backdrop-filter:blur(18px)!important}
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

    let w = 0, h = 0, stars: Array<{x:number;y:number;r:number;s:number;a:number;p:number}> = []
    const resize = () => {
      const dpr = Math.min(win.devicePixelRatio || 1, 1.5)
      w = win.innerWidth; h = win.innerHeight
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr,0,0,dpr,0,0)
      const count = Math.min(180, Math.max(75, Math.floor((w*h)/7000)))
      stars = Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:.35+Math.random()*1.35,s:.04+Math.random()*.16,a:.28+Math.random()*.65,p:Math.random()*Math.PI*2}))
    }
    resize(); win.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      t += .012
      ctx.clearRect(0,0,w,h)
      const g1=ctx.createRadialGradient(w*.22,h*.30,0,w*.22,h*.30,Math.max(w,h)*.55)
      g1.addColorStop(0,'rgba(78,48,160,.15)');g1.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g1;ctx.fillRect(0,0,w,h)
      const g2=ctx.createRadialGradient(w*.78,h*.62,0,w*.78,h*.62,Math.max(w,h)*.48)
      g2.addColorStop(0,'rgba(20,105,170,.11)');g2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,w,h)
      stars.forEach(st=>{st.y+=st.s;if(st.y>h+3){st.y=-3;st.x=Math.random()*w}const pulse=.65+.35*Math.sin(t*2+st.p);ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fillStyle=`rgba(220,232,255,${st.a*pulse})`;ctx.fill()})
      win.requestAnimationFrame(draw)
    }
    if (!win.matchMedia('(prefers-reduced-motion: reduce)').matches) draw()
  }

  return <iframe className="original-frame" src="/original/index.html?v=andreia-cosmic-1" title="Andreia - Especialista em Redes Sociais" onLoad={(e) => customize(e.currentTarget)} />
}
