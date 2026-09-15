import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'

const WHATSAPP_1 = 'https://chat.whatsapp.com/FjQNMkhQcO13fQYq9TExiZ?s=sh&p=a&mlu=4&ilr=4'
const WHATSAPP_2 = 'https://chat.whatsapp.com/Hndy5zUtIi6LyFJdrmcCk1?s=sh&p=a&mlu=4&ilr=4'
const TIKTOK = 'https://www.tiktok.com/@alesocialmedia.com.br'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Ale Marques - Especialista em TikTok' },
      { name: 'description', content: 'Ale Marques: conteúdo, estratégia e crescimento no TikTok. Entre nos grupos do WhatsApp e acompanhe as lives.' },
      { property: 'og:title', content: 'Ale Marques - Especialista em TikTok' },
      { property: 'og:description', content: 'Conteúdo, estratégia e crescimento no TikTok com Ale Marques.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const frameRef = useRef<HTMLIFrameElement>(null)

  const personalize = () => {
    const doc = frameRef.current?.contentDocument
    if (!doc) return

    doc.title = 'Ale Marques - Especialista em TikTok'

    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    nodes.forEach((node) => {
      if (node.nodeValue) {
        node.nodeValue = node.nodeValue
          .replaceAll('Anna Karoliny', 'Ale Marques')
          .replaceAll('ANNA KAROLINY', 'ALE MARQUES')
          .replaceAll('Anna', 'Ale')
      }
    })

    doc.querySelectorAll('a[href*="tiktok.com"]').forEach((el) => {
      el.setAttribute('href', TIKTOK)
      el.setAttribute('target', '_blank')
    })

    const heroCta = doc.querySelector('.hero-cta')
    if (heroCta && !doc.getElementById('ale-links')) {
      const links = doc.createElement('div')
      links.id = 'ale-links'
      links.innerHTML = `
        <a href="${WHATSAPP_1}" target="_blank" rel="noopener noreferrer" class="ale-action ale-whatsapp">💬 Entrar no Grupo VIP do WhatsApp</a>
        <a href="${WHATSAPP_2}" target="_blank" rel="noopener noreferrer" class="ale-action ale-whatsapp secondary">💬 Entrar no Grupo 2 do WhatsApp</a>
        <a href="${TIKTOK}" target="_blank" rel="noopener noreferrer" class="ale-action ale-tiktok">♪ Acompanhar minhas Lives no TikTok</a>
      `
      heroCta.insertAdjacentElement('afterend', links)
    }

    const style = doc.createElement('style')
    style.textContent = `
      #ale-links{display:flex;flex-direction:column;gap:12px;margin-top:24px;max-width:520px}
      .ale-action{display:flex;align-items:center;justify-content:center;min-height:56px;padding:14px 22px;border-radius:14px;color:#fff!important;text-decoration:none!important;font-weight:800;font-size:15px;letter-spacing:.1px;transition:transform .2s ease,box-shadow .2s ease}
      .ale-action:hover{transform:translateY(-2px)}
      .ale-whatsapp{background:linear-gradient(135deg,#25D366,#128C7E);box-shadow:0 10px 28px rgba(37,211,102,.28)}
      .ale-whatsapp.secondary{background:linear-gradient(135deg,#20bd5a,#087d6b)}
      .ale-tiktok{background:linear-gradient(135deg,#111,#272727);border:1px solid rgba(255,255,255,.18);box-shadow:0 10px 28px rgba(0,0,0,.28)}
      @media(max-width:991px){#ale-links{margin:24px auto 0}}
      @media(max-width:520px){.ale-action{font-size:14px;min-height:54px;padding:13px 16px}}
    `
    doc.head.appendChild(style)
  }

  return (
    <iframe
      ref={frameRef}
      className="original-frame"
      src="/original/index.html"
      title="Ale Marques - Especialista em TikTok"
      onLoad={personalize}
    />
  )
}
