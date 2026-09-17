import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import andreiaProfile from '@/assets/andreia-profile.png.asset.json'
import andreiaStudio from '@/assets/andreia-studio.png.asset.json'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Andreia | Especialista em Redes Sociais' },
      { name: 'description', content: 'Estratégia, conteúdo e crescimento nas redes sociais com Andreia.' },
      { property: 'og:title', content: 'Andreia | Especialista em Redes Sociais' },
      { property: 'og:description', content: 'Fortaleça sua presença digital com estratégia, conteúdo e posicionamento.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const customize = (frame: HTMLIFrameElement) => {
    const doc = frame.contentDocument
    if (!doc || doc.getElementById('andreia-campaign-v1')) return

    doc.title = 'Andreia | Especialista em Redes Sociais'

    const rebrand = () => {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
      const nodes: Text[] = []
      while (walker.nextNode()) nodes.push(walker.currentNode as Text)
      nodes.forEach((node) => {
        if (node.nodeValue) node.nodeValue = node.nodeValue.replace(/Ale Marques|Ale Max|Ale\b/g, 'Andreia')
      })
      doc.querySelectorAll<HTMLElement>('[alt],[title],[aria-label]').forEach((element) => {
        ;['alt', 'title', 'aria-label'].forEach((attribute) => {
          const value = element.getAttribute(attribute)
          if (value) element.setAttribute(attribute, value.replace(/Ale Marques|Ale Max|Ale\b/g, 'Andreia'))
        })
      })
    }

    rebrand()
    new MutationObserver(rebrand).observe(doc.body, { childList: true, subtree: true })

    const heroPhoto = doc.querySelector<HTMLImageElement>('#home .hero-photo')
    if (heroPhoto) {
      heroPhoto.src = andreiaProfile.url
      heroPhoto.alt = 'Andreia, especialista em redes sociais'
    }

    const aboutPhoto = doc.querySelector<HTMLImageElement>('#sobre .about-image img')
    if (aboutPhoto) {
      aboutPhoto.src = andreiaStudio.url
      aboutPhoto.alt = 'Andreia em seu estúdio de criação de conteúdo'
    }

    const heroContent = doc.querySelector('#home .hero-content')
    if (heroContent && !doc.getElementById('andreia-hero-label')) {
      const label = doc.createElement('span')
      label.id = 'andreia-hero-label'
      label.textContent = 'POSICIONAMENTO DIGITAL'
      heroContent.prepend(label)

      const cta = doc.createElement('a')
      cta.id = 'andreia-hero-cta'
      cta.href = '#servicos'
      cta.textContent = 'CONHEÇA OS SERVIÇOS  →'
      heroContent.appendChild(cta)
    }

    const hero = doc.getElementById('home')
    if (hero && !doc.getElementById('andreia-backword')) {
      const word = doc.createElement('span')
      word.id = 'andreia-backword'
      word.textContent = 'PROTAGONISTA'
      word.setAttribute('aria-hidden', 'true')
      hero.appendChild(word)
    }

    const style = doc.createElement('style')
    style.id = 'andreia-campaign-v1'
    style.textContent = `
      :root{
        --primary-bg:#151515!important;
        --secondary-bg:#1b1b1b!important;
        --tertiary-bg:#111111!important;
        --accent-green:#ffa600!important;
        --accent-blue:#ffa600!important;
        --accent-orange:#ffa600!important;
        --accent-purple:#ffa600!important;
        --text-primary:#ffffff!important;
        --text-secondary:#c8c8c8!important;
        --text-muted:#a9a9a9!important;
        --border-color:rgba(255,166,0,.22)!important;
        --gradient-primary:linear-gradient(135deg,#ffa600,#ff7a00)!important;
        --gradient-secondary:linear-gradient(135deg,#ffa600,#ff7a00)!important;
      }
      html,body{background:#151515!important;color:#fff!important;font-family:'Figtree','Poppins',sans-serif!important}
      body:before{background:radial-gradient(ellipse 55% 34% at 78% 12%,rgba(255,166,0,.12),transparent 72%),linear-gradient(180deg,#151515 0%,#101010 100%)!important}
      h1,h2,h3,h4,h5,h6,.navbar-brand{font-family:'Outfit','Poppins',sans-serif!important;letter-spacing:0!important}
      #andreia-universe,#andreia-experience{display:none!important}
      #mainNav{background:rgba(21,21,21,.86)!important;border-bottom:1px solid rgba(255,166,0,.16)!important;box-shadow:none!important}
      #mainNav .navbar-brand strong{font-family:'Outfit','Poppins',sans-serif!important;font-style:normal!important;font-size:24px!important;color:#ffa600!important;background:none!important;text-shadow:none!important;animation:none!important}
      #mainNav .nav-link{color:rgba(255,255,255,.72)!important;font-size:13px!important;font-weight:600!important}
      #mainNav .nav-link:hover{color:#ffa600!important}
      #mainNav .nav-link:after{background:#ffa600!important}

      #home{position:relative!important;isolation:isolate!important;min-height:100vh!important;padding:92px 0 46px!important;background:#151515!important;overflow:hidden!important}
      #home>.container{position:relative!important;z-index:3!important;width:min(1240px,calc(100% - 64px))!important;max-width:none!important}
      #home .row{min-height:calc(100vh - 138px)!important;align-items:center!important}
      #home .col-lg-6:first-child{width:54%!important;position:relative!important;z-index:4!important}
      #home .col-lg-6:last-child{width:46%!important;position:relative!important;z-index:3!important}
      #andreia-backword{position:absolute!important;z-index:1!important;left:50%!important;top:54%!important;transform:translate(-50%,-50%)!important;font-family:'Outfit','Poppins',sans-serif!important;font-size:clamp(124px,14vw,236px)!important;font-weight:900!important;line-height:.8!important;color:rgba(255,255,255,.025)!important;white-space:nowrap!important;pointer-events:none!important}
      #andreia-hero-label{display:inline-flex!important;margin-bottom:20px!important;padding:8px 13px!important;border:1px solid rgba(255,166,0,.36)!important;background:rgba(255,166,0,.06)!important;color:#ffa600!important;font-size:11px!important;font-weight:800!important;letter-spacing:2px!important}
      #home .hero-title{max-width:720px!important;margin:0 0 26px!important;font-size:clamp(58px,5.8vw,88px)!important;line-height:.93!important;font-weight:800!important;color:#fff!important}
      #home .hero-title .text-accent-green{display:block!important;color:#ffa600!important;background:none!important}
      #home .hero-title .text-accent-blue{color:#ffa600!important;background:none!important}
      #home .hero-subtitle{max-width:610px!important;margin:0 0 28px!important;color:rgba(255,255,255,.68)!important;font-size:18px!important;line-height:1.7!important}
      #home .hero-subtitle strong{color:#ffa600!important}
      #andreia-hero-cta{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:54px!important;padding:0 27px!important;background:#20c34b!important;color:#07130a!important;text-decoration:none!important;font-family:'Outfit','Poppins',sans-serif!important;font-size:13px!important;font-weight:800!important;letter-spacing:.7px!important;border-radius:4px!important;box-shadow:0 12px 32px rgba(32,195,75,.18)!important;transition:transform .25s ease,filter .25s ease,box-shadow .25s ease!important;animation:andreiaCtaGlow 3s ease-in-out infinite!important}
      #andreia-hero-cta:hover{transform:translateY(-3px)!important;filter:brightness(1.08)!important}
      #home .hero-image{display:flex!important;justify-content:center!important;align-items:center!important;min-height:610px!important}
      #home .image-container{width:min(500px,38vw)!important;height:min(620px,48vw)!important;max-height:650px!important;transform:none!important;position:relative!important;border-radius:0!important;overflow:hidden!important;background:#151515!important}
      #home .image-container:before,#home .image-container:after{content:''!important;display:block!important;position:absolute!important;width:120px!important;height:120px!important;z-index:5!important;pointer-events:none!important}
      #home .image-container:before{top:-15px!important;right:-15px!important;border-top:2px solid #ffa600!important;border-right:2px solid #ffa600!important}
      #home .image-container:after{bottom:-15px!important;left:-15px!important;border-bottom:2px solid #ffa600!important;border-left:2px solid #ffa600!important}
      #home .image-glow{inset:8% -8% 2%!important;background:radial-gradient(circle,rgba(255,166,0,.22),transparent 68%)!important;border-radius:0!important;filter:blur(42px)!important;opacity:.68!important;animation:andreiaHalo 5s ease-in-out infinite!important}
      #home .hero-photo{width:100%!important;max-width:none!important;height:100%!important;margin:0!important;object-fit:cover!important;object-position:center!important;border:0!important;border-radius:0!important;filter:saturate(.94) contrast(1.03)!important;box-shadow:0 34px 80px rgba(0,0,0,.38)!important}
      #home .social-orbit{inset:0!important;z-index:6!important}
      #home .social-node{width:44px!important;height:44px!important;border:1px solid rgba(255,166,0,.45)!important;background:#151515!important;color:#ffa600!important;box-shadow:0 10px 28px rgba(0,0,0,.3)!important;animation:socialFloat 6s ease-in-out infinite!important}
      #home .social-node-instagram{top:6%!important;right:4%!important}.social-node-youtube{right:1%!important}.social-node-tiktok{left:4%!important}

      #servicos,#foto-profissional,#gemini-acesso,#sobre,#depoimentos,.footer{position:relative!important;background:#151515!important;border:0!important}
      #servicos,#sobre,#depoimentos{padding:104px 0!important}
      #servicos{padding-left:clamp(24px,4vw,64px)!important;padding-right:clamp(24px,4vw,64px)!important;box-sizing:border-box!important}
      #servicos:after,#sobre:after,#depoimentos:after{display:none!important}
      #servicos>.container,#sobre>.container,#depoimentos>.container,.footer>.container{width:min(1240px,calc(100% - 64px))!important;max-width:none!important}
      .section-title{font-size:clamp(44px,5vw,70px)!important;line-height:1!important;font-weight:800!important;color:#fff!important;text-align:left!important;margin-bottom:16px!important}
      .section-title span{color:#ffa600!important;background:none!important}
      .section-subtitle{max-width:680px!important;margin:0!important;text-align:left!important;color:rgba(255,255,255,.62)!important;font-size:18px!important}
      #servicos .row:first-child,#depoimentos .row:first-child{border-top:1px solid rgba(255,166,0,.25)!important;padding-top:28px!important}
      #servicos .row.g-4{margin-top:36px!important;padding-left:clamp(14px,2vw,30px)!important;padding-right:0!important}
      #servicos .row.g-4>.col-lg-6:first-child{width:100%!important;max-width:none!important}
      #servicos .service-card:has(#ale-native-rail){max-width:none!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
      #servicos .service-card:has(#ale-native-rail):after{display:none!important}
      #ale-native-rail{display:grid!important;grid-template-columns:1fr!important;gap:0!important;width:100%!important;max-width:none!important;position:static!important;transform:none!important}
      #ale-native-rail .ale-rail-item,#ale-native-rail .ale-rail-item.active,#ale-native-rail .ale-rail-item:hover,#ale-native-rail .ale-rail-item:focus{display:grid!important;grid-template-columns:72px minmax(0,1fr) auto!important;align-items:center!important;width:100%!important;max-width:none!important;min-height:104px!important;padding:20px 18px!important;border:1px solid rgba(32,195,75,.2)!important;border-radius:8px!important;background:rgba(18,37,24,.72)!important;box-shadow:0 12px 30px rgba(0,0,0,.18)!important;color:#fff!important;transform:none!important;transition:transform .25s ease,border-color .25s ease,background .25s ease!important}
      #ale-native-rail .ale-rail-item:hover,#ale-native-rail .ale-rail-item.active{transform:translateX(6px)!important;border-color:#20c34b!important;background:rgba(20,54,30,.88)!important}
      #ale-native-rail .ale-rail-item i{width:46px!important;height:46px!important;display:grid!important;place-items:center!important;border-radius:50%!important;background:#20c34b!important;color:#07130a!important;font-size:18px!important}
      #ale-native-rail .ale-rail-item span{max-width:none!important}
      #ale-native-rail .ale-rail-item span b{font-family:'Outfit','Poppins',sans-serif!important;font-size:26px!important;color:#fff!important;white-space:normal!important}
      #ale-native-rail .ale-rail-item span small{font-size:14px!important;color:rgba(255,255,255,.55)!important;max-width:none!important;white-space:normal!important}
      #ale-native-rail .ale-rail-item:after{content:'↗'!important;font-size:24px!important;color:#20c34b!important}
      #ale-native-rail .ale-rail-item small:after{display:none!important}

      .fp-banner-section,.gm-banner-section{padding:72px 0!important;background:#111!important}
      .fp-banner-section>.container,.gm-banner-section>.container{width:min(1240px,calc(100% - 64px))!important;max-width:none!important;padding:0!important}
      .fp-banner-wrap,.gm-banner-wrap{max-width:none!important;border-radius:4px!important;border:1px solid rgba(255,166,0,.25)!important;box-shadow:0 30px 80px rgba(0,0,0,.34)!important;animation:none!important}
      .fp-banner-wrap:after,.gm-banner-wrap:after{border-radius:4px!important;box-shadow:inset 0 0 50px rgba(255,166,0,.08)!important}

      #sobre .row{gap:5%!important}
      #sobre .col-lg-6{width:47.5%!important}
      #sobre .about-image{border-radius:0!important;box-shadow:0 30px 80px rgba(0,0,0,.35)!important;position:relative!important}
      #sobre .about-image:before{content:'ANDREIA'!important;position:absolute!important;left:-8px!important;bottom:-42px!important;z-index:3!important;font-family:'Outfit','Poppins',sans-serif!important;font-size:78px!important;font-weight:900!important;color:#ffa600!important;line-height:1!important}
      #sobre .about-image img{width:100%!important;aspect-ratio:1/1!important;object-fit:cover!important;object-position:center!important;border-radius:0!important}
      #sobre .about-content{padding:20px 0 0!important}
      #sobre .about-text{font-size:17px!important;color:rgba(255,255,255,.66)!important}
      #sobre .achievement-item{border-radius:0!important;border:0!important;border-top:1px solid rgba(255,255,255,.12)!important;background:transparent!important}
      #sobre .achievement-icon{background:#ffa600!important;color:#151515!important}
      #sobre .btn-primary{background:#20c34b!important;color:#07130a!important;border-radius:4px!important;box-shadow:none!important}

      #depoimentos{background:#111!important}
      #depoimentos .testimonials-carousel{margin-top:42px!important}
      #depoimentos .testimonial-card{border-radius:4px!important;background:#191919!important;border:1px solid rgba(255,255,255,.1)!important;box-shadow:none!important}
      #depoimentos .testimonial-card:hover{border-color:rgba(255,166,0,.45)!important;transform:translateY(-5px)!important}
      #depoimentos .testimonial-rating i{color:#ffa600!important}
      .footer{padding:68px 0 34px!important;background:#0c0c0c!important;border-top:1px solid rgba(255,166,0,.2)!important}
      .footer h5,.footer h6{color:#ffa600!important;background:none!important}
      .footer .social-link{background:#ffa600!important;color:#151515!important}

      @keyframes andreiaHalo{0%,100%{opacity:.46;transform:scale(.96)}50%{opacity:.72;transform:scale(1.02)}}
      @keyframes andreiaCtaGlow{0%,100%{box-shadow:0 12px 32px rgba(32,195,75,.16)}50%{box-shadow:0 12px 42px rgba(32,195,75,.34)}}
      @media(max-width:991px){
        html,body{max-width:100%!important;overflow-x:hidden!important}
        #home>.container,#servicos>.container,#sobre>.container,#depoimentos>.container,.footer>.container,.fp-banner-section>.container,.gm-banner-section>.container{width:min(100% - 32px,720px)!important}
        #home{padding-top:84px!important}
        #home .row{min-height:auto!important}
        #home .col-lg-6:first-child,#home .col-lg-6:last-child{width:100%!important}
        #home .col-lg-6:last-child{order:-1!important}
        #home .hero-content{text-align:center!important}
        #andreia-hero-label{margin-left:auto!important;margin-right:auto!important}
        #home .hero-title{font-size:clamp(45px,10vw,66px)!important;margin-left:auto!important;margin-right:auto!important}
        #home .hero-subtitle{margin-left:auto!important;margin-right:auto!important}
        #home .image-container{width:min(430px,78vw)!important;height:min(530px,96vw)!important}
        #home .hero-image{min-height:auto!important;margin-bottom:50px!important}
        #andreia-backword{font-size:24vw!important;top:28%!important}
        #home .social-orbit{inset:0!important}
        #sobre .col-lg-6{width:100%!important}
        #sobre .about-image:before{font-size:54px!important;bottom:-30px!important}
        #servicos .row.g-4{padding-left:8px!important;padding-right:0!important}
      }
      @media(max-width:600px){
        #home{padding:80px 0 42px!important}
        #home .image-container{width:min(330px,82vw)!important;height:min(410px,102vw)!important}
        #home .hero-image{margin:8px 0 36px!important}
        #home .hero-title{font-size:42px!important;line-height:.96!important}
        #home .hero-subtitle{font-size:15px!important;line-height:1.6!important}
        #andreia-hero-cta{width:100%!important}
        #andreia-backword{display:none!important}
        #servicos,#sobre,#depoimentos{padding:72px 0!important}
        #servicos{padding-left:16px!important;padding-right:16px!important}
        .section-title{font-size:38px!important}
        #servicos .row.g-4{padding-left:6px!important;padding-right:0!important}
        #ale-native-rail .ale-rail-item,#ale-native-rail .ale-rail-item.active,#ale-native-rail .ale-rail-item:hover{grid-template-columns:52px minmax(0,1fr) 24px!important;min-height:92px!important;padding:15px 12px!important}
        #ale-native-rail .ale-rail-item span b{font-size:19px!important}
        #ale-native-rail .ale-rail-item span small{font-size:12px!important}
        .fp-banner-section,.gm-banner-section{padding:34px 0!important}
      }
      @media(prefers-reduced-motion:reduce){#home .image-glow,#andreia-hero-cta,#home .social-node{animation:none!important}}
    `
    doc.head.appendChild(style)
  }

  useEffect(() => {
    const applyCustomization = () => {
      const frame = frameRef.current
      if (frame?.contentDocument?.body) customize(frame)
    }
    applyCustomization()
    const timer = window.setInterval(applyCustomization, 250)
    const stopTimer = window.setTimeout(() => window.clearInterval(timer), 5000)
    return () => {
      window.clearInterval(timer)
      window.clearTimeout(stopTimer)
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      className="original-frame"
      src="/original/index.html?v=andreia-photos-services-v2"
      title="Andreia | Especialista em Redes Sociais"
      onLoad={(event) => customize(event.currentTarget)}
    />
  )
}