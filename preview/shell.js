/* Diagnostics switch (preview): the debug boxes are ON by default while we are testing. Hide them with ?diag=0 on
   the URL (it sticks in this browser); bring them back with ?diag=1. */
try{
  if(/[?&]diag=0\b/.test(location.search)) localStorage.setItem('blockDiag', '0');
  if(/[?&]diag=1\b/.test(location.search)) localStorage.removeItem('blockDiag');
  if(localStorage.getItem('blockDiag') !== '0') document.documentElement.classList.add('diag');
}catch(err){ document.documentElement.classList.add('diag'); }
/* shell.js — one copy, shared by every block.
   Built by merge_shell.py from three drifted variants; every former
   difference is now driven by the data, not by which page it sits in. */




   // Cleaning Products, the last case of block one





/* which branches are alive at each STEP, not just each case.
   Falls back to the case's own set when a step is not listed. */



/* arithmetic badges — fixed positions, lit only when a step uses them */






/* framework sets — the canned shape, and how this case bends it */



/* ---------------- shared canvas ---------------- */



function drawTree(c, stepIndex){
  const perStep = STEPLIVE[c.id] && STEPLIVE[c.id][stepIndex];
  const live = new Set(perStep || c.live); let s = "";
  for(const [a,b] of EDGES){
    const A=NX[a], B=NX[b], on = live.has(a)&&live.has(b);
    s += `<path d="M${A.x+A.w/2} ${A.y+A.h} V${(A.y+A.h+B.y)/2} H${B.x+B.w/2} V${B.y}" fill="none"
      stroke="${on?'var(--accent)':'var(--line-2)'}" stroke-width="${on?1.8:1}" opacity="${on?1:.5}"/>`;
  }
  for(const n of NODES){
    const on = live.has(n.id), d = c.nodes[n.id] || {t:"",v:""};
    /* No group opacity: it multiplied against an already-faint token and put the
       unlit figures at about 1.2:1. The box carries the lit/unlit distinction now —
       filled and ringed when live, plain and thin-bordered when not — while the text
       stays on tokens the shade solver keeps above the contrast floor. */
    s += `<g class="fwnode" data-n="${n.id}">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="2"
        fill="${on?'var(--accent-soft)':'var(--panel)'}" stroke="${on?'var(--accent)':'var(--line-2)'}"
        stroke-width="${on?1.6:1}"/>
      <text x="${n.x+9}" y="${n.y+16}" font-family="Public Sans, sans-serif" font-size="10.5"
        font-weight="600" fill="${on?'var(--ink)':'var(--ink-2)'}">${d.t}</text>
      <text x="${n.x+9}" y="${n.y+31}" font-family="IBM Plex Mono, monospace" font-size="10.5"
        fill="${on&&d.v?'var(--ink)':'var(--ink-3)'}">${d.v||"\u2014"}</text></g>`;
  }
  const ops = (V2[c.id] && V2[c.id][stepIndex] && V2[c.id][stepIndex].ops) || [];
  for(const key of ops){
    const b = OPBADGE[key]; if(!b) continue;
    s += `<g><circle cx="${b.x}" cy="${b.y}" r="10" fill="var(--accent)" stroke="var(--panel)"
      stroke-width="2"/><text x="${b.x}" y="${b.y+4}" text-anchor="middle"
      font-family="IBM Plex Mono, monospace" font-size="12" font-weight="600"
      fill="var(--on-accent)">${b.sym}</text><title>${b.t}</title></g>`;
  }
  document.getElementById('tree').innerHTML = s;
}

/* ---------------- annotated originals ---------------- */


/* ---------------- figures ---------------- */
const L=128, R=644;
const cap = t=>`<text x="6" y="12" font-family="IBM Plex Mono, monospace" font-size="10"
  letter-spacing="1.2" fill="var(--ink-3)">${t.toUpperCase()}</text>`;
const row = (y,w,fill,lab,val,tc)=>`
  <rect x="${L}" y="${y}" width="${Math.max(0,w)}" height="18" rx="1.5" fill="${fill}"/>
  <text x="${L-8}" y="${y+13}" text-anchor="end" font-family="Public Sans, sans-serif" font-size="11"
    fill="var(--ink-2)">${lab}</text>
  <text x="${L+Math.max(0,w)+7}" y="${y+13}" font-family="IBM Plex Mono, monospace" font-size="11"
    fill="${tc||'var(--ink)'}">${val}</text>`;






/* ---------------- structured step panel ---------------- */

/* ---- reveal-on-ask: study (default) shows every answer; practice hides each one behind an 'Ask it' button until you click ---- */
let revealMode = 'study';
try{ const m = localStorage.getItem('caseReveal'); if(m === 'practice' || m === 'study') revealMode = m; }catch(err){}
const revealed = new Set();                       /* 'CASE|step|askIndex' keys the reader has asked for this visit */
const rkey = (cid, i, q) => cid + '|' + i + '|' + q;
const isGated = (cid, i, q) => revealMode === 'practice' && !revealed.has(rkey(cid, i, q));

/* The casebook's own framework (SRCFW, per case): one structured outline, used both in the side window
   and inline on the Framework step. */
const SF_FROM = {given:'Handed to you in the prompt', ask:'The interviewer gives it only if you ask', calc:'You work it out from other numbers', none:'The case never supplies it'};
function sfNode(c){ return c; }
function sfFind(root, key){ let n = root; key.split('.').slice(1).forEach(i=>{ n = n.k[+i]; }); return n; }
function sfWalk(n, key, fn){ fn(n, key); (n.k||[]).forEach((x,i)=>sfWalk(x, key + '.' + i, fn)); }
function sfRoot(f){ return Object.assign({}, f.hyp, {k: f.kids}); }
/* the casebook's own framework as a left-to-right tree. step = the 1-based step that lights it up
   (0 = light everything: the Framework step itself, where the whole structure is being built) */
function srcFwHTML(id, inline){
  const f = (typeof SRCFW !== 'undefined') && SRCFW[id];
  if(!f) return `<p class="sfnone">This case has no casebook framework added here yet. The pilot covers Army Hotel and Breast Cancer Surgery.</p>`;
  const root = sfRoot(f), stepNo = (inline || si + 1 === f.buildStep) ? 0 : si + 1;
  const lit = [];
  sfWalk(root, 'h', (n,k)=>{ if(stepNo && (n.u||[]).includes(stepNo) && k !== 'h') lit.push(n.t); });
  const cls = n => {
    if(!stepNo) return n.from === 'none' && !(n.u||[]).length ? 'never' : '';
    if((n.u||[]).includes(stepNo)) return 'lit';
    if(n.from === 'none' && !(n.u||[]).length) return 'never';
    if((n.u||[]).length) return 'seen';
    return '';
  };
  const hasLitKid = n => (n.k||[]).some(x=>(x.u||[]).includes(stepNo) || hasLitKid(x));
  const node = (n, key) => {
    const kids = n.k || [];
    const c0 = cls(n) + (stepNo && !((n.u||[]).includes(stepNo)) && hasLitKid(n) ? ' path' : '');
    return `<li${kids.length?' class="hk"':''}><button type="button" class="sfnode ${c0}${key==='h'?' root':''}" data-k="${key}">` +
      `<span class="sfname">${esc(n.t)}</span>${n.from?`<i class="sfsrc sf-${n.from}" title="${esc(SF_FROM[n.from])}"></i>`:''}</button>` +
      (kids.length ? `<ul>${kids.map((x,i)=>node(x, key + '.' + i)).join('')}</ul>` : '') + `</li>`;
  };
  const first = stepNo ? (()=>{ let r = null; sfWalk(root,'h',(n,k)=>{ if(!r && k!=='h' && (n.u||[]).includes(stepNo)) r = k; }); return r || 'h'; })() : 'h';
  const html = `<div class="srcfw${inline?' inl':''}" data-case="${esc(id)}">
    <p class="sfmeta">${esc(f.src)}</p>
    <div class="sfscroll"><ul class="sftree">${node(root,'h')}</ul></div>
    <div class="sfkey"><span><i class="sfsrc sf-given"></i>in the prompt</span><span><i class="sfsrc sf-ask"></i>only if you ask</span><span><i class="sfsrc sf-calc"></i>you work it out</span><span><i class="sfsrc sf-none"></i>never supplied</span>${stepNo?'<span><b class="sfl lit">lit</b>used on this step</span><span><b class="sfl seen">seen</b>used on another step</span>':''}</div>
    ${stepNo?`<p class="sflitline">${lit.length?'Lit on this step: <b>'+lit.map(esc).join('</b>, <b>')+'</b>.':'Nothing from the casebook framework is used on this step.'}</p>`:''}
    <div class="sfdet">${sfDetailHTML(sfFind(root, first), first)}</div>
  </div>`;
  return html.replace(`data-k="${first}"`, `data-k="${first}" aria-pressed="true"`);
}
function sfDetailHTML(n, key){
  const used = (n.u||[]).length ? 'Used on step ' + n.u.join(', ') : (n.from === 'none' ? 'Not used in this case' : '');
  return `<h5>${esc(n.t)}</h5>
    ${n.from?`<span class="sfpill sf-${n.from}">${esc(SF_FROM[n.from])}</span>`:''}${used?`<span class="sfused">${esc(used)}</span>`:''}
    ${n.def?`<div><span class="lab">What it means</span><p>${esc(n.def)}</p></div>`:''}
    ${n.why?`<div><span class="lab">Why you need it</span><p>${esc(n.why)}</p></div>`:''}
    ${n.n?`<div><span class="lab">In this case</span><p>${esc(n.n)}</p></div>`:''}`;
}
function sfFit(box){
  const sc = box.querySelector('.sfscroll'); if(!sc) return;
  const t = sc.querySelector('.sftree'); t.style.zoom = 1;
  const need = t.scrollWidth, have = sc.clientWidth;
  if(have > 40 && need > have) t.style.zoom = Math.max(.55, have / need);
}
document.addEventListener('click', e=>{
  const b = e.target.closest && e.target.closest('.sfnode'); if(!b) return;
  const box = b.closest('.srcfw'); const f = SRCFW[box.dataset.case]; if(!f) return;
  box.querySelectorAll('.sfnode[aria-pressed]').forEach(x=>x.removeAttribute('aria-pressed'));
  b.setAttribute('aria-pressed','true');
  const det = box.querySelector('.sfdet');
  det.innerHTML = sfDetailHTML(sfFind(sfRoot(f), b.dataset.k), b.dataset.k);
  if(typeof markTerms === 'function') markTerms(det);
});
function drawSrcFw(c){
  const w = document.querySelector('#peekSrc .pbody'); if(!w) return;
  w.innerHTML = srcFwHTML(c.id, false);
  const pc = document.querySelector('#peekSrc .pc');
  const has = typeof SRCFW !== 'undefined' && SRCFW[c.id];
  if(pc) pc.textContent = has ? 'book' : 'none';
  if(has){
    try{ markTerms(w.querySelector('.sfdet')); }catch(err){}
    const box = w.querySelector('.srcfw');
    sfFit(box);
    if(window.ResizeObserver){ if(drawSrcFw._ro) drawSrcFw._ro.disconnect(); drawSrcFw._ro = new ResizeObserver(()=>sfFit(box)); drawSrcFw._ro.observe(w); }
  }
}
function renderV2(c, s, v){
  const bk = c.book === 'kellogg';
  const part = (label, inner) => inner ? `<div class="sub">${label}</div>${inner}` : "";
  const given = v.given && v.given.length
    ? `<div class="kv">${v.given.map(([k,val])=>
        `<span class="k">${esc(k)}</span><span class="v">${esc(val)}</span>`).join('')}</div>` : "";
  /* reveals: the payoff of an "unlock" question, kept WITH the question that earns it
     rather than folded into "given" -- given is for what the case hands over with no
     question asked at all. An ask row with reveals shows the value only once the
     question has been asked, exactly as the source gates it ("If asked, provide...",
     "When asked, reveal..."); given never repeats it a step later as if it had simply
     been supplied. */
  const ask = v.ask && v.ask.length
    ? v.ask.map(([q,why,kind,reveals],qi)=>`<div class="askrow">
        <span class="kind ${kind}">${KIND[kind]||kind}</span>
        <span class="q">&ldquo;${esc(q)}&rdquo;</span>
        <span class="why">${esc(why)}</span>
        ${reveals && reveals.length ? `<div class="reveals${isGated(c.id, si, qi) ? ' gated' : ''}" data-rk="${rkey(c.id, si, qi)}">
            <span class="rlab">Ask it, and the case reveals</span>
            <button type="button" class="askit">Ask it</button>
            <div class="kv">${reveals.map(([k,val])=>
              `<span class="k">${esc(k)}</span><span class="v">${esc(val)}</span>`).join('')}</div>
          </div>` : ''}</div>`).join('') : "";
  const missing = v.missing && v.missing.length
    ? `<div class="miss">${v.missing.map(m=>`<div>${esc(m)}</div>`).join('')}</div>` : "";
  const calc = v.calc && v.calc.length
    ? `<div class="calc">${v.calc.map(([e,r,w])=>`<div class="calcrow">
        <span class="e">${esc(e)}</span><span class="r">${esc(r)}</span>
        <span class="w">${esc(w)}</span></div>`).join('')}</div>` : "";
  const logic = v.logic && v.logic.length
    ? `<div class="logic">${v.logic.map(([cl,b])=>`<div><span class="dot"></span>
        <span class="c">${esc(cl)}</span><span class="b">${esc(b)}</span></div>`).join('')}</div>` : "";
  const verdict = v.verdict ? `<div class="verdict">${esc(v.verdict)}</div>` : "";
  const twoCol = given && (ask || missing)
    ? `<div class="cols2"><div>${part("What you have", given)}</div>
        <div>${part(ask?"What to ask for, and why":"", ask)}${part(missing?"What you still won't have":"", missing)}</div></div>`
    : part("What you have", given) + part("What to ask for, and why", ask)
      + part("What you still won't have", missing);
  const body = twoCol + part("The chain", calc) + part("The reasoning", logic) + verdict;
  return `
    ${(()=>{
      /* srcFirst: this step's own source is what hands over the information the
         challenge needs, so it is read first and the challenge follows. Otherwise the
         challenge is genuinely cold and the source is the model answer. */
      const sf = !!(typeof SRCFIRST !== 'undefined' && SRCFIRST[c.id] &&
                    SRCFIRST[c.id][si] === true);
      const label = s.attempt ? (sf ? 'Now try it' : 'Try it first')
                              : (sf ? 'What you have, and what to ask' : 'Before you read on');
      const att = s.attempt
        ? `<div class="att"><span class="tag a">${label}</span>
             <p>${esc(s.attempt.q)}</p>
             <details class="reveal"><summary>Show the worked answer</summary>
               <div>${body}</div></details></div>`
        : `<div class="att"><span class="tag a">${label}</span>${body}</div>`;
      const srcb = `<div class="src ${bk?'k':''}"><span class="tag s ${bk?'k':''}">Source · ${
          bk?'Kellogg 2020':'Booth 2025'}, ${esc(c.pages)}</span>
          ${v.src.map(([l,t])=>(t==='SRCFW' && typeof SRCFW!=='undefined' && SRCFW[c.id])
            ? `<div class="srcrow"><span class="l">${esc(l)}</span>${srcFwHTML(c.id,true)}<button type="button" class="openfw" data-open="peekSrc">Keep this open in a side window</button></div>`
            : `<div class="srcrow"><span class="l">${esc(l)}</span>
            <p>${esc(t==='SRCFW'?'':t)}</p></div>`).join('')}</div>`;
      return sf ? srcb + att : att + srcb;
    })()}
    <div class="ours"><span class="tag o">Ours</span>
      ${v.ours.map(([l,t])=>`<div class="oursrow"><span class="l">${esc(l)}</span>
        <p>${t}</p></div>`).join('')}</div>`;
}

/* ---------------- render ---------------- */
const el = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let ci = 0, si = 0;

function drawSparks(){
  el('sparks').innerHTML = DIALS.map(([k,label])=>{
    const ghosted = typeof PREV !== 'undefined' && !!PREV;
    const vals = (ghosted ? [PREV[k]] : []).concat(CASES.map(c=>c.dials[k]));
    const W=180,H=52,P=8, span=Math.max(1,vals.length-1),
          x=i=>P+i*(W-2*P)/span, y=v=>H-P-((v-1)/4)*(H-2*P);
    let turns=[];
    for(let i=1;i<vals.length;i++) if(Math.abs(vals[i]-vals[i-1])>=2) turns.push(i);
    const pts = vals.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const dots = vals.map((v,i)=>{
      const big = i===ci+(ghosted?1:0), jump = turns.includes(i), ghost = ghosted && i===0;
      return `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${big?4:2.6}"
        fill="${ghost?'var(--dim)':jump?'var(--warn)':'var(--accent)'}" stroke="var(--panel)"
        stroke-width="1"/>`;
    }).join('');
    const caseAt = i => CASES[i - (ghosted?1:0)];
    const sub = turns.length
      ? `jumps at case ${turns.map(t=>{const cc=caseAt(t); return cc ? cc.step : t;}).join(' and ')}`
      : (Math.max(...vals)-Math.min(...vals)===0 ? "never moves" : "moves gently");
    return `<div class="spark"><div class="nm">${label}</div><div class="sub">${sub}</div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label} across ${esc(META.name)}">
        <line x1="${P}" y1="${H-P}" x2="${W-P}" y2="${H-P}" stroke="var(--line)" stroke-width="1"/>
        <polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="1.6"
          stroke-linejoin="round"/>${dots}</svg></div>`;
  }).join('');
}
function drawToolkit(){
  const c = CASES[ci];
  const chip = (t, cls) => CONCEPT[t]
    ? `<button type="button" class="chip ${cls}" data-c="${esc(t)}" aria-pressed="false">${esc(t)}</button>`
    : `<span class="chip ${cls}">${esc(t)}</span>`;
  const have = c.carried.map(t=>chip(t,'have')).join('');
  const nw = c.newTools.map(t=>chip(t,'new')).join('');
  const later = CASES.slice(ci+1).flatMap(x=>x.newTools).map(t=>chip(t,'')).join('');
  el('toolkit').innerHTML =
    `<span class="lab">Toolkit<span class="cue">click any concept</span></span>${have || '<span class="chip none">empty</span>'}${nw}
     ${later?`<span class="lab" style="margin-left:8px">still to come</span>${later}`:''}`;
}
function drawRail(){
  el('rail').innerHTML = CASES.map((c,k)=>{
    const prev = k ? CASES[k-1].dials
                   : (typeof PREV !== 'undefined' && PREV ? PREV : null);
    const moved = prev ? DIALS.filter(([d])=>c.dials[d]!==prev[d]) : [];
    const mv = prev
      ? (moved.map(([d,label])=>{
          const delta = c.dials[d]-prev[d];
          return `${label.toLowerCase()} ${delta>0?'+':'−'}${Math.abs(delta)}`;
        }).join(', ') || 'nothing moves')
      : 'the baseline';
    const hasEx = c.steps.some(s=>s.exhibit);
    return `<button data-k="${k}" aria-current="${k===ci}">
      <span class="n ${c.book==='kellogg'?'k':'b'}">STEP ${c.step}${
        c.book ? ` · ${c.book==='kellogg'?'KELLOGG':'BOOTH'}` : ''} · ${esc(c.pages)}</span>
      <span class="nm">${esc(c.name)}</span>
      <span class="mv">${esc(mv)}</span>
      <span>${hasEx?'<span class="flag ex">ORIGINAL EXHIBIT</span> ':''}${
        c.bridge?'<span class="flag">BRIDGE</span>':''}</span></button>`;
  }).join('');
}
function drawBridge(){
  const c = CASES[ci];
  el('bridge').innerHTML = c.bridge
    ? `<div class="bridge"><span class="tag">Bridge — ours · ${esc(c.bridge.turn)}</span>
        <p>${esc(c.bridge.text)}</p></div>`
    : `<div class="bridge" style="border-color:var(--accent); background:var(--accent-soft)">
        <span class="tag" style="color:var(--accent)">Why this case sits here — ours</span>
        <p>${esc(c.why)}</p></div>`;
}
function drawExhibit(key){
  const w = el('exwrap');
  if(!w) return;
  if(!key){ w.hidden = true; w.innerHTML=""; return; }
  const e = EXHIBITS[key];
  w.hidden = false;
  w.innerHTML = `
    <div class="exhead"><span class="t ${e.book==='kellogg'?'k':''}">Original exhibit</span>
      <span class="s">${esc(e.src)}</span></div>
    <div class="exbox"><img src="${IMG[e.img]}" alt="${esc(e.src)}">
      ${((typeof EXTERMS !== 'undefined' && EXTERMS[e.img]) || []).filter(h=>TERMS[h.t] && termInScope(TERMS[h.t])).map(h=>
        `<span class="term exterm" data-t="${esc(h.t)}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%"></span>`).join('')}
      ${e.marks.map((m,i)=>`<span class="mark" style="left:${m.x}%; top:${m.y}%">${i+1}</span>`).join('')}
    </div>
    <div class="annots">${e.marks.map((m,i)=>
      `<div class="annot"><b>${i+1}</b><span>${esc(m.t)}</span></div>`).join('')}</div>`;
}

function render(){
  const c = CASES[ci], s = c.steps[si];
  const v2 = V2[c.id] && V2[c.id][si];
  drawSparks(); drawToolkit(); drawConcept(); drawRail(); drawBridge(); drawTree(c, si);
  drawFrameworks(c); drawFacts(c, si); drawSrcFw(c);
  fitColumn();
  const fig = s.fig && FIGS[s.fig];
  el('fig').innerHTML = fig ? FIGS[s.fig]() : "";
  el('fig').style.display = fig ? "block" : "none";
  el('figcap').textContent = s.fig ? (FIGCAPS[s.fig]||"") : "";
  drawExhibit(s.exhibit);
  const sp = document.getElementById('split'); if(sp) sp.classList.toggle('emptycanvas', !fig && !s.exhibit);   /* the tree and notes live in the side dock now; the canvas column is only for the figure and the exhibit */

  el('steps').innerHTML = c.steps.map((x,k)=>
    `<button data-s="${k}" aria-current="${k===si}"><span class="sn">${k+1}</span> ${
      esc(x.tab)}</button>`).join('');
  const clockLabels = ["1–2 min · the prompt","3–5 min · framework","14–20 min · analysis",
                       "2 min · recommendation"];
  const bk = c.book==='kellogg';
  el('body').innerHTML = `
    <p class="eyebrow">${esc(c.name)} · ${clockLabels[s.clock]}</p>
    <h2>${esc(s.title)}</h2>
    <div class="clock" aria-hidden="true">${[12,22,54,12].map((w,k)=>
      `<i class="${s.clock===k?'on':''}" style="flex:${w}"></i>`).join('')}</div>
    ${v2 ? renderV2(c, s, v2) : `
    ${s.attempt?`<div class="att"><span class="tag a">Try it first</span>
      <p>${esc(s.attempt.q)}</p>
      <details class="reveal"><summary>Show the worked answer</summary>
        <div><p>${esc(s.attempt.a)}</p></div></details></div>`:''}
    <div class="src ${bk?'k':''}"><span class="tag s ${bk?'k':''}">Source · ${bk?'Kellogg 2020':'Booth 2025'}, ${esc(c.pages)}</span>
      <p>${esc(s.src)}</p></div>
    <div class="ours"><span class="tag o">Ours</span><p>${esc(s.ours)}</p></div>`}
    <div class="railgrid">
      <div><span class="lab">Being scored on</span><span class="val">${esc(s.rubric)}</span></div>
      ${(v2&&v2.ask&&v2.ask.length)||s.ask.length?`<div><span class="lab">You'd have to ask</span>
        <span class="val">${((v2&&v2.ask)?v2.ask.map(a=>a[0]):s.ask)
          .map(a=>'&ldquo;'+esc(a)+'&rdquo;').join('<br>')}</span></div>`:''}
      <div><span class="lab">Where people lose it</span><span class="val">${esc(s.watch)}</span></div>
    </div>
    <div class="nav">
      <button id="prev" ${si===0&&ci===0?'disabled':''}>← ${si>0?esc(c.steps[si-1].tab):'Previous case'}</button>
      <button id="next" ${si===c.steps.length-1&&ci===CASES.length-1?'disabled':''}>${
        si<c.steps.length-1?esc(c.steps[si+1].tab):'Next case'} →</button>
    </div>`;
  markAllTerms(); drawSrcFw(c); updateSticky(); dockCounts(); document.querySelectorAll('#body .srcfw').forEach(sfFit);
  el('prev').onclick = ()=>{ if(si>0){si--;} else if(ci>0){ci--; si=CASES[ci].steps.length-1;} render(); scrollToPanel(); };
  el('next').onclick = ()=>{ if(si<c.steps.length-1){si++;} else if(ci<CASES.length-1){ci++; si=0;} render(); scrollToPanel(); };
}
el('rail').addEventListener('click', e=>{ const b=e.target.closest('button');
  if(b){ ci=+b.dataset.k; si=0; fwOpen=null; render(); window.scrollTo({top:0,behavior:'smooth'}); }});
el('steps').addEventListener('click', e=>{ const b=e.target.closest('button');
  if(b){ si=+b.dataset.s; render(); }});

/* ---------------- page tint ---------------- */

function isDark(){
  const t = document.documentElement.getAttribute('data-theme');
  if(t === 'dark') return true;
  if(t === 'light') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
let tintId = "paper";
function applyTint(){ applyShade(); }

function buildTint(){
  const box = document.getElementById('tint');
  box.insertAdjacentHTML('beforeend', TINTS.map(t=>
    `<button data-t="${t.id}" title="${t.nm}" aria-label="${t.nm} background"
      style="background:${t.light[0]}"></button>`).join('') +
    `<span class="nm" id="tintnm"></span>`);
  box.addEventListener('click', e=>{
    const b = e.target.closest('button'); if(!b) return;
    tintId = b.dataset.t;
    try{ localStorage.setItem('caseTint', tintId); }catch(err){}
    applyTint();
    const t = TINTS.find(x=>x.id===tintId);
    document.getElementById('tintnm').textContent = t ? t.nm : "";
  });
  try{
    const saved = localStorage.getItem('caseTint');
    if(saved && TINTS.some(t=>t.id===saved)) tintId = saved;
  }catch(err){}
  applyTint();
  const t = TINTS.find(x=>x.id===tintId);
  document.getElementById('tintnm').textContent = t ? t.nm : "";
  if(window.matchMedia){
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    (mq.addEventListener ? mq.addEventListener('change', applyTint) : mq.addListener(applyTint));
  }
}

/* ---------------- shade: one slider from paper to ink ----------------
   Nine stops. Five deepening paper shades, then four deepening dark ones. The ink is
   solved against the paper at every stop rather than held fixed, because darkening the
   background under fixed text is how a theme control quietly destroys its own
   legibility. There is one flip, between Taupe and Dusk: a mid-grey page cannot carry
   readable text either way, so the ramp steps over that region rather than through it. */

              /* stops 0-4 are light, 5-8 dark */
            /* Stone — neutral, deliberately not white */




   /* small text needs 4.5; solve with headroom */




/* Every remaining token, written inline too. The slider used to set only ground, panel,
   line and the solved colours, leaving the soft panels, the borders and --on-accent to
   the stylesheet's light/dark blocks. That is two sources of truth for one palette, and
   any disagreement between them paints a page whose panels are dark while its paper is
   light — exactly the state Sid photographed and I could not reproduce. Writing the
   whole set makes the disagreement impossible rather than unlikely. */



function shHex(c){ return [1,3,5].map(i=>parseInt(c.substr(i,2),16)); }
function shStr(a){ return '#' + a.map(v=>Math.max(0,Math.min(255,Math.round(v)))
                                       .toString(16).padStart(2,'0')).join(''); }
function shLum(c){
  const f = v => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
  const [r,g,b] = shHex(c);
  return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b);
}
function shRatio(a,b){
  const la = shLum(a), lb = shLum(b);
  return (Math.max(la,lb) + 0.05) / (Math.min(la,lb) + 0.05);
}
function shMix(a,b,t){
  const A = shHex(a), Bb = shHex(b);
  return shStr(A.map((v,i)=>v + (Bb[i]-v)*t));
}
/* push a colour toward black or white until it clears `target` against bg */
function shSolve(col, bg, target, toward){
  if(shRatio(col,bg) >= target) return col;
  let lo = 0, hi = 1;
  for(let i=0; i<22; i++){
    const m = (lo+hi)/2;
    if(shRatio(shMix(col,toward,m), bg) >= target) hi = m; else lo = m;
  }
  return shMix(col, toward, hi);
}

let shade = SHADE_DEFAULT;
function shadeIsDark(){ return shade >= SHADE_LIGHT; }

function applyShade(){
  const t = (typeof TINTS !== 'undefined' && TINTS.find(x=>x.id===tintId)) ||
            (typeof TINTS !== 'undefined' ? TINTS[0] : null);
  if(!t) return;
  const dark = shadeIsDark();
  const root = document.documentElement;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');

  let g, p, l;
  if(dark){
    const i = shade - SHADE_LIGHT, n = SHADES.length - SHADE_LIGHT;   /* 0..3 */
    const f = SH_MAX * (n - 1 - i) / (n - 1);
    g = shMix(t.dark[0], SH_LIGHTEN, f);
    p = shMix(t.dark[1], SH_LIGHTEN, f);
    l = shMix(t.dark[2], SH_LIGHTEN, f);
  } else {
    const f = SH_MAX * shade / (SHADE_LIGHT - 1);
    g = shMix(t.light[0], SH_DARKEN, f);
    p = shMix(t.light[1], SH_DARKEN, f);
    l = shMix(t.light[2], SH_DARKEN, f);
  }
  const s = root.style;
  s.setProperty('--ground', g); s.setProperty('--panel', p); s.setProperty('--line', l);
  s.setProperty('color-scheme', dark ? 'dark' : 'light');
  const rest = dark ? REST_DARK : REST_LIGHT;
  Object.keys(rest).forEach(k=>s.setProperty(k, rest[k]));

  /* Every surface text actually sits on, not just the page and the card: the soft
     accent panels are backdrops too. Read them back after data-theme is set so the
     theme's own values are picked up, and solve against the hardest one. */
  const cs = getComputedStyle(root);
  const surfaces = [g, p];
  ['--accent-soft','--ours-soft','--warn-soft'].forEach(v=>{
    const c = cs.getPropertyValue(v).trim();
    if(/^#[0-9a-f]{6}$/i.test(c)) surfaces.push(c);
  });
  const bg = surfaces.reduce((worst,c)=>
    dark ? (shLum(c) > shLum(worst) ? c : worst)
         : (shLum(c) < shLum(worst) ? c : worst), surfaces[0]);
  const toward = dark ? '#ffffff' : '#000000';
  const base = dark ? INK_DARK : INK_LIGHT;
  ['--ink','--ink-2','--ink-3'].forEach((name,k)=>
    s.setProperty(name, shSolve(base[k], bg, INK_TGT[k], toward)));
  const abase = dark ? ACC_DARK : ACC_LIGHT;
  ACC_KEYS.forEach((k,i)=>
    s.setProperty('--' + k, shSolve(abase[i], bg, 5.1, toward)));

  const nm = document.getElementById('shadenm');
  if(nm) nm.textContent = SHADES[shade];
  const sl = document.getElementById('shadeslider');
  if(sl && +sl.value !== shade) sl.value = shade;
  /* the tint swatches show the family in the current polarity */
  const box = document.getElementById('tint');
  if(box) [...box.querySelectorAll('button[data-t]')].forEach(b=>{
    const tt = TINTS.find(x=>x.id === b.dataset.t);
    if(tt) b.style.background = (dark ? tt.dark : tt.light)[0];
    b.setAttribute('aria-pressed', String(b.dataset.t === tintId));
  });
}

function buildShade(){
  const box = document.getElementById('tint');
  if(!box) return;
  box.insertAdjacentHTML('beforeend',
    `<span class="shade"><input type="range" id="shadeslider" min="0" max="${
      SHADES.length-1}" step="1" value="${SHADE_DEFAULT}"
      aria-label="Page shade, paper to ink"><span class="snm" id="shadenm"></span></span>`);
  try{
    const saved = parseInt(localStorage.getItem('caseShade'), 10);
    if(!isNaN(saved) && saved >= 0 && saved < SHADES.length) shade = saved;
  }catch(e){}
  const sl = document.getElementById('shadeslider');
  sl.value = shade;
  const onmove = ()=>{
    shade = +sl.value;
    applyShade();
    try{ localStorage.setItem('caseShade', String(shade)); }catch(e){}
  };
  sl.addEventListener('input', onmove);
  sl.addEventListener('change', onmove);
  applyShade();
}

buildTint();
buildRevealMode();
buildDock(); drawSrcFw(CASES[ci]);
buildShade();
buildRailToggle();
buildSplitLine();

/* ---------------- the hairline between the canvas card and the text column ----------------
   Plain absolutely-positioned element, not a grid item — see the long comment on .splitline
   in shell.css for why a grid ::after was reverted. Position and height are measured off
   the real boxes (the splitter's left edge, the row's own full height) and kept in sync the
   same low-tech way the rest of this file does: a resize listener, a class-change watch for
   the nocanvas/emptycanvas toggle, and a short interval as a catch-all for content reflow
   (images/exhibits loading, hover panels expanding) that doesn't fire either of those. */
function buildSplitLine(){
  const split = document.getElementById('split');
  const bar = document.getElementById('splitter');
  if(!split || !bar) return;
  const line = document.createElement('div');
  line.className = 'splitline';
  line.setAttribute('aria-hidden', 'true');
  split.appendChild(line);
  function place(){
    if(split.classList.contains('nocanvas') || split.classList.contains('emptycanvas')){
      line.style.display = 'none';
      return;
    }
    line.style.display = '';
    const sr = split.getBoundingClientRect(), br = bar.getBoundingClientRect();
    line.style.left = Math.round(br.left - sr.left + br.width / 2) + 'px';
  }
  place();
  window.addEventListener('resize', place);
  new MutationObserver(place).observe(split, {attributes: true, attributeFilter: ['class']});
  setInterval(place, 400);
}

/* ---------------- left step-rail: collapses to a hamburger ----------------
   Two ways this collapses: automatically, when a genuinely narrower window or a
   browser zoom that actually reflows the page (innerWidth/devicePixelRatio move)
   pushes past a threshold; or manually, via the always-present hamburger button,
   for zoom methods that never reach the page at all (confirmed: Windows trackpad
   pinch/OS-level magnification moves nothing observable — not innerWidth, not
   devicePixelRatio, not visualViewport.scale — so no amount of auto-detection can
   see it; a manual control is the only thing that can work there). The button is
   always visible; clicking it collapses the full rail into the hamburger, and
   clicking the hamburger again opens the list as a floating panel sized to
   whatever's actually visible right now. #steps only ever has its *contents*
   replaced by render() (see el('steps').innerHTML = ...), never the element, so
   classes on it survive every step/case change with no extra wiring. */
function buildRailToggle(){
  if(document.getElementById('railToggle')) return;
  const steps = document.getElementById('steps'); if(!steps) return;
  const BREAK = 1100; /* a genuinely narrow window collapses outright, any monitor size */
  /* On a big monitor, zooming in a lot can still leave window.innerWidth comfortably above
     BREAK — 1100 was sized for a narrow window, not a zoomed-in wide one. So the real
     trigger is RELATIVE: how far the effective width has shrunk from however wide this
     page was when it first loaded, on this reader's own screen. devicePixelRatio is
     tracked the same relative way as a backstop for zoom methods that change physical
     zoom without moving innerWidth. Neither of these — nor visualViewport.scale, tried
     and confirmed inert — can see Windows trackpad pinch/OS-level magnification, which
     is why the button below never relies on detection alone. */
  const BASE_W = window.innerWidth;
  const BASE_DPR = window.devicePixelRatio || 1;
  const autoZoomedIn = ()=>
    window.innerWidth < BASE_W * 0.82 ||
    ((window.devicePixelRatio || 1) / BASE_DPR) > 1.15;

  /* Trackpad pinch never changes any *state* the page can read (that's the dead end
     above) — but the GESTURE itself still reaches the page: a trackpad pinch fires as
     a 'wheel' event with ctrlKey set true by the browser, even though no key was
     touched. This is the same convention canvas apps (Figma, tldraw) use to tell pinch
     apart from an ordinary two-finger scroll. It's an input signal, not a viewport
     readout, so it works even when the resulting zoom is invisible to every other API.
     Treated as a soft running "zoom budget": each pinch-in tick raises it, each
     pinch-out tick lowers it, clamped so a long pinch saturates instead of running away
     and a couple of stray ticks near the middle don't flip it back and forth. Ordinary
     Ctrl+scroll fires the same event shape, so this quietly covers that path too. */
  /* 2026-10 (input hand-off fix): the ctrl+wheel "zoom budget" that used to live here is retired. It existed
     because a trackpad pinch / Ctrl+scroll zoomed the BROWSER invisibly, so the only clue was the wheel event
     itself. Today pageZoom() consumes every ctrl+wheel (preventDefault) and drives our own exact zoom, so the
     browser never zooms and the layout never changes. Keeping the budget made the rail collapse (re-flowing the
     body card mid-gesture) on every trackpad pinch, and -- worst -- it latched: zoom in with the trackpad, zoom
     back to exactly 1.0 with a touch pinch (or any other input), and the rail stayed collapsed because only
     wheel events could ever clear it. Genuine browser zoom is still detected by autoZoomedIn()/innerWidth. */
  const gestureZoomedIn = false;

  const b = document.createElement('button');
  b.id = 'railToggle'; b.type = 'button'; b.className = 'railToggle';
  b.setAttribute('aria-label', 'Show the step list'); b.setAttribute('aria-pressed', 'false');
  b.innerHTML = '<span></span>';
  document.body.appendChild(b);

  let open = false;
  function place(){
    const r = b.getBoundingClientRect();
    const top = Math.round(r.bottom + 8), left = Math.round(r.left);
    steps.style.top = top + 'px';
    steps.style.left = left + 'px';
    steps.style.maxHeight = Math.max(140, window.innerHeight - top - 16) + 'px';
    steps.style.maxWidth = Math.max(160, Math.min(280, window.innerWidth - left - 16)) + 'px';
  }
  function openRail(){
    open = true;
    steps.classList.add('floatRail');
    place();
    b.setAttribute('aria-pressed', 'true');
    window.addEventListener('resize', place);
  }
  function closeRail(){
    open = false;
    steps.classList.remove('floatRail');
    steps.removeAttribute('style');
    b.setAttribute('aria-pressed', 'false');
    window.removeEventListener('resize', place);
  }
  /* ---- keep the hamburger inside the visible window while pinch-zoomed ----
     position:fixed (in the stylesheet) anchors to the layout viewport, not the
     visual one. On a genuine reflow zoom — the Firefox fix above, or any touch/
     trackpad zoom that actually reflows the page — the visual viewport becomes a
     smaller, scrollable window onto a now-larger layout viewport: you can pan
     around inside it while zoomed in, and a plain `fixed` element stays pinned to
     the layout viewport's corner, scrolling out of the visible window the moment
     you pan away from it. That's the button "staying behind" instead of travelling
     with the zoomed-in view. window.visualViewport reports where that visible
     window currently sits (offsetLeft/offsetTop = how far it has panned from the
     layout viewport's origin), so where it's available we track it directly and
     reposition the button on top of plain `fixed`, instead of trusting `fixed`
     alone to be enough. */
  if(window.visualViewport){
    const vv = window.visualViewport;
    const placeToggle = ()=>{
      b.style.left = Math.round(vv.offsetLeft + 10) + 'px';
      b.style.top = Math.round(vv.offsetTop + 14) + 'px';
      if(open) place();
    };
    vv.addEventListener('resize', placeToggle);
    vv.addEventListener('scroll', placeToggle);
    placeToggle();
  }
  document.addEventListener('mousedown', e=>{
    if(!open) return;
    if(e.target.closest && (e.target.closest('#steps') || e.target.closest('#railToggle'))) return;
    closeRail();
  }, true);
  document.addEventListener('keydown', e=>{ if(open && e.key === 'Escape') closeRail(); });
  /* a step click inside the flyout picked a step — close it same as clicking away */
  steps.addEventListener('click', e=>{ if(open && e.target.closest('button')) closeRail(); });

  /* manualOverride: null = follow auto-detection; true/false = the button has taken
     over for now. It's a temporary override, not a mode switch: the moment the real
     automatic signal itself changes (a genuine zoom in or out, any of the three ways),
     that fresh signal reclaims control so a stale manual click from earlier doesn't
     permanently disable auto-collapse going forward. */
  let manualOverride = null;
  let collapsed = false;
  let lastRawAuto = null;
  /* window.PZ (defined later, by pageZoom) is our own controlled zoom — reliable and
     exact where it applies, unlike the three signals above which are all indirect
     guesses. Checked defensively since this runs before pageZoom's script has executed
     on first load. */
  /* 2026-10 (jump fix): the app's own zoom (window.PZ.active) deliberately does NOT collapse the rail any more.
     Collapsing it re-flows the body card (grid-column:1/-1: 1002px -> 1168px wide, text re-wraps) in the middle of
     a pinch, up to ~400ms after the second finger lands (this poll) -- that was the visible "jump". Our zoom
     scales the real layout, so the rail simply scales and pans with the page; collapsing is only for Safari's
     native/browser zoom, which changes the layout viewport (the three signals below). */
  function rawAuto(){ return window.innerWidth < BREAK || autoZoomedIn() || gestureZoomedIn; }
  function sync(){
    const raw = rawAuto();
    if(lastRawAuto !== null && raw !== lastRawAuto) manualOverride = null; /* real change: auto takes back over */
    lastRawAuto = raw;
    const should = manualOverride !== null ? manualOverride : raw;
    if(should === collapsed) return;
    collapsed = should;
    document.documentElement.classList.toggle('railAuto', collapsed);
    if(!collapsed && open) closeRail(); /* expanded back out with the flyout open: put it away */
  }
  b.addEventListener('click', e=>{
    e.stopPropagation();
    if(open){ closeRail(); manualOverride = false; sync(); return; } /* 2nd click while open: fully restore the rail */
    /* The button is the only reliable path for zoom methods auto-detection can't see
       at all (OS-level magnification, some trackpad pinches) — see the comment above
       rawAuto(). For those, `collapsed` is still false the first time the reader clicks,
       because nothing ever told us to flip it. Previously that meant the first click
       only collapsed the (possibly already out-of-view) full rail, with nothing visibly
       happening, and the flyout only appeared on a second click. A single click on this
       always-visible button should always produce the flyout the reader is asking for,
       collapsing the full rail first if auto-detection hadn't already done it, in the
       same click rather than requiring a second one. */
    if(!collapsed){ manualOverride = true; sync(); }
    openRail();
  });
  window.addEventListener('resize', sync);
  /* belt and braces: some browsers don't fire 'resize' for every page-zoom change, so also
     poll lightly — cheap (one property read), and catches it within half a second either way. */
  setInterval(sync, 400);
  sync();
}


/* ---------------- frameworks + running facts ---------------- */
let fwOpen = null;
function drawFrameworks(c){
  const card = document.getElementById('fwcard');
  const list = (typeof FW !== 'undefined' && FW[c.id]) || null;
  if(!list){ card.hidden = true; card.innerHTML = ""; return; }
  card.hidden = false;
  const f = (fwOpen !== null && list[fwOpen]) ? list[fwOpen] : null;
  card.innerHTML = `
    <div class="toolhead"><h3>Frameworks in play</h3>
      <span class="hint">the canned shape, then how this case bends it</span></div>
    <div class="fwbar">${list.map((x,i)=>
      `<button type="button" class="fwbtn" data-f="${i}" aria-pressed="${fwOpen===i}">
        <span class="fwdot ${x.fit==='partial'?'partial':''}"></span>${esc(x.name)}</button>`).join('')}</div>
    ${f ? fwPanel(f) : ''}`;
  if(f && typeof fwApply === 'function') fwApply();   /* re-render wipes the transform */
}

function promptText(c){
  const first = (V2[c.id]||[])[0];
  if(!first || !first.src) return "";
  const row = first.src.find(([l])=>/prompt/i.test(l)) || first.src[0];
  return row ? row[1] : "";
}
const PROV = {case:'from the case', asked:'revealed on asking', derived:'worked out'};
function collectFacts(c, si){
  const seen = new Set(), groups = [];
  (V2[c.id]||[]).slice(0, si+1).forEach((v, i)=>{
    if(!v) return;
    const items = [];
    const add = (k, val, tag, tip)=>{ const id = tag + '|' + k; if(seen.has(id)) return; seen.add(id); items.push({k, v:val, tag, tip}); };
    (v.given||[]).forEach(([k,val])=>{ if(!seen.has('case|'+k) && !seen.has('asked|'+k)) add(k, val, 'case'); });
    (v.ask||[]).forEach((a, qi)=>{ if(a[3] && a[3].length && !isGated(c.id, i, qi)) a[3].forEach(([k,val])=>add(k, val, 'asked')); });
    (v.calc||[]).forEach(([e,r,w])=>add(w || e, r, 'derived', e));
    if(items.length) groups.push([c.steps[i].tab, items]);
  });
  return {groups, n:groups.reduce((a,g)=>a+g[1].length,0)};
}
function drawFacts(c, si){
  const card = document.getElementById('factcard');
  const {groups, n} = collectFacts(c, si);
  card.innerHTML = `
    <details open><summary><span class="toolhead" style="margin:0"><h3>Your notes so far</h3></span>
      <span class="count">${n} fact${n===1?'':'s'}</span></summary>
    <p class="hint" style="font-size:11px;color:var(--ink-3);margin:2px 0 6px">only what has been
      revealed by this step, each tagged with where it came from</p>
    <p class="provkey"><span class="pv case">from the case</span><span class="pv asked">revealed on asking</span><span class="pv derived">worked out</span></p>
    ${promptText(c) ? `<details class="promptchip"><summary>The prompt, again</summary>
      <p>${esc(promptText(c))}</p></details>` : ''}
    ${groups.length ? `<div class="facts">${groups.map(([lab, items])=>
      `<div class="factgrp"><div class="gl">${esc(lab)}</div>
        ${items.map(x=>`<div class="factrow"><span class="k">${esc(x.k)}</span>
          <span class="v"${x.tip?` title="${esc(x.tip)}"`:''}>${esc(x.v)}</span><span class="pv ${x.tag}">${PROV[x.tag]}</span></div>`).join('')}</div>`).join('')}</div>`
      : `<p class="factempty">Nothing revealed yet — the prompt is all you have.</p>`}
    </details>`;
  markTerms(card);
}
/* 'Ask it': reveal one answer and let it into the notes */
document.addEventListener('click', e=>{
  const b = e.target.closest && e.target.closest('.askit'); if(!b) return;
  const box = b.closest('.reveals'); if(!box) return;
  revealed.add(box.dataset.rk); box.classList.remove('gated');
  drawFacts(CASES[ci], si);
});
/* ---------------- layout: side dock (framework tree + notes), sticky metrics, scroll ---------------- */
/* The frameworks strip sticks to the top and the step rail centres itself in what is left; both need to know how tall things are. */
function updateSticky(){
  const r = document.documentElement.style, f = document.getElementById('fwcard'), st = document.getElementById('steps');
  r.setProperty('--stripH', (f && !f.hidden ? f.offsetHeight + 8 : 0) + 'px');
  r.setProperty('--rh', (st ? st.scrollHeight : 120) + 'px');
}
window.addEventListener('resize', updateSticky);
function scrollToPanel(){
  const t = document.querySelector('.bodycol'), f = document.getElementById('fwcard');
  if(!t) return;
  const y = t.getBoundingClientRect().top + window.scrollY - ((f && !f.hidden) ? f.offsetHeight : 0) - 14;
  window.scrollTo({top: Math.max(0, y), behavior: 'smooth'});
}
/* Small peek windows on the right edge. Hover enlarges one. A click lifts it out of the dock into a floating window that stays where you put it:
   grab it by any blank part (header, padding, the empty area around the tree) to move it, pull any edge or corner to resize it, press the cross to send it
   back to its slot. The page behind it stays put and keeps scrolling. Sizes are in vw/vh/clamp so browser zoom and window size rescale them.
   Under 1100px the peeks are ordinary cards and do not float. */
const PEEK_MIN_W = 240, PEEK_MIN_H = 150, PEEK_KEEP = 56;
function buildDock(){
  if(document.getElementById('dock')) return;
  const tree = document.getElementById('tree'), cap = document.getElementById('treecap'), fact = document.getElementById('factcard');
  if(!tree || !fact) return;
  const dock = document.createElement('div'); dock.id = 'dock';
  const mk = (id, title, nodes)=>{
    const w = document.createElement('section'); w.className = 'peek'; w.id = id; w.tabIndex = 0;
    w.innerHTML = '<header><span class="pt">' + title + '</span><span class="pc"></span><button type="button" class="pclose" aria-label="Close ' + title + ' and return it to the side" title="Close: send it back to the side">✕</button></header><div class="pbody"></div>';
    nodes.filter(Boolean).forEach(n=>w.querySelector('.pbody').appendChild(n)); return w;
  };
  const pt = mk('peekTree', 'Framework tree', [tree, cap]), pn = mk('peekNotes', 'Notes so far', [fact]), ps = mk('peekSrc', 'Casebook framework', []);
  dock.append(pt, ps, pn); document.body.appendChild(dock);
  /* Breakpoint lowered from 1099px to 1023px (2026-10): the iPad mini's Safari viewport is
     768px wide in portrait and 1024px in landscape -- both were under the old 1099px threshold,
     so the mini always got the narrow (static inline card) fallback below, in every orientation,
     while the iPad Pro's larger landscape viewport cleared it and got the normal docked/floating
     treatment. Moving the line to 1023px admits any viewport >=1024px (the mini's landscape
     width, and up) into the full dock/floating experience; the mini in portrait (768px) still
     falls under the line and keeps the static-card layout, which is the deliberate tradeoff —
     floated windows need real room (380-660px wide) that a 768px-wide screen doesn't comfortably
     have. This is a general breakpoint change, not a mini-specific hack, so it also affects any
     other viewport in the 1024-1099px band (e.g. a split-screen view on a larger iPad, or a
     resized desktop browser window) the same way. The matching CSS rules are in shell.css (search
     for "1023px" there) -- the two must move together or the JS and CSS fallback thresholds
     disagree. NOT touched: the separate 1099/1100px pair governing the step-rail-vs-sticky-bar
     layout (shell.css, a different feature) -- this change is scoped to the dock only. */
  const narrow = ()=>window.matchMedia('(max-width:1023px)').matches;
  /* Same visualViewport pattern already proven in buildRailToggle (the burger) and
     fwPlace/fwTipFollow (the term tooltip): position:fixed anchors to the LAYOUT viewport,
     not the visible one, and raw innerWidth/innerHeight describe the layout viewport too —
     neither moves when a touch pinch-zoom pans the visible window around inside a larger
     page. That's why the burger and tooltip already stay put during an iPad pinch while
     these floating windows drift: this clampBox was the one subsystem never given the same
     treatment. vv.offsetLeft/offsetTop is how far the visible window has panned from the
     layout viewport's origin; vv.width/height is its current size. getBoundingClientRect()
     and pointer clientX/clientY are already layout-viewport-relative (same space either
     way), so the only thing missing was bounding against the VISIBLE window instead of the
     full layout one. */
  const vvBounds = ()=>{
    const vv = window.visualViewport;
    return vv ? {L: vv.offsetLeft, T: vv.offsetTop, W: vv.width, H: vv.height}
              : {L: 0, T: 0, W: innerWidth, H: innerHeight};
  };
  const clampBox = (w, L, T, W, H)=>{
    const vb = vvBounds();
    W = Math.max(PEEK_MIN_W, Math.min(W, vb.W)); H = Math.max(PEEK_MIN_H, Math.min(H, vb.H));
    L = Math.min(Math.max(L, vb.L + PEEK_KEEP - W), vb.L + vb.W - PEEK_KEEP);
    T = Math.min(Math.max(T, vb.T), vb.T + vb.H - 34);
    /* L/T above are LAYOUT-viewport-relative ("screen") coordinates -- the same frame as
       getBoundingClientRect()/clientX,Y, which is what every caller passes in and what
       vvBounds() clamps against. That's the correct frame to write directly into
       style.left/top for a position:fixed window -- which, as of the touch-pinch rebuild
       (Section 2n/4.16, see the project doc), is now EVERY window, ALWAYS: the previous
       position:fixed<->position:absolute pinch-mode swap (data-pinchAbs, toPinchMode()/
       fromPinchMode()) existed only to cope with native browser touch pinch-zoom, which no
       longer reaches floating windows at all now that two-finger touch is captured and
       driven entirely by this app's own code (see globalPinch() near the end of this file).
       Floating windows are position:fixed children of document.body, structurally outside
       #pzlayer (the only element the new pinch/zoom transform ever touches), so they need no
       coordinate-space conversion of any kind for that gesture any more -- the same reason
       they already needed none for the pre-existing trackpad pinch/zoom path. */
    w.style.left = L + 'px'; w.style.top = T + 'px'; w.style.width = W + 'px'; w.style.height = H + 'px';
    return {L, T, W, H};
  };
  /* Keep floated windows inside the visible window as it pans/zooms — mirrors
     buildRailToggle's placeToggle exactly. Re-clamps each floated window's current box
     against the (possibly now-smaller/shifted) visible window; clampBox only ever
     constrains, never recenters, so a window already fully visible is left untouched.

     REMOVED, Section 2n/4.16 (full touch-pinch rebuild — see the project doc for the prior
     history this replaces): this used to also carry an entire position:fixed<->
     position:absolute pinch-mode swap (toPinchMode()/fromPinchMode()), a symmetric
     scale-based settle gate (SETTLE_SCALE_TOLERANCE/atZoomBaseline/reclampAll/maybeSettle/
     scheduleSettle), a scrollend/debounce race to detect "gesture over", a blur/
     visibilitychange safety net (forceSettle), and a dedicated #pinchdebug overlay — all of
     it triggered by raw document-level touchstart/touchmove/touchend/touchcancel listeners
     reacting to the BROWSER'S OWN native two-finger pinch-zoom, which is what used to reach
     this page at all on touch. None of that exists any more because native touch pinch-zoom
     no longer reaches this page: two-finger touch is now captured and driven entirely by
     this app's own code (globalPinch(), near the end of this file), using the exact same
     pageZoom() state/transform already used by the trackpad ctrlKey-wheel path. Floating
     windows are position:fixed children of document.body, outside #pzlayer (the only
     element that transform ever touches), so — exactly as already true for trackpad zoom —
     they need no position-mode swap, no coordinate conversion, and no settle logic for this
     gesture at all: clampBox() below is the only reclamp this now needs, used the same way
     plain window resize already used it.

     GESTURE-OWNERSHIP PRECEDENCE still applies, just with a different trigger: a two-finger
     pinch must still win over a single-finger window drag that happened to grab a window
     first (the dock's pointerdown handler below sets 'dragging' the instant a finger touches
     a window's blank space, before any movement). activeDrag/cancelActiveDrag below still
     provide that cancel path; the caller is now globalPinch(), at the capture-phase instant
     its second touch pointer arrives, exposed as window.DOCK_CANCEL_DRAG so it can call this
     without this file needing to know anything about that handler's internals. */
  let activeDrag = null;
  const cancelActiveDrag = ()=>{ if(activeDrag){ const c = activeDrag; activeDrag = null; c(); } };
  window.DOCK_CANCEL_DRAG = cancelActiveDrag;
  let zTop = 60; const raise = w=>{ w.style.zIndex = ++zTop; };
  const DIRS = ['n','s','e','w','ne','nw','se','sw'];
  const floatIt = w=>{
    if(w.classList.contains('float') || narrow()) return;
    /* On a mouse, hovering already added 'open' (the real hover-enlarged size/position) before
       the click that lands here, so measuring the current rect has always captured the intended
       expanded box. Touch has no hover state at all — a tap goes straight to 'click' with 'open'
       never added — so without this, r below would capture the small COLLAPSED dock-slot rect
       (clamp(88px,...,176px) wide, sitting right at the dock's position near the screen edge).
       clampBox then clamps that undersized width up to its PEEK_MIN_W floor rather than the
       intended 380-660px open size, at a position computed for the small box — so the floated
       window ends up both too small and positioned so far toward the dock's edge that most of it
       sits off-screen, matching the reported "only the top-left quadrant is visible" on touch.
       Forcing 'open' first makes touch measure the same real expanded box mouse always measured;
       for mouse this is a no-op, since 'open' is already there. */
    /* .peek has `transition:width .16s ease` (for the mouse hover-enlarge animation), so forcing
       'open' and reading getBoundingClientRect() in the very same tick — with the transition
       still live — captures the FROM value (0ms elapsed = pre-change width), not the target
       380-660px size: the transition hasn't actually animated anywhere yet. transition:none has
       to be set first so the width resolves to its final value immediately, with nothing to
       interpolate. (First attempt at this fix missed this and still measured ~240px — caught by
       a Playwright check asserting the floated width against the CSS-declared minimum, not by
       assuming the class toggle alone was enough.) */
    const wasOpen = w.classList.contains('open');
    let r;
    if(wasOpen){
      r = w.getBoundingClientRect();
    } else {
      const prevTransition = w.style.transition;
      w.style.transition = 'none';
      w.classList.add('open');
      void w.offsetWidth;
      r = w.getBoundingClientRect();
      w.classList.remove('open');
      w.style.transition = prevTransition;
    }
    w.style.transition = 'none'; w.classList.remove('open'); const c = w.getBoundingClientRect(); w.classList.add('open');   /* the size of its slot in the dock */
    const ph = document.createElement('div'); ph.className = 'peekph'; ph.style.height = c.height + 'px'; ph.style.width = c.width + 'px';
    w.parentNode.insertBefore(ph, w); w._ph = ph;
    document.body.appendChild(w); w.classList.add('float', 'pinned', 'open');
    DIRS.forEach(d=>{ const h = document.createElement('div'); h.className = 'rz rz-' + d; h.dataset.dir = d; w.appendChild(h); });
    clampBox(w, r.left, r.top, r.width, r.height); raise(w);
    void w.offsetWidth; w.style.transition = '';
  };
  window.DOCK_OPEN = id=>{ const w = document.getElementById(id); if(!w) return; if(narrow()){ w.scrollIntoView({behavior:'smooth',block:'start'}); return; } floatIt(w); raise(w); };
  document.addEventListener('click', e=>{ const b = e.target.closest && e.target.closest('.openfw'); if(b && window.DOCK_OPEN) window.DOCK_OPEN(b.getAttribute('data-open')); });
  const unfloat = w=>{
    if(!w.classList.contains('float')) return;
    /* Diagnostic (see the drag-stop investigation, 2026-10): if unfloat() runs on a window
       that's mid-drag, that's a termination path none of the pointerup/pointercancel/
       lostpointercapture/pinch-cancel handlers below cover -- log it distinctly so it's
       distinguishable from those if it's ever actually the cause. Known callers are the
       dock's own pclose button, Escape, and the resize handler's narrow() branch; none of
       those should fire mid-drag in practice, but this makes it visible instead of assumed. */
    if(w.classList.contains('dragging')){ peekLog = 'UNFLOAT CALLED WHILE DRAGGING (external reset)\n' + (w.id || w.className); pdbgUpdate(); }
    w.querySelectorAll('.rz').forEach(h=>h.remove());
    w.classList.remove('float', 'pinned', 'open', 'dragging');
    ['left','top','width','height','zIndex','transition'].forEach(k=>w.style[k] = '');
    if(w._ph && w._ph.parentNode){ w._ph.parentNode.replaceChild(w, w._ph); w._ph = null; }
    else dock.appendChild(w);
  };
  let t = null;
  dock.addEventListener('mouseover', e=>{ if(window.NAV_ACTIVE) return; const w = e.target.closest('.peek'); if(!w) return; clearTimeout(t); t = setTimeout(()=>{ if(window.NAV_ACTIVE) return; dock.querySelectorAll('.peek.open').forEach(x=>{ if(x!==w) x.classList.remove('open'); }); w.classList.add('open'); }, 90); });
  dock.addEventListener('mouseout', e=>{ const w = e.target.closest('.peek'); if(!w || w.contains(e.relatedTarget)) return; clearTimeout(t); w.classList.remove('open'); });
  dock.addEventListener('click', e=>{ const w = e.target.closest('.peek'); if(!w) return;
    if(e.target.closest('summary, a, button, .term, .fwnode')) return;          /* clicks on the content itself do their own thing */
    floatIt(w); });
  /* pointer handling for a floating window: resize from a handle, move from a blank part.

     "blank" used to mean el.classList.contains('pbody') — true only for the body
     container element ITSELF, or el === w.querySelector('svg#tree') — true only for the
     svg element itself. Both are exact-element checks, not "is this point inside the
     blank body area". A mouse, aimed with pixel precision at a visually empty gap, tends
     to land exactly on one of those two elements by luck (there's often a real empty
     margin around the content they wrap). A finger does not have that precision, and the
     pbody/tree are usually FULL of real content — note text, list items, the framework
     diagram's nodes and connecting lines — so the element actually under a fingertip,
     even one aimed at what looks like blank space, is overwhelmingly likely to be some
     descendant of pbody (a text node's wrapper, an SVG <g> or <path>) rather than pbody
     or the svg element itself. That made the exact-match check fail silently on touch:
     this handler would decline to start a drag (since blank() returned false), the
     pointerdown would fall through un-prevented, and something else would pick it up
     instead — the page-level pan handler, or the browser's own native touch
     scroll/text-selection — which is exactly the reported symptom: the floating window
     doesn't move, the page behind it does, and text starts highlighting.

     Fixed to ask the right question: is this point inside the body area AT ALL, and not
     on something that has its own, more specific meaning (a button, link, term, a
     framework node meant to be tapped for its own tooltip)? That's a superset of the old
     check — everything that used to count as blank still does — so this can only turn
     previously-blocked drags into working ones, never the reverse. */
  const PEEK_INTERACTIVE = 'button,a,input,textarea,select,[contenteditable="true"],label,.term,.fwnode,summary,.rz,.askit';
  const blank = (w, el)=>{
    if(el === w) return true;
    if(el.closest('header')) return !el.closest('button');
    if(el.closest('.pbody')) return !el.closest(PEEK_INTERACTIVE);
    return false;
  };
  /* TEMP DEBUG — remove before this goes anywhere near live. Requested readout for
     diagnosing the iPad "drag moves in jerks, then stops" report: whether pointer capture
     is actually granted and still held, the full event sequence (down/move/up/cancel/
     LOST capture — a lostpointercapture with no matching up/cancel is the signature of the
     browser's native touch-scroll recognizer silently taking the gesture away from us
     mid-drag), both coordinate spaces (clientX/Y vs pageX/Y) side by side so a mismatch
     between them is visible instead of assumed, the visualViewport snapshot, and whether
     the page-level pan handler (pageZoom) is live at the same time, which would mean two
     systems are both trying to own the same one-finger gesture. */
  const pdbg = document.createElement('div');
  pdbg.id = 'peekdebug';
  /* 2026-10: moved from the right side to the left -- the dock lives at right:8px;top:50%,
     and once the drag-stop trail (below) started keeping several events instead of one line,
     this overlay grew tall enough to visually sit right on top of the docked panels on an
     iPad-size screen. pointer-events:none means it was never actually blocking touch, but
     "something is visibly covering the dock" is worth avoiding regardless. */
  pdbg.style.cssText = 'position:fixed;top:4px;left:4px;z-index:99999;background:rgba(0,0,0,.75);'
    + 'color:#fff;font:11px/1.5 monospace;padding:5px 8px;border-radius:4px;pointer-events:none;'
    + 'white-space:pre;max-width:280px;transform:translateY(192px)';
  document.body.appendChild(pdbg);
  let peekLog = 'no drag yet';
  /* Diagnostic (2026-10, iPad Pro "drag stops randomly" investigation): a single overwritten
     line only shows the LAST thing that happened, which is useless if the terminating event
     itself doesn't clearly say why (e.g. a plain UP(pointercancel) with no other context). Keep
     a short rolling trail instead, so the sequence leading up to a stop -- not just its final
     frame -- is visible on the device when it happens. */
  let dbgTrail = [];
  function pdbgUpdate(){
    dbgTrail.push(peekLog);
    if(dbgTrail.length > 4) dbgTrail.shift();   /* was 7 -- too tall on an iPad-size screen */
    pdbg.textContent = dbgTrail.join('\n----\n');
  }
  pdbgUpdate();
  /* Minimum pointer movement, in CSS px, before a pointerdown-then-move counts as a real drag
     rather than a tap. Section 2i (v10) found that a plain tap on a partially-visible floated
     window during pinch mode could still jump it -- caused by clampBox() writing a
     layout-viewport-relative delta into a document-relative style.left/top for an absolute
     (pinch-mode) window, even on a near-zero movement (a real tap's own sub-pixel jitter was
     enough to trigger it, confirmed at (0.3, 0.2)px in pinchmode_taponly_test.js). v10 fixed
     that by disabling the whole drag handler during pinch mode -- which also broke legitimate
     dragging of a partially-visible window while genuinely zoomed in (a real-device report
     this round: "touch the blank space and try to drag -- nothing happens at all"). Section
     2m/4.15 replaces that blanket disable with the actual fix: clampBox() itself now converts
     to document-relative coordinates when the window is in pinch mode (see clampBox above), so
     the geometry it writes is correct either way. This threshold is a second, independent
     safeguard -- belt and braces, not a workaround for a remaining gap -- so an accidental tap
     still writes nothing at all rather than relying solely on the coordinate math being right. */
  const DRAG_MOVE_THRESHOLD = 4;
  document.addEventListener('pointerdown', e=>{
    /* A real two-finger pinch must always win over a single-finger drag that happened to grab
       a window first -- see the activeDrag/cancelActiveDrag comment above. window.PZ_PINCHING
       is globalPinch()'s own live touch-pointer count (near the end of this file); this is a
       second line of defense alongside globalPinch()'s capture-phase cancelActiveDrag() call,
       for a pointerdown that arrives fractionally after the second finger was already down. */
    if(window.PZ_PINCHING && window.PZ_PINCHING()) return;
    if(activeDrag) return;   /* a drag/resize is already provisional from another pointer; don't start a second, overlapping one */
    let w = e.target.closest && e.target.closest('.peek.float');
    if(!w){
      /* TOUCH ONLY: float a still-docked window on the SAME touch that then drags it, instead
         of needing a first tap to open it and a second, separate tap to drag it. The two-touch
         requirement wasn't a missing feature, it was event-ordering: opening was wired to
         'click', which only fires after pointerup -- so by the time 'click' ran and floated the
         window, THIS pointerdown had already fired and found nothing floated yet to grab (the
         guard below used to just return here). The first touch's own move could never drag a
         window that didn't exist as '.peek.float' until that touch was already over. Floating
         it right here, at pointerdown, lets the rest of that same gesture's pointermove drag it
         immediately. Mouse is untouched (gated to pointerType 'touch'): hover already opens the
         panel before any click for mouse users, who click-to-float and drag as two deliberate,
         separate actions already proven stable in testing — only touch, which has no hover
         state and expects a single continuous tap-and-drag, needed this. */
      if(e.pointerType !== 'touch') return;
      const dw = e.target.closest && e.target.closest('#dock .peek');
      if(!dw || narrow()) return;
      if(e.target.closest('summary, a, button, .term, .fwnode')) return;   /* same pass-through as the click handler */
      floatIt(dw);
      w = dw;
    }
    raise(w);
    const h = e.target.closest('.rz'), grab = !h && blank(w, e.target); if(!h && !grab) return;
    if(e.button !== undefined && e.button > 0) return;
    e.preventDefault();
    const r = w.getBoundingClientRect(), s = {x: e.clientX, y: e.clientY, L: r.left, T: r.top, W: r.width, H: r.height}, dir = h ? h.dataset.dir : '';
    const cap = h || w;
    w.classList.add('dragging'); try{ cap.setPointerCapture(e.pointerId); }catch(err){}
    const vv = window.visualViewport;
    /* Trimmed 2026-10 from 5 lines to 2 -- same info content, just compact enough that a 4-entry
       trail (above) doesn't turn this overlay into a screen-covering block on an iPad. */
    const fields = ev=>{
      const held = (()=>{ try{ return cap.hasPointerCapture(ev.pointerId); }catch(_){ return 'n/a'; } })();
      return `${ev.pointerType}#${ev.pointerId} (${ev.clientX.toFixed(0)},${ev.clientY.toFixed(0)}) capture=${held}\n`
        + `vv.scale=${vv?vv.scale.toFixed(2):'n/a'} PZ.active=${window.PZ?window.PZ.active:'n/a'}`;
    };
    peekLog = 'DOWN\n' + fields(e); pdbgUpdate();
    /* Gates the first write until real movement is seen (DRAG_MOVE_THRESHOLD, see its comment
       above) -- a plain tap writes nothing at all, not even a correctly-converted no-op write.
       Once crossed, dragStarted latches true for the rest of this gesture so there's no
       re-arming mid-drag if the pointer happens to pause and the next tick's dx/dy momentarily
       looks small again. */
    let dragStarted = false;
    let wasPinned = false;
    const mv = ev=>{
      /* pointerId filter -- this listener is document-level, so without this it reacts to
         ANY pointer's movement, not just the one that started this drag. Harmless with a
         single pointer down, but a real second touch arriving mid-drag (e.g. one finger
         already dragging a window when a second lands elsewhere to start a pinch) would
         otherwise feed that second pointer's coordinates into THIS gesture's dx/dy math --
         a likely contributor to reported flicker/jumps when a pinch starts with a finger
         already on a window. setPointerCapture above only retargets where this pointer's
         own events dispatch FROM; it does not stop a different pointerId's events from
         separately bubbling to this same document listener. */
      if(ev.pointerId !== e.pointerId) return;
      const dx = ev.clientX - s.x, dy = ev.clientY - s.y;
      if(!dragStarted){
        if(Math.hypot(dx, dy) < DRAG_MOVE_THRESHOLD){
          peekLog = `MOVE (below threshold, no write) dx=${dx.toFixed(1)} dy=${dy.toFixed(1)}\n` + fields(ev); pdbgUpdate();
          return;
        }
        dragStarted = true;
      }
      peekLog = `MOVE dx=${dx.toFixed(1)} dy=${dy.toFixed(1)}\n` + fields(ev); pdbgUpdate();
      let applied;
      if(!dir){
        applied = clampBox(w, s.L + dx, s.T + dy, s.W, s.H);
        /* Diagnostic (2026-10, iPad Pro "drag stops randomly" investigation): clampBox() keeps
           PEEK_KEEP px of the window always on-screen -- so dragging toward an edge hard enough
           can pin L/T at that boundary while the finger keeps moving. The window then visually
           stops even though this handler is still live and still receiving events -- which would
           look identical to the gesture actually being cancelled, but isn't. Log only the
           transition into/out of pinned, not every frame while held there, to avoid flooding the
           trail. */
        const pinnedNow = Math.abs(applied.L - (s.L + dx)) > 0.5 || Math.abs(applied.T - (s.T + dy)) > 0.5;
        if(pinnedNow && !wasPinned){ peekLog = `PINNED AT VIEWPORT EDGE (clampBox limiting, not a cancel) wanted=(${(s.L+dx).toFixed(1)},${(s.T+dy).toFixed(1)}) applied=(${applied.L.toFixed(1)},${applied.T.toFixed(1)})`; pdbgUpdate(); }
        wasPinned = pinnedNow;
        return;
      }
      let L = s.L, T = s.T, W = s.W, H = s.H;
      if(dir.includes('e')) W = Math.max(PEEK_MIN_W, s.W + dx);
      if(dir.includes('s')) H = Math.max(PEEK_MIN_H, s.H + dy);
      if(dir.includes('w')){ W = Math.max(PEEK_MIN_W, s.W - dx); L = s.L + (s.W - W); }
      if(dir.includes('n')){ H = Math.max(PEEK_MIN_H, s.H - dy); T = s.T + (s.H - H); }
      clampBox(w, L, T, W, H);
    };
    const teardown = ()=>{
      w.classList.remove('dragging');
      document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up); cap.removeEventListener('lostpointercapture', lost);
      if(activeDrag === cancel) activeDrag = null;
    };
    const up = ev=>{
      if(ev.pointerId !== e.pointerId) return;   /* same pointerId filter as mv() above */
      peekLog = `UP(${ev.type})\n` + fields(ev); pdbgUpdate();
      teardown();
    };
    const lost = ev=>{
      peekLog = `LOST CAPTURE (no up/cancel seen) — browser likely took the gesture\n` + fields(ev); pdbgUpdate();
      up(ev);
    };
    /* Cancel path for cancelActiveDrag() (called by globalPinch(), near the end of this file,
       at the capture-phase instant a second touch pointer is detected -- see that comment):
       tears down exactly like a normal pointerup/cancel, releases capture, but writes no
       further geometry. Whatever position the window is already at (mid-drag or not) is left
       as-is -- there is nothing further for this window to do once a pinch takes over, since
       floating windows need no geometry changes of their own during that gesture at all. */
    const cancel = ()=>{
      try{ cap.releasePointerCapture(e.pointerId); }catch(err){}
      peekLog = 'CANCELLED (multi-touch pinch started)\n' + fields(e); pdbgUpdate();
      teardown();
    };
    activeDrag = cancel;
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up); cap.addEventListener('lostpointercapture', lost);
  });
  document.addEventListener('click', e=>{ const b = e.target.closest && e.target.closest('.peek .pclose'); if(b) unfloat(b.closest('.peek')); });
  document.addEventListener('keydown', e=>{ if(e.key !== 'Escape') return;
    dock.querySelectorAll('.peek.open').forEach(w=>w.classList.remove('open'));
    const f = document.activeElement && document.activeElement.closest && document.activeElement.closest('.peek.float'); if(f) unfloat(f); });
  /* Reflows floated windows on an ordinary desktop window resize / orientation change.
     REMOVED, Section 2n/4.16: a `pinchActive` guard used to sit at the top of this handler,
     because on iOS Safari an active NATIVE two-finger pinch fires continuous `window` resize
     events, and this handler would otherwise stomp the pinch-mode position:absolute
     coordinates those events' own settle logic was managing. Now that native touch
     pinch-zoom no longer reaches this page at all (globalPinch() captures it before the
     browser does), nothing drives `window` resize during a pinch any more -- our own
     zoom transform doesn't change innerWidth/innerHeight -- so there is no longer a
     competing gesture for this handler to defer to, and the guard is gone with it. */
  window.addEventListener('resize', ()=>{
    /* Diagnostic (2026-10, iPad Pro "drag stops randomly" investigation): a resize event firing
       mid-drag (iOS Safari fires these on dynamic-toolbar show/hide, which a drag gesture can
       trigger) re-clamps every floated window to its OWN current getBoundingClientRect() -- a
       no-op for position, but logged here so it's visible on the trail whether one coincides
       with a reported stop, rather than assumed absent. */
    if(activeDrag){ peekLog = 'RESIZE EVENT WHILE A DRAG/RESIZE WAS ACTIVE (vv/toolbar change mid-gesture?)'; pdbgUpdate(); }
    document.querySelectorAll('.peek.float').forEach(w=>{ if(narrow()) unfloat(w); else { const r = w.getBoundingClientRect(); clampBox(w, r.left, r.top, r.width, r.height); } });
  });
}
function dockCounts(){
  const n = document.querySelector('#factcard .count'), pc = document.querySelector('#peekNotes .pc');
  if(pc) pc.textContent = n ? n.textContent : '';
}
/* the study / practice switch, next to the page tint */
function buildRevealMode(){
  const t = document.getElementById('tint'); if(!t || document.getElementById('modebox')) return;
  const d = document.createElement('div'); d.className = 'modebox'; d.id = 'modebox';
  d.innerHTML = '<span class="lab">Answers</span><button type="button" data-m="study" title="Every answer is shown with its question">Show</button><button type="button" data-m="practice" title="Each answer stays hidden until you click Ask it">Hide until I ask</button>';
  t.insertAdjacentElement('afterend', d);
  const paint = ()=>d.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed', String(b.dataset.m === revealMode)));
  d.addEventListener('click', e=>{ const b = e.target.closest('button'); if(!b) return; revealMode = b.dataset.m; revealed.clear();
    try{ localStorage.setItem('caseReveal', revealMode); }catch(err){} paint(); render(); });
  paint();
}
document.getElementById('fwcard').addEventListener('click', e=>{
  const b = e.target.closest('.fwbtn'); if(!b) return;
  const i = +b.dataset.f;
  fwOpen = (fwOpen === i) ? null : i;
  fwZ = {k:FW_DEFAULT, tx:0, ty:0};
  fwFocused = false;
  drawFrameworks(CASES[ci]);
  markTerms(document.getElementById('fwcard'));
  updateSticky();
});


/* ---------------- concept glossary ---------------- */


let conceptOpen = null;
function drawConcept(){
  const box = document.getElementById('toolkit');
  const old = box.querySelector('.cpanel');
  if(old) old.remove();
  [...box.querySelectorAll('.chip')].forEach(ch=>{
    const n = ch.dataset.c || "";
    ch.setAttribute('aria-pressed', String(n === conceptOpen));
  });
  if(!conceptOpen) return;
  const d = CONCEPT[conceptOpen];
  if(!d) return;
  const el = document.createElement('div');
  el.className = 'cpanel';
  const m = d.math;
  const fmt = t => esc(t).replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<span class="frac"><span>$1</span><span>$2</span></span>');
  const ltree = n => `<li${(n.k&&n.k.length)?' class="hk"':''}><div class="mnode"><b>${fmt(n.s)}</b><span>${fmt(n.d||'')}</span>${n.op?`<em>${esc(n.op)}</em>`:''}</div>${(n.k&&n.k.length)?`<ul>${n.k.map(ltree).join('')}</ul>`:''}</li>`;
  const bl = a => { let out = '<ul>'; a.forEach(x=>{ if(Array.isArray(x)) out += bl(x).replace(/^<ul>/, '<ul class="sub">'); else out += `<li>${fmt(x)}`+'</li>'; }); return out + '</ul>'; };
  /* data nests a child list right after its parent line; flatten that into parent > children */
  const nest = a => { const out = []; a.forEach(x=>{ if(Array.isArray(x) && out.length && !Array.isArray(out[out.length-1])) { const last = out.pop(); out.push([last, nest(x)]); } else out.push(Array.isArray(x)&&x.length===2&&typeof x[0]==='string'&&Array.isArray(x[1]) ? [x[0], nest(x[1])] : x); }); return out; };
  const li = x => Array.isArray(x) ? `<li>${fmt(x[0])}<ul>${x[1].map(li).join('')}</ul></li>` : `<li>${fmt(x)}</li>`;
  const bul = a => `<ul class="bl">${nest(a).map(li).join('')}</ul>`;
  const mathHTML = m ? m.forms.map(f=>`<div class="cform">${f.label?`<span class="lab">The math: ${esc(f.label)}</span>`:'<span class="lab">The math</span>'}
      <div class="cformula cmath">${fmt(f.f)}</div>
      <ul class="mtree">${ltree(f.tree)}</ul></div>`).join('')
    : (d.formula?`<span class="lab">The shape of it</span><div class="cformula">${esc(d.formula)}</div>`:'');
  const trio = (d.here||d.big||d.without) ? `<div class="ctrio">
      ${d.here?`<div><span class="lab">Why it matters in this case</span><p>${esc(d.here)}</p></div>`:''}
      ${d.big?`<div><span class="lab">How it connects to the bigger picture</span><p>${esc(d.big)}</p></div>`:''}
      ${d.without?`<div><span class="lab">Without it</span><p>${esc(d.without)}</p></div>`:''}</div>` : '';
  const bullets = m ? `<div class="cbul">
      <div><span class="lab">Reading it</span>${bul(m.read)}</div>
      <div><span class="lab">Worked</span>${bul(m.work)}</div>
      ${m.watch?`<div class="cwatchbox"><span class="lab">Watch out</span>${bul(m.watch)}</div>`:''}</div>` : '';
  el.innerHTML = `
    <div><h4>${esc(conceptOpen)}</h4>
      <span class="lab">In plain terms</span><p>${esc(d.plain)}</p>
      ${d.eg?`<span class="lab">Examples</span><p>${esc(d.eg)}</p>`:''}
      <span class="lab">${d.here?'Why it matters in a case, generally':'Why it matters in a case'}</span><p>${esc(d.why)}</p></div>
    <div>${m?'':mathHTML}
      ${(!m && d.watch)?`<span class="lab">Watch out</span><p class="cwatch">${esc(d.watch)}</p>`:''}
      <p class="cmet" style="margin-top:10px">First met in <b>${esc(d.met)}</b>.</p></div>
    ${m?`<div class="cmathrow">${mathHTML}</div>`:''}${bullets}${trio}`;
  box.appendChild(el);
}
document.getElementById('toolkit').addEventListener('click', e=>{
  const ch = e.target.closest('.chip'); if(!ch || !ch.dataset.c) return;
  conceptOpen = (conceptOpen === ch.dataset.c) ? null : ch.dataset.c;
  drawConcept();
  markTerms(document.getElementById('toolkit'));
});


/* the canvas column sticks only while it fits — otherwise its lower cards
   would sit off-screen permanently, which is how the framework card got lost */
function fitColumn(){
  const cw = document.querySelector('.canvaswrap');
  if(!cw) return;
  cw.classList.remove('flow');
  if(cw.scrollHeight > window.innerHeight - 40) cw.classList.add('flow');
}
window.addEventListener('resize', fitColumn);


/* ---------------- framework trees ---------------- */


function fwTrunc(s, max){ s = String(s||""); return s.length > max ? s.slice(0, max-1) + "…" : s; }

/* clone the base, graft on anything the case adds, then lay the union out ONCE so a
   node sits at identical coordinates in both pictures */
function fwBuild(f){
  const cl = n => ({id:n.id, t:n.t, s:n.s||"", op:n.op||null, nb:!!n.nb, kids:(n.kids||[]).map(cl)});
  const root = cl(FWB[f.base]);
  const by = {}; (function ix(n){ by[n.id] = n; n.kids.forEach(ix); })(root);
  (f.add||[]).forEach(a=>{
    const p = by[a.parent]; if(!p) return;
    const nd = {id:a.id, t:a.t, s:a.s||"", op:null, nb:!!a.nb, kids:[], added:true};
    p.kids.push(nd); by[a.id] = nd;
  });
  let slot = 0, all = [], maxd = 0;
  (function walk(n, d){
    n.d = d; maxd = Math.max(maxd, d); all.push(n);
    if(n.kids.length){
      n.kids.forEach(k=>walk(k, d+1));
      n.x = (n.kids[0].x + n.kids[n.kids.length-1].x) / 2;
    } else { n.x = slot * (FWG.NW + FWG.HG); slot++; }
    n.y = d * (FWG.NH + FWG.VG);
    n.w = d === 0 ? FWG.RW : FWG.NW;
    if(d === 0) n.x -= (FWG.RW - FWG.NW) / 2;
  })(root, 0);
  const xs = all.map(n=>n.x), xe = all.map(n=>n.x + n.w);
  const minX = Math.min(...xs) - FWG.PAD, maxX = Math.max(...xe) + FWG.PAD;
  return {root, all, minX, W: maxX - minX,
          H: (maxd+1) * FWG.NH + maxd * FWG.VG + FWG.PAD*2};
}

function fwSVG(L, f, mode){
  const over = f.over || {}, dx = -L.minX, dy = FWG.PAD;
  const vis = n => mode === "bend" || !n.added;
  const stOf = n => {
    if(mode === "base") return FWST.same;
    if(n.added) return FWST.added;
    const o = over[n.id];
    if(!o) return FWST.same;                       /* case never touched this branch */
    if(o.st === "same") return FWST.filled;        /* value supplied, shape unchanged */
    return FWST[o.st] || FWST.same;
  };
  let s = "";
  for(const n of L.all){
    if(!vis(n)) continue;
    for(const k of n.kids){
      if(!vis(k)) continue;
      const st = stOf(k), lit = st === FWST.changed;
      const ax = n.x + dx + n.w/2, ay = n.y + dy + FWG.NH;
      const bx = k.x + dx + k.w/2, by = k.y + dy;
      s += `<path d="M${ax} ${ay} V${(ay+by)/2} H${bx} V${by}" fill="none"
        stroke="${lit?'var(--accent)':'var(--line-2)'}" stroke-width="${lit?1.7:1}"
        opacity="${st===FWST.dropped?.4:(lit?1:.65)}"
        ${st===FWST.dropped?'stroke-dasharray="3 3"':''}/>`;
    }
  }
  for(const n of L.all){
    if(!n.op || !vis(n)) continue;
    const ks = n.kids.filter(vis);
    for(let i=1;i<ks.length;i++){
      if(ks[i].nb) continue;
      const a = ks[i-1], b = ks[i];
      const cx = (a.x + a.w + b.x)/2 + dx, cy = b.y + dy + FWG.NH/2;
      s += `<g><circle cx="${cx}" cy="${cy}" r="9" fill="var(--accent)" stroke="var(--panel)"
        stroke-width="2"/><text x="${cx}" y="${cy+3.8}" text-anchor="middle"
        font-family="IBM Plex Mono, monospace" font-size="11" font-weight="600"
        fill="var(--on-accent)">${esc(n.op)}</text></g>`;
    }
  }
  for(const n of L.all){
    if(!vis(n)) continue;
    const st = stOf(n), root = n.d === 0;
    const sub = mode === "bend" && over[n.id] && over[n.id].s !== undefined
      ? over[n.id].s : n.s;
    const x = n.x + dx, y = n.y + dy;
    const cap = Math.floor((n.w - 18) / 5.8);
    s += `<g opacity="${st.o}" class="fwnode" data-n="${esc(n.id)}" data-m="${mode}">
      <rect x="${x}" y="${y}" width="${n.w}" height="${FWG.NH}" rx="2" fill="${st.fill}"
        stroke="${st.stroke}" stroke-width="${st.sw}" ${st.dash?`stroke-dasharray="${st.dash}"`:''}/>
      <text x="${x+9}" y="${y+17}" font-family="Public Sans, sans-serif"
        font-size="${root?11.5:10.5}" font-weight="600" fill="${st.ink}"
        ${st===FWST.dropped?'text-decoration="line-through"':''}>${esc(fwTrunc(n.t, cap))}</text>
      ${sub?`<text x="${x+9}" y="${y+32}" font-family="IBM Plex Mono, monospace" font-size="9.5"
        fill="${st.sub}">${esc(fwTrunc(sub, cap+2))}</text>`:''}</g>`;
  }
  return `<div class="fwview" tabindex="0" role="group" style="--ar:${L.W}/${L.H}"
    aria-label="${mode==='base'?'The canned framework':'The framework as this case bends it'}, drag to move, scroll to zoom">
    <svg viewBox="0 0 ${L.W} ${L.H}" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="${mode==='base'?'The canned framework':'The framework as this case bends it'}"
      ><g class="fwpan">${s}</g></svg>
    <div class="fwzoom"><button type="button" data-z="out" title="Zoom out"
      aria-label="Zoom out">−</button><span class="pct">100%</span><button type="button"
      data-z="in" title="Zoom in" aria-label="Zoom in">+</button><button type="button"
      data-z="fit" title="Fit" aria-label="Fit the whole tree">fit</button></div></div>`;
}

function fwPanel(f){
  const L = fwBuild(f);
  const nAdd = (f.add||[]).length;
  const nDrop = Object.values(f.over||{}).filter(v=>v.st==="dropped").length;
  /* the base-tree label carries "when this framework applies" instead of the generic
     "the canned shape" line — same per-framework text Sid wants everywhere this renders,
     since every case/framework goes through this one shared function. */
  const baseLab = f.when ? esc(f.when) : 'The canned shape — the same wherever this framework appears';
  return `<div class="fwpanel">
    <div class="fwtrees">
      <div class="fwtree"><span class="lab">${baseLab}<i class="fwhint">hover a box for plain English · drag to move · scroll to zoom</i></span>${fwSVG(L, f, "base")}</div>
      <div class="fwtree"><span class="lab">How this case bends it<i class="fwhint">both trees move
        together</i></span>${fwSVG(L, f, "bend")}
        <div class="fwkey"><span><i class="same"></i>shape unchanged</span>
          <span><i class="changed"></i>bent by this case</span>
          ${nAdd?`<span><i class="added"></i>added by this case</span>`:''}
          ${nDrop?`<span><i class="dropped"></i>closed by the facts</span>`:''}</div></div>
    </div>
    ${f.ann && f.ann.length ? `<div class="fwann"><div class="fwannhd">Branch by branch</div>
      ${f.ann.map(([k,v])=>`<div class="fwannrow"><b>${esc(k)}</b><span>${esc(v)}</span></div>`)
        .join('')}</div>` : ''}
    ${f.note?`<p class="fwnote">${esc(f.note)}</p>`:''}</div>`;
}


/* ---------------- framework tree: zoom + hand pan ----------------
   One state for both trees. The pair only teaches anything while the two pictures stay
   registered to each other, so they zoom and pan together — always. */
const FW_DEFAULT = 0.5; /* default/fit zoom: the whole tree readable at a glance, not 1:1 */
let fwZ = {k:FW_DEFAULT, tx:0, ty:0};
/* wheel only zooms the tree once you've clicked into it — otherwise the wheel just scrolls
   the page like anywhere else. Reset whenever a framework tab is (re)opened. */
let fwFocused = false;


function fwApply(){
  const card = document.getElementById('fwcard'); if(!card) return;
  const t = `translate(${fwZ.tx} ${fwZ.ty}) scale(${fwZ.k})`;
  card.querySelectorAll('.fwpan').forEach(g=>g.setAttribute('transform', t));
  card.querySelectorAll('.fwzoom .pct').forEach(p=>p.textContent = Math.round(fwZ.k*100) + '%');
  card.classList.toggle('moved', fwZ.k !== FW_DEFAULT || fwZ.tx !== 0 || fwZ.ty !== 0);
  if(typeof fwTipFollow === 'function') fwTipFollow();
}
function fwReset(){ fwZ = {k:FW_DEFAULT, tx:0, ty:0}; fwApply(); }

/* svg user units per screen pixel, for the viewport the event landed in */
function fwUnit(view){
  const svg = view.querySelector('svg'); if(!svg) return 1;
  const m = svg.getScreenCTM();
  return m && m.a ? 1/m.a : 1;
}
/* screen point -> svg user coords (before the pan/zoom transform) */
function fwPt(view, cx, cy){
  const svg = view.querySelector('svg');
  const r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
  const s = Math.min(r.width/vb.width, r.height/vb.height);      /* meet */
  return {x:(cx - r.left - (r.width - vb.width*s)/2)/s,
          y:(cy - r.top  - (r.height - vb.height*s)/2)/s};
}
function fwZoomAt(view, k2, cx, cy){
  k2 = Math.min(FWZ_MAX, Math.max(FWZ_MIN, k2));
  const p = fwPt(view, cx, cy);
  fwZ.tx = p.x - (p.x - fwZ.tx) * (k2/fwZ.k);
  fwZ.ty = p.y - (p.y - fwZ.ty) * (k2/fwZ.k);
  fwZ.k = k2; fwApply();
}
function fwZoomCentre(mult){
  const v = document.querySelector('#fwcard .fwview'); if(!v) return;
  const r = v.getBoundingClientRect();
  fwZoomAt(v, fwZ.k*mult, r.left + r.width/2, r.top + r.height/2);
}

(function fwBindZoom(){
  const card = document.getElementById('fwcard'); if(!card) return;
  let drag = null, pts = new Map(), pinch = null;

  card.addEventListener('wheel', e=>{
    const v = e.target.closest('.fwview'); if(!v) return;
    /* until you've clicked into the tree once, the wheel just scrolls the page like anywhere
       else — it doesn't hijack scrolling the moment the cursor happens to cross the tree */
    if(!fwFocused) return;
    const inward = e.deltaY < 0;
    /* fully zoomed out already: let the page scroll instead of trapping the wheel */
    if(!inward && fwZ.k <= FWZ_MIN + 0.001){ return; }
    e.preventDefault();
    fwZoomAt(v, fwZ.k * (inward ? 1.12 : 1/1.12), e.clientX, e.clientY);
  }, {passive:false});

  card.addEventListener('pointerdown', e=>{
    const v = e.target.closest('.fwview');
    if(!v || e.target.closest('.fwzoom')) return;
    fwFocused = true;
    v.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(pts.size === 2){
      const [a,b] = [...pts.values()];
      pinch = {d:Math.hypot(a.x-b.x, a.y-b.y), k:fwZ.k};
      drag = null;
    } else {
      drag = {id:e.pointerId, x:e.clientX, y:e.clientY, u:fwUnit(v), v};
      v.classList.add('drag');
    }
  });

  card.addEventListener('pointermove', e=>{
    if(!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    const v = e.target.closest('.fwview') || (drag && drag.v);
    if(pinch && pts.size === 2 && v){
      const [a,b] = [...pts.values()];
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if(pinch.d > 0) fwZoomAt(v, pinch.k * (d/pinch.d), (a.x+b.x)/2, (a.y+b.y)/2);
      return;
    }
    if(drag && e.pointerId === drag.id){
      fwZ.tx += (e.clientX - drag.x) * drag.u;
      fwZ.ty += (e.clientY - drag.y) * drag.u;
      drag.x = e.clientX; drag.y = e.clientY;
      fwApply();
    }
  });

  const up = e=>{
    pts.delete(e.pointerId);
    if(pts.size < 2) pinch = null;
    if(drag && e.pointerId === drag.id){ drag.v.classList.remove('drag'); drag = null; }
  };
  card.addEventListener('pointerup', up);
  card.addEventListener('pointercancel', up);

  card.addEventListener('dblclick', e=>{
    const v = e.target.closest('.fwview'); if(!v || e.target.closest('.fwzoom')) return;
    fwZoomAt(v, fwZ.k * (e.altKey ? 1/1.6 : 1.6), e.clientX, e.clientY);
  });

  card.addEventListener('click', e=>{
    const b = e.target.closest('.fwzoom button'); if(!b) return;
    fwFocused = true;
    if(b.dataset.z === 'in') fwZoomCentre(1.3);
    else if(b.dataset.z === 'out') fwZoomCentre(1/1.3);
    else fwReset();
  });

  card.addEventListener('keydown', e=>{
    const v = e.target.closest('.fwview'); if(!v) return;
    const step = 28 * fwUnit(v) * 4;
    if(e.key === '+' || e.key === '='){ fwZoomCentre(1.3); }
    else if(e.key === '-' || e.key === '_'){ fwZoomCentre(1/1.3); }
    else if(e.key === '0'){ fwReset(); }
    else if(e.key === 'ArrowLeft'){ fwZ.tx += step; fwApply(); }
    else if(e.key === 'ArrowRight'){ fwZ.tx -= step; fwApply(); }
    else if(e.key === 'ArrowUp'){ fwZ.ty += step; fwApply(); }
    else if(e.key === 'ArrowDown'){ fwZ.ty -= step; fwApply(); }
    else return;
    e.preventDefault();
  });
})();






/* ---------------- plain-English hover on any text ----------------
   The framework trees explain the ideas; this explains the words. Every panel that
   renders prose gets walked once per render, and EVERY occurrence of a business term is
   wrapped — not just the first.

   That was Sid's call and it is the right one: an aid that only works if you happen to
   read the panel top to bottom is not an aid. You land mid-page on the third use of
   "margin", it is bare, and you are stuck exactly where the help was supposed to be.
   The underline is made faint instead, so density is absorbed by the styling rather
   than by leaving words unexplained. */
/* ---- touch ----------------------------------------------------------------
   iOS has no pointer to hover with. Tapping a non-interactive element makes Safari
   synthesize a mouseover and THEN fire a click, so the tooltip opened on the fake
   hover and the click handler, seeing it already open on that anchor, shut it again.
   It was never missing — it was flashing.

   So: remember whether the last pointer down was a finger, ignore the synthesized
   mouse events when it was, and let tap alone do the work. Tap opens, tap again or
   tap anywhere else closes. A long press would also work, but there is nothing else
   a tap on these words could mean, and making someone hold still for 400ms to read a
   definition is a worse deal than giving it to them immediately. */
let termTouch = false;
document.addEventListener('pointerdown', e=>{ termTouch = (e.pointerType === 'touch'); },
                          {capture:true, passive:true});

/* ---------------- navigation-mode hover suppression (preview only) ----------------
   Moving around with a trackpad - panning, zooming, an ordinary two-finger scroll -
   routinely drags the cursor across a defined term, a button, or the framework canvas,
   and every one of those has its own hover-triggered popup (the term tooltip, the
   dock's hover-enlarge, a framework/canvas node's gloss card). None of that is
   intentional interaction - it is the cursor incidentally passing over something on the
   way elsewhere, and without this, that is indistinguishable from someone resting the
   pointer on purpose: a card could pop and re-pop on every tick as content slides
   underneath a stationary cursor.

   window.NAV_ACTIVE is a single, short-lived flag: true for as long as wheel events keep
   arriving, and for a brief idle window after the last one (160ms - long enough to
   bridge the gap between individual trackpad events, short enough to be gone well before
   a reader who has actually stopped moving could rest the pointer on something on
   purpose). It is read, not enforced: every hover-driven handler already gates on
   existing flags (termTouch for touch devices, fwPinned once a card is pinned open)
   before doing anything, so NAV_ACTIVE is simply added to those same early-return
   checks. That means this never touches click, keyboard focus, or text selection - only
   the "pop a card because the pointer happens to be over something" path is affected,
   and only while active. Deliberately keyed off 'wheel' alone, not the generic 'scroll'
   event - scroll also fires for the step panel's own smooth-scroll-into-view on an
   ordinary Next/rail click, which is not trackpad navigation and should not suppress
   anything (see the comment by the listener below). Click-drag panning has no wheel
   events of its own, so the pageZoom click-drag handler calls this directly instead -
   that's the one other place this is wired in, so a drag-pan across a term doesn't pop
   its tooltip either.

   It also clears whatever hover popup was already open the instant navigation starts -
   a tooltip or peek that was open before the reader started scrolling would otherwise
   hang there, unpinned, drifting over content that is now sliding past underneath it. A
   pinned card (clicked open on purpose) is left alone, exactly like the existing fwPinned
   checks elsewhere already treat it. */
window.NAV_ACTIVE = false;
(function navGate(){
  const IDLE_MS = 160;
  let timer = null;

  /* TEMP DEBUG, preview only - a small readout so this is visibly testable without
     opening devtools, same spirit as pageZoom's own on-screen k/tx/ty readout. Remove
     alongside that one before this goes anywhere near live. */
  const dbg = document.createElement('div');
  dbg.id = 'navdebug';
  dbg.style.cssText = 'position:fixed;top:4px;right:4px;z-index:99999;background:rgba(0,0,0,.75);'
    + 'color:#fff;font:11px/1.5 monospace;padding:3px 8px;border-radius:4px;pointer-events:none;'
    + 'transform:translateY(96px)';
  document.body.appendChild(dbg);
  function dbgUpdate(){ dbg.textContent = 'hover ' + (window.NAV_ACTIVE ? 'SUPPRESSED (navigating)' : 'normal'); }

  function start(){
    if(!window.NAV_ACTIVE){
      window.NAV_ACTIVE = true;
      document.documentElement.classList.add('nav-active');
      if(typeof fwPinned === 'undefined' || !fwPinned) fwTipHide();
      document.querySelectorAll('.dock .peek.open').forEach(w=>{ if(!w.classList.contains('float')) w.classList.remove('open'); });
    }
    dbgUpdate();
    clearTimeout(timer);
    timer = setTimeout(stop, IDLE_MS);
  }
  function stop(){
    window.NAV_ACTIVE = false;
    document.documentElement.classList.remove('nav-active');
    dbgUpdate();
  }
  dbgUpdate();
  /* wheel only - not the generic 'scroll' event. Scroll also fires for reasons that are
     not trackpad navigation at all: clicking Next or a step in the rail smooth-scrolls
     the step panel into view (see "Next scrolls to the top of the step panel" elsewhere
     in this file), and that scroll event is indistinguishable from a trackpad gesture if
     listened to directly - it would suppress hover for a moment right after a perfectly
     ordinary button click, which is not what this is for. Wheel events only fire for
     actual wheel/trackpad input, so they are the correct, narrower signal; click-drag
     panning has no wheel events of its own, which is what the explicit NAV_MARK call in
     pageZoom's drag handler is for. */
  window.addEventListener('wheel', start, {passive:true, capture:true});
  window.NAV_MARK = start;
})();



/* Places a dotted underline would be noise or would break something: the chrome of the
   page, anything already interactive, and the tooltip itself. */


/* ---- term marking -------------------------------------------------------------------
   Rules (see claude/reader-policy.md): EVERY occurrence is marked; phrases are entries in their own
   right and the words inside them stay hoverable (nested spans, innermost wins); an entry may be
   scoped to certain cases; SVG text is marked too (tspans). ---- */
function termCase(){ return (typeof CASES !== 'undefined' && CASES[ci]) ? CASES[ci].id : null; }
function termInScope(g){ return !g.scope || g.scope.indexOf(termCase()) >= 0; }
/* Term matching: a first-word index and startsWith, not one giant regex. With ~6,000 keys the regex approach compiled a new
   6,000-way alternation for every nested mark (page load 22 s, 9 s per step click). Semantics are unchanged: leftmost, then longest key;
   a key must start and end on a word boundary; an optional plural (s | es) is allowed; an excluded entry (the phrase we are inside) is skipped
   and the next-longest candidate at the same position is tried, which is how the words inside a phrase stay hoverable. */
let _termIdx = null;
function termIndex(){
  if(_termIdx) return _termIdx;
  const idx = Object.create(null);
  for(const k of Object.keys(TERMS)){
    const m = /^[a-z0-9]+/i.exec(k); if(!m) continue;
    (idx[m[0].toLowerCase()] = idx[m[0].toLowerCase()] || []).push(k);
  }
  for(const w in idx) idx[w].sort((a,b)=>b.length - a.length);
  return _termIdx = idx;
}
const _isW = c => c !== undefined && /[A-Za-z0-9_]/.test(c);
function termHits(text, excl){
  const idx = termIndex(), low = text.toLowerCase(), hits = [];
  const ex = excl && excl.size ? new Set([...excl].map(g=>g.id||g.d)) : null;
  const re = /[A-Za-z0-9]+/g; let m, pos = 0;
  while((m = re.exec(low))){
    if(m.index < pos) continue;
    if(m.index > 0 && _isW(low[m.index-1])) continue;
    /* the first word may itself carry the plural ('revenues' -> key 'revenue'), so look under the word, without its s, and without its es */
    let cands = idx[m[0]] || [];
    if(m[0].length > 2 && m[0].endsWith('s')) cands = cands.concat(idx[m[0].slice(0,-1)] || []);
    if(m[0].length > 3 && m[0].endsWith('es')) cands = cands.concat(idx[m[0].slice(0,-2)] || []);
    if(!cands.length) continue;
    if(cands.length > 1) cands = cands.slice().sort((a,b)=>b.length - a.length);
    let best = null;
    for(const k of cands){
      if(!low.startsWith(k, m.index)) continue;
      const g = TERMS[k]; if(ex && ex.has(g.id||g.d)) continue;
      let end = m.index + k.length;
      if(!_isW(low[end])) { best = [m.index, end, k]; break; }
      if(low.startsWith('s', end) && !_isW(low[end+1])) { best = [m.index, end+1, k]; break; }
      if(low.startsWith('es', end) && !_isW(low[end+2])) { best = [m.index, end+2, k]; break; }
    }
    if(best){ hits.push(best); pos = best[1]; re.lastIndex = pos; }
  }
  return hits;
}
function termFrag(text, excl, mk){
  const hits = termHits(text, excl), frag = document.createDocumentFragment();
  if(!hits.length){ frag.appendChild(document.createTextNode(text)); return frag; }
  let at = 0;
  for(const [a, b, k] of hits){
    if(a > at) frag.appendChild(document.createTextNode(text.slice(at, a)));
    const g = TERMS[k], slice = text.slice(a, b), ex = new Set(excl || []); ex.add(g);
    if(!termInScope(g)) frag.appendChild(termFrag(slice, ex, mk));   /* out of scope: still mark its parts */
    else {
      const sp = mk();
      sp.setAttribute('class', 'term' + ((g.kind === 'phrase' || g.kind === 'idiom') ? ' phr' : ''));
      sp.setAttribute('data-t', k);
      sp.appendChild(termFrag(slice, ex, mk)); frag.appendChild(sp);
    }
    at = b;
  }
  if(at < text.length) frag.appendChild(document.createTextNode(text.slice(at)));
  return frag;
}
function markTerms(root){
  if(!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n){
      if(!n.nodeValue || n.nodeValue.length < 3) return NodeFilter.FILTER_REJECT;
      const p = n.parentElement;
      if(!p || p.closest(TERMSKIP)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const targets = [];
  for(let n = walker.nextNode(); n; n = walker.nextNode()) targets.push(n);
  for(const node of targets){
    if(!termHits(node.nodeValue).length) continue;
    node.parentNode.replaceChild(termFrag(node.nodeValue, null, ()=>document.createElement('span')), node);
  }
  markSvgText(root);
}
/* Text inside SVG diagrams and figures. The nine-box canvas and framework-tree nodes (.fwnode) keep
   their own richer hover, so they are left alone. */
function markSvgText(root){
  const NS = 'http://www.w3.org/2000/svg';
  root.querySelectorAll('svg text').forEach(t=>{
    if(t.closest('.fwnode, .term')) return;
    const w = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, {acceptNode(n){
      return (!n.nodeValue || n.nodeValue.trim().length < 3 || n.parentElement.closest('.term'))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }});
    const ns = []; for(let n = w.nextNode(); n; n = w.nextNode()) ns.push(n);
    for(const node of ns){
      if(!termHits(node.nodeValue).length) continue;
      node.parentNode.replaceChild(termFrag(node.nodeValue, null, ()=>document.createElementNS(NS, 'tspan')), node);
    }
  });
}

/* Every surface that renders prose. fwcard's tree is SVG and TERMSKIP excludes it, so
   only the framework's annotation rows and its "when to use this" line get marked;
   toolkit's chips are buttons and are skipped, leaving the opened concept panel. */

/* The base sense (g.p/g.ex) is the same everywhere a term appears. Some terms also
   mean something more specific inside one particular case -- "margin" said about a
   salesperson's commission is not the general definition, it's that definition applied
   to one line of the case. g.ctx carries those, keyed by case id; this looks up the
   one for whatever case is on screen and feeds it into the existing "In this case"
   card that NODECTX already renders, rather than inventing a second UI for it. */
function termHereText(g){
  const c = termCase(); if(!c || !g.ctx) return '';
  /* a sense keyed 'BTH-19#3' applies on that step only and beats the case-wide one */
  return g.ctx[c + '#' + (si + 1)] || g.ctx[c] || '';
}
function termRel(t){
  const p = t.parentElement && t.parentElement.closest && t.parentElement.closest('.term');
  return p ? (TERMS[p.getAttribute('data-t')] || null) : null;
}

function markAllTerms(){
  TERMPANELS.forEach(id=>markTerms(document.getElementById(id)));
  if(typeof TERMSELECTORS !== 'undefined') TERMSELECTORS.forEach(q=>document.querySelectorAll(q).forEach(markTerms));
}

(function bindTermHover(){
  document.addEventListener('mouseover', e=>{
    if(termTouch || window.NAV_ACTIVE) return;
    const t = e.target.closest && e.target.closest('.term'); if(!t) return;
    const g = TERMS[t.dataset.t]; if(!g) return;
    document.querySelectorAll('.fwnode.hi').forEach(x=>x.classList.remove('hi'));
    fwHiId = null;
    _tipKey = t.dataset.t; fwTipShow(t, fwTipHTML(g.d, g, termHereText(g), '', null, termRel(t)));
  });
  document.addEventListener('mouseout', e=>{
    if(termTouch || fwPinned) return;
    const t = e.target.closest && e.target.closest('.term');
    if(t && !t.contains(e.relatedTarget)) fwTipHide();
  });
  /* On a touch screen there is no "move away", so the card has to be dismissed by
     touching something else. Bound to touchstart rather than click, and in the capture
     phase: it fires before any click handler, it cannot be swallowed by a handler that
     stops propagation, and it also fires when a scroll begins — so the card clears as
     soon as the reader moves on, which is what they mean by moving on. */
  document.addEventListener('touchstart', e=>{
    if(fwPinned) return;                                   /* pinned: only the ✕ / Escape closes it */
    if(e.target.closest && e.target.closest('.fwtip')) return;   /* touching the card is how you pin it */
    const t = e.target.closest && e.target.closest('.term, .fwnode');
    if(!t) fwTipHide();
  }, {capture:true, passive:true});
  /* click a term to keep its card open (mouse away no longer closes it, see the
     mouseout guard above); click the same term again, click away, or Escape closes it.
     On touch, where there is no hover, this is also how the card is opened at all. */
  document.addEventListener('click', e=>{
    const t = e.target.closest && e.target.closest('.term'); if(!t) return;
    const g0 = TERMS[t.dataset.t];
    if(g0 && tipTouchTap(fwTipAnchor === t, ()=>{
      _tipKey = t.dataset.t;
      fwTipShow(t, fwTipHTML(g0.d, g0, termHereText(g0), '', null, termRel(t)));
    })) return;
    if(fwPinned && fwTipAnchor === t){ fwPin(false); fwTipHide(); return; }
    const g = TERMS[t.dataset.t]; if(!g) return;
    _tipKey = t.dataset.t;
    fwTipShow(t, fwTipHTML(g.d, g, termHereText(g), '', null, termRel(t)));
    fwPin(true);
  });
  /* touch: a tap inside an open peek card pins it */
  document.addEventListener('click', e=>{
    if(!termTouch || fwPinned || !fwTipEl || fwTipEl.hidden) return;
    if(e.target.closest && e.target.closest('.fwtip')){ fwPin(true); fwPlace(); }
  });
})();

/* ---------------- plain-English hover ----------------
   One tooltip, shared by the framework trees and the main canvas. Fixed-position, so it
   is immune to the pan/zoom transform underneath it. */
let fwTipEl = null, fwHiId = null;
function fwTip(){
  if(!fwTipEl){
    fwTipEl = document.createElement('div');
    fwTipEl.className = 'fwtip'; fwTipEl.setAttribute('role','tooltip');
    fwTipEl.hidden = true;
    document.body.appendChild(fwTipEl);
  }
  return fwTipEl;
}
/* Touch "peek, then pin": first tap on a term/node peeks (closes on any touch elsewhere);
   a second tap on the same one pins it. Once pinned, a touch never toggles it closed and
   a different target just switches the card, keeping it pinned. Returns false for mouse. */
function tipTouchTap(sameOpen, showFn){
  if(!termTouch) return false;
  const open = sameOpen && fwTipEl && !fwTipEl.hidden;
  if(open){ if(!fwPinned){ fwPin(true); fwPlace(); } return true; }
  const wasPinned = fwPinned;
  showFn();
  if(wasPinned){ fwPin(true); fwPlace(); }
  return true;
}
function fwTipHide(){
  const t = fwTip(); t.dataset.on = "0"; t.hidden = true; fwTipAnchor = null;
  /* hiding always unpins: a pinned card must never outlive the node it describes,
     which is what happens when the step re-renders underneath it */
  if(typeof fwPinned !== 'undefined' && fwPinned){ fwPinned = false; t.classList.remove('pinned'); }
  document.querySelectorAll('.fwnode.hi').forEach(g=>g.classList.remove('hi'));
  fwHiId = null;
}
let fwTipAnchor = null;
/* The tooltip is appended to <body> and fixed-position, so by default it sizes
   itself off the stylesheet's flat 330/390px max-width regardless of how much
   of the page is actually visible. That's fine unzoomed, but once the reader
   has pinched/zoomed in, the VISIBLE window (window.visualViewport) can be far
   smaller than the full layout viewport window.innerWidth/innerHeight still
   report — so a stylesheet-sized card can overflow off the edge of what's
   actually on screen, or simply dominate it. We clamp both the card's size and
   its position to visualViewport when it's available, falling back to the
   window dimensions on a browser without it. A floor keeps the card from
   shrinking below a comfortably readable size even in a tiny visible window. */
function fwPlace(){
  const t = fwTipEl, el = fwTipAnchor;
  if(!t || !el) return;
  const vv = window.visualViewport;
  const vLeft = vv ? vv.offsetLeft : 0, vTop = vv ? vv.offsetTop : 0;
  const vW = vv ? vv.width : window.innerWidth, vH = vv ? vv.height : window.innerHeight;
  const pad = 10, MINW = 220, MINH = 140;
  const maxW = Math.max(MINW, Math.min(390, vW - pad * 2));
  t.style.maxWidth = Math.round(maxW) + 'px';
  const maxH = Math.max(MINH, vH - pad * 2);
  t.style.maxHeight = Math.round(maxH) + 'px';
  t.style.overflowY = (t.scrollHeight > maxH) ? 'auto' : '';
  const r = el.getBoundingClientRect(), b = t.getBoundingClientRect();
  let left = r.left + r.width/2 - b.width/2;
  left = Math.max(vLeft + pad, Math.min(left, vLeft + vW - b.width - pad));
  let top = r.top - b.height - 9;
  if(top < vTop + pad) top = r.bottom + 9;               /* flip under when it won't fit */
  if(top + b.height > vTop + vH - pad) top = Math.max(vTop + pad, r.top - b.height - 9);
  top = Math.max(vTop + pad, Math.min(top, vTop + vH - b.height - pad));   /* never leave the screen */
  t.style.left = Math.round(left) + 'px';
  t.style.top  = Math.round(top) + 'px';
}
function fwTipShow(el, html){
  const t = fwTip();
  fwTipAnchor = el;
  t.innerHTML = html; t.hidden = false; t.dataset.on = "1";
  t.classList.toggle('tp', !!termTouch);   /* touch: a peek card is touchable, so tapping it pins it */
  fwPlace();
}
/* The page moving under an anchored tooltip is a reason to MOVE the tooltip, never to
   hide it. Hiding on scroll made hover look broken on anything you had to scroll to
   reach: a trackpad keeps firing scroll events for about a second after you lift your
   fingers, so the tooltip died the moment it appeared. */
function fwTipFollow(){
  if(!fwTipEl || fwTipEl.hidden || !fwTipAnchor) return;
  if(!fwTipAnchor.isConnected){ fwTipHide(); return; }
  const vv = window.visualViewport;
  const vLeft = vv ? vv.offsetLeft : 0, vTop = vv ? vv.offsetTop : 0;
  const vW = vv ? vv.width : window.innerWidth, vH = vv ? vv.height : window.innerHeight;
  const r = fwTipAnchor.getBoundingClientRect();
  if(!(fwPinned && termTouch) &&
     (r.bottom < vTop || r.top > vTop + vH ||
      r.right < vLeft || r.left > vLeft + vW)){ fwTipHide(); return; }
  fwPlace();
}
function termFirst(p){ const m = String(p).match(/^.*?[.!?](?=\s|$)/); const t = m ? m[0] : String(p); return t.length > 240 ? t.slice(0,237) + '…' : t; }
var _tipKey = '';   /* the exact key the reader hovered: tells an inflected form from the entry itself */
function fwTipHTML(title, g, here, flag, ctx, rel){
  if(!g && !ctx) return '';   /* never show an empty card */
  const parts = g && g.parts && g.parts.length ? g.parts.map(k=>TERMS[k]).filter(Boolean) : [];
  const isForm = g && g.f && g.f.indexOf(_tipKey) >= 0, built = g && g.built && TERMS[g.built];
  return `<h5>${esc(title)}</h5>` +
    (isForm ? `<p class="ex">“${esc(_tipKey)}” is a form of “${esc(g.d)}”.</p>` : '') +
    (g ? `<p>${esc(g.p)}</p>` : '') +
    (built ? `<div class="here parts"><span class="lb">Built from</span><p><b>${esc(built.d)}</b> — ${esc(termFirst(built.p))}</p></div>` : '') +
    (g && g.ex ? `<p class="ex">${esc(g.ex)}</p>` : '') +
    (parts.length ? `<div class="here parts"><span class="lb">The words in it</span>${parts.map(x=>
      `<p><b>${esc(x.d)}</b> — ${esc(termFirst(x.p))}</p>`).join('')}</div>` : '') +
    (rel ? `<div class="here parts"><span class="lb">Part of the phrase</span><p><b>${esc(rel.d)}</b> — ${esc(termFirst(rel.p))}</p></div>` : '') +
    (flag ? `<span class="flag ${flag === 'closed by the facts' ? 'dropped':''}">${esc(flag)}</span>` : '') +
    (here ? `<div class="here"><span class="lb">In this case</span><p>${esc(here)}</p></div>` : '') +
    fwCtxHTML(ctx) +
    (ctx && !fwPinned ? `<div class="hint">${termTouch ? 'Tap again to keep this open' : 'Click to keep this open'}</div>` : '');
}

/* ---------------- node context: case, provenance, arithmetic, consequence ---------- */
function fwCtxHTML(ctx){
  if(!ctx) return '';
  const row = (lb, body, cls) => body
    ? `<div class="row ${cls||''}"><span class="lb">${lb}</span>${body}</div>` : '';
  const p = t => `<p>${esc(t)}</p>`;
  /* Provenance is two facts, not one: the step where the box lights up and the step where
     its number arrives are usually different, and squeezing both into one line lost
     whichever mattered less that day. */
  const prov = (ctx.litAt || ctx.from)
    ? `<div class="row"><span class="lb">Where it comes from</span>` +
        (ctx.litAt ? `<p class="prov"><i>Lights up</i>${esc(ctx.litAt)}</p>` : '') +
        (ctx.from  ? `<p class="prov"><i>Number</i>${esc(ctx.from)}</p>` : '') +
      `</div>`
    : '';
  const inner =
    row('What it is here', ctx.concept && p(ctx.concept)) +
    prov +
    row('Computes to', ctx.computes && `<div class="calc">${esc(ctx.computes)}</div>`) +
    row('In your head', ctx.mental && p(ctx.mental), 'mental') +
    row('Worth checking', ctx.check && `<div class="calc">${esc(ctx.check)}</div>`) +
    row('Why it matters', ctx.matters && p(ctx.matters), 'why');
  return inner ? `<div class="ctx">${inner}</div>` : '';
}

/* pinning: hover previews, click holds it open so it can actually be read */
let fwPinned = false;
function fwPin(on){
  const t = fwTip();
  fwPinned = !!on;
  t.classList.toggle('pinned', fwPinned);
  if(fwPinned){
    let btn = t.querySelector('.pin');
    if(!btn){
      btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'pin'; btn.innerHTML = '&times;';
      btn.setAttribute('aria-label','Close');
      btn.addEventListener('click', e=>{ e.stopPropagation(); fwPin(false); fwTipHide(); });
      t.appendChild(btn);
    }
  }
}
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && fwPinned){ fwPin(false); fwTipHide(); }
});
document.addEventListener('mousedown', e=>{
  if(!fwPinned || termTouch) return;
  /* leave .term alone here — its own click handler above decides whether that's a
     close (same term again) or a switch (a different term); this only closes on a
     genuine click to blank space or into the body text elsewhere */
  if(e.target.closest && (e.target.closest('.fwtip') || e.target.closest('.fwnode') || e.target.closest('.term'))) return;
  fwPin(false); fwTipHide();
}, true);


/* framework trees ------------------------------------------------------------------ */
function fwNodeTip(g){
  const card = document.getElementById('fwcard');
  const f = fwCurrent(); if(!f) return;
  const c0 = CASES[ci];
  const id = g.dataset.n, mode = g.dataset.m;
  const gl = (FWGLOSS[f.base] || {})[id] || FWADD[id];
  const node = fwFindNode(f, id);
  if(!gl) return;              /* no gloss, no tooltip */
  const o = (f.over || {})[id];
  const added = (f.add || []).some(a=>a.id === id);
  let here = '', flag = '';
  if(mode === 'bend'){
    if(added){ flag = 'added by this case'; here = node ? node.s : ''; }
    else if(o){
      here = o.s || '';
      if(o.st === 'changed') flag = 'bent by this case';
      else if(o.st === 'dropped') flag = 'closed by the facts';
    }
    const row = (f.ann || []).find(a=>a[0] === (node && node.t));
    if(row) here = here ? here + ' — ' + row[1] : row[1];
  }
  document.querySelectorAll('.fwnode.hi').forEach(x=>x.classList.remove('hi'));
  card.querySelectorAll(`.fwnode[data-n="${CSS.escape(id)}"]`).forEach(x=>x.classList.add('hi'));
  fwHiId = id;
  const ctx = (typeof NODECTX !== 'undefined' && NODECTX[c0.id] && NODECTX[c0.id][fwOpen] &&
               NODECTX[c0.id][fwOpen][id]) || null;
  fwTipShow(g, fwTipHTML(node ? node.t : id, gl, here, flag, ctx));
}
function fwCurrent(){
  const c = CASES[ci], list = (typeof FW !== 'undefined' && FW[c.id]) || null;
  return (list && fwOpen !== null) ? list[fwOpen] : null;
}
function fwFindNode(f, id){
  const a = (f.add || []).find(x=>x.id === id);
  if(a) return a;
  let hit = null;
  (function walk(n){ if(n.id === id) hit = n; (n.kids||[]).forEach(walk); })(FWB[f.base]);
  return hit;
}
(function bindFwHover(){
  const card = document.getElementById('fwcard'); if(!card) return;
  card.addEventListener('mouseover', e=>{
    if(termTouch || fwPinned || window.NAV_ACTIVE) return;
    const g = e.target.closest('.fwnode'); if(!g) return;
    fwNodeTip(g);
  });
  card.addEventListener('mouseout', e=>{
    if(termTouch || fwPinned) return;
    const g = e.target.closest('.fwnode');
    if(g && !g.contains(e.relatedTarget)) fwTipHide();
  });
  /* touch: a tap that did not turn into a drag opens the same tooltip */
  /* Where the pointer actually went down, and whether the gesture was a pan.
     The pan handler calls setPointerCapture on pointerdown, and with a MOUSE that
     retargets the compatibility mouseup/click to the .fwview element — so e.target in
     the click handler is the viewport, never the node, and closest('.fwnode') is null.
     (With touch it is not retargeted, which is why this only shows up on a desktop.)
     Resolve the node from the coordinates instead, and ignore a click that ended a drag. */
  let fwDownAt = null;
  card.addEventListener('pointerdown', e=>{ fwDownAt = {x:e.clientX, y:e.clientY}; }, true);
  card.addEventListener('click', e=>{
    if(e.target.closest('.fwzoom')) return;
    if(fwDownAt && Math.hypot(e.clientX - fwDownAt.x, e.clientY - fwDownAt.y) > 6) return;
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const g = (under && under.closest && under.closest('.fwnode')) ||
              (e.target.closest && e.target.closest('.fwnode'));
    if(!g) return;
    if(tipTouchTap(fwHiId === g.dataset.n, ()=>fwNodeTip(g))) return;
    /* Click pins, so the card can be read rather than balanced on a cursor. Set the
       pinned flag BEFORE building: the builder omits the "click to keep open" hint when
       pinned, and fwTipShow replaces innerHTML, so the close control is attached after. */
    if(fwPinned && fwHiId === g.dataset.n){ fwTipHide(); return; }
    fwPinned = true;
    fwNodeTip(g);
    fwPin(true);
    fwPlace();
  });
})();



/* main canvas ----------------------------------------------------------------------- */
(function bindCanvasHover(){
  const svg = document.getElementById('tree'); if(!svg) return;
  function canvasNodeTip(g){
    const id = g.dataset.n, c = CASES[ci];
    const gl = CANVGLOSS[id];
    const ctx = (typeof CANVCTX !== 'undefined' && CANVCTX[c.id] && CANVCTX[c.id][id]) || null;
    if(!gl && !ctx) return;
    const d = (c.nodes && c.nodes[id]) || {t:id, v:""};
    document.querySelectorAll('.fwnode.hi').forEach(x=>x.classList.remove('hi'));
    g.classList.add('hi'); fwHiId = id;
    fwTipShow(g, fwTipHTML(d.t || id, gl, d.v && d.v !== '—' ? d.v : '', '', ctx));
  }
  svg.addEventListener('mouseover', e=>{
    if(termTouch || fwPinned || window.NAV_ACTIVE) return;
    const g = e.target.closest('.fwnode'); if(!g) return;
    canvasNodeTip(g);
  });
  svg.addEventListener('mouseout', e=>{
    if(termTouch || fwPinned) return;
    const g = e.target.closest('.fwnode');
    if(g && !g.contains(e.relatedTarget)) fwTipHide();
  });
  /* click pins, so a six-line card can be read instead of balanced on a cursor.
     The canvas sets no pointer capture, so e.target is the node here — unlike the
     framework panel, where the pan handler's capture retargets the click. */
  svg.addEventListener('click', e=>{
    const g = e.target.closest('.fwnode'); if(!g) return;
    if(tipTouchTap(fwHiId === g.dataset.n, ()=>canvasNodeTip(g))) return;
    if(fwPinned && fwHiId === g.dataset.n){ fwTipHide(); return; }
    fwPinned = true;
    canvasNodeTip(g);
    fwPin(true);
    fwPlace();
  });
})();
window.addEventListener('scroll', fwTipFollow, {passive:true});
window.addEventListener('resize', fwTipFollow);
/* a pinch-zoom/pan that doesn't reflow the layout viewport fires neither of the
   above — only visualViewport sees it — so an open-but-unfocused tooltip needs
   its own listener here to stay sized and positioned to the visible window. */
if(window.visualViewport){
  window.visualViewport.addEventListener('resize', fwTipFollow);
  window.visualViewport.addEventListener('scroll', fwTipFollow);
}

/* ---------------- the left column: collapse and resize ----------------
   Sid reads the right column most of the time, so the left one should get out of the
   way on request and stay out of it. Width and collapsed state are remembered per
   viewer — a convenience, not state anything depends on, so a browser that refuses to
   store it just means the column opens at its default width. */
(function splitControls(){
  const split = document.getElementById('split');
  const bar   = document.getElementById('splitter');
  const btn   = document.getElementById('splitcollapse');
  if(!split || !bar) return;
  const KEY = 'casebook.split.v1';
  const MIN = 260, MAX = 760;

  let state = {w:null, off:false};
  try{ const r = localStorage.getItem(KEY); if(r) state = {...state, ...JSON.parse(r)}; }
  catch(e){}
  const save = ()=>{ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} };

  function apply(){
    split.classList.toggle('nocanvas', !!state.off);
    if(state.off) split.style.setProperty('--lw', '0px');
    else if(state.w) split.style.setProperty('--lw', state.w + 'px');
    else split.style.removeProperty('--lw');   /* let the stylesheet decide */
    btn.innerHTML = state.off ? '&#8250;' : '&#8249;';
    btn.title = state.off ? 'Show the left column' : 'Hide the left column';
    btn.setAttribute('aria-expanded', String(!state.off));
    if(typeof fitColumn === 'function') fitColumn();
  }
  apply();

  btn.addEventListener('click', e=>{
    e.stopPropagation();
    state.off = !state.off; save(); apply();
  });

  let drag = null;
  bar.addEventListener('pointerdown', e=>{
    if(e.target.closest('button')) return;
    drag = {x:e.clientX, w: split.firstElementChild.getBoundingClientRect().width};
    bar.setPointerCapture(e.pointerId); bar.classList.add('drag');
  });
  bar.addEventListener('pointermove', e=>{
    if(!drag) return;
    const w = Math.max(MIN, Math.min(MAX, drag.w + (e.clientX - drag.x)));
    state.w = Math.round(w); state.off = false; apply();
  });
  const end = ()=>{ if(drag){ drag = null; bar.classList.remove('drag'); save(); } };
  bar.addEventListener('pointerup', end);
  bar.addEventListener('pointercancel', end);
  /* double-click the bar to reset to the default width */
  bar.addEventListener('dblclick', e=>{
    if(e.target.closest('button')) return;
    state.w = null; state.off = false; save(); apply();
  });
})();

/* ---------------- whole-page zoom + pan ----------------
   Replaces reliance on the browser/OS's own zoom, which on a Windows trackpad pinch is
   completely invisible to the page — no observable change to innerWidth, devicePixelRatio
   or visualViewport (see the long comment on buildRailToggle), and critically, no real
   layout overflow for a scroll-based pan to move into sideways. Trackpad pinch DOES still
   reach the page as a 'wheel' event with ctrlKey set (the same trick buildRailToggle's
   gesture detection already relies on), so this captures that gesture directly, blocks the
   browser's own native zoom from acting on it, and applies our own scale+pan transform to
   a wrapper placed around the page's whole content (`.wrap`, moved inside a new #pagezoom
   div at load). That makes zoom level and pan position a real, always-readable state
   (window.PZ) instead of something every feature has to guess at indirectly.

   At rest (k===1) none of this engages: #pagezoom stays in normal document flow and the
   page scrolls exactly as it always has — native scrollbar, Ctrl+F, keyboard scrolling,
   all untouched. The moment a zoom-in tick takes k above 1, #pagezoom switches to
   position:fixed, inset:0 (so all the pan math is simple viewport-relative numbers, not
   scroll-position-dependent ones), carrying the reader's current scroll position over as
   the starting pan so nothing jumps. The moment k returns to exactly 1, that's reversed:
   pan is translated back into a scroll position, #pagezoom returns to normal flow, and
   native scrolling resumes as if nothing happened.

   Panning (click-drag empty space, or a plain two-finger scroll once zoomed in) reuses the
   same glyph-precision "is this pixel actually on a rendered character" test as before —
   caretRangeFromPoint/caretPositionFromPoint finds the nearest character to the pointer,
   and a one-character range around it gives that character's real on-screen box, so only a
   press that lands inside that box counts as "on text" and keeps native selection; every
   other pixel — including the blank line-height gap inside a paragraph's own box — pans.
   If the drag starts over a panel with its own scrollbar (a grid that didn't fit, an
   exhibit table), that panel scrolls instead, same as before.

   This is deliberately not wired up to the burger, the Frameworks bar, or the right dock
   yet beyond one line for the burger so it doesn't regress — see rawAuto() below. Those are
   the next step, once this engine itself is confirmed solid. */
(function pageZoom(){
  const wrap = document.querySelector('body > .wrap');
  if(!wrap) return;
  /* Two nested elements, not one, and this split is the fix for the "zoom breaks the page —
     huge blank strip opens, content jumps far to one side" regression. #pagezoom is the
     viewport-fixed CLIP WINDOW only: at rest it's a normal in-flow box, and once zoomed it
     becomes position:fixed;inset:0;overflow:hidden so the pan math has simple
     viewport-relative numbers — but it is never itself transformed. #pzlayer, a plain
     statically-positioned child of it, is the one that actually receives
     `transform:scale(k) translate(tx,ty)`. Those two responsibilities were wrongly combined
     on one element in the previous version: applying the transform directly to the same box
     that also had position:fixed;inset:0 meant the fixed box's own on-screen position moved
     with it, since position:fixed already pins that box to the viewport before the
     transform is even considered — scaling/translating it then drags the whole viewport-
     sized box (and the clip region that comes with it) off to the side, so almost nothing
     of the real content was left inside the viewport to paint at all. That's exactly the
     "mostly blank, content jumps/shifts" symptom: confirmed by sampling 9 points across the
     screen after several zoom ticks and finding the transformed box's own bounding rect
     (DevTools getBoundingClientRect) entirely outside the 0..innerHeight range — i.e. the
     content wasn't misplaced inside a stable window, the window itself had been pushed off-
     screen. Keeping the fixed clip window untransformed and moving only the inner layer
     fixes this: the clip window's screen position never changes once engaged, and panning/
     zooming only ever moves content within it. */
  const pz = document.createElement('div');
  pz.id = 'pagezoom';
  wrap.parentNode.insertBefore(pz, wrap);
  const layer = document.createElement('div');
  layer.id = 'pzlayer';
  pz.appendChild(layer);
  layer.appendChild(wrap);

  /* Two different exclusion lists for two different situations - conflating them is what
     caused the "navigation keeps getting interrupted whenever the cursor passes over a
     term or button" bug (see the comment by the plain-wheel pan listener below for the
     full diagnosis). DRAG_SKIP guards where a CLICK-DRAG may start: starting one on top
     of a term, a button, a link, or form control should let that element's own click/
     select/focus behavior happen instead of being hijacked into a pan, so it stays broad.
     WHEEL_SKIP guards something narrower and unrelated: which elements have their OWN
     independent scroll/pan surface that a page-wide wheel-pan must not fight with (the
     framework canvas's own pan/zoom, the dock's internal layout). A term or a button has
     no such competing surface - wheel-scrolling over one should simply pan the page like
     wheel-scrolling over any other text, exactly as it would if the SKIP list did not
     exist at all. */
  const DRAG_SKIP = 'button,a,input,textarea,select,[contenteditable="true"],label,.term,.fwview,.peek,#dock,.rz,.askit';
  const WHEEL_SKIP = '.fwview,.peek,#dock';
  function overGlyph(x, y){
    let node = null, offset = 0;
    if(document.caretRangeFromPoint){
      const r = document.caretRangeFromPoint(x, y);
      if(r){ node = r.startContainer; offset = r.startOffset; }
    } else if(document.caretPositionFromPoint){
      const p = document.caretPositionFromPoint(x, y);
      if(p){ node = p.offsetNode; offset = p.offset; }
    }
    if(!node || node.nodeType !== 3) return false;         /* no nearby text node at all: never a glyph */
    const text = node.textContent;
    const a = Math.max(0, offset - 1), b = Math.min(text.length, offset + 1);
    if(a === b) return false;
    const r = document.createRange();
    r.setStart(node, a); r.setEnd(node, b);
    for(const rect of r.getClientRects()){
      if(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return true;
    }
    return false;                                           /* nearest character exists but isn't under the pointer */
  }
  const pannable = (el, x, y) => !!(el && !(el.closest && el.closest(DRAG_SKIP)) && !overGlyph(x, y));
  /* 2026-10: one-finger page pan that starts ON interactive content (a defined term/phrase, a
     toolkit/frameworks/case-list button) while zoomed in. DRAG_SKIP + overGlyph() above exist so
     a MOUSE click-drag on a term/button/text still clicks or selects instead of panning -- right
     for a mouse, wrong for a finger: once zoomed (#pagezoom is position:fixed + overflow:hidden)
     there is no native scrolling left, so pannable() refusing the touch meant NOTHING panned
     from there. For a touch the tap/drag distinction is made by distance instead: a touch that
     starts on any of these elements is tracked like any other, and only becomes a pan once it
     moves past TOUCH_SLOP -- a tap that stays inside it never becomes a pan, so the element's
     own click still fires; a drag that crosses it is a pan, and the click the browser would
     otherwise deliver at the end of it is swallowed (see swallowClick below).
     TOUCH_SKIP is the short list of things that genuinely own a touch gesture of their own and
     must keep it: the framework canvas (own pan/pinch), floating windows and the dock (own
     drag), resize handles, the column splitter (own capture-based drag), and form controls
     (sliders, text entry). Mouse behaviour is untouched -- pannable() still decides for it. */
  const TOUCH_SKIP = '.fwtip,.fwview,.peek,#dock,.rz,.splitter,input,textarea,select,[contenteditable="true"]';
  const TOUCH_SLOP = 10;   /* CSS px a touch may wander and still count as a tap */
  const touchPannable = el => !!(el && !(el.closest && el.closest(TOUCH_SKIP)));
  let swallowClick = false, swallowTimer = 0;
  /* nearest ancestor (stopping at body) that can actually scroll on this axis; null means
     the page/pagezoom wrapper itself is the one with room to move */
  function scrollAncestor(el, axis){
    let node = el;
    while(node && node !== document.body && node !== document.documentElement){
      const cs = getComputedStyle(node);
      if(axis === 'x'){
        if((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && node.scrollWidth > node.clientWidth + 1) return node;
      } else {
        if((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && node.scrollHeight > node.clientHeight + 1) return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  const K_MIN = 1, K_MAX = 4;
  let k = 1, tx = 0, ty = 0, active = false;

  /* TEMP DEBUG — remove before this goes anywhere near live. A visible readout of what
     this engine is actually seeing, so "horizontal still doesn't work" can be told apart
     from "the zoom gesture never reached this code at all" without guessing from a verbal
     description. Shows live k/active plus a running count of each wheel-event shape seen,
     so a pinch that never ticks the ctrl-wheel counter up points at a completely different
     problem (the gesture isn't reaching the page as ctrl+wheel on this setup) than one that
     does tick up (the engine is getting input; the bug is downstream of that). */
  const dbg = document.createElement('div');
  dbg.id = 'pzdebug';
  /* 2026-10: moved to the left side, same reason as #peekdebug above -- keeps both debug
     overlays off the right edge where the dock actually lives. */
  dbg.style.cssText = 'position:fixed;top:4px;left:4px;z-index:99999;background:rgba(0,0,0,.75);'
    + 'color:#fff;font:11px/1.5 monospace;padding:5px 8px;border-radius:4px;pointer-events:none;white-space:pre';
  document.body.appendChild(dbg);
  /* TEMP DIAGNOSTIC: the pinch/cancel readout lives in its own box (bottom-right, clear of #pzdebug,
     #peekdebug, #minidebug, the frame-timing box and the dock) so nothing sits on top of it. */
  const dbg2 = document.createElement('div');
  dbg2.id = 'pinchdiag';
  dbg2.style.cssText = 'position:fixed;bottom:4px;right:70px;z-index:2147483000;background:rgba(0,0,0,.82);'
    + 'color:#9fe;font:10px/1.35 monospace;padding:5px 8px;border-radius:4px;pointer-events:none;white-space:pre-wrap;word-break:break-all;width:62vw;max-width:62vw';
  document.body.appendChild(dbg2);
  let ctrlTicks = 0, plainTicks = 0, lastWheel = 'none yet', lastDrag = 'none yet';
  /* TEMP DIAGNOSTIC (2026-10, preview-only, remove with the other readout lines): what zoomAt()
     was last asked for, and whether it changed anything. Plain numbers only -- formatted in
     renderDebug(), never per event. */
  let zCalls = 0, zReq = 1, zSame = false;

  /* 2026-10: rAF batching/perf pass. Raw pointermove/wheel events can arrive far faster than
     the display can paint (a touch surface on iPad Pro firing well above 60/s). The previous
     code did a full clampPan() (two forced-layout reads: window.innerWidth/innerHeight and
     wrap.scrollWidth/scrollHeight) plus a transform write plus a dbgUpdate() string-build-and-
     textContent-write on EVERY single raw event, whether or not the display had any chance of
     showing an intermediate frame. That's the likely source of the reported hit-or-miss
     jitter/stiffness, including on plain white space (ruling out any per-element cause).

     requestPaint()/requestDebug() (dbgUpdate() is kept as the external name, just redefined)
     replace that with two sticky flags serviced by a single shared requestAnimationFrame
     callback, so no matter how many raw events land in one frame, the actual layout-forcing
     read (clampPan) and the actual visual write (the transform / the debug text) each happen
     at most once per frame. Both the pinch path (zoomAt, called from globalPinch()) and the
     plain click-drag pan path funnel through requestPaint(), so they now share one scheduler.

     engage()/disengage() deliberately do NOT go through this — they're rare, one-time layout
     transitions (not per-event steady-state work) and disengage() in particular needs its
     final state visible immediately, not a frame later. */
  let needsPaint = false, needsDebug = false, rafScheduled = false;
  function scheduleFrame(){
    if(rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(frameTick);
  }
  /* TEMP DIAGNOSTIC (jd1): low-threshold jump recorder for the pinch -- who shifted the page, input stalls, midpoint jumps */
  const jdTrail = []; let jdT0 = 0, jdLastFrame = 0, jdLastCx = NaN, jdLastCy = NaN, jdLastZT = 0;
  const jd = m=>{ jdTrail.push(((performance.now() - jdT0) / 1000).toFixed(2) + 's ' + m); if(jdTrail.length > 8) jdTrail.shift(); needsDebug = true; };
  window.PZ_JD = jd;
  window.addEventListener('scroll', ()=>{ if(active) jd(`window scroll event -> (${scrollX.toFixed(0)},${scrollY.toFixed(0)})`); }, {passive:true});
  if(window.visualViewport){ ['resize','scroll'].forEach(t=>window.visualViewport.addEventListener(t, ()=>{ if(active){ const v = window.visualViewport; jd(`vv ${t}: scale=${v.scale.toFixed(2)} off=(${v.offsetLeft.toFixed(0)},${v.offsetTop.toFixed(0)}) h=${v.height.toFixed(0)}`); } })); }
  let lastPaintTx = 0, lastPaintTy = 0, tySrc = '?';   /* TEMP DIAGNOSTIC: who last moved the page, and big per-frame jumps */
  function frameTick(){
    rafScheduled = false;
    if(needsPaint){
      needsPaint = false;
      const _btx = tx, _bty = ty;
      clampPan();
      { const _n = performance.now();
        if(active && jdLastFrame && _n - jdLastFrame > 45) jd(`INPUT/PAINT GAP ${Math.round(_n - jdLastFrame)}ms (k=${k.toFixed(2)})`);
        jdLastFrame = _n;
        if(active && (Math.abs(_bty - ty) > 1.5 || Math.abs(_btx - tx) > 1.5)) jd(`CLAMP shifted ty ${(ty - _bty).toFixed(1)} tx ${(tx - _btx).toFixed(1)} k=${k.toFixed(2)} writer=${tySrc}`); }
      if(Math.abs(_bty - ty) > 40 || Math.abs(_btx - tx) > 40) evLog(`CLAMP moved ty ${_bty.toFixed(0)}->${ty.toFixed(0)} tx ${_btx.toFixed(0)}->${tx.toFixed(0)} (docH=${wrap.scrollHeight} k=${k.toFixed(2)})`);
      if(active && (Math.abs(ty - lastPaintTy) > 150 || Math.abs(tx - lastPaintTx) > 150)) evLog(`TY/TX JUMP in one frame: ty ${lastPaintTy.toFixed(0)}->${ty.toFixed(0)} tx ${lastPaintTx.toFixed(0)}->${tx.toFixed(0)} k=${k.toFixed(2)} last writer=${tySrc}`);
      lastPaintTx = tx; lastPaintTy = ty;
      applyTransformNow();
    }
    if(needsDebug){
      needsDebug = false;
      renderDebug();
    }
  }
  function requestPaint(){ needsPaint = true; scheduleFrame(); }
  function renderDebug(){
    /* TEMP DIAGNOSTIC (2026-10, preview-only): the last three lines exist to tell a JS-side lost
       write apart from a compositor/presentation problem when the readout says zoomed but the
       screen shows normal size. Remove with the frame-timing probe. */
    const actualT = layer.style.transform;
    const compT = getComputedStyle(layer).transform;
    /* numeric, not string, comparison: the browser re-serialises numbers (rounds digits), so a
       string compare reports false mismatches. Computed matrix is (k,0,0,k,tx*k,ty*k). */
    let matches;
    if(!active) matches = (compT === 'none');
    else {
      const m = (compT.match(/-?[\d.]+(?:e-?\d+)?/g) || []).map(Number);
      matches = m.length === 6 && Math.abs(m[0] - k) < 0.01 && Math.abs(m[4] - tx * k) < 1 && Math.abs(m[5] - ty * k) < 1;
    }
    const lr = layer.getBoundingClientRect();
    dbg.textContent = `zoom ${k.toFixed(2)}x · ${active ? 'CONTROLLED' : 'native'}\n`
      + `tx=${tx.toFixed(1)}  ty=${ty.toFixed(1)}\n`
      + `window.scrollX=${window.scrollX}  scrollY=${window.scrollY}\n`
      + `ctrl-wheel ticks: ${ctrlTicks}  plain-wheel ticks: ${plainTicks}\n`
      + `last wheel: ${lastWheel}\n`
      + `last drag: ${lastDrag}\n`
      + `style.transform: ${actualT || '(empty)'}  ${matches ? 'MATCHES state' : 'MISMATCH vs state'}\n`
      + `computed: ${compT}  pz.pos=${getComputedStyle(pz).position}\n`
      + `layer w measured=${lr.width.toFixed(0)} expected=${(layer.offsetWidth * (active ? k : 1)).toFixed(0)}  paintPending=${needsPaint}`;
    dbg2.textContent = `VIEWPORT: ${vvSnap()}\n` + (evTrail.length ? evTrail.join('\n') + '\n' : '') + 'JUMP DIAG (jd1):\n' + (jdTrail.length ? jdTrail.join('\n') : '(none)') + '\n' + `PINCH DIAG  build=nat1  url-query="${location.search}${location.hash}"  ta-none-test=${window.__TA_NONE_TEST ? 'ON' : 'off'}`
      + ((window.PZ_PINCH_DIAG && window.PZ_PINCH_DIAG().tp) ? window.PZ_PINCH_DIAG().tp() : '')
      + pinchDiagText();
  }
  /* TEMP DIAGNOSTIC: the touch list globalPinch() is holding, its recent touch events, and what
     the zoom engine was last asked for. A finger the browser has lifted but the list still holds
     (a "ghost") shows up here as pts larger than the number of fingers actually on the glass. */
  function pinchDiagText(){
    const d = window.PZ_PINCH_DIAG ? window.PZ_PINCH_DIAG() : null;
    if(!d) return '';
    return `\n${window.__TA_NONE_TEST ? '*** ?ta=none TEST ACTIVE ***\n' : ''}CANCELS=${d.cnt.cancel} (landed w/ native pan allowed=${d.cnt.cancelPan}, none=${d.cnt.cancelNone})  ups=${d.cnt.up}  touchcancel=${d.cnt.tcancel}`
      + `\npts=${d.n} ids=[${d.ids.join(',')}]  pinch d0=${d.d0} d=${d.d} wantK=${d.want}  moves=${d.moves}`
      + `\nzoomAt calls=${zCalls} lastReq=${zReq.toFixed(2)}${zSame ? ' (clamped/no change)' : ''} k=${k.toFixed(2)}`
      + (d.trace.length ? '\n' + d.trace.join('\n') : '');
  }
  window.PZ_DBG = ()=>{ needsDebug = true; scheduleFrame(); };   /* TEMP DIAGNOSTIC: lets globalPinch() refresh the readout */
  /* Kept as the name every existing call site already uses -- now a cheap flag-set instead of
     an immediate string build + DOM write. Per-event callers (the wheel/drag handlers below)
     need no changes beyond this redefinition to stop hammering the DOM on every tick. */
  function dbgUpdate(){ needsDebug = true; scheduleFrame(); }

  /* The immediate, unbatched transform write -- used directly by disengage() (a rare,
     synchronous gesture-end transition that must be visible instantly, not deferred a frame)
     and by frameTick() above (the batched steady-state path). Never call this directly from a
     per-event handler; call requestPaint() instead. */
  function applyTransformNow(){ layer.style.transform = active ? `scale(${k}) translate(${tx}px, ${ty}px)` : ''; }
  /* Bounds tx/ty to where the content actually has room to go — it must never FORCE a
     value, only constrain one already set by engage()/zoomAt()/a drag. The previous
     version re-centered tx/ty the instant content was narrower than the viewport at the
     current zoom (cw*k <= vw), which is almost always true the moment a zoom gesture
     starts (k is barely above 1, so cw*k ≈ cw ≈ vw). That silently overwrote the
     scroll-preserving tx/ty engage() had just set, with a centering offset that has
     nothing to do with where the reader actually was — a visible jump on literally the
     first zoom tick, which is the "content shifts right, blank strip opens on the left"
     bug. Pinning to 0 when there's no room to pan is the correct no-op here: scrollX/
     scrollY can only have been nonzero in the first place if there WAS real overflow to
     scroll, so if there isn't any at this zoom level, 0 is also what engage() would have
     captured. */
  /* The previous version of this still pinned tx/ty to a single forced value — 0 — any
     time content was narrower than the room available at the current zoom (vw/k - cw
     positive), which collapses BOTH the min and max bound to the same point and discards
     whatever tx the zoom-to-pointer math in zoomAt() had just computed. That's a second
     instance of the same bug class as the centering one: real-world content is routinely
     narrower than vw/k right after a small zoom-in tick (k is barely above 1), so this
     fired almost every time, snapping a correctly zoom-anchored tx back to 0 and
     producing exactly the "jumps/shifts right" symptom — confirmed by tracking one
     specific DOM node's screen position across a single zoom tick: vertically it stayed
     put (that axis wasn't hitting this), horizontally it jumped ~26px even though the
     zoom was centered on it.

     The actual requirement is much more permissive than "pin to a resting position": tx/
     ty should only be stopped from pushing the content fully off one edge of the screen —
     never forced toward any particular value otherwise. Content's left edge is at tx*k;
     it must stay <= vw (not pushed past the right edge) and its right edge, (cw+tx)*k,
     must stay >= 0 (not pushed past the left edge) — giving tx ∈ [-cw, vw/k]. Same logic
     for ty. This bounds runaway panning without ever overriding a value zoomAt() or a
     drag legitimately set. */
  function clampPan(){
    const vw = window.innerWidth, vh = window.innerHeight;
    const cw = wrap.scrollWidth, ch = wrap.scrollHeight;
    tx = Math.min(vw / k, Math.max(-cw, tx));
    ty = Math.min(vh / k, Math.max(-ch, ty));
  }
  /* ===== TEMP DIAGNOSTIC, preview-only -- remove after the frame-timing investigation (2026-10)
     =====
     Tests the "GPU layer-promotion flash" theory for the still-reported first-pinch jump: the
     pre-engage timing fix made the JS-side state (position/transform) provably correct before
     any finger movement, but the on-device jump persisted anyway -- which points at something
     the DOM/style state can't show: the browser doing one-time compositing-layer setup work
     the first time #pagezoom gets position:fixed + a transform, independent of how correct
     that transform's VALUE is. This does nothing but measure: for every engage() this page
     load, it times ~600ms of animation frames afterward and reports the slowest one, so a
     distinct one-time stall at/near the first engage (and not at later ones) would support the
     theory; no stall anywhere would argue against it. Zero effect on zoom/pan behavior. */
  let engageCount = 0;
  const frameTimingLog = [];
  const ftOverlay = document.createElement('div');
  ftOverlay.id = 'frametiming';
  ftOverlay.style.cssText = 'position:fixed;bottom:4px;left:50%;transform:translateX(-50%);z-index:99999;'
    + 'background:rgba(0,70,0,.82);color:#fff;font:10px/1.4 monospace;padding:5px 8px;'
    + 'border-radius:4px;pointer-events:none;white-space:pre;max-width:360px';
  document.body.appendChild(ftOverlay);
  function renderFrameTimingOverlay(){
    ftOverlay.textContent = 'FRAME TIMING PROBE (temp, preview-only)\n' + frameTimingLog.join('\n');
  }
  renderFrameTimingOverlay();
  function startFrameTimingProbe(){
    engageCount++;
    const engageN = engageCount;
    const startedAt = performance.now();
    let lastFrameAt = startedAt;
    const frames = [];
    const SAMPLE_MS = 600;
    function tick(now){
      const delta = now - lastFrameAt;
      frames.push(delta);
      lastFrameAt = now;
      if(now - startedAt < SAMPLE_MS){
        requestAnimationFrame(tick);
      } else {
        const maxDelta = Math.max(...frames);
        const maxIdx = frames.indexOf(maxDelta);
        frameTimingLog.push(`engage #${engageN}: ${frames.length}f sampled, slowest=${maxDelta.toFixed(1)}ms @f#${maxIdx}`);
        if(frameTimingLog.length > 6) frameTimingLog.shift();
        renderFrameTimingOverlay();
      }
    }
    requestAnimationFrame(tick);
  }
  /* ===== end TEMP DIAGNOSTIC ===== */

  /* TEMP DIAGNOSTIC (2026-10, preview-only; remove with the other readouts): "the docked windows
     sometimes vanish after zooming" and "the page jumps to the top when I touch / when I lift after
     zooming out". Both could be the app's own engage()/disengage() mis-reading scroll, OR Safari's
     native visual viewport having been scaled/panned underneath us (fixed-position things such as
     the dock are anchored to the LAYOUT viewport, so a panned/scaled visual viewport leaves them
     off-screen even though the app thinks k=1). vvSnap() records both sides at every engage /
     disengage and whenever the visual viewport leaves/returns to scale 1, shown in #pinchdiag. */
  const vvSnap = ()=>{ const v = window.visualViewport; if(!v) return 'no visualViewport';
    return `vv.scale=${v.scale.toFixed(3)} off=(${v.offsetLeft.toFixed(0)},${v.offsetTop.toFixed(0)}) page=(${v.pageLeft.toFixed(0)},${v.pageTop.toFixed(0)}) ${v.width.toFixed(0)}x${v.height.toFixed(0)} inner=${innerWidth}x${innerHeight} scroll=(${scrollX.toFixed(0)},${scrollY.toFixed(0)}) docW=${document.documentElement.scrollWidth}`; };
  const evTrail = []; let lastGoodY = 0, lastGoodX = 0, nativeZoomOn = false;
  const evLog = m=>{ evTrail.push(((performance.now()/1000)|0) + 's ' + m); if(evTrail.length > 5) evTrail.shift(); needsDebug = true; scheduleFrame(); };
  window.addEventListener('scroll', ()=>{ if(!active){ lastGoodY = scrollY; lastGoodX = scrollX; } }, {passive:true});
  if(window.visualViewport){
    const vchk = ()=>{ const v = window.visualViewport, on = v.scale > 1.001 || Math.abs(v.offsetLeft) > 1;
      if(on !== nativeZoomOn){ nativeZoomOn = on; evLog(`VISUAL VIEWPORT ${on ? 'LEFT' : 'BACK TO'} NORMAL  ` + vvSnap()); }
      needsDebug = true; scheduleFrame(); };
    window.visualViewport.addEventListener('resize', vchk); window.visualViewport.addEventListener('scroll', vchk);
  }
  window.PZ_VVSNAP = vvSnap; window.PZ_EVTRAIL = ()=>evTrail;

  let pzSpacer = null;
  function engage(){
    startFrameTimingProbe();  /* TEMP DIAGNOSTIC -- see block above */
    const _b = vvSnap(), _y = scrollY, _x = scrollX;
    /* Keep the document's scrollable size unchanged while zoom mode is on. Switching #pagezoom to
       position:fixed takes the whole page out of flow, so the document collapses to one screen
       tall; Safari then resets scrollY to 0 but leaves the visual viewport where it was, and for a
       few frames the two disagree (device log: vvOffTop = -scrollY right after engage, first pinch
       update garbage -> the visible jump, growing with scroll depth). The spacer is added BEFORE the
       layout switch so there is never a collapsed frame, and removed in disengage(). */
    if(!pzSpacer){
      pzSpacer = document.createElement('div');
      pzSpacer.id = 'pzspacer'; pzSpacer.setAttribute('aria-hidden', 'true');
      pzSpacer.style.cssText = 'position:absolute;top:0;left:0;visibility:hidden;pointer-events:none;'
        + `width:${document.documentElement.scrollWidth}px;height:${document.documentElement.scrollHeight}px`;
      document.body.appendChild(pzSpacer);
    }
    active = true;
    tx = -window.scrollX; ty = -window.scrollY; lastPaintTx = tx; lastPaintTy = ty;
    pz.style.position = 'fixed'; pz.style.inset = '0'; pz.style.overflow = 'hidden';
    document.documentElement.classList.add('pz-active');
    evLog(`ENGAGE read scroll=(${_x.toFixed(0)},${_y.toFixed(0)}) lastKnownGood=(${lastGoodX.toFixed(0)},${lastGoodY.toFixed(0)})${Math.abs(_y - lastGoodY) > 40 ? '  <<< SCROLL READ DIFFERS' : ''} -> tx=${tx.toFixed(0)} ty=${ty.toFixed(0)} | ` + _b);
  }
  function disengage(){
    const _tx = tx, _ty = ty, _k = k;
    const _who = (new Error().stack || '').split('\n').filter(l=>!/^Error/.test(l)).slice(0, 4).map(l=>l.trim().replace(/^at\s+/, '').replace(/\(?https?:[^)\s]*\/([^/)\s]*)\)?/, '$1').slice(0, 44)).join(' < ');
    active = false;
    const gx = Math.max(0, -tx), gy = Math.max(0, -ty);
    pz.style.position = ''; pz.style.inset = ''; pz.style.overflow = '';
    k = 1; tx = 0; ty = 0;
    document.documentElement.classList.remove('pz-active');
    /* Cancel any paint still pending from the instant before this transition -- it would
       otherwise run on the NEXT frame and reapply stale pre-disengage k/tx/ty on top of the
       reset just done above. disengage() always wants its own state visible immediately. */
    needsPaint = false;
    applyTransformNow();
    if(pzSpacer){ pzSpacer.remove(); pzSpacer = null; }
    window.scrollTo(gx, gy);
    evLog(`DISENGAGE by[${_who}] k=${_k.toFixed(2)} tx=${_tx.toFixed(0)} ty=${_ty.toFixed(0)} -> scrollTo(${gx.toFixed(0)},${gy.toFixed(0)}) landed=(${scrollX.toFixed(0)},${scrollY.toFixed(0)})${Math.abs(scrollY - gy) > 20 ? '  <<< DID NOT LAND' : ''} | ` + vvSnap());
  }
  function zoomAt(nextK, cx, cy){
    if(nativeMode) return;   /* browser's own zoom is on: never stack ours on top (see nativeMode below) */
    zCalls++; zReq = nextK; tySrc = `zoomAt(k=${nextK.toFixed(2)}, cx=${cx.toFixed(0)}, cy=${cy.toFixed(0)})`;   /* TEMP DIAGNOSTIC */
    { const _n = performance.now();
      if(active && jdLastZT && _n - jdLastZT < 400 && Math.hypot(cx - jdLastCx, cy - jdLastCy) > 20) jd(`MIDPOINT JUMP ${Math.round(Math.hypot(cx - jdLastCx, cy - jdLastCy))}px (${jdLastCx.toFixed(0)},${jdLastCy.toFixed(0)})->(${cx.toFixed(0)},${cy.toFixed(0)}) k=${k.toFixed(2)}->${nextK.toFixed(2)}`);
      jdLastCx = cx; jdLastCy = cy; jdLastZT = _n; }
    nextK = Math.min(K_MAX, Math.max(K_MIN, nextK));
    zSame = (nextK === k);                        /* TEMP DIAGNOSTIC */
    if(nextK === k) return;
    if(!active && nextK > K_MIN) engage();
    const localX = cx / k - tx, localY = cy / k - ty;
    k = nextK;
    tx = cx / k - localX; ty = cy / k - localY;
    requestPaint();
    if(active && k <= K_MIN) disengage();
  }

  /* 2026-10: first-touch-pinch-after-refresh jitter fix. engage() (above) switches layout mode
     synchronously (position:fixed etc.) but, since the rAF batching pass, the compensating
     transform that makes that switch invisible is no longer written in the same tick -- it
     lands on the next animation frame via requestPaint()/frameTick(). For a touch pinch, that
     one-frame gap between "layout changed" and "transform corrected" is visible, but only on
     the FIRST pinch after load: that's the only time a gesture crosses from !active to active.
     A two-finger touch always has a pointerdown moment before any pointermove -- globalPinch()
     (near the end of this file) calls preEngage() there, so the layout switch AND its
     compensating transform both happen synchronously, before the gesture has moved at all and
     while there is nothing on screen changing yet. By the time the first real pointermove
     reaches zoomAt() above, active is already true, so its own `if(!active ...) engage()`
     branch is simply skipped for touch -- that branch stays exactly as it was for the trackpad
     ctrl-wheel path, which has no pointerdown-before-gesture moment to pre-engage at. */
  function preEngage(){
    if(active || nativeMode) return;
    /* TEMP DIAGNOSTIC: where does the small jump at the start of a pinch come from? Follow one element
       near screen centre through the engage -> first frames timeline and log how far it drifts while
       k is still ~1 (any drift then is a layout/viewport jump, not zoom). */
    const _ref = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
    const _vv = window.visualViewport, _r0 = _ref ? _ref.getBoundingClientRect().top : NaN;
    const _snap = tag=>{ const t = _ref ? _ref.getBoundingClientRect().top : NaN;
      return `${tag} drift=${(t - _r0).toFixed(1)}px k=${k.toFixed(2)} vvH=${_vv ? _vv.height.toFixed(0) : '?'} vvOffTop=${_vv ? _vv.offsetTop.toFixed(0) : '?'} innerH=${innerHeight}`; };
    const _pre = _snap('before');
    jdT0 = performance.now(); jdTrail.length = 0; jdLastFrame = 0; jdLastZT = 0; jd('pre-engage (2nd finger down)');
    engage();
    applyTransformNow();
    const _out = [_pre, _snap('sync after engage')];
    [16, 50, 100, 200, 400].forEach((ms, i, arr)=>setTimeout(()=>{ _out.push(_snap('+' + ms + 'ms')); if(i === arr.length - 1) evLog('PINCH-START DRIFT: ' + _out.join(' | ')); }, ms));   /* k is still K_MIN (1) here, so this is a pure re-parenting: the
       resulting scale(1) translate(-scrollX,-scrollY) looks pixel-identical to the normal
       scrolled document it replaces -- nothing moves. Doing it synchronously, in the same
       tick as engage()'s position switch, means there is no frame where the layout has
       already changed but the compensating transform hasn't been written yet. */
  }
  /* Paired cleanup for a two-finger touch that lands (triggering preEngage() above) and lifts
     without ever actually pinching -- a tap, or fingers that never moved apart/together enough
     to change k. Without this, the page would be left stuck in the fixed-position/"active"
     layout mode at k=1 indefinitely, never returning to normal document flow. Safe to call any
     time: a no-op whenever a real zoom is in progress (k > K_MIN) or the page was never
     engaged at all. */
  function disengageIfAtRest(){
    if(active && k <= K_MIN) disengage();
  }
  window.PZ_PRE_ENGAGE = preEngage;
  window.PZ_DISENGAGE_IF_AT_REST = disengageIfAtRest;

  dbgUpdate();

  /* trackpad pinch / Ctrl+scroll: our zoom, not the browser's */
  window.addEventListener('wheel', e=>{
    lastWheel = `ctrlKey=${e.ctrlKey} deltaX=${e.deltaX.toFixed(1)} deltaY=${e.deltaY.toFixed(1)} deltaMode=${e.deltaMode}`;
    if(!e.ctrlKey){ dbgUpdate(); return; }
    ctrlTicks++; try{ if(window.PZ_GESTURE && window.PZ_GESTURE().on) window.PZ_GESTURE().wheelDuring++; }catch(_){}
    if(e.target && e.target.closest && e.target.closest('.fwview')){ dbgUpdate(); return; } /* the framework canvas owns its own pinch */
    if(nativeMode){ dbgUpdate(); return; }   /* browser zoom is on: let it zoom back out natively */
    e.preventDefault();
    zoomAt(k * (e.deltaY < 0 ? 1.08 : 1 / 1.08), e.clientX, e.clientY);
    dbgUpdate();
  }, {passive:false});

  /* an ordinary two-finger scroll, once zoomed in, pans — #pagezoom is fixed/non-scrolling
     in that state, so without this the only way to move would be click-drag.

     THE ROOT CAUSE of "navigation keeps getting interrupted whenever the cursor passes
     over a term or button": this used to check the same broad DRAG_SKIP list that guards
     where a click-drag may start (button,a,input,…,.term,…) — reasonable for a drag,
     where starting on a term should let it be clicked/selected instead of hijacked into a
     pan, but wrong here. A wheel event does not click or select anything, so there was
     nothing to protect; the broad check just made every wheel tick whose target happened
     to be a term or a button a silent no-op — no pan, no preventDefault, nothing — while
     every tick whose target was plain text panned normally. In real continuous scrolling
     across a page that is mostly defined terms and buttons, the cursor crosses one on a
     meaningful fraction of ticks, which reads exactly as "navigation keeps grabbing me":
     the page visibly sticks for an instant on every single term or button it slides past,
     over and over. WHEEL_SKIP is the fix — it only excludes the few elements with their
     own independent pan/scroll surface this must not fight with (the framework canvas,
     the dock); everything else, term and button included, now pans like plain text always
     did. An inner panel with its own real scrollable overflow is still deferred to by the
     scrollAncestor check right below, unchanged. */
  window.addEventListener('wheel', e=>{
    if(e.ctrlKey) return;
    plainTicks++;
    if(!active){ dbgUpdate(); return; }
    if(e.target && e.target.closest && e.target.closest(WHEEL_SKIP)){ dbgUpdate(); return; }
    if(scrollAncestor(e.target, 'x') || scrollAncestor(e.target, 'y')){ dbgUpdate(); return; } /* an inner panel's own scrollbar handles it */
    e.preventDefault(); tySrc = 'wheel';
    tx -= e.deltaX / k; ty -= e.deltaY / k;
    requestPaint();
    dbgUpdate();
  }, {passive:false});

  /* 2026-10 Safari GESTURE events (input hand-off fix). Safari -- Mac trackpad, iPad trackpad, and any touch
     pinch that slips past touch-action -- zooms the page itself and reports it ONLY as gesturestart /
     gesturechange / gestureend (e.scale is cumulative since gesturestart), never as ctrl+wheel. That is a second,
     separate zoom the engine could not see: everything incl. the fixed popups scaled together and our own zoom was
     bypassed. preventDefault() on these events is what stops Safari's own zoom, and we then drive the SAME engine
     (zoomAt) from e.scale, anchored at the cursor. A touch pinch that the pointer/touch paths already own
     (PZ_PINCHING) is only prevented, never double-driven. The framework canvas keeps owning its pinch: native zoom
     is still blocked over it, the page just isn't zoomed. */
  const GE = {start:0, change:0, end:0, drove:0, ignored:0, over:0, scale:0, maxScale:0, minScale:99, xy:'-', kReq:0, wheelDuring:0, firstScale:0, nativeXY:'-'};
  window.PZ_GESTURE = ()=>GE;
  Object.defineProperty(GE, 'on', {get:()=>geOn, enumerable:false});
  let geK0 = 1, geOn = false, geLast = null;
  document.addEventListener('pointermove', e=>{ if(e.pointerType !== 'touch') geLast = {x:e.clientX, y:e.clientY}; }, {capture:true, passive:true});
  const geXY = e=>{
    if(Number.isFinite(e.clientX) && Number.isFinite(e.clientY) && (e.clientX || e.clientY)) return {x:e.clientX, y:e.clientY};
    return geLast || {x:innerWidth / 2, y:innerHeight / 2};
  };
  const gePinching = ()=>!!(window.PZ_PINCHING && window.PZ_PINCHING());
  document.addEventListener('gesturestart', e=>{
    GE.start++; GE.change = 0; GE.firstScale = 0; GE.maxScale = 0; GE.minScale = 99;
    if(nativeMode){ geOn = false; return; }   /* browser zoom is on: leave its gestures alone so it can zoom back out */
    e.preventDefault();
    if(e.target && e.target.closest && e.target.closest('.fwview')){ geOn = false; GE.over++; return; }
    geK0 = k; geOn = true;
  }, {passive:false});
  document.addEventListener('gesturechange', e=>{
    GE.change++;
    if(nativeMode) return;
    e.preventDefault();
    if(!geOn) return;
    if(gePinching()){ GE.ignored++; return; }
    const p = geXY(e);
    if(GE.change === 1 || !GE.firstScale) GE.firstScale = e.scale;
    GE.scale = e.scale; GE.maxScale = Math.max(GE.maxScale, e.scale); GE.minScale = Math.min(GE.minScale, e.scale); GE.kReq = geK0 * e.scale;
    GE.nativeXY = `${e.clientX},${e.clientY}`; GE.xy = `${Math.round(p.x)},${Math.round(p.y)}`;
    if(!active && geK0 * e.scale > K_MIN && window.PZ_PRE_ENGAGE) window.PZ_PRE_ENGAGE();
    zoomAt(geK0 * e.scale, p.x, p.y); GE.drove++;
    dbgUpdate();
  }, {passive:false});
  const geEnd = e=>{ GE.end++; if(nativeMode) return; e.preventDefault(); geOn = false; if(!gePinching()) disengageIfAtRest(); };
  document.addEventListener('gestureend', geEnd, {passive:false});

  /* 2026-10 NATIVE-ZOOM MODE. Device logs (iPad, trackpad pinch) showed Safari zooming the page itself with NO event
     reaching the page at all (no wheel, no gesture events -- only visualViewport.scale changing), after which a touch
     pinch engaged OUR zoom on top of it: the two stacked ("hyper zoom"), and every engage landed with a jump equal to
     visualViewport.offsetTop (drift -206.9px vs offset 207; -73.3 vs 73; -229.0 vs 229). The two zooms cannot be
     stacked safely, so whenever the browser's own zoom is on we stand down completely: html.nativeZoom restores
     touch-action:auto (see shell.css) so ANY input -- trackpad or fingers -- can pinch it back out natively; our wheel,
     gesture and pinch paths no-op. When visualViewport.scale returns to 1 we take over again. If native zoom shows up
     while our zoom is engaged, ours is dropped back to 1.0 first so there is only ever one. */
  let nativeMode = false;
  const nvv = window.visualViewport;
  function setNative(on){
    if(on === nativeMode) return;
    nativeMode = on; window.PZ_NATIVE = on;
    document.documentElement.classList.toggle('nativeZoom', on);
    needsDebug = true; scheduleFrame();
  }
  function nativeCheck(){
    if(!nvv) return;
    const sc = nvv.scale, pinching = !!(window.PZ_PINCHING && window.PZ_PINCHING());
    if(!nativeMode && sc > 1.03 && !pinching){
      if(active){ nativeMode = false; zoomAt(K_MIN, innerWidth / 2, innerHeight / 2); }   /* drop OUR zoom first */
      setNative(true);
    } else if(nativeMode && sc < 1.012) setNative(false);
  }
  if(nvv){ nvv.addEventListener('resize', nativeCheck); nvv.addEventListener('scroll', nativeCheck); setInterval(nativeCheck, 250); }
  window.PZ_NATIVE = false;

  /* click-drag empty space to pan */
  let pend = null;
  /* Swallows the one click a browser would deliver at the end of a touch drag that started on a
     term/button (see TOUCH_SLOP above) -- otherwise panning from a button would also press it
     when the finger lifts. Capture phase on document, so it runs before any element's own click
     handler. One-shot, and also expires on its own (see end() below), so it can never eat a
     later, genuine tap. */
  document.addEventListener('click', e=>{
    if(!swallowClick) return;
    swallowClick = false; clearTimeout(swallowTimer);
    e.preventDefault(); e.stopImmediatePropagation();
  }, true);
  document.addEventListener('pointerdown', e=>{
    swallowClick = false; clearTimeout(swallowTimer);   /* a new gesture: any earlier drag's click is long gone */
    if(e.button !== 0) return;
    /* A two-finger touch pinch (globalPinch(), near the end of this file) must always own a
       gesture over a single-finger pan that happened to be starting at the same moment.
       globalPinch() calls window.PZ_CANCEL_PAN() at the capture phase the instant its second
       touch pointer arrives -- BEFORE this bubble-phase listener runs for that same event --
       so this check is the second line of defense, for a pointerdown that lands fractionally
       after the pair was already complete. */
    if(window.PZ_PINCHING && window.PZ_PINCHING()) return;
    /* A finger on interactive content/text while zoomed is let through by distance, not refused
       outright (see TOUCH_SLOP above); everything else keeps the original pannable() decision. */
    const legacyOK = pannable(e.target, e.clientX, e.clientY);
    const touchOwned = !legacyOK && e.pointerType === 'touch' && active && touchPannable(e.target);
    if(!legacyOK && !touchOwned){
      lastDrag = `BLOCKED at (${e.clientX},${e.clientY}) target=${e.target.tagName}.${String(e.target.className||'').slice(0,30)}`;
      dbgUpdate();
      return;
    }
    const xEl = scrollAncestor(e.target, 'x'), yEl = scrollAncestor(e.target, 'y');
    lastDrag = `down (${e.clientX},${e.clientY}) target=${e.target.tagName} xEl=${xEl ? xEl.tagName + '.' + String(xEl.className||'').slice(0,20) : 'none'} yEl=${yEl ? yEl.tagName + '.' + String(yEl.className||'').slice(0,20) : 'none'} active=${active}`;
    dbgUpdate();
    pend = {
      id: e.pointerId, x:e.clientX, y:e.clientY, started:false, xEl, yEl,
      sl: xEl ? xEl.scrollLeft : window.scrollX,
      st: yEl ? yEl.scrollTop  : window.scrollY,
      tx0: tx, ty0: ty,
      touch: e.pointerType === 'touch', samples: [{t:e.timeStamp, x:e.clientX, y:e.clientY}],
      slop: touchOwned ? TOUCH_SLOP : 4,   /* only the newly-allowed touch case gets the wider tap slop */
      swallow: touchOwned                  /* ...and only it needs the end-of-drag click swallowed */
    };
  });
  document.addEventListener('pointermove', e=>{
    if(!pend) return;
    /* pointerId filter -- this listener is document-level with no pointer capture of its own,
       so without this it reacts to ANY pointer's movement while pend is set, not just the one
       that started this pan. A second touch pointer arriving mid-gesture (the start of a
       pinch) would otherwise feed its own coordinates into THIS gesture's dx/dy math against
       the first pointer's original down position -- a likely contributor to reported
       flicker/jitter when a pinch begins while a one-finger pan is already under way.
       globalPinch() already calls PZ_CANCEL_PAN() the instant a second touch pointer is
       detected (see the pointerdown comment above), which clears pend entirely before this
       could fire for the new pointer -- this filter is strictly a second line of defense, for
       any event ordering that check doesn't cover. */
    if(e.pointerId !== pend.id) return;
    const dx = e.clientX - pend.x, dy = e.clientY - pend.y;
    if(!pend.started){
      if(Math.hypot(dx, dy) < pend.slop) return;
      pend.started = true;
      if(pend.swallow) swallowClick = true;   /* this touch is now a pan, not a tap: no click at the end of it */
      document.documentElement.classList.add('panning');
    }
    if(window.NAV_MARK) window.NAV_MARK();   /* a click-drag pan has no wheel/scroll events of its own */
    e.preventDefault();
    if(pend.touch){                           /* release-glide velocity: keep only the last ~100ms */
      const sm = pend.samples; sm.push({t:e.timeStamp, x:e.clientX, y:e.clientY});
      while(sm.length > 2 && e.timeStamp - sm[0].t > 100) sm.shift();
    }
    if(pend.xEl) pend.xEl.scrollLeft = pend.sl - dx;
    if(pend.yEl) pend.yEl.scrollTop  = pend.st - dy;
    if(active){
      tySrc = `ONE-FINGER PAN pointer#${pend.id} dx=${dx.toFixed(0)} dy=${dy.toFixed(0)} ty0=${pend.ty0.toFixed(0)}`;
      if(!pend.xEl) tx = pend.tx0 + dx / k;
      if(!pend.yEl) ty = pend.ty0 + dy / k;
      requestPaint();
    } else {
      const wx = pend.xEl ? window.scrollX : pend.sl - dx;
      const wy = pend.yEl ? window.scrollY : pend.st - dy;
      if(wx !== window.scrollX || wy !== window.scrollY) window.scrollTo(wx, wy);
      dbgUpdate();
    }
    lastDrag = `move dx=${dx} dy=${dy} xEl=${pend.xEl ? 'yes' : 'no'} yEl=${pend.yEl ? 'yes' : 'no'}`;
  });
  /* pointercancel, not just pointerup, must clear pend. A touch that gets reinterpreted by the
     browser mid-gesture (a tap on blank background that the browser's own gesture recognizer
     decides isn't a drag, or any touch interrupted by another system taking over — e.g. the
     dock's floating-window drag starting immediately after) delivers pointercancel instead of
     pointerup. Without this, pend survives indefinitely as stale state: the next unrelated
     pointermove sequence anywhere on the page — including the dock's own floating-window drag,
     whose pointermove events bubble through this same document-level listener — gets treated as
     a continuation of that old, already-finished pan gesture using its stale baseline
     coordinates, moving the main page at the same time as whatever else is legitimately handling
     that gesture. This was confirmed from a real report: touch the background once (no drag
     started, so no pointerup/pointercancel distinction was visible), then drag a floating dock
     window — both the window AND the main page moved together. */
  const end = ()=>{
    if(pend && pend.started) document.documentElement.classList.remove('panning');
    pend = null;
    /* Whatever click the finished drag produces arrives right after pointerup; give it a short
       window to be swallowed, then stand down so no later tap is ever affected. */
    if(swallowClick){ clearTimeout(swallowTimer); swallowTimer = setTimeout(()=>{ swallowClick = false; }, 400); }
  };
  /* ---- release glide (touch, zoomed, one finger) --------------------------------------------
     At rest the browser scrolls natively and adds its own momentum; once zoomed the page is
     panned by this code, which used to stop dead the instant the finger lifted. On a clean
     pointerup of a touch pan, keep moving at the release velocity (last ~100ms of movement)
     and decay it the way iOS does (0.998 per ms). No glide if the finger rested >80ms before
     lifting, or if the release is slow. Cancelled by: any new pointerdown/wheel (a second
     finger = a pinch, a touch = catch), losing zoom, and each axis stops at its edge.
     pointercancel / blur / PZ_CANCEL_PAN never glide (they call end() directly). */
  let glide = null;
  function stopGlide(){ glide = null; }
  window.PZ_GLIDING = ()=> !!glide;
  function glideFrame(now){
    if(!glide) return;
    if(!active){ glide = null; return; }
    const dt = Math.min(48, now - glide.t); glide.t = now;
    const dec = Math.pow(0.998, dt);
    glide.vx *= dec; glide.vy *= dec;
    const ox = tx, oy = ty; tySrc = 'glide';
    if(glide.vx) tx += glide.vx * dt / k;
    if(glide.vy) ty += glide.vy * dt / k;
    const ix = tx, iy = ty;
    clampPan();
    if(tx !== ix) glide.vx = 0;                /* hit an edge: this axis stops, the other carries on */
    if(ty !== iy) glide.vy = 0;
    if(tx !== ox || ty !== oy){ applyTransformNow(); if(window.NAV_MARK) window.NAV_MARK(); }
    if(Math.hypot(glide.vx, glide.vy) < 0.02){ glide = null; return; }
    requestAnimationFrame(glideFrame);
  }
  function startGlide(e){
    if(!pend || !pend.started || !pend.touch || !active || e.pointerId !== pend.id) return;
    if(pend.xEl || pend.yEl) return;           /* an inner scroller is being driven, not the page */
    const sm = pend.samples; if(sm.length < 2) return;
    const last = sm[sm.length - 1], first = sm[0];
    if(e.timeStamp - last.t > 80) return;       /* paused before lifting: stay put */
    const span = last.t - first.t; if(span < 8) return;
    let vx = (last.x - first.x) / span, vy = (last.y - first.y) / span;
    const sp = Math.hypot(vx, vy); if(sp < 0.15) return;   /* slow drag: no fling */
    const cap = 6; if(sp > cap){ vx *= cap / sp; vy *= cap / sp; }
    glide = { vx, vy, t: performance.now() };
    requestAnimationFrame(glideFrame);
  }
  window.addEventListener('pointerup', startGlide);
  document.addEventListener('pointerdown', stopGlide, true);
  window.addEventListener('wheel', stopGlide, {capture:true, passive:true});
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
  window.addEventListener('blur', end);
  /* Exposed for globalPinch() (near the end of this file): lets it clear a provisional
     single-finger pan the instant a second touch pointer starts a pinch, without needing any
     access to pend itself. Functionally identical to what a pointerup/pointercancel/blur
     already does above -- this just gives another module a name to call it by. */
  window.PZ_CANCEL_PAN = end;

  /* a real, always-readable zoom state for other features to key off — starting with
     buildRailToggle's rawAuto() below, so the burger doesn't regress now that the old
     signals it relied on (innerWidth, devicePixelRatio, the raw gesture tally) are
     superseded by this for anyone using this zoom path */
  window.PZ = { get k(){ return k; }, get active(){ return active; }, get tx(){ return tx; }, get ty(){ return ty; }, get wrapScrollWidth(){ return wrap.scrollWidth; } };
  /* Exposed for globalPinch() (near the end of this file), the new two-finger touch-pinch
     handler: a direct alias for this engine's own internal zoomAt(), so a touch pinch drives
     the exact same k/tx/ty state and clamp/engage/disengage logic the trackpad ctrlKey-wheel
     path above already drives -- one zoom engine, two input sources, not two competing ones.
     (PZ_CANCEL_PAN, the other export globalPinch() uses, is set above, next to `end`.) */
  window.PZ_ZOOM_AT = zoomAt;
})();

/* ---------------- global two-finger touch pinch ----------------
   Replaces reliance on the browser's own native touch pinch-zoom, which is fundamentally
   incompatible with position:fixed UI chrome (the WebKit fixed-during-live-pinch desync
   documented at length in the project doc, Section 2f/4.9/4.13). The entire
   position:fixed<->position:absolute pinch-mode workaround previously in buildDock() --
   toPinchMode()/fromPinchMode(), the symmetric scale-based settle gate, the scrollend/
   debounce race, the blur/visibilitychange safety net, and the #pinchdebug overlay that went
   with it -- existed only to paper over that incompatibility, and has been removed outright
   as of this rebuild (Section 2n/4.16 in the project doc), not left dormant: it was triggered
   by raw touchstart, which fires regardless of touch-action, so leaving it in place would
   still run in parallel with this handler and immediately re-conflict with it.

   This drives the SAME pageZoom() state (k/tx/ty, via window.PZ_ZOOM_AT, an alias for that
   engine's own internal zoomAt()) already used by the trackpad ctrlKey-wheel path, using the
   exact two-pointer Pointer-Events shape already proven in fwBindZoom() above (pts: a
   Map<pointerId,{x,y}> of currently-down touch pointers; pinch: a {d,k} distance/zoom
   snapshot taken the instant the 2nd pointer arrives; each subsequent move recomputes the
   distance and scales k by the ratio). Floating windows need no special handling here at all:
   they are position:fixed children of document.body, entirely outside #pzlayer (the only
   element this transform ever touches), so they are structurally unaffected by this zoom
   regardless of where on the page the pinch happens to start -- exactly mirroring the
   already-working trackpad behavior Sid asked this to match (pinching over a floating window
   with a trackpad already just zooms the main page and leaves the window alone, for the same
   structural reason).

   OWNERSHIP, not just zoom math, is the point of this handler running where it does: all
   three listeners below are registered on `document` at the CAPTURE phase (the third
   addEventListener argument), which fires before any bubble-phase listener on that same node
   gets the event -- including both buildDock()'s own drag-start pointerdown handler and
   pageZoom()'s own pend-based pan-start pointerdown handler, which are both plain (bubble-
   phase) document listeners. That ordering guarantee is what lets the exact instant a second
   touch pointer arrives (a) cancel a provisional single-finger window drag
   (window.DOCK_CANCEL_DRAG) and (b) clear a provisional single-finger page pan
   (window.PZ_CANCEL_PAN) BEFORE either system's own bubble-phase pointerdown handler for that
   same second touch gets a chance to run and start a new drag/pan of its own for it. Both of
   those handlers also separately check window.PZ_PINCHING() themselves, as a second line of
   defense for a pointerdown that happens to arrive a tick after the pair was already
   complete, rather than depending solely on event-ordering within a single dispatch.

   .fwview is explicitly excluded, the same way pageZoom()'s own ctrlKey-wheel handler already
   defers to it for trackpad pinch: the framework tree canvas owns its own independent
   two-finger pinch via fwBindZoom() above, so a touch that starts there is left alone
   entirely rather than tracked here. */
(function globalPinch(){
  const pts = new Map();   // pointerId -> {x,y}, every touch pointer currently down
  let pinch = null;        // {d,k}: distance and PZ.k snapshot at the instant the pair formed

  /* ===== 2026-10 Option B hybrid handoff: Safari cancels the Pointer Events stream of a pinch that
     starts on a page whose effective touch-action still allows native pan, but keeps delivering
     Touch Events for the same fingers until they lift (confirmed on device: 47 touchmoves over
     1.4s after the pointercancel, finger distance still changing). So: the Pointer Events path stays
     primary; ONLY when a live pinch is cancelled do we snapshot {d,k} and keep driving the same zoom
     from two-finger touchmove distance/midpoint until a finger lifts. The snapshot is the ORIGINAL
     pinch start (same formula as the pointer path: k0 * d/d0), so there is no jump at the handoff.
     Never calls preventDefault (those touchmoves are non-cancelable once native pan owns them). */
  let handoff = null;      // {d,k} while a cancelled pinch is being continued from Touch Events
  const HO = {everArmed:false, armedAt:0, ptrMoves:0, kArm:1, moves:0, ended:''};
  function armHandoff(){
    handoff = {d: pinch.d, k: pinch.k};
    HO.everArmed = true; HO.armedAt = performance.now(); HO.ptrMoves = diagMoves;
    HO.kArm = window.PZ ? window.PZ.k : 1; HO.moves = 0; HO.ended = '';
  }
  function endHandoff(how){
    if(!handoff) return;
    handoff = null;
    HO.ended = how + '@+' + Math.round(performance.now() - HO.armedAt) + 'ms';
    /* same cleanup the pointer path does when a pinch ends: a barely-started pinch must not leave
       the page stuck in fixed/"active" layout; no-op when a real zoom is in progress. */
    if(window.PZ_DISENGAGE_IF_AT_REST) window.PZ_DISENGAGE_IF_AT_REST();
    if(window.PZ_DBG) window.PZ_DBG();
  }
  document.addEventListener('touchstart', e=>{ if(handoff && e.touches.length === 1) endHandoff('new-touch'); }, {capture:true, passive:true});
  document.addEventListener('touchmove', e=>{
    if(!handoff) return;
    if(e.touches.length < 2){ endHandoff('touchmove<2'); return; }
    const a = e.touches[0], b = e.touches[1];
    const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    if(handoff.d > 0 && window.PZ_ZOOM_AT){
      HO.moves++;
      window.PZ_ZOOM_AT(handoff.k * (d / handoff.d), (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
    }
    if(window.PZ_DBG) window.PZ_DBG();
  }, {capture:true, passive:true});
  const hoTouchEnd = e=>{ if(handoff && e.touches.length < 2) endHandoff(e.type); };
  document.addEventListener('touchend', hoTouchEnd, {capture:true, passive:true});
  document.addEventListener('touchcancel', hoTouchEnd, {capture:true, passive:true});
  /* safety net (see the §4.10 lesson in the engine doc): focus/visibility lost mid-gesture can deliver
     no touchend at all. */
  window.addEventListener('blur', ()=>endHandoff('blur'));
  document.addEventListener('visibilitychange', ()=>{ if(document.hidden) endHandoff('hidden'); });
  window.PZ_HANDOFF = ()=>({armed: !!handoff, ever: HO.everArmed, moves: HO.moves, ended: HO.ended});
  /* ===== end handoff ===== */

  /* ===== TEMP DIAGNOSTIC (2026-10, preview-only; remove with the #pzdebug readout lines) =====
     For the "pinch gets stuck from one spot until reload" report: records which element each
     finger landed on, every lift/cancel, and the live touch list -- so a ghost finger (held in
     `pts` after the browser already lifted it), a finger that landed on something unexpected
     (the dock, a slider), or a browser-sent pointercancel shows up on screen. Read-only: none of
     this changes what the handlers below do. */
  const diagT0 = performance.now();
  const diagTrace = [];
  let diagMoves = 0, diagD = 0, diagWant = 0;
  const diagDesc = el => {
    if(!el || !el.tagName) return '?';
    const c = (typeof el.className === 'string' && el.className) ? '.' + el.className.split(' ')[0] : '';
    return (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + c).slice(0, 22);
  };
  /* TEMP DIAGNOSTIC (touch-action at touch start): effective touch-action for a touch that lands on
     `el` = intersection of touch-action from el up through the nearest scroll container (inclusive);
     also the raw value on el itself. Letters: X=pan-x Y=pan-y Z=pinch-zoom; '-' = none. */
  const diagTA = el => {
    const toks = v => { v=(v||'auto').trim(); if(v==='none') return new Set(); if(v==='manipulation') return new Set(['x','y','z']);
      if(v==='auto') return new Set(['x','y','z']); const r=new Set(); if(/pan-x/.test(v)) r.add('x'); if(/pan-y/.test(v)) r.add('y');
      if(/pan-left|pan-right/.test(v)) r.add('x'); if(/pan-up|pan-down/.test(v)) r.add('y'); if(/pinch-zoom/.test(v)) r.add('z');
      if(/pan-[xy]/.test(v) && !/pinch-zoom/.test(v)) {} return r; };
    let eff = new Set(['x','y','z']), n = el, raw = '';
    while(n && n.nodeType === 1){
      const cs = getComputedStyle(n), t = toks(cs.touchAction);
      if(!raw) raw = cs.touchAction;
      eff = new Set([...eff].filter(c => t.has(c)));
      const ov = cs.overflowX + cs.overflowY;
      if(n === document.documentElement || /auto|scroll|hidden/.test(ov) && n !== document.body) break;
      n = n.parentElement;
    }
    const str = ['x','y','z'].map(c => eff.has(c) ? c.toUpperCase() : '').join('') || '-';
    return str + '(' + raw.replace(/pan-/g,'p').replace(/pinch-zoom/,'Z') + ')';
  };
  /* TEMP DIAGNOSTIC (URL switch, off by default): ?ta=none forces touch-action:none on the whole page so a
     pinch from rest starts with no native handling allowed. One-finger native scroll is intentionally broken
     under this switch -- it exists only to tell "native pan claims the touch" from "layout switch cancels it". */
  if(/[?&#]ta=none\b/.test(location.search + location.hash)){
    const st = document.createElement('style');
    st.textContent = 'html, html *{touch-action:none !important}';
    document.head.appendChild(st);
    window.__TA_NONE_TEST = true;
  }
  const diagInfo = new Map();   /* pointerId -> {t, ta, act} captured at touchstart */
  const diagCnt = {cancel:0, cancelPan:0, cancelNone:0, up:0, tcancel:0};
  function diagLog(s){
    diagTrace.push(((performance.now() - diagT0) / 1000).toFixed(1) + 's ' + s);
    if(diagTrace.length > 8) diagTrace.shift();
    if(window.PZ_DBG) window.PZ_DBG();
  }
  window.PZ_PINCH_DIAG = ()=>({
    n: pts.size, ids: [...pts.keys()], trace: diagTrace, moves: diagMoves, cnt: diagCnt, tp: tpText,
    d0: pinch ? Math.round(pinch.d) : '-', d: pinch ? Math.round(diagD) : '-', want: pinch ? diagWant.toFixed(2) : '-'
  });
  /* ===== end TEMP DIAGNOSTIC ===== */

  document.addEventListener('pointerdown', e=>{
    if(e.pointerType !== 'touch') return;
    if(e.target && e.target.closest && e.target.closest('.fwview')){ diagLog(`down#${e.pointerId} fwview (skipped)`); return; }   /* fwBindZoom owns this */
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    { const ta = diagTA(e.target), act = document.documentElement.classList.contains('pz-active');
      diagInfo.set(e.pointerId, {t: performance.now(), ta, act});
      diagLog(`down#${e.pointerId}${e.isPrimary ? '*' : ''} ${diagDesc(e.target)} ta=${ta} pz=${act ? 1 : 0} n=${pts.size}`); }
    if(pts.size === 2){
      const [a,b] = [...pts.values()];
      pinch = {d: Math.hypot(a.x-b.x, a.y-b.y), k: window.PZ ? window.PZ.k : 1};
      diagMoves = 0;
      /* Order matters: release any provisional single-pointer gesture FIRST, before either
         system's own bubble-phase pointerdown handler for this same event runs (capture
         fires top-down before bubble on the same node, so both calls below complete before
         pageZoom's/buildDock's own document pointerdown listeners see this event at all). */
      if(window.DOCK_CANCEL_DRAG) window.DOCK_CANCEL_DRAG();
      if(window.PZ_CANCEL_PAN) window.PZ_CANCEL_PAN();
      /* 2026-10: first-pinch jitter fix -- enter the active/fixed layout mode right here, at
         the instant the pair completes and before either finger has moved, instead of letting
         zoomAt() do it later mid-pointermove. See the preEngage() comment in pageZoom() above. */
      if(window.PZ_PRE_ENGAGE) window.PZ_PRE_ENGAGE();
    }
    /* A third (or later) finger landing mid-pinch is tracked (so lifting it back off still
       correctly leaves a live 2-pointer pinch) but never participates in the distance/
       midpoint math below, which only ever reads the first two values currently in the map. */
  }, {capture:true});

  document.addEventListener('pointermove', e=>{
    if(!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(!pinch || pts.size < 2) return;
    const [a,b] = [...pts.values()];
    const d = Math.hypot(a.x-b.x, a.y-b.y);
    /* Main-surface touch-action is pan-x pan-y (see shell.css), not none, because ordinary
       single-finger scrolling over text deliberately still relies on the browser's own native
       pan recognition (see pannable()/overGlyph() in pageZoom() above) -- so native 2-finger
       PANNING, unlike pinch-zoom/double-tap-zoom, is still a live, allowed gesture here. Once
       this code has decided a real 2-pointer PINCH is in progress, preventDefault() stops that
       native pan recognizer from also acting on the same two touches at the same time, which
       would otherwise fight with the zoom this is about to apply. This is the pinch-specific
       counterpart to e.preventDefault() in pageZoom()'s own wheel/pend handlers above -- same
       principle (claim the gesture explicitly once we've decided to own it), different input. */
    if(!window.PZ_NATIVE) e.preventDefault();
    diagMoves++; diagD = d; diagWant = pinch.d > 0 ? pinch.k * (d / pinch.d) : 0;   /* TEMP DIAGNOSTIC */
    if(window.PZ_DBG) window.PZ_DBG();                                                /* TEMP DIAGNOSTIC: keep the readout live during a pinch */
    if(pinch.d > 0 && window.PZ_ZOOM_AT) window.PZ_ZOOM_AT(pinch.k * (d/pinch.d), (a.x+b.x)/2, (a.y+b.y)/2);
  }, {capture:true});

  const up = e=>{
    const hadIt = pts.has(e.pointerId);                                               /* TEMP DIAGNOSTIC */
    pts.delete(e.pointerId);
    if(e.pointerType === 'touch'){   /* TEMP DIAGNOSTIC */
      const inf = diagInfo.get(e.pointerId), dt = inf ? Math.round(performance.now() - inf.t) : -1;
      if(e.type === 'pointercancel') tpOnPointerCancel();
      if(window.PZ_JD && window.PZ && window.PZ.active) window.PZ_JD(`${e.type} id#${e.pointerId} fingers left=${pts.size}`);
      if(e.type === 'pointercancel'){ diagCnt.cancel++; if(inf && /^[XY]/.test(inf.ta)) diagCnt.cancelPan++; else diagCnt.cancelNone++; } else diagCnt.up++;
      diagLog(`${e.type === 'pointercancel' ? 'CANCEL' : 'up'}#${e.pointerId} +${dt}ms mv=${diagMoves} ta@down=${inf ? inf.ta : '?'} pz@down=${inf ? (inf.act?1:0) : '?'} n=${pts.size}`);
      diagInfo.delete(e.pointerId);
    }
    if(pts.size < 2){
      /* Browser-cancelled live pinch -> continue it from Touch Events (see armHandoff above). Only a
         touch pointercancel while a pinch is live arms it; a normal lift, or a one-finger native
         scroll being cancelled, never does. */
      if(e.type === 'pointercancel' && e.pointerType === 'touch' && pinch && !handoff) armHandoff();
      pinch = null;
      /* A two-finger touch that landed (triggering PZ_PRE_ENGAGE above) and lifted without
         ever becoming a real pinch -- e.g. a two-finger tap -- must not leave the page stuck
         in the fixed-position/"active" layout mode. No-op if a real zoom is already in
         progress. */
      /* ...but never mid-handoff: the gesture is still going, endHandoff() does this when it truly ends. */
      if(!handoff && window.PZ_DISENGAGE_IF_AT_REST) window.PZ_DISENGAGE_IF_AT_REST();
    }
  };
  /* ===== TEMP DIAGNOSTIC (Option B probe, 2026-10, preview-only, READ-ONLY) =====
     Question: after the browser cancels the Pointer Events stream (pointercancel), do Touch Events
     (touchstart/move/end/cancel) keep arriving for the same fingers, and for how long?
     Passive listeners only. Nothing here calls preventDefault() or drives zoom. */
  const TP = {ts:0, tm:0, te:0, tc:0, touches:0, d2:0, cancelable:'-', cur:null, done:[]};
  const tpNow = () => performance.now();
  const tpDist = e => e.touches.length >= 2 ? Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY) : 0;
  const tpNew = () => ({t0: tpNow(), maxTouches: 0, tmBefore: 0, pcAt: null, tmAfter: 0, lastTmAfter: 0, endedAfter: '', d2Start: 0, d2Last: 0});
  function tpFinish(how){
    const g = TP.cur; if(!g) return;
    g.end = how; g.endAt = tpNow();
    TP.done.push(g); if(TP.done.length > 3) TP.done.shift();
    TP.cur = null;
  }
  document.addEventListener('touchstart', e=>{
    TP.ts++; TP.touches = e.touches.length;
    if(e.touches.length === 1 || !TP.cur) TP.cur = tpNew();
    const g = TP.cur; g.maxTouches = Math.max(g.maxTouches, e.touches.length);
    if(e.touches.length === 2){ g.d2Start = tpDist(e); g.d2Last = g.d2Start; }
    TP.d2 = tpDist(e);
    if(window.PZ_DBG) window.PZ_DBG();
  }, {capture:true, passive:true});
  document.addEventListener('touchmove', e=>{
    TP.tm++; TP.touches = e.touches.length; TP.cancelable = e.cancelable ? 'yes' : 'NO';
    const g = TP.cur;
    const d = tpDist(e); if(d) { TP.d2 = d; if(g) g.d2Last = d; }
    if(g){
      if(g.pcAt === null) g.tmBefore++;
      else { g.tmAfter++; g.lastTmAfter = tpNow() - g.pcAt; }
    }
    if(window.PZ_DBG) window.PZ_DBG();
  }, {capture:true, passive:true});
  document.addEventListener('touchend', e=>{
    TP.te++; TP.touches = e.touches.length;
    if(TP.cur && TP.cur.pcAt !== null && !TP.cur.endedAfter) TP.cur.endedAfter = 'touchend@+' + Math.round(tpNow() - TP.cur.pcAt) + 'ms';
    if(e.touches.length === 0) tpFinish('touchend');
    if(window.PZ_DBG) window.PZ_DBG();
  }, {capture:true, passive:true});
  document.addEventListener('touchcancel', e=>{
    TP.tc++; TP.touches = e.touches.length;
    if(TP.cur && TP.cur.pcAt !== null && !TP.cur.endedAfter) TP.cur.endedAfter = 'touchcancel@+' + Math.round(tpNow() - TP.cur.pcAt) + 'ms';
    if(e.touches.length === 0) tpFinish('touchcancel');
    if(window.PZ_DBG) window.PZ_DBG();
  }, {capture:true, passive:true});
  function tpOnPointerCancel(){ if(TP.cur && TP.cur.pcAt === null) TP.cur.pcAt = tpNow(); }
  const tpLine = (g, tag) => `${tag} fingers<=${g.maxTouches} d2:${Math.round(g.d2Start)}->${Math.round(g.d2Last)}  touchmove before ptrcancel=${g.tmBefore}`
    + (g.pcAt === null ? '  (no pointercancel)' : `  | AFTER ptrcancel: touchmove=${g.tmAfter}, last at +${Math.round(g.lastTmAfter)}ms, ${g.endedAfter || 'still down'}`);
  function tpText(){
    let t = `\nTOUCH EVENTS  ts=${TP.ts} tm=${TP.tm} te=${TP.te} tc=${TP.tc}  touches now=${TP.touches}  latest 2-finger d=${Math.round(TP.d2)}px  last touchmove cancelable=${TP.cancelable}`;
    if(TP.cur) t += '\n' + tpLine(TP.cur, 'NOW ');
    for(let i = TP.done.length - 1; i >= 0; i--) t += '\n' + tpLine(TP.done[i], 'prev');
    { const g = window.PZ_GESTURE ? window.PZ_GESTURE() : null; if(g) t += `\nGESTURE EVENTS (Safari): start=${g.start} change=${g.change} end=${g.end} drove-zoom=${g.drove} ignored(touch owns)=${g.ignored} over-canvas=${g.over}\n   last gesture: first scale=${(+g.firstScale).toFixed(3)} now=${(+g.scale).toFixed(3)} min=${g.minScale === 99 ? '-' : (+g.minScale).toFixed(3)} max=${(+g.maxScale).toFixed(3)} -> k requested ${(+g.kReq).toFixed(2)}  event xy=${g.nativeXY} used xy=${g.xy}  ctrl-wheel ticks during gesture=${g.wheelDuring}`; }
    t += `\nNATIVE-ZOOM MODE: ${window.PZ_NATIVE ? 'ON (browser zoom active; our zoom stands down)' : 'off'}`;
    t += `\nHANDOFF: ${handoff ? 'ARMED (touch events driving zoom)' : (HO.everArmed ? 'ended (' + (HO.ended || '-') + ')' : 'never armed')}`
      + `  armed after ${HO.ptrMoves} pointer moves, k at arm=${HO.kArm.toFixed(2)}, touch-driven zoom calls=${HO.moves}, k now=${(window.PZ ? window.PZ.k : 1).toFixed(2)}`;
    return t;
  }
  /* ===== end Option B probe =====
  document.addEventListener('touchcancel', e=>{ diagCnt.tcancel++; diagLog(`touchcancel cancelable=${e.cancelable} touches=${e.touches.length}`); }, {capture:true, passive:true});   /* TEMP DIAGNOSTIC */
  document.addEventListener('pointerup', up, {capture:true});
  document.addEventListener('pointercancel', up, {capture:true});

  /* Live touch-pointer count, read by buildDock()'s and pageZoom()'s own pointerdown handlers
     as their second line of defense against starting a drag/pan on top of an active pinch. */
  window.PZ_PINCHING = ()=> pts.size >= 2 || !!handoff;
})();

/* TEMP DEBUG, preview only — requested live readout of the iPad mini's actual width/breakpoint
   state, while this file was already being touched for the touch-pinch rebuild. Separate from
   every other debug overlay (#pzdebug, #peekdebug) so it keeps reporting regardless of zoom or
   drag state. The breakpoint test mirrors buildDock()'s own narrow() exactly (max-width:1023px
   — see the comment by narrow() in buildDock() for why that particular number). Remove before
   anything goes near live, same as the other debug overlays. */
(function buildMiniDebug(){
  const el = document.createElement('div');
  el.id = 'minidebug';
  el.style.cssText = 'position:fixed;bottom:4px;left:4px;z-index:99999;background:rgba(0,0,0,.75);'
    + 'color:#ff0;font:11px/1.5 monospace;padding:5px 8px;border-radius:4px;pointer-events:none;'
    + 'white-space:pre';
  document.body.appendChild(el);
  const mq = window.matchMedia('(max-width:1023px)');
  function update(){
    const vv = window.visualViewport;
    el.textContent = `innerWidth=${window.innerWidth}  vv.width=${vv ? vv.width.toFixed(0) : 'n/a'}\n`
      + `narrow (<=1023px, dock's own breakpoint) = ${mq.matches}`;
  }
  update();
  window.addEventListener('resize', update);
  if(window.visualViewport) window.visualViewport.addEventListener('resize', update);
})();

render();

/* TEMP DIAGNOSTIC (jd3, preview-only): keep every debug box readable under Safari's NATIVE pinch zoom.
   Device logs showed that under native zoom Safari ALSO resizes the layout viewport (inner=766x533 at
   vv.scale=2.09), so position:fixed boxes are already placed inside the visible area -- they just render
   magnified. jd2 added a translate on top of that and double-counted the offset (boxes drifted right).
   jd3 only counter-scales each box about its own anchored corner. Display only. */
(function(){
  const IDS = ['pzdebug','peekdebug','pinchdiag','minidebug','frametiming','navdebug'];
  const vv = window.visualViewport; if(!vv) return;
  let on = false, raf = 0;
  function apply(){
    raf = 0;
    const s = vv.scale;
    if(s < 1.01){
      if(on){ on = false; IDS.forEach(id=>{ const e = document.getElementById(id); if(e){ e.style.transform = ''; e.style.transformOrigin = ''; } }); }
      return;
    }
    on = true;
    IDS.forEach(id=>{
      const e = document.getElementById(id); if(!e) return;
      const cs = getComputedStyle(e); if(cs.display === 'none') return;
      const ox = (cs.left === 'auto' && cs.right !== 'auto') ? 'right' : 'left';
      const oy = (cs.top === 'auto' && cs.bottom !== 'auto') ? 'bottom' : 'top';
      e.style.transformOrigin = ox + ' ' + oy;
      e.style.transform = `scale(${(1 / s).toFixed(3)})`;
    });
  }
  const kick = ()=>{ if(!raf) raf = requestAnimationFrame(apply); };
  vv.addEventListener('resize', kick); vv.addEventListener('scroll', kick);
  setInterval(()=>{ if(vv.scale >= 1.01 || on) kick(); }, 250);
})();
