import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'

const WHATSAPP_1 = 'https://chat.whatsapp.com/FjQNMkhQcO13fQYq9TExiZ?s=sh&p=a&mlu=4&ilr=4'
const WHATSAPP_2 = 'https://chat.whatsapp.com/Hndy5zUtIi6LyFJdrmcCk1?s=sh&p=a&mlu=4&ilr=4'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Ale Marques - Especialista em Redes Sociais' },
      { name: 'description', content: 'Ale Marques: estratégia, conteúdo e crescimento nas redes sociais.' },
      { property: 'og:title', content: 'Ale Marques - Especialista em Redes Sociais' },
      { property: 'og:description', content: 'Estratégia, conteúdo e crescimento nas redes sociais com Ale Marques.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://alemarques.site/' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://alemarques.site/' }],
  }),
  component: HomePage,
})

function HomePage() {
  const frameRef = useRef<HTMLIFrameElement>(null)

  const personalize = () => {
    const doc = frameRef.current?.contentDocument
    if (!doc) return
    doc.title = 'Ale Marques - Especialista em Redes Sociais'

    const replacements: Array<[string, string]> = [
      ['Mais de 86 mil seguidores e 448 alunos já transformaram suas vidas.', 'Estratégias que já ajudaram diversos alunos a crescer, se posicionar e monetizar nas redes sociais.'],
      ['86 mil seguidores', 'diversos resultados'],
      ['86.240', 'Muitos'],
      ['Seguidores', 'Resultados'],
      ['448 alunos', 'diversos alunos'],
      ['448', 'Muitos'],
      ['+448 Alunos', 'Muitos Alunos'],
      ['+1.500', 'Diversos'],
      ['Top 1%', 'Destaque'],
      ['Especialistas Brasil', 'Entre as melhores do Brasil'],
      ['monetizarem suas contas', 'monetizarem sua presença digital'],
    ]

    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    nodes.forEach(node => {
      if (!node.nodeValue) return
      let value = node.nodeValue
      replacements.forEach(([from, to]) => { value = value.replaceAll(from, to) })
      node.nodeValue = value
    })

    doc.querySelectorAll<HTMLElement>('.stat-number').forEach(el => el.removeAttribute('data-count'))

    const aboutBadge = doc.querySelector('.about-badge span')
    if (aboutBadge) aboutBadge.textContent = 'Especialista em Redes Sociais'

    const achievementTitles = doc.querySelectorAll<HTMLElement>('.achievement-content h4')
    const achievementTexts = doc.querySelectorAll<HTMLElement>('.achievement-content p')
    if (achievementTitles[0]) achievementTitles[0].textContent = 'Muitos Alunos'
    if (achievementTexts[0]) achievementTexts[0].textContent = 'Pessoas transformadas'
    if (achievementTitles[1]) achievementTitles[1].textContent = 'Diversos'
    if (achievementTexts[1]) achievementTexts[1].textContent = 'Alunos monetizados'
    if (achievementTitles[2]) achievementTitles[2].textContent = 'Destaque'
    if (achievementTexts[2]) achievementTexts[2].textContent = 'Entre as melhores do Brasil'

    doc.querySelectorAll<HTMLAnchorElement>('a[href*="instagram.com"]').forEach(link => { link.href = INSTAGRAM; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.style.display = '' })
    doc.querySelectorAll<HTMLAnchorElement>('a[data-copyai-link-type="email"]').forEach(link => { link.style.display = 'none' })

    doc.querySelector('.whatsapp-float')?.remove()

    // Barra lateral premium: apenas um atalho se expande por vez conforme a rolagem.
    doc.getElementById('ale-smart-rail')?.remove()
    const rail = doc.createElement('nav')
    rail.id = 'ale-smart-rail'
    rail.setAttribute('aria-label', 'Atalhos da Ale Marques')
    rail.innerHTML = `
      <a class="rail-item" data-zone="0" href="${WHATSAPP_1}" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i><span><b>Novos alunos</b><small>Grupo para futuros alunos</small></span></a>
      <a class="rail-item" data-zone="1" href="${WHATSAPP_2}" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i><span><b>Networking</b><small>Comunidade e novidades</small></span></a>
      <a class="rail-item" data-zone="2" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i><span><b>Instagram</b><small>@ale.marques.social</small></span></a>
      <a class="rail-item" data-zone="3" href="${SOCIAL}" target="_blank" rel="noopener noreferrer"><i class="fab fa-tiktok"></i><span><b>Novo perfil</b><small>Perfil futuro da Ale</small></span></a>
      <a class="rail-item" data-zone="4" href="${LIVE_PROFILE}" target="_blank" rel="noopener noreferrer"><i class="fas fa-video"></i><span><b>Lives</b><small>Perfil atual de lives</small></span></a>
    `
    doc.body.appendChild(rail)

    const railItems = Array.from(rail.querySelectorAll<HTMLElement>('.rail-item'))
    const updateRail = () => {
      const max = Math.max(1, doc.documentElement.scrollHeight - doc.defaultView!.innerHeight)
      const progress = Math.min(1, Math.max(0, doc.defaultView!.scrollY / max))
      const active = Math.min(railItems.length - 1, Math.floor(progress * railItems.length))
      railItems.forEach((item, i) => item.classList.toggle('active', i === active))
    }
    doc.defaultView?.addEventListener('scroll', updateRail, { passive: true })
    updateRail()

    if (!doc.getElementById('ale-links-live')) {
      const links = doc.createElement('div')
      links.id = 'ale-links-live'
      links.className = 'ale-links'
      links.innerHTML = `
        <a href="${WHATSAPP_1}" target="_blank" rel="noopener noreferrer" class="ale-action ale-whatsapp"><i class="fab fa-whatsapp"></i><span><b>Grupo VIP</b><small>Futuros alunos</small></span></a>
        <a href="${WHATSAPP_2}" target="_blank" rel="noopener noreferrer" class="ale-action ale-whatsapp"><i class="fab fa-whatsapp"></i><span><b>Grupo 2</b><small>Comunidade e novidades</small></span></a>
      `
      const image = doc.querySelector('.hero-image')
      image?.appendChild(links)
    }

    const style = doc.createElement('style')
    style.textContent = `
      #ale-smart-rail{position:fixed;right:14px;top:50%;transform:translateY(-50%);z-index:99990;display:flex;flex-direction:column;gap:10px;align-items:flex-end;pointer-events:none}
      #ale-smart-rail .rail-item{pointer-events:auto;width:48px;height:48px;border-radius:999px;display:flex;align-items:center;justify-content:flex-start;gap:10px;padding:5px;text-decoration:none;color:#fff;background:rgba(12,13,18,.94);border:1px solid rgba(255,255,255,.13);box-shadow:0 9px 24px rgba(0,0,0,.28);overflow:hidden;transition:width .34s ease,transform .28s ease,box-shadow .28s ease}
      #ale-smart-rail .rail-item i{width:38px;height:38px;min-width:38px;border-radius:50%;display:grid;place-items:center;font-size:17px;background:linear-gradient(135deg,#a83bd6,#168dff)}
      #ale-smart-rail .rail-item:nth-child(-n+2) i{background:linear-gradient(135deg,#61e96d,#19b87a)}
      #ale-smart-rail .rail-item span{display:flex;flex-direction:column;line-height:1.08;opacity:0;white-space:nowrap;transition:opacity .18s ease}
      #ale-smart-rail .rail-item b{font-size:11px;font-weight:800} #ale-smart-rail .rail-item small{font-size:7.5px;opacity:.68}
      #ale-smart-rail .rail-item.active{width:205px;transform:translateX(0);box-shadow:0 12px 30px rgba(89,57,210,.25)}
      #ale-smart-rail .rail-item.active span{opacity:1}
      @media(hover:hover){#ale-smart-rail .rail-item:hover{width:205px}#ale-smart-rail .rail-item:hover span{opacity:1}#ale-smart-rail:hover .rail-item.active:not(:hover){width:48px}#ale-smart-rail:hover .rail-item.active:not(:hover) span{opacity:0}}
      @media(max-width:600px){#ale-smart-rail{right:8px;gap:8px}#ale-smart-rail .rail-item{width:43px;height:43px;padding:4px}#ale-smart-rail .rail-item i{width:35px;height:35px;min-width:35px;font-size:15px}#ale-smart-rail .rail-item.active{width:178px}#ale-smart-rail .rail-item b{font-size:10px}#ale-smart-rail .rail-item small{font-size:7px}}

      #ale-links-live{width:100%;max-width:420px;margin:24px auto 0;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
      #ale-links-live .ale-action{height:58px!important;padding:8px 11px!important;border-radius:999px!important;display:flex!important;align-items:center!important;gap:9px!important;text-decoration:none!important;color:#fff!important;background:linear-gradient(145deg,#19191d,#0b0b0e)!important;border:1px solid rgba(255,255,255,.14)!important;box-shadow:0 10px 28px rgba(0,0,0,.24)!important}
      #ale-links-live .ale-action i{width:34px!important;height:34px!important;min-width:34px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:linear-gradient(135deg,#d43bc4,#7f5cff)!important}
      #ale-links-live .ale-whatsapp i{background:linear-gradient(135deg,#2bd66f,#119d62)!important}
      #ale-links-live span{display:flex;flex-direction:column;align-items:flex-start;line-height:1.05;min-width:0}
      #ale-links-live .ale-live i{background:linear-gradient(135deg,#ff4d8d,#8b5cf6)!important} #ale-links-live b{font-size:12px;white-space:nowrap} #ale-links-live small{font-size:8px;opacity:.68;white-space:nowrap}
      @media(max-width:600px){#ale-links-live{gap:6px!important}#ale-links-live .ale-action{height:50px!important;padding:6px 7px!important;gap:5px!important}#ale-links-live .ale-action i{width:28px!important;height:28px!important;min-width:28px!important}#ale-links-live b{font-size:9px!important}#ale-links-live small{font-size:6.5px!important}}
    `
    doc.head.appendChild(style)
  }

  return <iframe ref={frameRef} className="original-frame" src="/original/index.html" title="Ale Marques - Especialista em Redes Sociais" onLoad={personalize} />
}
