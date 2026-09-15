(() => {
  // Destinos externos de comunicação/checkout foram neutralizados na captura.
  // O bloqueio em capture phase impede que scripts first-party reativem o URL original
  // por addEventListener/window.open depois que o HTML já foi reconstruído.
  const blockNeutralizedDestination = (event) => {
    const ctl = event.target?.closest?.('[data-copyai-link-type]');
    if (!ctl) return;
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
  };
  document.addEventListener('click', blockNeutralizedDestination, true);
  document.addEventListener('auxclick', blockNeutralizedDestination, true);
  document.addEventListener('submit', (event) => {
    if (!event.target?.matches?.('form[data-copyai-link-type]')) return;
    event.preventDefault(); event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
  }, true);

  // Navigation fallback for brand/logo/internal controls. Captured anchors already keep href,
  // but this repairs a reconstruction that retained CopyAI metadata while dropping href logic.
  document.addEventListener('click',(event)=>{
    const a=event.target?.closest?.('[data-copyai-nav-href]'); if(!a||a.hasAttribute('data-copyai-link-type'))return;
    const href=a.getAttribute('href')||''; const fallback=a.getAttribute('data-copyai-nav-href')||'';
    if((!href||href==='#'||href.toLowerCase()==='javascript:void(0)')&&fallback){event.preventDefault();location.href=fallback;}
  },false);

  const resolveAccordionPanel = (trigger) => {
    const id=trigger.getAttribute('aria-controls'); if(id){const p=document.getElementById(id);if(p)return p;}
    const tid=trigger.id; if(tid){try{const p=document.querySelector('[role="region"][aria-labelledby="'+CSS.escape(tid)+'"],[aria-labelledby="'+CSS.escape(tid)+'"]');if(p)return p}catch{}}
    return null;
  };
  const setAccordion = (trigger,panel,open) => {
    trigger.setAttribute('aria-expanded',open?'true':'false');trigger.setAttribute('data-state',open?'open':'closed');panel.setAttribute('data-state',open?'open':'closed');
    if(open){panel.removeAttribute('hidden');panel.style.removeProperty('display')}else{panel.setAttribute('hidden','');panel.style.display='none'}
  };
  const closeAccordionSiblings=(trigger)=>{
    const groupId=trigger.getAttribute('data-copyai-accordion-group')||'';const mode=trigger.getAttribute('data-copyai-accordion-mode')||'single';if(mode==='multiple')return;
    let peers=[];if(groupId)peers=[...document.querySelectorAll('[data-copyai-accordion-trigger][data-copyai-accordion-group="'+CSS.escape(groupId)+'"]')];
    if(!peers.length){const scope=trigger.closest('[class*="accordion" i],[class*="faq" i],[data-orientation],section')||trigger.parentElement;peers=[...(scope?.querySelectorAll?.('[aria-expanded]')||[])]}
    for(const t of peers){if(t===trigger)continue;const p=resolveAccordionPanel(t);if(p&&t.getAttribute('aria-expanded')==='true')setAccordion(t,p,false)}
  };
  document.addEventListener('click',(event)=>{
    const trigger=event.target.closest('[data-copyai-accordion-trigger],[aria-expanded]');if(!trigger)return;const panel=resolveAccordionPanel(trigger);if(!panel)return;
    const before=trigger.getAttribute('aria-expanded');setTimeout(()=>{if(trigger.getAttribute('aria-expanded')!==before)return;const open=before!=='true';if(open)closeAccordionSiblings(trigger);setAccordion(trigger,panel,open)},30);
  },false);

  // Mark players whose large media file must be hosted/relinked later.
  const markPendingVideos = () => {
    document.querySelectorAll('video[data-copyai-video-pending], source[data-copyai-video-pending]').forEach((node) => {
      const video = node.tagName === 'VIDEO' ? node : node.closest('video');
      if (!video || video.dataset.copyaiPendingReady) return;
      video.dataset.copyaiPendingReady = '1';
      video.setAttribute('title','Vídeo capturado: arquivo grande aguardando nova URL');
      video.controls = true;
      if (!video.getAttribute('poster')) video.style.background = 'linear-gradient(135deg,#111,#2a0505)';
    });
  };
  markPendingVideos();

  // External embed fallback (YouTube/Vimeo/etc.). Restore exact src and, when
  // available, render the locally captured HD poster until the first user click.
  const ensureEmbedPosterUi = (frame) => {
    const poster=frame.getAttribute('data-copyai-embed-poster')||'';
    if(!poster || frame.dataset.copyaiPosterReady==='1') return;
    frame.dataset.copyaiPosterReady='1';
    const host=frame.parentElement; if(!host) return;
    try{if(getComputedStyle(host).position==='static')host.style.position='relative';}catch{}
    const overlay=document.createElement('div');
    overlay.className='copyai-embed-hd-poster'; overlay.setAttribute('role','button'); overlay.tabIndex=0;
    overlay.style.cssText='position:absolute;inset:0;z-index:20;overflow:hidden;cursor:pointer;background:#000;display:block;';
    const img=document.createElement('img'); img.src=poster; img.alt=frame.getAttribute('data-copyai-embed-title')||frame.title||'Video';
    img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;'; overlay.appendChild(img);
    const shade=document.createElement('div'); shade.style.cssText='position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.48),transparent 30%,transparent 72%,rgba(0,0,0,.28));pointer-events:none;';overlay.appendChild(shade);
    const title=frame.getAttribute('data-copyai-embed-title')||frame.title||'';
    const author=frame.getAttribute('data-copyai-embed-author')||'';
    if(title){
      const meta=document.createElement('div');meta.style.cssText='position:absolute;top:14px;left:16px;right:18px;color:#fff;font:600 16px/1.25 Arial,sans-serif;text-shadow:0 1px 3px rgba(0,0,0,.9);pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';meta.textContent=title;
      if(author){const by=document.createElement('div');by.style.cssText='font-size:12px;font-weight:500;margin-top:3px;opacity:.92;';by.textContent=author;meta.appendChild(by)}
      overlay.appendChild(meta)
    }
    const play=document.createElement('div');play.setAttribute('aria-hidden','true');play.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:68px;height:48px;border-radius:14px;background:#ff0033;box-shadow:0 2px 14px rgba(0,0,0,.28);';
    play.innerHTML='<span style="position:absolute;left:28px;top:14px;width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:16px solid white"></span>';overlay.appendChild(play);
    frame.style.opacity='0'; frame.style.pointerEvents='none';
    const activate=()=>{
      if(overlay.dataset.used)return;overlay.dataset.used='1';
      const wanted=frame.getAttribute('data-copyai-embed-src')||frame.getAttribute('src')||'';
      try{const u=new URL(wanted,location.href);u.searchParams.set('autoplay','1');frame.setAttribute('src',u.href)}catch{if(wanted)frame.setAttribute('src',wanted)}
      frame.style.opacity='1';frame.style.pointerEvents='auto';overlay.remove();
    };
    overlay.addEventListener('click',activate,{once:true});
    overlay.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}},{once:true});
    host.appendChild(overlay);
  };
  // Custom poster launchers: keep the ORIGINAL captured button/overlay pixel-for-pixel.
  // Only swap it for the real iframe after the first click. If the localized first-party
  // runtime already handled the click, this fallback observes that the launcher disappeared
  // and does nothing.
  const wireCustomEmbedLaunchers=()=>{
    document.querySelectorAll('[data-copyai-embed-mode="custom-launcher"][data-copyai-embed-src]').forEach((launcher)=>{
      if(launcher.dataset.copyaiLauncherWired==='1')return;launcher.dataset.copyaiLauncherWired='1';
      launcher.addEventListener('click',()=>{
        const wanted=launcher.getAttribute('data-copyai-embed-src')||'';if(!wanted)return;
        setTimeout(()=>{
          if(!launcher.isConnected)return;
          const frame=document.createElement('iframe');
          try{const u=new URL(wanted,location.href);u.searchParams.set('autoplay','1');frame.src=u.href}catch{frame.src=wanted}
          frame.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');frame.setAttribute('allowfullscreen','');frame.setAttribute('title',launcher.getAttribute('data-copyai-embed-title')||launcher.getAttribute('aria-label')||'Video');
          frame.style.cssText='display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:inherit;background:#000;';
          launcher.replaceWith(frame);
        },80);
      },false);
    });
  };
  wireCustomEmbedLaunchers();

  const repairEmbeds = () => {
    document.querySelectorAll('iframe[data-copyai-embed-src]').forEach((frame) => {
      const wanted = frame.getAttribute('data-copyai-embed-src') || '';
      const current = frame.getAttribute('src') || '';
      if (wanted && (!current || current === 'about:blank' || current === '#')) frame.setAttribute('src', wanted);
      if (frame.getAttribute('data-copyai-embed-provider') === 'youtube' || frame.getAttribute('data-copyai-embed-provider') === 'vimeo') {
        if (!frame.hasAttribute('allowfullscreen')) frame.setAttribute('allowfullscreen','');
        if (!frame.getAttribute('allow')) frame.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      }
      if(frame.getAttribute('data-copyai-embed-provider')==='youtube') ensureEmbedPosterUi(frame);
    });
  };
  repairEmbeds();
  const embedObserver=new MutationObserver(()=>{repairEmbeds();wireCustomEmbedLaunchers();});
  embedObserver.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','data-copyai-embed-poster','data-copyai-embed-src']});

  // Theme-dependent assets (logos/illustrations). These pairs were observed by
  // toggling the REAL source control during capture. Keep the original CSS theme state,
  // but swap the asset if a framework rebuild no longer re-renders its React component.
  const copyaiThemeKind=()=>{
    const h=document.documentElement,b=document.body;
    const raw=[h?.getAttribute('data-theme'),b?.getAttribute('data-theme'),h?.className,b?.className].join(' ').toLowerCase();
    if(/(?:^|\s|[-_])dark(?:\s|$|[-_])/.test(raw))return'dark';
    if(/(?:^|\s|[-_])light(?:\s|$|[-_])/.test(raw))return'light';
    try{const c=getComputedStyle(b||h).backgroundColor,m=c.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);if(m){const y=.2126*+m[1]+.7152*+m[2]+.0722*+m[3];return y<128?'dark':'light'}}catch{}
    return'light';
  };
  const applyThemeAssets=()=>{
    const kind=copyaiThemeKind();
    document.querySelectorAll('img[data-copyai-theme-light-src][data-copyai-theme-dark-src]').forEach(img=>{
      const wanted=img.getAttribute(kind==='dark'?'data-copyai-theme-dark-src':'data-copyai-theme-light-src');
      if(wanted&&img.getAttribute('src')!==wanted) img.setAttribute('src',wanted);
    });
  };
  applyThemeAssets();
  const themeAssetObserver=new MutationObserver(()=>queueMicrotask(applyThemeAssets));
  themeAssetObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class','data-theme','style']});

  // Visual-only fallback for captured floating assistant/chat widgets. It only restores
  // open/close presentation; it never reconnects a private chat backend.
  const widgetOpen=(panel,trigger)=>{
    if(!panel)return; panel.dataset.copyaiWidgetFallbackOpen='1';
    panel.classList.remove('h-0','opacity-0','scale-95','pointer-events-none','invisible','hidden');
    panel.classList.add('opacity-100','scale-100');
    panel.style.setProperty('height',panel.getAttribute('data-copyai-widget-open-height')||'min(540px, calc(100vh - 32px))','important');
    panel.style.setProperty('opacity','1','important');panel.style.setProperty('transform','scale(1)','important');panel.style.setProperty('pointer-events','auto','important');
    if(trigger){trigger.dataset.copyaiWidgetFallbackHidden='1';trigger.style.setProperty('opacity','0','important');trigger.style.setProperty('pointer-events','none','important');}
  };
  const widgetClose=(panel,trigger)=>{
    if(!panel)return; delete panel.dataset.copyaiWidgetFallbackOpen;
    panel.style.removeProperty('height');panel.style.removeProperty('opacity');panel.style.removeProperty('transform');panel.style.removeProperty('pointer-events');
    panel.classList.add('h-0','opacity-0','scale-95','pointer-events-none');
    if(trigger){delete trigger.dataset.copyaiWidgetFallbackHidden;trigger.style.removeProperty('opacity');trigger.style.removeProperty('pointer-events');}
  };
  document.addEventListener('click',(event)=>{
    const trigger=event.target.closest('[data-copyai-widget-role="trigger"],[aria-label*="chat" i],[aria-label*="assistente" i],[aria-label*="luna" i]');
    if(trigger&&!/whatsapp|discord|telegram/i.test((trigger.getAttribute('aria-label')||'')+' '+(trigger.textContent||''))){
      const id=trigger.getAttribute('data-copyai-widget-id')||'';
      setTimeout(()=>{
        const panel=id?document.querySelector('[data-copyai-widget-role="panel"][data-copyai-widget-id="'+CSS.escape(id)+'"]'):[...document.querySelectorAll('[data-copyai-widget-role="panel"]')][0];
        if(!panel)return;
        const cs=getComputedStyle(panel);const closed=cs.pointerEvents==='none'||Number(cs.opacity)<.2||panel.getBoundingClientRect().height<10||panel.classList.contains('h-0');
        if(closed)widgetOpen(panel,trigger);
      },110);
      return;
    }
    const close=event.target.closest('[data-copyai-widget-role="close"],[aria-label*="fechar" i],[aria-label*="close" i]');
    if(close){const panel=close.closest('[data-copyai-widget-role="panel"]');if(panel){const id=panel.getAttribute('data-copyai-widget-id')||'';const trigger=id?document.querySelector('[data-copyai-widget-role="trigger"][data-copyai-widget-id="'+CSS.escape(id)+'"]'):null;setTimeout(()=>{if(panel.dataset.copyaiWidgetFallbackOpen==='1')widgetClose(panel,trigger)},80);}}
  },false);

  // Generic theme fallback. Original first-party scripts get first chance; if they
  // do not mutate theme state (for example after an AI rebuild), reproduce the common
  // CSS contracts already present in the captured stylesheet.
  document.addEventListener('click', (event) => {
    const ctl = event.target.closest('[data-copyai-theme-control],#themeToggle,[class*="theme-toggle" i],[data-theme-toggle],[aria-label*="theme" i],[aria-label*="modo" i],[title*="tema" i],[title*="theme" i]');
    if (!ctl) return;
    const before=[document.body.className,document.documentElement.className,document.body.getAttribute('data-theme')||'',document.documentElement.getAttribute('data-theme')||''].join('|');
    setTimeout(()=>{
      const after=[document.body.className,document.documentElement.className,document.body.getAttribute('data-theme')||'',document.documentElement.getAttribute('data-theme')||''].join('|');
      if(after!==before) return;
      let css=''; try{css=[...document.styleSheets].map(sh=>{try{return [...sh.cssRules].map(r=>r.cssText).join('')}catch{return ''}}).join('')}catch{}
      if(/body\.light-mode/i.test(css)){ document.body.classList.toggle('light-mode'); return; }
      const current=document.documentElement.getAttribute('data-theme')||document.body.getAttribute('data-theme')||'';
      const next=/light/i.test(current)?'dark':'light';
      if(/data-theme/i.test(css)){document.documentElement.setAttribute('data-theme',next);document.body.setAttribute('data-theme',next);return;}
      if(/\.light-theme/i.test(css)||/\.dark-theme/i.test(css)){document.body.classList.toggle('light-theme',next==='light');document.body.classList.toggle('dark-theme',next==='dark');return;}
      document.documentElement.classList.toggle('light',next==='light');document.documentElement.classList.toggle('dark',next==='dark');
    },80);
  }, false);

  // Language fallback: if a visual language button lost its JS handler but the page
  // contains hreflang alternates, navigate to the captured alternate/local href.
  document.addEventListener('click', (event) => {
    const ctl=event.target.closest('a.lang-btn,a[class*="lang" i],[data-lang],[data-language]'); if(!ctl) return;
    const href=ctl.getAttribute('href')||''; if(href && href!=='#') return;
    const hint=(ctl.getAttribute('data-lang')||ctl.getAttribute('data-language')||ctl.getAttribute('title')||ctl.getAttribute('aria-label')||ctl.textContent||'').toLowerCase();
    const want=/ingl|english|\ben\b/.test(hint)?'en':(/espan|spanish|\bes\b/.test(hint)?'es':'pt-br');
    const before=[location.href,document.documentElement.lang||'',(document.body?.innerText||'').slice(0,12000)].join('|');
    setTimeout(()=>{
      const after=[location.href,document.documentElement.lang||'',(document.body?.innerText||'').slice(0,12000)].join('|');
      if(after!==before) return; // original i18n handler worked; do not interfere
      const alts=[...document.querySelectorAll('link[rel~="alternate"][hreflang][href]')];
      const wantBase=want.split('-')[0];
      const alt=alts.find(x=>{const lang=String(x.getAttribute('hreflang')||'').toLowerCase();return lang===want||lang===wantBase;});
      if(alt?.href) location.href=alt.href;
    },120);
  }, false);

  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"][aria-controls]');
    if (!tab) return;
    const list = tab.closest('[role="tablist"]');
    if (!list) return;
    const tabs = Array.from(list.querySelectorAll('[role="tab"][aria-controls]'));
    for (const t of tabs) {
      const selected = t === tab;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.setAttribute('tabindex', selected ? '0' : '-1');
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) { if (selected) panel.removeAttribute('hidden'); else panel.setAttribute('hidden',''); }
    }
  }, false);

  // Replay simple text rotators observed during temporal capture.
  const temporalRotators = [];
  for (const rot of temporalRotators) {
    if (!rot.safeTextOnly && !rot.safeHtml) continue;
    const el = document.querySelector('[data-copyai-temporal-id="' + CSS.escape(rot.id) + '"]');
    if (!el || !Array.isArray(rot.states) || rot.states.length < 2) continue;
    let i = 0;
    const delays = rot.states.slice(1).map((st,j)=>Math.max(900,(st.t||0)-(rot.states[j].t||0)));
    const applyState=(next)=>{
      if(!next) return;
      if(rot.safeTextOnly && next.text!=null) el.textContent=next.text;
      else if(rot.safeHtml && next.html!=null) el.innerHTML=next.html;
      if(next.className!=null) el.className=next.className;
      if(next.style!=null) el.setAttribute('style',next.style);
      if(next.ariaExpanded!=null) el.setAttribute('aria-expanded',next.ariaExpanded);
      if(next.dataState!=null) el.setAttribute('data-state',next.dataState);
      el.setAttribute('data-copyai-temporal-id',rot.id);
    };
    const tick = () => {
      i = (i + 1) % rot.states.length;
      applyState(rot.states[i]);
      setTimeout(tick, delays[Math.max(0,i-1)] || 3500);
    };
    setTimeout(tick, delays[0] || 3500);
  }
})();
