import { createFileRoute } from '@tanstack/react-router'

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
  return <iframe className="original-frame" src="/original/index.html?v=mentoria-profissional-1" title="Ale Marques - Especialista em Redes Sociais" />
}
