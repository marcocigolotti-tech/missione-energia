"use strict";
const $ = id => document.getElementById(id);

const sources = [
  {id:"sole", name:"Sole", emoji:"☀️", station:"Centrale fotovoltaica", stationEmoji:"🔆", kind:"renew", desc:"La luce del Sole viene trasformata direttamente in elettricità."},
  {id:"vento", name:"Vento", emoji:"🌬️", station:"Centrale eolica", stationEmoji:"🌀", kind:"renew", desc:"Il vento fa ruotare le pale di una turbina."},
  {id:"acqua", name:"Acqua", emoji:"💧", station:"Centrale idroelettrica", stationEmoji:"🌊", kind:"renew", desc:"L'acqua in movimento mette in rotazione una turbina."},
  {id:"terra", name:"Calore della Terra", emoji:"🌋", station:"Centrale geotermica", stationEmoji:"♨️", kind:"renew", desc:"Il calore del sottosuolo può produrre vapore e poi elettricità."},
  {id:"biomassa", name:"Biomassa", emoji:"🌿", station:"Centrale a biomassa", stationEmoji:"🌾", kind:"mixed", desc:"La materia organica può essere usata come combustibile o biogas."},
  {id:"carbone", name:"Carbone", emoji:"🪨", station:"Centrale a carbone", stationEmoji:"🏭", kind:"fossil", desc:"Il carbone è un combustibile fossile, non rinnovabile."},
  {id:"gas", name:"Gas naturale", emoji:"🔥", station:"Centrale a gas", stationEmoji:"⚙️", kind:"fossil", desc:"Il gas naturale viene bruciato per produrre energia."},
  {id:"petrolio", name:"Petrolio", emoji:"🛢️", station:"Centrale a olio combustibile", stationEmoji:"🏗️", kind:"fossil", desc:"Anche il petrolio è una fonte fossile e produce emissioni."}
];
const uses = [
  {id:"case", name:"Case", emoji:"🏠", desc:"Luci, frigoriferi e altri elettrodomestici."},
  {id:"scuole", name:"Scuole", emoji:"🏫", desc:"Computer, LIM, illuminazione e dispositivi."},
  {id:"industrie", name:"Industrie", emoji:"🏭", desc:"Macchinari e processi produttivi."},
  {id:"trasporti", name:"Trasporti elettrici", emoji:"🚆", desc:"Treni, metro e alcuni veicoli elettrici."}
];
const simpleQuiz = [
  {q:"Quale di queste è una fonte rinnovabile?", a:["Carbone","Vento","Petrolio"], correct:1, explain:"Il vento si rinnova naturalmente; carbone e petrolio sono combustibili fossili."},
  {q:"Che cosa fa la rete elettrica?", a:["Trasporta l'elettricità dove serve","Crea il Sole","Produce carbone"], correct:0, explain:"La rete trasporta e distribuisce energia dalle centrali agli utenti."},
  {q:"Che cosa produce elettricità dalla luce solare?", a:["Pannello fotovoltaico","Motore diesel","Caldaia a carbone"], correct:0, explain:"Il pannello fotovoltaico trasforma direttamente la luce del Sole in elettricità."},
  {q:"Dove può essere utilizzata l'energia elettrica?", a:["Solo nelle case","Solo nelle fabbriche","Case, scuole, industrie e trasporti"], correct:2, explain:"L'elettricità ha molti usi diversi."}
];
const finalQuiz = [
  {q:"Perché una città non può affidarsi solo al fotovoltaico per tutta la giornata senza accumulo?", a:["Perché i pannelli producono soprattutto con la luce e non di notte","Perché il fotovoltaico usa carbone","Perché i pannelli funzionano solo in inverno"], correct:0, explain:"Di notte o con poca luce il fotovoltaico produce meno o non produce affatto. Per questo servono accumuli o integrazione con altre fonti."},
  {q:"Quale sequenza descrive bene una centrale idroelettrica?", a:["Acqua in movimento → turbina → generatore → elettricità","Acqua → pannello solare → batteria","Acqua → carbone → rete"], correct:0, explain:"L'acqua fa ruotare una turbina collegata a un generatore elettrico."},
  {q:"Perché una batteria non è una fonte primaria di energia?", a:["Perché immagazzina energia ricevuta da un'altra fonte","Perché funziona solo con il petrolio","Perché crea energia dal nulla"], correct:0, explain:"La batteria accumula energia e la restituisce, con alcune perdite."},
  {q:"Qual è una differenza importante tra una centrale a gas e una eolica?", a:["La centrale a gas usa un combustibile fossile, quella eolica usa il vento","Sono identiche","La centrale eolica brucia combustibile"], correct:0, explain:"Una usa una fonte fossile, l'altra sfrutta una fonte rinnovabile."},
  {q:"Se una scuola sostituisce lampade da 60 W con lampade da 10 W, a parità di tempo il consumo di energia...", a:["Diminuisce molto","Rimane uguale","Aumenta"], correct:0, explain:"A parità di ore, una potenza minore significa un minore consumo di energia."},
  {q:"Perché dire 'rinnovabile = impatto zero' è sbagliato?", a:["Perché anche gli impianti rinnovabili occupano spazio e richiedono materiali","Perché le rinnovabili non esistono","Perché il vento è inquinante come il carbone"], correct:0, explain:"Le rinnovabili sono preziose, ma ogni impianto ha effetti da valutare."},
  {q:"Durante una siccità, quale produzione può diminuire più facilmente?", a:["Quella idroelettrica","Quella eolica per definizione","Quella della rete elettrica"], correct:0, explain:"Se c'è meno acqua disponibile, alcune centrali idroelettriche possono produrre meno."},
  {q:"Che cosa aiuta a rendere stabile un sistema elettrico moderno?", a:["Coordinare produzione, consumi, rete e accumulo","Usare una sola fonte","Spegnere gli utenti quando serve"], correct:0, explain:"Serve un sistema integrato che bilanci domanda e offerta di energia."}
];
const missions = [
  {
    id:"scuola", icon:"🏫", badge:"Badge Scuola brillante", title:"Missione 1 · La scuola non deve restare al buio", summary:"Aiuta la scuola a ridurre i consumi e a scegliere una strategia energetica sensata.",
    steps:[
      {prompt:"È mattina e la scuola vuole produrre parte della propria energia sul tetto. Quale scelta è la più adatta come primo passo?", choices:["Installare pannelli fotovoltaici sul tetto", "Costruire una diga nel cortile", "Usare solo generatori a benzina"], correct:0, success:"Buona scelta: il tetto della scuola può ospitare pannelli fotovoltaici.", fail:"Questa scelta non è adatta al contesto della scuola."},
      {prompt:"Nel pomeriggio le nuvole aumentano. Come puoi rendere il sistema più affidabile?", choices:["Prevedere un sistema di accumulo e ridurre gli sprechi", "Contare soltanto sul Sole", "Spegnere la scuola ogni volta che passa una nuvola"], correct:0, success:"Ottimo: accumulo ed efficienza aiutano a gestire la variabilità.", fail:"Se il Sole cala, serve una strategia più affidabile."},
      {prompt:"La scuola vuole anche consumare meno senza rinunciare alla luce. Quale intervento è più logico?", choices:["Sostituire lampade vecchie con LED efficienti", "Aumentare la potenza di tutte le lampade", "Lasciare tutto acceso sempre"], correct:0, success:"Missione completata! Hai migliorato produzione e risparmio.", fail:"Qui serviva una scelta legata all'efficienza energetica."}
    ]
  },
  {
    id:"quartiere", icon:"🌳", badge:"Badge Quartiere sostenibile", title:"Missione 2 · Progetta un quartiere sostenibile", summary:"Un nuovo quartiere deve essere servito da energia elettrica con scelte ragionate e realistiche.",
    steps:[
      {prompt:"Il quartiere ha tetti esposti al Sole e una buona rete elettrica. Da quale soluzione conviene partire?", choices:["Fotovoltaico diffuso sui tetti", "Solo centrali a carbone lontane", "Nessun impianto e nessuna rete"], correct:0, success:"Sì: il fotovoltaico sui tetti è una base plausibile per questo quartiere.", fail:"La scelta non valorizza le risorse disponibili o non è realistica."},
      {prompt:"Gli abitanti chiedono energia anche di sera. Che cosa proponi?", choices:["Accumulare parte dell'energia e coordinarsi con la rete", "Usare il Sole anche di notte senza sistemi aggiuntivi", "Bloccare i consumi dopo il tramonto"], correct:0, success:"Giusto: rete e accumulo aiutano a coprire i momenti in cui la produzione cambia.", fail:"La soluzione non tiene conto del fatto che la produzione può variare."},
      {prompt:"Per i trasporti del quartiere, quale scelta è più coerente con il progetto?", choices:["Favorire mezzi pubblici elettrici e punti di ricarica", "Aumentare solo i veicoli a benzina", "Eliminare qualsiasi spostamento"], correct:0, success:"Missione completata! Hai progettato un quartiere più sostenibile.", fail:"Questa soluzione non migliora davvero la sostenibilità dei trasporti."}
    ]
  },
  {
    id:"isola", icon:"🏝️", badge:"Badge Isola autonoma", title:"Missione 3 · Salva un'isola energetica", summary:"Una piccola isola vuole usare meno combustibili fossili ma ha risorse limitate.",
    steps:[
      {prompt:"L'isola è molto ventosa e soleggiata, ma ha poco spazio. Quale combinazione iniziale è più sensata?", choices:["Un mix di eolico e fotovoltaico", "Solo centrali a carbone", "Solo una batteria senza produzione"], correct:0, success:"Ottimo: sfrutti due risorse presenti sull'isola.", fail:"La scelta ignora le risorse locali o non è sufficiente."},
      {prompt:"Quando il vento cala e arriva la sera, che cosa aiuta di più il sistema?", choices:["Accumulo e buona gestione dei consumi", "Sperare che il vento torni subito", "Spegnere tutti i servizi essenziali"], correct:0, success:"Esatto: servono accumulo e organizzazione della domanda.", fail:"La soluzione non rende il sistema abbastanza affidabile."},
      {prompt:"Un abitante propone di usare la biomassa locale, ma in quantità limitate e controllate. Come valuti l'idea?", choices:["Può essere utile solo se la filiera è sostenibile e ben gestita", "È sempre perfetta e a impatto zero", "È uguale al petrolio"], correct:0, success:"Missione completata! Hai valutato la biomassa in modo realistico.", fail:"Qui era importante ragionare sulla sostenibilità, non solo sul nome della fonte."}
    ]
  }
];

const MAX_LIVES = 5;
let lives = MAX_LIVES;
let gameOver = false;
let hard = false;
let phase = 1;
let placements = {};
let selected = null;
let checks = 0;
let hints = 0;
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = false;
let completed = false;
let completedMissions = new Set();
let currentMission = null;
let missionStep = 0;
let missionAnswered = false;
let missionFailure = false;
let failedMission = null;

function announce(text, speak = false){ $("announcement").textContent = text; if(speak || $("readAloud").checked) say(text); }
function say(text, force=false){ if(!force && !$("readAloud").checked) return; if(!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang='it-IT'; u.rate=.97; speechSynthesis.speak(u); }
function phaseCount(){ return hard ? 4 : 3; }
function currentSources(){ return hard ? sources : sources.slice(0,4); }
function targetList(){ return phase===1 ? currentSources() : uses; }
function pieceList(){
  if(phase===1) return currentSources().map(s => ({id:s.id,label:s.station,emoji:s.stationEmoji,meta:s.desc}));
  if(phase===2) return uses.map(u => ({id:u.id,label:u.name,emoji:u.emoji,meta:u.desc}));
  return [];
}
function resetGame(isHard = hard){
  hard = isHard;
  lives = MAX_LIVES; gameOver = false;
  phase = 1; placements = {}; selected = null; checks=0; hints=0; quizIndex=0; quizCorrect=0; quizAnswered=false; completed=false;
  completedMissions = new Set(); currentMission = null; missionStep = 0; missionAnswered = false; missionFailure = false; failedMission = null;
  $("easyMode").classList.toggle("active", !hard); $("hardMode").classList.toggle("active", hard);
  $("easyMode").setAttribute('aria-pressed', String(!hard)); $("hardMode").setAttribute('aria-pressed', String(hard));
  render();
}
function stars(){
  let base = 0;
  if(phase>1 || Object.keys(placements).length===targetList().length) base++;
  if(phase>2 || (hard && completedMissions.size>0)) base++;
  if(completed) base++;
  return '★'.repeat(base) + '☆'.repeat(3-base);
}
function badgeText(){ return completedMissions.size ? Array.from(completedMissions).join(' · ') : 'Nessuno'; }
function updateDashboard(){
  $("phaseLabel").textContent = `${phase} di ${phaseCount()}`;
  let prog='';
  if(phase<=2){ const total=targetList().length; prog=`${Object.keys(placements).length} / ${total}`; }
  else if(hard && phase===3){ prog = `${completedMissions.size} / ${missions.length} missioni`; }
  else { const total = hard ? finalQuiz.length : simpleQuiz.length; prog = `${Math.min(quizIndex + (quizAnswered?1:0), total)} / ${total}`; }
  $("progressLabel").textContent = prog;
  $("scoreLabel").textContent = stars();
  $("badgeLabel").textContent = badgeText();
  $("livesLabel").textContent = hard && !$("noLifeLoss").checked ? "❤️".repeat(lives) + "🖤".repeat(MAX_LIVES - lives) : "∞ Nessun limite";
  let progressValue = 0;
  if(phase===1){ progressValue = (Object.keys(placements).length / targetList().length) * 25; }
  else if(phase===2){ progressValue = 25 + (Object.keys(placements).length / targetList().length) * 25; }
  else if(hard && phase===3){ progressValue = 50 + (completedMissions.size / missions.length) * 25; }
  else if((!hard && phase===3) || (hard && phase===4)){
    const total = hard ? finalQuiz.length : simpleQuiz.length;
    progressValue = (hard ? 75 : 66) + (Math.min(quizIndex + (quizAnswered?1:0), total) / total) * (hard ? 25 : 34);
  }
  if(completed) progressValue = 100;
  $("progressBar").style.width = Math.max(0, Math.min(100, progressValue)) + '%';
}
function setInstructions(){
  let title='', text='', icon='';
  if(phase===1){ title='Collega le fonti alle centrali'; text='Scegli il nome della centrale corretta per ogni fonte di energia.'; icon='1'; }
  else if(phase===2){ title='Collega la rete agli utilizzi'; text='Associa l’elettricità ai luoghi in cui viene usata.'; icon='2'; }
  else if(hard && phase===3){ title='Missioni energia a bivi'; text='Scegli una missione e rispondi step dopo step. Se sbagli, quella missione si interrompe.'; icon='3'; }
  else { title='Verifica finale'; text='Rispondi e leggi le spiegazioni per consolidare ciò che hai imparato.'; icon = hard ? '4' : '3'; }
  $("instructionTitle").textContent = title;
  $("instructionText").textContent = text;
  $("phaseIcon").textContent = icon;
}
function render(){
  updateDashboard();
  setInstructions();
  $("modeChip").textContent = hard ? 'Livello Esperto · percorso strutturato' : 'Livello Esploratore · percorso guidato';
  $("nextBtn").hidden = true; $("checkBtn").hidden = false; $("checkBtn").disabled = false;
  if(gameOver){ renderGameOver(); return; }
  if(phase===1) renderPhase1();
  else if(phase===2) renderPhase2();
  else if(hard && phase===3) renderMissionArea();
  else renderQuiz();
}
function renderPhase1(){
  const data = currentSources();
  const html = `
    <div class="mapTable">
      <div class="mapHeader"><span>Fonte</span><span>Centrale</span><span>Rete</span><span>Spiegazione</span></div>
      ${data.map(s => `
        <div class="mapRow">
          <div class="sourceBox"><em>${s.emoji}</em><div class="sourceText"><strong>${s.name}</strong><small>${s.kind==='fossil'?'fonte fossile':'fonte energetica'}</small></div></div>
          ${renderSlot(s.id)}
          <div class="networkCard"><em>⚡</em><strong>Rete</strong></div>
          <div class="useCard"><em>💬</em><div class="useText"><strong>Osserva e ragiona</strong><small>${s.desc}</small></div></div>
        </div>`).join('')}
    </div>`;
  $("boardContent").innerHTML = html;
  document.querySelectorAll('.slot[data-target]').forEach(slot => slot.addEventListener('click', () => put(slot.dataset.target)));
  renderPieces();
  $("remaining").textContent = `${pieceList().length - Object.keys(placements).length} da inserire`;
  $("selectionStatus").textContent = selected ? `Selezionato: ${pieceList().find(x=>x.id===selected)?.label}. Tocca un cerchio.` : 'Nessun dischetto selezionato.';
  $("miniTip").textContent = '💡 Chiediti quale trasformazione energetica avviene in ogni centrale.';
}
function renderPhase2(){
  const html = `
    <div class="mapTable">
      <div class="mapHeader"><span>Produzione</span><span>Rete</span><span>Utilizzo</span><span>A che cosa serve?</span></div>
      ${uses.map(u => `
        <div class="mapRow useRow" style="grid-template-columns:1fr .7fr 1.2fr 1.2fr">
          <div class="sourceBox"><em>⚡</em><div class="sourceText"><strong>Energia elettrica</strong><small>arriva dalla rete</small></div></div>
          <div class="networkCard"><em>🔌</em><strong>Distribuzione</strong></div>
          ${renderSlot(u.id)}
          <div class="useCard"><em>${u.emoji}</em><div class="useText"><strong>${u.name}</strong><small>${u.desc}</small></div></div>
        </div>`).join('')}
    </div>`;
  $("boardContent").innerHTML = html;
  document.querySelectorAll('.slot[data-target]').forEach(slot => slot.addEventListener('click', () => put(slot.dataset.target)));
  renderPieces();
  $("remaining").textContent = `${pieceList().length - Object.keys(placements).length} da inserire`;
  $("selectionStatus").textContent = selected ? `Selezionato: ${pieceList().find(x=>x.id===selected)?.label}. Tocca un cerchio.` : 'Nessun dischetto selezionato.';
  $("miniTip").textContent = '💡 Pensa ai luoghi in cui l’elettricità viene usata davvero.';
}
function renderSlot(id){
  const p = placements[id] ? pieceList().find(x => x.id === placements[id]) : null;
  const content = p ? `<span class="emoji">${p.emoji}</span><strong>${p.label}</strong>` : '<span class="emoji">＋</span><span>Inserisci</span>';
  const cls = p ? 'slot filled' : 'slot';
  return `<button class="${cls}" type="button" data-target="${id}" aria-label="Casella ${id}">${content}</button>`;
}
function renderPieces(){
  const list = pieceList();
  $("pieces").innerHTML = list.map(item => {
    const used = Object.values(placements).includes(item.id);
    const cls = ['piece', selected===item.id ? 'selected':'', used ? 'used':''].join(' ').trim();
    return `<button class="${cls}" type="button" data-piece="${item.id}" ${used?'disabled':''}><em>${item.emoji}</em><span><strong>${item.label}</strong><small>${item.meta}</small></span></button>`;
  }).join('');
  document.querySelectorAll('.piece[data-piece]').forEach(btn => btn.addEventListener('click', () => {
    if(btn.disabled) return;
    selected = btn.dataset.piece; renderPieces();
    $("selectionStatus").textContent = `Selezionato: ${pieceList().find(x=>x.id===selected)?.label}. Tocca un cerchio.`;
  }));
}
function put(target){
  if(!selected){
    if(placements[target]){ delete placements[target]; announce('Dischetto rimosso.'); render(); return; }
    announce('Prima scegli un dischetto.'); return;
  }
  placements[target] = selected;
  selected = null;
  announce('Dischetto inserito.', false);
  render();
}
function check(){
  if(phase>2) return;
  const targets = targetList();
  if(Object.keys(placements).length < targets.length){ announce(`Mancano ${targets.length - Object.keys(placements).length} dischetti.`); return; }
  const wrong = targets.filter(t => placements[t.id] !== t.id);
  document.querySelectorAll('.slot[data-target]').forEach(slot => {
    const ok = placements[slot.dataset.target] === slot.dataset.target;
    slot.classList.toggle('correct', ok); slot.classList.toggle('wrong', !ok);
  });
  if(wrong.length){
    if(hard){
      announce(`${wrong.length} collegamenti da rivedere. Nel livello Esperto non viene detto quali.`, false);
      setTimeout(() => document.querySelectorAll('.slot[data-target]').forEach(s => s.classList.remove('correct','wrong')), 1200);
      $("miniTip").textContent = '🔎 Rivedi tutte le scelte: nel livello Esperto il gioco non mostra la soluzione esatta.';
    } else {
      const sample = wrong[0];
      const hint = phase===1 ? sample.desc : uses.find(u=>u.id===sample.id).desc;
      announce(`${wrong.length} collegamenti da correggere. Indizio: ${hint}`, false);
      $("miniTip").textContent = '🔎 Verde = giusto, rosa = da correggere.';
    }
  } else {
    announce('Fantastico! Tutti i collegamenti sono corretti.', false);
    $("nextBtn").hidden = false; $("checkBtn").disabled = true;
    $("miniTip").textContent = '✅ Fase completata. Puoi passare avanti.';
  }
}
function nextPhase(){
  if(phase===1){ phase=2; placements={}; selected=null; render(); announce('Seconda fase.'); }
  else if(phase===2){ phase=3; placements={}; selected=null; render(); announce(hard ? 'Terza fase: missioni a bivi.' : 'Terza fase: verifica finale.'); }
  else if(hard && phase===3){ phase=4; currentMission=null; render(); announce('Verifica finale.'); }
}
function hint(){
  let msg = 'Osserva bene nomi e funzioni.';
  if(phase===1) msg = hard ? 'Pensa alla trasformazione: luce, movimento, calore o combustione?' : 'Che cosa fa girare la centrale: luce, vento, acqua o calore?';
  else if(phase===2) msg = 'Chiediti dove viene usata l’elettricità nella vita quotidiana.';
  else if(hard && phase===3) msg = 'Leggi lo scenario, individua il problema e scegli la soluzione più realistica.';
  else msg = 'Leggi una risposta alla volta ed elimina quelle chiaramente errate.';
  $("hintText").textContent = msg; announce(msg);
}
function example(){
  let msg = 'Esempio: il vento muove le pale di una turbina, quindi la centrale corretta è eolica.';
  if(phase===2) msg = 'Esempio: una LIM si trova a scuola, quindi è un uso dell’elettricità nel contesto scolastico.';
  else if(hard && phase===3) msg = 'Esempio di ragionamento: se una risorsa non è sempre disponibile, servono accumulo, rete o una seconda soluzione.';
  else if((!hard && phase===3) || (hard && phase===4)) msg = 'Esempio: una batteria non crea energia; la conserva e la restituisce.';
  $("hintText").textContent = msg; announce(msg);
}
function renderMissionArea(){
  $("checkBtn").hidden = true;
  const canProceed = completedMissions.size >= 2;
  $("nextBtn").hidden = !canProceed;
  $("nextBtn").textContent = 'Vai alla verifica finale →';
  $("remaining").textContent = `${missions.length - completedMissions.size} missioni disponibili`;
  $("selectionStatus").textContent = currentMission ? 'Missione in corso.' : 'Scegli una missione.';
  $("pieces").innerHTML = `<div class="badgesRow">${Array.from(completedMissions).map(b=>`<span class="badge">🏅 ${b}</span>`).join('') || '<span class="small">Completa almeno 2 missioni per sbloccare la verifica finale.</span>'}</div>`;
  $("miniTip").textContent = canProceed ? '✅ Hai già sbloccato la verifica finale, ma puoi completare anche le altre missioni.' : '🧭 Completa almeno 2 missioni per sbloccare la verifica finale.';
  if(!currentMission){
    $("boardContent").innerHTML = `
      <div class="missionHub">
        <p class="small">Scegli una missione. Ogni missione ha più step: se rispondi bene continui; se sbagli, il percorso si interrompe.</p>
        <div class="missionHubGrid">
          ${missions.map(m => {
            const done = completedMissions.has(m.badge);
            return `<article class="missionCard">
              <div class="missionImage">${m.icon}</div>
              <div class="missionBody">
                <strong>${m.title}</strong>
                <p class="missionMeta">${m.summary}</p>
                <span class="missionBadge ${done?'missionDone':''}">${done ? 'Completata' : 'Ricompensa: ' + m.badge}</span>
                <button class="primary missionStart" data-mission="${m.id}">${done ? 'Rigioca missione' : 'Inizia missione'}</button>
              </div>
            </article>`;
          }).join('')}
        </div>
      </div>`;
    document.querySelectorAll('.missionStart').forEach(btn => btn.addEventListener('click', ()=> startMission(btn.dataset.mission)));
  } else {
    renderMissionStep();
  }
}
function startMission(id){ currentMission = missions.find(m => m.id===id); missionStep = 0; missionAnswered = false; missionFailure = false; failedMission = null; renderMissionStep(); }
function renderMissionStep(){
  const mission = currentMission;
  const step = mission.steps[missionStep];
  $("boardContent").innerHTML = `
    <div class="missionPanel">
      <div class="missionBox">
        <span class="eyebrow">${mission.title} · STEP ${missionStep+1} DI ${mission.steps.length}</span>
        <h2>${mission.icon} ${mission.title}</h2>
        <p>${mission.summary}</p>
        <div class="feedback">${step.prompt}</div>
        <div class="missionChoices" id="missionChoices">
          ${step.choices.map((c,i)=>`<button class="missionChoice" type="button" data-choice="${i}">${String.fromCharCode(65+i)}. ${c}</button>`).join('')}
        </div>
        <div id="missionFeedback" class="feedback" hidden></div>
        <div class="missionNav">
          <button class="soft" id="missionBack">← Torna alla base</button>
          <button class="soft" id="missionRead">🔊 Ascolta la missione</button>
          <button class="primary" id="missionContinue" hidden>Continua →</button>
        </div>
      </div>
    </div>`;
  document.querySelectorAll('.missionChoice').forEach(btn => btn.addEventListener('click', () => chooseMissionAnswer(Number(btn.dataset.choice))));
  $("missionBack").addEventListener('click', ()=> { currentMission = null; renderMissionArea(); });
  $("missionRead").addEventListener('click', ()=> say(step.prompt + '. ' + step.choices.join('. '), true));
}
function renderGameOver(){
  $("checkBtn").hidden = true; $("nextBtn").hidden = true;
  $("pieces").innerHTML = ''; $("remaining").textContent = '0 vite';
  $("selectionStatus").textContent = 'La partita è terminata.';
  $("hintText").textContent = 'Riprova: le missioni sono occasioni per imparare.';
  $("boardContent").innerHTML = `<div class="gameover" role="alert"><div class="gameoverIcon">💔</div><h2>GAME OVER</h2><p class="gameEndCredit">Gioco ideato e creato dal Prof. Marco Cigolotti</p><p>Hai esaurito le ${MAX_LIVES} vite.</p><p>Hai conquistato <strong>${completedMissions.size} badge</strong>. Puoi ripartire o attivare la modalità senza perdita di vite nelle impostazioni di accessibilità.</p><button class="primary" id="restartAfterGameOver">🎮 Nuova partita</button></div>`;
  $("restartAfterGameOver").addEventListener('click', () => resetGame(hard));
  $("miniTip").textContent = '💡 Ogni errore aiuta a migliorare la strategia.';
}
function chooseMissionAnswer(index){
  if(missionAnswered) return;
  missionAnswered = true;
  const mission = currentMission; const step = mission.steps[missionStep]; const feedback = $("missionFeedback");
  document.querySelectorAll('.missionChoice').forEach((btn,i)=>{ btn.disabled = true; if(i===index) btn.classList.add('chosen'); if(i===step.correct) btn.style.borderColor = '#27834d'; });
  if(index === step.correct){
    feedback.hidden = false; feedback.className = 'feedback good'; feedback.textContent = step.success; announce(step.success, false);
    if(missionStep < mission.steps.length - 1){ $("missionContinue").hidden = false; $("missionContinue").onclick = () => { missionStep++; missionAnswered = false; renderMissionStep(); }; }
    else {
      completedMissions.add(mission.badge); updateDashboard();
      $("missionContinue").hidden = false; $("missionContinue").textContent = 'Torna alla base →';
      $("missionContinue").onclick = () => { currentMission = null; missionStep = 0; missionAnswered = false; renderMissionArea(); };
    }
  } else {
    const penalized = hard && !$("noLifeLoss").checked;
    if(penalized) lives = Math.max(0, lives - 1);
    updateDashboard();
    feedback.hidden = false; feedback.className = 'feedback bad';
    if(penalized && lives === 0){
      gameOver = true;
      announce('Hai perso l’ultima vita. Game Over.', false);
      renderGameOver();
      return;
    }
    const status = penalized ? ` ❤️ Vite rimaste: ${lives} su ${MAX_LIVES}.` : ' Modalità senza perdita di vite attiva.';
    feedback.textContent = step.fail + status + ' Missione interrotta: riparti dal primo step o torna alla base.';
    announce(feedback.textContent, false);
    const nav = document.querySelector('.missionNav');
    nav.insertAdjacentHTML('beforeend', '<button class="primary" id="retryMission">Riprova missione</button>');
    $("retryMission").addEventListener('click', ()=> { missionStep = 0; missionAnswered = false; renderMissionStep(); });
  }
}
function renderQuiz(){
  $("checkBtn").hidden = true;
  const quiz = hard ? finalQuiz : simpleQuiz;
  const q = quiz[quizIndex];
  $("remaining").textContent = 'Verifica';
  $("selectionStatus").textContent = 'Rispondi e leggi la spiegazione.';
  $("pieces").innerHTML = '<p class="small">Ogni risposta ti aiuta a capire meglio l’energia.</p>';
  $("hintText").textContent = 'Leggi bene tutte le alternative prima di scegliere.';
  $("miniTip").textContent = '🎯 Non cercare solo la parola giusta: prova a capire il motivo.';
  $("nextBtn").hidden = true;
  if(completed || quizIndex >= quiz.length){
    completed = true; updateDashboard();
    $("boardContent").innerHTML = `<div class="questionBox"><h2>🎉 Missione completata!</h2><p class="gameEndCredit">Ideato e creato dal Prof. Marco Cigolotti</p><p>Risposte corrette: <strong>${quizCorrect} su ${quiz.length}</strong>.</p><p>${completedMissions.size ? 'Badge conquistati: ' + Array.from(completedMissions).join(' · ') : 'Hai completato il percorso base.'}</p><div class="badgesRow">${Array.from(completedMissions).map(b=>`<span class="badge">🏅 ${b}</span>`).join('')}</div><div class="quizNav"><button class="primary" id="again">↺ Gioca di nuovo</button></div></div>`;
    $("again").addEventListener('click', ()=> resetGame(hard));
    return;
  }
  $("boardContent").innerHTML = `
    <div class="question">
      <div class="questionBox">
        <span class="eyebrow">DOMANDA ${quizIndex+1} DI ${quiz.length}</span>
        <p id="questionText">${q.q}</p>
        <div id="quizChoices" class="quizChoices">
          ${q.a.map((a,i)=>`<button type="button" data-choice="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join('')}
        </div>
        <div id="feedback" class="feedback" hidden></div>
        <div class="quizNav">
          <button class="soft" id="quizRead">🔊 Leggi la domanda</button>
          <button class="primary" id="quizNext" hidden>Prossima domanda →</button>
        </div>
      </div>
    </div>`;
  $("quizRead").addEventListener('click', ()=> say(q.q + '. ' + q.a.join('. '), true));
  document.querySelectorAll('#quizChoices button').forEach(btn => btn.addEventListener('click', ()=> answerQuiz(Number(btn.dataset.choice))));
}
function answerQuiz(choice){
  if(quizAnswered) return;
  quizAnswered = true;
  const quiz = hard ? finalQuiz : simpleQuiz; const q = quiz[quizIndex]; const feedback = $("feedback");
  document.querySelectorAll('#quizChoices button').forEach((b,i)=>{ b.disabled = true; if(i===choice) b.classList.add('chosen'); if(i===q.correct) b.style.borderColor = '#27834d'; });
  if(choice === q.correct){ quizCorrect++; feedback.className = 'feedback good'; feedback.textContent = '✅ Esatto! ' + q.explain; }
  else { feedback.className = 'feedback bad'; feedback.textContent = '🔎 Non proprio. ' + q.explain; }
  feedback.hidden = false;
  $("quizNext").hidden = false;
  $("quizNext").onclick = ()=> { quizIndex++; quizAnswered=false; if(quizIndex>=quiz.length){ completed=true; } render(); };
  announce(feedback.textContent, false); updateDashboard();
}

$("easyMode").addEventListener('click', ()=> resetGame(false));
$("hardMode").addEventListener('click', ()=> resetGame(true));
$("settingsBtn").addEventListener('click', ()=>{ const open = $("settings").hidden; $("settings").hidden = !open; $("settingsBtn").setAttribute('aria-expanded', String(open)); });
$("stopVoice").addEventListener('click', ()=> window.speechSynthesis?.cancel());
$("speakBtn").addEventListener('click', ()=> say($("instructionTitle").textContent + '. ' + $("instructionText").textContent, true));
$("checkBtn").addEventListener('click', check);
$("nextBtn").addEventListener('click', nextPhase);
$("hintBtn").addEventListener('click', hint);
$("autoBtn").addEventListener('click', example);
$("resetBtn").addEventListener('click', ()=> resetGame(hard));
$("beginBtn").addEventListener('click', ()=> { document.querySelector('.dashboard').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'}); announce('Inizia la missione!', false); });
['bigText','highContrast'].forEach(id => $(id).addEventListener('change', ()=> document.body.classList.toggle(id, $(id).checked)));

$("noLifeLoss").addEventListener('change', () => { updateDashboard(); });
resetGame(false);
