/* Nandi: your personal assistant. Loaded after the game scripts. */
(function () {
  'use strict';
  const IMG = 'img/nandi/';
  const K = { intro: 'mm_nandi_intro_v1', p2: 'mm_nandi_p2_v1', mem: 'mm_nandi_mem_v1' };
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } } };
  const g = () => (typeof G !== 'undefined' ? G : null);
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  let mem = {}; try { mem = JSON.parse(ls.get(K.mem) || '{}'); } catch (e) { mem = {}; }
  /* a line she hasn't just used: remembers the last choice for each key */
  function say(key, arr, vars) {
    let i = rnd(arr.length); if (arr.length > 1 && i === mem[key]) i = (i + 1 + rnd(arr.length - 1)) % arr.length;
    mem[key] = i; ls.set(K.mem, JSON.stringify(mem));
    return fmt(arr[i], vars);
  }
  function fmt(s, v) { return String(s).replace(/\{(\w+)\}/g, (m, k) => (v && v[k] != null ? v[k] : m)); }
  const esc2 = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const hello = () => pick(['Hi', 'Hello', 'Sawubona', 'Heita', 'Molo', 'Dumela', 'Hey']);

  /* which outfit: the guide is always the first picture, everything else rotates by the day in the game */
  const OUTFITS = { alert: [2, 4, 5, 6], seasonEnd: [3, 5, 6, 2], seasonStart: [4, 5, 3, 6], tab: [1, 2, 3, 4, 5, 6], qa: [6, 3, 5, 2] };
  function outfitFor(kind) {
    const k = String(kind).replace(/\d+$/, ''), arr = OUTFITS[k] || [1, 2, 3, 4, 5, 6], G_ = g();
    let h = G_ ? ((G_.curDay || 0) + (G_.season || 0) * 7 + (G_.round || 0)) : new Date().getDate();
    for (const c of String(kind)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return arr[h % arr.length];
  }

  /* ---------- look ---------- */
  function css() {
    if (document.getElementById('ndCss')) return;
    const st = document.createElement('style'); st.id = 'ndCss';
    st.textContent = `
    .ndWrap{position:fixed;z-index:2300;left:0;right:0;transition:opacity .18s}
    .ndWrap.out{opacity:0}
    .ndModal{inset:0;display:grid;place-items:center;background:rgba(2,4,8,.78);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);padding:10px}
    .ndDock{bottom:calc(env(safe-area-inset-bottom,0px) + 70px);display:flex;justify-content:center;pointer-events:none;padding:0 10px}
    .ndCard{position:relative;display:flex;align-items:flex-end;width:min(740px,100%);pointer-events:auto;animation:ndIn .38s cubic-bezier(.2,.9,.3,1.12)}
    @keyframes ndIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}
    .ndPic{height:min(250px,46vh);width:auto;flex:none;margin-right:-20px;margin-bottom:-3px;position:relative;z-index:2;filter:drop-shadow(0 8px 16px rgba(0,0,0,.6));animation:ndFloat 4s ease-in-out infinite;transform-origin:50% 100%}
    @keyframes ndFloat{0%,100%{transform:translateY(0) rotate(-.6deg)}50%{transform:translateY(-3px) rotate(.6deg)}}
    .ndBubble{position:relative;flex:1;min-width:0;background:linear-gradient(180deg,#27303c,#1a2029);border:2px solid #f2b928;border-radius:14px 14px 14px 4px;padding:12px 14px 12px 28px;color:#eef1f4;box-shadow:0 0 0 5px rgba(242,185,40,.12),0 14px 40px rgba(0,0,0,.65);margin-bottom:6px}
    .ndName{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font:700 15px var(--head,sans-serif);letter-spacing:.06em;text-transform:uppercase;color:#f2b928}
    .ndName small{font:600 10.5px var(--body,sans-serif);letter-spacing:.08em;color:#9aa3ad}
    .ndText{font-size:14.5px;line-height:1.5;max-height:min(36vh,210px);overflow:auto;-webkit-overflow-scrolling:touch}
    .ndModal .ndText{max-height:min(58vh,400px)}
    .ndText p{margin:0 0 7px}.ndText p:last-child{margin-bottom:0}
    .ndText b{color:#fff}.ndText em{color:#f2b928;font-style:normal}
    .ndText ul{margin:4px 0 0;padding-left:18px}.ndText li{margin:2px 0}
    .ndBtns{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:10px}
    .ndStep{font-size:11px;color:#8f98a2;margin-right:auto;align-self:center}
    .ndHL{scroll-margin-top:96px;outline:3px solid #f2b928!important;outline-offset:3px;border-radius:8px;animation:ndPulse 1.3s ease-in-out infinite;position:relative;z-index:5}
    @keyframes ndPulse{0%,100%{box-shadow:0 0 0 0 rgba(242,185,40,.55)}50%{box-shadow:0 0 0 10px rgba(242,185,40,0)}}
    @media (max-height:480px){.ndModal .ndText{max-height:min(46vh,150px)}.ndPic{height:min(170px,60vh);margin-right:-14px}.ndBubble{padding:8px 10px 8px 22px}.ndText{font-size:13px;max-height:min(40vh,130px)}.ndDock{bottom:calc(env(safe-area-inset-bottom,0px) + 54px)}.ndName{font-size:13px;margin-bottom:2px}.ndBtns{margin-top:6px}}
    @media (max-width:520px) and (min-height:481px){.ndPic{height:150px;margin-right:-12px}.ndBubble{padding-left:20px}}
    .ndTab .ndHero{display:flex;align-items:flex-end;gap:0;padding:12px 14px 0}
    .ndTab .ndHero img{height:190px;margin-right:-14px;position:relative;z-index:2;filter:drop-shadow(0 6px 12px rgba(0,0,0,.5))}
    .ndTab .ndHero .ndBubble{margin-bottom:10px}
    .ndChips{display:flex;gap:6px;flex-wrap:wrap;padding:6px 14px 2px}
    .ndQ{display:block;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.07);color:#e6e9ed;padding:10px 14px;font:inherit;cursor:pointer}
    .ndQ:hover,.ndQ:focus{background:rgba(242,185,40,.1);outline:none}
    .ndQ small{display:block;color:#8f98a2;font-size:11px;margin-top:1px}
    .ndSearch{width:calc(100% - 28px);margin:8px 14px;box-sizing:border-box;background:var(--panel2,#11161c);border:1px solid var(--line,#2f3a46);border-radius:6px;color:inherit;padding:9px 10px;font-size:15px}
    `;
    document.head.appendChild(st);
  }

  /* ---------- the speech card ---------- */
  let cur = null, hlEl = null;
  function clearHL() { if (hlEl) { hlEl.classList.remove('ndHL'); hlEl = null; } }
  function visible(e) { return e && e.offsetParent !== null; }
  function hl(target) {
    clearHL(); if (!target) return;
    const e = typeof target === 'function' ? target() : document.querySelector(target);
    if (!visible(e)) return;
    hlEl = e; e.classList.add('ndHL');
    try { e.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' }); } catch (x) { }
  }
  function close(silent) {
    if (!cur) return; const c = cur; cur = null; clearHL();
    c.el.classList.add('out'); setTimeout(() => c.el.remove(), 200);
    if (!silent && c.onClose) c.onClose();
  }
  function show(o) {
    css(); if (cur) { const old = cur; cur = null; old.el.remove(); }
    const el = document.createElement('div'); el.className = 'ndWrap ' + (o.mode === 'dock' ? 'ndDock' : 'ndModal');
    const btns = (o.buttons || []).map((b, i) => `<button class="btn ${b.ghost ? 'ghost ' : ''}sm" data-nd="${i}">${b.label}</button>`).join('');
    el.innerHTML = `<div class="ndCard"><img class="ndPic" alt="Nandi" src="${IMG}nandi${o.outfit || 1}.webp" onerror="this.style.display='none'"><div class="ndBubble"><div class="ndName">Nandi<small>Personal assistant</small></div><div class="ndText">${o.html}</div><div class="ndBtns">${o.step ? `<span class="ndStep">${o.step}</span>` : ''}${btns}</div></div></div>`;
    document.body.appendChild(el);
    cur = { el, onClose: o.onClose };
    el.querySelectorAll('[data-nd]').forEach(b => b.onclick = () => { const f = o.buttons[+b.dataset.nd].fn; close(true); f && f(); });
    if (o.mode !== 'dock') el.onclick = e => { if (e.target === el && o.dismiss !== false) close(); };
    return cur;
  }
  /* a short walk-through: each step can move to a screen and point at something */
  function walk(steps, o) {
    let i = 0; const total = steps.length;
    const finish = skipped => { close(true); clearHL(); if (o.done) o.done(skipped); };
    const go = () => {
      const s = steps[i]; if (s.before) { try { s.before(); } catch (e) { } }
      setTimeout(() => {
        const last = i === total - 1;
        hl(s.target);
        const btns = [{ label: 'Skip', ghost: true, fn: () => finish(true) }];
        if (last && o.extra) btns.push(o.extra);
        btns.push({ label: last ? (o.lastLabel || 'Finish') : 'Next', fn: () => { if (last) finish(false); else { i++; go(); } } });
        show({ mode: 'dock', outfit: o.outfit || 1, html: typeof s.text === 'function' ? s.text() : s.text, buttons: btns, step: (i + 1) + ' / ' + total });
      }, s.delay != null ? s.delay : 160);
    };
    go();
  }

  /* ---------- the guide ---------- */
  const club = () => { const G_ = g(); try { return G_ && me() ? me().n : 'your club'; } catch (e) { return 'your club'; } };
  const startStep = re => () => { const els = [...document.querySelectorAll('#start .step')]; return els.find(e => re.test((e.textContent || '').slice(0, 70))) || null; };
  const navTo = id => { try { goTo(id); } catch (e) { } };
  const navBtn = id => () => document.querySelector('[data-tab="' + id + '"]');

  /* part 1: team selection */
  let introRunning = false;
  function guide1() {
    if (cur || ls.get(K.intro) === '1') { introRunning = false; return; }
    const intro = [
      '<p><b>{hi}!</b> My name is <em>Nandi</em> and I\'m your personal assistant. I\'m going to show you around.</p><p>If you\'ve been here before, you can skip me. No hard feelings, I\'ll be around.</p>',
      '<p><b>{hi}!</b> I\'m <em>Nandi</em>, your personal assistant. Think of me as the person who knows where everything is, and who reminds you when the board is losing patience.</p><p>First time here? Press Next. Been before? You can skip.</p>',
      '<p><b>{hi}, boss!</b> <em>Nandi</em> here. I\'m your personal assistant, and my first job is to show you around.</p><p>Short tour, I promise. Experienced? Skip me.</p>'
    ];
    const steps = [
      { text: say('intro', intro, { hi: hello() }), target: null },
      { text: say('p1a', ['<p>First, <b>who are you</b>? Your name, where you\'re from, your birthday and a face. It all goes on your manager profile and the honours board.</p>', '<p>Let\'s start with <b>you</b>. A name, a nationality, a birthday and a face. Don\'t overthink the photo, nobody gets sacked for it.</p>']), target: startStep(/who are you/i) },
      { text: say('p1b', ['<p>Now the big decision: <b>choose your club</b>. 100 clubs across five divisions. Top clubs have the money and the pressure. Smaller clubs mean a long climb and a bigger story.</p>', '<p>This is where it gets real. <b>Pick a club.</b> Use the division filters to browse. Big clubs come with big expectations. The 5th Division is hard work, but nothing beats a promotion from there.</p>']), target: startStep(/choose your club/i) },
      { text: say('p1c', ['<p>Feeling brave? You can <b>found your own club</b> and build it from nothing: name, colours, the lot.</p>', '<p>Don\'t see a club you love? <b>Create your own</b> and start from the bottom. I\'ll be taking notes.</p>']), target: startStep(/create your own/i) },
      { text: say('p1d', ['<p>Played before? Your <b>saved careers</b> are here. Load one and I\'ll leave you in peace.</p>', '<p>Got a career on the go? It\'s under <b>saved careers</b>. Pick it up where you left off.</p>']), target: startStep(/saved careers|your careers|continue/i) },
      { text: say('p1e', ['<p>When you\'re ready, hit <b>Start career</b>. I\'ll meet you inside and show you your new office.</p>', '<p>All set? Press <b>Start career</b>. I\'ll be waiting in your office.</p>']), target: () => document.querySelector('#start .startbar') }
    ];
    walk(steps, { outfit: 1, lastLabel: 'Got it', done: skipped => { introRunning = false; ls.set(K.intro, '1'); if (skipped) { ls.set(K.p2, '1'); farewell(); } } });
  }
  function farewell() {
    try { toast(say('bye', ['No problem. Find me in the Nandi tab if you need me.', 'All good. I\'m in the Nandi tab whenever you want the tour.', 'Okay! Open the Nandi tab anytime. I don\'t go anywhere.'])); } catch (e) { }
  }

  /* part 2: inside the game */
  function guide2() {
    const G_ = g(); if (!G_ || cur) return;
    const c = club(), tier = (() => { try { return TIER_NAMES[me().tier]; } catch (e) { return ''; } })();
    const tabTo = (id, sub) => () => { navTo(id); if (sub) { try { goSub(id, sub); } catch (e) { } } };
    const steps = [
      { text: say('g2a', ['<p>Welcome to <b>{club}</b>! Right, quick tour of the building. Nothing too heavy.</p>', '<p>This is <b>{club}</b>, boss. {tier}. Let me walk you through where everything lives.</p>', '<p>Ooh, <b>{club}</b>. Okay. Let\'s get you settled in.</p>'], { club: esc2(c), tier: esc2(tier) }), target: null, before: tabTo('match') },
      { text: '<p>Up here is your dashboard: the <b>date</b>, your <b>team rating</b>, <b>league position</b>, <b>squad size</b> and <b>transfer budget</b>. The green pill shows whether the <b>transfer window</b> is open and for how long.</p>', target: 'header.top' },
      { text: '<p>This is the big one: <b>Continue</b>. It moves time forward day by day and stops when something needs you: a matchday, an offer for one of your players, a job offer, an important message. On match days it becomes <b>Play match</b>.</p>', target: '#contBtn' },
      { text: '<p>Your <b>inbox</b>. The board, agents, scouts and rival clubs all write here. Flagged messages matter. I\'ll also tap you on the shoulder when something big lands.</p>', target: navBtn('inbox'), before: tabTo('inbox') },
      { text: '<p><b>Board &amp; objectives</b>. The board sets targets each season: league finish, a cup run, finances and youth. Hit them and your confidence (and job security) grows. Miss them and I\'ll be the one telling you.</p>', target: navBtn('board'), before: tabTo('board') },
      { text: '<p>This is <b>you</b>: reputation, contract, career history, job offers and vacancies.</p>', target: navBtn('manager'), before: tabTo('manager', 'profile') },
      { text: '<p>Your <b>squad</b>. Tap any player for his profile: contract, stats, awards, international caps. You can move people to the reserves, name a captain, and have a word with anyone who\'s unhappy.</p>', target: navBtn('squad'), before: tabTo('squad') },
      { text: '<p>And <b>tactics</b>: pick from 30 formations, set the style, and check my <b>rotation advice</b> on the match screen before a game. Tired starters play badly, so use the bench.</p>', target: null, before: tabTo('squad', 'tactics') },
      { text: '<p><b>Transfers</b>. Search every player in the game, sign free agents, build a shortlist and handle offers. Windows are open in <b>summer</b> and <b>January</b>, so watch that green pill. New signings can\'t be sold for six months, so choose carefully.</p>', target: navBtn('transfers'), before: tabTo('transfers') },
      { text: '<p><b>Academy &amp; training</b>. Develop your young players and decide who trains what. Today\'s prospect is tomorrow\'s sale.</p>', target: navBtn('youth'), before: tabTo('youth') },
      { text: '<p><b>Club &amp; finances</b>: income, the wage bill, stadium and tickets, commercial deals and club records. Don\'t spend what you don\'t have. The board notices.</p>', target: navBtn('club'), before: tabTo('club') },
      { text: '<p><b>Competitions</b>: the league tables, the cups (each with its own bracket), African football and the national teams.</p>', target: navBtn('cups'), before: tabTo('cups') },
      { text: '<p>And the <b>calendar</b>. Every matchday, cup tie and window at a glance. Press Continue and watch the days tick by.</p>', target: navBtn('calendar'), before: tabTo('calendar') },
      { text: say('g2z', ['<p>That\'s the tour! I\'m always in the <b>Nandi</b> tab in the menu: replay this guide any time, or ask me anything.</p>', '<p>Done! Need a refresher? the <b>Nandi</b> tab in the menu. Questions? Same place. Go win something.</p>']), target: null, before: tabTo('match') }
    ];
    walk(steps, { outfit: 1, lastLabel: 'Finish', extra: { label: 'Open my tab', ghost: true, fn: () => { try { goTo('nandi'); } catch (e) { } ls.set(K.p2, '1'); } }, done: skipped => { ls.set(K.p2, '1'); ls.set(K.intro, '1'); if (skipped) farewell(); } });
  }

  /* ---------- alerts: the calendar stopped because something needs you ---------- */
  let lastWhy = null;
  const subKey = (id, re) => { try { const f = (NAV_SUBS[id] || []).find(x => re.test(x[0] + ' ' + x[1])); return f ? f[0] : null; } catch (e) { return null; } };
  const gotoSub = (id, re) => () => { const k = subKey(id, re); try { if (k) goSub(id, k); else goTo(id); } catch (e) { navTo(id); } };
  function alertPopup(reason) {
    const G_ = g(); if (!G_ || cur) return;
    if (/needs your attention/i.test(reason)) return;
    const detail = (reason.indexOf(':') > -1 ? reason.slice(reason.indexOf(':') + 1) : '').trim();
    let kind = 'mail';
    if (/lost your job/i.test(reason)) kind = 'sacked'; else if (/job offer|wants to talk/i.test(reason)) kind = 'job';
    else if (/on loan/i.test(reason)) kind = 'loan'; else if (/offer/i.test(reason)) kind = 'bid'; else if (/board/i.test(reason)) kind = 'board';
    const who = detail || 'one of your players', v = { d: esc2(detail), who: esc2(who) };
    const L = {
      bid: ['<p>Excuse me, boss. There\'s an <b>offer</b> on the table for <b>{who}</b>.</p><p>Take a look before they change their mind?</p>', '<p>Phone\'s ringing. A club wants <b>{who}</b>. I\'d have a look at the offer.</p>', '<p>Someone has noticed <b>{who}</b>. We\'ve got a <b>bid</b> to look at, boss.</p>', '<p>Boss, a rival club just made an <b>offer</b> for <b>{who}</b>. Your move.</p>'],
      loan: ['<p>A club would like one of your players <b>on loan</b>. Worth a look, boss.</p>', '<p>Quick one: there\'s a <b>loan request</b> waiting. Could be good game time for someone.</p>'],
      job: ['<p>Big news, boss. A club wants to talk to you about <b>the manager\'s job</b>.</p>', '<p>Don\'t panic, but another club is <b>interested in you</b>. There\'s a job offer waiting.</p>', '<p>Someone is headhunting you. A <b>job offer</b> has just landed.</p>'],
      sacked: ['<p>Boss... I\'m sorry. You\'ve <b>lost your job</b>.</p><p>Chin up. Let\'s find you something new. Vacancies are the place to start.</p>', '<p>This is the bit I hate. The board have <b>let you go</b>.</p><p>We\'ll bounce back. Shall we look at the vacancies?</p>'],
      board: ['<p>The <b>board</b> has written to you: <em>{d}</em>.</p><p>I\'d read it sooner rather than later.</p>', '<p>Boss, a message from the <b>board</b>: <em>{d}</em>. They don\'t write for fun.</p>'],
      mail: ['<p>Something important just arrived: <em>{d}</em>.</p><p>Want to open it?</p>', '<p>An <b>important message</b> for you: <em>{d}</em>. I\'d take a look.</p>']
    };
    const act = { bid: gotoSub('transfers', /offer|bid/i), loan: gotoSub('transfers', /offer|bid|loan/i), job: gotoSub('manager', /offer/i), sacked: gotoSub('manager', /vacanc/i), board: () => navTo('inbox'), mail: () => navTo('inbox') };
    const lab = { bid: 'View the offer', loan: 'View the request', job: 'See the offer', sacked: 'Look for work', board: 'Open inbox', mail: 'Open inbox' };
    show({ mode: 'modal', outfit: kind === 'sacked' ? 6 : outfitFor('alert'), html: say('al_' + kind, L[kind], v),
      buttons: [{ label: 'Later', ghost: true }, { label: lab[kind], fn: act[kind] }] });
  }

  /* ---------- the end of a season and the start of the next ---------- */
  let recap = null;
  function snapObjectives() {
    const G_ = g(); if (!G_ || !G_.obj || !G_.obj.items || G_.jobless) return null;
    const t = me(), items = [];
    G_.obj.items.forEach(it => {
      try { const e = evalObjective(G_, it, false); const ok = it.kind === 'cup' ? e.state === 'met' : (e.state === 'met' || e.state === 'ontrack'); items.push({ label: it.label, text: String(e.text || '').replace(/^(\d+\w{2}) now/, 'finished $1'), ok }); } catch (x) { }
    });
    return { season: G_.season, tier: t.tier, tierName: TIER_NAMES[t.tier], pos: posOfTeam(G_, t.id), board: G_.board, items };
  }
  function seasonEnd(sum, next) {
    const r = recap; recap = null;
    if (!r || !r.items.length) { next(); return; }
    const G_ = g(), t = me(), ok = r.items.filter(x => x.ok).length, n = r.items.length;
    const verdict = ok === n ? say('ve_all', ['<p>A clean sweep. <b>Every objective met.</b> The board are practically dancing.</p>', '<p>Full marks! You hit <b>every single target</b>. I\'m not crying, you\'re crying.</p>'])
      : ok >= Math.ceil(n / 2) ? say('ve_most', ['<p>Good, not perfect. You met <b>' + ok + ' of ' + n + '</b>. The board will notice both halves of that.</p>', '<p><b>' + ok + ' out of ' + n + '</b>. Solid, with room to grow.</p>'])
      : ok > 0 ? say('ve_some', ['<p>Only <b>' + ok + ' of ' + n + '</b> this time. Not our finest hour, boss.</p>', '<p>Eish. <b>' + ok + ' of ' + n + '</b> targets. Let\'s do better next season.</p>'])
      : say('ve_none', ['<p>I\'ll be honest with you, boss: <b>none of the targets</b> were met. The board won\'t be smiling.</p>', '<p>Yoh. Zero out of ' + n + '. We need a plan. I\'ll help.</p>']);
    const move = t.tier < r.tier ? '<p>On the bright side: <b>promotion!</b> You\'re up in the ' + esc2(TIER_NAMES[t.tier]) + '.</p>' : t.tier > r.tier ? '<p>And we\'ve been <b>relegated</b> to the ' + esc2(TIER_NAMES[t.tier]) + '. One step back, then.</p>' : '';
    const lines = r.items.map(x => '<li>' + (x.ok ? '✅' : '❌') + ' <b>' + esc2(x.label) + '</b>' + (x.text ? ' <small style="color:#9aa3ad">(' + esc2(x.text) + ')</small>' : '') + '</li>').join('');
    const bc = (r.board != null && G_ && G_.board != null) ? '<p>Board confidence: <b>' + Math.round(G_.board) + '</b>' + (G_.board > r.board + 1 ? ' (up)' : G_.board < r.board - 1 ? ' (down)' : ' (steady)') + '.</p>' : '';
    show({ mode: 'modal', outfit: outfitFor('seasonEnd'), dismiss: false,
      html: '<p>' + say('se_in', ['Before we move on, here\'s what the board <b>expected</b> of you in ' + seasonLabel(r.season) + ', and how you did:', 'Season done. A quick reminder of the <b>targets</b> from ' + seasonLabel(r.season) + ':', 'Boss, let\'s check the board\'s <b>expectations</b> for ' + seasonLabel(r.season) + ' against what you delivered:']) + '</p><ul>' + lines + '</ul>' + verdict + move + bc,
      buttons: [{ label: say('se_b', ['Continue', 'Okay, noted', 'Understood']), fn: next }] });
  }
  const TIPS = [
    'Tired starters play badly. Check my <b>rotation advice</b> on the match screen before big games.',
    'Players you sign can\'t be sold for <b>six months</b>, so only buy people you actually want.',
    'Use the <b>Block offers</b> button on a player\'s profile if you never want to sell him.',
    'The <b>shortlist</b> (star icon) warns you when a target\'s contract runs down or he becomes a free agent.',
    'Cups pay well. A deep run helps the bank balance and the board\'s mood.',
    'Ask for a <b>release clause</b> when you renew a star. It protects you and the club.',
    'Young players grow. A bright 18-year-old is worth more next season than a tired 31-year-old.',
    'Check <b>ticket pricing</b> under Stadium &amp; tickets. A winning team can charge more.',
    'The <b>transfer window</b> pill at the top shows how many days are left. Don\'t leave it to the last day.',
    'Unhappy player? Open his profile and <b>have a word</b>. A kept promise earns trust, a broken one is remembered.',
    'Search anything with the magnifying glass at the top: players, clubs and even menu pages.'
  ];
  function seasonStart(sum, next) {
    const G_ = g(); if (!G_ || G_.jobless || !G_.obj || !G_.obj.items) { next(); return; }
    const t = me();
    const mates = G_.teams.filter(x => x.tier === t.tier).sort((a, b) => teamOverall(b) - teamOverall(a)), rank = mates.findIndex(x => x.id === t.id) + 1;
    const lines = G_.obj.items.map(it => '<li><b>' + esc2(it.label) + '</b></li>').join('');
    let win = '';
    try { win = inTransferWindow(G_) ? '<p>The <b>' + esc2(currentWindowName(G_)) + '</b> is open for <b>' + windowCloses(G_) + '</b> more days. Use them.</p>' : ''; } catch (e) { }
    show({ mode: 'modal', outfit: outfitFor('seasonStart'), dismiss: false,
      html: '<p>' + say('ss_in', ['Welcome to <b>' + seasonLabel(G_.season) + '</b>, boss! Here\'s what to expect.', 'New season, fresh start: <b>' + seasonLabel(G_.season) + '</b>. Let me brief you.', 'Right, <b>' + seasonLabel(G_.season) + '</b>. Here\'s what the board wants from us this year.']) + '</p><p>You\'re in the <b>' + esc2(TIER_NAMES[t.tier]) + '</b>. On paper we\'re the <b>' + ordinal(rank) + '</b> strongest of ' + mates.length + '.</p><p>The board expects:</p><ul>' + lines + '</ul>' + win + '<p><em>Tip:</em> ' + pick(TIPS) + '</p>',
      buttons: [{ label: say('ss_b', ["Let's go", 'Bring it on', 'Right, onwards']), fn: next }] });
  }

  /* ---------- questions and answers ---------- */
  const nm = (f, d) => { try { const v = f(); return v == null ? d : v; } catch (e) { return d; } };
  const QA = [
    ['Playing the game', 'How does Continue work?', () => '<p><b>Continue</b> moves time forward one day at a time. It stops by itself when something needs you: a <b>matchday</b>, an <b>offer</b> for one of your players, a <b>job offer</b>, an <b>important message</b> or losing your job. On match days the button says <b>Play match</b>.</p>'],
    ['Playing the game', 'What is the difference between Play match and Sim matchday?', () => '<p><b>Play match</b> takes you into your game: press conference, team talk, then you watch it live and can make changes. <b>Sim matchday</b> and <b>Quick sim</b> play the games without you watching. <b>Sim 4</b> plays four matchdays in a row.</p>'],
    ['Playing the game', 'Why did Continue stop?', () => '<p>Because I saw something you should look at: a matchday or cup tie, a new offer for a player, a loan request, a job offer, an important or board message, or you were sacked. When it\'s one of those I\'ll pop up and tell you what it is.</p>'],
    ['Playing the game', 'How do live matches work?', () => '<p>Before kick-off you get a <b>match preview</b>, then a <b>press conference</b> and <b>team talk</b>. During the game you can change tactics, make substitutions and watch the commentary. At half-time you get a chance to rethink. After the match there\'s a summary with ratings and a chance to speak to the press.</p>'],
    ['Playing the game', 'How do I save my game?', () => '<p>The game saves for you as you go. You\'ll see a little <b>✓ Saved</b> at the top. You can also manage careers and slots under <b>Save &amp; Load</b> in the menu.</p>'],
    ['Playing the game', 'Where do I find the league table and fixtures?', () => '<p>Under <b>Competitions &gt; League tables &amp; fixtures</b>. The <b>Calendar</b> shows every matchday, cup tie and transfer window together.</p>'],
    ['Playing the game', 'How do I search for a player or a club?', () => '<p>Tap the <b>magnifying glass</b> at the top. It finds players, clubs and even menu pages, including the tabs inside other tabs.</p>'],
    ['Playing the game', 'Can I change the language or currency?', () => '<p>Yes. Open the <b>More</b> menu and choose <b>Language &amp; currency</b>. Rand is the default, but you can switch.</p>'],
    ['Board and career', 'What does the board expect of me?', () => '<p>Every season the board sets objectives: usually a <b>league finish</b>, a <b>cup run</b>, keeping the <b>finances</b> healthy and sometimes <b>youth development</b>. You\'ll find them under <b>Board &amp; objectives</b>, with a progress marker for each. I\'ll remind you at the start and the end of each season.</p>'],
    ['Board and career', 'What is board confidence?', () => '<p>It\'s how much the board trusts you. Wins, good runs and hitting targets raise it. Bad runs, missed targets and poor finances lower it. If it falls too far, you can be sacked, and it also decides whether they\'ll renew your contract.</p>'],
    ['Board and career', 'How do I get a new contract?', () => '<p>Go to <b>Manager &gt; Contract</b>. In your final year the board decides whether to offer an extension. Beat their expectations and it\'s almost certain. You can <b>negotiate</b> wage and length, up or down, and you can also ask for a pay rise when you\'re overperforming.</p>'],
    ['Board and career', 'What if the board will not renew my contract?', () => '<p>Don\'t panic. If results improve they can change their minds: they re-check during the season, and once every three months you can use <b>Ask the board to reconsider</b> on the Contract tab. Climb the table and it works.</p>'],
    ['Board and career', 'How do I get a better job?', () => '<p>Win things and build your <b>reputation</b>. Clubs then come to you with <b>job offers</b>, and you can apply for any open post under <b>Manager &gt; Vacancies</b>. Both live on your manager tab.</p>'],
    ['Board and career', 'What happens if I am sacked?', () => '<p>It happens to the best of us. You\'ll be without a club, so check <b>Job offers</b> and <b>Vacancies</b> on the Manager tab and apply. You can keep your career going at another club.</p>'],
    ['Board and career', 'How do promotion and relegation work?', () => '<p>The top <b>' + nm(() => AUTO_PROMOTED, 2) + '</b> clubs in a division go up automatically. After that, the next <b>' + nm(() => PLAYOFF_SPOTS, 4) + '</b> play off for the last promotion place: semi-finals, then a final. The clubs at the bottom go down. I\'ll tell you where you finished at the end of the season.</p>'],
    ['Squad and tactics', 'How do I change my formation?', () => '<p>Open <b>Squad &amp; Tactics &gt; Tactics</b>. There are <b>' + nm(() => Object.keys(FORMATIONS).length, 30) + '</b> formations, including several kinds of 4-4-2. Pick the one that suits your players, because someone out of position plays worse.</p>'],
    ['Squad and tactics', 'What does out of position mean?', () => '<p>Every player has a natural position. Put a striker at right-back and his rating drops. The lineup screen shows who\'s misplaced. A formation scores best when your squad has the positions it needs.</p>'],
    ['Squad and tactics', 'What is rotation advice?', () => '<p>Before a matchday, the match screen shows <b>tired starters</b> and fresh players who could replace them. Tap <b>Swap</b> and the lineup updates. Tired players play worse and get injured more easily.</p>'],
    ['Squad and tactics', 'What do the tags on players mean?', () => '<p><b>out 3</b> means injured for three matches (with a rough return date). <b>TL</b> is transfer listed, <b>LL</b> loan listed, <b>no offers</b> means you\'ve blocked offers, <b>intl duty</b> means he\'s away with his country and <b>promise</b> shows a promise you\'ve made him.</p>'],
    ['Squad and tactics', 'How do I make someone captain or move him to the reserves?', () => '<p>Tap the player to open his profile. The buttons at the bottom let you <b>Make captain</b>, <b>Move to reserves</b>, transfer or loan list him, or release him.</p>'],
    ['Squad and tactics', 'A player is unhappy. What do I do?', () => '<p>Open his profile and <b>have a word</b>. You can promise him game time, but you have to keep it: starts count in full and substitute appearances count as half. Keep your word and he trusts you. Break it and he remembers.</p>'],
    ['Transfers', 'When is the transfer window open?', () => '<p>There are two: a <b>summer</b> window and a <b>January</b> window. The green pill at the top shows whether one is open and how many days are left.</p>'],
    ['Transfers', 'How do I buy a player?', () => '<p>Go to <b>Transfers</b>, search, open a player and place a <b>bid</b>. If the club accepts, you negotiate the player\'s wage and contract (you can even pay his agent for better odds). Rival clubs sometimes jump in, and you can offer a <b>sell-on clause</b> to lower the price.</p>'],
    ['Transfers', 'What are free agents?', () => '<p>Players without a club. There\'s <b>no fee</b>. You just agree a wage, contract length and signing bonus. They\'re in the <b>Free agents</b> list on the Transfers tab.</p>'],
    ['Transfers', 'How do I sell a player?', () => '<p>Open his profile and <b>transfer list</b> him, or use <b>Shop around</b> to see who\'s interested. Clubs will send offers. You can accept, reject or <b>negotiate</b> for more money, or ask for cash only instead of a player swap.</p>'],
    ['Transfers', 'Why can I not sell my new signing?', () => '<p>New signings are locked for <b>six months</b>. You can\'t list them and nobody can bid for them. You can still <b>loan</b> them out.</p>'],
    ['Transfers', 'I do not want offers for a player. Can I stop them?', () => '<p>Yes. Open his profile and press <b>Block offers</b>. No bids, no loan requests, no buy-outs. Listing him for transfer or loan removes the block.</p>'],
    ['Transfers', 'How do loans work?', () => '<p><b>Loan list</b> a player and clubs will send requests. Each one is negotiable: you can ask them to pay more of his wages or change the length. A loan is a good way to get young players matches.</p>'],
    ['Transfers', 'What are release clauses, sell-on clauses and agent fees?', () => '<p>A <b>release clause</b> lets a club buy a player outright at a set price. A <b>sell-on clause</b> gives the selling club a share of your next sale in return for a lower fee. An <b>agent fee</b> is an optional payment that improves your chance of the player signing.</p>'],
    ['Transfers', 'What is the shortlist for?', () => '<p>Star a player to add him to your <b>shortlist</b>. I\'ll message you when his contract is running down, his club lists him, he becomes a free agent or he moves.</p>'],
    ['Money', 'How do finances work?', () => '<p>Money comes in from <b>gate receipts</b>, <b>sponsors</b>, <b>prize money</b> and <b>player sales</b>. It goes out in <b>wages</b> and signings. Your <b>transfer budget</b> is what you can spend. Check <b>Club &amp; finances</b> to see where it\'s all going.</p>'],
    ['Money', 'How can I make more money?', () => '<p>Win. Winning raises crowds and loyalty. Then set <b>ticket prices</b> carefully, grow the <b>stadium</b>, sign <b>commercial</b> deals and go deep in the cups. Selling the right player at the right time helps too.</p>'],
    ['Youth and training', 'How does the academy work?', () => '<p>Your club develops youngsters each season. Check <b>Academy &amp; Training</b> to see the prospects and promote the ones who are ready. Good youth players can become stars or valuable sales.</p>'],
    ['Competitions', 'Which cups are there?', () => '<p>The <b>' + nm(() => CUP_NAME, 'Thatbank Cup') + '</b> (every club, straight knockout), the <b>' + nm(() => SUPER8, 'Mzansi8') + '</b> (last season\'s top eight) and the <b>' + nm(() => KNOCKOUT, 'Bayakhala Knockout') + '</b> (the top two divisions). Each has its own tab and bracket under <b>Cups</b>.</p>'],
    ['Competitions', 'How does African football work?', () => '<p>The best clubs qualify for the <b>' + nm(() => CAF_NAME, 'CAF Champions League') + '</b> and the <b>' + nm(() => CONFED_NAME, 'CAF Confederation Cup') + '</b>. Find them under <b>Continental football</b>.</p>'],
    ['Competitions', 'What are international breaks?', () => '<p>Four times a season, countries call up their best players. Called-up players miss the <b>next matchday</b> and come back a little tired. It happens to every club. They earn caps and goals, which show on the player\'s profile.</p>'],
    ['About me', 'Who are you?', () => say('qa_who', ['<p>I\'m <b>Nandi</b>, your personal assistant. I keep your diary, read your mail, and tell you when the board is annoyed. You\'re welcome.</p>', '<p>Nandi. Personal assistant. The one who knows where everything is, usually before you ask.</p>', '<p>I\'m your <b>personal assistant</b>. Think of me as the person standing between you and a missed deadline.</p>'])],
    ['About me', 'Do you ever sleep?', () => say('qa_sleep', ['<p>Only on matchdays when you\'re winning.</p>', '<p>Sleep? Boss, there\'s a transfer window open.</p>', '<p>I take quick naps between board meetings. Don\'t tell them.</p>'])],
    ['About me', 'Can you pick my team for me?', () => say('qa_pick', ['<p>Nice try. I\'ll tell you who\'s tired, but the team sheet is <b>your</b> call.</p>', '<p>I\'ll hold the clipboard. You pick the eleven.</p>'])],
    ['New in the game', 'Can I use my own manager picture?', () => '<p>Yes. On the start screen, pick <b>Upload a picture</b> where you choose your face. You can change it later on your <b>Manager</b> profile. The picture is saved with your career.</p>'],
    ['New in the game', 'Can I rename my club or change its crest?', () => '<p>Yes. On <b>team selection</b> you can edit a club\'s name and crest, and that is remembered in this browser for new careers. Inside a career, open <b>Club</b> and choose <b>Edit club</b>: that only changes the career you are in.</p>'],
    ['New in the game', 'What is the Global Super Cup?', () => '<p>At the end of July the <b>African</b> and <b>European</b> champions meet for the <b>Global Super Cup</b>, just before the new season. Winners get it in the trophy room.</p>'],
    ['New in the game', 'Who wins Best Player in the World?', () => '<p>It is announced every year in December. The contenders are the player of the season from each top division and the continental player of the tournament. Manager of the Year is announced with it.</p>'],
    ['New in the game', 'When does the new season start?', () => '<p>On <b>1 July</b>. The calendar keeps running through June, and the <b>transfer window</b> opens on 1 July too.</p>'],
    ['About me', 'Give me a tip', () => '<p>' + pick(TIPS) + '</p>'],
    ['About me', 'What is your favourite club?', () => say('qa_fav', ['<p>Whichever one is paying me this month. Currently, <b>' + esc2(club()) + '</b>. Obviously.</p>', '<p>The one that\'s top of the table. Right now, I\'m hoping it\'s <b>' + esc2(club()) + '</b>.</p>'])]
  ];
  const CATS = [...new Set(QA.map(x => x[0]))];
  let qaCat = 'All', qaText = '';

  function tabHtml() {
    const out = outfitFor('tab');
    const hi = say('tabhi', ['<p>' + hello() + ', boss! Ask me anything about the game, or let me walk you through it again.</p>', '<p>' + hello() + '! What do you need? Pick a question below, search, or replay the tour.</p>', '<p>Back again? Good. Ask away.</p>']);
    return '<div class="panel ndTab"><h3>Nandi<span class="sub">your personal assistant</span></h3>' +
      '<div class="ndHero"><img src="' + IMG + 'nandi' + out + '.webp" alt="Nandi" onerror="this.style.display=\'none\'"><div class="ndBubble" id="ndAns" style="flex:1"><div class="ndName">Nandi<small>Personal assistant</small></div><div class="ndText" id="ndAnsText" style="max-height:none">' + hi + '</div></div></div>' +
      '<div class="ndBtns" style="padding:0 14px 6px;justify-content:flex-start"><button class="btn sm" id="ndReplay">Replay the guide</button><button class="btn ghost sm" id="ndRand">Surprise me</button></div>' +
      '<div class="ndBtns" style="padding:0 14px 8px;justify-content:flex-start;flex-wrap:wrap">'+[['inbox','Inbox'],['squad','Squad'],['transfers','Transfers'],['board','Board'],['calendar','Calendar']].map(x=>'<button class="btn ghost sm" data-ndgo="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>' +
      '<input class="ndSearch" id="ndSearch" type="search" placeholder="Search questions" autocomplete="off">' +
      '<div class="ndChips" id="ndChips"></div><div id="ndList"></div></div>';
  }
  function drawList() {
    const q = qaText.toLowerCase(), chips = document.getElementById('ndChips'), list = document.getElementById('ndList'); if (!list) return;
    chips.innerHTML = ['All'].concat(CATS).map(c => '<button class="chip" data-cat="' + esc2(c) + '" aria-pressed="' + (qaCat === c) + '">' + esc2(c) + '</button>').join('');
    const rows = QA.map((x, i) => [x, i]).filter(([x]) => (qaCat === 'All' || x[0] === qaCat) && (!q || x[1].toLowerCase().includes(q) || x[0].toLowerCase().includes(q)));
    list.innerHTML = rows.length ? rows.map(([x, i]) => '<button class="ndQ" data-q="' + i + '">' + esc2(x[1]) + '<small>' + esc2(x[0]) + '</small></button>').join('') : '<div class="pad hint">I don\'t have an answer for that one yet. Try different words.</div>';
    chips.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { qaCat = b.dataset.cat; drawList(); });
    list.querySelectorAll('[data-q]').forEach(b => b.onclick = () => answer(+b.dataset.q));
  }
  function answer(i) {
    const box = document.getElementById('ndAnsText'); if (!box) return;
    box.innerHTML = QA[i][2]();
    const img = document.querySelector('#v-nandi .ndHero img'); if (img) { img.style.display = ''; img.src = IMG + 'nandi' + outfitFor('qa' + i) + '.webp'; }
    const a = document.getElementById('ndAns'); if (a && a.scrollIntoView) a.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  function bindTab() {
    const rp = document.getElementById('ndReplay'); if (rp) rp.onclick = () => guide2();
    document.querySelectorAll('[data-ndgo]').forEach(b => b.onclick = () => navTo(b.dataset.ndgo));
    const rd = document.getElementById('ndRand'); if (rd) rd.onclick = () => answer(rnd(QA.length));
    const se = document.getElementById('ndSearch'); if (se) se.oninput = e => { qaText = e.target.value.trim(); drawList(); };
    drawList();
  }
  /* standalone tab: the game's menu and router call window.viewNandi */
  function viewNandi() {
    const v = document.getElementById('v-nandi'); if (!v) return;
    v.classList.add('mmx', 'sqv');
    v.innerHTML = tabHtml(); bindTab();
  }
  window.viewNandi = viewNandi;
  function patchManager() { /* kept for old builds: the tab is now its own menu entry */ }

  /* ---------- wiring ---------- */
  function patchAlerts() {
    const cw = window.contWhy; if (typeof cw === 'function') window.contWhy = function () { const r = cw.apply(this, arguments); if (r) lastWhy = { r, t: Date.now() }; return r; };
    const sa = window.stopAutoSim;
    if (typeof sa === 'function') window.stopAutoSim = function () { const r = sa.apply(this, arguments); if (lastWhy && Date.now() - lastWhy.t < 900) { const w = lastWhy; lastWhy = null; setTimeout(() => { try { alertPopup(w.r); } catch (e) { console.error(e); } }, 400); } return r; };
  }
  function patchSeason() {
    const es = window.endSeason;
    if (typeof es === 'function') window.endSeason = function () {
      let snap = null; try { snap = snapObjectives(); } catch (e) { }
      const sum = es.apply(this, arguments); recap = snap; return sum;
    };
    const ps = window.postSeasonFlow;
    if (typeof ps === 'function') window.postSeasonFlow = function (sum) {
      const self = this, run = () => ps.call(self, sum);
      try { if (!g()) { run(); return; } if (sum && sum.fired) seasonEnd(sum, run); else seasonEnd(sum, () => seasonStart(sum, run)); } catch (e) { console.error('nandi season', e); run(); }
    };
  }
  function patchGuide() {
    /* the second guide waits until the contract and sponsor screens are done, so nothing overlaps */
    let waiting = false;
    window.maybeStartGuide = function () {
      if (ls.get(K.p2) === '1' || waiting) return; const G_ = g(); if (!G_ || G_.round > 2) return;
      waiting = true; const t0 = Date.now();
      const poll = () => {
        const sc = document.getElementById('scrim'), modalOpen = sc && !sc.hidden && getComputedStyle(sc).display !== 'none';
        const busy = modalOpen || Date.now() - t0 < 3200;
        if (busy && Date.now() - t0 < 120000) { setTimeout(poll, 500); return; }
        waiting = false; if (ls.get(K.p2) === '1' || cur || !g()) return;
        setTimeout(() => { if (!cur && ls.get(K.p2) !== '1') guide2(); }, 800);
      };
      setTimeout(poll, 500);
    };
    window.startGuide = function () { guide2(); };
  }
  function watchStart() {
    const st = document.getElementById('start'); if (!st) return;
    const check = () => { if (ls.get(K.intro) === '1' || introRunning || cur) return; if (getComputedStyle(st).display === 'none') return; introRunning = true; setTimeout(guide1, 600); };
    new MutationObserver(check).observe(st, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
    check();
  }
  function init() { css(); patchManager(); patchAlerts(); patchSeason(); patchGuide(); watchStart(); }
  window.Nandi = { show, guide1, guide2, alertPopup, seasonEnd, seasonStart, reset: () => { ls.set(K.intro, ''); ls.set(K.p2, ''); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
