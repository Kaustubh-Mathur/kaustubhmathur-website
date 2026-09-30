// Edit your project titles, descriptions, metrics, and tools below.
window.PROJECTS = [
  {
    "id": 0,
    "title": "DE SCAN: AI-assisted change impact assessment",
    "categories": [
      "ai",
      "data"
    ],
    "org": "other",
    "tools": "Python, LLM agents · July 2026",
    "metric": "30 of 30",
    "note": "real pipeline-breaking changes flagged in validation",
    "description": "Agent-based workflows catch upstream data-source changes before they cause downstream incidents, mapping each one to the assets it affects across four metadata sources. Runs unattended every 6 hours across about 25 change requests a day, with confidence scoring, risk classes and human review checkpoints.",
    "tags": [
      "Python",
      "LLM agents",
      "Metadata"
    ],
    "badge": "Featured"
  },
  {
    "id": 1,
    "title": "Risk Escalation Assessment Tool",
    "categories": [
      "bi",
      "auto"
    ],
    "org": "delta",
    "tools": "Delta Air Lines · Excel · Aug 2025",
    "metric": "$19.1M",
    "note": "in Q3 cost savings identified",
    "description": "Built with operations and finance stakeholders: an Excel scenario planning and risk tool with an interactive dashboard for workforce utilization, financial coverage and resource trade-offs.",
    "tags": [
      "Excel",
      "Scenario modeling",
      "Dashboards"
    ],
    "badge": "Top impact"
  },
  {
    "id": 2,
    "title": "Weekly attrition pipeline and semantic model",
    "categories": [
      "data",
      "bi"
    ],
    "org": "delta",
    "tools": "Delta Air Lines · SAS, Power BI",
    "metric": "$2.3M / mo",
    "note": "in staffing cost savings informed",
    "description": "An automated SAS pipeline cleans and aggregates HR and scheduling data, joins headcount to station-level records and derives weekly attrition trends for a Power BI semantic model.",
    "tags": [
      "SAS",
      "Power BI",
      "Semantic model"
    ],
    "badge": ""
  },
  {
    "id": 3,
    "title": "Bid shell generation pipeline",
    "categories": [
      "auto",
      "data"
    ],
    "org": "delta",
    "tools": "Delta Air Lines · Python",
    "metric": "98% faster",
    "note": "from 8–9 minutes to 5–10 seconds",
    "description": "A scripted Python pipeline pulls from scheduling data sources and replaces manual data entry.",
    "tags": [
      "Python",
      "Automation"
    ],
    "badge": ""
  },
  {
    "id": 4,
    "title": "AWS to Power BI pipelines and lakehouse storage",
    "categories": [
      "data"
    ],
    "org": "delta",
    "tools": "Delta Air Lines · AWS, Python, Power BI",
    "metric": "~70%",
    "note": "less manual data processing",
    "description": "End-to-end pipelines connect AWS databases to Python and Power BI for near-real-time reporting, with AWS S3 Tables and Apache Iceberg for lakehouse-style storage and backup.",
    "tags": [
      "AWS",
      "Apache Iceberg",
      "Power BI"
    ],
    "badge": ""
  },
  {
    "id": 5,
    "title": "Baggage AI performance analysis",
    "categories": [
      "bi",
      "data"
    ],
    "org": "delta",
    "tools": "Delta Air Lines · Python, Power BI",
    "metric": "30%",
    "note": "better baggage transfer efficiency, measured",
    "description": "Post-deployment analysis of operational data, plus pipelines that monitor station-level KPIs and surface regressions for ops teams.",
    "tags": [
      "Python",
      "Power BI",
      "KPIs"
    ],
    "badge": ""
  },
  {
    "id": 6,
    "title": "Station staffing report generator",
    "categories": [
      "auto"
    ],
    "org": "delta",
    "tools": "Delta Air Lines · Python",
    "metric": "Dozens",
    "note": "of airport stations covered",
    "description": "Generates formatted Excel and PDF staffing reports with automated chart extraction and data-driven narrative, replacing a manual process for the whole team.",
    "tags": [
      "Python",
      "Excel",
      "PDF"
    ],
    "badge": ""
  },
  {
    "id": 7,
    "title": "Research data validation tools",
    "categories": [
      "research",
      "data"
    ],
    "org": "uc",
    "tools": "University of Cincinnati · Python · 2024",
    "metric": "60%",
    "note": "fewer manual entry errors",
    "description": "Data quality checks for field types, value ranges and cross-table consistency across 1,000+ records, built for a nine-person research team.",
    "tags": [
      "Python",
      "Data quality"
    ],
    "badge": ""
  },
  {
    "id": 8,
    "title": "Neural Interface Analytics",
    "categories": [
      "research",
      "school"
    ],
    "org": "uc",
    "tools": "University of Cincinnati · Python, SQLite · Dec 2024",
    "metric": "Predictive",
    "note": "models of neural device performance",
    "description": "Models built on neural interface signal data forecast device performance. The findings went into a technical report that guided ongoing analytics work.",
    "tags": [
      "Python",
      "SQLite",
      "Modeling"
    ],
    "badge": ""
  },
  {
    "id": 9,
    "title": "BarCat Deals",
    "categories": [
      "ai",
      "school"
    ],
    "org": "uc",
    "tools": "Capstone · Team of five · In progress",
    "metric": "In progress",
    "note": "capstone with a team of five",
    "description": "AI-powered scrapers watch social media and gather University of Cincinnati-area bar deals into one searchable feed.",
    "tags": [
      "AI scrapers",
      "Team project"
    ],
    "badge": ""
  }
];

// Search, filters, saved projects, carousel, and project dialogs.
(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],projects=window.PROJECTS;const categories={all:'All projects',data:'Data engineering',auto:'Automation',bi:'Dashboards',ai:'AI',research:'Research',school:'School projects'};const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let saved;try{const data=JSON.parse(localStorage.getItem('km-saved-projects')||'[]');saved=new Set(Array.isArray(data)?data.filter(id=>projects.some(p=>p.id===id)):[])}catch{saved=new Set()}let category='all',query='',sort='featured';const bookmark='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v19l-6-4-6 4z"/></svg>';let toastTimer;function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2300)}function tileClass(p){return 'tile-'+(p.categories.includes('ai')?'ai':p.categories.includes('auto')?'auto':p.categories.includes('bi')?'bi':p.categories.includes('research')?'research':'data')}function renderCard(p){return `<article class="project-card"><div class="project-tile ${tileClass(p)}">${p.badge?`<span class="badge">${esc(p.badge)}</span>`:''}<button class="save-project" data-save="${p.id}" aria-label="${saved.has(p.id)?'Remove':'Save'} ${esc(p.title)}" aria-pressed="${saved.has(p.id)}">${bookmark}</button><span class="tile-category">${esc(categories[p.categories[0]])}</span><strong class="tile-metric">${esc(p.metric)}</strong><span class="tile-note">${esc(p.note)}</span></div><div class="project-body"><button class="project-title" data-open="${p.id}">${esc(p.title)}</button><p class="project-tools">${esc(p.tools)}</p><span class="impact-label">${p.org==='delta'?'Delta Air Lines':p.org==='uc'?'University of Cincinnati':'Independent project'}</span><p class="project-metric">${esc(p.metric)}</p><p class="project-note">${esc(p.note)}</p><p class="project-description">${esc(p.description)}</p><div class="project-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><button class="yellow-button" data-open="${p.id}">View project</button></div></article>`}function selected(name){return $$(`input[name="${name}"]:checked`).map(i=>i.value)}function render(){const orgs=selected('org'),tools=selected('tool');let matches=projects.filter(p=>(category==='all'||p.categories.includes(category))&&(!orgs.length||orgs.includes(p.org))&&(!tools.length||tools.some(t=>p.tags.some(tag=>tag.toLowerCase().includes(t))))&&(!$('#saved-only').checked||saved.has(p.id))&&(!query||`${p.title} ${p.tools} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(query)));if(sort!=='featured')matches.sort((a,b)=>sort==='az'?a.title.localeCompare(b.title):b.title.localeCompare(a.title));$('#project-grid').innerHTML=matches.map(renderCard).join('');$('#result-count').textContent=`${matches.length} of ${projects.length} projects${query?' matching “'+query+'”':''}${category!=='all'?' · '+categories[category]:''}`;$('#empty').hidden=matches.length>0;$('#project-grid').hidden=matches.length===0;$$('.saved-count').forEach(e=>e.textContent=saved.size);$$('.category-filter').forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});$('#search-category').value=category}function setCategory(c){category=c;$('#saved-only').checked=false;render()}function reset(){category='all';query='';sort='featured';$('#search').value='';$('#sort').value='featured';$$('.filters input').forEach(i=>i.checked=false);render()}function toggleSave(id){if(saved.has(id)){saved.delete(id);toast('Project removed from saved')}else{saved.add(id);toast('Project saved for later')}try{localStorage.setItem('km-saved-projects',JSON.stringify([...saved]))}catch{}render();if($('#project-dialog').open){const b=$('#project-dialog [data-save]');if(b){b.textContent=saved.has(id)?'Remove from saved':'Save project';b.setAttribute('aria-pressed',saved.has(id))}}}function openProject(id){const p=projects.find(p=>p.id===id);if(!p)return;$('#dialog-content').innerHTML=`<div class="dialog-head">Portfolio / ${esc(categories[p.categories[0]])}</div><div class="dialog-layout"><div class="dialog-tile ${tileClass(p)}"><span class="small-label">PROJECT OUTCOME</span><strong>${esc(p.metric)}</strong><p>${esc(p.note)}</p><span class="small-label">${esc(p.tools)}</span></div><div class="dialog-detail"><h2 id="dialog-title">${esc(p.title)}</h2><p class="project-tools">${esc(p.tools)}</p><div class="project-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><h3>About this project</h3><p>${esc(p.description)}</p><h3>Outcome</h3><p><strong>${esc(p.metric)}</strong> — ${esc(p.note)}</p><a class="yellow-button" href="mailto:mathurkh@mail.uc.edu?subject=${encodeURIComponent('About '+p.title)}">Ask about this project</a><button class="outline-button" data-save="${p.id}" aria-pressed="${saved.has(p.id)}">${saved.has(p.id)?'Remove from saved':'Save project'}</button></div></div>`;$('#project-dialog').showModal();document.body.classList.add('modal-open')}
$('#category-filters').innerHTML=Object.entries(categories).map(([id,name])=>`<button class="category-filter" data-filter="${id}" aria-pressed="${id==='all'}">${name}</button>`).join('');$('#drawer-categories').innerHTML=Object.entries(categories).map(([id,name])=>`<a href="#projects" data-category="${id}">${name}</a>`).join('');$('#tool-filters').innerHTML=['Python','Power BI','Excel','SAS','SQL','AWS'].map(t=>`<label><input type="checkbox" name="tool" value="${t.toLowerCase()}"> ${t}</label>`).join('');$('#featured').innerHTML=[0,1,3,4,5].map(id=>{const p=projects.find(p=>p.id===id);return `<button class="featured-card" data-open="${id}"><div class="feature-tile ${tileClass(p)}"><strong>${esc(p.metric)}</strong></div><h3>${esc(p.title)}</h3><p>${esc(p.note)}</p></button>`}).join('');
document.addEventListener('click',e=>{const save=e.target.closest('[data-save]'),open=e.target.closest('[data-open]'),cat=e.target.closest('[data-category]'),filter=e.target.closest('[data-filter]');if(save){toggleSave(Number(save.dataset.save));return}if(open){openProject(Number(open.dataset.open));return}if(cat){setCategory(cat.dataset.category);if($('#nav-dialog').open)$('#nav-dialog').close()}if(filter)setCategory(filter.dataset.filter)});$('#search-form').addEventListener('submit',e=>{e.preventDefault();query=$('#search').value.trim().toLowerCase();category=$('#search-category').value;render();$('#projects').scrollIntoView({behavior:'smooth'})});$('#search').addEventListener('input',()=>{query=$('#search').value.trim().toLowerCase();render()});$('#search-category').addEventListener('change',()=>{category=$('#search-category').value;render()});$$('.filters input').forEach(i=>i.addEventListener('change',render));$('#sort').addEventListener('change',()=>{sort=$('#sort').value;render()});$('#reset').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);$('#saved-button').addEventListener('click',()=>{reset();$('#saved-only').checked=true;render();$('#projects').scrollIntoView({behavior:'smooth'})});$('#all-menu').addEventListener('click',()=>{$('#nav-dialog').showModal();$('#all-menu').setAttribute('aria-expanded','true');document.body.classList.add('modal-open')});$('.close-nav').addEventListener('click',()=>$('#nav-dialog').close());$$('#nav-dialog>a').forEach(a=>a.addEventListener('click',()=>$('#nav-dialog').close()));$('.close-dialog').addEventListener('click',()=>$('#project-dialog').close());$$('dialog').forEach(d=>{d.addEventListener('close',()=>{if(!$$('dialog').some(el=>el.open))document.body.classList.remove('modal-open');$('#all-menu').setAttribute('aria-expanded','false')});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
const slides=[{title:'Big ideas.<br>Real-world impact.',description:'Explore the tools, pipelines, and analytics I build to make complex operations simpler.',metric:'$19.1M',note:'Q3 cost savings identified at Delta Air Lines',link:'Explore my projects',category:'all',background:'#cbdfea'},{title:'Catch changes.<br>Before they break things.',description:'DE SCAN uses AI-assisted workflows to assess upstream changes and their downstream impact.',metric:'30 of 30',note:'Pipeline-breaking changes flagged in validation',link:'Explore AI projects',category:'ai',background:'#d4dcea'},{title:'Less repetition.<br>More possibility.',description:'A Python pipeline turns an 8–9 minute bid shell workflow into a task that takes seconds.',metric:'98% faster',note:'From 8–9 minutes to 5–10 seconds',link:'Explore automation',category:'auto',background:'#e8dcc4'}];let slide=0;function showSlide(n){slide=(n+slides.length)%slides.length;const s=slides[slide];$('#hero-title').innerHTML=s.title;$('#hero-description').textContent=s.description;$('#hero-metric').textContent=s.metric;$('#hero-note').textContent=s.note;$('#hero-link').textContent=s.link;$('#hero-link').dataset.category=s.category;$('.hero').style.background=s.background;$$('[data-slide]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.slide)===slide))}$('.hero-prev').addEventListener('click',()=>showSlide(slide-1));$('.hero-next').addEventListener('click',()=>showSlide(slide+1));$$('[data-slide]').forEach(b=>b.addEventListener('click',()=>showSlide(Number(b.dataset.slide))));$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('mathurkh@mail.uc.edu');toast('Email address copied')}catch{toast('Email: mathurkh@mail.uc.edu')}});$('#year').textContent=new Date().getFullYear();showSlide(0);render();})();
