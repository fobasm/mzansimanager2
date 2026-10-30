function afterRound() {
  const tl = G.trainTally;
  if (tl && tl.n > 0) {
    const wk = tl.weeks > 1 ? ` over ${tl.weeks} weeks` : '';
    toastGood(`Training: ${tl.n} improvement${tl.n === 1 ? '' : 's'}${wk}` + (tl.up ? ` · ${tl.up} player${tl.up === 1 ? '' : 's'} gained +1 overall` : ''));
  }
  G.trainTally = null;
  seedAiClauses(G);
  aiClauseTriggers(G);
  updateScouting(G);
  updateOutgoingScouting(G);
  try { watchlistAlerts(G); } catch (e) { console.error('Watchlist error', e); }
const bids = G.jobless ? [] : generateBids(G);  bids.forEach(b => {     const pl = me().squad.find(x => x.id === b.pid), buyer = G.teams[b.from]; if (!pl || !buyer) return;     mail(G, { cat: 'offer', from: buyer.n, p: pl, club: me(), status: 'Offer received', flag: true, subject: `Transfer Offer: ${b.name}`,       body: [`${buyer.n} have bid ${money(b.fee)} for ${b.name}.`, `His estimated value is ${money(pl.value)}. Respond to the offer when it appears, or turn it down.`],       rows: [['Bidder', buyer.n], ['Offer', money(b.fee)], ['Estimated value', money(pl.value)], ['Contract', `${pl.contract} year${pl.contract === 1 ? '' : 's'} left`]] });   });   const loanOffers = generateLoanOffers(G);  loanOffers.forEach(o => {     const pl = me().squad.find(x => x.id === o.pid), buyer = G.teams[o.from]; if (!pl || !buyer) return;     mail(G, { cat: 'offer', from: buyer.n, p: pl, club: me(), status: 'Loan offer received', flag: true, subject: `Loan Offer: ${o.name}`,       body: [`${buyer.n} would like to take ${o.name} on loan for ${o.seasons} season${o.seasons === 1 ? '' : 's'}.`, `They would cover ${Math.round(o.wageShare * 100)}% of his wages while he's there. Respond to the offer when it appears, or turn it down.`],       rows: [['Club', buyer.n], ['Length', `${o.seasons} season${o.seasons === 1 ? '' : 's'}`], ['Wage share paid by them', Math.round(o.wageShare * 100) + '%']] });   });   try {     const un = unreadCount(G), fresh = un - (G.lastUnread || 0);     if (fresh > 0) toast(`✉ ${fresh} new message${fresh === 1 ? '' : 's'} in your inbox`);     G.lastUnread = un;   } catch (e) { }
G.pendingBids = dedupOffers((G.pendingBids || []).concat(bids)).filter(b => b.round == null || G.round - b.round < OFFER_EXPIRE_ROUNDS).slice(-15); if (bids.length) setTimeout(bidPing, 1600);
  G.pendingLoanOffers = dedupOffers((G.pendingLoanOffers || []).concat(loanOffers)).filter(o => o.round == null || G.round - o.round < OFFER_EXPIRE_ROUNDS).slice(-15);
  fxRound = Math.max(0, G.round - 1);
if (!G.finished && G.round >= 16 && rnd() < 0.025) {
    const offers = jobOffers(G);
    if (offers.length) {
      G.pendingJobOffers = offers; G.jobOffersSeen = false; G.lastJobOfferRound = G.round;
mail(G, { cat: 'career', from: 'Your Agent', flag: true, subject: 'Job Offer: clubs want to talk',
        body: [`${offers.map(o => G.teams[o.id].n).join(' and ')} would like to speak to you about their managerial vacancy.`, 'The offer will be put to you on your next matchday.'] });
    }
  }
  save(); render();
}

function matchOf(res) { return res.tiers[me().tier].find(m => m.h === G.myTeam || m.a === G.myTeam); }

function goalList(ev) {   const goals = ev.filter(e => e.type === 'goal');   const reds = ev.filter(e => e.type === 'card' && e.card === 'red');   const rows = goals.map(e => ({ min: e.min, html: `<li><span class="min">${e.min}'</span><span class="who">${esc(e.sName)} <span class="tag">${esc(G.teams[e.team].s)}</span></span>      <span class="aw">${e.aName ? 'assist ' + esc(e.aName) : ''}</span></li>` }))     .concat(reds.map(e => ({ min: e.min, html: `<li><span class="min">${e.min}'</span><span class="who">🟥 ${esc(e.sName)} <span class="tag">${esc(G.teams[e.team].s)}</span></span>      <span class="aw">${e.second ? 'second yellow' : 'sent off'}</span></li>` })))     .sort((a, b) => a.min - b.min);   if (!rows.length) return '<p style="color:var(--faint);margin:10px 0 0">No goals. One of those afternoons.</p>';   return '<ul class="goals">' + rows.map(r => r.html).join('') + '</ul>'; } function goalListOld(ev) {
  const goals = ev.filter(e => e.type === 'goal');
  if (!goals.length) return '<p style="color:var(--faint);margin:10px 0 0">No goals. One of those afternoons.</p>';
  return '<ul class="goals">' + goals.map(e =>
    `<li><span class="min">${e.min}'</span><span class="who">${esc(e.sName)} <span class="tag">${esc(G.teams[e.team].s)}</span></span>
     <span class="aw">${e.aName ? 'assist ' + esc(e.aName) : ''}</span></li>`).join('') + '</ul>';
}
/* ---- post-match summary: ratings, changes and incidents for your side ---- */
function matchSummaryHTML(m) {
  if (!m || !m.allEv || m.forfeit) return '';
  const my = G.teams[G.myTeam], ev = m.allEv, rt = m.rt || {};
  const mine = e => e.team === G.myTeam;
  const rated = Object.keys(rt).map(id => ({ p: my.squad.find(x => x.id === +id), r: rt[id] })).filter(x => x.p).sort((a, b) => b.r - a.r);
  const col = r => r >= 7.5 ? '#3ddc84' : r < 6 ? '#ff6b6b' : '#f2b928';
  const row = x => `<div class="res" style="grid-template-columns:1fr auto;gap:8px"><div class="h">${esc(x.p.name)} <span class="hint">${esc(x.p.pos)}</span></div><div class="a"><b style="color:${col(x.r)}">${x.r.toFixed(1)}</b></div></div>`;
  let h = '';
  if (rated.length) {
    const avg = rated.reduce((a, x) => a + x.r, 0) / rated.length;
    h += `<div class="hint" style="margin:12px 0 4px">Top performers · team average <b style="color:${col(avg)}">${avg.toFixed(1)}</b></div>${rated.slice(0, 3).map(row).join('')}`;
    const low = rated[rated.length - 1];
    if (rated.length > 3 && low.r < 6) h += `<div class="hint" style="margin:8px 0 4px">Struggled</div>${row(low)}`;
  }
  const lines = [];
  ev.filter(e => e.type === 'sub' && mine(e)).forEach(e => lines.push({ min: e.min, t: `🔄 ${e.sName} ${e.outName ? 'on for ' + esc(e.outName) : 'came on'}` }));
  ev.filter(e => e.type === 'card' && mine(e)).forEach(e => lines.push({ min: e.min, t: `${e.card === 'red' ? '🟥' : '🟨'} ${esc(e.sName)}` }));
  ev.filter(e => e.type === 'injury' && mine(e)).forEach(e => lines.push({ min: e.min, t: `🩹 ${esc(e.sName)} picked up a knock` }));
  if (lines.length) h += `<div class="hint" style="margin:10px 0 4px">Changes and incidents</div><ul class="goals">${lines.sort((a, b) => a.min - b.min).map(l => `<li><span class="min">${l.min}'</span><span class="who">${l.t}</span></li>`).join('')}</ul>`;
  return h;
}
      /* ---- post-match press: answers move the squad's mood, the board and the fans ---- */
function postMatchPress(m, done) {
  if (!m || m.forfeit || (m.h !== G.myTeam && m.a !== G.myTeam)) { done(); return; }
  const mine = m.h === G.myTeam ? m.hg : m.ag, theirs = m.h === G.myTeam ? m.ag : m.hg, gd = mine - theirs;
  if (!(Math.abs(gd) >= 3 || (gd < 0 && rnd() < 0.6) || rnd() < 0.3)) { done(); return; }
  const t = me(), st = stadiumOf(t), opp = G.teams[m.h === G.myTeam ? m.a : m.h];
  const played = Object.keys(m.rt || {}).map(Number).map(id => t.squad.find(p => p.id === id)).filter(Boolean);
  const star = m.potm && t.squad.find(p => p.id === m.potm.id);
  const squad = (v, txt) => (played.length ? played : t.squad).forEach(p => moodAddEv(p, 'press', v, 3, txt));
  const board = d => { G.board = clamp((G.board != null ? G.board : 62) + d, 0, 100); };
  const fans = d => { st.loyalty = clamp((st.loyalty != null ? st.loyalty : 50) + d, 0, 100); };
  const set = gd > 0 ? { q: `A good result against ${opp.s}. What was the difference today?`, a: [
      { l: 'The players were fantastic. They deserve all the credit.', f: () => { squad(3, 'Pleased to be praised in public'); board(0.5); } },
      star ? { l: `${star.name} was outstanding. He's a joy to work with.`, f: () => { moodAddEv(star, 'press', 7, 4, 'Delighted by the manager\'s praise'); board(0.5); } } : { l: 'We worked hard on the training pitch all week.', f: () => { squad(1, 'Pleased with the manager\'s words'); board(0.5); } },
      { l: 'Good, but there is a lot more to do.', f: () => { board(1.5); fans(1); } }] }
    : gd === 0 ? { q: `A draw with ${opp.s}. Are you satisfied?`, a: [
      { l: 'We deserved more than a point.', f: () => { squad(2, 'Backed by the manager'); board(-0.5); } },
      { l: 'A point is a point. We move on.', f: () => { board(0.5); } },
      { l: 'We have to be sharper in front of goal.', f: () => { squad(-1, 'Stung by the manager\'s criticism'); board(1); } }] }
    : { q: `A defeat at the hands of ${opp.s}. What went wrong?`, a: [
      { l: 'That one is on me. I will fix it.', f: () => { squad(2, 'Grateful that the manager took the blame'); board(1); fans(0.5); } },
      { l: 'The players let themselves and the fans down.', f: () => { squad(-3, 'Hurt by the manager\'s public criticism'); board(0.5); } },
      { l: 'The referee made some big mistakes today.', f: () => { squad(1, 'Pleased the manager has their back'); board(-2); fans(-1); } }] };
  openModal('Post-match press conference', `<p style="margin:0 0 12px;color:var(--dim)">A reporter asks: "${esc(set.q)}"</p>` +
    set.a.map((o, i) => `<button class="btn ghost sm" data-pp="${i}" style="display:block;width:100%;text-align:left;margin-bottom:8px">"${esc(o.l)}"</button>`).join(''),
    `<button class="btn ghost sm" id="ppSkip">No comment</button>`);
  document.querySelectorAll('[data-pp]').forEach(b => b.onclick = () => { const o = set.a[+b.dataset.pp]; closeModal(); try { o.f(); } catch (e) { console.error(e); } news(G, 'career', `After the ${mine}–${theirs} result vs ${opp.s}: "${o.l}"`); save(); done(); });
  $('#ppSkip').onclick = () => { closeModal(); done(); };
}
function showMatchdayModal(res) {
  const m = matchOf(res);
  if (!m) { showRunModal([res]); return; }
  const H = G.teams[m.h], A = G.teams[m.a];
  const mine = m.h === G.myTeam ? m.hg : m.ag, theirs = m.h === G.myTeam ? m.ag : m.hg;
  const verdict = mine > theirs ? 'Three points.' : mine === theirs ? 'A point shared.' : 'Beaten.';
  let body = `<div class="fixture" style="padding:4px 0">
      <div class="side">${crestHTML(H, 30)}<div><b>${esc(H.s)}</b><small>${esc(H.city)}</small></div></div>
      <div class="score num">${m.hg}–${m.ag}</div>
      <div class="side away">${crestHTML(A, 30)}<div><b>${esc(A.s)}</b><small>${esc(A.city)}</small></div></div>
    </div>`;
  body += `
    <p style="text-align:center;color:var(--dim);margin:0">${verdict} ${ordinal(posOfTeam(G, G.myTeam))} after ${G.round} ${G.round === 1 ? 'game' : 'games'}.</p>
   ${m.forfeit ? forfeitNoteHTML(m) : goalList(m.allEv || m.ev) + potmCardHTML(m) + tacStatsHTML(m) + matchSummaryHTML(m)}`;
  body += myCupResultsHTML(res);   body += continentalRoundHTML(res);   if (res.cup) body += cupRoundHTML(res.cup);
  openModal(`Matchday ${res.round}`, body,
    `<button class="btn ghost sm" onclick="closeModal();tab='table';render()">See the log</button>
     <button class="btn sm" id="potmContinue">Continue</button>`);
  const pc = $('#potmContinue'); if (pc) pc.onclick = () => { closeModal(); postMatchPress(m, () => showPOTM(m, true)); };
}
function potmCardHTML(m) {   if (!m || !m.potm) return '';   const f = findPlayer(G, m.potm.id); if (!f) return '';   const p = f.p, t = f.t, bits = [];   if (m.potm.goals) bits.push(`${m.potm.goals} goal${m.potm.goals > 1 ? 's' : ''}`);   if (m.potm.assists) bits.push(`${m.potm.assists} assist${m.potm.assists > 1 ? 's' : ''}`);   return `<div class="potmCard"><div class="potmHead">Player of the Match</div>     <div class="mprof" style="margin:0;border-left-width:1px"><div class="mface">${faceSVG(p, 60, t.c1)}</div>       <div><div class="mname">${esc(p.name)} ${flagSVG(p.nat)}</div>         <div class="mtags">${posTag(p.pos)}<span class="potmRate">${m.potm.rating.toFixed(1)}<small>/10</small></span>${bits.length ? `<span class="hint">${bits.join(' · ')}</span>` : ''}</div>         <div class="mclub">${crestHTML(t, 14)}<span>${esc(t.n)}</span></div></div></div><div class="potmNote">${esc(bits.length ? `A standout display — ${bits.join(' and ')} on the day.` : 'A commanding, composed performance from start to finish.')}</div></div>`; } function showPOTM(m, inline) {
  if (!m || !m.potm) { maybeShowPendingOffer(); return; }
  const f = findPlayer(G, m.potm.id);
  if (!f) { maybeShowPendingOffer(); return; }
  const p = f.p, t = f.t;
  const bits = [];
  if (m.potm.goals) bits.push(`${m.potm.goals} goal${m.potm.goals > 1 ? 's' : ''}`);
  if (m.potm.assists) bits.push(`${m.potm.assists} assist${m.potm.assists > 1 ? 's' : ''}`);
  const summary = bits.length ? `A standout display — ${bits.join(' and ')} on the day.` : `A commanding, composed performance from start to finish.`;
  /* Player of the Match no longer goes to the inbox; only season awards do */
  const prof = `<div class="mprof">
      <div class="mface">${faceSVG(p, 60, t.c1)}</div>
      <div><div class="mname">${esc(p.name)} ${flagSVG(p.nat)}</div>
        <div class="mtags">${posTag(p.pos)}<span class="tag gold">${m.potm.rating.toFixed(1)}/10</span></div>
        <div class="mclub">${crestHTML(t, 14)}<span>${esc(t.n)}</span></div></div>
    </div>`;
  if (inline) { save(); maybeShowPendingOffer(); return; }   openModal('Player of the Match', prof + `<div class="mbody"><p>${esc(summary)}</p></div>`,
    `<button class="btn sm" id="potmGo">Nice one</button>`);
  save();
  const go = $('#potmGo'); if (go) go.onclick = () => { closeModal(); maybeShowPendingOffer(); };
}
function maybeShowPendingOffer() {
  if (G.pendingJobOffers && G.pendingJobOffers.length && !G.jobOffersSeen) {
    G.jobOffersSeen = true;
    showOffers(G.pendingJobOffers, () => {});
  }
}
function showRunModal(runs) {
  const rows = runs.map(res => {
    const m = matchOf(res); if (!m) return '';
    const opp = G.teams[m.h === G.myTeam ? m.a : m.h];
    const mine = m.h === G.myTeam ? m.hg : m.ag, th = m.h === G.myTeam ? m.ag : m.hg;
    const r = mine > th ? 'W' : mine === th ? 'D' : 'L';
    return `<div class="res"><div class="h">${res.round}. ${m.h === G.myTeam ? 'vs' : 'at'} ${esc(opp.s)}</div>
       <div class="sc">${mine}–${th}</div><div class="a"><span class="form"><i class="${r}">${r}</i></span></div></div>${myCupResultsHTML(res)}`;
  }).join('');
  openModal(`${runs.length} matchday${runs.length > 1 ? 's' : ''} played`,
    rows + `<p style="margin:13px 0 0;color:var(--dim)">You're ${ordinal(posOfTeam(G, G.myTeam))} in the ${TIER_SHORT[me().tier]} after ${G.round} games.</p>`,
    `<button class="btn sm" onclick="closeModal();maybeShowPendingOffer()">Continue</button>`);
}
/* ---- promotion playoffs you can see and play ---- */
function poContenders() { const t = me(); if (!t || t.tier <= 0) return null; const c = sortTable(G, t.tier).slice(AUTO_PROMOTED, AUTO_PROMOTED + PLAYOFF_SPOTS).map(r => r.id); return c.length === PLAYOFF_SPOTS ? c : null; }
function poFinalPair(po) { const w0 = po.semis[0].winner, w1 = po.semis[1].winner; return po.contenders.indexOf(w1) < po.contenders.indexOf(w0) ? [w1, w0] : [w0, w1]; }
function poPairs(po) { const c = po.contenders; return po.stage === 'semi' ? [[c[0], c[3]], [c[1], c[2]]] : [poFinalPair(po)]; }
function poLine(h, a, r, label) {
  const H = G.teams[h], A = G.teams[a], mineRow = h === G.myTeam || a === G.myTeam;
  const sc = r ? `${r.hg}–${r.ag}${r.pens ? ` <small>(${r.pens[0]}–${r.pens[1]} pens)</small>` : ''}` : 'v';
  return `<div class="hint" style="margin:8px 0 2px">${label}</div><div class="res" style="${mineRow ? 'background:rgba(242,185,40,.14)' : ''}"><div class="h">${crestHTML(H, 16)} ${esc(H.s)}</div><div class="sc">${sc}</div><div class="a">${esc(A.s)} ${crestHTML(A, 16)}</div></div>`;
}
function poBodyHTML(po) {
  const c = po.contenders, o = i => ordinal(AUTO_PROMOTED + i + 1);
  let h = `<p style="margin:0 0 6px;color:var(--dim)">The ${esc(TIER_SHORT[po.tier])} playoffs decide the last promotion spot. ${o(0)} hosts ${o(3)}, ${o(1)} hosts ${o(2)}, and the better-placed winner hosts the final.</p>`;
  const sp = po.stage === 'semi' ? [[c[0], c[3]], [c[1], c[2]]] : [[c[0], c[3]], [c[1], c[2]]];
  sp.forEach((p, i) => { h += poLine(p[0], p[1], po.semis[i], `Semi-final ${i + 1} · ${o(c.indexOf(p[0]))} v ${o(c.indexOf(p[1]))}`); });
  if (po.stage !== 'semi') { const fp = poFinalPair(po); h += poLine(fp[0], fp[1], po.final, 'Final'); }
  else h += `<div class="hint" style="margin:8px 0 2px">Final</div><div class="res"><div class="h hint">Winner of semi 1 / semi 2</div><div class="sc">v</div><div class="a"></div></div>`;
  return h;
}
function startPlayoffs() {
  const c = poContenders(); if (!c) return false;
  if (!G.poPlayed || G.poPlayed.season !== G.season) {
    G.poPlayed = { season: G.season, tier: me().tier, contenders: c, semis: [null, null], final: null, winner: null, stage: 'semi', cur: null };
    if (c.includes(G.myTeam)) mail(G, { cat: 'general', from: 'Board of Directors', flag: true, subject: 'You are in the promotion playoffs', body: [`${me().n} finished ${ordinal(posOfTeam(G, G.myTeam))} and have qualified for the promotion playoffs.`, 'Win the semi-final and the final to earn the last promotion spot.'] });
  }
  if (G.poPlayed.winner != null) return false;
  poShow(); return true;
}
function poShow() {
  const po = G.poPlayed, mine = po.contenders.includes(G.myTeam);
  if (po.stage === 'done') {
    const w = G.teams[po.winner], won = po.winner === G.myTeam;
    openModal('Playoff final', poBodyHTML(po) + `<p style="margin:12px 0 0;color:${won ? '#3ddc84' : 'var(--dim)'}">${won ? 'You won the playoffs and earned promotion!' : `${esc(w.n)} win the playoffs and take the last promotion spot.`}</p>`, `<button class="btn sm" id="poGo">Continue</button>`);
    $('#poGo').onclick = () => { closeModal(); doEndSeason2(); }; return;
  }
  const pairs = poPairs(po), inIt = pairs.some(p => p.includes(G.myTeam));
  const intro = po.stage === 'semi' ? (mine ? `<p style="margin:0 0 8px;color:#3ddc84"><b>You are in the promotion playoffs!</b> You finished ${ordinal(posOfTeam(G, G.myTeam))}.</p>` : '') : (mine && !inIt ? `<p style="margin:0 0 8px;color:#ff8a84">You were knocked out in the semi-finals.</p>` : (inIt ? `<p style="margin:0 0 8px;color:#3ddc84"><b>You are through to the final!</b></p>` : ''));
  const btn = inIt ? (G.liveMode ? 'Play the match' : 'Simulate the match') : (po.stage === 'semi' ? 'Simulate the semi-finals' : 'Simulate the final');
  openModal(po.stage === 'semi' ? (mine ? 'You made the playoffs!' : 'Promotion playoffs') : 'Playoff final', intro + poBodyHTML(po), `<button class="btn sm" id="poGo">${btn}</button>`);
  $('#poGo').onclick = poRun;
}
function poRun() {
  const po = G.poPlayed; closeModal();
  const stg = po.stage === 'semi' ? 'promo-semi' : 'promo-final', pairs = poPairs(po);
  po.cur = pairs.map(() => null); po.mineIdx = -1;
  pairs.forEach((p, i) => { if (p.includes(G.myTeam) && G.liveMode) { po.mineIdx = i; return; } po.cur[i] = cupResolveTie(G, p[0], p[1], stg); });
  if (po.mineIdx >= 0) { poLive(pairs[po.mineIdx], stg); return; }
  poAdvance();
}
function poLive(p, stg) {
  const po = G.poPlayed, h = p[0], a = p[1], ctx = createMatch(G, h, a, true);
  if (ctx.forfeit) { po.cur[po.mineIdx] = cupResolveTie(G, h, a, stg); poAdvance(); return; }
  const side = h === G.myTeam ? 'h' : 'a';
  preMatchFlow(ctx, { h, a }, 'playoff', null, side, G.teams[side === 'h' ? a : h]);
}
function poLiveDone(ls) {
  const po = G.poPlayed, m = ls.m, c = ls.ctx; let pens = null, winner;
  if (c.hg === c.ag) { let ph = 0, pa = 0; do { ph += rnd() < 0.76 ? 1 : 0; pa += rnd() < 0.74 ? 1 : 0; } while (ph === pa); pens = [ph + 3, pa + 3]; winner = ph > pa ? m.h : m.a; } else winner = c.hg > c.ag ? m.h : m.a;
  po.cur[po.mineIdx] = { h: m.h, a: m.a, hg: c.hg, ag: c.ag, pens, winner, stage: po.stage === 'semi' ? 'promo-semi' : 'promo-final', ev: c.ev };
  liveState = null; poAdvance();
}
function poAdvance() {
  const po = G.poPlayed;
  if (po.stage === 'semi') { po.semis = po.cur; po.stage = 'final'; }
  else { po.final = po.cur[0]; po.winner = po.final.winner; po.stage = 'done'; }
  po.cur = null; save(); poShow();
}
  function doEndSeason() { if (startPlayoffs()) return; doEndSeason2(); } /* ---- season story: your year in numbers, captured before the season rolls over ---- */
function seasonStory() {
  const t = me(), res = [];
  (G.fixtures[t.tier] || []).forEach(rd => {
    const m = rd.find(x => (x.h === G.myTeam || x.a === G.myTeam) && x.played && !x.forfeit); if (!m) return;
    const home = m.h === G.myTeam; res.push({ opp: G.teams[home ? m.a : m.h].s, gf: home ? m.hg : m.ag, ga: home ? m.ag : m.hg, home });
  });
  if (!res.length) return null;
  let w = 0, d = 0, l = 0, run = 0, best = 0, wr = 0, bestW = 0;
  res.forEach(r => { if (r.gf > r.ga) w++; else if (r.gf === r.ga) d++; else l++; run = r.gf >= r.ga ? run + 1 : 0; best = Math.max(best, run); wr = r.gf > r.ga ? wr + 1 : 0; bestW = Math.max(bestW, wr); });
  const bw = res.slice().sort((a, b) => (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf)[0], bl = res.slice().sort((a, b) => (a.gf - a.ga) - (b.gf - b.ga) || b.ga - a.ga)[0];
  const sq = t.squad, top = k => sq.slice().sort((a, b) => (b[k] || 0) - (a[k] || 0))[0];
  const bestAvg = sq.filter(p => (p.ratingApps || 0) >= 8).map(p => ({ p, avg: p.ratingSum / p.ratingApps })).sort((a, b) => b.avg - a.avg)[0];
  return { w, d, l, gf: res.reduce((a, r) => a + r.gf, 0), ga: res.reduce((a, r) => a + r.ga, 0), unbeaten: best, wins: bestW, bw, bl, scorer: top('goals'), assist: top('assists'), mostUsed: top('apps'), bestAvg };
}
function seasonStoryHTML(st, last) {
  const mood = last.pos <= 3 ? 'A season to remember' : last.pos <= 10 ? 'A solid campaign' : last.pos <= 15 ? 'A season of two halves' : 'A season of struggle';
  const sc = r => r ? `${r.gf}–${r.ga} ${r.home ? 'v' : 'at'} ${esc(r.opp)}` : '—';
  const pl = (p, k, u) => p && p[k] ? `${esc(p.name)} · ${p[k]} ${u}` : '—';
  return `<div class="panel" style="margin:12px 0"><h3>${mood}<span class="sub">your season in numbers</span></h3><dl class="kv" style="padding:0 12px 8px">
    <dt>Record</dt><dd>${st.w}W ${st.d}D ${st.l}L · ${st.gf} for, ${st.ga} against</dd>
    <dt>Best result</dt><dd>${sc(st.bw)}</dd>
    <dt>Worst result</dt><dd>${st.bl && st.bl.gf < st.bl.ga ? sc(st.bl) : 'You were never beaten'}</dd>
    <dt>Longest unbeaten run</dt><dd>${st.unbeaten} match${st.unbeaten === 1 ? '' : 'es'}${st.wins >= 3 ? ` · ${st.wins} wins in a row` : ''}</dd>
    <dt>Top scorer</dt><dd>${pl(st.scorer, 'goals', 'goals')}</dd>
    <dt>Most assists</dt><dd>${pl(st.assist, 'assists', 'assists')}</dd>
    <dt>Ever-present</dt><dd>${pl(st.mostUsed, 'apps', 'apps')}</dd><dt>Debug</dt><dd>${st.dbg || ''}</dd>
    ${st.bestAvg ? `<dt>Best average rating</dt><dd>${esc(st.bestAvg.p.name)} · ${st.bestAvg.avg.toFixed(2)}</dd>` : ''}</dl></div>`;
  } /* ---- player awards on profiles: Golden Boot, Player and Young Player of the Season, Team of the Season ---- */
function playerAwards(p) {
  const out = [];
  ((G.records && G.records.seasons) || []).forEach(s => {
    const a = s.awards; if (!a) return;
    [['goldenBoot', 'Golden Boot', '⚽'], ['playerOfSeason', 'Player of the Season', '⭐'], ['youngPlayerOfSeason', 'Young Player of the Season', '🌱']].forEach(([k, l, ic]) => {
      if (a[k] && a[k].pid === p.id) out.push({ season: s.season, tier: a.tier, label: l, icon: ic, note: k === 'goldenBoot' ? a[k].goals + ' goals' : (a[k].clubName || '') });
    });
  });
  (p.tots || []).forEach(t => out.push({ season: t.season, tier: t.tier, label: 'Team of the Season', icon: '🏅', note: t.club || '' }));
  return out.sort((a, b) => b.season - a.season);
}
function playerAwardsHTML(p) {
  const list = playerAwards(p); if (!list.length) return '';
  return `<div class="panel"><h3>Awards<span class="sub">${list.length} won</span></h3>${list.map(a =>
    `<div class="prow" style="grid-template-columns:auto 1fr auto"><span style="font-size:22px;width:30px;text-align:center">${a.icon}</span><span class="who"><b>${esc(a.label)}</b><small>${esc(TIER_SHORT[a.tier])}${a.note ? ' · ' + esc(a.note) : ''}</small></span><span class="hint">${seasonLabel(a.season)}</span></div>`).join('')}</div>`;
}
function recordTots(xi, tier) {
  xi.forEach(x => { const p = x.p; p.tots = p.tots || []; if (!p.tots.some(t => t.season === G.season)) p.tots.push({ season: G.season, tier, club: x.club ? x.club.n : '' }); });
}
function doEndSeason2() { 
  const totsTier = me().tier;
  const totsXI = pickFormationXI(ratingPool(G, totsTier, null));   try { recSweep(true); } catch (e) { console.error('records', e); }   try { recordTots(totsXI, totsTier); } catch (e) { console.error('tots', e); }
  recapCapture();
  let story = null; try { story = seasonStory(); } catch (e) { console.error('story', e); }
  const s = endSeason(G);
  fxRound = 0; tableTier = me().tier; statTier = Math.min(me().tier, 2);
  save();
  const my = me(), last = my.history[my.history.length - 1];
  const fin = my.finHistory[my.finHistory.length - 1];
  const myPO = (s.playoffs || []).find(po => po.tier === last.tier);
  let body = `<dl class="kv" style="padding:0">
    <dt>${TIER_NAMES[0]}</dt><dd>${esc(G.teams[s.champions[0]].n)}</dd>
    <dt>${TIER_NAMES[1]}</dt><dd>${esc(G.teams[s.champions[1]].n)}</dd>
    <dt>${TIER_NAMES[2]}</dt><dd>${esc(G.teams[s.champions[2]].n)}</dd>
    <dt>${CUP_NAME}</dt><dd>${esc(G.teams[s.cup].n)}</dd>
    <dt>${SUPER8}</dt><dd>${s.s8 != null ? esc(G.teams[s.s8].n) : '—'}</dd>
    <dt>${KNOCKOUT}</dt><dd>${s.ko != null ? esc(G.teams[s.ko].n) : '—'}</dd>
    <dt>${CAF_NAME}</dt><dd>${s.caf ? esc(s.caf) : '—'}</dd>
    ${s.afcon ? `<dt>${AFCON_NAME}</dt><dd>${flagSVG(s.afcon)} ${esc(natName(s.afcon))}</dd>` : ''}
    ${s.awards && s.awards.goldenBoot ? `<dt>Golden Boot</dt><dd>${esc(s.awards.goldenBoot.name)} · ${s.awards.goldenBoot.goals} goals</dd>` : ''}
    ${s.awards && s.awards.playerOfSeason ? `<dt>Player of the Season</dt><dd>${esc(s.awards.playerOfSeason.name)} · ${s.awards.playerOfSeason.avg.toFixed(2)} avg rating</dd>` : ''}
    ${s.awards && s.awards.youngPlayerOfSeason ? `<dt>Young Player of the Season</dt><dd>${esc(s.awards.youngPlayerOfSeason.name)} · ${s.awards.youngPlayerOfSeason.age} years old</dd>` : ''}
    ${s.awards && s.awards.manager && s.awards.manager.delta > 0 ? `<dt>Manager of the Season</dt><dd>${esc(s.awards.manager.clubName)} · ${ordinal(s.awards.manager.pos)} place</dd>` : ''}
    <dt>Promoted</dt><dd>${s.promoted.map(i => esc(G.teams[i].s)).join(', ')}</dd>
    <dt>Relegated</dt><dd>${s.relegated.map(i => esc(G.teams[i].s)).join(', ')}</dd>
    ${myPO ? `<dt>${TIER_SHORT[myPO.tier]} playoff final</dt><dd>${esc(G.teams[myPO.winner].s)} ${myPO.winner === myPO.final.h ? myPO.final.hg : myPO.final.ag}-${myPO.winner === myPO.final.h ? myPO.final.ag : myPO.final.hg} ${esc(G.teams[myPO.final.h === myPO.winner ? myPO.final.a : myPO.final.h].s)}</dd>` : ''}
    <dt>You finished</dt><dd>${ordinal(last.pos)} · ${last.pts} pts</dd>
    <dt>Season result</dt><dd style="color:${fin.net >= 0 ? 'var(--up)' : 'var(--down)'}">${money(fin.net)}</dd>
    <dt>Your reputation</dt><dd>${G.manager.rep}/100</dd>
  </dl>`;
  const mineRetired = s.retired.filter(r => r.club === G.myTeam);
  if (mineRetired.length) body += `<p style="color:var(--dim);font-size:13.5px">Hanging up the boots: ` +
    mineRetired.map(r => `${esc(r.name)} (${r.age}, ${r.apps} apps)`).join(', ') + `.</p>`;
  body = (last.pos === 1 ? `<div class="rvBanner" style="display:flex;align-items:center;justify-content:center;gap:10px">🏆 ${esc(my.n)} are champions ${crestHTML(my, 26)}</div>` : '') +
    `<div class="rvHero"><div><small>Finished</small><b>${ordinal(last.pos)}</b></div><div><small>Points</small><b>${last.pts}</b></div>
      <div><small>Season result</small><b style="color:${fin.net >= 0 ? '#3ddc84' : '#ff6b6b'}">${money(fin.net)}</b></div><div><small>Reputation</small><b>${G.manager.rep}</b></div></div>` + (story ? seasonStoryHTML(story, last) : '') + body;
  const showReview = () => {     const mineBreak = s.breakout.filter(b => b.club === G.myTeam);     if (mineBreak.length) setTimeout(() => { breakoutNote(); toast(`${mineBreak[0].name}${mineBreak.length > 1 ? ' and ' + (mineBreak.length - 1) + ' more' : ''} broke through this season.`); }, 2600);
    seasonSting(last.pos === 1 || s.cup === G.myTeam ? 'trophy' : s.promoted.includes(G.myTeam) ? 'promo' : s.relegated.includes(G.myTeam) ? 'down' : '');
    openLockedModal(`${seasonLabel(s.season)} review`, body,
      `<button class="btn sm" id="revNext">Continue</button>`);
    $('#modal').classList.add('mmx');
    $('#revNext').onclick = () => { closeModal(); trophyCelebrationFlow(s, last.pos, () => managerAwardFlow(s, () => postSeasonFlow(s))); };
  };
  if (totsXI.length) {
    openLockedModal(`Team of the Season — ${TIER_SHORT[totsTier]}`, xiCardsHTML(totsXI),
      `<button class="btn sm" id="totsNext">Continue to season review</button>`);
    $('#modal').classList.add('mmx');
    const totsBtn = $('#totsNext'); if (totsBtn) totsBtn.onclick = () => modalSwap(showReview);
  } else {
    showReview();
  }
  render();
}
/* ---- Manager of the Season: celebration pop-up, and a place in your manager awards ---- */
let _awStyle = false;
function awInjectStyle() {
  if (_awStyle) return; _awStyle = true;
  const st = document.createElement('style');
  st.textContent = `
  .awScrim{position:fixed;inset:0;z-index:2100;background:rgba(2,4,8,.92);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:grid;place-items:center;padding:14px;overflow:hidden;animation:awFade .3s ease}
  @keyframes awFade{from{opacity:0}to{opacity:1}}
  .awCard{position:relative;width:min(460px,100%);text-align:center;background:linear-gradient(180deg,#27303c 0%,#1a2029 100%);border:2px solid #f2b928;border-radius:12px;padding:26px 22px 18px;color:#eef1f4;box-shadow:0 0 0 6px rgba(242,185,40,.14),0 0 60px rgba(242,185,40,.38),0 24px 60px rgba(0,0,0,.8);animation:awPop .5s cubic-bezier(.2,.9,.3,1.2)}
  @keyframes awPop{from{opacity:0;transform:scale(.8) translateY(20px)}to{opacity:1;transform:none}}
  .awCup{width:96px;height:96px;margin:0 auto 6px;filter:drop-shadow(0 0 18px rgba(242,185,40,.7));animation:awBob 2.2s ease-in-out infinite}
  @keyframes awBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}
  .awKick{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#f2b928}
  .awCard h2{margin:6px 0 4px;font:800 28px var(--head);letter-spacing:.04em;text-transform:uppercase;color:#fff}
  .awCard p{margin:8px 0;color:#d4d9df;line-height:1.5;font-size:14px}
  .awCard .awSub{color:#9aa3ad;font-size:13px}
  .awConf{position:absolute;top:-10px;width:8px;height:14px;opacity:0;animation:awFall 2.8s linear infinite}
  @keyframes awFall{0%{transform:translateY(-20px) rotate(0);opacity:0}10%{opacity:1}100%{transform:translateY(520px) rotate(540deg);opacity:0}}
  .awCard>*:not(.awConf){position:relative;z-index:1}
  .awFoot{margin-top:14px}`;
  document.head.appendChild(st);
}
function awCupSVG() {
  return '<svg class="awCup" viewBox="0 0 64 64"><path d="M20 7h24v15c0 9-5 15-12 17-7-2-12-8-12-17z" fill="#f2b928"/><path d="M20 11h-9c0 10 4 15 10 16M44 11h9c0 10-4 15-10 16" fill="none" stroke="#f2b928" stroke-width="3"/><path d="M24 10h4v18c-3-2-4-6-4-10z" fill="#ffe08a" opacity=".7"/><rect x="29" y="38" width="6" height="9" fill="#d99a14"/><rect x="20" y="47" width="24" height="7" rx="2" fill="#f2b928"/><rect x="23" y="50" width="18" height="2" fill="#d99a14"/></svg>';
}
function trophiesWonList(sum, myPos) {   const list = [];   const t = G.teams[G.myTeam];   if (!t || G.jobless) return list;   if (myPos === 1) list.push({ kick: 'Champions', title: `${TIER_NAMES[t.tier]} Champions`, msg: `<b>${esc(t.n)}</b> have been crowned ${esc(TIER_NAMES[t.tier])} champions. A season to remember, forever.` });   if (sum.cup === G.myTeam) list.push({ kick: 'Cup winners', title: `${CUP_NAME} Winners`, msg: `<b>${esc(t.n)}</b> have lifted the ${esc(CUP_NAME)}. Cup glory for the club!` });   if (G.africa.caf && G.africa.caf.winner === G.myTeam) list.push({ kick: 'Continental glory', title: `${CAF_NAME} Champions`, msg: `<b>${esc(t.n)}</b> are the <b>Kings of Africa</b>! The whole continent is watching now.` });   if (G.africa.confed && G.africa.confed.winner === G.myTeam) list.push({ kick: 'Continental glory', title: `${CONFED_NAME} Winners`, msg: `<b>${esc(t.n)}</b> have won the ${esc(CONFED_NAME)}. Africa has taken notice.` });   return list; } function trophyPopup(item, onDone) {   awInjectStyle();   const cols = ['#f2b928', '#3ddc84', '#ffffff', '#ff6b6b', '#5ab0ff'];   const conf = Array.from({ length: 26 }, (_, i) => `<i class="awConf" style="left:${(i * 4.1 + 2) % 100}%;background:${cols[i % cols.length]};animation-delay:${(i % 7) * 0.3}s;animation-duration:${2.2 + (i % 5) * 0.3}s"></i>`).join('');   const sc = document.createElement('div'); sc.className = 'awScrim';   sc.innerHTML = `<div class="awCard">${conf}${awCupSVG()}<div class="awKick">${esc(item.kick)}</div><h2>Congrats, you won!</h2>     <div class="awSub">${esc(item.title)}</div>     <p>${item.msg}</p>     <div class="awFoot"><button class="btn sm" id="awGoTrophy">Continue</button></div></div>`;   document.body.appendChild(sc);   try { seasonSting('trophy'); } catch (e) { }   $('#awGoTrophy').onclick = () => { sc.remove(); onDone(); }; } function trophyCelebrationFlow(sum, myPos, next) {   const list = trophiesWonList(sum, myPos);   if (!list.length) { next(); return; }   let i = 0;   const step = () => { if (i >= list.length) { next(); return; } const item = list[i++]; trophyPopup(item, step); };   step(); } function mgrAwardWon(sum) {
  const a = sum && sum.awards && sum.awards.manager;
  return a && a.delta > 0 && a.clubId === G.myTeam && !G.jobless ? a : null;
}
function managerAwardFlow(sum, next) {
  const a = mgrAwardWon(sum); if (!a) { next(); return; }
  const m = G.manager; m.awards = m.awards || [];
  if (!m.awards.some(x => x.season === sum.season && x.name === 'Manager of the Season'))
    m.awards.push({ season: sum.season, name: 'Manager of the Season', tier: sum.awards.tier, club: a.clubName, pos: a.pos, expected: a.expectedPos });
  save(); awInjectStyle();
  const n = m.awards.filter(x => x.name === 'Manager of the Season').length;
  const cols = ['#f2b928', '#3ddc84', '#ffffff', '#ff6b6b', '#5ab0ff'];
  const conf = Array.from({ length: 22 }, (_, i) => `<i class="awConf" style="left:${(i * 4.7 + 3) % 100}%;background:${cols[i % cols.length]};animation-delay:${(i % 7) * 0.35}s;animation-duration:${2.4 + (i % 5) * 0.3}s"></i>`).join('');
  const sc = document.createElement('div'); sc.className = 'awScrim';
  sc.innerHTML = `<div class="awCard">${conf}${awCupSVG()}<div class="awKick">Award won</div><h2>Manager of the Season</h2>
    <div class="awSub">${esc(TIER_NAMES[sum.awards.tier])} · ${seasonLabel(sum.season)}</div>
    <p>You guided <b>${esc(a.clubName)}</b> to <b>${ordinal(a.pos)}</b> place after being tipped to finish ${ordinal(a.expectedPos)}. Nobody did more with less this season.</p>
    ${n > 1 ? `<p class="awSub">This is your ${ordinal(n)} Manager of the Season award.</p>` : ''}
    <p class="awSub">Added to your awards on the Manager tab.</p>
    <div class="awFoot"><button class="btn sm" id="awGo">Continue</button></div></div>`;
  document.body.appendChild(sc);
  try { seasonSting('trophy'); } catch (e) { }
  $('#awGo').onclick = () => { sc.remove(); next(); };
}
/* the awards list shown on the Manager tab (Profile and Career) */
function mgrAwardsHTML(m) {
  const list = (m && m.awards || []).slice().sort((a, b) => b.season - a.season);
  if (!list.length) return '';
  return `<div class="panel"><h3>Awards<span class="sub">${list.length} won</span></h3>${list.map(a =>
    `<div class="prow" style="grid-template-columns:auto 1fr auto"><svg width="30" height="30" viewBox="0 0 64 64" style="flex:none"><path d="M20 7h24v15c0 9-5 15-12 17-7-2-12-8-12-17z" fill="#f2b928"/><path d="M20 11h-9c0 10 4 15 10 16M44 11h9c0 10-4 15-10 16" fill="none" stroke="#f2b928" stroke-width="3"/><rect x="29" y="38" width="6" height="9" fill="#d99a14"/><rect x="20" y="47" width="24" height="7" rx="2" fill="#f2b928"/></svg>
      <span class="who"><b>${esc(a.name)}</b><small>${esc(a.club)} · ${ordinal(a.pos)} in the ${esc(TIER_SHORT[a.tier])} (tipped ${ordinal(a.expected)})</small></span><span class="hint">${seasonLabel(a.season)}</span></div>`).join('')}</div>`;
}
function postSeasonFlow(sum) {   if (sum.jobless) { showJoblessSeason(sum); return; }   if (sum.fired) { showSacked(sum); return; }   if (sum.contractEnded) { showContractEnded(sum); return; }   if (sum.offers && sum.offers.length) { showOffers(sum.offers, showSponsors); return; }   showSponsors(); } function postSeasonFlowOld(sum) {
  if (sum.fired) { showSacked(sum); return; }
  if (sum.offers && sum.offers.length) { showOffers(sum.offers, showSponsors); return; }
  showSponsors();
}

function showSacked(sum) {   ensureMgr(G);   const m = G.manager, old = G.teams[G.myTeam];   const sev = Math.round((m.wage || 0) * 0.5 * 100) / 100;   m.careerEarnings = Math.round(((m.careerEarnings || 0) + sev) * 100) / 100;   const leave = () => { closeModal(); goJobless('sacked'); save(); render(); goSub('manager', 'vacancies'); };   const body = `<p style="margin:0 0 8px;color:var(--dim)">The board at ${esc(old.n)} have run out of patience. Your contract has been terminated.</p>     <p style="margin:0 0 12px;color:var(--dim)">You receive <b style="color:#fff">${money(sev)}</b> in compensation. Your wage stops until you find a new club, and your next deal will reflect the new job.</p>` +     ((sum.offers || []).length ? `<p style="margin:0 0 8px;font-weight:600">Clubs willing to talk:</p>` : '<p style="margin:0;color:var(--dim)">No club has come forward yet. Look through the vacancies.</p>') +     (sum.offers || []).map(o => {       const t = G.teams[o.id];       return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(t, 26)}         <span class="who"><b>${esc(t.n)}</b><small>${TIER_SHORT[t.tier]} · squad rated ${teamOverall(t)} · budget ${money(t.budget)} · offering about ${money(mgrWage(t, 0.92))}</small></span>         <button class="btn sm" data-take="${o.id}">Negotiate</button></div>`;     }).join('');   openModal('You have been sacked', body, `<button class="btn ghost sm" id="sackJobless">Look for a job myself</button>`);   $('#sackJobless').onclick = leave;   $('#modal .x').onclick = leave;   document.querySelectorAll('[data-take]').forEach(b => b.onclick = () => {     const t = G.teams[+b.dataset.take];     openContractOffer({       team: t, heading: 'Contract Offer', mult: 0.92, dateISO: dateForRound(G.round, G.season),       paragraphs: [`${esc(t.n)} have agreed to appoint you as their new Head Coach.`],       onChoice: (k) => {         if (k !== 'accept') return;         takeJob(G, t.id);         G.board = 55; G.boardFired = false;         closeModal(); save();         tableTier = me().tier; statTier = Math.min(me().tier, 2);         toast(`You are the new manager of ${me().n}.`);         showSponsors();       }     });   }); } function showSackedOld(sum) {
  const body = `<p style="margin:0 0 12px;color:var(--dim)">The board's patience ran out. You need a new club to carry on this career.</p>` +
    (sum.offers || []).map(o => {
      const t = G.teams[o.id];
      return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(t, 26)}
        <span class="who"><b>${esc(t.n)}</b><small>${TIER_SHORT[t.tier]} · squad rated ${teamOverall(t)} · budget ${money(t.budget)}</small></span>
        <button class="btn sm" data-take="${o.id}" data-wage="${o.wage}">Take the job</button></div>`;
    }).join('');
  openModal('You have been sacked', body || '<p style="margin:0;color:var(--dim)">No club will have you right now.</p>');
  document.querySelectorAll('[data-take]').forEach(b => b.onclick = () => {
    const t = G.teams[+b.dataset.take], wage = +b.dataset.wage;
    openContractOffer({
      team: t, heading: 'Contract Offer', dateISO: dateForRound(G.round, G.season),
      paragraphs: [
        `${esc(t.n)} have agreed to appoint you as their new Head Coach.`,
        `The deal is worth <b>${money(wage / 12)}</b> a month — <b>${money(wage)}</b> a season.`
      ],
      options: [{ key: 'stall', label: 'Stall' }, { key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],
      defaultKey: 'stall',
      onChoice: (k) => {
        if (k !== 'accept') return;
        takeJob(G, t.id, wage);
        G.board = 55; G.boardFired = false;
        closeModal(); save();
        tableTier = me().tier; statTier = Math.min(me().tier, 2);
        toast(`You are the new manager of ${me().n}.`);
        showSponsors();
      }
    });
  });
}

function showOffers(offers, onDone) {
  const body = `<p style="margin:0 0 12px;color:var(--dim)">Your work has been noticed. ${offers.length === 1 ? 'A club wants' : 'Clubs want'} to talk.</p>` +
    offers.map((o, i) => {
      const t = G.teams[o.id];
      return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(t, 26)}
        <span class="who"><b>${esc(t.n)}</b><small>${TIER_SHORT[t.tier]} · squad rated ${teamOverall(t)} · budget ${money(t.budget)}</small></span>
        <button class="btn sm" data-take="${o.id}" data-wage="${o.wage}">Take the job</button></div>`;
    }).join('');
  openLockedModal('Job offer', body, `<button class="btn ghost sm" id="offerStay">Stay loyal to my team</button>`);
  const proceed = () => { closeModal(); save(); render(); if (onDone) onDone(); };
  $('#offerStay').onclick = proceed;
  $('#modal .x').onclick = proceed;
  document.querySelectorAll('[data-take]').forEach(b => b.onclick = () => {
    const t = G.teams[+b.dataset.take], wage = +b.dataset.wage;
    openContractOffer({
      team: t, heading: 'Contract Offer', dateISO: dateForRound(G.round, G.season),
      paragraphs: [
        `${esc(t.n)} would like to offer you the position of Head Coach.`,
        `The deal is worth <b>${money(wage / 12)}</b> a month — <b>${money(wage)}</b> a season.`
      ],
      options: [{ key: 'stall', label: 'Stall' }, { key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],
      defaultKey: 'stall',
      onChoice: (k) => {
        if (k !== 'accept') return;
        takeJob(G, t.id, wage);
        G.board = 55; G.boardFired = false;
        tableTier = me().tier; statTier = Math.min(me().tier, 2);
        toast(`You are the new manager of ${me().n}.`);
        closeModal(); save(); render();
        if (onDone) onDone();
      }
    });
  });
}

function showSponsors() {
  const t = me();
  const offers = sponsorOffersCached(G);
  const cards = offers.map((o, i) => `<div class="sponsorCard" data-sponsor="${i}">
      ${sponsorLogoSVG(o, 56)}
      <b>${esc(o.name)}</b>
      ${o.freq === 'monthly'
        ? `<span class="samt">${money(o.amount / 10)}/mo</span><span class="shint">${money(o.amount)} over the season</span>`
        : `<span class="samt">${money(o.amount)}</span><span class="shint">Paid immediately</span>`}
    </div>`).join('') +
    `<div class="sponsorCard none" data-sponsor="none">
      ${sponsorLogoSVG({ c1: 'var(--faint)', c2: 'var(--panel)', icon: 'bolt' }, 56)}
      <b>No sponsor</b>
      <span class="samt">Go it alone</span>
    </div>`;
  const body = `<p style="margin:0 0 12px;color:var(--dim)">Pick a sponsor for ${seasonLabel(G.season)}. The deal runs for this season only — some pay the full fee immediately, others pay monthly.</p>
    <div class="sponsorGrid">${cards}</div>`;
  openLockedModal('Sponsorship offers', body + `<div id="sponsorAnim" style="text-align:center;padding:14px 0 0;display:none">
      <div style="font-family:var(--head);font-size:15px;color:var(--faint)">Transfer budget</div>
      <div style="font-family:var(--head);font-size:34px" id="sponsorNum">${money(t.budget)}</div>
    </div>`);
  $('#modal').classList.add('mmx');
  document.querySelectorAll('[data-sponsor]').forEach(b => b.onclick = () => {
    document.querySelectorAll('[data-sponsor]').forEach(x => x.setAttribute('disabled', ''));
    if (b.dataset.sponsor === 'none') {
      t.currentSponsor = null;
      news(G, 'transfer', `${t.s} go into ${seasonLabel(G.season)} without a shirt sponsor.`);
      save();
      setTimeout(() => { closeModal(); render(); newSeasonSwell(); }, 300);
      return;
    }
    const o = offers[+b.dataset.sponsor];
    const installments = 10;
    const firstPay = o.freq === 'monthly' ? Math.round((o.amount / installments) * 100) / 100 : o.amount;
    t.currentSponsor = { name: o.name, icon: o.icon, img: o.img, c1: o.c1, c2: o.c2, amount: o.amount, freq: o.freq, paidSoFar: firstPay, installments };
    const from = t.budget, to = t.budget + firstPay;
    t.budget = Math.round(to * 100) / 100; t.fin.sponsor = (t.fin.sponsor || 0) + firstPay; noteInc(t, 'Shirt sponsor: ' + o.name, firstPay);
    $('#sponsorAnim').style.display = 'block';
    playSound('coin');
    let steps = 20, i = 0;
    const timer = setInterval(() => {
      i++;
      const v = from + (to - from) * (i / steps);
      const numEl = $('#sponsorNum'); if (numEl) numEl.textContent = money(v);
      if (i >= steps) {
        clearInterval(timer);
        news(G, 'transfer', o.freq === 'monthly'
          ? `${t.s} sign a sponsorship deal with ${o.name} worth ${money(o.amount)} this season, paid monthly.`
          : `${t.s} sign a sponsorship deal with ${o.name} worth ${money(o.amount)}.`);
        save();
         setTimeout(() => { closeModal(); render(); newSeasonSwell(); }, 500);
      }
    }, 45);
  });
}

/* ============================================================
   LIVE MATCH
   ============================================================ */
 let liveState = null; function removeRotateHint() { const r = document.getElementById('rotateHint'); if (r) r.remove(); } function maybeLandscapeHint() {   try { if (localStorage.getItem('mm_rotate_hint')) return; } catch (e) { }   if (!window.matchMedia) return;   const mq = window.matchMedia('(max-width: 760px) and (orientation: portrait)');   const app = document.getElementById('app');   if (!mq.matches || !app || document.getElementById('rotateHint')) return;   try { localStorage.setItem('mm_rotate_hint', '1'); } catch (e) { }   const el = document.createElement('div');   el.id = 'rotateHint';   el.innerHTML = '<span>📱 Turn your phone sideways for the best match view</span><button type="button">Got it</button>';   app.appendChild(el);   const close = () => { el.remove(); if (mq.removeEventListener) mq.removeEventListener('change', onChange); };   const onChange = () => { if (!mq.matches) close(); };   if (mq.addEventListener) mq.addEventListener('change', onChange);   el.querySelector('button').onclick = close;   setTimeout(close, 12000); } let liveWakeLock = null; async function requestLiveWakeLock() {   try {     if ('wakeLock' in navigator) liveWakeLock = await navigator.wakeLock.request('screen');   } catch (e) { liveWakeLock = null; } } function releaseLiveWakeLock() {   if (liveWakeLock) { try { liveWakeLock.release(); } catch (e) { } liveWakeLock = null; } } document.addEventListener('visibilitychange', () => {   if (document.visibilityState === 'visible' && liveState) requestLiveWakeLock(); }); function setLiveFullscreen(on) {   const a = document.getElementById('app');   if (!a) return;   a.classList.toggle('live-full', !!on);   if (on) {     a.style.position = 'fixed';     a.style.inset = '0';     a.style.display = 'flex';     a.style.flexDirection = 'column';     a.style.overflow = 'hidden';     a.style.zIndex = '500';     requestLiveWakeLock();   } else {     a.style.position = '';     a.style.inset = '';     a.style.display = 'block';     a.style.flexDirection = '';     a.style.overflow = '';     a.style.zIndex = '';     releaseLiveWakeLock();     removeRotateHint();   } }

let pendingRoundResult = null;
function afterLeaguePortion(res) {
  afterRound(); showMatchdayModal(res);
}
const PRESS_QUESTIONS = [   "How are you feeling about today's match?",   "What's your message to the fans before kickoff?",   "Any thoughts on the opposition today?" ]; const PRESS_TONES = [   { key: 'confident', label: "We're going out there to win", mood: 0.3 },   { key: 'respectful', label: "It'll be a tough, even game", mood: 0.1 },   { key: 'guarded', label: "I'll let the football do the talking", mood: 0.15 } ]; function showPressConference(oppName, onDone) {   const q = pick(PRESS_QUESTIONS);   const body = `<p style="margin:0 0 12px;color:var(--dim)">A reporter asks: "${esc(q)}"</p>` +     PRESS_TONES.map(t => `<button class="btn ghost sm presstoneBtn" data-pt="${t.key}" style="display:block;width:100%;text-align:left;margin-bottom:8px">"${esc(t.label)}"</button>`).join('');   openModal('Pre-match press conference', body, `<button class="btn ghost sm" id="pressSkip">Skip</button>`);   const finish = (tone) => { closeModal(); onDone(tone); };   document.querySelectorAll('.presstoneBtn').forEach(b => b.onclick = () => finish(PRESS_TONES.find(t => t.key === b.dataset.pt)));   const sk = $('#pressSkip'); if (sk) sk.onclick = () => finish({ key: 'skip', label: 'No comment', mood: 0 }); } function teamTalkOptions(myOverall, oppOverall) {   const gap = myOverall - oppOverall;   return [     { key: 'calm', label: 'Calm & Focused', hint: 'A steady, reliable word before kickoff.', delta: 0.4 },     { key: 'fireup', label: 'Fire Them Up', hint: gap >= 8 ? 'Risky — you are big favourites, this can look like overkill.' : 'Rouse the troops for a big effort.', delta: gap >= 8 ? -0.4 : 1.3 },     { key: 'underdog', label: 'Underdog Talk', hint: gap <= -8 ? 'Nobody gives you a chance — use it.' : "Won't land — you're clearly the stronger side.", delta: gap <= -8 ? 1.3 : 0.2 }   ]; } function showTeamTalk(myOverall, oppOverall, onDone) {   const opts = teamTalkOptions(myOverall, oppOverall);   const body = opts.map(o => `<button class="btn ghost sm talkBtn" data-tt="${o.key}" style="display:block;width:100%;text-align:left;margin-bottom:8px"><b>${esc(o.label)}</b><br><small style="color:var(--dim)">${esc(o.hint)}</small></button>`).join('');   openModal('Team talk', body, `<button class="btn ghost sm" id="talkSkip">Skip</button>`);   const finish = (o) => { closeModal(); onDone(o); };   document.querySelectorAll('.talkBtn').forEach(b => b.onclick = () => finish(opts.find(x => x.key === b.dataset.tt)));   const sk = $('#talkSkip'); if (sk) sk.onclick = () => finish({ key: 'skip', label: 'Nothing said', delta: 0 }); } /* ---- pre-match preview: shown before the press conference in live matches ---- */
function showMatchPreview(opp, mySide, kind, next) {
  const me0 = me(), so = teamStrength(opp), sm = teamStrength(me0);
  const form = (opp.form || []).slice(-5);
  const formHTML = form.length ? `<span class="form">${form.map(f => `<i class="${f}">${f}</i>`).join('')}</span>` : '<span class="hint">no games yet</span>';
  const key = so.xi.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
  const hurt = opp.squad.filter(p => p.inj > 0).sort((a, b) => b.rating - a.rating)[0];
  const mine = me0.squad.filter(p => !isFit(p, me0)).length;
  const diff = (sm.att - so.def) - (so.att - sm.def);
  const tip = diff > 3 ? 'Their back line looks beatable. Press high and play through the middle.' : diff < -3 ? 'They are dangerous going forward. Stay compact and look to hit them on the break.' : 'An even contest. Small details will decide it.';
  const posTxt = opp.tier === me0.tier && kind === 'league' ? ` · ${ordinal(posOfTeam(G, opp.id))} in the ${esc(TIER_SHORT[opp.tier])}` : ` · ${esc(TIER_SHORT[opp.tier])}`;
  const homeT = mySide === 'h' ? me0 : opp, awayT = mySide === 'h' ? opp : me0;
  const homeS = mySide === 'h' ? sm : so, awayS = mySide === 'h' ? so : sm;
  const homeCoords = FORM_COORDS[homeT.formation] || FORM_COORDS['4-4-2'];
  const awayCoords = FORM_COORDS[awayT.formation] || FORM_COORDS['4-4-2'];
  const mpKit = (t, away) => { const sp = t.currentSponsor; return `<div class="kitBigWrap">${bigKitSVG(t, away, 92)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><div class="kitBigSponsor">${sp ? (!away && sp.logo ? `<img src="${esc(sp.logo)}" alt="${esc(sp.name)}" style="width:100%;max-height:18px;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">` : esc(sp.name).toUpperCase()) : 'NO SPONSOR'}</div></div>`; };   const lineupsHTML = `<div class="mpVs">
      <div class="mpTeam"><div class="mpRow">${mpKit(homeT, false)}<div class="mpCrest">${crestHTML(homeT, 36)}</div></div><b>${esc(homeT.s)}</b></div>
      <div class="mpVsBadge">VS</div>
      <div class="mpTeam"><div class="mpRow">${mpKit(awayT, true)}<div class="mpCrest">${crestHTML(awayT, 36)}</div></div><b>${esc(awayT.s)}</b></div>
    </div>
    <div class="mpPitches">
      <div class="mpPitchCol">
        <div class="mpLabel">${esc(homeT.s)} · ${esc(homeT.formation)}</div>
        <div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${matchdayLineupPitchHTML(homeT, homeS.xi, homeS.slots, homeCoords)}</div>
      </div>
      <div class="mpPitchCol">
        <div class="mpLabel">${esc(awayT.s)} · ${esc(awayT.formation)}</div>
        <div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${matchdayLineupPitchHTML(awayT, awayS.xi, awayS.slots, awayCoords)}</div>
      </div>
    </div>`;
  const body = `${lineupsHTML}
    <div class="ofh" style="grid-template-columns:auto 1fr;padding:16px 0 10px">${crestHTML(opp, 34)}<span class="who"><b>${esc(opp.n)}</b><small>${mySide === 'h' ? 'You are at home' : 'You are away'}${posTxt}</small></span></div>
    <div class="kv" style="display:grid;grid-template-columns:auto 1fr;gap:6px 14px;align-items:center;margin:0 0 10px"><span class="hint">Form</span><span>${formHTML}</span><span class="hint">Shape</span><b>${esc(opp.formation || '4-4-2')}</b><span class="hint">Strength</span><b>${Math.round(teamOverall(opp))} v ${Math.round(teamOverall(me0))} (you)</b></div>
    <div class="hint" style="margin:0 0 4px">Players to watch</div>
    ${key.map(p => `<div class="res" style="grid-template-columns:auto 1fr auto;gap:8px"><div>${ratingTag(p.rating)}</div><div class="h">${esc(p.name)} <span class="hint">${esc(p.pos)}</span></div><div class="a">${p.goals}g ${p.assists}a</div></div>`).join('')}
    ${hurt ? `<p class="hint" style="margin:8px 0 0">Missing: ${esc(hurt.name)} (injured).</p>` : ''}${mine ? `<p class="hint" style="margin:4px 0 0">${mine} of your players ${mine === 1 ? 'is' : 'are'} unavailable.</p>` : ''}
    <p style="margin:10px 0 0;color:#f2b928"><b>Scouting tip:</b> ${tip}</p>`;
  openModal('Match preview', body, `<button class="btn sm" id="mpGo">Continue</button>`);
  $('#mpGo').onclick = () => { closeModal(); next(); };
}
  function preMatchFlow(ctx, m, kind, tier, mySide, oppTeam) { showMatchPreview(oppTeam, mySide, kind, () => preMatchFlow0(ctx, m, kind, tier, mySide, oppTeam)); } function preMatchFlow0(ctx, m, kind, tier, mySide, oppTeam) {   showPressConference(oppTeam.n, (presTone) => {     const myTeamObj = G.teams[G.myTeam];     const myOverall = teamOverall(myTeamObj);     const oppOverall = teamOverall(oppTeam);     showTeamTalk(myOverall, oppOverall, (talk) => {       const delta = presTone.mood + talk.delta;       if (delta) { if (mySide === 'h') ctx.luckH += delta; else ctx.luckA += delta; }       if (presTone.key !== 'skip' || talk.key !== 'skip') {         news(G, 'career', `Before kickoff vs ${oppTeam.n}: "${presTone.label}"${talk.key !== 'skip' ? ` — team talk: ${talk.label}.` : '.'}`);       }       beginLiveMatch(ctx, m, kind, tier);     });   }); } function beginLiveMatch(ctx, m, kind, tier) {
  if (tab !== 'match') { tab = 'match'; document.querySelectorAll('.view').forEach(v => v.classList.remove('on')); const av = $('#v-match'); if (av) av.classList.add('on'); }
  playSound('whistle');
  musicFade(0.05 * musicVol, 1500);
  const mySide = m.h === G.myTeam ? 'h' : 'a';
  const oppPool = MANAGER_AVATARS.filter(a => a !== G.manager.avatar);
  const oppAvatar = oppPool[Math.floor(rnd() * oppPool.length)] || MANAGER_AVATARS[0];
  liveState = {
    ctx, m, tier, mySide, kind, minute: 0, half: 1,
    speed: 1, paused: false, started: false, ft: false,
    timer: null, raf: null,
    ballX: 50, ballY: 75, ball: { tx: 50, ty: 75 },
    pos: {}, flash: null, oppAvatar
  };
  ctx.evAll = [];
  runPeriod(G, ctx, 1, 45);
  liveState.firstHalf = ctx.ev.slice();
  renderLive();
  requestAnimationFrame(liveDraw);
  startCrowd();
}
function startLive() {
  const t = me(), tier = t.tier;
  const idx = myMatchIndex(G, G.round);
  if (idx < 0) { simRounds(1); return; }
  const m = G.fixtures[tier][G.round][idx];
  try { intlRoundHook(G); } catch (e) { console.error('intl', e); }
  const ctx = createMatch(G, m.h, m.a, false);
  if (ctx.forfeit) {   /* a forfeited game is never played live: settle it and go straight to the result */
    finishMatch(G, ctx); commitMatch(G, tier, m, ctx);
    const res = playRound(G, true);
    afterLeaguePortion(res);
    return;
  }
  beginLiveMatch(ctx, m, 'league', tier);
  const mySide = m.h === G.myTeam ? 'h' : 'a';
  const oppTeam = G.teams[mySide === 'h' ? m.a : m.h];
  preMatchFlow(ctx, m, 'league', tier, mySide, oppTeam);
}
function startLiveCup() {
  const m = G.cup.mine;
  if (!m) return;
  const ctx = createMatch(G, m.h, m.a, true);
  if (ctx.forfeit) { const ties = playCupRound(G, false); afterCupMatchday({ cup: ties }); return; }
  beginLiveMatch(ctx, m, 'cup', null);
  const mySide = m.h === G.myTeam ? 'h' : 'a';
  const oppTeam = G.teams[mySide === 'h' ? m.a : m.h];
  preMatchFlow(ctx, m, 'cup', null, mySide, oppTeam);
}
/* ================= your own continental ties, played live ================= */ /* When a continental round comes up and your club is in it, the round is held: you play your    legs live (1st leg, then 2nd leg; the final is a single match), the league waits, and then    the normal resolver finishes the round using YOUR scores. Every other tie is simulated as before. */ function contPending() {   const L = G.contLive;   if (!L) return null;   if (L.season !== G.season) { G.contLive = null; return null; }   /* never carry a tie into another season */   return L; } function contMine(e) { return !!e && e.sa && e.id === G.myTeam; } function contSame(x, y) { return !!x && !!y && x.sa === y.sa && x.id === y.id; } function contTeam(e) { return e.sa ? G.teams[e.id] : buildForeignClub(G, e.id); } function contName(L) { return L.k === 'caf' ? CAF_NAME : CONFED_NAME; } function contRoundLabel(L) { return (CAF_ROUNDS[L.stage] || 'Round') + (L.stage === 3 ? '' : ` · ${L.leg === 1 ? '1st' : '2nd'} leg`); } /* leg 1 and the final are at the first club's ground, leg 2 at the other's */ function contHome(L) { return (L.stage === 3 || L.leg === 1) ? L.a : L.b; } function contAway(L) { return (L.stage === 3 || L.leg === 1) ? L.b : L.a; } /* calendar day a leg is played: shortly after the league matchday that triggered it (cup day is +3) */ function contDayIdx(G) {   const L = contPending(); if (!L) return null;   const d = new Date(dateForRound(L.round - 1, G.season) + 'T12:00:00Z');   d.setUTCDate(d.getUTCDate() + (L.leg === 1 ? 1 : 5));   return Math.round((d.getTime() - seasonStartUTC(G.season)) / 86400000); } function isContDayToday() { if (G.finished || !contPending()) return false; const i = contDayIdx(G); return i != null && (G.curDay || 0) >= i; } function bumpCurDayForCont(G) { const i = contDayIdx(G); if (i != null) G.curDay = Math.max(G.curDay || 0, i) + 1; } /* which cup-like fixture comes first: 'cont', 'cup' or null */ function cupLikeNext() {   if (G.finished) return null;   const a = contPending() ? contDayIdx(G) : null, b = cupDueNow(G) ? cupDayIdx(G) : null;   if (a != null && (b == null || a <= b)) return 'cont';   return b != null ? 'cup' : null; } /* called when a continental round is due: if your club has a tie, hold the round */ function contHold(G, k) {   const c = G.africa && G.africa[k];   if (!c || c.done) return false;   for (let i = 0; i + 1 < c.alive.length; i += 2) {     const A = c.alive[i], B = c.alive[i + 1];     if (contMine(A) || contMine(B)) {       G.contLive = { k, stage: c.stage, round: G.round, season: G.season, leg: 1, legs: [null, null], a: A, b: B, keys: [] };       return true;     }   }   return false; } /* the resolver asks for your recorded scores instead of simulating your tie */ function contLiveLegs(G, key, stage, A, B) {   const D = G.contDone;   if (!D || D.k !== key || D.stage !== stage || !contSame(D.a, A) || !contSame(D.b, B)) return null;   return D.legs; } function contResolve(G) {   const L = G.contLive;   G.contDone = { k: L.k, stage: L.stage, a: L.a, b: L.b, legs: L.legs };   G.contLive = null;   let ties = null;   try { ties = L.k === 'caf' ? playCAFRound(G) : playConfedRound(G); } finally { G.contDone = null; }   return ties; } /* record one leg ([home goals, away goals] for that leg); resolves the round after the last one */ function contFinishLeg(G, score, goals) {   const L = contPending(); if (!L) return null;   const info = { name: contName(L), label: contRoundLabel(L), k: L.k, stage: L.stage, home: contHome(L), away: contAway(L), score, goals: goals || '', final: false, ties: null, next: null };   L.legs[L.leg - 1] = score;   if (L.stage === 3 || L.leg === 2) { info.final = true; info.ties = contResolve(G); }   else { L.leg = 2; info.next = { home: contHome(L), oppE: contMine(L.a) ? L.b : L.a }; }   return info; } function contSimLeg(G) {   const L = contPending(); if (!L) return null;   return contFinishLeg(G, cafLeg(G, contHome(L), contAway(L)), ''); } function contQuickSim(silent) {   let info = null;   for (let g = 0; contPending() && g < 3; g++) info = contSimLeg(G) || info;   if (!silent && info) contShowResult(info);   return info; } function quickSimCupDay() {   if (cupLikeNext() === 'cont') { contQuickSim(); return; }   bumpCurDayForCup(G); const ties = playCupRound(G, false); afterCupMatchday({ cup: ties }); } function startContDay() {   const L = contPending(); if (!L) return;   bumpCurDayForCont(G);   if (!G.liveMode) { contQuickSim(); return; }   const home = contHome(L), away = contAway(L), H = contTeam(home), A = contTeam(away);   if (!H || !A) { contQuickSim(); return; }   const mySide = contMine(home) ? 'h' : 'a';   const ctx = createMatchTeams(H, A, L.stage === 3);   /* the live screen looks teams up by id in G.teams; a foreign club isn't in there, so for the length of this      one match it sits under a text key (ignored by every loop, and by saving) and is removed afterwards */   L.keys = [];   if (!home.sa) { ctx.h = 'f' + home.id; G.teams[ctx.h] = H; L.keys.push(ctx.h); }   if (!away.sa) { ctx.a = 'f' + away.id; G.teams[ctx.a] = A; L.keys.push(ctx.a); }   preMatchFlow(ctx, { h: ctx.h, a: ctx.a }, 'cont', null, mySide, mySide === 'h' ? A : H); } function endLiveCont(ls) {   const L = contPending();   const goals = goalList(ls.ctx.ev || []);           /* built while the foreign club is still registered */   ((L && L.keys) || []).forEach(k => { const t = G.teams[k]; delete G.teams[k]; if (t && t.squad) t.squad.forEach(p => { p.inj = 0; p.pendingInj = 0; }); });   if (L) L.keys = [];   liveState = null;   const info = contFinishLeg(G, [ls.ctx.hg, ls.ctx.ag], goals);   if (info) contShowResult(info); } function contShowResult(info) {   afterRound();   const myTie = info.final && info.ties ? info.ties.find(t => !t.bye && (contMine(t.a) || contMine(t.b))) : null;   let body = `<div class="cupMdHead"><span class="cupMdIco">🌍</span><b>${esc(info.name)}</b><span class="hint">${esc(info.label)}</span></div>`;   if (myTie) {     const won = contMine(myTie.winner);     const champs = won && info.stage === 3;     body += contResultLine(myTie).replace('margin-top:3px', 'margin:10px 0;font-size:18px;text-align:center');     body += `<p style="text-align:center;color:var(--dim);margin:0">${champs ? `Champions of Africa — you win the ${esc(info.name)}!` : won ? 'Through to the next round!' : 'Knocked out.'}</p>${info.goals}`;     body += continentalRoundHTML(info.k === 'caf' ? { caf: info.ties } : { confed: info.ties });   } else {     body += `<div style="text-align:center;margin:10px 0;font-size:18px">${contSide(info.home)} <b class="num" style="margin:0 8px">${info.score[0]}–${info.score[1]}</b> ${contSide(info.away)}</div>`;     if (info.next) body += `<p style="text-align:center;color:var(--dim);margin:0">Second leg: ${contMine(info.next.home) ? 'home to' : 'away to'} ${esc(cafShort(G, info.next.oppE))}.</p>`;     body += info.goals;   }   openModal(`${info.name} — Matchday`, body,     `<button class="btn ghost sm" onclick="closeModal();tab='africa';render()">See the competition</button>      <button class="btn sm" onclick="closeModal();maybeShowPendingOffer()">Continue</button>`); }  /* ---- standalone cup matchday (its own day, separate from the league) ---- */
function startCupMatchday() {
  if (cupLikeNext() === 'cont') { startContDay(); return; }
  if (!cupDueNow(G)) return;
  bumpCurDayForCup(G);
  if (G.liveMode) {
    const ties = playCupRound(G, true);
    if (G.cup.mine) { startLiveCup(); return; }
    afterCupMatchday({ cup: ties });
  } else {
    const ties = playCupRound(G, false);
    afterCupMatchday({ cup: ties });
  }
}
function afterCupMatchday(res) {
  afterRound();
  showCupMatchdayModal(res);
}
function showCupMatchdayModal(res) {
  const myTie = (res.cup || []).find(t => t.h === G.myTeam || t.a === G.myTeam);
  let body = `<div class="cupMdHead"><span class="cupMdIco">🏆</span><b>${esc(CUP_NAME)}</b><span class="hint">${esc(CUP_ROUNDS[(myTie || {}).stage] || CUP_ROUNDS[G.cup.stage - 1] || 'Round')}</span></div>`;
  if (myTie) {
    const H = G.teams[myTie.h], A = G.teams[myTie.a];
    const pensTxt = myTie.pens ? ` <small>(${myTie.pens[0]}–${myTie.pens[1]} pens)</small>` : '';
    const verdict = myTie.forfeit ? (myTie.winner === G.myTeam ? `${esc(G.teams[myTie.forfeit === 'h' ? myTie.h : myTie.a].s)} forfeited: you go through (3-0 awarded).` : `Forfeited: fewer than ${MIN_TO_PLAY} fit players. You are knocked out and fined ${money(myTie.fine)}.`) : (myTie.winner === G.myTeam ? 'Through to the next round!' : 'Knocked out.');
    body += `<div class="fixture" style="padding:4px 0">
      <div class="side">${crestHTML(H, 30)}<div><b>${esc(H.s)}</b><small>${esc(H.city)}</small></div></div>
      <div class="score num">${myTie.hg}–${myTie.ag}${pensTxt}</div>
      <div class="side away">${crestHTML(A, 30)}<div><b>${esc(A.s)}</b><small>${esc(A.city)}</small></div></div>
    </div>
    <p style="text-align:center;color:var(--dim);margin:0">${verdict}</p>
    ${myTie.forfeit ? '' : goalList(myTie.ev || [])}`;
  } else {
    body += cupRoundHTML(res.cup);
  }
  openModal(`${CUP_NAME} — Matchday`, body,
    `<button class="btn ghost sm" onclick="closeModal();tab='cups';render()">See the cup</button>
     <button class="btn sm" onclick="closeModal();maybeShowPendingOffer()">Continue</button>`);
}

function clubInitials(n) {   return ((n || '').split(/\s+/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 3)) || '??'; } function liveFplHTML(p, i, slots, teamObj, prefix, away) {
  const coords = FORM_COORDS[teamObj.formation] || FORM_COORDS['4-4-2'];
  const [cx, cy] = coords[i];
  const advX = cy * 0.48;
  const left = away ? (100 - advX) : advX;
  const top = away ? (100 - cx) : cx;
  return `<button class="fpl live" id="lv-${prefix}${i}" data-lpid="${p.id}" style="left:${left}%;top:${top}%">
    <div class="prow3"><div class="pface" style="--pring:${teamObj.c1}">${faceSVG(p, 18, teamObj.c1)}${teamObj.captainId === p.id ? '<span class="cband">C</span>' : ''}</div></div>
    <span class="fnm2">${esc(p.last || p.name)}</span></button>`;
}
function renderLive() {
  const ls = liveState, ctx = ls.ctx;
  const H = G.teams[ctx.h], A = G.teams[ctx.a];
  const v = $('#v-match'); v.classList.add('mmx');
  setLiveFullscreen(true);
  const homeCards = ctx.xiH.map((p, i) => liveFplHTML(p, i, ctx.slotsH, H, 'h', false)).join('');
  const awayCards = ctx.xiA.map((p, i) => liveFplHTML(p, i, ctx.slotsA, A, 'a', true)).join('');
  const homeMgr = ls.mySide === 'h' ? { av: G.manager.avatar, nm: G.manager.name } : { av: ls.oppAvatar, nm: clubInitials(H.n) + ' Manager' };
  const awayMgr = ls.mySide === 'a' ? { av: G.manager.avatar, nm: G.manager.name } : { av: ls.oppAvatar, nm: clubInitials(A.n) + ' Manager' };
  v.innerHTML = `<div class="livewrap">
    <div class="livemain">
      <div class="livebar">
        <div class="nm">${crestHTML(H, 24)} ${esc(H.s)}</div>
        <div class="sc"><span id="liveScore">0–0</span><span class="clock" id="liveClock">Kick-off</span></div>
        <div class="nm a">${esc(A.s)} ${crestHTML(A, 24)}</div>
      </div>
      <div class="hint" style="text-align:center;padding:2px 0">${esc(stadiumName(H))}</div>       <div class="liveMgrBar">
        <div class="liveMgr liveMgr-h">${avatarSVG(homeMgr.av, 22)}<span>${esc(homeMgr.nm)}</span></div>
        <div class="liveMgr liveMgr-a">${avatarSVG(awayMgr.av, 22)}<span>${esc(awayMgr.nm)}</span></div>
      </div>
      <div class="livepitch" id="livePitch" aria-label="Live match view"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i><div class="ball" id="liveBall">${evIcon('goal')}</div>${homeCards}${awayCards}</div>
      <div id="liveBanner"></div>
      <div class="chipbar" id="liveCtl"></div>
      <div id="liveSpot"></div>
      <div id="livePcard"></div>
    </div>
    <div class="liveside">
      <div class="livesideHead"><span>Commentary</span><span class="kbhint">Space pause · 1-4 speed · B subs · S skip</span></div>       <div class="liveStats" id="liveStats"></div>       <div class="tickFilter" id="tickFilter"><button type="button" data-tf="all">All</button><button type="button" data-tf="key">Key moments</button><button type="button" data-tf="goals">Goals</button></div>
      <div class="liveticker" id="liveTicker"><div class="hint" style="padding:8px 12px">Kick-off is moments away.</div></div>
    </div>
  </div>`;
  $('#actions').innerHTML = '';
  liveControls();
  updateLiveScore();
  renderLiveStats();
  initTickFilter();
  const pitchClick = $('#livePitch');
  if (pitchClick) pitchClick.onclick = e => {
    const b = e.target.closest('.fpl.live'); if (!b) return;
    const m = /^lv-([ha])(\d+)$/.exec(b.id); if (m) showLivePlayerCard(m[1], +m[2]);
  };
  maybeLandscapeHint();
}
function showLivePlayerCard(side, i) {
  const ls = liveState, box = $('#livePcard'); if (!ls || !box) return;
  const xi = side === 'h' ? ls.ctx.xiH : ls.ctx.xiA;
  const slots = side === 'h' ? ls.ctx.slotsH : ls.ctx.slotsA;
  const p = xi[i]; if (!p) return;
  const teamId = side === 'h' ? ls.ctx.h : ls.ctx.a, T = G.teams[teamId];
  const evs = ls.ctx.ev.filter(e => e.min <= ls.minute && e.side === side);
  const goals = evs.filter(e => e.type === 'goal' && e.scorer === p.id).length;
  const assists = evs.filter(e => e.type === 'goal' && e.assist === p.id).length;
  const yel = evs.filter(e => e.type === 'card' && e.card === 'yellow' && e.scorer === p.id).length;
  const red = evs.filter(e => e.type === 'card' && e.card === 'red' && e.scorer === p.id).length;
  const bits = [];
  if (goals) bits.push(evIcon('goal') + ' ' + goals);
  if (assists) bits.push(evIcon('assist') + ' ' + assists);
  if (yel) bits.push(evIcon('yellow') + ' ' + yel);
  if (red) bits.push(evIcon('red'));
  box.innerHTML = `<div class="livepcard">${faceSVG(p, 46, T.c1)}<div><b>${esc(p.name)}</b><span class="hint">${esc(slots[i] || p.pos)} · ${p.rating}</span><span class="hint">${esc(T.s)}</span><span class="hint">${bits.length ? bits.join(' ') : 'Quiet so far'}</span></div></div>`;
  clearTimeout(ls.pcardT);
  ls.pcardT = setTimeout(() => { const b = $('#livePcard'); if (b) b.innerHTML = ''; }, 4500);
}
function showFullTimeCard() {   try { fadeOutCrowd(); } catch (e) { }   const pitch = $('#livePitch'); if (!pitch || $('#liveFT')) return;   const ls = liveState, H = G.teams[ls.ctx.h], A = G.teams[ls.ctx.a];   const sc = $('#liveScore');   const el = document.createElement('div');   el.id = 'liveFT';   el.innerHTML = `<small>FULL TIME</small><b>${esc(H.s)} ${esc(sc ? sc.textContent : '')} ${esc(A.s)}</b>`;   pitch.appendChild(el); } function liveControls() {
  const ls = liveState, c = $('#liveCtl'); if (!c) return;

if (ls.interlude) {
    c.innerHTML = ls.htWalk === 'off'
      ? `<button class="chip" id="liveHT" aria-pressed="true">${ls.htShown ? 'Half-time — start 2nd half' : 'Skip ▸ half-time'}</button>`
      : '';

    const hb = $('#liveHT');
    if (hb) hb.onclick = () => {
      if (!ls.htShown) openHalfTimeOnce(ls);
      else halfTime();
    };
    return;
}

  let h = '';
  if (ls.ft) h = `<button class="chip" id="liveDone">Full time — see the report</button>`;
  else if (!ls.started) h = `<button class="chip" id="liveGo">Kick off</button>`;
  else h = `<button class="chip" id="livePause" aria-pressed="${!!ls.paused}">${ls.paused ? 'Resume' : 'Pause'}</button>`;
  if (!ls.ft) {
    h += [1, 2, 4, 8].map(s => `<button class="chip" data-sp="${s}" aria-pressed="${ls.speed === s}">${s}x</button>`).join('');
    if (ls.started) { const su = ls.mySide === 'h' ? ls.ctx.subsH : ls.ctx.subsA; h += `<button class="chip" id="liveSubs"${su >= 5 ? ' disabled' : ''}>Subs (${Math.max(0, 5 - su)})</button>`; }     h += `<button class="chip" id="liveSkip">Skip to result</button>`;
  }
  c.innerHTML = h;
  const pitchEl = $('#livePitch'); if (pitchEl) pitchEl.classList.toggle('paused', !!ls.paused && !ls.ft);
  const go = $('#liveGo'); if (go) go.onclick = liveGo;
  const pa = $('#livePause'); if (pa) pa.onclick = livePause;
  const done = $('#liveDone');   if (done) {     showFullTimeCard();     done.onclick = () => {       if (ls.leaving) return; ls.leaving = true;       const app = document.getElementById('app');       if (!app) { endLive(); return; }       app.style.transition = 'opacity .35s ease'; app.style.opacity = '0';       setTimeout(() => {         endLive();         app.style.opacity = '';         setTimeout(() => { app.style.transition = ''; }, 400);       }, 350);     };   }
  c.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => { ls.speed = +b.dataset.sp; liveControls(); if (ls.timer) liveSchedule(); });
  const sk = $('#liveSkip'); if (sk) sk.onclick = skipLive;   const sb = $('#liveSubs'); if (sb) sb.onclick = openLiveSubs;
}

function liveGo() {
  const ls = liveState;
  if (!ls.kicked) { ls.kicked = true; pushComm(`Kick-off at ${esc(stadiumName(G.teams[ls.ctx.h]))}: ${esc(G.teams[ls.ctx.h].s)} v ${esc(G.teams[ls.ctx.a].s)}.`); }
  ls.started = true; ls.paused = false;
  liveBanner('');
  liveControls();
  liveSchedule();
}

function livePause() {
  const ls = liveState;
  ls.paused = !ls.paused;
  if (ls.paused) { clearTimeout(ls.timer); ls.timer = null; } else liveSchedule();
  liveControls();
}

function liveBanner(txt) {
  const b = $('#liveBanner'); if (b) b.innerHTML = txt ? `<div class="banner">${txt}</div>` : '';
}

/* live match stats: generated for display from team strength, consistent with the score (does not affect results) */ function setTickFilter(mode) {
  if (mode !== 'key' && mode !== 'goals') mode = 'all';
  try { localStorage.setItem('mm_tickfilter', mode); } catch (e) { }
  const t = $('#liveTicker'); if (t) { t.classList.remove('f-key', 'f-goals'); if (mode !== 'all') t.classList.add('f-' + mode); }
  document.querySelectorAll('#tickFilter [data-tf]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tf === mode)));
}
function initTickFilter() {
  let mode = 'all';
  try { mode = localStorage.getItem('mm_tickfilter') || 'all'; } catch (e) { }
  document.querySelectorAll('#tickFilter [data-tf]').forEach(b => b.onclick = () => setTickFilter(b.dataset.tf));
  setTickFilter(mode);
}
function liveStatsStep(ls) {   const s = ls.st, c = ls.ctx;   const hS = c.sh.att + c.sh.def, aS = c.sa.att + c.sa.def;   const target = clamp(50 + (hS - aS) * 0.55, 32, 68);   s.pH = clamp(s.pH + (target - s.pH) * 0.06 + (Math.random() - 0.5) * 1.6, 25, 75);   s.pSum += s.pH; s.pn++;   [['h', c.sh, c.sa, s.pH], ['a', c.sa, c.sh, 100 - s.pH]].forEach(([side, me, op, poss], k) => {     const f = clamp(Math.pow(me.att / Math.max(1, op.def), 2), 0.65, 1.3);     if (Math.random() < 0.13 * f * Math.pow(poss / 50, 0.8)) { s.sh[k]++; const on = Math.random() < 0.36; if (on) s.sot[k]++; if (ls.minute === s.at && ls.minute < 92 && !ls.ft) { try { commShot(ls, k, on); } catch (e) { } } }   }); } function liveStatsTick(ls) {   ls.st = ls.st || { pH: 50, pSum: 0, pn: 0, sh: [0, 0], sot: [0, 0], at: 0 };   while (ls.st.at < ls.minute) { ls.st.at++; liveStatsStep(ls); }   ls.ctx.ev.forEach(e => {     if (e.type === 'goal' && e._shown && !e._statd) { e._statd = true; const k = e.side === 'h' ? 0 : 1; ls.st.sh[k]++; ls.st.sot[k]++; }   });   renderLiveStats(); } function renderLiveStats() {   const ls = liveState, box = $('#liveStats'); if (!ls || !box) return;   const s = ls.st || { pSum: 0, pn: 0, sh: [0, 0], sot: [0, 0] };   const ph = s.pn ? Math.round(s.pSum / s.pn) : 50, pa = 100 - ph;   box.innerHTML = `<div class="lsrow"><b>${ph}%</b><span>Possession</span><b>${pa}%</b></div>     <div class="lsbar"><i style="width:${ph}%"></i></div>     <div class="lsrow"><b>${s.sh[0]}</b><span>Shots</span><b>${s.sh[1]}</b></div>     <div class="lsrow"><b>${s.sot[0]}</b><span>On target</span><b>${s.sot[1]}</b></div>`; } function updateLiveScore() {
  const ls = liveState;
  const goals = ls.ctx.ev.filter(e => e.type === 'goal' && e.min <= ls.minute);
  const hg = goals.filter(e => e.side === 'h').length, ag = goals.filter(e => e.side === 'a').length;
  const sc = $('#liveScore'); if (sc) sc.textContent = `${hg}–${ag}`;
  const ck = $('#liveClock');
  if (ck) ck.className = 'clock ' + (ls.ft ? 'ft' : !ls.started ? 'ko' : ls.paused ? 'pz' : 'lv');   if (ck) ck.textContent = ls.ft ? 'Full time' : !ls.started ? (ls.minute > 0 ? 'Half-time' : 'Kick-off') : ls.minute + "'";
}

const EV_ICONS = {   goal: '<svg class="evi" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#1b1b1b" stroke-width="1.4"/><path d="M12 7l3.7 2.7-1.4 4.3H9.7L8.3 9.7z" fill="#1b1b1b"/><path d="M12 7V2.2M15.7 9.7l4.5-1.5M14.3 14l2.8 3.9M9.7 14l-2.8 3.9M8.3 9.7L3.8 8.2" stroke="#1b1b1b" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>',   yellow: '<svg class="evi" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.2" y="3" width="11.6" height="18" rx="2" fill="#ffd400" stroke="#b08f00" stroke-width="1" transform="rotate(-8 12 12)"/></svg>',   red: '<svg class="evi" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.2" y="3" width="11.6" height="18" rx="2" fill="#e3202a" stroke="#8e0f16" stroke-width="1" transform="rotate(-8 12 12)"/></svg>',   injury: '<svg class="evi amb" viewBox="0 0 40 24" aria-hidden="true"><rect class="amb-l1" x="9" y="2" width="5" height="3" rx="1" fill="#ff2b2b"/><rect class="amb-l2" x="15" y="2" width="5" height="3" rx="1" fill="#1f6bff"/><rect x="2" y="5" width="27" height="13" rx="2" fill="#fff" stroke="#6b7782" stroke-width=".8"/><path d="M29 8h5.2l3.8 4.6V18H29z" fill="#fff" stroke="#6b7782" stroke-width=".8" stroke-linejoin="round"/><path d="M30.8 9.7h3l2.4 2.9h-5.4z" fill="#9fd3f5"/><rect x="2" y="13.1" width="36" height="2.5" fill="#d7141a"/><g transform="translate(15.5 9)" fill="#0b62b8"><rect x="-.9" y="-3.6" width="1.8" height="7.2" rx=".4"/><rect x="-.9" y="-3.6" width="1.8" height="7.2" rx=".4" transform="rotate(60)"/><rect x="-.9" y="-3.6" width="1.8" height="7.2" rx=".4" transform="rotate(120)"/></g><circle cx="9" cy="19" r="3.2" fill="#23272b"/><circle cx="9" cy="19" r="1.2" fill="#aab3bb"/><circle cx="31.5" cy="19" r="3.2" fill="#23272b"/><circle cx="31.5" cy="19" r="1.2" fill="#aab3bb"/></svg>',   sub: '<svg class="evi" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 4v13M3.5 13.2l4 4 4-4" stroke="#e5484d" stroke-width="2.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 20V7M12.5 10.8l4-4 4 4" stroke="#2fc46d" stroke-width="2.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',   flag: '<svg class="evi" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 3v18" stroke="#c9ced3" stroke-width="1.8" stroke-linecap="round"/><path d="M8.3 4.2l10 3.6-10 3.6z" fill="#ffd400"/></svg>',   assist: '<svg class="evi" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4.5" fill="#2f7de1"/><text x="12" y="17.2" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="Arial,Helvetica,sans-serif">A</text></svg>' }; function mmBallSvg() {   const C = 16, R = 14.6, P = (r, a) => [C + r * Math.cos(a * Math.PI / 180), C + r * Math.sin(a * Math.PI / 180)];   const pent = (cx, cy, r, rot) => Array.from({ length: 5 }, (_, k) => { const a = (rot + 72 * k) * Math.PI / 180; return (cx + r * Math.cos(a)).toFixed(2) + ',' + (cy + r * Math.sin(a)).toFixed(2); }).join(' ');   let patches = '<polygon points="' + pent(C, C, 4.6, -90) + '" fill="#14171a"/>', seams = '';   for (let k = 0; k < 5; k++) {     const a = -90 + 72 * k, v = P(4.6, a), i = P(8.6, a), o = P(12.9, a);     seams += 'M' + v[0].toFixed(2) + ' ' + v[1].toFixed(2) + 'L' + i[0].toFixed(2) + ' ' + i[1].toFixed(2);     patches += '<polygon points="' + pent(o[0], o[1], 4.5, a + 180) + '" fill="#14171a"/>';     [-1, 1].forEach(s => { const q = P(10.9, a + s * 20), e = P(R + 1, a + s * 38); seams += 'M' + q[0].toFixed(2) + ' ' + q[1].toFixed(2) + 'L' + e[0].toFixed(2) + ' ' + e[1].toFixed(2); });   }   return '<svg class="evi mmball" viewBox="0 0 32 32" aria-hidden="true"><defs><clipPath id="mmbC"><circle cx="16" cy="16" r="' + R + '"/></clipPath></defs><circle cx="16" cy="16" r="' + R + '" fill="#f4f6f8"/><g clip-path="url(#mmbC)">' + patches + '<path d="' + seams + '" stroke="#8d959d" stroke-width="1" fill="none" stroke-linecap="round"/></g><circle cx="16" cy="16" r="' + R + '" fill="none" stroke="#3a4046" stroke-width="1.2"/></svg>'; } const MM_BALL = mmBallSvg(); function evIcon(kind) { return (kind === 'goal' || kind === 'flag') ? MM_BALL : (EV_ICONS[kind] || ''); }  function liveRedCard(e) {   const ls = liveState; if (!ls) return;   const el = document.querySelector('[data-lpid="' + e.scorer + '"]');   if (el) { el.classList.add('sentoff'); setTimeout(() => { if (el.parentNode) el.remove(); }, 600); }   if (!ls.paused && !ls.ft) {     liveBanner('🟥 RED CARD! ' + e.sName);     clearTimeout(ls.flashT);     ls.flashT = setTimeout(() => { if (liveState === ls && !ls.paused) liveBanner(''); }, 2200);   } } /* ---- live commentary: shots, kick-off, half-time and full-time lines in the ticker ---- */
function pushComm(txt) {
  const t = $('#liveTicker'), ls = liveState; if (!t || !ls) return;
  t.insertBefore(el('div', 'tick sp', `<span class="m">${ls.minute}'</span><span>${evIcon('flag')}</span><span>${txt}</span>`), t.firstChild);
}
function commShot(ls, k, onTarget) {
  const c = ls.ctx, side = k === 0 ? 'h' : 'a', xi = side === 'h' ? c.xiH : c.xiA, slots = side === 'h' ? c.slotsH : c.slotsA, off = offIds(c);
  const pool = xi.map((p, i) => ({ p, slot: slots[i] || p.pos })).filter(x => x.slot !== 'GK' && !off.has(x.p.id));
  if (!pool.length) return;
  const w = { ST: 5, CF: 5, LW: 3.5, RW: 3.5, CAM: 3, LM: 2.5, RM: 2.5, CM: 2, CDM: 1, LWB: 1, RWB: 1, LB: 0.6, RB: 0.6, CB: 0.5 };
  const sh = wpick(pool, x => w[x.slot] || 1).p, n = `<b>${esc(sh.last || sh.name)}</b>`;
  const oxi = side === 'h' ? c.xiA : c.xiH, osl = side === 'h' ? c.slotsA : c.slotsH, gk = oxi.find((p, i) => osl[i] === 'GK');
  const g = gk ? esc(gk.last || gk.name) : 'the keeper';
  pushComm(pick(onTarget
    ? [`${n} tests the keeper with a strike from the edge of the area`, `${g} palms away a fierce effort from ${n}`, `${n} drives it low and ${g} gets down well to save`, `Good save! ${g} denies ${n}`]
    : [`${n} drags his shot wide`, `${n} fires over the bar`, `${n} hits the side netting`, `A half chance for ${n}, but it goes wide`, `${n} blazes it over`]));
}
  function pushTick(e) {
  if (e.type === 'goal') playSound('goal');
  else if (e.type !== 'goal') evSound(e.type);
  const t = $('#liveTicker'); if (!t) return;
 const icon = e.type === 'goal' ? evIcon('goal') : e.type === 'card' ? evIcon(e.card === 'red' ? 'red' : 'yellow') : e.type === 'injury' ? evIcon('injury') : evIcon('sub');
  const team = G.teams[e.team];
  let txt;
  if (e.type === 'goal') txt = `<b>${esc(e.sName)}</b> scores ${e.penalty ? 'from the penalty spot' : 'for ' + esc(team.s)}${e.aName && !e.penalty ? `, set up by ${esc(e.aName)}` : ''}`;
  else if (e.type === 'card') txt = e.card === 'red' ? `<b>${esc(e.sName)}</b> (${esc(team.s)}) is sent off${e.second ? ' for a second booking' : ''}!` : `${esc(e.sName)} (${esc(team.s)}) is booked`;
  else if (e.type === 'injury') txt = `${esc(e.sName)} (${esc(team.s)}) goes down injured`;
  else txt = `${esc(team.s)} bring on ${esc(e.sName)}${e.outName ? ' for ' + esc(e.outName) : ''}`;
  if (e.type === 'goal' && liveState) { const gl = liveState.ctx.ev.filter(x => x.type === 'goal' && x.min <= e.min); txt = (e.penalty ? '' : pick(['What a finish! ', 'The net bulges! ', 'Clinical! ', 'He makes no mistake! ', ''])) + txt + ` <span class="hint">(${gl.filter(x => x.side === 'h').length}–${gl.filter(x => x.side === 'a').length})</span>`; }   const row = el('div', 'tick' + (e.type === 'goal' ? ' goal' : ''), `<span class="m">${e.min}'</span><span>${icon}</span><span>${txt}</span>`);
  t.insertBefore(row, t.firstChild);
}

function liveSchedule() {
  const ls = liveState;
  clearTimeout(ls.timer);
  ls.timer = setTimeout(liveTick, 460 / ls.speed);
}

function pushSetPieceTick(label) {
  const t = $('#liveTicker'); if (!t) return;
  const row = el('div', 'tick' + (/^PENALTY/.test(label) ? '' : ' sp'), `<span class="m">${liveState.minute}'</span><span>${evIcon('flag')}</span><span>${esc(label)}</span>`);
  t.insertBefore(row, t.firstChild);
}
function triggerSetPiece(ls, type) {
  const side = Math.random() < 0.5 ? 'h' : 'a';
  const name = side === 'h' ? G.teams[ls.ctx.h].s : G.teams[ls.ctx.a].s;
  let label, by, bx, hold = 2000;
  if (type === 'corner') {
    label = `Corner to ${name}`;
    by = side === 'h' ? 8 : 142; bx = Math.random() < 0.5 ? 6 : 94;
  } else if (type === 'throwin') {
    label = `Throw-in, ${name}`;
    by = 15 + Math.random() * 120; bx = Math.random() < 0.5 ? 6 : 94;
    hold = 1300;
  } else if (type === 'freekick') {
    label = `Free kick to ${name}`;
    by = side === 'h' ? 20 + Math.random() * 70 : 60 + Math.random() * 70;
    bx = 30 + Math.random() * 40;
  } else {
    const goalEv = ls.ctx.ev.find(e => e.type === 'goal' && e.side === side && !e._shown && e.min >= ls.minute && e.min <= ls.minute + 2);
    if (goalEv) goalEv.penalty = true;
    label = `PENALTY to ${name}!`;
    by = side === 'h' ? 18 : 132; bx = 50;
    hold = goalEv ? 1200 : 2800;
    if (!goalEv) {
      setTimeout(() => { if (liveState === ls) liveBanner(Math.random() < 0.5 ? `${name} fire it wide!` : 'Saved! Great stop by the keeper!'); }, 1300);
    }
  }
  ls.ball.ty = by; ls.ball.tx = bx; ls.ballY = by; ls.ballX = bx;
  ls.ballHoldUntil = performance.now() + hold;
  liveBanner(label);
  pushSetPieceTick(label);
  clearTimeout(ls.flashT);
  ls.flashT = setTimeout(() => { if (liveState === ls && !ls.paused) liveBanner(''); }, hold);
}
function liveTick() {
  const ls = liveState;
  if (!ls || ls.paused) return;
  try {
    ls.minute++;
    crowdMood();
    if (!ls.ballHoldUntil || performance.now() > ls.ballHoldUntil) {
      const s = ls.ctx.sh.att - ls.ctx.sa.att;
      const bias = clamp(s * 0.4, -5, 5);
      ls.ball.ty = clamp(ls.ballY - bias + (Math.random() - 0.5) * 70, 6, 144);
      ls.ball.tx = clamp(ls.ballX + (Math.random() - 0.5) * 46, 8, 92);
      const roll = Math.random();
      if (roll < 0.03) triggerSetPiece(ls, 'corner');
      else if (roll < 0.07) triggerSetPiece(ls, 'throwin');
      else if (roll < 0.10) triggerSetPiece(ls, 'freekick');
      else if (roll < 0.103) triggerSetPiece(ls, 'penalty');
    }
    ls.ctx.ev.forEach(e => {
      if (!e._shown && e.min <= ls.minute) {
        e._shown = true; pushTick(e);
        if (e.type === 'goal') {
          liveBanner(evIcon('goal') + (e.penalty ? ' PENALTY SCORED! ' : ' GOAL! ') + e.sName);
          clearTimeout(ls.flashT);
          ls.flashT = setTimeout(() => { if (liveState === ls && !ls.paused) liveBanner(''); }, 1800);
          const netY = e.side === 'h' ? 8 : 142, netX = 50 + (Math.random() - 0.5) * 24;
          ls.ball.tx = netX; ls.ball.ty = netY;
          ls.ballShotUntil = performance.now() + 650;
          ls.ballHoldUntil = performance.now() + 1800;
          if (e.side === ls.mySide) { crowdRoar(); }
          else crowdHush();
        }
        if (e.scorer) {
          const xi = e.side === 'h' ? ls.ctx.xiH : ls.ctx.xiA;
          const slots = e.side === 'h' ? ls.ctx.slotsH : ls.ctx.slotsA;
          const pi = xi.findIndex(pl => pl.id === e.scorer);
          const p = pi >= 0 ? xi[pi] : null;
          const spot = $('#liveSpot');
                  if (p && spot) spot.innerHTML = `<div class="livespot">${faceSVG(p, 46, G.teams[e.team].c1)}<div><b>${esc(p.name)}</b><span class="hint">#${pi + 1} · ${slots[pi] || p.pos} · ${esc(G.teams[e.team].s)}</span></div></div>`;
        }
      }
    });
    liveStatsTick(ls);
    updateLiveScore();
    const endAt = ls.half === 1 ? 45 : 92;
    if (ls.minute >= endAt) {
      ls.timer = null;
      uiSound('whistle2');
     if (ls.half === 1) { pushComm(`Half-time: ${esc(G.teams[ls.ctx.h].s)} ${ls.ctx.hg}–${ls.ctx.ag} ${esc(G.teams[ls.ctx.a].s)}`); liveBanner('Half-time'); startHalfTimeBreak(ls); }
      else { ls.ft = true; pushComm(`Full time: ${esc(G.teams[ls.ctx.h].s)} ${ls.ctx.hg}–${ls.ctx.ag} ${esc(G.teams[ls.ctx.a].s)}`); liveBanner('Full time'); liveControls(); }
      return;
    }
    liveSchedule();
  } catch (err) {
    if (typeof console !== 'undefined' && console.error) console.error('Mzansi Manager live match error:', err);
    try { skipLive(); } catch (err2) {
      liveState = null;
      tab = 'match'; render();
      toastWarn('The live match hit a snag and had to be ended early.');
    }
  }
}

function skipLive() {
  const ls = liveState;
  if (ls.timer) { clearTimeout(ls.timer); ls.timer = null; }
  if (ls.half === 1) {
    aiSubs(G, ls.ctx);
    runPeriod(G, ls.ctx, 46, 92);
    ls.half = 2;
  }
  ls.minute = 92;
  ls.started = true;
  ls.ctx.ev.forEach(e => { if (!e._shown) { e._shown = true; pushTick(e); } });
  liveStatsTick(ls);
  updateLiveScore();
  ls.ft = true;
  liveBanner('Full time');
  liveControls();
}

/* half-time: players walk off, then the changes screen opens; after Resume they walk back on before the second half starts */ function startHalfTimeBreak(ls) {   if (LIVE_REDUCE_MOTION) { liveControls(); halfTime(); return; }   ls.interlude = true; ls.htWalk = 'off'; ls.htAt = performance.now(); ls.htShown = false;   ls.ball.tx = 50; ls.ball.ty = 75;   liveControls();   setTimeout(() => openHalfTimeOnce(ls), 3500); } function openHalfTimeOnce(ls) {   if (liveState !== ls || !ls.interlude || ls.htWalk !== 'off' || ls.htShown) return;   ls.htShown = true; liveControls(); halfTime(); } function resumeAfterBreak(ls) {   if (LIVE_REDUCE_MOTION || ls.htWalk !== 'off') { ls.interlude = false; ls.htWalk = null; liveControls(); liveSchedule(); return; }   ls.htWalk = 'on'; ls.htOnAt = performance.now();   liveControls();   setTimeout(() => {     if (liveState !== ls) return;     ls.htWalk = null; ls.interlude = false; liveControls(); liveSchedule();   }, 3000); } const LIVE_REDUCE_MOTION = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); function liveDraw() {
  const ls = liveState;
  if (!ls) return;
  const pitchEl = $('#livePitch');
  if (!pitchEl) { requestAnimationFrame(liveDraw); return; }
  try {
    const H = G.teams[ls.ctx.h], A = G.teams[ls.ctx.a];
    const coordsH = FORM_COORDS[H.formation] || FORM_COORDS['4-4-2'];
    const coordsA = FORM_COORDS[A.formation] || FORM_COORDS['4-4-2'];
    const now = performance.now();
    if (ls.ft && !ls.ftBall) { ls.ftBall = true; ls.ball.tx = 50; ls.ball.ty = 75; }
    const inShot = ls.ballShotUntil && now < ls.ballShotUntil;
    const pull = inShot ? 0.22 : 0.07;
    ls.ballX += (ls.ball.tx - ls.ballX) * pull;
    ls.ballY += (ls.ball.ty - ls.ballY) * pull;
    const wobX = inShot ? 0 : Math.sin(now / 320) * 1.6, wobY = inShot ? 0 : Math.cos(now / 410) * 1.6;
    const ballLeft = (1 - ls.ballY / 150) * 100 + wobX, ballTop = ls.ballX + wobY;
    const ball = $('#liveBall'); if (ball) { ball.style.left = ballLeft + '%'; ball.style.top = ballTop + '%'; const dd = Math.hypot(ballLeft - (ls.bl0 == null ? ballLeft : ls.bl0), ballTop - (ls.bt0 == null ? ballTop : ls.bt0)); ls.bl0 = ballLeft; ls.bt0 = ballTop; ls.brot = ((ls.brot || 0) + dd * 14) % 360; const sv = ball.firstElementChild; if (sv) sv.style.transform = 'rotate(' + ls.brot + 'deg)'; }
    const terr = (ballLeft - 50) / 50;
    ls.shapeShift = (ls.shapeShift || 0) + (terr * 11 - (ls.shapeShift || 0)) * 0.012;
    const drawSide = (coords, prefix, away) => {
      coords.forEach((cc, i) => {
        const el = $('#lv-' + prefix + i); if (!el) return;
        const isGK = i === 0, role = cc[1] / 100;
        const advX = cc[1] * 0.48;
        let bx = away ? (100 - advX) : advX, by = away ? (100 - cc[0]) : cc[0];
        bx += ls.shapeShift * (isGK ? 0.08 : 0.35 + role * 0.65);
        const pull = isGK ? 0.04 : 0.2 + role * 0.5;
        let tx = bx + (ballLeft - bx) * pull, ty = by + (ballTop - by) * pull;
        tx += Math.sin(now / 850 + i * 1.9 + (prefix === 'a' ? 3 : 0)) * (isGK ? 0.4 : 1.3 + role * 1.3);
        ty += Math.cos(now / 760 + i * 2.3) * (isGK ? 0.4 : 1.2 + role * 1.5);
        if (isGK) { tx = Math.max(bx - 3, Math.min(bx + 3, tx)); ty = Math.max(by - 10, Math.min(by + 10, ty)); }
        tx = Math.max(4, Math.min(96, tx)); ty = Math.max(5, Math.min(95, ty));
        const key = prefix + i;
        const q = ls.pos[key] || (ls.pos[key] = { x: bx, y: by });
        const wk = LIVE_REDUCE_MOTION ? null : (ls.ft ? 'off' : ls.htWalk);
        const fade = y => String(Math.max(0, Math.min(1, 1 - (y - 96) / 8)));
        if (wk === 'off') {
          /* full time / half-time: walk off towards the tunnel at the middle of the bottom touchline */
          const t0 = ls.ft ? (ls.ftAt = ls.ftAt || now) : ls.htAt;
          if (now - t0 > 500 + i * 60 + (away ? 30 : 0)) {
            const wx = 50 + ((i % 4) - 1.5) * 3, wy = 135;
            const dx = wx - q.x, dy = wy - q.y, dd = Math.hypot(dx, dy) || 1, st = Math.min(0.9, dd);
            q.x += dx / dd * st; q.y += dy / dd * st;
            el.style.opacity = fade(q.y); el.style.pointerEvents = 'none';
          } else { q.x += (tx - q.x) * 0.1; q.y += (ty - q.y) * 0.1; }
        } else if (wk === 'on') {
          /* second half: walk back on from the tunnel to the formation */
          if (now - ls.htOnAt > i * 30 + (away ? 15 : 0)) {
            const dx = tx - q.x, dy = ty - q.y, dd = Math.hypot(dx, dy) || 1, st = Math.min(1.2, dd);
            q.x += dx / dd * st; q.y += dy / dd * st;
            el.style.opacity = fade(q.y); el.style.pointerEvents = '';
          } else { el.style.opacity = '0'; el.style.pointerEvents = 'none'; }
        } else {
          q.x += (tx - q.x) * 0.1; q.y += (ty - q.y) * 0.1;
          if (el.style.opacity) { el.style.opacity = ''; el.style.pointerEvents = ''; }
        }
        el.style.left = q.x + '%'; el.style.top = q.y + '%';
      });
    };
    drawSide(coordsH, 'h', false);
    drawSide(coordsA, 'a', true);
  } catch (err) {
    console.error('liveDraw error', err);
  }
  requestAnimationFrame(liveDraw);
}
function refreshLiveMarkers() {   const ls = liveState; if (!ls) return;   [['h', ls.ctx.xiH, ls.ctx.slotsH, G.teams[ls.ctx.h], false], ['a', ls.ctx.xiA, ls.ctx.slotsA, G.teams[ls.ctx.a], true]].forEach(([side, xi, slots, T, away]) => {     xi.forEach((p, i) => {       const el = $('#lv-' + side + i);       if (el && el.dataset.lpid != p.id) el.outerHTML = liveFplHTML(p, i, slots, T, side, away);     });   }); } /* after a change, throw away the not-yet-played part of this half and simulate it again with the new XI */ function rerollRemainder(ls) {   const ctx = ls.ctx, end = ls.half === 1 ? 45 : 92, m = ls.minute;   if (m >= end) return;   const future = e => !e._shown && e.min > m && (e.type === 'goal' || e.type === 'card' || e.type === 'injury');   const dropped = ctx.ev.filter(future);   ctx.ev = ctx.ev.filter(e => !future(e));   dropped.forEach(e => {     if (e.type === 'goal') { if (e.side === 'h') ctx.hg--; else ctx.ag--; }     else if (e.type === 'injury' && !ctx.ev.some(k => k.type === 'injury' && k.scorer === e.scorer)) {       const q = G.teams[e.team].squad.find(x => x.id === e.scorer); if (q) delete q.pendingInj;     }   });   runPeriod(G, ctx, m + 1, end); } function openLiveSubs() {   const ls = liveState; if (!ls || ls.ft || !ls.started) return;   if (ls.minute >= (ls.half === 1 ? 45 : 92)) { toast('Too late for a change.'); return; }   const wasRunning = !ls.paused;   if (wasRunning) livePause();   const side = ls.mySide, T = me();   const xi = () => side === 'h' ? ls.ctx.xiH : ls.ctx.xiA;   const slots = side === 'h' ? ls.ctx.slotsH : ls.ctx.slotsA;   const used = () => side === 'h' ? ls.ctx.subsH : ls.ctx.subsA;   let bench = T.squad.filter(p => !xi().includes(p) && isFit(p, T) && !(ls.ctx.subbedOff && ls.ctx.subbedOff.has(p.id)));   let selOut = null;   const body = `<p id="lsInfo" style="margin:0 0 10px;color:var(--dim)"></p>     <div class="subrow">       <div><h4 style="font-size:16px;margin-bottom:6px">On the pitch</h4><div id="onList"></div></div>       <div><h4 style="font-size:16px;margin-bottom:6px">Bench</h4><div id="benchList"></div></div>     </div>`;   openModal('Make a change', body, `<button class="btn sm" id="lsDone">Back to the match</button>`);   $('#modal').classList.add('mmx');   const back = () => { closeModal(); if (wasRunning && liveState === ls && ls.paused && !ls.ft) livePause(); };   $('#modal .x').onclick = back;   $('#lsDone').onclick = back;   const paint = () => {     $('#lsInfo').innerHTML = `${esc(G.teams[ls.ctx.h].s)} <b style="color:var(--ink)">${ls.ctx.hg}–${ls.ctx.ag}</b> ${esc(G.teams[ls.ctx.a].s)} · ${ls.minute}' · ${Math.max(0, 5 - used())} change${5 - used() === 1 ? '' : 's'} left`;     $('#onList').innerHTML = xi().map((p, i) => offIds(ls.ctx).has(p.id) ? '' :       `<button class="prow" data-out="${p.id}" style="grid-template-columns:auto 1fr auto;padding:5px 6px;${selOut === p.id ? 'background:var(--panel2);box-shadow:inset 0 0 0 1px var(--gold)' : ''}">         ${ratingTag(p.rating)}<span class="who"><b>${esc(p.name)}</b><small>${slots[i] || p.pos}</small></span>${posTag(p.pos)}</button>`).join('');     $('#benchList').innerHTML = bench.length ? bench.map(p =>       `<button class="prow" data-in="${p.id}" style="grid-template-columns:auto 1fr auto;padding:5px 6px">         ${ratingTag(p.rating)}<span class="who"><b>${esc(p.name)}</b><small>${p.pos} · ${p.age}</small></span>${flagSVG(p.nat)}</button>`).join('')       : '<p class="hint" style="padding:6px">Nobody fit on the bench.</p>';     document.querySelectorAll('#onList [data-out]').forEach(b => b.onclick = () => { selOut = +b.dataset.out; paint(); });     document.querySelectorAll('#benchList [data-in]').forEach(b => b.onclick = () => {       if (selOut == null) { toast('Pick the player coming off first.'); return; }       if (used() >= 5) { toast('No changes left.'); return; }       const pin = bench.find(p => p.id === +b.dataset.in);       const outP = xi().find(p => p.id === selOut);       if (!pin || !outP) return;       ls.ctx.minute = ls.minute;       const ok = makeSub(ls.ctx, side, selOut, pin);       delete ls.ctx.minute;       if (ok) {         const ev = ls.ctx.ev[ls.ctx.ev.length - 1];         ev.outName = outP.name; ev.min = ls.minute; ev._shown = true; pushTick(ev);         rerollRemainder(ls);         refreshLiveMarkers();         bench = bench.filter(p => p !== pin);         toast(`${pin.name} on for ${outP.name}.`);         selOut = null; paint(); liveControls();         updateLiveScore();       }     });   };   paint(); } 
function halfTime() {
  const ls = liveState;
  const T = me();
  const onPitch = ls.mySide === 'h' ? ls.ctx.xiH : ls.ctx.xiA;
  const slots = ls.mySide === 'h' ? ls.ctx.slotsH : ls.ctx.slotsA;
  const used = ls.mySide === 'h' ? ls.ctx.subsH : ls.ctx.subsA;
  const coords = FORM_COORDS[T.formation] || FORM_COORDS['4-4-2'];
  const bench = T.squad.filter(p => !onPitch.includes(p) && isFit(p, T) && !(ls.ctx.subbedOff && ls.ctx.subbedOff.has(p.id)));
  const goals = ls.ctx.ev.filter(e => e.type === 'goal' && e.min <= 45);
  const hg = goals.filter(e => e.side === 'h').length, ag = goals.filter(e => e.side === 'a').length;
  const body = `<p style="margin:0 0 10px;color:var(--dim)">Half time: <b style="color:var(--ink)">${esc(G.teams[ls.ctx.h].s)} ${hg}–${ag} ${esc(G.teams[ls.ctx.a].s)}</b>.
    You have ${5 - used} change${5 - used === 1 ? '' : 's'} left.</p>
    <div class="pad" style="padding:0 0 10px"><div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i><div id="htPitch"></div></div>
      <p class="hint" style="text-align:center;margin:8px 0 0">Tap a player on the pitch, then a sub below, to make a change.</p></div>
    <div class="panel" style="margin-top:10px"><h3>Bench<span class="sub">${bench.length} available</span></h3><div class="fsubs" id="benchList"></div></div>`;
  openModal('Half time', body, `<button class="btn sm" id="htGo">Play the second half</button>`);
  const resume = () => {
    closeModal();
    ls.half = 2;
    ls.minute = 45;

    aiSubs(G, ls.ctx);
    runPeriod(G, ls.ctx, 46, 92);
    refreshLiveMarkers();

    ls.started = true;
    ls.paused = false;

    resumeAfterBreak(ls);
  };

  $('#modal .x').onclick = resume;

  let selOut = null;
  const paint = () => {
    const on = ls.mySide === 'h' ? ls.ctx.xiH : ls.ctx.xiA;
    $('#htPitch').innerHTML = on.map((p, i) => {
      if (offIds(ls.ctx).has(p.id)) return '';
      const c = coords[i] || [50, 50], x = c[0], y = c[1];
      return `<button class="fpl ${selOut === p.id ? 'sel' : ''}" data-out="${p.id}" style="left:${8 + x * 0.84}%;top:${8 + (100 - y) * 0.84}%">
        <div class="prow3"><span class="prate">${p.rating}</span><div class="pface" style="--pring:${T.c1}">${faceSVG(p, 30, T.c1)}</div><span class="ppos">${slots[i] || p.pos}</span></div>${T.captainId === p.id ? '<span class="cbadge">C</span>' : ''}
        <span class="fnm2">${esc(p.last || p.name)}</span></button>`;
    }).join('');
    $('#benchList').innerHTML = bench.length ? bench.map(p =>
      `<button class="fsub" data-in="${p.id}">${faceSVG(p, 40, T.c1)}<b>${p.rating}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${esc(p.last || p.name)}</small></button>`).join('')
      : '<p class="hint" style="padding:6px">Nobody fit on the bench.</p>';
    document.querySelectorAll('[data-out]').forEach(b => b.onclick = () => { selOut = (selOut === +b.dataset.out) ? null : +b.dataset.out; paint(); });
    document.querySelectorAll('[data-in]').forEach(b => b.onclick = () => {
      if (selOut == null) { toast('Pick the player coming off first.'); return; }
      const usedNow = ls.mySide === 'h' ? ls.ctx.subsH : ls.ctx.subsA;
      if (usedNow >= 5) { toast('No changes left.'); return; }
      const pin = bench.find(p => p.id === +b.dataset.in);
      const outP = (ls.mySide === 'h' ? ls.ctx.xiH : ls.ctx.xiA).find(p => p.id === selOut);
      if (makeSub(ls.ctx, ls.mySide, selOut, pin)) {
        const i = bench.indexOf(pin); if (i >= 0) bench.splice(i, 1);
        toast(`${pin.name} on for ${outP.name}.`);
        selOut = null; paint();
      }
    });
  };
  paint();
  $('#htGo').onclick = resume;
}
function endLive() {
  const ls = liveState;
  setLiveFullscreen(false);
  stopCrowd();
   musicFade(0.25 * musicVol, 2000);
  finishMatch(G, ls.ctx);
  fullTimeSting(ls.mySide === 'h' ? ls.ctx.hg : ls.ctx.ag, ls.mySide === 'h' ? ls.ctx.ag : ls.ctx.hg);
  if (ls.kind === 'playoff') { poLiveDone(ls); return; }
  if (ls.kind === 'cont') { endLiveCont(ls); return; }
  if (ls.kind === 'cup') {
    let pens = null, winner;
    if (ls.ctx.hg === ls.ctx.ag) {
      let ph = 0, pa = 0;
      do { ph += rnd() < 0.76 ? 1 : 0; pa += rnd() < 0.74 ? 1 : 0; } while (ph === pa);
      pens = [ph + 3, pa + 3];
      winner = ph > pa ? ls.m.h : ls.m.a;
    } else winner = ls.ctx.hg > ls.ctx.ag ? ls.m.h : ls.m.a;
    const result = { h: ls.m.h, a: ls.m.a, hg: ls.ctx.hg, ag: ls.ctx.ag, pens, winner, stage: G.cup.stage, ev: ls.ctx.ev };
    finishMyCupTie(G, result);
    liveState = null;
    afterCupMatchday({ cup: G.cup.ties });
    return;
  }
  commitMatch(G, ls.tier, ls.m, ls.ctx);
  const res = playRound(G, true);
  liveState = null;
  afterLeaguePortion(res);
}

/* ============================================================
   Mzansi Manager 2026 — views
   ============================================================ */

function zoneClass(i, tier) {
  if (tier === 0) {
    if (i <= 1) return 'zone-cl';
    if (i <= 4) return 'zone-confed';
    if (i >= TIER_SIZE - RELEGATED) return 'zone-down';
  } else if (tier < TIER_NAMES.length - 1) {
    if (i < AUTO_PROMOTED) return 'zone-up';
    if (i < AUTO_PROMOTED + PLAYOFF_SPOTS) return 'zone-playoff';
    if (i >= TIER_SIZE - RELEGATED) return 'zone-down';
  } else {
    if (i < AUTO_PROMOTED) return 'zone-up';
    if (i < AUTO_PROMOTED + PLAYOFF_SPOTS) return 'zone-playoff';
  }
  return '';
}
function historicalTable(G, season, tier) {
  const rows = [];
  G.teams.forEach(t => {
    const h = t.history.find(x => x.season === season && x.tier === tier);
    if (h) rows.push({ id: t.id, w: h.w, d: h.d, l: h.l, gf: h.gf, ga: h.ga, pts: h.pts, pos: h.pos });
  });
  rows.sort((a, b) => a.pos - b.pos);
  return rows;
}
function resRow(m) {
  const H = G.teams[m.h], A = G.teams[m.a];
  const mine = m.h === G.myTeam || m.a === G.myTeam;
  return `<div class="res ${mine ? 'mine' : ''}">
    <div class="h ${m.played && m.hg > m.ag ? 'w' : ''}">${esc(H.s)}</div>
    <div class="sc num">${m.played ? m.hg + '–' + m.ag : 'v'}</div>
    <div class="a ${m.played && m.ag > m.hg ? 'w' : ''}">${esc(A.s)}</div></div>`;
}
function newsThumb(m) {
  if (!m || m.pid == null) return '';
  const f = findPlayer(G, m.pid);
  if (!f) return '';
  const face = faceSVG(f.p, 22, f.t ? f.t.c1 : null);
  const fromT = m.fromId != null ? G.teams[m.fromId] : null;
  const toT = m.toId != null ? G.teams[m.toId] : null;
  return `<span class="nf-thumb" data-pid="${m.pid}" title="View player">${face}${fromT ? crestHTML(fromT, 15) : ''}${fromT && toT ? '<span class="arrow" style="font-size:10px">→</span>' : ''}${toT ? crestHTML(toT, 15) : ''}</span>`;
}
const NEWS_KIND_LABEL = { transfer: 'Transfer', youth: 'Youth', retire: 'Retired', contract: 'Contract', season: 'League', match: 'Match', cup: 'Cup', caf: 'Africa', nation: 'National' };
function newsList(items, n) {
  if (!items.length) return '<div class="empty">Quiet week in the game.</div>';
  return '<ul class="feed">' + items.slice(0, n || 12).map(x =>
    `<li><span class="k-badge k-${x.kind}">${NEWS_KIND_LABEL[x.kind] || x.kind}</span>${newsThumb(x.meta)}<span class="when">${seasonLabel(x.season).slice(2)} MD${x.round}</span><span>${esc(x.text)}</span></li>`).join('') + '</ul>';
}

/* ---- cup ties on matchday ---- */
function myCupTies(r) {
  const out = [], md = r + 1, me_ = G.myTeam;
  [[CUP_NAME, G.cup, CUP_AT, CUP_ROUNDS, true],
   [SUPER8, G.super8, S8_AT, S8_ROUNDS, false],
   [KNOCKOUT, G.knockout, KO_AT, KO_ROUNDS, false]].forEach(([name, c, at, names, isMain]) => {
    if (!c || c.done || !at.includes(md)) return;
    const i = c.alive.indexOf(me_); if (i < 0) return;
    let opp = null, note = '';
    if (isMain && c.stage === 0) note = 'Draw is made on the day';
    else if (i ^ 1 < c.alive.length) opp = G.teams[c.alive[i ^ 1]].n;
    else note = 'Bye through this round';
    out.push({ name, round: names[c.stage] || 'Round', opp, home: i % 2 === 0, note });
  });
  [['caf', CAF_NAME, CAF_AT], ['confed', CONFED_NAME, CONFED_AT]].forEach(([k, name, at]) => {
    const c = G.africa && G.africa[k];
    if (!c || c.done || !at.includes(md)) return;
    const i = c.alive.findIndex(e => e.sa && e.id === me_); if (i < 0) return;
    const o = c.alive[i ^ 1];
    out.push({ name, round: CAF_ROUNDS[c.stage] || 'Round', opp: o ? cafName(G, o) : null, home: i % 2 === 0, note: o ? '' : 'Bye through this round' });
  });
  return out;
}
/* ================= continental football on match days ================= */ function contSide(e) {   const mine = e.sa && e.id === G.myTeam;   return `${e.sa ? flagSVG('ZA') + ' ' : ''}<span${mine ? ' style="color:var(--cup);font-weight:700"' : ''}>${esc(cafShort(G, e))}</span>`; } /* "Sundowns 3–1 Zesco (agg.)", legs underneath; winner in bold */ function contResultLine(t) {   if (t.bye) return `<div>${contSide(t.a)} <span class="hint">— bye</span></div>`;   const aW = t.winner === t.a, bW = t.winner === t.b;   const legs = t.single ? '' : ` <span class="hint">(${t.leg1[0]}–${t.leg1[1]}, ${t.leg2[1]}–${t.leg2[0]})</span>`;   const pens = t.pens ? ` <span class="hint">${t.pens[0]}–${t.pens[1]} pens</span>` : '';   return `<div style="margin-top:3px"><span${aW ? ' style="font-weight:700"' : ''}>${contSide(t.a)}</span> <b class="num">${t.aggA}–${t.aggB}</b> <span${bW ? ' style="font-weight:700"' : ''}>${contSide(t.b)}</span>${legs}${pens}</div>`; } /* The Matchday tab's "Continental football" panel: ties due on the next matchday, results    from the last one, or when the next round is — for every club, not just the ones in it. */ function continentalPanelHTML() {   if (!G.africa) return '';   const md = G.round + 1, blocks = [];   [['caf', CAF_NAME, CAF_AT], ['confed', CONFED_NAME, CONFED_AT]].forEach(([k, name, at]) => {     const c = G.africa[k]; if (!c) return;     const head = `<b style="color:var(--cup)">🌍 ${esc(name)}</b>`;     const box = inner => `<div class="pad" style="border-top:1px solid var(--line)">${inner}</div>`;     if (c.done) { blocks.push(box(`${head} · <span class="hint">won by</span> ${c.winner ? contSide(c.winner) : '—'}`)); return; }     if (at.includes(md)) {       const rows = [];       for (let i = 0; i < c.alive.length; i += 2) {         const A = c.alive[i], B = c.alive[i + 1];         rows.push(`<div style="margin-top:3px">${contSide(A)} ${B ? `<span class="hint">v</span> ${contSide(B)}` : '<span class="hint">— bye</span>'}</div>`);       }       blocks.push(box(`${head} · ${CAF_ROUNDS[c.stage] || 'Round'} <span class="hint">· played on this matchday</span>${rows.join('')}`));       return;     }     if (at.includes(G.round) && c.log.length) {       const L = c.log[c.log.length - 1];       blocks.push(box(`${head} · ${CAF_ROUNDS[L.stage] || 'Round'} <span class="hint">· last matchday</span>${L.ties.map(contResultLine).join('')}`));       return;     }     const next = at.find(x => x > md);     const sa = c.alive.filter(e => e.sa);     blocks.push(box(`${head} · <span class="hint">${next ? `${CAF_ROUNDS[c.stage] || 'Next round'} on matchday ${next}` : 'between rounds'}</span><div style="margin-top:3px;color:var(--dim)">${sa.length ? 'South African clubs still in: ' + sa.map(contSide).join(', ') : 'No South African clubs left in it.'}</div>`));   });   return blocks.length ? `<h3>Continental football<span class="sub">African Champions League and African Football Cup</span></h3>${blocks.join('')}` : ''; } /* In the results pop-up: the rest of any continental round played on that matchday. */ function continentalRoundHTML(res) {   const me_ = G.myTeam;   return [[res.caf, CAF_NAME], [res.confed, CONFED_NAME]].map(([ties, name]) => {     if (!ties || !ties.length) return '';     const mineIn = ties.some(t => !t.bye && ((t.a.sa && t.a.id === me_) || (t.b.sa && t.b.id === me_)));     const rows = ties.filter(t => !t.bye && !((t.a.sa && t.a.id === me_) || (t.b.sa && t.b.id === me_)));     if (!rows.length) return '';     return `<h4 style="margin:14px 0 4px;font-size:17px">🌍 ${esc(name)} · ${CAF_ROUNDS[ties[0].stage] || 'Round'}${mineIn ? ' — other ties' : ''}</h4>${rows.map(contResultLine).join('')}`;   }).join(''); }  function myCupResultsHTML(res) {
  const rows = [], me_ = G.myTeam;
  [[res.cup, CUP_NAME, CUP_ROUNDS], [res.s8, SUPER8, S8_ROUNDS], [res.ko, KNOCKOUT, KO_ROUNDS]].forEach(([ties, name, names]) => {
    (ties || []).forEach(t => {
      if (t.h !== me_ && t.a !== me_) return;
      rows.push(`<h4 style="margin:14px 0 4px;font-size:17px">${esc(name)} · ${names[t.stage] || 'Round'}</h4>
        <div class="res mine"><div class="h ${t.winner === t.h ? 'w' : ''}">${esc(G.teams[t.h].s)}</div>
        <div class="sc num">${t.hg}–${t.ag}</div>
        <div class="a ${t.winner === t.a ? 'w' : ''}">${esc(G.teams[t.a].s)}${t.pens ? ` <span class="hint">(${t.pens[0]}–${t.pens[1]} pens)</span>` : ''}</div></div>
        <p class="hint" style="margin:4px 0 0">${t.winner === me_ ? 'Through to the next round.' : 'Knocked out.'}</p>`);
    });
  });
  [[res.caf, CAF_NAME], [res.confed, CONFED_NAME]].forEach(([ties, name]) => {
    (ties || []).forEach(t => {
      if (t.bye) return;
      const mineA = t.a.sa && t.a.id === me_, mineB = t.b.sa && t.b.id === me_;
      if (!mineA && !mineB) return;
      const won = t.winner.sa && t.winner.id === me_;
      rows.push(`<h4 style="margin:14px 0 4px;font-size:17px">${esc(name)} · ${CAF_ROUNDS[t.stage] || 'Round'}</h4>
        <div class="res mine"><div class="h ${t.winner === t.a ? 'w' : ''}">${esc(cafShort(G, t.a))}</div>
        <div class="sc num">${t.aggA}–${t.aggB}</div>
        <div class="a ${t.winner === t.b ? 'w' : ''}">${esc(cafShort(G, t.b))}${t.pens ? ` <span class="hint">(${t.pens[0]}–${t.pens[1]} pens)</span>` : ''}</div></div>
        <p class="hint" style="margin:4px 0 0">${t.single ? 'Single match.' : 'Aggregate over two legs.'} ${won ? 'Through to the next round.' : 'Knocked out.'}</p>`);
    });
  });
  return rows.join('');
}

function viewMatch() {
  if (liveState) { renderLive(); return; }
  const t = me(), v = $('#v-match'); v.innerHTML = ''; v.classList.add('mmx');
  const nx = myFixture(G.round);
  if (nx) {
    const H = G.teams[nx.h], A = G.teams[nx.a];
    v.innerHTML += `<div class="hero">
      <div class="meta">Matchday <b>${G.round + 1}</b> of ${totalRounds(G)} · ${TIER_NAMES[t.tier]} · ${seasonLabel(G.season)} · ${esc(stadiumName(H))}</div>
      <div class="fixture">
        <div class="side"><div class="mdRow">${mdKit(H, false)}${crestHTML(H, 40)}</div><div<b>${esc(H.n)}</b><small>${ordinal(posOfTeam(G, H.id))} · rated ${teamOverall(H)}</small></div></div>
        <div class="vs">v</div>
        <div class="side away"><div class="mdRow">${mdKit(A, true)}${crestHTML(A, 40)}</div><div><b>${esc(A.n)}</b><small>${ordinal(posOfTeam(G, A.id))} · rated ${teamOverall(A)}</small></div></div>
      </div></div>`;
  } else {
    v.innerHTML += `<div class="hero"><div class="meta">Season complete</div><div class="pad">
      <h3 style="font-size:25px">${seasonLabel(G.season)} is done</h3>
      <p style="color:var(--dim);margin:8px 0 0">You finished ${ordinal(posOfTeam(G, G.myTeam))} in the ${TIER_SHORT[t.tier]}. Roll the season over when you're ready.</p></div></div>`;
  }
  if (!G.finished) {     const fitN = fitCount(t), sqN = t.squad.length, warn = [];     if (fitN < MIN_TO_PLAY) warn.push(`You only have <b>${fitN}</b> fit, available players. Play with fewer than ${MIN_TO_PLAY} and the match is <b>forfeited</b> (3–0 to the opposition) and you are fined ${money(forfeitFine(t))}.`);     if (sqN < MIN_SENIOR) warn.push(`Your senior squad is down to <b>${sqN}</b> players. You must keep at least ${MIN_SENIOR}, so sign players before you sell or release anyone.`);     if (warn.length) v.appendChild(el('div', 'panel', `<div class="pad" style="border-left:3px solid var(--down)"><b style="color:var(--down)">Squad warning</b>${warn.map(w => `<p class="hint" style="margin:4px 0 0">${w}</p>`).join('')}</div>`));   }   const cupTies = G.finished ? [] : myCupTies(G.round);
  if (cupTies.length) {
    v.appendChild(el('div', 'panel',
      `<h3>Cup ties coming up<span class="sub">each played on its own matchday</span></h3>` +
      cupTies.map(c => `<div class="pad" style="border-top:1px solid var(--line)">
        <b style="color:var(--cup)">🏆 ${esc(c.name)}</b> · ${c.round}<br>
        <span style="color:var(--dim)">${c.opp ? `${c.home ? 'Home to' : 'Away to'} ${esc(c.opp)}` : esc(c.note)}</span></div>`).join('')));
  }
  const contHTML = G.finished ? '' : continentalPanelHTML();
  if (contHTML) v.appendChild(el('div', 'panel', contHTML));
  const cols = el('div', 'cols');
  const last = G.round > 0 ? G.fixtures[t.tier][G.round - 1] : null;
  cols.appendChild(el('div', 'panel',
    `<h3>Latest results<span class="sub">${last ? 'Matchday ' + G.round : 'not started'}</span></h3>` +
    (last ? last.map(resRow).join('') : '<div class="empty">Kick-off is waiting on you.</div>')));
  const st = sortTable(G, t.tier).slice(0, 8);
  cols.appendChild(el('div', 'panel',
    `<h3>Top of the log</h3>` + miniTable(st, t.tier) +
    `<h3 style="border-top:1px solid var(--line)">Around the leagues</h3>` + newsList(G.news, 6)));
  v.appendChild(cols);
  bindPlayerRows(cols);
}
function miniTable(rows, tier) {
  const cp = tablePosAt(G, tier, G.round), pp = G.round >= 2 ? tablePosAt(G, tier, G.round - 1) : null;
  return `<table class="tbl"><thead><tr><th class="pos">#</th><th></th><th>Club</th><th>P</th><th>GD</th><th>Pts</th></tr></thead><tbody>` +
    rows.map((r, i) => {
      const t = G.teams[r.id];
      return `<tr class="${r.id === G.myTeam ? 'me' : ''} ${zoneClass(i, tier)}">
        <td class="pos num">${i + 1}</td><td class="num">${posMove(pp ? pp[r.id] : null, cp[r.id])}</td><td><span class="team">${crestHTML(t, 15)}<span>${esc(t.s)}</span></span></td>
        <td class="num">${r.p}</td><td class="num">${r.gf - r.ga > 0 ? '+' : ''}${r.gf - r.ga}</td><td class="num"><b>${r.pts}</b></td></tr>`;
    }).join('') + '</tbody></table>';
}

/* ---------------- League Table ---------------- */
 function tablePosAt(G, tier, rounds) {   const s = {}; G.teams.filter(t => t.tier === tier).forEach(t => { s[t.id] = { id: t.id, pts: 0, gf: 0, ga: 0 }; });   for (let r = 0; r < rounds; r++) (G.fixtures[tier][r] || []).forEach(m => {     if (!m.played || !s[m.h] || !s[m.a]) return;     const H = s[m.h], A = s[m.a]; H.gf += m.hg; H.ga += m.ag; A.gf += m.ag; A.ga += m.hg;     if (m.hg > m.ag) H.pts += 3; else if (m.hg < m.ag) A.pts += 3; else { H.pts++; A.pts++; }   });   const pos = {}; Object.values(s).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf || G.teams[a.id].n.localeCompare(G.teams[b.id].n)).forEach((r, i) => { pos[r.id] = i + 1; });   return pos; } function posMove(was, now) {   if (was == null || was === now) return '<span class="muted">–</span>';   return was > now ? `<span style="color:#34c471">▲${was - now}</span>` : `<span style="color:#ff5a5a">▼${now - was}</span>`; } function viewTable() {
  const v = $('#v-table');
  const seasons = G.records.seasons.map(s => s.season).sort((a, b) => b - a);
  const isCurrent = tableSeason === 'current';
  const st = isCurrent ? sortTable(G, tableTier) : historicalTable(G, +tableSeason, tableTier);
  const champId = !isCurrent && st[0] ? st[0].id : null;   const curP = isCurrent ? tablePosAt(G, tableTier, G.round) : null, prevP = isCurrent && G.round >= 2 ? tablePosAt(G, tableTier, G.round - 1) : null;
  v.innerHTML = `<div class="panel tbl-google">
    <div class="chipbar" style="overflow-x:auto;flex-wrap:nowrap;background:#1f1f1f;border-color:#2c2c2e">${[0,1,2,3,4].map(i => `<button class="chip" data-tt="${i}" aria-pressed="${tableTier === i}">${TIER_SHORT[i]}</button>`).join('')}</div>
    <div class="gseasonbar">
      <label for="gseason">Season</label>
      <select id="gseason">
        <option value="current" ${isCurrent ? 'selected' : ''}>${seasonLabel(G.season)} (in progress)</option>
        ${seasons.map(s => `<option value="${s}" ${String(s) === String(tableSeason) ? 'selected' : ''}>${seasonLabel(s)} final</option>`).join('')}
      </select>
      ${champId != null ? `<span class="hint" style="color:#9e9ea0">Champions: <b style="color:#f5c518">${esc(G.teams[champId].n)}</b></span>` : ''}
    </div>
     <table class="gtable"><thead><tr><th class="pos">#</th>${isCurrent ? '<th></th>' : ''}<th>Club</th>${isCurrent ? '<th>Ovr</th>' : ''}<th>P</th><th>W</th><th>D</th><th>L</th>
      <th class="hide-s">GF</th><th class="hide-s">GA</th><th>GD</th><th>Pts</th>${isCurrent ? '<th class="hide-s">Form</th>' : ''}</tr></thead><tbody>` +
    (st.length ? st.map((r, i) => {
      const t = G.teams[r.id];
      const p = isCurrent ? r.p : (r.w + r.d + r.l);
      return `<tr class="${r.id === G.myTeam ? 'me' : ''} ${zoneClass(i, tableTier)}">
        <td class="pos">${i + 1}</td>${isCurrent ? `<td>${posMove(prevP ? prevP[r.id] : null, curP[r.id])}</td>` : ''}
        <td><span class="team">${crestHTML(t, 20)}<span>${esc(t.s)}</span></span></td>
        ${isCurrent ? `<td class="muted">${teamOverall(t)}</td>` : ''}
        <td>${p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
        <td class="hide-s muted">${r.gf}</td><td class="hide-s muted">${r.ga}</td>
        <td>${r.gf - r.ga > 0 ? '+' : ''}${r.gf - r.ga}</td><td><b>${r.pts}</b></td>
    ${isCurrent ? `<td class="hide-s">${formHtml(t.form)}</td>` : ''}</tr>`;
    }).join('') : `<tr><td colspan="11" style="text-align:center;padding:20px;color:#7a7a7d">No completed table for this season yet.</td></tr>`) + `</tbody></table>
    <div class="glegend">${tableTier === 0
      ? '<span><i style="background:#4286f5"></i>Champions League</span><span><i style="background:#fb7b18"></i>African Football Cup</span><span><i style="background:#ff5a5a"></i>Relegated</span>'
      : tableTier === TIER_NAMES.length - 1
        ? '<span><i style="background:#34c471"></i>Promoted</span>'
        : `<span><i style="background:#34c471"></i>Promoted</span><span><i style="background:#fb7b18"></i>Promotion playoff</span><span><i style="background:#ff5a5a"></i>Relegated</span>`}</div></div>`;
  const t2 = me();
  const mine = G.fixtures[t2.tier].map((rd, i) => ({ i, m: rd.find(m => m.h === G.myTeam || m.a === G.myTeam) }));
  v.innerHTML += `<div class="panel tbl-google"><h4 style="padding:12px 13px 4px">${esc(t2.s)} fixtures<span class="sub" style="color:#9e9ea0;font-weight:400;margin-left:6px">${seasonLabel(G.season)} · ${TIER_SHORT[t2.tier]}</span></h4>` +
    mine.map(({ i, m }) => {
      const opp = G.teams[m.h === G.myTeam ? m.a : m.h], home = m.h === G.myTeam;
      let right = `<span class="hint">${home ? 'home' : 'away'}</span>`;
      if (m.played) {
        const mi = home ? m.hg : m.ag, th = home ? m.ag : m.hg;
        const r = mi > th ? 'W' : mi === th ? 'D' : 'L';
        right = `<b class="num">${mi}–${th}</b> <span class="form"><i class="${r}">${r}</i></span>`;
      } else if (i === G.round) right = `<span class="tag xi">next up</span>`;
      return `<div class="prow" style="grid-template-columns:30px auto 1fr auto">
        <span class="num hint">${i + 1}</span>${crestHTML(opp, 20)}
        <span class="who"><b>${esc(opp.n)}</b><small>${home ? 'at home' : 'away in ' + esc(opp.city)}</small></span>
        <span style="text-align:right">${right}</span></div>`;
    }).join('') + '</div>';

  const r = Math.min(Math.max(fxRound, 0), totalRounds(G) - 1);
  v.innerHTML += `<div class="panel tbl-google"><h4 style="padding:12px 13px 4px">All results<span class="sub" style="color:#9e9ea0;font-weight:400;margin-left:6px">every division, matchday by matchday</span></h4>
    <div class="chipbar" style="overflow-x:auto;flex-wrap:nowrap">` +
    G.fixtures[0].map((_, i) => `<button class="chip" data-fr="${i}" aria-pressed="${i === r}">${i + 1}</button>`).join('') +
    `</div>` + [0,1,2].map(tier =>
      `<h4 style="padding:9px 13px 3px;font-size:16px">${TIER_NAMES[tier]}</h4>` +
      G.fixtures[tier][r].map(resRow).join('')).join('') + `</div>`;
  v.querySelectorAll('[data-tt]').forEach(b => b.onclick = () => { tableTier = +b.dataset.tt; viewTable(); });
  const sel = $('#gseason'); if (sel) sel.onchange = e => { tableSeason = e.target.value; viewTable(); };
  v.querySelectorAll('[data-fr]').forEach(b => b.onclick = () => { fxRound = +b.dataset.fr; viewTable(); });
}

/* ---------------- fixtures ---------------- */
function viewFixtures() {
  const v = $('#v-fixtures'), t = me();
  const mine = G.fixtures[t.tier].map((rd, i) => ({ i, m: rd.find(m => m.h === G.myTeam || m.a === G.myTeam) }));
  let html = `<div class="panel"><h3>${esc(t.s)} calendar<span class="sub">${seasonLabel(G.season)} · ${TIER_SHORT[t.tier]}</span></h3>` +
    mine.map(({ i, m }) => {
      const opp = G.teams[m.h === G.myTeam ? m.a : m.h], home = m.h === G.myTeam;
      let right = `<span class="hint">${home ? 'home' : 'away'}</span>`;
      if (m.played) {
        const mi = home ? m.hg : m.ag, th = home ? m.ag : m.hg;
        const r = mi > th ? 'W' : mi === th ? 'D' : 'L';
        right = `<b class="num">${mi}–${th}</b> <span class="form"><i class="${r}">${r}</i></span>`;
      } else if (i === G.round) right = `<span class="tag xi">next up</span>`;
      return `<div class="prow" style="grid-template-columns:30px auto 1fr auto">
        <span class="num hint">${i + 1}</span>${crestHTML(opp, 20)}
        <span class="who"><b>${esc(opp.n)}</b><small>${home ? 'at home' : 'away in ' + esc(opp.city)}</small></span>
        <span style="text-align:right">${right}</span></div>`;
    }).join('') + '</div>';

  const r = Math.min(Math.max(fxRound, 0), totalRounds(G) - 1);
  html += `<div class="panel"><h3>All results<span class="sub">every division, matchday by matchday</span></h3>
    <div class="chipbar" style="overflow-x:auto;flex-wrap:nowrap">` +
    G.fixtures[0].map((_, i) => `<button class="chip" data-fr="${i}" aria-pressed="${i === r}">${i + 1}</button>`).join('') +
    `</div>` + [0,1,2].map(tier =>
      `<h4 style="padding:9px 13px 3px;font-size:16px;color:var(--dim)">${TIER_NAMES[tier]}</h4>` +
      G.fixtures[tier][r].map(resRow).join('')).join('') + `</div>`;
  v.innerHTML = html;
  v.querySelectorAll('[data-fr]').forEach(b => b.onclick = () => { fxRound = +b.dataset.fr; viewFixtures(); });
}

/* ---------------- squad ---------------- */
function ensureKitNumbers(t) {   const used = new Set();   t.squad.forEach(p => { if (p.kitNo) used.add(p.kitNo); });   const pick = () => { let n = 1; while (used.has(n) && n < 99) n++; used.add(n); return n; };   t.squad.filter(p => p.pos === 'GK' && !p.kitNo).forEach(p => { p.kitNo = pick(); });   t.squad.filter(p => !p.kitNo).sort((a, b) => b.rating - a.rating).forEach(p => { p.kitNo = pick(); }); } function openKitNumbersModal() {   const t = me();   ensureKitNumbers(t);   const order = { GK: 0, RB: 1, CB: 2, LB: 3, RWB: 4, LWB: 5, CDM: 6, CM: 7, CAM: 8, RM: 9, LM: 10, RW: 11, LW: 12, ST: 13, CF: 14 };   const rows = t.squad.slice().sort((a, b) => order[a.pos] - order[b.pos] || b.rating - a.rating).map(p =>     `<div class="prow" style="grid-template-columns:auto 1fr auto">${faceSVG(p, 30, t.c1)}       <span class="who"><b>${esc(p.name)}</b><small>${p.pos}</small></span>       <input type="number" min="1" max="99" value="${p.kitNo}" data-knum="${p.id}" style="width:56px;text-align:center;background:var(--panel2);border:1px solid var(--line);border-radius:6px;color:inherit;padding:6px"></div>`).join('');   openModal('Squad numbers', `<p class="hint" style="margin:0 0 8px">Give each player a shirt number from 1 to 99. Numbers must be unique.</p>     <div id="knList">${rows}</div><p id="knWarn" class="hint" style="color:var(--down);min-height:18px;margin:6px 0 0"></p>`,     `<button class="btn ghost sm" onclick="closeModal()">Close</button><button class="btn sm" id="knSave">Save numbers</button>`);   $('#modal').classList.add('mmx');   $('#knSave').onclick = () => {     const inputs = document.querySelectorAll('[data-knum]');     const seen = new Set(); let dupe = null;     inputs.forEach(inp => { const n = +inp.value; if (seen.has(n)) dupe = n; seen.add(n); });     if (dupe) { $('#knWarn').textContent = `Number ${dupe} is used more than once — each number can only belong to one player.`; return; }     inputs.forEach(inp => {       const p = t.squad.find(x => x.id === +inp.dataset.knum);       if (p) p.kitNo = Math.max(1, Math.min(99, Math.round(+inp.value) || 1));     });     save(); closeModal(); toast('Squad numbers updated.'); render();   }; } function playerRow(p, t, extra) {   ensureKitNumbers(t);
  const inXI = (t.lineup || []).includes(p.id);
  const isCap = t.captainId === p.id, isVice = t.viceCaptainId === p.id;
  const watchers = (t.id === G.myTeam && p.scouts) ? Object.keys(p.scouts).length : 0;
  return `<button class="prow" data-pid="${p.id}">
    ${faceSVG(p, 34, t.c1)}
    <span class="ratcol">${ratingTag(p.rating)}${growthHtml(p)}</span>
<span class="who"><b><span style="color:var(--gold);font-weight:800;margin-right:4px">#${p.kitNo || '–'}</span>${esc(p.name)} ${flagSVG(p.nat)}${isCap ? ' <span class="tag" style="color:var(--gold);border-color:var(--gold)">C</span>' : isVice ? ' <span class="tag">VC</span>' : ''}${watchers ? ` <span class="tag" title="${watchers} club${watchers === 1 ? '' : 's'} scouting him">👁 ${watchers}</span>` : ''}</b>
      <small>${[p.pos].concat(p.alt || []).join('/')} · ${p.age} · ${appsTxt(p)} apps · ${p.goals}g ${p.assists}a · ${money(p.wage)}/season · ${p.contract}y
      ${p.loan ? ' <span class="tag out">on loan</span>' : ''}${p.wantsOut ? ' <span class="tag out">wants out</span>' : ''}${p.inj > 0 ? ` <span class="tag inj" title="Back around ${injBack(p)}">out ${p.inj} · ${injWeeks(p)}w</span>` : ''}${banLeft(p, t) > 0 ? ` <span class="tag inj">banned ${banLeft(p, t)}</span>` : ''}${inXI ? ' <span class="tag xi">XI</span>' : ''}${p.pr ? ` <span class="tag" style="color:#f2b928;border-color:#f2b928">promise ${promiseTag(p)}</span>` : ''}${p.dty > 0 ? ' <span class="tag" style="color:#5ab0ff;border-color:#5ab0ff">intl duty</span>' : ''}${p.tl ? ' <span class="tag" style="color:var(--teal);border-color:var(--teal)">TL</span>' : ''}${p.ll ? ' <span class="tag" style="color:var(--teal);border-color:var(--teal)">LL</span>' : ''}${staTag(p)}</small></span>
    <span class="ratcol pot">${potTag(p)}${potGrowthHtml(p)}</span>
    <span class="val">${extra != null ? extra : money(p.value)}</span></button>`;
}
function bindPlayerRows(root) {
  root.querySelectorAll('[data-pid]').forEach(b => b.onclick = () => playerModal(+b.dataset.pid));
}
let pitchSelPid = null; function pitchCardHTML(p, t) {   if (!p) return '<div class="hint" style="text-align:center">Tap a player on the pitch to see them here.</div>';   return `<div class="pcard">     <div class="pcrate">${p.rating}</div>     <div class="pcface">${faceSVG(p, 52, t.c1)}${t.captainId === p.id ? '<span class="pcband">C</span>' : ''}</div>     <div class="pcinfo"><div class="pcname">${esc(p.name)}</div><div class="pcpos">${p.pos}</div></div>     <div class="pclink" data-pid="${p.id}">Full profile ›</div>   </div>`; } function squadPitchHTML(t) {   ensureLineup(t);   const slots = FORMATIONS[t.formation] || FORMATIONS['4-4-2'], coords = FORM_COORDS[t.formation] || FORM_COORDS['4-4-2'];   const xi = lineupOf(t), bench = benchOf(t).sort((a, b) => b.rating - a.rating).slice(0, 12);   const men = xi.map((p, i) => {     const [x, y] = coords[i];     return `<button class="fpl ${pitchSelPid === p.id ? 'sel' : ''}" data-pfid="${p.id}" style="left:${8 + x * 0.84}%;top:${8 + (100 - y) * 0.84}%">       <div class="prow3"><span class="prate">${p.rating}${penTag(p, slots[i])}</span><div class="pface" style="--pring:${t.c1}">${faceSVG(p, 30, t.c1)}</div><span class="ppos">${slots[i]}</span></div>${staDot(p)}${t.captainId === p.id ? '<span class="cbadge">C</span>' : ''}       <span class="fnm2">${esc(p.last || p.name)}</span></button>`;   }).join('');   const selP = pitchSelPid != null ? t.squad.find(p => p.id === pitchSelPid) : null;   return `<div class="panel"><h3>Starting XI<span class="sub">${t.formation} · rated ${teamOverall(t)}</span></h3>     <div class="pad">${pitchCardHTML(selP, t)}</div>     <div class="pad"><div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${men}</div>     <div style="text-align:center;margin-top:8px"><button class="btn ghost sm" id="pitchToTactics">Change formation / swap players</button></div></div></div>   <div class="panel"><h3>Substitutes<span class="sub">tap a player for his profile</span></h3>     <div class="fsubs">${bench.map(p => `<button class="fsub" data-pid="${p.id}">${faceSVG(p, 40, t.c1)}<b>${p.rating}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${esc(p.last || p.name)}</small></button>`).join('')}</div></div>`; } function squadPitchHTMLOld(t) {   ensureLineup(t);   const slots = FORMATIONS[t.formation] || FORMATIONS['4-4-2'], coords = FORM_COORDS[t.formation] || FORM_COORDS['4-4-2'];   const xi = lineupOf(t), bench = benchOf(t).sort((a, b) => b.rating - a.rating).slice(0, 12);   const gk = { c1: '#7ddc1f', c2: '#1a1a1a' };   const men = xi.map((p, i) => {     const [x, y] = coords[i], bad = posPenalty(p.pos, slots[i]) > 3;     return `<button class="fpl" data-pid="${p.id}" style="left:${8 + x * 0.84}%;top:${8 + (100 - y) * 0.84}%">       ${kitSVG(slots[i] === 'GK' ? gk : t, false, 40)}      <span class="fn"><b>${p.rating}${penTag(p, slots[i])}</b><span>${esc(p.last || p.name)}${bad ? ' !' : ''}${t.captainId === p.id ? ' (C)' : ''}</span></span></button>`;   }).join('');   return `<div class="panel"><h3>Starting XI<span class="sub">${t.formation} · rated ${teamOverall(t)}</span></h3>     <div class="pad"><div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${men}</div>     <div style="text-align:center;margin-top:8px"><button class="btn ghost sm" id="pitchToTactics">Change formation / swap players</button></div></div></div>   <div class="panel"><h3>Substitutes<span class="sub">tap a player for his profile</span></h3>     <div class="fsubs">${bench.map(p => `<button class="fsub" data-pid="${p.id}">${faceSVG(p, 40, t.c1)}<b>${p.rating}</b><small>${p.pos} · ${esc(p.last || p.name)}</small></button>`).join('')}</div></div>`; } let squadTab = 'squad'; function sqTabsHTML(t) {   const injured = t.squad.filter(p => !isFit(p, t)).length;   return `<div class="mb-tabs sqtabs">     <button data-sqt="squad" class="${squadTab === 'squad' ? 'on' : ''}">Squad</button>     <button data-sqt="tactics" class="${squadTab === 'tactics' ? 'on' : ''}">Tactics</button>     <button data-sqt="dressing" class="${squadTab === 'dressing' ? 'on' : ''}">Dressing room</button>     <span class="sp"></span>${injured ? `<span class="sqinj">${injured} injured</span>` : ''}     <button class="mini" id="sqNumbers">Squad numbers</button><button class="mini" id="sqMarket">Transfer market</button></div>`; } function sqTiles(arr) {   return `<div class="rvHero">${arr.map(a => `<div><small>${a[0]}</small><b${/potential/i.test(a[0]) ? ' class="potglow"' : ''}${a[2] ? ` style="color:${a[2]}"` : ''}>${a[1]}</b></div>`).join('')}</div>`; } function bindSqTabs(v) {   v.querySelectorAll('[data-sqt]').forEach(b => b.onclick = () => { squadTab = b.dataset.sqt; selSpot = null; viewSquadHub(); window.scrollTo({ top: 0 }); });   const m = v.querySelector('#sqMarket'); if (m) m.onclick = () => goTo('transfers'); const nb = v.querySelector('#sqNumbers'); if (nb) nb.onclick = openKitNumbersModal; } function viewSquadHubBase() {   const v = $('#v-squad'); v.classList.add('mmx', 'sqv');   if (squadTab === 'tactics') viewTactics(); else viewSquad(); } function viewSquad() {   const v = $('#v-squad'), t = me();   const order = { GK:0, RB:1, CB:2, LB:3, RWB:4, LWB:5, CDM:6, CM:7, CAM:8, RM:9, LM:10, RW:11, LW:12, ST:13, CF:14 };   const sorter = (a, b) => {     if (squadSort === 'pos') return order[a.pos] - order[b.pos] || b.rating - a.rating;     if (squadSort === 'age') return a.age - b.age || b.rating - a.rating;     if (squadSort === 'goals') return b.goals - a.goals || b.assists - a.assists;     if (squadSort === 'value') return b.value - a.value;     if (squadSort === 'growth') return (b.rating - b.startRating) - (a.rating - a.startRating);     if (squadSort === 'contract') return a.contract - b.contract || b.rating - a.rating;     return b.rating - a.rating;   };   const sf = p => (!squadQ || p.name.toLowerCase().includes(squadQ.toLowerCase())) && (squadGrp === 'ALL' || POS_GROUP[p.pos] === squadGrp) && (squadFlag === 'ALL' || (squadFlag === 'inj' && (p.inj > 0 || p.dty > 0 || banLeft(p, t) > 0)) || (squadFlag === 'exp' && p.contract <= 1) || (squadFlag === 'list' && (p.tl || p.ll)) || (squadFlag === 'u23' && p.age <= 23));   const first = firstTeamOf(t).filter(sf).sort(sorter);   const reserves = reservesOf(t).filter(sf).sort(sorter);   const onLoanOut = G.teams.flatMap(c => c.squad.filter(p => p.loan && p.loan.from === t.id));   const foreign = t.squad.filter(p => p.nat !== 'ZA');   v.innerHTML = sqTabsHTML(t) +     sqTiles([['XI rating', teamOverall(t)], ['Depth', squadAverage(t)], ['First team', first.length], ['Reserves', reserves.length],       ['Wages', money(t.wageBill), t.wageBill > t.wageBudget ? '#ff6b6b' : null], ['Foreign', `${foreign.length}/${MAX_FOREIGN}`]]) +     squadPitchHTML(t) +     `<div class="panel"><div class="pad" style="padding-bottom:4px"><input id="sqQ" type="search" placeholder="Search your squad" value="${esc(squadQ)}" style="width:100%;box-sizing:border-box;background:var(--panel2);border:1px solid var(--line);border-radius:6px;color:inherit;padding:8px">        <div class="chipbar" style="padding:8px 0 0">${[['ALL','All'],['GK','GK'],['DEF','DEF'],['MID','MID'],['ATT','ATT']].map(([k, l]) => `<button class="chip" data-sg="${k}" aria-pressed="${squadGrp === k}">${l}</button>`).join('')}</div>        <div class="chipbar" style="padding:4px 0 0">${[['ALL','Everyone'],['inj','Unavailable'],['exp','Contract ending'],['list','Listed'],['u23','Under 23']].map(([k, l]) => `<button class="chip" data-sfl="${k}" aria-pressed="${squadFlag === k}">${l}</button>`).join('')}</div></div></div>      <div class="panel"><h3>First team<span class="sub">${first.length} players · wages ${money(t.wageBill)} of ${money(t.wageBudget)} a season</span></h3>       <div class="chipbar">${[['rating','Rating'],['pos','Position'],['age','Age'],['goals','Goals'],['growth','Growth'],['contract','Contract'],['value','Value']]         .map(([k, l]) => `<button class="chip" data-ss="${k}" aria-pressed="${squadSort === k}">${l}</button>`).join('')}</div>       ${first.map(p => playerRow(p, t)).join('')}</div>     <div class="panel"><h3>Reserves<span class="sub">${reserves.length} players · organised out of first-team contention</span></h3>       ${reserves.length ? reserves.map(p => playerRow(p, t)).join('') : '<div class="empty">Nobody parked in the reserves.</div>'}</div>     ${onLoanOut.length ? `<div class="panel"><h3>Out on loan<span class="sub">${onLoanOut.length} player${onLoanOut.length === 1 ? '' : 's'} elsewhere</span></h3>       ${onLoanOut.map(p => { const at = findPlayer(G, p.id).t; return `<div class="prow" style="grid-template-columns:auto 1fr"><span></span>         <span class="who"><b>${esc(p.name)}</b><small>at ${esc(at.s)} · ${p.loan.seasons} season${p.loan.seasons === 1 ? '' : 's'} left</small></span></div>`; }).join('')}</div>` : ''}     <div class="panel"><h3>Foreign nationals<span class="sub">up to ${MAX_FOREIGN} per club</span></h3>       <div class="pad" style="display:flex;gap:8px;flex-wrap:wrap">${foreign.length ? foreign.map(p => `<span class="tag" style="padding:4px 8px">${flagSVG(p.nat)} ${esc(p.name)} · ${natName(p.nat)}</span>`).join('') : '<span class="hint">All South African.</span>'}</div></div>`;   v.querySelectorAll('[data-ss]').forEach(b => b.onclick = () => { squadSort = b.dataset.ss; viewSquad(); });   v.querySelectorAll('[data-pfid]').forEach(b => b.onclick = () => { const id = +b.dataset.pfid; pitchSelPid = pitchSelPid === id ? null : id; viewSquad(); });   const ptb = v.querySelector('#pitchToTactics'); if (ptb) ptb.onclick = () => { squadTab = 'tactics'; viewSquadHub(); window.scrollTo({ top: 0 }); };   v.querySelectorAll('[data-sg]').forEach(b => b.onclick = () => { squadGrp = b.dataset.sg; viewSquad(); });   v.querySelectorAll('[data-sfl]').forEach(b => b.onclick = () => { squadFlag = b.dataset.sfl; viewSquad(); });   const sq = v.querySelector('#sqQ'); if (sq) sq.oninput = e => { const c = e.target.selectionStart; squadQ = e.target.value; viewSquad(); const n = $('#sqQ'); if (n) { n.focus(); n.setSelectionRange(c, c); } };   bindSqTabs(v);   bindPlayerRows(v); } function viewSquadOld() {
  const v = $('#v-squad'), t = me();
  const order = { GK:0, RB:1, CB:2, LB:3, RWB:4, LWB:5, CDM:6, CM:7, CAM:8, RM:9, LM:10, RW:11, LW:12, ST:13, CF:14 };
  const sorter = (a, b) => {
    if (squadSort === 'pos') return order[a.pos] - order[b.pos] || b.rating - a.rating;
    if (squadSort === 'age') return a.age - b.age || b.rating - a.rating;
    if (squadSort === 'goals') return b.goals - a.goals || b.assists - a.assists;
    if (squadSort === 'value') return b.value - a.value;
    if (squadSort === 'growth') return (b.rating - b.startRating) - (a.rating - a.startRating);
    if (squadSort === 'contract') return a.contract - b.contract || b.rating - a.rating;
    return b.rating - a.rating;
  };
  const first = firstTeamOf(t).slice().sort(sorter);
  const reserves = reservesOf(t).slice().sort(sorter);
  const onLoanOut = G.teams.flatMap(c => c.squad.filter(p => p.loan && p.loan.from === t.id));
  const foreign = t.squad.filter(p => p.nat !== 'ZA');
  v.innerHTML = `<div class="panel">
    <h3>First team<span class="sub">${first.length} players · XI rated ${teamOverall(t)} · squad depth ${squadAverage(t)}<br>wages ${money(t.wageBill)} of ${money(t.wageBudget)} a season · ${foreign.length}/${MAX_FOREIGN} foreign</span></h3>
    <div class="pad"><button class="btn" id="squadToTransfers">Transfer Market</button></div>     <div class="chipbar">${[['rating','Rating'],['pos','Position'],['age','Age'],['goals','Goals'],['growth','Growth'],['contract','Contract'],['value','Value']]
      .map(([k, l]) => `<button class="chip" data-ss="${k}" aria-pressed="${squadSort === k}">${l}</button>`).join('')}</div>
    ${first.map(p => playerRow(p, t)).join('')}</div>
    <div class="panel"><h3>Reserves<span class="sub">${reserves.length} players · organised out of first-team contention</span></h3>
      ${reserves.length ? reserves.map(p => playerRow(p, t)).join('') : '<div class="empty">Nobody parked in the reserves.</div>'}</div>
    ${onLoanOut.length ? `<div class="panel"><h3>Out on loan<span class="sub">${onLoanOut.length} player${onLoanOut.length === 1 ? '' : 's'} elsewhere</span></h3>
      ${onLoanOut.map(p => { const at = findPlayer(G, p.id).t; return `<div class="prow" style="grid-template-columns:auto 1fr"><span></span>
        <span class="who"><b>${esc(p.name)}</b><small>at ${esc(at.s)} · ${p.loan.seasons} season${p.loan.seasons === 1 ? '' : 's'} left</small></span></div>`; }).join('')}</div>` : ''}
    <div class="panel"><h3>Foreign nationals<span class="sub">up to ${MAX_FOREIGN} per club</span></h3>
      <div class="pad" style="display:flex;gap:8px;flex-wrap:wrap">${
        foreign.length ? foreign.map(p => `<span class="tag" style="padding:4px 8px">${flagSVG(p.nat)} ${esc(p.name)} · ${natName(p.nat)}</span>`).join('')
        : '<span class="hint">All South African.</span>'}</div></div>`;
  v.querySelectorAll('[data-ss]').forEach(b => b.onclick = () => { squadSort = b.dataset.ss; viewSquad(); });   v.insertAdjacentHTML('afterbegin', squadPitchHTML(t));   const ptb = v.querySelector('#pitchToTactics'); if (ptb) ptb.onclick = () => goTo('tactics');   const trBtn = v.querySelector('#squadToTransfers'); if (trBtn) trBtn.onclick = () => goTo('transfers');
  bindPlayerRows(v);
}

/* ---------------- player profile ---------------- */
const hashS = s => { let h = 2166136261; for (let i = 0; i < String(s).length; i++) { h ^= String(s).charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };
const ATTR_PROFILE = { ST:[3,8,-6,2,-25,2], CF:[0,6,-2,4,-25,0], LW:[8,2,2,8,-18,-6], RW:[8,2,2,8,-18,-6], CAM:[0,3,8,6,-15,-4], LWB:[6,-10,0,1,3,2], RWB:[6,-10,0,1,3,2], RM:[6,0,2,7,-18,-6], LM:[6,0,2,7,-18,-6], CM:[-2,-2,7,3,-6,0], CDM:[-4,-8,4,-2,8,6], CB:[-5,-25,-8,-14,10,8], RB:[4,-15,-2,0,4,2], LB:[4,-15,-2,0,4,2], GK:[0,0,0,0,0,0] };
function playerAttrBars(p) {
  const gk = p.pos === 'GK';
  const L = gk ? ['DIV','HAN','KIC','REF','SPD','POS'] : ['PAC','SHO','PAS','DRI','DEF','PHY'];
  const prof = ATTR_PROFILE[p.pos] || ATTR_PROFILE.CM;
  const tr = p.tr || [], paid = p.trPaid || 0, last = p.trLast || [];   return L.map((l, i) => [l, clamp(Math.round(p.rating + prof[i] + (hashS(p.id + '_' + i) - 0.5) * 10 + ((tr[i] || 0) - paid)), 18, 97), last[i] > 0 && G.round - last[i] >= 0 && G.round - last[i] <= 1]);
}
function starterRatingAt(t, pos) {
  const same = t.squad.filter(pl => pl.pos === pos);
  const pool = same.length ? same : t.squad.filter(pl => POS_GROUP[pl.pos] === POS_GROUP[pos]);
  return pool.length ? Math.max(...pool.map(pl => pl.rating)) : 0;
}
/* Who would want this player, and how badly: [{ t, s }] best first.
   interestedClubs() below is just the top of this list. */
function interestRanking(p, ownerId) {
  const ptier = ownerId != null ? G.teams[ownerId].tier : 3;
  const windowOpen = inTransferWindow(G);
  const out = [];
  for (const t of G.teams) {
    if (t.id === ownerId || t.squad.length >= 31) continue;
    if (t.tier > ptier + 1 || t.tier < ptier - 2) continue;
    if (t.budget < p.value * 0.5) continue;
    const d = p.rating - starterRatingAt(t, p.pos);
    if (d < (p.tl ? -1 : 1)) continue;
    if (p.nat !== 'ZA' && t.squad.filter(pl => pl.nat !== 'ZA').length >= MAX_FOREIGN) continue;
    if (p.rating - clubLevel(t) >= 15) continue;
    let s = d + (t.tier < ptier ? 2 : 0) - (t.tier > ptier ? 3 : 0);
    s += (hashS(p.id + '_' + t.id + '_' + G.round) - 0.5) * 6;
    if (p.wantsOut) s += 2.5;
    if (p.tl) s += 2;   /* transfer-listed: clubs know he's available */
    if (p.contract <= 1) s += 1.5;
    if (!windowOpen) s -= 4;
    if (p.contractSignedRound != null && G.round - p.contractSignedRound < 8) s -= (8 - (G.round - p.contractSignedRound)) * 0.8;
    out.push({ t, s });
  }
  return out.filter(x => x.s >= 3).sort((a, b) => b.s - a.s);
}
function interestedClubs(p, ownerId, n) {
  n = n || 4;
  return interestRanking(p, ownerId).slice(0, n).map(x => x.t);
}

/* A short, human reason a given club is watching a player — built from the
   same signals interestedClubs() scores on, so the UI can explain itself
   instead of just naming names. */
function scoutReason(p, t, ownerId) {
  const ptier = ownerId != null ? G.teams[ownerId].tier : 3;
  const d = p.rating - starterRatingAt(t, p.pos);
  const reasons = [];
  if (d >= 8) reasons.push(`need a new ${p.pos} badly`);
  else if (d >= 4) reasons.push(`rate him above their current ${p.pos}`);
  else reasons.push(`like him as cover at ${p.pos}`);
  if (t.tier < ptier) reasons.push('a step up for him');
  else if (t.tier > ptier) reasons.push('a reliable move if things turn');
  if (p.wantsOut) reasons.push("know he's unsettled");
  if (p.contract <= 1) reasons.push('circling as his contract runs down');
  return reasons.slice(0, 2).join(' — ');
}
function sparkChart(p) {
  const hist = (p.career || []).map(c => [seasonLabel(c.season), c.rating]);
  hist.push([seasonLabel(G.season), Math.round(p.rating)]);
  const pts = hist.map(h => h[1]);
  const w = 280, h = 84, pad = 8;
  const all = pts.concat([potMid(p)]);
  const mn = Math.min(...all) - 3, mx = Math.max(...all) + 3;
  const n = pts.length + 1;
  const X = i => pad + i * (w - 2 * pad) / Math.max(1, n);
  const Y = v => h - pad - (v - mn) / (mx - mn) * (h - 2 * pad);
  const line = pts.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ');
  const li = pts.length - 1;
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img" aria-label="Overall rating by season">
    <polyline points="${line}" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="${X(li)}" y1="${Y(pts[li])}" x2="${X(n)}" y2="${Y(potMid(p))}" stroke="var(--faint)" stroke-width="2" stroke-dasharray="4 4"/>
    ${pts.map((v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="3" fill="var(--gold)"/>`).join('')}
    <circle cx="${X(n)}" cy="${Y(potMid(p))}" r="4" fill="none" stroke="var(--faint)" stroke-width="2"/>
    <text x="${X(0)}" y="${h - 1}" fill="var(--faint)" font-size="9">${esc(hist[0][0])}</text>
    <text x="${X(li) - 10}" y="${Y(pts[li]) - 8}" fill="var(--ink)" font-size="10" font-weight="700">${pts[li]}</text>
    <text x="${X(n) - 26}" y="${Y(potMid(p)) - 8}" fill="var(--faint)" font-size="10">${potTxt(p)}</text>
  </svg>`;
}
function shopAround(pid) {
  const found = findPlayer(G, pid);
  if (!found || !found.t || found.t.id !== G.myTeam) return { ok: false, msg: 'You can only shop around your own players.' };
  const p = found.p, t = found.t;   if (signLockLeft(p) > 0) return { ok: false, msg: p.name + ' only just signed. You can shop him around in ' + signLockLeft(p) + ' days.' };
  if (!inTransferWindow(G)) return { ok: false, msg: `The transfer window is shut. It reopens in ${roundsToNextWindow(G)} day${roundsToNextWindow(G) === 1 ? '' : 's'}.` };
  const cands = interestedClubs(p, t.id, 4).filter(x => x.budget >= p.value * 0.7);
  if (!cands.length) return { ok: false, msg: `No clubs are interested in ${p.name} right now.` };
  G.pendingBids = G.pendingBids || [];
  let n = 0;
  cands.forEach(buyer => {
    if (G.pendingBids.some(b => b.pid === pid && b.from === buyer.id)) return;
    G.pendingBids.push({ pid: p.id, name: p.name, rating: p.rating, pos: p.pos, nat: p.nat, from: buyer.id, fee: capToClause(p, Math.round(p.value * (0.8 + rnd() * 0.85) * 100) / 100) });
    n++;
  });
G.pendingBids = G.pendingBids.slice(-15);
  return { ok: true, msg: `${n} club${n === 1 ? '' : 's'} made an offer for ${p.name}.` };
}
function isWatched(pid) { return (G.watchlist || []).includes(pid); }
function toggleWatch(pid) {
  if (!G.watchlist) G.watchlist = [];
  const i = G.watchlist.indexOf(pid);
  if (i >= 0) { G.watchlist.splice(i, 1); return false; }
  G.watchlist.push(pid); return true;
}
/* ---------------- First-time guide ---------------- */ const GUIDE_KEY = 'mm_guide_done_v1'; const GUIDE_STEPS = [   { tab: 'match', title: 'Welcome, Manager', body: 'This is your matchday hub. Your next fixture is shown here, and the gold button at the bottom plays it.' },   { tab: 'squad', title: 'Pick your team', body: 'Squad &amp; Tactics shows your starting XI on the pitch. Tap a player for a quick profile, or swap players and change formation in Tactics.' },   { tab: 'calendar', title: 'Time moves on the calendar', body: 'Continue in the top bar moves the days forward until your next match, and turns into Stop while it runs. Next day (bottom bar) moves the calendar forward just one day.' },   { tab: 'transfers', title: 'Buy and sell', body: 'The transfer window is open all of July, August and January. Bid on players, sign free agents and sell the ones you do not need.' },   { tab: 'scouting', title: 'Build a scouting network', body: 'Hire scouts and send them to a region. They bring back reports on talent you can sign, with a much clearer view of each player\'s potential.' },   { tab: 'inbox', title: 'Check your inbox', body: 'Offers, scout reports, board messages and injuries all arrive here. A red number means something needs your attention.' },   { tab: 'club', title: 'Run the club', body: 'Finances, kits, badge and sponsors live under Club &amp; Finances. Win trophies and they appear in the Trophy room.' } ]; let guideIdx = -1; function guideDone() { try { return localStorage.getItem(GUIDE_KEY) === '1'; } catch (e) { return true; } } function guideEnd() { try { localStorage.setItem(GUIDE_KEY, '1'); } catch (e) { } const c = document.getElementById('guideCard'); if (c) c.remove(); guideIdx = -1; } function guideShow() {   const st = GUIDE_STEPS[guideIdx]; if (!st) { guideEnd(); return; }   if (!liveState) { try { goTo(st.tab); } catch (e) { } }   let c = document.getElementById('guideCard');   if (!c) { c = document.createElement('div'); c.id = 'guideCard'; document.body.appendChild(c); }   const last = guideIdx === GUIDE_STEPS.length - 1;   c.innerHTML = `<div class="gstep">Step ${guideIdx + 1} of ${GUIDE_STEPS.length}</div><h4>${st.title}</h4><p>${st.body}</p>     <div class="gbtns"><button class="gskip" id="gSkip">Skip guide</button>${guideIdx > 0 ? '<button class="btn ghost sm" id="gBack">Back</button>' : ''}<button class="btn sm" id="gNext">${last ? 'Got it' : 'Next'}</button></div>`;   $('#gSkip').onclick = guideEnd;   const gb = $('#gBack'); if (gb) gb.onclick = () => { guideIdx--; guideShow(); };   $('#gNext').onclick = () => { if (last) guideEnd(); else { guideIdx++; guideShow(); } }; } function startGuide(force) { if (!force && guideDone()) return; guideIdx = 0; guideShow(); } function maybeStartGuide() { try { if (!guideDone() && G && G.round === 0 && !liveState) startGuide(false); } catch (e) { } } /* ---------------- Scouting network ---------------- */ const SCOUT_MAX = 3, SCOUT_COST_HIRE = 0.2, SCOUT_COST_ASSIGN = 0.03; const SCOUT_REGIONS = [['ZA', 'South Africa'], ['AFR', 'Rest of Africa'], ['EUR', 'Europe'], ['SAM', 'South America'], ['NAM', 'North America'], ['ASI', 'Asia']]; const SCOUT_POSITIONS = [['ANY', 'Any position'], ['GK', 'Goalkeepers'], ['DEF', 'Defenders'], ['MID', 'Midfielders'], ['ATT', 'Attackers']]; const SCOUT_AGES = [[99, 'Any age'], [21, 'Under 21'], [23, 'Under 23'], [26, 'Under 26']]; const SCOUT_FIRST = ['Thabo', 'Sipho', 'Lerato', 'Kagiso', 'Naledi', 'Pieter', 'Anele', 'Zanele', 'Mandla', 'Refiloe', 'Bongani', 'Karabo']; const SCOUT_LAST = ['Dlamini', 'Nkosi', 'Mokoena', 'Botha', 'Naidoo', 'Khumalo', 'Sithole', 'van Wyk', 'Molefe', 'Ndlovu', 'Pillay', 'Mahlangu']; let scoutForm = null, sfLast = { region: 'ZA', pos: 'ANY', age: 99 }; function scoutNet() { if (!G.scouting) G.scouting = { scouts: [], reports: [], known: {}, seq: 1 }; return G.scouting; } function scoutRegionName(k) { const r = SCOUT_REGIONS.find(x => x[0] === k); return r ? r[1] : k; } function scoutSpend(amount, what) {   const t = me();   if (t.budget < amount) { toastWarn(`You need ${money(amount)} in your transfer budget to ${what}.`); return false; }   t.budget = Math.round((t.budget - amount) * 1000) / 1000;   t.fin.wages += amount;   return true; } function scoutHire() {   const n = scoutNet();   if (n.scouts.length >= SCOUT_MAX) { toastWarn(`Your network is full: ${SCOUT_MAX} scouts at most.`); return; }   if (!scoutSpend(SCOUT_COST_HIRE, 'hire a scout')) return;   n.scouts.push({ id: n.seq++, name: `${pick(SCOUT_FIRST)} ${pick(SCOUT_LAST)}`, level: 1, job: null, found: 0 });   save(); render(); } function scoutUpgrade(id) {   const sc = scoutNet().scouts.find(x => x.id === id); if (!sc || sc.level >= 5) return;   if (!scoutSpend(0.25 * sc.level, 'upgrade this scout')) return;   sc.level++; save(); render(); toastGood(`${sc.name} is now level ${sc.level}.`); } function scoutRelease(id, ok) {   const n = scoutNet(), sc = n.scouts.find(x => x.id === id); if (!sc) return;   if (!ok) { gameConfirm('Release scout', `Release ${sc.name}? Any trip in progress is lost.`, 'Release', () => scoutRelease(id, true)); return; }   n.scouts = n.scouts.filter(x => x.id !== id); save(); render(); } function scoutAssign(id) {   const n = scoutNet(), sc = n.scouts.find(x => x.id === id); if (!sc || sc.job) return;   const region = $('#sfRegion').value, pos = $('#sfPos').value, age = +$('#sfAge').value;   sfLast = { region, pos, age };   if (!scoutSpend(SCOUT_COST_ASSIGN, 'send a scout out')) return;   const total = sc.level >= 4 ? 2 : 3;   sc.job = { region, pos, age, left: total, total };   scoutForm = null; save(); render();   toast(`${sc.name} is off to scout ${scoutRegionName(region)}. Report due in ${total} matchdays.`); } function scoutNetTick(G) {   const n = G.scouting; if (!n || !n.scouts.length) return;   n.scouts.forEach(sc => { if (!sc.job) return; sc.job.left--; if (sc.job.left <= 0) scoutFinish(G, sc); }); } function scoutFinish(G, sc) {   const n = G.scouting, job = sc.job, my = G.teams[G.myTeam];   const mine = new Set(my.squad.map(p => p.id));   const recent = new Set(); n.reports.slice(0, 4).forEach(r => r.ids.forEach(id => recent.add(id)));   const pool = [];   G.teams.forEach(c => { if (c.id !== G.myTeam) c.squad.forEach(p => pool.push({ p, club: c })); });   (G.freeAgents || []).forEach(p => pool.push({ p, club: null }));   const okRegion = p => job.region === 'ZA' ? p.nat === 'ZA' : (p.nat !== 'ZA' && regionOf(p.nat) === job.region);   let cand = pool.filter(x => okRegion(x.p) && (job.pos === 'ANY' || POS_GROUP[x.p.pos] === job.pos) && x.p.age <= job.age && !mine.has(x.p.id));   const fresh = cand.filter(x => !recent.has(x.p.id)); if (fresh.length >= 3) cand = fresh;   const noise = 9 - sc.level * 1.6;   const top = cand.map(x => ({ x, s: x.p.pot * 0.55 + x.p.rating * 0.45 + (rnd() - 0.5) * 2 * noise })).sort((a, b) => b.s - a.s).slice(0, 4).map(r => r.x);   sc.job = null;   if (!top.length) {     mail(G, { key: 'snet_' + (n.seq++), cat: 'scout', from: `${sc.name} (Scout)`, subject: `Scout report: ${scoutRegionName(job.region)}`,       body: [`I covered ${scoutRegionName(job.region)} but nobody fitted your brief. Try widening the position or age and send me out again.`] });     return;   }   top.forEach(x => { n.known[x.p.id] = Math.max(n.known[x.p.id] || 0, sc.level); });   const rep = { id: n.seq++, season: G.season, round: G.round, scout: sc.name, level: sc.level, region: job.region, pos: job.pos, age: job.age, ids: top.map(x => x.p.id) };   n.reports.unshift(rep); if (n.reports.length > 12) n.reports.length = 12;   sc.found += top.length;   const best = top[0];   mail(G, { key: 'snet_' + rep.id, cat: 'scout', from: `${sc.name} (Scout)`, p: best.p, club: best.club, status: best.club ? 'Plays at ' + best.club.n : 'Free agent', act: 'shortlist',     subject: `Scout report: ${scoutRegionName(job.region)}`,     body: [`I'm back from ${scoutRegionName(job.region)}. The pick of the bunch is ${best.p.name}.`, `${top.length} players are in the full report on the Scouting page, and their potential is now much clearer.`] }); } function viewScouting() {   const v = $('#v-scouting'), t = me(), n = scoutNet();   v.classList.add('mmx');   const stars = l => '★'.repeat(l) + '☆'.repeat(5 - l);   const posName = k => (SCOUT_POSITIONS.find(x => x[0] === k) || [k, k])[1];   const ageName = a => (SCOUT_AGES.find(x => x[0] === a) || [a, a])[1];   const opts = (arr, sel) => arr.map(([k, l]) => `<option value="${k}" ${String(sel) === String(k) ? 'selected' : ''}>${l}</option>`).join('');   const cards = n.scouts.map(sc => {     let body;     if (sc.job) {       const j = sc.job, done = j.total - j.left;       body = `<div class="hint" style="margin-top:8px">Scouting <b>${scoutRegionName(j.region)}</b> · ${posName(j.pos)} · ${ageName(j.age)}</div>         <div class="bar" style="margin:8px 0 4px"><i style="width:${Math.round(done / j.total * 100)}%"></i></div>         <div class="hint">${j.left} matchday${j.left === 1 ? '' : 's'} until the report</div>`;     } else if (scoutForm === sc.id) {       body = `<div class="sform"><select id="sfRegion">${opts(SCOUT_REGIONS, sfLast.region)}</select><select id="sfPos">${opts(SCOUT_POSITIONS, sfLast.pos)}</select><select id="sfAge">${opts(SCOUT_AGES, sfLast.age)}</select>         <div class="acts"><button class="btn sm" data-sgo="${sc.id}">Send out · ${money(SCOUT_COST_ASSIGN)}</button><button class="btn ghost sm" data-scancel="1">Cancel</button></div></div>`;     } else {       body = `<div class="acts"><button class="btn sm" data-sassign="${sc.id}">Assign</button>${sc.level < 5 ? `<button class="btn ghost sm" data-supg="${sc.id}">Upgrade · ${money(0.25 * sc.level)}</button>` : ''}<button class="btn ghost sm" data-srel="${sc.id}">Release</button></div>`;     }     return `<div class="scoutcard"><h4>${esc(sc.name)}</h4><div class="stars">${stars(sc.level)}</div><div class="hint">Level ${sc.level} · ${sc.found} player${sc.found === 1 ? '' : 's'} reported</div>${body}</div>`;   }).join('');   const wl = G.watchlist || [];   const reps = n.reports.map(r => {     const rows = r.ids.map(id => findPlayer(G, id)).filter(f => f && f.p).map(f => {       const p = f.p, club = f.t, on = wl.indexOf(p.id) >= 0;       return `<div class="prow" data-pid="${p.id}" style="grid-template-columns:auto auto 1fr auto auto auto;cursor:pointer">         ${faceSVG(p, 34, club ? club.c1 : '#2b3a33')}<span class="ratcol">${ratingTag(p.rating)}</span>         <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · age ${p.age} · ${club ? esc(club.s || club.n) : 'Free agent'}</small></span>         <span class="ratcol pot">${potTag(p)}</span><span class="val">${money(p.value)}</span>         <button class="chip" data-sl="${p.id}" aria-pressed="${on}" title="Shortlist">${on ? '★' : '☆'}</button></div>`;     }).join('');     return `<div class="panel"><h3>${scoutRegionName(r.region)} · ${posName(r.pos)}<span class="sub">${esc(r.scout)} · ${seasonLabel(r.season)} MD${r.round}</span></h3>${rows || '<div class="empty">These players are no longer around.</div>'}</div>`;   }).join('');   v.innerHTML = `<div class="panel"><h3>Scouting network<span class="sub">${n.scouts.length}/${SCOUT_MAX} scouts · budget ${money(t.budget)}</span></h3>     <div class="pad"><p class="hint" style="margin:0 0 10px">Scouts search a region for players that fit your brief and report back in a few matchdays. Anyone they report on has a much clearer potential rating, everywhere in the game. Better scouts find better players, and faster.</p>       <button class="btn sm" id="scHire" ${n.scouts.length >= SCOUT_MAX ? 'disabled' : ''}>Hire a scout · ${money(SCOUT_COST_HIRE)}</button></div>     ${n.scouts.length ? `<div class="scoutgrid">${cards}</div>` : '<div class="empty">No scouts yet. Hire one to start finding talent.</div>'}</div>     ${n.reports.length ? `<h3 style="margin:14px 2px 6px;color:#fff">Scout reports</h3>${reps}` : ''}`;   const h = $('#scHire'); if (h) h.onclick = scoutHire;   v.querySelectorAll('[data-sassign]').forEach(b => b.onclick = () => { scoutForm = +b.dataset.sassign; viewScouting(); });   v.querySelectorAll('[data-scancel]').forEach(b => b.onclick = () => { scoutForm = null; viewScouting(); });   v.querySelectorAll('[data-sgo]').forEach(b => b.onclick = () => scoutAssign(+b.dataset.sgo));   v.querySelectorAll('[data-supg]').forEach(b => b.onclick = () => scoutUpgrade(+b.dataset.supg));   v.querySelectorAll('[data-srel]').forEach(b => b.onclick = () => scoutRelease(+b.dataset.srel));   bindPlayerRows(v);   v.querySelectorAll('[data-sl]').forEach(b => b.onclick = e => { e.stopPropagation(); toggleWatch(+b.dataset.sl); save(); viewScouting(); }); } /* ---------------- Season recap card ---------------- */ let recapBack = null; function recapCapture() {   try {     const t = me(); if (!G.recapExtra) G.recapExtra = {};     const top = key => t.squad.filter(p => (p[key] || 0) > 0).sort((a, b) => b[key] - a[key])[0];     const sc = top('goals'), as = top('assists');     G.recapExtra[G.season] = { scorer: sc ? { name: sc.name, n: sc.goals } : null, assist: as ? { name: as.name, n: as.assists } : null };   } catch (e) { } } function recapData(season) {   const t = me(), hist = t.history || [];   const i = hist.findIndex(x => x.season === season); if (i < 0) return null;   const h = hist[i], nextTier = i < hist.length - 1 ? hist[i + 1].tier : t.tier, ex = (G.recapExtra || {})[season] || {};   return { season, t, tier: h.tier, pos: h.pos, pts: h.pts, w: h.w, d: h.d, l: h.l, gf: h.gf, ga: h.ga,     champion: h.pos === 1, promoted: nextTier < h.tier, relegated: nextTier > h.tier,     trophies: (t.trophies || []).filter(x => x.season === season).map(x => x.name),     scorer: ex.scorer || null, assist: ex.assist || null, manager: G.manager.name }; } function recapCrestImage(t) {   return new Promise(res => {     try {       const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null);       if (t.badge === 'bright') { im.src = IMG_BRIGHT; return; }       const w = document.createElement('div'); w.innerHTML = crestBaseHTML(t, 240);       const svg = w.querySelector('svg'); if (!svg) return res(null);       if (!svg.getAttribute('xmlns')) svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');       im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));     } catch (e) { res(null); }   }); } async function drawRecap(d) {   try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { }   const W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H;   const g = cv.getContext('2d'), t = d.t;   const head = (getComputedStyle(document.documentElement).getPropertyValue('--head') || '').trim() || 'Arial Narrow, Arial, sans-serif';   const c1 = /^#[0-9a-f]{6}$/i.test(t.c1 || '') ? t.c1 : '#f5c518';   const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, shade(c1, -62)); bg.addColorStop(.5, '#0b0f14'); bg.addColorStop(1, '#05070a');   g.fillStyle = bg; g.fillRect(0, 0, W, H);   const glow = g.createRadialGradient(W / 2, 330, 40, W / 2, 330, 540); glow.addColorStop(0, c1 + '66'); glow.addColorStop(1, 'rgba(0,0,0,0)');   g.fillStyle = glow; g.fillRect(0, 0, W, H);   g.strokeStyle = '#f2b928'; g.lineWidth = 6; g.strokeRect(28, 28, W - 56, H - 56);   const T = (txt, x, y, size, color, weight, align) => { g.font = `${weight || 700} ${size}px ${head}`; g.fillStyle = color; g.textAlign = align || 'center'; g.fillText(txt, x, y); };   const fit = (txt, maxW, size, weight) => { let s = size; while (s > 22) { g.font = `${weight || 800} ${s}px ${head}`; if (g.measureText(txt).width <= maxW) break; s -= 2; } return s; };   const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };   T('MZANSI MANAGER', W / 2, 100, 34, '#f2b928', 800);   T(`${seasonLabel(d.season)} SEASON RECAP`, W / 2, 148, 28, '#cfd4da', 600);   const im = await recapCrestImage(t);   if (im) { const sz = 270, r = Math.min(sz / im.width, sz / im.height), w = im.width * r, h = im.height * r; g.drawImage(im, (W - w) / 2, 190 + (sz - h) / 2, w, h); }   const name = (t.n || '').toUpperCase();   T(name, W / 2, 530, fit(name, W - 160, 76, 800), '#ffffff', 800);   T((TIER_NAMES[d.tier] || '').toUpperCase(), W / 2, 580, 30, '#9aa0a6', 600);   T('FINAL POSITION', W / 2, 650, 26, '#9aa0a6', 600);   T(ordinal(d.pos), W / 2, 820, 210, '#f2b928', 800);   const tag = d.champion ? ['LEAGUE CHAMPIONS', '#f2b928', '#1c1505'] : d.promoted ? ['PROMOTED', '#2ecc71', '#04210f'] : d.relegated ? ['RELEGATED', '#e5484d', '#fff'] : null;   if (tag) { g.font = `800 32px ${head}`; const tw = g.measureText(tag[0]).width + 70; rr((W - tw) / 2, 850, tw, 62, 31); g.fillStyle = tag[1]; g.fill(); T(tag[0], W / 2, 893, 32, tag[2], 800); }   const tiles = [['WON', d.w], ['DRAWN', d.d], ['LOST', d.l], ['POINTS', d.pts]], tw2 = 220, gap = 24, x0 = (W - (tw2 * 4 + gap * 3)) / 2;   tiles.forEach((tl, i) => { const x = x0 + i * (tw2 + gap); rr(x, 950, tw2, 130, 16); g.fillStyle = 'rgba(255,255,255,.07)'; g.fill(); T(String(tl[1]), x + tw2 / 2, 1030, 66, '#ffffff', 800); T(tl[0], x + tw2 / 2, 1064, 22, '#9aa0a6', 600); });   T(`Goals ${d.gf} for · ${d.ga} against`, W / 2, 1126, 28, '#cfd4da', 600);   const lines = [];   if (d.scorer) lines.push(`⚽ Top scorer: ${d.scorer.name} (${d.scorer.n})`);   if (d.assist) lines.push(`🎯 Most assists: ${d.assist.name} (${d.assist.n})`);   lines.push(d.trophies.length ? `🏆 ${d.trophies.join(' · ')}` : 'No silverware this season');   lines.slice(0, 3).forEach((ln, i) => { let s = 28; while (s > 18) { g.font = `600 ${s}px ${head}`; if (g.measureText(ln).width <= W - 140) break; s -= 2; } T(ln, W / 2, 1182 + i * 42, s, '#e6e9ed', 600); });   T(`Manager ${d.manager}  ·  mzansimanager.co.za`, W / 2, 1306, 24, '#9aa0a6', 600);   return cv; } function recapSave(cv, name) {   cv.toBlob(b => {     if (!b) { toastWarn('Could not create the image on this browser.'); return; }     const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove();     setTimeout(() => URL.revokeObjectURL(a.href), 4000);   }, 'image/png'); } async function openRecapCard(season) {   const t = me(), hist = t.history || [];   const d = recapData(season != null ? season : (hist.length ? hist[hist.length - 1].season : null));   if (!d) { toast('Finish a season to unlock your recap card.'); return; }   const back = recapBack; recapBack = null;   openModal(`${seasonLabel(d.season)} recap`, `<div class="recapwrap" id="recapHost"><div class="hint" style="text-align:center">Drawing your card…</div></div>`,     `${back ? '<button class="btn ghost sm" id="rcBack">Back</button>' : ''}<button class="btn ghost sm" id="rcShare" style="display:none">Share</button><button class="btn sm" id="rcSave">Save image</button>`);   $('#modal').classList.add('mmx');   if (back) $('#rcBack').onclick = back;   const cv = await drawRecap(d), host = $('#recapHost'); if (!host) return;   host.innerHTML = ''; host.appendChild(cv);   const fname = `mzansi-manager-${d.season}-recap.png`;   $('#rcSave').onclick = () => recapSave(cv, fname);   cv.toBlob(b => {     if (!b) return;     const f = new File([b], fname, { type: 'image/png' });     if (navigator.canShare && navigator.canShare({ files: [f] })) {       const sb = $('#rcShare'); if (!sb) return; sb.style.display = '';       sb.onclick = () => navigator.share({ files: [f], title: 'My Mzansi Manager season', text: `${d.t.n} ${seasonLabel(d.season)}: finished ${ordinal(d.pos)}` }).catch(() => { });     }   }, 'image/png'); } /* ---------------- Not for sale ---------------- */ function toggleNotForSale(pid) {   const f = findPlayer(G, pid); if (!f || !f.p || !f.t || f.t.id !== G.myTeam) return;   const p = f.p; p.notForSale = !p.notForSale;   if (p.notForSale) {     G.pendingBids = (G.pendingBids || []).filter(b => b.pid !== p.id);     toastGood(`${p.name} is marked not for sale. Clubs will stop bidding for him.`);   } else toast(`${p.name} is open to offers again.`);   save(); } function nfsDecorate(pid) {   try {     const f = findPlayer(G, pid); if (!f || !f.p || !f.t || f.t.id !== G.myTeam) return;     const p = f.p, foot = document.querySelector('#modal footer'); if (!foot) return;     const btn = document.createElement('button');     btn.className = 'btn ghost sm'; btn.id = 'pmNfs';     btn.textContent = p.notForSale ? 'Open to offers' : 'Not for sale';     btn.title = p.notForSale ? 'Let clubs bid for him again' : 'Stop clubs making offers for him';     btn.onclick = () => { toggleNotForSale(p.id); playerModal(p.id); };     const anchor = [...foot.querySelectorAll('button')].find(b => /^(Release|Move to reserves|Make captain)$/i.test(b.textContent.trim()));     if (anchor) foot.insertBefore(btn, anchor); else foot.appendChild(btn);     if (p.notForSale) {       [...foot.querySelectorAll('button')].forEach(b => { if (/^(Transfer list|Shop around|Loan list|Sell|Loan out)$/i.test(b.textContent.trim())) { b.disabled = true; b.title = 'Marked as not for sale'; } });       const tag = document.createElement('div'); tag.className = 'hint'; tag.style.cssText = 'padding:0 0 8px;width:100%;color:#f2b928;font-weight:700'; tag.textContent = 'NOT FOR SALE: clubs will not make offers for him.';       foot.insertBefore(tag, foot.firstChild);     }   } catch (e) { } } const _playerModalBase = playerModal; playerModal = function (pid) { _playerModalBase(pid); nfsDecorate(pid); }; function viewWatchlist() {
  const v = $('#v-watchlist');
  v.classList.add('mmx');
  const list = (G.watchlist || []).map(pid => findPlayer(G, pid)).filter(x => x && x.p);
  v.innerHTML = `<div class="panel"><h3>Shortlist<span class="sub">${list.length} player${list.length === 1 ? '' : 's'} you're keeping an eye on</span></
    ${list.length ? list.map(({ p, t }) => `<button class="prow" data-pid="${p.id}">
        ${faceSVG(p, 34, t ? t.c1 : null)}
        ${ratingTag(p.rating)}
        <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b>
          <small>${p.pos} · ${p.age} · ${t ? esc(t.n) : 'Free agent'}</small></span>
        <span class="val">${money(p.value)}</span></button>`).join('')
      : `<div class="empty">You're not keeping an eye on anyone yet. Open a player's profile and tap "Keep an eye on him" to add them here.</div>`}</div>`;
  bindPlayerRows(v);
}
function loanSpellsOf(p, t) {   return (p.clubs || []).filter(c => c.loan).map(c => {     const club = teamById(G, c.id);     if (!club) return null;     const current = !!(p.loan && t && club.id === t.id);     const stat = current ? { apps: p.apps, g: p.goals, a: p.assists, rating: Math.round(p.rating) } : (p.career || []).find(k => k.club === c.id && k.season === c.from);     return { club, season: c.from, stat, current };   }).filter(Boolean); } function loanSpellsOf(p, t) {   return (p.clubs || []).filter(c => c.loan).map(c => {     const club = teamById(G, c.id);     if (!club) return null;     const current = !!(p.loan && t && club.id === t.id);     const stat = current ? { apps: p.apps, g: p.goals, a: p.assists, rating: Math.round(p.rating) } : (p.career || []).find(k => k.club === c.id && k.season === c.from);     return { club, season: c.from, stat, current };   }).filter(Boolean); } /* ---- compare two players side by side ---- */
function anyPlayer(pid) {
  const f = findPlayer(G, pid); if (f) return f.p ? { p: f.p, t: f.t } : { p: f, t: null };
  const p = (G.freeAgents || []).find(x => x.id === pid); return p ? { p, t: null } : null;
}
function comparePicker(aid) {
  const A = anyPlayer(aid); if (!A) return;
  const pool = q => {
    const list = [], seen = new Set([aid]), lq = q.toLowerCase();
    if (q.length >= 2) { G.teams.forEach(t => t.squad.forEach(p => { if (p.id !== aid && p.name.toLowerCase().includes(lq)) list.push({ p, t }); })); (G.freeAgents || []).forEach(p => { if (p.id !== aid && p.name.toLowerCase().includes(lq)) list.push({ p, t: null }); }); }
    else me().squad.map(p => p.id).concat(G.watchlist || []).forEach(id => { if (seen.has(id)) return; seen.add(id); const x = anyPlayer(id); if (x) list.push(x); });
    return list.sort((a, b) => b.p.rating - a.p.rating).slice(0, 25);
  };
  const rows = q => pool(q).map(x => `<button class="btn ghost sm" data-cmp="${x.p.id}" style="display:flex;width:100%;justify-content:space-between;text-align:left;margin-bottom:6px"><span>${esc(x.p.name)} <span class="hint">${esc(x.p.pos)} · ${x.p.age}</span></span><span class="hint">${x.t ? esc(x.t.s) : 'Free agent'} · ${x.p.rating}</span></button>`).join('') || '<div class="hint">No players found.</div>';
  openModal(`Compare ${esc(A.p.name)} with…`, `<input id="cmpQ" type="search" placeholder="Search any player by name" style="width:100%;box-sizing:border-box;background:var(--panel2);border:1px solid var(--line);border-radius:6px;color:inherit;padding:8px;margin-bottom:8px"><div id="cmpList">${rows('')}</div><p class="hint" style="margin:6px 0 0">Your squad and shortlist are listed first. Search to find anyone else.</p>`, `<button class="btn ghost sm" onclick="closeModal()">Close</button>`);
  const bind = () => document.querySelectorAll('[data-cmp]').forEach(b => b.onclick = () => compareModal(aid, +b.dataset.cmp));
  bind(); $('#cmpQ').oninput = e => { $('#cmpList').innerHTML = rows(e.target.value.trim()); bind(); };
}
function compareModal(aid, bid) {
  const A = anyPlayer(aid), B = anyPlayer(bid); if (!A || !B) return;
  const avg = p => p.ratingApps ? p.ratingSum / p.ratingApps : 0;
  const R = [
    ['Club', x => x.t ? esc(x.t.s) : 'Free agent', null, 0],
    ['Position', x => esc(x.p.pos), null, 0],
    ['Age', x => x.p.age, x => x.p.age, -1],
    ['Rating', x => x.p.rating, x => x.p.rating, 1],
    ['Potential', x => potTxt(x.p), x => potMid(x.p), 1],
    ['Value', x => money(x.p.value), x => x.p.value, 1],
    ['Wage', x => money(x.p.wage), x => x.p.wage, -1],
    ['Contract', x => `${x.p.contract}y`, x => x.p.contract, 1],
    ['Apps', x => appsTxt(x.p), x => x.p.apps || 0, 1],
    ['Goals', x => x.p.goals || 0, x => x.p.goals || 0, 1],
    ['Assists', x => x.p.assists || 0, x => x.p.assists || 0, 1],
    ['Avg rating', x => avg(x.p) ? avg(x.p).toFixed(2) : '—', x => avg(x.p), 1]];
  const head = x => `<div style="text-align:center">${faceSVG(x.p, 52, x.t ? x.t.c1 : undefined)}<div style="font-weight:700;margin-top:4px">${esc(x.p.name)}</div></div>`;
  const body = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">${head(A)}${head(B)}</div>` +
    R.map(([l, f, n, d]) => {
      let ca = '', cb = '';
      if (n && d) { const a = n(A), b = n(B); if (a !== b) { const aw = d > 0 ? a > b : a < b; (aw ? (ca = '#3ddc84') : (cb = '#3ddc84')); } }
      return `<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;padding:6px 0;border-top:1px solid var(--line);align-items:center"><b style="text-align:center;color:${ca || 'inherit'}">${f(A)}</b><span class="hint" style="min-width:70px;text-align:center">${l}</span><b style="text-align:center;color:${cb || 'inherit'}">${f(B)}</b></div>`;
    }).join('');
  openModal('Player comparison', body, `<button class="btn ghost sm" id="cmpBack">Pick another</button><button class="btn ghost sm" onclick="closeModal()">Close</button>`);
  $('#modal').classList.add('mmx');
  $('#cmpBack').onclick = () => comparePicker(aid);
} function playerModal(pid) {
  const found = findPlayer(G, pid) || (G.freeAgents.find(p => p.id === pid) ? { p: G.freeAgents.find(p => p.id === pid), t: null } : null)
    || (me().youth.find(p => p.id === pid) ? { p: me().youth.find(p => p.id === pid), t: me() } : null);
  if (!found) return;
  const p = found.p, t = found.t, isMine = t && t.id === G.myTeam;   if (t) ensureKitNumbers(t);
  const inYouth = isMine && me().youth.some(y => y.id === p.id);
  const listing = G.market.find(m => m.pid === p.id);
  const clubs = (p.clubs || []).map(c => { const cc = teamById(G, c.id); return cc ? `${esc(cc.s)}${c.loan ? ' (loan)' : ''} <span class="hint">(${c.from})</span>` : null; }).filter(Boolean).join(' → ') || '—';   const watched = isWatched(p.id);   const prevChips = (p.clubs || []).slice(0, -1).map(c => { const cc = teamById(G, c.id); return cc ? `<span class="chip">${esc(cc.s)}${c.loan ? ' (loan)' : ''} <span class="hint">${c.from}</span></span>` : ''; }).join(' ');   const loanSpells = loanSpellsOf(p, t);
const careerRows = (p.career || []).slice().reverse().slice(0, 8).map(c => {
    const cc = teamById(G, c.club); if (!cc) return '';
    return `<tr><td>${seasonLabel(c.season)}</td><td>${esc(cc.s)}</td><td class="num">${appsTxtN(c.apps, c.sApps)}</td><td class="num">${c.g}</td><td class="num">${c.a}</td><td class="num">${c.rating}</td></tr>`;
  }).join('');
  const curRow = t ? `<tr style="font-weight:700"><td>${seasonLabel(G.season)} <span class="hint" style="font-weight:400">(now)</span></td><td>${esc(t.s)}</td><td class="num">${appsTxt(p)}</td><td class="num">${p.goals || 0}</td><td class="num">${p.assists || 0}</td><td class="num">${p.rating}</td></tr>` : '';
  const devId = developedBy(p);
  const devClub = devId != null ? teamById(G, devId) : null;
  const legend = t && isClubLegend(G, p, t.id);
  const devLine = devClub
    ? (t && devClub.id === t.id ? `Home-grown at ${esc(devClub.s)}.` : `Product of ${esc(devClub.n)}.`)
    : '';
  const isCaptain = t && t.captainId === p.id, isVice = t && t.viceCaptainId === p.id;
  let loanLine = '';
  if (p.loan) {
    const home = G.teams[p.loan.from];
    loanLine = t && t.id === G.myTeam
      ? `On loan to us from ${esc(home.n)} — ${p.loan.seasons} season${p.loan.seasons === 1 ? '' : 's'} left.`
      : `Out on loan at ${t ? esc(t.n) : '—'} — ${p.loan.seasons} season${p.loan.seasons === 1 ? '' : 's'} left.`;
  }
  const body = `
<div class="mphead">
      <div class="mface">${faceSVG(p, 84, t ? t.c1 : null)}</div>
      <div style="min-width:0;flex:1">
         <h3 style="font-size:23px">${p.kitNo ? `<span style="color:var(--gold);margin-right:6px">#${p.kitNo}</span>` : ''}${esc(p.name)}${isCaptain ? ' <span class="tag" style="color:var(--gold);border-color:var(--gold)">C</span>' : isVice ? ' <span class="tag">VC</span>' : ''}</h3>
        <div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          ${posTag(p.pos)}${(p.alt || []).map(a => `<span style="opacity:.6">${posTag(a)}</span>`).join('')}<span>${flagSVG(p.nat)} ${natName(p.nat)}</span><span class="hint">Age ${p.age}${p.dob ? ', born ' + esc(p.dob) : ''}</span>
        </div>
        <div style="margin-top:6px;font-size:13px">
          ${t ? crestHTML(t, 18) + ' ' + esc(t.n) : '<span class="hint">Free agent</span>'}
          ${legend ? ' <span class="tag" style="color:var(--gold);border-color:var(--gold)">Club legend</span>' : ''}
          ${p.reserve ? ' <span class="tag">reserve</span>' : ''}
          ${p.wantsOut ? ' <span class="tag out">wants a move</span>' : ''}${p.inj > 0 ? ` <span class="tag inj">out ${p.inj} games</span>` : ''}${banLeft(p, t) > 0 ? ` <span class="tag inj">banned ${banLeft(p, t)}</span>` : ''}
        </div>
      </div>
      <div style="text-align:center;flex:0 0 auto">
        <div style="font-family:var(--head);font-size:44px;line-height:1">${Math.round(p.rating)} ${growthHtml(p)}</div>
        <div class="hint">rating</div>
        <div class="hint">potential <b class="potglow">${potTxt(p)}</b> ${potGrowthHtml(p)}</div>
      </div>
    </div>
    <div class="mstats solo"><div><small>Age</small><b>${p.age}</b></div><div><small>Value</small><b>${money(p.value)}</b></div>
      <div><small>Wage</small><b>${money(p.wage)}</b></div><div><small>Contract</small><b>${p.contract}y</b></div>
      <div><small>This season</small><b>${appsTxt(p)}A ${p.goals}G</b></div><div><small>Fitness</small><b>${p.inj > 0 ? 'Out ' + p.inj + ' · back ' + injBack(p) : banLeft(p, t) > 0 ? 'Banned ' + banLeft(p, t) : (staOf(p) < STA_TIRED ? 'Tired ' : 'Fit ') + Math.round(staOf(p)) + '%'}</b></div></div>
    ${devLine ? `<p style="margin:0 0 6px;font-size:13px;color:var(--teal)">${devLine}</p>` : ''}${lastMoveHTML(G, p)}
    ${loanLine ? `<p style="margin:0 0 10px;font-size:13px;color:var(--gold)">${loanLine}</p>` : ''}     ${moodPanelHTML(p, t)}
    <div class="cols">
      <div class="panel"><h3>Growth</h3><div class="pad">${sparkChart(p)}</div></div>
      <div class="panel"><h3>Attributes</h3><div class="pad"><div class="att">${playerAttrBars(p).map(([l, v, up]) => `<b>${l}</b><div class="bar${v >= 70 ? ' g' : ''}"><i style="width:${v}%"></i></div><span>${v}${up ? '<em class="up">▲</em>' : ''}</span>`).join('')}</div></div></div>
    </div>
    <div class="cols" style="margin-top:13px">
      <div class="panel"><h3>Contract and value</h3><dl class="kv" style="padding:11px 13px">
        <dt>Market value</dt><dd>${money(p.value)}</dd>
        <dt>Wage a season</dt><dd>${money(p.wage)} <span class="hint">(${money(p.wage / 12)}/mo)</span></dd>
        <dt>Contract left</dt><dd>${p.contract}y</dd>
        <dt>Career earnings</dt><dd>${money(p.earned || 0)}</dd>
        <dt>Career apps</dt><dd>${p.cApps}</dd>
        <dt>Career goals / assists</dt><dd>${p.cG}/${p.cA}</dd>
      </dl></div>
      <div class="panel"><h3>Interested clubs</h3><div class="pad">${interestedClubs(p, t ? t.id : null, 4).map(x => {         const rec = (isMine && p.scouts) ? p.scouts[x.id] : null;         const weeks = rec ? Math.max(0, G.round - rec.since) : null;         const sinceTxt = weeks == null ? '' : weeks === 0 ? 'spotted this week' : `watching ${weeks} week${weeks === 1 ? '' : 's'}`;         return `<div style="margin-bottom:8px"><div>${crestHTML(x, 16)} ${esc(x.s)} <span class="hint">${TIER_SHORT[x.tier]}</span></div><div class="hint" style="margin-left:22px">${esc(scoutReason(p, x, t ? t.id : null))}${sinceTxt ? ' · ' + sinceTxt : ''}</div></div>`;       }).join('') || '<span class="hint">No clubs are showing interest right now.</span>'}</div></div>
    </div>
    ${!isMine ? `<div class="panel"><h3>Keep an eye</h3><div class="pad">
      <p class="hint" style="margin:0 0 10px">Add ${esc(p.name)} to your shortlist so you can find him again when you're ready to make a move.</p>
      <button class="btn ${watched ? 'gold' : ''} sm" id="pmWatch">${watched ? '★ On your shortlist — remove' : '☆ Keep an eye on him'}</button>
    </div></div>` : ''}
    ${playerAwardsHTML(p)}${playerIntlHTML(p)}<div class="panel"><h3>Previous clubs</h3><div class="pad" style="display:flex;gap:6px;flex-wrap:wrap">${prevChips || '<span class="hint">No previous clubs — home-grown.</span>'}</div></div>     ${loanSpells.length ? `<div class="panel"><h3>Loan spells<span class="sub">${loanSpells.length} loan${loanSpells.length === 1 ? '' : 's'}</span></h3>       ${loanSpells.map(s => `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(s.club, 24)}         <span class="who"><b>${esc(s.club.n)}</b><small>${seasonLabel(s.season)}${s.current ? ' · current' : ''}</small></span>         <span class="val">${s.stat ? `${s.stat.apps} apps · ${s.stat.g}g ${s.stat.a}a` : 'No minutes yet'}</span></div>`).join('')}</div>` : ''}     
    ${p.releaseClause ? `<p style="font-size:13px;color:var(--dim)">Release clause: <b style="color:var(--ink)">${money(p.releaseClause)}</b>${!isMine ? ` <button class="btn sm" id="pmClause" style="margin-left:6px">Trigger clause</button>` : ` <span class="hint" style="margin-left:6px">${clauseThreatText(p)}</span>`}</p>` : ''}
    ${listing ? `<p style="font-size:13px;color:var(--dim)">Listed at <b>${money(listing.ask)}</b>. Interested: ${listing.interest.map(i => esc(G.teams[i].s)).join(', ') || 'nobody yet'}.</p>` : ''}
    ${(curRow || careerRows) ? `<table class="tbl" style="margin-top:8px"><thead><tr><th>Season</th><th>Club</th><th>Apps</th><th>G</th><th>A</th><th>Rat</th></tr></thead><tbody>${curRow}${careerRows}</tbody></table>` : ''}`;
  let footer = `<button class="btn ghost sm" onclick="closeModal()">Close</button>`;
  if (isMine && !inYouth && !p.loan) {
    footer = `<button class="btn ghost sm" id="pmNeg">${p.wantsOut ? 'Persuade to stay' : 'Negotiate contract'}</button>
              <button class="btn ghost sm" id="pmSell">${p.tl ? 'Remove from transfer list' : (signLockLeft(p) > 0 ? 'Transfer list · ' + Math.ceil(signLockLeft(p) / 30) + ' mo' : 'Transfer list')}</button>               <button class="btn ghost sm" id="pmShop">Shop around</button>
              <button class="btn ghost sm" id="pmLoanOut">${p.ll ? 'Remove from loan list' : 'Loan list'}</button>
              <button class="btn ghost sm" id="pmClauseSet">Release clause</button>
              <button class="btn ghost sm" id="pmSquadMove">${p.reserve ? 'Move to first team' : 'Move to reserves'}</button>
              <button class="btn ghost sm" id="pmCaptain">${isCaptain ? 'Remove as captain' : 'Make captain'}</button>
              <button class="btn danger sm" id="pmRelease">Release</button>` + footer;
  } else if (isMine && p.loan) {
    footer = `<button class="btn ghost sm" id="pmRecall">Recall from loan</button>` + footer;
  } else if (listing) {
    footer = `<button class="btn sm" id="pmBid">Make a bid</button>` + footer;
  } else if (t && t.id !== G.myTeam && !inYouth && typeof t.id === 'number') {
    footer = `<button class="btn sm" id="pmOffer">Make an offer</button>
              <button class="btn ghost sm" id="pmOfferLoan">Ask about a loan</button>` + footer;
  }
  if (!inYouth) footer = `<button class="btn ghost sm" id="pmCmp">Compare</button>` + footer;   openModal('Player profile', body, footer); $('#modal').classList.add('mmx');   const cmpB = $('#pmCmp'); if (cmpB) cmpB.onclick = () => comparePicker(p.id);
  const r = $('#pmNeg'); if (r) r.onclick = () => { closeModal(); negotiateModal(p.id); };
  const s = $('#pmSell'); if (s) s.onclick = () => { closeModal(); toggleTL(p.id); };   const shop = $('#pmShop'); if (shop) shop.onclick = () => { const res = shopAround(p.id); toast(res.msg); if (res.ok) { save(); closeModal(); render(); } };
  const lo = $('#pmLoanOut'); if (lo) lo.onclick = () => {
    closeModal(); toggleLL(p.id);
  };
  const cs = $('#pmClauseSet'); if (cs) cs.onclick = () => {
    openModal('Set release clause', `<p class="hint" style="margin:0 0 8px">Any club can trigger this clause to buy him instantly at this price.</p>
      <input type="text" id="clauseAmt" placeholder="e.g. 25 (millions)" value="${p.releaseClause || ''}" style="width:100%">`,
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="clauseGo">Set</button>`);
    $('#clauseGo').onclick = () => {
      const amt = parseFloat($('#clauseAmt').value) || 0;
      const res = setReleaseClause(G, p.id, amt); toast(res.msg); save(); closeModal(); render();
    };
  };
  const sm = $('#pmSquadMove'); if (sm) sm.onclick = () => {
    const res = p.reserve ? moveToFirstTeam(G, p.id) : moveToReserve(G, p.id);
    toast(res.msg); if (res.ok) { save(); closeModal(); render(); }
  };
  const cap = $('#pmCaptain'); if (cap) cap.onclick = () => {
    const res = isCaptain ? (function () { me().captainId = null; return { ok: true, msg: 'Captaincy removed.' }; })() : setCaptain(G, p.id);
    toast(res.msg); save(); closeModal(); render();
  };
  const rec = $('#pmRecall'); if (rec) rec.onclick = () => { const res = recallLoan(G, p.id); toast(res.msg); if (res.ok) { save(); closeModal(); render(); } };
  const cl = $('#pmClause'); if (cl) cl.onclick = () => {
    closeModal(); playerTermsModal(p.id, p.releaseClause, 3, true);
  };
  const off = $('#pmOffer'); if (off) off.onclick = () => { closeModal(); bidModal(p.id, p.value); };
  const offl = $('#pmOfferLoan'); if (offl) offl.onclick = () => { closeModal(); loanOfferModal(p.id, t); };
  const d = $('#pmRelease'); if (d) d.onclick = () => {
    openModal('Release ' + esc(p.name) + '?', `<p style="margin:0;color:var(--dim)">You pay up half of what is left on his deal and he becomes a free agent.</p>`,
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn danger sm" id="relYes">Release him</button>`);
    $('#relYes').onclick = () => { const res = releasePlayer(G, p.id); toast(res.msg); closeModal(); if (res.ok) { save(); render(); } };
  };
  const b = $('#pmBid'); if (b) b.onclick = () => { closeModal(); bidModal(p.id, listing.ask); };
  const w = $('#pmWatch'); if (w) w.onclick = () => {
    const on = toggleWatch(p.id); save();
    toast(on ? p.name + ' added to your shortlist.' : p.name + ' removed from your shortlist.', on ? 'good' : '');
    closeModal(); playerModal(p.id);
  };
}

/* ---------------- tactics / lineup ---------------- */
function matchdayLineupPitchHTML(t, xi, slots, coords) {
  return xi.map((p, i) => {
    const [x, y] = coords[i] || [50, 50];
    return `<div class="fpl mpEnter" style="left:${8 + x * 0.84}%;top:${8 + (100 - y) * 0.84}%;--d:${i * 55}ms;cursor:default">
      <div class="prow3"><span class="prate">${p.rating}</span><div class="pface" style="--pring:${t.c1}">${faceSVG(p, 28, t.c1)}</div><span class="ppos">${slots[i] || p.pos}</span></div>${t.captainId === p.id ? '<span class="cbadge">C</span>' : ''}
      <span class="fnm2">${esc(p.last || p.name)}</span></div>`;
  }).join('');
}
 function tacticsPitchSpots(t, xi, slots, coords) {   return xi.map((p, i) => {     const [x, y] = coords[i];     return `<button class="fpl ${selSpot === i ? 'sel' : ''}" data-slot="${i}" style="left:${8 + x * 0.84}%;top:${8 + (100 - y) * 0.84}%">       <div class="prow3"><span class="prate">${p.rating}${penTag(p, slots[i])}</span><div class="pface" style="--pring:${t.c1}">${faceSVG(p, 30, t.c1)}</div><span class="ppos">${slots[i]}</span></div>${t.captainId === p.id ? '<span class="cbadge">C</span>' : ''}       <span class="fnm2">${esc(p.last || p.name)}</span></button>`;   }).join(''); } function tacticsPitchSpotsOld(t, xi, slots, coords) {   const gk = { c1: '#7ddc1f', c2: '#1a1a1a' };   return xi.map((p, i) => {     const [x, y] = coords[i], bad = posPenalty(p.pos, slots[i]) > 3;     return `<button class="fpl ${selSpot === i ? 'sel' : ''}" data-slot="${i}" style="left:${8 + x * 0.84}%;top:${8 + (100 - y) * 0.84}%">       ${kitSVG(slots[i] === 'GK' ? gk : t, false, 40)}       <span class="fn"><b>${p.rating}</b><span>${esc(p.last || p.name)}${bad ? ' !' : ''}</span></span>       <small class="fpos">${slots[i]}</small></button>`;   }).join(''); } function viewTacticsBase() {   const v = $('#v-squad'), t = me();   ensureLineup(t);   const slots = FORMATIONS[t.formation], xi = lineupOf(t), bench = benchOf(t);   const coords = FORM_COORDS[t.formation];   const oop = xi.map((p, i) => Math.round(posPenalty(p, slots[i]))).filter(n => n > 0);   const cap = t.squad.find(p => p.id === t.captainId);   const injured = t.squad.filter(p => !isFit(p, t));   v.innerHTML = sqTabsHTML(t) +     sqTiles([['Formation', t.formation], ['XI rating', teamOverall(t)],       ['Out of position', oop.length ? `${oop.length} (−${oop.reduce((a, b) => a + b, 0)})` : 'None', oop.length ? '#ff6b6b' : '#3ddc84'],       ['Bench', bench.length], ['Captain', cap ? esc(cap.last || cap.name) : '—']]) +     `<div class="panel"><h3>Tactics<span class="sub">tap a player, then another player or a sub, to swap</span></h3>       <div class="chipbar">         <label class="hint" for="formSel">Formation</label>         <select id="formSel">${Object.keys(FORMATIONS).map(f => `<option ${t.formation === f ? 'selected' : ''}>${f}</option>`).join('')}</select>         <button class="chip" id="autoPick">Pick strongest XI</button>         <label class="hint" style="margin-left:auto"><input type="checkbox" id="liveChk" ${G.liveMode ? 'checked' : ''}> Watch matches live</label>       </div>       <div class="pad"><div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${tacticsPitchSpots(t, xi, slots, coords)}</div>         <p class="hint" style="text-align:center;margin:8px 0 0">A red number next to a rating is the penalty for playing out of position.</p></div>     </div>     <div class="panel"><h3>Substitutes<span class="sub">${bench.length} available · tap a player, then a sub</span></h3>       <div class="fsubs">${bench.slice().sort((a, b) => b.rating - a.rating).map(p => `<button class="fsub" data-sub="${p.id}">${faceSVG(p, 40, t.c1)}<b>${p.rating}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${esc(p.last || p.name)}</small></button>`).join('')}</div></div>     <div class="panel"><h3>Injured & suspended<span class="sub">${injured.length} unavailable</span></h3>${injured.length       ? injured.map(p => `<div class="prow" style="grid-template-columns:auto 1fr auto">${ratingTag(p.rating)}           <span class="who"><b>${esc(p.name)}</b><small>${p.pos}</small></span><span class="tag inj">${p.inj > 0 ? 'out ' + p.inj : 'banned ' + banLeft(p, t)}</span></div>`).join('')       : '<div class="empty">A clean bill of health.</div>'}</div>`;   $('#formSel').onchange = e => { t.formation = e.target.value; t.lineup = autoLineup(t); selSpot = null; save(); render(); };   $('#autoPick').onclick = () => { t.lineup = autoLineup(t); selSpot = null; save(); render(); };   $('#liveChk').onchange = e => { G.liveMode = e.target.checked; save(); renderActions(); };   v.querySelectorAll('[data-slot]').forEach(b => b.onclick = () => {     const i = +b.dataset.slot;     if (selSpot === null) { selSpot = i; viewTactics(); }     else if (selSpot === i) { selSpot = null; viewTactics(); }     else { const L = t.lineup; [L[selSpot], L[i]] = [L[i], L[selSpot]]; selSpot = null; save(); render(); }   });   v.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => {     if (selSpot === null) { playerModal(+b.dataset.sub); return; }     t.lineup[selSpot] = +b.dataset.sub; selSpot = null; save(); render();   });   bindSqTabs(v); } function viewTacticsOld() {
  const v = $('#v-tactics'), t = me();
  ensureLineup(t);
  const slots = FORMATIONS[t.formation], xi = lineupOf(t), bench = benchOf(t);
  const coords = FORM_COORDS[t.formation];
  const spots = xi.map((p, i) => {
    const [x, y] = coords[i];
    const px = x, py = 100 - y;
    const mismatch = posPenalty(p, slots[i]) > 3;
    return `<button class="spot ${selSpot === i ? 'sel' : ''}" data-slot="${i}" style="left:${px}%;top:${py}%">
      <span class="shirt" style="background:${t.c1};color:${isDark(t.c1) ? '#fff' : '#111'}">${slots[i]}</span>
      <span class="nm">${esc(p.last)}${mismatch ? ' !' : ''}</span></button>`;
  }).join('');
  v.innerHTML = `<div class="panel">
    <h3>Tactics<span class="sub">XI rated ${teamOverall(t)} · tap a player, then another player or a sub, to swap</span></h3>
    <div class="chipbar">
      <label class="hint" for="formSel">Formation</label>
      <select id="formSel">${Object.keys(FORMATIONS).map(f => `<option ${t.formation === f ? 'selected' : ''}>${f}</option>`).join('')}</select>
      <button class="chip" id="autoPick">Pick strongest XI</button>
      <label class="hint" style="margin-left:auto"><input type="checkbox" id="liveChk" ${G.liveMode ? 'checked' : ''}> Watch matches live</label>
    </div>
    <div class="pad"><div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${tacticsPitchSpots(t, xi, slots, coords)}</div>
      <p class="hint" style="text-align:center;margin:8px 0 0">A red number next to a rating is the penalty for playing out of position.</p></div>
  </div>
  <div class="panel"><h3>Substitutes<span class="sub">${bench.length} available · tap a player, then a sub</span></h3>     <div class="fsubs">${bench.slice().sort((a, b) => b.rating - a.rating).map(p => `<button class="fsub" data-sub="${p.id}">${faceSVG(p, 40, t.c1)}<b>${p.rating}</b><small>${p.pos} · ${esc(p.last || p.name)}</small></button>`).join('')}</div>
    ${bench.length ? bench.slice(0, 0).map(p =>
      `<button class="prow" data-sub="${p.id}">${faceSVG(p, 30, t.c1)}<span class="ratcol">${ratingTag(p.rating)}${growthHtml(p)}</span>
        <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · ${p.age} · form ${p.form > 0.6 ? 'good' : p.form < -0.6 ? 'poor' : 'steady'}</small></span>
        <span class="ratcol pot">${potTag(p)}${potGrowthHtml(p)}</span><span class="val">${money(p.value)}</span></button>`).join('')
      : '<div class="empty">Everyone fit is in the XI.</div>'}</div>
  <div class="panel"><h3>Injured</h3>${
    t.squad.filter(p => p.inj > 0).length
      ? t.squad.filter(p => p.inj > 0).map(p => `<div class="prow" style="grid-template-columns:auto 1fr auto">${ratingTag(p.rating)}
          <span class="who"><b>${esc(p.name)}</b><small>${p.pos}</small><span class="tag inj">${p.inj > 0 ? 'out ' + p.inj + ' · back ' + injBack(p) : 'banned ' + banLeft(p, t)}</span></div>`).join('')
      : '<div class="empty">A clean bill of health.</div>'}</div>`;
  $('#formSel').onchange = e => { t.formation = e.target.value; t.lineup = autoLineup(t); selSpot = null; save(); render(); };
  $('#autoPick').onclick = () => { t.lineup = autoLineup(t); selSpot = null; save(); render(); };
  $('#liveChk').onchange = e => { G.liveMode = e.target.checked; save(); renderActions(); };
  v.querySelectorAll('[data-slot]').forEach(b => b.onclick = () => {
    const i = +b.dataset.slot;
    if (selSpot === null) { selSpot = i; viewTactics(); }
    else if (selSpot === i) { selSpot = null; viewTactics(); }
    else { const L = t.lineup; [L[selSpot], L[i]] = [L[i], L[selSpot]]; selSpot = null; save(); render(); }
  });
  v.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => {
    if (selSpot === null) { playerModal(+b.dataset.sub); return; }
    t.lineup[selSpot] = +b.dataset.sub; selSpot = null; save(); render();
  });
}

/* ---------------- transfers ---------------- */
let txLimit = 40, txSig = ''; let txSection = 'search', txAge = 'ALL', txSort = 'rating', txHistFilter = 'all', txNat = 'ALL', txAgeX = 'ALL', txLg = 'ALL', txMinR = 0, txMinP = 0; const REGION_NAMES = { AFR: 'Africa', EUR: 'Europe', SAM: 'South America', NAM: 'North America', ASI: 'Asia & Oceania' }; function regionOf(c) {   if (NATIONS[c] && NATIONS[c].caf) return 'AFR';   if (LATIN_NATIONS.includes(c)) return 'SAM';   if (['US', 'CA', 'MX', 'CR', 'JM'].includes(c)) return 'NAM';   if (EURO_NATIONS.includes(c) || ['GB', 'TR'].includes(c)) return 'EUR';   return 'ASI'; } function natMatch(p, f) {   if (!f || f === 'ALL') return true;   if (f === 'FOREIGN') return p.nat !== 'ZA';   if (f.indexOf('R:') === 0) return regionOf(p.nat) === f.slice(2);   return p.nat === f; } function natSelectHTML(id, cur) {   const opt = (v, l) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${esc(l)}</option>`;   const grp = r => Object.keys(NATIONS).filter(c => c !== 'ZA' && regionOf(c) === r).sort((a, b) => natName(a).localeCompare(natName(b)));   return `<select id="${id}">${opt('ALL', 'Any nationality')}${opt('ZA', 'South Africa')}${opt('FOREIGN', 'All foreign players')}` +     Object.keys(REGION_NAMES).map(r => `<optgroup label="${REGION_NAMES[r]}">${opt('R:' + r, 'All of ' + REGION_NAMES[r])}${grp(r).map(c => opt(c, natName(c))).join('')}</optgroup>`).join('') + '</select>'; }
function txRow(p, club, opts) {
  opts = opts || {};
  const listing = G.market.find(m => m.pid === p.id);
  const watched = (G.watchlist || []).includes(p.id);
  const ask = opts.free ? null : (listing ? listing.ask : p.value);
  return `<tr>
    <td><button class="star ${watched ? 'on' : ''}" data-star="${p.id}" title="Keep an eye on him" aria-label="Keep an eye on him">${watched ? '★' : '☆'}</button></td>
    <td class="txp">${faceSVG(p, 26, club ? club.c1 : null)}<div><b>${esc(p.name)} ${flagSVG(p.nat)}</b>${listing ? `<div class="hint">listed at ${money(listing.ask)}</div>` : ''}${(opts.free || !club) ? ' <span class="tag">looking for a club</span>' : `${isLoanListed(p.id) ? ' <span class="tag" style="color:var(--teal);border-color:var(--teal)">loan listed</span>' : ''}${p.wantsOut ? ' <span class="tag out">wants out</span>' : ''}`}${G.scoutBoard && G.scoutBoard[p.id] ? ' <span class="tag xi">🎯 scouted</span>' : ''}</div></td>
<td style="white-space:nowrap">${posTag(p.pos)}${(p.alt || []).map(a => `<span class="alt">${a}</span>`).join('')}</td>
    <td class="num">${p.age}</td>
    <td class="num">${ratingTag(p.rating)}</td>
    <td class="num"><b class="potglow">${potTxt(p)}</b></td>
    <td>${club ? `${crestHTML(club, 13)} ${esc(club.s)}` : '<span class="hint">Free agent</span>'}</td>
    <td class="num">${opts.free ? '<span class="hint">free</span>' : money(ask)}</td>
    <td>${opts.free
      ? `<button class="btn sm" data-fa="${p.id}">Negotiate</button>`
      : `<button class="btn ghost sm" data-pid="${p.id}">View</button> <button class="btn sm" data-buy="${p.id}" data-ask="${ask}" ${me().budget < ask * 0.6 ? 'disabled' : ''}>Bid</button>`}</td>
  </tr>`;
}
function viewTransfers() {
  const v = $('#v-transfers'), t = me(); v.classList.add('mmx', 'sqv');
  const ageOk = p => (txAgeX === 'ALL' || p.age === +txAgeX) && (txAge === 'ALL' || (txAge === 'U21' ? p.age <= 21 : txAge === '22-28' ? (p.age >= 22 && p.age <= 28) : p.age >= 29));
  const posOk = p => (txFilter === 'ALL' || p.pos === txFilter || POS_GROUP[p.pos] === txFilter) && p.rating >= txMinR && p.pot >= txMinP;
  const searchOk = p => natMatch(p, txNat) && (!txSearch || p.name.toLowerCase().includes(txSearch.toLowerCase()) || natName(p.nat).toLowerCase().includes(txSearch.toLowerCase()));
  const sorter = (a, b) => {
    if (txSort === 'age') return a.age - b.age;
    if (txSort === 'potential') return b.pot - a.pot;
    if (txSort === 'value') return b.value - a.value;
    if (txSort === 'fit') return Math.abs(clubLevel(t) - a.rating) - Math.abs(clubLevel(t) - b.rating);
    return b.rating - a.rating;
  };
  const winOpen = inTransferWindow(G);
  const foreignN = t.squad.filter(p => p.nat !== 'ZA').length;
  G.pendingBids = dedupOffers(G.pendingBids || []).filter(b => t.squad.some(p => p.id === b.pid) && (b.round == null || G.round - b.round < OFFER_EXPIRE_ROUNDS));   const bids = G.pendingBids;   G.pendingLoanOffers = dedupOffers(G.pendingLoanOffers || []).filter(o => { const pl = t.squad.find(p => p.id === o.pid); return pl && !pl.loan && (o.round == null || G.round - o.round < OFFER_EXPIRE_ROUNDS); });   const loanOffers = G.pendingLoanOffers;

  let html = `<div class="rbox">
    <div><b>${money(t.budget)}</b><span>Transfer budget</span></div>
    <div><b style="color:${t.wageBill >= t.wageBudget ? 'var(--down)' : 'var(--ink)'}">${money(t.wageBudget - t.wageBill)}</b><span>Wage budget spare</span></div>
    <div><b style="color:${winOpen ? 'var(--up)' : 'var(--down)'}">${winOpen ? windowCloses(G) + (windowCloses(G) === 1 ? ' day' : ' days') : roundsToNextWindow(G) + (roundsToNextWindow(G) === 1 ? ' day' : ' days')}</b><span>${winOpen ? currentWindowName(G) + ' left' : 'Until window opens'}</span></div>
    <div><b>${t.squad.length} / 32</b><span>Squad size</span></div>
    <div><b style="${foreignN < 1 || foreignN > MAX_FOREIGN ? 'color:var(--down)' : ''}">${foreignN} / ${MAX_FOREIGN}</b><span>Foreign players</span></div>
  </div>
  ${!winOpen ? `<div class="panel"><div class="pad" style="display:flex;justify-content:flex-end"><button class="btn ghost sm" id="skipWindow">Skip to next window</button></div></div>` : ''}`;

  const sections = [['search', 'Player search'], ['fa', 'Free agents'], ['scout', 'Scouting board' + (Object.keys(G.scoutBoard || {}).length ? ' (' + Object.keys(G.scoutBoard).length + ')' : '')], ['bids', 'Offers' + ((bids.length + loanOffers.length) ? ' (' + (bids.length + loanOffers.length) + ')' : '')],
    ['listed', 'Listed players'], ['sell', 'Sell players'], ['watch', 'Shortlist' + ((G.watchlist || []).length ? ' (' + G.watchlist.length + ')' : '')],
    ['loans', 'Loans'], ['hist', 'Transfer history'], ['top', 'Leaderboards']];
  html += `<div class="txtabs">${sections.map(([k, l]) => `<button class="txtab ${txSection === k ? 'on' : ''}" data-txsec="${k}">${l.replace(/ \((\d+)\)$/, ' <i class="txn">$1</i>')}</button>`).join('')}</div>`;

  if (txSection === 'scout') {
    html += scoutBoardHTML();
  } else if (txSection === 'search' || txSection === 'fa') {
    /* the scouts' suggestions now live on the Scouting board only */
    html += `<div class="panel"><div class="chipbar">${['ALL', 'GK', 'DEF', 'MID', 'ATT'].map(p => `<button class="chip" data-tf="${p}" aria-pressed="${txFilter === p}">${p === 'ALL' ? 'Any position' : p}</button>`).join('')}
      ${['ALL', 'U21', '22-28', '29+'].map(a => `<button class="chip" data-txage="${a}" aria-pressed="${txAge === a}">${a === 'ALL' ? 'Any age' : a}</button>`).join('')}
      <select id="txSortSel">${[['rating', 'Highest rated'], ['potential', 'Highest potential'], ['value', 'Most valuable'], ['age', 'Youngest'], ['fit', 'Most likely to join you']]
        .map(([k, l]) => `<option value="${k}" ${txSort === k ? 'selected' : ''}>${l}</option>`).join('')}</select>
      <select id="txPosSel"><option value="ALL">Exact position</option>${[['Goalkeeper', ['GK']], ['Defenders', ['CB', 'RB', 'LB', 'RWB', 'LWB']], ['Midfielders', ['CDM', 'CM', 'CAM', 'RM', 'LM']], ['Attackers', ['RW', 'LW', 'CF', 'ST']]].map(([g, ps]) => `<optgroup label="${g}">${ps.map(p => `<option value="${p}" ${txFilter === p ? 'selected' : ''}>${p}</option>`).join('')}</optgroup>`).join('')}</select><select id="txMinRSel"><option value="0">Any rating</option>${[55, 60, 65, 70, 75, 80].map(r => `<option value="${r}" ${txMinR === r ? 'selected' : ''}>${r}+ rating</option>`).join('')}</select><select id="txMinPSel"><option value="0">Any potential</option>${[60, 65, 70, 75, 80, 85].map(r => `<option value="${r}" ${txMinP === r ? 'selected' : ''}>${r}+ potential</option>`).join('')}</select>${natSelectHTML('txNatSel', txNat)}<select id="txAgeSel"><option value="ALL">Any exact age</option>${Array.from({ length: 26 }, (_, i) => 15 + i).map(a => `<option value="${a}" ${String(txAgeX) === String(a) ? 'selected' : ''}>${a} years old</option>`).join('')}</select>${txSection === 'search' ? `<select id="txLgSel"><option value="ALL">Any league</option>${TIER_NAMES.map((n, i) => `<option value="${i}" ${String(txLg) === String(i) ? 'selected' : ''}>${n}</option>`).join('')}</select>` : ''}<input type="search" id="txs" placeholder="Search name or country" value="${esc(txSearch)}" style="margin-left:auto;min-width:160px"></div>`;

    if (txSection === 'search') {
      const all = [];
      const sig = [txSection, txAge, txSort, txNat, txAgeX, txLg, txMinR, txMinP, txFilter, txSearch].join('|'); if (sig !== txSig) { txSig = sig; txLimit = 40; }       G.teams.forEach(c => { if (c.id !== t.id && (txLg === 'ALL' || c.tier === +txLg)) c.squad.forEach(p => { if (!p.loan && posOk(p) && searchOk(p) && ageOk(p)) all.push({ p, club: c }); }); });
      all.sort((a, b) => sorter(a.p, b.p));
      html += `<h3 style="padding:10px 13px 0">Player search<span class="sub">${all.length} match, showing ${Math.min(txLimit, all.length)}</span></h3>
        ${all.length ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th></th><th>Player</th><th>Pos</th><th>Age</th><th>Rat</th><th>Pot</th><th>Club</th><th>Value</th><th></th></tr></thead><tbody>${all.slice(0, txLimit).map(x => txRow(x.p, x.club)).join('')}</tbody></table></div>${all.length > txLimit ? `<div style="padding:10px 13px"><button class="btn ghost sm" id="txMore">Show 40 more (${all.length - txLimit} left)</button></div>` : ''}`
        : '<div class="empty">Nobody matches those filters.</div>'}</div>`;
    } else {
      const fa = G.freeAgents.filter(p => posOk(p) && searchOk(p) && ageOk(p)).slice().sort(sorter);       const sig = ['fa', txAge, txSort, txNat, txAgeX, txMinR, txMinP, txFilter, txSearch].join('|'); if (sig !== txSig) { txSig = sig; txLimit = 40; }
      html += `<h3 style="padding:10px 13px 0">Free agents<span class="sub">no fee, just a contract</span></h3>
        ${fa.length ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th></th><th>Player</th><th>Pos</th><th>Age</th><th>Rat</th><th>Pot</th><th>Wage</th><th></th><th></th></tr></thead><tbody>${fa.slice(0, txLimit).map(p => txRow(p, null, { free: true })).join('')}</tbody></table></div>${fa.length > txLimit ? `<div style="padding:10px 13px"><button class="btn ghost sm" id="txMore">Show 40 more (${fa.length - txLimit} left)</button></div>` : ''}`
        : '<div class="empty">No free agents match that right now.</div>'}</div>`;
    }
  } else if (txSection === 'listed') { html += listedHTML(t); } else if (txSection === 'bids') {     html += offersHTML(t, bids) + loanOffersHTML(t, loanOffers);   } else if (txSection === 'bids_old') {
    html += `<div class="panel"><h3>Offers for your players<span class="sub">clubs bid for players who impress, or anyone you shop around</span></h3>` +
      (bids.length ? bids.map((b, i) =>
        `<div class="prow" style="grid-template-columns:auto 1fr auto auto">${ratingTag(b.rating)}
          <span class="who"><b>${esc(b.name)} ${flagSVG(b.nat)}</b><small>${b.pos} · bid from ${esc(G.teams[b.from].s)}</small></span>
          <span class="val">${money(b.fee)}</span>
          <span style="display:flex;gap:6px"><button class="btn sm" data-accept="${i}">Accept</button>
          <button class="btn ghost sm" data-reject="${i}">Reject</button></span></div>`).join('')
        : '<div class="empty">No offers right now. Clubs bid for players who impress, and for anyone you shop around during a transfer window.</div>') + `</div>`;
  } else if (txSection === 'sell') {
    const squad = t.squad.filter(p => !p.loan).slice().sort((a, b) => b.value - a.value);
    html += `<div class="panel"><h3>Your players<span class="sub">shop around to draw offers, or negotiate a sale yourself</span></h3>` +
      (squad.length ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th></th><th>Player</th><th>Pos</th><th>Age</th><th>Rat</th><th>Value</th><th>Contract</th><th></th></tr></thead><tbody>${
        squad.map(p => `<tr><td></td><td class="txp"><b>${esc(p.name)}</b> ${flagSVG(p.nat)}</td><td>${posTag(p.pos)}</td><td class="num">${p.age}</td>
          <td class="num">${ratingTag(p.rating)}</td><td class="num">${money(p.value)}</td><td class="num">${p.contract}y</td>
          <td style="display:flex;gap:6px;justify-content:flex-end"><button class="btn ghost sm" data-shop="${p.id}">Shop around</button>
          <button class="btn sm" data-sell="${p.id}">${p.tl ? 'Listed ✓' : 'Transfer list'}</button><button class="btn danger sm" data-rel="${p.id}">Release</button></td></tr>`).join('')
      }</tbody></table></div>` : '<div class="empty">No players to sell.</div>') + `</div>`;
  } else if (txSection === 'watch') {
    const list = (G.watchlist || []).map(pid => {
      const f = findPlayer(G, pid); if (f) return { p: f.p, club: f.t };
      const fa = G.freeAgents.find(x => x.id === pid); return fa ? { p: fa, club: null } : null;
    }).filter(Boolean);
    html += `<div class="panel"><h3>Shortlist<span class="sub">${list.length} player${list.length === 1 ? '' : 's'} you're keeping an eye on</span></h3>` +
      (list.length ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th></th><th>Player</th><th>Pos</th><th>Age</th><th>Rat</th><th>Pot</th><th>Club</th><th>Value</th><th></th></tr></thead><tbody>${
        list.map(x => txRow(x.p, x.club, { free: !x.club })).join('')
      }</tbody></table></div>` : '<div class="empty">Star a player from search or free agents to keep an eye on him.</div>') + `</div>`;
  } else if (txSection === 'loans') {
    const loanedIn = G.teams.flatMap(c => c.squad.filter(p => p.loan && p.loan.from === t.id));
    html += `<div class="panel"><h3>Loans<span class="sub">send players out or bring in loan cover</span></h3>` +
      (loanedIn.length ? `<p class="hint" style="padding:8px 13px 0">Out on loan</p>` + loanedIn.map(p => {
        const at = findPlayer(G, p.id).t;
        return `<div class="prow" style="grid-template-columns:auto 1fr auto"><span></span>
          <span class="who"><b>${esc(p.name)}</b><small>at ${esc(at.s)} · ${p.loan.seasons} season${p.loan.seasons === 1 ? '' : 's'} left</small></span>
          <button class="btn ghost sm" data-recall="${p.id}">Recall</button></div>`;
      }).join('') : '') +
      `<p class="hint" style="padding:8px 13px 0">Send a squad player on loan</p>` +
      t.squad.filter(p => !p.loan).slice().sort((a, b) => b.rating - a.rating).slice(0, 12).map(p =>
        `<div class="prow" style="grid-template-columns:auto 1fr auto">${ratingTag(p.rating)}
          <span class="who"><b>${esc(p.name)}</b><small>${p.pos} · ${p.age}</small></span>
          <button class="btn ghost sm" data-loanout="${p.id}">${p.ll ? 'Loan listed ✓' : 'Loan list'}</button></div>`).join('') + `</div>`;
  } else if (txSection === 'hist') {
    const L = G.transferLog.filter(x => txHistFilter === 'all' || x.from === t.id || x.to === t.id).slice(0, 70);
    html += `<div class="panel"><div class="chipbar">${[['all', 'All clubs'], ['me', 'My club']].map(([k, l]) => `<button class="chip" data-txhist="${k}" aria-pressed="${txHistFilter === k}">${l}</button>`).join('')}</div>
      <h3 style="padding:10px 13px 0">Transfer wire<span class="sub">every deal across all five divisions</span></h3>` +
      (L.length ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th>Season</th><th>Player</th><th>Pos</th><th>From</th><th>To</th><th>Fee</th></tr></thead><tbody>${
        L.map(x => `<tr class="${x.from === t.id || x.to === t.id ? 'me' : ''}"><td>${seasonLabel(x.season)} MD${x.round}</td><td><b>${esc(x.name)}</b> ${flagSVG(x.nat)}</td><td>${posTag(x.pos)}</td><td>${esc(G.teams[x.from].s)}</td><td>${esc(G.teams[x.to].s)}</td><td class="num">${money(x.fee)}</td></tr>`).join('')
      }</tbody></table></div>` : '<div class="empty">No business done yet.</div>') + `</div>`;
  } else if (txSection === 'top') {
    const everyone = [];
    G.teams.forEach(c => c.squad.forEach(p => everyone.push({ p, club: c })));
    const topRated = everyone.slice().sort((a, b) => b.p.rating - a.p.rating).slice(0, 15);
    const topPot = everyone.slice().sort((a, b) => b.p.pot - a.p.pot).slice(0, 15);
    const row = x => `<div class="prow" style="grid-template-columns:auto auto 1fr auto">
      ${faceSVG(x.p, 30, x.club.c1)}${ratingTag(x.p.rating)}
      <span class="who"><b>${esc(x.p.name)} ${flagSVG(x.p.nat)}</b><small>${x.p.pos} · ${x.p.age} · ${crestHTML(x.club, 13)} ${esc(x.club.s)}</small></span>
      <span class="hint">pot <b class="potglow">${potTxt(x.p)}</b></span></div>`;
    html += `<div class="cols">
      <div class="panel"><h3>Highest rated in the game</h3>${topRated.map(row).join('')}</div>
      <div class="panel"><h3>Highest potential in the game</h3>${topPot.map(row).join('')}</div>
    </div>`;
  }

  v.innerHTML = html;
  v.querySelectorAll('[data-txsec]').forEach(b => b.onclick = () => { txSection = b.dataset.txsec; viewTransfers(); });
  const skipBtn = $('#skipWindow'); if (skipBtn) skipBtn.onclick = () => simRounds(Math.max(1, Math.ceil(roundsToNextWindow(G) / DAYS_PER_ROUND)));
  v.querySelectorAll('[data-txage]').forEach(b => b.onclick = () => { txAge = b.dataset.txage; viewTransfers(); });
  const sortSel = v.querySelector('#txSortSel'); if (sortSel) sortSel.onchange = e => { txSort = e.target.value; viewTransfers(); };   const posSel = v.querySelector('#txPosSel'); if (posSel) posSel.onchange = e => { txFilter = e.target.value; viewTransfers(); };   const minRSel = v.querySelector('#txMinRSel'); if (minRSel) minRSel.onchange = e => { txMinR = +e.target.value; viewTransfers(); };   const minPSel = v.querySelector('#txMinPSel'); if (minPSel) minPSel.onchange = e => { txMinP = +e.target.value; viewTransfers(); };
  v.querySelectorAll('[data-tf]').forEach(b => b.onclick = () => { txFilter = b.dataset.tf; viewTransfers(); });   const natSel = v.querySelector('#txNatSel'); if (natSel) natSel.onchange = e => { txNat = e.target.value; viewTransfers(); };   const ageSel = v.querySelector('#txAgeSel'); if (ageSel) ageSel.onchange = e => { txAgeX = e.target.value; viewTransfers(); };   const lgSel = v.querySelector('#txLgSel'); if (lgSel) lgSel.onchange = e => { txLg = e.target.value; viewTransfers(); };
  v.querySelectorAll('[data-txhist]').forEach(b => b.onclick = () => { txHistFilter = b.dataset.txhist; viewTransfers(); });
  const tm = v.querySelector('#txMore'); if (tm) tm.onclick = () => { txLimit += 40; viewTransfers(); };   const si = v.querySelector('#txs');
  if (si) si.oninput = () => { const pos = si.selectionStart; txSearch = si.value; viewTransfers(); const n = $('#txs'); n.focus(); n.setSelectionRange(pos, pos); };
  v.querySelectorAll('[data-star]').forEach(b => b.onclick = () => {
    const pid = +b.dataset.star; G.watchlist = G.watchlist || [];
    const i = G.watchlist.indexOf(pid);
    if (i >= 0) G.watchlist.splice(i, 1); else G.watchlist.push(pid);
    save(); viewTransfers();
  });
  v.querySelectorAll('[data-buy]').forEach(b => b.onclick = e => { e.stopPropagation(); bidModal(+b.dataset.buy, +b.dataset.ask); });
  v.querySelectorAll('[data-fa]').forEach(b => b.onclick = () => faTermsModal(+b.dataset.fa));   v.querySelectorAll('[data-clause]').forEach(b => b.onclick = () => { const f = findPlayer(G, +b.dataset.clause); if (f && f.p.releaseClause) playerTermsModal(f.p.id, f.p.releaseClause, 3, true); });
  v.querySelectorAll('[data-shop]').forEach(b => b.onclick = () => { const r = shopAround(+b.dataset.shop); toast(r.msg); if (r.ok) { save(); render(); } });
  v.querySelectorAll('[data-sell]').forEach(b => b.onclick = () => toggleTL(+b.dataset.sell));
  v.querySelectorAll('[data-rel]').forEach(b => b.onclick = () => txReleaseAsk(+b.dataset.rel));
  v.querySelectorAll('[data-accept]').forEach(b => b.onclick = () => {
    const i = +b.dataset.accept, bid = G.pendingBids[i];
    const r = sellPlayer(G, bid.pid, bid.fee, bid.from);
    toast(r.msg); if (r.ok) { G.pendingBids.splice(i, 1); save(); render(); }
  });
  v.querySelectorAll('[data-reject]').forEach(b => b.onclick = () => { G.pendingBids.splice(+b.dataset.reject, 1); save(); render(); });   bindOfferButtons(v);   bindLoanOfferButtons(v);
  v.querySelectorAll('[data-recall]').forEach(b => b.onclick = () => { const r = recallLoan(G, +b.dataset.recall); toast(r.msg); if (r.ok) { save(); render(); } });
  v.querySelectorAll('[data-loanout]').forEach(b => b.onclick = () => { toggleLL(+b.dataset.loanout); });
  bindPlayerRows(v);
}
function txReleaseAsk(pid) {
  const p = me().squad.find(x => x.id === pid); if (!p) return;
  openModal('Release ' + esc(p.name) + '?', `<p style="margin:0;color:var(--dim)">You pay up half of what is left on his deal and he becomes a free agent.</p>`,
    `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn danger sm" id="txRelYes">Release him</button>`);
  $('#txRelYes').onclick = () => { const res = releasePlayer(G, pid); toast(res.msg); closeModal(); if (res.ok) { save(); render(); } };
}

function askBoardModal() {   const t = me();   const max = boardMaxGrant(G);   const board = G.board != null ? G.board : 62;   const cap = Math.max(0.2, Math.round(max * 2.4 * 100) / 100);   const already = G.lastBoardAsk === G.season;   openModal('Ask the board for funds',     `<p class="hint" style="margin:0 0 8px">${already ? "You've already asked the board this season — try again next season." : 'The board judge requests against how the season is going and their confidence in you. Ask for too much and they may offer less instead.'}</p>      <label class="hint">Amount requested</label>      <input class="range" type="range" id="askAmt" min="0.1" max="${cap.toFixed(2)}" step="0.05" value="${Math.max(0.1, Math.round(max * 0.6 * 100) / 100).toFixed(2)}" ${already ? 'disabled' : ''}>      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Requested</span>        <span id="askAmtV" style="font-family:var(--head);font-size:20px;color:var(--ink)"></span></div>      <div class="bar" style="margin-top:8px"><i id="askBar"></i></div>      <p id="askOdds" class="hint" style="margin:6px 0 0"></p>`,     `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="askGo" ${already ? 'disabled' : ''}>Make the case</button>`);   if (already) return;   const ar = $('#askAmt');   const upd = () => {     const amt = +ar.value;     const tooMuch = amt > max * 1.15;     const chance = tooMuch ? 0 : clamp(0.35 + (board - 50) / 90 - (amt / max) * 0.25, 0.08, 0.95);     $('#askAmtV').textContent = money(amt);     $('#askBar').style.width = (tooMuch ? 100 : chance * 100).toFixed(0) + '%';     $('#askBar').style.background = tooMuch ? 'var(--gold)' : chance > 0.55 ? 'var(--up)' : chance > 0.25 ? 'var(--gold)' : 'var(--down)';     $('#askOdds').textContent = tooMuch ? "Well beyond what they'll sanction outright — expect a smaller counter-offer."       : chance > 0.7 ? 'A reasonable ask — they will likely agree.' : chance > 0.35 ? 'Could go either way.' : 'A tough sell given their confidence in you.';   };   ar.oninput = upd; upd();   $('#askGo').onclick = () => {     const before = t.budget;     const res = askBoardForFunds(G, +ar.value);     closeModal();     if (res.ok) { showMoneyEffect('Board backing', before, t.budget, 'var(--up)', () => { toast(res.msg); save(); render(); }); } else { toastWarn(res.msg); }   }; } function negotiateModal(pid) {
  const t = me();
  const p = t.squad.find(x => x.id === pid); if (!p) return;
  const minW = Math.max(0.0002, p.wage * 0.7), maxW = p.wage * (p.wantsOut ? 2.2 : 1.8);
  openModal(`Negotiate with ${esc(p.name)}`,
    `<p class="hint" style="margin:0 0 8px">Currently on ${money(p.wage)} a season, ${p.contract} year${p.contract === 1 ? '' : 's'} left.
     ${p.wantsOut ? "He wants to leave — a big enough raise might change his mind, but money alone won't keep the very biggest names." : ''}</p>
     <label class="hint">New wage</label>
     <input class="range" type="range" id="negW" min="${minW.toFixed(5)}" max="${maxW.toFixed(5)}" step="0.0001" value="${(p.wage * 1.15).toFixed(5)}">
     <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Wage a season</span>
       <span id="negWV" style="font-family:var(--head);font-size:20px;color:var(--ink)"></span></div>
     <label class="hint" style="display:block;margin-top:10px">Contract length</label>
     <input class="range" type="range" id="negY" min="1" max="5" step="1" value="3">
     <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Years</span>
       <span id="negYV" style="font-family:var(--head);font-size:20px;color:var(--ink)"></span></div>
     <div class="bar" style="margin-top:8px"><i id="negBar"></i></div>
     <p id="negOdds" class="hint" style="margin:6px 0 0"></p>`,
    `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="negGo">Offer terms</button>`);
  const wr = $('#negW'), yr = $('#negY');
  const upd = () => {
    const w = +wr.value, y = +yr.value;
    const gap = p.rating - clubLevel(t);
    const ratio = w / (p.wage || 0.01);
    let chance = p.wantsOut
      ? clamp(0.1 + (ratio - 1) * 0.85 - Math.max(0, gap) * 0.018, 0.04, 0.9)
      : clamp(0.55 + (ratio - 1) * 0.6, 0.25, 0.97);
    if (y < 2 && p.wantsOut) chance *= 0.7;
    if (p.wantsOut && gap > 24) chance = 0.02;
    const wageAfter = Math.round((t.wageBill - p.wage + w) * 100) / 100;
    const overBudget = wageAfter > t.wageBudget;
    $('#negWV').textContent = money(w);
    $('#negYV').textContent = y + (y === 1 ? ' year' : ' years');
    $('#negBar').style.width = (chance * 100).toFixed(0) + '%';
    $('#negBar').style.background = overBudget ? 'var(--down)' : chance > 0.6 ? 'var(--up)' : chance > 0.3 ? 'var(--gold)' : 'var(--down)';
    $('#negOdds').textContent = overBudget ? `Over the wage budget by ${money(wageAfter - t.wageBudget)} — move funds from the transfer budget in Club & Manager, or offer less.`
      : gap > 24 && p.wantsOut ? "He has his heart set on a bigger club — money won't fix this."
      : chance > 0.75 ? "He'll likely sign this happily." : chance > 0.4 ? 'Could go either way.' : 'A tough sell at these terms.';
    $('#negOdds').style.color = overBudget ? 'var(--down)' : '';
    $('#negGo').disabled = overBudget;
  };
  wr.oninput = upd; yr.oninput = upd; try { upd(); } catch (e) { console.error(e); }
$('#negGo').onclick = () => {
    const before = t.budget;
    const res = negotiateContract(G, pid, +wr.value, +yr.value);     if (res.ok) sgQueue({ p, team: t, wage: +wr.value, years: +yr.value, renewal: true });
    closeModal();
    if (res.ok) { showMoneyEffect(`${p.name} signs on`, before, t.budget, 'var(--down)', () => { toast(res.msg); save(); render(); }); }
    else { toastWarn(res.msg); }
  };
}

function loanOfferModal(pid, owner) {
  const p = owner.squad.find(x => x.id === pid); if (!p) return;
  if (!inTransferWindow(G)) { toastWarn(`The transfer window is shut. It reopens in ${roundsToNextWindow(G)} day${roundsToNextWindow(G) === 1 ? '' : 's'}.`); return; }
  const experienced = p.age >= 26 || p.apps >= 15;
  const chance = clamp((experienced ? 0.22 : 0.55) + (isLoanListed(pid) ? 0.3 : -0.1) - Math.max(0, p.rating - clubLevel(owner)) * 0.01, 0.04, 0.9);
  openModal(`Ask ${esc(owner.s)} about a loan for ${esc(p.name)}`,
    `<p class="hint" style="margin:0 0 8px">${experienced ? 'He is an experienced regular — clubs are reluctant to loan these out.' : 'A fringe or younger player — a loan spell could suit everyone.'}</p>
     <div class="bar"><i style="width:${(chance * 100).toFixed(0)}%;background:${chance > 0.4 ? 'var(--up)' : 'var(--gold)'}"></i></div>`,
    `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="loanReqGo">Ask</button>`);
  $('#loanReqGo').onclick = () => {
    /* no 15-player floor on AI clubs: they restock after a loan (see aiRestock) */     if (Math.random() > chance) { closeModal(); toastWarn(`${owner.s} turn down the loan request.`); return; }
    const me_ = me();
    owner.squad = owner.squad.filter(x => x.id !== pid); aiRestock(G, owner);
    p.loan = { from: owner.id, seasons: 1, wageShare: 0.5 };
    me_.squad.push(p);
    p.clubs.push({ id: me_.id, from: G.season, loan: true });
    me_.wageBill = wageOf(me_); owner.wageBill = wageOf(owner);
    ensureLineup(me_); ensureLineup(owner);
    news(G, 'transfer', `${p.name} joins ${me_.s} on loan from ${owner.s}.`);
    toast(`${p.name} joins on loan.`); closeModal(); save(); render();
  };
}

function showMoneyEffect(label, from, to, tint, onDone) {   uiSound(to >= from ? 'moneyIn' : 'moneyOut');
  openModal(label, `<div style="text-align:center;padding:10px 0">
      <div style="font-family:var(--head);font-size:15px;color:var(--faint)">Transfer budget</div>
      <div style="font-family:var(--head);font-size:36px" id="moneyNum">${money(from)}</div>
    </div>`, '');
  $('#modal').classList.add(to >= from ? 'fx-in' : 'fx-out'); let steps = 18, i = 0;
  const timer = setInterval(() => {
    i++;
    const v = from + (to - from) * (i / steps);
    const numEl = $('#moneyNum'); if (numEl) { numEl.textContent = money(v); const up = to >= from; numEl.style.color = up ? '#3ddc84' : '#ff5a52'; numEl.style.textShadow = up ? '0 0 14px rgba(61,220,132,.9),0 0 34px rgba(61,220,132,.5)' : '0 0 14px rgba(255,90,82,.9),0 0 34px rgba(255,90,82,.5)'; }
    if (i >= steps) {
      clearInterval(timer);
      setTimeout(() => { closeModal(); if (onDone) onDone(); }, 420);
    }
  }, 45);
}
/* ---- rival clubs: another club can step in once the seller has agreed to your bid ---- */
function rivalBidFlow(p, seller, ask, v, swapId, go) {
  const rivals = genuineBuyers(p, seller.id).filter(x => x.t.id !== G.myTeam && x.t.id !== seller.id && x.t.budget >= ask * 0.9);
  if (!rivals.length || rnd() > Math.min(0.5, 0.1 + 0.12 * rivals.length) * (v > ask * 1.2 ? 0.3 : 1)) return false;
  const rival = wpick(rivals, x => x.s).t, rMax = Math.min(rival.budget, ask * (1.2 + rnd() * 0.35));
  if (rMax <= v) return false;
  const r2 = x => Math.round(x * 100) / 100;
  const round = (mine, theirs, n) => {
    const up = r2(theirs * 1.05), afford = me().budget >= up;
    openModal('A rival club has stepped in', `<div style="display:flex;gap:12px;align-items:center;margin-bottom:10px">${crestHTML(rival, 40)}<div><b>${esc(rival.n)}</b><div class="hint">${esc(TIER_SHORT[rival.tier])}</div></div></div>
      <p style="margin:0 0 8px"><b>${esc(rival.s)}</b> have tabled <b style="color:#f2b928">${money(theirs)}</b> for ${esc(p.name)}. ${esc(seller.s)} will sell to the best offer.</p>
      <p class="hint" style="margin:0">Your offer: ${money(mine)}${afford ? '' : ' · you cannot afford to raise it'}</p>`,
      `<button class="btn ghost sm" id="rvOut">Walk away</button><button class="btn sm" id="rvUp" ${afford ? '' : 'disabled'}>Raise to ${money(up)}</button>`);
    $('#rvOut').onclick = () => { closeModal(); toastWarn(`You pull out. ${rival.s} are left to sign ${p.name}.`); rivalSign(p, seller, rival, theirs); };
    $('#rvUp').onclick = () => {
      closeModal();
      if (up > rMax || n >= 3) { toast(`${rival.s} drop out of the bidding.`); go(up); return; }
      round(up, r2(Math.min(rMax, up * (1.03 + rnd() * 0.05))), n + 1);
    };
  };
  round(v, r2(Math.min(rMax, Math.max(v * 1.04, ask * 0.98))), 1);
  return true;
}
function rivalSign(p, seller, rival, fee) {
  seller.squad = seller.squad.filter(x => x.id !== p.id); rival.squad.push(p);
  p.clubs.push({ id: rival.id, from: G.season }); p.contract = rint(2, 4); p.joinedSeason = G.season; p.wantsOut = false; p.releaseClause = null; p.tl = false; p.ll = false;
  seller.budget += fee; seller.fin.sales += fee; rival.budget = Math.max(0, rival.budget - fee); rival.fin.buys += fee;
  seller.wageBill = wageOf(seller); rival.wageBill = wageOf(rival); ensureLineup(seller); ensureLineup(rival);
  G.market = G.market.filter(m => m.pid !== p.id);
  logTransfer(G, p, seller.id, rival.id, fee);
  news(G, 'transfer', `${p.name} joins ${rival.s} from ${seller.s} for ${money(fee)} after a bidding war with ${me().s}.`, { pid: p.id, fromId: seller.id, toId: rival.id });
  save(); render();
}
function bidModal(pid, ask) {
  const f = findPlayer(G, pid); if (!f) { toast('He has moved on.'); return; }
  const p = f.p, seller = f.t, maxOffer = Math.max(ask * 0.56, Math.min(me().budget, ask * 1.6));
  const swapOptions = me().squad.filter(x => x.id !== pid).sort((a, b) => a.value - b.value);
  openModal(`Bid for ${esc(p.name)}`,
    `<div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">${faceSVG(p, 52)}
      <div><b>${esc(p.name)} ${flagSVG(p.nat)}</b><br><span class="hint">${p.pos} · ${p.age} · ${crestHTML(f.t, 15)} ${esc(f.t.n)} · rated ${p.rating}, potential ${potTxt(p)}</span></div></div>
     <p class="hint" style="margin:0 0 8px">${esc(f.t.s)} want <b style="color:var(--ink)">${money(ask)}</b>. His wages would be ${money(p.wage)} a season.</p>
     ${swapOptions.length ? `<label class="hint" for="bidSwap">Sweeten the deal with a player (optional)</label>
     <select id="bidSwap" style="width:100%;margin:4px 0 10px;background:var(--panel2);border:1px solid var(--line);border-radius:6px;color:inherit;padding:8px">
       <option value="">None — cash only</option>
       ${swapOptions.map(x => `<option value="${x.id}">${esc(x.name)} (${x.pos}, ${x.rating}) · valued ${money(x.value)}</option>`).join('')}
     </select>` : ''}
     <label class="hint" for="bidSO">Sell-on clause (optional): they get a share of your next sale</label>      <select id="bidSO" style="width:100%;margin:4px 0 10px;background:var(--panel2);border:1px solid var(--line);border-radius:6px;color:inherit;padding:8px"><option value="0">None</option><option value="10">10% of his next sale</option><option value="15">15% of his next sale</option><option value="20">20% of his next sale</option></select>      <input class="range" type="range" id="bidR" min="${(ask * 0.2).toFixed(2)}" max="${maxOffer.toFixed(2)}" step="0.05" value="${Math.min(ask, maxOffer).toFixed(2)}">
     <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Cash offered</span>
       <span id="bidV" style="font-family:var(--head);font-size:22px;color:var(--ink)"></span></div>
     <p id="bidSwapNote" class="hint" style="margin:6px 0 0"></p>
     <div class="bar" style="margin-top:8px"><i id="bidBar"></i></div>
     <p id="bidOdds" class="hint" style="margin:6px 0 0"></p>`,
    `<button class="btn ghost sm" onclick="closeModal()">Walk away</button><button class="btn sm" id="bidGo">Make the offer</button>`);
  const r = $('#bidR'), sw = $('#bidSwap'), so = $('#bidSO'), soVal = () => so ? (+so.value / 100) * Math.max(p.value, ask) * (p.age <= 23 ? 1.6 : 1.2) : 0;
  const swapPick = () => sw ? swapOptions.find(x => x.id === +sw.value) : null;
  const chanceOf = v => { const sp = swapPick(), eff = v + (sp ? sp.value * sellerSwapFactor(seller, sp) : 0) + soVal(); return Math.max(0.03, Math.min(0.97, (eff / ask - 0.72) / 0.45)); };
  const upd = () => {
    const c = chanceOf(+r.value), sp = swapPick();
    $('#bidV').textContent = money(+r.value);
    $('#bidBar').style.width = (c * 100).toFixed(0) + '%';
    $('#bidBar').style.background = c > 0.66 ? 'var(--up)' : c > 0.33 ? 'var(--gold)' : 'var(--down)';
    $('#bidOdds').textContent = c > 0.8 ? 'They would bite your hand off.' : c > 0.5 ? 'Likely to be accepted.' : c > 0.25 ? 'Could go either way.' : 'Close to an insult.';
    if ($('#bidSwapNote')) $('#bidSwapNote').textContent = sp ? `${esc(f.t.s)} would count ${esc(sp.name)} as worth about ${money(sp.value * sellerSwapFactor(seller, sp))} toward the deal.` : '';
  };
  r.oninput = upd; if (sw) sw.onchange = upd; if (so) so.onchange = upd; upd();
  $('#bidGo').onclick = () => {
    const v = +r.value, sp = swapPick(), swapId = sp ? sp.id : null;
    if (Math.random() > chanceOf(v)) { closeModal(); toastWarn(`${f.t.s} turn down your offer for ${p.name}.`); return; }
    closeModal();
        G.pendingSellOn = so && +so.value > 0 ? { pid, club: seller.id, pct: +so.value } : null;     const go = vv => { toast(`${f.t.s} agree a deal for ${p.name}${swapId != null ? ', including a player swap' : ''}. Now convince him personally.`); playerTermsModal(pid, Math.round(vv * 100) / 100, undefined, false, swapId); };
    if (!rivalBidFlow(p, seller, ask, v, swapId, go)) go(v);
  };
}

function faTermsModal(pid, tries) {   tries = tries == null ? 3 : tries;   const t = me(), p = G.freeAgents.find(x => x.id === pid);   if (!p) { toast('He signed elsewhere.'); return; }   if (!inTransferWindow(G)) { toastWarn(`The transfer window is shut. It reopens in ${roundsToNextWindow(G)} day${roundsToNextWindow(G) === 1 ? '' : 's'}.`); return; }   if (p.coolUntil && p.coolUntil > G.round) { toastWarn(`${p.name} won't talk to you again for a few matchdays.`); return; }   if (p.nat !== 'ZA' && t.squad.filter(x => x.nat !== 'ZA').length >= MAX_FOREIGN) { toastWarn(`You already have ${MAX_FOREIGN} foreign players. Sell or release one before signing another.`); return; }   p.wage = faAskWage(p); const ref = Math.max(0.0002, p.wage), gap = p.rating - clubLevel(t);   if (gap > 8 && p.age < 33) { toastWarn(`${p.name} feels ${t.s} is a step down for him and won't even negotiate.`); return; }   const minW = ref * 0.6, maxW = ref * 2.2, maxB = Math.max(0.002, ref);   openModal(`Negotiate with ${esc(p.name)}`,     `<div class="mprof" style="margin-bottom:10px"><div class="mface">${faceSVG(p, 60, t.c1)}</div>       <div><div class="mname">${esc(p.name)} ${flagSVG(p.nat)}</div>         <div class="mtags">${[p.pos].concat(p.alt || []).map(x => posTag(x)).join('')}${ratingTag(p.rating)}<span class="mpot">POT <b class="potglow">${potTxt(p)}</b></span></div>         <div class="mclub"><em>Free agent</em>${p.age} years old</div></div>       <div class="mstats"><div><small>Asking wage</small><b>${money(p.wage)}</b></div><div><small>Value</small><b>${money(p.value)}</b></div>         <div><small>Offers left</small><b>${tries}</b></div></div></div>      ${firstTeamFull(t) ? '<p class="hint" style="margin:0 0 8px">Your first team is full, so he would join the reserves.</p>' : ''}      <label class="hint">Wage a season</label>      <input class="range" type="range" id="fW" min="${minW.toFixed(5)}" max="${maxW.toFixed(5)}" step="0.0001" value="${Math.min(maxW, ref * 1.05).toFixed(5)}">      <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>Wage</span><span id="fWV" style="font-family:var(--head);font-size:20px;color:#fff"></span></div>      <label class="hint" style="display:block;margin-top:10px">Contract length</label>      <input class="range" type="range" id="fY" min="1" max="5" step="1" value="3">      <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>Years</span><span id="fYV" style="font-family:var(--head);font-size:20px;color:#fff"></span></div>      <label class="hint" style="display:block;margin-top:10px">Signing-on fee <span style="color:#8f98a2">(paid from your transfer budget)</span></label>      <input class="range" type="range" id="fB" min="0" max="${maxB.toFixed(5)}" step="${(maxB / 100).toFixed(5)}" value="0">      <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>Fee</span><span id="fBV" style="font-family:var(--head);font-size:20px;color:#fff"></span></div>      <div class="bar" style="margin-top:8px"><i id="fBar"></i></div>      <p id="fOdds" class="hint" style="margin:6px 0 0"></p>`,     `<button class="btn ghost sm" onclick="closeModal()">Walk away</button><button class="btn sm" id="fGo">Offer terms</button>`);   $('#modal').classList.add('mmx');   const wr = $('#fW'), yr = $('#fY'), br = $('#fB');   let chance = 0.5;   const upd = () => {     const w = +wr.value, y = +yr.value, bn = +br.value;     chance = 0.55 + (w / ref - 1) * 0.7 + (bn / ref) * 0.25 - Math.max(0, gap) * 0.012;     if (p.age < 24 && y >= 4) chance += 0.05;     if (p.age > 30 && y >= 4) chance -= 0.05;     if (p.age > 31 && y === 1) chance += 0.03;     chance = clamp(chance, 0.03, 0.95);     const over = t.wageBill + w > t.wageBudget, broke = bn > t.budget;     $('#fWV').textContent = money(w);     $('#fYV').textContent = y + (y === 1 ? ' year' : ' years');     $('#fBV').textContent = bn > 0 ? money(bn) : 'None';     $('#fBar').style.width = (chance * 100).toFixed(0) + '%';     $('#fBar').style.background = over || broke ? '#ff6b6b' : chance > 0.6 ? '#3ddc84' : chance > 0.3 ? '#f2b928' : '#ff6b6b';     $('#fOdds').textContent = over ? `That wage is over your wage budget by ${money(t.wageBill + w - t.wageBudget)}.`       : broke ? `You can't afford that signing-on fee.`       : chance > 0.75 ? "He'll likely sign this happily." : chance > 0.4 ? 'Could go either way.' : 'A tough sell at these terms.';     $('#fOdds').style.color = over || broke ? '#ff6b6b' : '';     $('#fGo').disabled = over || broke;   };   wr.oninput = upd; yr.oninput = upd; br.oninput = upd; upd();   $('#fGo').onclick = () => {     const w = Math.round(+wr.value * 100000) / 100000, y = +yr.value, bn = Math.round(+br.value * 100000) / 100000;     closeModal();     if (Math.random() > chance) {       if (tries <= 1) { p.coolUntil = G.round + 3; toastWarn(`${p.name} rejects your terms and walks away. He won't talk to you for a few matchdays.`); save(); return; }       toastWarn(`${p.name} turns those terms down. Try again.`);       faTermsModal(pid, tries - 1);       return;     }     const before = me().budget;     const res = signFreeAgent(G, pid, { wage: w, years: y, bonus: bn });     if (res.ok) signCeremony({ p, team: t, wage: w, years: y, fee: bn });     if (!res.ok) { toastWarn(res.msg); return; }     save();     if (bn > 0) showMoneyEffect(`${p.name} signs!`, before, me().budget, 'var(--down)', () => { toast(res.msg); render(); });     else { toast(res.msg); render(); }   }; } function playerTermsModal(pid, fee, tries, viaClause, swapOutPid) {   tries = tries == null ? 3 : tries;   const f = findPlayer(G, pid); if (!f) { toast('He has moved on.'); return; }   const t = me(), p = f.p;   const ref = Math.max(0.0002, p.wage);   const minW = ref * 0.7, maxW = ref * 2.2;   const gap = p.rating - clubLevel(t), agentFee = Math.max(0.01, Math.round(p.value * 6) / 100); openModal(`Negotiate with ${esc(p.name)}`,     `<p class="hint" style="margin:0 0 8px">Fee agreed with ${esc(f.t.s)}: <b style="color:var(--ink)">${money(fee)}</b>. ${esc(p.name)} earns ${money(p.wage)} a season now.      He'll hear <b>${tries}</b> offer${tries === 1 ? '' : 's'} before he walks away.      ${firstTeamFull(t) ? '<br>Your first team is full, so he would join the reserves.' : ''}</p>      <label class="hint">Wage a season</label>      <input class="range" type="range" id="tW" min="${minW.toFixed(5)}" max="${maxW.toFixed(5)}" step="0.0001" value="${Math.min(maxW, ref * 1.1).toFixed(5)}">      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Wage</span>        <span id="tWV" style="font-family:var(--head);font-size:20px;color:var(--ink)"></span></div>      <label class="hint" style="display:block;margin-top:10px">Contract length</label>      <input class="range" type="range" id="tY" min="1" max="5" step="1" value="3">      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Years</span>        <span id="tYV" style="font-family:var(--head);font-size:20px;color:var(--ink)"></span></div>      <div class="bar" style="margin-top:8px"><i id="tBar"></i></div>      <p id="tOdds" class="hint" style="margin:6px 0 0"></p>      <label class="hint" style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="checkbox" id="tAgent"> Pay his agent ${money(agentFee)} for a better chance he signs</label>`,     `<button class="btn ghost sm" onclick="closeModal()">Walk away</button><button class="btn sm" id="tGo">Offer terms</button>`); $('#modal').classList.add('mmx');   const wr = $('#tW'), yr = $('#tY');   let chance = 0.5;   const upd = () => {     const w = +wr.value, y = +yr.value;     chance = 0.5 + (w / ref - 1) * 0.7 - Math.max(0, gap) * 0.012;     if (p.wantsOut) chance += 0.12;     if (p.age < 24 && y >= 4) chance += 0.05;     if (p.age > 30 && y >= 4) chance -= 0.05;     if ($('#tAgent').checked) chance += 0.12;     chance = clamp(chance, 0.03, 0.95);     const over = t.wageBill + w > t.wageBudget;     $('#tWV').textContent = money(w);     $('#tYV').textContent = y + (y === 1 ? ' year' : ' years');     $('#tBar').style.width = (chance * 100).toFixed(0) + '%';     $('#tBar').style.background = over ? 'var(--down)' : chance > 0.6 ? 'var(--up)' : chance > 0.3 ? 'var(--gold)' : 'var(--down)';     $('#tOdds').textContent = over ? `That wage is over your wage budget by ${money(t.wageBill + w - t.wageBudget)}.`       : chance > 0.75 ? "He'll likely sign this happily." : chance > 0.4 ? 'Could go either way.' : 'A tough sell at these terms.';     $('#tOdds').style.color = over ? 'var(--down)' : '';     $('#tGo').disabled = over;   };   wr.oninput = upd; yr.oninput = upd; $('#tAgent').onchange = upd; if (t.budget < fee + agentFee) $('#tAgent').disabled = true; upd();   $('#tGo').onclick = () => {     const w = Math.round(+wr.value * 100000) / 100000, y = +yr.value, agentOn = $('#tAgent').checked;     if (Math.random() > chance) {       closeModal();       if (tries <= 1) { toastWarn(`${p.name} rejects your terms and the move collapses.`); return; }       toastWarn(`${p.name} turns those terms down. Try again.`);       playerTermsModal(pid, fee, tries - 1, viaClause, swapOutPid);       return;     }     const before = me().budget;     const res = swapOutPid != null ? buyPlayerWithSwap(G, pid, fee, swapOutPid, { wage: w, years: y }) : buyPlayer(G, pid, fee, !!viaClause, { wage: w, years: y });     closeModal();     if (!res.ok) { toastWarn(res.msg); return; }     sgQueue({ p, team: t, wage: w, years: y, fee }); if (agentOn) { me().budget = Math.round((me().budget - agentFee) * 100) / 100; me().fin.buys += agentFee; }     save();     showMoneyEffect(`${p.name} signs!`, before, me().budget, 'var(--down)', () => { toast(res.msg); render(); });   }; }  function offersHTML(t, bids) {   const open = inTransferWindow(G);   const groups = {};   bids.forEach(b => { (groups[b.pid] = groups[b.pid] || []).push(b); });   const list = Object.keys(groups).map(k => ({ p: t.squad.find(x => x.id === +k), offers: groups[k].slice().sort((a, b) => b.fee - a.fee) }))     .filter(g => g.p).sort((a, b) => b.offers[0].fee - a.offers[0].fee);   const tiles = sqTiles([['Offers', bids.length], ['Players wanted', list.length], ['Best offer', bids.length ? money(Math.max.apply(null, bids.map(b => b.fee))) : '—'],     ['Window', open ? 'Open' : 'Shut', open ? '#3ddc84' : '#ff6b6b']]);   if (!list.length) return tiles + `<div class="panel"><h3>Offers for your players<span class="sub">clubs bid for players who impress, or anyone you shop around</span></h3>     <div class="empty">No offers right now. Clubs bid for players who impress, and for anyone you shop around during a transfer window.</div></div>`;   return tiles + (open ? '' : `<div class="panel"><div class="pad hint">The transfer window is shut. You can negotiate, but no deal can be agreed until it reopens.</div></div>`) +     list.map(({ p, offers }) => `<div class="panel ofc"><h3>${esc(p.name)}<span class="sub">${offers.length} offer${offers.length === 1 ? '' : 's'} · valued ${money(p.value)}</span></h3>       <div class="ofh">${faceSVG(p, 40, t.c1)}${ratingTag(p.rating)}         <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${p.age} · ${p.contract}y left · ${money(p.wage)}/season${p.inj > 0 ? ' · injured ' + p.inj : ''}</small></span>         <span style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn ghost sm" data-oview="${p.id}">View profile</button>${offers.length > 1 ? `<button class="btn ghost sm" data-orejall="${p.id}">Reject all</button>` : ''}</span></div>       ${offers.map(b => {         const club = G.teams[b.from], dealValue = b.fee + (b.swapValue || 0), pct = Math.round(dealValue / p.value * 100), left = 3 - (b.tries || 0);         const col = pct >= 100 ? '#3ddc84' : pct >= 80 ? '#f2b928' : '#ff6b6b';         return `<div class="ofr">${crestHTML(club, 26)}           <span class="who"><b>${esc(club.n)}</b><small>${TIER_SHORT[club.tier]}${b.tries ? ` · ${left} attempt${left === 1 ? '' : 's'} left` : ''}${b.swapPid ? ` · plus ${esc(b.swapName)} (${b.swapPos}, ${b.swapRating})` : ''}${b.round != null ? ` · expires in ${Math.max(1, OFFER_EXPIRE_ROUNDS - (G.round - b.round))} match${Math.max(1, OFFER_EXPIRE_ROUNDS - (G.round - b.round)) === 1 ? '' : 'es'}` : ''}</small></span>           <span class="fee">${b.fee > 0.005 ? money(b.fee) : 'No cash'}${b.swapPid ? ' + player' : ''}<small style="color:${col}">${pct}% of value</small></span>           <span class="oact"><button class="btn sm" data-oacc="${p.id}:${b.from}">Accept</button><button class="btn ghost sm" data-oneg="${p.id}:${b.from}">Negotiate</button><button class="btn danger sm" data-orej="${p.id}:${b.from}">Reject</button></span></div>`;       }).join('')}</div>`).join(''); } function bindOfferButtons(v) {   const split = s => s.split(':').map(Number);   v.querySelectorAll('[data-oview]').forEach(b => b.onclick = () => playerModal(+b.dataset.oview));   v.querySelectorAll('[data-oacc]').forEach(b => b.onclick = () => { const a = split(b.dataset.oacc); finishOfferSale(a[0], a[1], null); });   v.querySelectorAll('[data-oneg]').forEach(b => b.onclick = () => { const a = split(b.dataset.oneg); offerNegChoice(a[0], a[1]); });   v.querySelectorAll('[data-orej]').forEach(b => b.onclick = () => { const a = split(b.dataset.orej); G.pendingBids = G.pendingBids.filter(x => !(x.pid === a[0] && x.from === a[1])); save(); render(); });   v.querySelectorAll('[data-orejall]').forEach(b => b.onclick = () => { const pid = +b.dataset.orejall; G.pendingBids = G.pendingBids.filter(x => x.pid !== pid); save(); render(); }); } function loanOffersHTML(t, offers) {   if (!offers.length) return `<div class="panel"><h3>Loan requests<span class="sub">clubs wanting to borrow a fringe or developing player</span></h3>     <div class="empty">No loan requests right now. Clubs come asking about players who aren't getting regular minutes.</div></div>`;   const groups = {};   offers.forEach(o => { (groups[o.pid] = groups[o.pid] || []).push(o); });   const list = Object.keys(groups).map(k => ({ p: t.squad.find(x => x.id === +k), offers: groups[k] })).filter(g => g.p);   return list.map(({ p, offers }) => `<div class="panel ofc"><h3>${esc(p.name)}<span class="sub">${offers.length} loan request${offers.length === 1 ? '' : 's'}</span></h3>     <div class="ofh">${faceSVG(p, 40, t.c1)}${ratingTag(p.rating)}       <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${p.age} · ${p.contract}y left</small></span></div>     ${offers.map(o => { const club = G.teams[o.from]; return `<div class="ofr">${crestHTML(club, 26)}         <span class="who"><b>${esc(club.n)}</b><small>${TIER_SHORT[club.tier]} · ${o.seasons} season${o.seasons === 1 ? '' : 's'}${o.round != null ? ` · expires in ${Math.max(1, OFFER_EXPIRE_ROUNDS - (G.round - o.round))} match${Math.max(1, OFFER_EXPIRE_ROUNDS - (G.round - o.round)) === 1 ? '' : 'es'}` : ''}</small></span>         <span class="fee">${Math.round(o.wageShare * 100)}% wages<small>paid by them</small></span>         <span class="oact"><button class="btn sm" data-lacc="${p.id}:${o.from}">Accept</button><button class="btn ghost sm" data-lneg="${p.id}:${o.from}">Negotiate</button><button class="btn danger sm" data-lrej="${p.id}:${o.from}">Reject</button></span></div>`; }).join('')}</div>`).join(''); } function bindLoanOfferButtons(v) {   const split = s => s.split(':').map(Number);   v.querySelectorAll('[data-lacc]').forEach(b => b.onclick = () => { const a = split(b.dataset.lacc); const r = acceptLoanOffer(G, a[0], a[1]); toast(r.msg); if (r.ok) { save(); render(); } });   v.querySelectorAll('[data-lneg]').forEach(b => b.onclick = () => { const a = split(b.dataset.lneg); loanNegModal(a[0], a[1]); });   v.querySelectorAll('[data-lrej]').forEach(b => b.onclick = () => { const a = split(b.dataset.lrej); G.pendingLoanOffers = (G.pendingLoanOffers || []).filter(x => !(x.pid === a[0] && x.from === a[1])); save(); render(); }); } function finishOfferSale(pid, from, fee) {   const bid = (G.pendingBids || []).find(b => b.pid === pid && b.from === from);   const p = me().squad.find(x => x.id === pid); if (!p) return;   const price = fee != null ? fee : (bid ? bid.fee : null); if (price == null) return;   const others = (G.pendingBids || []).filter(b => b.pid === pid && b.from !== from).length;   const before = me().budget;   try {     const r = sellPlayer(G, pid, price, from);     if (!r.ok) { toastWarn(r.msg); return; }     let swapMsg = '';     if (bid && bid.swapPid != null) {       const sw = completeSwapLeg(G, from, bid.swapPid);       if (sw && !sw.blocked) swapMsg = ` ${sw.name} joins as part of the deal.`;       else if (sw && sw.blocked) swapMsg = ` ${sw.name} couldn't join too — you're already at the foreign-player limit, so that side of the deal fell through.`;     }     save();     showMoneyEffect(`${p.name} sold`, before, me().budget, 'var(--up)', () => {       toastGood(r.msg + swapMsg + (others ? ` The ${others} other offer${others === 1 ? '' : 's'} for him ${others === 1 ? 'was' : 'were'} withdrawn.` : ''));       render();     });   } catch (e) {     console.error('Accept offer failed:', e);     save();     toastGood(`${p.name} sold.`);     render();   } } /* ---- negotiating swap bids (cash only) and loan requests (wage share, length) ---- */
function offerNegChoice(pid, from) {
  const bid = (G.pendingBids || []).find(b => b.pid === pid && b.from === from);
  if (!bid || bid.swapPid == null) { offerNegModal(pid, from); return; }
  const p = me().squad.find(x => x.id === pid); if (!p) return;
  openModal(`Negotiate: ${esc(p.name)}`, `<p class="hint" style="margin:0">${esc(G.teams[from].n)} offered ${money(bid.fee)} plus ${esc(bid.swapName)} (${bid.swapPos}, ${bid.swapRating}). What do you want to push for?</p>`,
    `<button class="btn ghost sm" id="ngBack">Back</button><button class="btn ghost sm" id="ngCash">Cash only</button><button class="btn sm" id="ngMore">More money</button>`);
  $('#ngBack').onclick = closeModal;
  $('#ngMore').onclick = () => { closeModal(); offerNegModal(pid, from); };
  $('#ngCash').onclick = () => { closeModal(); offerCashOnly(pid, from); };
}
function offerCashOnly(pid, from) {
  const p = me().squad.find(x => x.id === pid), bid = (G.pendingBids || []).find(b => b.pid === pid && b.from === from);
  if (!p || !bid || bid.swapPid == null) return;
  const buyer = G.teams[from], credit = Math.round((bid.swapValue || 0) * 0.9 * 100) / 100;
  const full = Math.round((bid.fee + credit) * 100) / 100;
  const afford = buyer.budget >= full, ask = afford ? full : Math.max(bid.fee, Math.floor(buyer.budget * 100) / 100);
  const chance = clamp((afford ? 0.8 : 0.45) - (credit / Math.max(0.01, p.value)) * 0.4, 0.2, 0.85);
  const left = 3 - (bid.tries || 0);
  openModal(`Cash only: ${esc(p.name)}`,
    `<p class="hint" style="margin:0 0 10px">Ask ${esc(buyer.n)} to drop ${esc(bid.swapName)} from the deal and pay <b style="color:#fff">${money(ask)}</b> in cash instead of ${money(bid.fee)} plus the player.${afford ? '' : ' They cannot afford the full amount, so this is the most they can pay.'} You have <b style="color:#f2b928">${left}</b> attempt${left === 1 ? '' : 's'} left.</p>
     <div class="bar"><i style="width:${Math.round(chance * 100)}%;background:${chance > 0.66 ? '#3ddc84' : chance > 0.33 ? '#f2b928' : '#ff6b6b'}"></i></div>`,
    `<button class="btn ghost sm" onclick="closeModal()">Back</button><button class="btn sm" id="ngCashGo">Ask for cash only</button>`);
  $('#ngCashGo').onclick = () => {
    closeModal(); bid.tries = (bid.tries || 0) + 1;
    if (rnd() < chance) { bid.fee = ask; bid.swapPid = null; bid.swapValue = 0; finishOfferSale(pid, from, ask); return; }
    if (bid.tries >= 3) { G.pendingBids = G.pendingBids.filter(x => x !== bid); toastWarn(`${buyer.s} lose patience and withdraw their interest in ${p.name}.`); }
    else toastWarn(`${buyer.s} want ${bid.swapName} included and won't pay cash only.`);
    save(); render();
  };
}
function loanNegModal(pid, from) {
  const t = me(), p = t.squad.find(x => x.id === pid), o = (G.pendingLoanOffers || []).find(x => x.pid === pid && x.from === from);
  if (!p || !o) return;
  const club = G.teams[from], left = 3 - (o.tries || 0);
  if (o.maxShare == null) o.maxShare = Math.min(1, Math.round((o.wageShare + 0.1 + rnd() * 0.25) * 20) / 20);
  const chanceOf = (w, s) => {
    const pw = w <= o.wageShare ? 1 : w <= o.maxShare ? 0.85 - 0.7 * (w - o.wageShare) / Math.max(0.05, o.maxShare - o.wageShare) : 0.04;
    return clamp(pw * (1 - 0.18 * Math.abs(s - o.seasons)), 0.03, 1);
  };
  openModal(`Loan terms: ${esc(p.name)}`,
    `<p class="hint" style="margin:0 0 10px"><b style="color:#fff">${esc(club.n)}</b> want him for ${o.seasons} season${o.seasons === 1 ? '' : 's'} and will pay ${Math.round(o.wageShare * 100)}% of his wages. You have <b style="color:#f2b928">${left}</b> attempt${left === 1 ? '' : 's'} left.</p>
     <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>Wages they pay</span><span id="lnWV" style="font-family:var(--head);font-size:20px;color:#fff"></span></div>
     <input class="range" type="range" id="lnW" min="25" max="100" step="5" value="${Math.round(Math.min(100, o.wageShare * 100 + 10))}">
     <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2;margin-top:8px"><span>Loan length</span><span id="lnSV" style="font-family:var(--head);font-size:20px;color:#fff"></span></div>
     <input class="range" type="range" id="lnS" min="1" max="3" step="1" value="${o.seasons}">
     <div class="bar" style="margin-top:8px"><i id="lnBar"></i></div><p id="lnOdds" class="hint" style="margin:6px 0 0"></p>`,
    `<button class="btn ghost sm" onclick="closeModal()">Back</button><button class="btn sm" id="lnGo">Propose terms</button>`);
  $('#modal').classList.add('mmx');
  const W = $('#lnW'), S = $('#lnS');
  const upd = () => {
    const w = +W.value / 100, s = +S.value, c = chanceOf(w, s);
    $('#lnWV').textContent = W.value + '%'; $('#lnSV').textContent = s + ' season' + (s === 1 ? '' : 's');
    $('#lnBar').style.width = (c * 100).toFixed(0) + '%'; $('#lnBar').style.background = c > 0.66 ? '#3ddc84' : c > 0.33 ? '#f2b928' : '#ff6b6b';
    $('#lnOdds').textContent = c > 0.8 ? 'They will almost certainly agree.' : c > 0.45 ? 'They might go for it.' : c > 0.1 ? 'A stretch. They may counter.' : 'They will not agree to this.';
  };
  W.oninput = S.oninput = upd; upd();
  $('#lnGo').onclick = () => {
    const w = +W.value / 100, s = +S.value; o.tries = (o.tries || 0) + 1; closeModal();
    if (rnd() < chanceOf(w, s)) { o.wageShare = w; o.seasons = s; const r = acceptLoanOffer(G, pid, from); toast(r.msg); if (r.ok) { save(); render(); } return; }
    if (o.tries >= 3) { G.pendingLoanOffers = G.pendingLoanOffers.filter(x => x !== o); toastWarn(`${club.s} lose patience and withdraw their loan request for ${p.name}.`); }
    else {
      const nw = Math.round(((o.wageShare + Math.min(w, o.maxShare)) / 2) * 20) / 20;
      if (nw > o.wageShare + 0.001) { o.wageShare = nw; toast(`${club.s} come back offering to pay ${Math.round(nw * 100)}% of his wages.`); }
      else toastWarn(`${club.s} will not move from ${Math.round(o.wageShare * 100)}%.`);
    }
    save(); render();
  };
}
  function offerNegModal(pid, from) {   const t = me(), p = t.squad.find(x => x.id === pid), bid = (G.pendingBids || []).find(b => b.pid === pid && b.from === from);   if (!p || !bid) return;   const buyer = G.teams[from];   if (!bid.max) bid.max = Math.round(Math.max(bid.fee, Math.min(buyer.budget, p.value * (1 + rnd() * 0.5))) * 100) / 100;   const left = 3 - (bid.tries || 0);   const lo = bid.fee, hi = Math.max(lo * 1.1, p.value * 2);   const chanceOf = v => v <= bid.fee ? 1 : v <= bid.max ? Math.max(0.12, 0.9 - 0.75 * (v - bid.fee) / Math.max(0.01, bid.max - bid.fee)) : 0.03;   openModal(`Negotiate: ${esc(p.name)}`,     `<p class="hint" style="margin:0 0 10px"><b style="color:#fff">${esc(buyer.n)}</b> offered <b style="color:#fff">${money(bid.fee)}</b> (${Math.round(bid.fee / p.value * 100)}% of his ${money(p.value)} value).       Ask for more. You have <b style="color:#f2b928">${left}</b> attempt${left === 1 ? '' : 's'} left before they walk away.</p>      <input class="range" type="range" id="ngR" min="${lo.toFixed(2)}" max="${hi.toFixed(2)}" step="0.05" value="${Math.min(hi, lo * 1.12).toFixed(2)}">      <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>Your price</span>        <span id="ngV" style="font-family:var(--head);font-size:22px;color:#fff"></span></div>      <div class="bar" style="margin-top:8px"><i id="ngBar"></i></div>      <p id="ngOdds" class="hint" style="margin:6px 0 0"></p>`,     `<button class="btn ghost sm" onclick="closeModal()">Back</button><button class="btn sm" id="ngGo">Counter-offer</button>`);   $('#modal').classList.add('mmx');   const r = $('#ngR');   const upd = () => {     const c = chanceOf(+r.value);     $('#ngV').textContent = money(+r.value);     $('#ngBar').style.width = (c * 100).toFixed(0) + '%';     $('#ngBar').style.background = c > 0.66 ? '#3ddc84' : c > 0.33 ? '#f2b928' : '#ff6b6b';     $('#ngOdds').textContent = c > 0.8 ? 'They will almost certainly agree.' : c > 0.45 ? 'They might go for it.' : c > 0.1 ? 'A stretch. They may counter lower.' : 'Far too much. They will not pay this.';   };   r.oninput = upd; upd();   $('#ngGo').onclick = () => {     const v = Math.round(+r.value * 100) / 100;     bid.tries = (bid.tries || 0) + 1;     closeModal();     if (Math.random() < chanceOf(v)) { finishOfferSale(pid, from, v); return; }     if (bid.tries >= 3) {       G.pendingBids = G.pendingBids.filter(x => x !== bid);       toastWarn(`${buyer.s} lose patience and withdraw their interest in ${p.name}.`);     } else {       const nf = Math.round(((bid.fee + Math.min(v, bid.max)) / 2) * 100) / 100;       if (nf > bid.fee + 0.005) { bid.fee = nf; toast(`${buyer.s} come back with an improved offer of ${money(nf)}.`); }       else toastWarn(`${buyer.s} will not move from ${money(bid.fee)}.`);     }     save(); render();   }; }  function toggleTL(pid) {   const p = me().squad.find(x => x.id === pid); if (!p) return;   if (p.tl) { p.tl = false; save(); toast(`${p.name} is off the transfer list.`); render(); return; }   if (signLockLeft(p) > 0) { toastWarn(p.name + ' only just signed. You can transfer list him in ' + signLockLeft(p) + ' days. A loan is still possible.'); return; }   p.tl = true; save();   toast(inTransferWindow(G) ? `${p.name} is on the transfer list.` : `${p.name} is on the transfer list. Offers start when the window opens.`);   render(); } function toggleLL(pid) {   const me0 = me(), p = me0.squad.find(x => x.id === pid); if (!p) return;   if (p.ll) { p.ll = false; save(); toast(`${p.name} is off the loan list.`); render(); return; }   if (me0.captainId === pid || me0.viceCaptainId === pid) { toastWarn(`${p.name} is captain or vice-captain, so he can't be loan listed.`); return; }   p.ll = true; save();   toast(inTransferWindow(G) ? `${p.name} is on the loan list.` : `${p.name} is on the loan list. Offers start when the window opens.`);   render(); } function sellModalOld(pid) {
  const p = me().squad.find(x => x.id === pid); if (!p) return;
  if (me().squad.length <= MIN_SENIOR) { toastWarn(`You can't sell ${p.name}: you must keep at least ${MIN_SENIOR} senior players.`); return; }
  openModal(`Sell ${esc(p.name)}`,
    `<p class="hint" style="margin:0 0 10px">Valued at <b style="color:var(--ink)">${money(p.value)}</b>. Ask for more and clubs may not come forward.</p>
     <input class="range" type="range" id="askR" min="${(p.value * 0.5).toFixed(2)}" max="${(p.value * 2).toFixed(2)}" step="0.05" value="${p.value.toFixed(2)}">
     <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>Asking price</span>
       <span id="askV" style="font-family:var(--head);font-size:22px;color:var(--ink)"></span></div>
     <div class="bar" style="margin-top:8px"><i id="askBar"></i></div>
     <p id="askOdds" class="hint" style="margin:6px 0 0"></p>`,
    `<button class="btn ghost sm" onclick="closeModal()">Keep him</button><button class="btn sm" id="askGo">Put him on the market</button>`);
  const r = $('#askR');
  const chanceOf = v => Math.max(0.05, Math.min(0.95, 1.55 - v / p.value));
  const upd = () => {
    const c = chanceOf(+r.value);
    $('#askV').textContent = money(+r.value);
    $('#askBar').style.width = (c * 100).toFixed(0) + '%';
    $('#askBar').style.background = c > 0.66 ? 'var(--up)' : c > 0.33 ? 'var(--gold)' : 'var(--down)';
    $('#askOdds').textContent = c > 0.7 ? 'Plenty of interest at that price.' : c > 0.4 ? 'A club might take him.' : 'You are pricing him out of a move.';
  };
  r.oninput = upd; upd();
  $('#askGo').onclick = () => {
    const v = +r.value;
    if (Math.random() > chanceOf(v)) { closeModal(); toastWarn(`No suitors at ${money(v)} for ${p.name}.`); return; }
    const before = me().budget;
    const res = sellPlayer(G, pid, Math.round(v * 100) / 100);
    if (!res.ok) { closeModal(); toastWarn(res.msg); return; }
    save();
        showMoneyEffect(`${p.name} sold`, before, me().budget, 'var(--up)', () => { toastGood(res.msg); render(); });
  };
}

/* ---------------- Inbox ---------------- */ function mailSnap(p, club, status) {   return { id: p.id, name: p.name, pos: p.pos, alt: (p.alt || []).slice(), age: p.age, rating: p.rating, pot: p.pot, nat: p.nat, face: p.face, portrait: p.portrait,     wage: p.wage, contract: p.contract, value: p.value || 0, inj: p.inj || 0, club: club ? club.n : '', kit: club ? club.c1 : '#555', status: status || '' }; } function mailMuted(G, o) {   const sub = o.subject || '', key = o.key || '';   if (/^\[Info\]/.test(sub)) return true;   if (o.cat === 'news') return true;   if (/^(wk_|ob_|mnt_|thanks_|bday_|oldboss_|oldplayer_)/.test(key)) return true;   if (o.cat === 'personal' && !/^fam_/.test(key)) return true;   if (!o.flag && (o.cat === 'general' || o.cat === 'scout') && !/^Academy Gem/.test(sub)) return true;   if (!key && (G.inbox || []).some(m => m.subject === sub && m.season === G.season && G.round - m.round < 6)) return true;   return false; } function mail(G, o) {   if (mailMuted(G, o)) return null;   G.inbox = G.inbox || []; G.mailKeys = G.mailKeys || {};   if (o.key) { if (G.mailKeys[o.key]) return null; G.mailKeys[o.key] = 1; }   const m = { id: (G.mailSeq = (G.mailSeq || 0) + 1), season: G.season, round: G.round, date: dateForRound(G.round, G.season),     cat: o.cat || 'general', from: o.from || 'Board of Directors', subject: o.subject || '(no subject)',     body: Array.isArray(o.body) ? o.body : [o.body || ''], rows: o.rows || null, act: o.act || null,     pl: o.p ? mailSnap(o.p, o.club, o.status) : null, flag: !!o.flag, read: false, arch: false };   G.inbox.unshift(m);   if (G.inbox.length > 80) G.inbox.length = 80;   return m; } function unreadCount(G) { return ((G && G.inbox) || []).filter(m => !m.read && !m.arch).length; } /* new signings can't be sold or listed for 6 months (loans are fine) */ function signLockLeft(p) {   if (!p || !p.signedAt) return 0;   const d = Math.floor((Date.parse(currentDateISO() + 'T12:00:00Z') - Date.parse(p.signedAt + 'T12:00:00Z')) / 86400000);   return Math.max(0, 183 - d); } function mailSigning(G, p, fee, fromName, bonus) {   p.signedAt = currentDateISO(); p.tl = false;   const t = G.teams[G.myTeam];   const rank = t.squad.slice().sort((a, b) => b.rating - a.rating).findIndex(x => x.id === p.id) + 1;   mail(G, { cat: 'signing', from: 'Chief Executive', p, club: t, status: 'New signing', subject: `[Info] New Signing: ${p.name}`,     body: [`${p.name} has completed his move${fromName ? ' from ' + fromName : ''} and is now a ${t.s} player.`, `He is a ${p.pos} rated ${p.rating} with ${potTxt(p)} potential. The full terms of the deal are below.`],     rows: [['Position', [p.pos].concat(p.alt || []).join(' / ')], ['Transfer fee', fee > 0 ? money(fee) : 'Free transfer'], ...(bonus > 0 ? [['Signing-on fee', money(bonus)]] : []), ['Wage', money(p.wage) + ' a season'],       ['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} (until June ${G.season + p.contract})`], ['Release clause', p.releaseClause ? money(p.releaseClause) : 'None'],       ['Squad status', p.reserve ? 'Reserves' : 'First team'], ['Squad rank', `#${rank} of ${t.squad.length} by rating`], ['Wage bill', `${money(t.wageBill)} of ${money(t.wageBudget)}`]] }); } function inboxTick(G) { try { boardTick(G); } catch (e) { console.error('boardTick', e); } try { boardTick(G); } catch (e) { console.error('boardTick', e); }   const t = G.teams[G.myTeam]; if (!t) return;   const half = Math.floor(totalRounds(G) / 2);   mail(G, { key: 'brief_' + G.season, from: 'Board of Directors', subject: `Season Briefing ${seasonLabel(G.season)}`,     body: [`The board welcome you to the ${seasonLabel(G.season)} season with ${t.n}.`, `We expect a competitive campaign in the ${TIER_SHORT[t.tier]}. Use your budgets wisely.`],     rows: [['Squad rating', teamOverall(t)], ['Transfer budget', money(t.budget)], ['Wage budget', money(t.wageBudget)]] });   if (inTransferWindow(G)) mail(G, { key: `win_${G.season}_${currentWindowName(G)}`, from: 'Chief Executive', subject: 'Transfer Window Open',     body: [`The ${currentWindowName(G).toLowerCase()} is now open. Make your signings before it shuts.`] });   if (G.round >= half) {     const pos = posOfTeam(G, G.myTeam), n = G.teams.filter(x => x.tier === t.tier).length;     const mood = pos <= n * 0.25 ? 'The board are delighted with the progress so far.' : pos >= n * 0.75 ? 'The board are concerned and expect an improvement in the second half.' : 'The board are watching closely.';     mail(G, { key: 'mid_' + G.season, from: 'Board of Directors', flag: pos >= n * 0.75, subject: 'Mid-season Review',       body: [`At the halfway point we sit ${ordinal(pos)} in the ${TIER_SHORT[t.tier]}. ${mood}`] });   }   if (t.wageBill > t.wageBudget * 0.95) mail(G, { key: 'wage_' + G.season, from: 'Finance Director', flag: true, subject: 'Wage Budget Warning',     body: [`Wages now total ${money(t.wageBill)} against a ${money(t.wageBudget)} budget. There is almost no room for further signings.`] });   if (G.round >= half && !(G.mailKeys || {})['exp6_' + G.season]) {     G.mailKeys = G.mailKeys || {}; G.mailKeys['exp6_' + G.season] = 1;     const exp = t.squad.filter(p => p.contract === 1 && !p.loan).sort((a, b) => b.rating - a.rating);     exp.slice(0, 4).forEach(p => mail(G, { cat: 'contract', from: 'Chief Executive', p, club: t, status: 'Contract expiring', flag: true, act: 'contract',       subject: `Contract Expiring: ${p.name}`,       body: [`${p.name}'s contract runs out in about six months (June ${G.season + 1}).`, 'If he is not re-signed he will leave on a free transfer at the end of the season. Open his profile to negotiate a new deal.'],       rows: [['Current wage', money(p.wage) + ' a season'], ['Expires', `June ${G.season + 1}`], ['Rating / potential', `${p.rating} / ${potTxt(p)}`], ['Value', money(p.value)]] }));     if (exp.length > 4) mail(G, { cat: 'contract', from: 'Chief Executive', flag: true, subject: `Contracts Expiring: ${exp.length - 4} more players`,       body: [`${exp.slice(4).map(p => p.name).join(', ')} are also out of contract in June ${G.season + 1}.`, 'Open the Squad screen to renew the ones you want to keep.'] });   }   const inXI = (p) => { try { return lineupOf(t).some(x => x.id === p.id); } catch (e) { return false; } };   t.squad.forEach(p => {     if (p.inj > 0 && !p.mailInj) {       p.mailInj = p.inj;       const kind = p.inj <= 2 ? 'a knock' : p.inj <= 5 ? 'a muscle strain' : 'a serious injury';       if (p.inj >= 2) mail(G, { cat: 'injury', from: 'Head Physio', p, club: t, status: `Injured · ${p.inj} matchday${p.inj === 1 ? '' : 's'}`, flag: p.inj >= 6,         subject: `Injury: ${p.name} (${p.inj} matchday${p.inj === 1 ? '' : 's'})`,         body: [`${p.name} has picked up ${kind} and will miss about ${p.inj} matchday${p.inj === 1 ? '' : 's'}.`, inXI(p) ? 'He is in your starting XI, so you will need to pick a replacement.' : 'He is not in your starting XI.'] });     } else if (p.inj <= 0 && p.mailInj) {       if (p.mailInj >= 3) mail(G, { cat: 'injury', from: 'Head Physio', p, club: t, status: 'Fit again', subject: `Back in Training: ${p.name}`, body: [`${p.name} has recovered and is available for selection again.`] });       p.mailInj = 0;     }     const gain = p.rating - (p.startRating != null ? p.startRating : p.rating);     if (p.age <= 21 && gain >= 2) mail(G, { key: `prog2_${p.id}_${G.season}`, cat: 'progress', from: 'Youth Coach', p, club: t, status: 'Developing well',       subject: `Progress Report: ${p.name}`, body: [`${p.name} (${p.age}) is developing nicely, up ${gain} points to ${p.rating} this season.`, `I think he can reach ${potTxt(p)}.`] });     if (p.age <= 21 && gain >= 4) mail(G, { key: `prog4_${p.id}_${G.season}`, cat: 'progress', from: 'Youth Coach', p, club: t, status: 'Breakthrough season', flag: true,       subject: `Breakthrough: ${p.name}`, body: [`${p.name} has gone from ${p.startRating} to ${p.rating} this season. He is flying.`, 'Consider tying him to a long contract before bigger clubs notice.'], act: 'contract' });   }); } function updateInboxBadge() {   const n = unreadCount(G);   if (G.lastUnread > n) G.lastUnread = n;   const nav = document.querySelector('.navlink[data-tab="inbox"]');   if (nav) { let b = nav.querySelector('.nb'); if (n) { if (!b) { b = document.createElement('span'); b.className = 'nb'; nav.appendChild(b); } b.textContent = n; } else if (b) b.remove(); }   const hb = $('#inboxBadge'); if (hb) { hb.textContent = n > 99 ? '99+' : n; hb.style.display = n ? 'flex' : 'none'; } } let inboxTab = 'emails', inboxSel = null, inboxOpen = false; function fmtMailDate(iso) { const a = String(iso).split('-'); return `${a[2]}/${a[1]}/${a[0]}`; } function mailPlayerLive(pl) {   if (!pl) return null;   const f = findPlayer(G, pl.id); if (f) return f;   const fa = G.freeAgents.find(x => x.id === pl.id); return fa ? { p: fa, t: null } : null; } function mailDetailHTML(m) {   const pl = m.pl, lf = mailPlayerLive(pl), live = lf ? lf.p : null;   const src = live || pl;   let prof = '';   if (pl) {     const nowTxt = lf ? (lf.t ? `Now at ${lf.t.n}` : 'Now a free agent') : (/retire/i.test(pl.status) ? 'Retired' : '');     const fit = (src.inj || 0) > 0 ? `Out ${src.inj} wk` : 'Fit';     prof = `<div class="mprof">       <div class="mface">${faceSVG(pl, 60, pl.kit)}</div>       <div><div class="mname">${esc(pl.name)} ${flagSVG(pl.nat)}</div>         <div class="mtags">${[src.pos].concat(src.alt || []).map(x => posTag(x)).join('')}${ratingTag(src.rating)}<span class="mpot">POT <b class="potglow">${src.pot}</b></span></div>         <div class="mclub">${pl.status ? `<em>${esc(pl.status)}</em>` : ''}${esc(nowTxt)}</div></div>       <div class="mstats"><div><small>Age</small><b>${src.age}</b></div><div><small>Value</small><b>${money(src.value || 0)}</b></div>         <div><small>Wage</small><b>${money(src.wage)}</b></div><div><small>Contract</small><b>${src.contract > 0 ? src.contract + 'y' : '—'}</b></div>         <div><small>Fitness</small><b>${fit}</b></div></div></div>`;   }   const rows = m.rows ? `<table class="mrows">${m.rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(String(r[1]))}</td></tr>`).join('')}</table>` : '';   const acts = [];   if (lf && live) acts.push(`<button class="gold" data-act="profile">View full profile</button>`);   if (lf && live && m.act === 'shortlist' && !isWatched(live.id)) acts.push(`<button data-act="shortlist">Add to shortlist</button>`);   acts.push(`<button data-act="unread">Mark unread</button><button data-act="delete">Delete message</button>`);   return `<button class="btn ghost sm mb-back" id="mbBack">‹ Inbox</button>     <div class="mhead"><span>Date</span><b>${fmtMailDate(m.date)}</b><span>From:</span><b>${esc(m.from)}</b><span>To:</span><b>${esc(G.manager.name)}</b><span>Subject:</span><b>${esc(m.subject)}</b></div>     ${prof}<div class="mbody">${m.body.map(x => `<p>${esc(x)}</p>`).join('')}${rows}<p style="color:#8f98a2">Regards,<br>${esc(m.from)}</p></div>     <div class="mact">${acts.join('')}</div>`; } function viewInbox() {   const v = $('#v-inbox'), all = G.inbox || [];   const inTab = m => !m.arch && (inboxTab === 'players' ? m.cat === 'request' : inboxTab === 'personal' ? m.cat === 'personal' : (m.cat !== 'request' && m.cat !== 'personal'));   const list = all.filter(inTab);   const mobile = window.matchMedia('(max-width:760px)').matches;   let sel = list.find(m => m.id === inboxSel);   if (!sel && !mobile) sel = list[0];   if (!sel) inboxOpen = false;   if (sel && (!mobile || inboxOpen) && !sel.read) { sel.read = true; save(); updateInboxBadge(); }   const unE = all.filter(m => !m.read && !m.arch && m.cat !== 'request' && m.cat !== 'personal').length, unP = all.filter(m => !m.read && !m.arch && m.cat === 'request').length, unPer = all.filter(m => !m.read && !m.arch && m.cat === 'personal').length;   const env = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>';   v.innerHTML = `<div class="mb${mobile && inboxOpen ? ' open' : ''}">     <div class="mb-tabs">       <button data-tb="emails" class="${inboxTab === 'emails' ? 'on' : ''}">Emails${unE ? `<i class="mb-red">${unE}</i>` : ''}</button>       <button data-tb="players" class="${inboxTab === 'players' ? 'on' : ''}">Player Messages${unP ? `<i class="mb-red">${unP}</i>` : ''}</button>       <button data-tb="personal" class="${inboxTab === 'personal' ? 'on' : ''}">Personal${unPer ? `<i class="mb-red">${unPer}</i>` : ''}</button>       <span class="sp"></span><button class="mini" id="mbAllRead">Mark all read</button>     </div>     <div class="mb-body">       <div class="mb-list">${list.length ? list.map(m => `<button class="mrow${sel && sel.id === m.id ? ' sel' : ''}${m.read ? '' : ' unread'}" data-mid="${m.id}">         <span class="mi">${env}</span><span class="mt"><b>${esc(m.from)}</b><small>${esc(m.subject)}</small></span><span class="md">${fmtMailDate(m.date)}</span>${m.flag ? '<i class="mflag"></i>' : '<i></i>'}</button>`).join('')         : '<div class="mb-empty">No messages here yet. News from your staff, players and the board will arrive after matchdays.</div>'}</div>       <div class="mb-detail">${sel ? mailDetailHTML(sel) : '<div class="mb-empty">Select a message to read it.</div>'}</div>     </div></div>`;   v.querySelectorAll('[data-tb]').forEach(b => b.onclick = () => { inboxTab = b.dataset.tb; inboxSel = null; inboxOpen = false; viewInbox(); });   v.querySelectorAll('[data-mid]').forEach(b => b.onclick = () => { inboxSel = +b.dataset.mid; inboxOpen = true; viewInbox(); });   const back = $('#mbBack'); if (back) back.onclick = () => { inboxOpen = false; inboxSel = null; viewInbox(); };   $('#mbAllRead').onclick = () => { all.forEach(m => { m.read = true; }); save(); updateInboxBadge(); viewInbox(); };   v.querySelectorAll('[data-act]').forEach(b => b.onclick = () => {     if (!sel) return;     const a = b.dataset.act;     if (a === 'profile') { playerModal(sel.pl.id); return; }     if (a === 'shortlist') { toggleWatch(sel.pl.id); toast(`${sel.pl.name} added to your shortlist.`); }     if (a === 'unread') { sel.read = false; inboxOpen = false; inboxSel = null; }     if (a === 'delete') { G.inbox = G.inbox.filter(x => x.id !== sel.id); inboxSel = null; inboxOpen = false; }     save(); updateInboxBadge(); viewInbox();   }); } (function () { const b = $('#inboxBtn'); if (b) b.onclick = () => { if (G) goTo('inbox'); }; })();  /* ---------------- Training ---------------- */ function viewTraining() {   const v = $('#v-youth'), t = me();   const lvl = t.training || 1, cost = TRAIN_COST[lvl] || 0, drill = t.drill || 'balanced';   const rep = G.lastTraining;   const items = (rep && rep.team === t.id ? rep.items : []).slice().sort((a, b) => (b.rise - a.rise));   const all = t.squad.concat(t.youth || []);   const risers = all.filter(p => p.startRating != null && p.rating > p.startRating).sort((a, b) => (b.rating - b.startRating) - (a.rating - a.startRating)).slice(0, 5);   const rows = items.map(it => {     const p = t.squad.find(x => x.id === it.pid) || t.youth.find(x => x.id === it.pid); if (!p) return '';     return `<button class="prow" data-pid="${p.id}" style="grid-template-columns:auto auto 1fr auto">       ${faceSVG(p, 34, t.c1)}${ratingTag(p.rating)}       <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${p.age} · potential ${potTxt(p)}</small></span>       <span style="text-align:right"><span class="trup">▲ ${it.attr}</span>${it.rise ? '<span class="trbadge">+1 overall</span>' : ''}</span></button>`;   }).join('');   v.innerHTML = yhTabsHTML(t) +     sqTiles([['Training level', `${lvl}/5`], ['Drill focus', (TRAIN_FOCUS[drill] || TRAIN_FOCUS.balanced).name], ['Improved last week', items.length],       ['Rated up', items.filter(i => i.rise).length], ['Teen weekly chance', Math.round(TRAIN_LVL[lvl] * 100) + '%']]) +     `<div class="cols">       <div class="panel"><h3>Training ground<span class="sub">level ${lvl} of 5</span></h3><div class="pad">         ${lvlPips(lvl)}         <p class="hint" style="margin:8px 0 6px">Drills run once a week, every matchday. Each week a teenager has a ${Math.round(TRAIN_LVL[lvl] * 100)}% chance of improving an attribute, a 27-year-old ${Math.round(TRAIN_LVL[lvl] * trainAgeF(27) * 100)}%. Nobody trains past their potential.</p>         ${lvl < 5 ? `<button class="btn ghost sm" id="upTr">Upgrade to level ${lvl + 1} — ${money(cost)}</button>` : '<span class="hint">Top of the range.</span>'}       </div></div>       <div class="panel"><h3>Weekly drill focus</h3><div class="pad">         <div class="chipbar" style="padding:0 0 8px">${Object.entries(TRAIN_FOCUS).map(([k, x]) => `<button class="chip" data-drill="${k}" aria-pressed="${drill === k}">${x.name}</button>`).join('')}</div>         <p class="hint" style="margin:0">Balanced trains what suits each player's position. A focus makes that attribute three times as likely to improve (goalkeepers train their own skills regardless).</p>       </div></div>     </div>     <div class="panel"><h3>${rep && rep.team === t.id ? `Week ${rep.round} report` : 'Training report'}<span class="sub">${rep ? esc(rep.drill) + ' drills · ' : ''}${items.length} improved</span></h3>       ${rows || '<div class="empty">Nobody improved yet. Reports appear after your next matchday.</div>'}</div>     <div class="panel"><h3>Individual focus<span class="sub">override the team drill for one player · goalkeepers always train their own skills</span></h3><div class="pad">       ${t.squad.filter(p => p.pos !== 'GK').map(p => `<div class="rolerow"><span class="who"><b>${esc(p.last || p.name)}</b><small>${p.pos} · ${p.age} · potential ${potTxt(p)}</small></span><span class="tacch">         <select data-pfocus="${p.id}"><option value="" ${!p.focus ? 'selected' : ''}>Team drill (${(TRAIN_FOCUS[drill] || TRAIN_FOCUS.balanced).name})</option>${Object.keys(TRAIN_FOCUS).filter(k => k !== 'balanced').map(k => `<option value="${k}" ${p.focus === k ? 'selected' : ''}>${TRAIN_FOCUS[k].name}</option>`).join('')}</select>       </span></div>`).join('')}     </div></div>     <div class="panel"><h3>Biggest risers this season<span class="sub">rating gained since August</span></h3>       ${risers.length ? risers.map(p => playerRow(p, t)).join('') : '<div class="empty">No one has moved up yet.</div>'}</div>`;   const u = $('#upTr'); if (u) u.onclick = () => { const r = upgradeTraining(G); toast(r.msg); if (r.ok) { save(); render(); } };   v.querySelectorAll('[data-drill]').forEach(b => b.onclick = () => { const r = setDrill(G, b.dataset.drill); toast(r.msg); save(); viewTraining(); });   v.querySelectorAll('[data-pfocus]').forEach(sel => sel.onchange = () => { const p = t.squad.find(x => x.id === +sel.dataset.pfocus); if (!p) return; p.focus = sel.value || null; save(); });   bindYhTabs(v);   bindPlayerRows(v); } function viewTrainingOld() {   const v = $('#v-training'), t = me();   const lvl = t.training || 1, cost = TRAIN_COST[lvl] || 0, drill = t.drill || 'balanced';   const rep = G.lastTraining;   const items = (rep && rep.team === t.id ? rep.items : []).slice().sort((a, b) => (b.rise - a.rise));   const rows = items.map(it => {     const p = t.squad.find(x => x.id === it.pid) || t.youth.find(x => x.id === it.pid); if (!p) return '';     return `<button class="prow" data-pid="${p.id}" style="grid-template-columns:auto auto 1fr auto">       ${faceSVG(p, 34, t.c1)}${ratingTag(p.rating)}       <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · ${p.age} · potential ${p.pot}</small></span>       <span style="text-align:right"><b style="color:#3ddc84">▲ ${it.attr}</b>${it.rise ? '<br><small class="up">+1 overall</small>' : ''}</span></button>`;   }).join('');   v.innerHTML = `<div class="cols">     <div class="panel"><h3>Training ground<span class="sub">level ${lvl} of 5</span></h3><div class="pad">       <div class="bar"><i style="width:${lvl * 20}%"></i></div>       <p class="hint" style="margin:8px 0 6px">Drills run once a week, every matchday. Each week a teenager has a ${Math.round(TRAIN_LVL[lvl] * 100)}% chance of improving an attribute, a 27-year-old ${Math.round(TRAIN_LVL[lvl] * trainAgeF(27) * 100)}%. Nobody trains past their potential.</p>       ${lvl < 5 ? `<button class="btn ghost sm" id="upTr">Upgrade to level ${lvl + 1} — ${money(cost)}</button>` : '<span class="hint">Top of the range.</span>'}     </div></div>     <div class="panel"><h3>Weekly drill focus</h3><div class="pad">       <div class="chipbar">${Object.entries(TRAIN_FOCUS).map(([k, x]) => `<button class="chip" data-drill="${k}" aria-pressed="${drill === k}">${x.name}</button>`).join('')}</div>       <p class="hint" style="margin:8px 0 0">Balanced trains what suits each player's position. A focus makes that attribute three times as likely to improve (goalkeepers train their own skills regardless).</p>     </div></div>   </div>   <div class="panel"><h3>${rep && rep.team === t.id ? `Week ${rep.round} report` : 'Training report'}<span class="sub">${rep ? esc(rep.drill) + ' drills · ' : ''}${items.length} improved</span></h3>     ${rows || '<div class="empty">Nobody improved yet. Reports appear after your next matchday.</div>'}</div>`;   const u = $('#upTr'); if (u) u.onclick = () => { const r = upgradeTraining(G); toast(r.msg); if (r.ok) { save(); render(); } };   v.querySelectorAll('[data-drill]').forEach(b => b.onclick = () => { const r = setDrill(G, b.dataset.drill); toast(r.msg); save(); viewTraining(); });   bindPlayerRows(v); }  /* ---------------- Youth Academy ---------------- */
let youthTab = 'academy';  function yhTabsHTML(t) {   return `<div class="mb-tabs sqtabs">     <button data-yht="academy" class="${youthTab === 'academy' ? 'on' : ''}">Academy</button>     <button data-yht="centre" class="${youthTab === 'centre' ? 'on' : ''}">Development Centre</button>     <button data-yht="scouting" class="${youthTab === 'scouting' ? 'on' : ''}">Scouting</button>     <button data-yht="alumni" class="${youthTab === 'alumni' ? 'on' : ''}">Alumni</button>     <button data-yht="training" class="${youthTab === 'training' ? 'on' : ''}">Training</button>     <span class="sp"></span><button class="mini" id="yhSquad">Squad</button></div>`; } function lvlPips(n) { return `<div class="lvl">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`; } function bindYhTabs(v) {   v.querySelectorAll('[data-yht]').forEach(b => b.onclick = () => { youthTab = b.dataset.yht; viewYouthHub(); window.scrollTo({ top: 0 }); });   const s = v.querySelector('#yhSquad'); if (s) s.onclick = () => goTo('squad'); }  function viewYouthHub() {   const v = $('#v-youth'); v.classList.add('mmx', 'sqv');   if (youthTab === 'training') viewTraining(); else if (youthTab === 'centre') viewDevCentre(); else if (youthTab === 'scouting') viewScoutNet(); else if (youthTab === 'alumni') viewAlumni(); else viewYouth(); } function scoutPips(n) { return `<div class="lvl">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`; } function viewScoutNet() {   const v = $('#v-youth'), t = me(), net = ensureScoutNet(t);   const regions = Object.keys(SCOUT_REGION_NAMES);   v.innerHTML = yhTabsHTML(t) +     sqTiles(regions.map(r => [SCOUT_REGION_NAMES[r], `${net[r] || 0}/${SCOUTNET_MAX}`])) +     `<div class="panel"><h3>Scouting network<span class="sub">invest to shift where your academy and development centre find foreign talent</span></h3><div class="pad">       <p class="hint" style="margin:0 0 10px">Every region produces some interest on its own, but a region you've invested in turns up far more often — and its prospects arrive with a little extra potential, reflecting the contacts you've built on the ground there.</p>       ${regions.map(r => { const lvl = net[r] || 0, cost = SCOUTNET_COST[lvl + 1]; return `<div class="rolerow"><span class="who"><b>${SCOUT_REGION_NAMES[r]}</b><small>${SCOUT_REGION_DESC[r]}</small></span><span class="tacch" style="align-items:center;gap:8px">${scoutPips(lvl)}${lvl < SCOUTNET_MAX ? `<button class="btn ghost sm" data-scoutup="${r}">Expand — ${money(cost)}</button>` : '<span class="hint">Fully scouted</span>'}</span></div>`; }).join('')}     </div></div>`;   v.querySelectorAll('[data-scoutup]').forEach(b => b.onclick = () => { const before = t.budget; const r = upgradeScoutRegion(G, b.dataset.scoutup); if (r.ok) { showMoneyEffect('Scouting expanded', before, t.budget, 'var(--down)', () => { toast(r.msg); save(); render(); }); } else toast(r.msg); });   bindYhTabs(v); } function viewDevCentre() {   const v = $('#v-youth'), t = me(), d = ensureDev(G, t);   const lvl = t.academy || 1, max = DEV_MAXCAP[lvl] || 3, cap = Math.min(d.cap, max);   const all = d.u11.concat(d.u13, d.u15, d.grad);   const best = all.length ? all.slice().sort((a, b) => b.pot - a.pot)[0] : null;   const kidRow = (p, grad) => `<div class="prow" style="grid-template-columns:auto auto 1fr auto auto">       ${faceSVG(p, 34, t.c1)}${ratingTag(p.rating)}       <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${p.age} years old · potential <b class="potglow">${potTxt(p)}</b> · ${youthTrend(p)}</small></span>       ${grad ? `<button class="btn sm" data-dpro="${p.id}">Promote to academy</button>` : `<span class="hint" style="align-self:center">Eligible at 16</span>`}       <button class="btn ghost sm" data-drel="${p.id}">Release</button></div>`;   const groupPanel = g => `<div class="panel"><h3>${g.label}<span class="sub">ages ${g.ages}${lvl >= g.unlock ? ` · ${d[g.key].length}/${cap}` : ''}</span></h3>` +     (lvl < g.unlock ? `<div class="empty">Unlocks at academy level ${g.unlock}.</div>`       : d[g.key].length ? d[g.key].slice().sort((a, b) => b.pot - a.pot).map(p => kidRow(p, false)).join('') : '<div class="empty">New recruits arrive each summer.</div>') + `</div>`;   v.innerHTML = yhTabsHTML(t) +     sqTiles([['Academy level', `${lvl}/5`], ['Youngsters', all.length], ['Per age group', `${cap}/${max}`], ['Best potential', best != null ? potTxt(best) : '—']]) +     `${leaversPanelHTML(t)}<div class="panel"><h3>Development centre<span class="sub">feeds the academy</span></h3><div class="pad">       <p class="hint" style="margin:0 0 10px">Recruit boys at 11, 13 and 15 and bring them through. Potential is visible from day one, but they have no face until they turn 16 \u2014 that is when they can join the academy, and from there the first team. A stronger academy unlocks more age groups, a bigger centre and bigger yearly intakes.</p>       <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span>Youngsters per age group</span>         <button class="btn ghost sm" data-dcap="-1">\u2212</button><b>${cap}</b><button class="btn ghost sm" data-dcap="1">+</button>         <span class="hint">max ${max} at academy level ${lvl}</span></div>     </div></div>     <div class="panel"><h3>Ready for the academy<span class="sub">turned 16 · promote this season or they leave</span></h3>` +       (d.grad.length ? d.grad.slice().sort((a, b) => b.pot - a.pot).map(p => kidRow(p, true)).join('') : '<div class="empty">Nobody has turned 16 yet.</div>') + `</div>` +     DEV_GROUPS.map(groupPanel).join('');   v.querySelectorAll('[data-dcap]').forEach(b => b.onclick = () => { setDevCap(G, +b.dataset.dcap); save(); viewDevCentre(); });   v.querySelectorAll('[data-dpro]').forEach(b => b.onclick = () => { const r = promoteDev(G, +b.dataset.dpro); toast(r.msg); if (r.ok) { save(); viewDevCentre(); } });   v.querySelectorAll('[data-drel]').forEach(b => b.onclick = () => { releaseDev(G, +b.dataset.drel); save(); viewDevCentre(); });   bindYhTabs(v); } function viewYouth() {   const v = $('#v-youth'), t = me();   const cost = [0, 6, 12, 22, 36][t.academy] || 0;   const bestPot = t.youth.length ? potTxt(t.youth.slice().sort((a, b) => b.pot - a.pot)[0]) : null;   const wageBill = t.youth.reduce((s, p) => s + p.wage, 0);   const u23 = t.squad.filter(p => p.age <= 23).sort((a, b) => b.pot - a.pot);   const full = typeof firstTeamFull === 'function' && firstTeamFull(t);   v.innerHTML = yhTabsHTML(t) +     sqTiles([['Academy level', `${t.academy}/5`], ['Prospects', t.youth.length], ['Best potential', bestPot != null ? bestPot : '—'], ['Academy wages', money(wageBill)], ['Under 23s in squad', u23.length]]) +     `<div class="cols">       <div class="panel"><h3>Youth academy<span class="sub">${t.youthClub ? 'a club built on youth' : 'level ' + t.academy + ' of 5'}</span></h3><div class="pad">         ${lvlPips(t.academy)}         <p class="hint" style="margin:8px 0 10px">A stronger academy produces more prospects, and better ones. Intake arrives at the start of each season.</p>         ${t.academy < 5 ? `<button class="btn ghost sm" id="upAc">Upgrade to level ${t.academy + 1} — ${money(cost)}</button>` : '<span class="hint">Top of the range.</span>'}       </div></div>       <div class="panel"><h3>Running cost</h3><dl class="kv" style="padding:11px 13px">         <dt>Prospects</dt><dd>${t.youth.length}</dd>         <dt>Best potential</dt><dd><b class="potglow">${bestPot != null ? bestPot : '—'}</b></dd>         <dt>Wage bill</dt><dd>${money(wageBill)}/season</dd>       </dl></div>     </div>     ${leaversPanelHTML(t)}<div class="panel"><h3>This year's intake<span class="sub">${t.youth.length} prospect${t.youth.length === 1 ? '' : 's'}</span></h3>` +       (t.youth.length ? t.youth.slice().sort((a, b) => b.pot - a.pot).map(p =>         `<div class="prow" style="grid-template-columns:auto auto 1fr auto auto">           ${faceSVG(p, 34, t.c1)}${ratingTag(p.rating)}           <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${[p.pos].concat(p.alt || []).join('/')} · ${p.age} years old · potential <b class="potglow">${potTxt(p)}</b> · ${youthTrend(p)} · ${money(p.wage)}/season</small></span>           <button class="btn sm" data-promote="${p.id}">${full ? 'Promote to reserves' : 'Promote'}</button>           <button class="btn ghost sm" data-drop="${p.id}">Release</button></div>`).join('')         : '<div class="empty">The next intake arrives when the new season starts.</div>') + `</div>     <div class="panel"><h3>Under 23s in the senior squad<span class="sub">sorted by potential</span></h3>` +       (u23.length ? u23.map(p => playerRow(p, t)).join('') : '<div class="empty">No youngsters in the senior squad.</div>') + `</div>`;   const u = $('#upAc'); if (u) u.onclick = () => { const before = t.budget; const r = upgradeAcademy(G); if (r.ok) { showMoneyEffect('Academy upgraded', before, t.budget, 'var(--down)', () => { toast(r.msg); save(); render(); }); } else toast(r.msg); };   v.querySelectorAll('[data-promote]').forEach(b => b.onclick = () => { const r = promoteYouth(G, +b.dataset.promote); toast(r.msg); if (r.ok) { save(); render(); } });   v.querySelectorAll('[data-drop]').forEach(b => b.onclick = () => { releaseYouth(G, +b.dataset.drop); save(); render(); });   bindYhTabs(v);   bindPlayerRows(v); } function viewYouthOld() {
  const v = $('#v-youth'), t = me();
  const cost = [0, 6, 12, 22, 36][t.academy] || 0;
  const bestPot = t.youth.length ? potTxt(t.youth.slice().sort((a, b) => b.pot - a.pot)[0]) : null;
  const wageBill = t.youth.reduce((s, p) => s + p.wage, 0);
  v.innerHTML = `<div class="cols">
    <div class="panel"><h3>Youth academy<span class="sub">level ${t.academy} of 5${t.youthClub ? ' · a club built on youth' : ''}</span></h3>
    <div class="pad">
      <div class="bar"><i style="width:${t.academy * 20}%"></i></div>
      <p class="hint" style="margin:8px 0 10px">A stronger academy produces more prospects, and better ones. Intake arrives at the start of each season.</p>
      ${t.academy < 5 ? `<button class="btn ghost sm" id="upAc">Upgrade to level ${t.academy + 1} — ${money(cost)}</button>` : '<span class="hint">Top of the range.</span>'}
    </div></div>
    <div class="panel"><h3>Running cost</h3><dl class="kv" style="padding:11px 13px">
      <dt>Prospects</dt><dd>${t.youth.length}</dd>
      <dt>Best potential</dt><dd><b class="potglow">${bestPot != null ? bestPot : '—'}</b></dd>
      <dt>Wage bill</dt><dd>${money(wageBill)}/season</dd>
    </dl></div>
  </div>
  <div class="panel"><h3>This year's intake<span class="sub">${t.youth.length} prospect${t.youth.length === 1 ? '' : 's'}</span></h3>` +
    (t.youth.length ? t.youth.slice().sort((a, b) => b.pot - a.pot).map(p =>
      `<div class="prow" style="grid-template-columns:auto auto 1fr auto auto">
        ${faceSVG(p, 34, t.c1)}${ratingTag(p.rating)}
        <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · ${p.age} years old · potential <b class="potglow">${p.pot}</b> · ${money(p.wage)}/season</small></span>
        <button class="btn sm" data-promote="${p.id}">Promote</button>
        <button class="btn ghost sm" data-drop="${p.id}">Release</button></div>`).join('')
      : '<div class="empty">The next intake arrives when the new season starts.</div>') + `</div>
  <div class="panel"><h3>Under 23s in the senior squad</h3>` +
    (t.squad.filter(p => p.age <= 23).length
      ? t.squad.filter(p => p.age <= 23).sort((a, b) => b.pot - a.pot).map(p => playerRow(p, t, p.pot)).join('')
      : '<div class="empty">No youngsters in the senior squad.</div>') + `</div>`;
  const u = $('#upAc'); if (u) u.onclick = () => { const before = t.budget; const r = upgradeAcademy(G); if (r.ok) { showMoneyEffect('Academy upgraded', before, t.budget, 'var(--down)', () => { toast(r.msg); save(); render(); }); } else toast(r.msg); };
  v.querySelectorAll('[data-promote]').forEach(b => b.onclick = () => { const r = promoteYouth(G, +b.dataset.promote); toast(r.msg); if (r.ok) { save(); render(); } });
  v.querySelectorAll('[data-drop]').forEach(b => b.onclick = () => { releaseYouth(G, +b.dataset.drop); save(); render(); });
  bindPlayerRows(v);
}

/* ---------------- training ---------------- */ const TRAIN_COST = [0, 5, 10, 18, 30];                 /* cost to go from level N to N+1 */ const TRAIN_LVL  = [0, 0.08, 0.13, 0.19, 0.26, 0.33];  /* weekly chance a young player improves */ const TRAIN_FOCUS = {   balanced:  { name: 'Balanced',  idx: null },   finishing: { name: 'Finishing', idx: [1] },   passing:   { name: 'Passing',   idx: [2] },   dribbling: { name: 'Dribbling', idx: [3] },   defending: { name: 'Defending', idx: [4] },   fitness:   { name: 'Fitness',   idx: [0, 5] } }; function trainAgeF(a) { return a <= 19 ? 1 : a <= 21 ? 0.9 : a <= 23 ? 0.7 : a <= 25 ? 0.45 : a <= 28 ? 0.2 : a <= 31 ? 0.08 : 0.02; } function trainLevel(G, t) { return t.id === G.myTeam ? (t.training || 1) : (t.training || [3, 2, 2, 1, 1][t.tier] || 1); } function attrLabels(p) { return p.pos === 'GK' ? ['DIV','HAN','KIC','REF','SPD','POS'] : ['PAC','SHO','PAS','DRI','DEF','PHY']; }   function trainTeam(G, t, log) {   const lvl = trainLevel(G, t);   const teamFo = t.id === G.myTeam ? (TRAIN_FOCUS[t.drill || 'balanced'] || TRAIN_FOCUS.balanced).idx : null;   [t.squad, t.youth || [], ...(t.dev ? [t.dev.u11, t.dev.u13, t.dev.u15, t.dev.grad] : [])].forEach(list => list.forEach(p => {     if (p.inj > 0) return;     const room = p.pot - p.rating; if (room <= 0) return;     const chance = TRAIN_LVL[lvl] * trainAgeF(p.age) * Math.min(1, room / 5) * (p.reserve ? 0.8 : 1);     if (rnd() > chance) return;     const gk = p.pos === 'GK', prof = ATTR_PROFILE[p.pos] || ATTR_PROFILE.CM;     const fo = t.id === G.myTeam && p.focus && TRAIN_FOCUS[p.focus] ? TRAIN_FOCUS[p.focus].idx : teamFo;     const w = [0, 1, 2, 3, 4, 5].map(i => {       let x = gk ? 1 : Math.max(0.4, 1 + prof[i] / 10);       if (!gk && fo && fo.includes(i)) x *= 3;       return x;     });     let r = rnd() * w.reduce((a, b) => a + b, 0), i = 0;     while (i < 5 && r > w[i]) { r -= w[i]; i++; }     p.tr = p.tr || [0, 0, 0, 0, 0, 0]; p.trLast = p.trLast || [0, 0, 0, 0, 0, 0];     p.tr[i]++; p.trLast[i] = G.round; p.trTicks = (p.trTicks || 0) + 1;     let rise = false;     if (p.trTicks >= 6 * ((p.trPaid || 0) + 1) && p.rating < p.pot) {       p.rating++; p.trPaid = (p.trPaid || 0) + 1; p.value = valueOf(p); rise = true; if (p.age <= 17 && rnd() < 0.10 + 0.03 * lvl) p.pot = Math.min(95, p.pot + 1);     }     if (log) log.push({ pid: p.id, attr: attrLabels(p)[i], rise });   })); } function trainingTick(G) {   const log = [];   G.teams.forEach(t => trainTeam(G, t, t.id === G.myTeam ? log : null));   const my = G.teams[G.myTeam];   const tl = G.trainTally || { n: 0, up: 0, weeks: 0 };   tl.n += log.length; tl.up += log.filter(x => x.rise).length; tl.weeks++;   G.trainTally = tl;   G.lastTraining = { round: G.round, team: my.id, drill: (TRAIN_FOCUS[my.drill || 'balanced'] || TRAIN_FOCUS.balanced).name, items: log }; } function upgradeTraining(G) {   const t = G.teams[G.myTeam], lvl = t.training || 1;   if (lvl >= 5) return { ok: false, msg: 'Your training ground is already top of the range.' };   const cost = TRAIN_COST[lvl];   if (t.budget < cost) return { ok: false, msg: `You need ${money(cost)} to upgrade.` };   t.budget = Math.round((t.budget - cost) * 100) / 100;   t.fin.buys += cost;   t.training = lvl + 1;   return { ok: true, msg: `Training ground upgraded to level ${t.training}.` }; } function setDrill(G, key) {   if (!TRAIN_FOCUS[key]) return { ok: false, msg: 'Unknown drill.' };   G.teams[G.myTeam].drill = key;   return { ok: true, msg: `Drills set to ${TRAIN_FOCUS[key].name}.` }; }  /* ---------------- stats ---------------- */
let statTab = 'goals', statLimit = 20, totmMonth = null; function viewStats() {   const v = $('#v-stats'); v.classList.add('gst');   const tabs = [['goals', 'Goals'], ['assists', 'Assists'], ['cs', 'Clean sheets'], ['yellow', 'Yellow cards'], ['red', 'Red cards'], ['totm', 'Team of the Month']];   if (statTab === 'totm') {     const curBucket = Math.floor(G.round / 3);     const lastDone = Math.max(0, Math.ceil(G.round / 3) - 1);     if (totmMonth == null) totmMonth = lastDone;     if (totmMonth > curBucket) totmMonth = curBucket;     const pool = ratingPool(G, statTier, totmMonth);     const xi = pickFormationXI(pool);     const monthName = MONTH_NAMES[(SEASON_MONTH_START + totmMonth) % 12];     v.innerHTML = `<div class="gs-leagues">${[['all', 'All leagues']].concat([0, 1, 2, 3, 4].map(i => [i, TIER_SHORT[i]])).map(([k, l]) => `<button data-gl="${k}" class="${(k === 'all' ? statTier == null : statTier === k) ? 'on' : ''}">${l}</button>`).join('')}</div>       <div class="gs-tabs">${tabs.map(([k, l]) => `<button data-gt="${k}" class="${statTab === k ? 'on' : ''}">${l}</button>`).join('')}</div>       <div class="chipbar" style="margin:8px 0">${Array.from({ length: curBucket + 1 }, (_, i) => i).map(b => `<button class="chip" data-totmmo="${b}" aria-pressed="${totmMonth === b}">${MONTH_NAMES[(SEASON_MONTH_START + b) % 12]}</button>`).join('')}</div>       <h3 style="margin:4px 0 8px">${monthName} · ${statTier == null ? 'All leagues' : TIER_NAMES[statTier]}</h3>       ${xiCardsHTML(xi)}`;     v.querySelectorAll('[data-gl]').forEach(b => b.onclick = () => { statTier = b.dataset.gl === 'all' ? null : +b.dataset.gl; viewStats(); });     v.querySelectorAll('[data-gt]').forEach(b => b.onclick = () => { statTab = b.dataset.gt; statLimit = 20; viewStats(); });     v.querySelectorAll('[data-totmmo]').forEach(b => b.onclick = () => { totmMonth = +b.dataset.totmmo; viewStats(); });     v.querySelectorAll('[data-pid]').forEach(r => r.onclick = () => playerModal(+r.dataset.pid));     return;   }   const cur = tabs.find(x => x[0] === statTab) || tabs[0];   const byV = k => statList(G, statTier, k).sort((a, b) => b.v - a.v || a.p.apps - b.p.apps || (a.p.name < b.p.name ? -1 : 1));   const list = statTab === 'goals' ? topScorers(G, statTier, 600) : statTab === 'assists' ? topAssists(G, statTier, 600)     : statTab === 'cs' ? cleanSheets(G, statTier, 600) : byV(statTab);   let rank = 0;   list.forEach((x, i) => { if (i === 0 || x.v !== list[i - 1].v) rank = i + 1; x.rank = rank; });   const shown = list.slice(0, statLimit);   const rows = shown.map(x => `<button class="gs-row${x.club.id === G.myTeam ? ' mine' : ''}" data-pid="${x.p.id}">       <span class="gs-rank">${x.rank}</span>       <span class="gs-av">${faceSVG(x.p, 44, x.club.c1)}</span>       <span><span class="gs-name">${esc(x.p.name)}</span><span class="gs-club">${crestHTML(x.club, 16)}<span>${esc(x.club.s)}</span></span></span>       <span class="gs-val">${x.v}</span></button>`).join('');   const teams = statTier == null ? [] : sortTable(G, statTier).map(r => G.teams[r.id]).sort((a, b) => teamOverall(b) - teamOverall(a));   v.innerHTML = `<div class="gs-leagues">${[['all', 'All leagues']].concat([0, 1, 2, 3, 4].map(i => [i, TIER_SHORT[i]]))       .map(([k, l]) => `<button data-gl="${k}" class="${(k === 'all' ? statTier == null : statTier === k) ? 'on' : ''}">${l}</button>`).join('')}</div>     <div class="gs-tabs">${tabs.map(([k, l]) => `<button data-gt="${k}" class="${statTab === k ? 'on' : ''}">${l}</button>`).join('')}</div>     <div class="gs-head"><span>Player</span><span>${cur[1]}</span></div>     ${rows || `<div class="gs-empty">${statTab === 'yellow' || statTab === 'red' ? 'No cards yet.' : 'Nothing to show until the ball starts rolling.'}</div>`}     ${list.length > statLimit ? `<button class="gs-more" id="gsMore">Show more (${list.length - statLimit})</button>` : ''}     ${teams.length ? `<div class="gs-sec">Team ratings · ${TIER_NAMES[statTier]}</div>       <table class="gs-tbl"><thead><tr><th>#</th><th>Club</th><th>XI</th><th>Squad</th><th>Budget</th></tr></thead><tbody>${teams.map((t, i) =>         `<tr class="${t.id === G.myTeam ? 'mine' : ''}"><td>${i + 1}</td><td>${esc(t.s)}</td><td>${teamOverall(t)}</td><td>${squadAverage(t)}</td><td>${money(t.budget)}</td></tr>`).join('')}</tbody></table>` : ''}`;   v.querySelectorAll('[data-gl]').forEach(b => b.onclick = () => { statTier = b.dataset.gl === 'all' ? null : +b.dataset.gl; statLimit = 20; viewStats(); });   v.querySelectorAll('[data-gt]').forEach(b => b.onclick = () => { statTab = b.dataset.gt; statLimit = 20; viewStats(); });   const mo = v.querySelector('#gsMore'); if (mo) mo.onclick = () => { statLimit += 20; viewStats(); };   v.querySelectorAll('[data-pid]').forEach(r => r.onclick = () => playerModal(+r.dataset.pid));   const on = v.querySelector('.gs-tabs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ inline: 'center', block: 'nearest' }); } function viewStatsOld() {
  const v = $('#v-stats');
  const sc = topScorers(G, statTier, 15), as = topAssists(G, statTier, 12), cs = cleanSheets(G, statTier, 10);
  const tbl = (list, cols) => list.length
    ? `<table class="tbl"><thead><tr><th class="pos">#</th><th>Player</th><th class="hide-s">Club</th>${cols.map(c => `<th>${c[0]}</th>`).join('')}</tr></thead><tbody>` +
      list.map((x, i) => `<tr class="${x.club.id === G.myTeam ? 'me' : ''} clickrow" data-pid="${x.p.id}" style="cursor:pointer">
        <td class="pos num">${i + 1}</td>
        <td><b>${esc(x.p.name)}</b> ${flagSVG(x.p.nat)}</td>
        <td class="hide-s" style="color:var(--dim)">${esc(x.club.s)}</td>
        ${cols.map(c => `<td class="num">${c[1] === 'v' ? x.v : c[1] === 'apps' ? appsTxt(x.p) : x.p[c[1]]}</td>`).join('')}</tr>`).join('') + '</tbody></table>'
    : '<div class="empty">Nothing to show until the ball starts rolling.</div>';
  const teams = sortTable(G, statTier).map(r => G.teams[r.id]).sort((a, b) => teamOverall(b) - teamOverall(a));
  v.innerHTML = `<div class="panel"><div class="chipbar"> ${[0,1,2,3,4].map(i => `<button class="chip" data-st="${i}" aria-pressed="${statTier === i}">${TIER_SHORT[i]}</button>`).join('')}</div></div>
    <div class="cols">
      <div class="panel"><h3>Golden Boot</h3>${tbl(sc, [['Apps','apps'],['A','assists'],['Goals','v']])}</div>
      <div>
        <div class="panel"><h3>Most assists</h3>${tbl(as, [['A','v']])}</div>
        <div class="panel"><h3>Clean sheets</h3>${tbl(cs, [['CS','v']])}</div>
      </div>
    </div>
    <div class="panel"><h3>Team ratings<span class="sub">${TIER_NAMES[statTier]}</span></h3>
      <table class="tbl"><thead><tr><th class="pos">#</th><th>Club</th><th>XI</th><th>Squad</th><th class="hide-s">Squad size</th><th>Budget</th></tr></thead><tbody>` +
    teams.map((t, i) => `<tr class="${t.id === G.myTeam ? 'me' : ''}"><td class="pos num">${i + 1}</td>
      <td><span class="team">${crestHTML(t, 15)}<span>${esc(t.s)}</span></span></td>
      <td class="num">${teamOverall(t)}</td><td class="num">${squadAverage(t)}</td>
      <td class="num hide-s">${t.squad.length}</td><td class="num">${money(t.budget)}</td></tr>`).join('') + `</tbody></table></div>`;
  v.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { statTier = +b.dataset.st; viewStats(); });
  v.querySelectorAll('tr[data-pid]').forEach(r => r.onclick = () => playerModal(+r.dataset.pid));
}

/* ---------------- news ---------------- */
function viewNews() {
  const v = $('#v-news');
  const kinds = [['ALL','Everything'],['transfer','Transfers'],['youth','Youth'],['retire','Retirements'],['contract','Contracts'],['season','Promotion'],['match','On the pitch'],['cup','Cups'],['caf','Africa'],['nation','National teams'],['career','Your career']];
  const items = G.news.filter(n => newsFilter === 'ALL' || n.kind === newsFilter);
  const NEWS_LABEL = { transfer: 'Transfer News', youth: 'Youth News', contract: 'Contract News', retire: 'Retirement', cup: 'Cup News', nation: 'National Team News', season: 'League News', career: 'Career News', match: 'Match News' };
  const feat = items.find(x => x.meta && x.meta.pid != null);
  let featHtml = '';
  if (feat) {
    const f = findPlayer(G, feat.meta.pid);
    if (f) {
      const fromT = feat.meta.fromId != null ? G.teams[feat.meta.fromId] : null;
      const toT = feat.meta.toId != null ? G.teams[feat.meta.toId] : null;
      featHtml = `<div class="hero newsFeat" data-pid="${feat.meta.pid}" style="cursor:pointer">
        ${faceSVG(f.p, 84, f.t ? f.t.c1 : null)}
        <div class="nf-body">
          <div class="k-badge k-${feat.kind}" style="display:inline-block;margin-bottom:6px">${NEWS_LABEL[feat.kind] || 'Breaking News'}</div>
          <h2>${esc(feat.text)}</h2>
          <div class="nf-move">
            ${fromT ? crestHTML(fromT, 26) : ''}${fromT && toT ? '<span class="arrow">→</span>' : ''}${toT ? crestHTML(toT, 26) : ''}
            <span>${seasonLabel(feat.season)} · MD${feat.round}</span>
          </div>
        </div>
      </div>`;
    }
  }
  v.classList.add('mmx');
  v.innerHTML = `${featHtml}<div class="panel"><h3>News<span class="sub">all three divisions</span></h3>
    <div class="chipbar">${kinds.map(([k, l]) => `<button class="chip" data-nf="${k}" aria-pressed="${newsFilter === k}">${l}</button>`).join('')}</div>
    ${newsList(items, 60)}</div>`;
  v.querySelectorAll('[data-nf]').forEach(b => b.onclick = () => { newsFilter = b.dataset.nf; viewNews(); });
  bindPlayerRows(v);
}

/* ---------------- cups ---------------- */
function cupRoundHTML(ties, names) {
  if (!ties || !ties.length) return '';
  const nm = (names || CUP_ROUNDS)[ties[0].stage] || 'Round';
  return `<h4 style="margin:14px 0 4px;font-size:17px">${nm}</h4>` +
    ties.map(t => `<div class="res"><div class="h ${t.winner === t.h ? 'w' : ''}">${esc(G.teams[t.h].s)}</div>
      <div class="sc num">${t.hg}–${t.ag}</div>
      <div class="a ${t.winner === t.a ? 'w' : ''}">${esc(G.teams[t.a].s)}${t.pens ? ` <span class="hint">(${t.pens[0]}–${t.pens[1]} pens)</span>` : ''}</div></div>`).join('');
}
function compPanel(comp, names, blurb) {
  if (!comp) return '';
  let html = `<div class="panel"><h3>${esc(comp.name || CUP_NAME)}<span class="sub">${blurb}</span></h3>`;
  if (comp.winner != null) {
    const w = G.teams[comp.winner];
    html += `<div class="pad" style="display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--line)">
      ${crestHTML(w, 34)}<div><b style="font-family:var(--head);font-size:21px">${esc(w.n)}</b>
      <div class="hint">Winners, ${seasonLabel(G.season)}</div></div></div>`;
  }
  html += comp.log && comp.log.length
    ? '<div class="pad" style="padding-top:0">' + comp.log.map(r => cupRoundHTML(r.ties, names)).join('') + '</div>'
    : '<div class="empty">Not started yet this season.</div>';
  return html + '</div>';
}
/* ---- Cups: a tab for every cup, each with a bracket, results and history ---- */ let cupSel = 'cup', cupSub = 'bracket', cupFull = false, _cbStyle = false; function cupInjectStyle() {   if (_cbStyle) return; _cbStyle = true;   const st = document.createElement('style');   st.textContent = `   .cbWrap{display:flex;gap:16px;overflow-x:auto;padding:12px 14px 16px;align-items:stretch;-webkit-overflow-scrolling:touch}   .cbCol{min-width:176px;flex:none;display:flex;flex-direction:column}   .cbCol h5{margin:0 0 8px;text-align:center;font:700 12px var(--head);letter-spacing:.1em;text-transform:uppercase;color:#9aa3ad}   .cbTies{flex:1;display:flex;flex-direction:column;justify-content:space-around;gap:10px}   .cbTie{background:#1b222b;border:1px solid #2f3a46;border-radius:6px;overflow:hidden}   .cbTie.me{border-color:#f2b928;box-shadow:0 0 0 1px rgba(242,185,40,.35)}   .cbRow{display:flex;align-items:center;gap:6px;padding:6px 8px;font-size:13px;color:#cdd3da}   .cbRow+.cbRow{border-top:1px solid #2f3a46}   .cbRow.w{color:#fff;font-weight:700;background:rgba(61,220,132,.09)}   .cbRow.l{opacity:.55}   .cbRow.tbd{color:#7b848e;font-style:italic}   .cbRow .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}   .cbRow b{font:700 15px var(--head)}   .cbNote{padding:2px 8px 4px;font-size:10.5px;color:#9aa3ad;text-align:right;border-top:1px solid #2f3a46}   .cbFinal .cbTie{border-color:#f2b928}`;   document.head.appendChild(st); } function cupRname(n) { return n === 2 ? 'Final' : n === 4 ? 'Semi-final' : n === 8 ? 'Quarter-final' : 'Round of ' + n; } function cupEk(e) { return e ? (e.sa ? 'S' : 'A') + e.id : ''; } /* the draw so far (played rounds), the round being drawn or played, and the empty rounds still to come */ function cupDomModel(key) {   const comp = key === 'cup' ? G.cup : key === 's8' ? G.super8 : G.knockout; if (!comp) return null;   const names = key === 'cup' ? CUP_ROUNDS : key === 's8' ? S8_ROUNDS : KO_ROUNDS, rounds = [];   (comp.log || []).forEach(r => rounds.push({ name: names[r.ties[0].stage] || cupRname(r.ties.length * 2), ties: r.ties.map(t => ({ a: t.h, b: t.a, sa: t.hg, sb: t.ag, pens: t.pens, w: t.winner, done: true })) }));   let n = 0;   if (comp.winner == null && !comp.done) {     const last = comp.log && comp.log.length ? comp.log[comp.log.length - 1].ties : [];     let pend = [], byes = 0;     if (key === 'cup') {       if (comp.pendingTies && comp.pendingTies.length && !comp.pendingTies.every(p => last.some(t => t.h === p.h && t.a === p.a))) { pend = comp.pendingTies.map(p => ({ a: p.h, b: p.a })); byes = (comp.pendingByes || []).length; }       else pend = Array.from({ length: Math.floor(comp.alive.length / 2) }, () => ({ a: null, b: null }));     } else { const al = comp.alive; for (let i = 0; i + 1 < al.length; i += 2) pend.push({ a: al[i], b: al[i + 1] }); if (al.length % 2) byes = 1; }     if (pend.length) { rounds.push({ name: names[comp.stage] || cupRname(pend.length * 2), ties: pend.map(p => ({ a: p.a, b: p.b, w: null })), pending: true }); n = pend.length + byes; }   }   const clean = n > 0 && (n & (n - 1)) === 0; let fj = 0;   /* an uneven field (byes) gets plain round labels */   while (n > 1) {     const k = Math.floor(n / 2), prev = rounds[rounds.length - 1]; fj++;     rounds.push({ name: clean ? cupRname(n) : (n === 2 ? 'Final' : 'Later round ' + fj), ties: Array.from({ length: k }, (_, j) => key === 'cup' ? { a: null, b: null, w: null } : { a: prev && prev.ties[2 * j] ? prev.ties[2 * j].w : null, b: prev && prev.ties[2 * j + 1] ? prev.ties[2 * j + 1].w : null, w: null }), future: true });     n = k + (n % 2);   }   return { comp, rounds, winner: comp.winner }; } function cupConModel(key) {   const c = G.africa && G.africa[key]; if (!c) return null;   const rounds = [];   (c.log || []).forEach(r => rounds.push({ name: CAF_ROUNDS[r.stage] || 'Round', ties: r.ties.filter(t => !t.bye).map(t => ({ ea: t.a, eb: t.b, sa: t.aggA, sb: t.aggB, pens: !!t.pens, w: cupEk(t.winner) === cupEk(t.a) ? 'a' : cupEk(t.winner) === cupEk(t.b) ? 'b' : null, done: true })) }));   if (!c.winner && c.alive && c.alive.length > 1 && !c.log.length) {     let n = c.alive.length; while (n > 1) { rounds.push({ name: cupRname(n), ties: Array.from({ length: Math.floor(n / 2) }, () => ({})), future: true }); n = Math.floor(n / 2); }   } else if (!c.winner && rounds.length) {     let n = Math.floor(rounds[rounds.length - 1].ties.length); while (n > 1) { n = Math.floor(n / 2); rounds.push({ name: cupRname(n * 2), ties: Array.from({ length: n }, () => ({})), future: true }); }   }   return { comp: c, rounds, winner: c.winner }; } function cupTieHTML(t) {   const dom = !t.ea && !t.eb;   const part = (id, e, sc, win, lose) => {     const known = dom ? id != null : !!e;     const nm = known ? (dom ? G.teams[id].s : cafShort(G, e)) : 'TBD';     const crest = known ? (dom ? crestHTML(G.teams[id], 14) : (e.sa ? crestHTML(G.teams[e.id], 14) : flagSVG(afrLeagueOf(G, e.id).nat, 14))) : '<span style="width:14px"></span>';     return `<div class="cbRow ${win ? 'w' : ''} ${lose ? 'l' : ''} ${known ? '' : 'tbd'}">${crest}<span class="nm">${esc(nm)}</span><b>${t.done || sc != null ? (sc == null ? '' : sc) : ''}</b></div>`;   };   const wa = dom ? t.w != null && t.w === t.a : t.w === 'a', wb = dom ? t.w != null && t.w === t.b : t.w === 'b';   const mine = dom && (t.a === G.myTeam || t.b === G.myTeam);   const pens = t.pens ? (Array.isArray(t.pens) ? `pens ${t.pens[0]}–${t.pens[1]}` : 'on penalties') : '';   return `<div class="cbTie ${mine ? 'me' : ''}">${part(t.a, t.ea, t.sa, wa, wb)}${part(t.b, t.eb, t.sb, wb, wa)}${pens ? `<div class="cbNote">${pens}</div>` : ''}</div>`; } function cupBracketHTML(m, blurb) {   const rounds = cupFull ? m.rounds : m.rounds.slice(-4);   let next = null; m.rounds.some(r => r.ties.some(t => { if (!t.done && !t.ea && (t.a === G.myTeam || t.b === G.myTeam) && t.a != null && t.b != null) { next = { t, r }; return true; } return false; }));   const champ = m.winner != null ? (typeof m.winner === 'object' ? cafName(G, m.winner) : G.teams[m.winner] ? G.teams[m.winner].n : m.winner) : null;   const head = `<div class="pad" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-bottom:1px solid var(--line)"><span class="hint" style="flex:1;min-width:160px">${esc(blurb)}</span>${m.rounds.length > 4 ? `<button class="chip" id="cbFull" aria-pressed="${cupFull}">${cupFull ? 'Last four rounds' : 'Full draw'}</button>` : ''}</div>`;   const win = champ ? `<div class="pad" style="border-bottom:1px solid var(--line)"><b style="font:700 21px var(--head)">🏆 ${esc(champ)}</b><div class="hint">Winners, ${seasonLabel(G.season)}</div></div>` : '';   const mine = next ? `<div class="pad" style="border-bottom:1px solid var(--line);color:#f2b928">Your next tie: <b>${esc(G.teams[next.t.a].s)} v ${esc(G.teams[next.t.b].s)}</b> · ${esc(next.r.name)}</div>` : '';   if (!rounds.length) return head + '<div class="empty">The draw has not been made yet.</div>';   return head + win + mine + `<div class="cbWrap">${rounds.map((r, i) => `<div class="cbCol ${i === rounds.length - 1 ? 'cbFinal' : ''}"><h5>${esc(r.name)}</h5><div class="cbTies">${r.ties.map(cupTieHTML).join('')}</div></div>`).join('')}</div>`; } function cupHistoryHTML(key, name) {   let rows = [];   if (key === 'caf' || key === 'confed') rows = ((G.africa && G.africa[key === 'caf' ? 'cafHistory' : 'confedHistory']) || []).map(h => ({ season: h.season, w: h.winner, id: null }));   else { const f = { cup: 'cup', s8: 's8', ko: 'ko' }[key]; rows = (G.records.seasons || []).filter(s => s[f] != null && G.teams[s[f]]).map(s => ({ season: s.season, w: G.teams[s[f]].n, id: s[f] })); }   if (!rows.length) return `<div class="empty">No finished seasons yet. Every winner of the ${esc(name)} will be listed here.</div>`;   const cnt = {}; rows.forEach(r => { cnt[r.w] = (cnt[r.w] || 0) + 1; });   const best = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).slice(0, 5);   return `<div class="pad" style="border-bottom:1px solid var(--line)"><div class="hint" style="margin-bottom:4px">Most titles</div>${best.map(w => `<div style="display:flex;justify-content:space-between;padding:3px 0"><span>${esc(w)}</span><b style="font:700 17px var(--head);color:#f2b928">${cnt[w]}</b></div>`).join('')}</div>     <table class="tbl"><thead><tr><th>Season</th><th>Winners</th></tr></thead><tbody>${rows.slice().reverse().map(r => `<tr><td>${seasonLabel(r.season)}</td><td>${r.id != null ? crestHTML(G.teams[r.id], 15) + ' ' : ''}${esc(r.w)}</td></tr>`).join('')}</tbody></table>`; } function viewCups() {   const v = $('#v-cups'); v.classList.add('mmx', 'sqv'); cupInjectStyle();   const list = [['cup', CUP_NAME, 'all 100 clubs, straight knockout'], ['s8', SUPER8, 'last season\'s top eight, early doors'], ['ko', KNOCKOUT, 'the top two divisions, mid-season'], ['caf', CAF_NAME, 'Africa\'s best clubs, 16 teams'], ['confed', CONFED_NAME, 'the second continental prize']];   const cur = list.find(x => x[0] === cupSel) || list[0];   const bar = `<div class="mb-tabs sqtabs">${list.map(([k, l]) => `<button data-cup="${k}" class="${cupSel === k ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>`;   const bar2 = `<div class="mb-tabs sqtabs" style="margin-top:4px">${[['bracket', 'Bracket'], ['results', 'Results'], ['history', 'History']].map(([k, l]) => `<button data-cps="${k}" class="${cupSub === k ? 'on' : ''}">${l}</button>`).join('')}</div>`;   const cont = cur[0] === 'caf' || cur[0] === 'confed';   let body;   if (cupSub === 'bracket') { const m = cont ? cupConModel(cur[0]) : cupDomModel(cur[0]); body = `<div class="panel"><h3>${esc(cur[1])}<span class="sub">bracket</span></h3>${m ? cupBracketHTML(m, cur[2]) : '<div class="empty">Not available.</div>'}</div>`; }   else if (cupSub === 'results') {     body = cur[0] === 'cup' ? compPanel({ name: CUP_NAME, winner: G.cup.winner, log: G.cup.log }, CUP_ROUNDS, cur[2])       : cur[0] === 's8' ? compPanel(G.super8, S8_ROUNDS, cur[2]) : cur[0] === 'ko' ? compPanel(G.knockout, KO_ROUNDS, cur[2])       : continentalPanel(cur[0], cur[1], cur[0] === 'caf' ? 'cafHistory' : 'confedHistory', cur[0] === 'caf' ? 'Champions of Africa' : 'African Football Cup winners');   } else body = `<div class="panel"><h3>${esc(cur[1])}<span class="sub">past winners</span></h3>${cupHistoryHTML(cur[0], cur[1])}</div>`;   v.innerHTML = bar + bar2 + body;   v.querySelectorAll('[data-cup]').forEach(b => b.onclick = () => { cupSel = b.dataset.cup; viewCups(); });   v.querySelectorAll('[data-cps]').forEach(b => b.onclick = () => { cupSub = b.dataset.cps; viewCups(); });   const f = v.querySelector('#cbFull'); if (f) f.onclick = () => { cupFull = !cupFull; viewCups(); }; }
function viewCupsOld() {
  const v = $('#v-cups');
  v.classList.add('mmx');
  const nedb = { name: CUP_NAME, winner: G.cup.winner, log: G.cup.log };
  v.innerHTML =
    compPanel(nedb, CUP_ROUNDS, 'all 100 clubs, straight knockout') +
    compPanel(G.super8, S8_ROUNDS, 'last season\'s top eight, early doors') +
    compPanel(G.knockout, KO_ROUNDS, 'the top two divisions, mid-season') +
    continentalPanel('caf', CAF_NAME, 'cafHistory', 'Champions of Africa') +
    continentalPanel('confed', CONFED_NAME, 'confedHistory', 'African Football Cup winners');
}

function continentalPanel(key, name, historyKey, historyLabel) {
  const c = G.africa && G.africa[key];
  if (!c) return '';
  let html = `<div class="panel"><h3>${name}<span class="sub">16 clubs${key === 'caf' ? ' — 1st & 2nd from the Premier League, plus African champions and runners-up' : ' — 3rd, 4th & 5th from the Premier League, plus African runners-up and third-place finishers'}</span></h3>`;
  if (c.winner) {
    html += `<div class="pad" style="border-bottom:1px solid var(--line)">
      <b style="font-family:var(--head);font-size:21px">${esc(cafName(G, c.winner))}</b>
      <div class="hint">${historyLabel}, ${seasonLabel(G.season)}</div></div>`;
  }
  if (!c.log.length) {
    html += `<div class="pad"><p class="hint" style="margin:0 0 8px">Entrants this season:</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${c.alive.map(e =>
        `<span class="tag" style="padding:4px 8px">${e.sa ? crestHTML(G.teams[e.id], 14) : flagSVG(afrLeagueOf(G, e.id).nat, 14)} ${esc(cafShort(G, e))}</span>`).join('')}</div></div>`;
  } else {
    html += '<div class="pad" style="padding-top:0">' + c.log.map(r =>
      `<h4 style="margin:14px 0 4px;font-size:17px">${CAF_ROUNDS[r.stage]}</h4>` +
      r.ties.map(t => t.bye ? '' : `<div class="res">
        <div class="h ${t.winner === t.a ? 'w' : ''}">${esc(cafShort(G, t.a))}</div>
        <div class="sc num">${t.aggA}–${t.aggB}</div>
        <div class="a ${t.winner === t.b ? 'w' : ''}">${esc(cafShort(G, t.b))}${t.pens ? ` <span class="hint">(pens)</span>` : ''}</div></div>`).join('')
    ).join('') + '</div>';
  }
  if (G.africa[historyKey] && G.africa[historyKey].length) {
    html += `<table class="tbl"><thead><tr><th>Season</th><th>${historyLabel}</th></tr></thead><tbody>` +
      G.africa[historyKey].slice().reverse().slice(0, 12).map(h => `<tr><td>${seasonLabel(h.season)}</td><td>${esc(h.winner)}</td></tr>`).join('') + '</tbody></table>';
  }
  return html + '</div>';
}

/* ---------------- Africa ---------------- */
let afrTab = 'rank';
let afrPick = 0;
let afrClubPick = null;
function afrClubSquadPanel(G, id) {
  const t = buildForeignClub(G, id);
  if (!t) return '';
  const sq = t.squad.slice().sort((a, b) => b.rating - a.rating);
  return `<div class="panel"><h3>${esc(t.n)}<span class="sub">${esc(natName(t.nat))} · XI rated ${teamOverall(t)}</span></h3>
    <div class="kits">
      <div class="kitBigWrap">${bigKitSVG(t, false, 132)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><small>Home</small></div>
      <div class="kitBigWrap">${bigKitSVG(t, true, 132)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><small>Away</small></div>
      <div class="kit" style="align-self:center">${crestHTML(t, 56)}<small>Badge</small></div>
    </div>
    ${sq.map(p => playerRow(p, t)).join('')}</div>`;
}
function viewAfrica() {
  const v = $('#v-africa'), A = G.africa;
  v.classList.add('mmx', 'sqv');
  const L = A.leagues[afrPick];
  const st = afrTable(L);
  const cafHist = A.cafHistory && A.cafHistory.length ? A.cafHistory[A.cafHistory.length - 1] : null;
  const cfHist = A.confedHistory && A.confedHistory.length ? A.confedHistory[A.confedHistory.length - 1] : null;
  const saBest = G.teams.filter(t => t.tier === 0).sort((a, b) => teamOverall(b) - teamOverall(a))[0];
  const tabs = [['rank', 'Rankings'], ['tables', 'League tables'], ['caf', 'Champions League'], ['confed', 'Football Cup']];
  const tabBar = `<div class="mb-tabs sqtabs">${tabs.map(([k, l]) => `<button data-aft="${k}" class="${afrTab === k ? 'on' : ''}">${l}</button>`).join('')}
    <span class="sp"></span><button class="mini" id="afNations">Nations</button></div>`;
  const rankRows = [{ sa: true, name: TIER_NAMES[0], rating: teamOverall(saBest), club: saBest.s, nat: 'ZA' }]
    .concat(A.leagues.map(x => { const top = x.clubs.slice().sort((a, b) => b.rating - a.rating)[0]; return { name: x.name, rating: top.rating, club: top.n, nat: x.nat }; }))
    .sort((a, b) => b.rating - a.rating);
  const saRank = rankRows.findIndex(r => r.sa) + 1;
  const tiles = sqTiles([['African leagues', rankRows.length], ['Your league ranks', '#' + saRank],
    ['Champions of Africa', cafHist ? esc(cafHist.winner) : '—'], ['African Football Cup', cfHist ? esc(cfHist.winner) : '—']]);
  let body = '';
  if (afrTab === 'rank') {
    body = `<div class="panel tbl-google"><h3>Continental rankings<span class="sub">the strongest leagues in Africa</span></h3><div class="cf-wrap">
      <table class="gtable"><thead><tr><th class="pos">#</th><th>League</th><th>Country</th><th class="hide-s">Top club</th><th>Rating</th></tr></thead><tbody>` +
      rankRows.map((x, i) => `<tr class="${x.sa ? 'me' : ''}"><td class="pos">${i + 1}</td><td><b>${esc(x.name)}</b></td>
        <td><span class="cf-flag">${flagSVG(x.nat)} ${esc(natName(x.nat))}</span></td><td class="hide-s">${esc(x.club)}</td><td><b>${x.rating}</b></td></tr>`
      ).join('') + `</tbody></table></div></div>`;
  } else if (afrTab === 'tables') {
    body = `<div class="panel tbl-google"><h3>League tables<span class="sub">${esc(L.name)}</span></h3>
      <div class="cf-pills">${A.leagues.map((x, i) => `<button data-al="${i}" class="${afrPick === i ? 'on' : ''}">${flagSVG(x.nat, 15)} ${esc(natName(x.nat))}</button>`).join('')}</div>
      <div class="cf-wrap"><table class="gtable"><thead><tr><th class="pos">#</th><th>Club</th><th class="hide-s">Rat</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>` +
      st.map((r, i) => {
        const c = afrClub(G, r.id);
        return `<tr class="clickrow ${i === 0 ? 'zone-up' : ''} ${afrClubPick === r.id ? 'me' : ''}" data-afc="${r.id}" style="cursor:pointer"><td class="pos">${i + 1}</td><td><span class="team">${flagSVG(L.nat, 18)}<span>${esc(c.n)}</span>${afrStarsHTML(c.n)}</span></td>
          <td class="hide-s muted">${c.rating}</td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
          <td>${r.gf - r.ga > 0 ? '+' : ''}${r.gf - r.ga}</td><td><b>${r.pts}</b></td></tr>`;
      }).join('') + `</tbody></table></div>
      <div class="glegend"><span><i style="background:#34c471"></i>Into the ${CAF_NAME}</span></div></div>` +
      (afrClubPick != null && afrClub(G, afrClubPick) ? afrClubSquadPanel(G, afrClubPick) : '');
  } else if (afrTab === 'caf') {
    body = continentalPanel('caf', CAF_NAME, 'cafHistory', 'Champions of Africa').replace('<div class="panel">', '<div class="panel tbl-google">');
  } else {
    body = continentalPanel('confed', CONFED_NAME, 'confedHistory', 'African Football Cup winners').replace('<div class="panel">', '<div class="panel tbl-google">');
  }
  v.innerHTML = tabBar + tiles + body;
  v.querySelectorAll('[data-aft]').forEach(b => b.onclick = () => { afrTab = b.dataset.aft; viewAfrica(); window.scrollTo({ top: 0 }); });
  v.querySelectorAll('[data-al]').forEach(b => b.onclick = () => { afrPick = +b.dataset.al; afrClubPick = null; viewAfrica(); });
  v.querySelectorAll('[data-afc]').forEach(b => b.onclick = () => { const id = b.dataset.afc; afrClubPick = afrClubPick === id ? null : id; viewAfrica(); });
  bindPlayerRows(v);
  const nb = $('#afNations'); if (nb) nb.onclick = () => goTo('nations');
}
function viewAfricaOld() {
  const v = $('#v-africa'), A = G.africa;
  const L = A.leagues[afrPick];
  const st = afrTable(L);
  v.innerHTML = `<div class="panel"><h3>Continental rankings<span class="sub">the strongest leagues in Africa</span></h3>
    <table class="tbl"><thead><tr><th class="pos">#</th><th>League</th><th>Country</th><th>Top club</th><th>Rating</th></tr></thead><tbody>` +
    ([{ name: TIER_NAMES[0], nat: 'ZA', sa: true }].concat(A.leagues)).map((x, i) => {
      if (x.sa) {
        const best = G.teams.filter(t => t.tier === 0).sort((a, b) => teamOverall(b) - teamOverall(a))[0];
        return `<tr class="me"><td class="pos num">${i + 1}</td><td><b>${esc(x.name)}</b></td>
          <td>${flagSVG('ZA')} South Africa</td><td>${esc(best.s)}</td><td class="num">${teamOverall(best)}</td></tr>`;
      }
      const top = x.clubs.slice().sort((a, b) => b.rating - a.rating)[0];
      return `<tr><td class="pos num">${i + 1}</td><td><b>${esc(x.name)}</b></td>
        <td>${flagSVG(x.nat)} ${esc(natName(x.nat))}</td><td>${esc(top.n)}</td><td class="num">${top.rating}</td></tr>`;
    }).join('') + `</tbody></table></div>

  <div class="panel"><h3>League tables<span class="sub">${esc(L.name)}</span></h3>
    <div class="chipbar" style="overflow-x:auto;flex-wrap:nowrap">${A.leagues.map((x, i) =>
      `<button class="chip" data-al="${i}" aria-pressed="${afrPick === i}">${flagSVG(x.nat, 15)} ${esc(natName(x.nat))}</button>`).join('')}</div>
    <table class="tbl"><thead><tr><th class="pos">#</th><th>Club</th><th>Rat</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>` +
    st.map((r, i) => {
      const c = afrClub(G, r.id);
      return `<tr class="${i === 0 ? 'zone-up' : ''}"><td class="pos num">${i + 1}</td><td><b>${esc(c.n)}</b></td>
        <td class="num" style="color:var(--dim)">${c.rating}</td><td class="num">${r.p}</td><td class="num">${r.w}</td>
        <td class="num">${r.d}</td><td class="num">${r.l}</td><td class="num">${r.gf - r.ga > 0 ? '+' : ''}${r.gf - r.ga}</td>
        <td class="num"><b>${r.pts}</b></td></tr>`;
    }).join('') + `</tbody></table>
    <div class="legend"><span><i style="background:var(--up)"></i>Into the ${CAF_NAME}</span></div></div>` +
  continentalPanel('caf', CAF_NAME, 'cafHistory', 'Champions of Africa') + continentalPanel('confed', CONFED_NAME, 'confedHistory', 'African Football Cup winners');
  v.querySelectorAll('[data-al]').forEach(b => b.onclick = () => { afrPick = +b.dataset.al; viewAfrica(); });
}

/* ---------------- national teams ---------------- */
let natPick = 'ZA', natReg = 'ALL', natLimit = 30;
let wNat = 'ALL', wPos = 'ALL', wSort = 'rating', wSearch = '', wLimit = 60; function viewWorld() {   const v = $('#v-world'); v.classList.add('mmx', 'sqv');   const all = [];   G.teams.forEach(c => c.squad.forEach(p => all.push({ p, club: c })));   (G.freeAgents || []).forEach(p => all.push({ p, club: null }));   const by = {}, reg = {};   all.forEach(x => {     const o = by[x.p.nat] || (by[x.p.nat] = { n: 0, best: null });     o.n++; if (!o.best || x.p.rating > o.best.rating) o.best = x.p;     const r = regionOf(x.p.nat); reg[r] = (reg[r] || 0) + 1;   });   const natList = Object.keys(by).sort((a, b) => by[b].n - by[a].n);   const foreignN = all.filter(x => x.p.nat !== 'ZA').length;   const q = wSearch.toLowerCase();   const posOk = p => wPos === 'ALL' || p.pos === wPos || POS_GROUP[p.pos] === wPos;   const sorter = (a, b) => wSort === 'age' ? a.p.age - b.p.age : wSort === 'potential' ? b.p.pot - a.p.pot : wSort === 'value' ? b.p.value - a.p.value : b.p.rating - a.p.rating;   const rows = all.filter(x => natMatch(x.p, wNat) && posOk(x.p) && (!q || x.p.name.toLowerCase().includes(q) || natName(x.p.nat).toLowerCase().includes(q) || (x.club && x.club.n.toLowerCase().includes(q)))).sort(sorter);   const row = x => {     const p = x.p, c = x.club;     return `<tr data-pid="${p.id}" style="cursor:pointer"><td class="txp">${faceSVG(p, 26, c ? c.c1 : null)}<div><b>${esc(p.name)}</b></div></td>       <td style="white-space:nowrap">${flagSVG(p.nat)} ${esc(natName(p.nat))}</td><td>${posTag(p.pos)}</td><td class="num">${p.age}</td>       <td class="num">${ratingTag(p.rating)}</td><td class="num"><b class="potglow">${potTxt(p)}</b></td>       <td>${c ? `${crestHTML(c, 13)} ${esc(c.s)}` : '<span class="hint">Free agent</span>'}</td><td class="num">${money(p.value)}</td></tr>`;   };   const chip = (val, label, cur) => `<button class="chip" data-wn="${val}" aria-pressed="${cur === val}">${label}</button>`;   let html = `<div class="rbox">     <div><b>${all.length}</b><span>Players in the world</span></div>     <div><b>${natList.length}</b><span>Nationalities</span></div>     <div><b>${Math.round(100 * foreignN / Math.max(1, all.length))}%</b><span>Foreign-born</span></div>     <div><b>${all.filter(x => !x.club).length}</b><span>Free agents</span></div>   </div>   <div class="panel"><h3>Browse by nationality<span class="sub">tap a country to see its players</span></h3>     <div class="chipbar" style="padding:0 13px 6px">${chip('ALL', 'Everyone', wNat)}${chip('FOREIGN', 'All foreign', wNat)}       ${Object.keys(REGION_NAMES).filter(r => reg[r]).map(r => chip('R:' + r, REGION_NAMES[r] + ' (' + reg[r] + ')', wNat)).join('')}</div>     <div class="chipbar" style="padding:0 13px 10px;max-height:140px;overflow:auto">${natList.map(c =>       `<button class="chip" data-wn="${c}" aria-pressed="${wNat === c}" title="Best: ${esc(by[c].best.name)} (${by[c].best.rating})">${flagSVG(c, 15)} ${esc(natName(c))} <span class="hint">${by[c].n}</span></button>`).join('')}</div></div>   <div class="panel"><div class="chipbar">${['ALL', 'GK', 'DEF', 'MID', 'ATT'].map(p => `<button class="chip" data-wp="${p}" aria-pressed="${wPos === p}">${p === 'ALL' ? 'Any position' : p}</button>`).join('')}     <select id="wSortSel">${[['rating', 'Highest rated'], ['potential', 'Highest potential'], ['value', 'Most valuable'], ['age', 'Youngest']].map(([k, l]) => `<option value="${k}" ${wSort === k ? 'selected' : ''}>${l}</option>`).join('')}</select>     ${natSelectHTML('wNatSel', wNat)}     <input type="search" id="wS" placeholder="Search player, country or club" value="${esc(wSearch)}" style="margin-left:auto;min-width:180px"></div>     <h3 style="padding:10px 13px 0">${wNat === 'ALL' ? 'All players' : wNat === 'FOREIGN' ? 'Foreign players' : wNat.indexOf('R:') === 0 ? REGION_NAMES[wNat.slice(2)] : esc(natName(wNat))}<span class="sub">${rows.length} found, ${Math.min(wLimit, rows.length)} shown</span></h3>     ${rows.length ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th>Player</th><th>Nationality</th><th>Pos</th><th>Age</th><th>Rat</th><th>Pot</th><th>Club</th><th>Value</th></tr></thead><tbody>${rows.slice(0, wLimit).map(row).join('')}</tbody></table></div>       ${rows.length > wLimit ? `<div style="padding:10px 13px"><button class="btn ghost sm" id="wMore">Show 60 more</button></div>` : ''}`       : '<div class="empty">Nobody matches those filters.</div>'}</div>`;   v.innerHTML = html;   v.querySelectorAll('[data-wn]').forEach(b => b.onclick = () => { wNat = b.dataset.wn; wLimit = 60; viewWorld(); });   v.querySelectorAll('[data-wp]').forEach(b => b.onclick = () => { wPos = b.dataset.wp; wLimit = 60; viewWorld(); });   const ss = v.querySelector('#wSortSel'); if (ss) ss.onchange = e => { wSort = e.target.value; viewWorld(); };   const ns = v.querySelector('#wNatSel'); if (ns) ns.onchange = e => { wNat = e.target.value; wLimit = 60; viewWorld(); };   const si = v.querySelector('#wS'); if (si) si.oninput = () => { const pos = si.selectionStart; wSearch = si.value; wLimit = 60; viewWorld(); const n = $('#wS'); n.focus(); n.setSelectionRange(pos, pos); };   const more = v.querySelector('#wMore'); if (more) more.onclick = () => { wLimit += 60; viewWorld(); };   v.querySelectorAll('tr[data-pid]').forEach(r => r.onclick = () => playerModal(+r.dataset.pid)); } let natTab = 'rank'; /* ---- international football: call-ups, caps, goals and players away on duty ---- */
const INTL_WINDOWS = [7, 15, 24, 33];   /* the league round that follows each international break */
const NAT_NICK = { ZA: 'Bafana Bafana', NG: 'Super Eagles', EG: 'Pharaohs', MA: 'Atlas Lions', SN: 'Lions of Teranga', GH: 'Black Stars', CI: 'Elephants', CM: 'Indomitable Lions', DZ: 'Desert Foxes', TN: 'Eagles of Carthage', ML: 'Eagles', ZM: 'Chipolopolo', ZW: 'Warriors', BW: 'Zebras', NA: 'Brave Warriors', AO: 'Palancas Negras', CD: 'Leopards', MZ: 'Mambas' };
function natLabel(c) { return NAT_NICK[c] || natName(c); }
function intlSquad(G, code) {
  const pool = [];
  G.teams.forEach(t => t.squad.forEach(p => { if (p.nat === code && p.inj <= 0 && p.age >= 17) pool.push({ p, t }); }));
  return pool.sort((a, b) => b.p.rating - a.p.rating).slice(0, 23);
}
/* the first time the game runs a break, give established internationals a believable record */
function intlSeed(G) {
  Object.keys(NATIONS).forEach(code => natSquad(G, code).forEach(x => {
    const p = x.p; if (p.caps != null) return;
    const n = clamp(Math.round((p.age - 20) * (p.rating - 46) * 0.12 * (0.5 + rnd())), 0, 140);
    const ratio = { ST: 0.3, CF: 0.3, LW: 0.18, RW: 0.18, CAM: 0.14, LM: 0.1, RM: 0.1, CM: 0.06, CDM: 0.03, LWB: 0.03, RWB: 0.03, LB: 0.02, RB: 0.02, CB: 0.04, GK: 0 }[p.pos] || 0.05;
    p.caps = n; p.ig = Math.round(n * ratio * (0.6 + rnd() * 0.8)); p.ia = Math.round(n * ratio * 0.7 * (0.5 + rnd()));
  }));
  G.intlInit = true;
}
/* one match for one nation: picks the XI and subs, gives them caps, and shares out the goals */
function intlCredit(entries, goals, stat, names) {
  if (!entries.length) return;
  const ord = entries.slice().sort((a, b) => (b.p.rating + gauss() * 3) - (a.p.rating + gauss() * 3));
  const gk = ord.find(x => POS_GROUP[x.p.pos] === 'GK'); let xi = ord.slice(0, 11);
  if (gk && !xi.includes(gk)) xi[xi.length - 1] = gk;
  const used = xi.concat(ord.filter(x => !xi.includes(x)).slice(0, 3).filter(() => rnd() < 0.75));
  const st = id => stat[id] || (stat[id] = { caps: 0, g: 0, a: 0 });
  used.forEach(x => { x.p.caps = (x.p.caps || 0) + 1; st(x.p.id).caps++; });
  const w = { ST: 5, CF: 5, LW: 3.2, RW: 3.2, CAM: 3, LM: 2.2, RM: 2.2, CM: 1.4, CDM: 0.6, LWB: 0.5, RWB: 0.5, LB: 0.35, RB: 0.35, CB: 0.45, GK: 0.01 };
  const wt = x => (w[x.p.pos] || 0.5) * Math.pow(1.04, x.p.rating - 60);
  for (let i = 0; i < goals; i++) {
    const sc = wpick(used, wt); sc.p.ig = (sc.p.ig || 0) + 1; st(sc.p.id).g++; if (names) names.push(sc.p.name);
    const rest = used.filter(x => x !== sc);
    if (rest.length && rnd() < 0.7) { const as = wpick(rest, wt); as.p.ia = (as.p.ia || 0) + 1; st(as.p.id).a++; }
  }
}
/* called after the injuries tick at the start of each league round */
function intlRoundHook(G) {
  if (!INTL_WINDOWS.includes(G.round)) return;
  const key = G.season + ':' + G.round;
  if (G.intlKey === key) { G.teams.forEach(t => t.squad.forEach(p => { if (p.dtyAt === key) p.dty = Math.max(p.dty || 0, 1); })); return; }
  G.intlKey = key;
  if (!G.intlInit) intlSeed(G);
  const codes = Object.keys(NATIONS), rat = {}, sqd = {};
  codes.forEach(c => { rat[c] = natRating(G, c); sqd[c] = intlSquad(G, c).slice(0, 20); });
  /* no club loses more than 5 players to one break: the best-rated get picked first */
  const perClub = {}, everyone = [];
  codes.forEach(c => sqd[c].forEach(x => everyone.push([c, x])));
  everyone.sort((a, b) => b[1].p.rating - a[1].p.rating);
  codes.forEach(c => { sqd[c] = []; });
  everyone.forEach(([c, x]) => { perClub[x.t.id] = (perClub[x.t.id] || 0) + 1; if (perClub[x.t.id] <= 5) sqd[c].push(x); });
  const stat = {}, mine = [], hurt = [], matches = [], mineId = G.myTeam, mineU21 = [];
  /* each nation also calls up its best young players (21 and under) for the under-21 side */
  const young = {}, seniorIds = new Set(); codes.forEach(c => sqd[c].forEach(x => seniorIds.add(x.p.id)));
  G.teams.forEach(t => t.squad.forEach(p => { if (p.age <= 21 && p.age >= 16 && p.inj <= 0 && NATIONS[p.nat] && !seniorIds.has(p.id)) (young[p.nat] = young[p.nat] || []).push({ p, t }); }));
  const u21Club = {};
  Object.keys(young).forEach(c => young[c].sort((a, b) => ((b.p.pot || b.p.rating) + b.p.rating) - ((a.p.pot || a.p.rating) + a.p.rating)).slice(0, 5).forEach(x => {
    if ((u21Club[x.t.id] = (u21Club[x.t.id] || 0) + 1) > 2) return;
    x.p.dty = 1; x.p.dtyAt = key; x.p.u21 = (x.p.u21 || 0) + 2; x.p.lastCall = { season: G.season, round: G.round, u21: true };
    x.p.sta = Math.max(40, staOf(x.p) - 8);
    if (x.t.id === mineId) { mineU21.push(x); try { moodAddEv(x.p, 'intl', 2, 3, 'Delighted by his under-21 call-up'); } catch (e) { } }
  }));
  codes.forEach(c => sqd[c].forEach(x => {
    const p = x.p; p.dty = 1; p.dtyAt = key; p.lastCall = { season: G.season, round: G.round };
    p.sta = Math.max(40, staOf(p) - 12);
    if (rnd() < 0.03) { p.inj = rint(2, 6); p.injLen = p.inj; p.dty = 0; if (x.t.id === mineId) hurt.push(p); }
    if (x.t.id === mineId) { mine.push(x); try { moodAddEv(p, 'intl', 3, 3, 'Proud to represent his country'); } catch (e) { } }
  }));
  for (let k = 0; k < 2; k++) {
    const order = codes.slice().sort((a, b) => (rat[a] - rat[b]) + gauss() * 8);
    for (let i = 0; i + 1 < order.length; i += 2) {
      const h = order[i], a = order[i + 1], [hg, ag] = simAbstract(rat[h], rat[a], 1.2), sc = [];
      intlCredit(sqd[h], hg, stat, sc); intlCredit(sqd[a], ag, stat, sc);
      matches.push({ h, a, hg, ag, sc: (h === 'ZA' || a === 'ZA') ? sc : [] });
      if (h === 'ZA' || a === 'ZA') { const za = h === 'ZA', gf = za ? hg : ag, ga = za ? ag : hg, opp = natName(za ? a : h); news(G, 'nation', `${natLabel('ZA')} ${gf > ga ? 'beat' : gf < ga ? 'lost to' : 'drew with'} ${opp} ${gf}–${ga}.`); }
    }
  }
  G.intl = G.intl && G.intl.season === G.season ? G.intl : { season: G.season, windows: [] };
  G.intl.windows.push({ round: G.round, date: dateForRound(G.round, G.season), played: matches.length, matches: matches.filter(m => m.h === 'ZA' || m.a === 'ZA') });
  if (mine.length || hurt.length || mineU21.length) {
    const lines = [`${mine.length + mineU21.length} of your players ${mine.length + mineU21.length === 1 ? 'is' : 'are'} away on international duty and will miss this matchday.`];
    mineU21.forEach(x => lines.push(`${x.p.name} (${natName(x.p.nat)} under-21s): 2 caps`));
    mine.forEach(x => { const s = stat[x.p.id] || { caps: 0, g: 0 }; lines.push(`${x.p.name} (${natName(x.p.nat)}): ${s.caps} cap${s.caps === 1 ? '' : 's'}${s.g ? ', ' + s.g + ' goal' + (s.g === 1 ? '' : 's') : ''}${x.p.inj > 0 ? ', returns injured' : ''}`); });
    hurt.forEach(p => lines.push(`${p.name} picked up an injury on international duty and is out for ${p.inj} matches.`));
    mail(G, { cat: 'general', from: 'Club Secretary', flag: hurt.length > 0, subject: 'International break', body: lines });
  }
}
/* the AFCON finals also count: caps and goals from the real results */
function intlAfconCredit(G) {
  const F = G.africa.afcon && G.africa.afcon.finals; if (!F) return;
  if (!G.intlInit) intlSeed(G);
  const cache = {}, sq = c => cache[c] || (cache[c] = intlSquad(G, c)), stat = {};
  F.groups.forEach(g => g.table.forEach(r => { for (let i = 0; i < r.p; i++) intlCredit(sq(r.c), Math.floor(r.gf / r.p) + (i < r.gf % r.p ? 1 : 0), stat); }));
  F.rounds.forEach(rd => rd.ties.forEach(t => { intlCredit(sq(t.a), t.ag, stat); intlCredit(sq(t.b), t.bg, stat); }));
}
function nextIntlBreak(G) {
  const w = INTL_WINDOWS.find(r => r > G.round);
  return w == null ? null : { round: w, date: dateForRound(w, G.season) };
}
function playerIntlHTML(p) {
  if (!p.nat || !NATIONS[p.nat]) return '';
  const code = p.nat, caps = p.caps || 0, inSq = natSquad(G, code).some(x => x.p.id === p.id), nb = nextIntlBreak(G);
  const status = p.dty > 0 && p.lastCall && p.lastCall.u21 ? `On under-21 duty with ${natName(code)}. Unavailable for ${p.dty} more match${p.dty === 1 ? '' : 'es'}.` : p.dty > 0 ? `On international duty with ${natLabel(code)}. Unavailable for ${p.dty} more match${p.dty === 1 ? '' : 'es'}.`
    : inSq ? `In the ${natLabel(code)} squad${nb ? '. Expect a call-up at the next break (' + nb.date + ').' : '.'}`
    : caps > 0 ? `Not in the current ${natName(code)} squad.` : p.u21 ? `Part of the ${natName(code)} under-21 setup.` : 'Not an international yet.';
  return `<div class="panel"><h3>International<span class="sub">${flagSVG(code)} ${esc(natName(code))}</span></h3><div class="pad">
    <div style="display:flex;gap:10px;margin-bottom:8px">${[['Caps', caps], ['Goals', p.ig || 0], ['Assists', p.ia || 0]].concat(p.u21 ? [['U21 caps', p.u21]] : []).map(([l, v]) => `<div style="flex:1;text-align:center;background:rgba(255,255,255,.04);border-radius:6px;padding:8px 4px"><div style="font:700 22px var(--head);color:${p.dty > 0 ? '#5ab0ff' : '#fff'}">${v}</div><small class="hint">${l}</small></div>`).join('')}</div>
    <p class="hint" style="margin:0">${status}${p.lastCall ? ' Last called up ' + seasonLabel(p.lastCall.season) + '.' : ''}</p></div></div>`;
}
function intlTabHTML() {
  const nb = nextIntlBreak(G), t = me(), away = t.squad.filter(p => p.dty > 0);
  const all = []; G.teams.forEach(tt => tt.squad.forEach(p => { if ((p.caps || 0) > 0) all.push({ p, tt }); }));
  const row = (x, v, sub) => `<div class="prow" style="grid-template-columns:auto 1fr auto"><span>${flagSVG(x.p.nat)}</span><span class="who"><b>${esc(x.p.name)}</b><small>${esc(x.tt.s)} · ${esc(sub)}</small></span><b style="font:700 18px var(--head);color:#f2b928">${v}</b></div>`;
  const top = (k, label, sub) => `<div class="panel"><h3>${label}<span class="sub">all time</span></h3>${all.slice().sort((a, b) => (b.p[k] || 0) - (a.p[k] || 0)).slice(0, 10).filter(x => (x.p[k] || 0) > 0).map(x => row(x, x.p[k], sub(x.p))).join('') || '<div class="pad hint">Nothing yet.</div>'}</div>`;
  const zaRes = []; ((G.intl && G.intl.windows) || []).forEach(w => w.matches.forEach(m => { if (m.h === 'ZA' || m.a === 'ZA') zaRes.push({ w, m }); }));
  return `<div class="panel"><h3>International breaks<span class="sub">${nb ? 'next: ' + nb.date : 'none left this season'}</span></h3><div class="pad"><p class="hint" style="margin:0">Players called up by their countries miss the next matchday. Breaks fall before rounds ${INTL_WINDOWS.map(r => r + 1).join(', ')}.</p></div>
      ${away.length ? away.map(p => `<div class="prow" style="grid-template-columns:auto 1fr auto"><span>${flagSVG(p.nat)}</span><span class="who"><b>${esc(p.name)}</b><small>${esc(natLabel(p.nat))} · away for ${p.dty} match${p.dty === 1 ? '' : 'es'}</small></span><span class="tag" style="color:#5ab0ff;border-color:#5ab0ff">intl duty</span></div>`).join('') : '<div class="pad hint">None of your players are away right now.</div>'}</div>
    <div class="panel"><h3>${esc(natLabel('ZA'))} results<span class="sub">this season</span></h3>${zaRes.slice(-6).reverse().map(({ w, m }) => `<div class="prow" style="grid-template-columns:1fr auto"><span class="who"><b>${flagSVG(m.h)} ${esc(natName(m.h))} v ${flagSVG(m.a)} ${esc(natName(m.a))}</b><small>${esc(w.date)}${m.sc && m.sc.length ? ' · scorers: ' + esc(m.sc.join(', ')) : ''}</small></span><b style="font:700 18px var(--head);color:#f2b928">${m.hg}–${m.ag}</b></div>`).join('') || '<div class="pad hint">No matches yet this season.</div>'}</div>
    ${top('ig', 'Top international scorers', p => (p.caps || 0) + ' caps')}${top('caps', 'Most capped players', p => (p.ig || 0) + ' goals')}`;
} function viewNations() {   const v = $('#v-nations'), A = G.africa.afcon;   v.classList.add('mmx', 'sqv');   const ratingOf = {}; Object.keys(NATIONS).forEach(c => { ratingOf[c] = natRating(G, c); });   const worldOrder = Object.keys(NATIONS).sort((a, b) => ratingOf[b] - ratingOf[a]), worldRank = {}; worldOrder.forEach((c, i) => { worldRank[c] = i + 1; });   const ranked = worldOrder.filter(c => natReg === 'ALL' || regionOf(c) === natReg);   const squad = natSquad(G, natPick);   const hist = G.africa.afconHistory, holder = hist.length ? hist[hist.length - 1] : null;   const tabs = [['rank', 'Rankings'], ['intl', 'International'], ['afcon', AFCON_NAME]];   const tabBar = `<div class="mb-tabs sqtabs">${tabs.map(([k, l]) => `<button data-nvt="${k}" class="${natTab === k ? 'on' : ''}">${esc(l)}</button>`).join('')}     <span class="sp"></span><button class="mini" id="nvAfrica">Continental football</button></div>`;   const tiles = sqTiles([['Nations ranked', worldOrder.length], ['South Africa', '#' + worldRank.ZA], ['Top nation', esc(natName(worldOrder[0]))], ['AFCON holders', holder ? esc(natName(holder.winner)) : '—']]);   let body = '';   if (natTab === 'intl') { body = intlTabHTML(); } else if (natTab === 'rank') {     body = `<div class="panel tbl-google"><h3>National team ratings<span class="sub">${ranked.length} of ${worldOrder.length} nations, world ranking</span></h3>       <div class="cf-pills">${[['ALL', 'World']].concat(Object.keys(REGION_NAMES).map(r => [r, REGION_NAMES[r]])).map(([k, l]) => `<button data-nreg="${k}" class="${natReg === k ? 'on' : ''}">${l}</button>`).join('')}</div>       <div class="cf-wrap"><table class="gtable"><thead><tr><th class="pos">#</th><th>Nation</th><th>Rating</th><th class="hide-s">In these leagues</th></tr></thead><tbody>` +       ranked.map(c => `<tr class="${c === natPick ? 'me' : ''}"><td class="pos">${worldRank[c]}</td>         <td><button class="chip" data-nat="${c}" style="border:none;background:none;padding:0;color:inherit">${flagSVG(c, 18)} <b>${esc(natName(c))}</b></button></td>         <td><b>${ratingOf[c]}</b></td><td class="hide-s muted">${natSquad(G, c).length}</td></tr>`).join('') + `</tbody></table></div>${ranked.length > natLimit ? `<div style="padding:10px 13px"><button class="btn ghost sm" id="natMore">Show 30 more (${ranked.length - natLimit} left)</button></div>` : ''}</div>       <div class="panel"><h3>${flagSVG(natPick, 18)} ${esc(natName(natPick))} squad<span class="sub">best ${Math.min(23, squad.length)} eligible players in the game</span></h3>` +       (squad.length ? squad.map(({ p, t }) => `<button class="prow" data-pid="${p.id}">${faceSVG(p, 32, t.c1)}${ratingTag(p.rating)}         <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · ${p.age} · ${esc(t.s)}${t.id === G.myTeam ? ' · your player' : ''}</small></span>         <span>${growthHtml(p)}</span><span class="val">${money(p.value)}</span></button>`).join('')         : '<div class="empty">No players from this country are playing in the three South African divisions.</div>') + `</div>`;   } else {     const phase = A.phase === 'qualifiers'       ? 'Qualifying is under way — results land at the end of this season.' + (holder ? ` ${natName(holder.winner)} hold the trophy.` : '')       : A.phase === 'qualified' ? 'Qualifying is done. The finals are played at the end of this season.' : `${natName(A.winner)} are the champions.`;     const showFinals = A.finals || (A.lastFinals && A.lastFinals.rounds);     body = `<div class="panel tbl-google"><h3>${AFCON_NAME}<span class="sub">${esc(phase)}</span></h3>`;     if (A.phase === 'qualified' || A.phase === 'done') {       body += `<div class="pad"><p class="hint" style="margin:0 0 8px">Qualified (${A.qualified.length}):</p><div style="display:flex;gap:6px;flex-wrap:wrap">${A.qualified.map(c =>         `<span class="tag" style="padding:4px 8px;${c === 'ZA' ? 'border-color:#f2b928;color:#f2b928' : ''}">${flagSVG(c)} ${esc(natName(c))}</span>`).join('')}</div></div>`;     }     if (showFinals) {       const rds = (A.finals || A.lastFinals).rounds;       body += `<div class="pad" style="padding-top:0">` + rds.map(r => `<h4 style="margin:14px 0 4px;font-size:17px">${r.name}</h4>` + r.ties.map(t => `<div class="res">         <div class="h ${t.winner === t.a ? 'w' : ''}">${flagSVG(t.a)} ${esc(natName(t.a))}</div><div class="sc num">${t.ag}–${t.bg}</div>         <div class="a ${t.winner === t.b ? 'w' : ''}">${esc(natName(t.b))} ${flagSVG(t.b)}${t.pens ? ' <span class="hint">(pens)</span>' : ''}</div></div>`).join('')).join('') + `</div>`;     } else if (A.phase === 'qualifiers') body += `<div class="empty">Qualifying groups are drawn. Results come in at the end of the season.</div>`;     if (hist.length) body += `<div class="cf-wrap"><table class="gtable"><thead><tr><th>Season</th><th>Champions</th></tr></thead><tbody>` +       hist.slice().reverse().map(h => `<tr><td>${seasonLabel(h.season)}</td><td>${flagSVG(h.winner, 18)} ${esc(natName(h.winner))}</td></tr>`).join('') + '</tbody></table></div>';     body += `</div>`;   }   v.innerHTML = tabBar + tiles + body;   v.querySelectorAll('[data-nvt]').forEach(b => b.onclick = () => { natTab = b.dataset.nvt; viewNations(); window.scrollTo({ top: 0 }); });   v.querySelectorAll('[data-nat]').forEach(b => b.onclick = () => { natPick = b.dataset.nat; viewNations(); });   v.querySelectorAll('[data-nreg]').forEach(b => b.onclick = () => { natReg = b.dataset.nreg; natLimit = 30; viewNations(); }); const nm = $('#natMore'); if (nm) nm.onclick = () => { natLimit += 30; viewNations(); }; const nb = $('#nvAfrica'); if (nb) nb.onclick = () => goTo('africa');   bindPlayerRows(v); } let crFilter = 'ALL', crSearch = '', crLimit = 50; function clubRankRows() {   const rows = [];   G.teams.forEach(t => rows.push({ id: t.id, me: t.id === G.myTeam, n: t.n, nat: 'ZA', lg: TIER_SHORT[t.tier], key: 'ZA', rating: teamOverall(t), pos: posOfTeam(G, t.id), t }));   G.africa.leagues.forEach(L => { const st = afrTable(L); L.clubs.forEach(c => rows.push({ id: c.id, me: false, n: c.n, nat: L.nat, lg: L.name, key: L.code, rating: c.rating, pos: st.findIndex(r => r.id === c.id) + 1 })); });   rows.sort((a, b) => b.rating - a.rating || a.n.localeCompare(b.n));   rows.forEach((r, i) => { r.rank = i + 1; });   return rows; } function snapClubRank(G) {   const rows = clubRankRows(), mine = rows.find(r => r.me); if (!mine) return;   const map = {}; rows.forEach(r => { map[r.id] = r.rank; });   G.rankHist = (G.rankHist || []).filter(h => h.season !== G.season);   G.rankHist.push({ season: G.season, rank: mine.rank, rating: mine.rating, lg: mine.lg, pos: mine.pos, total: rows.length,     top: rows.slice(0, 3).map(r => ({ n: r.n, nat: r.nat, rating: r.rating })), map });   if (G.rankHist.length > 15) G.rankHist.shift(); } let crTab = 'table'; function viewClubRank() {   const v = $('#v-clubrank'); v.classList.add('mmx', 'sqv');   const rows = clubRankRows(), hist = G.rankHist || [], prev = hist.length ? hist[hist.length - 1] : null;   const mine = rows.find(r => r.me), q = crSearch.toLowerCase();   const shown = rows.filter(r => (crFilter === 'ALL' || r.key === crFilter) && (!q || r.n.toLowerCase().includes(q) || r.lg.toLowerCase().includes(q) || natName(r.nat).toLowerCase().includes(q)));   const move = (now, was) => was == null ? '<span class="muted">–</span>' : was === now ? '<span class="muted">=</span>' : was > now ? `<span style="color:#34c471">▲${was - now}</span>` : `<span style="color:#ff5a5a">▼${now - was}</span>`;   const pill = (k, label) => `<button data-crf="${k}" class="${crFilter === k ? 'on' : ''}">${label}</button>`;   const best = hist.length ? Math.min.apply(null, hist.map(h => h.rank)) : null;   const tiles = crTab === 'history'     ? sqTiles([['Now', '#' + mine.rank], ['Best ever', best ? '#' + best : '—'], ['Seasons recorded', hist.length], ['Since last season', prev ? (prev.rank === mine.rank ? 'No change' : prev.rank > mine.rank ? '▲' + (prev.rank - mine.rank) : '▼' + (mine.rank - prev.rank)) : '—']])     : sqTiles([['Clubs ranked', rows.length], ['Your club', '#' + mine.rank], ['In ' + esc(mine.lg), ordinal(mine.pos)], ['Best club', esc(rows[0].n)]]);   const tabBar = `<div class="mb-tabs sqtabs"><button data-crt="table" class="${crTab === 'table' ? 'on' : ''}">Club rankings</button><button data-crt="history" class="${crTab === 'history' ? 'on' : ''}">My history</button>     <span class="sp"></span><button class="mini" id="crMine">Find my club</button></div>`;   let body = '';   if (crTab === 'history') {     body = `<div class="panel tbl-google"><h3>${esc(G.teams[G.myTeam].n)} — ranking history<span class="sub">recorded at the end of every season</span></h3>` +       (hist.length ? `<div class="cf-wrap"><table class="gtable"><thead><tr><th>Season</th><th>World rank</th><th>Move</th><th>Rating</th><th class="hide-s">League finish</th><th class="hide-s">Top clubs that year</th></tr></thead><tbody>` +         hist.slice().reverse().map((h, i, arr) => { const before = arr[i + 1]; return `<tr class="${h === prev ? 'me' : ''}"><td>${seasonLabel(h.season)}</td><td><b>#${h.rank}</b> <span class="muted">of ${h.total}</span></td>           <td>${move(h.rank, before ? before.rank : null)}</td><td><b>${h.rating}</b></td><td class="hide-s">${ordinal(h.pos)} · ${esc(h.lg)}</td>           <td class="hide-s muted">${h.top.map(x => esc(x.n) + ' ' + x.rating).join(', ')}</td></tr>`; }).join('') + `</tbody></table></div>`         : '<div class="empty">History starts recording when this season ends. Come back after the final matchday.</div>') + `</div>`;   } else {     body = `<div class="panel tbl-google"><h3>World club ranking<span class="sub">every club in the game, ${G.africa.leagues.length + 1} leagues${prev ? ' · ▲▼ vs ' + seasonLabel(prev.season) : ''}</span></h3>       <div class="cf-pills">${pill('ALL', 'All clubs')}${pill('ZA', flagSVG('ZA', 15) + ' South Africa')}${G.africa.leagues.map(L => pill(L.code, flagSVG(L.nat, 15) + ' ' + esc(natName(L.nat)))).join('')}</div>       <div style="padding:8px 13px;background:#1f1f1f;border-bottom:1px solid #2c2c2e"><input type="search" id="crS" placeholder="Search club, league or country" value="${esc(crSearch)}" style="width:100%;max-width:340px"></div>       <div class="cf-wrap"><table class="gtable"><thead><tr><th class="pos">#</th><th>Move</th><th>Club</th><th class="hide-s">League</th><th>Pos</th><th>Rating</th></tr></thead><tbody>` +       shown.slice(0, crLimit).map(r => `<tr class="${r.me ? 'me' : ''}"><td class="pos">${r.rank}</td><td>${move(r.rank, prev && prev.map ? prev.map[r.id] : null)}</td>         <td><span class="team">${r.t ? crestHTML(r.t, 18) : flagSVG(r.nat, 18)}<span>${esc(r.n)}</span>${r.me ? ' <span class="tag xi">YOU</span>' : ''}</span></td>         <td class="hide-s muted">${esc(r.lg)}</td><td>${ordinal(r.pos)}</td><td><b>${r.rating}</b></td></tr>`).join('') +       `</tbody></table></div>${shown.length > crLimit ? `<div style="padding:10px 13px;background:#1f1f1f"><button class="btn ghost sm" id="crMore">Show 50 more (${shown.length - crLimit} left)</button></div>` : ''}       ${shown.length ? '' : '<div class="empty">No clubs match.</div>'}</div>`;   }   v.innerHTML = tabBar + tiles + body;   v.querySelectorAll('[data-crt]').forEach(b => b.onclick = () => { crTab = b.dataset.crt; viewClubRank(); });   v.querySelectorAll('[data-crf]').forEach(b => b.onclick = () => { crFilter = b.dataset.crf; crLimit = 50; viewClubRank(); });   const si = v.querySelector('#crS'); if (si) si.oninput = () => { const pos = si.selectionStart; crSearch = si.value; crLimit = 50; viewClubRank(); const n = $('#crS'); n.focus(); n.setSelectionRange(pos, pos); };   const more = v.querySelector('#crMore'); if (more) more.onclick = () => { crLimit += 50; viewClubRank(); };   const fm = v.querySelector('#crMine'); if (fm) fm.onclick = () => { crTab = 'table'; crFilter = 'ALL'; crSearch = ''; crLimit = Math.max(crLimit, mine.rank + 5); viewClubRank(); const row = $('#v-clubrank tr.me'); if (row) row.scrollIntoView({ block: 'center' }); }; } function viewClubRankOld() {   const v = $('#v-clubrank'); v.classList.add('mmx', 'sqv');   const rows = [];   G.teams.forEach(t => rows.push({ me: t.id === G.myTeam, n: t.n, nat: 'ZA', lg: TIER_SHORT[t.tier], key: 'ZA', rating: teamOverall(t), pos: posOfTeam(G, t.id), t }));   G.africa.leagues.forEach(L => { const st = afrTable(L); L.clubs.forEach(c => rows.push({ me: false, n: c.n, nat: L.nat, lg: L.name, key: L.code, rating: c.rating, pos: st.findIndex(r => r.id === c.id) + 1 })); });   rows.sort((a, b) => b.rating - a.rating || a.n.localeCompare(b.n));   rows.forEach((r, i) => { r.rank = i + 1; });   const mine = rows.find(r => r.me), q = crSearch.toLowerCase();   const shown = rows.filter(r => (crFilter === 'ALL' || r.key === crFilter) && (!q || r.n.toLowerCase().includes(q) || r.lg.toLowerCase().includes(q) || natName(r.nat).toLowerCase().includes(q)));   const pill = (k, label) => `<button data-crf="${k}" class="${crFilter === k ? 'on' : ''}">${label}</button>`;   const tiles = sqTiles([['Clubs ranked', rows.length], ['Your club', '#' + mine.rank], ['In ' + esc(mine.lg), ordinal(mine.pos)], ['Best club', esc(rows[0].n)]]);   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">Club rankings</button><span class="sp"></span><button class="mini" id="crMine">Find my club</button></div>${tiles}     <div class="panel tbl-google"><h3>World club ranking<span class="sub">every club in the game, ${G.africa.leagues.length + 1} leagues</span></h3>       <div class="cf-pills">${pill('ALL', 'All clubs')}${pill('ZA', flagSVG('ZA', 15) + ' South Africa')}${G.africa.leagues.map(L => pill(L.code, flagSVG(L.nat, 15) + ' ' + esc(natName(L.nat)))).join('')}</div>       <div style="padding:8px 13px;background:#1f1f1f;border-bottom:1px solid #2c2c2e"><input type="search" id="crS" placeholder="Search club, league or country" value="${esc(crSearch)}" style="width:100%;max-width:340px"></div>       <div class="cf-wrap"><table class="gtable"><thead><tr><th class="pos">#</th><th>Club</th><th class="hide-s">League</th><th>Pos</th><th>Rating</th></tr></thead><tbody>` +       shown.slice(0, crLimit).map(r => `<tr class="${r.me ? 'me' : ''}"><td class="pos">${r.rank}</td>         <td><span class="team">${r.t ? crestHTML(r.t, 18) : flagSVG(r.nat, 18)}<span>${esc(r.n)}</span>${r.me ? ' <span class="tag xi">YOU</span>' : ''}</span></td>         <td class="hide-s muted">${esc(r.lg)}</td><td>${ordinal(r.pos)}</td><td><b>${r.rating}</b></td></tr>`).join('') +       `</tbody></table></div>${shown.length > crLimit ? `<div style="padding:10px 13px;background:#1f1f1f"><button class="btn ghost sm" id="crMore">Show 50 more (${shown.length - crLimit} left)</button></div>` : ''}       ${shown.length ? '' : '<div class="empty">No clubs match.</div>'}</div>`;   v.querySelectorAll('[data-crf]').forEach(b => b.onclick = () => { crFilter = b.dataset.crf; crLimit = 50; viewClubRank(); });   const si = v.querySelector('#crS'); if (si) si.oninput = () => { const pos = si.selectionStart; crSearch = si.value; crLimit = 50; viewClubRank(); const n = $('#crS'); n.focus(); n.setSelectionRange(pos, pos); };   const more = v.querySelector('#crMore'); if (more) more.onclick = () => { crLimit += 50; viewClubRank(); };   const fm = v.querySelector('#crMine'); if (fm) fm.onclick = () => { crFilter = 'ALL'; crSearch = ''; crLimit = Math.max(crLimit, mine.rank + 5); viewClubRank(); const row = $('#v-clubrank tr.me'); if (row) row.scrollIntoView({ block: 'center' }); }; } function viewNationsOld() {
  const v = $('#v-nations'), A = G.africa.afcon;
  const ratingOf = {}; Object.keys(NATIONS).forEach(c => { ratingOf[c] = natRating(G, c); });   const worldOrder = Object.keys(NATIONS).sort((a, b) => ratingOf[b] - ratingOf[a]), worldRank = {}; worldOrder.forEach((c, i) => { worldRank[c] = i + 1; });   const ranked = worldOrder.filter(c => natReg === 'ALL' || regionOf(c) === natReg);
  const squad = natSquad(G, natPick);
  const hist = G.africa.afconHistory;
  const holder = hist.length ? hist[hist.length - 1] : null;
  const phase = A.phase === 'qualifiers'
    ? 'Qualifying is under way — results land at the end of this season.' + (holder ? ` ${natName(holder.winner)} hold the trophy.` : '')
    : A.phase === 'qualified' ? 'Qualifying is done. The finals are played at the end of this season.'
      : `${natName(A.winner)} are the champions.`;
  const showFinals = A.finals || (A.lastFinals && A.lastFinals.rounds);

  let html = `<div class="panel"><h3>${AFCON_NAME}<span class="sub">${phase}</span></h3>`;
  if (A.phase === 'qualified' || A.phase === 'done') {
    html += `<div class="pad"><p class="hint" style="margin:0 0 8px">Qualified (${A.qualified.length}):</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${A.qualified.map(c =>
        `<span class="tag" style="padding:4px 8px;${c === 'ZA' ? 'border-color:var(--gold);color:var(--gold)' : ''}">${flagSVG(c)} ${esc(natName(c))}</span>`).join('')}</div></div>`;
  }
  if (showFinals) {
    const rds = (A.finals || A.lastFinals).rounds;
    html += `<div class="pad" style="padding-top:0">` + rds.map(r =>
      `<h4 style="margin:14px 0 4px;font-size:17px">${r.name}</h4>` +
      r.ties.map(t => `<div class="res">
        <div class="h ${t.winner === t.a ? 'w' : ''}">${flagSVG(t.a)} ${esc(natName(t.a))}</div>
        <div class="sc num">${t.ag}–${t.bg}</div>
        <div class="a ${t.winner === t.b ? 'w' : ''}">${esc(natName(t.b))} ${flagSVG(t.b)}${t.pens ? ' <span class="hint">(pens)</span>' : ''}</div></div>`).join('')
    ).join('') + `</div>`;
  } else if (A.phase === 'qualifiers') {
    html += `<div class="empty">Qualifying groups are drawn. Results come in at the end of the season.</div>`;
  }
  if (G.africa.afconHistory.length) {
    html += `<table class="tbl"><thead><tr><th>Season</th><th>Champions</th></tr></thead><tbody>` +
      G.africa.afconHistory.slice().reverse().map(h => `<tr><td>${seasonLabel(h.season)}</td>
        <td>${flagSVG(h.winner)} ${esc(natName(h.winner))}</td></tr>`).join('') + '</tbody></table>';
  }
  html += `</div>

  <div class="panel"><h3>National team ratings<span class="sub">${ranked.length} of ${worldOrder.length} nations, world ranking</span></h3>
    <div class="chipbar" style="padding:0 13px 8px">${[['ALL', 'World']].concat(Object.keys(REGION_NAMES).map(r => [r, REGION_NAMES[r]])).map(([k, l]) => `<button class="chip" data-nreg="${k}" aria-pressed="${natReg === k}">${l}</button>`).join('')}</div>
    <table class="tbl"><thead><tr><th class="pos">#</th><th>Nation</th><th>Rating</th><th class="hide-s">In these leagues</th></tr></thead><tbody>` +
    ranked.map((c, i) => {
      const n = natSquad(G, c).length;
      return `<tr class="${c === natPick ? 'me' : ''}"><td class="pos num">${worldRank[c]}</td>
        <td><button class="chip" data-nat="${c}" style="border:none;background:none;padding:0;color:inherit">${flagSVG(c)} <b>${esc(natName(c))}</b></button></td>
        <td class="num">${ratingOf[c]}</td><td class="num hide-s" style="color:var(--dim)">${n}</td></tr>`;
    }).join('') + `</tbody></table></div>

  <div class="panel"><h3>${esc(natName(natPick))} squad<span class="sub">best ${Math.min(23, squad.length)} eligible players in the game</span></h3>` +
    (squad.length ? squad.map(({ p, t }) =>
      `<button class="prow" data-pid="${p.id}">${faceSVG(p, 32, t.c1)}${ratingTag(p.rating)}
        <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · ${p.age} · ${esc(t.s)}${t.id === G.myTeam ? ' · your player' : ''}</small></span>
        <span>${growthHtml(p)}</span><span class="val">${money(p.value)}</span></button>`).join('')
      : '<div class="empty">No players from this country are playing in the three South African divisions.</div>') + `</div>`;

  v.innerHTML = html;
  v.querySelectorAll('[data-nat]').forEach(b => b.onclick = () => { natPick = b.dataset.nat; viewNations(); window.scrollTo({ top: 0 }); });
  v.querySelectorAll('[data-nreg]').forEach(b => b.onclick = () => { natReg = b.dataset.nreg; viewNations(); });
  bindPlayerRows(v);
}

/* ---------------- club ---------------- */
let clubTab = 'overview'; /* ---- club records: players, matches and seasons ---- */
const REC_PLAYER = [['apps', 'Most appearances'], ['goals', 'Most goals'], ['assists', 'Most assists'], ['cs', 'Most clean sheets'], ['sg', 'Most goals in a season']];
function recBookOf(cid) { G.recBook = G.recBook || {}; return G.recBook[cid] || (G.recBook[cid] = {}); }
/* stores v when it beats the record: returns the old record, false for a first entry, or null when nothing changed */
function recBetter(b, k, pid, name, v, extra) {
  if (!(v > 0)) return null;
  const cur = b[k]; if (cur && v <= cur.v) return null;
  b[k] = Object.assign({ pid, name, v }, extra || {});
  return cur || false;
}
/* one pass over every player (and retired legends) builds each club's all-time player records */
function recSweep(notify) {
  const mine = G.myTeam, broken = [], seen = new Set();
  const blank = () => ({ apps: 0, g: 0, a: 0, cs: 0, sg: 0, sgS: 0 });
  const feed = (pid, name, per, curId) => Object.keys(per).forEach(k => {
    const cid = +k, o = per[k]; if (!G.teams[cid]) return;
    const b = recBookOf(cid);
    [['apps', o.apps], ['goals', o.g], ['assists', o.a], ['cs', o.cs], ['sg', o.sg, { season: o.sgS }]].forEach(([key, v, ex]) => {
      const r = recBetter(b, key, pid, name, v, ex);
      if (notify && G.recInit && r && cid === mine && curId === mine) broken.push(`${name} now holds the club record for ${REC_PLAYER.find(x => x[0] === key)[1].toLowerCase()} (${v}).`);
    });
  });
  const all = []; G.teams.forEach(t => t.squad.forEach(p => all.push([p, t.id]))); (G.freeAgents || []).forEach(p => all.push([p, null]));
  all.forEach(([p, cur]) => {
    seen.add(p.id); const per = {};
    (p.career || []).forEach(c => { const o = per[c.club] || (per[c.club] = blank()); o.apps += c.apps || 0; o.g += c.g || 0; o.a += c.a || 0; o.cs += c.cs || 0; if ((c.g || 0) > o.sg) { o.sg = c.g; o.sgS = c.season; } });
    if (cur != null) { const o = per[cur] || (per[cur] = blank()); o.apps += p.apps || 0; o.g += p.goals || 0; o.a += p.assists || 0; o.cs += p.cs || 0; if ((p.goals || 0) > o.sg) { o.sg = p.goals; o.sgS = G.season; } }
    feed(p.id, p.name, per, cur);
  });
  (G.legends || []).forEach(L => {
    if (seen.has(L.pid)) return; const per = {};
    (L.seasons || []).forEach(s => { const o = per[s.club] || (per[s.club] = blank()); o.apps += s.apps || 0; o.g += s.g || 0; o.a += s.a || 0; if ((s.g || 0) > o.sg) { o.sg = s.g; o.sgS = s.season; } });
    feed(L.pid, L.name, per, null);
  });
  if (notify && G.recInit && broken.length) mail(G, { cat: 'award', from: 'Chief Executive', subject: 'Club records broken', body: broken.slice(0, 6).concat(['Your name goes into the club record books.']) });
  G.recInit = true; return broken;
}
/* match records, updated after every league match */
function recMatch(G, m) {
  if (!G.recInit) { try { recSweep(false); } catch (e) { } }
  [[m.h, m.hg, m.ag, m.a, true], [m.a, m.ag, m.hg, m.h, false]].forEach(([tid, gf, ga, oid, home]) => {
    const t = G.teams[tid], b = recBookOf(tid), opp = G.teams[oid].s, season = G.season, d = gf - ga;
    const say = (label, text) => { if (tid === G.myTeam && G.recInit) { toast('Club record: ' + label); news(G, 'match', 'Club record: ' + text); } };
    if (d > 0 && (!b.bigWin || d > b.bigWin.d || (d === b.bigWin.d && gf > b.bigWin.gf))) { const had = b.bigWin; b.bigWin = { d, gf, ga, opp, home, season }; if (had && d >= 3) say('biggest win', `a ${gf}–${ga} win over ${opp} is the biggest in the club's history.`); }
    if (d < 0 && (!b.bigLoss || -d > b.bigLoss.d || (-d === b.bigLoss.d && ga > b.bigLoss.ga))) b.bigLoss = { d: -d, gf, ga, opp, home, season };
    if (gf + ga > 0 && (!b.hiScore || gf + ga > b.hiScore.t)) { const had = b.hiScore; b.hiScore = { t: gf + ga, gf, ga, opp, home, season }; if (had && gf + ga >= 6) say('highest-scoring game', `${gf}–${ga} against ${opp} is the highest-scoring game in the club's history.`); }
    t.runU = gf >= ga ? (t.runU || 0) + 1 : 0; t.runW = gf > ga ? (t.runW || 0) + 1 : 0; if (!t.runU) t.ubB = false; if (!t.runW) t.wbB = false;
    if (t.runU > ((b.unbeaten && b.unbeaten.n) || 0)) { const had = b.unbeaten; b.unbeaten = { n: t.runU, season }; if (had && had.n >= 5 && !t.ubB) { t.ubB = true; say('longest unbeaten run', `${t.runU} matches unbeaten is the club's longest run.`); } }
    if (t.runW > ((b.winRun && b.winRun.n) || 0)) { const had = b.winRun; b.winRun = { n: t.runW, season }; if (had && had.n >= 4 && !t.wbB) { t.wbB = true; say('longest winning run', `${t.runW} wins in a row is the club's longest run.`); } }
  });
}
function clubRecordsHTML(t) {
  try { recSweep(false); } catch (e) { console.error('records', e); }
  const b = recBookOf(t.id), hist = t.history || [];
  const init = n => String(n || '?').split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase();
  const face = r => { const f = findPlayer(G, r.pid), pl = f && (f.p || f); return pl ? faceSVG(pl, 32, t.c1) : `<span style="width:32px;height:32px;border-radius:8px;background:#2a323d;display:grid;place-items:center;font-size:11px;color:#9aa3ad;flex:none">${esc(init(r.name))}</span>`; };
  const big = v => `<span style="font:700 20px var(--head);color:#f2b928;text-align:right">${v}</span>`;
  const prow = (label, r) => {
    if (!r) return `<div class="prow" style="grid-template-columns:1fr"><span class="who"><b>${label}</b><small>Not set yet</small></span></div>`;
    const here = t.squad.some(p => p.id === r.pid);
    return `<div class="prow" style="grid-template-columns:auto 1fr auto">${face(r)}<span class="who"><b>${esc(r.name)}</b><small>${label}${r.season ? ' · ' + seasonLabel(r.season) : ''}${here ? ' · still at the club' : ''}</small></span>${big(r.v)}</div>`;
  };
  const mrow = (label, r, fmt) => r ? `<div class="prow" style="grid-template-columns:1fr auto"><span class="who"><b>${label}</b><small>${fmt(r)}</small></span>${big(r.v != null ? r.v : (r.gf + '–' + r.ga))}</div>` : `<div class="prow" style="grid-template-columns:1fr"><span class="who"><b>${label}</b><small>Not set yet</small></span></div>`;
  const vs = r => `${r.home ? 'v' : 'at'} ${esc(r.opp)} · ${seasonLabel(r.season)}`;
  const best = (f, cmp) => hist.length ? hist.slice().sort(cmp)[0] : null;
  const bf = best(null, (a, c) => a.tier - c.tier || a.pos - c.pos), mp = best(null, (a, c) => c.pts - a.pts), mw = best(null, (a, c) => c.w - a.w), mg = best(null, (a, c) => c.gf - a.gf), fc = best(null, (a, c) => a.ga - c.ga);
  const hrow = (label, h, val, note) => h ? `<div class="prow" style="grid-template-columns:1fr auto"><span class="who"><b>${label}</b><small>${seasonLabel(h.season)} · ${esc(TIER_SHORT[h.tier])}${note ? ' · ' + note(h) : ''}</small></span>${big(val(h))}</div>` : `<div class="prow" style="grid-template-columns:1fr"><span class="who"><b>${label}</b><small>No completed seasons yet</small></span></div>`;
  return `<div class="panel"><h3>Player records<span class="sub">${esc(t.n)} · all time</span></h3>${REC_PLAYER.map(([k, l]) => prow(l, b[k])).join('')}</div>
    <div class="panel"><h3>Match records</h3>
      ${mrow('Biggest win', b.bigWin, vs)}${mrow('Biggest defeat', b.bigLoss, vs)}${mrow('Highest-scoring game', b.hiScore, vs)}
      ${mrow('Longest unbeaten run', b.unbeaten && { v: b.unbeaten.n, season: b.unbeaten.season }, r => seasonLabel(r.season) + ' · matches')}${mrow('Longest winning run', b.winRun && { v: b.winRun.n, season: b.winRun.season }, r => seasonLabel(r.season) + ' · wins')}</div>
    <div class="panel"><h3>Season records</h3>
      ${hrow('Best league finish', bf, h => ordinal(h.pos), h => h.pts + ' pts')}${hrow('Most points', mp, h => h.pts, h => ordinal(h.pos) + ' place')}${hrow('Most wins', mw, h => h.w)}${hrow('Most goals scored', mg, h => h.gf)}${hrow('Fewest goals conceded', fc, h => h.ga)}</div>
    <p class="hint" style="margin:0 12px 12px">Player records cover everyone still in the game and every Legend. Match records started when this feature was added.</p>`;
} function viewClub() {   const v = $('#v-club'), t = me();   v.classList.add('mmx', 'sqv');   const hist = t.history.slice().reverse();   const fin = t.fin;   const board = G.board != null ? G.board : 62;   const boardColor = board > 55 ? '#3ddc84' : board > 30 ? '#f2b928' : '#ff6b6b';   const inc = fin.prize + fin.sponsor + fin.gate + fin.sales, out = fin.buys + fin.wages + (fin.fines || 0), net = finNet(fin);   const tabs = [['overview', 'Overview'], ['finances', 'Finances'], ['history', 'History'], ['records', 'Club records'], ['save', 'Save & Load']];   const tabBar = `<div class="mb-tabs sqtabs">${tabs.map(([k, l]) => `<button data-clt="${k}" class="${clubTab === k ? 'on' : ''}">${l}</button>`).join('')}     <span class="sp"></span><button class="mini" id="clTrophies">Trophy room</button></div>`;   const row = (l, a, tot, cls) => `<div class="cf-row"><div class="l"><span>${l}</span><b>${money(a)}</b></div><div class="bar ${cls}"><i style="width:${tot > 0 ? Math.min(100, a / tot * 100) : 0}%"></i></div></div>`;   let body = '';   if (clubTab === 'records') { body = clubRecordsHTML(t); } else if (clubTab === 'overview') {     body = sqTiles([['Division', TIER_SHORT[t.tier]], ['Team rating', `${teamOverall(t)}`], ['Squad average', squadAverage(t)], ['Academy', `Level ${t.academy}`], ['Trophies', t.trophies.length]]) +       `<div class="panel"><h3>${esc(t.n)}<span class="sub">${esc(t.nick)} · ${esc(t.city)}</span></h3>         <div class="cf-kits">           <div class="kitBigWrap">${bigKitSVG(t, false, 132)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><div class="kitBigSponsor">   ${t.currentSponsor     ? (t.currentSponsor.logo         ? `<img src="${esc(t.currentSponsor.logo)}"              alt="${esc(t.currentSponsor.name)}"              style="width:100%;max-height:24px;object-fit:contain;                     filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">`         : esc(t.currentSponsor.name).toUpperCase())     : 'NO SPONSOR'} </div><small>Home</small></div>           <div class="kitBigWrap">${bigKitSVG(t, true, 132)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><div class="kitBigSponsor">${t.currentSponsor ? esc(t.currentSponsor.name).toUpperCase() : 'NO SPONSOR'}</div><small>Away</small></div>           <div class="kit" style="align-self:center">${crestHTML(t, 56)}<small>Badge</small></div>           <div class="kit" style="align-self:center">${avatarSVG(G.manager.avatar, 56)}<small>${esc(G.manager.name)} · rep ${G.manager.rep || 40}</small></div>         </div></div>       <div class="panel"><h3>Board confidence<span class="sub" style="color:${boardColor};font-weight:700">${Math.round(board)}/100</span></h3><div class="pad">         <div class="bar"><i style="width:${board}%;background:${boardColor}"></i></div>         <p class="hint" style="margin:8px 0 0">${board > 55 ? 'The board are happy with how things are going.' : board > 30 ? 'The board expect better next season.' : 'Your job is under real threat.'}</p>         <button class="btn ghost sm" id="askBoardBtn" style="margin-top:10px">Ask the board for funds</button></div></div>       <div class="panel"><h3>Other clubs<span class="sub">have a look at any squad</span></h3>         <div class="chipbar"><select id="clubPeek">${G.teams.slice().sort((a, b) => a.tier - b.tier || a.n.localeCompare(b.n))           .map(x => `<option value="${x.id}">${esc(x.n)} — ${TIER_SHORT[x.tier]}</option>`).join('')}</select>           <button class="chip" id="peekGo">Look at their squad</button></div></div>`;   } else if (clubTab === 'finances') {     body = sqTiles([['Transfer budget', money(t.budget)], ['Wage bill / season', money(t.wageBill)], ['Income so far', money(inc), '#3ddc84'],         ['Spending so far', '−' + money(out), '#ff6b6b'], ['Running total', money(net), net >= 0 ? '#3ddc84' : '#ff6b6b']]) +       `<div class="cf-two">         <div class="panel"><h3>Money in<span class="sub">${seasonLabel(G.season)}</span></h3><div class="pad">           ${row('Prize money', fin.prize, inc, 'g')}${row('Sponsors, TV & commercial', fin.sponsor, inc, 'g')}${row('Matchday income', fin.gate, inc, 'g')}${row('Player sales', fin.sales, inc, 'g')}</div></div>         <div class="panel"><h3>Money out<span class="sub">${seasonLabel(G.season)}</span></h3><div class="pad">           ${row('Wages paid', fin.wages, out, 'dn')}${row('Signings and fees', fin.buys, out, 'dn')}${row('Fines', fin.fines || 0, out, 'dn')}</div></div>       </div>       ${incomeBreakdownPanel(t)}${prizeBreakdownPanel(t)}<div class="panel"><h3>Budget allocation<span class="sub">wage budget ${money(t.wageBill)} of ${money(t.wageBudget)}</span></h3><div class="pad">         <p class="hint" style="margin:0 0 8px">Transfer budget is cash for fees. Wage budget is the most you can have committed to player wages at once. Slide to move funds between the two.</p>         <input class="range" type="range" id="allocSlide" min="${(-Math.max(0, t.wageBudget - t.wageBill)).toFixed(2)}" max="${Math.max(0, t.budget).toFixed(2)}" step="0.01" value="0">         <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>← into transfer</span><span>into wages →</span></div>         <p id="allocPreview" class="hint" style="margin:8px 0 0">No change.</p>         <button class="btn sm" id="allocGo" style="margin-top:8px">Move funds</button></div></div>       <div class="panel"><h3>Past seasons</h3>` +         (t.finHistory.length ? `<table class="tbl"><thead><tr><th>Season</th><th>In</th><th>Out</th><th>Net</th></tr></thead><tbody>` +           t.finHistory.slice().reverse().map(f => `<tr><td>${seasonLabel(f.season)}</td><td class="num">${money(f.prize + f.sponsor + f.gate + f.sales)}</td>             <td class="num">${money(f.buys + f.wages + (f.fines || 0))}</td><td class="num" style="color:${f.net >= 0 ? '#3ddc84' : '#ff6b6b'}"><b>${money(f.net)}</b></td></tr>`).join('') + '</tbody></table>'           : '<div class="empty">No completed seasons yet.</div>') + `</div>`;   } else if (clubTab === 'history') {     body = sqTiles([['Trophies', t.trophies.length], ['Seasons managed', hist.length], ['Best finish', hist.length ? ordinal(Math.min.apply(null, hist.map(h => h.pos))) : '—']]) +       `<div class="cf-two">         <div class="panel"><h3>Honours</h3>` +         (t.trophies.length ? '<ul class="feed">' + t.trophies.slice().reverse().map(x =>           `<li><span class="dot k-cup"></span><span class="when">${seasonLabel(x.season).slice(0, 4)}</span><span>${esc(x.name)}</span></li>`).join('') + '</ul>'           : '<div class="empty">The cabinet is empty. For now.</div>') + `</div>         <div class="panel"><h3>Season by season</h3>` +         (hist.length ? `<table class="tbl"><thead><tr><th>Season</th><th>Division</th><th>Pos</th><th class="hide-s">W-D-L</th><th>Pts</th></tr></thead><tbody>` +           hist.map(h => `<tr><td>${seasonLabel(h.season)}</td><td style="color:#8f98a2">${TIER_SHORT[h.tier]}</td>             <td class="num">${ordinal(h.pos)}</td><td class="num hide-s">${h.w}-${h.d}-${h.l}</td><td class="num"><b>${h.pts}</b></td></tr>`).join('') + '</tbody></table>'           : '<div class="empty">Your first season is under way.</div>') + `</div>       </div>       <div class="panel"><h3>Roll of honour</h3>` +       (G.records.seasons.length ? `<table class="tbl"><thead><tr><th>Season</th><th>Premiership</th><th class="hide-s">Cup</th><th class="hide-s">${SUPER8}</th><th class="hide-s">Africa</th><th class="hide-s">${AFCON_NAME}</th></tr></thead><tbody>` +         G.records.seasons.slice().reverse().map(s => `<tr><td>${seasonLabel(s.season)}</td>           <td><span class="team">${crestHTML(G.teams[s.champ], 15)}<span>${esc(G.teams[s.champ].s)}</span></span></td>           <td class="hide-s" style="color:#8f98a2">${esc(G.teams[s.cup].s)}</td>           <td class="hide-s" style="color:#8f98a2">${s.s8 != null ? esc(G.teams[s.s8].s) : '—'}</td>           <td class="hide-s" style="color:#8f98a2">${s.caf ? esc(s.caf) : '—'}</td>           <td class="hide-s" style="color:#8f98a2">${s.afcon ? esc(natName(s.afcon)) : '—'}</td></tr>`).join('') + '</tbody></table>'         : '<div class="empty">No completed seasons yet.</div>') + `</div>`;   } else {     body = `<div class="panel"><h3>Save & Load<span class="sub">slot ${slot}</span></h3>       <div class="pad" style="display:flex;gap:9px;flex-wrap:wrap;align-items:center">         <button class="btn ghost sm" id="saveNow">Save now</button>         <button class="btn ghost sm" id="switchSlot">Switch save slot</button>         <button class="btn ghost sm" id="shareBtn">Share your season</button>         <button class="btn danger sm" id="wipe">Start a new career</button>       </div>       <div class="pad" style="border-top:1px solid #2a3037;display:flex;gap:14px;flex-wrap:wrap;align-items:center">         <label class="hint" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="soundChk" ${soundOn ? 'checked' : ''}> Sound effects</label>         <span class="hint">Mzansi Manager works on your phone and on a computer ( if you are using a phone, click the 3 dots on browser and check "desktop site" + rotate your phone).</span>       </div>       <p class="hint" style="padding:0 13px 13px;margin:0">Saved in this browser only, across four slots. Clearing site data wipes it.</p></div>`;   }   v.innerHTML = tabBar + body;   v.querySelectorAll('[data-clt]').forEach(b => b.onclick = () => { clubTab = b.dataset.clt; viewClub(); window.scrollTo({ top: 0 }); });   const tr = $('#clTrophies'); if (tr) tr.onclick = () => goTo('trophies');   const on = (id, fn) => { const el = v.querySelector('#' + id); if (el) el.onclick = fn; };   on('saveNow', () => { save(); toast('Career saved in this browser.'); });   on('askBoardBtn', askBoardModal);   const allocSlide = $('#allocSlide');   if (allocSlide) {     const allocPreview = $('#allocPreview');     const updAlloc = () => {       const x = +allocSlide.value;       allocPreview.textContent = x === 0 ? 'No change.' : x > 0         ? `Move ${money(x)} from the transfer budget into the wage budget.`         : `Move ${money(-x)} from the wage budget into the transfer budget.`;     };     allocSlide.oninput = updAlloc;     $('#allocGo').onclick = () => {       const res = reallocateBudget(G, +allocSlide.value);       if (res.ok) { toast(res.msg); save(); render(); } else { toastWarn(res.msg); }     };   }   const sc = $('#soundChk'); if (sc) sc.onchange = e => { soundOn = e.target.checked; saveAudioPrefs(); if (soundOn) playSound('click'); };   on('shareBtn', shareSeason);   on('switchSlot', () => {     save();     openModal('Switch save slot', '<p style="margin:0 0 10px;color:var(--dim)">This leaves your current career saved and returns to the club picker.</p>',       `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="switchYes">Go to selection</button>`);     $('#switchYes').onclick = () => { leavingApp = true; try { localStorage.removeItem(LAST_SLOT_KEY); } catch (e) { } location.reload(); };   });   on('peekGo', () => squadPeek(+$('#clubPeek').value));   on('wipe', () => {     openModal('Start a new career?', `<p style="margin:0;color:var(--dim)">This deletes slot ${slot} (${esc(t.n)}) for good and returns to club selection.</p>`,       `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn danger sm" id="wipeYes">Delete and restart</button>`);     $('#wipeYes').onclick = () => {       try { localStorage.removeItem(slotKey(slot)); } catch (e) { }       setSlotName(slot, '');       try { localStorage.removeItem(LAST_SLOT_KEY); } catch (e) { }       location.reload();     };   }); }
  function viewClubOld() {
  const v = $('#v-club'), t = me();
  const hist = t.history.slice().reverse();
  const fin = t.fin;
  const board = G.board != null ? G.board : 62;
  const boardColor = board > 55 ? 'var(--up)' : board > 30 ? 'var(--gold)' : 'var(--down)';
  v.innerHTML = `<div class="panel"><h3>${esc(t.n)}<span class="sub">${esc(t.nick)} · ${esc(t.city)}</span></h3>
    <div class="kits">
      <div class="kitBigWrap">${bigKitSVG(t, false, 132)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><div class="kitBigSponsor">${t.currentSponsor ? esc(t.currentSponsor.name).toUpperCase() : 'NO SPONSOR'}</div><small>Home</small></div>
      <div class="kitBigWrap">${bigKitSVG(t, true, 132)}<div class="kitBigBadge">${crestHTML(t, 26)}</div><div class="kitBigSponsor">${t.currentSponsor ? esc(t.currentSponsor.name).toUpperCase() : 'NO SPONSOR'}</div><small>Away</small></div>
      <div class="kit" style="align-self:center">${crestHTML(t, 56)}<small>Badge</small></div>
      <div class="kit" style="align-self:center;text-align:left;margin-left:6px">
        ${avatarSVG(G.manager.avatar, 56)}<small>${esc(G.manager.name)} · rep ${G.manager.rep || 40}</small></div>
    </div>
    <dl class="kv" style="border-top:1px solid var(--line)">
      <dt>Division</dt><dd>${TIER_NAMES[t.tier]}</dd>
      <dt>Team rating</dt><dd>${teamOverall(t)} · squad ${squadAverage(t)}</dd>
      <dt>Transfer budget</dt><dd>${money(t.budget)}</dd>
      <dt>Wage budget</dt><dd>${money(t.wageBill)} committed of ${money(t.wageBudget)}</dd>
      <dt>Academy</dt><dd>Level ${t.academy}</dd>
      <dt>Trophies</dt><dd>${t.trophies.length}</dd>
    </dl>
    <div class="pad" style="border-top:1px solid var(--line)">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--dim);margin-bottom:4px">
        <span>Board confidence</span><span style="color:${boardColor};font-weight:600">${Math.round(board)}/100</span></div>
      <div class="bar"><i style="width:${board}%;background:${boardColor}"></i></div>
      <p class="hint" style="margin:6px 0 0">${board > 55 ? 'The board are happy with how things are going.' : board > 30 ? 'The board expect better next season.' : 'Your job is under real threat.'}</p>
      <button class="btn ghost sm" id="askBoardBtn" style="margin-top:8px">Ask the board for funds</button>
    </div>
    <div class="pad" style="border-top:1px solid var(--line)">
      <h4 style="margin:0 0 6px">Budget allocation</h4>
      <p class="hint" style="margin:0 0 8px">Transfer budget is cash for fees. Wage budget is the most you can have committed to player wages at once — right now that's ${money(t.wageBill)} of ${money(t.wageBudget)}. Slide to move funds between the two.</p>
      <input class="range" type="range" id="allocSlide" min="${(-Math.max(0, t.wageBudget - t.wageBill)).toFixed(2)}" max="${Math.max(0, t.budget).toFixed(2)}" step="0.01" value="0">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--faint)"><span>← into transfer</span><span>into wages →</span></div>
      <p id="allocPreview" class="hint" style="margin:8px 0 0">No change.</p>
      <button class="btn sm" id="allocGo" style="margin-top:6px">Move funds</button>
    </div></div>

  <div class="cols">
    <div class="panel"><h3>Finances<span class="sub">${seasonLabel(G.season)} so far</span></h3>
      <div class="stilegrid">
        <div class="stile"><b>${money(t.budget)}</b><small>Transfer budget</small></div>
        <div class="stile"><b>${money(t.wageBill)}</b><small>Wage bill / season</small></div>
        <div class="stile up"><b>${money(fin.prize + fin.sponsor + fin.gate + fin.sales)}</b><small>Income so far</small></div>
        <div class="stile down"><b>−${money(fin.buys + fin.wages)}</b><small>Spending so far</small></div>
        <div class="stile ${finNet(fin) >= 0 ? 'up' : 'down'}"><b>${money(finNet(fin))}</b><small>Running total</small></div>
      </div>
      <div class="pad" style="border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><h4 style="margin:0 0 6px">Money in</h4>
          ${[['Prize money', fin.prize], ['Sponsorship', fin.sponsor], ['Gate receipts', fin.gate], ['Player sales', fin.sales]].map(([l, a]) => {
            const tot = fin.prize + fin.sponsor + fin.gate + fin.sales;
            return `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${l}</span><b>${money(a)}</b></div><div class="bar"><i style="width:${tot > 0 ? Math.min(100, a / tot * 100) : 0}%"></i></div></div>`;
          }).join('')}</div>
        <div><h4 style="margin:0 0 6px">Money out</h4>
          ${[['Wages paid', fin.wages], ['Signings and fees', fin.buys]].map(([l, a]) => {
            const tot = fin.buys + fin.wages;
            return `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${l}</span><b>${money(a)}</b></div><div class="bar"><i style="width:${tot > 0 ? Math.min(100, a / tot * 100) : 0}%"></i></div></div>`;
          }).join('')}</div>
      </div>
      ${t.finHistory.length ? `<table class="tbl"><thead><tr><th>Season</th><th>In</th><th>Out</th><th>Net</th></tr></thead><tbody>` +
        t.finHistory.slice().reverse().map(f => `<tr><td>${seasonLabel(f.season)}</td>
          <td class="num">${money(f.prize + f.sponsor + f.gate + f.sales)}</td>
          <td class="num">${money(f.buys + f.wages)}</td>
          <td class="num" style="color:${f.net >= 0 ? 'var(--up)' : 'var(--down)'}"><b>${money(f.net)}</b></td></tr>`).join('') + '</tbody></table>' : ''}
    </div>
    <div>
      <div class="panel"><h3>Honours</h3>` +
    (t.trophies.length ? '<ul class="feed">' + t.trophies.slice().reverse().map(x =>
      `<li><span class="dot k-cup"></span><span class="when">${seasonLabel(x.season).slice(0,4)}</span><span>${esc(x.name)}</span></li>`).join('') + '</ul>'
      : '<div class="empty">The cabinet is empty. For now.</div>') + `</div>
      <div class="panel"><h3>Season by season</h3>` +
    (hist.length ? `<table class="tbl"><thead><tr><th>Season</th><th>Division</th><th>Pos</th><th class="hide-s">W-D-L</th><th>Pts</th></tr></thead><tbody>` +
      hist.map(h => `<tr><td>${seasonLabel(h.season)}</td><td style="color:var(--dim)">${TIER_SHORT[h.tier]}</td>
        <td class="num">${ordinal(h.pos)}</td><td class="num hide-s">${h.w}-${h.d}-${h.l}</td><td class="num"><b>${h.pts}</b></td></tr>`).join('') + '</tbody></table>'
      : '<div class="empty">Your first season is under way.</div>') + `</div>
    </div>
  </div>

  <div class="panel"><h3>Roll of honour</h3>` +
    (G.records.seasons.length ? `<table class="tbl"><thead><tr><th>Season</th><th>Premiership</th><th class="hide-s">Cup</th><th class="hide-s">${SUPER8}</th><th class="hide-s">Africa</th><th class="hide-s">${AFCON_NAME}</th></tr></thead><tbody>` +
      G.records.seasons.slice().reverse().map(s => `<tr><td>${seasonLabel(s.season)}</td>
        <td><span class="team">${crestHTML(G.teams[s.champ], 15)}<span>${esc(G.teams[s.champ].s)}</span></span></td>
        <td class="hide-s" style="color:var(--dim)">${esc(G.teams[s.cup].s)}</td>
        <td class="hide-s" style="color:var(--dim)">${s.s8 != null ? esc(G.teams[s.s8].s) : '—'}</td>
        <td class="hide-s" style="color:var(--dim)">${s.caf ? esc(s.caf) : '—'}</td>
        <td class="hide-s" style="color:var(--dim)">${s.afcon ? esc(natName(s.afcon)) : '—'}</td></tr>`).join('') + '</tbody></table>'
      : '<div class="empty">No completed seasons yet.</div>') + `</div>

  <div class="panel"><h3>Other clubs</h3>
    <div class="chipbar"><select id="clubPeek">${G.teams.slice().sort((a,b)=>a.tier-b.tier||a.n.localeCompare(b.n))
      .map(x => `<option value="${x.id}">${esc(x.n)} — ${TIER_SHORT[x.tier]}</option>`).join('')}</select>
      <button class="chip" id="peekGo">Look at their squad</button></div></div>

  <div class="panel"><h3>Save & Load<span class="sub">slot ${slot}</span></h3>
    <div class="pad" style="display:flex;gap:9px;flex-wrap:wrap;align-items:center">
      <button class="btn ghost sm" id="saveNow">Save now</button>
      <button class="btn ghost sm" id="switchSlot">Switch save slot</button>
      <button class="btn ghost sm" id="shareBtn">Share your season</button>
      <button class="btn danger sm" id="wipe">Start a new career</button>
    </div>
    <div class="pad" style="border-top:1px solid var(--line);display:flex;gap:14px;flex-wrap:wrap;align-items:center">
      <label class="hint" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="soundChk" ${soundOn ? 'checked' : ''}> Sound effects</label>
      <span class="hint">Mzansi Manager works on your phone and on a computer ( if you are using a phone, click the 3 dots on browser and check "desktop site" + rotate your phone) Contact us mzansimanager@gmail.com.</span>
    </div>
    <p class="hint" style="padding:0 13px 13px;margin:0">Saved in this browser only, across four slots. Clearing site data wipes it.</p></div>`;
  $('#saveNow').onclick = () => { save(); toast('Career saved in this browser.'); };
  const askBoardBtn = $('#askBoardBtn');
  if (askBoardBtn) askBoardBtn.onclick = askBoardModal;
  const allocSlide = $('#allocSlide');
  if (allocSlide) {
    const allocPreview = $('#allocPreview');
    const updAlloc = () => {
      const v = +allocSlide.value;
      allocPreview.textContent = v === 0 ? 'No change.' : v > 0
        ? `Move ${money(v)} from the transfer budget into the wage budget.`
        : `Move ${money(-v)} from the wage budget into the transfer budget.`;
    };
    allocSlide.oninput = updAlloc;
    $('#allocGo').onclick = () => {
      const res = reallocateBudget(G, +allocSlide.value);
      if (res.ok) { toast(res.msg); save(); render(); } else { toastWarn(res.msg); }
    };
  }
  $('#soundChk').onchange = e => { soundOn = e.target.checked; if (soundOn) playSound('click'); };
  $('#shareBtn').onclick = shareSeason;
  $('#switchSlot').onclick = () => {
    save();
    openModal('Switch save slot', '<p style="margin:0 0 10px;color:var(--dim)">This leaves your current career saved and returns to the club picker.</p>',
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="switchYes">Go to selection</button>`);
    $('#switchYes').onclick = () => { leavingApp = true; try { localStorage.removeItem(LAST_SLOT_KEY); } catch (e) { } location.reload(); };
  };
  $('#peekGo').onclick = () => squadPeek(+$('#clubPeek').value);
  $('#wipe').onclick = () => {
    openModal('Start a new career?', `<p style="margin:0;color:var(--dim)">This deletes slot ${slot} (${esc(t.n)}) for good and returns to club selection.</p>`,
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn danger sm" id="wipeYes">Delete and restart</button>`);
    $('#wipeYes').onclick = () => {
      try { localStorage.removeItem(slotKey(slot)); } catch (e) { }
      setSlotName(slot, '');
      try { localStorage.removeItem(LAST_SLOT_KEY); } catch (e) { }
      location.reload();
    };
  };
}

function squadPeek(id) {
  const t = G.teams[id];
  const sq = t.squad.slice().sort((a, b) => b.rating - a.rating);
  openModal(`${esc(t.n)}`, `
    <div class="kits" style="padding:0 0 10px">
      <div class="kit">${kitSVG(t, false, 66)}<small>Home</small></div>
      <div class="kit">${kitSVG(t, true, 66)}<small>Away</small></div>
      <div class="kit" style="align-self:center">${crestHTML(t, 46)}<small>Badge</small></div>
    </div>
    <p class="hint" style="margin:0 0 8px">${TIER_NAMES[t.tier]} · ${esc(t.city)} · XI rated ${teamOverall(t)} · budget ${money(t.budget)} · academy level ${t.academy}</p>
    <table class="tbl"><thead><tr><th>Player</th><th></th><th>Rat</th><th>Pot</th><th>Age</th><th>Value</th></tr></thead><tbody>` +
    sq.map(p => `<tr data-pid="${p.id}" style="cursor:pointer"><td><b>${esc(p.name)}</b> ${flagSVG(p.nat)}</td><td>${posTag(p.pos)}</td>
      <td class="num">${p.rating}</td><td class="num" style="color:var(--faint);white-space:nowrap">${potTxt(p)}</td>
      <td class="num">${p.age}</td><td class="num">${money(p.value)}</td></tr>`).join('') + `</tbody></table>`,
    `<button class="btn sm" onclick="closeModal()">Close</button>`);
  document.querySelectorAll('#modal tr[data-pid]').forEach(r => r.onclick = () => playerModal(+r.dataset.pid));
}

/* ---------------- MM Coins ---------------- */ /* Per-career premium currency. Earned by logging in to a save once per real-world day, converted into transfer budget.    Tune the economy here: */ const MM_DAILY = [10, 10, 15, 15, 20, 25, 50];            /* reward for day 1..7 of the login streak, then the cycle repeats */ const MM_VALUE = [0.12, 0.05, 0.02, 0.009, 0.005];         /* R millions of transfer budget per coin, by division (top flight first) */ const MM_ADS_ENABLED = false;                              /* flip to true once a rewarded-ad provider is wired into mmWatchAd() */ const MM_AD_REWARD = 5; const MM_COIN_IMG = 'mm-coin.png';   /* put mm-coin.png in the same folder as index.html */ let mmPopupShown = false; function mmCoinIcon(s) { return `<span class="mmc" style="--s:${s || 22}px">MM</span>`; } function ensureMM(g) {   g = g || G; if (!g) return null;   const m = g.mm = g.mm || {};   if (!Number.isFinite(m.coins)) m.coins = 0;   m.lastClaim = typeof m.lastClaim === 'string' ? m.lastClaim : '';   m.streak = m.streak | 0; m.best = m.best | 0; m.earned = m.earned | 0; m.converted = m.converted | 0; m.claims = m.claims | 0;   return m; } function mmTodayKey() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } function mmDayNum(key) { const p = key.split('-').map(Number); return Math.round(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000); } function mmCanClaim() { if (!G) return false; const m = ensureMM(G), t = mmTodayKey(); return !m.lastClaim || m.lastClaim < t; } /* a clock turned backwards cannot claim twice */ function mmNextStreak() { const m = ensureMM(G); if (!m.lastClaim) return 1; return (mmDayNum(mmTodayKey()) - mmDayNum(m.lastClaim)) === 1 ? m.streak + 1 : 1; } function mmReward(streakDay) { return MM_DAILY[(streakDay - 1) % MM_DAILY.length]; } function mmRate() { const t = me(); return MM_VALUE[Math.min(Math.max(t.tier | 0, 0), MM_VALUE.length - 1)]; } function mmHoursLeft() { const n = new Date(), e = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1); return Math.max(1, Math.ceil((e - n) / 3600000)); } function mmRefreshChip() {   if (!G) return; const m = ensureMM(G);   const el = document.getElementById('statCoins'); if (el) el.textContent = m.coins.toLocaleString('en-ZA');   const dot = document.getElementById('mmDot'); if (dot) dot.hidden = !mmCanClaim(); } function mmSaveQuiet() { try { saveSoon(); } catch (e) { } } function mmClaim() {   if (!G || !mmCanClaim()) return { ok: false, msg: 'Already claimed today — come back tomorrow.' };   const m = ensureMM(G), day = mmNextStreak(), amt = mmReward(day);   m.coins += amt; m.earned += amt; m.streak = day; m.best = Math.max(m.best, day); m.claims++; m.lastClaim = mmTodayKey();   mmSaveQuiet(); mmRefreshChip();   return { ok: true, amt, day }; } function mmConvert(n) {   const m = ensureMM(G);   if (G.jobless) return { ok: false, msg: 'You need a club before you can add to a transfer budget.' };   n = Math.floor(Number(n));   if (!(n >= 1)) return { ok: false, msg: 'Enter how many coins to convert.' };   if (n > m.coins) return { ok: false, msg: `You only have ${m.coins.toLocaleString('en-ZA')} MM Coins.` };   const t = me(), add = Math.round(n * mmRate() * 1000) / 1000;   m.coins -= n; m.converted += n; t.budget = Math.round((t.budget + add) * 100) / 100;   mmSaveQuiet(); mmRefreshChip();   return { ok: true, n, add }; } function mmWatchAd() {   if (!MM_ADS_ENABLED) { toast('Rewarded ads are coming soon.'); return; }   /* Wire a rewarded-ad SDK in here. Only on a completed view: const m = ensureMM(G); m.coins += MM_AD_REWARD; m.earned += MM_AD_REWARD; save(); render(); */ } function mmClaimAndCelebrate(fromModal) {   const r = mmClaim();   if (!r.ok) { toastWarn(r.msg); return; }   toastGood(`+${r.amt} MM Coins · day ${((r.day - 1) % 7) + 1} of your login streak`);   if (fromModal) closeModal();   render(); } function mmOnEnter() {   if (!G) return; ensureMM(G); mmRefreshChip();   if (!mmCanClaim() || mmPopupShown) return; mmPopupShown = true;   setTimeout(() => {     try {       if (!G || !mmCanClaim()) return;       const busy = (document.querySelector('.ctrScrim') || !$('#scrim').hidden || liveState);       const day = mmNextStreak(), amt = mmReward(day);       if (busy) { toast(`Your daily MM Coins are ready (+${amt}) — tap the coin at the top.`); return; }       openModal('Daily login reward', `<div style="text-align:center"><img src="${MM_COIN_IMG}" alt="" style="width:150px;max-width:50%;filter:drop-shadow(0 6px 14px rgba(0,0,0,.45))">         <div style="font:800 40px/1.1 var(--head);color:var(--gold)">+${amt} MM</div>         <p class="hint" style="margin:6px 0 0">Day ${((day - 1) % 7) + 1} of 7 · log in to this career every day to build your streak. Day 7 pays ${MM_DAILY[6]}.</p></div>`,         `<button class="btn" id="mmClaimNow">Claim +${amt} MM Coins</button> <button class="btn ghost" id="mmLater">Later</button>`);       $('#mmClaimNow').onclick = () => mmClaimAndCelebrate(true);       $('#mmLater').onclick = closeModal;     } catch (e) { }   }, 900); } function viewMMCoins() {   const v = $('#v-mmcoins'); v.classList.add('mmx', 'sqv');   const m = ensureMM(G), t = me(), rate = mmRate(), can = mmCanClaim();   const nextDay = mmNextStreak(), done = can ? (nextDay - 1) % 7 : ((m.streak - 1) % 7) + 1;   const rateTxt = money(rate) + ' per coin';   const tiles = sqTiles([['Balance', m.coins.toLocaleString('en-ZA') + ' MM', 'var(--gold)'], ['Converts at', rateTxt], ['Login streak', m.streak + (m.streak === 1 ? ' day' : ' days')], ['Total earned', m.earned.toLocaleString('en-ZA') + ' MM']]);   const days = MM_DAILY.map((a, i) => `<div class="mmday ${i < done ? 'done' : (can && i === done ? 'now' : '')} ${i === 6 ? 'big' : ''}"><small>Day ${i + 1}</small><b>${i < done ? '✓' : '+' + a}</b></div>`).join('');   const claimBlock = can     ? `<button class="btn" id="mmClaim">Claim +${mmReward(nextDay)} MM Coins</button>${m.streak > 0 && nextDay === 1 ? '<span class="hint" style="margin-left:10px">Your streak was broken — it starts again today.</span>' : ''}`     : `<span class="hint">Claimed for today. Next reward in about ${mmHoursLeft()} hour${mmHoursLeft() === 1 ? '' : 's'}.</span>`;   const quick = [10, 50, 100].filter(n => n <= m.coins).map(n => `<button class="btn ghost sm" data-q="${n}">${n}</button>`).join('') + (m.coins > 0 ? `<button class="btn ghost sm" data-q="${m.coins}">All</button>` : '');   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">MM Coins</button></div>${tiles}     <div class="panel"><div class="pad"><div class="mmhero"><img src="${MM_COIN_IMG}" alt="MM Coins">       <div><div class="bal">${m.coins.toLocaleString('en-ZA')}<small>MM Coins</small></div>       <p class="hint" style="margin:8px 0 0">Worth ${m.coins ? money(m.coins * rate) : 'R0'} of transfer budget for ${esc(G.jobless ? 'your next club' : t.n)}. Coins belong to this career save only.</p></div></div></div></div>     <div class="panel"><h3>Daily login reward</h3><div class="pad"><div class="mmdays">${days}</div>${claimBlock}</div></div>     <div class="panel"><h3>Convert to transfer budget</h3><div class="pad">       <p class="hint" style="margin:0 0 6px">1 MM Coin = ${money(rate)} at your current division. Better divisions pay more per coin. Conversion is one way.</p>       <div class="mmconv"><input type="number" id="mmAmt" min="1" step="1" max="${m.coins}" inputmode="numeric" placeholder="Coins" ${m.coins < 1 ? 'disabled' : ''}>${quick}<button class="btn" id="mmConv" ${m.coins < 1 || G.jobless ? 'disabled' : ''}>Convert</button></div>       <div class="mmprev" id="mmPrev">${m.coins < 1 ? 'Claim your daily reward to start collecting coins.' : ''}</div>       <div class="hint">Transfer budget now: <b>${money(t.budget)}</b></div></div></div>     ${mmqPanelHTML()}<div class="panel"><h3>More ways to earn</h3><div class="pad">       <div class="mmsoon"><div><b>Watch an ad</b><div class="hint">+${MM_AD_REWARD} MM Coins for each ad you watch to the end.</div></div>       <button class="btn ghost" id="mmAd" ${MM_ADS_ENABLED ? '' : 'disabled'}>${MM_ADS_ENABLED ? 'Watch ad' : 'Coming soon'}</button></div></div></div>`;   const cb = $('#mmClaim'); if (cb) cb.onclick = () => mmClaimAndCelebrate(false); mmqBind(v);   const amt = $('#mmAmt'), prev = $('#mmPrev');   const upd = () => { const n = Math.floor(Number(amt.value)); prev.textContent = n >= 1 ? `${n.toLocaleString('en-ZA')} MM → ${money(Math.round(n * rate * 1000) / 1000)} added to the transfer budget` : ''; };   if (amt) amt.oninput = upd;   v.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { amt.value = b.dataset.q; upd(); });   const conv = $('#mmConv'); if (conv) conv.onclick = () => {     const r = mmConvert(amt.value); if (!r.ok) { toastWarn(r.msg); return; }     toastGood(`${r.n} MM Coins → +${money(r.add)} transfer budget`); render();   };   const ad = $('#mmAd'); if (ad) ad.onclick = mmWatchAd; } /* ---------------- Daily MM challenges ---------------- */ const MMQ = {   win3:        { t: 'Win 3 matches in a row',            amt: 1, ic: '🔥' },   win5:        { t: 'Win 5 matches in a row',            amt: 2, ic: '🚀' },   cs2:         { t: 'Keep 2 clean sheets in a row',      amt: 1, ic: '🧤' },   goals4:      { t: 'Score 4 or more goals in a match',  amt: 1, ic: '⚽' },   giant:       { t: 'Beat a stronger team',              amt: 1, ic: '🗡️' },   sellUnhappy: { t: 'Sell an unhappy player',            amt: 1, ic: '💸' },   record:      { t: 'Break your club transfer record',   amt: 2, ic: '🏆' } }; function mmqState() {   const m = ensureMM(G), k = mmTodayKey();   if (!m.q || m.q.day !== k) m.q = { day: k, win: 0, cs: 0, done: {}, claimed: {}, pending: [] };   return m.q; } let _mmqTimer = null; function mmqSchedule() { if (!_mmqTimer) _mmqTimer = setTimeout(mmqShow, 1500); } function mmqEvent(id) {   if (!G || !MMQ[id]) return;   const q = mmqState(); if (q.done[id]) return;   q.done[id] = 1; q.pending.push(id); mmSaveQuiet(); mmqSchedule(); } function mmqMatch(G_, m) {   if (!m || m._mmq || (m.h !== G_.myTeam && m.a !== G_.myTeam) || m.forfeit) return;   m._mmq = true;   const home = m.h === G_.myTeam, gf = home ? m.hg : m.ag, ga = home ? m.ag : m.hg, q = mmqState();   q.win = gf > ga ? q.win + 1 : 0; q.cs = ga === 0 ? q.cs + 1 : 0;   if (q.win >= 3) mmqEvent('win3'); if (q.win >= 5) mmqEvent('win5');   if (q.cs >= 2) mmqEvent('cs2'); if (gf >= 4) mmqEvent('goals4');   if (gf > ga) { const opp = G_.teams[home ? m.a : m.h], mine = G_.teams[G_.myTeam]; if (opp && teamOverall(opp) > teamOverall(mine)) mmqEvent('giant'); }   mmSaveQuiet(); } function mmqClaim(id) {   const q = mmqState(), i = q.pending.indexOf(id); if (i < 0) return 0;   const c = MMQ[id], m = ensureMM(G); q.pending.splice(i, 1); q.claimed[id] = 1;   m.coins += c.amt; m.earned += c.amt; mmSaveQuiet(); mmRefreshChip();   try { playSound('coin'); } catch (e) { }   return c.amt; } function mmqPopup(c) {
  let root = document.getElementById('mmqPopRoot');
  if (!root) { root = document.createElement('div'); root.id = 'mmqPopRoot'; document.body.appendChild(root); }
  const d = document.createElement('div'); d.className = 'mmqPop';
  d.innerHTML = `<img src="${MM_COIN_IMG}" alt=""><div><div class="mmqAmt">+${c.amt} MM</div><div class="mmqTxt">${c.ic} ${esc(c.t)}</div></div>`;
  root.appendChild(d);
  setTimeout(() => d.classList.add('out'), 2600);
  setTimeout(() => d.remove(), 3100);
}
function mmqShow() {
  _mmqTimer = null;
  if (!G) return;
  const q = mmqState(); if (!q.pending.length) return;
  if (liveState || document.querySelector('.ctrScrim')) { _mmqTimer = setTimeout(mmqShow, 3000); return; }
  q.pending.slice().forEach((id, i) => setTimeout(() => { if (mmqClaim(id)) mmqPopup(MMQ[id]); }, i * 900));
} function mmqPanelHTML() {   const q = mmqState();   const prog = { win3: Math.min(3, q.win) + '/3', win5: Math.min(5, q.win) + '/5', cs2: Math.min(2, q.cs) + '/2' };   const rows = Object.keys(MMQ).map(id => {     const c = MMQ[id], pend = q.pending.includes(id), claimed = !!q.claimed[id];     const right = claimed ? '<span class="hint">✓ Claimed</span>' : pend ? `<button class="btn sm" data-mmq="${id}">Claim +${c.amt}</button>` : `<span class="hint">${prog[id] ? prog[id] + ' · ' : ''}+${c.amt} MM</span>`;     return `<div class="prow" style="grid-template-columns:auto 1fr auto;cursor:default"><span style="font-size:22px">${c.ic}</span><span class="who"><b>${esc(c.t)}</b></span>${right}</div>`;   }).join('');   return `<div class="panel"><h3>Daily challenges<span class="sub">reset every day</span></h3>${rows}</div>`; } function mmqBind(v) {   v.querySelectorAll('[data-mmq]').forEach(b => b.onclick = () => { const a = mmqClaim(b.dataset.mmq); if (a) { toastGood(`+${a} MM Coins`); render(); } }); } const _mmqCommit = commitMatch; commitMatch = function (G_, tier, m, ctx) { const r = _mmqCommit.apply(this, arguments); try { mmqMatch(G_, m); } catch (e) { } return r; }; const _mmqSell = sellPlayer; sellPlayer = function (G_, pid) {   const p = G_.teams[G_.myTeam].squad.find(x => x.id === pid), unhappy = !!p && (p.wantsOut || (p.mood != null && p.mood < 38));   const r = _mmqSell.apply(this, arguments);   try { if (r && r.ok && unhappy) mmqEvent('sellUnhappy'); } catch (e) { }   return r; }; const _mmqLog = logTransfer; logTransfer = function (G_, p, fromId, toId, fee) {   const r = _mmqLog.apply(this, arguments);   try { if (toId === G_.myTeam && fee > 0) { const m = ensureMM(G_); if (m.recFee > 0 && fee > m.recFee) mmqEvent('record'); if (!(m.recFee >= fee)) m.recFee = fee; } } catch (e) { }   return r; }; setInterval(() => { try { if (G && G.mm && G.mm.q && G.mm.q.pending && G.mm.q.pending.length) mmqSchedule(); } catch (e) { } }, 20000); const BTH_LOGO = 'bathini.png';   /* put bathini.png in the same folder as index.html */
const BTH_KEEP = 240;
const BTH_CAST = [
  { h: 'BathiniNews', n: 'Bathini News', k: 'news', v: 1, f: 2400000 }, { h: 'DiskiDaily', n: 'Diski Daily', k: 'media', v: 1, f: 1600000 },
  { h: 'ProfessorDiski', n: 'Professor Diski', k: 'pundit', v: 1, f: 910000, per: 'loud' }, { h: 'UncleBheki_Talks', n: 'Uncle Bheki', k: 'pundit', f: 320000, per: 'uncle' },
  { h: 'MaMkhize_Diski', n: 'Ma Mkhize', k: 'pundit', f: 410000, per: 'mama' }, { h: 'SkhokhoSports', n: 'Skhokho Sports', k: 'pundit', f: 260000, per: 'kasi' },
  { h: 'KasiXI', n: 'Kasi XI | stats', k: 'pundit', v: 1, f: 150000, per: 'nerd' }, { h: 'TransferTsotsi', n: 'Transfer Tsotsi', k: 'rumour', f: 520000, cred: 0.25 },
  { h: 'InsiderThabo', n: 'Insider Thabo', k: 'rumour', f: 330000, cred: 0.65 }, { h: 'my_cousin_knows', n: 'my cousin knows', k: 'rumour', f: 80000, cred: 0.1 },
  { h: 'SaltyDlamini', n: 'Salty Dlamini', k: 'troll', f: 70000, per: 'troll' }, { h: 'TheRatioKing', n: 'The Ratio King', k: 'troll', f: 90000, per: 'troll' }, { h: 'VuvuzelaVince', n: 'Vuvuzela Vince', k: 'troll', f: 60000, per: 'troll' }
];
const BTH_FIRST = ['Sipho', 'Thabo', 'Lerato', 'Bongani', 'Zanele', 'Mpho', 'Themba', 'Nomsa', 'Kagiso', 'Lindiwe', 'Tshepo', 'Sizwe', 'Naledi', 'Andile', 'Palesa', 'Lwazi', 'Ayanda', 'Pule', 'Khaya', 'Siya', 'Xolani', 'Mandla', 'Refilwe', 'Dumisani', 'Thandi', 'Vusi', 'Neo', 'Gift', 'Blessing', 'Karabo', 'Tumi', 'Zinhle', 'Sbu', 'Musa', 'Thulani', 'Nandi', 'Lebo', 'Tebogo', 'Jabu', 'Zodwa'];
const BTH_PERSONAS = ['believer', 'believer', 'doomer', 'doomer', 'troll', 'nerd', 'uncle', 'mama', 'kasi', 'kasi', 'plain', 'plain', 'plain'];
const BTH_TONE_BIAS = { believer: { hype: 4, win: 3, love: 3 }, doomer: { doubt: 4, rage: 3, loss: 3, plumber: 2 }, troll: { plumber: 3, joke: 3, rage: 2, gloat: 3 } };
const BTH_FLAVOR = { uncle: ['In my day we had real managers.', 'Football was better when we listened to it on radio.', 'I have been saying this since 1998.'], mama: ['Mntanami, calm down.', 'Eat something first, then tweet.', 'I am praying for this team.'], nerd: ['(the xG disagrees 📊)', '(sample size: tiny)', '(numbers do not lie, people do)'], kasi: ['fr fr', 'no cap', 'sharp sharp 🤝'], loud: ['I SAID WHAT I SAID.', 'Write this down.'] };
const BTH_B = {
  hire: {
    hype: ["I really believe in {c}'s new manager. {m} is going to prove everyone wrong 🙏", "Say what you want but I like the {m} appointment. Give the man time to cook.", "{c} fans, let's be patient with {m}. Rome wasn't built in one matchday.", "Everyone is laughing at {m} now. We'll see who is laughing in December. #{CT}", "New manager, new energy. {m} could be the best business {c} do this season.", "Watch {c} under {m}. Something is brewing 👀"],
    plumber: ["{c} have hired a plumber. {m}?? Who is this man 😭 #Plumber", "{m} is a plumber, sorry. The {c} board must be playing Football Manager. #Plumber", "{m}... as in WHO? Did {c} find him on Facebook Marketplace?", "Hayibo, {c} appointing {m}. Next they hire the guy who fixes my geyser 🔧", "{c} gave the job to {m}. My plumber has a better CV and he arrives with his own spanner.", "Another plumber at {c}. Somebody call the board, there's a leak in the dressing room 🔧 #Plumber", "{m} to {c}. Wake me up for the sacking."],
    rival: ["{m} to {c}? Eish. See you in the relegation zone 😂", "Congratulations {c} on a very brave appointment. Brave like jumping out of a plane without checking the parachute.", "{c} have hired {m}. Thank you {c}, we needed the three points."],
    official: ["OFFICIAL | {C} are pleased to confirm {m} as first-team manager. Welcome to the club, coach. #{CT}", "OFFICIAL | {C} have appointed {m} as manager. The board thanks the staff who held the fort in the interim."],
    news: ["BREAKING: {C} appoint {m} as their new manager. #{CT}", "{C} have a new man in charge: {m}. Contract details not disclosed."]
  },
  sack: {
    glee: ["{c} have sacked their manager. FINALLY. A decision that made sense.", "Another manager down. The {c} job is cursed 💀 #{CT}", "He was a dead man walking since matchday 3. Everybody knew.", "Who's next on the {c} merry-go-round? Asking for a friend (I'm the friend).", "Sacked? He lasted longer than my last data bundle."],
    pity: ["Not the manager's fault. The board is the problem. It is always the board. #BoardOut", "Sacking the coach again won't fix {c}. The squad was built by committee.", "Poor man never had a chance with that squad."],
    news: ["{C} are looking for a new manager. {rs}", "{C} part ways with their manager. {rs}"],
    job: ["Applications open at {c}. Plumbers, please queue on the left 🔧", "Who takes over at {c}? Hear me out: me. I own a whistle."]
  },
  myhire: {
    hype: ["{c} just landed {m}!! This is the appointment we needed 🔥 #{CT}", "I like {m}. Proper CV. {c} got this one right.", "{m} at {c}. Quietly one of the best appointments in the league."],
    doubt: ["{m}?? Who? {c} could have hired anyone and they chose a plumber 😭 #Plumber", "I've never heard of {m}. Does he even own a tracksuit?", "Prove us wrong, {m}. But my money is on three months and a farewell post.", "{c} board: 'We want a bold project.' Also {c} board: hires {m}. Hayibo."],
    old: ["{m} leaves {old} for {c}. Loyalty is dead 😤", "{old} fans, we should have seen this coming. He was always looking at the door."],
    official: ["OFFICIAL | {C} welcome {m} as the new first-team manager. #{CT}"]
  },
  signMine: {
    hype: ["{p} to {c}!! This is the kind of signing that changes a season 🔥", "{p} is a serious player. {c} finally using the budget properly.", "{ml} cooking quietly. {p} is a statement signing 👀", "I've watched {pl} for two seasons. {c} just stole him, mark my words."],
    doubt: ["{fee} for {p}?? Hayibo. {m} is being robbed.", "Who is {p}? Did the scouts pick him off a YouTube compilation?", "{pl} at {c} is a downgrade. Don't @ me.", "I've seen {pl} play. Respectfully, no.", "{fee} for {pl}. I could have found a better player at the taxi rank."],
    free: ["Free signing so no complaints. But don't expect miracles from {pl}.", "{p} on a free. Cheap, sensible, boring. I'll take it."],
    joke: ["{c} signed {p}. Mama says he looks like the type to score once and disappear for six weeks.", "{pl} has arrived. The #Plumber is building a squad one signing at a time."],
    official: ["OFFICIAL | {C} are delighted to announce the signing of {p} ({pos}, {r}) from {c2}.", "DONE DEAL | {p} joins {C} from {c2}. Fee: {fee}."]
  },
  sellMine: {
    rage: ["Why would {c} sell {p}?? {m} must explain this one 😤", "Selling {pl} is the day this club chose peace over ambition.", "Who is replacing {pl}? Nobody? Okay then. #{CT}", "{c2} just took {pl} and we said thank you. Thank you?!"],
    shrug: ["{fee} for {pl} is good business. Reinvest properly this time.", "Fine, sell him. He was never worth the wage anyway."],
    gloat: ["WELCOME {pl} to {c2}!! Thank you {c} 😂", "{c2} just robbed {c} in broad daylight. Beautiful."],
    clause: ["A release clause?? Who signed that contract? Fire the lawyer 😭", "{c2} just waltzed in and paid the clause for {pl}. This club is a joke.", "Release clause triggered. Another day, another heartbreak. #{CT}"],
    news: ["DONE DEAL | {p} leaves {C} for {c2}. Fee: {fee}."]
  },
  aiMove: {
    sellerFan: ["{c} just sold {p}. This club has no ambition.", "Thank you for everything, {pl}. You deserved better than {c}.", "Not {pl}!! Why do the best players always leave {c}?"],
    buyerFan: ["WELCOME {pl} to {c2}!! 🔥🔥", "{c2} are serious this season. {pl} is a proper signing.", "{pl} at {c2}. We are so back."],
    news: ["DONE DEAL | {p} moves from {c} to {c2} for {fee}. #Transfers", "{c2} have completed the signing of {p} from {c}."],
    doubt: ["{fee} for {pl}? In this economy?", "Overpaid and overrated. {c2} will regret this."],
    brag: ["Told you so. I said {pl} to {c2} weeks ago. Pay me 💰", "Called it. {pl} to {c2}. You can apologise now."],
    fake: ["Source: my uncle works at {c2}. He says the fee was double what they told you."]
  },
  free: { news: ["{p} is a free agent. Which club has the nerve? 👀 #Transfers", "{p} leaves {c} on a free. Another one the board let walk."] },
  req: { rage: ["{p} wants out?? After everything {c} did for him? Ungrateful.", "{pl} handed in a transfer request. {m} has a fire to put out 🔥"], pity: ["Can you blame {pl}? Look at this squad.", "Fake news. {pl} loves this club. Sit down."] },
  watch: { fan: ["Scouts watching {pl} again. If he leaves {c}, I'm done.", "Every time {pl} plays well, scouts appear. Leave our boy alone!"] },
  youth: { hype: ["{p} ({age}) is already rated {r}. Remember where you heard it first.", "Keep an eye on {pl}. The kid is different."] },
  retire: { tribute: ["{p} retires at {age}. A proper professional. Thank you for everything 🙏", "Legend. {n} career goals. Give the man a statue.", "He's retiring? He's still quicker than my son."] },
  award: { official: ["{p} ({c}) wins the {s} {lg} {aw} 🏅", "{lg} | {s} {aw}: {p} ({c}). Congratulations."], hype: ["Deserved! My boy {pl}! Ayoba!", "{pl} deserved it. No debate."], hate: ["Because he plays for a big club.", "Penalties shouldn't count 😂", "Rigged. I said what I said."] },
  promo: { hype: ["PROMOTED! {c} are going up!!! 🙌 #{CT}", "We are going up. Tell your mother, tell your cousins."], rel: ["{c} relegated. Burn it all down (metaphorically).", "Relegated. The board has a lot of explaining to do. #{CT}"], news: ["{c} {vb} the {lg2}. #{CT}"] },
  hat: { hype: ["{p} just hit a hat-trick for {c}! The man is HIM 🎩", "Hat-trick for {pl}. Defenders, we need a word.", "{pl} with three?? Somebody check the defending."] },
  watchnews: { rum: ["Hearing {c2} are watching {p} closely. Hear it here first. #Transfers"] },
  match: {
    bigWin: ["{sc} against {o}!! {m} is a genius, I take back everything I said 🔥", "This is not a team, it's a statement. #{CT}", "{o} got a proper lesson today 😂"],
    win: ["Three points. Ugly or not, I'll take it. {c} 🙌", "{c} {sc} {o}. Make noise 🔊", "Winning ugly is still winning. Next."],
    narrow: ["My heart can't handle this team. {sc} but we take it.", "{sc} against {o}. Stress levels: critical."],
    draw: ["A draw?? Two points dropped. #Plumber", "Fair result. Neither team deserved it. Boring.", "{sc} against {o}. I want my 90 minutes back."],
    loss: ["{sc} against {o}?! {m} out. I said what I said.", "Same old {c}. Disappointing again.", "I can't keep doing this to myself. {c} lost AGAIN 😭"],
    heavy: ["{sc}. This is embarrassing. {m} should resign before the board decides for him.", "Delete the club app. I'm done. #{ml}Out", "{o} played with their eyes closed and still won {sc}. Eish."],
    gloat: ["Thank you {c} for the three points 😘", "{c} came here and got what they deserved. Next!"], cope: ["{c} got lucky. The table will tell the truth in May.", "Robbed by {c}. The ref was clearly on their payroll."],
    star: ["{p} with {n} today!", "{p} was unplayable. Man of the match, no debate."],
    streakW: ["{n} wins in a row! Is this team real? 😳", "{n} wins on the trot. Don't wake me up."],
    streakL: ["{n} defeats in a row. Somebody sell the club.", "{n} losses. At this point it's a hobby."],
    out: ["#{ml}Out is trending and honestly? I'm not mad about it.", "Board, if you're reading this: you know what to do."],
    army: ["The #{ml}Army is growing 🔥", "Who doubted {m}? Raise your hand so I can screenshot it."]
  },
  speak: {
    back: ["I back my players 100%. We win together, we lose together. #{CT}", "Proud of the boys. Keep believing, {c} family."],
    honest: ["Honest truth: we weren't good enough. We will fix it.", "I take responsibility. Next matchday we respond."],
    big: ["We will win the league this season. Write it down. #{CT}", "Nobody in this league scares us. Nobody."],
    none: ["No comment. Next question.", "Eyes on the next game. That's all I'll say."],
    ref: ["I won't say anything about the referee. But you all saw it.", "Some decisions today were... interesting. That's all."],
    joke: ["Weekend plan: win. Plan B: see plan A 😄", "Someone told me I'm a plumber. I fixed that leak in the defence already 🔧"]
  },
  player: {
    roast: ["{pl} is averaging {avg} this season. At some point a bad run becomes a personality.", "Who keeps picking {pl}? {m}, blink twice if you are being held hostage.", "{pl} touched the ball three times and lost it four. Even the maths is failing us.", "I have seen better movement at a taxi rank. {pl}, I am looking at you.", "Respectfully, {pl} must be sold. Today. #{CT}", "{pl} was invisible again. Somebody check if he travelled with the team."],
    goalless: ["{pl} has {gl} goals in {ap} games. A striker? Or a very expensive spectator?", "{gl} goals from {pl} this season. Even the corner flag has more influence.", "{pl} could not score in an empty net. Sorry, a full one. Sorry, anywhere."],
    pricey: ["{pl} earns {wage} a season. My neighbour's dog works harder and does not ask for a new contract.", "{wage} a season for {pl}?? The board is paying for the name, not the player.", "Imagine being paid {wage} to give the ball away. {pl} living the dream."],
    praise: ["{pl} is averaging {avg} this season. Somebody give the man a statue 🔥", "Stop sleeping on {pl}. Best player at {c} and it is not close.", "{pl} again. Consistent, quiet, deadly. #{CT}"]
  },
  contract: { hype: ["{pl} signs a new deal at {c}. That's how you keep a legend 🙌", "Finally! Pay the man! {pl} stays. #{CT}"], doubt: ["{wage} a season for {pl}? Eish. I hope the board knows what it is doing.", "New deal for {pl}? Respectfully, why?"] },
  nation: { qual: ["Bafana qualify for the {af}! 🇿🇦 Hayi suka, we are back!", "Bafana at the {af}. Let's go! 🇿🇦"], miss: ["Bafana miss out on the {af}. Again. Surprise nobody.", "No {af} for Bafana. Somebody has questions to answer."], win: ["{w} win the {af}! What a tournament 🏆"] },
  cup: { news: ["{c} lift the {cup}! 🏆 #{CT}", "{cup} | {c} are the champions."], hype: ["{c} are CHAMPIONS! Tell your mother, tell your cousins 🏆", "Cups don't win themselves. Well done {c}!"], hate: ["The cup is just a participation trophy. I said what I said.", "{c} won it? Somebody check the draw."] },
  mysack: { glee: ["{m} sacked! The plumber has been shown the door 🔧 #{ml}Out", "Finally. {c} can breathe again."], pity: ["Sacking {m} is the easy option. The board should look in the mirror. #BoardOut", "He deserved more time. Football has no patience."], news: ["BREAKING: {C} have sacked {m}. #{CT}"] },
  promise: { kept: ["He said it and he did it. {m} keeps his word 🔥", "Talk big, play big. Respect, {ml}."], broke: ["Write it down, he said. We wrote it down 📸 #{ml}Out", "Talk big, play small. Classic plumber 🔧", "{m}: 'Nobody scares us.' The scoreboard: 'Hold my beer.'"] },
  speakR: { pos: ["Coach {ml} said it. Respect 🙌", "That's the kind of manager we need. #{CT}", "Say it again, Coach. We believe."], neg: ["Words, words, words. Win something.", "Talk is cheap, {m}. See you on the pitch.", "Plumber speaks 🔧😂"], big: { pos: ["Confidence! I love it 🔥", "Finally a manager with some spine."], neg: ["Write it down? Screenshotting this 📸", "Bold talk from a man with that squad."] }, ref: { pos: ["Say it louder, Coach! The ref was a disgrace.", "Somebody finally said it."], neg: ["Blaming the ref again? Classic plumber move 🔧", "The ref didn't miss those chances, Coach."] } },
  rumour: {
    interest: ["BREAKING: {c2} are lining up a bid for {p}. Sources close to the club. #Transfers", "Hearing {c2} have made contact for {p}. Hear it here first.", "{p} to {c2} is 'close'. Medical booked. (I made up the last part.)"],
    mineOut: ["Hearing {p} is unhappy at {c} and wants out. Not confirmed, but my cousin is the kit man.", "{p} has told friends he wants a new challenge. #{CT}"],
    sack: ["{m} to be sacked on Friday. Source: a guy at the car wash.", "Board meeting at {c} tonight. {m} is gone. Believe it. 👀"],
    conf: ["Told you. I said {pl} to {c2}. Pay me 💰", "Called it. Bathini check my timeline."],
    check: ["Bathini Check | Claim: \"{claim}\". Verdict: no evidence. Treat with caution."],
    debunk: ["Fake news again 🤡", "Delete your account.", "Your cousin is a liar.", "Source: trust me bro."]
  },
  life: ["Load shedding hit during the second half. I now support whichever team won. #LoadShedding", "Taxi driver just told me he can coach better than any {lg} manager. I believe him.", "My data finished at 78 minutes. This is how I find out the score.", "Referees in this league are doing their own thing. Always have.", "Kasi football > everything. Fight me.", "{lg}: where anything can happen and usually does.", "Why is the pie at the stadium R65? Why?", "My uncle says the old days were better. My uncle also says the earth is flat.", "{c} fans, how are we feeling this morning? Be honest.", "Fantasy league update: I'm last. I will not be taking questions.", "Dear {c} board: sell the club or sell the strikers. Pick one. Love, fans.", "Mama: 'Why are you shouting at the TV?' Me: 'Because the TV can hear me.'", "Football without shouting at the referee is just walking.", "Saturday plan: wake up, argue about {c}, repeat.", "Every club's fans think they are the main character. (We are, though.)", "Bathini is only fun when your team wins. Anyway.", "Someone explain the offside rule to my dad, please. He's been watching since 1994.", "The braai is more important than the result. But the result matters too."],
  date: { '06-16': "Happy Youth Day, Mzansi! Give the young players a chance. 🇿🇦 #YouthDay", '08-09': "Happy Women's Day to every mama who raised a football fan. 💐 #WomensDay", '09-24': "Happy Heritage Day! Braai, football and good people. 🇿🇦 #HeritageDay", '12-25': "Merry Christmas, football family. Even the referees. Mostly. 🎄", '01-01': "New year, new season, same old hopes. Happy New Year, Bathini! 🎆", '04-27': "Happy Freedom Day, Mzansi 🇿🇦 #FreedomDay" },
  table: { top: ["{c} go top of the {lg}! The table doesn't lie 📈", "{c} on top of the log. Don't wake me up."], topFan: ["Top of the league, and I refuse to look at the schedule 😂", "Whoever said {c} were finished, where are you?"], bot: ["{c} sit bottom of the {lg}. At this point it's a hobby.", "{c} at the bottom. The board is on holiday."] },
  upset: ["{c} {sc} {o}?? In THIS economy? #{lgt}", "Giant killed: {c} stun {o} {sc}. Football, man."],
  scorer: ["{p} bagged {n} for {c}. This man is on a different planet.", "Player of the Round: {p} ({c}), {n} goals. #{lgt}"],
  react: {
    agree: ["Facts.", "Say it louder 🔥", "This is the take.", "100%", "Finally someone said it.", "Tell them, bra."],
    disagree: ["This is the worst take I've seen today.", "Delete this.", "You watch football with your eyes closed?", "Ratio.", "Who let you cook?", "Hai suka, man."],
    joke: ["😂😂😂💀", "I'm crying 😭", "Screenshotting this for December.", "Not me reading this at work 😂", "Eish. Painful."],
    love: ["Ayoba! 🔥", "That's my team! 🙌", "Up the club!", "Yes Coach!"],
    hate: ["You said the same thing last year.", "Cope.", "Block and move on.", "Hayibo, this is why I mute you."]
  }
}; 
  /* ---- engine ---- */
const bthR = () => Math.random(), bthI = (a, b) => a + Math.floor(bthR() * (b - a + 1)), bthP = a => a[Math.floor(bthR() * a.length)];
const bthRecent = [];
function bthPick(a) { let c = a.filter(x => bthRecent.indexOf(x) < 0); if (!c.length) c = a; const x = bthP(c); bthRecent.push(x); if (bthRecent.length > 70) bthRecent.shift(); return x; }
const bthFill = (s, c) => s.replace(/\{(\w+)\}/g, (m, k) => c[k] != null ? c[k] : m);
const bthSlug = s => String(s || '').replace(/[^A-Za-z0-9]/g, '');
const bthClamp = (x, a, b) => Math.max(a, Math.min(b, x));
function bthDate(g) { return new Date(seasonStartUTC(g.season) + (g.curDay || 0) * 86400000).toISOString().slice(0, 10); }
function bthK(n) { return n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? Math.round(n / 100) / 10 + 'K' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n); }
function bthEnsure(g) {
  g = g || G; if (!g || !g.teams || g.myTeam == null || !g.manager) return null;
  if (g.bth) return g.bth;
  const B = g.bth = { v: 1, seq: 1, posts: [], users: {}, liked: {}, rted: {}, seen: 0, heat: 0, rum: [], last: {}, streak: [], bud: 14, spoke: -1 };
  BTH_CAST.forEach(c => { B.users[c.h] = Object.assign({}, c); });
  try { bthSeed(g); } catch (e) { console.error('Bathini seed', e); }
  return B;
}
function bthUnread() { const B = (typeof G !== 'undefined' && G) ? bthEnsure(G) : null; if (!B) return 0; return Math.min(99, B.posts.filter(p => p.id > B.seen).length); }
/* ---- accounts ---- */
function bthLeagueAcct(g, tier) { const B = g.bth, h = ['mzansipremierleague', 'mzansichampionship', 'mzansi3rddivision', 'mzansi4thdivision', 'mzansi5thdivision'][tier]; return B.users[h] || (B.users[h] = { h, n: TIER_NAMES[tier], k: 'league', v: 1, f: Math.round(2400000 / (1 + tier)) }); }
function bthClubAcct(g, t) { const B = g.bth, h = bthSlug(t.s) + 'Official'; return B.users[h] || (B.users[h] = { h, n: t.n, k: 'club', v: 1, cid: t.id, f: Math.round(40000 + t.rep * 60000) }); }
function bthHandle(first, t) {
  const s = bthSlug(t.s), l = first.toLowerCase(), d = bthI(10, 9999), area = bthP(['011', '031', '021', '012', '051', '041']);
  return bthP([() => l + d, () => first + d, () => first + '_' + s, () => l + '_' + s.toLowerCase() + 'fc', () => s + 'Till_I_Die', () => 'Kasi_' + first, () => 'The' + first + 'Show', () => first + '_' + area, () => s + 'Faithful' + bthI(1, 99), () => 'Mr' + first + bthI(1, 99)])();
}
function bthFan(g, tid) {
  const B = g.bth, mine = Object.values(B.users).filter(u => u.k === 'fan' && u.club === tid);
  if (mine.length >= 7 || (mine.length >= 2 && bthR() < 0.7)) return bthP(mine);
  const t = g.teams[tid], first = bthP(BTH_FIRST); let h = bthHandle(first, t);
  if (B.users[h]) return B.users[h];
  return B.users[h] = { h, n: first + ' ' + personName('ZA').last, k: 'fan', club: tid, per: bthP(BTH_PERSONAS), f: bthI(30, 4000) };
}
function bthNeutral(g) { const B = g.bth, fans = Object.values(B.users).filter(u => u.k === 'fan'); if (fans.length > 20 && bthR() < 0.75) return bthP(fans); return bthFan(g, bthI(0, g.teams.length - 1)); }
function bthCast(g, kind) { return bthP(Object.values(g.bth.users).filter(u => u.k === kind)); }
function bthMgrUser(g) { const B = g.bth, h = bthSlug(g.manager.name); return B.users[h] || (B.users[h] = { h, n: g.manager.name, k: 'mgr', me: 1, f: 60000 + Math.round((g.manager.rep || 40) * 4000) }); }
/* ---- posting ---- */
const BTH_KB = { league: 5000, news: 3800, media: 2200, pundit: 1500, rumour: 1200, club: 2600, troll: 300, fan: 70, mgr: 900 };
function bthTone(u, w) { const bias = (u && BTH_TONE_BIAS[u.per]) || {}; let tot = 0; const e = Object.keys(w).filter(k => w[k] > 0).map(k => { const x = w[k] * (bias[k] || 1); tot += x; return [k, x]; }); let r = bthR() * tot; for (const [k, x] of e) { if ((r -= x) < 0) return k; } return e.length ? e[0][0] : null; }
function bthFlavor(u, t) { const f = BTH_FLAVOR[u.per]; return f && bthR() < (u.k === 'fan' ? 0.22 : 0.3) ? t + ' ' + bthP(f) : t; }
function bthAdd(g, u, text, o) {
  o = o || {}; const B = g.bth; if (B.posts.slice(0, 60).some(x => x.t === text)) return null;
  const base = (BTH_KB[u.k] || 70) * (u.k === 'fan' ? 0.4 + (u.f || 100) / 800 : 1), spicy = /#Plumber|Out\b|sack|fake|hayibo|worst/i.test(text) ? 1.5 : 1, hb = o.me ? 1 + Math.abs(B.heat) / 120 : 1;
  let lk = Math.round(base * (0.15 + bthR() * 1.1) * spicy * hb) + bthI(0, 12); const viral = bthR() < 0.04; if (viral) lk *= 9;
  const post = { id: B.seq++, d: bthDate(g), r: g.round, h: u.h, t: text, lk, rt: Math.round(lk * (0.05 + bthR() * 0.3)), rn: 0, rp: [] };
  ['pid', 'tid', 'me', 'mg', 'fl'].forEach(k => { if (o[k] != null) post[k] = o[k]; }); if (viral) post.vi = 1;
  const nr = o.noRep || bthR() < 0.3 ? 0 : bthI(1, u.k === 'fan' ? 2 : 3), pool = o.mood === 'pos' ? ['agree', 'love', 'love', 'joke', 'hate'] : o.mood === 'neg' ? ['agree', 'disagree', 'joke', 'joke', 'hate'] : ['agree', 'disagree', 'joke', 'love', 'hate'];
  for (let i = 0; i < nr; i++) { const ru = bthNeutral(g); post.rp.push({ h: ru.h, t: bthP(BTH_B.react[bthP(pool)]), l: bthI(0, 80) }); }
  post.rn = nr + Math.round(lk * (0.03 + bthR() * 0.2)); if (u.k === 'troll' && bthR() < 0.35) { post.rn = lk * 2 + 9; post.ra = 1; }
  B.posts.unshift(post); if (B.posts.length > BTH_KEEP) B.posts.length = BTH_KEEP; B.bud--; return post;
}
function bthSay(g, u, sit, w, ctx, o) { const tone = bthTone(u, w); const arr = tone && BTH_B[sit] && BTH_B[sit][tone]; if (!arr) return null; return bthAdd(g, u, bthFlavor(u, bthFill(bthPick(arr), ctx)), o); }
function bthSayNews(g, u, arr, ctx, o) { return bthAdd(g, u, bthFill(bthPick(arr), ctx), o); }
/* ---- context ---- */
function bthBase(g) { const me = g.teams[g.myTeam], n = g.manager.name; return { m: n, ml: bthSlug(n.split(' ').pop()), c: me.s, C: me.n, CT: bthSlug(me.s), lg: TIER_NAMES[me.tier], lgt: bthSlug(TIER_SHORT[me.tier]), s: seasonLabel(g.season), af: typeof AFCON_NAME !== 'undefined' ? AFCON_NAME : 'AFCON' }; }
function bthPC(p) { return { p: p.name, pl: p.last || p.name.split(' ').pop(), pos: p.pos, r: p.rating, age: p.age }; }
function bthTC(t, sfx) { sfx = sfx || ''; return { ['c' + sfx]: t.s, ['C' + sfx]: t.n, ['CT' + sfx]: bthSlug(t.s) }; }
function bthFindByName(g, name) { for (const t of g.teams) for (const p of t.squad) if (p.name === name) return { p, t }; const fa = (g.freeAgents || []).find(x => x.name === name); return fa ? { p: fa, t: null } : null; }
function bthStar(g, p, t) { const B = g.bth, k = g.season + ':' + g.round; if (!B.cut || B.cut.k !== k) B.cut = { k }; if (B.cut[t.tier] == null) { const a = []; g.teams.forEach(x => { if (x.tier === t.tier) x.squad.forEach(q => a.push(q.rating)); }); a.sort((x, y) => y - x); B.cut[t.tier] = a[Math.floor(a.length * 0.12)] || 70; } return p.rating >= B.cut[t.tier]; }
function bthTop11(t) { const a = t.squad.map(p => p.rating).sort((x, y) => y - x).slice(0, 11); return a.reduce((s, x) => s + x, 0) / Math.max(1, a.length); }
const bthOk = (B, prio) => prio >= 2 || B.bud > 0;
function bthFanOrNeutral(g, tid) { return bthR() < 0.6 && tid != null ? bthFan(g, tid) : bthNeutral(g); }
/* ---- reacting to the game's news ---- */
function bthOnNews(g, kind, text, meta) {
  if (!g.bth || !g.teams || g.myTeam == null) return;
  const B = g.bth, me = g.teams[g.myTeam], T = n => g.teams.find(t => t.n === n || t.s === n); let m;
  const pl = meta && meta.pid != null ? findPlayer(g, meta.pid) : null;
  if (kind === 'career') {
    if ((m = text.match(/^(.+) wins the (.+) Golden Boot with (\d+) goals for (.+)\.$/))) return bthAward(g, m[1], 'Golden Boot (' + m[3] + ' goals)', m[2], meta && meta.pid);
    if ((m = text.match(/^(.+) \((.+)\) is named (.+) Player of the Season/))) return bthAward(g, m[1], 'Player of the Season', m[3], meta && meta.pid);
    if ((m = text.match(/^(.+) \((.+), \d+\) is named (.+) Young Player of the Season/))) return bthAward(g, m[1], 'Young Player of the Season', m[3], meta && meta.pid);
    return;
  }
  if (kind === 'transfer') {
    if ((m = text.match(/ signs for (.+) from (.+) for (.+)\.$/)) && meta && meta.toId === me.id && pl) return bthSignMine(g, pl.p, T(m[2]), m[3]);
    if (/ sign free agent /.test(text) && meta && meta.toId === me.id && pl) return bthSignMine(g, pl.p, null, 'free');
    if ((m = text.match(/^(.+) trigger (.+)'s release clause and sign him from (.+) for (.+)\.$/)) && meta && meta.fromId === me.id && pl) return bthSellMine(g, pl.p, T(m[1]), m[4], true);
    if ((m = text.match(/ leaves (.+) for (.+)\. Fee: (.+)\.$/)) && meta && meta.fromId === me.id && pl) return bthSellMine(g, pl.p, T(m[2]), m[3], false);
    if ((m = text.match(/^(.+) moves from (.+) to (.+) for (.+)\.$/)) && pl) return bthAiMove(g, pl.p, T(m[2]), T(m[3]), m[4]);
    if ((m = text.match(/^(.+) leaves (.+) as a free agent\.$/))) { const f = bthFindByName(g, m[1]), t = T(m[2]); if (f && t && bthStar(g, f.p, t) && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), bthPC(f.p), bthTC(t)); bthSayNews(g, bthCast(g, 'media'), BTH_B.free.news, ctx, { pid: f.p.id, tid: t.id }); } return; }
    if ((m = text.match(/^(.+) hands in a transfer request at (.+)\.$/))) { const f = bthFindByName(g, m[1]); if (f) bthRequest(g, f.p); return; }
    if ((m = text.match(/^Scouts from (.+) have been watching (.+)\.$/)) && pl) return bthWatch(g, pl.p, pl.t);
    return;
  }
  if (kind === 'season') {
    if ((m = text.match(/^(.+) wins the (.+) Golden Boot with (\d+) goals for (.+)\.$/))) return bthAward(g, m[1], 'Golden Boot (' + m[3] + ' goals)', m[2]);
    if ((m = text.match(/^(.+) \((.+)\) is named (.+) Player of the Season/))) return bthAward(g, m[1], 'Player of the Season', m[3]);
    if ((m = text.match(/^(.+) \((.+), \d+\) is named (.+) Young Player of the Season/))) return bthAward(g, m[1], 'Young Player of the Season', m[3]);
    if ((m = text.match(/^(.+) are named (.+) Manager of the Season/))) { const t = T(m[1]); if (t && bthOk(B, 2)) bthAdd(g, bthLeagueAcct(g, t.tier), (t.mgr && t.id !== me.id ? t.mgr.name : 'The ' + t.s + ' gaffer') + ' is the ' + m[2] + ' Manager of the Season. Nobody saw it coming.', { tid: t.id, mg: 1 }); return; }
    if ((m = text.match(/^(.+) are promoted to the (.+)\.$/))) return bthPromo(g, T(m[1]), 'are promoted to', m[2], true);
    if ((m = text.match(/^(.+) drop into the (.+)\.$/))) return bthPromo(g, T(m[1]), 'drop into', m[2], false);
    return;
  }
  if (kind === 'cup') { if ((m = text.match(/^(.+) (?:lift|win) the (.+)\.$/))) { const t = T(m[1]); if (t && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), bthTC(t), { cup: m[2] }); bthSayNews(g, bthCast(g, 'news'), BTH_B.cup.news, ctx, { tid: t.id, me: t.id === me.id ? 1 : null }); bthSay(g, bthFan(g, t.id), 'cup', { hype: 3 }, ctx, { tid: t.id }); bthSay(g, bthNeutral(g), 'cup', { hate: 1 }, ctx, { tid: t.id }); } } return; }
  if (kind === 'match') { if ((m = text.match(/^(.+) scores a hat-trick for (.+)\.$/))) { const f = bthFindByName(g, m[1]), t = T(m[2]); if (f && t && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), bthPC(f.p), bthTC(t)); bthSay(g, bthFan(g, t.id), 'hat', { hype: 1 }, ctx, { pid: f.p.id, tid: t.id, me: t.id === me.id ? 1 : null }); bthSay(g, bthCast(g, 'pundit'), 'hat', { hype: 1 }, ctx, { pid: f.p.id, tid: t.id }); } } return; }
  if (kind === 'youth') { if ((m = text.match(/^(.+) \((\d+)\) has exploded at (.+) — now rated (\d+)/)) && pl) { const t = T(m[3]); if (t && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), bthPC(pl.p), bthTC(t)); bthSay(g, bthCast(g, 'pundit'), 'youth', { hype: 1 }, ctx, { pid: pl.p.id, tid: t.id, me: t.id === me.id ? 1 : null }); } } return; }
  if (kind === 'retire') { if ((m = text.match(/^(.+) retires at (\d+) after (\d+) career appearances and (\d+) goals\.$/)) && (+m[3] > 250 || +m[4] > 60) && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), { p: m[1], pl: m[1].split(' ').pop(), age: m[2], n: m[4] }); bthSay(g, bthNeutral(g), 'retire', { tribute: 1 }, ctx, {}); bthSay(g, bthCast(g, 'pundit'), 'retire', { tribute: 1 }, ctx, {}); } return; }
  if (kind === 'contract') { if ((m = text.match(/^(.+) agrees fresh terms at (.+) on (.+) a season\.$/))) { const f = bthFindByName(g, m[1]), t = T(m[2]); if (f && t && t.id === me.id && bthStar(g, f.p, t) && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), bthPC(f.p), bthTC(t), { wage: m[3] }); bthSay(g, bthFan(g, t.id), 'contract', { hype: 3, doubt: 1 }, ctx, { pid: f.p.id, tid: t.id, me: 1 }); } } return; }
  if (kind === 'nation') {
    const ctx = bthBase(g); let arr = null;
    if (/qualify for/.test(text)) arr = BTH_B.nation.qual; else if (/miss out/.test(text)) arr = BTH_B.nation.miss; else if ((m = text.match(/^(.+) win the /))) { arr = BTH_B.nation.win; ctx.w = m[1]; }
    if (arr && bthOk(B, 1)) { bthSayNews(g, bthCast(g, 'media'), arr, ctx, {}); bthSayNews(g, bthNeutral(g), arr, ctx, {}); }
  }
}
function bthHire(g, t, mname) {
  if (!t || t.id === g.myTeam || !bthOk(g.bth, t.tier <= 1 ? 1 : 0)) return; const ctx = Object.assign(bthBase(g), bthTC(t), { m: mname, ml: bthSlug(mname.split(' ').pop()) }), o = { tid: t.id, mg: 1 };
  bthAdd(g, bthClubAcct(g, t), bthFill(bthPick(BTH_B.hire.official), ctx), o);
  for (let i = 0, n = t.tier <= 1 ? 3 : 1; i < n; i++) { const u = bthFanOrNeutral(g, t.id); bthSay(g, u, 'hire', { hype: 2, plumber: 3, rival: u.club === t.id ? 0 : 1 }, ctx, o); }
}
function bthSack(g, t, rs) {
  if (!t || !bthOk(g.bth, t.tier <= 1 ? 1 : 0)) return; const ctx = Object.assign(bthBase(g), bthTC(t), { rs }), o = { tid: t.id, mg: 1 };
  bthSayNews(g, bthCast(g, 'news'), BTH_B.sack.news, ctx, o); bthSay(g, bthFanOrNeutral(g, t.id), 'sack', { glee: 2, pity: 2 }, ctx, o); if (bthR() < 0.5) bthSay(g, bthCast(g, 'troll'), 'sack', { job: 1 }, ctx, o);
}
function bthMyHire(g, t, old) {
  if (!t) return; const gap = (g.manager.rep || 40) - (10 + t.rep * 5.5), ctx = Object.assign(bthBase(g), bthTC(t), { old: old ? old.s : 'his old club' }), o = { tid: t.id, me: 1, mg: 1 };
  bthAdd(g, bthClubAcct(g, t), bthFill(bthPick(BTH_B.myhire.official), ctx), o);
  for (let i = 0; i < 3; i++) bthSay(g, bthFan(g, t.id), 'myhire', { hype: bthClamp(1 + gap / 10, 0.3, 5), doubt: bthClamp(3 - gap / 10, 0.5, 6) }, ctx, o);
  if (old) bthSay(g, bthFan(g, old.id), 'myhire', { old: 1 }, ctx, o); bthSay(g, bthCast(g, 'pundit'), 'myhire', { hype: bthClamp(1 + gap / 10, 0.3, 5), doubt: bthClamp(3 - gap / 10, 0.5, 6) }, ctx, o);
}
function bthSignMine(g, p, from, fee) {
  const me = g.teams[g.myTeam], free = fee === 'free', ctx = Object.assign(bthBase(g), bthPC(p), bthTC(me), from ? bthTC(from, '2') : {}, { fee }), o = { pid: p.id, tid: me.id, me: 1 }, q = p.rating - bthTop11(me);
  bthAdd(g, bthClubAcct(g, me), free ? `OFFICIAL | ${me.n} sign free agent ${p.name} (${p.pos}, ${p.rating}).` : bthFill(bthPick(BTH_B.signMine.official), ctx), o);
  const w = free ? { free: 3, hype: q >= 2 ? 2 : 0, doubt: q < -3 ? 2 : 0 } : { hype: bthClamp(1 + q / 2, 0.2, 5), doubt: bthClamp(1.5 - q / 2, 0.2, 5), joke: 1 };
  bthSay(g, bthFan(g, me.id), 'signMine', w, ctx, o); bthSay(g, bthR() < 0.5 ? bthCast(g, 'troll') : bthNeutral(g), 'signMine', w, ctx, o);
}
function bthSellMine(g, p, buyer, fee, clause) {
  if (!buyer) return; const me = g.teams[g.myTeam], ctx = Object.assign(bthBase(g), bthPC(p), bthTC(me), bthTC(buyer, '2'), { fee }), o = { pid: p.id, tid: me.id, me: 1 };
  const star = p.rating >= bthTop11(me) - 1, w = clause ? { clause: 4, rage: 1 } : { rage: star ? 4 : 1, shrug: star ? 1 : 3 };
  bthSayNews(g, bthCast(g, 'news'), BTH_B.sellMine.news, ctx, o); bthSay(g, bthFan(g, me.id), 'sellMine', w, ctx, o); bthSay(g, bthFan(g, me.id), 'sellMine', w, ctx, o); bthSay(g, bthFan(g, buyer.id), 'sellMine', { gloat: 1 }, ctx, { pid: p.id, tid: buyer.id });
  bthResolveRum(g, p.id, buyer.id);
}
function bthAiMove(g, p, from, to, fee) {
  if (!from || !to) return; const B = g.bth; bthResolveRum(g, p.id, to.id);
  if (!(bthStar(g, p, to) || p.value > [10, 3, 1, 0.4, 0.15][Math.min(to.tier, 4)]) || !bthOk(B, 0)) return;
  const ctx = Object.assign(bthBase(g), bthPC(p), bthTC(from), bthTC(to, '2'), { fee }), o = { pid: p.id, tid: to.id };
  bthSayNews(g, bthCast(g, 'news'), BTH_B.aiMove.news, ctx, o); bthSay(g, bthFan(g, from.id), 'aiMove', { sellerFan: 1 }, ctx, o); if (bthR() < 0.7) bthSay(g, bthFan(g, to.id), 'aiMove', { buyerFan: 1 }, ctx, o); if (bthR() < 0.4) bthSay(g, bthNeutral(g), 'aiMove', { doubt: 1 }, ctx, o);
  if (bthR() < 0.12) bthSay(g, bthP(Object.values(B.users).filter(u => u.k === 'rumour' && u.cred < 0.3)), 'aiMove', { fake: 1 }, ctx, Object.assign({ fl: 'Unverified' }, o));
}
function bthRequest(g, p) { const me = g.teams[g.myTeam], ctx = Object.assign(bthBase(g), bthPC(p), bthTC(me)), o = { pid: p.id, tid: me.id, me: 1 }; bthSay(g, bthFan(g, me.id), 'req', { rage: 2, pity: 2 }, ctx, o); bthSay(g, bthNeutral(g), 'req', { rage: 1, pity: 2 }, ctx, o); }
function bthWatch(g, p, t) { if (!t || !bthOk(g.bth, 0)) return; const ctx = Object.assign(bthBase(g), bthPC(p), bthTC(t)); bthSay(g, bthFan(g, t.id), 'watch', { fan: 1 }, ctx, { pid: p.id, tid: t.id, me: t.id === g.myTeam ? 1 : null }); }
function bthAward(g, name, aw, lg, pid) {
  const f = (pid != null ? findPlayer(g, pid) : null) || bthFindByName(g, name); if (!f || !f.t) return; const t = f.t, ctx = Object.assign(bthBase(g), bthPC(f.p), bthTC(t), { aw, lg }), o = { pid: f.p.id, tid: t.id, me: t.id === g.myTeam ? 1 : null };
  bthAdd(g, bthLeagueAcct(g, t.tier), bthFill(bthPick(BTH_B.award.official), ctx), o); bthSay(g, bthFan(g, t.id), 'award', { hype: 3 }, ctx, o); bthSay(g, bthNeutral(g), 'award', { hype: 1, hate: 2 }, ctx, o);
}
function bthPromo(g, t, vb, lg2, up) {
  if (!t || !bthOk(g.bth, 1)) return; const ctx = Object.assign(bthBase(g), bthTC(t), { vb, lg2 }), o = { tid: t.id, me: t.id === g.myTeam ? 1 : null };
  bthSayNews(g, bthLeagueAcct(g, t.tier), BTH_B.promo.news, ctx, o); bthSay(g, bthFan(g, t.id), 'promo', up ? { hype: 1 } : { rel: 1 }, ctx, o);
}
/* ---- rumours (and the misinformation) ---- */
function bthResolveRum(g, pid, toId) {
  const B = g.bth; B.rum.forEach(r => {
    if (r.st !== 'open' || r.pid !== pid) return; const po = B.posts.find(x => x.id === r.post), u = B.users[r.u];
    if (r.kind === 'out' || toId === r.to) { r.st = 'true'; if (po) po.fl = 'Confirmed'; if (u) { u.cred = Math.min(0.95, (u.cred || 0.3) + 0.05); const f = findPlayer(g, pid); if (f && f.p && bthOk(B, 1)) bthSay(g, u, 'rumour', { conf: 1 }, Object.assign(bthBase(g), bthPC(f.p), bthTC(g.teams[toId], '2')), { pid: pid, fl: 'Confirmed' }); } }
  });
}
function bthRumours(g) {
  const B = g.bth, me = g.teams[g.myTeam];
  B.rum.forEach(r => {
    if (r.st !== 'open' || g.round < r.due) return; const po = B.posts.find(x => x.id === r.post), u = B.users[r.u];
    if (r.kind === 'sack' && g.jobless) { r.st = 'true'; if (po) po.fl = 'Confirmed'; return; }
    r.st = 'false'; if (po) { po.fl = 'Debunked'; po.rp.unshift({ h: bthNeutral(g).h, t: bthP(BTH_B.rumour.debunk), l: bthI(20, 400) }); po.rn += 14; } if (u) u.cred = Math.max(0.02, (u.cred || 0.3) - 0.03);
    if (po && bthR() < 0.55 && bthOk(B, 0)) bthAdd(g, B.users.BathiniNews, bthFill(bthPick(BTH_B.rumour.check), { claim: po.t.length > 80 ? po.t.slice(0, 78) + '…' : po.t }), { fl: 'Bathini Check', pid: po.pid, tid: po.tid });
  });
  B.rum = B.rum.filter(r => r.st === 'open' || g.round - r.due < 4);
  if (B.rum.filter(r => r.st === 'open').length >= 5 || bthR() > 0.72) return;
  const u = bthP(Object.values(B.users).filter(x => x.k === 'rumour')), x = bthR();
  if (x < 0.62) {
    const pool = g.teams.filter(t => t.tier <= Math.min(me.tier, 1) + 1 && (t.id === me.id || bthR() < 0.4)); const t = bthP(pool.length ? pool : [me]); const stars = t.squad.filter(p => bthStar(g, p, t)); if (!stars.length) return;
    const p = bthP(stars); let to = null; try { const c = interestedClubs(p, t.id, 3); to = c && c.length ? bthP(c) : null; } catch (e) { }
    if (!to) { const c = g.teams.filter(y => y.id !== t.id && y.tier <= t.tier && y.rep > t.rep); to = c.length ? bthP(c) : null; } if (!to) return;
    const po = bthSay(g, u, 'rumour', { interest: 1 }, Object.assign(bthBase(g), bthPC(p), bthTC(t), bthTC(to, '2')), { pid: p.id, tid: t.id, fl: 'Unverified', me: t.id === me.id ? 1 : null }); if (po) B.rum.push({ post: po.id, u: u.h, kind: 'to', pid: p.id, to: to.id, due: g.round + bthI(4, 7), st: 'open' });
  } else if (x < 0.82) {
    const stars = me.squad.filter(p => bthStar(g, p, me)); if (!stars.length) return; const p = bthP(stars);
    const po = bthSay(g, u, 'rumour', { mineOut: 1 }, Object.assign(bthBase(g), bthPC(p), bthTC(me)), { pid: p.id, tid: me.id, fl: 'Unverified', me: 1 }); if (po) B.rum.push({ post: po.id, u: u.h, kind: 'out', pid: p.id, to: -1, due: g.round + 5, st: 'open' });
  } else if (!g.jobless) {
    const po = bthSay(g, u, 'rumour', { sack: 1 }, Object.assign(bthBase(g), bthTC(me)), { tid: me.id, fl: 'Unverified', me: 1, mg: 1 }); if (po) { B.rum.push({ post: po.id, u: u.h, kind: 'sack', due: g.round + 2, st: 'open' }); B.heat -= 1; }
  }
}
  /* ---- every matchday ---- */
function bthTick(g) {
  const B = bthEnsure(g); if (!B) return; B.bud = 8; B.cut = null;
  if (g.jobless && !B.wasJobless) bthSacked(g); B.wasJobless = !!g.jobless;
  bthLife(g); bthDates(g); bthLeagueTalk(g); bthRumours(g);
  if (!g.jobless) bthMyMatch(g);
  B.posts.forEach(p => { if (p.r >= g.round - 2 && p.lk > 20) { p.lk = Math.round(p.lk * (1 + bthR() * 0.22)); p.rt = Math.round(p.rt * (1 + bthR() * 0.2)); p.rn += bthI(0, Math.ceil(p.lk / 60)); } });
  B.heat = Math.round(B.heat * 0.93 * 10) / 10;
}
function bthSacked(g) { const me = g.teams[g.myTeam], ctx = Object.assign(bthBase(g), bthTC(me)), o = { tid: me.id, me: 1, mg: 1 }; bthSayNews(g, g.bth.users.BathiniNews, BTH_B.mysack.news, ctx, o); for (let i = 0; i < 3; i++) bthSay(g, i < 2 ? bthFan(g, me.id) : bthCast(g, 'troll'), 'mysack', { glee: 2, pity: 2 }, ctx, o); g.bth.heat = -60; }
function bthMyMatch(g) {
  const B = g.bth, me = g.teams[g.myTeam]; if (B.last.my === g.round) return; B.last.my = g.round;
  const ix = myMatchIndex(g, g.round - 1), m = ix >= 0 && g.fixtures[me.tier][g.round - 1][ix]; if (!m || !m.played || m.forfeit) return;
  const home = m.h === me.id, gf = home ? m.hg : m.ag, ga = home ? m.ag : m.hg, opp = g.teams[home ? m.a : m.h], d = gf - ga, sc = gf + '-' + ga;
  const key = d >= 3 ? 'bigWin' : d === 2 ? 'win' : d === 1 ? 'narrow' : d === 0 ? 'draw' : d >= -2 ? 'loss' : 'heavy';
  B.streak.push(d > 0 ? 'W' : d < 0 ? 'L' : 'D'); if (B.streak.length > 8) B.streak.shift();
  B.heat = bthClamp(B.heat + ({ bigWin: 10, win: 7, narrow: 5, draw: -1, loss: -7, heavy: -13 })[key], -100, 100);
  const ctx = Object.assign(bthBase(g), bthTC(opp, 'o'), { o: opp.s, sc, OT: bthSlug(opp.s) }), o = { tid: me.id, me: 1, mg: 1 }, win = d > 0;
  for (let i = 0, n = key === 'bigWin' || key === 'heavy' ? 4 : 3; i < n; i++) bthSay(g, bthFan(g, me.id), 'match', { [key]: 1 }, ctx, Object.assign({ mood: win ? 'pos' : 'neg' }, o));
  if (!win && bthR() < 0.8) bthSay(g, bthFan(g, opp.id), 'match', { gloat: 1 }, ctx, { tid: opp.id }); else if (win && bthR() < 0.5) bthSay(g, bthFan(g, opp.id), 'match', { cope: 1 }, ctx, { tid: opp.id });
  const sg = {}; (m.ev || []).forEach(e => { if (e.team === me.id && e.scorer != null) sg[e.scorer] = (sg[e.scorer] || 0) + 1; });
  const top = Object.keys(sg).sort((a, b) => sg[b] - sg[a])[0], f = top ? findPlayer(g, +top) : null;
  if (f && sg[top] >= 2) bthSay(g, bthFan(g, me.id), 'match', { star: 1 }, Object.assign(ctx, bthPC(f.p), { n: sg[top] === 2 ? 'a brace' : sg[top] + ' goals' }), { pid: f.p.id, tid: me.id, me: 1 });
  else if (m.potm && win && bthR() < 0.4) { const fp = findPlayer(g, m.potm.id); if (fp && fp.t && fp.t.id === me.id) bthSay(g, bthNeutral(g), 'match', { star: 1 }, Object.assign(ctx, bthPC(fp.p), { n: 'the Man of the Match award' }), { pid: fp.p.id, tid: me.id, me: 1 }); }
  const last = B.streak.slice(-3).join(''), s = B.streak.slice(-5).join('');
  if (last === 'WWW') { let n = 0; for (let i = B.streak.length - 1; i >= 0 && B.streak[i] === 'W'; i--) n++; bthSay(g, bthFan(g, me.id), 'match', { streakW: 1 }, Object.assign(ctx, { n }), o); }
  if (last === 'LLL') { let n = 0; for (let i = B.streak.length - 1; i >= 0 && B.streak[i] === 'L'; i--) n++; bthSay(g, bthNeutral(g), 'match', { streakL: 1 }, Object.assign(ctx, { n }), o); }
  if (B.heat < -35 && g.round - (B.last.press || -9) > 3) { B.last.press = g.round; bthSay(g, bthFan(g, me.id), 'match', { out: 1 }, ctx, o); }
  if (B.heat > 35 && g.round - (B.last.press || -9) > 3) { B.last.press = g.round; bthSay(g, bthFan(g, me.id), 'match', { army: 1 }, ctx, o); }
  try { bthPlayerTalk(g, win, ctx, o); } catch (e) { }
  if (B.promise && B.promise.round === g.round) { B.heat = bthClamp(B.heat + (win ? 8 : -10), -100, 100); bthSay(g, bthFan(g, me.id), 'promise', { [win ? 'kept' : 'broke']: 1 }, ctx, Object.assign({ mood: win ? 'pos' : 'neg' }, o)); if (!win) bthSay(g, bthCast(g, 'troll'), 'promise', { broke: 1 }, ctx, o); B.promise = null; }
}
function bthLeagueTalk(g) {
  const B = g.bth, me = g.teams[g.myTeam], tiers = me.tier === 0 ? [0] : [0, me.tier];
  tiers.forEach(tier => {
    const rows = sortTable(g, tier), lead = rows[0] && rows[0].id, lt = g.teams[lead]; if (!lt) return;
    if (g.round >= 4 && B.last['ld' + tier] != null && B.last['ld' + tier] !== lead && bthOk(B, 1)) { const ctx = Object.assign(bthBase(g), bthTC(lt), { lg: TIER_NAMES[tier], lgt: bthSlug(TIER_SHORT[tier]) }); bthSayNews(g, bthLeagueAcct(g, tier), BTH_B.table.top, ctx, { tid: lead, me: lead === me.id ? 1 : null }); bthSay(g, bthFan(g, lead), 'table', { topFan: 1 }, ctx, { tid: lead }); }
    B.last['ld' + tier] = lead;
    if (g.round >= 6 && g.round % 7 === 0 && bthOk(B, 0)) { const bt = g.teams[rows[rows.length - 1].id], ctx = Object.assign(bthBase(g), bthTC(bt), { lg: TIER_NAMES[tier] }); bthSay(g, bthNeutral(g), 'table', { bot: 1 }, ctx, { tid: bt.id }); }
    const ups = []; (g.fixtures[tier][g.round - 1] || []).forEach(m => { if (!m.played || m.forfeit) return; const w = m.hg > m.ag ? m.h : m.hg < m.ag ? m.a : null; if (w == null || Math.abs(m.hg - m.ag) < 2) return; const l = w === m.h ? m.a : m.h; if (teamOverall(g.teams[l]) - teamOverall(g.teams[w]) >= 6) ups.push([w, l, m]); });
    ups.slice(0, 1).forEach(([w, l, m]) => { if (!bthOk(B, 0)) return; const ctx = Object.assign(bthBase(g), bthTC(g.teams[w]), { o: g.teams[l].s, sc: Math.max(m.hg, m.ag) + '-' + Math.min(m.hg, m.ag), lgt: bthSlug(TIER_SHORT[tier]) }); bthAdd(g, bthCast(g, 'media'), bthFill(bthPick(BTH_B.upset), ctx), { tid: w, me: w === me.id || l === me.id ? 1 : null }); });
    const gs = {}; (g.fixtures[tier][g.round - 1] || []).forEach(m => (m.ev || []).forEach(e => { if (e.scorer != null) gs[e.scorer] = (gs[e.scorer] || 0) + 1; }));
    const best = Object.keys(gs).sort((a, b) => gs[b] - gs[a])[0]; if (best && gs[best] >= 3 && bthOk(B, 0)) { const f = findPlayer(g, +best); if (f && f.t) bthAdd(g, bthLeagueAcct(g, tier), bthFill(bthPick(BTH_B.scorer), Object.assign(bthBase(g), bthPC(f.p), bthTC(f.t), { n: gs[best], lgt: bthSlug(TIER_SHORT[tier]) })), { pid: f.p.id, tid: f.t.id, me: f.t.id === me.id ? 1 : null }); }
    if (tier === me.tier && g.round % 6 === 0 && bthOk(B, 0)) { const ts = topScorers(g, tier, 3); if (ts.length >= 3) { const L = ts[0]; bthAdd(g, bthLeagueAcct(g, tier), `Golden Boot race after MD${g.round}: 1. ${ts[0].p.name} (${ts[0].v}) 2. ${ts[1].p.name} (${ts[1].v}) 3. ${ts[2].p.name} (${ts[2].v}) #GoldenBoot`, { pid: L.p.id, tid: L.club.id, me: L.club.id === me.id ? 1 : null }); } }
    if (tier === me.tier && g.round % 8 === 0 && g.round >= 16 && bthOk(B, 0)) { const z = rows.slice(-3).map(r => g.teams[r.id].s); bthAdd(g, bthCast(g, 'pundit'), `Relegation zone after MD${g.round}: ${z.join(', ')}. Somebody has to go down. #Relegation`, {}); }
    if (tier === me.tier && g.round === totalRounds(g) - 5 && rows.length > 1 && bthOk(B, 0)) bthAdd(g, bthCast(g, 'news'), `Title race: ${g.teams[rows[0].id].s} lead by ${rows[0].pts - rows[1].pts} points from ${g.teams[rows[1].id].s} with 5 matchdays to go. #${bthSlug(TIER_SHORT[tier])}`, { tid: rows[0].id });
  });
}
function bthLife(g) {
  const n = bthI(0, 2), ctx = Object.assign(bthBase(g)); for (let i = 0; i < n; i++) { if (g.bth.bud <= 0) return; const t = bthR() < 0.5 ? g.teams[g.myTeam] : bthP(g.teams); const u = bthR() < 0.5 ? bthFan(g, t.id) : bthNeutral(g); bthAdd(g, u, bthFill(bthPick(BTH_B.life), Object.assign({}, ctx, bthTC(t))), { tid: t.id }); }
}
function bthDates(g) {
  const B = g.bth, now = bthDate(g), prev = B.last.dt || now; B.last.dt = now; const a = Date.parse(prev), b = Date.parse(now); if (!(b > a)) return;
  for (let y = +prev.slice(0, 4); y <= +now.slice(0, 4); y++) Object.keys(BTH_B.date).forEach(k => { const t = Date.parse(y + '-' + k); if (t > a && t <= b) { bthAdd(g, bthLeagueAcct(g, 0), BTH_B.date[k], {}); bthAdd(g, bthNeutral(g), BTH_B.date[k], {}); } });
}
function bthSeed(g) {
  const B = g.bth, me = g.teams[g.myTeam], rows = g.teams.filter(t => t.tier === me.tier).sort((a, b) => teamOverall(b) - teamOverall(a)), rank = rows.findIndex(t => t.id === me.id) + 1;
  const ctx = Object.assign(bthBase(g), bthTC(me), { old: 'his old club' }), o = { tid: me.id, me: 1, mg: 1 };
  B.last.dt = bthDate(g); B.last.my = g.round;
  bthAdd(g, B.users.BathiniNews, 'Welcome to Bathini 💙 Where Mzansi football talks. Rumours, hot takes, nonsense, the truth. All of it, all day. #Bathini', { noRep: 1 });
  bthAdd(g, bthLeagueAcct(g, me.tier), `A new ${seasonLabel(g.season)} season is here. ${rows.length} clubs, one trophy, endless arguments. #${ctx.lgt}`, { noRep: 1 });
  bthAdd(g, bthClubAcct(g, me), bthFill(bthPick(BTH_B.myhire.official), ctx), o);
  for (let i = 0; i < 3; i++) bthSay(g, bthFan(g, me.id), 'myhire', { hype: 2, doubt: 3 }, ctx, o);
  bthAdd(g, B.users.ProfessorDiski, `${seasonLabel(g.season)} predictions: ${rows[0].s} for the title, ${rows[1].s} close behind. ${me.s} ${rank <= 3 ? 'will be in the mix' : rank >= rows.length - 4 ? 'are fighting for survival' : 'to finish mid-table'}. Quote me in May.`, { tid: me.id, me: 1 });
  bthAdd(g, B.users.KasiXI, `Squad strength before kick-off: ${me.s} rank ${rank} of ${rows.length} in the ${TIER_NAMES[me.tier]}. Numbers don't lie, referees do. 📊`, { tid: me.id, me: 1 });
  try { bthRumours(g); bthRumours(g); } catch (e) { }
  for (let i = 0; i < 3; i++) bthLife(g);
}
/* ---- the manager speaks ---- */
const BTH_SPEAK = [['back', 'Back the players', 'Public loyalty. Fans warm to it, trolls will always troll.'], ['honest', 'Be honest', 'Take responsibility. Goes down well after bad runs.'], ['big', 'Talk big', 'Promise the league. Pays off if you win the next match, backfires if you don\'t.'], ['none', 'No comment', 'Safe. Boring. Nobody remembers it.'], ['ref', 'Blame the referee', 'Fans split down the middle. Expect noise.'], ['joke', 'Crack a joke', 'Could trend for the right reasons. Or the wrong ones.']];
function bthSpeak(g, tone) {
  const B = bthEnsure(g), me = g.teams[g.myTeam]; if (B.spoke === g.round) return { ok: false, msg: 'You have already spoken to the fans this matchday.' };
  const ctx = bthBase(g), u = bthMgrUser(g), roll = bthR(); let dh = 0, pos = 0.5;
  if (tone === 'back') { dh = 3; pos = 0.62; } else if (tone === 'honest') { dh = B.heat < 0 ? 5 : 2; pos = 0.68; } else if (tone === 'big') { dh = 5; pos = 0.5; B.promise = { round: g.round + 1 }; } else if (tone === 'none') { dh = -1; pos = 0.45; } else if (tone === 'ref') { dh = roll < 0.5 ? 4 : -5; pos = 0.5; } else { dh = roll < 0.55 ? 5 : -4; pos = roll < 0.55 ? 0.7 : 0.3; }
  B.heat = bthClamp(B.heat + dh, -100, 100); B.spoke = g.round;
  bthAdd(g, u, bthFill(bthPick(BTH_B.speak[tone]), ctx), { me: 1, mg: 1, noRep: 1, tid: me.id });
  const sp = BTH_B.speakR, spec = sp[tone];
  for (let i = 0; i < 3; i++) { const good = bthR() < pos + B.heat / 400, f = bthR() < 0.25 ? bthCast(g, 'troll') : bthFan(g, me.id), arr = spec ? (good ? spec.pos : spec.neg) : (good ? sp.pos : sp.neg); bthAdd(g, f, bthFill(bthPick(arr), ctx), { me: 1, mg: 1, mood: good ? 'pos' : 'neg' }); }
  return { ok: true };
}

function bthPlayerTalk(g, win, ctx, o) {
  const me = g.teams[g.myTeam], B = g.bth;
  const rated = me.squad.filter(p => !p.reserve && p.ratingApps >= 3).map(p => ({ p, avg: p.ratingSum / p.ratingApps })).sort((a, b) => a.avg - b.avg);
  if (!rated.length) return;
  const pc = (x, extra) => Object.assign({}, ctx, bthPC(x.p), { avg: x.avg.toFixed(1), wage: money(x.p.wage), gl: x.p.goals || 0, ap: x.p.apps || 0 }, extra || {});
  const who = () => bthR() < 0.6 ? bthFan(g, me.id) : bthCast(g, 'troll'), po = x => ({ pid: x.p.id, tid: me.id, me: 1 });
  const low = rated[0], top = rated[rated.length - 1];
  if (!win && low.avg < 6.5 && bthR() < 0.7) bthSay(g, who(), 'player', { roast: 1 }, pc(low), Object.assign({ mood: 'neg' }, po(low)));
  const fw = rated.filter(x => ['ST', 'CF', 'LW', 'RW', 'CAM'].indexOf(x.p.pos) >= 0 && x.p.apps >= 6 && !x.p.goals);
  if (fw.length && bthR() < 0.3) { const x = bthP(fw); bthSay(g, bthNeutral(g), 'player', { goalless: 1 }, pc(x), Object.assign({ mood: 'neg' }, po(x))); }
  const rich = rated.slice().sort((a, b) => b.p.wage - a.p.wage).slice(0, 3).filter(x => x.avg < 6.6);
  if (rich.length && bthR() < 0.25) { const x = bthP(rich); bthSay(g, who(), 'player', { pricey: 1 }, pc(x), Object.assign({ mood: 'neg' }, po(x))); }
  if (win && top.avg >= 7.1 && bthR() < 0.3) bthSay(g, bthR() < 0.5 ? bthFan(g, me.id) : bthCast(g, 'pundit'), 'player', { praise: 1 }, pc(top), Object.assign({ mood: 'pos' }, po(top)));
}
  /* ---- the Bathini tab ---- */
let bthTab = 'all', bthAcct = '', bthShow = 40, bthSeenAt = 0;
const BTH_TABS = [['all', 'For you'], ['club', 'My club'], ['players', 'Players'], ['managers', 'Managers'], ['rumours', 'Rumours']];
const bthFmt = t => esc(t).replace(/(^|[\s(])#(\w+)/g, '$1<span class="hx">#$2</span>').replace(/(^|[\s(])@(\w+)/g, '$1<span class="hx">@$2</span>');
const BTH_TICK = '<i class="bthtick" title="Verified"><svg viewBox="0 0 12 12"><path d="M2.6 6.3l2.1 2.1 4.7-4.9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';
const BTH_IC = { rp: '<svg viewBox="0 0 24 24"><path d="M4 5h16v10H9l-5 4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>', rt: '<svg viewBox="0 0 24 24"><path d="M4 11V9a3 3 0 013-3h11m0 0l-3-3m3 3l-3 3M20 13v2a3 3 0 01-3 3H6m0 0l3 3m-3-3l3-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>', lk: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>', vw: '<svg viewBox="0 0 24 24"><path d="M5 20V10M12 20V4M19 20v-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' };
function bthAvatar(g, u, size) {
  size = size || 44; const st = `width:${size}px;height:${size}px`;
  if (u.k === 'mgr' && u.me) return `<span class="bp-av mg" style="${st}">${avatarSVG(g.manager.avatar, size)}</span>`;
  if (u.k === 'club' && g.teams[u.cid]) return `<span class="bp-av club" style="${st}">${crestHTML(g.teams[u.cid], size - 10)}</span>`;
  if (u.h === 'BathiniNews') return `<span class="bp-av logo" style="${st}"><img src="${BTH_LOGO}" alt=""></span>`;
  let hs = 0; for (const c of u.h) hs = (hs * 31 + c.charCodeAt(0)) % 360; const ini = (u.n.match(/[A-Za-z0-9]+/g) || ['?']).slice(0, 2).map(x => x[0]).join('').toUpperCase();
  return `<span class="bp-av" style="${st};font-size:${Math.round(size * 0.36)}px;background:linear-gradient(135deg,hsl(${hs} 78% 56%),hsl(${(hs + 55) % 360} 80% 34%))">${esc(ini)}</span>`;
}
function bthWhen(g, p) { if (p.r === g.round && p.d === bthDate(g)) return 'now'; const d = new Date(p.d + 'T12:00:00Z'); return d.getUTCDate() + ' ' + MONTH_NAMES[d.getUTCMonth()].slice(0, 3); }
function bthPostHTML(g, p) {
  const B = g.bth, u = B.users[p.h] || { h: p.h, n: p.h, k: 'fan' }, f = p.pid != null ? findPlayer(g, p.pid) : null, lk = !!B.liked[p.id], rt = !!B.rted[p.id];
  const card = f ? `<div class="bp-card" data-pid="${p.pid}">${faceSVG(f.p, 46, f.t ? f.t.c1 : null)}<span class="pc"><b>${esc(f.p.name)}</b><small>${f.p.pos} · ${f.p.age} yrs · OVR ${f.p.rating}${f.t ? ' · ' + esc(f.t.s) : ' · free agent'}</small></span>${f.t ? crestHTML(f.t, 26) : ''}</div>` : '';
  const fl = p.fl ? `<span class="fl ${p.fl === 'Confirmed' ? 'c' : p.fl === 'Debunked' ? 'd' : p.fl === 'Bathini Check' ? 'k' : 'u'}">${esc(p.fl)}</span>` : '';
  const rp = p.rp.length ? `<div class="bp-rp">${p.rp.map(r => `<div><b data-h="${esc(r.h)}">@${esc(r.h)}</b> ${esc(r.t)}</div>`).join('')}${p.rn > p.rp.length ? `<small>View ${bthK(p.rn - p.rp.length)} more ${p.rn - p.rp.length === 1 ? 'reply' : 'replies'}</small>` : ''}</div>` : '';
  return `<article class="bp${p.me ? ' me' : ''}${p.vi ? ' vi' : ''}${p.id > bthSeenAt ? ' nw' : ''}" data-id="${p.id}">
    <div class="bp-l" data-h="${esc(u.h)}">${bthAvatar(g, u)}</div>
    <div class="bp-r"><div class="bp-head"><b data-h="${esc(u.h)}">${esc(u.n)}</b>${u.v ? BTH_TICK : ''}<span class="hd">@${esc(u.h)}</span><span class="dot">·</span><span class="hd">${bthWhen(g, p)}</span>${p.vi ? '<span class="fl v">Viral</span>' : ''}${p.ra ? '<span class="fl d">Ratioed</span>' : ''}${fl}</div>
    <div class="bp-text">${bthFmt(p.t)}</div>${card}
    <div class="bp-acts"><span>${BTH_IC.rp}${bthK(p.rn)}</span><button data-a="rt" class="${rt ? 'on' : ''}">${BTH_IC.rt}<i>${bthK(p.rt + (rt ? 1 : 0))}</i></button><button data-a="lk" class="${lk ? 'on' : ''}">${BTH_IC.lk}<i>${bthK(p.lk + (lk ? 1 : 0))}</i></button><span>${BTH_IC.vw}${bthK(p.lk * 11 + p.rt * 7 + 40)}</span></div>${rp}</div></article>`;
}
function bthFiltered(g) { const B = g.bth, me = g.teams[g.myTeam], a = B.posts; if (bthAcct) return a.filter(p => p.h === bthAcct); return bthTab === 'club' ? a.filter(p => p.me || p.tid === me.id) : bthTab === 'players' ? a.filter(p => p.pid != null) : bthTab === 'managers' ? a.filter(p => p.mg) : bthTab === 'rumours' ? a.filter(p => p.fl) : a; }
function bthTrends(g) { const c = {}; g.bth.posts.slice(0, 90).forEach((p, i) => { const w = 1 + Math.log10(1 + p.lk) * (1 - i / 120); (p.t.match(/(?:^|[\s(])#(\w+)/g) || []).forEach(x => { const k = x.replace(/^[\s(]/, '').slice(1); c[k] = (c[k] || 0) + w; }); }); return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 6); }
function bthMood(h) { return h > 60 ? ['Untouchable', '#3ddc84'] : h > 30 ? ['Loved', '#5fe0a0'] : h > 10 ? ['Respected', '#8fd4ff'] : h > -10 ? ['Split', '#f2b928'] : h > -30 ? ['Under pressure', '#ff9f43'] : h > -60 ? ['Plumber alert', '#ff7a5a'] : ['Sack him!', '#ff4d4d']; }
function bthBio(g, u) {
  const t = u.club != null ? g.teams[u.club] : null, PB = { loud: 'Hot takes served loud. Opinions are the product.', uncle: 'Been watching football since before your parents met.', mama: 'Mother of four, fan of one club, referee of everything.', kasi: 'Kasi born. Football fed. Banter daily.', nerd: 'Numbers first. Feelings later.', troll: 'Here to ruin your day. Professionally.' };
  return u.k === 'news' ? 'The Bathini news desk. We report what we can confirm. Mostly.' : u.k === 'media' ? 'Everything Mzansi football, every day.' : u.k === 'league' ? 'Official account of the ' + u.n + '.' : u.k === 'club' ? 'Official account of ' + u.n + '.' : u.k === 'rumour' ? 'Sources close to the situation. (The situation is my cousin.)' : u.k === 'mgr' ? 'Manager of ' + g.teams[g.myTeam].n + '.' : PB[u.per] || (t ? 'Die-hard ' + t.s + ' supporter. Opinions are my own and usually wrong.' : 'Here for the football. And the arguments.');
}
function viewBathini() {
  const g = G, B = bthEnsure(g), v = $('#v-bathini'); if (!B) return; v.classList.add('mmx'); const me = g.teams[g.myTeam];
  if (B.seen < B.seq - 1) { bthSeenAt = B.seen; B.seen = B.seq - 1; } else if (bthSeenAt > B.seen) bthSeenAt = B.seen; try { bthRefreshBadge(); } catch (e) { }
  const list = bthFiltered(g), mood = bthMood(B.heat), pct = Math.round((bthClamp(B.heat, -100, 100) + 100) / 2), tr = bthTrends(g);
  const au = bthAcct ? B.users[bthAcct] : null;
  const prof = au ? `<div class="bth-prof">${bthAvatar(g, au, 64)}<div class="pi"><b>${esc(au.n)}${au.v ? BTH_TICK : ''}</b><span class="hd">@${esc(au.h)}</span><p>${esc(bthBio(g, au))}</p><small>${bthK(au.f || 0)} followers${au.k === 'rumour' ? ' · Accuracy rating ' + Math.round((au.cred || 0.3) * 100) + '%' : ''}${au.k === 'club' || au.k === 'fan' ? '' : ''}</small></div><button class="bth-btn ghost" id="bthBack">Back to feed</button></div>` : '';
  const who = Object.values(B.users).filter(u => u.v || u.k === 'rumour').sort((a, b) => b.f - a.f).slice(0, 6);
  v.innerHTML = `<div class="bth">
    <div class="bth-top"><img class="bth-logo" src="${BTH_LOGO}" alt=""><div class="bth-word"><b>Bathini</b><small>Bathini? What are they saying?</small></div><span class="bsp"></span><button class="bth-btn" id="bthSpeak">Speak to the fans</button></div>
    <div class="bth-tabs">${BTH_TABS.map(t => `<button data-t="${t[0]}" class="${!au && bthTab === t[0] ? 'on' : ''}">${t[1]}</button>`).join('')}</div>
    <div class="bth-body"><div class="bth-feed">${prof}
      ${au ? '' : `<div class="bth-comp"><span class="bp-av mg" style="width:42px;height:42px">${avatarSVG(g.manager.avatar, 42)}</span><div><b>What are they saying about you, Coach?</b><small>${B.spoke === g.round ? 'You have spoken this matchday. Let the fans react.' : 'Say something to the fans. Or stay quiet. Either way, they will talk.'}</small></div></div>`}
      ${list.length ? list.slice(0, bthShow).map(p => bthPostHTML(g, p)).join('') : '<div class="bth-empty">Nothing here yet. Play a matchday and Bathini will have something to say.</div>'}
      ${list.length > bthShow ? '<button class="bth-btn ghost" id="bthMore" style="margin:6px auto;display:block">Show more posts</button>' : ''}</div>
    <aside class="bth-side"><div class="bth-card"><h4>Bathini says</h4><div class="mood" style="color:${mood[1]}">${mood[0]}</div><div class="meter"><i style="left:${pct}%"></i></div><small>How Mzansi feels about ${esc(g.manager.name)}. It changes fast.</small></div>
      <div class="bth-card hm"><h4>Trending in Mzansi</h4>${tr.length ? tr.map(x => `<div class="tr"><small>Trending</small><b>#${esc(x[0])}</b><small>${bthK(Math.round(x[1] * 2300))} posts</small></div>`).join('') : '<small>Nothing trending. Yet.</small>'}</div>
      <div class="bth-card hm"><h4>Voices worth a follow</h4>${who.map(u => `<div class="wf" data-h="${esc(u.h)}">${bthAvatar(g, u, 34)}<span><b>${esc(u.n)}${u.v ? BTH_TICK : ''}</b><small>@${esc(u.h)}</small></span></div>`).join('')}</div></aside></div></div>`;
  v.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { bthTab = b.dataset.t; bthAcct = ''; bthShow = 40; viewBathini(); });
  v.querySelectorAll('[data-h]').forEach(b => b.onclick = () => { if (B.users[b.dataset.h]) { bthAcct = b.dataset.h; bthShow = 40; viewBathini(); window.scrollTo({ top: 0 }); } });
  v.querySelectorAll('.bp-card').forEach(b => b.onclick = () => { try { playerModal(+b.dataset.pid); } catch (e) { } });
  v.querySelectorAll('.bp [data-a]').forEach(b => b.onclick = () => { const id = +b.closest('.bp').dataset.id, p = B.posts.find(x => x.id === id); if (!p) return; const key = b.dataset.a === 'lk' ? 'liked' : 'rted', on = !B[key][id]; if (on) B[key][id] = 1; else delete B[key][id]; b.classList.toggle('on', on); b.querySelector('i').textContent = bthK((b.dataset.a === 'lk' ? p.lk : p.rt) + (on ? 1 : 0)); });
  const bk = $('#bthBack'); if (bk) bk.onclick = () => { bthAcct = ''; viewBathini(); }; const mo = $('#bthMore'); if (mo) mo.onclick = () => { bthShow += 40; viewBathini(); };
  $('#bthSpeak').onclick = () => bthSpeakModal();
}
function bthSpeakModal() {
  const g = G, B = bthEnsure(g); if (g.jobless) { toastWarn('You need a club before you can speak to the fans.'); return; }
  const done = B.spoke === g.round; openModal('Speak to the fans', `<p class="hint" style="margin:0 0 10px">${done ? 'You have already spoken this matchday.' : 'Your words reach Bathini in seconds. One statement per matchday.'}</p>` + BTH_SPEAK.map(s => `<button class="bth-opt" data-tone="${s[0]}" ${done ? 'disabled' : ''}><b>${s[1]}</b><small>${s[2]}</small></button>`).join(''));
  document.querySelectorAll('#modal .bth-opt').forEach(b => b.onclick = () => { const r = bthSpeak(G, b.dataset.tone); closeModal(); if (!r.ok) { toastWarn(r.msg); return; } toastGood('Posted on Bathini. Let\'s see how they take it.'); if (tab === 'bathini') { bthTab = 'all'; bthAcct = ''; viewBathini(); window.scrollTo({ top: 0 }); } });
}
function bthRefreshBadge() { const btn = document.querySelector('.navlink[data-tab="bathini"]'); if (!btn) return; const n = bthUnread(); let b = btn.querySelector('.nb'); if (n) { if (!b) { b = document.createElement('span'); b.className = 'nb'; btn.appendChild(b); } b.textContent = n; } else if (b) b.remove(); }
  /* ---- Bathini update: bigger text banks, no emojis ---- */
const BTH_B2 = {
  hire: {
    hype: ["I really believe in {c}'s new manager. {m} is going to prove everyone wrong.", "Say what you want, I like the {m} appointment. Give the man time to cook.", "{c} fans, let's be patient with {m}. Rome wasn't built in one matchday.", "Everyone is laughing at {m} now. We will see who is laughing in December. #{CT}", "New manager, new energy. {m} could be the smartest business {c} do this season.", "Watch {c} under {m}. Something is brewing.", "I watched {m} work before. Organised teams, proper shape, no nonsense. {c} got this right.", "Not the loudest name, but {m} builds teams that are hard to beat. Good move by {c}.", "The {c} board finally hired someone with a plan instead of a famous surname. Respect.", "{m} at {c}. Quietly one of the better appointments of the season, mark my words.", "Give {m} a full season before you judge. That is all I am asking.", "I am prepared to be wrong about {m}. Hoping I am wrong for the right reasons."],
    doubt: ["{m} at {c}. I need to see it before I believe it.", "Nothing against {m}, but is this really the best {c} could find?", "I have never seen {m} win anything. {c} are about to find out why.", "The {c} board says {m} is 'the right fit'. They say that every time.", "{m} has until the first losing streak. Then the knives come out.", "I will give {m} three matches. Four if the fixtures are kind.", "Does {m} even know where the {c} training ground is? Serious question.", "The {m} appointment feels like the board chose the cheapest option and called it a vision.", "Wishing {m} well at {c}. He is going to need more than luck.", "{c} hired {m} and now we are told to trust the process. Which process?"],
    plumber: ["{c} have hired a plumber. {m}?? Who is this man? #Plumber", "{m} to {c}. Wake me up for the sacking.", "{m}... as in WHO? Did {c} find him in the classifieds?", "Hayibo, {c} appointing {m}. Next they will sign the guy who fixes my geyser.", "My plumber has a better CV than {m} and he arrives with his own spanner.", "{c} gave the job to {m}. I did not know applications were open to the public.", "Has anybody actually heard of {m}? Asking on behalf of {c} fans.", "The {c} board must be playing Football Manager with the cheats on.", "{c} could have hired anyone. They went with {m}. Brave. Or tired.", "The {m} era at {c} begins. Set a reminder to check on it in October."],
    rival: ["{m} to {c}? Eish. See you in the relegation zone.", "Congratulations {c} on a very brave appointment. Brave like jumping out of a plane without checking the parachute.", "{c} have hired {m}. Thank you {c}, we needed the three points.", "We play {c} twice this season. Thank you for the early Christmas gift, {m}.", "{m} will be sacked before he finds the dressing room. I give it until the second international break.", "Good luck to {m}. He will need it, and so will whoever has to watch.", "{c} fans are excited. I remember being excited once.", "Our scouts say {c} are in for a long, long season under {m}."],
    official: ["OFFICIAL | {C} are pleased to confirm {m} as first-team manager. Welcome to the club, coach. #{CT}", "OFFICIAL | {C} have appointed {m} as manager. The board thanks the staff who held the fort in the interim.", "OFFICIAL | {m} is the new manager of {C}. He takes charge immediately.", "The club is delighted to announce {m} as our new manager. Welcome. #{CT}", "{C} confirm the appointment of {m}. The new manager will address the media shortly.", "New manager. {m} joins {C}. Details to follow."],
    news: ["BREAKING: {C} appoint {m} as their new manager. #{CT}", "{C} have a new man in charge: {m}. Contract details not disclosed.", "{C} name {m} as manager. He takes over a squad that needs answers.", "Change in the dugout: {m} is the new manager of {C}.", "{m} has been appointed by {C}. Reaction to follow."]
  },
  sack: {
    glee: ["{c} have sacked their manager. About time, honestly.", "Another manager down. The {c} job is cursed. #{CT}", "He was a dead man walking since matchday 3. Everybody knew.", "Who is next on the {c} merry-go-round? Asking for a friend (I am the friend).", "Sacked? He lasted longer than my last data bundle.", "Somebody tell the {c} board that firing coaches is not a tactic.", "I am not saying I predicted it, but I did predict it. Check my timeline.", "The only thing {c} do consistently is change managers.", "That is the third 'full confidence' statement I have seen before a sacking this year.", "The {c} manager's reign: a good run. Not a long one."],
    pity: ["Not the manager's fault. The board is the problem. It is always the board. #BoardOut", "Sacking the coach again won't fix {c}. The squad was built by committee.", "Poor man never had a chance with that squad.", "Football has no patience, no loyalty and no memory. Good luck to him.", "Every manager at {c} gets sacked eventually. The only constant is the boardroom.", "He deserved the full season. Nobody could fix this in the time he was given.", "Remember this when the next one gets the same squad and the same excuses.", "Sad to see him go. Decent man, bad luck, worse board."],
    news: ["{C} are looking for a new manager. {rs}", "{C} part ways with their manager. {rs}", "Change at {C}: the manager is gone. {rs}", "{C} confirm the departure of their manager. {rs}"],
    job: ["Applications open at {c}. Plumbers, please queue on the left.", "Who takes over at {c}? Hear me out: me. I own a whistle.", "The {c} hot seat is vacant. Bring a helmet.", "Betting on who gets the {c} job next. First round is on me.", "Whoever takes the {c} job, I hope the contract has a good severance clause.", "Everyone on this app is a candidate for the {c} job, apparently. Calm down.", "My uncle says he would take the {c} job for free. His results back it up.", "Anyone who says yes to {c} right now has either great belief or no phone."]
  },
  myhire: {
    hype: ["{c} just landed {m}! This is the appointment we needed. #{CT}", "I like {m}. Proper CV. {c} got this one right.", "{m} at {c}. Quietly one of the best appointments in the league.", "Finally a manager with a plan. Welcome, {m}.", "{m} has the right ideas and the right attitude. Let him work.", "If {m} gets one transfer window, watch this team change."],
    doubt: ["{m}?? Who? {c} could have hired anyone and they chose him.", "I have never heard of {m}. Does he even own a tracksuit?", "Prove us wrong, {m}. But my money is on three months and a farewell post.", "{c} board: 'We want a bold project.' Also {c} board: hires {m}. Hayibo.", "Let me guess, {m} is 'a young, hungry coach with fresh ideas'. They always are.", "Is this a joke? {m} for {c}? My cousin could do that job.", "{m} will need a miracle and a very patient board. I have seen one of those two.", "Welcome, {m}. Please enjoy the honeymoon. It is short here.", "{m} has a lot to prove and not much to prove it with.", "Cautious about {m}. I want to see the first five matches before I celebrate or complain."],
    old: ["{m} leaves {old} for {c}. Loyalty is dead.", "{old} fans, we should have seen this coming. He was always looking at the door.", "{m} walks out on {old} for {c}. At least say goodbye.", "Good luck to {m}. {old} will manage without him."],
    official: ["OFFICIAL | {C} welcome {m} as the new first-team manager. #{CT}", "OFFICIAL | {m} is appointed head coach of {C}.", "The club confirms {m} as our new manager. Work starts today. #{CT}", "{C} are delighted to announce {m} as first-team manager."]
  },
  signMine: {
    hype: ["{p} to {c}! This is the kind of signing that changes a season.", "{p} is a serious player. {c} finally using the budget properly.", "{ml} cooking quietly. {p} is a statement signing.", "I have watched {pl} for two seasons. {c} just stole him, mark my words.", "{pl} in a {c} shirt. I did not think they had it in them.", "Sign him, {c}! {p} is the piece this squad was missing.", "Rating {r} and still improving. {c} got a bargain with {pl}.", "That is a proper signing. {p} makes this squad better on day one.", "{pos} was our weak spot. {pl} fixes it.", "I would not swap {pl} for any player in the league at that position."],
    doubt: ["{fee} for {p}?? Hayibo. {m} is being robbed.", "Who is {p}? Did the scouts find him on a highlights compilation?", "{pl} at {c} is a downgrade. Don't @ me.", "I have seen {pl} play. Respectfully, no.", "{fee} for {pl}. I could have found a better player at the taxi rank.", "We have three {pos}s already. Why {pl}?", "The numbers say {pl} is fine. My eyes say otherwise.", "{fee}. For that? {m} had better know something we do not.", "{pl} will be great in training and invisible on matchday. Watch.", "Wrong player, wrong price, wrong time. Classic {c}."],
    free: ["Free signing so no complaints. But don't expect miracles from {pl}.", "{p} on a free. Cheap, sensible, boring. I will take it.", "No fee for {pl}. If he flops, at least our budget survives.", "A free signing is the only kind of signing {c} can afford, apparently.", "{pl} for nothing? Even I cannot complain about that.", "Free agent {p}. Squad depth, nothing more. Fine by me."],
    joke: ["{c} signed {p}. Mama says he looks like the type to score once and disappear for six weeks.", "{pl} has arrived. The scouts' expenses must have been huge.", "{c} signed {pl}. My WhatsApp group is split 50/50. The other half is lying.", "A new {pos} for {c}. Lord, give the old one strength.", "Welcome {pl}. Please do not read the fan comments. Or do, they are very honest.", "{pl} signs for {c}. His agent is having a lovely day."],
    official: ["OFFICIAL | {C} are delighted to announce the signing of {p} ({pos}, {r}) from {C2}.", "DONE DEAL | {p} joins {C} from {C2}. Fee: {fee}.", "WELCOME | {p} signs for {C} from {C2}. A {pos}, rated {r}.", "{C} complete the signing of {p}. Fee: {fee}. #{CT}", "Signed: {p} ({age}, {pos}) arrives at {C} from {C2}.", "OFFICIAL | {p} is a {C} player. The {pos} joins from {C2}."]
  },
  sellMine: {
    rage: ["Why would {c} sell {p}?? {m} must explain this one.", "Selling {pl} is the day this club chose peace over ambition.", "Who is replacing {pl}? Nobody? Okay then. #{CT}", "{C2} just took {pl} and we said thank you. Thank you?!", "{pl} was the only reason to watch. Now what?", "We sold the best {pos} in the league. And we call this a project.", "I do not care about the fee. {pl} was ours.", "This is what happens when a club sells every player who wants to win something.", "Somebody explain why {pl} left. Slowly, because I am angry.", "First {pl}, who is next? The stadium?"],
    shrug: ["{fee} for {pl} is good business. Reinvest properly this time.", "Fine, sell him. He was never worth the wage anyway.", "{fee} is decent money for {pl}. Let's see where it goes.", "I will miss {pl}, but I will not miss the wage bill.", "If the money gets spent well, this is a smart sale. If.", "Sensible deal. {pl} was at his peak value."],
    gloat: ["WELCOME {pl} to {c2}! Thank you {c}.", "{c2} just robbed {c} in broad daylight. Beautiful.", "{pl} to {c2}. We are going to enjoy this.", "{c2} fans, say hello to {pl}. {c} fans, say goodbye.", "Good business by {c2}. {pl} will be a hit.", "{c} sold {pl} to us. They really did that."],
    clause: ["A release clause?? Who signed that contract? Fire the lawyer.", "{c2} just waltzed in and paid the clause for {pl}. This club is a joke.", "Release clause triggered. Another day, another heartbreak. #{CT}", "Why does every contract at {c} have a clause that anyone can trigger?", "{c2} did not even negotiate. They just paid. That is how little {c} protected him.", "That clause was the biggest mistake of the {c} summer."],
    news: ["DONE DEAL | {p} leaves {C} for {C2}. Fee: {fee}.", "{p} is off to {C2}. {C} receive {fee}.", "TRANSFER | {C2} sign {p} from {C} for {fee}.", "{C} sell {p} to {C2}. Fee: {fee}."]
  },
  aiMove: {
    sellerFan: ["{c} just sold {p}. This club has no ambition.", "Thank you for everything, {pl}. You deserved better than {c}.", "Not {pl}!! Why do the best players always leave {c}?", "Selling {pl} and calling it 'business'. Same old {c}.", "{c} fans, hold each other. {pl} is gone.", "I woke up and {pl} had left. Today is going to be long.", "Sold, again. Next season we will 'rebuild'.", "{pl} out. Whoever is replacing him, I hope he comes with a map of the club."],
    buyerFan: ["WELCOME {pl} to {c2}!!", "{c2} are serious this season. {pl} is a proper signing.", "{pl} at {c2}. We are so back.", "Our board actually did something. {pl} is ours.", "{pl} will love it at {c2}. The fans will love him.", "That is a big signing for {c2}. Watch what happens next.", "I did not believe the rumours. Now {pl} is in our colours.", "Another good one for {c2}. The squad looks scary now."],
    news: ["DONE DEAL | {p} moves from {c} to {c2} for {fee}. #Transfers", "{c2} have completed the signing of {p} from {c}.", "TRANSFER | {p} joins {c2} from {c}. Fee: {fee}.", "{c2} land {p}. {c} receive {fee}.", "{p} switches {c} for {c2} in a deal worth {fee}.", "Confirmed: {p} is a {c2} player. #Transfers"],
    doubt: ["{fee} for {pl}? In this economy?", "Overpaid and overrated. {c2} will regret this.", "{c2} paid {fee} for {pl}. Somebody is getting a commission.", "{pl} is decent, not {fee} decent.", "I would not have paid that. But I am not the one with a budget.", "Let's see if {pl} is worth {fee} by December."],
    brag: ["Told you so. I said {pl} to {c2} weeks ago. Pay me.", "Called it. {pl} to {c2}. You can apologise now.", "Remember when I said this transfer would happen? Screenshot saved.", "Another one I had before it was cool. {pl} to {c2}."],
    fake: ["Source: my uncle works at {c2}. He says the fee was double what they told you.", "Just heard the real fee for {pl} is triple. Do not ask how.", "A friend of a friend says {pl} only joined {c2} because of the parking.", "Reliable source says {pl} was 5 minutes from joining someone else.", "My neighbour is a cousin of {pl}'s barber. The real story is wild.", "Someone at {c2} told me the fee was whatever was in the club's wallet that day."]
  },
  free: { news: ["{p} is a free agent. Which club has the nerve? #Transfers", "{p} leaves {c} on a free. Another one the board let walk.", "Free agent alert: {p} ({pos}, {r}) is available.", "{c} could not agree terms with {p}. He is on the market.", "{p} is looking for a new club after leaving {c}.", "A {pos} rated {r} for free? Somebody is going to snap {p} up."] },
  req: { rage: ["{p} wants out?? After everything {c} did for him? Ungrateful.", "{pl} handed in a transfer request. {m} has a fire to put out.", "A transfer request from {pl}. Loyalty really is dead.", "{pl} says he wants a new challenge. The challenge is staying where he is paid.", "Typical. {pl} asks to leave the moment the team is struggling.", "{pl} on the way out? Then sell him high and move on.", "The dressing room must be on fire right now. {pl} wants out.", "Do not give in to {pl}. Make him earn his way back."], pity: ["Can you blame {pl}? Look at this squad.", "Fake news. {pl} loves this club. Sit down.", "If {pl} wants out, the board only has itself to blame.", "{pl} asked to leave because the club has no ambition. Facts.", "I would also request a transfer if I played for this board.", "Everybody saying '{pl} is a traitor' needs to look at the wage bill and the results.", "{pl} gave everything. If he wants to go, wish him well.", "A good player does not leave a good project. Think about that."] },
  watch: { fan: ["Scouts watching {pl} again. If he leaves {c}, I am done.", "Every time {pl} plays well, scouts appear. Leave our boy alone!", "Another scout in the stands. {pl} is not for sale.", "Hands off {pl}. We have been through enough.", "Scouts are circling {pl} like vultures. Please protect him, {c}.", "Of course the scouts are here for {pl}. He is the only good thing about this team."] },
  youth: { hype: ["{p} ({age}) is already rated {r}. Remember where you heard it first.", "Keep an eye on {pl}. The kid is different.", "{pl} is {age} and {r} rated. Where was he hiding?", "The academy keeps producing. {pl} is the next one.", "Bookmark this: {pl} will be a star.", "At {age}, {pl} is better than half the senior squad. Just saying."] },
  retire: { tribute: ["{p} retires at {age}. A proper professional. Thank you for everything.", "Legend. {n} career goals. Give the man a statue.", "He is retiring? He is still quicker than my son.", "{pl} has hung up the boots. What a servant to the game.", "Goodbye, {pl}. We will tell your stories for years.", "Retirement is well deserved. Thank you for every Saturday, {pl}.", "End of an era. {pl} gave football everything.", "I grew up watching {pl}. Now I feel old."] },
  award: { official: ["{p} ({c}) wins the {s} {lg} {aw}.", "{lg} | {s} {aw}: {p} ({c}). Congratulations.", "{p} has been named {aw} for {s}. Well deserved.", "{aw} {s}: {p} of {c}.", "The {lg} salutes {p} ({c}), winner of the {aw}.", "Congratulations to {p} on winning the {aw} in the {lg}."], hype: ["Deserved! My boy {pl}! Ayoba!", "{pl} deserved it. No debate.", "Told you he was the best. Now the whole country agrees.", "Proud of {pl}. What a season.", "From nobody to this. {pl} is a proper story.", "The {aw} could not have gone to anyone else.", "{pl} worked for it. Every minute.", "My club, my player. Say what you want."], hate: ["Because he plays for a big club.", "Penalties should not count.", "Rigged. I said what I said.", "I have seen better players in my street.", "Voting must have been done by relatives.", "{pl}? Really? You must be joking.", "Somebody is getting a gift basket for this.", "The league is just giving prizes to anybody now."] },
  promo: { hype: ["PROMOTED! {c} are going up! #{CT}", "We are going up. Tell your mother, tell your cousins.", "{c} to the {lg2}! Nobody thought this was possible.", "Promotion! I cannot believe I am saying this.", "From the bottom to the {lg2}. Years of pain finally worth it.", "We did it. {c} are up. Do not wake me."], rel: ["{c} relegated. Burn it all down (metaphorically).", "Relegated. The board has a lot of explaining to do. #{CT}", "{c} are going down. They saw this coming from a long way off.", "Relegation. The words no fan ever wants to read.", "{c} dropped. I knew it. I hate that I knew it.", "Down we go. At least the away trips are shorter now."], news: ["{c} {vb} the {lg2}. #{CT}", "{c} {vb} the {lg2} after a long season.", "{c} {vb} the {lg2}. Reaction to follow."] },
  hat: { hype: ["{p} just hit a hat-trick for {c}. The man is on another level.", "Hat-trick for {pl}. Defenders, have some mercy.", "{pl} with three? What a performance.", "Three goals from {pl}. Frame the match ball.", "{pl} came, saw and scored three. Easy as that.", "A hat-trick! {pl} is on fire for {c}.", "I want whatever {pl} had for breakfast. Three goals.", "{pl} has the match ball and a clean sheet of paper for the headlines.", "Treble from {pl}. The scouts will be writing furiously tonight.", "{pl}: 90 minutes, 3 goals, zero chill.", "Hat-trick hero {pl} just made it look easy.", "{pl} gets a hat-trick and the stadium goes crazy."] },
  match: {
    bigWin: ["{sc} against {o}!! {m} is a genius, I take back everything I said.", "This is not a team, it is a statement. #{CT}", "{o} got a proper lesson today.", "{sc}! That is a performance for the history books.", "Beating {o} {sc} and making it look easy. Who are we?", "I came for football and got a masterclass. {c} were brilliant.", "Is that {c}? Because I do not recognise this level.", "{o} left with a mild headache and a sore pride. {sc}.", "The coach said we would come out strong. We came out lethal.", "{sc} and that was only half of what we could have scored."],
    win: ["Three points. Ugly or not, I will take it. {c}", "{c} {sc} {o}. Make noise.", "Winning ugly is still winning. Next.", "{sc} against {o}. A job done.", "Good result. Now keep that same energy next week.", "A win is a win. Please do not ruin it with analysis.", "{c} grind it out. I respect the grind.", "Three more points on the board. The coach can smile a little.", "We did not play well and we still beat {o}. Champions do that.", "Perfect Saturday: {sc} and nobody got injured.", "That is how you beat {o}. Patience and one good moment.", "{sc}. Sleep well, {c} fans."],
    narrow: ["My heart cannot handle this team. {sc} but we take it.", "{sc} against {o}. Stress levels: critical.", "A one goal margin. Somebody please bring me water.", "{sc}. I aged five years in the last ten minutes.", "We won by the smallest margin possible. Typical {c}.", "If you want a calm Saturday, do not support {c}.", "The final whistle came as a gift. {sc}.", "It was close, it was ugly, it was three points.", "I watched through my fingers for 20 minutes. {sc} against {o}.", "{sc}. We take it and we do not look back."],
    draw: ["A draw?? Two points dropped.", "Fair result. Neither team deserved it. Boring.", "{sc} against {o}. I want my 90 minutes back.", "A draw feels like losing to nobody.", "{sc} with {o}. Fine. Fine. It is fine.", "Nobody won, nobody lost, nobody enjoyed it.", "Draws will not win us anything. Where is the killer instinct?", "{sc}. Football's way of saying 'maybe next time'.", "I need someone to explain this {sc}. Calmly.", "A point against {o}. Take it and pretend you are happy."],
    loss: ["{sc} against {o}?! {m} out. I said what I said.", "Same old {c}. Disappointing again.", "I cannot keep doing this to myself. {c} lost AGAIN.", "{sc}. Where is the fight?", "A defeat against {o}. Painful, predictable, avoidable.", "{c} were poor today. Not one player showed up.", "Lost to {o}. I am going to lie down now.", "Today we were bad in every area. Nothing to defend.", "{o} deserved the win. I hate that I am writing this.", "{sc}. Somebody has to take responsibility.", "We keep making the same mistakes and expecting different results.", "Defeat. I will not watch the highlights."],
    heavy: ["{sc}. This is embarrassing. {m} should resign before the board decides for him.", "Delete the club app. I am done. #{ml}Out", "{o} played with their eyes closed and still won {sc}. Eish.", "{sc}?! That is not a result, that is an emergency.", "I have no words for that {sc}. Actually, I do. They are not allowed here.", "We conceded so many I stopped counting. {sc}.", "That is the worst performance in years. {sc} against {o}.", "My neighbours heard me shout. {sc}. Unforgivable.", "{o} scored for fun. We had the stadium in silence.", "{sc} is how you lose a dressing room."],
    gloat: ["Thank you {c} for the three points.", "{c} came here and got what they deserved. Next!", "Cheers {c}. Easy afternoon.", "{c} had the ball and we had the result.", "The {c} fans went quiet. Lovely.", "Three points off {c} and not even a sweat."],
    cope: ["{c} got lucky. The table will tell the truth in May.", "Robbed by {c}. The ref was clearly on their payroll.", "That was never a penalty. {c} know it.", "{c} won, but we won the game in every way that matters.", "A lucky win for {c}. See you at the table.", "We outplayed {c} and lost. Football, hey."],
    star: ["{p} with {n} today!", "{p} was unplayable. Man of the match, no debate.", "{pl} was brilliant. {n}.", "Give {pl} everything he wants. {n} today.", "{p} showed why he is the best at the club. {n}.", "{pl} is the difference. {n} today."],
    streakW: ["{n} wins in a row! Is this team real?", "{n} wins on the trot. Do not wake me.", "{n} in a row. I think the curse is broken.", "We have won {n} matches. Not one of them was luck.", "{n} straight wins. Rival fans must be very quiet right now.", "The momentum is real. {n} wins and counting."],
    streakL: ["{n} defeats in a row. Somebody sell the club.", "{n} losses. At this point it is a hobby.", "{n} losses in a row. The only thing improving is my patience.", "That is {n} defeats now. When does the board speak?", "{n} games without a win. This is a crisis.", "I used to look forward to matchday. Now I look away."],
    out: ["#{ml}Out is trending and honestly? I am not mad about it.", "Board, if you are reading this: you know what to do.", "The #{ml}Out hashtag is gaining speed. Take that as you will.", "I did not want to say it. But maybe {m} has run out of ideas.", "Fans are patient until they are not. We are at 'not'.", "If this continues, there is only one decision left to make."],
    army: ["The #{ml}Army is growing.", "Who doubted {m}? Raise your hand so I can screenshot it.", "{m} is cooking and the whole league can smell it.", "People who wanted {m} out are suddenly very quiet.", "The #{ml}Army has room for everyone who said sorry.", "{m} deserves a long contract and a statue."]
  },
  speak: {
    back: ["I back my players 100%. We win together, we lose together. #{CT}", "Proud of the boys. Keep believing, {c} family.", "Whatever happens, these players have my full support.", "I am not throwing anyone under the bus. We stand together."],
    honest: ["Honest truth: we were not good enough. We will fix it.", "I take responsibility. Next matchday we respond.", "No excuses. I made mistakes and I will correct them.", "The fans deserve better. I will give them better."],
    big: ["We will win the league this season. Write it down. #{CT}", "Nobody in this league scares us. Nobody.", "I did not come here to survive. I came here to win.", "Mark my words: this squad is a title squad."],
    none: ["No comment. Next question.", "Eyes on the next game. That is all I will say.", "I will let the football do the talking.", "No comment today. Thank you."],
    ref: ["I will not say anything about the referee. But you all saw it.", "Some decisions today were... interesting. That is all.", "I am not allowed to say what I think about the officials. So I won't.", "We had a great game plan. The referee had a different one."],
    joke: ["Weekend plan: win. Plan B: see plan A.", "Someone told me I am a plumber. I fixed that leak in the defence already.", "My wife says I talk about football too much. I said 'I am paid to'.", "If we score first, I will dance on the touchline. Fans have been warned."]
  },
  player: {
    roast: ["{pl} is averaging {avg} this season. At some point a bad run becomes a personality.", "Who keeps picking {pl}? {m}, blink twice if you are being held hostage.", "{pl} touched the ball three times and lost it four. Even the maths is failing us.", "I have seen better movement at a taxi rank. {pl}, I am looking at you.", "Respectfully, {pl} must be sold. Today. #{CT}", "{pl} was invisible again. Somebody check if he travelled with the team.", "An average rating of {avg}. A bench would be more useful.", "{pl} played like he was being paid by the hour. And not many hours.", "Every time {pl} is on the ball, my blood pressure rises.", "It is not the system. It is {pl}.", "If {pl} is the answer, I have no idea what the question was.", "Dropping {pl} is not a punishment, it is a favour to everyone."],
    goalless: ["{pl} has {gl} goals in {ap} games. A striker? Or a very expensive spectator?", "{gl} goals from {pl} this season. Even the corner flag has more influence.", "{pl} could not score in an empty net. Sorry, a full one. Sorry, anywhere.", "{gl} goals in {ap} appearances. At this rate he will score in 2031.", "Somebody tell {pl} the goal is the big rectangle at the end of the pitch.", "{pl} is allergic to the net. {gl} in {ap}.", "{ap} games, {gl} goals. The finishing is a crime scene.", "If {pl} scored as often as he complained, we would be top."],
    pricey: ["{pl} earns {wage} a season. My neighbour's dog works harder and does not ask for a new contract.", "{wage} a season for {pl}?? The board is paying for the name, not the player.", "Imagine being paid {wage} to give the ball away. {pl} living the dream.", "{wage} a year. That is a lot of money for a {avg} average.", "The most expensive passenger in the squad is {pl}. {wage} a season.", "Somebody check the contract of {pl}. {wage} for that output is outrageous."],
    praise: ["{pl} is averaging {avg} this season. Somebody give the man a statue.", "Stop sleeping on {pl}. Best player at {c} and it is not close.", "{pl} again. Consistent, quiet, deadly. #{CT}", "If {pl} plays every week, we are fine.", "{avg} average rating. {pl} is carrying this team and nobody says thank you.", "I would build the whole squad around {pl}.", "Name a better {pos} in this league. I will wait.", "{pl} makes everyone around him better. Underrated, underpaid.", "The best signing we never talk about is {pl}.", "{pl} should captain this side. I said it."]
  },
  contract: { hype: ["{pl} signs a new deal at {c}. That is how you keep a legend.", "Finally! Pay the man! {pl} stays. #{CT}", "{pl} commits his future to {c}. A statement of intent.", "A new contract for {pl}. The best news of the week.", "Locked in: {pl} stays at {c}. Good business.", "{pl} extends. The club still has a heartbeat."], doubt: ["{wage} a season for {pl}? Eish. I hope the board knows what it is doing.", "New deal for {pl}? Respectfully, why?", "{wage} is a lot for {pl}. The board is feeling generous.", "{pl} just got paid. Let us see if he plays like it.", "A new contract and a new set of excuses for {pl}.", "I like {pl}. I do not like {wage}."] },
  nation: { qual: ["Bafana qualify for the {af}! Hayi suka, we are back!", "Bafana at the {af}. Let us go!", "We are going to the {af}. I have been waiting for this for years.", "Bafana Bafana are through to the {af}. A proud day.", "Qualified for the {af}! Now please do not ruin it.", "The {af} is coming and Bafana will be there."], miss: ["Bafana miss out on the {af}. Again. Surprise nobody.", "No {af} for Bafana. Somebody has questions to answer.", "Bafana will watch the {af} from home. Heartbreaking.", "We could not even qualify for the {af}. Do not talk to me.", "Missing the {af} is a disgrace. Fix the structures.", "Bafana out of the {af}. Back to the drawing board."], win: ["{w} win the {af}! What a tournament.", "{w} are champions of the {af}. Well deserved.", "The {af} goes to {w}. Congratulations.", "{w} lift the {af}. A final to remember.", "{w} are the best in Africa. Respect.", "The {af} champions: {w}."] },
  cup: { news: ["{c} lift the {cup}! #{CT}", "{cup} | {c} are the champions.", "{c} win the {cup}. A trophy for the cabinet.", "{cup} winners: {c}.", "It is {c} who take the {cup}.", "{c} are the new holders of the {cup}."], hype: ["{c} are CHAMPIONS! Tell your mother, tell your cousins.", "Cups do not win themselves. Well done {c}!", "{c} got the job done. Now the party begins.", "Winning the {cup} feels unreal. {c} forever.", "Trophy day for {c}! Sing loud.", "{c} fans, you have been waiting for this. Enjoy it."], hate: ["The cup is just a participation trophy. I said what I said.", "{c} won it? Somebody check the draw.", "{c} won the {cup} by being lucky and nothing else.", "A cup is nice. A league title is better. Stay calm.", "{cup} winners {c}. Good for them. We move.", "The {cup} has lost its meaning anyway."] },
  mysack: { glee: ["{m} sacked! The plumber has been shown the door. #{ml}Out", "Finally. {c} can breathe again.", "{m} is gone. The only surprise is it took so long.", "{c} sack {m}. Everybody saw it coming.", "{m} out. Now let us see if the board has a plan.", "Goodbye, {m}. Thanks for nothing."], pity: ["Sacking {m} is the easy option. The board should look in the mirror. #BoardOut", "He deserved more time. Football has no patience.", "{m} did what he could with what he had. Respect.", "A harsh decision on {m}. The problems at {c} run deeper.", "Poor {m}. Never given the tools.", "I will remember {m} fondly. It was never his fault."], news: ["BREAKING: {C} have sacked {m}. #{CT}", "{C} part ways with {m}.", "{C} confirm that {m} has left his post."] },
  promise: { kept: ["He said it and he did it. {m} keeps his word.", "Talk big, play big. Respect, {ml}.", "{m} promised and delivered. That is leadership.", "The promise was bold. The result was bolder.", "Words and actions finally match. Well done, {m}."], broke: ["Write it down, he said. We wrote it down. #{ml}Out", "Talk big, play small. Classic plumber.", "{m}: 'Nobody scares us.' The scoreboard: 'Hold my beer.'", "{m} made a promise and the team forgot to read it.", "I screenshotted the promise. I am going to enjoy this.", "Big words, small result. The usual.", "Remember when {m} said we would win? Neither do the players.", "Confidence is great. Results are better."] },
  speakR: { pos: ["Coach {ml} said it. Respect.", "That is the kind of manager we need. #{CT}", "Say it again, Coach. We believe.", "Finally someone with something to say.", "This is the sort of honesty I want from a manager.", "Proud to have {ml} leading us."], neg: ["Words, words, words. Win something.", "Talk is cheap, {m}. See you on the pitch.", "Another press conference, another set of excuses.", "Less talking, more tactics.", "{m} should use that energy on the training ground.", "Is the coach okay? Every interview gets worse."], big: { pos: ["Confidence! I love it.", "Finally a manager with some spine.", "That is the ambition we needed.", "If he delivers, legend. If not, we will remind him."], neg: ["Write it down? Screenshotting this.", "Bold talk from a man with that squad.", "Promises are free. Trophies are not.", "He has never won anything here and he is promising the league. Okay."] }, ref: { pos: ["Say it louder, Coach! The ref was a disgrace.", "Somebody finally said it.", "The referee had one job. He failed.", "Thank you, {ml}. Someone had to say it."], neg: ["Blaming the ref again? Weak.", "The ref did not miss those chances, Coach.", "Excuses are not a tactic.", "Referees are easy to blame. Wins are harder."] } },
  rumour: {
    interest: ["BREAKING: {c2} are lining up a bid for {p}. Sources close to the club. #Transfers", "Hearing {c2} have made contact for {p}. Hear it here first.", "{p} to {c2} is 'close'. Medical booked. (I made up the last part.)", "Big news: {c2} want {p}. More soon.", "{c2} have identified {p} as the number one target. Allegedly.", "Whispers say {p} is on {c2}'s shortlist. Take that how you will.", "My sources say {c2} met {p}'s agent last night. Dinner was expensive.", "Transfer alert: {p} could leave {c} for {c2} before the window closes.", "Reports: {c2} have submitted an offer for {p}. {c} are said to be unimpressed.", "A little bird told me {c2} are preparing a bid for {p}."],
    mineOut: ["Hearing {p} is unhappy at {c} and wants out. Not confirmed, but my cousin is the kit man.", "{p} has told friends he wants a new challenge. #{CT}", "Word is {p} is not happy with playing time. Not confirmed.", "Reliable sources: {p} is looking at the exit door.", "{p} unsettled at {c}. Agent has been spotted at the stadium.", "I am told {p} has been training alone. Draw your conclusions.", "{p} to leave {c} in the next window? Do not say you heard it from me.", "A friend at {c} says {p} has already packed his bags."],
    sack: ["{m} to be sacked on Friday. Source: a guy at the car wash.", "Board meeting at {c} tonight. {m} is gone. Believe it.", "Hearing {m}'s time at {c} is running out. Hear it here first.", "Insider says {m} has two games to save his job.", "The board has held talks about replacing {m}. I know a man who knows a man.", "Not confirmed, but my taxi driver says {m} has been seen cleaning out his office.", "{m} is on thin ice at {c}. The ice is very, very thin.", "Sources close to {c} say the board has lost patience with {m}."],
    conf: ["Told you. I said {pl} to {c2}. Pay me.", "Called it. Bathini check my timeline.", "Confirmed. I said it first and you doubted me.", "I will take the apology in cash, please. {pl} to {c2}.", "Remember who broke the {pl} story. Not you. Me.", "See? Reliable. {pl} is off to {c2}."],
    check: ["Bathini Check | Claim: \"{claim}\". Verdict: no evidence. Treat with caution.", "Bathini Check | We looked into: \"{claim}\". We found nothing to support it.", "Bathini Check | \"{claim}\" appears to be false. Do not share it.", "Fact check: \"{claim}\". Our verdict: not true."],
    debunk: ["Fake news again.", "Delete your account.", "Your cousin is a liar.", "Source: trust me bro.", "Where did you get this? Be honest.", "Every week the same nonsense.", "This aged badly in four seconds.", "Block this account, nobody learns anything here.", "Nobody believes you anymore.", "Hayibo, make something up that is at least believable."]
  },
  life: ["Remember when we watched the second half by phone torchlight during Stage 6? Character-building years.", "Taxi driver just told me he can coach better than any {lg} manager. I believe him.", "My data finished at 78 minutes. This is how I find out the score.", "Referees in this league are doing their own thing. Always have.", "Kasi football beats everything. Fight me.", "{lg}: where anything can happen and usually does.", "Why is the pie at the stadium R65? Why?", "My uncle says the old days were better. My uncle also says the earth is flat.", "{c} fans, how are we feeling this morning? Be honest.", "Fantasy league update: I am last. I will not be taking questions.", "Dear {c} board: sell the club or sell the strikers. Pick one. Love, fans.", "Mama: 'Why are you shouting at the TV?' Me: 'Because the TV can hear me.'", "Football without shouting at the referee is just walking.", "Saturday plan: wake up, argue about {c}, repeat.", "Every club's fans think they are the main character. (We are, though.)", "Bathini is only fun when your team wins. Anyway.", "Someone explain the offside rule to my dad, please. He has been watching since 1994.", "The braai is more important than the result. But the result matters too.", "Load shedding is gone and the football is still not better. We lost our excuse.", "Old man next door still starts his generator every time the home team scores. Old habits.", "We survived Stage 6 and we can survive another {c} loss.", "Remember hearing a goal celebration from three houses away because the power was off? Nostalgia.", "Football on a Sunday with a full stomach and a working fridge. Peak life.", "My cousin is a scout. He has scouted three players. All of them are now his friends.", "I called the radio station to complain about the referee. They put me on air. Worst idea.", "Every matchday I promise myself I will not stress. Every matchday I lie.", "Whoever set the fixtures clearly hates {c}.", "I saw a {c} jersey at the mall today and nearly cried. Good cry.", "Imagine paying a transfer fee and then not playing the guy. Imagine.", "The stadium pie is cold again. The football is hotter. Both are painful.", "There is no tactic quite like a long ball and hope.", "Group chat: 8 people, 12 opinions, 0 solutions.", "I support {c} and I have the blood pressure to prove it.", "My neighbour's flag is so faded it supports no club now. Impressive.", "Not me checking the table seven times before breakfast.", "A 0-0 draw is just a spreadsheet of fouls.", "Please let the referee be sober today. I ask for so little.", "The commentator just said 'it is a game of two halves'. Congratulations, sir.", "I have decided my new year's resolution: stop reading the comments on Bathini. Day 1. Failed.", "Football is the only thing that makes strangers hug in a stadium and argue in a group chat.", "Quiet week. Which means somebody is about to be sacked.", "If I had a rand for every time someone said 'it is the same ten players', I would own the league."],
  date: { '06-16': "Happy Youth Day, Mzansi! Give the young players a chance. #YouthDay", '08-09': "Happy Women's Day to every mama who raised a football fan. #WomensDay", '09-24': "Happy Heritage Day! Braai, football and good people. #HeritageDay", '12-25': "Merry Christmas, football family. Even the referees. Mostly.", '01-01': "New year, new season, same old hopes. Happy New Year, Bathini!", '04-27': "Happy Freedom Day, Mzansi. #FreedomDay", '12-16': "Happy Day of Reconciliation, everybody. Even the rival fans. #DayOfReconciliation", '03-21': "Happy Human Rights Day. #HumanRightsDay", '05-01': "Happy Workers' Day. To the players who work and the ones who pretend to. #WorkersDay" },
  table: { top: ["{c} go top of the {lg}! The table does not lie.", "{c} on top of the log. Do not wake me.", "{c} lead the {lg}. Somebody check on the rest.", "A new leader in the {lg}: {c}. Pressure is on.", "{c} climb to the top. Where did this come from?", "Top of the table: {c}. Savour it, it does not last."], topFan: ["Top of the league, and I refuse to look at the schedule.", "Whoever said {c} were finished, where are you?", "Top of the log and the vibes are impeccable.", "I do not care how long it lasts. {c} are first.", "My heart cannot take this. {c} are on top.", "Take a screenshot of the table. Frame it."], bot: ["{c} sit bottom of the {lg}. At this point it is a hobby.", "{c} at the bottom. The board is on holiday.", "Last place and still no panic? Strong.", "{c} are bottom of the {lg}. This is not a drill.", "{c} are rooted to the bottom. Someone, anyone, do something.", "The log does not lie. {c} are last."] },
  upset: ["{c} {sc} {o}?? In THIS economy? #{lgt}", "Giant killed: {c} stun {o} {sc}. Football, man.", "{c} beat {o} {sc}. Nobody saw that coming.", "Shock in the {lgt}: {c} {sc} {o}. The underdog barks.", "{o} lose {sc} to {c}. The favourites forgot to turn up.", "Upset of the round: {c} {sc} {o}."],
  scorer: ["{p} bagged {n} for {c}. This man is on a different planet.", "Player of the Round: {p} ({c}), {n} goals. #{lgt}", "{n} goals for {p} this round. {c} might not be able to afford him for long.", "{p} ({c}) scored {n} in one round. Defenders are in trouble.", "{lgt} round report: {p} with {n} for {c}.", "{n} goals from {p}. Stand up and clap."],
  react: {
    agree: ["Facts.", "Say it louder.", "This is the take.", "100 percent.", "Finally someone said it.", "Tell them, bra.", "Exactly this.", "I could not have put it better.", "Everybody thinks it. You said it.", "Sharp.", "True story.", "My thoughts exactly.", "Someone give this person a trophy."],
    disagree: ["This is the worst take I have seen today.", "Delete this.", "You watch football with your eyes closed?", "Ratio.", "Who let you cook?", "Hai suka, man.", "Please stop.", "Where did you get this from?", "Not even close, my friend.", "I read this twice and I still disagree.", "You are entitled to your opinion. It is wrong.", "Is this a joke?", "Go back and watch the match.", "Respectfully, no."],
    joke: ["I am crying.", "Screenshotting this for December.", "Not me reading this at work.", "Eish. Painful.", "Somebody call an ambulance.", "I laughed out loud on the bus.", "The accuracy is too much.", "Brutal. Beautiful.", "I need a moment.", "This is why I log in every morning.", "Savage. Where is the lie?", "Okay that one hurt.", "Pass the popcorn."],
    love: ["Ayoba!", "That is my team!", "Up the club!", "Yes Coach!", "Proud supporter.", "This is why we love the game.", "Beautiful.", "Sho, that is class.", "This is what we are about.", "Let us goooo.", "Hayi, that is perfect.", "Nothing but love."],
    hate: ["You said the same thing last year.", "Cope.", "Block and move on.", "Hayibo, this is why I mute you.", "You have never been right once.", "Touch grass.", "Sit this one out.", "No one asked.", "Your opinions are why I take breaks from this app.", "Please find a hobby.", "The overconfidence is impressive.", "Pretending to know football is a skill, I guess."]
  }
};
Object.keys(BTH_B2).forEach(k => { BTH_B[k] = BTH_B2[k]; });
Object.assign(BTH_TONE_BIAS, { believer: { hype: 4, win: 3, love: 3 }, doomer: { doubt: 4, rage: 3, loss: 3, plumber: 0.8 }, troll: { plumber: 1, joke: 3, rage: 2, gloat: 3 } });
Object.assign(BTH_FLAVOR, {
  uncle: ['In my day we had real managers.', 'Football was better when we listened to it on radio.', 'I have been saying this since 1998.', 'Nobody respects the old players anymore.', 'Back then a pie and a bus fare was all you needed.'],
  mama: ['Mntanami, calm down.', 'Eat something first, then post.', 'I am praying for this team.', 'Drink water, all of you.', 'Respect your elders on this app.'],
  nerd: ['(the xG disagrees)', '(sample size: tiny)', '(numbers do not lie, people do)', '(small sample, still true)', '(my spreadsheet agrees)'],
  kasi: ['fr fr', 'no cap', 'sharp sharp', 'ngl', 'lowkey'],
  loud: ['I SAID WHAT I SAID.', 'Write this down.', 'Do not argue with me.', 'Remember this post.']
});

/* ---- Bathini update: engine overrides (later declarations win) ---- */
function bthPick(a) {
  const B = (typeof G !== 'undefined' && G && G.bth) ? G.bth : null, used = B ? (B.used || (B.used = {})) : (bthPick.m || (bthPick.m = {})), now = B ? B.seq : (bthPick.n = (bthPick.n || 0) + 1);
  const key = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return h; };
  let best = [], bv = Infinity;
  for (const x of a) { const v = used[key(x)] == null ? -1 : used[key(x)]; if (v < bv) { bv = v; best = [x]; } else if (v === bv) best.push(x); }
  let pool = best; if (a.length > 6) { const fresh = a.filter(x => used[key(x)] == null || now - used[key(x)] > Math.min(500, a.length * 14)); if (fresh.length >= 3) pool = fresh; }
  const x = bthP(pool); used[key(x)] = now;
  const ks = Object.keys(used); if (ks.length > 1500) ks.sort((p, q) => used[p] - used[q]).slice(0, 500).forEach(k => delete used[k]);
  return x;
}
function bthFlavor(u, t) { const f = BTH_FLAVOR[u.per]; return f && bthR() < (u.k === 'fan' ? 0.12 : 0.18) ? t + ' ' + bthPick(f) : t; }
function bthHire(g, t, mname) {
  if (!t || t.id === g.myTeam || !bthOk(g.bth, t.tier <= 1 ? 1 : 0)) return; const ctx = Object.assign(bthBase(g), bthTC(t), { m: mname, ml: bthSlug(mname.split(' ').pop()) }), o = { tid: t.id, mg: 1 };
  bthAdd(g, bthClubAcct(g, t), bthFill(bthPick(BTH_B.hire.official), ctx), o);
  for (let i = 0, n = t.tier <= 1 ? 3 : 1; i < n; i++) { const u = bthFanOrNeutral(g, t.id); bthSay(g, u, 'hire', { hype: 3, doubt: 3, plumber: 0.5, rival: u.club === t.id ? 0 : 1.2 }, ctx, o); }
}
function bthSeed(g) {
  const B = g.bth, me = g.teams[g.myTeam], rows = g.teams.filter(t => t.tier === me.tier).sort((a, b) => teamOverall(b) - teamOverall(a)), rank = rows.findIndex(t => t.id === me.id) + 1;
  const ctx = Object.assign(bthBase(g), bthTC(me), { old: 'his old club' }), o = { tid: me.id, me: 1, mg: 1 };
  B.last.dt = bthDate(g); B.last.my = g.round;
  bthAdd(g, B.users.BathiniNews, 'Welcome to Bathini. Where Mzansi football talks. Rumours, hot takes, nonsense, the truth. All of it, all day. #Bathini', { noRep: 1 });
  bthAdd(g, bthLeagueAcct(g, me.tier), `A new ${seasonLabel(g.season)} season is here. ${rows.length} clubs, one trophy, endless arguments. #${ctx.lgt}`, { noRep: 1 });
  bthAdd(g, bthClubAcct(g, me), bthFill(bthPick(BTH_B.myhire.official), ctx), o);
  for (let i = 0; i < 3; i++) bthSay(g, bthFan(g, me.id), 'myhire', { hype: 2, doubt: 3 }, ctx, o);
  bthAdd(g, B.users.ProfessorDiski, `${seasonLabel(g.season)} predictions: ${rows[0].s} for the title, ${rows[1].s} close behind. ${me.s} ${rank <= 3 ? 'will be in the mix' : rank >= rows.length - 4 ? 'are fighting for survival' : 'to finish mid-table'}. Quote me in May.`, { tid: me.id, me: 1 });
  bthAdd(g, B.users.KasiXI, `Squad strength before kick-off: ${me.s} rank ${rank} of ${rows.length} in the ${TIER_NAMES[me.tier]}. Numbers don't lie, referees do.`, { tid: me.id, me: 1 });
  try { bthRumours(g); bthRumours(g); } catch (e) { }
  for (let i = 0; i < 3; i++) bthLife(g);
}
const BTH_IC2 = {
  talk: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H11l-4 3.5V16H4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="8.5" cy="10.5" r="1.1" fill="currentColor"/><circle cx="12" cy="10.5" r="1.1" fill="currentColor"/><circle cx="15.5" cy="10.5" r="1.1" fill="currentColor"/></svg>',
  spread: '<svg viewBox="0 0 24 24"><path d="M4 10v4h3l7 4V6L7 10z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M17.5 9.5a3.5 3.5 0 010 5M19.8 7.2a7 7 0 010 9.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  ayoba: '<svg viewBox="0 0 24 24"><path d="M12 21c-4 0-6.5-2.6-6.5-6 0-2.6 1.6-4.2 2.8-5.6.9-1 1.4-2 1.4-3.4 2.6 1.2 4.4 3.4 4.6 5.4.8-.6 1.2-1.6 1.2-2.7 2 1.7 3 3.6 3 6.2 0 3.4-2.5 6.1-6.5 6.1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  seen: '<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>'
};
const bthNoEmoji = s => String(s == null ? '' : s).replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '').replace(/ {2,}/g, ' ').trim();
function bthPostHTML(g, p) {
  const B = g.bth, u = B.users[p.h] || { h: p.h, n: p.h, k: 'fan' }, f = p.pid != null ? findPlayer(g, p.pid) : null, lk = !!B.liked[p.id], rt = !!B.rted[p.id];
  const card = f ? `<div class="bp-card" data-pid="${p.pid}">${faceSVG(f.p, 46, f.t ? f.t.c1 : null)}<span class="pc"><b>${esc(f.p.name)}</b><small>${f.p.pos} · ${f.p.age} yrs · OVR ${f.p.rating}${f.t ? ' · ' + esc(f.t.s) : ' · free agent'}</small></span>${f.t ? crestHTML(f.t, 26) : ''}</div>` : '';
  const fl = p.fl ? `<span class="fl ${p.fl === 'Confirmed' ? 'c' : p.fl === 'Debunked' ? 'd' : p.fl === 'Bathini Check' ? 'k' : 'u'}">${esc(p.fl)}</span>` : '';
  const rp = p.rp.length ? `<div class="bp-rp">${p.rp.map(r => `<div><b data-h="${esc(r.h)}">@${esc(r.h)}</b> ${esc(bthNoEmoji(r.t))}</div>`).join('')}${p.rn > p.rp.length ? `<small>View ${bthK(p.rn - p.rp.length)} more ${p.rn - p.rp.length === 1 ? 'reply' : 'replies'}</small>` : ''}</div>` : '';
  return `<article class="bp${p.me ? ' me' : ''}${p.vi ? ' vi' : ''}${p.id > bthSeenAt ? ' nw' : ''}" data-id="${p.id}">
    <div class="bp-l" data-h="${esc(u.h)}">${bthAvatar(g, u)}</div>
    <div class="bp-r"><div class="bp-head"><b data-h="${esc(u.h)}">${esc(u.n)}</b>${u.v ? BTH_TICK : ''}<span class="hd">@${esc(u.h)}</span><span class="dot">·</span><span class="hd">${bthWhen(g, p)}</span>${p.vi ? '<span class="fl v">Viral</span>' : ''}${p.ra ? '<span class="fl d">Ratioed</span>' : ''}${fl}</div>
    <div class="bp-text">${bthFmt(bthNoEmoji(p.t))}</div>${card}
    <div class="bp-acts v2"><span class="pl" title="Talk">${BTH_IC2.talk}<em>Talk</em><i>${bthK(p.rn)}</i></span><button data-a="rt" class="pl ${rt ? 'on' : ''}" title="Spread it">${BTH_IC2.spread}<em>Spread</em><i>${bthK(p.rt + (rt ? 1 : 0))}</i></button><button data-a="lk" class="pl ${lk ? 'on' : ''}" title="Ayoba">${BTH_IC2.ayoba}<em>Ayoba</em><i>${bthK(p.lk + (lk ? 1 : 0))}</i></button><span class="pl seen" title="Seen by">${BTH_IC2.seen}<i>${bthK(p.lk * 11 + p.rt * 7 + 40)}</i></span></div>${rp}</div></article>`;
}
/* ---- Bathini v3 (moved here from the <style> block) ---- */
BTH_B.rel = {
  upsetFan: ["WE BEAT {o}!!! {sc}! Nobody gave us a chance and look at us now. #{CT}", "{o} came here thinking it was easy. {sc}. Sit down, giants.", "I am shaking. We just beat {o}. {m} you beautiful man.", "Remember this day. {c} {sc} {o}. Tell your grandchildren.", "Who said we cannot compete with the big boys? {sc} against {o}!", "{o} are a big club. We are bigger today. {sc}.", "Pinch me. {c} have beaten {o} and I am not dreaming.", "The giants have fallen. {sc}. Somebody wake up the whole township.", "{m} outsmarted {o}. Let that sink in.", "This is why we love football. {sc} against {o}, and nobody saw it coming.", "Frame the scoreboard. {c} {sc} {o}.", "My phone is dead from the celebrations. {c} beat {o}!"],
  upsetNeutral: ["Shock of the season: {c} beat {o} {sc}. The big boys have been humbled.", "{o} lose to {c}. Somebody in the dressing room has some explaining to do.", "{c} stun {o} {sc}. This is why you play the games.", "{o} were not expected to lose that. {c} did not read the script.", "Nobody had {c} beating {o}. Not even {c}.", "Giant killing in the {lgt}: {c} {sc} {o}.", "A famous win for {c}. {o} will want to forget this one.", "{m} just did what nobody thought he could. {c} {sc} {o}."],
  upsetOpp: ["Lost to {c}. We will not recover from the embarrassment.", "{c}?? We lost to {c}. I need a day off from being a fan.", "Big club, small performance. {c} deserved it.", "{m} must have known. This is what happens when you take {c} lightly.", "We came for three points and left with a lesson. {sc}.", "Do not tell me we are a big club. Big clubs do not lose to {c}.", "Where were the big names today? Hiding, apparently.", "Respect to {c}. Shame on us."],
  giantLossFan: ["{o} are {o}. No shame in losing to them, we go again.", "It is {o}. A loss is not the end of the world, keep your heads up.", "We lost to the best team in the league. Move on, next week.", "{sc} against {o}. Honestly expected. Let us win the games we should win.", "No shame in that. {o} have a different budget, a different squad, a different life.", "Ja, we lost to {o}. My heart is fine. My pride is slightly bruised.", "We gave {o} a decent game. Keep working, {m}.", "Lost to {o}, but the fight was there. Proud of the boys.", "Well, that was always going to be hard. {o} are on another level right now.", "A lesson from {o}. Learn it, fix it, move on."],
  giantLossNeutral: ["{o} beat {c} {sc}. Business as usual.", "The giants win again. {o} {sc} {c}.", "Nothing surprising about that. {o} take the points.", "{c} were brave but {o} were too good. {sc}."],
  lamFan: ["We lost to {o}??? LAMTHUTHU?! A small chicken beat us. I cannot show my face.", "{o} are lamthuthu and they just took three points off us. Unbelievable.", "Lamthuthu {o}. Lost to them. I am going to bed.", "How do you lose to {o}? How? Explain it to me slowly.", "I will never forgive this one. {sc} against {o}. Embarrassing.", "We just got beaten by the smallest team in the league. Eish.", "{m}, please explain how {o} beat us. Calmly. In writing.", "Everybody will laugh at us tomorrow at work. {o}, of all teams.", "{o} lamthuthu are now celebrating like they won the league. Our fault.", "Lost to {o}. Not even the big excuses can save us this time.", "That is a result you do not recover from. {sc} against {o}.", "A small chicken ate us today. Feathers everywhere."],
  lamDrawFan: ["A draw with {o}? Lamthuthu? We should have won by four.", "Two points dropped against {o}. At home. Against that. Shame.", "{o} are lamthuthu and we could not beat them. What are we doing?", "We dropped points to {o}. The title dream just looked at its watch.", "Draw with {o}. That is a loss dressed in a nice jacket.", "If you cannot beat {o}, you cannot beat anyone."],
  lamGloat: ["Lamthuthu? Look at the scoreboard. {sc}. We just beat {o}!", "{o}, say it with me: small chicken, big appetite. We beat you.", "They called us lamthuthu. Today the lamthuthu won. {sc}.", "{o} laughed at us before the match. Who is laughing now? {sc}.", "The small chicken just made a very big noise. {c} beat {o}!", "We are not scared of {o}. We have never been. {sc}."],
  lamTroll: ["{o} lost to lamthuthu. Delete the club app.", "Lost to {c}?? That is a small chicken. Let me say it again: a SMALL CHICKEN.", "Someone check on the {o} fans. They are not responding.", "{o} fans in my mentions pretending they did not just lose to {c}.", "Tomorrow at work {o} fans are going to be very quiet. Lamthuthu got them.", "Do not talk to me about the league. Not today. Lamthuthu has spoken."],
  giantFallFan: ["We are supposed to be BIG! Losing to {o} is not allowed.", "Big club, big expectations. Today we delivered neither.", "I support a giant. Giants do not lose to {o}. Fix this, {m}.", "The badge deserves better than this. {sc} against {o}.", "Standards, people. We are a big team and we played like a tavern side.", "Sundays are going to be hard this week. {o} embarrassed us.", "A giant is only as big as its last result. Today we were tiny."],
  giantMeh: ["Beat {o}, as expected. Nothing to celebrate, nothing to complain about.", "A win against {o}. That is the minimum. Next.", "{sc} against {o}. Job done, do not make it a headline.", "Beating {o} is what we are supposed to do. Carry on."],
  aiUpset: ["LAMTHUTHU ALERT: {c} beat {o} {sc}! The giant has been eaten.", "{c} {sc} {o}. Somebody tell {o} the small chicken is not scared.", "{c} just beat {o}. The league just got interesting.", "{o} lose to {c}. This is why you never write off the small ones.", "Giants down: {c} {sc} {o}. Absolutely wild.", "{c} stun {o} {sc}. The table does not know what to do with itself."]
};

/* ---- Bathini v3: level-aware match talk, real emojis, mood-matched replies ---- */
function bthLvl(g, t) {
  const B = g.bth, k = g.season + ':' + g.round; if (!B.lv || B.lv.k !== k) B.lv = { k };
  if (B.lv[t.tier] == null) {
    const rows = g.teams.filter(x => x.tier === t.tier).sort((a, b) => (b.rep || 0) - (a.rep || 0) || teamOverall(b) - teamOverall(a)), map = {}, ov = rows.slice().sort((a, b) => teamOverall(a) - teamOverall(b));
    rows.forEach((x, i) => { map[x.id] = i < (t.tier === 0 ? 3 : 2) ? 'giant' : 'mid'; }); ov.slice(0, t.tier === 0 ? 4 : 3).forEach(x => { if (map[x.id] !== 'giant') map[x.id] = 'small'; }); B.lv[t.tier] = map;
  }
  return B.lv[t.tier][t.id] || 'mid';
}
function bthAdd(g, u, text, o) {
  o = o || {}; const B = g.bth; if (B.posts.slice(0, 60).some(x => x.t === text)) return null;
  if (B.posts.slice(0, 150).some(x => x.t === text)) return null;   if (o.pid != null) { const same = B.posts.slice(0, 60).filter(x => x.pid === o.pid && x.r >= g.round - 2), chat = x => { const q = B.users[x.h]; return q && q.k !== 'news' && q.k !== 'club' && q.k !== 'league'; }; if (same.length >= 4 || (u.k !== 'news' && u.k !== 'club' && u.k !== 'league' && same.filter(chat).length >= 2)) return null; }   const base = (BTH_KB[u.k] || 70) * (u.k === 'fan' ? 0.4 + (u.f || 100) / 800 : 1), spicy = /#Plumber|Out\b|sack|fake|hayibo|worst|lamthuthu/i.test(text) ? 1.5 : 1, hb = o.me ? 1 + Math.abs(B.heat) / 120 : 1;
  let lk = Math.round(base * (0.15 + bthR() * 1.1) * spicy * hb) + bthI(0, 12); const viral = bthR() < 0.04; if (viral) lk *= 9;
  const post = { id: B.seq++, d: bthDate(g), r: g.round, h: u.h, t: text, lk, rt: Math.round(lk * (0.05 + bthR() * 0.3)), rn: 0, rp: [] };
  ['pid', 'tid', 'me', 'mg', 'fl'].forEach(k => { if (o[k] != null) post[k] = o[k]; }); if (viral) post.vi = 1;
  const NEG = /\blost\b|defeat|sack|\bout\b|embarrass|worst|disgrace|relegat|hayibo|crisis|robbed|eish|lamthuthu|wants out|ungrateful|bottom|going down|shame|bad\b/i, POS = /\bwin\b|\bwon\b|champion|promot|deserved|brilliant|hat-trick|welcome|proud|ayoba|legend|going up|beat |statement|lethal|masterclass/i;
  const mood = o.mood || (NEG.test(text) && !POS.test(text) ? 'neg' : POS.test(text) && !NEG.test(text) ? 'pos' : null);
  const nr = o.noRep || bthR() < 0.3 ? 0 : bthI(1, u.k === 'fan' ? 2 : 3), pool = mood === 'pos' ? ['agree', 'love', 'love', 'joke', 'hate'] : mood === 'neg' ? ['agree', 'disagree', 'joke', 'joke', 'hate'] : ['agree', 'disagree', 'joke', 'love', 'hate'];
  for (let i = 0; i < nr; i++) { const ru = bthNeutral(g); post.rp.push({ h: ru.h, t: bthPick(BTH_B.react[bthP(pool)]), l: bthI(0, 80) }); }
  post.rn = nr + Math.round(lk * (0.03 + bthR() * 0.2)); if (u.k === 'troll' && bthR() < 0.35) { post.rn = lk * 2 + 9; post.ra = 1; }
  B.posts.unshift(post); if (B.posts.length > BTH_KEEP) B.posts.length = BTH_KEEP; B.bud--; return post;
}
function bthHire(g, t, mname) {
  if (!t || t.id === g.myTeam || !bthOk(g.bth, t.tier <= 1 ? 1 : 0)) return; const ctx = Object.assign(bthBase(g), bthTC(t), { m: mname, ml: bthSlug(mname.split(' ').pop()) }), o = { tid: t.id, mg: 1 }, big = bthLvl(g, t) === 'giant';
  bthAdd(g, bthClubAcct(g, t), bthFill(bthPick(BTH_B.hire.official), ctx), o);
  for (let i = 0, n = t.tier <= 1 ? 3 : 1; i < n; i++) { const u = bthFanOrNeutral(g, t.id); bthSay(g, u, 'hire', { hype: 3, doubt: 3, plumber: big ? 1 : 0.4, rival: u.club === t.id ? 0 : 1.2 }, ctx, o); }
}
function bthMyMatch(g) {
  const B = g.bth, me = g.teams[g.myTeam]; if (B.last.my === g.round) return; B.last.my = g.round;
  const ix = myMatchIndex(g, g.round - 1), m = ix >= 0 && g.fixtures[me.tier][g.round - 1][ix]; if (!m || !m.played || m.forfeit) return;
  const home = m.h === me.id, gf = home ? m.hg : m.ag, ga = home ? m.ag : m.hg, opp = g.teams[home ? m.a : m.h], d = gf - ga, sc = gf + '-' + ga;
  const key = d >= 3 ? 'bigWin' : d === 2 ? 'win' : d === 1 ? 'narrow' : d === 0 ? 'draw' : d >= -2 ? 'loss' : 'heavy';
  const ml = bthLvl(g, me), ol = opp.tier === me.tier ? bthLvl(g, opp) : (opp.tier < me.tier ? 'giant' : 'small');
  const sp = d > 0 && ol === 'giant' && ml !== 'giant' ? 'upset' : d <= 0 && ol === 'small' && ml !== 'small' ? (d === 0 ? 'lamDraw' : 'lam') : d < 0 && ol === 'giant' && ml !== 'giant' ? 'giantLoss' : d <= 0 && ml === 'giant' && ol !== 'giant' ? 'giantFall' : d > 0 && ml === 'giant' && ol === 'small' ? 'meh' : '';
  B.streak.push(d > 0 ? 'W' : d < 0 ? 'L' : 'D'); if (B.streak.length > 8) B.streak.shift();
  let dh = ({ bigWin: 10, win: 7, narrow: 5, draw: -1, loss: -7, heavy: -13 })[key]; dh += ({ upset: 8, lam: -7, lamDraw: -5, giantLoss: 5, giantFall: -4, meh: -3 })[sp] || 0;
  B.heat = bthClamp(B.heat + dh, -100, 100);
  const ctx = Object.assign(bthBase(g), bthTC(opp, 'o'), { o: opp.s, sc, OT: bthSlug(opp.s) }), o = { tid: me.id, me: 1, mg: 1 }, win = d > 0;
  const std = sp ? 1 : (key === 'bigWin' || key === 'heavy' ? 3 : 2);
  for (let i = 0; i < std; i++) bthSay(g, bthFan(g, me.id), 'match', { [key]: 1 }, ctx, Object.assign({ mood: win ? 'pos' : 'neg' }, o));
  const R = (tone, who, n, mood) => { for (let i = 0; i < (n || 1); i++) bthSay(g, who(), 'rel', { [tone]: 1 }, ctx, Object.assign({ mood }, o)); };
  const myFan = () => bthFan(g, me.id), opFan = () => bthFan(g, opp.id), neu = () => bthNeutral(g);
  if (sp === 'upset') { R('upsetFan', myFan, 2, 'pos'); R('upsetNeutral', () => bthCast(g, 'media'), 1, 'pos'); if (bthR() < 0.8) bthSay(g, opFan(), 'rel', { upsetOpp: 1 }, ctx, { tid: opp.id, mood: 'neg' }); }
  else if (sp === 'lam') { R('lamFan', myFan, 2, 'neg'); bthSay(g, opFan(), 'rel', { lamGloat: 1 }, ctx, { tid: opp.id, mood: 'pos' }); if (bthR() < 0.7) bthSay(g, bthCast(g, 'troll'), 'rel', { lamTroll: 1 }, ctx, o); }
  else if (sp === 'lamDraw') { R('lamDrawFan', myFan, 2, 'neg'); if (bthR() < 0.5) bthSay(g, bthCast(g, 'troll'), 'rel', { lamTroll: 1 }, ctx, o); }
  else if (sp === 'giantLoss') { R('giantLossFan', myFan, 2, null); if (bthR() < 0.6) R('giantLossNeutral', () => bthCast(g, 'media'), 1, null); if (bthR() < 0.6) bthSay(g, opFan(), 'match', { gloat: 1 }, ctx, { tid: opp.id }); }
  else if (sp === 'giantFall') { R('giantFallFan', myFan, 2, 'neg'); if (bthR() < 0.7) bthSay(g, opFan(), 'rel', { lamGloat: 1 }, ctx, { tid: opp.id, mood: 'pos' }); }
  else if (sp === 'meh') { R('giantMeh', neu, 1, null); }
  else if (!win && bthR() < 0.8) bthSay(g, bthFan(g, opp.id), 'match', { gloat: 1 }, ctx, { tid: opp.id }); else if (win && bthR() < 0.5) bthSay(g, bthFan(g, opp.id), 'match', { cope: 1 }, ctx, { tid: opp.id });
  const sg = {}; (m.ev || []).forEach(e => { if (e.team === me.id && e.scorer != null) sg[e.scorer] = (sg[e.scorer] || 0) + 1; });
  const top = Object.keys(sg).sort((a, b) => sg[b] - sg[a])[0], f = top ? findPlayer(g, +top) : null;
  if (f && sg[top] >= 2) bthSay(g, bthFan(g, me.id), 'match', { star: 1 }, Object.assign(ctx, bthPC(f.p), { n: sg[top] === 2 ? 'a brace' : sg[top] + ' goals' }), { pid: f.p.id, tid: me.id, me: 1 });
  else if (m.potm && win && bthR() < 0.4) { const fp = findPlayer(g, m.potm.id); if (fp && fp.t && fp.t.id === me.id) bthSay(g, bthNeutral(g), 'match', { star: 1 }, Object.assign(ctx, bthPC(fp.p), { n: 'the Man of the Match award' }), { pid: fp.p.id, tid: me.id, me: 1 }); }
  const last = B.streak.slice(-3).join('');
  if (last === 'WWW') { let n = 0; for (let i = B.streak.length - 1; i >= 0 && B.streak[i] === 'W'; i--) n++; bthSay(g, bthFan(g, me.id), 'match', { streakW: 1 }, Object.assign(ctx, { n }), o); }
  if (last === 'LLL') { let n = 0; for (let i = B.streak.length - 1; i >= 0 && B.streak[i] === 'L'; i--) n++; bthSay(g, bthNeutral(g), 'match', { streakL: 1 }, Object.assign(ctx, { n }), o); }
  if (B.heat < -35 && g.round - (B.last.press || -9) > 3) { B.last.press = g.round; bthSay(g, bthFan(g, me.id), 'match', { out: 1 }, ctx, o); }
  if (B.heat > 35 && g.round - (B.last.press || -9) > 3) { B.last.press = g.round; bthSay(g, bthFan(g, me.id), 'match', { army: 1 }, ctx, o); }
  try { bthPlayerTalk(g, win, ctx, o); } catch (e) { }
  if (B.promise && B.promise.round === g.round) { B.heat = bthClamp(B.heat + (win ? 8 : -10), -100, 100); bthSay(g, bthFan(g, me.id), 'promise', { [win ? 'kept' : 'broke']: 1 }, ctx, Object.assign({ mood: win ? 'pos' : 'neg' }, o)); if (!win) bthSay(g, bthCast(g, 'troll'), 'promise', { broke: 1 }, ctx, o); B.promise = null; }
  try { bthLevelTalk(g, me, m); } catch (e) { }
}
function bthLevelTalk(g, me, mine) {
  const B = g.bth; if (!bthOk(B, 0)) return;
  for (const m of (g.fixtures[me.tier][g.round - 1] || [])) {
    if (!m.played || m.forfeit || m === mine || m.hg === m.ag) continue; const w = m.hg > m.ag ? m.h : m.a, l = w === m.h ? m.a : m.h, W = g.teams[w], L = g.teams[l];
    if (bthLvl(g, L) === 'giant' && bthLvl(g, W) !== 'giant') { const ctx = Object.assign(bthBase(g), bthTC(W), { o: L.s, sc: Math.max(m.hg, m.ag) + '-' + Math.min(m.hg, m.ag) }); bthAdd(g, bthR() < 0.5 ? bthCast(g, 'media') : bthNeutral(g), bthFill(bthPick(BTH_B.rel.aiUpset), ctx), { tid: w }); return; }
  }
}
/* ---- real emoji (Twemoji), added at display time ---- */
const BTH_EMO = [
  [/BREAKING|Hearing|Whispers|Transfer alert|Reports:|Insider|little bird/i, ['👀', '🚨', '🤫']],
  [/lamthuthu|small chicken/i, ['🐔', '😂', '🤣']],
  [/plumber|spanner|geyser/i, ['🔧', '🚰', '😂']],
  [/OFFICIAL|DONE DEAL|WELCOME \||Signed:|complete the signing|Confirmed:/i, ['✅', '🔥', '🤝']],
  [/champion|lift the|trophy|wins the|holders/i, ['🏆', '🎉', '🙌']],
  [/PROMOTED|going up|promotion/i, ['🎉', '🔥', '🙌']],
  [/relegat|going down|bottom|rooted/i, ['😭', '💔', '😬']],
  [/hat-trick|treble|brace|goals? for|Golden Boot/i, ['⚽', '🔥', '🐐']],
  [/sacked|sack\b|parts? ways|merry-go/i, ['😬', '👀', '💀']],
  [/\bout\b|resign|embarrass|worst|disgrace|crisis|ungrateful|angry|no words/i, ['🤬', '😡', '💀']],
  [/crying|laugh|joke|hobby|Mama|uncle|taxi|pie\b|braai|WhatsApp|group chat/i, ['😂', '💀', '🤣']],
  [/retire|legend|statue|goodbye|thank you/i, ['👏', '🙏', '💙']],
  [/Happy|Merry/i, ['🇿🇦', '🎉', '💛']],
  [/Told you|Called it|Pay me|screenshot/i, ['😎', '💅', '🤌']],
  [/beat|win\b|won\b|three points|statement|masterclass|lethal|brilliant|deserved|proud|Ayoba|unreal/i, ['🔥', '💪', '🙌', '👏']],
  [/lost|defeat|fight\?|disappoint|poor\b|heavy|painful|lie down/i, ['😭', '😔', '💔', '🤦']],
  [/draw|point against|dropped points/i, ['😐', '😶', '😑']],
  [/Hayibo|Eish|Hai suka|\?\?|\?!|Seriously/i, ['😬', '🤨', '😳']],
  [/in a row|on the trot|straight wins|momentum/i, ['🔥', '😤', '📈']],
  [/lucky|robbed|referee|\bref\b|penalty/i, ['😤', '🙄', '🤷']],
  [/take it|job done|sleep well|minimum|win is a win/i, ['🤝', '😌', '👌']],
  [/stress|heart|water|nervous|fingers/i, ['😰', '😅', '🙈']],
  [/believe|respect|good move|Congratulations|Welcome/i, ['👏', '🙌', '💯']]
];
function bthHash(s) { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function bthDeco(t, salt, prob) {
  t = String(t == null ? '' : t); if (/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(t)) return t;
  const h = bthHash(salt + '|' + t); if (h % 100 >= prob) return t;
  for (const [re, set] of BTH_EMO) if (re.test(t)) { const a = set[(h >>> 3) % set.length], b = (h >>> 7) % 4 === 0 ? set[(h >>> 5) % set.length] : null; const e = b && b !== a ? a + b : a; return /^(BREAKING|OFFICIAL)/.test(t) ? e.slice(0, 2) + ' ' + t : t + ' ' + e; }
  return t;
}
const BTH_TW = 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/';
function bthTwem(html) {
  return html.replace(/(?:[\u{1F1E6}-\u{1F1FF}]{2})|(?:\p{Extended_Pictographic}(?:\uFE0F|[\u{1F3FB}-\u{1F3FF}])?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|[\u{1F3FB}-\u{1F3FF}])?)*)/gu, ch => {
    let cps = Array.from(ch).map(c => c.codePointAt(0)); if (cps.indexOf(0x200D) < 0) cps = cps.filter(c => c !== 0xFE0F);
    const code = cps.map(c => c.toString(16)).join('-'); return `<img class="em" alt="${ch}" draggable="false" src="${BTH_TW}${code}.svg" onerror="this.replaceWith(document.createTextNode(this.alt))">`;
  });
}
function bthPostHTML(g, p) {
  const B = g.bth, u = B.users[p.h] || { h: p.h, n: p.h, k: 'fan' }, f = p.pid != null ? findPlayer(g, p.pid) : null, lk = !!B.liked[p.id], rt = !!B.rted[p.id];
  const card = f ? `<div class="bp-card" data-pid="${p.pid}">${faceSVG(f.p, 46, f.t ? f.t.c1 : null)}<span class="pc"><b>${esc(f.p.name)}</b><small>${f.p.pos} · ${f.p.age} yrs · OVR ${f.p.rating}${f.t ? ' · ' + esc(f.t.s) : ' · free agent'}</small></span>${f.t ? crestHTML(f.t, 26) : ''}</div>` : '';
  const fl = p.fl ? `<span class="fl ${p.fl === 'Confirmed' ? 'c' : p.fl === 'Debunked' ? 'd' : p.fl === 'Bathini Check' ? 'k' : 'u'}">${esc(p.fl)}</span>` : '';
  const rp = p.rp.length ? `<div class="bp-rp">${p.rp.map(r => `<div><b data-h="${esc(r.h)}">@${esc(r.h)}</b> ${bthTwem(esc(bthDeco(r.t, p.id + r.h, 22)))}</div>`).join('')}${p.rn > p.rp.length ? `<small>View ${bthK(p.rn - p.rp.length)} more ${p.rn - p.rp.length === 1 ? 'reply' : 'replies'}</small>` : ''}</div>` : '';
  return `<article class="bp${p.me ? ' me' : ''}${p.vi ? ' vi' : ''}${p.id > bthSeenAt ? ' nw' : ''}" data-id="${p.id}">
    <div class="bp-l" data-h="${esc(u.h)}">${bthAvatar(g, u)}</div>
    <div class="bp-r"><div class="bp-head"><b data-h="${esc(u.h)}">${esc(u.n)}</b>${u.v ? BTH_TICK : ''}<span class="hd">@${esc(u.h)}</span><span class="dot">·</span><span class="hd">${bthWhen(g, p)}</span>${p.vi ? '<span class="fl v">Viral</span>' : ''}${p.ra ? '<span class="fl d">Ratioed</span>' : ''}${fl}</div>
    <div class="bp-text">${bthTwem(bthFmt(bthDeco(p.t, p.id, u.k === 'club' || u.k === 'league' || u.k === 'news' ? 70 : 60)))}</div>${card}
    <div class="bp-acts v2"><span class="pl" title="Talk">${BTH_IC2.talk}<em>Talk</em><i>${bthK(p.rn)}</i></span><button data-a="rt" class="pl ${rt ? 'on' : ''}" title="Spread it">${BTH_IC2.spread}<em>Spread</em><i>${bthK(p.rt + (rt ? 1 : 0))}</i></button><button data-a="lk" class="pl ${lk ? 'on' : ''}" title="Ayoba">${BTH_IC2.ayoba}<em>Ayoba</em><i>${bthK(p.lk + (lk ? 1 : 0))}</i></button><span class="pl seen" title="Seen by">${BTH_IC2.seen}<i>${bthK(p.lk * 11 + p.rt * 7 + 40)}</i></span></div>${rp}</div></article>`;
}
/* official MM coin beside the MM Coins menu item */
try { const st = document.createElement('style'); st.textContent = '.navlink[data-tab="mmcoins"]>span{display:inline-flex;align-items:center;gap:8px}.navlink[data-tab="mmcoins"]>span::before{content:"";width:20px;height:20px;flex:0 0 20px;background:url("' + MM_COIN_IMG + '") center/contain no-repeat}'; document.head.appendChild(st); } catch (e) { }
/* ---- Bathini v4: Uyalazi lines, Mxm button ---- */
(function () {
  const add = (a, ...x) => { if (Array.isArray(a)) x.forEach(l => a.push(l)); };
  add(BTH_B.player.praise, "Uyalazi, {pl}. That is all I have to say.", "{pl} knows ball. Uyalazi!");
  add(BTH_B.hat.hype, "Uyalazi {pl}! Three goals, zero fuss.", "{pl} just reminded everyone: uyalazi.");
  BTH_B.match.star = ["{p} with {n} today!", "{p} was unplayable today, with {n} to show for it.", "{pl} was brilliant today and finished with {n}.", "Give {pl} everything he wants. {n} today.", "{p} showed why he is the best at the club, with {n}.", "{pl} is the difference. {n} today.", "{p} uyalazi today, with {n}.", "Uyalazi! {p} with {n}."];
  add(BTH_B.award.hype, "Uyalazi {pl}! Deserved, no debate.");
  add(BTH_B.youth.hype, "At {age}, {pl} uyalazi already. Watch him.");
  add(BTH_B.signMine.hype, "{pl} uyalazi. Welcome to {c}.");
  add(BTH_B.contract.hype, "Keep {pl}. Uyalazi, that one.");
  add(BTH_B.react.love, "Uyalazi!");
  add(BTH_B.react.disagree, "Mxm.", "Mxm. Next.");
  add(BTH_B.react.hate, "Mxm.");
  BTH_EMO.unshift([/^Mxm/, ['🙄', '😒', '😑']], [/uyalazi/i, ['🐐', '🔥', '⚽', '🧠']]);
})();
Object.assign(BTH_IC2, { mx: '<svg viewBox="0 0 24 24"><path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 01-1.92-2.56l2.33-8A2 2 0 016.5 2H20a2 2 0 012 2v8a2 2 0 01-2 2h-2.76a2 2 0 00-1.79 1.11L12 22a3.13 3.13 0 01-3-3.88z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' });
function bthMxN(p) {
  const h = bthHash('mx' + p.id) % 100 / 100, neg = /\blost\b|defeat|sack|\bout\b|embarrass|worst|disgrace|relegat|hayibo|crisis|robbed|lamthuthu|shame/i.test(p.t);
  return Math.round(p.lk * (neg ? 0.12 + h * 0.3 : 0.02 + h * 0.14)) + (p.ra ? Math.round(p.lk * 0.8) : 0) + (p.id % 5);
}
function bthPostHTML(g, p) {
  const B = g.bth, u = B.users[p.h] || { h: p.h, n: p.h, k: 'fan' }, f = p.pid != null ? findPlayer(g, p.pid) : null, lk = !!B.liked[p.id], rt = !!B.rted[p.id], mx = !!(B.mxd && B.mxd[p.id]);
  const card = f ? `<div class="bp-card" data-pid="${p.pid}">${faceSVG(f.p, 46, f.t ? f.t.c1 : null)}<span class="pc"><b>${esc(f.p.name)}</b><small>${f.p.pos} · ${f.p.age} yrs · OVR ${f.p.rating}${f.t ? ' · ' + esc(f.t.s) : ' · free agent'}</small></span>${f.t ? crestHTML(f.t, 26) : ''}</div>` : '';
  const fl = p.fl ? `<span class="fl ${p.fl === 'Confirmed' ? 'c' : p.fl === 'Debunked' ? 'd' : p.fl === 'Bathini Check' ? 'k' : 'u'}">${esc(p.fl)}</span>` : '';
  const rp = p.rp.length ? `<div class="bp-rp">${p.rp.map(r => `<div><b data-h="${esc(r.h)}">@${esc(r.h)}</b> ${bthTwem(esc(bthDeco(r.t, p.id + r.h, 22)))}</div>`).join('')}${p.rn > p.rp.length ? `<small>View ${bthK(p.rn - p.rp.length)} more ${p.rn - p.rp.length === 1 ? 'reply' : 'replies'}</small>` : ''}</div>` : '';
  const mn = bthMxN(p);
  return `<article class="bp${p.me ? ' me' : ''}${p.vi ? ' vi' : ''}${p.id > bthSeenAt ? ' nw' : ''}" data-id="${p.id}">
    <div class="bp-l" data-h="${esc(u.h)}">${bthAvatar(g, u)}</div>
    <div class="bp-r"><div class="bp-head"><b data-h="${esc(u.h)}">${esc(u.n)}</b>${u.v ? BTH_TICK : ''}<span class="hd">@${esc(u.h)}</span><span class="dot">·</span><span class="hd">${bthWhen(g, p)}</span>${p.vi ? '<span class="fl v">Viral</span>' : ''}${p.ra ? '<span class="fl d">Ratioed</span>' : ''}${fl}</div>
    <div class="bp-text">${bthTwem(bthFmt(bthDeco(p.t, p.id, u.k === 'club' || u.k === 'league' || u.k === 'news' ? 70 : 60)))}</div>${card}
    <div class="bp-acts v2"><span class="pl" title="Talk">${BTH_IC2.talk}<em>Talk</em><i>${bthK(p.rn)}</i></span><button data-a="rt" class="pl ${rt ? 'on' : ''}" title="Spread it">${BTH_IC2.spread}<em>Spread</em><i>${bthK(p.rt + (rt ? 1 : 0))}</i></button><button data-a="lk" class="pl ${lk ? 'on' : ''}" title="Ayoba">${BTH_IC2.ayoba}<em>Ayoba</em><i>${bthK(p.lk + (lk ? 1 : 0))}</i></button><button data-m="mx" data-n="${mn}" class="pl mx ${mx ? 'on' : ''}" title="Mxm">${BTH_IC2.mx}<em>Mxm</em><i>${bthK(mn + (mx ? 1 : 0))}</i></button><span class="pl seen" title="Seen by">${BTH_IC2.seen}<i>${bthK(p.lk * 11 + p.rt * 7 + 40)}</i></span></div>${rp}</div></article>`;
}
if (!window.__bthMx) {
  window.__bthMx = 1;
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('#v-bathini .bp .pl[data-m],#v-bathini .bp .pl[data-a=lk]'); if (!b || !G || !G.bth) return;
    const art = b.closest('.bp'), id = +art.dataset.id, B = G.bth, p = B.posts.find(x => x.id === id), mxb = art.querySelector('[data-m=mx]'), lkb = art.querySelector('[data-a=lk]'); if (!p || !mxb) return; B.mxd = B.mxd || {};
    const setMx = on => { if (on) B.mxd[id] = 1; else delete B.mxd[id]; mxb.classList.toggle('on', on); mxb.querySelector('i').textContent = bthK(+mxb.dataset.n + (on ? 1 : 0)); };
    if (b === mxb) { const on = !B.mxd[id]; setMx(on); if (on && B.liked[id]) { delete B.liked[id]; lkb.classList.remove('on'); lkb.querySelector('i').textContent = bthK(p.lk); } }
    else if (B.mxd[id]) setMx(false);
  }, true);
}

function bthRefreshBadge() {
  const n = bthUnread(), btn = document.querySelector('.navlink[data-tab="bathini"]');
  if (btn) { let b = btn.querySelector('.nb'); if (n) { if (!b) { b = document.createElement('span'); b.className = 'nb'; btn.appendChild(b); } b.textContent = n; } else if (b) b.remove(); }
  const h = document.getElementById('homeBtn'); if (h) { let t = h.querySelector('.bthb'); if (n) { if (!t) { t = document.createElement('span'); t.className = 'bthb'; h.appendChild(t); } t.textContent = n; } else if (t) t.remove(); }
}
 /* ---- season review: read stats from several sources so it never shows blanks ---- */
function seasonStory() {
  const t = me(), res = [], evG = {}, evA = {};
  (G.fixtures[t.tier] || []).forEach(rd => {
    const m = rd.find(x => (x.h === G.myTeam || x.a === G.myTeam) && x.played && !x.forfeit); if (!m) return;
    const home = m.h === G.myTeam; res.push({ opp: G.teams[home ? m.a : m.h].s, gf: home ? m.hg : m.ag, ga: home ? m.ag : m.hg, home });
    (m.ev || []).forEach(e => { if (e.type === 'goal' && e.team === G.myTeam) { if (e.scorer != null) evG[e.scorer] = (evG[e.scorer] || 0) + 1; if (e.assist) evA[e.assist] = (evA[e.assist] || 0) + 1; } });
  });
  if (!res.length) return null;
  let w = 0, d = 0, l = 0, run = 0, best = 0, wr = 0, bestW = 0;
  res.forEach(r => { if (r.gf > r.ga) w++; else if (r.gf === r.ga) d++; else l++; run = r.gf >= r.ga ? run + 1 : 0; best = Math.max(best, run); wr = r.gf > r.ga ? wr + 1 : 0; bestW = Math.max(bestW, wr); });
  const bw = res.slice().sort((a, b) => (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf)[0], bl = res.slice().sort((a, b) => (a.gf - a.ga) - (b.gf - b.ga) || b.ga - a.ga)[0];
  const sq = t.squad, top = k => sq.slice().sort((a, b) => (b[k] || 0) - (a[k] || 0))[0];
  const bestAvg = sq.filter(p => (p.ratingApps || 0) >= 8).map(p => ({ p, avg: p.ratingSum / p.ratingApps })).sort((a, b) => b.avg - a.avg)[0];
  const fromEv = (map, key) => { const id = Object.keys(map).sort((a, b) => map[b] - map[a])[0]; if (id == null) return null; const p = sq.find(x => String(x.id) === id) || (typeof findPlayer === 'function' && (findPlayer(G, +id) || {}).p); return p ? Object.assign({}, p, { [key]: map[id] }) : null; };
  let scorer = top('goals'), assist = top('assists'), used = top('apps');
  if (!(scorer && scorer.goals > 0)) scorer = fromEv(evG, 'goals') || scorer;
  if (!(assist && assist.assists > 0)) assist = fromEv(evA, 'assists') || assist;
  if (!(used && used.apps > 0)) { const u = sq.slice().sort((a, b) => (b.ratingApps || 0) - (a.ratingApps || 0))[0]; if (u && u.ratingApps) used = Object.assign({}, u, { apps: u.ratingApps }); }
  return { w, d, l, gf: res.reduce((a, r) => a + r.gf, 0), ga: res.reduce((a, r) => a + r.ga, 0), unbeaten: best, wins: bestW, bw, bl, scorer, assist, mostUsed: used, bestAvg, dbg: sq.length + ' players, goals ' + sq.reduce((a, p) => a + (p.goals || 0), 0) + ', apps ' + sq.reduce((a, p) => a + (p.apps || 0), 0) + ', events ' + Object.keys(evG).length + ', matches ' + res.length };
} 
/* ---------------- boot ---------------- */
buildAvatars();
buildClubGrid();
slot = firstFreeSlot();
buildSlots();
document.body.appendChild($('#scrim')); document.body.appendChild($('#toast-root')); document.body.appendChild($('#scrim')); document.body.appendChild($('#toast-root')); { const _htBase = halfTime; halfTime = function () { _htBase(); try { tacHalfTime(); } catch (e) { console.error('Half-time tactics error', e); } }; } /* ---- game-styled dropdown picker (replaces the phone's own select list) ---- */ (function gameSelects() {   const st = document.createElement('style');   st.textContent = '.selRow{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;background:none;border:0;border-bottom:1px solid #2a3037;color:#e6e9ed;font:600 17px var(--head);letter-spacing:.02em;padding:13px 16px;text-align:left;cursor:pointer}.selRow:hover,.selRow:active{background:#1b2027}.selRow.on{color:#f2b928;background:#161a20;box-shadow:inset 3px 0 0 #f2b928}.selRow.sub{padding-left:30px}.selRow[disabled]{opacity:.4}.selGrp{padding:11px 16px 6px;color:#8f98a2;font:600 12px var(--head);letter-spacing:.12em;text-transform:uppercase;background:#0b0f14;border-bottom:1px solid #2a3037}';   document.head.appendChild(st);   const TITLES = { txNatSel: 'Nationality', wNatSel: 'Nationality', mgrNat: 'Nationality', txAgeSel: 'Exact age', txLgSel: 'League', txSortSel: 'Sort by', wSortSel: 'Sort by', lgSort: 'Sort by', formSel: 'Formation', gseason: 'Season', clubPeek: 'Choose a club', bidSwap: 'Swap a player' };   let open = null;   function closeSheet() { if (open) { open.remove(); open = null; } }   function openSheet(sel) {     if (open) return;     const title = sel.getAttribute('aria-label') || sel.title || TITLES[sel.id] || (sel.dataset.sp !== undefined ? 'Set-piece taker' : sel.dataset.pfocus !== undefined ? 'Training focus' : 'Choose');     const row = (o, sub) => `<button type="button" class="selRow${o.selected ? ' on' : ''}${sub ? ' sub' : ''}" data-i="${o.index}"${o.disabled ? ' disabled' : ''}><span>${esc(o.textContent)}</span>${o.selected ? '<span>✓</span>' : ''}</button>`;     let html = '';     [...sel.children].forEach(c => {       if (c.tagName === 'OPTGROUP') html += `<div class="selGrp">${esc(c.label)}</div>` + [...c.children].map(o => row(o, true)).join('');       else if (c.tagName === 'OPTION') html += row(c, false);     });     const ov = document.createElement('div'); ov.className = 'scrim'; ov.style.zIndex = '2000';     ov.innerHTML = `<div class="modal mmx" style="width:min(460px,100%)"><header><h3>${esc(title)}</h3><button class="x" aria-label="Close">&times;</button></header><div class="body" style="padding:0">${html}</div></div>`;     document.body.appendChild(ov); open = ov;     ov.addEventListener('click', e => {       if (e.target === ov || e.target.closest('.x')) return closeSheet();       const b = e.target.closest('.selRow'); if (!b || b.disabled) return;       sel.selectedIndex = +b.dataset.i;       closeSheet();       sel.dispatchEvent(new Event('input', { bubbles: true }));       sel.dispatchEvent(new Event('change', { bubbles: true }));     });     const on = ov.querySelector('.selRow.on'); if (on) on.scrollIntoView({ block: 'center' });     try { uiSound('open'); } catch (e) { }   }   const pick = e => { const s = e.target && e.target.closest ? e.target.closest('select') : null; return s && !s.multiple && !s.disabled ? s : null; };   document.addEventListener('mousedown', e => { if (pick(e)) e.preventDefault(); }, true);   let t0 = null;   document.addEventListener('touchstart', e => { const t = e.touches[0]; t0 = t ? { x: t.clientX, y: t.clientY } : null; }, { capture: true, passive: true });   document.addEventListener('touchend', e => {     const s = pick(e); if (!s || !t0) return;     const t = e.changedTouches[0]; if (t && (Math.abs(t.clientX - t0.x) > 10 || Math.abs(t.clientY - t0.y) > 10)) return;     if (e.cancelable) e.preventDefault();     openSheet(s);   }, { capture: true, passive: false });   document.addEventListener('click', e => { const s = pick(e); if (s) { e.preventDefault(); openSheet(s); } }, true);   document.addEventListener('keydown', e => {     if (open && e.key === 'Escape') { closeSheet(); e.stopPropagation(); return; }     if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'SELECT' && !e.target.multiple) { e.preventDefault(); openSheet(e.target); }   }, true); })(); /* ---- matchday mode page: Play in 2D / Play in 3D (3D is coming soon) ---- */ (function matchModePage() {   const st = document.createElement('style');   st.textContent = '.mdSel{position:fixed;inset:0;z-index:50;display:flex;justify-content:center;align-items:flex-start;overflow-y:auto;background:radial-gradient(90% 60% at 50% -10%,rgba(242,185,40,.14),transparent 60%),#0b0f14;opacity:0;transform:translateY(28px);transition:opacity .35s ease,transform .35s ease}.mdSel.on{opacity:1;transform:none}.mdSelIn{width:min(520px,100%);padding:18px 16px 40px;box-sizing:border-box}.mdBack{background:none;border:0;color:#aeb5bd;font:600 15px var(--head);letter-spacing:.04em;padding:8px 2px;cursor:pointer}.mdSelHead{margin:14px 0 20px}.mdKick{color:#f2b928;font:600 12px var(--head);letter-spacing:.18em}.mdSelHead h2{margin:4px 0 6px;font:700 30px var(--head);letter-spacing:.02em;text-transform:uppercase;color:#fff}.mdSelHead p{margin:0;color:#9aa0a6;font-size:14px}.mdCard{display:flex;align-items:center;gap:14px;width:100%;text-align:left;margin:0 0 14px;padding:16px;background:#161a20;border:1px solid #2a3037;border-top:3px solid #f2b928;border-radius:8px;color:#e6e9ed;cursor:pointer;opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .4s ease,border-color .15s,background .15s}.mdSel.on .mdCard{opacity:1;transform:none}.mdSel.on .mdCard.c1{transition-delay:.12s}.mdSel.on .mdCard.c2{transition-delay:.22s}.mdCard:hover,.mdCard:active{background:#1b2027;border-color:#3a424b}.mdCard.soon{border-top-color:#3a424b}.mdIco{flex:none;width:56px;height:56px;display:grid;place-items:center;background:#0b0f14;border-radius:8px;border:1px solid #2a3037}.mdTxt{flex:1;display:flex;flex-direction:column;gap:3px}.mdTxt b{font:700 22px var(--head);letter-spacing:.03em;text-transform:uppercase;color:#fff}.mdTxt small{color:#9aa0a6;font-size:13px;line-height:1.4}.mdGo{flex:none;font:700 15px var(--head);color:#1c1505;background:#f2b928;border-radius:4px;padding:8px 12px}.mdSoon{flex:none;font:600 11px var(--head);letter-spacing:.1em;text-transform:uppercase;color:#f2b928;border:1px solid #f2b928;border-radius:10px;padding:3px 8px}';   document.head.appendChild(st);   let page = null;   function closePage(after) {     if (!page) { if (after) after(); return; }     const p = page; page = null; p.classList.remove('on');     setTimeout(() => { p.remove(); if (after) after(); }, 340);   }   function openPage(kind, play2D) {     if (page) return;     let sub = '';     try {       const f = kind === 'cup' ? myCupTieThisRound(G) : myFixture(G.round);       if (f) {         const opp = G.teams[f.h === G.myTeam ? f.a : f.h];         sub = (kind === 'cup' ? CUP_NAME : 'Matchday ' + (G.round + 1)) + ' · ' + (f.h === G.myTeam ? 'Home to ' : 'Away to ') + opp.n;       }     } catch (e) { }     const ico2d = "<svg width='34' height='34' viewBox='0 0 34 34' fill='none' stroke='#f2b928' stroke-width='1.6'><rect x='3' y='6' width='28' height='22' rx='2'/><line x1='17' y1='6' x2='17' y2='28'/><circle cx='17' cy='17' r='4'/><rect x='3' y='12' width='5' height='10'/><rect x='26' y='12' width='5' height='10'/></svg>";     const ico3d = "<svg width='34' height='34' viewBox='0 0 34 34' fill='none' stroke='#9aa0a6' stroke-width='1.6'><path d='M17 3 L30 10 L30 24 L17 31 L4 24 L4 10 Z'/><path d='M4 10 L17 17 L30 10'/><line x1='17' y1='17' x2='17' y2='31'/></svg>";     const p = document.createElement('div'); p.className = 'mdSel';     p.innerHTML = `<div class="mdSelIn">       <button class="mdBack" type="button">← Back</button>       <div class="mdSelHead"><span class="mdKick">MATCHDAY</span><h2>How do you want to play?</h2>${sub ? `<p>${esc(sub)}</p>` : ''}</div>       <button class="mdCard c1" type="button" data-m="2d"><span class="mdIco">${ico2d}</span><span class="mdTxt"><b>Play in 2D</b><small>Watch your match live on the pitch and make changes at half time.</small></span><span class="mdGo">Play ›</span></button>       <button class="mdCard c2 soon" type="button" data-m="3d"><span class="mdIco">${ico3d}</span><span class="mdTxt"><b>Play in 3D</b><small>A full 3D matchday experience is in development.</small></span><span class="mdSoon">Coming soon</span></button>     </div>`;     (($('#scrim') && $('#scrim').parentNode) || document.body).appendChild(p);     page = p;     p.addEventListener('click', e => {       if (e.target.closest('.mdBack')) { closePage(); return; }       const c = e.target.closest('.mdCard'); if (!c) return;       if (c.dataset.m === '2d') closePage(play2D);       else openModal('3D is coming soon', '<p style="margin:0;line-height:1.6">We are still building the 3D match experience. It is not ready yet, so for now play your matchday in 2D.</p>', '<button class="btn sm" onclick="closeModal()">Got it</button>');     });     requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('on')));   }   document.addEventListener('keydown', e => { if (page && e.key === 'Escape') closePage(); });   const live2D = startLive;   startLive = function () {     if (!G || myMatchIndex(G, G.round) < 0) { live2D(); return; }     openPage('league', live2D);   };   const cup2D = startCupMatchday;   startCupMatchday = function () {     if (!G || !G.liveMode || !cupDueNow(G) || !myCupTieThisRound(G)) { cup2D(); return; }     openPage('cup', cup2D);   }; })(); /* ---- calendar: after Continue, bring today's date to the middle of the screen ---- */ (function calendarCentre() {   const base = viewCalendar;   let clickAt = 0;   document.addEventListener('click', e => { const el = e.target && e.target.closest ? e.target.closest('#v-calendar') : null; if (el && !e.target.closest('#calToday')) clickAt = Date.now(); }, true);   viewCalendar = function () {     const own = Date.now() - clickAt < 700;     base();     if (own) return;     requestAnimationFrame(() => {       const td = document.querySelector('#v-calendar .cd.today'); if (!td) return;       let sc = null;       for (let n = td.parentElement; n && n !== document.body; n = n.parentElement) {         const o = getComputedStyle(n).overflowY;         if ((o === 'auto' || o === 'scroll') && n.scrollHeight > n.clientHeight + 4) { sc = n; break; }       }       const hdr = document.querySelector('header.top'), bar = document.querySelector('.actionbar');       let top = hdr ? hdr.getBoundingClientRect().bottom : 0, bottom = bar ? bar.getBoundingClientRect().top : window.innerHeight;       if (sc) { const sr = sc.getBoundingClientRect(); top = Math.max(top, sr.top); bottom = Math.min(bottom, sr.bottom); }       const r = td.getBoundingClientRect();       const opts = { top: (r.top + r.height / 2) - (top + bottom) / 2, behavior: autoSimTimer ? 'auto' : 'smooth' };       if (sc) sc.scrollBy(opts); else window.scrollBy(opts);     });   }; })(); /* ---- budget allocation shortcut on the Squad and Transfers screens ---- */ (function budgetShortcuts() {   const st = document.createElement('style');   st.textContent = '.bsPanel>summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:11px 14px;font:600 14px var(--head);letter-spacing:.08em;text-transform:uppercase;color:#fff}.bsPanel>summary::-webkit-details-marker{display:none}.bsT::after{content:" ▾";color:#f2b928}.bsPanel[open] .bsT::after{content:" ▴"}.bsS{font:500 12px var(--body);letter-spacing:0;text-transform:none;color:#9aa0a6}';   document.head.appendChild(st);   let wasOpen = false;   function panelHTML(t) {     const lo = (-Math.max(0, t.wageBudget - t.wageBill)).toFixed(2), hi = Math.max(0, t.budget).toFixed(2);     return `<details class="panel bsPanel"><summary><span class="bsT">Budget allocation</span><span class="bsS">transfer ${money(t.budget)} · wages ${money(t.wageBill)} of ${money(t.wageBudget)}</span></summary>       <div class="pad"><p class="hint" style="margin:0 0 8px">Slide to move funds between the transfer budget and the wage budget.</p>         <input class="range bsSlide" type="range" min="${lo}" max="${hi}" step="0.01" value="0">         <div style="display:flex;justify-content:space-between;font-size:13px;color:#8f98a2"><span>← into transfer</span><span>into wages →</span></div>         <p class="hint bsPrev" style="margin:8px 0 0">No change.</p>         <button class="btn sm bsGo" style="margin-top:8px">Move funds</button></div></details>`;   }   function mount(viewId, anchorSel) {     const v = document.getElementById('v-' + viewId);     if (!v || !G || G.jobless || !G.teams[G.myTeam]) return;     const old = v.querySelector('.bsPanel'); if (old) old.remove();     const anchor = v.querySelector(anchorSel); if (!anchor) return;     const t = G.teams[G.myTeam];     const box = document.createElement('div'); box.innerHTML = panelHTML(t);     const el = box.firstElementChild;     anchor.insertAdjacentElement('afterend', el);     el.open = wasOpen;     el.addEventListener('toggle', () => { wasOpen = el.open; });     const sl = el.querySelector('.bsSlide'), pv = el.querySelector('.bsPrev'), go = el.querySelector('.bsGo');     sl.oninput = () => {       const x = +sl.value;       pv.textContent = x === 0 ? 'No change.' : x > 0 ? `Move ${money(x)} from the transfer budget into the wage budget.` : `Move ${money(-x)} from the wage budget into the transfer budget.`;     };     go.onclick = () => {       const res = reallocateBudget(G, +sl.value);       if (res.ok) { toast(res.msg); save(); render(); } else { toastWarn(res.msg); }     };   }   const vt = viewTransfers;   viewTransfers = function () { const r = vt.apply(this, arguments); try { mount('transfers', '.rbox'); } catch (e) { console.error(e); } return r; };   const vs = viewSquad;   viewSquad = function () { const r = vs.apply(this, arguments); try { mount('squad', '.rvHero'); } catch (e) { console.error(e); } return r; }; })(); /* ---- away kits: if both teams wear similar colours in a live match, the away team switches ---- */ (function awayKits() {   const rgb = h => {     let x = String(h || '#888888').replace('#', '');     if (x.length === 3) x = x.split('').map(c => c + c).join('');     const n = parseInt(x, 16) || 0;     return [(n >> 16) & 255, (n >> 8) & 255, n & 255];   };   const dist = (a, b) => {     const p = rgb(a), q = rgb(b), rm = (p[0] + q[0]) / 2, dr = p[0] - q[0], dg = p[1] - q[1], db = p[2] - q[2];     return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db);   };   const PITCH = '#1f8a42', CLASH = 140;   function awayColour(H, A) {     if (dist(A.c1, H.c1) >= CLASH) return A.c1;     const cands = [A.c2, '#ffffff', '#14161a', '#f2b928', '#e11d48'].filter(Boolean);     const score = c => Math.min(dist(c, H.c1), dist(c, PITCH) * 1.6);     const good = cands.find(c => dist(c, H.c1) >= 190 && dist(c, PITCH) >= 90);     return good || cands.slice().sort((a, b) => score(b) - score(a))[0];   }   const base = liveFplHTML;   liveFplHTML = function (p, i, slots, teamObj, prefix, away) {     if (away && typeof liveState !== 'undefined' && liveState && liveState.ctx) {       const H = G.teams[liveState.ctx.h], A = G.teams[liveState.ctx.a];       if (H && A && teamObj === A) {         const c = awayColour(H, A);         if (c !== A.c1) teamObj = Object.assign({}, teamObj, { c1: c });       }     }     return base.call(this, p, i, slots, teamObj, prefix, away);   }; })(); (async function resume() { await SDB.ready; slot = firstFreeSlot(); buildSlots(); slot = firstFreeSlot(); buildSlots(); slot = firstFreeSlot(); buildSlots();
  let last = null;
  try { last = localStorage.getItem(LAST_SLOT_KEY); } catch (e) { }
  if (last && slotInfo(+last) && load(+last)) { enterApp(); return; }
  if (anySave()) $('#startHint').textContent = 'Start a new career, or continue one of your saved slots below.';
})();


/* ---------------- calendar ---------------- */
let calY = null, calM = null;
function myCupHistory() {
  const out = [];
  if (G.cup && G.cup.log) {
    G.cup.log.forEach(entry => {
      const tie = entry.ties.find(x => x.h === G.myTeam || x.a === G.myTeam);
      if (!tie) return;
      const round = (CUP_AT[entry.stage] || 1) - 1;
      const home = tie.h === G.myTeam, opp = G.teams[home ? tie.a : tie.h];
      out.push({ round, cup: true, name: CUP_NAME, opp, home, played: true, hg: tie.hg, ag: tie.ag });
    });
  }
  return out;
}
function myFixtureTimeline() {
  const t = me(), out = [];
  for (let r = 0; r < totalRounds(G); r++) {
    const m2 = G.fixtures[t.tier][r].find(x => x.h === G.myTeam || x.a === G.myTeam);
    if (m2) {
      const home = m2.h === G.myTeam, opp = G.teams[home ? m2.a : m2.h];
      out.push({ round: r, cup: false, opp, home, played: !!m2.played, hg: m2.hg, ag: m2.ag });
    }
    if (r >= G.round) myCupTies(r).forEach(c => out.push({ round: r, cup: true, name: c.name, oppName: c.opp, home: c.home, played: false, note: c.note }));
  }
  myCupHistory().forEach(e => out.push(e));
  out.sort((a, b) => a.round - b.round);
  return out;
}
function fx3Row(e) {
  const sc = e.played ? `${e.home ? e.hg : e.ag}–${e.home ? e.ag : e.hg}` : '';
  if (e.cup) {
    const label = e.opp ? esc(e.opp.s) : esc(e.oppName || e.note || 'TBD');
    return `<div class="fx3"><span class="fx-cup" title="${esc(e.name)}">🏆</span>${e.opp ? crestHTML(e.opp, 18) : ''}
      <div><b>${e.home ? 'v' : '@'} ${label}</b><div class="hint">${esc(e.name)}</div></div>
      <span class="fx-sc">${sc || (e.round >= G.round ? 'MD' + (e.round + 1) : '')}</span></div>`;
  }
  return `<div class="fx3">${crestHTML(e.opp, 20)}
    <div><b>${e.home ? 'v' : '@'} ${esc(e.opp.s)}</b><div class="hint">MD${e.round + 1}</div></div>
    <span class="fx-sc">${sc || 'MD' + (e.round + 1)}</span></div>`;
}
let calSelRound = null;
function viewCalendar() {
  const v = $('#v-calendar'), t = me();
  v.classList.add('mmx');
   const todayISO = currentDateISO();
  const todayD = new Date(todayISO);
  if (calY == null) { calY = todayD.getUTCFullYear(); calM = todayD.getUTCMonth(); }
  const minD = new Date(seasonStartUTC(G.season));
  const maxD = new Date(dateForRound(totalRounds(G) - 1, G.season));
  const atMin = calY === minD.getUTCFullYear() && calM === minD.getUTCMonth();
  const atMax = calY === maxD.getUTCFullYear() && calM === maxD.getUTCMonth();

  const eventsByDate = {}, roundByDate = {};
  function addCalEvent(baseIso, offsetDays, ev, round) {
    const d = new Date(baseIso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + offsetDays);
    const iso = d.toISOString().slice(0, 10);
    const [ey, em] = iso.split('-').map(Number);
    if (ey !== calY || em - 1 !== calM) return;
    if (!eventsByDate[iso]) eventsByDate[iso] = { evs: [], windowOpen: false };
    eventsByDate[iso].evs.push(ev);
    if (round != null) roundByDate[iso] = round;
  }
  let monthHasWindow = false;
  for (let r = 0; r < totalRounds(G); r++) {
    const baseIso = dateForRound(r, G.season);
    let slot = 0;
    const m2 = G.fixtures[t.tier][r].find(x => x.h === G.myTeam || x.a === G.myTeam);
    if (m2) {
      const opp = G.teams[m2.h === G.myTeam ? m2.a : m2.h], home = m2.h === G.myTeam;
      addCalEvent(baseIso, 0, { kind: home ? 'home' : 'away', crest: crestHTML(opp, 12), title: `${home ? 'v' : '@'} ${opp.s}` }, r);
    }
    if (CUP_AT.includes(r + 1) && (!G.cup.done || r < G.round)) { slot++; addCalEvent(baseIso, slot * 3, { kind: 'cup', title: CUP_NAME }, r); }
    if (S8_AT.includes(r + 1) && G.super8 && (G.super8.alive.includes(G.myTeam) || r < G.round)) { slot++; addCalEvent(baseIso, slot * 3, { kind: 'cup', title: SUPER8 }, r); }
    if (KO_AT.includes(r + 1) && G.knockout && (G.knockout.alive.includes(G.myTeam) || r < G.round)) { slot++; addCalEvent(baseIso, slot * 3, { kind: 'cup', title: KNOCKOUT }, r); }
    if (CAF_AT.includes(r + 1) && G.africa.caf && (!G.africa.caf.done || r < G.round)) { slot++; addCalEvent(baseIso, slot * 3, { kind: 'caf', title: CAF_NAME }, r); }
    if (CONFED_AT.includes(r + 1) && G.africa.confed && (!G.africa.confed.done || r < G.round)) { slot++; addCalEvent(baseIso, slot * 3, { kind: 'caf', title: CONFED_NAME }, r); }
    if (windowRangeFor(baseIso)) {
      const [ey, em] = baseIso.split('-').map(Number);
      if (ey === calY && em - 1 === calM) { if (!eventsByDate[baseIso]) eventsByDate[baseIso] = { evs: [], windowOpen: false }; eventsByDate[baseIso].windowOpen = true; monthHasWindow = true; }
    }
  }
  const dim = new Date(Date.UTC(calY, calM + 1, 0)).getUTCDate();
  const dow = new Date(Date.UTC(calY, calM, 1)).getUTCDay();
  let cells = '';
  for (let i = 0; i < dow; i++) cells += '<div class="cd pad"></div>';
  for (let d = 1; d <= dim; d++) {
    const iso = `${calY}-${String(calM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const info = eventsByDate[iso];
    const seasonOver = new Date(iso + 'T12:00:00Z').getTime() > maxD.getTime();
    const r = roundByDate[iso];
    const picky = r != null && r >= G.round;
    let inner = info ? `<div class="cd-icos">${info.evs.map(e => `<span class="cd-ico ${e.kind}" title="${esc(e.title)}">${e.kind === 'cup' || e.kind === 'caf' ? '🏆' : (e.crest || '')}</span>`).join('')}</div>` : '';
    if (!info && seasonOver) inner = `<span class="rest-tag">💤 Rest</span>`;
    const isPast = iso < todayISO;     cells += `<div class="cd ${isPast ? 'past' : ''} ${windowRangeFor(iso) ? 'win' : ''} ${iso === todayISO ? 'today' : ''} ${seasonOver && !info ? 'rest' : ''} ${picky && calSelRound === r ? 'sel' : ''} ${picky ? 'pick' : ''}" ${picky ? `data-round="${r}"` : ''}>${windowRangeFor(iso) ? '<span class="win-badge" title="Transfer window open"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#fff" stroke="#ddd" stroke-width="1"/><path d="M6 15 Q20 5 34 13 L30 13 L37 8 L38 17 L30 17 Q20 11 8 19Z" fill="#1a5fc4"/><path d="M34 25 Q20 35 6 27 L10 27 L3 32 L2 23 L10 23 Q20 29 32 21Z" fill="#c81e2c"/></svg></span>' : ''}<span class="dn">${d}</span>${inner}</div>`;
  }

  const timeline = myFixtureTimeline();
  const prev3 = timeline.filter(e => e.round < G.round).slice(-3).reverse();
  const next3 = timeline.filter(e => e.round >= G.round).slice(0, 3);

  v.innerHTML = `<div class="panel">
    <div class="cal-head">
      <div class="cside">${crestHTML(t, 22)}${esc(t.n)}</div>
      <div class="cside">${esc(G.manager.name)}</div>
    </div>
    <div class="cal-monthbar">
      <button class="navbtn" id="calPrev" ${atMin ? 'disabled' : ''} aria-label="Previous month">‹</button>
      <b>${MONTH_NAMES[calM]} ${calY}</b>
      <button class="navbtn" id="calNext" ${atMax ? 'disabled' : ''} aria-label="Next month">›</button>
      <span class="cal-chip">MD ${G.round + 1}/${totalRounds(G)}</span>
      ${(calY !== todayD.getUTCFullYear() || calM !== todayD.getUTCMonth()) ? `<button class="chip" id="calToday">Today</button>` : ''}
      ${calSelRound != null ? `<button class="btn sm" id="calSimTo" style="margin-left:auto">Sim to MD${calSelRound + 1}</button>` : ''}       ${autoSimTimer ? `<span class="cal-chip">Simulating…</span><button class="btn sm" id="calStop" style="margin-left:auto">Stop</button>` : ''}
    </div>
    <div class="pad"><span class="hint">Days with the red and blue arrows fall inside a transfer window. Tap an upcoming matchday to sim straight to it.</span></div>
    <div class="pad"><div class="cal">${DOW_NAMES.map(d => `<div class="h">${d}</div>`).join('')}${cells}</div></div>
  </div>
  <div class="cols">
    <div class="panel"><h3>Previous 3<span class="sub">results</span></h3>
      ${prev3.length ? prev3.map(fx3Row).join('') : '<div class="empty">No matches played yet.</div>'}</div>
    <div class="panel"><h3>Upcoming 3<span class="sub">fixtures</span></h3>
      ${next3.length ? next3.map(fx3Row).join('') : '<div class="empty">💤 Season complete — nothing left to play.</div>'}</div>
  </div>
  <div class="panel"><h3>End of season</h3>
    <div class="pad" style="font-size:13.5px;color:var(--dim)">
      Promotion and relegation across all five divisions are settled, contracts run down, the academy intake
      arrives, sponsors renew their offers, and ${AFCON_NAME} ${G.africa.afcon.phase === 'qualifiers' ? 'qualifiers are drawn' : G.africa.afcon.phase === 'qualified' ? 'finals are played' : 'group qualifying begins again'}.
    </div></div>`;
const pv = $('#calPrev'); if (pv) pv.onclick = () => { calM--; if (calM < 0) { calM = 11; calY--; } viewCalendar(); };
  const nx = $('#calNext'); if (nx) nx.onclick = () => { calM++; if (calM > 11) { calM = 0; calY++; } viewCalendar(); };
  const td = $('#calToday'); if (td) td.onclick = () => { calY = todayD.getUTCFullYear(); calM = todayD.getUTCMonth(); viewCalendar(); };
  v.querySelectorAll('[data-round]').forEach(c => c.onclick = () => { const r = +c.dataset.round; calSelRound = calSelRound === r ? null : r; viewCalendar(); });
  const st = $('#calSimTo'); if (st) st.onclick = () => { const target = calSelRound; calSelRound = null; if (target > G.round) simToRoundAnimated(target); else viewCalendar(); };
}

/* ---------------- how to play ---------------- */
const MM_CONTACT = 'mzansimanager@gmail.com';
 function viewGetAdded() {   const v = $('#v-getadded');   const subj = encodeURIComponent('Add me to Mzansi Manager');   const body = encodeURIComponent(['Hi Mzansi Manager team,', '', 'I would like to be added to the game as a player.', '', 'Full name:', 'Age:', 'Country / city:', 'Position(s):', 'Club of your choice (if any):', 'Strengths (pace, passing, shooting, defending...):', 'Weak foot:', 'Height:', 'Links (video, Instagram, etc.):', '', 'I attach a photo of myself.'].join(String.fromCharCode(10))); /*

I would like to be added to the game as a player.

Full name:
Age:
Country / city:
Position(s):
Club of your choice (if any):
Strengths (pace, passing, shooting, defending...):
Weak foot:
Height:
Links (video, Instagram, etc.):

I attach a photo of myself.
');   */ const href = `mailto:${MM_CONTACT}?subject=${subj}&body=${body}`;   const rows = [['Full name & age', 'So we can create your player(can be made up)'], ['Country & city', 'Any city, any country, any continent'], ['Position(s)', 'Your main position and any others you like'], ['Club of your choice', 'choose one that is available in MM'], ['Strengths', 'Pace, passing, shooting, defending...'], ['A clear photo', 'We use it to make your face in the game and delete it after'], ['Links', 'social media, if you have them(people can follow you in real life)']];   v.innerHTML = `<div class="mb">     <div class="mb-tabs"><button class="on">Get added</button><span class="sp"></span><button class="mini" id="gaInbox">Inbox</button></div>     <div class="mb-body" style="grid-template-columns:1fr"><div class="mb-detail" style="display:block">       <div class="mhead"><span>Date</span><b>${fmtMailDate(currentDateISO())}</b><span>From:</span><b>Mzansi Manager Team</b><span>To:</span><b>${esc(G.manager.name)}</b><span>Subject:</span><b>Want to play in Mzansi Manager?</b></div>       <div class="mbody">         <p>Love football and want to see yourself in Mzansi Manager?</p>         <p>Reach out and we will build you a player profile with your own rating, position, potential and attributes. It is open to everyone, from anywhere in the world.</p>         <p>If you are interested, email us at ${MM_CONTACT} and include:</p>         <table class="mrows">${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>         <p>Ratings are set by the Mzansi Manager team. By emailing a photo you agree to it being used to create your in-game profile.</p>         <p style="color:#8f98a2">Regards,<br>Mzansi Manager Team</p>       </div>       <div class="mact"><button class="gold" id="gaEmail">Email us</button><button id="gaCopy">Copy email address</button></div>     </div></div></div>`;   const em = $('#gaEmail'); if (em) em.onclick = () => { location.href = href; };   const ib = $('#gaInbox'); if (ib) ib.onclick = () => { if (G) goTo('inbox'); };   const c = $('#gaCopy');   if (c) c.onclick = () => {     const done = () => toast('Email address copied.');     try { navigator.clipboard.writeText(MM_CONTACT).then(done, () => toast(MM_CONTACT)); } catch (e) { toast(MM_CONTACT); }   }; } function viewGetAddedOld() {
  const v = $('#v-getadded');
  const subj = encodeURIComponent('Add me to Mzansi Manager');
  const body = encodeURIComponent(['Hi Mzansi Manager team,', '', 'I would like to be added to the game as a player.', '', 'Full name:', 'Age:', 'Country / city:', 'Position(s):', 'Club of your choice (if any):', 'Strengths (pace, passing, shooting, defending...):', 'Weak foot:', 'Height:', 'Links (video, Instagram, etc.):', '', 'I attach a photo of myself.'].join(String.fromCharCode(10))); /*\n\nI would like to be added to the game as a player.\n\nFull name:\nAge:\nCountry / city:\nPosition(s):\nClub of your choice (if any):\nStrengths (pace, passing, shooting, defending...):\nWeak foot:\nHeight:\nLinks (video, Instagram, etc.):\n\nI attach a photo of myself.\n');
  */ const href = `mailto:${MM_CONTACT}?subject=${subj}&body=${body}`;
  const step = (n, t, d) => `<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0">
      <span style="flex:none;width:30px;height:30px;border-radius:50%;background:var(--gold);color:#111;font:700 16px var(--head);display:flex;align-items:center;justify-content:center">${n}</span>
      <div><b>${t}</b><div class="hint" style="margin-top:2px">${d}</div></div></div>`;
  v.innerHTML = `<div class="panel">
      <h3>Want to play in Mzansi Manager?<span class="sub">open to everyone</span></h3>
      <div class="pad" style="font-size:14px;line-height:1.7">
        <p style="margin:0 0 10px;font-size:16px"><b style="color:var(--gold)">Become a player in the game.</b></p>
        <p style="margin:0 0 10px">Love football and want to see yourself in Mzansi Manager? Reach out and we will build you a player profile with your own <b>rating, position, potential and attributes</b>. You can be from anywhere, any town, any country, any level.</p>
        <p style="margin:0 0 14px">If you are interested, email us at <a href="${href}" style="color:var(--teal);font-weight:700">${MM_CONTACT}</a>.</p>
        <div style="display:flex;gap:9px;flex-wrap:wrap">
          <a class="btn gold" href="${href}" style="text-decoration:none;display:inline-block">Email us now</a>
          <button class="btn ghost sm" id="gaCopy">Copy email address</button>
        </div>
      </div></div>
    <div class="panel"><h3>How it works</h3><div class="pad">
      ${step(1, 'Send us an email', 'Use the button above, or write to ' + MM_CONTACT + ' yourself.')}
      ${step(2, 'Tell us about yourself', 'Your name, age, where you are from, your preffered position.')}
      ${step(3, 'We create your profile', 'You get a rating, potential and attributes, plus a face and a club in the game.')}
      ${step(4, 'Find yourself in the game', 'Look for yourself on the World players tab or in your club squad.')}
    </div></div>
    <div class="panel"><h3>What to include in your email</h3><div class="pad" style="font-size:14px;line-height:1.8">
      <ul style="margin:0;padding-left:20px">
        <li>Full name and age (can be made up)</li>
        <li>Country and city or township</li>
        <li>Position /(s)</li>
        <li>Your club or team, choose one that is featured in the game</li>
        <li>A clear photo of yourself, so we can make your face in the game</li>
        <li>Link to your instagram or your preffered social media account (people can follow you in real life)</li>
      </ul>
      <p class="hint" style="margin:12px 0 0">Ratings are set by the Mzansi Manager team. Everyone is welcome, whether you play for fun, for a local side or professionally. By emailing a photo you agree to it being used to create your in-game profile.</p>
    </div></div>`;
  const c = $('#gaCopy');
  if (c) c.onclick = () => {
    const done = () => toast('Email address copied.');
    try { navigator.clipboard.writeText(MM_CONTACT).then(done, () => toast(MM_CONTACT)); } catch (e) { toast(MM_CONTACT); }
  };
}
function viewInfo() {
  const v = $('#v-info');
  v.innerHTML = `<div class="mb">
    <div class="mb-tabs"><span style="padding:11px 16px;font:600 15px var(--head);color:#fff">How to play Mzansi Manager</span></div>
    <div class="pad" style="font-size:14px;line-height:1.7">
      <p><b>The idea.</b> You manage a South African football club through as many seasons as you like. You don't control players on the pitch — you pick the squad, set the tactics, work the transfer market, and watch results unfold.</p>
      <p><b>The calendar.</b> Continue in the top bar fast-forwards day by day on the calendar until a match turns up, and turns into Stop while it runs. On a match day it becomes Matchday and plays the game. Next day (bottom bar) moves the calendar forward just one day. The Calendar tab shows the whole month, your last three results and next three fixtures, and highlights the transfer windows.</p>
      <p><b>Matchday.</b> Hit "Play matchday" to watch your game live on a pitch, or turn off live mode in Tactics to sim instantly. Half time lets you make up to five substitutions.</p>
      <p><b>Squad and Tactics.</b> Both show your line-up as player photos on the pitch, rating on the left and position on the right, with the captain marked underneath. Tap anyone on the Squad pitch for a quick profile card; in Tactics, tap a player then a bench player to swap them.</p>
      <p><b>Transfers.</b> Bid on listed players, sign free agents, sell or release your own, and renew contracts before they run out. The transfer window runs the whole of July and August, and all of January — the Transfers page and top bar always show exactly how many days are left.</p>
      <p><b>Academy.</b> Upgrade your youth setup and promote prospects into the senior squad. A strong academy is the cheapest way to build a team.</p>
      <p><b>Five divisions.</b> ${TIER_NAMES.join(' → ')}. Two up, two down between each, every season.</p>
      <p><b>League tables & fixtures.</b> One tab now holds the full league table, your own fixture list, and every division's results by matchday.</p>
      <p><b>Cups and Africa.</b> The ${CUP_NAME} is open to every club in the country. The top clubs also chase the ${SUPER8}, the ${KNOCKOUT}, and a place in the ${CAF_NAME} against the best of the continent. Your best South African players can be called up for ${AFCON_NAME} qualifiers and finals.</p>
      <p><b>Club.</b> Your badge, kit designs, sponsor, and finances all live here now — budget, wage bill, income and spending, and your history season by season.</p>
      <p><b>Reputation.</b> Finish well and win things, and bigger clubs come calling with job offers. Finish badly and the board's patience runs out.</p>
      <p><b>Saving.</b> The game saves itself after every matchday, in this browser, across four slots.</p>
      <p style="color:var(--dim)">Mzansi Manager works on your phone and on a computer — everything here is one page, nothing to install.</p>       <p><button class="btn ghost sm" onclick="startGuide(true)">Replay the guide</button></p>
    </div></div>`;
}

/* ---------------- create a club ---------------- */
let ccName = '', ccCity = '', ccTier = 2, ccC1 = '#D8B039', ccC2 = '#111111', ccIcon = 'ball', ccShape = 'shield';
const CC_ICONS = ['ball','lion','star','crown','flame','wave','building','flower','eagle','shield','antelope','mountain','sun','drum','paw','bolt'];
function viewCreateClub() {
  const v = $('#v-createclub');
  const preview = { s: (ccName || 'Your Club').slice(0, 3).toUpperCase(), n: ccName || 'Your Club', c1: ccC1, c2: ccC2, icon: ccIcon, shape: ccShape };
  v.innerHTML = `<div class="mb"><div class="mb-tabs"><span style="padding:11px 16px;font:600 15px var(--head);color:#fff">Create a club</span></div>
    <div class="pad">
      <div style="display:flex;gap:16px;align-items:center;margin-bottom:14px;flex-wrap:wrap">
        ${crestCustomHTML(preview, 84)}
        <div>
          <input type="text" id="ccNameI" placeholder="Club name" maxlength="26" value="${esc(ccName)}" style="margin-bottom:6px;display:block;width:220px">
          <input type="text" id="ccCityI" placeholder="Home city" maxlength="20" value="${esc(ccCity)}" style="display:block;width:220px">
        </div>
      </div>
    <p class="hint" style="margin:8px 0 6px">Badge icon</p>
    <div class="chipbar" style="border:none;padding:0 0 10px" id="lccIconBar"></div>
      <p class="hint" style="margin:0 0 6px">Badge shape</p>
<div class="chipbar" style="border:none;padding:0 0 10px">${['shield','circle','diamond','hexagon','pentagon','roundsquare'].map(s => `<button class="chip" data-shape="${s}" aria-pressed="${ccShape === s}">${s}</button>`).join('')}</div>
      <p class="hint" style="margin:0 0 6px">Colours</p>
      <div style="display:flex;gap:10px;margin-bottom:12px">
        <label class="hint">Primary <input type="color" id="ccC1I" value="${ccC1}"></label>
        <label class="hint">Secondary <input type="color" id="ccC2I" value="${ccC2}"></label>
      </div>
      <p class="hint" style="margin:0 0 6px">Starting division</p>
      <div class="chipbar" style="border:none;padding:0 0 12px">${[2,3,4].map(tr => `<button class="chip" data-ctier="${tr}" aria-pressed="${ccTier === tr}">${TIER_SHORT[tr]}</button>`).join('')}</div>
      <button class="btn" id="ccGo">Found the club and start a career</button>
      <p class="hint" style="margin-top:8px">This replaces one of the weaker clubs in that division with yours, keeping the league at ${TIER_SIZE} clubs.</p>
    </div></div>`;
  const bind = () => {
    $('#ccNameI').oninput = e => {
      const pos = e.target.selectionStart;
      ccName = e.target.value; viewCreateClub();
      const n = $('#ccNameI'); n.focus(); n.setSelectionRange(pos, pos);
    };
    $('#ccCityI').oninput = e => { ccCity = e.target.value; };
    $('#ccC1I').oninput = e => { ccC1 = e.target.value; viewCreateClub(); };
    $('#ccC2I').oninput = e => { ccC2 = e.target.value; viewCreateClub(); };
    v.querySelectorAll('[data-icon]').forEach(b => b.onclick = () => { ccIcon = b.dataset.icon; viewCreateClub(); });
    v.querySelectorAll('[data-shape]').forEach(b => b.onclick = () => { ccShape = b.dataset.shape; viewCreateClub(); });
    v.querySelectorAll('[data-ctier]').forEach(b => b.onclick = () => { ccTier = +b.dataset.ctier; viewCreateClub(); });
    $('#ccGo').onclick = () => {
      if (!ccName.trim()) { toast('Give your club a name first.'); return; }
      const idx = foundClub(G, { name: ccName.trim(), city: ccCity.trim() || 'Mzansi', tier: ccTier, c1: ccC1, c2: ccC2, icon: ccIcon, shape: ccShape });
      openModal('Job offer accepted', `<p style="margin:0;color:var(--dim)">The board of <b style="color:var(--ink)">${esc(ccName)}</b> have appointed you. This ends your current career and starts a new one in the ${TIER_SHORT[ccTier]}.</p>`,
        `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="ccConfirm">Take charge</button>`);
      $('#ccConfirm').onclick = () => {
        G.myTeam = idx; slot = firstFreeSlot(); save(); closeModal();
        tab = 'match'; navStack = ['match']; navIdx = 0;
        toast(`Welcome to ${G.teams[idx].n}.`);
        render();
        showSponsors();
      };
    };
  };
  bind();
}

/* ---------------- share / screenshot ---------------- */
function shareSeason() {
  try {
    const t = me(), st = sortTable(G, t.tier);
    const pos = st.findIndex(r => r.id === G.myTeam) + 1;
    const W = 640, H = 800;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#0f1c16'); grad.addColorStop(1, '#0a1310');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#D8B039';
    ctx.fillRect(0, 0, W, 10);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5b800';
    ctx.font = '700 26px sans-serif';
    ctx.fillText('MZANSI MANAGER', W / 2, 70);
    ctx.fillStyle = '#eaf3ec';
    ctx.font = '700 40px sans-serif';
    wrapText(ctx, t.n, W / 2, 150, W - 80, 44);
    ctx.font = '15px sans-serif'; ctx.fillStyle = '#96ad9f';
    ctx.fillText(`${TIER_SHORT[t.tier]} · ${seasonLabel(G.season)} · managed by ${G.manager.name}`, W / 2, 200);

    const stats = [
      [ordinalPlain(pos), 'league position'],
      [String(teamOverall(t)), 'team rating'],
      [String(t.trophies.length), 'trophies won'],
      [money(t.budget), 'transfer budget']
    ];
    const boxW = (W - 100) / 2;
    stats.forEach((s, i) => {
      const x = 50 + (i % 2) * (boxW + 20), y = 250 + Math.floor(i / 2) * 120;
      ctx.fillStyle = 'rgba(255,255,255,.04)';
      roundRect(ctx, x, y, boxW, 96, 12); ctx.fill();
      ctx.fillStyle = '#23B09D'; ctx.font = '700 34px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(s[0], x + 18, y + 48);
      ctx.fillStyle = '#96ad9f'; ctx.font = '13px sans-serif';
      ctx.fillText(s[1], x + 18, y + 72);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = '#D8B039'; ctx.font = '700 15px sans-serif';
    ctx.fillText('Play free at mzansimanager.co.za', W / 2, H - 40);
    ctx.fillStyle = '#6b8478'; ctx.font = '12px sans-serif';
    ctx.fillText('Mzansi Manager — on mobile and PC', W / 2, H - 18);

    canvas.toBlob(blob => {
      if (!blob) { toast('Could not create an image on this device.'); return; }
      const file = new File([blob], 'mzansi-manager.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: 'Mzansi Manager', text: `${t.n} — ${ordinalPlain(pos)} in the ${TIER_SHORT[t.tier]}` }).catch(() => {});
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'mzansi-manager.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        toast('Image saved — share it anywhere.');
      }
    });
  } catch (e) { toast('Sharing is not available on this device.'); }
}
function wrapText(ctx, text, x, y, maxW, lh) {
  const words = text.split(' '); let line = '', ly = y;
  words.forEach(w => {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, ly); line = w; ly += lh; }
    else line = test;
  });
  ctx.fillText(line, x, ly);
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function ordinalPlain(n) { const s = ['th','st','nd','rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

/* ---------------- manager ---------------- */
let trophyTab = 'cabinet';
const TROPHY_SVG = {   league: '<path d="M30 12h40v7c0 24-8 40-20 47C38 59 30 43 30 19z" fill="url(#tg@)"/><path d="M30 23C13 23 11 45 31 48" fill="none" stroke="url(#tg@)" stroke-width="5" stroke-linecap="round"/><path d="M70 23C87 23 89 45 69 48" fill="none" stroke="url(#tg@)" stroke-width="5" stroke-linecap="round"/><rect x="45" y="64" width="10" height="17" fill="url(#tg@)"/><path d="M32 81h36l4 10H28z" fill="url(#tg@)"/><rect x="24" y="91" width="52" height="14" rx="2" fill="#2b1d10"/><rect x="24" y="91" width="52" height="3" fill="url(#tg@)" opacity=".7"/><path d="M37 17v26" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>',   cup: '<circle cx="50" cy="9" r="5" fill="url(#tg@)"/><path d="M42 15h16l-3 8H45z" fill="url(#tg@)"/><path d="M25 23h50l-4 32c-2 11-11 15-21 15s-19-4-21-15z" fill="url(#tg@)"/><path d="M26 29C10 29 10 52 30 52" fill="none" stroke="url(#tg@)" stroke-width="5" stroke-linecap="round"/><path d="M74 29C90 29 90 52 70 52" fill="none" stroke="url(#tg@)" stroke-width="5" stroke-linecap="round"/><rect x="45" y="70" width="10" height="13" fill="url(#tg@)"/><path d="M33 83h34l3 8H30z" fill="url(#tg@)"/><rect x="24" y="91" width="52" height="14" rx="2" fill="#2b1d10"/><rect x="24" y="91" width="52" height="3" fill="url(#tg@)" opacity=".7"/><path d="M34 30v22" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>',   shield: '<path d="M50 8l31 10v28c0 22-15 36-31 44-16-8-31-22-31-44V18z" fill="url(#tg@)"/><path d="M50 18l21 7v21c0 15-10 25-21 31-11-6-21-16-21-31V25z" fill="#2b1d10" opacity=".4"/><path d="M50 32l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="url(#tg@)"/><rect x="30" y="91" width="40" height="14" rx="2" fill="#2b1d10"/><rect x="30" y="91" width="40" height="3" fill="url(#tg@)" opacity=".7"/>',   big: '<path d="M33 8h34c3 28-6 42-17 47-11-5-20-19-17-47z" fill="url(#tg@)"/><path d="M34 14C4 10 4 56 38 48" fill="none" stroke="url(#tg@)" stroke-width="7" stroke-linecap="round"/><path d="M66 14C96 10 96 56 62 48" fill="none" stroke="url(#tg@)" stroke-width="7" stroke-linecap="round"/><path d="M43 55h14l3 25H40z" fill="url(#tg@)"/><path d="M29 80h42l7 11H22z" fill="url(#tg@)"/><rect x="20" y="91" width="60" height="14" rx="2" fill="#2b1d10"/><rect x="20" y="91" width="60" height="3" fill="url(#tg@)" opacity=".7"/><path d="M40 14v28" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>' }; function trophyKind(name) {   const ti = TIER_NAMES.indexOf(name);   if (ti >= 0) return { type: 'league', metal: ['G', 'S', 'B', 'P', 'P'][ti], group: 'league', label: TIER_SHORT[ti] };   if (name === CUP_NAME) return { type: 'cup', metal: 'G', group: 'cup', label: name };   if (name === SUPER8) return { type: 'shield', metal: 'G', group: 'cup', label: name };   if (name === KNOCKOUT) return { type: 'shield', metal: 'S', group: 'cup', label: name };   if (name === CAF_NAME) return { type: 'big', metal: 'G', group: 'cont', label: name };   if (name === CONFED_NAME) return { type: 'big', metal: 'S', group: 'cont', label: name };   return { type: 'cup', metal: 'B', group: 'other', label: name }; } function trophySvg(k, cls) { return `<svg class="tsvg ${cls}" viewBox="0 0 100 112" aria-hidden="true">${TROPHY_SVG[k.type].replace(/@/g, k.metal)}</svg>`; } function viewTrophies() {   const v = $('#v-trophies'), t = me();   v.classList.add('mmx', 'sqv');   if (trophyTab === 'hof') { viewHallOfFame(v, t); return; }   const all = t.trophies || [];   const wins = {};   all.forEach(x => (wins[x.name] = wins[x.name] || []).push(x.season));   const count = g => all.filter(x => trophyKind(x.name).group === g).length;   const latest = all.length ? all.reduce((a, b) => b.season >= a.season ? b : a) : null;   const known = TIER_NAMES.concat([CUP_NAME, SUPER8, KNOCKOUT, CAF_NAME, CONFED_NAME]);   const extra = Object.keys(wins).filter(n => known.indexOf(n) < 0);   const shelves = [     { title: 'League titles', names: TIER_NAMES.filter((n, i) => wins[n] || i === 0 || i === t.tier) },     { title: 'Domestic cups', names: [CUP_NAME, SUPER8, KNOCKOUT] },     { title: 'Continental', names: [CAF_NAME, CONFED_NAME] }   ];   if (extra.length) shelves.push({ title: 'Other honours', names: extra });   const slot = n => {     const w = (wins[n] || []).slice().sort((a, b) => a - b), k = trophyKind(n), c = w.length;     const stack = trophySvg(k, 'm') + (c >= 2 ? trophySvg(k, 'b1') : '') + (c >= 3 ? trophySvg(k, 'b2') : '');     return `<button class="tslot ${c ? 'won' : 'ghost'}" ${c ? `data-tn="${esc(n)}"` : 'tabindex="-1"'}>       <div class="tstack">${stack}${c > 1 ? `<span class="tcount">×${c}</span>` : ''}</div>       <div class="tplaque">${esc(k.label)}<small>${c ? 'Latest ' + seasonLabel(w[c - 1]) : 'Not won yet'}</small></div></button>`;   };   v.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>       <linearGradient id="tgG" x1="0" x2="1"><stop offset="0" stop-color="#b8861b"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".62" stop-color="#e8a812"/><stop offset="1" stop-color="#8a5f10"/></linearGradient>       <linearGradient id="tgS" x1="0" x2="1"><stop offset="0" stop-color="#7c8592"/><stop offset=".35" stop-color="#f1f4f8"/><stop offset=".62" stop-color="#aab3bf"/><stop offset="1" stop-color="#626b77"/></linearGradient>       <linearGradient id="tgB" x1="0" x2="1"><stop offset="0" stop-color="#7a4520"/><stop offset=".35" stop-color="#e8aa70"/><stop offset=".62" stop-color="#b06a34"/><stop offset="1" stop-color="#5a3213"/></linearGradient>       <linearGradient id="tgP" x1="0" x2="1"><stop offset="0" stop-color="#4f5861"/><stop offset=".35" stop-color="#b4bcc5"/><stop offset=".62" stop-color="#7d8791"/><stop offset="1" stop-color="#3f464e"/></linearGradient></defs></svg>     <div class="mb-tabs sqtabs"><button class="on">Trophy cabinet</button><button class="mini" id="tcHof">Hall of Fame</button><span class="sp"></span><button class="mini" id="tcHist">Club history</button><button class="mini" onclick="openRecapCard()">Season recap</button></div>` +     sqTiles([['Trophies', all.length], ['League titles', count('league')], ['Cups', count('cup')], ['Continental', count('cont')], ['Latest', latest ? seasonLabel(latest.season) : '—']]) +     `<div class="tcab">${shelves.map(s => `<div class="tshelf"><span class="tshelf-title">${s.title}</span>${s.names.map(slot).join('')}</div>`).join('')}</div>     <p class="hint" style="text-align:center;margin:12px 0 2px">${all.length ? 'Tap a trophy to see every year you won it.' : 'The cabinet is empty. Win a league or cup and it goes on the shelf.'}</p>`;   v.querySelectorAll('[data-tn]').forEach(b => b.onclick = () => {     const n = b.dataset.tn, k = trophyKind(n), w = (wins[n] || []).slice().sort((a, c) => a - c);     openModal(esc(n), `<div style="display:flex;gap:16px;align-items:center"><svg viewBox="0 0 100 112" width="84" height="94" aria-hidden="true">${TROPHY_SVG[k.type].replace(/@/g, k.metal)}</svg>       <div><div style="font:700 26px var(--head);color:#fff">×${w.length}</div><div class="hint">${esc(t.n)}</div></div></div>       <div class="tmodal-list">${w.map(s => `<div><span>${seasonLabel(s)}</span><b>Winners</b></div>`).join('')}</div>`,       `<button class="btn sm" onclick="closeModal()">Close</button>`);     $('#modal').classList.add('mmx');   });   const hb = $('#tcHist'); if (hb) hb.onclick = () => { goTo('club'); clubTab = 'history'; render(); };   const hof = $('#tcHof'); if (hof) hof.onclick = () => { trophyTab = 'hof'; viewTrophies(); }; }  function hallOfFameData(G) {   const seasons = G.records.seasons || [];   const clubs = {};   const bumpClub = (id, key) => {     if (id == null || !G.teams[id]) return;     const c = clubs[id] || (clubs[id] = { id, n: G.teams[id].n, league: 0, cup: 0, s8: 0, caf: 0, confed: 0, total: 0 });     c[key]++; c.total++;   };   const bumpNamed = (name, key) => {     if (!name) return;     const k = 'x:' + name;     const c = clubs[k] || (clubs[k] = { id: k, n: name, league: 0, cup: 0, s8: 0, caf: 0, confed: 0, total: 0 });     c[key]++; c.total++;   };   const scorers = {}, players = {}, youngs = {}, bosses = {};   seasons.forEach(s => {     bumpClub(s.champ, 'league');     bumpClub(s.cup, 'cup');     bumpClub(s.s8, 's8');     bumpNamed(s.caf, 'caf');     bumpNamed(s.confed, 'confed');     const a = s.awards;     if (a) {       if (a.goldenBoot) {         const e = scorers[a.goldenBoot.pid] || (scorers[a.goldenBoot.pid] = { name: a.goldenBoot.name, wins: 0, bestGoals: 0, club: a.goldenBoot.clubName, seasons: [] });         e.wins++; e.bestGoals = Math.max(e.bestGoals, a.goldenBoot.goals); e.club = a.goldenBoot.clubName; e.seasons.push(s.season);       }       if (a.playerOfSeason) {         const e = players[a.playerOfSeason.pid] || (players[a.playerOfSeason.pid] = { name: a.playerOfSeason.name, wins: 0, club: a.playerOfSeason.clubName, seasons: [] });         e.wins++; e.club = a.playerOfSeason.clubName; e.seasons.push(s.season);       }       if (a.youngPlayerOfSeason) {         const e = youngs[a.youngPlayerOfSeason.pid] || (youngs[a.youngPlayerOfSeason.pid] = { name: a.youngPlayerOfSeason.name, wins: 0, club: a.youngPlayerOfSeason.clubName, seasons: [] });         e.wins++; e.club = a.youngPlayerOfSeason.clubName; e.seasons.push(s.season);       }       if (a.manager) {         const e = bosses[a.manager.clubId] || (bosses[a.manager.clubId] = { name: a.manager.clubName, wins: 0, seasons: [] });         e.wins++; e.seasons.push(s.season);       }     }   });   const topClubs = Object.values(clubs).sort((a, b) => b.total - a.total || b.league - a.league).slice(0, 10);   const topScorerList = Object.values(scorers).sort((a, b) => b.wins - a.wins || b.bestGoals - a.bestGoals).slice(0, 8);   const topPlayerList = Object.values(players).sort((a, b) => b.wins - a.wins).slice(0, 8);   const topYoungList = Object.values(youngs).sort((a, b) => b.wins - a.wins).slice(0, 8);   const topBossList = Object.values(bosses).sort((a, b) => b.wins - a.wins).slice(0, 8);   return { seasons: seasons.length, topClubs, topScorerList, topPlayerList, topYoungList, topBossList }; } function viewHallOfFame(v, t) {   const d = hallOfFameData(G);   const tabBar = `<div class="mb-tabs sqtabs"><button class="mini" id="tcCab">Trophy cabinet</button><button class="on">Hall of Fame</button><span class="sp"></span><button class="mini" id="tcHist2">Club history</button></div>`;   const medal = i => i === 0 ? '\ud83e\udd47' : i === 1 ? '\ud83e\udd48' : i === 2 ? '\ud83e\udd49' : (i + 1) + '.';   const clubRow = (c, i) => `<div class="prow" style="grid-template-columns:auto 1fr auto"><span style="font-size:18px;width:26px;text-align:center">${medal(i)}</span>       <span class="who"><b>${esc(c.n)}</b><small>${c.league ? c.league + ' league' + (c.league === 1 ? '' : 's') + ' \u00b7 ' : ''}${c.cup ? c.cup + ' cup' + (c.cup === 1 ? '' : 's') + ' \u00b7 ' : ''}${c.s8 ? c.s8 + ' ' + SUPER8 + ' \u00b7 ' : ''}${c.caf ? c.caf + ' ' + CAF_NAME + ' \u00b7 ' : ''}${c.confed ? c.confed + ' ' + CONFED_NAME : ''}</small></span>       <b style="color:var(--gold)">${c.total}</b></div>`;   const peopleRow = (e, i) => `<div class="prow" style="grid-template-columns:auto 1fr auto"><span style="font-size:18px;width:26px;text-align:center">${medal(i)}</span>       <span class="who"><b>${esc(e.name)}</b><small>${esc(e.club || '')}${e.bestGoals ? ' \u00b7 best ' + e.bestGoals + ' goals' : ''} \u00b7 ${e.seasons.slice().sort((a, b) => a - b).map(seasonLabel).join(', ')}</small></span>       <b style="color:var(--gold)">\u00d7${e.wins}</b></div>`;   if (!d.seasons) {     v.innerHTML = tabBar + `<div class="panel"><h3>Hall of Fame</h3><div class="empty">Nobody's won anything yet. Finish a season to start the history books.</div></div>`;   } else {     v.innerHTML = tabBar +       sqTiles([['Seasons recorded', d.seasons], ['Most decorated', d.topClubs[0] ? d.topClubs[0].n : '\u2014']]) +       `<div class="panel"><h3>Most decorated clubs<span class="sub">all trophies, all competitions</span></h3>${d.topClubs.length ? d.topClubs.map(clubRow).join('') : '<div class="empty">No honours yet.</div>'}</div>       <div class="panel"><h3>Golden Boot winners</h3>${d.topScorerList.length ? d.topScorerList.map(peopleRow).join('') : '<div class="empty">Not awarded yet.</div>'}</div>       <div class="panel"><h3>Player of the Season</h3>${d.topPlayerList.length ? d.topPlayerList.map(peopleRow).join('') : '<div class="empty">Not awarded yet.</div>'}</div>       <div class="panel"><h3>Young Player of the Season</h3>${d.topYoungList.length ? d.topYoungList.map(peopleRow).join('') : '<div class="empty">Not awarded yet.</div>'}</div>       <div class="panel"><h3>Manager of the Season</h3>${d.topBossList.length ? d.topBossList.map(peopleRow).join('') : '<div class="empty">Not awarded yet.</div>'}</div>`;   }   const cb = $('#tcCab'); if (cb) cb.onclick = () => { trophyTab = 'cabinet'; viewTrophies(); };   const hb2 = $('#tcHist2'); if (hb2) hb2.onclick = () => { trophyTab = 'cabinet'; goTo('club'); clubTab = 'history'; render(); }; } function viewTrophiesOld() {   const v = $('#v-trophies'), t = me(), all = t.trophies || [];   const by = {};   all.forEach(x => (by[x.name] = by[x.name] || []).push(x.season));   const names = Object.keys(by).sort((a, b) => by[b].length - by[a].length);   v.innerHTML = `<div class="panel"><h3>Trophy room<span class="sub">${esc(t.n)} · ${all.length} trophy${all.length === 1 ? '' : 's'}</span></h3>     ${names.length ? names.map(n => `<div class="pad" style="border-top:1px solid var(--line);display:flex;gap:12px;align-items:center">       <div style="font-size:30px">🏆</div>       <div style="flex:1;min-width:0"><b>${esc(n)}</b><br><small style="color:var(--dim)">${by[n].slice().sort((a, b) => a - b).map(seasonLabel).join(' · ')}</small></div>       <div style="font-size:22px;font-weight:700;color:var(--gold)">×${by[n].length}</div></div>`).join('')       : '<div class="empty">The cabinet is empty. Win a league or cup and it goes here.</div>'}</div>`; } function viewFinances() {   const v = $('#v-finances'), t = me(), f = t.fin;   const inc = f.prize + f.sponsor + f.gate + f.sales, out = f.buys + f.wages + (f.fines || 0);   const net = finNet(f), col = n => n >= 0 ? 'var(--up)' : 'var(--down)';   const row = (l, a, tot) => `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${l}</span><b>${money(a)}</b></div><div class="bar"><i style="width:${tot > 0 ? Math.min(100, a / tot * 100) : 0}%"></i></div></div>`;   v.innerHTML = `<div class="panel"><h3>Finances<span class="sub">${esc(t.n)} · ${seasonLabel(G.season)}</span></h3>     <dl class="kv">       <dt>Transfer budget</dt><dd>${money(t.budget)}</dd>       <dt>Wage bill</dt><dd>${money(t.wageBill)} a season</dd>       <dt>Income so far</dt><dd style="color:var(--up)">${money(inc)}</dd>       <dt>Spending so far</dt><dd style="color:var(--down)">−${money(out)}</dd>       <dt style="font-weight:600">Season profit</dt><dd style="color:${col(net)}"><b>${money(net)}</b></dd>     </dl></div>   <div class="cols">     <div class="panel"><h3>Money in</h3><div class="pad">       ${row('Prize money', f.prize, inc)}${row('Sponsorship', f.sponsor, inc)}${row('Gate receipts', f.gate, inc)}${row('Player sales', f.sales, inc)}</div></div>     <div class="panel"><h3>Money out</h3><div class="pad">       ${row('Wages paid', f.wages, out)}${row('Signings and fees', f.buys, out)}${row('Fines', f.fines || 0, out)}</div></div>   </div>   <div class="panel"><h3>Past seasons</h3>     ${t.finHistory.length ? `<table class="tbl"><thead><tr><th>Season</th><th>In</th><th>Out</th><th>Net</th></tr></thead><tbody>` +       t.finHistory.slice().reverse().map(h => `<tr><td>${seasonLabel(h.season)}</td><td class="num">${money(h.prize + h.sponsor + h.gate + h.sales)}</td><td class="num">${money(h.buys + h.wages + (h.fines || 0))}</td><td class="num" style="color:${col(h.net)}"><b>${money(h.net)}</b></td></tr>`).join('') + '</tbody></table>'       : '<div class="empty">No completed seasons yet.</div>'}</div>`; } 
let mgrTab = 'profile'; let vacTier = -1; function viewManager() {   const v = $('#v-manager'), t = me(), m = G.manager;   ensureMgr(G);   v.classList.add('mmx', 'sqv');   if (G.jobless) ensureMinVacancies(G, 3);   const jl = !!G.jobless;   const offers = G.pendingJobOffers || [], vOffers = G.vacOffers || [];   const nOffers = (jl ? 0 : offers.length) + vOffers.length;   const vacOpen = jl || (G.curDay || 0) >= 91;   const rep = m.rep || 40;   const repTier = rep < 35 ? 'Unknown' : rep < 50 ? 'Rising' : rep < 65 ? 'Established' : rep < 80 ? 'Respected' : 'Elite';   const hist = t.history || [];   const cur = (sortTable(G, t.tier).find(r => r.id === t.id)) || { w: 0, d: 0, l: 0 };   const W = hist.reduce((a, h) => a + h.w, 0) + cur.w, D = hist.reduce((a, h) => a + h.d, 0) + cur.d, L = hist.reduce((a, h) => a + h.l, 0) + cur.l, games = W + D + L;   const board = G.board != null ? G.board : 62;   const boardColor = board > 55 ? '#3ddc84' : board > 30 ? '#f2b928' : '#ff6b6b';   const daysOut = jl ? Math.max(0, ((G.season - G.joblessSince.season) * 300) + ((G.curDay || 0) - G.joblessSince.day)) : 0;   const yearsLeft = jl || m.contractEnd == null ? 0 : Math.max(0, m.contractEnd - G.season + 1);   const tabs = [['profile', 'Profile'], ['contract', 'Contract'], ['career', 'Career'],     ['offers', 'Job offers' + (nOffers ? `<i class="mb-red">${nOffers}</i>` : '')],     ['vacancies', 'Vacancies' + (vacOpen && G.vac.length ? `<i class="mb-red" style="background:#3a424b">${G.vac.length}</i>` : '')]];   const tabBar = `<div class="mb-tabs sqtabs">${tabs.map(([k, l]) => `<button data-mgt="${k}" class="${mgrTab === k ? 'on' : ''}">${l}</button>`).join('')}     <span class="sp"></span><button class="mini" id="mgInbox">Inbox</button></div>`;   const spells = (m.clubs || []).map((c, i) => {     const next = m.clubs[i + 1];     const end = next ? seasonLabel(next.from) : (jl ? 'left' : 'present');     return `<tr><td><span class="team">${crestHTML(G.teams[c.id], 16)}<span>${esc(G.teams[c.id].n)}</span></span></td><td>${seasonLabel(c.from)} – ${end}</td></tr>`;   }).join('');   const go = (tid, wage, years) => jobNegotiation({ team: G.teams[tid], heading: 'Contract Offer', wage, years, onChoice: (k) => {     if (k !== 'accept') return;     takeJob(G, tid);     G.board = 55; G.boardFired = false; G.pendingJobOffers = null; G.jobOffersSeen = false;     tableTier = me().tier; statTier = Math.min(me().tier, 2);     toast(`You are the new manager of ${me().n}.`);     mgrTab = 'profile'; save(); render();   } });   let body = '';   if (mgrTab === 'profile') {     body = `<div class="mprof mgr"><div class="mface">${avatarSVG(m.avatar, 64)}</div>         <div><div class="mname">${esc(m.name)} ${flagSVG(m.nat || 'ZA')}</div>           <div class="mclub"><em>${jl ? 'Unemployed' : 'Manager'}</em>${jl ? `${daysOut} days without a club` : `${crestHTML(t, 16)} ${esc(t.n)}`}</div>           <div class="bar" style="margin:8px 0 3px"><i style="width:${rep}%"></i></div>           <div class="mpot">Reputation ${rep}/100 · ${repTier} · ${esc(natName(m.nat || 'ZA'))}</div><div class="mpot">Age ${mgrAgeOn(m.dob, currentDateISO())} · born ${esc(m.dob || '')}</div></div>         <div class="mstats"><div><small>Seasons</small><b>${m.seasons || 0}</b></div><div><small>Trophies</small><b>${m.trophies || 0}</b></div>           <div><small>Wage</small><b>${jl ? '—' : money(m.wage || 0)}</b></div><div><small>Earnings</small><b>${money(m.careerEarnings || 0)}</b></div></div></div>${mgrAwardsHTML(m)}${mgrAwardsHTML(m)}` +       (jl ? `<div class="panel"><h3>Between jobs</h3><div class="pad"><p class="hint" style="margin:0 0 10px">You have no club. Your reputation slips a little each season you stay out of work, so apply for a vacancy.</p><button class="btn sm" id="mgGoVac">See vacancies</button></div></div>` :       sqTiles([['Played', games || '—'], ['Wins', games ? W : '—', '#3ddc84'], ['Draws', games ? D : '—'], ['Losses', games ? L : '—', games && L > W ? '#ff6b6b' : null], ['Win rate', games ? Math.round(W / games * 100) + '%' : '—']]) +       `<div class="panel"><h3>Board confidence<span class="sub" style="color:${boardColor};font-weight:700">${Math.round(board)}/100</span></h3><div class="pad">         <div class="bar"><i style="width:${board}%;background:${boardColor}"></i></div>         <p class="hint" style="margin:8px 0 0">${board > 55 ? 'The board are happy with how things are going.' : board > 30 ? 'The board expect better next season.' : 'Your job is under real threat.'}</p></div></div>`);   } else if (mgrTab === 'contract') {     if (jl) {       body = sqTiles([['Status', 'No contract'], ['Last wage', money(m.lastWage || 0)], ['Out of work', `${daysOut} days`]]) +         `<div class="panel"><h3>No contract</h3><div class="pad"><p class="hint" style="margin:0 0 10px">Your wage stopped when you left. A new job brings a new contract, and the wage reflects the club you join.</p><button class="btn sm" id="mgGoVac">See vacancies</button></div></div>`;     } else {       const rn = m.renewal && m.renewal.season === G.season ? m.renewal : null;       const final = G.season >= m.contractEnd;       let rb = '';       if (rn && rn.status === 'offered') rb = `<p style="margin:0 0 10px;color:#cfd4da">The board want to extend your deal: <b style="color:#fff">${money(rn.wage)}</b> a season for <b style="color:#fff">${rn.years} years</b>.</p><button class="btn sm" id="mgrExt">Negotiate extension</button> <button class="btn ghost sm" id="mgrExtNo">Turn it down</button>`;       else if (rn && rn.status === 'declined') rb = `<p style="margin:0 0 10px;color:#ff8a84">The board have decided not to renew your contract. You can see out the season, or look for a new club.</p><button class="btn sm" id="mgGoVac">See vacancies</button>${reconBtn(rn)}`;       else if (rn && rn.status === 'signed') rb = `<p style="margin:0;color:#3ddc84">You have signed an extension.</p>`;       else if (rn && rn.status === 'refused') rb = `<p style="margin:0;color:#f2b928">You turned down the extension. When your contract ends you will be out of work unless you find another club.</p>`;       else if (final) rb = `<p style="margin:0 0 10px;color:#cfd4da">This is the last year of your deal. The board usually decide about a renewal around the middle of the season.</p><button class="btn sm" id="mgrAsk">Ask about a new deal now</button>`;       else rb = `<p style="margin:0 0 10px;color:#cfd4da">You still have ${yearsLeft} years left. If the board rate you, they may be willing to extend early.</p><button class="btn sm" id="mgrAskEarly" ${m.lastAsk === G.season ? 'disabled' : ''}>Ask for an early extension</button>`;       body = sqTiles([['Wage a season', money(m.wage || 0)], ['Per month', money((m.wage || 0) / 12)], ['Years left', yearsLeft], ['Runs until', `June ${m.contractEnd + 1}`]]) +         `<div class="panel"><h3>Renewal<span class="sub">${final ? 'final year' : yearsLeft + ' years left'}</span></h3><div class="pad">${rb}</div></div>          <div class="panel"><h3>Contract talks<span class="sub">as manager, separate from the club's books</span></h3><div class="pad">           <button class="btn ghost sm" id="mgrRaise">Ask the board for a rise</button>           <p class="hint" style="margin:8px 0 0">Better odds when you're overperforming your target league position.</p></div></div>`;     }   } else if (mgrTab === 'career') {     body = sqTiles([['Clubs managed', (m.clubs || []).length || 1], ['Seasons', m.seasons || 0], ['Trophies', m.trophies || 0]]) + mgrAwardsHTML(m) +       `<div class="panel"><h3>Career history</h3>${spells || jl ? `<table class="tbl"><thead><tr><th>Club</th><th>Spell</th></tr></thead><tbody>${spells}${jl ? `<tr><td style="color:#ff8a84">Unemployed</td><td>since ${seasonLabel(G.joblessSince.season)}</td></tr>` : ''}</tbody></table>` : '<div class="empty">Just getting started.</div>'}</div>`;   } else if (mgrTab === 'offers') {     const rows = [];     if (!jl) offers.forEach(o => { const ot = G.teams[o.id]; rows.push(`<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(ot, 26)}         <span class="who"><b>${esc(ot.n)}</b><small>${TIER_SHORT[ot.tier]} · squad rated ${teamOverall(ot)} · budget ${money(ot.budget)} · about ${money(mgrWage(ot))} a season</small></span>         <button class="btn sm" data-mgrtake="${ot.id}">Negotiate</button></div>`); });     vOffers.forEach(o => { const ot = G.teams[o.tid]; rows.push(`<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(ot, 26)}         <span class="who"><b>${esc(ot.n)}</b><small>${TIER_SHORT[ot.tier]} · ${money(o.wage)} a season · ${o.years} years · open for ${Math.max(0, o.expires - G.round)} more matchday${o.expires - G.round === 1 ? '' : 's'}</small></span>         <button class="btn sm" data-vtake="${o.tid}">Negotiate</button></div>`); });     body = (rows.length ? `<div class="panel"><h3>Job offers<span class="sub">${rows.length} waiting</span></h3>${rows.join('')}         ${!jl && offers.length ? `<div class="pad" style="border-top:1px solid #2a3037"><button class="btn ghost sm" id="mgrDeclineOffers">Stay loyal to my team</button></div>` : ''}</div>`       : `<div class="panel"><h3>Job offers</h3><div class="empty">No clubs are calling right now. Good seasons bring offers, and you can apply for vacancies.</div></div>`) +       (jl ? '' : `<div class="panel"><h3>Looking for a new challenge?</h3><div class="pad">         <button class="btn sm" id="mgrResign">Resign and talk to other clubs</button>         <p class="hint" style="margin:8px 0 14px">Tell the board why you want to leave. If another club wants you, you'll negotiate your next job on the spot.</p></div></div>`) +       `<div class="panel"><div class="pad"><button class="btn ghost sm" id="mgrQuit">Quit to main menu</button></div></div>`;   } else {     const apps = G.vacApps || [];     if (!vacOpen) {       body = `<div class="panel"><h3>Vacancies</h3><div class="empty">Clubs start looking for new managers about three months into the season. Check back in ${Math.max(1, 91 - (G.curDay || 0))} days. You can apply for any job that opens up, even while you are employed.</div></div>`;     } else {       const list = G.vac.filter(x => vacTier < 0 || G.teams[x.tid].tier === vacTier);       body = sqTiles([['Open jobs', G.vac.length], ['Applications', apps.filter(a => a.status === 'pending').length], ['Offers', vOffers.length], ['Reputation', rep]]) +         `<div class="panel"><h3>Clubs without a manager<span class="sub">the list changes as clubs hire</span></h3>           <div class="chipbar"><button class="chip" data-vt="-1" aria-pressed="${vacTier < 0}">All leagues</button>${[0, 1, 2, 3, 4].map(i => `<button class="chip" data-vt="${i}" aria-pressed="${vacTier === i}">${TIER_SHORT[i]}</button>`).join('')}</div></div>` +         (list.length ? list.map(x => {           const ct = G.teams[x.tid], rows = sortTable(G, ct.tier), pos = rows.findIndex(r => r.id === ct.id) + 1, rr = rows.find(r => r.id === ct.id) || { p: 0, pts: 0 };           const app = apps.find(a => a.tid === x.tid), ch = applyChance(G, x), hint = applyHint(ch);           const offer = vOffers.find(o => o.tid === x.tid);           let act;           if (x.blocked) act = `<span class="hint">The board won't take you back right now.</span>`;           else if (offer) act = `<button class="btn sm" data-vgo="1">View your offer</button>`;           else if (app && app.status === 'pending') act = `<span class="vpill">Application sent</span><span class="hint">Answer after the next matchday.</span>`;           else if (x.rejectedMe || (app && app.status === 'rejected')) act = `<span class="vpill sacked">Turned you down</span>`;           else act = `<button class="btn sm" data-vapply="${x.tid}">Apply</button>`;           return `<div class="vcard"><div class="vh">${crestHTML(ct, 34)}<div><b>${esc(ct.n)}</b><small>${TIER_SHORT[ct.tier]} · ${ordinal(pos)} · ${rr.pts} pts · squad ${teamOverall(ct)} · budget ${money(ct.budget)}</small></div>               <div class="vw">${money(mgrWage(ct, G.jobless ? 0.95 : 1.05))}<small>a season</small></div></div>             <div class="vr"><span class="vpill ${x.kind}">${x.kind === 'sacked' ? 'Manager sacked' : x.kind === 'resigned' ? 'Manager resigned' : x.kind === 'left' ? 'Manager left' : x.kind === 'health' ? 'Health reasons' : x.kind === 'mutual' ? 'Mutual consent' : x.kind === 'retired' ? 'Retired' : 'Contract ended'}</span> ${esc(x.text)}</div>             <div class="vm"><span>Target: <b>top ${boardTargetFor(ct)}</b></span><span>Open for <b>${Math.max(0, (G.curDay || 0) - x.day)} days</b></span><span class="vhint" style="color:${hint[1]}">${x.blocked ? '' : hint[0]}</span></div>             <div class="va">${act}</div></div>`;         }).join('') : `<div class="panel"><div class="empty">No clubs are looking for a manager in this league at the moment.</div></div>`);     }   }   v.innerHTML = tabBar + body;   v.querySelectorAll('[data-mgt]').forEach(b => b.onclick = () => { mgrTab = b.dataset.mgt; viewManager(); window.scrollTo({ top: 0 }); });   const q = id => v.querySelector('#' + id);   if (q('mgInbox')) q('mgInbox').onclick = () => goTo('inbox');   if (q('mgGoVac')) q('mgGoVac').onclick = () => goSub('manager', 'vacancies');   v.querySelectorAll('[data-vt]').forEach(b => b.onclick = () => { vacTier = +b.dataset.vt; viewManager(); });   v.querySelectorAll('[data-vgo]').forEach(b => b.onclick = () => goSub('manager', 'offers'));   v.querySelectorAll('[data-vapply]').forEach(b => b.onclick = () => {     const tid = +b.dataset.vapply, ct = G.teams[tid];     const send = () => { const r = applyVacancy(G, tid); r.ok ? toast(r.msg) : toastWarn(r.msg); save(); viewManager(); };     if (G.jobless) { send(); return; }     openModal(`Apply to ${esc(ct.n)}?`, `<p style="margin:0;color:var(--dim)">You are under contract at ${esc(t.n)}. If ${esc(ct.n)} offer you the job and you accept, you will leave ${esc(t.n)}.</p>`,       `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="vApplyYes">Send application</button>`);     $('#vApplyYes').onclick = () => { closeModal(); send(); };   });   v.querySelectorAll('[data-mgrtake]').forEach(b => b.onclick = () => go(+b.dataset.mgrtake, mgrWage(G.teams[+b.dataset.mgrtake]), 2));   v.querySelectorAll('[data-vtake]').forEach(b => b.onclick = () => { const o = vOffers.find(x => x.tid === +b.dataset.vtake); go(o.tid, o.wage, o.years); });   if (q('mgrDeclineOffers')) q('mgrDeclineOffers').onclick = () => { G.pendingJobOffers = null; G.jobOffersSeen = false; mgrTab = 'profile'; save(); render(); };   if (q('mgrQuit')) q('mgrQuit').onclick = confirmQuit;   if (q('mgrResign')) q('mgrResign').onclick = openResignModal;   if (q('mgrExt')) q('mgrExt').onclick = () => jobNegotiation({ team: t, heading: 'Contract Extension', wage: m.renewal.wage, years: m.renewal.years, onChoice: (k, terms) => { if (k !== 'accept') return; signExtension(terms); toast('You signed a new contract.'); save(); render(); } });   if (q('mgrExtNo')) q('mgrExtNo').onclick = () => { m.renewal.status = 'refused'; toast('You turned down the extension.'); save(); viewManager(); };   if (q('mgrAsk')) q('mgrAsk').onclick = () => { m.renewal = null; const r = decideRenewal(G); toast(r.status === 'offered' ? 'The board have made you an offer.' : 'The board will not renew your contract.'); save(); viewManager(); };   if (q('mgrRecon')) q('mgrRecon').onclick = askBoardReconsider;   if (q('mgrAskEarly')) q('mgrAskEarly').onclick = () => {     m.lastAsk = G.season;     if (board >= 55 && G.round >= 6 && rnd() < 0.35 + (board - 55) / 100) {       m.renewal = { season: G.season, status: 'offered', wage: mgrWage(t, 1.1), years: 3 };       toast('The board are happy to talk about an extension.');       mail(G, { cat: 'career', from: 'Board of Directors', subject: 'Contract talks: early extension', body: [`The board at ${t.n} are willing to extend your contract. See Manager › Contract.`] });     } else toast('The board want to see more before they commit.');     save(); viewManager();   };   if (q('mgrRaise')) q('mgrRaise').onclick = () => {     const res = askForRaise(G);     if (!res.ok) { toast(res.msg); return; }     openContractOffer({       team: t, heading: 'New Contract', wage: res.wage, fixedYears: true, dateISO: dateForRound(G.round, G.season),       paragraphs: [`The board at ${esc(t.n)} have agreed to improve your terms.`, `The new deal is worth <b>${money(res.wage / 12)}</b> a month — <b>${money(res.wage)}</b> a season.`],       options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }], defaultKey: 'accept',       onChoice: (k) => {         if (k !== 'accept') return;         res.wage = (window.__ctrTerms && window.__ctrTerms.wage) || res.wage; G.manager.wage = res.wage;         news(G, 'career', `${G.manager.name} agrees a new deal at ${t.s} worth ${money(res.wage)} a season.`);         toast(`You're now on ${money(res.wage)} a season.`);         save(); render();       }     });   }; } function viewManagerV1() {   const v = $('#v-manager'), t = me(), m = G.manager;   v.classList.add('mmx', 'sqv');   const offers = G.pendingJobOffers || [];   const rep = m.rep || 40;   const repTier = rep < 35 ? 'Unknown' : rep < 50 ? 'Rising' : rep < 65 ? 'Established' : rep < 80 ? 'Respected' : 'Elite';   const hist = t.history || [];   const cur = (sortTable(G, t.tier).find(r => r.id === t.id)) || { w: 0, d: 0, l: 0 };   const W = hist.reduce((a, h) => a + h.w, 0) + cur.w, D = hist.reduce((a, h) => a + h.d, 0) + cur.d, L = hist.reduce((a, h) => a + h.l, 0) + cur.l, games = W + D + L;   const board = G.board != null ? G.board : 62;   const boardColor = board > 55 ? '#3ddc84' : board > 30 ? '#f2b928' : '#ff6b6b';   const tabs = [['profile', 'Profile'], ['contract', 'Contract'], ['career', 'Career'], ['offers', 'Job offers' + (offers.length ? `<i class="mb-red">${offers.length}</i>` : '')]];   const tabBar = `<div class="mb-tabs sqtabs">${tabs.map(([k, l]) => `<button data-mgt="${k}" class="${mgrTab === k ? 'on' : ''}">${l}</button>`).join('')}     <span class="sp"></span><button class="mini" id="mgInbox">Inbox</button></div>`;   const clubs = (m.clubs || []).map((c, i) => {     const nextFrom = (m.clubs[i + 1] && m.clubs[i + 1].from) || seasonLabel(G.season);     return `<tr><td><span class="team">${crestHTML(G.teams[c.id], 16)}<span>${esc(G.teams[c.id].n)}</span></span></td><td>${seasonLabel(c.from)} – ${i === m.clubs.length - 1 ? 'present' : seasonLabel(nextFrom)}</td></tr>`;   }).join('');   let body = '';   if (mgrTab === 'profile') {     body = `<div class="mprof mgr"><div class="mface">${avatarSVG(m.avatar, 64)}</div>         <div><div class="mname">${esc(m.name)} ${flagSVG(m.nat || 'ZA')}</div>           <div class="mclub"><em>Manager</em>${crestHTML(t, 16)} ${esc(t.n)}</div>           <div class="bar" style="margin:8px 0 3px"><i style="width:${rep}%"></i></div>           <div class="mpot">Reputation ${rep}/100 · ${repTier} · ${esc(natName(m.nat || 'ZA'))}</div><div class="mpot">Age ${mgrAgeOn(m.dob, currentDateISO())} · born ${esc(m.dob || '')}</div></div>         <div class="mstats"><div><small>Seasons</small><b>${m.seasons || 0}</b></div><div><small>Trophies</small><b>${m.trophies || 0}</b></div>           <div><small>Wage</small><b>${money(m.wage || 0)}</b></div><div><small>Earnings</small><b>${money(m.careerEarnings || 0)}</b></div></div></div>${mgrAwardsHTML(m)}` +       sqTiles([['Played', games || '—'], ['Wins', games ? W : '—', '#3ddc84'], ['Draws', games ? D : '—'], ['Losses', games ? L : '—', games && L > W ? '#ff6b6b' : null],         ['Win rate', games ? Math.round(W / games * 100) + '%' : '—']]) +       `<div class="panel"><h3>Board confidence<span class="sub" style="color:${boardColor};font-weight:700">${Math.round(board)}/100</span></h3><div class="pad">         <div class="bar"><i style="width:${board}%;background:${boardColor}"></i></div>         <p class="hint" style="margin:8px 0 0">${board > 55 ? 'The board are happy with how things are going.' : board > 30 ? 'The board expect better next season.' : 'Your job is under real threat.'}</p></div></div>`;   } else if (mgrTab === 'contract') {     body = sqTiles([['Wage a season', money(m.wage || 0)], ['Per month', money((m.wage || 0) / 12)], ['Career earnings', money(m.careerEarnings || 0)]]) +       `<div class="panel"><h3>Contract talks<span class="sub">as manager, separate from the club's books</span></h3><div class="pad">         <button class="btn sm" id="mgrRaise">Ask the board for a rise</button>         <p class="hint" style="margin:8px 0 0">Better odds when you're overperforming your target league position.</p></div></div>`;   } else if (mgrTab === 'career') {     body = sqTiles([['Clubs managed', (m.clubs || []).length || 1], ['Seasons', m.seasons || 0], ['Trophies', m.trophies || 0]]) + mgrAwardsHTML(m) +       `<div class="panel"><h3>Career history</h3>${clubs ? `<table class="tbl"><thead><tr><th>Club</th><th>Spell</th></tr></thead><tbody>${clubs}</tbody></table>` : '<div class="empty">Just getting started.</div>'}</div>`;   } else {     body = (offers.length ? `<div class="panel"><h3>Job offers<span class="sub">${offers.length === 1 ? 'A club wants' : 'Clubs want'} to talk</span></h3>       ${offers.map(o => { const ot = G.teams[o.id]; return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(ot, 26)}         <span class="who"><b>${esc(ot.n)}</b><small>${TIER_SHORT[ot.tier]} · squad rated ${teamOverall(ot)} · budget ${money(ot.budget)}</small></span>         <button class="btn sm" data-mgrtake="${ot.id}">Take the job</button></div>`; }).join('')}       <div class="pad" style="border-top:1px solid #2a3037"><button class="btn ghost sm" id="mgrDeclineOffers">Stay loyal to my team</button></div></div>`       : `<div class="panel"><h3>Job offers</h3><div class="empty">No clubs are calling right now. Good seasons bring offers.</div></div>`) +       `<div class="panel"><h3>Looking for a new challenge?</h3><div class="pad">         <button class="btn sm" id="mgrResign">Resign and talk to other clubs</button>         <p class="hint" style="margin:8px 0 14px">Tell the board why you want to leave. If another club wants you, you'll negotiate your next job on the spot.</p>         <button class="btn ghost sm" id="mgrQuit">Quit to main menu</button></div></div>`;   }   v.innerHTML = tabBar + body;   v.querySelectorAll('[data-mgt]').forEach(b => b.onclick = () => { mgrTab = b.dataset.mgt; viewManager(); window.scrollTo({ top: 0 }); });   const ib = $('#mgInbox'); if (ib) ib.onclick = () => goTo('inbox');   const r = $('#mgrRaise'); if (r) r.onclick = () => {     const res = askForRaise(G);     if (!res.ok) { toast(res.msg); return; }     const tt = G.teams[G.myTeam];     openContractOffer({       team: tt, heading: 'New Contract', wage: res.wage, fixedYears: true, dateISO: dateForRound(G.round, G.season),       paragraphs: [         `The board at ${esc(tt.n)} have agreed to improve your terms.`,         `The new deal is worth <b>${money(res.wage / 12)}</b> a month — <b>${money(res.wage)}</b> a season.`       ],       options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],       defaultKey: 'accept',       onChoice: (k) => {         if (k !== 'accept') return;         res.wage = (window.__ctrTerms && window.__ctrTerms.wage) || res.wage; G.manager.wage = res.wage;         news(G, 'career', `${G.manager.name} agrees a new deal at ${tt.s} worth ${money(res.wage)} a season.`);         toast(`You're now on ${money(res.wage)} a season.`);         save(); render();       }     });   };   const q = $('#mgrQuit'); if (q) q.onclick = confirmQuit;   const rs = $('#mgrResign'); if (rs) rs.onclick = openResignModal;   document.querySelectorAll('[data-mgrtake]').forEach(b => b.onclick = () => {     takeJob(G, +b.dataset.mgrtake);     G.board = 55; G.boardFired = false;     G.pendingJobOffers = null; G.jobOffersSeen = false;     tableTier = me().tier; statTier = Math.min(me().tier, 2);     toast(`You are the new manager of ${me().n}.`);     mgrTab = 'profile';     save(); render();   });   const dec = $('#mgrDeclineOffers'); if (dec) dec.onclick = () => { G.pendingJobOffers = null; G.jobOffersSeen = false; mgrTab = 'profile'; save(); render(); }; } function viewManagerOld() {
  const v = $('#v-manager'), t = me();
  const m = G.manager;
  const offers = G.pendingJobOffers || [];
  const offersHtml = offers.length ? `<div class="panel"><h3>Job offers<span class="sub">${offers.length === 1 ? 'A club wants' : 'Clubs want'} to talk</span></h3>
    ${offers.map(o => { const ot = G.teams[o.id]; return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(ot, 26)}
      <span class="who"><b>${esc(ot.n)}</b><small>${TIER_SHORT[ot.tier]} · squad rated ${teamOverall(ot)} · budget ${money(ot.budget)}</small></span>
      <button class="btn sm" data-mgrtake="${ot.id}">Take the job</button></div>`; }).join('')}
    <div class="pad" style="border-top:1px solid var(--line)"><button class="btn ghost sm" id="mgrDeclineOffers">Stay loyal to my team</button></div></div>` : '';
  const clubs = (m.clubs || []).map((c, i) => {
    const nextFrom = (m.clubs[i + 1] && m.clubs[i + 1].from) || seasonLabel(G.season);
    return `<tr><td>${esc(G.teams[c.id].n)}</td><td>${seasonLabel(c.from)} – ${i === m.clubs.length - 1 ? 'present' : seasonLabel(nextFrom)}</td></tr>`;
  }).join('');
  v.innerHTML = offersHtml + `<div class="panel"><h3>${esc(m.name)}<span class="sub">Manager · ${flagSVG(m.nat || 'ZA')} ${natName(m.nat || 'ZA')}</span></h3>
    <div class="pad" style="display:flex;gap:16px;align-items:center">
      ${avatarSVG(m.avatar, 96)}
      <dl class="kv" style="flex:1;padding:0">
        <dt>Reputation</dt><dd>${m.rep || 40}/100</dd>
        <dt>Seasons in charge</dt><dd>${m.seasons || 0}</dd>
        <dt>Trophies won</dt><dd>${m.trophies || 0}</dd>
        <dt>Current club</dt><dd>${esc(t.n)}</dd>
      </dl>
    </div></div>
  <div class="panel"><h3>Earnings<span class="sub">as manager, separate from the club's books</span></h3>
    <dl class="kv">
      <dt>Wage</dt><dd>${money(m.wage || 0)} a season <span class="hint">(${money((m.wage || 0) / 12)}/mo)</span></dd>
      <dt>Career earnings</dt><dd>${money(m.careerEarnings || 0)}</dd>
    </dl>
    <div class="pad" style="border-top:1px solid var(--line)">
      <button class="btn ghost sm" id="mgrRaise">Ask the board for a rise</button>
      <p class="hint" style="margin:8px 0 0">Better odds when you're overperforming your target league position.</p>
    </div></div>
  <div class="panel"><h3>Career history</h3>
    ${clubs ? `<table class="tbl"><thead><tr><th>Club</th><th>Spell</th></tr></thead><tbody>${clubs}</tbody></table>` : '<div class="empty">Just getting started.</div>'}</div>
<div class="panel"><h3>Looking for a new challenge?</h3>
    <div class="pad">
      <button class="btn sm" id="mgrResign">Resign and talk to other clubs</button>
      <p class="hint" style="margin:8px 0 14px">Tell the board why you want to leave — if another club wants you, you'll negotiate your next job on the spot.</p>
      <button class="btn ghost sm" id="mgrQuit">Quit to main menu</button>
    </div></div>`;
  const r = $('#mgrRaise'); if (r) r.onclick = () => {     const res = askForRaise(G);     if (!res.ok) { toast(res.msg); return; }     const t = G.teams[G.myTeam];     openContractOffer({       team: t, heading: 'New Contract', wage: res.wage, fixedYears: true, dateISO: dateForRound(G.round, G.season),       paragraphs: [         `The board at ${esc(t.n)} have agreed to improve your terms.`,         `The new deal is worth <b>${money(res.wage / 12)}</b> a month — <b>${money(res.wage)}</b> a season.`       ],       options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],       defaultKey: 'accept',       onChoice: (k) => {         if (k !== 'accept') return;         res.wage = (window.__ctrTerms && window.__ctrTerms.wage) || res.wage; G.manager.wage = res.wage;         news(G, 'career', `${G.manager.name} agrees a new deal at ${t.s} worth ${money(res.wage)} a season.`);         toast(`You're now on ${money(res.wage)} a season.`);         save(); render();       }     });   };
  const q = $('#mgrQuit'); if (q) q.onclick = confirmQuit;   const rs = $('#mgrResign'); if (rs) rs.onclick = openResignModal;
  document.querySelectorAll('[data-mgrtake]').forEach(b => b.onclick = () => {
    takeJob(G, +b.dataset.mgrtake);
    G.board = 55; G.boardFired = false;
    G.pendingJobOffers = null; G.jobOffersSeen = false;
    tableTier = me().tier; statTier = Math.min(me().tier, 2);
    toast(`You are the new manager of ${me().n}.`);
    save(); render();
  });
  const dec = $('#mgrDeclineOffers'); if (dec) dec.onclick = () => { G.pendingJobOffers = null; G.jobOffersSeen = false; save(); render(); };
}

/* ---------------- other clubs ---------------- */
let ocTier = 0, ocPick = null;
let cityMapView = 'map'; const SA_OUTLINE = [[-28.8,16.5],[-29.9,17.2],[-31.6,18.2],[-32.8,18.1],[-33.9,18.4],[-34.4,18.8],[-34.8,20.0],[-34.2,22.1],[-33.9,25.6],[-33.0,27.9],[-31.6,29.4],[-30.9,30.4],[-29.9,31.0],[-28.8,32.1],[-27.5,32.7],[-26.8,32.0],[-25.4,31.9],[-24.0,31.3],[-22.3,31.0],[-22.2,29.4],[-22.6,27.7],[-24.8,26.4],[-25.8,22.5],[-26.9,20.6],[-28.0,20.0]]; const CITY_COORDS = {   'Pretoria':[-25.75,28.19],'Tshwane':[-25.75,28.19],'Johannesburg':[-26.20,28.05],'Joburg':[-26.20,28.05],'Soweto':[-26.27,27.86],'Sandton':[-26.11,28.06],'Alexandra':[-26.10,28.10],'Tembisa':[-25.99,28.23],'Diepsloot':[-25.93,28.01],'Ekurhuleni':[-26.16,28.23],'Katlehong':[-26.35,28.14],'Soshanguve':[-25.53,28.11],'Mamelodi':[-25.71,28.37],'Vereeniging':[-26.67,27.93],'Sebokeng':[-26.57,27.83],'Duduza':[-26.37,28.55],'Secunda':[-26.52,29.17],'Standerton':[-26.93,29.25],   'Durban':[-29.86,31.02],'Pietermaritzburg':[-29.60,30.38],'Richards Bay':[-28.78,32.04],'Empangeni':[-28.75,31.89],'Tongaat':[-29.56,31.13],'Pinetown':[-29.83,30.85],'Umlazi':[-29.96,30.88],'Newcastle':[-27.76,29.93],'Ladysmith':[-28.56,29.78],'Greytown':[-29.06,30.59],'Emsinga':[-28.75,30.43],   'Mvezo':[-31.90,28.80],'Mthatha':[-31.59,28.78],'Komani':[-31.90,26.87],'Makhanda':[-33.31,26.53],'East London':[-33.02,27.91],'Gqeberha':[-33.96,25.60],'Graaff-Reinet':[-32.25,24.53],'Beaufort West':[-32.36,22.58],'Bizana':[-30.87,29.85],'Zwelitsha':[-32.78,27.35],   'Cape Town':[-33.92,18.42],'Khayelitsha':[-34.05,18.67],'Stellenbosch':[-33.93,18.86],'Paarl':[-33.73,18.97],'Worcester':[-33.64,19.45],'George':[-33.96,22.46],   'Mbombela':[-25.47,30.98],'Giyani':[-23.30,30.72],'Thohoyandou':[-22.95,30.48],'Tzaneen':[-23.83,30.16],'Polokwane':[-23.90,29.45],'Ga-Mphahlele':[-24.18,29.45],'Musina':[-22.35,30.04],'Lephalale':[-23.67,27.70],'Seshego':[-23.85,29.40],'Limpopo':[-23.90,29.45],   'Bloemfontein':[-29.12,26.21],'Botshabelo':[-29.26,26.69],'Welkom':[-27.98,26.73],'Bethlehem':[-28.23,28.31],'Kroonstad':[-27.65,27.23],   'Kimberley':[-28.74,24.76],'Kathu':[-27.70,23.05],'Upington':[-28.45,21.26],'Kuruman':[-27.45,23.43],'De Aar':[-30.65,24.01],   'Rustenburg':[-25.67,27.24],'Potchefstroom':[-26.72,27.10],'Klerksdorp':[-26.87,26.67],'Mahikeng':[-25.87,25.64],'Mmabatho':[-25.85,25.62],   'eMalahleni':[-25.87,29.23] }; function geoXY(lat, lon, W, H) {   const LON_MIN = 16, LON_MAX = 33, LAT_N = -22, LAT_S = -35;   return [(lon - LON_MIN) / (LON_MAX - LON_MIN) * W, (lat - LAT_N) / (LAT_S - LAT_N) * H]; } function viewCities() {   const v = $('#v-cities'); v.classList.add('mmx');   const teams = (G && G.teams && G.teams.length) ? G.teams : CLUBS;   const byCity = {};   teams.forEach(t => { const city = (t.city && t.city.trim()) || 'Unknown'; (byCity[city] = byCity[city] || []).push(t); });   const cities = Object.keys(byCity).map(city => {     const clubs = byCity[city].slice().sort((a, b) => (a.tier || 0) - (b.tier || 0) || a.n.localeCompare(b.n));     return { city, clubs };   }).sort((a, b) => b.clubs.length - a.clubs.length || a.city.localeCompare(b.city));   const namedCount = teams.filter(t => (t.n || '').toLowerCase().includes((t.city || '§').toLowerCase())).length;   const tiles = sqTiles([     ['Cities represented', cities.length],     ['Clubs total', teams.length],     ['Biggest hub', cities[0] ? esc(cities[0].city) + ' · ' + cities[0].clubs.length : '—'],     ['Named after their city', namedCount + ' of ' + teams.length]   ]);   const tabBar = `<div class="mb-tabs sqtabs"><button data-cmv="map" class="${cityMapView === 'map' ? 'on' : ''}">Map</button><button data-cmv="list" class="${cityMapView === 'list' ? 'on' : ''}">List</button></div>`;   const cityRowHTML = d => d.clubs.map(t => {     const namedAfterCity = (t.n || '').toLowerCase().includes(d.city.toLowerCase());     const youTag = (G && t.id === G.myTeam) ? ' <span class="tag xi">YOU</span>' : '';     return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line)">${crestHTML(t, 22)}<div><b>${esc(t.n)}</b><div class="hint">${esc(TIER_SHORT[t.tier])}${namedAfterCity ? ' · named after its city' : ''}</div></div>${youTag}</div>`;   }).join('');    let body = '', clusters = [];   if (cityMapView === 'map') {     const W = 320, H = 300;     const outlinePts = SA_OUTLINE.map(([lat, lon]) => geoXY(lat, lon, W, H).map(n => n.toFixed(1)).join(',')).join(' ');     const pts = cities.map(d => {       const coord = CITY_COORDS[d.city] || [-29, 25];       const [x, y] = geoXY(coord[0], coord[1], W, H);       return { d, x, y };     });     pts.forEach(p => {       let c = clusters.find(c => Math.hypot(c.x - p.x, c.y - p.y) < 13);       if (c) { c.x = (c.x * c.n + p.x) / (c.n + 1); c.y = (c.y * c.n + p.y) / (c.n + 1); c.n++; c.items.push(p.d); }       else clusters.push({ x: p.x, y: p.y, n: 1, items: [p.d] });     });     const dots = clusters.map((c, idx) => {       const total = c.items.reduce((s, d) => s + d.clubs.length, 0);       const r = 4 + Math.sqrt(total) * 2.4;       const label = c.items.length === 1 ? c.items[0].city : c.items[0].city + ' area';       const showLabel = total >= 3 || c.items.length > 1;       return `<g class="cityDot" data-cl="${idx}" style="cursor:pointer">         <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${(r + 5).toFixed(1)}" fill="transparent"/>         <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r.toFixed(1)}" fill="var(--gold)" fill-opacity="0.88" stroke="#14110a" stroke-width="0.8"/>         <text x="${c.x.toFixed(1)}" y="${(c.y + r * 0.34).toFixed(1)}" font-size="${r > 7 ? 8.5 : 7}" text-anchor="middle" fill="#14110a" font-weight="800" style="pointer-events:none">${total}</text>         ${showLabel ? `<text x="${c.x.toFixed(1)}" y="${(c.y - r - 3).toFixed(1)}" font-size="7.5" text-anchor="middle" fill="var(--ink)" style="pointer-events:none">${esc(label)}</text>` : ''}       </g>`;     }).join('');     body = `<div class="panel tbl-google"><h3>South Africa<span class="sub">tap a marker to see who's based there</span></h3>       <div class="pad" style="overflow:auto">         <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block;margin:0 auto;background:radial-gradient(120% 100% at 50% 0%, rgba(242,185,40,.08), transparent 60%)">           <polygon points="${outlinePts}" fill="var(--panel2)" stroke="var(--gold)" stroke-width="1.3" opacity="0.92"/>           ${dots}         </svg>       </div>       <p class="hint" style="padding:0 13px 12px;margin:0">Marker size and number show how many clubs are based there. Nearby towns are grouped into one marker; position is approximate.</p>     </div>`;   } else {     const rows = cities.map(d => `<tr><td style="white-space:nowrap"><b>${esc(d.city)}</b></td><td class="pos">${d.clubs.length}</td><td>${cityRowHTML(d)}</td></tr>`).join('');     body = `<div class="panel tbl-google"><h3>Club cities<span class="sub">every club, grouped by where it's based</span></h3>       <div class="cf-wrap"><table class="gtable"><thead><tr><th>City</th><th class="pos">Clubs</th><th>Who's based there</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;   }    v.innerHTML = tiles + tabBar + body;   v.querySelectorAll('[data-cmv]').forEach(b => b.onclick = () => { cityMapView = b.dataset.cmv; viewCities(); });   v.querySelectorAll('[data-cl]').forEach(g => g.onclick = () => {     const c = clusters[+g.dataset.cl];     const inner = c.items.map(d => `<h4 style="margin:10px 0 2px;font-family:var(--head);font-size:14px">${esc(d.city)}<span class="hint" style="font-weight:400"> · ${d.clubs.length} club${d.clubs.length === 1 ? '' : 's'}</span></h4>${cityRowHTML(d)}`).join('');     const total = c.items.reduce((s, d) => s + d.clubs.length, 0);     openModal(c.items.length === 1 ? esc(c.items[0].city) : `${c.items.length} towns · ${total} clubs`, inner, '<button class="btn ghost sm" onclick="closeModal()">Close</button>');   }); } function viewOtherClubs() {
  const v = $('#v-otherclubs');
  v.classList.add('mmx');
  const list = CLUBS.map((c, i) => ({ c, i })).filter(x => x.c.t === ocTier && x.i !== G.myTeam);
  let html = `<div class="panel"><h3>Other clubs<span class="sub">browse squads, make transfer or loan offers</span></h3>
    <div class="chip">${TIER_SHORT.map((n, i) => `<button class="chip" data-oct="${i}" aria-pressed="${ocTier === i}">${esc(n)}</button>`).join('')}</div>
    <div class="pad" style="display:flex;flex-wrap:wrap;gap:8px">
      ${list.map(x => `<button class="chip" data-ocpick="${x.i}" aria-pressed="${ocPick === x.i}">${crestHTML(G.teams[x.i], 15)} ${esc(x.c.s)}</button>`).join('')}
    </div></div>`;
  if (ocPick != null && G.teams[ocPick]) {
    const ot = G.teams[ocPick];
    const sq = ot.squad.slice().sort((a, b) => b.rating - a.rating);
const fit = jobFitLabel(jobFitChance(G, ot));
    html += `<div class="panel"><h3>${esc(ot.n)}<span class="sub">${TIER_NAMES[ot.tier]} · ${esc(ot.city)} · XI rated ${teamOverall(ot)} · budget ${money(ot.budget)}</span></h3>
    <div class="pad" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <span class="chip ${fit.cls}">${esc(fit.txt)}</span>
      <button class="btn sm" data-apply="${ot.id}">Apply for this job</button>
    </div>
    <div class="kits">
      <div class="kitBigWrap">${bigKitSVG(ot, false, 132)}<div class="kitBigBadge">${crestHTML(ot, 26)}</div>${ot.currentSponsor ? `<div class="kitBigSponsor">${esc(ot.currentSponsor.name).toUpperCase()}</div>` : ''}<small>Home</small></div>
      <div class="kitBigWrap">${bigKitSVG(ot, true, 132)}<div class="kitBigBadge">${crestHTML(ot, 26)}</div>${ot.currentSponsor ? `<div class="kitBigSponsor">${esc(ot.currentSponsor.name).toUpperCase()}</div>` : ''}<small>Away</small></div>
      <div class="kit" style="align-self:center">${crestHTML(ot, 56)}<small>Badge</small></div>
    </div>
      ${sq.map(p => playerRow(p, ot)).join('')}</div>`;
  }
  v.innerHTML = html;
  v.querySelectorAll('[data-oct]').forEach(b => b.onclick = () => { ocTier = +b.dataset.oct; ocPick = null; viewOtherClubs(); });
  v.querySelectorAll('[data-ocpick]').forEach(b => b.onclick = () => { ocPick = +b.dataset.ocpick; viewOtherClubs(); });
v.querySelectorAll('[data-apply]').forEach(b => b.onclick = () => {
    const res = applyForJob(G, +b.dataset.apply);
    save();
    if (!res.ok) { toast(res.msg); viewOtherClubs(); return; }
    const t = G.teams[res.id];
    openContractOffer({
      team: t, heading: 'Contract Offer', dateISO: dateForRound(G.round, G.season),
      paragraphs: [
        `${esc(t.n)} appoint you as their new Head Coach.`,
        `The deal is worth <b>${money(res.wage / 12)}</b> a month — <b>${money(res.wage)}</b> a season.`
      ],
      options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],
      defaultKey: 'accept',
      onChoice: (k) => {
        if (k === 'accept') {
          takeJob(G, res.id, res.wage);
          tableTier = me().tier; statTier = me().tier; ocPick = null; save();
          toast(res.msg);
        }
        render(); viewOtherClubs();
      }
    });
  });
  bindPlayerRows(v);
}

/* ---------------- create a club (landing) ---------------- */
let lccName = '',  lccCity = '', lccTier = 4, lccC1 = '#D8B039', lccC2 = '#111111', lccIcon = 'ball', lccShape = 'shield';
function renderLandingCreateClub() {
  const prev = $('#lccPreview'); if (!prev) return;
  const preview = { s: (lccName || 'Your Club').slice(0, 3).toUpperCase(), n: lccName || 'Your Club', c1: lccC1, c2: lccC2, icon: lccIcon, shape: lccShape };
  prev.innerHTML = crestCustomHTML(preview, 64);
  const iconBar = $('#lccIconBar');
  if (iconBar) {
    iconBar.innerHTML = CC_ICONS.map(i => `<button class="chip" data-licon="${i}" aria-pressed="${lccIcon === i}" style="display:flex;align-items:center;gap:5px">${crestCustomHTML({ ...preview, icon: i }, 18)}${i}</button>`).join('');
    iconBar.querySelectorAll('[data-licon]').forEach(b => b.onclick = () => { lccIcon = b.dataset.licon; renderLandingCreateClub(); });
  }
  const shapeBar = $('#lccShapeBar');
  if (shapeBar) {
    shapeBar.innerHTML = ['shield', 'circle', 'diamond'].map(s => `<button class="chip" data-lshape="${s}" aria-pressed="${lccShape === s}">${s}</button>`).join('');
    shapeBar.querySelectorAll('[data-lshape]').forEach(b => b.onclick = () => { lccShape = b.dataset.lshape; renderLandingCreateClub(); });
  }
  const tierBar = $('#lccTierBar');
  if (tierBar) {
    tierBar.innerHTML = [2, 3, 4].map(tr => `<button class="chip" data-ltier="${tr}" aria-pressed="${lccTier === tr}">${TIER_SHORT[tr]}</button>`).join('');
    tierBar.querySelectorAll('[data-ltier]').forEach(b => b.onclick = () => { lccTier = +b.dataset.ltier; renderLandingCreateClub(); });
  }
}
const lccNameI = $('#lccNameI'), lccCityI = $('#lccCityI'), lccC1I = $('#lccC1I'), lccC2I = $('#lccC2I'), lccGoBtn = $('#lccGoBtn');
if (lccNameI) lccNameI.oninput = e => { lccName = e.target.value; renderLandingCreateClub(); };
if (lccCityI) lccCityI.oninput = e => { lccCity = e.target.value; };
if (lccC1I) lccC1I.oninput = e => { lccC1 = e.target.value; renderLandingCreateClub(); };
if (lccC2I) lccC2I.oninput = e => { lccC2 = e.target.value; renderLandingCreateClub(); };
if (lccGoBtn) lccGoBtn.onclick = () => {
  if (lccName.trim().length < 2) {     openModal('Club name needed', '<p style="margin:0">Give your new club a name (at least 2 characters) before you start your career.</p>', '<button class="btn sm" id="lccNameOk">OK</button>');     $('#lccNameOk').onclick = () => { closeModal(); if (lccNameI) lccNameI.focus(); };     return;   }
  const nm = ($('#mgrName').value || '').trim() || 'Coach';
  const nat = ($('#mgrNat') && $('#mgrNat').value) || 'ZA';
  const dob = ($('#mgrDob') && $('#mgrDob').value) || '1988-06-15';
  if (slotInfo(slot)) slot = firstFreeSlot();
G = newGame(pickClub != null ? pickClub : Math.max(0, CLUBS.findIndex(c => c.t === lccTier)), { name: nm, avatar: pickAvatar, nat, dob });
  const idx = foundClub(G, { name: lccName.trim(), city: lccCity.trim() || 'Mzansi', tier: lccTier, c1: lccC1, c2: lccC2, icon: lccIcon, shape: lccShape });
  G.myTeam = idx;
  const t = G.teams[idx];
  openContractOfferOld({
    team: t, heading: 'Contract Offer', mgrName: nm, dateISO: new Date().toISOString().slice(0, 10),
    paragraphs: [
      `The club's board — which, as founder, is you — formally appoints you <b>Head Coach</b> of <b>${esc(t.n)}</b>.`,
      `You will be taking charge in the ${esc(TIER_NAMES[t.tier])}.`
    ],
    options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],
    defaultKey: 'accept',
    onChoice: (k) => {
      if (k !== 'accept') { G = null; return; } setTimeout(() => { try { showSponsors(); } catch (e) { } }, 1500);
      enterApp(); save();
      toast(`Welcome to ${G.teams[idx].n}.`);
    }
  });
};
renderLandingCreateClub();
