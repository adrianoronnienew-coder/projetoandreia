import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import andreiaProfile from '@/assets/andreia-profile-new.png.asset.json'
import andreiaStudio from '@/assets/andreia-studio.png.asset.json'
import tiktokGuide from '@/assets/guia-tiktok-do-zero.pdf.asset.json'
import tiktokGuideCover from '@/assets/tiktok-do-zero-capa.jpg.asset.json'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Andreia Moncores | Especialista em Redes Sociais' },
      { name: 'description', content: 'Estratégia, conteúdo e crescimento nas redes sociais com Andreia.' },
      { property: 'og:title', content: 'Andreia Moncores | Especialista em Redes Sociais' },
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
    if (!doc || doc.getElementById('andreia-campaign-v2')) return

    doc.title = 'Andreia Moncores | Especialista em Redes Sociais'

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
    const brandName = doc.querySelector<HTMLElement>('#mainNav .navbar-brand strong')
    if (brandName) {
      brandName.textContent = 'Andreia Moncores'
      brandName.classList.add('andreia-moncores-brand')
    }
    new MutationObserver(() => {
      rebrand()
      const currentBrand = doc.querySelector<HTMLElement>('#mainNav .navbar-brand strong')
      if (currentBrand && currentBrand.textContent?.trim() !== 'Andreia Moncores') currentBrand.textContent = 'Andreia Moncores'
    }).observe(doc.body, { childList: true, subtree: true })

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

    const oldEbookArea = doc.getElementById('ebooks-area')
    if (oldEbookArea) oldEbookArea.remove()

    const ebookArea = doc.createElement('section')
    ebookArea.id = 'ebooks-area'
    ebookArea.setAttribute('aria-labelledby', 'ebook-title')
    ebookArea.innerHTML = `
      <div class="andreia-ebook-inner">
        <div class="andreia-ebook-copy">
          <span class="andreia-ebook-kicker">E-BOOK GRATUITO</span>
          <h2 id="ebook-title">TikTok do Zero</h2>
          <p class="andreia-ebook-lead">Um guia prático para criar sua conta, configurar seu perfil e publicar conteúdos que engajam.</p>
          <ul class="andreia-ebook-list">
            <li>Estratégias simples para começar</li>
            <li>Modelos de conteúdo e ganchos</li>
            <li>Desafio prático de 7 dias</li>
          </ul>
          <button class="andreia-ebook-download" type="button">RECEBER MEU E-BOOK <span aria-hidden="true">↓</span></button>
          <small>Download gratuito em PDF.</small>
        </div>
        <div class="andreia-ebook-cover">
          <img src="${tiktokGuideCover.url}" alt="Capa do e-book TikTok do Zero — Guia Prático para Iniciantes">
        </div>
      </div>
    `

    const ebookAnchor = doc.getElementById('gemini-acesso')
    const aboutSection = doc.getElementById('sobre')
    if (ebookAnchor) ebookAnchor.insertAdjacentElement('afterend', ebookArea)
    else if (aboutSection) aboutSection.insertAdjacentElement('beforebegin', ebookArea)
    else doc.querySelector('main')?.appendChild(ebookArea)

    const channelDialog = doc.createElement('div')
    channelDialog.id = 'andreia-channel-dialog'
    channelDialog.setAttribute('role', 'dialog')
    channelDialog.setAttribute('aria-modal', 'true')
    channelDialog.setAttribute('aria-labelledby', 'channel-dialog-title')
    channelDialog.setAttribute('aria-hidden', 'true')
    channelDialog.innerHTML = `
      <div class="andreia-dialog-backdrop" data-dialog-close></div>
      <div class="andreia-dialog-panel">
        <button class="andreia-dialog-close" type="button" aria-label="Fechar" data-dialog-close>×</button>
        <span class="andreia-dialog-icon" aria-hidden="true"><i class="fab fa-whatsapp"></i></span>
        <span class="andreia-dialog-kicker">E-BOOK GRATUITO</span>
        <h3 id="channel-dialog-title">Receba mais dicas gratuitas</h3>
        <p class="andreia-dialog-intro">Siga estas etapas para receber o seu e-book:</p>
        <ol class="andreia-dialog-steps">
          <li><span>1</span><p>Clique no botão abaixo para entrar no canal.</p></li>
          <li><span>2</span><p>No WhatsApp, toque em <strong>Seguir</strong>.</p></li>
          <li><span>3</span><p>Volte para esta página. O download começará automaticamente, em até 10 segundos.</p></li>
        </ol>
        <a href="https://whatsapp.com/channel/0029VbDHbAj545usvXVmYC0q" target="_blank" rel="noopener noreferrer">INSCREVA-SE AGORA NO CANAL E BAIXE</a>
        <button class="andreia-dialog-later" type="button" data-dialog-close>Agora não</button>
      </div>
    `
    doc.body.appendChild(channelDialog)

    const closeDialog = () => {
      channelDialog.classList.remove('is-open')
      channelDialog.setAttribute('aria-hidden', 'true')
    }
    channelDialog.querySelectorAll<HTMLElement>('[data-dialog-close]').forEach((control) => {
      control.addEventListener('click', closeDialog)
    })
    const channelLink = channelDialog.querySelector<HTMLAnchorElement>('a')
    let downloadPending = false
    let channelVisited = false
    let downloadTimer: number | undefined
    const startDownload = () => {
      if (!downloadPending) return
      downloadPending = false
      if (downloadTimer !== undefined) window.clearTimeout(downloadTimer)
      downloadTimer = undefined
      channelVisited = false
      const download = doc.createElement('a')
      download.href = tiktokGuide.url
      download.download = 'TikTok-do-Zero-Guia-Pratico.pdf'
      download.target = '_blank'
      download.rel = 'noopener'
      doc.body.appendChild(download)
      download.click()
      download.remove()
    }
    doc.addEventListener('visibilitychange', () => {
      if (!downloadPending) return
      if (doc.hidden) channelVisited = true
      else if (channelVisited && downloadTimer === undefined) {
        downloadTimer = window.setTimeout(startDownload, 10000)
      }
    })
    channelLink?.addEventListener('click', () => {
      downloadPending = true
      channelVisited = false
      if (downloadTimer !== undefined) window.clearTimeout(downloadTimer)
      downloadTimer = undefined
      closeDialog()
    })
    ebookArea.querySelector('.andreia-ebook-download')?.addEventListener('click', () => {
      channelDialog.classList.add('is-open')
      channelDialog.setAttribute('aria-hidden', 'false')
      window.setTimeout(() => channelLink?.focus(), 100)
    })

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

    const heroTitle = doc.querySelector<HTMLHeadingElement>('#home .hero-title')
    const titleBreak = heroTitle?.querySelector('br')
    if (heroTitle && titleBreak && !heroTitle.querySelector('.andreia-role')) {
      const role = doc.createElement('span')
      role.className = 'andreia-role'
      while (titleBreak.nextSibling) role.appendChild(titleBreak.nextSibling)
      titleBreak.replaceWith(role)
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
    style.id = 'andreia-campaign-v2'
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
      html,body{max-width:100%!important;overflow-x:hidden!important;background:#151515!important;color:#fff!important;font-family:'Figtree','Poppins',sans-serif!important}
      body:before{background:radial-gradient(ellipse 55% 34% at 78% 12%,rgba(255,166,0,.12),transparent 72%),linear-gradient(180deg,#151515 0%,#101010 100%)!important}
      h1,h2,h3,h4,h5,h6,.navbar-brand{font-family:'Outfit','Poppins',sans-serif!important;letter-spacing:0!important}
      #andreia-universe,#andreia-experience{display:none!important}
      #mainNav{background:rgba(21,21,21,.86)!important;border-bottom:1px solid rgba(255,166,0,.16)!important;box-shadow:none!important}
      #mainNav .navbar-brand strong{position:relative!important;display:inline-block!important;overflow:hidden!important;font-family:'Playfair Display','Cormorant Garamond','Georgia',serif!important;font-style:italic!important;font-size:34px!important;line-height:1.05!important;font-weight:700!important;letter-spacing:.15px!important;color:#ffa600!important;background:linear-gradient(90deg,#ffa600 0%,#ffbd3d 35%,#fff4c2 50%,#ffbd3d 64%,#ffa600 100%)!important;background-size:230% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;text-shadow:0 0 18px rgba(255,166,0,.18)!important;animation:andreiaNameMirror 4.2s linear infinite!important}
      #mainNav .navbar-brand strong:after{content:''!important;position:absolute!important;top:-30%!important;bottom:-30%!important;width:32px!important;left:-45px!important;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),rgba(255,255,255,.95),rgba(255,255,255,.16),transparent)!important;transform:skewX(-18deg)!important;animation:andreiaNameSweep 4.2s ease-in-out infinite!important;pointer-events:none!important}
      @keyframes andreiaNameMirror{0%,100%{background-position:115% 50%}50%{background-position:-15% 50%}}
      @keyframes andreiaNameSweep{0%,14%{left:-45px;opacity:0}22%{opacity:1}56%{left:calc(100% + 20px);opacity:1}64%,100%{left:calc(100% + 20px);opacity:0}}
      #mainNav .nav-link{color:rgba(255,255,255,.72)!important;font-size:13px!important;font-weight:600!important}
      #mainNav .nav-link:hover{color:#ffa600!important}
      #mainNav .nav-link:after{background:#ffa600!important}

      #home{position:relative!important;isolation:isolate!important;min-height:100vh!important;padding:92px 0 46px!important;background:#151515!important;overflow:hidden!important}
      #home>.container{position:relative!important;z-index:3!important;width:min(1240px,calc(100% - 64px))!important;max-width:none!important}
      #home .row{min-height:calc(100vh - 138px)!important;align-items:center!important}
      #home .col-lg-6:first-child{width:54%!important;position:relative!important;z-index:4!important}
      #home .col-lg-6:last-child{width:46%!important;position:relative!important;z-index:3!important}
      #andreia-backword{display:none!important}
      #andreia-hero-label{display:inline-flex!important;margin-bottom:20px!important;padding:8px 13px!important;border:1px solid rgba(255,166,0,.36)!important;background:rgba(255,166,0,.06)!important;color:#ffa600!important;font-size:11px!important;font-weight:800!important;letter-spacing:2px!important}
      #home .hero-title{max-width:720px!important;margin:0 0 26px!important;font-size:clamp(58px,5.8vw,88px)!important;line-height:.93!important;font-weight:800!important;color:#fff!important}
      #home .hero-title .text-accent-green{display:block!important;color:#ffa600!important;background:none!important}
      #home .hero-title .text-accent-blue{color:#ffa600!important;background:none!important}
      #home .hero-title .andreia-role{display:block!important;margin-top:28px!important;font-size:clamp(38px,4vw,58px)!important;line-height:1.04!important;color:#fff!important}
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
      #home .hero-photo{width:100%!important;max-width:none!important;height:100%!important;margin:0!important;object-fit:cover!important;object-position:center 30%!important;border:0!important;border-radius:0!important;filter:saturate(.94) contrast(1.03)!important;box-shadow:0 34px 80px rgba(0,0,0,.38)!important}
      #home .social-orbit{inset:0!important;z-index:6!important}
      #home .social-node{width:44px!important;height:44px!important;border:1px solid rgba(255,166,0,.45)!important;background:#151515!important;color:#ffa600!important;box-shadow:0 10px 28px rgba(0,0,0,.3)!important;animation:socialFloat 6s ease-in-out infinite!important}
      #home .social-node-instagram{top:6%!important;right:4%!important}.social-node-youtube{right:1%!important}.social-node-tiktok{left:4%!important}

      #servicos,#foto-profissional,#gemini-acesso,#sobre,#depoimentos,.footer{position:relative!important;background:#151515!important;border:0!important}
      #servicos,#sobre,#depoimentos{padding:104px 0!important}
      #servicos{padding-left:max(32px,calc((100vw - 1216px)/2))!important;padding-right:max(32px,calc((100vw - 1216px)/2))!important;box-sizing:border-box!important}
      #servicos:after,#sobre:after,#depoimentos:after{display:none!important}
      #servicos>.container,#sobre>.container,#depoimentos>.container,.footer>.container{width:min(1240px,calc(100% - 64px))!important;max-width:none!important}
      .section-title{font-size:clamp(44px,5vw,70px)!important;line-height:1!important;font-weight:800!important;color:#fff!important;text-align:left!important;margin-bottom:16px!important}
      .section-title span{color:#ffa600!important;background:none!important}
      .section-subtitle{max-width:680px!important;margin:0!important;text-align:left!important;color:rgba(255,255,255,.62)!important;font-size:18px!important}
      #servicos .row:first-child,#depoimentos .row:first-child{border-top:1px solid rgba(255,166,0,.25)!important;padding-top:28px!important}
      #servicos .row{margin-left:0!important;margin-right:0!important}
      #servicos .row>[class*='col-']{padding-left:0!important;padding-right:0!important}
      #servicos .row.g-4{margin-top:36px!important;padding-left:0!important;padding-right:0!important}
      #servicos .row.g-4>.col-lg-6:first-child{width:100%!important;max-width:none!important}
      #servicos .service-card:has(#ale-native-rail){max-width:none!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
      #servicos .service-card:has(#ale-native-rail):after{display:none!important}
      #ale-native-rail{display:grid!important;grid-template-columns:1fr!important;gap:18px!important;width:100%!important;max-width:none!important;position:static!important;transform:none!important}
      #ale-native-rail .ale-rail-item,#ale-native-rail .ale-rail-item.active,#ale-native-rail .ale-rail-item:hover,#ale-native-rail .ale-rail-item:focus{display:grid!important;grid-template-columns:88px minmax(0,1fr)!important;align-items:center!important;width:100%!important;max-width:none!important;height:auto!important;min-height:112px!important;padding:12px 28px 12px 12px!important;border:1px solid rgba(255,255,255,.1)!important;border-radius:999px!important;background:#0d0d12!important;box-shadow:0 12px 30px rgba(0,0,0,.2)!important;color:#fff!important;overflow:hidden!important;transform:none!important;transition:transform .25s ease,border-color .25s ease!important}
      #ale-native-rail .ale-rail-item:hover,#ale-native-rail .ale-rail-item.active{transform:translateY(-2px)!important;border-color:rgba(255,166,0,.42)!important;background:#0d0d12!important}
      #ale-native-rail .ale-rail-item i{width:76px!important;height:76px!important;min-width:76px!important;display:grid!important;place-items:center!important;border-radius:50%!important;background:linear-gradient(135deg,#a83bd6,#168dff)!important;color:#fff!important;font-size:26px!important}
      #ale-native-rail .ale-rail-item:nth-child(-n+2) i{background:linear-gradient(135deg,#61e96d,#19b87a)!important}
      #ale-native-rail .ale-rail-item span{max-width:none!important}
      #ale-native-rail .ale-rail-item span b{font-family:'Outfit','Poppins',sans-serif!important;font-size:22px!important;color:#fff!important;white-space:normal!important}
      #ale-native-rail .ale-rail-item span small{font-size:15px!important;color:rgba(255,255,255,.64)!important;max-width:none!important;white-space:normal!important}
      #ale-native-rail .ale-rail-item:after{display:none!important;content:none!important}
      #ale-native-rail .ale-rail-item small:after{display:none!important}

      .fp-banner-section,.gm-banner-section{padding:72px 0!important;background:#111!important}
      .fp-banner-section>.container,.gm-banner-section>.container{width:min(1240px,calc(100% - 64px))!important;max-width:none!important;padding:0!important}
      .fp-banner-wrap,.gm-banner-wrap{max-width:none!important;border-radius:4px!important;border:1px solid rgba(255,166,0,.25)!important;box-shadow:0 30px 80px rgba(0,0,0,.34)!important;animation:none!important}
      .fp-banner-wrap:after,.gm-banner-wrap:after{border-radius:4px!important;box-shadow:inset 0 0 50px rgba(255,166,0,.08)!important}

      #sobre .row{gap:5%!important}
      #sobre .col-lg-6{width:47.5%!important}
      #sobre .about-image{border-radius:0!important;box-shadow:0 30px 80px rgba(0,0,0,.35)!important;position:relative!important;overflow:visible!important;isolation:isolate!important}
      #sobre .about-image:before{display:none!important;content:none!important}
      #sobre .about-image img{width:100%!important;aspect-ratio:1/1!important;object-fit:cover!important;object-position:center!important;border-radius:0!important}
      #sobre .about-badge{left:50%!important;right:auto!important;top:auto!important;bottom:-18px!important;z-index:8!important;width:max-content!important;max-width:calc(100% - 32px)!important;min-height:38px!important;padding:9px 14px!important;transform:translateX(-50%)!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;border:1px solid rgba(255,166,0,.42)!important;border-radius:4px!important;background:#151515!important;color:#fff!important;box-shadow:0 10px 28px rgba(0,0,0,.32)!important}
      #sobre .about-badge i{font-size:13px!important;color:#ffa600!important}
      #sobre .about-badge span{font-size:12px!important;line-height:1.2!important;font-weight:700!important;letter-spacing:.3px!important;white-space:nowrap!important}
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

      #ebooks-area{position:relative!important;padding:96px 0!important;background:#111!important;overflow:hidden!important}
      #ebooks-area .andreia-ebook-inner{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(300px,430px)!important;align-items:center!important;gap:clamp(54px,7vw,110px)!important;width:min(1160px,calc(100% - 64px))!important;margin:0 auto!important}
      .andreia-ebook-copy{position:relative!important;z-index:2!important}
      .andreia-ebook-kicker{display:inline-block!important;margin-bottom:16px!important;color:#ffa600!important;font-size:12px!important;font-weight:900!important;letter-spacing:2px!important}
      .andreia-ebook-copy h2{margin:0 0 20px!important;color:#fff!important;font-size:clamp(46px,5.4vw,76px)!important;line-height:.95!important;font-weight:800!important}
      .andreia-ebook-lead{max-width:620px!important;margin:0 0 25px!important;color:rgba(255,255,255,.7)!important;font-size:18px!important;line-height:1.65!important}
      .andreia-ebook-list{display:grid!important;gap:10px!important;margin:0 0 30px!important;padding:0!important;list-style:none!important;color:#fff!important}
      .andreia-ebook-list li{position:relative!important;padding-left:28px!important;font-size:15px!important}
      .andreia-ebook-list li:before{content:'✓'!important;position:absolute!important;left:0!important;top:0!important;color:#20c34b!important;font-weight:900!important}
      .andreia-ebook-download{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:14px!important;min-height:56px!important;padding:0 28px!important;border:0!important;border-radius:4px!important;background:#20c34b!important;color:#07130a!important;font:800 13px 'Outfit','Poppins',sans-serif!important;letter-spacing:.6px!important;cursor:pointer!important;box-shadow:0 14px 34px rgba(32,195,75,.2)!important;transition:transform .25s ease,filter .25s ease!important}
      .andreia-ebook-download:hover{transform:translateY(-3px)!important;filter:brightness(1.08)!important}
      .andreia-ebook-download span{font-size:20px!important}
      .andreia-ebook-copy>small{display:block!important;margin-top:12px!important;color:rgba(255,255,255,.48)!important;font-size:12px!important}
      .andreia-ebook-cover{position:relative!important;padding:16px!important;border:1px solid rgba(255,166,0,.3)!important;background:#191919!important;box-shadow:0 32px 80px rgba(0,0,0,.4)!important;transform:rotate(2deg)!important;transition:transform .35s ease!important}
      .andreia-ebook-cover:hover{transform:rotate(0deg) translateY(-5px)!important}
      .andreia-ebook-cover img{display:block!important;width:100%!important;height:auto!important}
      #andreia-channel-dialog{position:fixed!important;inset:0!important;z-index:10050!important;display:none!important;place-items:center!important;padding:20px!important}
      #andreia-channel-dialog.is-open{display:grid!important}
      .andreia-dialog-backdrop{position:absolute!important;inset:0!important;background:rgba(0,0,0,.78)!important;backdrop-filter:blur(6px)!important}
      .andreia-dialog-panel{position:relative!important;z-index:1!important;width:min(440px,100%)!important;padding:42px 34px 30px!important;border:1px solid rgba(255,166,0,.32)!important;border-radius:6px!important;background:#151515!important;color:#fff!important;text-align:center!important;box-shadow:0 30px 90px rgba(0,0,0,.58)!important}
      .andreia-dialog-close{position:absolute!important;top:10px!important;right:12px!important;width:36px!important;height:36px!important;padding:0!important;border:0!important;background:transparent!important;color:rgba(255,255,255,.65)!important;font-size:28px!important;line-height:1!important;cursor:pointer!important}
      .andreia-dialog-icon{display:grid!important;place-items:center!important;width:58px!important;height:58px!important;margin:0 auto 18px!important;border-radius:50%!important;background:#20c34b!important;color:#07130a!important;font-size:29px!important}
      .andreia-dialog-kicker{color:#ffa600!important;font-size:10px!important;font-weight:900!important;letter-spacing:1.8px!important}
      .andreia-dialog-panel h3{margin:9px 0 12px!important;color:#fff!important;font-size:30px!important;line-height:1.08!important}
      .andreia-dialog-panel .andreia-dialog-intro{margin:0 0 18px!important;color:rgba(255,255,255,.68)!important;font-size:15px!important;line-height:1.55!important}
      .andreia-dialog-steps{display:grid!important;gap:12px!important;margin:0 0 24px!important;padding:0!important;list-style:none!important;text-align:left!important}
      .andreia-dialog-steps li{display:grid!important;grid-template-columns:28px minmax(0,1fr)!important;align-items:start!important;gap:10px!important}
      .andreia-dialog-steps li>span{display:grid!important;place-items:center!important;width:28px!important;height:28px!important;border-radius:50%!important;background:#ffa600!important;color:#151515!important;font-size:12px!important;font-weight:900!important}
      .andreia-dialog-steps p{margin:3px 0 0!important;color:rgba(255,255,255,.72)!important;font-size:14px!important;line-height:1.45!important}
      .andreia-dialog-steps strong{color:#fff!important;font-weight:800!important}
      .andreia-dialog-panel>a{display:flex!important;align-items:center!important;justify-content:center!important;min-height:52px!important;padding:10px 18px!important;border-radius:4px!important;background:#20c34b!important;color:#07130a!important;text-decoration:none!important;font-size:13px!important;font-weight:900!important;animation:andreia-channel-pulse 1.4s ease-in-out infinite!important}
      @keyframes andreia-channel-pulse{0%,100%{transform:scale(1);filter:brightness(1);box-shadow:0 0 0 0 rgba(32,195,75,.38)}50%{transform:scale(1.025);filter:brightness(1.1);box-shadow:0 0 0 8px rgba(32,195,75,0)}}
      @media (prefers-reduced-motion:reduce){.andreia-dialog-panel>a{animation:none!important}}
      .andreia-dialog-later{margin-top:13px!important;padding:7px 12px!important;border:0!important;background:transparent!important;color:rgba(255,255,255,.58)!important;font-size:12px!important;cursor:pointer!important}

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
        #home .hero-title .andreia-role{margin-top:24px!important;font-size:clamp(34px,6.2vw,46px)!important;line-height:1.08!important}
        #home .hero-subtitle{margin-left:auto!important;margin-right:auto!important}
        #home .image-container{width:min(430px,78vw)!important;height:min(530px,96vw)!important}
        #home .hero-image{min-height:auto!important;margin-bottom:50px!important}
        #home .social-orbit{inset:0!important}
        #sobre .col-lg-6{width:100%!important}
        #sobre .row{gap:52px!important}
        #sobre .about-content{padding-top:0!important}
        #servicos .row.g-4{padding-left:0!important;padding-right:0!important}
        #ebooks-area .andreia-ebook-inner{grid-template-columns:minmax(0,1fr) minmax(260px,340px)!important;gap:42px!important}
      }
      @media(max-width:600px){#mainNav .navbar-brand strong{font-size:27px!important}
        #home{padding:80px 0 42px!important}
        #home .image-container{width:min(330px,82vw)!important;height:min(410px,102vw)!important}
        #home .hero-image{margin:8px 0 44px!important}
        #home .hero-title{max-width:100%!important;font-size:clamp(32px,9.2vw,38px)!important;line-height:1.04!important}
        #home .hero-title .text-accent-green{margin-bottom:8px!important}
        #home .hero-title .andreia-role{max-width:270px!important;margin:18px auto 0!important;font-size:clamp(24px,7vw,28px)!important;line-height:1.15!important}
        #home .hero-subtitle{font-size:15px!important;line-height:1.6!important}
        #andreia-hero-cta{width:100%!important}
        #andreia-backword{display:none!important}
        #servicos,#sobre,#depoimentos{padding:72px 0!important}
        #servicos{padding-left:16px!important;padding-right:16px!important}
        .section-title{font-size:38px!important}
        #servicos .row.g-4{padding-left:0!important;padding-right:0!important}
        #ale-native-rail{gap:16px!important;padding:0!important}
        #ale-native-rail .ale-rail-item,#ale-native-rail .ale-rail-item.active,#ale-native-rail .ale-rail-item:hover{grid-template-columns:76px minmax(0,1fr)!important;width:100%!important;min-height:94px!important;padding:9px 18px 9px 9px!important;border-radius:999px!important;background:#0d0d12!important}
        #ale-native-rail .ale-rail-item i{width:68px!important;height:68px!important;min-width:68px!important;font-size:25px!important}
        #ale-native-rail .ale-rail-item span b{font-size:18px!important}
        #ale-native-rail .ale-rail-item span small{font-size:13px!important}
        .fp-banner-section,.gm-banner-section{padding:34px 0!important}
        #sobre .about-image img{object-position:center 42%!important}
        #sobre .about-badge{bottom:-16px!important;max-width:calc(100% - 24px)!important;min-height:34px!important;padding:8px 11px!important}
        #sobre .about-badge i{font-size:12px!important}
        #sobre .about-badge span{font-size:11px!important;white-space:normal!important;text-align:center!important}
        #ebooks-area{padding:70px 0!important}
        #ebooks-area .andreia-ebook-inner{grid-template-columns:1fr!important;width:min(100% - 32px,520px)!important;gap:42px!important}
        .andreia-ebook-copy{text-align:center!important}
        .andreia-ebook-copy h2{font-size:42px!important}
        .andreia-ebook-lead{font-size:15px!important}
        .andreia-ebook-list{width:max-content!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:left!important}
        .andreia-ebook-download{width:100%!important}
        .andreia-ebook-cover{width:min(82%,340px)!important;margin:0 auto!important;transform:rotate(1deg)!important}
        .andreia-dialog-panel{padding:40px 22px 25px!important}
        .andreia-dialog-panel h3{font-size:26px!important}
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
      src="/original/index.html?v=andreia-moncores-mirror-v9"
      title="Andreia Moncores | Especialista em Redes Sociais"
      onLoad={(event) => customize(event.currentTarget)}
    />
  )
}