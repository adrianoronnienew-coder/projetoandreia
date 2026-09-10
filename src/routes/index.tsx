import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: OriginalSite,
})

function OriginalSite() {
  return (
    <iframe
      src="https://annakaroliny.com.br/"
      title="Anna Karoliny"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 0,
        background: '#0a0a0a',
        zIndex: 999999,
      }}
    />
  )
}
