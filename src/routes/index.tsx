import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Anna Karoliny - Especialista em TikTok | Curso e Mentoria' },
      { name: 'description', content: 'Aprenda a monetizar seu TikTok com Anna Karoliny. Curso completo, mentoria individual e análise de perfil.' },
      { property: 'og:title', content: 'Anna Karoliny - Especialista em TikTok | Curso e Mentoria' },
      { property: 'og:description', content: 'Aprenda a monetizar seu TikTok com Anna Karoliny. Curso completo, mentoria individual e análise de perfil.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <iframe
      className="original-frame"
      src="/original/index.html"
      title="Anna Karoliny - Especialista em TikTok"
    />
  )
}
