import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

const services=[
 {title:'Curso Monetize TikTok',price:'R$ 297',cls:'pink',items:['Curso completo do zero ao avançado','Estratégias de monetização','Aulas práticas e atualizadas','Acesso vitalício','Suporte exclusivo'],cta:'QUERO O CURSO'},
 {title:'Gestão de Perfil',price:'Personalizado',cls:'blue',items:['Gestão completa do perfil','Estratégia personalizada','Criação e otimização','Acompanhamento de métricas','Suporte via WhatsApp'],cta:'QUERO GESTÃO'},
 {title:'Análise de Perfil',price:'R$ 97',cls:'orange',items:['Análise completa do perfil','Diagnóstico personalizado','Sugestões de melhoria','Entrega em 48h','Suporte via WhatsApp'],cta:'QUERO ANÁLISE'}
]
const faq=[
 ['Preciso já ter seguidores para começar?','Não. As estratégias são pensadas para funcionar desde o zero e acelerar o crescimento de forma consistente.'],
 ['O curso serve para qualquer nicho?','Sim. O método pode ser aplicado em diferentes nichos, adaptando conteúdo, posicionamento e estratégia.'],
 ['Em quanto tempo posso ter resultados?','Cada perfil tem seu ritmo, mas aplicando as estratégias com consistência você já consegue perceber evolução nas primeiras semanas.'],
 ['Como funciona o suporte?','Você recebe orientação para tirar dúvidas e aplicar as estratégias corretamente durante sua jornada.']
]
function Home(){
 return <main>
  <header className="nav"><a className="brand" href="#inicio">Anna Karoliny</a><nav><a href="#inicio">Início</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a><a href="#depoimentos">Depoimentos</a><a href="#contato">Contato</a></nav></header>
  <section id="inicio" className="hero">
   <div className="heroText"><span className="eyebrow">ESPECIALISTA EM TIKTOK</span><h1>Transforme seu TikTok em uma <em>fonte de renda</em></h1><p>Aprenda as estratégias que me fizeram alcançar mais de <b>380 mil seguidores</b> e transforme seu perfil em um negócio lucrativo.</p><div className="heroBtns"><a className="btn primary" href="#servicos">QUERO COMEÇAR AGORA</a><a className="btn ghost" href="#sobre">CONHEÇA MINHA HISTÓRIA</a></div><div className="miniStats"><div><b>+380k</b><span>Seguidores</span></div><div><b>+2.000</b><span>Alunos</span></div><div><b>2 anos</b><span>de experiência</span></div></div></div>
   <div className="heroPhoto"><div className="glow"></div><img src="https://annakaroliny.com.br/assets/images/anna-karoliny-hero.webp" alt="Anna Karoliny"/></div>
  </section>
  <section id="servicos" className="services"><div className="sectionHead"><span>COMO POSSO TE AJUDAR</span><h2>Escolha o melhor caminho para <em>crescer no TikTok</em></h2><p>Soluções práticas para cada momento da sua jornada.</p></div><div className="cards">{services.map((s,i)=><article className="card" key={s.title}><div className={'icon '+s.cls}>{i===0?'▶':i===1?'⚡':'⌕'}</div><h3>{s.title}</h3><p className="desc">{i===0?'Aprenda meu método completo para crescer e monetizar seu perfil.':i===1?'Deixe seu perfil nas mãos de quem entende de crescimento.':'Descubra exatamente o que precisa melhorar para crescer.'}</p><div className={'price '+s.cls}>{s.price}</div><ul>{s.items.map(x=><li key={x}>✓ <span>{x}</span></li>)}</ul><a className={'serviceBtn '+s.cls} href="#contato">◉ &nbsp; {s.cta}</a></article>)}</div></section>
  <section id="sobre" className="about"><div className="aboutInner"><div className="aboutPhoto"><img src="https://annakaroliny.com.br/assets/images/anna-karoliny-about.webp" alt="Anna Karoliny"/></div><div className="aboutText"><h2>Quem é <em>Anna Karoliny</em>?</h2><p>Olá! Eu sou a Anna, especialista em TikTok com mais de <b>380k seguidores</b> e <b>2 anos de experiência</b> ajudando pessoas a monetizarem suas contas.</p><p>Comecei do zero e com 6 meses de perfil alcancei minha independência financeira apenas com TikTok. Já ajudei mais de <b>2.000 alunos</b> a transformarem seus perfis em sua maior fonte de renda.</p><div className="achievements"><div><i>♟</i><span><b>+2.000 Alunos</b>Pessoas transformadas</span></div><div><i>★</i><span><b>+1.500</b>Resultados comprovados</span></div><div><i>↗</i><span><b>Top 1%</b>Criadores no TikTok</span></div></div></div></div></section>
  <section id="depoimentos" className="testimonials"><div className="sectionHead"><span>RESULTADOS REAIS</span><h2>O que meus <em>alunos dizem</em></h2></div><div className="quotes"><blockquote><div>★★★★★</div><p>“A Anna mudou completamente minha visão sobre o TikTok. Finalmente entendi o que precisava fazer para crescer e monetizar.”</p><b>Desireé</b><small>Aluna</small></blockquote><blockquote><div>★★★★★</div><p>“Conteúdo direto, estratégia clara e muito suporte. Comecei a aplicar e os resultados apareceram de verdade.”</p><b>Alda Mendes</b><small>Aluna</small></blockquote><blockquote><div>★★★★★</div><p>“Foi a melhor decisão que tomei para o meu perfil. Hoje tenho direção e sei exatamente o que postar.”</p><b>Anne Danielle</b><small>Aluna</small></blockquote></div></section>
  <section className="faq"><div className="sectionHead"><span>DÚVIDAS FREQUENTES</span><h2>Perguntas <em>frequentes</em></h2></div><div className="faqList">{faq.map(([q,a])=><details key={q}><summary>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>
  <section id="contato" className="cta"><h2>Pronta para transformar seu TikTok?</h2><p>Dê o primeiro passo para transformar seu perfil em uma verdadeira fonte de renda.</p><a className="btn primary" href="#servicos">QUERO COMEÇAR AGORA</a></section>
  <footer><a className="brand" href="#inicio">Anna Karoliny</a><p>Especialista em TikTok • Curso e Mentoria</p><p className="copy">© 2026 Anna Karoliny. Todos os direitos reservados.</p></footer>
  <a className="whatsapp" href="#contato">◉ <span>Fale Comigo</span></a><a className="top" href="#inicio">⌃</a>
 </main>
}