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
          .replaceAll('385.000', '86.240')
          .replaceAll('380k', '86 mil')
          .replaceAll('2.000', '448')
      }
    })

    doc.querySelectorAll('a[href*="tiktok.com"]').forEach((el) => {
      el.setAttribute('href', TIKTOK)
      el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noopener noreferrer')
    })

    const whatsappFloat = doc.querySelector<HTMLAnchorElement>('.whatsapp-btn')
    if (whatsappFloat) {
      whatsappFloat.href = WHATSAPP_1
      whatsappFloat.target = '_blank'
      whatsappFloat.rel = 'noopener noreferrer'
      const label = whatsappFloat.querySelector('.whatsapp-text')
      if (label) label.textContent = 'Grupo VIP'
    }

    doc.querySelectorAll<HTMLAnchorElement>('a[href*="instagram.com"], a[data-copyai-link-type="email"]').forEach((link) => {
      link.style.display = 'none'
    })

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
