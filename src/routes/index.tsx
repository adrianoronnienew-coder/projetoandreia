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

    doc.querySelectorAll<HTMLElement>('.stat-number').forEach((el, i) => {
      el.removeAttribute('data-count')
      el.textContent = i === 0 ? 'Muitos' : 'Diversos'
    })

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
