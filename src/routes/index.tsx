import { createFileRoute } from '@tanstack/react-router'
import { BarChart3, Check, ChevronUp, MessageCircle, Play, Rocket, Sparkles, Target, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Anna Karoliny | Especialista em TikTok' },
      { name: 'description', content: 'Cursos, mentoria e análise de perfil para transformar seu TikTok em uma fonte de renda.' },
      { property: 'og:title', content: 'Anna Karoliny | Especialista em TikTok' },
      { property: 'og:description', content: 'Estratégias práticas para crescer e monetizar seu perfil no TikTok.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: HomePage,
})

const services = [
  { icon: Rocket, tone: 'pink', title: 'Curso Monetize TikTok', description: 'Um método completo para criar, crescer e monetizar seu conteúdo.', price: 'R$ 297', items: ['Aulas práticas e objetivas', 'Estratégias de conteúdo', 'Acesso imediato'] },
  { icon: Users, tone: 'blue', title: 'Mentoria Individual', description: 'Orientação personalizada para acelerar os resultados do seu perfil.', price: 'R$ 497', items: ['Encontro individual', 'Plano de ação exclusivo', 'Análise de posicionamento'] },
  { icon: BarChart3, tone: 'orange', title: 'Análise de Perfil', description: 'Diagnóstico do seu TikTok com oportunidades claras de melhoria.', price: 'R$ 97', items: ['Relatório detalhado', 'Pontos de melhoria', 'Ideias para novos vídeos'] },
]

function HomePage() {
  return (
    <main id="top">
      <header className="nav">
        <a className="brand" href="#home">Anna Karoliny</a>
        <nav aria-label="Navegação principal"><a href="#home">Início</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a><a href="#depoimentos">Depoimentos</a><a href="#contato">Contato</a></nav>
      </header>
      <section className="hero" id="home">
        <div className="heroText">
          <span className="eyebrow">ESTRATÉGIA • CONTEÚDO • RESULTADO</span>
          <h1><em>Anna Karoliny</em><br />Especialista em TikTok</h1>
          <p>Transforme seu TikTok em uma fonte de renda criando vídeos com estratégia, consistência e autenticidade.</p>
          <div className="heroBtns"><a className="btn primary" href="#servicos"><Rocket size={18} /> Conheça meus serviços</a><a className="btn ghost" href="#sobre"><Play size={18} /> Minha história</a></div>
          <div className="miniStats"><div><b>154.000</b><span>SEGUIDORES</span></div><div><b>800</b><span>ALUNOS</span></div></div>
        </div>
        <div className="heroVisual" aria-label="Painel ilustrativo de desempenho no TikTok">
          <div className="visualGlow" />
          <div className="phone"><div className="phoneTop" /><div className="phoneScreen"><div className="profileMark">AK</div><strong>@annakaroliny</strong><span>Conteúdo que gera resultado</span><div className="chartBars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><div className="screenStats"><b>+42%</b><small>alcance nos últimos 30 dias</small></div></div></div>
          <div className="floatingMetric"><Sparkles size={20} /><span><b>Conteúdo viral</b>Estratégia aplicada</span></div>
        </div>
      </section>
      <section className="services" id="servicos">
        <div className="sectionHead"><span>SERVIÇOS</span><h2>Escolha o próximo passo da sua <em>jornada</em></h2><p>Soluções práticas para diferentes momentos do seu crescimento.</p></div>
        <div className="cards">{services.map((service) => { const Icon = service.icon; return <article className="card" key={service.title}><div className={`icon ${service.tone}`}><Icon size={25} /></div><h3>{service.title}</h3><p className="desc">{service.description}</p><div className="price">{service.price}</div><ul>{service.items.map((item) => <li key={item}><Check size={16} /><span>{item}</span></li>)}</ul><a className={`serviceBtn ${service.tone}`} href="#contato">Quero saber mais</a></article> })}</div>
      </section>
      <section className="about" id="sobre"><div className="aboutInner"><div className="aboutVisual"><Target size={86} /><strong>Estratégia com propósito</strong><span>Do primeiro vídeo à monetização</span></div><div className="aboutText"><span className="eyebrow">SOBRE MIM</span><h2>Experiência real para acelerar os seus <em>resultados</em></h2><p>Transformei a criação de conteúdo em uma metodologia simples e aplicável para quem deseja crescer no TikTok.</p><div className="achievements"><div><i><Users size={24} /></i><span><b>Comunidade ativa</b>Alunos construindo resultados todos os dias</span></div><div><i><BarChart3 size={24} /></i><span><b>Método validado</b>Estratégias guiadas por dados e experiência</span></div></div></div></div></section>
      <section className="testimonials" id="depoimentos"><div className="sectionHead"><span>DEPOIMENTOS</span><h2>Resultados de quem decidiu <em>começar</em></h2></div><div className="quotes"><blockquote><div>★★★★★</div><p>“Consegui organizar meu conteúdo e finalmente entendi como criar vídeos com estratégia.”</p><b>Aluna do curso</b><small>Curso Monetize TikTok</small></blockquote><blockquote><div>★★★★★</div><p>“A mentoria trouxe clareza e um plano direto para melhorar meu perfil e minhas publicações.”</p><b>Aluna da mentoria</b><small>Mentoria individual</small></blockquote><blockquote><div>★★★★★</div><p>“A análise mostrou exatamente o que precisava mudar. Foi simples, prática e muito completa.”</p><b>Criadora de conteúdo</b><small>Análise de perfil</small></blockquote></div></section>
      <section className="cta" id="contato"><h2>Pronta para transformar seu TikTok?</h2><p>Escolha o serviço ideal e dê o próximo passo.</p><a className="btn primary" href="#servicos"><MessageCircle size={18} /> Ver serviços</a></section>
      <footer><a className="brand" href="#top">Anna Karoliny</a><p>Estratégia e conteúdo para TikTok.</p><p className="copy">© 2026 Anna Karoliny. Todos os direitos reservados.</p></footer>
      <a className="top" href="#top" aria-label="Voltar ao topo"><ChevronUp size={24} /></a>
    </main>
  )
}
