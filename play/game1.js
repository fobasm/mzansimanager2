
const IMG_LOGO = "img/logo.webp";
const IMG_BRIGHT = "img/bright-pmb.webp";
const CREST_IMGS = {"Durban FC|Durban": "img/crests/durban-fc-586dcc.webp", "Chiefs FC|Chiefs": "img/crests/chiefs-fc-99f42f.webp", "Marumo FC|Marumo": "img/crests/marumo-fc-579396.webp", "Potchefstroom FC|Potch": "img/crests/potchefstroom-fc-ab9181.webp", "Bushbuckridge FC|Bushbuck": "img/crests/bushbuckridge-fc-c1db7c.webp", "East London City|EL City": "img/crests/east-london-city-023362.webp", "FC Newcastle|Newcastle": "img/crests/fc-newcastle-5bd984.webp", "Milford United|Milford": "img/crests/milford-united-86c993.webp", "Welkom City|Welkom City": "img/crests/welkom-city-d667e8.webp", "FC Richards Bay|Richards Bay": "img/crests/fc-richards-bay-2ff9b9.webp", "Nyanga FC|Nyanga": "img/crests/nyanga-fc-457b78.webp", "Amazulu United|AmaZulu": "img/crests/amazulu-united-363b15.webp", "Bloemfontein FC|Bloem": "img/crests/bloemfontein-fc-15de79.webp", "FC Sekhukhune|Sekhukhune": "img/crests/fc-sekhukhune-c4dc73.webp", "Ladysmith FC|Ladysmith": "img/crests/ladysmith-fc-543647.webp", "Pirates FC|Pirates": "img/crests/pirates-fc-92a591.webp", "Polokwane FC|Polokwane": "img/crests/polokwane-fc-03bc4a.webp", "Witbank FC|Witbank": "img/crests/witbank-fc-3fc4e7.webp", "FC Stellenbosch|Stellenbosch": "img/crests/fc-stellenbosch-03e4f4.webp", "Lamontville FC|Lamontville": "img/crests/lamontville-fc-1413dc.webp", "Sundowns FC|Sundowns": "img/crests/sundowns-fc-faa27a.webp"};Object.assign(CREST_IMGS, {"eMalahleni United|eMalahleni": "img/crests/emalahleni-united-eb7e25.webp", "Chiefs FC|Chiefs": "img/crests/chiefs-fc-248e3a.webp", "Sundowns FC|Sundowns": "img/crests/sundowns-fc-aa5328.webp", "FC Orbit College|Orbit": "img/crests/fc-orbit-college-6aede4.webp", "FC Kroonstad|Kroonstad": "img/crests/fc-kroonstad-d6ea77.webp", "George FC|George": "img/crests/george-fc-480e7b.webp", "Mahikeng FC|Mahikeng": "img/crests/mahikeng-fc-22ae74.webp", "Mbombela FC|Mbombela": "img/crests/mbombela-fc-b02090.webp", "New Upington FC|New Upington": "img/crests/new-upington-fc-3e6b58.webp", "Gqeberha FC|Gqeberha": "img/crests/gqeberha-fc-3c1019.webp", "Upington FC|Upington": "img/crests/upington-fc-897dff.webp", "FC Venda|Venda": "img/crests/fc-venda-6f3505.webp", "Bethanie FC|Bethanie": "img/crests/bethanie-fc-798d80.webp", "Cape Town FC|Cape Town": "img/crests/cape-town-fc-436174.webp", "FC Moletsi|Moletsi": "img/crests/fc-moletsi-dc79c8.webp", "Jakaranda FC|Jakaranda": "img/crests/jakaranda-fc-2a142a.webp", "Pretoria FC|Pretoria": "img/crests/pretoria-fc-42395a.webp", "FC Highbury|Highbury": "img/crests/fc-highbury-6d3cb7.webp", "Kuruman Lions FC|Kuruman Lions": "img/crests/kuruman-lions-fc-d9802f.webp", "Mthatha FC|Mthatha": "img/crests/mthatha-fc-ac2b7d.webp", "Umoya FC|Umoya": "img/crests/umoya-fc-d14f56.webp", "KwaMhlanga United|Mhlanga": "img/crests/kwamhlanga-united-efb910.webp"}); Object.assign(CREST_IMGS, {"Sing About Me I'm Dying Of Thirst FC|SAMIDOT FC": "img/crests/sing-about-me-i-m-dying-of-thirst-fc-03fc04.webp"});
const IMG_FAVICON = "img/favicon.png";

/* ============================================================
   Mzansi Manager 2026 — data
   ============================================================ */

const TIER_NAMES = ['Mzansi Premier League', 'Mzansi Championship', 'Mzansi 3rd Division', 'Mzansi 4th Division', 'Mzansi 5th Division'];
const TIER_SHORT = ['Premier League', 'Championship', '3rd Division', '4th Division', '5th Division'];
const TIER_SIZE = 20;
const AUTO_PROMOTED = 2;   /* teams promoted automatically (top positions) */ const PLAYOFF_SPOTS = 4;  /* teams entering the promotion playoff, straight after the automatic spots */ const RELEGATED = 3;      /* teams relegated (bottom positions) */

/* base = sporting strength 1-10 · fin = transfer kitty in millions · youth = academy level 1-5 */
const CLUBS = [
  /* ---------------- Tier 1 — Mzansi Premiership ---------------- */
  { n:'Sundowns FC', s:'Sundowns', nick:'Dawana Boys', city:'Pretoria', t:0, base:9.6, fin:150, youth:5, c1:'#f9e300', c2:'#0b7a3b', scout:'SAM' },
  { n:'Pirates FC', s:'Pirates', nick:'Zimnyama', city:'Soweto', t:0, base:9.6, fin:105, youth:4, c1:'#1a1a1a', c2:'#eeeeee', scout:'AFR' },
  { n:'Chiefs FC', s:'Chiefs', nick:'Khosi Boys', city:'Soweto', t:0, base:9.5, fin:95, youth:4, c1:'#111111', c2:'#d4af37', scout:'AFR' },
  { n:'Amazulu United', s:'AmaZulu', nick:'The Zulus', city:'Durban', t:0, base:8.5, fin:36, youth:3, c1:'#0b8a4b', c2:'#111111', scout:'AFR' },
  { n:'FC Stellenbosch', s:'Stellenbosch', nick:'The Vineyard Boys', city:'Stellenbosch', t:0, base:8.6, fin:42, youth:4, c1:'#5c1420', c2:'#c9a227', scout:'AFR' },
  { n:'FC Sekhukhune', s:'Sekhukhune', nick:'Noko Boys', city:'Polokwane', t:0, base:7.2, fin:32, youth:3, c1:'#0e6b3d', c2:'#f4d03f', scout:'AFR' },
  { n:'Lamontville FC', s:'Lamontville', nick:'Abafana Baso', city:'Durban', t:0, base:7.9, fin:24, youth:3, c1:'#f2a007', c2:'#111111', scout:'AFR' },
  { n:'Polokwane FC', s:'Polokwane', nick:'Rise and Shoot', city:'Polokwane', t:0, base:7.7, fin:22, youth:2, c1:'#1d7f3a', c2:'#f0f0f0', scout:'AFR' },
  { n:'Durban FC', s:'Durban', nick:'The C Kings', city:'Durban', t:0, base:7.8, fin:26, youth:3, c1:'#0e7490', c2:'#f8fafc', scout:'AFR' },
  { n:'Witbank FC', s:'Witbank', nick:'Roarwit', city:'Mbombela', t:0, base:6.7, fin:25, youth:3, c1:'#9c1310', c2:'#d9a227', scout:'AFR' },
  { n:'Nyanga FC', s:'Nyanga', nick:'Moon Boys', city:'Gqeberha', t:0, base:6.3, fin:19, youth:2, c1:'#0f5fa8', c2:'#f2f2f2', scout:'AFR' },
  { n:'FC Richards Bay', s:'Richards Bay', nick:'The Natal Boyz', city:'Richards Bay', t:0, base:6.2, fin:18, youth:2, c1:'#123f8c', c2:'#e8b21a', scout:'AFR' },
  { n:'Marumo FC', s:'Marumo', nick:'Bahlabane', city:'Polokwane', t:0, base:6.3, fin:20, youth:2, c1:'#046a38', c2:'#f6d327', scout:'AFR' },
  { n:'Bloemfontein FC', s:'Bloem', nick:'Siwe', city:'Bloemfontein', t:0, base:6.4, fin:28, youth:3, c1:'#0a3d91', c2:'#ffffff', scout:'AFR' },
  { n:'Bushbuckridge FC', s:'Bushbuck', nick:'The Wild', city:'Mbombela', t:0, base:6.0, fin:17, youth:2, c1:'#166534', c2:'#fbbf24', scout:'AFR' },
  { n:'Milford United', s:'Milford', nick:'The Mill', city:'Durban', t:0, base:6.4, fin:21, youth:3, c1:'#1e40af', c2:'#e5e7eb', scout:'AFR' },   { n:'East London City', s:'EL City', nick:'The Buffalo City Boys', city:'East London', t:0, base:7.1, fin:20, youth:4, c1:'#0f4c81', c2:'#f2b705', scout:'AFR' },   { n:'Potchefstroom FC', s:'Potch', nick:'The Platinum Students', city:'Potchefstroom', t:0, base:5.8, fin:18, youth:2, c1:'#7c1d2e', c2:'#f5f5f5', scout:'AFR' },   { n:'Welkom City', s:'Welkom City', nick:'The Goldfields', city:'Welkom', t:0, base:5.9, fin:17, youth:2, c1:'#b45309', c2:'#111827', scout:'AFR' },   { n:'FC Newcastle', s:'Newcastle', nick:'The Royals', city:'Newcastle', t:0, base:5.8, fin:16, youth:2, c1:'#2b2f31', c2:'#9aa0a3', scout:'AFR' },
 
  /* ---------------- Tier 2 — Mzansi Championship ---------------- */
  { n:'FC Orbit College', s:'Orbit', nick:'The Graduates', city:'Rustenburg', t:1, base:5.7, fin:9, youth:2, c1:'#c0262b', c2:'#121212', scout:'AFR' },
  { n:'FC Moletsi', s:'Moletsi', nick:'Dinaledi Boys', city:'Limpopo', t:1, base:5.6, fin:8, youth:2, c1:'#0b2f72', c2:'#eef3fb', scout:'AFR' },
  { n:'Cape Town FC', s:'Cape Town', nick:'The Mother City Boys', city:'Cape Town', t:1, base:6.5, fin:8, youth:5, c1:'#0b1f3a', c2:'#c9a227', scout:'AFR' },
  { n:'Pretoria FC', s:'Pretoria', nick:'The Pretoria Boys', city:'Pretoria', t:1, base:5.3, fin:7, youth:2, c1:'#5b8fc4', c2:'#233b55', scout:'AFR' },
  { n:'KwaMhlanga United', s:'Mhlanga', nick:'KwaMhlanga Rises', city:'Ekurhuleni', t:1, base:5.1, fin:6, youth:2, c1:'#15203a', c2:'#121212', scout:'AFR' },
  { n:'Bethanie FC', s:'Bethanie', nick:'Ditau', city:'Limpopo', t:1, base:5.2, fin:6, youth:2, c1:'#5e3a8c', c2:'#121212', scout:'AFR' },
  { n:'Jakaranda FC', s:'Jakaranda', nick:'Mashata', city:'Tshwane', t:1, base:5.0, fin:5, youth:2, c1:'#4a1030', c2:'#f4eef2', scout:'AFR' },
  { n:'Upington FC', s:'Upington', nick:'Kalahari stars', city:'Upington', t:1, base:4.9, fin:5, youth:1, c1:'#6fb3dd', c2:'#f2f6f8', scout:'AFR' },
  { n:'FC Venda', s:'Venda', nick:'Vhavenda Boys', city:'Thohoyandou', t:1, base:4.8, fin:5, youth:2, c1:'#14532d', c2:'#f0b429', scout:'AFR' },
  { n:'Gqeberha FC', s:'Gqeberha', nick:'Nkanyezi', city:'Gqeberha', t:1, base:4.8, fin:5, youth:2, c1:'#7e22ce', c2:'#f5f5f5', scout:'AFR' },
  { n:'FC Highbury', s:'Highbury', nick:'The Academy Boys', city:'Cape Town', t:1, base:4.7, fin:4, youth:4, c1:'#d6266a', c2:'#fdf2f7', scout:'AFR' },
  { n:'Mthatha FC', s:'Mthatha', nick:'The Home Base', city:'Mthatha', t:1, base:4.6, fin:4, youth:2, c1:'#14532d', c2:'#121212', scout:'AFR' },
  { n:'Umoya FC', s:'Umoya', nick:'The Spirits', city:'Cape Town', t:1, base:4.6, fin:4, youth:2, c1:'#0b2a6e', c2:'#2f7fd1', scout:'AFR' },
  { n:'Kuruman Lions FC', s:'Kuruman Lions', nick:'Ditau tsa Kuruman', city:'Kuruman', t:1, base:4.5, fin:4, youth:1, c1:'#121212', c2:'#e06a1f', scout:'AFR' },
  { n:'Mbombela FC', s:'Mbombela', nick:'Bahlabani Boys', city:'Mbombela', t:1, base:4.5, fin:4, youth:1, c1:'#1f5c38', c2:'#ece2c6', scout:'AFR' },
  { n:'New Upington FC', s:'New Upington', nick:'Sekhukhutla', city:'Upington', t:1, base:4.4, fin:3, youth:1, c1:'#e0579e', c2:'#182b4d', scout:'AFR' },
  { n:'George FC', s:'George', nick:'The Garden Route Lads', city:'George', t:1, base:4.4, fin:4, youth:2, c1:'#121212', c2:'#9aa0a3', scout:'AFR' },
  { n:'FC Kroonstad', s:'Kroonstad', nick:'The Maize Men', city:'Kroonstad', t:1, base:4.3, fin:3.6, youth:1, c1:'#8c1a1a', c2:'#f0e4d0', scout:'AFR' },
  { n:'eMalahleni United', s:'eMalahleni', nick:'The Coal City Boys', city:'eMalahleni', t:1, base:6.2, fin:3.3, youth:1, c1:'#4a2a6b', c2:'#e8631f', scout:'AFR' },
  { n:'Mahikeng FC', s:'Mahikeng', nick:'The Capital Boys', city:'Mahikeng', t:1, base:4.1, fin:3, youth:1, c1:'#eab308', c2:'#17140d', scout:'AFR' },
 
  /* ---------------- Tier 3 — Mzansi 3rd division ---------------- */
  { n:'Bright PMB FC', s:'PMB', nick:'AzaseMphitha', city:'Pietermaritzburg', t:2, base:5.9, fin:3.5, youth:5, c1:'#F5B800', c2:'#111111', scout:'AFR', badge:'bright', youthClub:true },
  { n:'FC Baroka', s:'Baroka', nick:'Bakgaga Boys', city:'Ga-Mphahlele', t:2, base:4.4, fin:3, youth:2, c1:'#0b4a24', c2:'#f2f2f2', scout:'AFR' },
  { n:'Leopards FC', s:'Leopards', nick:'The Leos', city:'Thohoyandou', t:2, base:4.3, fin:3, youth:2, c1:'#f0b429', c2:'#121212', scout:'AFR' },
  { n:'Makhanda FC', s:'Makhanda', nick:'The Bucks', city:'Makhanda', t:2, base:4.1, fin:2.4, youth:2, c1:'#111111', c2:'#f2f2f2', scout:'AFR' },
  { n:'Ulundi FC', s:'Ulundi', nick:'The Dynamos', city:'Durban', t:2, base:4.0, fin:2.2, youth:2, c1:'#e8630c', c2:'#15110a', scout:'AFR' },
  { n:'Real Pretoria FC', s:'Real Pretoria', nick:'Los Blancos Pitori', city:'Pretoria', t:2, base:5.9, fin:2.2, youth:2, c1:'#4a463d', c2:'#d8cdb0', scout:'AFR' },
  { n:'Rustenburg Rovers', s:'Rustenburg', nick:'The Rovers', city:'Rustenburg', t:2, base:4.0, fin:2.3, youth:2, c1:'#7a1620', c2:'#15100f', scout:'AFR' },
  { n:'Uthongathi FC', s:'Uthongathi', nick:'The Sugar Boys', city:'Tongaat', t:2, base:3.8, fin:2, youth:2, c1:'#13316b', c2:'#eef4fb', scout:'AFR' },
  { n:'Mangaung United', s:'Mangaung', nick:'The Roses', city:'Bloemfontein', t:2, base:3.9, fin:2.1, youth:2, c1:'#e8a874', c2:'#2e2015', scout:'AFR' },
  { n:'Bizana Pondo Chiefs', s:'Pondo Chiefs', nick:'Amapondo', city:'Bizana', t:2, base:3.7, fin:1.9, youth:1, c1:'#15234f', c2:'#8c1620', scout:'AFR' },
  { n:'Vaal United', s:'Vaal United', nick:'The Vaalies', city:'Vereeniging', t:2, base:3.8, fin:2, youth:2, c1:'#2b1640', c2:'#6a4a7a', scout:'AFR' },
  { n:'Nkowankowa Stars', s:'Nkowankowa', nick:'Tinyeleti', city:'Tzaneen', t:2, base:3.6, fin:1.8, youth:1, c1:'#15284a', c2:'#c9a24a', scout:'AFR' },
  { n:'Gqeberha City', s:'Gqeberha City', nick:'The Bay Boys', city:'Gqeberha', t:2, base:3.8, fin:2, youth:2, c1:'#38a4dd', c2:'#0b2847', scout:'AFR' },
  { n:'Klerksdorp City', s:'Klerksdorp', nick:'Die Stadsjongens', city:'Klerksdorp', t:2, base:3.6, fin:1.8, youth:1, c1:'#5c0f23', c2:'#ecdede', scout:'AFR' },
  { n:'Soweto Kings', s:'Soweto Kings', nick:'Amakhosi Asekasi', city:'Soweto', t:2, base:3.9, fin:2.1, youth:3, c1:'#eab308', c2:'#151208', scout:'AFR' },
  { n:'FC Bayview', s:'Bayview', nick:'The Seagulls', city:'Durban', t:2, base:3.7, fin:1.9, youth:4, c1:'#111111', c2:'#8a6d3a', scout:'AFR' },
  { n:'Komani FC', s:'Komani', nick:'The Frontier Boys', city:'Komani', t:2, base:3.7, fin:1.9, youth:2, c1:'#0b4a4d', c2:'#eef9f8', scout:'AFR' },
  { n:'Paarl Rangers', s:'Paarl', nick:'The Winelands', city:'Paarl', t:2, base:3.6, fin:1.8, youth:2, c1:'#d6266a', c2:'#f6c9dc', scout:'AFR' },
  { n:'Empangeni FC', s:'Empangeni', nick:'The Sugar Cane Boys', city:'Empangeni', t:2, base:3.5, fin:1.7, youth:1, c1:'#f5c518', c2:'#111111', scout:'AFR' },
  { n:'Musina City', s:'Musina', nick:'The Border Boys', city:'Musina', t:2, base:3.5, fin:1.6, youth:1, c1:'#6e020f', c2:'#f4ece2', scout:'AFR' }
]

/* ---------------- nationalities ---------------- */
const NATIONS = {
  DZ:{name:'Algeria',caf:1},        AO:{name:'Angola',caf:1},       BJ:{name:'Benin',caf:1},
  BW:{name:'Botswana',caf:1},       BF:{name:'Burkina Faso',caf:1}, BI:{name:'Burundi',caf:1},
  CM:{name:'Cameroon',caf:1},       CV:{name:'Cape Verde',caf:1},   CF:{name:'Central African Rep.',caf:1},
  TD:{name:'Chad',caf:1},           KM:{name:'Comoros',caf:1},      CG:{name:'Congo',caf:1},
  CD:{name:'DR Congo',caf:1},       DJ:{name:'Djibouti',caf:1},     EG:{name:'Egypt',caf:1},
  GQ:{name:'Equatorial Guinea',caf:1}, ER:{name:'Eritrea',caf:1},   SZ:{name:'Eswatini',caf:1},
  ET:{name:'Ethiopia',caf:1},       GA:{name:'Gabon',caf:1},        GM:{name:'Gambia',caf:1},
  GH:{name:'Ghana',caf:1},          GN:{name:'Guinea',caf:1},       GW:{name:'Guinea-Bissau',caf:1},
  CI:{name:'Ivory Coast',caf:1},    KE:{name:'Kenya',caf:1},        LS:{name:'Lesotho',caf:1},
  LR:{name:'Liberia',caf:1},        LY:{name:'Libya',caf:1},        MG:{name:'Madagascar',caf:1},
  MW:{name:'Malawi',caf:1},         ML:{name:'Mali',caf:1},         MR:{name:'Mauritania',caf:1},
  MU:{name:'Mauritius',caf:1},      MA:{name:'Morocco',caf:1},      MZ:{name:'Mozambique',caf:1},
  NA:{name:'Namibia',caf:1},        NE:{name:'Niger',caf:1},        NG:{name:'Nigeria',caf:1},
  RW:{name:'Rwanda',caf:1},         ST:{name:'Sao Tome and Principe',caf:1}, SN:{name:'Senegal',caf:1},
  SC:{name:'Seychelles',caf:1},     SL:{name:'Sierra Leone',caf:1}, SO:{name:'Somalia',caf:1},
  ZA:{name:'South Africa',caf:1},   SS:{name:'South Sudan',caf:1},  SD:{name:'Sudan',caf:1},
  TZ:{name:'Tanzania',caf:1},       TG:{name:'Togo',caf:1},         TN:{name:'Tunisia',caf:1},
  UG:{name:'Uganda',caf:1},         ZM:{name:'Zambia',caf:1},       ZW:{name:'Zimbabwe',caf:1},
  BR:{name:'Brazil'}, AR:{name:'Argentina'}, UY:{name:'Uruguay'}, CO:{name:'Colombia'},
  CL:{name:'Chile'},  VE:{name:'Venezuela'}, PY:{name:'Paraguay'}, PE:{name:'Peru'},
  EC:{name:'Ecuador'}, BO:{name:'Bolivia'}, PT:{name:'Portugal'}, ES:{name:'Spain'},
  FR:{name:'France'}, RS:{name:'Serbia'}, NL:{name:'Netherlands'}, BE:{name:'Belgium'},
  DE:{name:'Germany'}, IT:{name:'Italy'}, HR:{name:'Croatia'},
JP:{name:'Japan'}, KR:{name:'South Korea'}, CN:{name:'China'}, SA:{name:'Saudi Arabia'},
  GB:{name:'England'}, US:{name:'United States'}, MX:{name:'Mexico'}, CA:{name:'Canada'},
  TR:{name:'Turkey'}, SE:{name:'Sweden'}, PL:{name:'Poland'}, GR:{name:'Greece'},
  AU:{name:'Australia'}, IN:{name:'India'},   AE:{name:'UAE'}, AT:{name:'Austria'}, CH:{name:'Switzerland'}, CR:{name:'Costa Rica'}, CZ:{name:'Czechia'}, DK:{name:'Denmark'}, FI:{name:'Finland'}, HU:{name:'Hungary'}, ID:{name:'Indonesia'}, IE:{name:'Ireland'}, IR:{name:'Iran'}, JM:{name:'Jamaica'}, NO:{name:'Norway'}, RO:{name:'Romania'}, SK:{name:'Slovakia'}, TH:{name:'Thailand'}, UA:{name:'Ukraine'}, VN:{name:'Vietnam'}
};
function natName(c){ return (NATIONS[c]||{name:c}).name; }
const CAF_NATIONS = Object.keys(NATIONS).filter(c => NATIONS[c].caf);

/* national-team baseline strength (0-10) */
const NAT_STRENGTH = {
  MA:9.6, SN:9.2, EG:9.0, CI:8.9, NG:8.8, DZ:8.6, TN:8.3, CM:8.3, ML:8.1, GH:8.0,
  CD:7.9, BF:7.8, ZA:7.9, CV:7.5, GN:7.4, TZ:7.0, AO:7.0, ZM:7.0, GQ:6.8, MZ:6.7,
  UG:6.7, BJ:6.6, GA:6.6, SD:6.4, MR:6.3, NA:6.2, LY:6.2, KE:6.2, ZW:6.2, GW:6.1,
  MW:5.9, MG:5.9, TG:5.9, SL:5.7, NE:5.7, RW:5.6, BW:5.5, BI:5.4, ET:5.4, CG:5.6,
  GM:5.8, CF:5.2, LR:5.0, SS:4.6, TD:4.5, KM:5.5, ST:4.2, DJ:4.0, SC:4.0, ER:4.2,
  SO:3.8, MU:4.4, SZ:4.8, LS:4.8,   BR:9.7, AR:9.8, FR:9.8, ES:9.7, GB:9.6, DE:9.5, PT:9.4, NL:9.3, IT:9.2, BE:9.1, UY:9.0, CO:8.9, HR:8.8, JP:8.8, MX:8.5, US:8.4,   DK:8.3, KR:8.3, IR:8.3, CH:8.2, EC:8.2, AT:8.0, AU:8.0, RS:7.9, TR:7.9, CA:7.9, CL:7.8, SE:7.8, PL:7.7, UA:7.7, PY:7.7, NO:7.6, PE:7.6,   SA:7.4, CZ:7.4, HU:7.4, GR:7.3, RO:7.2, CR:7.2, VE:7.2, SK:7.0, IE:7.0, JM:6.8, CN:6.8, AE:6.8, FI:6.4, BO:6.4, TH:6.2, VN:6.0, ID:5.9, IN:5.8
};

const SCOUT_POOLS = {
  AFR: ['ZW','ZW','ZM','MZ','MW','LS','SZ','NA','BW','CD','CD','GH','NG','CM','SN','CI','BI','RW','TZ','KE','UG','AO',
        'MA','EG','DZ','TN','LY','SD','ML','BF','GN','ET','CV','MG','MU','LR','SL','TG','BJ','GA','CG','GM','GW','MR'],
  SAM: ['BR','BR','AR','AR','UY','CO','CL','VE','PY','PE','EC','BO','BR','AR','PT','RS','ZW','ZM','CD'],
  EUR: ['PT','ES','FR','RS','NL','BE','DE','IT','HR','GB','PL','SE','DK','NO','CH','AT','CZ','GR','TR','UA','IE','RO','HU','FI','SK'],
  ASIA: ['JP','KR','CN','SA','AU','IR','AE','IN','ID','TH','VN'],
  NAM: ['US','US','CA','MX','MX','CR','JM']
};

/* ---------------- scouting network ---------------- */
const SCOUT_REGION_NAMES = { AFR: 'Africa', SAM: 'South America', EUR: 'Europe', ASIA: 'Asia', NAM: 'North America' };
const SCOUT_REGION_DESC = {
  AFR: 'Your home continent — a baseline presence here from day one.',
  SAM: 'Technical, flair-heavy talent, hard to find without contacts on the ground.',
  EUR: 'Well-scouted by everyone — expensive to build a real edge here.',
  ASIA: 'A thin market, but little competition for what is there.',
  NAM: 'Small but increasingly athletic pool, mostly untapped.'
};
const SCOUTNET_COST = [0, 5, 11, 20];
const SCOUTNET_MAX = 3;
function ensureScoutNet(t) { if (!t.scoutNet) t.scoutNet = { AFR: 1, SAM: 0, EUR: 0, ASIA: 0, NAM: 0 }; return t.scoutNet; }
function upgradeScoutRegion(G, region) {
  const t = G.teams[G.myTeam], net = ensureScoutNet(t);
  if (!SCOUT_POOLS[region]) return { ok: false, msg: 'Unknown region.' };
  const lvl = net[region] || 0;
  if (lvl >= SCOUTNET_MAX) return { ok: false, msg: 'This region is already fully scouted.' };
  const cost = SCOUTNET_COST[lvl + 1];
  if (t.budget < cost) return { ok: false, msg: `You need ${money(cost)} to expand scouting there.` };
  t.budget = Math.round((t.budget - cost) * 100) / 100;
  t.fin.buys += cost;
  net[region] = lvl + 1;
  return { ok: true, msg: `Scouting network in ${SCOUT_REGION_NAMES[region]} expanded to level ${net[region]}.` };
}
function scoutNetBonus(t, nat) { if (nat === 'ZA' || !t.scoutNet) return 0; const r = Object.keys(SCOUT_POOLS).find(k => SCOUT_POOLS[k].includes(nat)) || (regionOf(nat) === 'ASI' ? 'ASIA' : regionOf(nat)); return (t.scoutNet[r] || 0) * 2; }

/* ---------------- names ---------------- */
const NAMES = {   ARAB: { f:['Mohamed','Ahmed','Youssef','Omar','Karim','Walid','Hamza','Amine','Riyad','Mahmoud','Ali','Zakaria'], l:['Benali','Mahrez','Salah','Hakimi','Ziyech','Trabelsi','Boufal','Slimani','Hassan','Elneny','Brahimi','Bounou','Amrabat'] },   FR_AFR: { f:['Moussa','Ibrahim','Abdoulaye','Seydou','Issa','Mamadou','Yacouba','Adama','Bakary','Cheick','Souleymane','Aboubacar'], l:['Traore','Konate','Diarra','Sangare','Coulibaly','Ouedraogo','Sow','Barry','Camara','Keita','Bamba','Toure'] },   EN_AFR: { f:['Mohamed','Kei','Alhassan','Musa','Ousman','Ebrima','Sulayman','Kaba'], l:['Kamara','Bangura','Sesay','Jallow','Ceesay','Sanneh','Kallon','Conteh','Weah'] },   PT_AFR: { f:['Ryan','Garry','Jamiro','Bebe','Stopira','Kenny','Dylan','Joao','Nuno'], l:['Mendes','Rodrigues','Monteiro','Tavares','Lopes','Semedo','Fortes','Cabral','Gomes','Pereira'] },   HORN: { f:['Getaneh','Abubeker','Amir','Mohamed','Yonas','Dawit','Abdi','Saladin','Hassan'], l:['Kebede','Nasir','Tesfaye','Hailu','Mulugeta','Said','Warsame','Abdulle','Yusuf','Bekele'] },   ISLAND: { f:['Lalaina','Rado','Njiva','Fenitra','Anicet','Kevin','Jean','Hery','Cedric'], l:['Rakotoarimanana','Andrianirina','Rabemananjara','Ramaroson','Rakotonirina','Ravelo','Soondur','Pierre','Bax'] },   ES: { f:['Carlos','Javier','Alejandro','Miguel','Sergio','Diego','Pablo','Hector','Luis','Jorge','Alvaro','Raul'], l:['Garcia','Fernandez','Lopez','Martinez','Sanchez','Gomez','Ruiz','Torres','Ramirez','Flores','Mendoza','Castillo','Herrera','Vega'] },   NL: { f:['Daan','Bram','Sven','Joris','Thijs','Ruben','Niels','Lars','Wout','Jens'], l:['De Jong','Van Dijk','Bakker','Jansen','De Vries','Peeters','Willems','Maes','Janssens','Claes'] },   NORDIC: { f:['Erik','Lars','Magnus','Henrik','Jonas','Mikael','Anders','Oskar','Emil','Mathias'], l:['Andersen','Johansson','Hansen','Nilsson','Larsen','Haaland','Lindgren','Berg','Virtanen','Korhonen'] },   SLAV: { f:['Piotr','Jakub','Tomasz','Marek','Pavel','Lukas','Oleksandr','Andriy','Dominik','Michal'], l:['Kowalski','Nowak','Lewandowski','Novak','Svoboda','Kovac','Shevchenko','Zinchenko','Dvorak','Horvath'] },   CEE: { f:['Andrei','Florin','Razvan','Gabor','Zoltan','Daniel','Balint','Attila','Csaba'], l:['Popescu','Ionescu','Stanciu','Szoboszlai','Kerkez','Szalai','Nagy','Toth','Szabo','Dragusin'] },   GR: { f:['Giorgos','Dimitris','Nikos','Kostas','Panagiotis','Vasilis','Thanasis'], l:['Papadopoulos','Pelkas','Bakasetas','Mavropanos','Tzolis','Giakoumakis','Karelis','Siopis'] },   TR: { f:['Emre','Mehmet','Hakan','Burak','Kerem','Arda','Cengiz','Ozan','Yusuf'], l:['Yilmaz','Demir','Calhanoglu','Celik','Akturkoglu','Kahveci','Guler','Kokcu','Ayhan','Yildiz'] },   IR: { f:['Mehdi','Sardar','Alireza','Saman','Ehsan','Omid','Karim','Majid'], l:['Taremi','Azmoun','Jahanbakhsh','Beiranvand','Hajsafi','Ghoddos','Ansarifard','Rezaei'] },   SEASIA: { f:['Rizky','Ricky','Evan','Supachai','Thanawat','Quang','Cong','Hung','Dimas','Nguyen'], l:['Pratama','Kambuaya','Walsh','Chaiyasit','Phan','Nguyen','Tran','Pham','Saputra','Kongsawat'] },   DIASPORA_ASIAN: { f:['Kenji','Jun','David','Daniel','Kevin','Jin','Ryan','Min','Andy','Hiro'], l:['Tanaka','Kim','Nguyen','Park','Lee','Chen','Wong','Suzuki','Tran','Yamamoto'] },
  ZA_BLACK: { f:['Themba','Sipho','Thabo','Lebohang','Kagiso','Tshepo','Katlego','Mpho','Karabo','Bongani','Siyabonga','Lucky','Thulani','Nkosinathi','Andile','Ayanda','Sibusiso','Mandla','Musa','Njabulo','Teboho','Neo','Given','Blessing','Innocent','Khuliso','Lungelo','Zakhele'], l:['Mokoena','Ndlovu','Nkosi','Zungu','Mahlangu','Mokwena','Mbatha','Khumalo','Dlamini','Zwane','Sithole','Mabaso','Maluleka','Mudau','Mkhize','Ngcobo','Radebe','Masango','Sibiya','Mashego','Mothiba','Modiba','Makgopa','Mofokeng','Molefe','Tau','Mthembu'] },
  ZA_COLOURED: { f:['Keagan','Ronwen','Aubrey','Grant','Brandon','Dino','Bradley','Kyle','Wayne','Ricardo','Cole','Jody','Ashley','Shaun','Tyrone','Devon'], l:['Fredericks','Petersen','Williams','Abrahams','Jacobs','Adams','Isaacs','Daniels','Arendse','Solomons','Samuels','Davids','Pietersen','Hendricks','Cupido','Jantjies'] },
  ZA_WHITE: { f:['Dean','Ryan','Luke','Jaco','Pieter','Johan','Duncan','Craig','Marc','Riaan','Kobus','Grant','Wesley','Ethan'], l:['Grobler','Coetzee','Botha','Van Wyk','Du Plessis','Smit','Van der Merwe','Pretorius','Venter','Joubert','Visser','Steyn','Kruger','Naude','Mitchell','Parker'] },
  ZA_INDIAN: { f:['Kiran','Rohan','Imran','Yusuf','Ashwin','Nikhil','Rishi','Zaid','Preshen','Devan','Suren','Kaveer','Farhaan','Ravi'], l:['Naidoo','Pillay','Govender','Moodley','Chetty','Reddy','Singh','Patel','Maharaj','Khan','Ismail','Cassim','Moosa','Naicker'] },
  DIASPORA_BLACK: { f:['Kylian','Marcus','Jordan','Tyrone','Moussa','Ibrahim','Jamal','Darnell','Malik','Idrissa','Yann','Cheick'], l:['Diallo','Traore','Mensah','Williams','Johnson','Camara','Toure','Bamba','Sylla','Kante','Adebayo','Okoye'] },
  FR_WHITE: { f:['Antoine','Hugo','Lucas','Theo','Julien','Maxime','Romain','Baptiste'], l:['Martin','Bernard','Dubois','Laurent','Moreau','Fournier','Girard','Lambert'] },
  GB_WHITE: { f:['Jack','Harry','Oliver','Callum','Connor','Liam','Jamie','Declan'], l:['Smith','Jones','Taylor','Brown','Walker','Wright','Evans','Hughes'] },
  ZA: {
    f: ['Themba','Sipho','Thabo','Lebohang','Kagiso','Tshepo','Katlego','Mpho','Karabo','Bongani','Siyabonga','Lucky','Percy','Thulani','Nkosinathi','Andile','Ayanda','Lwandile','Sibusiso','Mandla','Musa','Thamsanqa','Njabulo','Sanele','Oscar','Keagan','Ronwen','Aubrey','Teboho','Neo','Gift','Given','Blessing','Innocent','Wiseman','Phillip','Vusimuzi','Dumisani','Zakhele','Lehlohonolo','Rivaldo','Grant','Bradley','Ashley','Devin','Jayden','Riaan','Hendrik','Pieter','Deon','Wayne','Shaun','Luke','Ethan','Tiaan','Ruan','Tendai','Rudzani','Mulalo','Phathutshedzo','Tinyiko','Hlayiseka','Solly','Sello','Tumelo','Refiloe','Kabelo','Ofentse','Reneilwe','Lesego','Mosa','Tebogo','Sibongiseni','Mthokozisi','Nhlanhla','Sandile','Bhekithemba','Mlungisi','Zola','Athenkosi','Lonwabo','Anele','Odwa','Avuyile','Sivuyile','Yanga','Bantu','Khanya','Keenan','Clayton','Dillon','Justin','Marlon','Warren','Elton','Basil','Rulani','Sifiso','Nqobile','Mzwandile','Siphesihle','Fortune','Prince','Emmanuel','Tshimangadzo','Livhuwani','Ndivhuwo','Thendo','Lufuno','Mashudu','Xolani','Zwelethu','Simphiwe','Sizwe','Vusi','Bafana','Junior','Senzo','Mpumelelo','Thabang','Aphiwe','Luvo','Menzi','Sbahle','Tshepiso','Kamohelo','Katleho','Bandile'],
    l: ['Mokoena','Ndlovu','Nkosi','Zungu','Mahlangu','Mokwena','Mbatha','Khumalo','Dlamini','Zwane','Sithole','Mabaso','Maluleka','Mudau','Mkhize','Ngcobo','Mahlambi','Radebe','Masango','Sibiya','Mashego','Mothiba','Modiba','Makgopa','Mofokeng','Rayners','Grobler','Coetzee','Botha','Van Wyk','Du Plessis','Fredericks','Petersen','Adams','Arendse','Williams','Jantjies','Booysen','Mabena','Monare','Letsoalo','Sekgota','Hlanti','Nyauza','Ngezana','Mvala','Mbekile','Mlambo','Shange','Manyisa','Mashiane','Tshabalala','Pule','Baloyi','Chauke','Rikhotso','Nkuna','Maswanganyi','Ngobeni','Mathebula','Hlungwani','Mulaudzi','Ramovha','Netshiozwi','Nemakonde','Nevhulaudzi','Mabunda','Shivambu','Mngoma','Gumede','Mthembu','Buthelezi','Cele','Zulu','Shabalala','Mnguni','Msimango','Ntuli','Molefe','Motaung','Sebola','Mahlatsi','Seema','Ramalepe','Lekgwathi','Maboe','Lepasa','Matlaba','Sithebe','Nkota','Mbule','Kekana','Nkanyane','Mnyamane','Mabiliso','Kutumela','Daniels','Hendricks','September','Isaacs','Davids','Abrahams','Solomons','Roberts','Vermeulen','Rakhale','Mashiloane','Ndlondlo','Xulu','Makaringe','Ntshangase','Mabasa','Khoza','Ngwenya','Mthethwa','Sikhakhane','Zikalala','Mavimbela','Nhlapo','Tau','Mokgopo','Maart','Tembo']
  },
  ZW: { f:['Tendai','Knowledge','Marshall','Khama','Terrence','Prince','Divine','Walter','Blessing','Brendan','Talent','Tapiwa','Munashe','Farai','Nqobizitha','Never','Perfect'], l:['Musona','Munetsi','Kadewere','Chirewa','Hadebe','Mudimu','Chipezeze','Zvirekwi','Mushekwi','Karuru','Dube','Moyo','Sibanda','Ncube','Mutizwa'] },
  ZM: { f:['Patson','Enock','Fashion','Lubambo','Kings','Clatous','Rally','Emmanuel','Edward','Golden','Roderick'], l:['Daka','Mwepu','Sakala','Musonda','Chama','Bwalya','Mulenga','Banda','Kangwa','Sinkala','Chipeta'] },
  MZ: { f:['Reinildo','Geny','Witi','Stanley','Clesio','Elias','Zainadine','Telmo'], l:['Mandava','Catamo','Mangue','Pelembe','Macuacua','Chirindza','Mahumana','Uate'] },
  MW: { f:['Gabadinho','Richard','Chawanangwa','Frank','Peter','Chimwemwe','Limbikani'], l:['Mhango','Mbulu','Kaunda','Banda','Mwansa','Chirwa','Phiri','Mpinganjira'] },
  LS: { f:['Nkoto','Jane','Motebang','Tumelo','Lipholo'], l:['Malifa','Thaba','Moleko','Sekhoane','Mpeta','Ramoholi'] },
  SZ: { f:['Sabelo','Sanele','Felix','Mthunzi','Tebogo'], l:['Ndzinisa','Badza','Mamba','Dlamini','Sihlongonyane'] },
  NA: { f:['Deon','Peter','Riaan','Petrus','Absalom','Wangu'], l:['Hotto','Shalulile','Iyambo','Kambindu','Tjiueza','Nghitongo'] },
  BW: { f:['Thatayaone','Mothusi','Kabelo','Onkabetse','Segolame'], l:['Ditlhokwe','Mothibi','Sebina','Makwana','Rajoo','Moloi'] },
  CD: { f:['Fiston','Gael','Jonathan','Yannick','Chancel','Arsene','Merveille','Cedric'], l:['Mayele','Kakuta','Bolingi','Bakambu','Mbemba','Zakuani','Kabangu','Mputu','Lomalisa'] },
  GH: { f:['Kwame','Kofi','Yaw','Emmanuel','Daniel','Issah','Osman'], l:['Owusu','Mensah','Asante','Boateng','Appiah','Nuhu','Baba','Addo'] },
  NG: { f:['Chinedu','Emeka','Ifeanyi','Samuel','Kelechi','Ahmed','Victor'], l:['Okafor','Eze','Obi','Adeyemi','Nwankwo','Onyekuru','Musa','Bassey'] },
  CM: { f:['Franck','Serge','Olivier','Karl','Jean','Andre'], l:['Etoundi','Ngadeu','Bassogog','Toko','Mbeumo','Anguissa'] },
  SN: { f:['Mamadou','Ibrahima','Cheikh','Moussa','Pape','Assane'], l:['Diallo','Ndiaye','Sarr','Gueye','Diop','Fall','Ciss'] },
  CI: { f:['Yaya','Serge','Ibrahim','Franck','Jean'], l:['Kone','Traore','Diomande','Bamba','Coulibaly','Gradel'] },
  BI: { f:['Saido','Cedric','Gael','Jospin'], l:['Berahino','Amissi','Bigirimana','Nsabiyumva','Nahimana'] },
  RW: { f:['Innocent','Djihad','Olivier','Herve'], l:['Nshuti','Bizimana','Rutanga','Niyonzima','Manzi'] },
  TZ: { f:['Mbwana','Simon','Novatus','Feisal'], l:['Samatta','Msuva','Miroshi','Salum','Mapinduzi'] },
  KE: { f:['Michael','Victor','Masoud','Erick'], l:['Olunga','Wanyama','Juma','Omondi','Ouma'] },
  UG: { f:['Farouk','Denis','Allan','Emmanuel'], l:['Miya','Onyango','Okello','Kayondo','Ssekiganda'] },
  AO: { f:['Gelson','Fredy','Zito','Job','Mateus'], l:['Dala','Ribeiro','Luvumbo','Gaspar','Bastos'] },
  BR: { f:['Lucas','Gabriel','Matheus','Rafael','Bruno','Thiago','Everton','Wesley','Danilo','Vinicius','Caio','Pedro'], l:['Silva','Santos','Oliveira','Ferreira','Costa','Almeida','Ribeiro','Souza','Carvalho','Rocha','Moreira','Barbosa'] },
  AR: { f:['Juan','Matias','Facundo','Nicolas','Emiliano','Gonzalo','Lautaro','Franco'], l:['Gonzalez','Rodriguez','Fernandez','Martinez','Lopez','Romero','Sosa','Aguirre'] },
  UY: { f:['Diego','Sebastian','Nicolas','Federico','Mauricio'], l:['Suarez','Rodriguez','Gimenez','Olivera','Cabrera','Bentancur'] },
  CO: { f:['Jhon','Carlos','Andres','Juan','Wilmar'], l:['Moreno','Cardona','Restrepo','Quintero','Mosquera','Borja'] },
  CL: { f:['Matias','Cristian','Ignacio','Felipe'], l:['Vargas','Contreras','Fuentes','Aravena','Soto'] },
  VE: { f:['Jefferson','Yeferson','Darwin','Josef'], l:['Savarino','Soteldo','Machis','Martinez','Rincon'] },
  PY: { f:['Miguel','Ramon','Angel','Oscar'], l:['Almiron','Sosa','Romero','Cardozo','Benitez'] },
  PT: { f:['Joao','Ruben','Tiago','Nuno','Diogo'], l:['Silva','Ferreira','Costa','Pereira','Fonseca'] },
  RS: { f:['Nemanja','Aleksandar','Stefan','Milos'], l:['Jovic','Mitrovic','Pavlovic','Radic','Ilic'] },
  DE: { f:['Lukas','Maximilian','Jonas','Leon','Finn'], l:['Muller','Schneider','Weber','Fischer','Becker'] },
  IT: { f:['Marco','Luca','Matteo','Alessandro','Davide'], l:['Rossi','Russo','Ferrari','Esposito','Romano'] },
  HR: { f:['Luka','Ivan','Marko','Ante','Josip'], l:['Horvat','Kovacic','Modric','Peric','Juric'] },
  JP: { f:['Takumi','Yuto','Kaoru','Ritsu','Hiroki'], l:['Sato','Suzuki','Tanaka','Watanabe','Ito'] },
  KR: { f:['Min-jun','Seung-woo','Jae-sung','Heung','Kang-in'], l:['Kim','Lee','Park','Son','Hwang'] },
  CN: { f:['Wei','Jian','Hao','Lei','Peng'], l:['Wang','Li','Zhang','Chen','Liu'] },
  SA: { f:['Salem','Fahad','Khalid','Yasser','Nawaf'], l:['Al-Dawsari','Al-Faraj','Al-Ghannam','Al-Shamrani','Al-Otaibi'] }
};

/* ---------------- positions ---------------- */
const POS_LIST = ['GK','RB','CB','LB','RWB','LWB','CDM','CM','CAM','RM','LM','RW','LW','ST','CF'];
const POS_GROUP = { GK:'GK', RB:'DEF', CB:'DEF', LB:'DEF', RWB:'DEF', LWB:'DEF', CDM:'MID', CM:'MID', CAM:'MID', RM:'MID', LM:'MID', RW:'ATT', LW:'ATT', ST:'ATT', CF:'ATT' };
const GROUP_ORDER = ['GK','DEF','MID','ATT'];
const POS_ATT = { GK:0.02, CB:0.35, RB:0.6, LB:0.6, RWB:0.8, LWB:0.8, CDM:0.55, CM:1.0, CAM:1.4, RM:1.25, LM:1.25, RW:1.6, LW:1.6, CF:1.8, ST:2.2 };
const POS_DEF = { GK:2.0, CB:2.0, RB:1.5, LB:1.5, RWB:1.2, LWB:1.2, CDM:1.5, CM:0.9, CAM:0.5, RM:0.6, LM:0.6, RW:0.35, LW:0.35, CF:0.2, ST:0.1 };

const FORMATIONS = {
  '4-4-2':   ['GK','RB','CB','CB','LB','RM','CM','CM','LM','ST','ST'],
  '4-3-3':   ['GK','RB','CB','CB','LB','CDM','CM','CM','RM','ST','LM'],
  '4-2-3-1': ['GK','RB','CB','CB','LB','CDM','CDM','RM','CF','LM','ST'],
  '4-1-2-1-2': ['GK','RB','CB','CB','LB','CDM','CM','CM','CF','ST','ST'],
  '3-5-2':   ['GK','CB','CB','CB','RM','CDM','CM','CM','LM','ST','ST'],
  '5-3-2':   ['GK','RB','CB','CB','CB','LB','CDM','CM','CM','ST','ST'],
  '4-2-3-1 (CAM)': ['GK','RB','CB','CB','LB','CDM','CDM','RW','CAM','LW','ST'],
  '4-3-3 (Wide)':  ['GK','RB','CB','CB','LB','CM','CDM','CM','RW','ST','LW'],
  '4-3-1-2':       ['GK','RB','CB','CB','LB','CM','CDM','CM','CAM','ST','ST'],
  '3-4-3':         ['GK','CB','CB','CB','RWB','CM','CM','LWB','RW','ST','LW'],
  '3-4-1-2':       ['GK','CB','CB','CB','RWB','CM','CM','LWB','CAM','ST','ST'],
  '3-5-2 (WB)':    ['GK','CB','CB','CB','RWB','CM','CDM','CM','LWB','ST','ST'],
  '5-3-2 (WB)':    ['GK','RWB','CB','CB','CB','LWB','CM','CDM','CM','ST','ST'],
  '5-4-1':         ['GK','RWB','CB','CB','CB','LWB','RM','CM','CM','LM','ST']
};
const FORM_COORDS = {
  '4-4-2':   [[50,7],[85,25],[63,20],[37,20],[15,25],[85,55],[62,48],[38,48],[15,55],[60,80],[40,80]],
  '4-3-3':   [[50,7],[85,25],[63,20],[37,20],[15,25],[50,42],[65,55],[35,55],[85,72],[50,84],[15,72]],
  '4-2-3-1': [[50,7],[85,25],[63,20],[37,20],[15,25],[60,42],[40,42],[80,64],[50,66],[20,64],[50,86]],
  '4-1-2-1-2': [[50,7],[85,25],[63,20],[37,20],[15,25],[50,40],[72,54],[28,54],[50,68],[60,84],[40,84]],
  '3-5-2':   [[50,7],[68,20],[50,17],[32,20],[88,52],[50,38],[66,56],[34,56],[12,52],[60,82],[40,82]],
  '5-3-2':   [[50,7],[88,28],[68,18],[50,16],[32,18],[12,28],[50,42],[66,56],[34,56],[60,82],[40,82]],
  '4-2-3-1 (CAM)': [[50,7],[85,25],[63,20],[37,20],[15,25],[62,42],[38,42],[84,66],[50,64],[16,66],[50,86]],
  '4-3-3 (Wide)':  [[50,7],[85,25],[63,20],[37,20],[15,25],[68,52],[50,40],[32,52],[84,74],[50,86],[16,74]],
  '4-3-1-2':       [[50,7],[85,25],[63,20],[37,20],[15,25],[68,46],[50,38],[32,46],[50,66],[60,84],[40,84]],
  '3-4-3':         [[50,7],[68,20],[50,17],[32,20],[88,42],[62,45],[38,45],[12,42],[82,76],[50,86],[18,76]],
  '3-4-1-2':       [[50,7],[68,20],[50,17],[32,20],[88,42],[62,45],[38,45],[12,42],[50,64],[60,84],[40,84]],
  '3-5-2 (WB)':    [[50,7],[68,20],[50,17],[32,20],[88,45],[64,52],[50,38],[36,52],[12,45],[60,82],[40,82]],
  '5-3-2 (WB)':    [[50,7],[90,32],[68,18],[50,16],[32,18],[10,32],[64,52],[50,40],[36,52],[60,82],[40,82]],
  '5-4-1':         [[50,7],[88,30],[68,18],[50,16],[32,18],[12,30],[85,55],[62,48],[38,48],[15,55],[50,82]]
};
/* ---- more formations, including different kinds of 4-4-2 ---- */
Object.assign(FORMATIONS, {
  '4-4-2 (Holding)':   ['GK','RB','CB','CB','LB','RM','CDM','CM','LM','ST','ST'],
  '4-4-2 (Wide)':      ['GK','RB','CB','CB','LB','RW','CM','CM','LW','ST','ST'],
  '4-4-2 (Defensive)': ['GK','RB','CB','CB','LB','RM','CDM','CDM','LM','ST','ST'],
  '4-4-2 (Diamond)':   ['GK','RB','CB','CB','LB','CDM','CM','CM','CAM','ST','ST'],
  '4-4-2 (Split)':     ['GK','RB','CB','CB','LB','RM','CM','CM','LM','CF','ST'],
  '4-1-4-1':           ['GK','RB','CB','CB','LB','CDM','RM','CM','CM','LM','ST'],
  '4-5-1':             ['GK','RB','CB','CB','LB','RM','CM','CDM','CM','LM','ST'],
  '4-2-2-2':           ['GK','RB','CB','CB','LB','CDM','CDM','CAM','CAM','ST','ST'],
  '4-3-2-1':           ['GK','RB','CB','CB','LB','CM','CDM','CM','CAM','CAM','ST'],
  '4-2-4':             ['GK','RB','CB','CB','LB','CM','CM','RW','ST','ST','LW'],
  '4-1-3-2':           ['GK','RB','CB','CB','LB','CDM','RM','CAM','LM','ST','ST'],
  '3-4-2-1':           ['GK','CB','CB','CB','RWB','CM','CM','LWB','CAM','CAM','ST'],
  '3-1-4-2':           ['GK','CB','CB','CB','CDM','RM','CM','CM','LM','ST','ST'],
  '3-5-1-1':           ['GK','CB','CB','CB','RWB','CM','CDM','CM','LWB','CAM','ST'],
  '5-2-3':             ['GK','RWB','CB','CB','CB','LWB','CM','CM','RW','ST','LW'],
  '5-2-1-2':           ['GK','RWB','CB','CB','CB','LWB','CM','CM','CAM','ST','ST']
});
Object.assign(FORM_COORDS, {
  '4-4-2 (Holding)':   [[50,7],[85,25],[63,20],[37,20],[15,25],[85,56],[60,44],[40,54],[15,56],[60,80],[40,80]],
  '4-4-2 (Wide)':      [[50,7],[85,25],[63,20],[37,20],[15,25],[86,62],[62,48],[38,48],[14,62],[60,82],[40,82]],
  '4-4-2 (Defensive)': [[50,7],[85,25],[63,20],[37,20],[15,25],[85,56],[62,42],[38,42],[15,56],[60,80],[40,80]],
  '4-4-2 (Diamond)':   [[50,7],[85,25],[63,20],[37,20],[15,25],[50,40],[72,54],[28,54],[50,68],[60,84],[40,84]],
  '4-4-2 (Split)':     [[50,7],[85,25],[63,20],[37,20],[15,25],[85,55],[62,46],[38,50],[15,55],[58,70],[42,84]],
  '4-1-4-1':           [[50,7],[85,25],[63,20],[37,20],[15,25],[50,38],[85,58],[62,56],[38,56],[15,58],[50,84]],
  '4-5-1':             [[50,7],[85,25],[63,20],[37,20],[15,25],[86,56],[64,50],[50,40],[36,50],[14,56],[50,84]],
  '4-2-2-2':           [[50,7],[85,25],[63,20],[37,20],[15,25],[62,40],[38,40],[68,64],[32,64],[60,84],[40,84]],
  '4-3-2-1':           [[50,7],[85,25],[63,20],[37,20],[15,25],[70,48],[50,40],[30,48],[64,66],[36,66],[50,86]],
  '4-2-4':             [[50,7],[85,25],[63,20],[37,20],[15,25],[60,44],[40,44],[86,72],[60,86],[40,86],[14,72]],
  '4-1-3-2':           [[50,7],[85,25],[63,20],[37,20],[15,25],[50,38],[78,58],[50,62],[22,58],[60,84],[40,84]],
  '3-4-2-1':           [[50,7],[68,20],[50,17],[32,20],[88,44],[62,45],[38,45],[12,44],[64,66],[36,66],[50,86]],
  '3-1-4-2':           [[50,7],[68,20],[50,17],[32,20],[50,36],[88,56],[62,52],[38,52],[12,56],[60,82],[40,82]],
  '3-5-1-1':           [[50,7],[68,20],[50,17],[32,20],[88,46],[66,52],[50,38],[34,52],[12,46],[50,68],[50,86]],
  '5-2-3':             [[50,7],[90,32],[68,18],[50,16],[32,18],[10,32],[60,46],[40,46],[84,74],[50,86],[16,74]],
  '5-2-1-2':           [[50,7],[90,32],[68,18],[50,16],[32,18],[10,32],[60,44],[40,44],[50,64],[60,84],[40,84]]
});
/* ---------------- faces ---------------- */
const SKINS = [
  { c:'#4a2c17', w:20 }, { c:'#573320', w:24 }, { c:'#6a4028', w:22 },
  { c:'#7d4f30', w:15 }, { c:'#96683f', w:8 },  { c:'#b0804f', w:5 },
  { c:'#d3a37a', w:3 },  { c:'#e6c29e', w:3 }
];
/* nationality -> skin-tone pool, so faces match the player's name origin */
const SKIN_GROUPS = {
  black:  SKINS.filter(s => ['#4a2c17','#573320','#6a4028','#7d4f30','#96683f'].includes(s.c)),
  latin:  SKINS.filter(s => ['#7d4f30','#96683f','#b0804f','#d3a37a','#e6c29e'].includes(s.c)),
  white:  SKINS.filter(s => ['#b0804f','#d3a37a','#e6c29e'].includes(s.c)),
  asian:  SKINS.filter(s => ['#d3a37a','#e6c29e'].includes(s.c)),
  mena:   SKINS.filter(s => ['#96683f','#b0804f','#d3a37a'].includes(s.c))
};
const NAT_SKIN_GROUP = {
  ZA:'sa', ZW:'black', ZM:'black', MZ:'black', MW:'black', LS:'black', SZ:'black', NA:'black', BW:'black',
  CD:'black', GH:'black', NG:'black', CM:'black', SN:'black', CI:'black', BI:'black', RW:'black', TZ:'black',
  KE:'black', UG:'black', AO:'black',
  BR:'latin', AR:'latin', UY:'latin', CO:'latin', CL:'latin', VE:'latin', PY:'latin',
  PT:'white', RS:'white', DE:'white', IT:'white', HR:'white',
  JP:'asian', KR:'asian', CN:'asian',
  SA:'mena'
};
function skinGroupFor(nat) {
  const g = NAT_SKIN_GROUP[nat];
  if (g === 'sa') return SKINS;
  return SKIN_GROUPS[g] || SKINS;
}

/* ---------------- portraits & ethnic groups ---------------- */
const _pr = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => 'plr-' + String(a + i).padStart(3, '0'));
const PLAYER_PORTRAITS = {
  coloured: [..._pr(1, 13), ..._pr(241, 283)],
  asian: [..._pr(14, 33), ..._pr(284, 336)],
  mena: [..._pr(34, 39), ..._pr(337, 378)],
  indian: [..._pr(40, 45), ..._pr(379, 382)],
  latin: [..._pr(46, 59), ..._pr(383, 435)],
  white: [..._pr(60, 99), ..._pr(140, 157), ..._pr(436, 475)],
  black: [..._pr(158, 240), ..._pr(476, 533)]
};
  /* ---------------- self-healing portraits ----------------    If a photo in players/ has been deleted, nobody is handed it any more, and anyone already    holding it is quietly given a replacement from the same group. */ const DEAD_PORTRAITS = new Set(), DEAD_GROUP = {}; function killPortrait(id) {   if (!id || DEAD_PORTRAITS.has(id)) return;   DEAD_PORTRAITS.add(id);   for (const g in PLAYER_PORTRAITS) if (PLAYER_PORTRAITS[g].includes(id)) { DEAD_GROUP[id] = g; PLAYER_PORTRAITS[g] = PLAYER_PORTRAITS[g].filter(x => x !== id); } } function portraitOwner(pid) {   if (typeof G === 'undefined' || !G || !G.teams) return null;   for (const t of G.teams) {     for (const p of t.squad) if (p.id === pid) return p;     for (const p of (t.youth || [])) if (p.id === pid) return p;     if (t.dev) for (const k of ['u11', 'u13', 'u15', 'grad']) for (const p of t.dev[k]) if (p.id === pid) return p;   }   for (const p of (G.freeAgents || [])) if (p.id === pid) return p;   return null; } function portraitFail(el) {   const dead = el.getAttribute('data-pr'), pid = +el.getAttribute('data-pl');   if (/^real-/.test(dead || '')) { console.warn('Real player photo missing: players/' + dead + '.jpg'); const sd = document.createElement('span'); sd.innerHTML = silhouetteSVG(el.width || 40); el.replaceWith(sd.firstChild); return; }   killPortrait(dead);   const own = pid ? portraitOwner(pid) : null;   const swap = id => { if (id && id !== dead && !DEAD_PORTRAITS.has(id)) { el.setAttribute('data-pr', id); el.src = 'players/' + id + '.jpg'; return true; } return false; };   if (own && own.real) {   if (own.portrait && own.portrait !== dead && swap(own.portrait)) return;   own.portrait = null;   const d = document.createElement('span');   d.innerHTML = faceSVG(own, el.width || 40);   el.replaceWith(d.firstChild);   return; } if (own && own.portrait && own.portrait !== dead && swap(own.portrait)) return;          /* already re-assigned elsewhere */   const grp = DEAD_GROUP[dead] || (own && (own.eth || ethnicGroupFor(own.nat)));   const arr = grp && PLAYER_PORTRAITS[grp];   if (arr && arr.length) {     const id = own ? portraitFromGroup(grp) : arr[Math.abs(pid || 0) % arr.length];       /* mail snapshots: stable pick */     if (own) own.portrait = id;     if (swap(id)) return;   }   if (own) { own.portrait = null; const d = document.createElement('span'); d.innerHTML = faceSVG(own, el.width || 40); el.replaceWith(d.firstChild); return; }   const d = document.createElement('span'); d.innerHTML = silhouetteSVG(el.width || 40); el.replaceWith(d.firstChild); } /* quietly check which photos really exist (cheap HEAD requests) so deleted ones are never assigned */ function probePortraits() {   if (typeof fetch !== 'function' || (typeof location !== 'undefined' && location.protocol === 'file:')) return;   const ids = []; for (const g in PLAYER_PORTRAITS) PLAYER_PORTRAITS[g].forEach(id => ids.push(id));   let i = 0;   const next = () => {     const batch = ids.slice(i, i + 12); i += 12; if (!batch.length) return;     Promise.all(batch.map(id => fetch('players/' + id + '.jpg', { method: 'HEAD' }).then(r => { if (r.status === 404) killPortrait(id); }).catch(() => {}))).then(() => setTimeout(next, 120));   };   setTimeout(next, 600); } probePortraits();
const PORTRAIT_USE = {};
function portraitFromGroup(group) {
  const arr = PLAYER_PORTRAITS[group];
  if (!arr || !arr.length) return null;
  let min = Infinity; arr.forEach(id => { min = Math.min(min, PORTRAIT_USE[id] || 0); });
  const id = pick(arr.filter(x => (PORTRAIT_USE[x] || 0) === min));
  PORTRAIT_USE[id] = (PORTRAIT_USE[id] || 0) + 1;
  return id;
}
const NAT_ETHNIC = {
  ZA: [['black', 70], ['coloured', 15], ['white', 12], ['indian', 3]],
  FR: [['black', 60], ['white', 40]],
  GB: [['white', 62], ['black', 35], ['indian', 1], ['asian', 1]],
  US: [['white', 52], ['black', 30], ['latin', 14], ['asian', 4]],
  CA: [['white', 70], ['black', 12], ['asian', 10], ['indian', 8]],
  AU: [['white', 80], ['black', 6], ['asian', 8], ['coloured', 6]],
  MX: [['latin', 80], ['white', 20]],
  CR: [['latin', 70], ['white', 25], ['black', 5]],
  JM: [['black', 100]],
  IN: [['indian', 100]],
  TR: [['white', 75], ['mena', 25]],
  IR: [['mena', 100]],
  SD: [['mena', 55], ['black', 45]],
  MR: [['mena', 50], ['black', 50]],
  SO: [['black', 70], ['mena', 30]],
  DJ: [['black', 60], ['mena', 40]]
};
const NORTH_AFRICA = ['MA','DZ','TN','LY','EG'];
const EURO_NATIONS = ['PT','ES','FR','RS','NL','BE','DE','IT','HR','PL','SE','DK','NO','CH','AT','CZ','GR','UA','IE','RO','HU','FI','SK'];
const LATIN_NATIONS = ['BR','AR','UY','CO','CL','VE','PY','PE','EC','BO'];
const ASIAN_NATIONS = ['JP','KR','CN','ID','TH','VN'];
const MENA_NATIONS = ['SA','AE'];
function ethnicGroupFor(nat) {
  if (NAT_ETHNIC[nat]) return wpick(NAT_ETHNIC[nat].map(([g,w])=>({g,w})), x=>x.w).g;
  if (NORTH_AFRICA.includes(nat)) return wpick([{g:'mena',w:90},{g:'black',w:10}], x=>x.w).g;   if (ASIAN_NATIONS.includes(nat)) return 'asian';
  if (MENA_NATIONS.includes(nat)) return 'mena';
  if (LATIN_NATIONS.includes(nat)) return wpick([{g:'white',w:45},{g:'latin',w:35},{g:'black',w:15},{g:'coloured',w:5}], x=>x.w).g;
  if (EURO_NATIONS.includes(nat)) return wpick([{g:'white',w:95},{g:'black',w:5}], x=>x.w).g;
  return wpick([{g:'black',w:95},{g:'coloured',w:5}], x=>x.w).g;
}
const GROUP_SKIN_KEY = { black:'black', white:'white', asian:'asian', mena:'mena', latin:'latin', coloured:'latin', indian:'mena' };

const HAIRS = ['fade','afro','dreads','braids','bald','cornrows','curls','buzz','hightop','mohawk','lineup','locs'];
const HAIR_COLOURS = ['#14100e','#1d1713','#241c16','#2f241b','#4a3320','#7a5326','#c9a227'];
const MANAGER_AVATARS = ['mgr-01','mgr-02','mgr-03','mgr-04','mgr-05','mgr-06','mgr-07','mgr-08','mgr-09','mgr-10','mgr-11','mgr-12','mgr-13','mgr-14','mgr-15','mgr-16','mgr-17','mgr-18','mgr-19','mgr-20','mgr-21','mgr-22','mgr-23','mgr-24','mgr-25','mgr-26','mgr-27','mgr-28'];

/* ---------------- competition names ---------------- */
const CUP_NAME   = 'Thatbank Cup';
const SUPER8     = 'Mzansi8';
const KNOCKOUT   = 'Bayakhala Knockout';
const CAF_NAME   = 'African Champions League';
const AFCON_NAME = 'Africa Cup of Nations';

/* ---------------- continental leagues ----------------
   Abstract: clubs carry a strength only, no individual players. */
const AFRICAN_LEAGUES = [
  { code:'EG', name:'Egypt Premier League', nat:'EG', rank:1, clubs:[
    ['FC Al Ahly',9.7],['FC Zamalek',9.0],['FC Pyramids',8.8],['Ismaily United',7.6],['FC Al Masry',7.8],['FC Ceramica Cleopatra',7.4],
    ['Enppi United',7.0],['FC Smouha',6.9],['FC National Bank',6.8],['FC Modern Future',7.1],['Gouna FC',6.6],['FC Pharco',6.9]] },
  { code:'MA', name:'Moroccan Premier League', nat:'MA', rank:2, clubs:[
    ['Wydad FC',9.4],['FC Raja Casablanca',9.2],['Berkane FC',9.0],['Rabat Army FC',8.2],['FC Maghreb Fes',7.5],['Oujda FC',7.3],
    ['FC Olympic Safi',7.1],['FC Hassania Agadir',7.0],['Tanger FC',7.2],['FC Difaa El Jadida',6.9],['FC Chabab Mohammedia',6.8],['FC Union Touarga',6.7]] },
  { code:'TN', name:'Tunisian Premier League', nat:'TN', rank:3, clubs:[
    ['FC Esperance de Tunis',9.3],['FC Etoile du Sahel',8.4],['FC Club Africain',8.3],['Sfax FC',8.1],['Monastir FC',8.0],['FC Stade Tunisien',7.4],
    ['FC Olympique Beja',7.0],['Bizerte FC',6.9],['Ben Guerdane FC',7.1],['Metlaoui FC',6.7],['Marsa FC',6.6],['Kairouan FC',6.5]] },
  { code:'DZ', name:'Algerian Premier League', nat:'DZ', rank:4, clubs:[
    ['Belouizdad FC',8.9],['Kabylie FC',8.4],['Alger City FC',8.6],['Setif FC',8.3],['Alger United',8.2],['Constantine FC',7.6],
    ['Oran FC',7.4],['Paradou FC',7.2],['Chlef FC',7.0],['Khenchela United',6.9],['Saoura FC',7.1],['Magra FC',6.6]] },
  { code:'CD', name:'Congo Premier League ', nat:'CD', rank:5, clubs:[
    ['FC Mazembe',9.1],['FC Vita Club',8.5],['Lupopo FC',8.0],['FC Motema Pembe',7.6],['FC Maniema Union',7.4],['FC Sanga Balende',7.2],
    ['AS Dauphins Noirs',6.9],['FC Renaissance',7.0],['JS Groupe Bazano',6.8],['US Panda',6.6],['OC Bukavu Dawa',6.5],['FC Simba',6.4]] },
  { code:'NG', name:'Nigeria Premier League', nat:'NG', rank:6, clubs:[
    ['Enyimba',8.4],['Rivers United',8.1],['Rangers International',7.9],['Kano Pillars',7.6],['Plateau United',7.7],['Remo Stars',7.8],
    ['Shooting Stars',7.3],['Lobi Stars',7.1],['Akwa United',7.0],['Bendel Insurance',6.9],['Sunshine Stars',6.8],['Nasarawa United',6.7]] },
  { code:'AO', name:'Angola Premier League', nat:'AO', rank:7, clubs:[
    ['Petro de Luanda',8.7],['Primeiro de Agosto',8.5],['Sagrada Esperanca',7.9],['Interclube',7.4],['Bravos do Maquis',7.3],['Academica do Lobito',7.1],
    ['Wiliete SC',7.0],['Kabuscorp',6.9],['Recreativo do Libolo',6.8],['Desportivo da Huila',6.7],['Progresso Sambizanga',6.6],['Lunda Sul',6.4]] },
  { code:'TZ', name:'Tanzania Premier League', nat:'TZ', rank:8, clubs:[
    ['Simba SC',8.6],['Young Africans',8.7],['Azam FC',8.0],['Coastal Union',7.3],['Namungo FC',7.1],['Singida Black Stars',7.2],
    ['Mtibwa Sugar',6.8],['KMC FC',6.9],['Geita Gold',6.7],['Tanzania Prisons',6.6],['Ihefu SC',6.5],['Dodoma Jiji',6.4]] },
  { code:'SD', name:'Sudan Premier League', nat:'SD', rank:9, clubs:[
    ['Al Hilal Omdurman',8.5],['Al Merrikh',8.4],['Al Ahli Shendi',7.4],['Hay Al Arab',7.0],['Al Amal Atbara',6.9],['Al Khartoum',6.8],
    ['Al Ittihad Wad Madani',6.7],['Al Ahly Atbara',6.6],['Al Hilal Kadougli',6.5],['Merrikh Nyala',6.4],['Tuti FC',6.2],['Al Zomorda',6.3]] },
  { code:'ZM', name:'Zambia Premier League', nat:'ZM', rank:10, clubs:[
    ['Zesco United',8.2],['Power Dynamos',7.9],['Nkana FC',7.7],['Red Arrows',7.5],['Green Eagles',7.3],['Forest Rangers',7.2],
    ['Zanaco',7.4],['Kabwe Warriors',6.9],['Lusaka Dynamos',6.8],['Prison Leopards',6.7],['NAPSA Stars',6.6],['Mufulira Wanderers',6.5]] },
  { code:'SN', name:'Senegal Premier League', nat:'SN', rank:11, clubs:[
    ['Generation Foot',9.0],['Teungueth FC',8.6],['Jaraaf',8.3],['Diambars FC',7.6],['Casa Sports',7.8],['Guediawaye FC',7.3],
    ['AS Pikine',7.5],['US Goree',7.0],['Stade de Mbour',6.9],['Niary Tally',6.7],['Linguere',6.8],['Dakar Sacre-Coeur',6.6]] },
  { code:'CI', name:'Ivorian Ligue 1', nat:'CI', rank:12, clubs:[
    ['ASEC Mimosas',8.8],['Africa Sports',8.5],['Stade d\'Abidjan',8.0],['San Pedro FC',7.6],['Sewe Sport',7.4],['Williamsville AC',7.2],
    ['Issia Wazi',7.0],['Bouake FC',6.9],['Racing Club Abidjan',6.8],['FC Abengourou',6.7],['Gagnoa FC',6.6],['Korhogo FC',6.5]] },
  { code:'GH', name:'Ghana Premier League', nat:'GH', rank:13, clubs:[
    ['Asante Kotoko',8.3],['Hearts of Oak',8.1],['Aduana Stars',7.8],['Medeama SC',7.5],['Bechem United',7.4],['Dreams FC',7.2],
    ['Great Olympics',7.0],['King Faisal',6.9],['Berekum Chelsea',6.9],['Legon Cities',6.8],['Karela United',6.7],['Nations FC',6.6]] },
  { code:'CM', name:'Cameroon Elite One', nat:'CM', rank:14, clubs:[
    ['Coton Sport Garoua',8.2],['PWD Bamenda',7.7],['Union Douala',7.6],['Dynamo Douala',7.3],['Fovu Club',7.0],['Colombe Sportive',6.9],
    ['Yong Sports Academy',6.8],['Bamboutos FC',6.7],['Astres FC',6.6],['Victoria United',6.5],['UMS de Loum',6.4],['Renaissance Ngoumou',6.3]] },
  { code:'ML', name:'Mali Premiere Division', nat:'ML', rank:15, clubs:[
    ['Djoliba AC',8.0],['Stade Malien',7.8],['Real Bamako',7.5],['AS Police',7.2],['USFAS Bamako',7.0],['Onze Createurs',6.9],
    ['Guidars FC',6.7],['Djekafo Niono',6.6],['Yeelen Olympique',6.5],['AS Bakaridjan',6.4],['COB Bougouni',6.3],['Attar Club',6.2]] },
  { code:'GN', name:'Guinee Ligue 1', nat:'GN', rank:16, clubs:[
    ['Horoya AC',7.6],['Hafia FC',7.3],['AS Kaloum Star',7.0],['CI Kamsar',6.6],['Satellite FC',6.7],['Ashanti Golden Boys',6.5],
    ['Milo FC',6.4],['Wakriya FC',6.3],['FC Difaba Kindia',6.2],['Fello Star',6.1],['Sangoyah FC',6.0],['Gangan FC',5.9]] },
  { code:'LY', name:'Libyan Premier League', nat:'LY', rank:17, clubs:[
    ['Al-Ahly Tripoli',7.3],['Al-Ittihad Tripoli',7.1],['Al-Madina',6.5],['Al-Akhdar Benghazi',6.6],['Al-Nasr Benghazi',6.4],['Al-Hilal Benghazi',6.3],
    ['Al-Tahaddy Benghazi',6.2],['Darnes',6.1],['Al-Shat Misrata',6.0],['Al-Tersana',5.9],['Sebha Club',5.8],['Al-Entesar',5.7]] },
  { code:'KE', name:'Kenyan Premier League', nat:'KE', rank:18, clubs:[
    ['Gor Mahia',7.2],['AFC Leopards',6.9],['Tusker FC',6.8],['Kakamega Homeboyz',6.5],['Kenya Police FC',6.4],['Bandari FC',6.3],
    ['Sofapaka',6.2],['Ulinzi Stars',6.1],['KCB FC',5.9],['Nzoia Sugar',6.0],['Mathare United',5.9],['Posta Rangers',5.8]] },
  { code:'UG', name:'Uganda Premier League', nat:'UG', rank:19, clubs:[
    ['Vipers SC',7.1],['KCCA FC',6.9],['Wakiso Giants',6.2],['URA FC',6.6],['Express FC',6.4],['SC Villa',6.3],
    ['Bul FC',6.1],['Onduparaka FC',6.0],['Police FC',5.9],['Busoga United',5.8],['Gaddafi FC',5.7],['Mbarara City',5.9]] },
  { code:'MZ', name:'Mozambique Mocambola', nat:'MZ', rank:20, clubs:[
    ['Ferroviario Maputo',7.0],['Costa do Sol',6.8],['UD Songo',6.6],['Desportivo Maputo',6.2],['Black Bulls',6.3],['Liga Muculmana',6.1],
    ['Ferroviario Nampula',6.0],['Textafrica',5.9],['Ferroviario Beira',5.9],['Matchedje',5.8],['Incomati',5.7],['Chibuto FC',5.6]] },
  { code:'ZW', name:'Zimbabwe Premier Soccer League', nat:'ZW', rank:21, clubs:[
    ['Dynamos FC',6.9],['FC Platinum',6.8],['CAPS United',6.7],['Highlanders FC',6.6],['Ngezi Platinum Stars',6.4],['Manica Diamonds',5.9],
    ['Chicken Inn',6.1],['Bulawayo Chiefs',6.0],['Black Rhinos',5.8],['Yadah FC',5.7],['ZPC Kariba',5.6],['Herentals FC',5.9]] },
  { code:'GA', name:'Gabon Championnat National', nat:'GA', rank:22, clubs:[
    ['CF Mounana',6.8],['Mangasport',6.6],['AS Pelican',6.5],['Stade Mandji',6.3],['Missile FC',6.1],['AO Sogara',6.0],
    ['Akwembe FC',5.9],['Olympique de Moanda',5.8],['Sons of Nations',5.7],['Delta Tele Star',5.6],['FC 105 Libreville',5.9],['Centre Boulariam',5.5]] },
  { code:'BF', name:'Burkina Faso Premier League', nat:'BF', rank:23, clubs:[
    ['Rahimo FC',6.7],['Etoile Filante',6.6],['ASFA Yennenga',6.5],['Salitas FC',6.4],['AS Douanes',6.2],['USFA',6.1],
    ['RC Bobo-Dioulasso',6.0],['Rail Club du Kadiogo',5.9],['EFO Ouagadougou',5.9],['Majestic SC',5.8],['Vitesse FC',5.7],['Kozaf FC',5.6]] },
  { code:'BW', name:'Botswana Premier League', nat:'BW', rank:24, clubs:[
    ['Township Rollers',6.0],['Jwaneng Galaxy',5.9],['Gaborone United',5.7],['TAFIC',5.6],['Orapa United',5.6],['Sua Flamingoes',5.6],
    ['Security Systems FC',5.5],['BCL Stars',5.6],['Mochudi Centre Chiefs',5.5],['Extension Gunners',5.5],['Nico United',5.5],['Mogoditshane Fighters',5.5]] },
  { code:'NA', name:'Namibia Premier League', nat:'NA', rank:25, clubs:[
    ['African Stars',6.2],['Black Africa',6.0],['Civics FC',5.9],['Young African',5.8],['Orlando Pirates Windhoek',5.9],['Life Fighters',5.7],
    ['Tura Magic',5.6],['Eleven Arrows',5.6],['Blue Waters FC',5.5],['Julinho Sporting',5.5],['UNAM FC',5.5],['Mighty Gunners',5.5]] }
];


/* ---------------- Tier 3 (index 3) — Mzansi 4th Division ---------------- */
/* ---- remaining real club names become game names (runs once when the game loads) ---- */ (function renameRealClubs() {   const DONE = ['EG', 'MA', 'TN', 'DZ'];   const FIX = { 'FC Simba': 'Simba Kinshasa FC', 'AS Dauphins Noirs': 'FC Dauphins Noirs', 'FC Renaissance': 'Renaissance FC', 'JS Groupe Bazano': 'FC Groupe Bazano', 'US Panda': 'Panda United', 'OC Bukavu Dawa': 'FC Bukavu Dawa',     'Orlando Pirates Windhoek': 'FC Windhoek Pirates', 'Chicken Inn': 'FC Chicken Roost', 'AFC Leopards': 'Leopards FC Nairobi', 'Dynamos FC': 'FC Harare Dynamos', 'ZPC Kariba': 'FC Kariba Power', 'Police FC': 'FC Police Uganda', 'Kenya Police FC': 'Police FC Kenya', 'AS Police': 'Police FC Bamako', 'FC 105 Libreville': '105 Libreville FC',     'UMS de Loum': 'Loum United', 'Simba SC': 'FC Simba Dar', 'AS Kaloum Star': 'Kaloum Star FC', 'Sebha Club': 'FC Sebha', 'Mbarara City': 'Mbarara United' };   const TAILS = [' FC', ' SC', ' AC', ' United', ' Utd'];   const HEADS = ['FC ', 'AS ', 'US ', 'CS ', 'ES ', 'MC ', 'JS ', 'RS ', 'CR ', 'IR ', 'CA ', 'CI ', 'NC ', 'OC ', 'DC ', 'TP ', 'UD ', 'CF ', 'AO ', 'EFO ', 'RC ', 'ASFA ', 'USFA ', 'ASO ', 'USM ', 'UMS ', 'COB ', 'USFAS ', 'FAR ', 'PWD ', 'SC ', 'AC '];   const auto = n => {     const tail = TAILS.find(t => n.toLowerCase().endsWith(t.toLowerCase()));     const head = HEADS.find(h => n.startsWith(h));     let b = n;     if (tail) b = b.slice(0, b.length - tail.length);     if (head) b = b.slice(head.length);     if (head === 'FC ') return b + ' FC';     if (tail === ' United' || tail === ' Utd') return b + ' FC';     if (head && !tail) return b + ' United';     return 'FC ' + b;   };   AFRICAN_LEAGUES.forEach(L => {     if (DONE.includes(L.code)) return;     L.clubs.forEach(c => {       const f = FIX[c[0]];       if (L.code === 'CD') { if (f) c[0] = f; } else c[0] = f || auto(c[0]);     });   });   const SA2 = {     'Platinum City Rovers': ['Platinum Rovers FC', null, 'The Roamers'],     'Uthongathi FC': ['FC Uthongathi', null, 'The Cane Boys'],     'Mangaung United': ['Mangaung FC', null, 'The Roses'],     'Bizana Pondo Chiefs': ['Bizana Pondo FC', 'Pondo', 'Amapondo Boys'],     'Vaal United': ['Vaal FC', 'Vaal', 'The Vaal Boys'],     'Nkowankowa Stars': ['Nkowankowa FC', null, 'Tinyeleti Boys'],     'Gqeberha City': ['Gqeberha United', 'Gqeberha', 'The Bay Lads'],     'Klerksdorp City': ['Klerksdorp United', null, null],     'Soweto Kings': ['Soweto United', 'Soweto', 'Amakhosi Asekasi'],     'FC Bayview': ['Bayview FC', null, 'The Gulls'],     'Komani FC': ['FC Komani', null, 'The Frontier Lads'],     'Paarl Rangers': ['Paarl United', 'Paarl', 'The Wine Boys'],     'Empangeni FC': ['FC Empangeni', null, null]   };   CLUBS.forEach(c => { const r = SA2[c.n]; if (r) { c.n = r[0]; if (r[1]) c.s = r[1]; if (r[2]) c.nick = r[2]; } }); })(); const CLUBS_T3 = [
  { n:'Joburg United', s:'Joburg Utd', nick:'The City Boys', city:'Johannesburg', t:3, base:3.3, fin:1.4, youth:2, c1:'#caa23a', c2:'#15110a' },
  { n:'Sandton FC', s:'Sandton', nick:'The Sandton Set', city:'Sandton', t:3, base:4.3, fin:1.5, youth:3, c1:'#15284a', c2:'#8fc0e8' },
  { n:'Ladysmith FC', s:'Ladysmith', nick:'The Smithies', city:'Ladysmith', t:3, base:3.1, fin:1.2, youth:1, c1:'#7c2d12', c2:'#fde68a' },
  { n:'Greytown United', s:'Greytown', nick:'The Midlanders', city:'Greytown', t:3, base:3.0, fin:1.1, youth:1, c1:'#3a3d40', c2:'#7a1620' },
  { n:'Emsinga FC', s:'Emsinga', nick:'Abafana baGogo', city:'Emsinga', t:3, base:3.0, fin:1.1, youth:1, c1:'#1f4d2e', c2:'#ead9b0' },
  { n:'Alexandra United', s:'Alex Utd', nick:'The Alex Boys', city:'Alexandra', t:3, base:3.2, fin:1.3, youth:2, c1:'#6b7280', c2:'#b91c1c' },
  { n:'Khayelitsha FC', s:'Khayelitsha', nick:'The Big Place', city:'Khayelitsha', t:3, base:3.2, fin:1.3, youth:2, c1:'#33363a', c2:'#e8b54a' },
  { n:'Umlazi United', s:'Umlazi Utd', nick:'The Township Kings', city:'Umlazi', t:3, base:3.1, fin:1.2, youth:1, c1:'#6b3a18', c2:'#d8b67a' },
  { n:'Tembisa FC', s:'Tembisa', nick:'T-Town', city:'Tembisa', t:3, base:3.1, fin:1.2, youth:1, c1:'#5c1420', c2:'#c0392b' },
  { n:'Mandela United', s:'Mandela Utd', nick:'Madiba\'s XI', city:'Mvezo', t:3, base:3.3, fin:1.4, youth:2, c1:'#121212', c2:'#caa23a' },
  { n:'Broke Boyz United', s:'Broke Boyz', nick:'The Skint XI', city:'Diepsloot', t:3, base:2.9, fin:0.8, youth:1, c1:'#6b4a2f', c2:'#e8dcc8' },
  { n:'Germiston FC', s:'Germiston', nick:'The Outlawz', city:'Johannesburg', t:3, base:3.0, fin:1.1, youth:1, c1:'#9c1b23', c2:'#153a7a' },
  { n:'Giyani FC', s:'Giyani FC', nick:'The Notorious', city:'Giyani', t:3, base:3.0, fin:1.1, youth:1, c1:'#15348c', c2:'#f2f4f8' },
  { n:'Amapiano United', s:'Amapiano Utd', nick:'The Log Drummers', city:'Katlehong', t:3, base:3.1, fin:1.2, youth:1, c1:'#8f1d1d', c2:'#f0d2a8' },
  { n:'Pinetown United', s:'Pinetown', nick:'The Winners', city:'Pinetown', t:3, base:2.9, fin:0.9, youth:1, c1:'#3fa0d8', c2:'#15284a' },
  { n:'Seshego FC', s:'Seshego', nick:'The Water Boys', city:'Seshego', t:3, base:3.0, fin:1.1, youth:2, c1:'#0b2a56', c2:'#9aa0a3' },
  { n:'Worcester FC', s:'Worcester', nick:'The Breede Valley Boys', city:'Worcester', t:3, base:2.9, fin:1.0, youth:1, c1:'#caa23a', c2:'#15110a' },
  { n:'Secunda United', s:'Secunda', nick:'The Petrochem Boys', city:'Secunda', t:3, base:2.8, fin:0.9, youth:1, c1:'#6e041a', c2:'#8fd0ef' },
  { n:'Kathu FC', s:'Kathu', nick:'The Diamond Fields', city:'Kathu', t:3, base:2.8, fin:0.85, youth:1, c1:'#15306b', c2:'#caa23a' },
  { n:'Graaff-Reinet City', s:'Graaff-Reinet', nick:'The Gem of the Karoo', city:'Graaff-Reinet', t:3, base:2.7, fin:0.8, youth:1, c1:'#7a1620', c2:'#f0b429' }
]

/* ---------------- Tier 4 (index 4) — Mzansi 5th Division (semi-pro) ---------------- */
const CLUBS_T4 = [
  { n:'Soshanguve City', s:'Soshanguve', nick:'The City', city:'Soshanguve', t:4, base:2.5, fin:0.5, youth:1, c1:'#6b5a2e', c2:'#c2703f' },
  { n:'Mamelodi City', s:'Mamelodi City', nick:'The Eastenders', city:'Mamelodi', t:4, base:2.9, fin:0.9, youth:3, c1:'#d7a86b', c2:'#2f6fa8' },
  { n:'Katlehong FC', s:'Katlehong', nick:'The Golden City', city:'Katlehong', t:4, base:2.4, fin:0.45, youth:1, c1:'#121212', c2:'#f0b429' },
  { n:'Sebokeng United', s:'Sebokeng', nick:'The Vaal Boys', city:'Sebokeng', t:4, base:2.4, fin:0.45, youth:1, c1:'#5c0f23', c2:'#8fd0ef' },
  { n:'Zola FC', s:'Zola FC', nick:'The Sowetans', city:'Soweto', t:4, base:2.5, fin:0.5, youth:1, c1:'#141414', c2:'#ea6518' },
  { n:'Duduza United', s:'Duduza', nick:'The Comforters', city:'Duduza', t:4, base:2.3, fin:0.4, youth:1, c1:'#15224a', c2:'#d9c48a' },
  { n:"Sing About Me I'm Dying Of Thirst FC", s:'SAMIDOT FC', nick:'Simply GOATED', city:'Pietermaritzburg', t:4, base:2.7, fin:0.95, youth:4, c1:'#111111', c2:'#ffffff', a1:'#fef08a', a2:'#0369a1' },
  { n:'Nah We Cousins FC', s:'We Cousins', nick:'The Family', city:'Joburg', t:4, base:2.3, fin:0.35, youth:1, c1:'#6e1420', c2:'#c9a24a' },
  { n:'Mmabatho United', s:'Mmabatho', nick:'The Hive', city:'Mmabatho', t:4, base:2.4, fin:0.45, youth:1, c1:'#15306b', c2:'#eef2f7' },
  { n:'Kimberley FC', s:'Kimberley FC', nick:'The Kings of the City', city:'Kimberley', t:4, base:2.4, fin:0.45, youth:1, c1:'#7a1620', c2:'#8fd0ef' },
  { n:'Hopefield FC', s:'Hopefield', nick:'The Land of Hope', city:'Pretoria', t:4, base:2.3, fin:0.35, youth:1, c1:'#0b4a9e', c2:'#eef3fb' },
  { n:'Izinqa United', s:'Izinqa Utd', nick:'The Shakers', city:'Richards Bay', t:4, base:2.3, fin:0.35, youth:1, c1:'#a8141c', c2:'#15100f' },
  { n:'Bethlehem FC', s:'Bethlehem FC', nick:'The gate', city:'Bethlehem', t:4, base:2.3, fin:0.35, youth:1, c1:'#0b4fa8', c2:'#f2c511' },
  { n:'Botshabelo United', s:'Botshabelo', nick:'The Free Staters', city:'Botshabelo', t:4, base:2.3, fin:0.35, youth:1, c1:'#b91c2c', c2:'#f8fafc' },
  { n:'Galeshewe FC', s:'Galeshewe', nick:'The Diamond Boys', city:'Kimberley', t:4, base:2.3, fin:0.35, youth:1, c1:'#7a1620', c2:'#f2c511' },
  { n:'Zwelitsha FC', s:'Zwelitsha', nick:'The Eastern Cape Boys', city:'Zwelitsha', t:4, base:2.2, fin:0.3, youth:1, c1:'#15509e', c2:'#eef3f8' },
  { n:'Beaufort West FC', s:'Beaufort West', nick:'The Karoo Crossing', city:'Beaufort West', t:4, base:2.2, fin:0.35, youth:1, c1:'#111111', c2:'#d4af37' },
  { n:'Standerton United', s:'Standerton', nick:'The Highveld Boys', city:'Standerton', t:4, base:2.1, fin:0.3, youth:1, c1:'#7a1620', c2:'#15284a' },
  { n:'Lephalale City', s:'Lephalale', nick:'The Coalfields', city:'Lephalale', t:4, base:2.1, fin:0.3, youth:1, c1:'#8c1a1a', c2:'#f7f3ee' },
  { n:'De Aar FC', s:'De Aar', nick:'The Karoo Junction', city:'De Aar', t:4, base:2.0, fin:0.25, youth:1, c1:'#14532d', c2:'#c9a227' }
]
CLUBS.push(...CLUBS_T3, ...CLUBS_T4);

/* ============================================================
   Mzansi Manager — flags
   Layered SVG specs drawn into an 18 x 12 box.
   ============================================================ */

/* layer helpers */
const H = (...c) => ({ t:'h', c });
const V = (...c) => ({ t:'v', c });
const HR = (c, r) => ({ t:'h', c, r });
const VR = (c, r) => ({ t:'v', c, r });
const BG = c => ({ t:'bg', c });
const ST = (c, x, y, r, n, rot) => ({ t:'star', c, x, y, r, n: n || 5, rot: rot || 0 });
const DISC = (c, x, y, r) => ({ t:'disc', c, x, y, r });
const CRES = (c, x, y, r, off) => ({ t:'cres', c, x, y, r, off: off || 0.42 });
const TRI = (c, w) => ({ t:'tri', c, w });
const RECT = (c, x, y, w, h) => ({ t:'rect', c, x, y, w, h });
    const DIAG = (c, w) => ({ t:'diag', c, w }); const RAW = svg => ({ t:'raw', svg });

const FLAGS = {
  /* ---------- Continental ---------- */
  DZ: [V('#006233','#ffffff'), CRES('#d21034', 9.6, 6, 2.5), ST('#d21034', 11.3, 6, 1.25)],
  AO: [H('#ce1126','#000000'), ST('#ffcb00', 9, 6, 1.9)],
  BJ: [VR(['#008751','#fcd116','#e8112d'], [1, 1, 1]), RECT('#008751', 0, 0, 6, 12), RECT('#fcd116', 6, 0, 12, 6), RECT('#e8112d', 6, 6, 12, 6)],
  BW: [HR(['#75aadb','#ffffff','#000000','#ffffff','#75aadb'], [4, 0.7, 2.6, 0.7, 4])],
  BF: [H('#ef2b2d','#009e49'), ST('#fcd116', 9, 6, 1.9)],
  BI: [RAW(`<rect width="18" height="12" fill="#ce1126"/><polygon points="0,0 9,6 0,12" fill="#1eb53a"/><polygon points="18,0 9,6 18,12" fill="#1eb53a"/><path d="M0 0L18 12M18 0L0 12" stroke="#ffffff" stroke-width="1.6"/><circle cx="9" cy="6" r="3" fill="#ffffff"/><path d="M9.00,3.40L9.22,4.09L9.95,4.09L9.36,4.52L9.59,5.21L9.00,4.78L8.41,5.21L8.64,4.52L8.05,4.09L8.78,4.09Z" fill="#ce1126"/><path d="M7.70,6.00L7.92,6.69L8.65,6.69L8.06,7.12L8.29,7.81L7.70,7.38L7.11,7.81L7.34,7.12L6.75,6.69L7.48,6.69Z" fill="#ce1126"/><path d="M10.30,6.00L10.52,6.69L11.25,6.69L10.66,7.12L10.89,7.81L10.30,7.38L9.71,7.81L9.94,7.12L9.35,6.69L10.08,6.69Z" fill="#ce1126"/>`)],
  CM: [V('#007a5e','#ce1126','#fcd116'), ST('#fcd116', 9, 6, 1.9)],
  CV: [HR(['#003893','#ffffff','#cf2027','#ffffff','#003893'], [5, 0.9, 0.9, 0.9, 4.3]), ST('#f7d116', 6.5, 7.5, 0.9)],
  CF: [HR(['#003082','#ffffff','#289728','#ffce00'], [3, 3, 3, 3]), RECT('#d21034', 8.1, 0, 1.8, 12), ST('#ffce00', 2, 1.6, 1.1)],
  TD: [V('#002664','#fecb00','#c60c30')],
  KM: [HR(['#ffff00','#ffffff','#ce1126','#3a75c4'], [3, 3, 3, 3]), TRI('#3d8e33', 7.5), ST('#ffffff', 2.5, 6, 0.55), CRES('#ffffff', 2.4, 6, 1.6)],
  CG: [BG('#009543'), { t:'band', c:'#fbde4a' }, { t:'cornerRed', c:'#dc241f' }],
  CD: [BG('#007fff'), DIAG('#f7d618', 3), ST('#f7d618', 3.3, 2.6, 1.5)],
  DJ: [H('#6ab2e7','#12ad2b'), TRI('#ffffff', 6.5), ST('#d7141a', 2.1, 6, 1.2)],
  EG: [H('#ce1126','#ffffff','#000000'), ST('#c09300', 9, 6, 1.3)],
  GQ: [H('#3e9a00','#ffffff','#e32118'), TRI('#0073ce', 4.4)],
  ER: [{ t:'erit' }],
  SZ: [HR(['#3e5eb9','#ffd900','#b10c0c','#ffd900','#3e5eb9'], [2.6, 0.7, 4.4, 0.7, 2.6]), RECT('#000000', 5.6, 5.3, 6.8, 1.4)],
  ET: [H('#078930','#fcdd09','#da121a'), DISC('#0f47af', 9, 6, 2.6), ST('#fcdd09', 9, 6, 1.9)],
  GA: [H('#009e60','#fcd116','#3a75c4')],
  GM: [HR(['#ce1126','#ffffff','#0c1c8c','#ffffff','#3a7728'], [3.4, 0.6, 4, 0.6, 3.4])],
  GH: [H('#ce1126','#fcd116','#006b3f'), ST('#000000', 9, 6, 1.6)],
  GN: [V('#ce1126','#fcd116','#009460')],
  GW: [BG('#ce1126'), RECT('#fcd116', 6, 0, 12, 6), RECT('#009e49', 6, 6, 12, 6), ST('#000000', 3, 6, 1.6)],
  CI: [V('#f77f00','#ffffff','#009e60')],
  KE: [HR(['#000000','#ffffff','#be3a34','#ffffff','#006600'], [3.3, 0.55, 4.3, 0.55, 3.3]), { t:'shield', c1:'#be3a34', c2:'#ffffff' }],
  LS: [HR(['#00209f','#ffffff','#009543'], [4.6, 2.8, 4.6]), { t:'hat', c:'#000000' }],
  LR: [{ t:'stripes11', c1:'#bf0a30', c2:'#ffffff' }, RECT('#002868', 0, 0, 5, 5), ST('#ffffff', 2.5, 2.5, 1.5)],
  LY: [HR(['#e70013','#000000','#239e46'], [3, 6, 3]), CRES('#ffffff', 9.4, 6, 1.5), ST('#ffffff', 10.7, 6, 0.8)],
  MG: [BG('#fc3d32'), RECT('#007e3a', 0, 6, 18, 6), RECT('#ffffff', 0, 0, 6, 12)],
  MW: [H('#000000','#ce1126','#339e35'), { t:'sunrise', c:'#ce1126' }],
  ML: [V('#14b53a','#fcd116','#ce1126')],
  MR: [BG('#006233'), RECT('#cd2a3e', 0, 0, 18, 1.5), RECT('#cd2a3e', 0, 10.5, 18, 1.5), CRES('#ffc400', 9, 7, 2.4, -0.3), ST('#ffc400', 9, 3.9, 0.9)],
  MU: [H('#ea2839','#1a206d','#ffd500','#00a551')],
  MA: [BG('#c1272d'), ST('#006233', 9, 6, 3, 5)],
  MZ: [H('#009a3d','#ffffff','#000000','#ffffff','#fce100'), TRI('#d21034', 6.6), ST('#ffffff', 2.2, 6, 1.4)],
  NA: [{ t:'namibia' }],
  NE: [HR(['#e05206','#ffffff','#0db02b'], [4, 4, 4]), DISC('#e05206', 9, 6, 1.7)],
  NG: [V('#008751','#ffffff','#008751')],
  RW: [HR(['#00a1de','#fad201','#20603d'], [6, 3, 3]), DISC('#e5be01', 13.5, 3, 1.4)],
  ST: [HR(['#12ad2b','#ffce00','#12ad2b'], [3.4, 5.2, 3.4]), TRI('#d21034', 4.6), ST('#000000', 9.2, 6, 0.9), ST('#000000', 12.2, 6, 0.9)],
  SN: [V('#00853f','#fdef42','#e31b23'), ST('#00853f', 9, 6, 1.6)],
  SC: [{ t:'seychelles' }],
  SL: [H('#1eb53a','#ffffff','#0072c6')],
  SO: [BG('#4189dd'), ST('#ffffff', 9, 6, 3)],
  ZA: [{ t:'za' }],
  SS: [{ t:'southsudan' }],
  SD: [H('#d21034','#ffffff','#000000'), TRI('#007229', 6)],
  TZ: [{ t:'tanzania' }],
  TG: [{ t:'togo' }],
  TN: [BG('#e70013'), DISC('#ffffff', 9, 6, 3.4), CRES('#e70013', 9.3, 6, 2.2), ST('#e70013', 10.1, 6, 1.1)],
  UG: [HR(['#000000','#fcdc04','#d90000','#000000','#fcdc04','#d90000'], [2, 2, 2, 2, 2, 2]), DISC('#ffffff', 9, 6, 2.3), DISC('#d90000', 9, 6, 1.1)],
  ZM: [BG('#198a00'), RECT('#de2010', 11.7, 5, 2, 7), RECT('#000000', 13.7, 5, 2, 7), RECT('#ef7d00', 15.7, 5, 2, 7), { t:'eagle', c:'#ef7d00' }],
  ZW: [HR(['#319208','#ffd200','#d40000','#000000','#d40000','#ffd200','#319208'], [1.71, 1.71, 1.71, 1.72, 1.71, 1.71, 1.71]), TRI('#ffffff', 6.4), ST('#d40000', 2.2, 6, 1.5)],

  /* ---------- overseas ---------- */
  BR: [BG('#009b3a'), { t:'rhombus', c:'#fedf00' }, DISC('#002776', 9, 6, 2.2)],
  AR: [H('#74acdf','#ffffff','#74acdf'), DISC('#f6b40e', 9, 6, 1.2)],
  UY: [{ t:'uruguay' }],
  CO: [HR(['#fcd116','#003893','#ce1126'], [6, 3, 3])],
  CL: [BG('#ffffff'), RECT('#d52b1e', 0, 6, 18, 6), RECT('#0039a6', 0, 0, 6, 6), ST('#ffffff', 3, 3, 1.7)],
  VE: [H('#ffcc00','#00247d','#cf142b'), { t:'arcstars', c:'#ffffff' }],
  PY: [H('#d52b1e','#ffffff','#0038a8'), DISC('#0038a8', 9, 6, 1.3), DISC('#ffffff', 9, 6, 1)],
  PE: [V('#d91023','#ffffff','#d91023')],
  EC: [HR(['#ffdd00','#0033a0','#ef3340'], [6, 3, 3])],
  BO: [H('#d52b1e','#f9e300','#007934')],
  PT: [VR(['#046a38','#da291c'], [7, 11]), DISC('#ffe900', 7, 6, 1.9), DISC('#da291c', 7, 6, 1.2)],
  ES: [HR(['#aa151b','#f1bf00','#aa151b'], [3, 6, 3])],
  FR: [V('#002395','#ffffff','#ed2939')],
  RS: [H('#c6363c','#0c4076','#ffffff')],
  NL: [H('#ae1c28','#ffffff','#21468b')],
  BE: [V('#000000','#fdda24','#ef3340')],
  DE: [H('#000000','#dd0000','#ffce00')],
  IT: [V('#009246','#ffffff','#ce2b37')],
  HR: [{ t:'checker' }],
  JP: [{ t:'japan' }],
  KR: [{ t:'korea' }],
  CN: [BG('#de2910'), ST('#ffde00', 3, 3, 1.4), ST('#ffde00', 5.6, 1.6, 0.4), ST('#ffde00', 6.4, 2.9, 0.4), ST('#ffde00', 6.2, 4.5, 0.4), ST('#ffde00', 5.3, 5.4, 0.4)],
SA: [BG('#006c35'), { t:'saudi' }],
  GB: [BG('#ffffff'), RECT('#ce1124', 0, 5, 18, 2), RECT('#ce1124', 8, 0, 2, 12)],
  US: [H('#b22234','#ffffff','#b22234','#ffffff','#b22234','#ffffff','#b22234'), RECT('#3c3b6e', 0, 0, 7, 6.5), ST('#ffffff', 3.5, 3.25, 1.1, 5)],
  MX: [V('#006341','#ffffff','#ce1126')],
  CA: [V('#ff0000','#ffffff','#ff0000')],
  TR: [BG('#e30a17'), CRES('#ffffff', 8, 6, 2.3), ST('#ffffff', 11, 6, 1.0)],
  SE: [BG('#006aa7'), RECT('#fecc00', 6, 0, 2, 12), RECT('#fecc00', 0, 5, 18, 2)],
  PL: [H('#ffffff','#dc143c')],
  GR: [H('#0d5eaf','#ffffff','#0d5eaf','#ffffff','#0d5eaf')],
  AU: [BG('#00247d'), RECT('#ffffff', 0, 0, 7, 5), ST('#ffffff', 14, 3, 1, 7), ST('#ffffff', 11, 8, 0.8, 7)],
  IN: [H('#ff9933','#ffffff','#138808'), DISC('#000080', 9, 6, 1.1)],   AE: [H('#00732f','#ffffff','#000000'), RECT('#ff0000', 0, 0, 4.5, 12)],   AT: [H('#ed2939','#ffffff','#ed2939')],   CH: [BG('#da291c'), RECT('#ffffff', 7.8, 2.5, 2.4, 7), RECT('#ffffff', 5.5, 4.8, 7, 2.4)],   CR: [HR(['#002b7f','#ffffff','#ce1126','#ffffff','#002b7f'], [1, 1, 2, 1, 1])],   CZ: [H('#ffffff','#d7141a'), TRI('#11457e', 9)],   DK: [BG('#c8102e'), RECT('#ffffff', 5.5, 0, 2, 12), RECT('#ffffff', 0, 5, 18, 2)],   FI: [BG('#ffffff'), RECT('#003580', 5, 0, 2.6, 12), RECT('#003580', 0, 4.7, 18, 2.6)],   HU: [H('#ce2939','#ffffff','#477050')],   ID: [H('#ff0000','#ffffff')],   IE: [V('#169b62','#ffffff','#ff883e')],   IR: [H('#239f40','#ffffff','#da0000'), DISC('#da0000', 9, 6, 1.3)],   JM: [RAW(`<rect width="18" height="12" fill="#000000"/><polygon points="0,0 18,0 9,6" fill="#009b3a"/><polygon points="0,12 18,12 9,6" fill="#009b3a"/><path d="M0 0L18 12M18 0L0 12" stroke="#fed100" stroke-width="1.6"/>`)],   NO: [BG('#ba0c2f'), RECT('#ffffff', 4.6, 0, 3.6, 12), RECT('#ffffff', 0, 4.2, 18, 3.6), RECT('#00205b', 5.5, 0, 1.8, 12), RECT('#00205b', 0, 5.1, 18, 1.8)],   RO: [V('#002b7f','#fcd116','#ce1126')],   SA: [{ t:'saudi' }],   SK: [H('#ffffff','#0b4ea2','#ee1c25'), RECT('#ee1c25', 3.2, 3, 3.6, 4.4), RECT('#ffffff', 4.8, 3.8, 0.4, 2.8), RECT('#ffffff', 4, 4.6, 2, 0.4)],   TH: [HR(['#a51931','#f4f5f8','#2d2a4a','#f4f5f8','#a51931'], [1, 1, 2, 1, 1])],   UA: [H('#0057b7','#ffd700')],   VN: [BG('#da251d'), ST('#ffff00', 9, 6.3, 3.2)]
};

/* ---------- renderer ---------- */
function starPath(cx, cy, r, n, rot) {
  const pts = [];
  const inner = n === 5 ? r * 0.382 : r * 0.5;
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 ? inner : r;
    const ang = (Math.PI / n) * i - Math.PI / 2 + (rot || 0);
    pts.push((cx + rad * Math.cos(ang)).toFixed(2) + ',' + (cy + rad * Math.sin(ang)).toFixed(2));
  }
  return 'M' + pts.join('L') + 'Z';
}
function bands(c, r, vertical) {
  const total = (r || c.map(() => 1)).reduce((a, b) => a + b, 0);
  const span = vertical ? 18 : 12;
  let pos = 0, out = '';
  c.forEach((col, i) => {
    const w = ((r ? r[i] : 1) / total) * span;
    out += vertical
      ? `<rect x="${pos.toFixed(2)}" y="0" width="${(w + 0.02).toFixed(2)}" height="12" fill="${col}"/>`
      : `<rect x="0" y="${pos.toFixed(2)}" width="18" height="${(w + 0.02).toFixed(2)}" fill="${col}"/>`;
    pos += w;
  });
  return out;
}

function layerSVG(L) {
  switch (L.t) {
    case 'bg': return `<rect width="18" height="12" fill="${L.c}"/>`;     case 'raw': return L.svg;
    case 'h': return bands(L.c, L.r, false);
    case 'v': return bands(L.c, L.r, true);
    case 'rect': return `<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" fill="${L.c}"/>`;
    case 'tri': return `<path d="M0 0L${L.w} 6L0 12Z" fill="${L.c}"/>`;
    case 'diag': return `<path d="M0 0L${L.w + 4} 0L0 ${L.w + 3}Z" fill="none"/><path d="M0 ${12 - (L.w || 3)}L${(L.w || 3) + 5} 0L18 0L18 1.5L7 12L0 12Z" fill="${L.c}" opacity="0"/><path d="M0 12L12 0" stroke="${L.c}" stroke-width="${(L.w || 3)}" />`;
    case 'star': return `<path d="${starPath(L.x, L.y, L.r, L.n, L.rot)}" fill="${L.c}"/>`;
    case 'disc': return `<circle cx="${L.x}" cy="${L.y}" r="${L.r}" fill="${L.c}"/>`;
    case 'cres': { const id = 'cm' + (window.__cres = (window.__cres || 0) + 1), v = L.off < 0, sh = L.r * 0.28; return `<mask id="${id}"><rect width="18" height="12" fill="#fff"/><circle cx="${L.x + (v ? 0 : sh)}" cy="${L.y + (v ? -sh : 0)}" r="${L.r * 0.8}" fill="#000"/></mask><circle cx="${L.x}" cy="${L.y}" r="${L.r}" fill="${L.c}" mask="url(#${id})"/>`; }
    case 'saltire': return `<path d="M0 0L18 12M18 0L0 12" stroke="${L.c}" stroke-width="1.6"/>`;
    case 'band': return `<path d="M0 12L18 0V3.2L4.6 12Z" fill="${L.c}"/>`;
    case 'cornerRed': return `<path d="M18 3.2V12H4.6Z" fill="${L.c}"/>`;
    case 'shield': return `<path d="M9 2.4L11.4 6 9 9.6 6.6 6Z" fill="${L.c1}" stroke="${L.c2}" stroke-width=".5"/><path d="M6.2 3L11.8 9M11.8 3L6.2 9" stroke="#fff" stroke-width=".55"/>`;
    case 'hat': return `<path d="M9 3.6l1.9 3.2H7.1Z" fill="${L.c}"/><rect x="6.6" y="6.9" width="4.8" height=".7" fill="${L.c}"/>`;
    case 'sunrise': return `<path d="M9 3.2a2.1 2.1 0 0 1 2.1 2.1H6.9A2.1 2.1 0 0 1 9 3.2Z" fill="${L.c}"/>`;
    case 'eagle': return `<path d="M13.6 3.6q1.4-1.4 2.8 0-1.4 1.1-2.8 0Z" fill="${L.c}"/>`;
    case 'stripes11': {
      let o = '';
      for (let i = 0; i < 11; i++) o += `<rect y="${(i * 12 / 11).toFixed(2)}" width="18" height="${(12 / 11 + 0.02).toFixed(2)}" fill="${i % 2 ? L.c2 : L.c1}"/>`;
      return o;
    }
    case 'rhombus': return `<path d="M9 1.3L16.6 6 9 10.7 1.4 6Z" fill="${L.c}"/>`;
    case 'arcstars': {
      let o = '';
      for (let i = 0; i < 8; i++) {
        const a = -Math.PI * 0.78 + (Math.PI * 0.56 * i) / 7;
        o += `<path d="${starPath(9 + 3.1 * Math.sin(a), 6.6 + 3.1 * Math.cos(a), 0.5, 5)}" fill="${L.c}"/>`;
      }
      return o;
    }
    case 'za': return `
      <rect width="18" height="12" fill="#de3831"/>
      <rect y="6" width="18" height="6" fill="#002395"/>
      <path d="M0 0 L7.2 4.6 L18 4.9 L18 7.1 L7.2 7.4 L0 12 Z" fill="#ffffff"/>
      <path d="M0 1 L6.9 5.15 L18 5.35 L18 6.65 L6.9 6.85 L0 11 Z" fill="#007a4d"/>
      <path d="M0 1.4 L6.0 6 L0 10.6 Z" fill="#ffb81c"/>
      <path d="M0 2.3 L5.1 6 L0 9.7 Z" fill="#000000"/>`;
    case 'namibia': return `
      <rect width="18" height="12" fill="#003580"/>
      <path d="M18 0v4L4.6 12H0V8L13.4 0Z" fill="#ffffff" transform="translate(0,0)"/>
      <path d="M18 0.8v2.4L3.9 12H0.6Z" fill="#d21034"/>
      <path d="M18 0v.8L.6 12H0v-1Z" fill="#ffffff"/>
      <rect y="0" width="18" height="12" fill="none"/>
      <path d="M0 0h13.4L0 8Z" fill="#003580"/>
      <path d="M4.6 12H18V4Z" fill="#009543"/>
      <path d="${starPath(4.4, 3.2, 1.5, 12)}" fill="#ffce00"/>`;
    case 'southsudan': return `
      <rect width="18" height="12" fill="#ffffff"/>
      <rect width="18" height="3.4" fill="#000000"/>
      <rect y="4.3" width="18" height="3.4" fill="#da121a"/>
      <rect y="8.6" width="18" height="3.4" fill="#078930"/>
      <path d="M0 0L7.5 6 0 12Z" fill="#0f47af"/>
      <path d="${starPath(2.4, 6, 1.5, 5)}" fill="#fcdd09"/>`;
    case 'tanzania': return `
      <rect width="18" height="12" fill="#1eb53a"/>
      <path d="M18 12V0L0 12Z" fill="#00a3dd"/>
      <path d="M0 12L18 0h-3.6L0 9.6Z" fill="#fcd116"/>
      <path d="M0 12L14.4 0h-1.2L0 11Z" fill="#000000" transform="translate(1.2,1)"/>
      <path d="M18 0L0 12h3.2L18 2.2Z" fill="#000000" opacity="0"/>
      <path d="M17 0L0 11.3v.7h1.6L18 1V0Z" fill="#fcd116" opacity="0"/>`;
    case 'togo': return `
      <rect width="18" height="12" fill="#ffce00"/>
      ${[0, 2, 4].map(i => `<rect y="${i * 2.4}" width="18" height="2.4" fill="#006a4e"/>`).join('')}
      <rect width="7.2" height="7.2" fill="#d21034"/>
      <path d="${starPath(3.6, 3.6, 2.1, 5)}" fill="#ffffff"/>`;
    case 'erit': return `
      <rect width="18" height="12" fill="#12ad2b"/>
      <path d="M0 6h18v6H0Z" fill="#4189dd"/>
      <path d="M0 0L18 6 0 12Z" fill="#ea0437"/>
      <path d="${starPath(3.6, 6, 1.6, 8)}" fill="#ffc726"/>`;
    case 'seychelles': return `
      <rect width="18" height="12" fill="#d92223"/>
      <path d="M0 12L18 0v3L5.5 12Z" fill="#fcd856" opacity="0"/>
      <path d="M0 12V8.6L18 0v2.6Z" fill="#fcd856"/>
      <path d="M0 8.6V4.3L18 0Z" fill="#003f87" opacity="0"/>
      <path d="M0 0h5.6L0 4.3Z" fill="#003f87"/>
      <path d="M0 0h5.6L0 12Z" fill="#003f87"/>
      <path d="M5.6 0h6.4L0 8.6V4.3Z" fill="#fcd856"/>
      <path d="M0 12L18 4.6V8L8 12Z" fill="#ffffff"/>
      <path d="M0 12h8L18 8v4Z" fill="#007a3d"/>`;
    case 'uruguay': return `
      <rect width="18" height="12" fill="#ffffff"/>
      ${[1, 3, 5, 7].map(i => `<rect y="${i * 1.33}" width="18" height="1.33" fill="#0038a8"/>`).join('')}
      <rect width="7.4" height="6.65" fill="#ffffff"/>
      <path d="${starPath(3.7, 3.3, 2.2, 16)}" fill="#fcd116"/>`;
    case 'checker': return `
      <rect width="18" height="12" fill="#171796"/>
      <rect width="18" height="4" fill="#ff0000"/>
      <rect y="8" width="18" height="4" fill="#ff0000"/>
      <rect width="18" height="4" y="4" fill="#ffffff"/>
      ${[0,1,2,3,4].map(c => [0,1,2].map(r => `<rect x="${6.5 + c * 1}" y="${4 + r * 1.33}" width="1" height="1.33" fill="${(c + r) % 2 ? '#171796' : '#ff0000'}"/>`).join('')).join('')}`;
    case 'japan': return `<rect width="18" height="12" fill="#ffffff"/><circle cx="9" cy="6" r="3.2" fill="#bc002d"/>`;
    case 'korea': return `
      <rect width="18" height="12" fill="#ffffff"/>
      <circle cx="9" cy="6" r="3" fill="#cd2e3a"/>
      <path d="M9 3a3 3 0 0 1 0 6 1.5 1.5 0 0 1 0-3 1.5 1.5 0 0 0 0-3z" fill="#0047a0"/>`;
    case 'saudi': return `
      <rect width="18" height="12" fill="#006c35"/>
      <rect x="3" y="5" width="12" height="1.1" fill="#ffffff"/>
      <path d="M6 8.4h8l-1.4 1.4H7.4Z" fill="#ffffff"/>`;
    default: return '';
  }
}

function flagSVG(code, w) {
  const spec = FLAGS[code] || FLAGS.ZA;
  const width = w || 18, height = width * 12 / 18;
  const inner = spec.map(layerSVG).join('');
  const name = natName(code);
  return `<span class="flag" style="width:${width}px;height:${height}px" title="${svgEsc(name)}"><svg viewBox="0 0 18 12" width="${width}" height="${height}" role="img" aria-label="${svgEsc(name)}">${inner}<rect width="18" height="12" fill="none" stroke="rgba(0,0,0,.35)" stroke-width=".7"/></svg></span>`;
}
function svgEsc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

/* ============================================================
   Mzansi Manager 2026 — engine
   ============================================================ */

let SEED = 12345, PID = 1;
const MAX_FOREIGN = 10;
function clubLevel(t) { return 48 + t.rep * 2.95; }
function rnd() { SEED = (SEED * 1664525 + 1013904223) % 4294967296; return SEED / 4294967296; }
function rint(a, b) { return a + Math.floor(rnd() * (b - a + 1)); }
function pick(a) { return a[Math.floor(rnd() * a.length)]; }
function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) * 1.1; }
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function wpick(list, w) {
  const tot = list.reduce((s, x) => s + w(x), 0);
  if (tot <= 0) return list[0];
  let r = rnd() * tot;
  for (const x of list) { r -= w(x); if (r <= 0) return x; }
  return list[list.length - 1];
}
/* ---- language and currency: device settings kept in localStorage, not in a save ---- */
const CURRENCIES = {
  ZAR: { sym: 'R', rate: 1, name: 'South African Rand' },
  USD: { sym: '$', rate: 0.058, name: 'US Dollar' },
  EUR: { sym: '€', rate: 0.054, name: 'Euro' },
  GBP: { sym: '£', rate: 0.043, name: 'British Pound' },
  NGN: { sym: '₦', rate: 85, name: 'Nigerian Naira' },
  KES: { sym: 'KSh ', rate: 7.1, name: 'Kenyan Shilling' },   AUD: { sym: 'A$', rate: 0.088, name: 'Australian Dollar' }, CAD: { sym: 'C$', rate: 0.08, name: 'Canadian Dollar' }, CHF: { sym: 'CHF ', rate: 0.046, name: 'Swiss Franc' },   CNY: { sym: '¥', rate: 0.41, name: 'Chinese Yuan' }, JPY: { sym: 'JP¥', rate: 8.7, name: 'Japanese Yen' }, INR: { sym: '₹', rate: 4.9, name: 'Indian Rupee' },   BRL: { sym: 'R$', rate: 0.31, name: 'Brazilian Real' }, MXN: { sym: 'MX$', rate: 1.06, name: 'Mexican Peso' }, TRY: { sym: '₺', rate: 2.4, name: 'Turkish Lira' },   AED: { sym: 'AED ', rate: 0.21, name: 'UAE Dirham' }, SAR: { sym: 'SAR ', rate: 0.217, name: 'Saudi Riyal' },   EGP: { sym: 'E£', rate: 2.8, name: 'Egyptian Pound' }, GHS: { sym: 'GH₵', rate: 0.64, name: 'Ghanaian Cedi' }, MAD: { sym: 'MAD ', rate: 0.54, name: 'Moroccan Dirham' },   TZS: { sym: 'TSh ', rate: 150, name: 'Tanzanian Shilling' }, ZMW: { sym: 'ZK ', rate: 1.35, name: 'Zambian Kwacha' }, BWP: { sym: 'P', rate: 0.78, name: 'Botswana Pula' },   XOF: { sym: 'CFA ', rate: 33, name: 'West African CFA Franc' }, NAD: { sym: 'N$', rate: 1, name: 'Namibian Dollar' }
};
const LANGS = { en: 'English', af: 'Afrikaans', zu: 'isiZulu', fr: 'Français', pt: 'Português', es: 'Español' };
let curCode = 'ZAR', langCode = 'en'; (function liveRates() {   const apply = r => { Object.keys(CURRENCIES).forEach(k => { if (k !== 'ZAR' && r[k] > 0) CURRENCIES[k].rate = r[k]; }); };   let c = null; try { c = JSON.parse(localStorage.getItem('mm_fx') || 'null'); } catch (e) { }   if (c && c.r) apply(c.r);   if (c && Date.now() - c.t < 12 * 3600e3) return;   try {     fetch('https://open.er-api.com/v6/latest/ZAR').then(r => r.json()).then(d => {       if (!d || !d.rates) return;       const r = {}; Object.keys(CURRENCIES).forEach(k => { if (d.rates[k] > 0) r[k] = d.rates[k]; });       apply(r); try { localStorage.setItem('mm_fx', JSON.stringify({ t: Date.now(), r })); } catch (e) { }       try { render(); } catch (e) { }     }).catch(() => { });   } catch (e) { } })();
try { curCode = localStorage.getItem('mm_cur') || 'ZAR'; langCode = localStorage.getItem('mm_lang') || 'en'; } catch (e) { }
if (!CURRENCIES[curCode]) curCode = 'ZAR';
if (!LANGS[langCode]) langCode = 'en';
function tix(p) { const c = CURRENCIES[curCode], v = p * c.rate; return c.sym + (c.rate < 0.1 ? v.toFixed(1) : Math.round(v)); }

/* English | Afrikaans | isiZulu | Français | Português | Español */
const I18N_ROWS = `
Career|Loopbaan|Umsebenzi|Carrière|Carreira|Carrera
Squad|Span|Iqembu|Effectif|Plantel|Plantilla
Competitions|Kompetisies|Imiqhudelwano|Compétitions|Competições|Competiciones
Club|Klub|Iklabhu|Club|Clube|Club
More|Meer|Okunye|Plus|Mais|Más
Inbox|Inkassie|Ibhokisi lemiyalezo|Boîte de réception|Caixa de entrada|Bandeja de entrada
Calendar|Kalender|Ikhalenda|Calendrier|Calendário|Calendario
Matchday|Wedstrydag|Usuku lomdlalo|Jour de match|Dia de jogo|Jornada
League tables & fixtures|Ranglyste en wedstryde|Amathebula namafikisha|Classements et calendrier|Classificações e jogos|Clasificaciones y partidos
Squad & Tactics|Span en taktiek|Iqembu namacebo|Effectif et tactique|Plantel e táticas|Plantilla y tácticas
Academy & Training|Akademie en afrigting|I-akhademi nokuqeqeshwa|Académie et entraînement|Academia e treino|Academia y entrenamiento
Transfers|Oorplasings|Ukudayiselana|Transferts|Transferências|Fichajes
Other Clubs|Ander klubs|Amanye amaklabhu|Autres clubs|Outros clubes|Otros clubes
Shortlist|Kortlys|Uhlu olufushane|Présélection|Lista de observação|Lista de seguimiento
Cups|Beker|Izinkomishi|Coupes|Taças|Copas
Continental football|Kontinentale sokker|Ibhola lezwekazi|Football continental|Futebol continental|Fútbol continental
Nations|Lande|Amazwe|Nations|Nações|Naciones
World players|Wêreldspelers|Abadlali emhlabeni|Joueurs du monde|Jogadores do mundo|Jugadores del mundo
Club rankings|Klubranglys|Izikhundla zamaklabhu|Classement des clubs|Ranking de clubes|Ranking de clubes
Player Stats|Spelerstatistiek|Izibalo zabadlali|Stats des joueurs|Estatísticas|Estadísticas de jugadores
Club & Finances|Klub en finansies|Iklabhu nezimali|Club et finances|Clube e finanças|Club y finanzas
Commercial|Kommersieel|Ezentengiselwano|Commercial|Comercial|Comercial
Stadium & tickets|Stadion en kaartjies|Inkundla namathikithi|Stade et billets|Estádio e bilhetes|Estadio y entradas
Board & objectives|Raad en doelwitte|Ibhodi nezinjongo|Direction et objectifs|Diretoria e objetivos|Directiva y objetivos
Trophy room|Trofeekamer|Igumbi lezikhumbuzo|Salle des trophées|Sala de troféus|Sala de trofeos
Manager|Afrigter|Umqeqeshi|Entraîneur|Treinador|Entrenador
News|Nuus|Izindaba|Actualités|Notícias|Noticias
Save & Load|Stoor en laai|Gcina ulayishe|Sauvegarder et charger|Guardar e carregar|Guardar y cargar
Music & sound effects|Musiek en klankeffekte|Umculo nemisindo|Musique et effets sonores|Música e efeitos sonoros|Música y efectos de sonido
How to play|Hoe om te speel|Indlela yokudlala|Comment jouer|Como jogar|Cómo jugar
Language & currency|Taal en geldeenheid|Ulimi nemali|Langue et devise|Idioma e moeda|Idioma y moneda
Get added to the game|Kry jouself in die speletjie|Faka igama lakho emdlalweni|Entrez dans le jeu|Entre no jogo|Entra en el juego
Continue|Gaan voort|Qhubeka|Continuer|Continuar|Continuar
Cancel|Kanselleer|Khansela|Annuler|Cancelar|Cancelar
Close|Maak toe|Vala|Fermer|Fechar|Cerrar
Done|Klaar|Kuphelile|Terminé|Concluído|Hecho
Back|Terug|Emuva|Retour|Voltar|Atrás
Accept|Aanvaar|Yamukela|Accepter|Aceitar|Aceptar
Reject|Verwerp|Yenqaba|Refuser|Recusar|Rechazar
Negotiate|Onderhandel|Xoxa|Négocier|Negociar|Negociar
Walk away|Stap weg|Hamba|Se retirer|Desistir|Retirarse
Offer terms|Bied voorwaardes aan|Nikeza izinhlinzeko|Proposer des conditions|Oferecer termos|Ofrecer condiciones
Save|Stoor|Gcina|Enregistrer|Guardar|Guardar
Save now|Stoor nou|Gcina manje|Enregistrer maintenant|Guardar agora|Guardar ahora
Load|Laai|Layisha|Charger|Carregar|Cargar
Delete|Skrap|Susa|Supprimer|Apagar|Eliminar
Rename|Hernoem|Qamba kabusha|Renommer|Renomear|Renombrar
Skip|Slaan oor|Weqa|Passer|Saltar|Omitir
View|Kyk|Buka|Voir|Ver|Ver
Swap|Ruil|Shintsha|Échanger|Trocar|Intercambiar
Release|Stel vry|Khulula|Libérer|Libertar|Liberar
Play Now|Speel nou|Dlala manje|Jouer maintenant|Jogar agora|Jugar ahora
Start career|Begin loopbaan|Qala umsebenzi|Commencer la carrière|Iniciar carreira|Iniciar carrera
Start a new career|Begin 'n nuwe loopbaan|Qala umsebenzi omusha|Commencer une nouvelle carrière|Iniciar uma nova carreira|Iniciar una nueva carrera
Choose your club|Kies jou klub|Khetha iklabhu yakho|Choisissez votre club|Escolha o seu clube|Elige tu club
Saved careers|Gestoorde loopbane|Imisebenzi egciniwe|Carrières sauvegardées|Carreiras guardadas|Carreras guardadas
Select a club to begin.|Kies 'n klub om te begin.|Khetha iklabhu ukuze uqale.|Sélectionnez un club pour commencer.|Selecione um clube para começar.|Selecciona un club para empezar.
Quit to main menu|Gaan na hoofkieslys|Phuma uye kumenyu eyinhloko|Quitter vers le menu principal|Sair para o menu principal|Salir al menú principal
Next day|Volgende dag|Usuku olulandelayo|Jour suivant|Dia seguinte|Día siguiente
Quick sim|Vinnige simulasie|Ukulingisa okusheshayo|Simulation rapide|Simulação rápida|Simulación rápida
team rating|spangradering|isilinganiso seqembu|note d'équipe|nota da equipa|valoración del equipo
position|posisie|indawo|position|posição|posición
squad|span|iqembu|effectif|plantel|plantilla
transfer budget|oorplasingsbegroting|isabelomali sokudayiselana|budget transferts|orçamento de transferências|presupuesto de fichajes
date|datum|usuku|date|data|fecha
Age|Ouderdom|Iminyaka|Âge|Idade|Edad
Value|Waarde|Inani|Valeur|Valor|Valor
Rating|Gradering|Isilinganiso|Note|Avaliação|Valoración
Wage|Salaris|Iholo|Salaire|Salário|Salario
Contract|Kontrak|Inkontileka|Contrat|Contrato|Contrato
Player|Speler|Umdlali|Joueur|Jogador|Jugador
Goals|Doele|Amagoli|Buts|Golos|Goles
Assists|Aangee|Ama-assist|Passes décisives|Assistências|Asistencias
Pts|Ptn|Amaphuzu|Pts|Pts|Pts
Home|Tuis|Ekhaya|Domicile|Casa|Local
Away|Uit|Kwabanye|Extérieur|Fora|Visitante
Season|Seisoen|Isizini|Saison|Época|Temporada
Form|Vorm|Isimo|Forme|Forma|Forma
Fee|Fooi|Imali|Indemnité|Valor|Traspaso
First team|Eerstespan|Iqembu lokuqala|Équipe première|Equipa principal|Primer equipo
Reserves|Reserwes|Abagciniwe|Réserves|Reservas|Reservas
Substitutes|Plaasvervangers|Abasebenzi abangenele|Remplaçants|Suplentes|Suplentes
Bench|Bank|Ibhentshi|Banc|Banco|Banquillo
Starting XI|Beginspan|Abaqala umdlalo|Onze de départ|Onze inicial|Once inicial
Formation|Formasie|Ukubunjwa|Formation|Formação|Formación
Fitness|Fiksheid|Impilo|Condition physique|Condição física|Forma física
Mood|Gemoed|Isimo senhliziyo|Moral|Moral|Estado de ánimo
Search your squad|Soek in jou span|Sesha iqembu lakho|Rechercher dans l'effectif|Pesquisar no plantel|Buscar en tu plantilla
Unavailable|Nie beskikbaar|Awutholakali|Indisponible|Indisponível|No disponible
Contract ending|Kontrak verstryk|Inkontileka iyaphela|Contrat bientôt terminé|Contrato a terminar|Contrato por vencer
Listed|Gelys|Kudwetshiwe|En vente|Listado|En venta
Under 23|Onder 23|Ngaphansi kuka-23|Moins de 23 ans|Sub-23|Sub-23
Everyone|Almal|Wonke umuntu|Tous|Todos|Todos
All|Almal|Konke|Tous|Todos|Todos
Pick strongest XI|Kies sterkste XI|Khetha i-XI eqinile|Choisir le meilleur onze|Escolher o melhor onze|Elegir el mejor once
Rotation advice|Rotasieadvies|Iseluleko sokushintsha|Conseil de rotation|Conselho de rotação|Consejo de rotación
Scouting report|Verkenningsverslag|Umbiko wokuhlola|Rapport d'observation|Relatório de observação|Informe de ojeo
Match preview|Wedstrydvoorskou|Ukubuka kuqala komdlalo|Avant-match|Antevisão do jogo|Previa del partido
Players to watch|Spelers om dop te hou|Abadlali okufanele ubabuke|Joueurs à suivre|Jogadores a seguir|Jugadores a vigilar
Post-match press conference|Na-wedstryd-perskonferensie|Ingqungquthela yabezindaba ngemva komdlalo|Conférence de presse d'après-match|Conferência de imprensa pós-jogo|Rueda de prensa posterior
Player comparison|Spelervergelyking|Ukuqhathanisa abadlali|Comparaison des joueurs|Comparação de jogadores|Comparación de jugadores
Compare|Vergelyk|Qhathanisa|Comparer|Comparar|Comparar
Pick another|Kies 'n ander|Khetha omunye|En choisir un autre|Escolher outro|Elegir otro
Transfer list|Oordraglys|Uhlu lokudayiselana|Liste des transferts|Lista de transferências|Lista de traspasos
Loan list|Leningslys|Uhlu lokuboleka|Liste des prêts|Lista de empréstimos|Lista de cesiones
Make captain|Maak kaptein|Yenza ukaputeni|Nommer capitaine|Fazer capitão|Hacer capitán
Move to reserves|Skuif na reserwes|Yisa kubagciniwe|Passer en réserve|Mover para reservas|Mover a reservas
Release clause|Vrystellingsklousule|Isigaba sokukhululwa|Clause libératoire|Cláusula de rescisão|Cláusula de rescisión
Shop around|Kyk rond|Hlola ezinye izindawo|Sonder le marché|Consultar o mercado|Explorar el mercado
Free agents|Vrye agente|Abadlali abakhululekile|Joueurs libres|Agentes livres|Agentes libres
Negotiate contract|Onderhandel kontrak|Xoxa inkontileka|Négocier le contrat|Negociar contrato|Negociar contrato
Transfer budget|Oorplasingsbegroting|Isabelomali sokudayiselana|Budget transferts|Orçamento de transferências|Presupuesto de fichajes
Budget|Begroting|Isabelomali|Budget|Orçamento|Presupuesto
Wage bill|Salarisrekening|Imali yamaholo|Masse salariale|Massa salarial|Masa salarial
Money in|Geld in|Imali engenayo|Entrées d'argent|Entradas|Ingresos
Money out|Geld uit|Imali ephumayo|Sorties d'argent|Saídas|Gastos
Net|Netto|Inzuzo|Net|Líquido|Neto
Finances|Finansies|Ezezimali|Finances|Finanças|Finanzas
Income|Inkomste|Imali engenayo|Revenus|Receitas|Ingresos
Ticket pricing|Kaartjieprys|Intengo yamathikithi|Prix des billets|Preço dos bilhetes|Precio de entradas
Fan-friendly|Aanhangervriendelik|Ethandwa ngabalandeli|Pour les fans|Amigo dos adeptos|Para los aficionados
Premium|Premie|Ebizayo|Premium|Premium|Premium
Stadium expansion|Stadionuitbreiding|Ukwandiswa kwenkundla|Agrandissement du stade|Ampliação do estádio|Ampliación del estadio
Trophies|Trofees|Izikhumbuzo|Trophées|Troféus|Trofeos
Honours|Eerbewyse|Izinhlonipho|Palmarès|Honras|Honores
Promoted|Bevorder|Kwenyuselwe|Promu|Promovido|Ascendido
Relegated|Gedegradeer|Kwehliswe|Relégué|Despromovido|Descendido
Champions|Kampioene|Amakhosi|Champions|Campeões|Campeones
Division|Afdeling|Isigaba|Division|Divisão|División
League|Liga|Ligi|Championnat|Liga|Liga
Overview|Oorsig|Uhlolojikelele|Aperçu|Visão geral|Resumen
History|Geskiedenis|Umlando|Historique|Histórico|Historial
Training|Afrigting|Ukuqeqeshwa|Entraînement|Treino|Entrenamiento
Youth|Jeug|Intsha|Jeunes|Juventude|Cantera
Academy|Akademie|I-akhademi|Académie|Academia|Academia
Board confidence|Raadsvertroue|Ukuthembela kwebhodi|Confiance de la direction|Confiança da diretoria|Confianza de la directiva
Vacancies|Vakatures|Amathuba emisebenzi|Postes vacants|Vagas|Vacantes
Job offers|Werksaanbiedinge|Iziphakamiso zomsebenzi|Offres d'emploi|Ofertas de emprego|Ofertas de trabajo
Take the job|Neem die werk|Thatha umsebenzi|Accepter le poste|Aceitar o cargo|Aceptar el puesto
Resign and look for work|Bedank en soek werk|Yeka umsebenzi ufune omunye|Démissionner et chercher du travail|Demitir-se e procurar trabalho|Dimitir y buscar trabajo
Leave and look for work|Verlaat en soek werk|Hamba ufune umsebenzi|Partir et chercher du travail|Sair e procurar trabalho|Marcharse y buscar trabajo
Language|Taal|Ulimi|Langue|Idioma|Idioma
Currency|Geldeenheid|Imali|Devise|Moeda|Moneda
Preview|Voorskou|Ukubuka kuqala|Aperçu|Pré-visualização|Vista previa
Currencies use fixed in-game rates, not live exchange rates. Translation covers menus, buttons and headings. News, mail and match text stay in English for now.|Geldeenhede gebruik vaste speletjiekoerse, nie lewendige wisselkoerse nie. Die vertaling dek kieslyste, knoppies en opskrifte. Nuus, pos en wedstrydteks bly vir eers in Engels.|Izimali zisebenzisa amazinga amisiwe emdlalweni, hhayi amazinga aphilayo. Ukuhumusha kuhlanganisa amamenyu, izinkinobho nezihloko. Izindaba, amameyili nombhalo wemidlalo kuhlala ngesiNgisi okwamanje.|Les devises utilisent des taux fixes propres au jeu, pas des taux de change en direct. La traduction couvre les menus, boutons et titres. Actualités, messages et textes de match restent en anglais pour l'instant.|As moedas usam taxas fixas do jogo, não câmbios em tempo real. A tradução cobre menus, botões e títulos. Notícias, mensagens e textos de jogos continuam em inglês por agora.|Las monedas usan tasas fijas del juego, no tipos de cambio en vivo. La traducción cubre menús, botones y títulos. Noticias, correos y textos de partido siguen en inglés por ahora.
`;
const I18N = {};
I18N_ROWS.trim().split('\n').forEach(r => { const a = r.split('|'); if (a.length === 6) I18N[a[0].trim()] = { af: a[1].trim(), zu: a[2].trim(), fr: a[3].trim(), pt: a[4].trim(), es: a[5].trim() }; });
function tr(s) { if (langCode === 'en') return s; const e = I18N[s]; return (e && e[langCode]) || s; }

/* live translation of whatever is on screen: text nodes plus placeholder and title attributes */
const _trRec = new WeakMap();
function trText(n) {
  const v = n.nodeValue; if (!v) return;
  const core = v.trim(), rec = _trRec.get(n);
  const src = rec && rec.out === core ? rec.src : core;
  if (!rec && (langCode === 'en' || !I18N[src])) return;
  const out = langCode === 'en' ? src : ((I18N[src] && I18N[src][langCode]) || src);
  if (out !== core) n.nodeValue = v.replace(core, out);
  _trRec.set(n, { src, out });
}
function trAttrs(el) {
  ['placeholder', 'title'].forEach(a => {
    const v = el.getAttribute(a); if (!v) return;
    const sk = 'en' + a, ok = 'out' + a;
    const src = el.dataset[sk] != null && el.dataset[ok] === v ? el.dataset[sk] : v;
    if (el.dataset[sk] == null && (langCode === 'en' || !I18N[src])) return;
    const out = langCode === 'en' ? src : ((I18N[src] && I18N[src][langCode]) || src);
    if (out !== v) el.setAttribute(a, out);
    el.dataset[sk] = src; el.dataset[ok] = out;
  });
}
function trApply(root) {
  if (!root) return;
  if (root.nodeType === 3) { trText(root); return; }
  if (root.nodeType !== 1) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  let n; while ((n = w.nextNode())) trText(n);
  if (root.matches && root.matches('[placeholder],[title]')) trAttrs(root);
  root.querySelectorAll('[placeholder],[title]').forEach(trAttrs);
}
let _trObs = null;
function trInit() {
  document.documentElement.lang = langCode;
  if (_trObs || !document.body) return;
  _trObs = new MutationObserver(recs => {
    if (langCode === 'en') return;
    recs.forEach(r => { if (r.type === 'characterData') trText(r.target); else r.addedNodes.forEach(trApply); });
    _trObs.takeRecords();
  });
  _trObs.observe(document.body, { childList: true, subtree: true, characterData: true });
  if (langCode !== 'en') trApply(document.body);
}
function setLang(c) {
  if (!LANGS[c]) return; langCode = c;
  try { localStorage.setItem('mm_lang', c); } catch (e) { }
  document.documentElement.lang = c; trInit(); trApply(document.body); if (_trObs) _trObs.takeRecords();
}
function setCur(c) { if (!CURRENCIES[c]) return; curCode = c; try { localStorage.setItem('mm_cur', c); } catch (e) { } render(); }
function openRegionalModal() {
  const opt = (o, cur) => Object.keys(o).map(k => `<option value="${k}" ${k === cur ? 'selected' : ''}>${esc(typeof o[k] === 'string' ? o[k] : k + ' · ' + o[k].name + ' (' + o[k].sym.trim() + ')')}</option>`).join('');
  const sel = 'width:100%;margin:4px 0 12px;background:var(--panel2);border:1px solid var(--line);border-radius:6px;color:inherit;padding:10px;font-size:15px';
  openModal('Language & currency', `<label class="hint">Language</label><select id="rgLang" style="${sel}">${opt(LANGS, langCode)}</select>
    <label class="hint">Currency</label><select id="rgCur" style="${sel}">${opt(CURRENCIES, curCode)}</select>
    <p class="hint" id="rgPrev" style="margin:0 0 8px"></p>
    <p class="hint" style="margin:0">Exchange rates update from live rates about every 12 hours and are kept for offline play. If they can't load, approximate rates are used. Translation covers menus, buttons and headings. News, mail and match text stay in English for now.</p>`,
    `<button class="btn sm" onclick="closeModal()">Done</button>`);
  const prev = () => { $('#rgPrev').textContent = `R1.5m = ${money(1.5)}  ·  R250k = ${money(0.25)}`; };
  $('#rgLang').onchange = e => setLang(e.target.value);
  $('#rgCur').onchange = e => { setCur(e.target.value); prev(); };
  prev();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', trInit); else trInit();
function money(m) {
  const c = CURRENCIES[curCode] || CURRENCIES.ZAR, sg = (m < 0 ? '-' : '') + c.sym, v = Math.abs(m) * c.rate;
  if (v >= 1000) return sg + (v / 1000).toFixed(2) + 'bn';
  if (v >= 1) return sg + (v < 10 ? v.toFixed(2) : v.toFixed(1)) + 'm';
  return sg + Math.round(v * 1000) + 'k';
}
function seasonLabel(y) { return y + '/' + String(y + 1).slice(2); }

/* ---------------- player creation ---------------- */
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function birthDate(age, season) {
  const year = season - age;
  const month = rint(0, 11);
  const day = rint(1, 28);
  return `${day} ${MONTH_NAMES[month]} ${year}`;
}
const NAME_ALIAS = {
  DZ:'ARAB', EG:'ARAB', LY:'ARAB', MA:'ARAB', MR:'ARAB', SD:'ARAB', TN:'ARAB', AE:'ARAB',
  BJ:'FR_AFR', BF:'FR_AFR', GN:'FR_AFR', ML:'FR_AFR', NE:'FR_AFR', TG:'FR_AFR', TD:'FR_AFR', GA:'FR_AFR', CG:'FR_AFR', CF:'FR_AFR', GQ:'FR_AFR',
  LR:'EN_AFR', SL:'EN_AFR', GM:'EN_AFR', CV:'PT_AFR', GW:'PT_AFR', ST:'PT_AFR',
  ET:'HORN', ER:'HORN', SO:'HORN', DJ:'HORN', SS:'HORN', MG:'ISLAND', MU:'ISLAND', SC:'ISLAND', KM:'ISLAND',
  ES:'ES', PE:'ES', EC:'ES', BO:'ES', CR:'ES', MX:'ES', NL:'NL', BE:'NL',
  SE:'NORDIC', DK:'NORDIC', NO:'NORDIC', FI:'NORDIC', PL:'SLAV', CZ:'SLAV', SK:'SLAV', UA:'SLAV', RO:'CEE', HU:'CEE',
  CH:'DE', AT:'DE', GB:'GB_WHITE', IE:'GB_WHITE', AU:'GB_WHITE', US:'GB_WHITE', CA:'GB_WHITE', FR:'FR_WHITE',
  IN:'ZA_INDIAN', ID:'SEASIA', TH:'SEASIA', VN:'SEASIA', JM:'DIASPORA_BLACK'
};
function personName(nat, group) {
  let p;
  if (nat === 'ZA') p = NAMES['ZA_' + (group || 'black').toUpperCase()];
  else if (group === 'indian') p = NAMES.ZA_INDIAN;
  else if (group === 'coloured') p = NAMES.ZA_COLOURED;
  else if (group === 'black' && !(NATIONS[nat] && NATIONS[nat].caf) && !LATIN_NATIONS.includes(nat)) p = NAMES.DIASPORA_BLACK;
  else if (group === 'asian' && !ASIAN_NATIONS.includes(nat)) p = NAMES.DIASPORA_ASIAN;
  else if (group === 'latin' && !LATIN_NATIONS.includes(nat)) p = NAMES.ES;
  p = p || NAMES[nat] || NAMES[NAME_ALIAS[nat]] || NAMES.ZA;
  return { first: pick(p.f), last: pick(p.l) };
}
function makeFace(nat, group) {
  const skKey = group && GROUP_SKIN_KEY[group];
  const pool = skKey ? (SKIN_GROUPS[skKey] || SKINS) : skinGroupFor(nat);
  const skin = wpick(pool, s => s.w);
  return {
    sk: skin.c,
    hr: pick(HAIRS),
    hc: pick(HAIR_COLOURS),
    bd: rnd() < 0.42 ? rint(1, 3) : 0,
    ey: rint(0, 2),
    nose: rint(0, 2)
  };
}
const TIER_WAGE_AVG = [1.25, 0.36, 0.15, 0.052, 0.0125];
const TIER_WAGE_CAP = [4.0, 0.65, 0.28, 0.075, 0.022];
const TIER_WAGE_TYPICAL = [68, 58, 51, 45, 39];
function faAskWage(p) {   const R = TIER_WAGE_TYPICAL, A = TIER_WAGE_AVG, r = p.rating; let w;   if (r >= R[0]) w = A[0] * Math.pow(1.045, r - R[0]);   else if (r <= R[4]) w = A[4] * Math.pow(1.045, r - R[4]);   else { let i = 0; while (i < 3 && r < R[i + 1]) i++; const t = (R[i] - r) / (R[i] - R[i + 1]); w = Math.exp(Math.log(A[i]) * (1 - t) + Math.log(A[i + 1]) * t); }   if (p.age < 21) w *= 0.6; else if (p.age > 32) w *= 0.85;   if (p.age < 24 && p.pot > p.rating) w *= 1 + Math.min(12, p.pot - p.rating) * 0.015;   return Math.round(clamp(w, A[4] * 0.22, TIER_WAGE_CAP[0]) * 100000) / 100000; } function wageFor(rating, age, tier) {
  const t = tier != null ? clamp(tier, 0, 4) : 0;
  const avg = TIER_WAGE_AVG[t], cap = TIER_WAGE_CAP[t], typical = TIER_WAGE_TYPICAL[t];
  let w = avg * Math.pow(1.045, rating - typical);
  if (age < 21) w *= 0.6; else if (age > 32) w *= 0.85;
  w = clamp(w, avg * 0.22, cap);
  return Math.round(w * 100000) / 100000;
}
function valueOf(p) {
  const r = p.rating;
  let v = r < 75 ? 0.30 * Math.pow(1.165, r - 55)
    : r < 80 ? 6.35 * Math.pow(1.718, r - 75)
      : 95 * Math.pow(1.0826, r - 80);
  const a = p.age;
  let af = a <= 20 ? 1.25 + (p.pot - p.rating) * 0.035
    : a <= 23 ? 1.15 + (p.pot - p.rating) * 0.02
      : a <= 27 ? 1.0 : a <= 30 ? 0.78 : a <= 33 ? 0.45 : 0.2;
  return Math.max(0.05, Math.round(v * af * 100) / 100);
}

/* ---------------- real players ----------------    Fixed, non-random players with a real identity: same name, club, age, rating,    potential and portrait in every new career. To add another one: push a matching    object below, and drop a dedicated photo named <portrait>.jpg into players/.    Its id is never listed in PLAYER_PORTRAITS, so it can never be handed to a    randomly generated player instead. */ const REAL_PLAYERS = [   { key: 'real-mlindoh', name: 'Mlindoh', club: 'Bright PMB', age: 16, rating: 69, potLo: 88, potHi: 92,     pos: 'ST', alt: ['RW', 'LW'], nat: 'ZA', portrait: 'real-mlindoh' } ]; function injectRealPlayers(G) {   REAL_PLAYERS.forEach(rp => {     const norm = x => String(x || '').toLowerCase().replace(/\bfc\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim();     const club = G.teams.find(t => t.s === rp.club || t.n === rp.club || norm(t.n) === norm(rp.club) || norm(t.s) === norm(rp.club));     if (!club) return;     if (club.squad.some(p => p.real && p.realKey === rp.key)) return;     const group = POS_GROUP[rp.pos];     const pool = club.squad.filter(p => POS_GROUP[p.pos] === group && !p.real);     const weakest = (pool.length ? pool : club.squad.filter(p => !p.real)).slice().sort((a, b) => a.rating - b.rating)[0];     if (weakest) club.squad = club.squad.filter(p => p.id !== weakest.id);     const nameParts = rp.name.split(' ');     const first = nameParts[0], last = nameParts.slice(1).join(' ');     const p = {       id: PID++, first, last, name: rp.name,       nat: rp.nat || 'ZA', pos: rp.pos, alt: rp.alt || [], age: rp.age, rating: rp.rating,       pot: rp.potHi, potLo: rp.potLo, potHi: rp.potHi,       face: makeFace(rp.nat || 'ZA', 'black'), portrait: rp.portrait,       wage: wageFor(rp.rating, rp.age, club.tier), contract: rp.contract != null ? rp.contract : 3,       goals: 0, assists: 0, apps: 0, cs: 0, inj: 0, form: 0, yellow: 0, red: 0,       cG: 0, cA: 0, cApps: 0, earned: 0,       career: [], clubs: [{ id: club.id, from: G.season }], startRating: rp.rating, startPot: rp.potHi, lastGrowth: 0,       dob: birthDate(rp.age, G.season),       wantsOut: false, joinedSeason: G.season, fee: 0, reserve: false, releaseClause: null,       scouts: {}, contractSignedRound: null,       real: true, realKey: rp.key     };     p.value = valueOf(p);     club.squad.push(p);     club.wageBill = wageOf(club);     club.wageBudget = Math.round(club.wageBill * 1.4 * 100) / 100;     ensureLineup(club);   }); } function makePlayer(opts) {
  const o = opts || {};
  const nat = o.nat || 'ZA';
  const group = ethnicGroupFor(nat); const nm = personName(nat, group);
  const age = o.age != null ? o.age : rint(18, 34);
  const pos = o.pos || pick(POS_LIST);
  let base = 48 + (o.strength != null ? o.strength : 5) * 2.95;
  let rating = Math.round(clamp(base + gauss() * 5.0, 36, 92));
  if (age < 22) rating = Math.round(clamp(rating - (22 - age) * 2.3, 34, 88));
  const potBump = age < 24 ? rint(2, 17) : age < 28 ? rint(0, 4) : rint(0, 2);
  const pot = Math.round(clamp(rating + potBump, rating, 95));
  const p = {
    id: PID++, first: nm.first, last: nm.last, name: nm.first + ' ' + nm.last,
    nat, pos, alt: o.alt || rollAlt(pos), age, rating, pot, face: makeFace(nat, group), portrait: portraitFromGroup(group), eth: group,
    wage: wageFor(rating, age, o.tier), contract: o.contract != null ? o.contract : rint(1, 4),
    goals: 0, assists: 0, apps: 0, cs: 0, inj: 0, form: 0, yellow: 0, red: 0,
    cG: 0, cA: 0, cApps: 0, earned: 0,
    career: [], clubs: [], startRating: rating, startPot: pot, lastGrowth: 0, dob: birthDate(age, o.season || 2026),
    wantsOut: false, joinedSeason: o.season || 2026, fee: 0, reserve: false, releaseClause: null,
    scouts: {}, contractSignedRound: null
  };
  p.value = valueOf(p);
  return p;
}

function natFor(club, foreignSlot) {
  if (!foreignSlot) return club.nat || 'ZA';
  if (rnd() < 0.28) return pick(SCOUT_POOLS.EUR.concat(SCOUT_POOLS.ASIA, SCOUT_POOLS.NAM, SCOUT_POOLS.SAM));
  const net = club.scoutNet || { AFR: 1 }, regions = Object.keys(SCOUT_POOLS);
  const weights = regions.map(r => 0.4 + (net[r] || 0));
  let x = rnd() * weights.reduce((a, b) => a + b, 0), i = 0;
  while (i < regions.length - 1 && x > weights[i]) { x -= weights[i]; i++; }
  return pick(SCOUT_POOLS[regions[i]]);
}

const SQUAD_PLAN = ['GK','GK','GK','RB','RB','CB','CB','CB','CB','LB','LB','RWB','LWB','CDM','CDM','CM','CM','CM','CAM','CAM','RM','LM','RW','LW','ST','ST','CF'];

function makeSquad(club, season) {
    const foreigners = rint(4, 9);
  const idx = shuffle(SQUAD_PLAN.map((_, i) => i)).slice(0, foreigners);
  const foreignSet = new Set(idx);
  const youthClub = !!club.youthClub;
  return SQUAD_PLAN.map((pos, i) => {
    let age;
    if (youthClub) age = rnd() < 0.62 ? rint(17, 21) : rint(22, 29);
    else age = rnd() < 0.18 ? rint(17, 20) : rint(21, 34);
    const str = club.base + (i % 8 === 0 ? 0.5 : i % 7 === 6 ? -1.1 : 0) + (youthClub && age < 21 ? 0.4 : 0);
    return makePlayer({ nat: natFor(club, foreignSet.has(i)), pos, age, strength: str, season, tier: club.tier != null ? club.tier : club.t });
  });
}

/* Give any player aged 20+ a plausible career before this save begins:
   backdated join date (so the six-month no-resale rule only catches
   genuinely fresh preseason signings, not every player in the game),
   career-history rows with apps/goals/assists, and sometimes one
   earlier club. Called once per squad member when a new career starts. */
function backdateCareer(p, clubId, season) {
  if (p.age < 20) return;
  const minAge = 18;
  const maxTrack = Math.min(p.age - minAge, 9);
  if (maxTrack <= 0) return;
  const cap = Math.min(maxTrack, 6);
  const yearsAtClub = Math.max(rint(0, cap), rint(0, cap)); // skew toward longer tenure
  p.joinedSeason = season - yearsAtClub;
  const remaining = maxTrack - yearsAtClub;

  const grp = POS_GROUP[p.pos] || 'MID';
  const goalRate = { ATT: 0.34, MID: 0.11, DEF: 0.035, GK: 0.002 }[grp];
  const assistRate = { ATT: 0.14, MID: 0.17, DEF: 0.05, GK: 0.01 }[grp];
  let cApps = 0, cG = 0, cA = 0;
  p.clubs = [];

  function addSeasons(cId, cTier, years, startAgo) {
    for (let y = years; y >= 1; y--) {
      const yearsAgo = startAgo - years + y;
      const ageThen = p.age - yearsAgo;
      if (ageThen < minAge) continue;
      const histRating = Math.round(clamp(p.rating - yearsAgo * rint(1, 2) + gauss() * 1.5, 32, p.rating));
      const apps = Math.round(clamp(10 + ageThen * 0.8 + gauss() * 6, 4, 36));
      const goals = Math.max(0, Math.round(apps * goalRate * (0.5 + rnd())));
      const assists = Math.max(0, Math.round(apps * assistRate * (0.5 + rnd())));
      p.career.push({ season: season - yearsAgo, club: cId, tier: cTier, apps, g: goals, a: assists, rating: histRating });
      cApps += apps; cG += goals; cA += assists;
    }
  }

  if (remaining > 0 && rnd() < 0.45) {
    const priorYears = rint(1, Math.min(remaining, 6));
    let priorIdx = rint(0, CLUBS.length - 1);
    if (priorIdx === clubId) priorIdx = (priorIdx + 1) % CLUBS.length;
    const startAgo = yearsAtClub + priorYears;
    p.clubs.push({ id: priorIdx, from: season - startAgo });
    addSeasons(priorIdx, CLUBS[priorIdx].t, priorYears, startAgo);
  }

  if (yearsAtClub > 0) addSeasons(clubId, CLUBS[clubId].t, yearsAtClub, yearsAtClub);

  p.clubs.push({ id: clubId, from: p.joinedSeason });
  p.career.sort((a, b) => a.season - b.season);
  p.cApps = cApps; p.cG = cG; p.cA = cA;
}

/* ---------------- world ---------------- */
function newGame(clubIndex, manager, seed) {
  SEED = seed || Math.floor(Math.random() * 1e9);
  PID = 1;
  const season = 2026;
  const teams = CLUBS.map((c, i) => {
    const t = {
      id: i, ...c, tier: c.t, squad: makeSquad(c, season),
      budget: c.fin, academy: c.youth, formation: pick(Object.keys(FORMATIONS)), lineup: null,
      trophies: [], history: [], form: [], rep: c.base,
      youth: [], fin: newFin(), finHistory: [], captainId: null, viceCaptainId: null
    };
    t.squad.forEach(p => p.clubs.push({ id: i, from: season }));
    t.squad.forEach(p => backdateCareer(p, i, season));
    t.wageBill = wageOf(t);
    t.wageBudget = Math.round(t.wageBill * 1.4 * 100) / 100;
    ensureLineup(t);
    const ranked = t.squad.slice().sort((a, b) => b.rating - a.rating);
    if (ranked[0]) t.captainId = ranked[0].id;
    if (ranked[1]) t.viceCaptainId = ranked[1].id;
    return t;
  });
  const G = {
    v: 2, season, teams, myTeam: clubIndex,
    manager: manager || { name: 'Coach', avatar: 'mgr-01' },
    tables: [], fixtures: [], round: 0, curDay: 0, cup: null,
    news: [], market: [], freeAgents: [], transferLog: [], pendingBids: [], pendingLoanOffers: [],
    records: { seasons: [] }, finished: false, liveMode: true, watchlist: []
  };
  G.manager.rep = 40; G.manager.seasons = 0; G.manager.trophies = 0;
  G.manager.wage = Math.max(0.3, teams[clubIndex].rep * 1.1);
  G.manager.careerEarnings = 0;
    G.manager.nat = (manager && manager.nat) || 'ZA';   G.manager.dob = (manager && manager.dob) || '1988-06-15';
  G.manager.clubs = [{ id: clubIndex, from: season }];
  injectRealPlayers(G);
  initAfrica(G);
  initAfcon(G);
  buildSeason(G, true);
  seedAiClauses(G);
  updateOutgoingScouting(G);
  return G;
}

function newFin() { return { prize: 0, sponsor: 0, gate: 0, sales: 0, buys: 0, wages: 0, fines: 0, forfeits: 0, by: {}, inc: {} }; } const INCOME_SCALE = [0.2, 0.5, 0.85, 0.85, 0.9]; /* by division, top flight first */ const TV_BASE = [10, 2.5, 0.8, 0.3, 0.12], KIT_DEAL = [2.5, 0.8, 0.25, 0.1, 0.04]; function noteInc(t, label, amt) { t.fin.inc = t.fin.inc || {}; t.fin.inc[label] = (t.fin.inc[label] || 0) + amt; } function payIncome(G, id, amt, bucket, label) {   const t = G.teams[id]; if (!t) return; amt *= Array.isArray(INCOME_SCALE) ? INCOME_SCALE[Math.min(t.tier, 4)] : INCOME_SCALE; if (!(amt > 0)) return;   t.budget += amt; t.fin[bucket] = (t.fin[bucket] || 0) + amt; noteInc(t, label, amt); } function incGroup(k) { return /^TV/.test(k) ? 'Broadcasting' : /^(Gate|Matchday)/.test(k) ? 'Matchday' : 'Sponsorship & commercial'; } function incomeBreakdownPanel(t) {   const inc = Object.assign({}, t.fin.inc || {});   let prize = t.fin.prize, sales = t.fin.sales, sponsor = t.fin.sponsor, gate = t.fin.gate;   if (pbScope === 'all') (t.finHistory || []).forEach(f => {     prize += f.prize; sales += f.sales; sponsor += f.sponsor; gate += f.gate;     Object.entries(f.inc || {}).forEach(([k, a]) => { inc[k] = (inc[k] || 0) + a; });   });   const itemised = Object.values(inc).reduce((x, a) => x + a, 0), earlier = sponsor + gate - itemised;   const grand = sponsor + gate + prize + sales;   const groups = {};   Object.entries(inc).filter(e => e[1] > 0).forEach(([k, a]) => { const g = groups[incGroup(k)] || (groups[incGroup(k)] = { total: 0, rows: [] }); g.total += a; g.rows.push([k, a]); });   const bar = a => `<div class="bar g"><i style="width:${grand > 0 ? Math.min(100, a / grand * 100) : 0}%"></i></div>`;   const row = (l, a, sub) => `<div class="cf-row"><div class="l"><span>${sub ? '<span class="hint">· </span>' : ''}${esc(l)}</span><b>${money(a)}</b></div>${bar(a)}</div>`;   const html = ['Broadcasting', 'Sponsorship & commercial', 'Matchday'].filter(n => groups[n]).map(n =>     `<h4 style="margin:12px 0 2px;font-size:13px;color:var(--gold,#f2b928)">${n} · ${money(groups[n].total)}</h4>` +     groups[n].rows.sort((a, b) => b[1] - a[1]).map(([k, a]) => row(k.replace(/^TV: /, ''), a, true)).join('')).join('');   const chip = (k, l) => `<button class="chip" aria-pressed="${pbScope === k}" onclick="pbScope='${k}';viewClub()">${l}</button>`;   return `<div class="panel"><h3>Income by source<span class="sub">${money(grand)} total</span></h3>     <div class="chipbar" style="padding:0 13px 6px">${chip('season', 'This season')}${chip('all', 'All seasons')}</div><div class="pad">     ${html || '<p class="hint" style="margin:0">Income is itemised as matchdays are played.</p>'}     <h4 style="margin:12px 0 2px;font-size:13px;color:var(--gold,#f2b928)">Other income</h4>     ${row('Prize money (itemised below)', prize)}${row('Player sales', sales)}     ${earlier > 0.005 ? `<p class="hint" style="margin:8px 0 0">${money(earlier)} of sponsorship and gate income was earned before this breakdown existed and isn't itemised.</p>` : ''}</div></div>`; } const KIT_BRANDS = [   { name: 'Mzansi Threads', mult: 0.85, minRep: 0, boost: 1.0, c1: '#f2b928', c2: '#241a00' },   { name: 'Kuhle Sportswear', mult: 0.95, minRep: 3.5, boost: 1.05, c1: '#29c28b', c2: '#07211a' },   { name: 'Okulula Kit Supply', mult: 1.0, minRep: 4.5, boost: 1.1, c1: '#a6e22e', c2: '#0d0d0d' },   { name: 'Ubuntu Kits', mult: 1.1, minRep: 5.5, boost: 1.15, c1: '#5aa9ff', c2: '#08162b' },   { name: 'Karoo Gear', mult: 1.2, minRep: 6.0, boost: 1.2, c1: '#e5534b', c2: '#2a0d0b' },   { name: 'Nova Active', mult: 1.3, minRep: 6.8, boost: 1.25, c1: '#b57cff', c2: '#170b29' },   { name: 'Zenith Athletics', mult: 1.45, minRep: 7.5, boost: 1.3, c1: '#ffffff', c2: '#111111' },   { name: 'Apex Football', mult: 1.65, minRep: 8.3, boost: 1.4, c1: '#ffd84d', c2: '#000000' } ]; const NAMING_BRANDS = [   { name: 'Sutha Foods', mult: 0.8, minRep: 0, c1: '#ffb347', c2: '#2a1700' },   { name: 'Drakensberg Water', mult: 0.9, minRep: 3.5, c1: '#4fc3f7', c2: '#06202e' },   { name: 'Ikhaya Insurance', mult: 1.0, minRep: 4.5, c1: '#8bc34a', c2: '#12200a' },   { name: 'Rooibos Energy', mult: 1.1, minRep: 5.5, c1: '#ff7043', c2: '#2b0f06' },   { name: 'Highveld Motors', mult: 1.2, minRep: 6.0, c1: '#cfd8dc', c2: '#10171a' },   { name: 'Bokone Telecom', mult: 1.3, minRep: 6.8, c1: '#26c6da', c2: '#032327' },   { name: 'Limpopo Resources', mult: 1.45, minRep: 7.5, c1: '#ffca28', c2: '#241c00' },   { name: 'Kalahari Bank', mult: 1.65, minRep: 8.3, c1: '#66bb6a', c2: '#07200a' }, { name: 'Diski Universal Studios', mult: 1.05, minRep: 5.0, c1: '#b57cff', c2: '#170b29' } ]; const COMM_TYPES = {   kit: { label: 'Kit supplier', pool: KIT_BRANDS, base: t => KIT_DEAL[Math.min(t.tier, 4)] * (0.7 + t.rep / 10) },   naming: { label: 'Stadium naming rights', pool: NAMING_BRANDS, base: t => [3.5, 1, 0.35, 0.12, 0.05][Math.min(t.tier, 4)] * (0.6 + t.rep / 9) } }; const COMM_LEN = { 1: 0.95, 3: 1.0, 5: 1.08 }; const BRAND_IMG = {   'Mzansi Threads': 'brands/mzansi-threads.webp', 'Kuhle Sportswear': 'brands/kuhle-sportswear.webp', 'Okulula Kit Supply': 'brands/okulula-kit-supply.webp',   'Drakensberg Water': 'brands/drakensberg-water.webp', 'Sutha Foods': 'brands/sutha-foods.webp', 'Diski Universal Studios': 'brands/diski-universal-studios.webp',   "Wesley's Theory Holdings": 'brands/wesleys-theory.webp', 'Sana Logistics': 'brands/sana-logistics.webp', 'Haibo (Pty) Ltd': 'brands/haibo.webp', 'Thenga X': 'brands/thenga-x.webp',   'Ama Artist': 'brands/ama-artist.webp', 'The GBVF Action Hub': 'brands/gbvf-action-hub.webp', 'Football Is Life Organisation': 'brands/filo.webp' }; function brandLogo(b, size) {   const bi = BRAND_IMG[b.name || b.partner]; if (bi) return `<img src="${bi}" width="${size}" height="${size}" style="border-radius:12px;object-fit:cover;display:block;background:#fff" alt="">`;   const ini = (b.name || b.partner || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();   return `<svg width="${size}" height="${size}" viewBox="0 0 56 56" style="border-radius:12px;display:block"><rect width="56" height="56" fill="${b.c2}"/><rect x="2" y="2" width="52" height="52" rx="10" fill="none" stroke="${b.c1}" stroke-width="2"/><text x="28" y="35" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="22" fill="${b.c1}">${ini}</text></svg>`; } function initCommercial(t) {   if (!t.commercial) t.commercial = { kit: null, naming: null, offers: null, season: -1, log: [], cool: {} };   const c = t.commercial;   if (!c.kit) c.kit = { partner: 'Standard kit supply', annual: KIT_DEAL[Math.min(t.tier, 4)], years: 1, yearsLeft: 1, since: G.season, boost: 1, std: true };   if (c.season !== G.season || !c.offers) { c.offers = null; c.cool = {}; }   if (!c.offers) {     c.season = G.season; c.offers = {};     Object.keys(COMM_TYPES).forEach(k => {       const T = COMM_TYPES[k], base = T.base(t);       let pool = T.pool.filter(b => b.minRep <= t.rep + 0.4);       if (pool.length < 2) pool = T.pool.slice(0, 2);       pool = shuffle(pool.slice()).slice(0, 4);       c.offers[k] = pool.map(b => ({ name: b.name, c1: b.c1, c2: b.c2, boost: b.boost || 1, fair: base * b.mult, max: base * b.mult * (0.92 + rnd() * 0.3) }));     });   }   return c; } function commInterest(o) { const r = o.max / o.fair; return r > 1.12 ? 'Keen' : r > 1.0 ? 'Interested' : 'Cautious'; } function negotiate(neg, ask) {   const o = neg.offer, cap = o.max * COMM_LEN[neg.years];   if (ask <= cap) return { status: 'accepted', amount: ask, tooLow: ask < cap * 0.88 };   neg.patience -= ask > cap * 1.35 ? 2 : 1;   if (neg.patience <= 0) return { status: 'walked' };   if (ask <= cap * 1.12) return { status: 'counter', amount: Math.round(cap * (0.97 + rnd() * 0.03) * 100) / 100 };   return { status: 'rejected' }; } function stadiumName(t) { const n = t.commercial && t.commercial.naming; return n ? n.partner + ' Stadium' : t.s + ' Stadium'; } function kitBoost(t) { return t.commercial && t.commercial.kit ? (t.commercial.kit.boost || 1) : 1; } function commercialSeasonEnd(G, t, tier) {   const c = t.id === G.myTeam ? t.commercial : null;   if (!c) { payIncome(G, t.id, KIT_DEAL[Math.min(tier, 4)], 'sponsor', 'Kit supplier deal'); return; }   ['kit', 'naming'].forEach(k => {     const d = c[k]; if (!d) return;     payIncome(G, t.id, d.annual, 'sponsor', (k === 'kit' ? 'Kit supplier: ' : 'Naming rights: ') + d.partner);     d.yearsLeft--;     if (d.yearsLeft <= 0) { if (!d.std) news(G, 'transfer', `${t.s}'s ${COMM_TYPES[k].label.toLowerCase()} deal with ${d.partner} has ended.`); c[k] = null; }   });   c.offers = null; } let commNeg = null; function commCanNegotiate(t, k) {   const d = t.commercial[k], early = G.round <= 4 && !G.finished;   if (d && !d.std && d.yearsLeft > 1) return 'Contract runs until the end of ' + seasonLabel(G.season + d.yearsLeft - 1) + '.';   if (!early) return 'Talks open at the start of the season (first four matchdays).';   return ''; } function openNegotiation(k, idx) {   const t = me(), c = initCommercial(t), o = c.offers[k][idx], T = COMM_TYPES[k];   if (!(commNeg && commNeg.k === k && commNeg.idx === idx)) commNeg = { k, idx, offer: o, years: 3, patience: 3, note: '', counter: null };   const n = commNeg, fair = o.fair, lo = Math.round(fair * 0.6 * 100) / 100, hi = Math.round(fair * 1.8 * 100) / 100;   const askVal = n.counter != null ? n.counter : Math.round(fair * COMM_LEN[n.years] * 100) / 100;   const body = `<div style="display:flex;gap:12px;align-items:center;margin-bottom:10px">${brandLogo(o, 52)}<div><b style="font-size:16px">${esc(o.name)}</b><div class="hint">${T.label} · ${commInterest(o)} · patience ${'●'.repeat(Math.max(0, n.patience))}${'○'.repeat(Math.max(0, 3 - n.patience))}</div></div></div>     <p class="hint" style="margin:0 0 8px">They are talking around <b>${money(fair)}</b> a year. Longer deals pay a little more per season but lock you in.</p>     <div class="chipbar" style="padding:0 0 8px">${[1, 3, 5].map(y => `<button class="chip" data-ny="${y}" aria-pressed="${n.years === y}">${y} season${y > 1 ? 's' : ''}</button>`).join('')}</div>     <input class="range" type="range" id="negAsk" min="${lo}" max="${hi}" step="0.01" value="${askVal}" style="width:100%">     <div style="display:flex;justify-content:space-between;font-size:13px;margin:4px 0 8px"><span class="hint">${money(lo)}</span><b id="negAskTxt">${money(askVal)} / yr · ${money(askVal * n.years)} total</b><span class="hint">${money(hi)}</span></div>     <p id="negNote" style="margin:0;min-height:20px;color:var(--gold,#f2b928)">${esc(n.note || '')}</p>`;   openModal('Negotiate: ' + T.label, body, `<button class="btn ghost sm" id="negWalk">Walk away</button>${n.counter != null ? `<button class="btn sm" id="negTake">Accept ${money(n.counter)}</button>` : ''}<button class="btn sm" id="negGo">${n.counter != null ? 'Push for more' : 'Make offer'}</button>`);   const ask = () => +$('#negAsk').value;   $('#negAsk').oninput = () => { $('#negAskTxt').textContent = money(ask()) + ' / yr · ' + money(ask() * n.years) + ' total'; };   document.querySelectorAll('[data-ny]').forEach(b => b.onclick = () => { n.years = +b.dataset.ny; n.counter = null; n.note = ''; openNegotiation(k, idx); });   $('#negWalk').onclick = () => { commNeg = null; closeModal(); };   const sign = amt => { signCommercial(k, o, n.years, amt); commNeg = null; closeModal(); };   if ($('#negTake')) $('#negTake').onclick = () => sign(n.counter);   $('#negGo').onclick = () => {     const r = negotiate(n, ask());     if (r.status === 'accepted') { sign(r.amount); if (r.tooLow) toast('They accepted at once — you may have been able to ask for more.'); return; }     if (r.status === 'walked') { c.cool[k + idx] = true; commNeg = null; closeModal(); toast(o.name + ' have walked away from the table.'); viewCommercial(); return; }     if (r.status === 'counter') { n.counter = r.amount; n.note = `${o.name} come back with ${money(r.amount)} a year. Take it or push.`; }     else { n.counter = null; n.note = `${o.name} aren't impressed. Try a lower figure.`; }     openNegotiation(k, idx);   }; } function signCommercial(k, o, years, annual) {   const t = me(), c = initCommercial(t); annual = Math.round(annual * 100) / 100;   c[k] = { partner: o.name, annual, years, yearsLeft: years, since: G.season, boost: o.boost || 1, c1: o.c1, c2: o.c2 };   c.log.push({ k, partner: o.name, annual, years, season: G.season });   payIncome(G, t.id, annual * 0.2, 'sponsor', COMM_TYPES[k].label + ' signing bonus: ' + o.name);   news(G, 'transfer', `${t.s} agree a ${years}-season ${COMM_TYPES[k].label.toLowerCase()} deal with ${o.name}, worth ${money(annual)} a year.`);   save(); toast(`Deal signed with ${o.name}: ${money(annual)} a year.`); viewCommercial(); } function viewCommercial() {   const v = $('#v-commercial'), t = me(); v.classList.add('mmx', 'sqv');   const c = initCommercial(t), fin = t.fin;   const dealCard = k => {     const d = c[k], logo = d.std ? brandLogo({ name: 'Std Kit', c1: '#8f98a2', c2: '#1b1f24' }, 52) : brandLogo(d, 52);     return `<div class="prow" style="grid-template-columns:auto 1fr auto;cursor:default">${logo}<span class="who"><b>${esc(d.partner)}</b>       <small>${d.std ? 'Default supply, renews each season' : `${d.yearsLeft} of ${d.years} season${d.years > 1 ? 's' : ''} left · since ${seasonLabel(d.since)}`}${k === 'kit' && d.boost > 1 ? ` · +${Math.round((d.boost - 1) * 100)}% shirt sales` : ''}${k === 'naming' ? ' · ' + esc(stadiumName(t)) : ''}</small></span><span class="val">${money(d.annual)}/yr</span></div>`;   };   const section = k => {     const T = COMM_TYPES[k], d = c[k], lock = commCanNegotiate(t, k);     const cur = d ? dealCard(k) : `<div class="empty" style="padding:14px">${k === 'naming' ? `No naming-rights partner. The ground is simply "${esc(stadiumName(t))}".` : 'No deal.'}</div>`;     const offers = lock ? `<div class="pad"><p class="hint" style="margin:0">${esc(lock)}</p></div>` :       `<div class="pad"><p class="hint" style="margin:0 0 8px">${d && !d.std ? 'Your current deal is in its final season, so you can switch partner.' : 'Pick a partner to open talks.'}</p>       <div class="sponsorGrid">${c.offers[k].map((o, i) => { const gone = c.cool[k + i];         return `<div class="sponsorCard" ${gone ? 'disabled' : `data-neg="${k}:${i}"`}>${brandLogo(o, 52)}<b>${esc(o.name)}</b><span class="samt">~${money(o.fair)}/yr</span><span class="shint">${gone ? 'Talks broke down' : commInterest(o)}${k === 'kit' ? ' · +' + Math.round((o.boost - 1) * 100) + '% shirts' : ''}</span></div>`; }).join('')}</div></div>`;     return `<div class="panel"><h3>${T.label}<span class="sub">${d ? money(d.annual) + ' a year' : 'no deal'}</span></h3>${cur}${offers}</div>`;   };   const logRows = c.log.slice().reverse();   const shirtPanel = (() => {     const sp = t.currentSponsor;     if (sp) return `<div class="panel"><h3>Shirt sponsor<span class="sub">${money(sp.amount)} this season</span></h3><div class="prow" style="grid-template-columns:auto 1fr auto;cursor:default">${sponsorLogoSVG(sp, 52)}<span class="who"><b>${esc(sp.name)}</b><small>${sp.freq === 'monthly' ? 'Paid monthly · ' + money(sp.paidSoFar) + ' of ' + money(sp.amount) + ' received' : 'Paid upfront'} · runs to the end of ${seasonLabel(G.season)}</small></span><span class="val">${money(sp.amount)}</span></div></div>`;     const offers = sponsorOffersCached(G).map(sponsorScaled);     return `<div class="panel"><h3>Shirt sponsor<span class="sub">no deal</span></h3><div class="pad"><p class="hint" style="margin:0 0 8px">You have no shirt sponsor for ${seasonLabel(G.season)}. Pick one below. The deal runs to the end of the season${(G.round || 1) > 1 ? ', so the fee is reduced for the part already played' : ''}.</p><div class="sponsorGrid">${offers.map((o, i) => `<div class="sponsorCard" data-shirt="${i}">${sponsorLogoSVG(o, 52)}<b>${esc(o.name)}</b>${o.freq === 'monthly' ? `<span class="samt">${money(o.amount / 10)}/mo</span><span class="shint">${money(o.amount)} over the season</span>` : `<span class="samt">${money(o.amount)}</span><span class="shint">Paid immediately</span>`}</div>`).join('')}</div></div></div>`;   })();   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">Sponsors & Commercial</button><span class="sp"></span><button class="mini" id="commFin">Finances</button></div>` +     sqTiles([['Kit supplier', c.kit ? money(c.kit.annual) + '/yr' : '—'], ['Naming rights', c.naming ? money(c.naming.annual) + '/yr' : 'None'], ['Commercial income', money(fin.sponsor)], ['Club reputation', t.rep.toFixed(1) + ' / 10']]) +     shirtPanel + section('kit') + section('naming') +     `<div class="panel tbl-google"><h3>Deal history</h3>${logRows.length ? `<div class="cf-wrap"><table class="gtable"><thead><tr><th>Signed</th><th>Type</th><th>Partner</th><th>Length</th><th>Per year</th></tr></thead><tbody>${logRows.map(l => `<tr><td>${seasonLabel(l.season)}</td><td>${COMM_TYPES[l.k].label}</td><td>${esc(l.partner)}</td><td>${l.years} season${l.years > 1 ? 's' : ''}</td><td><b>${money(l.annual)}</b></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">No deals negotiated yet.</div>'}</div>`;   v.querySelectorAll('[data-neg]').forEach(b => b.onclick = () => { const [k, i] = b.dataset.neg.split(':'); commNeg = null; openNegotiation(k, +i); });   v.querySelectorAll('[data-shirt]').forEach(b => b.onclick = () => { signShirtSponsor(sponsorOffersCached(G)[+b.dataset.shirt]); render(); });   const f = $('#commFin'); if (f) f.onclick = () => { clubTab = 'finances'; goTo('club'); }; } /* ===== DUPLICATE STADIUM CODE (UNUSED): you can delete everything from this line down to the END line ===== const REF_PRICE = [30, 22, 22, 18, 14], SPEND_HEAD = [15, 9, 6, 4, 3], SEAT_COST = [2500, 1500, 900, 500, 300], HOSP_COST = [3, 6, 12], TIER_COSTF = [1, 0.4, 0.15, 0.06, 0.03]; function capFor(t) { return Math.max(300, Math.round([20000, 7000, 4000, 3000, 2200][Math.min(t.tier, 4)] * Math.pow(t.rep / 6, t.tier === 0 ? 1.3 : 0.8) / 100) * 100); } function stadiumOf(t) {   if (!t.stadium) t.stadium = { cap: capFor(t), price: 1, loyalty: 60, hosp: 0, build: null, hist: [], log: [] };   if (t.id !== G.myTeam) t.stadium.cap = capFor(t);   return t.stadium; } function demandFor(G, t, opp, idx, noise) {   const st = stadiumOf(t), tier = Math.min(t.tier, 4);   const posF = 0.12 * (1 - 2 * (posOfTeam(G, t.id) - 1) / 15);   const f = (t.form || []).slice(0, -1).slice(-5), pts = f.reduce((a, r) => a + (r === 'W' ? 3 : r === 'D' ? 1 : 0), 0), formF = f.length ? (pts / f.length - 1.3) / 1.7 * 0.08 : 0;   const oppF = opp ? clamp((opp.rep - t.rep) * 0.035, -0.08, 0.12) : 0;   const base = 0.55 + (t.rep - 5) * 0.04 + posF + formF + oppF;   const loyal = 0.85 + st.loyalty / 333, e = 1.15 - 0.2 * st.loyalty / 100;   const demand = st.cap * Math.max(0.12, base) * loyal * (noise == null ? 0.95 + rnd() * 0.1 : noise) * Math.pow(idx, -e);   const att = Math.max(0, Math.min(st.cap, Math.round(demand)));   return { att, fill: att / st.cap, gate: att * REF_PRICE[tier] * idx / 1e6, hosp: att * SPEND_HEAD[tier] * (1 + 0.4 * st.hosp) / 1e6 }; } function payRaw(G, id, amt, bucket, label) { const t = G.teams[id]; if (!t || !(amt > 0)) return; t.budget += amt; t.fin[bucket] = (t.fin[bucket] || 0) + amt; noteInc(t, label, amt); } function matchdayIncome(G, ht, m) {   const st = stadiumOf(ht), idx = ht.id === G.myTeam ? st.price : 1, opp = G.teams[m.a];   const d = demandFor(G, ht, opp, idx);   payRaw(G, ht.id, d.gate, 'gate', 'Gate receipts');   payRaw(G, ht.id, d.hosp, 'gate', 'Matchday hospitality & catering');   if (ht.id === G.myTeam) {     st.hist.push({ season: G.season, round: G.round, opp: opp.s, att: d.att, cap: st.cap, price: Math.round(REF_PRICE[Math.min(ht.tier, 4)] * idx), rev: d.gate + d.hosp });     if (st.hist.length > 40) st.hist.shift();     const res = m.hg > m.ag ? 1 : m.hg < m.ag ? -0.8 : 0;     st.loyalty = clamp(st.loyalty + res * 0.8 + (idx < 0.9 ? 1.2 : idx > 1.2 ? -1.5 : 0) + (d.fill > 0.95 ? 0.3 : -0.1), 0, 100);   } } function stadiumSeasonEnd(G, t) {   if (t.id !== G.myTeam || !t.stadium || !t.stadium.build) return;   const b = t.stadium.build;   if (b.doneSeason <= G.season) {     t.stadium.cap += b.seats; t.stadium.log.push({ season: G.season, text: `Expansion finished: +${b.seats.toLocaleString()} seats` });     news(G, 'transfer', `${t.s} complete a stadium expansion adding ${b.seats.toLocaleString()} seats. Capacity is now ${t.stadium.cap.toLocaleString()}.`);     t.stadium.build = null;   } } function bestPrice(G, t, opp) {   const st = stadiumOf(t); let best = 1, bestRev = -1;   for (let i = 2.0; i >= 0.5; i -= 0.05) { const d = demandFor(G, t, opp, i, 1); if (d.fill >= 0.98) return Math.round(i * 20) / 20; const r = d.gate + d.hosp; if (r > bestRev) { bestRev = r; best = i; } }   return Math.round(best * 20) / 20; } function nextHomeOpp(G, t) {   for (let r = G.round; r < G.fixtures[t.tier].length; r++) { const m = G.fixtures[t.tier][r].find(x => x.h === t.id); if (m) return { opp: G.teams[m.a], round: r }; }   return null; } function stadiumBuy(kind, ok) {   const t = me(), st = stadiumOf(t), tier = Math.min(t.tier, 4);   if (kind === 'hosp') {     if (st.hosp >= 3) return;     const cost = HOSP_COST[st.hosp] * TIER_COSTF[tier];     if (t.budget < cost) { toast('Not enough budget: ' + money(cost) + ' needed.'); return; }     if (!ok) { gameConfirm('Build hospitality suites', `Build hospitality suites level ${st.hosp + 1} for ${money(cost)}?`, 'Build', () => stadiumBuy(kind, true)); return; }     t.budget -= cost; st.hosp++; st.log.push({ season: G.season, text: `Hospitality suites upgraded to level ${st.hosp} (${money(cost)})` });   } else {     if (st.build) return;     const seats = Math.max(100, Math.round(st.cap * kind / 10000) * 100), cost = seats * SEAT_COST[tier] / 1e6;     if (t.budget < cost) { toast('Not enough budget: ' + money(cost) + ' needed.'); return; }     if (!ok) { gameConfirm('Expand the stadium', `Add ${seats.toLocaleString()} seats for ${money(cost)}? Work finishes at the end of this season.`, 'Start building', () => stadiumBuy(kind, true)); return; }     t.budget -= cost; st.build = { seats, cost, doneSeason: G.season }; st.log.push({ season: G.season, text: `Expansion started: +${seats.toLocaleString()} seats (${money(cost)})` });   }   save(); viewStadium(); } function viewStadium() {   const v = $('#v-stadium'), t = me(), st = stadiumOf(t), tier = Math.min(t.tier, 4); v.classList.add('mmx', 'sqv');   const nh = nextHomeOpp(G, t), hist = st.hist.slice(-5), avgAtt = hist.length ? Math.round(hist.reduce((a, h) => a + h.att, 0) / hist.length) : 0;   const price = Math.round(REF_PRICE[tier] * st.price), proj = nh ? demandFor(G, t, nh.opp, st.price, 1) : null;   const tiles = sqTiles([['Capacity', st.cap.toLocaleString()], ['Average crowd', hist.length ? avgAtt.toLocaleString() + ' (' + Math.round(avgAtt / st.cap * 100) + '%)' : '—'], ['Ticket price', tix(price)], ['Fan loyalty', Math.round(st.loyalty) + ' / 100']]);   const pricePanel = `<div class="panel"><h3>Ticket pricing<span class="sub">${esc(stadiumName(t))}</span></h3><div class="pad">     <div style="display:flex;justify-content:space-between;font-size:13px"><span class="hint">Fan-friendly</span><b id="stPriceTxt">${tix(price)} (${Math.round(st.price * 100)}% of the usual price)</b><span class="hint">Premium</span></div>     <input class="range" type="range" id="stPrice" min="0.5" max="2" step="0.05" value="${st.price}" style="width:100%;margin:6px 0">     <div class="chipbar" style="padding:0 0 8px"><button class="chip" data-sp="0.8">Fan-friendly</button><button class="chip" data-sp="1">Standard</button><button class="chip" data-sp="1.25">Premium</button><button class="chip" id="stAuto">Best price for next game</button></div>     <p id="stProj" class="hint" style="margin:0">${proj ? projText(proj, nh, st) : 'No home games left this season.'}</p>     <p class="hint" style="margin:6px 0 0">Cheap tickets fill the ground and make fans love you. Dear ones earn more per head but anger them over time, and empty seats earn nothing.</p></div></div>`;   const costs = [10, 25, 50].map(p => { const seats = Math.max(100, Math.round(st.cap * p / 10000) * 100); return { p, seats, cost: seats * SEAT_COST[tier] / 1e6 }; });   const expPanel = `<div class="panel"><h3>Stadium expansion<span class="sub">${st.build ? 'Building: +' + st.build.seats.toLocaleString() + ' seats, done at season end' : 'Capacity ' + st.cap.toLocaleString()}</span></h3><div class="pad">     ${st.build ? '<p class="hint" style="margin:0">Construction is under way. You can plan the next project once it finishes.</p>' :       `<div class="sponsorGrid">${costs.map(c => `<div class="sponsorCard" data-sx="${c.p}"><b>+${c.seats.toLocaleString()} seats</b><span class="samt">${money(c.cost)}</span><span class="shint">${c.p}% bigger</span></div>`).join('')}</div>`}     <h4 style="margin:14px 0 6px;font-size:14px">Hospitality suites <span class="hint">level ${st.hosp} of 3 · +${st.hosp * 40}% spend per fan</span></h4>     ${st.hosp >= 3 ? '<p class="hint" style="margin:0">Fully upgraded.</p>' : `<button class="btn ghost sm" id="stHosp">Upgrade to level ${st.hosp + 1} — ${money(HOSP_COST[st.hosp] * TIER_COSTF[tier])}</button>`}</div></div>`;   const rows = st.hist.slice().reverse().slice(0, 12);   const histPanel = `<div class="panel tbl-google"><h3>Recent home games</h3>${rows.length ? `<div class="cf-wrap"><table class="gtable"><thead><tr><th>Opponent</th><th>Crowd</th><th>Full</th><th class="hide-s">Ticket</th><th>Income</th></tr></thead><tbody>${rows.map(h => `<tr><td>${esc(h.opp)}</td><td>${h.att.toLocaleString()}</td><td>${Math.round(h.att / h.cap * 100)}%</td><td class="hide-s">R${h.price}</td><td><b>${money(h.rev)}</b></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">No home games played yet.</div>'}     ${st.log.length ? `<div class="pad"><p class="hint" style="margin:0">${st.log.slice(-3).reverse().map(l => seasonLabel(l.season) + ': ' + esc(l.text)).join('<br>')}</p></div>` : ''}</div>`;   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">Stadium & tickets</button><span class="sp"></span><button class="mini" id="stFin">Finances</button></div>${tiles}${pricePanel}${expPanel}${histPanel}`;   const slider = $('#stPrice'), upd = idx => { const d = nh ? demandFor(G, t, nh.opp, idx, 1) : null; $('#stPriceTxt').textContent = `${tix(REF_PRICE[tier] * idx)} (${Math.round(idx * 100)}% of the usual price)`; if (d) $('#stProj').innerHTML = projText(d, nh, st); };   slider.oninput = () => upd(+slider.value);   slider.onchange = () => { st.price = +slider.value; save(); viewStadium(); };   v.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => { st.price = +b.dataset.sp; save(); viewStadium(); });   $('#stAuto').onclick = () => { if (nh) { st.price = bestPrice(G, t, nh.opp); save(); viewStadium(); } };   v.querySelectorAll('[data-sx]').forEach(b => b.onclick = () => stadiumBuy(+b.dataset.sx));   const h = $('#stHosp'); if (h) h.onclick = () => stadiumBuy('hosp');   $('#stFin').onclick = () => { clubTab = 'finances'; goTo('club'); }; } function projText(d, nh, st) { return `Next home game v ${esc(nh.opp.s)}: about <b>${d.att.toLocaleString()}</b> fans (${Math.round(d.fill * 100)}% full) · income about <b>${money(d.gate + d.hosp)}</b>${d.fill >= 0.99 ? ' · sell-out: you could charge more' : d.fill < 0.6 ? ' · lots of empty seats' : ''}`; } } ===== END OF DUPLICATE STADIUM CODE ===== */ const REF_PRICE = [30, 22, 22, 18, 14], SPEND_HEAD = [15, 9, 6, 4, 3], SEAT_COST = [2500, 1500, 900, 500, 300], HOSP_COST = [3, 6, 12], TIER_COSTF = [1, 0.4, 0.15, 0.06, 0.03]; function capFor(t) { return Math.max(300, Math.round([20000, 7000, 4000, 3000, 2200][Math.min(t.tier, 4)] * Math.pow(t.rep / 6, t.tier === 0 ? 1.3 : 0.8) / 100) * 100); } function stadiumOf(t) {   if (!t.stadium) t.stadium = { cap: capFor(t), price: 1, loyalty: 60, hosp: 0, build: null, hist: [], log: [] };   if (t.id !== G.myTeam) t.stadium.cap = capFor(t);   return t.stadium; } function demandFor(G, t, opp, idx, noise) {   const st = stadiumOf(t), tier = Math.min(t.tier, 4);   const posF = 0.12 * (1 - 2 * (posOfTeam(G, t.id) - 1) / 15);   const f = (t.form || []).slice(0, -1).slice(-5), pts = f.reduce((a, r) => a + (r === 'W' ? 3 : r === 'D' ? 1 : 0), 0), formF = f.length ? (pts / f.length - 1.3) / 1.7 * 0.08 : 0;   const oppF = opp ? clamp((opp.rep - t.rep) * 0.035, -0.08, 0.12) : 0;   const base = 0.55 + (t.rep - 5) * 0.04 + posF + formF + oppF;   const loyal = 0.85 + st.loyalty / 333, e = 1.15 - 0.2 * st.loyalty / 100;   const demand = st.cap * Math.max(0.12, base) * loyal * (noise == null ? 0.95 + rnd() * 0.1 : noise) * Math.pow(idx, -e);   const att = Math.max(0, Math.min(st.cap, Math.round(demand)));   return { att, fill: att / st.cap, gate: att * REF_PRICE[tier] * idx / 1e6, hosp: att * SPEND_HEAD[tier] * (1 + 0.4 * st.hosp) / 1e6 }; } function payRaw(G, id, amt, bucket, label) { const t = G.teams[id]; if (!t || !(amt > 0)) return; t.budget += amt; t.fin[bucket] = (t.fin[bucket] || 0) + amt; noteInc(t, label, amt); } function matchdayIncome(G, ht, m) {   const st = stadiumOf(ht), idx = ht.id === G.myTeam ? st.price : 1, opp = G.teams[m.a];   const d = demandFor(G, ht, opp, idx);   payRaw(G, ht.id, d.gate, 'gate', 'Gate receipts');   payRaw(G, ht.id, d.hosp, 'gate', 'Matchday hospitality & catering');   if (ht.id === G.myTeam) {     st.hist.push({ season: G.season, round: G.round, opp: opp.s, att: d.att, cap: st.cap, price: Math.round(REF_PRICE[Math.min(ht.tier, 4)] * idx), rev: d.gate + d.hosp });     if (st.hist.length > 40) st.hist.shift();     const res = m.hg > m.ag ? 1 : m.hg < m.ag ? -0.8 : 0;     st.loyalty = clamp(st.loyalty + res * 0.8 + (idx < 0.9 ? 1.2 : idx > 1.2 ? -1.5 : 0) + (d.fill > 0.95 ? 0.3 : -0.1), 0, 100);   } } function stadiumSeasonEnd(G, t) {   if (t.id !== G.myTeam || !t.stadium || !t.stadium.build) return;   const b = t.stadium.build;   if (b.doneSeason <= G.season) {     t.stadium.cap += b.seats; t.stadium.log.push({ season: G.season, text: `Expansion finished: +${b.seats.toLocaleString()} seats` });     news(G, 'transfer', `${t.s} complete a stadium expansion adding ${b.seats.toLocaleString()} seats. Capacity is now ${t.stadium.cap.toLocaleString()}.`);     t.stadium.build = null;   } } function bestPrice(G, t, opp) {   const st = stadiumOf(t); let best = 1, bestRev = -1;   for (let i = 2.0; i >= 0.5; i -= 0.05) { const d = demandFor(G, t, opp, i, 1); if (d.fill >= 0.98) return Math.round(i * 20) / 20; const r = d.gate + d.hosp; if (r > bestRev) { bestRev = r; best = i; } }   return Math.round(best * 20) / 20; } function nextHomeOpp(G, t) {   for (let r = G.round; r < G.fixtures[t.tier].length; r++) { const m = G.fixtures[t.tier][r].find(x => x.h === t.id); if (m) return { opp: G.teams[m.a], round: r }; }   return null; } function stadiumBuy(kind, ok) {   const t = me(), st = stadiumOf(t), tier = Math.min(t.tier, 4);   if (kind === 'hosp') {     if (st.hosp >= 3) return;     const cost = HOSP_COST[st.hosp] * TIER_COSTF[tier];     if (t.budget < cost) { toast('Not enough budget: ' + money(cost) + ' needed.'); return; }     if (!ok) { gameConfirm('Build hospitality suites', `Build hospitality suites level ${st.hosp + 1} for ${money(cost)}?`, 'Build', () => stadiumBuy(kind, true)); return; }     t.budget -= cost; st.hosp++; st.log.push({ season: G.season, text: `Hospitality suites upgraded to level ${st.hosp} (${money(cost)})` });   } else {     if (st.build) return;     const seats = Math.max(100, Math.round(st.cap * kind / 10000) * 100), cost = seats * SEAT_COST[tier] / 1e6;     if (t.budget < cost) { toast('Not enough budget: ' + money(cost) + ' needed.'); return; }     if (!ok) { gameConfirm('Expand the stadium', `Add ${seats.toLocaleString()} seats for ${money(cost)}? Work finishes at the end of this season.`, 'Start building', () => stadiumBuy(kind, true)); return; }     t.budget -= cost; st.build = { seats, cost, doneSeason: G.season }; st.log.push({ season: G.season, text: `Expansion started: +${seats.toLocaleString()} seats (${money(cost)})` });   }   save(); viewStadium(); } function viewStadium() {   const v = $('#v-stadium'), t = me(), st = stadiumOf(t), tier = Math.min(t.tier, 4); v.classList.add('mmx', 'sqv');   const nh = nextHomeOpp(G, t), hist = st.hist.slice(-5), avgAtt = hist.length ? Math.round(hist.reduce((a, h) => a + h.att, 0) / hist.length) : 0;   const price = Math.round(REF_PRICE[tier] * st.price), proj = nh ? demandFor(G, t, nh.opp, st.price, 1) : null;   const tiles = sqTiles([['Capacity', st.cap.toLocaleString()], ['Average crowd', hist.length ? avgAtt.toLocaleString() + ' (' + Math.round(avgAtt / st.cap * 100) + '%)' : '—'], ['Ticket price', tix(price)], ['Fan loyalty', Math.round(st.loyalty) + ' / 100']]);   const pricePanel = `<div class="panel"><h3>Ticket pricing<span class="sub">${esc(stadiumName(t))}</span></h3><div class="pad">     <div style="display:flex;justify-content:space-between;font-size:13px"><span class="hint">Fan-friendly</span><b id="stPriceTxt">R${price} (${Math.round(st.price * 100)}% of the usual price)</b><span class="hint">Premium</span></div>     <input class="range" type="range" id="stPrice" min="0.5" max="2" step="0.05" value="${st.price}" style="width:100%;margin:6px 0">     <div class="chipbar" style="padding:0 0 8px"><button class="chip" data-sp="0.8">Fan-friendly</button><button class="chip" data-sp="1">Standard</button><button class="chip" data-sp="1.25">Premium</button><button class="chip" id="stAuto">Best price for next game</button></div>     <p id="stProj" class="hint" style="margin:0">${proj ? projText(proj, nh, st) : 'No home games left this season.'}</p>     <p class="hint" style="margin:6px 0 0">Cheap tickets fill the ground and make fans love you. Dear ones earn more per head but anger them over time, and empty seats earn nothing.</p></div></div>`;   const costs = [10, 25, 50].map(p => { const seats = Math.max(100, Math.round(st.cap * p / 10000) * 100); return { p, seats, cost: seats * SEAT_COST[tier] / 1e6 }; });   const expPanel = `<div class="panel"><h3>Stadium expansion<span class="sub">${st.build ? 'Building: +' + st.build.seats.toLocaleString() + ' seats, done at season end' : 'Capacity ' + st.cap.toLocaleString()}</span></h3><div class="pad">     ${st.build ? '<p class="hint" style="margin:0">Construction is under way. You can plan the next project once it finishes.</p>' :       `<div class="sponsorGrid">${costs.map(c => `<div class="sponsorCard" data-sx="${c.p}"><b>+${c.seats.toLocaleString()} seats</b><span class="samt">${money(c.cost)}</span><span class="shint">${c.p}% bigger</span></div>`).join('')}</div>`}     <h4 style="margin:14px 0 6px;font-size:14px">Hospitality suites <span class="hint">level ${st.hosp} of 3 · +${st.hosp * 40}% spend per fan</span></h4>     ${st.hosp >= 3 ? '<p class="hint" style="margin:0">Fully upgraded.</p>' : `<button class="btn ghost sm" id="stHosp">Upgrade to level ${st.hosp + 1} — ${money(HOSP_COST[st.hosp] * TIER_COSTF[tier])}</button>`}</div></div>`;   const rows = st.hist.slice().reverse().slice(0, 12);   const histPanel = `<div class="panel tbl-google"><h3>Recent home games</h3>${rows.length ? `<div class="cf-wrap"><table class="gtable"><thead><tr><th>Opponent</th><th>Crowd</th><th>Full</th><th class="hide-s">Ticket</th><th>Income</th></tr></thead><tbody>${rows.map(h => `<tr><td>${esc(h.opp)}</td><td>${h.att.toLocaleString()}</td><td>${Math.round(h.att / h.cap * 100)}%</td><td class="hide-s">${tix(h.price)}</td><td><b>${money(h.rev)}</b></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">No home games played yet.</div>'}     ${st.log.length ? `<div class="pad"><p class="hint" style="margin:0">${st.log.slice(-3).reverse().map(l => seasonLabel(l.season) + ': ' + esc(l.text)).join('<br>')}</p></div>` : ''}</div>`;   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">Stadium & tickets</button><span class="sp"></span><button class="mini" id="stFin">Finances</button></div>${tiles}${pricePanel}${expPanel}${histPanel}`;   const slider = $('#stPrice'), upd = idx => { const d = nh ? demandFor(G, t, nh.opp, idx, 1) : null; $('#stPriceTxt').textContent = `${tix(REF_PRICE[tier] * idx)} (${Math.round(idx * 100)}% of the usual price)`; if (d) $('#stProj').innerHTML = projText(d, nh, st); };   slider.oninput = () => upd(+slider.value);   slider.onchange = () => { st.price = +slider.value; save(); viewStadium(); };   v.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => { st.price = +b.dataset.sp; save(); viewStadium(); });   $('#stAuto').onclick = () => { if (nh) { st.price = bestPrice(G, t, nh.opp); save(); viewStadium(); } };   v.querySelectorAll('[data-sx]').forEach(b => b.onclick = () => stadiumBuy(+b.dataset.sx));   const h = $('#stHosp'); if (h) h.onclick = () => stadiumBuy('hosp');   $('#stFin').onclick = () => { clubTab = 'finances'; goTo('club'); }; } function projText(d, nh, st) { return `Next home game v ${esc(nh.opp.s)}: about <b>${d.att.toLocaleString()}</b> fans (${Math.round(d.fill * 100)}% full) · income about <b>${money(d.gate + d.hosp)}</b>${d.fill >= 0.99 ? ' · sell-out: you could charge more' : d.fill < 0.6 ? ' · lots of empty seats' : ''}`; } const OBJ_NAMES = { league: 'League', cup: 'Cup', money: 'Finances', youth: 'Youth' }; const OBJ_STATE = { met: ['Met', '#3ddc84'], ontrack: ['On track', '#3ddc84'], pending: ['Not started', '#8f98a2'], atrisk: ['At risk', '#f2b928'], behind: ['Behind', '#ff6b6b'], failed: ['Failed', '#ff6b6b'] }; function boardLabel(b) { return b >= 75 ? 'Secure' : b >= 55 ? 'Comfortable' : b >= 35 ? 'Under pressure' : 'In danger'; } function leagueObjective(t) {   const peers = G.teams.filter(x => x.tier === t.tier).sort((a, b) => teamOverall(b) - teamOverall(a));   const rank = peers.findIndex(x => x.id === t.id) + 1, lastTier = t.tier === TIER_NAMES.length - 1, safe = TIER_SIZE - 3;   let target = Math.max(1, Math.round(rank * 0.85)), label;   if (t.tier > 0 && rank <= 3) { target = 2; label = 'Win promotion'; }   else if (t.tier > 0 && rank <= 7) { target = 6; label = 'Reach the promotion play-offs'; }   else if (target === 1) label = 'Win the league';   else if (!lastTier && target >= safe) { target = safe; label = 'Avoid relegation'; }   else label = 'Finish in the top ' + target;   return { kind: 'league', label, target, weight: 3, detail: `Your squad is ranked ${ordinal(rank)} of ${peers.length} in the ${TIER_SHORT[t.tier]}.` }; } function cupObjective(t) {   const all = G.teams.slice().sort((a, b) => teamOverall(b) - teamOverall(a)), rank = all.findIndex(x => x.id === t.id) + 1;   const idx = rank <= 4 ? 5 : rank <= 12 ? 4 : rank <= 30 ? 3 : rank <= 55 ? 2 : 1;   return { kind: 'cup', label: `Reach the ${CUP_ROUNDS[idx]} in the ${CUP_NAME}`, target: idx, weight: 1, detail: `You are the ${ordinal(rank)} strongest of ${all.length} clubs in the cup.` }; } function moneyObjective(t) {   const allow = Math.max(0.1, Math.round(t.wageBill * 0.25 * 10) / 10);   return { kind: 'money', label: `Do not lose more than ${money(allow)} this season`, target: allow, weight: 1, detail: 'Wages and transfer fees count against income.' }; } function youthObjective(t) {   const n = t.tier === 0 ? 1 : 2;   return { kind: 'youth', label: `Give ${n} young player${n > 1 ? 's' : ''} (21 or under) 10 or more appearances`, target: n, weight: 1, detail: 'The board want to see the academy used.' }; } function setBoardObjectives(G) {   const t = G.teams[G.myTeam]; if (!t) return null;   const items = [leagueObjective(t), cupObjective(t), moneyObjective(t)];   if ((G.season + t.id) % 2 === 0) items.push(youthObjective(t));   items.forEach((it, i) => { it.id = i; });   G.obj = { season: G.season, team: t.id, items };   mail(G, { key: 'obj_' + G.season + '_' + t.id, cat: 'career', from: 'Board of Directors', subject: `Season Objectives ${seasonLabel(G.season)}`, flag: true,     body: [`The board have set the following objectives for ${seasonLabel(G.season)}.`, `Meeting them will strengthen our confidence in you. Missing them will not go unnoticed. We will review progress at the halfway point.`],     rows: items.map(it => [OBJ_NAMES[it.kind], it.label]) });   return G.obj; } function boardObjectives(G) { return (G.obj && G.obj.season === G.season && G.obj.team === G.myTeam) ? G.obj : setBoardObjectives(G); } function cupReached(G) {   const c = G.cup; if (!c) return 0; let r = 0;   (c.log || []).forEach(e => { const tie = e.ties.find(x => x.h === G.myTeam || x.a === G.myTeam); if (tie) r = Math.max(r, tie.winner === G.myTeam ? e.stage + 1 : e.stage); });   if (c.alive && c.alive.includes(G.myTeam)) r = Math.max(r, c.stage);   if (c.winner === G.myTeam) r = CUP_ROUNDS.length;   return r; } function evalObjective(G, it, final) {   const t = G.teams[G.myTeam], tot = totalRounds(G), rd = G.round;   if (it.kind === 'league') {     const pos = final ? t.history[t.history.length - 1].pos : posOfTeam(G, t.id), ok = pos <= it.target;     const state = final ? (ok ? 'met' : 'failed') : rd < 5 ? 'pending' : ok ? 'ontrack' : pos <= it.target + 3 ? 'atrisk' : 'behind';     return { state, text: `${ordinal(pos)} ${final ? 'final' : 'now'} · target ${ordinal(it.target)}`, pct: clamp(100 * (TIER_SIZE - pos) / Math.max(1, TIER_SIZE - it.target), 0, 100) };   }   if (it.kind === 'cup') {     const reached = cupReached(G), ok = reached >= it.target, alive = G.cup && G.cup.alive.includes(G.myTeam) && !G.cup.done;     const state = ok ? 'met' : alive && !final ? 'ontrack' : 'failed';     return { state, text: ok || reached > 0 ? `Reached the ${CUP_ROUNDS[Math.min(reached, CUP_ROUNDS.length - 1)]}${alive && !ok ? ' · still in the cup' : ''}` : 'Waiting for the draw', pct: clamp(100 * reached / it.target, 0, 100) };   }   if (it.kind === 'money') {     if (final) { const f = t.finHistory[t.finHistory.length - 1], ok = f.net >= -it.target; return { state: ok ? 'met' : 'failed', text: `Season result ${f.net >= 0 ? '+' : '−'}${money(Math.abs(f.net))}`, pct: ok ? 100 : 30 }; }     const fin = t.fin, inc = fin.prize + fin.sponsor + fin.gate + fin.sales;     if (rd < 6) return { state: 'pending', text: 'Too early to judge', pct: 50 };     const proj = inc * tot / rd - fin.buys - t.wageBill, ok = proj >= -it.target;     return { state: ok ? 'ontrack' : 'atrisk', text: `Projected ${proj >= 0 ? '+' : '−'}${money(Math.abs(proj))} for the season`, pct: ok ? 100 : clamp(100 * (1 - (-proj - it.target) / Math.max(1, t.wageBill)), 5, 90) };   }   const n = t.squad.filter(p => p.age <= 21 && (p.apps || 0) >= 10).length, ok = n >= it.target;   return { state: ok ? 'met' : final ? 'failed' : rd < 14 ? 'pending' : 'atrisk', text: `${n} of ${it.target} so far`, pct: clamp(100 * n / it.target, 0, 100) }; } function boardTick(G) {   const t = G.teams[G.myTeam]; if (!t) return;   const o = boardObjectives(G), half = Math.floor(totalRounds(G) / 2);   if (G.round < half || G.finished) return;   const evs = o.items.map(it => ({ it, e: evalObjective(G, it, false) })), lg = evs[0].e;   const body = lg.state === 'behind' ? ['We are halfway through the season and the board have serious concerns about results.', 'Improvement is expected immediately. Our patience is not unlimited.']     : lg.state === 'atrisk' ? ['We are halfway through the season. Results are close to what we asked for, but we would like to see more.', 'Please keep working.']     : ['We are halfway through the season and the board are pleased with progress.', 'Keep it up. Here is where you stand against each objective.'];   const m = mail(G, { key: 'objmid_' + G.season + '_' + t.id, cat: 'career', from: 'Board of Directors', subject: 'Board Review: Halfway Point', flag: lg.state === 'behind', body,     rows: evs.map(x => [OBJ_NAMES[x.it.kind], x.e.text + ' · ' + OBJ_STATE[x.e.state][0]]) });   if (m && lg.state === 'behind') G.board = clamp((G.board != null ? G.board : 62) - 6, 0, 100); } function viewBoard() {   const v = $('#v-board'), t = me(); v.classList.add('mmx', 'sqv');   const o = boardObjectives(G), board = G.board != null ? G.board : 62, half = Math.floor(totalRounds(G) / 2);   const evs = o.items.map(it => ({ it, e: evalObjective(G, it, false) })), okN = evs.filter(x => x.e.state === 'met' || x.e.state === 'ontrack').length;   const col = board >= 55 ? '#3ddc84' : board >= 35 ? '#f2b928' : '#ff6b6b';   const tiles = sqTiles([['Board confidence', Math.round(board) + ' / 100', col], ['Job security', boardLabel(board), col], ['Objectives', okN + ' of ' + evs.length + ' on track'], ['Next review', G.round < half ? 'Matchday ' + half : 'End of season']]);   const rows = evs.map(({ it, e }) => { const st = OBJ_STATE[e.state];     return `<div class="cf-row"><div class="l"><span><b>${OBJ_NAMES[it.kind]}</b> · ${esc(it.label)}</span><b style="color:${st[1]}">${st[0]}</b></div>       <div class="bar"><i style="width:${Math.round(e.pct)}%;background:${st[1]}"></i></div><small class="hint">${esc(e.text)} · ${esc(it.detail || '')}</small></div>`; }).join('');   const meter = `<div class="pad"><div style="position:relative;height:10px;border-radius:6px;background:linear-gradient(90deg,#ff6b6b 0%,#ff6b6b 20%,#f2b928 35%,#f2b928 55%,#3ddc84 75%,#3ddc84 100%)">       <i style="position:absolute;left:calc(${Math.round(board)}% - 2px);top:-4px;width:4px;height:18px;background:#fff;border-radius:2px"></i></div>     <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:4px" class="hint"><span>Sacked at 20</span><span>Pressure</span><span>Comfortable</span><span>Secure</span></div>     <p class="hint" style="margin:8px 0 0">Confidence moves at the end of each season (league finish against the target, trophies, promotion or relegation, the other objectives and money) and at the halfway review. Meeting every objective earns a bonus to your transfer budget.</p></div>`;   const log = (G.objLog || []).slice().reverse();   const cell = (r, k) => { const x = r.results.find(y => y.kind === k); return x ? `<span style="color:${x.met ? '#3ddc84' : '#ff6b6b'}">${x.met ? '✓' : '✗'}</span>` : '<span class="muted">–</span>'; };   const hist = `<div class="panel tbl-google"><h3>Objective history</h3>${log.length ? `<div class="cf-wrap"><table class="gtable"><thead><tr><th>Season</th><th>Club</th><th>League</th><th>Cup</th><th>Money</th><th>Youth</th><th>Board</th><th class="hide-s">Bonus</th></tr></thead><tbody>` +     log.map(r => `<tr><td>${seasonLabel(r.season)}</td><td>${esc(r.club)}</td><td>${cell(r, 'league')} <span class="muted">${ordinal(r.pos)}</span></td><td>${cell(r, 'cup')}</td><td>${cell(r, 'money')}</td><td>${cell(r, 'youth')}</td><td><b>${Math.round(r.board)}</b></td><td class="hide-s">${r.bonus > 0 ? money(r.bonus) : '–'}</td></tr>`).join('') + '</tbody></table></div>'     : '<div class="empty">No seasons completed yet.</div>'}</div>`;   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">Board & objectives</button><span class="sp"></span><button class="mini" id="bdFunds">Ask for funds</button></div>${tiles}     <div class="panel"><h3>${esc(seasonLabel(G.season))} objectives<span class="sub">${esc(t.n)}</span></h3><div class="pad">${rows}</div></div>     <div class="panel"><h3>Board confidence</h3>${meter}</div>${hist}`;   const f = $('#bdFunds'); if (f) f.onclick = () => askBoardModal(); } const LEG_W = [1, 0.95, 0.9, 0.85, 0.8], LEG_GAME_APPS = 500, LEG_GAME_GOALS = 200, LEG_CLUB_APPS = 400, LEG_CLUB_GOALS = 120; const LEG_AWARD = { goldenBoot: ['Golden Boot', '⚽'], playerOfSeason: ['Player of the Season', '⭐'], youngPlayerOfSeason: ['Young Player of the Season', '🌱'] }; function legEval(G, p, t, live) {   const ent = (p.career || []).map(e => ({ season: e.season, club: e.club, tier: e.tier, apps: e.apps, g: e.g, a: e.a, rating: e.rating }));   if (live && t && (p.apps > 0 || p.goals > 0)) ent.push({ season: G.season, club: t.id, tier: t.tier, apps: p.apps, g: p.goals, a: p.assists, rating: p.rating });   const w = e => LEG_W[Math.min(e.tier || 0, 4)];   const sa = ent.reduce((a, e) => a + e.apps, 0) || 1, sg = ent.reduce((a, e) => a + e.g, 0) || 1;   const wApps = (p.cApps || 0) * ent.reduce((a, e) => a + e.apps * w(e), 0) / sa, wGoals = (p.cG || 0) * ent.reduce((a, e) => a + e.g * w(e), 0) / sg;   const by = {};   ent.forEach(e => { const c = by[e.club] || (by[e.club] = { id: e.club, w: 0, wg: 0 }); c.w += e.apps * w(e); c.wg += e.g * w(e); });   const peak = Math.max(p.rating || 0, ...ent.map(e => e.rating || 0));   return { ent, peak, game: (wApps >= LEG_GAME_APPS && peak >= 73) || (wGoals >= LEG_GAME_GOALS && peak >= 70), clubs: Object.values(by).filter(c => (c.w >= LEG_CLUB_APPS && peak >= 72) || (c.wg >= LEG_CLUB_GOALS && peak >= 70)).map(c => c.id) }; } function legAwards(G, pid) {   const out = [];   ((G.records && G.records.seasons) || []).forEach(s => { const a = s.awards; if (!a) return;     Object.keys(LEG_AWARD).forEach(k => { if (a[k] && a[k].pid === pid) out.push({ season: s.season, kind: k, label: LEG_AWARD[k][0], note: k === 'goldenBoot' ? a[k].goals + ' goals' : a[k].clubName || '' }); }); });   return out; } function legHonours(G, ent) {   const out = [];   ent.forEach(e => { const c = G.teams[e.club]; if (!c || e.apps < 8) return; (c.trophies || []).forEach(x => { if (x.season === e.season) out.push({ season: e.season, club: e.club, name: x.name }); }); });   return out; } function legUpsert(G, p, t, live, retired) {   const ev = legEval(G, p, t, live);   let L = G.legends.find(x => x.pid === p.id), isNew = false;   if (!ev.game && !ev.clubs.length && !L) return null;   if (!L) { isNew = true; L = { pid: p.id, name: p.name, nat: p.nat, pos: p.pos, portrait: p.portrait || null, face: p.portrait ? null : (p.face || null), noFace: !!p.noFace, since: G.season, seasons: [], awards: [], honours: [], clubLegend: [], game: false }; G.legends.push(L); }   ev.ent.forEach(e => { const ex = L.seasons.find(s => s.season === e.season && s.club === e.club);     if (ex) { ex.apps = e.apps; ex.g = e.g; ex.a = e.a; ex.rating = e.rating; ex.tier = e.tier; } else L.seasons.push({ season: e.season, club: e.club, tier: e.tier, apps: e.apps, g: e.g, a: e.a, rating: e.rating }); });   L.seasons.sort((a, b) => a.season - b.season);   L.apps = p.cApps || 0; L.goals = p.cG || 0; L.assists = p.cA || 0; L.pos = p.pos; L.club = t ? t.id : L.club;   L.peak = Math.max(L.peak || 0, p.rating || 0, ...ev.ent.map(e => e.rating || 0));   L.game = L.game || ev.game; ev.clubs.forEach(c => { if (L.clubLegend.indexOf(c) < 0) L.clubLegend.push(c); });   L.awards = legAwards(G, p.id); L.honours = legHonours(G, L.seasons);   if (retired) L.retired = G.season;   if (isNew) {     const why = ev.game ? ((p.cApps >= LEG_GAME_APPS) ? `${p.cApps} career appearances` : `${p.cG} career goals`) : `a club legend at ${G.teams[ev.clubs[0]] ? G.teams[ev.clubs[0]].n : 'his club'}`;     news(G, 'season', `${p.name} becomes ${ev.game ? 'an MM Legend' : 'a club legend'} with ${why}.`);     if (t && t.id === G.myTeam) mail(G, { cat: 'award', from: 'Chief Executive', p, club: t, status: ev.game ? 'MM Legend' : 'Club Legend', flag: true, subject: `${ev.game ? 'MM Legend' : 'Club Legend'}: ${p.name}`,       body: [`${p.name} has been inducted into the MM Legends hall.`, `Your name is on the wall now, ${p.name}. A true servant of ${t.n}.`] });   }   return L; } function legendRetire(G, p, t) { G.legends = G.legends || []; legUpsert(G, p, t, false, true); } function updateLegends(G) {   G.legends = G.legends || [];   const eachP = f => { G.teams.forEach(t => t.squad.forEach(p => f(p, t))); (G.freeAgents || []).forEach(p => f(p, null)); };   eachP((p, t) => { if ((p.cApps || 0) >= 300 || (p.cG || 0) >= 100 || G.legends.some(x => x.pid === p.id)) legUpsert(G, p, t, false, false); }); } function updateLegendsLive(G) {   G.teams.forEach(t => t.squad.forEach(p => { if ((p.cApps || 0) >= 300 || (p.cG || 0) >= 100 || G.legends.some(x => x.pid === p.id)) legUpsert(G, p, t, true, false); })); } /* ---- historical legends so the hall is never empty ---- */ function legRng(seed) { let s = seed >>> 0; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; } function seedLegends(G) {   if (G.legendsSeeded) return; G.legendsSeeded = true; G.legends = G.legends || [];   const r = legRng(20260101), ri = (a, b) => a + Math.floor(r() * (b - a + 1)), pk = a => a[Math.floor(r() * a.length)];   const top = G.teams.filter(t => t.tier === 0).map(t => t.id), low = G.teams.filter(t => t.tier >= 2).map(t => t.id), mid = G.teams.filter(t => t.tier === 1).map(t => t.id);   const NATS = ['ZA','ZA','ZA','ZA','ZA','ZA','ZA','ZA','ZW','ZM','NG','GH','CM','SN','CD','MA','EG','BR','AR','PT','NL','CI','AO','TZ','KE'];   const RATE = { ST: .42, CF: .38, RW: .24, LW: .24, CAM: .2, RM: .14, LM: .14, CM: .1, CDM: .05, CB: .05, LB: .03, RB: .03, RWB: .04, LWB: .04, GK: 0 };   const POSN = { goals: ['ST', 'ST', 'CF', 'ST', 'RW', 'LW', 'CAM', 'ST'], any: ['CM', 'CB', 'CDM', 'GK', 'LB', 'RB', 'CAM', 'CB', 'CM', 'RW'] };   const make = (i, kind, clubs) => {     const nat = pk(NATS), group = ethnicGroupFor(nat), nm = personName(nat, group), pos = kind === 'strike' ? pk(POSN.goals) : pk(POSN.any);     const endY = ri(2006, 2025), len = kind === 'club' ? ri(12, 14) : ri(16, 20), startY = endY - len + 1;     const rate = (RATE[pos] || .05) * (0.75 + r() * 0.6), seasons = []; let apps = 0, goals = 0;     for (let k = 0, age = ri(18, 20); k < len; k++, age++) {       const base = age < 20 ? 6 + r() * 12 : age < 22 ? 22 + r() * 10 : age <= 31 ? 33 + r() * 11 : age <= 34 ? 27 + r() * 10 : 14 + r() * 10;       const a = Math.min(46, Math.round(base)), peak = age >= 23 && age <= 30 ? 1.15 : age < 21 ? 0.5 : 0.8;       const gl = Math.round(a * rate * peak * (0.6 + r() * 0.8));       const club = clubs[Math.min(clubs.length - 1, Math.floor(k / len * clubs.length))], tm = G.teams[club];       seasons.push({ season: startY + k, club, tier: tm ? Math.min(tm.tier, 4) : 0, apps: a, g: gl, a: Math.round(a * (0.04 + r() * 0.12) * (rate > .2 ? 0.6 : 1.4)), rating: Math.round(Math.min(90, 52 + (age >= 23 && age <= 31 ? 22 : age < 23 ? 12 : 14) + r() * 12)), age });       apps += a; goals += gl;     }     const born = startY - seasons[0].age;     return { pid: 'L' + i, name: nm.first + ' ' + nm.last, nat, pos, portrait: pick(PLAYER_PORTRAITS[group] || PLAYER_PORTRAITS.black), face: null, noFace: false, seeded: true, since: endY, retired: endY, born, seasons: seasons.map(s => ({ season: s.season, club: s.club, tier: s.tier, apps: s.apps, g: s.g, a: s.a, rating: s.rating })),       apps, goals, assists: seasons.reduce((a, s) => a + s.a, 0), peak: Math.max(...seasons.map(s => s.rating)), club: seasons[seasons.length - 1].club, awards: [], honours: [], clubLegend: [], game: false };   };   const finish = (L, kind) => {     const by = {}; L.seasons.forEach(s => { const c = by[s.club] || (by[s.club] = { w: 0, wg: 0 }); const w = LEG_W[s.tier]; c.w += s.apps * w; c.wg += s.g * w; });     const wa = L.seasons.reduce((a, s) => a + s.apps * LEG_W[s.tier], 0), wg = L.seasons.reduce((a, s) => a + s.g * LEG_W[s.tier], 0);     L.game = wa >= LEG_GAME_APPS || wg >= LEG_GAME_GOALS;     L.clubLegend = Object.keys(by).filter(c => by[c].w >= LEG_CLUB_APPS || by[c].wg >= LEG_CLUB_GOALS).map(Number);     if (kind === 'club' && L.game) return false;     if (!L.game && !L.clubLegend.length) return false;     const sorted = L.seasons.slice().sort((a, b) => b.g - a.g);     if ((RATE[L.pos] || 0) >= .24) sorted.slice(0, ri(0, 3)).forEach(s => { if (s.g >= 14 && s.tier === 0) L.awards.push({ season: s.season, kind: 'goldenBoot', label: 'Golden Boot', note: s.g + ' goals' }); });     if (L.game || r() < 0.4) L.seasons.slice().sort((a, b) => b.rating - a.rating).slice(0, ri(0, 3)).forEach(s => { if (s.tier === 0 && s.apps >= 28) L.awards.push({ season: s.season, kind: 'playerOfSeason', label: 'Player of the Season', note: G.teams[s.club] ? G.teams[s.club].n : '' }); });     const yg = L.seasons.find(s => s.apps >= 24 && s.season - L.born <= 21); if (yg && yg.tier === 0 && r() < 0.35) L.awards.push({ season: yg.season, kind: 'youngPlayerOfSeason', label: 'Young Player of the Season', note: G.teams[yg.club] ? G.teams[yg.club].n : '' });     const seen = {}; L.awards = L.awards.filter(a => !seen[a.kind + a.season] && (seen[a.kind + a.season] = 1)).sort((a, b) => a.season - b.season);     L.seasons.forEach(s => { const tm = G.teams[s.club]; if (!tm || s.apps < 15) return; const strong = tm.rep >= 7 ? 0.24 : tm.rep >= 5.5 ? 0.09 : 0.03;       if (r() < strong) L.honours.push({ season: s.season, club: s.club, name: TIER_NAMES[Math.min(s.tier, TIER_NAMES.length - 1)] });       if (r() < 0.05) L.honours.push({ season: s.season, club: s.club, name: CUP_NAME }); });     return true;   };   let n = 1; const add = (mk, kind) => { for (let tries = 0; tries < 6; tries++) { const L = mk(); if (finish(L, kind)) { G.legends.push(L); return; } } };   for (let k = 0; k < 6; k++) { let c = [pk(top)]; if (r() < .7) c.push(pk(top)); if (r() < .35) c.push(pk(top.concat(mid))); add(() => make(n++, 'strike', c), 'strike'); }   for (let k = 0; k < 5; k++) { let c = [pk(top)]; if (r() < .6) c.push(pk(top)); add(() => make(n++, 'game', c), 'game'); }   add(() => make(n++, 'game', [pk(low)]), 'game');   top.forEach(id => { if (r() < 0.75) add(() => make(n++, 'club', [id]), 'club'); if (r() < 0.2) add(() => make(n++, 'club', [id]), 'club'); });   for (let k = 0; k < 3; k++) add(() => make(n++, 'club', [pk(low.concat(mid))]), 'club');   let guard = 0; while (!G.legends.some(l => l.game) && guard++ < 6) add(() => make(n++, 'strike', [pk(top)]), 'strike'); } let legSel = null, legFilter = 'all', legSort = 'apps', legQ = '', legCssOn = false; function legCss() {   if (legCssOn || document.getElementById('legCss')) { legCssOn = true; return; } legCssOn = true;   const st = document.createElement('style'); st.id = 'legCss';   st.textContent = `.lgHall{position:relative;margin-top:8px;padding:16px 14px 18px;background:radial-gradient(120% 70% at 50% 0%,rgba(248,205,75,.13),transparent 60%),linear-gradient(180deg,#0a0d11,#10151b 60%,#0a0d11);border:12px solid #3b2a19;border-image:linear-gradient(135deg,#7a5733,#2b1d10 45%,#6b4a2a 70%,#2b1d10) 1;box-shadow:inset 0 0 50px rgba(0,0,0,.85),0 12px 30px rgba(0,0,0,.55);overflow:hidden} .lgBanner{text-align:center;padding:6px 0 14px}.lgBanner h2{margin:0;font:800 30px/1 var(--head);letter-spacing:.18em;background:linear-gradient(180deg,#fff3c4,#e8a812 55%,#8a5f10);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))}.lgBanner p{margin:6px 0 0;color:#c9b27a;font-size:12.5px;letter-spacing:.08em}.lgStars{color:#f2b928;letter-spacing:.5em;font-size:13px;margin-bottom:6px} .lgGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:18px;padding:6px 2px} .lgCard{position:relative;border-radius:15px;padding:3px;background:conic-gradient(from 210deg,#8a5f10,#ffe08a,#e8a812,#fff3c4,#b8861b,#ffe08a,#8a5f10);box-shadow:0 8px 20px rgba(0,0,0,.6),0 0 0 1px #5a410b;cursor:pointer;transition:transform .18s,box-shadow .18s;border:0;text-align:left;color:inherit;font-family:var(--body);display:block;width:100%} .lgCard:hover{transform:translateY(-5px) rotate(-.4deg);box-shadow:0 14px 28px rgba(0,0,0,.65),0 0 22px rgba(242,185,40,.35)} .lgIn{position:relative;overflow:hidden;border-radius:12px;padding:12px 12px 11px;color:#f6e7bb;background:radial-gradient(90% 60% at 50% 0%,rgba(255,224,138,.16),transparent 70%),linear-gradient(165deg,#2b2009,#14100a 55%,#2a1f08)} .lgIn::after{content:'';position:absolute;top:-60%;left:-70%;width:55%;height:220%;background:linear-gradient(100deg,transparent,rgba(255,240,180,.34),transparent);transform:rotate(18deg);transition:left .75s}.lgCard:hover .lgIn::after{left:125%} .lgRib{display:flex;justify-content:space-between;align-items:center;font:800 9.5px var(--head);letter-spacing:.16em;color:#ffe08a}.lgRib b{background:linear-gradient(180deg,#ffe08a,#b8861b);color:#2b1d05;border-radius:3px;padding:2px 7px} .lgDot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px;background:#3ddc84;box-shadow:0 0 8px #3ddc84}.lgDot.off{background:#7b838c;box-shadow:none} .lgPic{display:flex;justify-content:center;margin:11px 0 8px}.lgPic .face,.lgPic svg{border-radius:50%;border:3px solid #f2c94c;box-shadow:0 0 0 3px #1b1306,0 0 20px rgba(242,185,40,.4);background:#1b1306} .lgName{text-align:center;font:800 15px/1.2 var(--head);color:#fff3c4;margin:0}.lgSub{text-align:center;font-size:11.5px;color:#c9b27a;margin:3px 0 7px} .lgCrests{display:flex;justify-content:center;gap:5px;margin-bottom:8px;min-height:20px} .lgStats{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.lgStats div{background:rgba(0,0,0,.35);border:1px solid #5a410b;border-radius:7px;padding:5px 2px;text-align:center}.lgStats b{display:block;font:800 16px var(--head);color:#ffe08a}.lgStats small{font-size:9px;letter-spacing:.1em;color:#a99568} .lgPlaq small{display:block;font:600 9.5px var(--body);color:#4a3510;letter-spacing:.03em;margin-top:1px}.lgPlaq{margin-top:8px;text-align:center;font:700 10px/1.3 var(--head);letter-spacing:.04em;color:#2b1d05;background:linear-gradient(180deg,#ecc86f,#b8913a);border-radius:2px;padding:3px 6px;box-shadow:0 2px 4px rgba(0,0,0,.5)} .lgBack{background:#1b2027;border:1px solid #2f363e;color:#e6e9ed;border-radius:8px;padding:7px 12px;cursor:pointer;margin-bottom:10px} .lgHero{display:flex;gap:18px;align-items:center;flex-wrap:wrap;padding:6px 4px 14px}.lgHero .lgPic{margin:0}.lgHero h1{margin:0;font:800 28px/1.1 var(--head);color:#fff3c4}.lgTags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.lgTags span{font:800 10px var(--head);letter-spacing:.12em;background:linear-gradient(180deg,#ffe08a,#b8861b);color:#2b1d05;border-radius:3px;padding:3px 8px} .lgBig{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:8px;margin:4px 0 14px}.lgBig div{background:linear-gradient(180deg,rgba(255,224,138,.1),rgba(0,0,0,.3));border:1px solid #5a410b;border-radius:10px;padding:10px 4px;text-align:center}.lgBig b{display:block;font:800 24px var(--head);color:#ffe08a}.lgBig small{font-size:10px;letter-spacing:.12em;color:#a99568} .lgSec{margin:16px 0 8px;font:800 13px var(--head);letter-spacing:.16em;color:#e8a812}.lgSec::after{content:'';display:block;height:1px;margin-top:6px;background:linear-gradient(90deg,#e8a812,transparent)} .lgTl{position:relative;margin-left:10px;padding-left:18px;border-left:2px solid #5a410b}.lgRow{position:relative;display:grid;grid-template-columns:70px 1fr auto;gap:10px;align-items:center;padding:7px 0}.lgRow::before{content:'';position:absolute;left:-25px;top:50%;width:11px;height:11px;margin-top:-6px;border-radius:50%;background:#2b2009;border:2px solid #b8861b}.lgRow.mile::before{background:#ffe08a;box-shadow:0 0 12px #ffe08a} .lgRow .yr{font:700 12px var(--head);color:#e8a812}.lgRow .tm{display:flex;align-items:center;gap:7px;font-size:13px;color:#f6e7bb;min-width:0}.lgBars{height:7px;border-radius:4px;background:#1d1609;overflow:hidden;margin-top:4px}.lgBars i{display:block;height:100%;background:linear-gradient(90deg,#b8861b,#ffe08a)} .lgChip{display:inline-block;margin:2px 3px 0 0;padding:2px 7px;border-radius:10px;font-size:10.5px;background:rgba(242,185,40,.14);border:1px solid #7a5b14;color:#ffe08a}.lgChip.m{background:linear-gradient(180deg,#ffe08a,#b8861b);color:#2b1d05;border-color:#ffe08a;font-weight:700} .lgClubs{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}.lgClubs div{display:flex;gap:10px;align-items:center;background:rgba(0,0,0,.3);border:1px solid #5a410b;border-radius:10px;padding:9px}.lgClubs small{display:block;color:#a99568;font-size:11px} .lgShelf{display:flex;flex-wrap:wrap;gap:12px}.lgPl{min-width:130px;text-align:center}.lgPl .ic{font-size:26px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.6))} @media(max-width:700px){.lgGrid{grid-template-columns:repeat(2,1fr);gap:12px}.lgBanner h2{font-size:22px}.lgHero h1{font-size:22px}.lgRow{grid-template-columns:58px 1fr}.lgRow .rt{display:none}}`;   document.head.appendChild(st); } function legClubName(id) { const t = G.teams[id]; return t ? t.n : 'Club ' + id; } function legCrest(id, s) { const t = G.teams[id]; return t ? crestHTML(t, s) : ''; } function legYears(L) { const a = L.seasons.map(s => s.season); if (!a.length) return ''; const f = Math.min.apply(null, a), l = Math.max.apply(null, a); return f + '–' + (L.retired ? l : 'present'); } function legClubsOf(L) {   const by = {}; L.seasons.forEach(s => { const c = by[s.club] || (by[s.club] = { id: s.club, apps: 0, g: 0, a: 0, from: s.season, to: s.season }); c.apps += s.apps; c.g += s.g; c.a += s.a; c.from = Math.min(c.from, s.season); c.to = Math.max(c.to, s.season); });   return Object.values(by).sort((a, b) => a.from - b.from); } function legCard(L) {   const clubs = legClubsOf(L), cl = (L.clubLegend || []).filter(id => G.teams[id]);   const rib = L.game ? 'MM LEGEND' : 'CLUB LEGEND';   const plaque = L.game && cl.length ? 'Also a legend of ' + esc(G.teams[cl[0]].s) : cl.length ? esc(legClubName(cl[0])) + ' legend' : 'Hall of legends';   return `<button class="lgCard" data-lg="${esc(String(L.pid))}"><div class="lgIn">     <div class="lgRib"><b>${rib}</b><span><i class="lgDot ${L.retired ? 'off' : ''}"></i>${L.retired ? 'RETIRED' : 'ACTIVE'}</span></div>     <div class="lgPic">${faceSVG(L, 84, '#e8a812')}</div>     <p class="lgName">${esc(L.name)}</p><div class="lgSub">${flagSVG(L.nat)} ${esc(L.pos)} · ${legYears(L)}</div>     <div class="lgCrests">${clubs.slice(0, 4).map(c => legCrest(c.id, 20)).join('')}</div>     <div class="lgStats"><div><b>${L.apps}</b><small>APPS</small></div><div><b>${L.goals}</b><small>GOALS</small></div><div><b>${(L.awards || []).length}</b><small>AWARDS</small></div></div>     <div class="lgPlaq">${plaque}</div></div></button>`; } function legMile(L) {   const m = {}; let a = 0, g = 0; const marks = [['Debut', 'a', 1], ['100 appearances', 'a', 100], ['250 appearances', 'a', 250], ['500 appearances', 'a', 500], ['100 goals', 'g', 100], ['200 goals', 'g', 200]];   L.seasons.forEach(s => { const pa = a, pg = g; a += s.apps; g += s.g;     marks.forEach(([t, k, n]) => { if (k === 'a' && pa < n && a >= n) (m[s.season] = m[s.season] || []).push(t); if (k === 'g' && pg < n && g >= n) (m[s.season] = m[s.season] || []).push(t); }); });   return m; } function legProfile(L) {   const clubs = legClubsOf(L), cl = (L.clubLegend || []).filter(id => G.teams[id]), mile = legMile(L), maxA = Math.max(46, ...L.seasons.map(s => s.apps));   const aw = {}; (L.awards || []).forEach(a => { (aw[a.season] = aw[a.season] || []).push(a); });   const ho = {}; (L.honours || []).forEach(h => { (ho[h.season] = ho[h.season] || []).push(h); });   const tags = [L.game ? '<span>MM LEGEND</span>' : ''].concat(cl.map(id => `<span>LEGEND OF ${esc(G.teams[id].s.toUpperCase())}</span>`)).join('');   const rows = L.seasons.map(s => { const ms = mile[s.season] || [], tm = G.teams[s.club];     return `<div class="lgRow ${ms.length ? 'mile' : ''}"><div class="yr">${seasonLabel(s.season)}</div>       <div><div class="tm">${legCrest(s.club, 20)}<span>${esc(tm ? tm.s : 'Club')}</span> <span class="hint">· ${s.apps} apps · ${s.g} goals · ${s.a} assists</span></div>       <div class="lgBars"><i style="width:${Math.round(100 * s.apps / maxA)}%"></i></div>       ${ms.map(x => `<span class="lgChip m">★ ${x}</span>`).join('')}${(aw[s.season] || []).map(a => `<span class="lgChip">${LEG_AWARD[a.kind][1]} ${esc(a.label)}</span>`).join('')}${(ho[s.season] || []).map(h => `<span class="lgChip">🏆 ${esc(trophyKind(h.name).label)}</span>`).join('')}</div>       <div class="rt hint">${s.rating ? 'Rated ' + s.rating : ''}</div></div>`; }).join('');   const awardGroups = {}; (L.awards || []).forEach(a => { (awardGroups[a.kind] = awardGroups[a.kind] || []).push(a); });   const awardShelf = Object.keys(awardGroups).map(k => `<div class="lgPl"><div class="ic">${LEG_AWARD[k][1]}</div><div class="lgPlaq">${LEG_AWARD[k][0]}${awardGroups[k].length > 1 ? ' ×' + awardGroups[k].length : ''}<small>${awardGroups[k].map(a => seasonLabel(a.season)).join(', ')}</small></div></div>`).join('');   const hon = {}; (L.honours || []).forEach(h => { hon[h.name] = (hon[h.name] || 0) + 1; });   const honShelf = Object.keys(hon).map(n => `<div class="lgPl"><div class="ic">🏆</div><div class="lgPlaq">${esc(trophyKind(n).label)}${hon[n] > 1 ? ' ×' + hon[n] : ''}</div></div>`).join('');   return `<button class="lgBack" id="lgBack">‹ All legends</button><div class="lgHall">     <div class="lgHero"><div class="lgPic">${faceSVG(L, 120, '#e8a812')}</div><div><div class="lgStars">★ ★ ★</div><h1>${esc(L.name)}</h1>       <div class="lgSub" style="text-align:left">${flagSVG(L.nat)} ${esc(natName(L.nat))} · ${esc(L.pos)} · ${legYears(L)} · <i class="lgDot ${L.retired ? 'off' : ''}"></i>${L.retired ? 'Retired ' + seasonLabel(L.retired) : 'Still playing'}</div><div class="lgTags">${tags}</div></div></div>     <div class="lgBig"><div><b>${L.apps}</b><small>APPEARANCES</small></div><div><b>${L.goals}</b><small>GOALS</small></div><div><b>${L.assists || 0}</b><small>ASSISTS</small></div><div><b>${L.seasons.length}</b><small>SEASONS</small></div><div><b>${(L.awards || []).length}</b><small>AWARDS</small></div><div><b>${(L.honours || []).length}</b><small>HONOURS</small></div><div><b>${L.peak || '–'}</b><small>PEAK RATING</small></div></div>     <div class="lgSec">CLUBS</div><div class="lgClubs">${clubs.map(c => `<div>${legCrest(c.id, 34)}<span><b>${esc(legClubName(c.id))}</b>${(L.clubLegend || []).indexOf(c.id) >= 0 ? ' <span class="lgChip m">LEGEND</span>' : ''}<small>${c.from === c.to ? c.from : c.from + '–' + c.to} · ${c.apps} apps · ${c.g} goals</small></span></div>`).join('')}</div>     ${awardShelf ? `<div class="lgSec">INDIVIDUAL AWARDS</div><div class="lgShelf">${awardShelf}</div>` : ''}     ${honShelf ? `<div class="lgSec">HONOURS WITH HIS CLUBS</div><div class="lgShelf">${honShelf}</div>` : ''}     <div class="lgSec">CAREER JOURNEY</div><div class="lgTl">${rows}</div></div>`; } let lgLimit = 24, lgSig = ''; function viewLegends() {   const v = $('#v-legends'); v.classList.add('mmx', 'sqv'); legCss();   G.legends = G.legends || []; seedLegends(G);   const t = me(); try { updateLegendsLive(G); } catch (e) { }   const bind = () => {     v.querySelectorAll('[data-lg]').forEach(b => b.onclick = () => { legSel = b.dataset.lg; viewLegends(); window.scrollTo({ top: 0 }); });     const bk = $('#lgBack'); if (bk) bk.onclick = () => { legSel = null; viewLegends(); };   };   const sel = legSel != null ? G.legends.find(x => String(x.pid) === String(legSel)) : null;   if (sel) { v.innerHTML = legProfile(sel); bind(); return; }   const L = G.legends, game = L.filter(x => x.game).length, clubN = L.filter(x => !x.game).length, act = L.filter(x => !x.retired).length;   const topA = L.slice().sort((a, b) => b.apps - a.apps)[0], topG = L.slice().sort((a, b) => b.goals - a.goals)[0];   let list = L.filter(x => legFilter === 'all' || (legFilter === 'game' && x.game) || (legFilter === 'club' && (x.clubLegend || []).length) || (legFilter === 'mine' && ((x.clubLegend || []).indexOf(G.myTeam) >= 0 || x.club === G.myTeam)) || (legFilter === 'active' && !x.retired) || (legFilter === 'retired' && x.retired));   const q = legQ.toLowerCase(); if (q) list = list.filter(x => x.name.toLowerCase().includes(q) || (x.clubLegend || []).some(id => legClubName(id).toLowerCase().includes(q)));   const key = { apps: x => -x.apps, goals: x => -x.goals, awards: x => -(x.awards || []).length * 1000 - x.apps, era: x => -Math.max.apply(null, x.seasons.map(s => s.season)) }[legSort];   list = list.slice().sort((a, b) => key(a) - key(b));   const lsig = legFilter + '|' + legSort + '|' + legQ; if (lsig !== lgSig) { lgSig = lsig; lgLimit = 24; }   const chip = (k, l) => `<button class="chip" data-lf="${k}" aria-pressed="${legFilter === k}">${l}</button>`;   v.innerHTML = `<div class="mb-tabs sqtabs"><button class="on">MM Legends</button><span class="sp"></span><button class="mini" id="lgTroph">Trophy room</button></div>` +     sqTiles([['Legends', L.length], ['MM Legends', game], ['Club legends', clubN], ['Still playing', act], ['Most apps', topA ? esc(topA.name.split(' ').slice(-1)[0]) + ' ' + topA.apps : '—'], ['Most goals', topG ? esc(topG.name.split(' ').slice(-1)[0]) + ' ' + topG.goals : '—']]) +     `<div class="lgHall"><div class="lgBanner"><div class="lgStars">★ ★ ★ ★ ★</div><h2>MM LEGENDS</h2><p>500 appearances or 200 goals earns the title · 400 appearances or 120 goals at one club makes a club legend</p></div>       <div class="chipbar" style="padding:0 0 10px;justify-content:center">${chip('all', 'All')}${chip('game', 'MM Legends')}${chip('club', 'Club legends')}${chip('mine', esc(t.s))}${chip('active', 'Still playing')}${chip('retired', 'Retired')}</div>       <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:14px"><select id="lgSort">${[['apps', 'Most appearances'], ['goals', 'Most goals'], ['awards', 'Most awards'], ['era', 'Most recent']].map(([k, l]) => `<option value="${k}" ${legSort === k ? 'selected' : ''}>${l}</option>`).join('')}</select><input type="search" id="lgQ" placeholder="Search a legend or club" value="${esc(legQ)}" style="min-width:200px"></div>       ${list.length ? `<div class="lgGrid">${list.slice(0, lgLimit).map(legCard).join('')}</div>${list.length > lgLimit ? `<div style="text-align:center;padding:12px"><button class="btn ghost sm" id="lgMore">Show 24 more (${list.length - lgLimit} left)</button></div>` : ''}` : '<div class="empty">No legends match.</div>'}</div>`;   v.querySelectorAll('[data-lf]').forEach(b => b.onclick = () => { legFilter = b.dataset.lf; viewLegends(); });   $('#lgSort').onchange = e => { legSort = e.target.value; viewLegends(); };   const qi = $('#lgQ'); qi.oninput = () => { const pos = qi.selectionStart; legQ = qi.value; viewLegends(); const n = $('#lgQ'); n.focus(); n.setSelectionRange(pos, pos); };   const lm = $('#lgMore'); if (lm) lm.onclick = () => { lgLimit += 24; viewLegends(); };   const tr = $('#lgTroph'); if (tr) tr.onclick = () => goTo('trophies');   bind(); } function prizeKey(label) {   if (/bonus/.test(label)) return 'League match bonuses';   if (/finishing/.test(label)) return 'League position prize';   return label; } let pbScope = 'season'; function prizeBreakdownPanel(t) {   const by = Object.assign({}, t.fin.by || {});   let earned = t.fin.prize;   if (pbScope === 'all') (t.finHistory || []).forEach(f => { earned += f.prize; Object.entries(f.by || {}).forEach(([k, a]) => { by[k] = (by[k] || 0) + a; }); });   const ent = Object.entries(by).filter(e => e[1] > 0), groups = {};   ent.forEach(([k, a]) => {     let comp = k, part = '';     const m = k.match(/^(.*) (round|runners-up|winners) prize$/);     if (m) { comp = m[1]; part = m[2] === 'round' ? 'rounds won' : m[2] === 'runners-up' ? 'runners-up' : 'winners'; }     const g = groups[comp] || (groups[comp] = { total: 0, parts: [] });     g.total += a; if (part) g.parts.push(part + ' ' + money(a));   });   const total = ent.reduce((x, e) => x + e[1], 0);   const rows = Object.entries(groups).sort((a, b) => b[1].total - a[1].total).map(([c, g]) =>     `<div class="cf-row"><div class="l"><span>${esc(c)}${g.parts.length > 1 ? ` <small class="hint">${esc(g.parts.join(' · '))}</small>` : ''}</span><b>${money(g.total)}</b></div>       <div class="bar g"><i style="width:${total > 0 ? Math.min(100, g.total / total * 100) : 0}%"></i></div></div>`).join('');   const chip = (k, l) => `<button class="chip" aria-pressed="${pbScope === k}" onclick="pbScope='${k}';viewClub()">${l}</button>`;   const unseen = earned - total;   return `<div class="panel"><h3>Prize money by competition<span class="sub">${money(total)} itemised</span></h3>     <div class="chipbar" style="padding:0 13px 6px">${chip('season', 'This season')}${chip('all', 'All seasons')}</div><div class="pad">     ${rows || '<p class="hint" style="margin:0">No prize money recorded yet. Win matches and go deep in the cups to earn some.</p>'}     ${unseen > 0.005 ? `<p class="hint" style="margin:8px 0 0">${money(unseen)} was earned before this breakdown existed and isn't itemised.</p>` : ''}</div></div>`; }
function finNet(f) { return (f.prize + f.sponsor + f.gate + f.sales) - (f.buys + f.wages + (f.fines || 0)); } function payPrize(G, id, amt, label) {   const t = G.teams[id]; if (!t || !(amt > 0)) return;   t.budget += amt; t.fin.prize += amt; t.fin.by = t.fin.by || {}; if (label) { const k = prizeKey(label); t.fin.by[k] = (t.fin.by[k] || 0) + amt; }   if (label && id === G.myTeam) {     if (PRIZE_BATCH) { PRIZE_BATCH.total += amt; PRIZE_BATCH.n++; PRIZE_BATCH.last = label; PRIZE_BATCH.lastAmt = amt; }     else if (typeof toastGood === 'function') toastGood('+' + money(amt) + ' ' + label);   } }
let PRIZE_BATCH = null; function withPrizeSummary(fn) {   if (PRIZE_BATCH) return fn();   PRIZE_BATCH = { total: 0, n: 0, last: '', lastAmt: 0 };   let res;   try { res = fn(); } finally {     const b = PRIZE_BATCH; PRIZE_BATCH = null;     if (b.n === 1) toastGood('+' + money(b.lastAmt) + ' ' + b.last);     else if (b.n > 1) toastGood('+' + money(b.total) + ' in bonuses and prize money (' + b.n + ' payments)');   }   return res; } function wageOf(t) { return Math.round(t.squad.reduce((s, p) => s + p.wage, 0) * 100) / 100; } function reallocateBudget(G, amount) {   const t = G.teams[G.myTeam];   amount = Math.round(amount * 1000) / 1000;   if (amount === 0) return { ok: false, msg: 'Move the slider first.' };   if (amount > 0) {     if (amount > t.budget + 1e-9) return { ok: false, msg: `Only ${money(t.budget)} is available in the transfer budget.` };     t.budget = Math.round((t.budget - amount) * 100) / 100;     t.wageBudget = Math.round((t.wageBudget + amount) * 100) / 100;     return { ok: true, msg: `Moved ${money(amount)} from the transfer budget into the wage budget.` };   }   const move = -amount, spare = t.wageBudget - t.wageBill;   if (move > spare + 1e-9) return { ok: false, msg: `Only ${money(Math.max(0, spare))} of the wage budget is uncommitted.` };   t.wageBudget = Math.round((t.wageBudget - move) * 100) / 100;   t.budget = Math.round((t.budget + move) * 100) / 100;   return { ok: true, msg: `Moved ${money(move)} from the wage budget into the transfer budget.` }; }

/* ---------------- lineups ---------------- */
/* Which extra positions a player of each main position can learn */
const ALT_POS = {
  CB:['LB','RB','CDM'], LB:['LWB','LM','CB'], RB:['RWB','RM','CB'],
  LWB:['LB','LM'], RWB:['RB','RM'], CDM:['CM','CB'], CM:['CDM','CAM'],
  CAM:['CM','CF','LW','RW'], LM:['LW','LWB'], RM:['RW','RWB'],
  LW:['LM','RW'], RW:['RM','LW'], ST:['CF'], CF:['ST','CAM'], GK:[]
};
function rollAlt(pos) {
  const o = ALT_POS[pos] || [];
  if (!o.length || rnd() > 0.35) return [];          // 35% of players are versatile
  const a = [pick(o)];
  if (rnd() < 0.2) { const b = o.filter(x => x !== a[0]); if (b.length) a.push(pick(b)); }
  return a;
}
/* Penalty between two positions (closer positions lose less) */
const POS_NEAR = {
  'LWB-LB':2,'RWB-RB':2,'LWB-LM':3,'RWB-RM':3,'LB-LM':4,'RB-RM':4,'LM-LW':2,'RM-RW':2,
  'LW-ST':3,'RW-ST':3,'LW-CF':3,'RW-CF':3,'LW-RW':5,'LM-RM':5,'LB-RB':5,'LWB-RWB':5,
  'CAM-CF':2,'CAM-CM':2,'CAM-ST':4,'CAM-LW':4,'CAM-RW':4,'CAM-CDM':5,'CM-CDM':2,
  'CDM-CB':4,'ST-CF':2,'CB-LB':5,'CB-RB':5,'LWB-LW':5,'RWB-RW':5
};
function basePen(a, b) {
  if (a === b) return 0;
  const n = POS_NEAR[a + '-' + b] ?? POS_NEAR[b + '-' + a];
  if (n != null) return n;
  const ga = POS_GROUP[a], gb = POS_GROUP[b];
  if (ga === 'GK' || gb === 'GK') return 22;
  if (ga === gb) return 5;
  return Math.abs(GROUP_ORDER.indexOf(ga) - GROUP_ORDER.indexOf(gb)) === 1 ? 8 : 14;
}
/* pl can be a player object (uses main + alternate positions) or a position string */
function posPenalty(pl, slot) {
  const nat = typeof pl === 'string' ? pl : pl.pos;
  const alts = typeof pl === 'string' ? [] : (pl.alt || []);
  if (nat === slot || alts.includes(slot)) return 0;
  let best = basePen(nat, slot);
  alts.forEach(a => { best = Math.min(best, basePen(a, slot) + 1); });
  return best;
}
function penTag(p, slot) {
  const n = Math.round(posPenalty(p, slot));
  return n > 0 ? `<em class="pen">-${n}</em>` : '';
}
/* ---- stamina ---- */ const STA_DRAIN = 18, STA_REC = 12, STA_REST = 8, STA_TIRED = 60; function staOf(p) { return p.sta == null ? 100 : p.sta; } function staPen(p) { const s = staOf(p); return s >= STA_TIRED ? 0 : (STA_TIRED - s) * 0.08; } function staColor(s) { return s >= 75 ? '#4caf50' : s >= STA_TIRED ? '#f2b928' : '#e5322d'; } function staTag(p) { const s = Math.round(staOf(p)); if (s >= 90) return ''; const c = staColor(s); return ` <span class="tag" style="color:${c};border-color:${c}" title="Stamina ${s}%">${s < STA_TIRED ? 'tired' : 'stamina'} ${s}%</span>`; } function staDot(p) { return ''; } function staDotOld(p) { const s = staOf(p); return s >= STA_TIRED ? '' : `<span title="Tired ${Math.round(s)}%" style="position:absolute;top:-3px;left:-3px;width:10px;height:10px;border-radius:50%;background:#e5322d;border:1px solid #111"></span>`; } function effRating(p, slot) { return clamp(p.rating - posPenalty(p, slot) - staPen(p) + p.form * 0.8 + (p.mood == null ? 0 : (p.mood - 58) / 42 * 1.2), 20, 99); }

function pickForSlot(t, slot, used) {   let pool = t.squad.filter(p => isFit(p, t) && !p.reserve && !used.has(p.id));   if (!pool.length) pool = t.squad.filter(p => isFit(p, t) && !used.has(p.id));   if (!pool.length) pool = t.squad.filter(p => !used.has(p.id));   let minPen = Infinity; pool.forEach(p => { minPen = Math.min(minPen, posPenalty(p, slot)); });   let best = null, bv = -1e9;   pool.forEach(p => { if (posPenalty(p, slot) > minPen + 0.001) return; const v = effRating(p, slot); if (v > bv) { bv = v; best = p; } });   return best; } function ensureLineup(t) {
  const slots = FORMATIONS[t.formation] || FORMATIONS['4-4-2'];
  const lineOk = t.lineup && t.lineup.length === 11 && new Set(t.lineup).size === 11 &&
    t.lineup.every(id => t.squad.some(x => x.id === id));
  if (!lineOk) {     if (!t.lineup || t.lineup.length !== 11) { t.lineup = autoLineup(t); t.subFor = {}; return t.lineup; }     /* someone left (sold, loaned, released): everyone else stays put, only the empty slots are filled, position first */     const seen = new Set();     t.lineup = t.lineup.map(id => (id != null && t.squad.some(x => x.id === id) && !seen.has(id)) ? (seen.add(id), id) : null);     t.subFor = t.subFor || {};     t.lineup.forEach((id, i) => { if (id !== null) return; delete t.subFor[i]; const b = pickForSlot(t, slots[i], seen); if (b) { t.lineup[i] = b.id; seen.add(b.id); } });     if (t.lineup.some(id => id === null)) { t.lineup = autoLineup(t); t.subFor = {}; return t.lineup; }   }
  t.subFor = t.subFor || {};
  const fit = p => p && isFit(p, t);
  /* 1. a recovered player takes his slot back from the stand-in */
  Object.keys(t.subFor).forEach(i => {
    const rec = t.subFor[i], cur = t.lineup[i];
    const orig = t.squad.find(x => x.id === rec.orig);
    if (cur !== rec.sub || !orig) { delete t.subFor[i]; return; }   /* you changed that slot yourself */
    if (fit(orig) && !t.lineup.includes(orig.id)) { t.lineup[i] = orig.id; delete t.subFor[i]; }
  });
  /* 2. replace ONLY injured players, one slot each, position first */
  t.lineup.forEach((id, i) => {
    if (fit(t.squad.find(x => x.id === id))) return;
    const slot = slots[i];
    let pool = t.squad.filter(p => fit(p) && !p.reserve && !t.lineup.includes(p.id));
    if (!pool.length) pool = t.squad.filter(p => fit(p) && !t.lineup.includes(p.id));
    let best = null, bv = -1e9;
    pool.forEach(p => { const v = effRating(p, slot) - posPenalty(p, slot) * 40; if (v > bv) { bv = v; best = p; } });
    if (best) {
      const prev = t.subFor[i] ? t.subFor[i].orig : id;   /* remember the original starter */
      t.lineup[i] = best.id;
      t.subFor[i] = { orig: prev, sub: best.id };
    }
  });
  return t.lineup;
}
function autoLineup(t) {
  const slots = FORMATIONS[t.formation] || FORMATIONS['4-4-2'];
  const fit = t.squad.filter(p => isFit(p, t) && !p.reserve);
  const avail = fit.length >= 11 ? fit : t.squad.filter(p => isFit(p, t));
  const pool = (avail.length >= 11 ? avail : t.squad).slice();
  const used = new Set(), out = [];
  slots.forEach(slot => {
    let best = null, bv = -1;
    pool.forEach(p => {
      if (used.has(p.id)) return;
      const v = effRating(p, slot);
      if (v > bv) { bv = v; best = p; }
    });
    if (best) { used.add(best.id); out.push(best.id); }
  });
  return out;
}
function lineupOf(t) {
  ensureLineup(t);
  return t.lineup.map(id => t.squad.find(p => p.id === id)).filter(Boolean);
}
function benchOf(t) {
  const set = new Set(t.lineup || []);
  return t.squad.filter(p => !set.has(p.id) && isFit(p, t));
}
function firstTeamOf(t) { return t.squad.filter(p => !p.reserve); } const FIRST_TEAM_MAX = 32; function firstTeamFull(t) { return firstTeamOf(t).length >= FIRST_TEAM_MAX; }
function reservesOf(t) { return t.squad.filter(p => p.reserve); }
function moveToReserve(G, pid) {
  const t = me_(G);
  const p = t.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (t.captainId === pid || t.viceCaptainId === pid) return { ok: false, msg: `${p.name} is captain or vice-captain — change that first.` };
  p.reserve = true;
  if ((t.lineup || []).includes(pid)) { t.lineup = t.lineup.map(id => id === pid ? null : id); ensureLineup(t); }
  return { ok: true, msg: `${p.name} moves to the reserves.` };
}
function moveToFirstTeam(G, pid) {   if (firstTeamFull(me_(G))) return { ok: false, msg: `First team is full at ${FIRST_TEAM_MAX}. Move someone to the reserves first.` };
  const t = me_(G);
  const p = t.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  p.reserve = false;
  return { ok: true, msg: `${p.name} joins the first team.` };
}
function setCaptain(G, pid) {
  const t = me_(G);
  const p = t.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (t.viceCaptainId === pid) t.viceCaptainId = null;
  t.captainId = pid; p.reserve = false;
  return { ok: true, msg: `${p.name} is club captain.` };
}
function setViceCaptain(G, pid) {
  const t = me_(G);
  const p = t.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (t.captainId === pid) t.captainId = null;
  t.viceCaptainId = pid; p.reserve = false;
  return { ok: true, msg: `${p.name} is vice-captain.` };
}
function me_(G) { return G.teams[G.myTeam]; }
function teamStrength(t) {
  const slots = FORMATIONS[t.formation] || FORMATIONS['4-4-2'];
  const xi = lineupOf(t);
  let att = 0, aw = 0, def = 0, dw = 0, ovr = 0;
  xi.forEach((p, i) => {
    const slot = slots[i] || p.pos;
    const e = effRating(p, slot);
    ovr += e;
    att += e * POS_ATT[slot]; aw += POS_ATT[slot];
    def += e * POS_DEF[slot]; dw += POS_DEF[slot];
  });
  const n = xi.length || 1;
  return { ovr: ovr / n, att: att / (aw || 1), def: def / (dw || 1), xi, slots };
}
function teamOverall(t) { return Math.round(teamStrength(t).ovr); }
function squadAverage(t) {
  const best = t.squad.slice().sort((a, b) => b.rating - a.rating).slice(0, 18);
  return Math.round(best.reduce((s, p) => s + p.rating, 0) / (best.length || 1));
}

/* ---------------- fixtures ---------------- */
function roundRobin(ids) {
  const n = ids.length, half = n / 2; let arr = ids.slice(); const rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const rd = [];
    for (let i = 0; i < half; i++) {
      const h = arr[i], a = arr[n - 1 - i];
      rd.push(r % 2 === 0 ? { h, a } : { h: a, a: h });
    }
    rounds.push(rd);
    arr = [arr[0], arr[n - 1], ...arr.slice(1, n - 1)];
  }
  return rounds.concat(rounds.map(rd => rd.map(m => ({ h: m.a, a: m.h }))));
}
function blankRow(id) { return { id, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }; }

function buildSeason(G, first) {
  G.round = 0; G.curDay = 0; G.fixtures = []; G.tables = []; G.finished = false;
  for (let tier = 0; tier < TIER_NAMES.length; tier++) {
    const ids = shuffle(G.teams.filter(t => t.tier === tier).map(t => t.id));
    G.fixtures.push(roundRobin(ids).map(rd => rd.map(m => ({ ...m, hg: 0, ag: 0, played: false, ev: [] }))));
    G.tables.push(ids.map(blankRow));
  }
  G.teams.forEach(t => {
    t.form = [];
    t.fin = newFin();
    t.squad.forEach(p => { p.goals = 0; p.assists = 0; p.apps = 0; p.sApps = 0; p.cs = 0; p.inj = 0; p.sta = 100; p.form = 0; p.yellow = 0; p.red = 0; p.red = 0; p.red = 0; p.startRating = p.rating; p.startPot = p.pot; p.ratingSum = 0; p.ratingApps = 0; p.monthRatings = {}; });
    ensureLineup(t);
  });
  if (G.africa) G.africa.squadCache = {};
  buildCup(G);
  buildExtraCups(G);
  buildCAF(G);
  buildConfed(G);
  buildMarket(G);
  if (!first) { devCentreSeason(G); generateYouth(G); }
  if (!G.africa.afcon || G.africa.afcon.phase === 'done') initAfcon(G);
}
function totalRounds(G) { return G.fixtures[0].length; }

/* ---------------- cup ---------------- */
/* Round names sized for however many preliminary rounds N clubs need. */
function cupRoundNames(n) {
  let target = 1; while (target * 2 <= n) target *= 2;
  const named = { 2: 'Final', 4: 'Semi-final', 8: 'Quarter-final', 16: 'Round of 16', 32: 'Round of 32', 64: 'Round of 64', 128: 'Round of 128' };
  const out = [];
  if (target < n) out.push('Preliminary round');
  let teams = target;
  while (teams >= 2) { out.push(named[teams] || `Round of ${teams}`); teams = teams / 2; }
  return out;
}
const CUP_ROUNDS = cupRoundNames(80);
/* ---------------- transfer windows ----------------
   Summer window (Jul 1 – Aug 31) covers the first few matchdays of the season;
   the January window opens again around the season's midpoint. */
const WINDOW_SUMMER = [0, 1, 2, 3];
const WINDOW_JAN = [18, 19, 20];
const SEASON_MONTH_START = 6; /* July, 0-indexed */
function roundToMonth(round, season) {
  const monthsIn = Math.floor(round / 3);
  const m = (SEASON_MONTH_START + monthsIn) % 12;
  const y = season + Math.floor((SEASON_MONTH_START + monthsIn) / 12);
  return { m, y };
}
const DAYS_PER_ROUND = 10; /* real days between matchdays — keeps the grid in step with roundToMonth's 3-rounds-per-month pacing */
function seasonStartUTC(season) { return Date.UTC(season, SEASON_MONTH_START, 1, 12); }
function dateForRound(round, season) {
  return new Date(seasonStartUTC(season) + round * DAYS_PER_ROUND * 86400000).toISOString().slice(0, 10);
}
const DOW_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function currentDateISO() { return new Date(seasonStartUTC(G.season) + (G.curDay || 0) * 86400000).toISOString().slice(0, 10); }
function isMatchdayToday() { return !G.finished && currentDateISO() === dateForRound(G.round, G.season); }
function cupDayIdx(G) { const c = G.cup; if (!c || c.done || c.stage >= CUP_AT.length) return null; const d = new Date(dateForRound(CUP_AT[c.stage] - 1, G.season) + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 3); return Math.round((d.getTime() - seasonStartUTC(G.season)) / 86400000); } function isDomCupDayToday() { if (G.finished || !cupDueNow(G)) return false; const i = cupDayIdx(G); return i != null && (G.curDay || 0) >= i; } function isCupDayToday() { return isDomCupDayToday() || isContDayToday(); } /* ---- transfer desk: clubs can also come in between matchdays while a window is open ---- */
function dailyTransferDesk() {
  if (G.finished || G.jobless || !inTransferWindow(G) || (G.curDay || 0) % 3) return;
  const have = new Set((G.pendingBids || []).map(b => b.pid + ':' + b.from));
  const bids = generateBids(G, 0.2).filter(b => !have.has(b.pid + ':' + b.from)).slice(0, 2);
  if (!bids.length) return;
  bids.forEach(b => {
    const pl = me().squad.find(x => x.id === b.pid), buyer = G.teams[b.from]; if (!pl || !buyer) return;
    mail(G, { cat: 'offer', from: buyer.n, p: pl, club: me(), status: 'Offer received', flag: true, subject: `Transfer Offer: ${b.name}`,
      body: [`${buyer.n} have bid ${money(b.fee)} for ${b.name}.`, `His estimated value is ${money(pl.value)}. Respond to the offer when it appears, or turn it down.`],
      rows: [['Bidder', buyer.n], ['Offer', money(b.fee)], ['Estimated value', money(pl.value)], ['Contract', `${pl.contract} year${pl.contract === 1 ? '' : 's'} left`]] });
  });
  G.pendingBids = (G.pendingBids || []).concat(bids).slice(-15);
  setTimeout(bidPing, 1200);
  try { const un = unreadCount(G), fresh = un - (G.lastUnread || 0); if (fresh > 0) toast(`✉ ${fresh} new message${fresh === 1 ? '' : 's'} in your inbox`); G.lastUnread = un; } catch (e) { }
} function advanceOneDay() { if (G.finished) return;  G.curDay = (G.curDay || 0) + 1; try { dailyTransferDesk(); } catch (e) { console.error('desk', e); } saveSoon(); }
function windowRangeFor(iso) {
  const d = new Date(iso + 'T00:00:00Z'), y = d.getUTCFullYear(), m = d.getUTCMonth();
  if (m === 6 || m === 7) return [Date.UTC(y, 6, 1), Date.UTC(y, 8, 1) - 1];
  if (m === 0) return [Date.UTC(y, 0, 1), Date.UTC(y, 1, 1) - 1];
  return null;
}
function inTransferWindow(G) { return windowRangeFor(currentDateISO()) != null; }
function currentWindowName(G) { return new Date(currentDateISO()).getUTCMonth() === 0 ? 'January window' : 'Summer window'; }
function windowCloses(G) {
  const today = currentDateISO(), r = windowRangeFor(today);
  if (!r) return 0;
  return Math.max(1, Math.floor((r[1] - new Date(today + 'T00:00:00Z').getTime()) / 86400000) + 1);
}
function roundsToNextWindow(G) {
  const today = currentDateISO(), d = new Date(today + 'T00:00:00Z'), y = d.getUTCFullYear(), m = d.getUTCMonth();
  const next = m < 6 ? Date.UTC(y, 6, 1) : Date.UTC(y + 1, 0, 1);
  return Math.max(1, Math.round((next - d.getTime()) / 86400000));
}

const CUP_AT = [3, 6, 10, 14, 18, 22, 26];
function buildCup(G) {
  const all = shuffle(G.teams.map(t => t.id));
  G.cup = { stage: 0, alive: all, byes: [], ties: [], done: false, winner: null, log: [] };
}
function cupPairStage(G) {
  const c = G.cup;
  let ids = c.alive.slice();
  let byes = [];
  if (c.stage === 0) {
    /* size the preliminary round so exactly the largest power-of-two number of
       clubs remain afterwards; the weakest clubs (by reputation) play it. */
    const n = ids.length;
    let target = 1; while (target * 2 <= n) target *= 2;
    const playingCount = 2 * (n - target);
    if (playingCount > 0) {
      const ranked = ids.slice().sort((a, b) => G.teams[a].rep - G.teams[b].rep);
      const playing = ranked.slice(0, playingCount);
      byes = ranked.slice(playingCount);
      ids = shuffle(playing);
    }
  }
  const pairs = [];
  for (let i = 0; i < ids.length; i += 2) {
    const h = ids[i], a = ids[i + 1];
    if (a == null) { byes.push(h); continue; }
    pairs.push({ h, a });
  }
  c.pendingTies = pairs;
  c.pendingByes = byes;
}
function cupResolveTie(G, h, a, stage) {
  const ctx = createMatch(G, h, a, true);
  runPeriod(G, ctx, 1, 45); simSubs(G, ctx); runPeriod(G, ctx, 46, 90);
  let pens = null, winner;
  if (ctx.hg === ctx.ag) {
    let ph = 0, pa = 0;
    do { ph += rnd() < 0.76 ? 1 : 0; pa += rnd() < 0.74 ? 1 : 0; } while (ph === pa);
    pens = [ph + 3, pa + 3];
    winner = ph > pa ? h : a;
  } else winner = ctx.hg > ctx.ag ? h : a;
  finishMatch(G, ctx);
  return { h, a, hg: ctx.hg, ag: ctx.ag, pens, winner, stage, ev: ctx.ev, forfeit: ctx.forfeit || null, fine: ctx.fine || 0 };
}
function runPromotionPlayoff(G, contenders) {   /* contenders = 4 team ids in table order: 3rd, 4th, 5th, 6th place.      Semi-finals: 3rd hosts 6th, 4th hosts 5th. The better-placed semi      winner hosts the final. Winner takes the league's last promotion spot. */   const [a, b, c, d] = contenders;   const rankOf = id => contenders.indexOf(id);   const semi1 = cupResolveTie(G, a, d, 'promo-semi');   const semi2 = cupResolveTie(G, b, c, 'promo-semi');   let fh = semi1.winner, fa = semi2.winner;   if (rankOf(fa) < rankOf(fh)) { const tmp = fh; fh = fa; fa = tmp; }   const final = cupResolveTie(G, fh, fa, 'promo-final');   return { semis: [semi1, semi2], final, winner: final.winner }; } function cupFinishStage(G, ties) {
  const c = G.cup;
  const byes = c.pendingByes || [];
  c.ties = ties;
  c.log.push({ stage: c.stage, ties: ties.map(t => ({ ...t })) });   ties.forEach(t => payPrize(G, t.winner, 0.03 * Math.pow(1.6, c.stage), `${CUP_NAME} round prize`));   if (ties.length === 1 && byes.length === 0) { const t0 = ties[0]; payPrize(G, t0.winner === t0.h ? t0.a : t0.h, 3, `${CUP_NAME} runners-up prize`); }
  c.alive = ties.map(t => t.winner).concat(byes);
  if (c.alive.length === 1) {
    c.done = true; c.winner = c.alive[0];
    const w = G.teams[c.winner];
    w.trophies.push({ season: G.season, name: CUP_NAME });
    payPrize(G, w.id, 8, `${CUP_NAME} winners prize`);
    news(G, 'cup', `${w.n} lift the ${CUP_NAME}.`);
  }
  c.stage++;
  c.pendingTies = null; c.pendingByes = null; c.mine = null; c.resolved = null;
}
function finishMyCupTie(G, result) {
  const c = G.cup;
  const ties = (c.resolved || []).concat([result]);
  const them = G.teams[result.h === G.myTeam ? result.a : result.h];
  const wonIt = result.winner === G.myTeam;
  const pensTxt = result.pens ? ` (${result.pens[0]}-${result.pens[1]} on penalties)` : '';
  news(G, 'cup', wonIt
    ? `You beat ${them.s} ${result.hg}-${result.ag}${pensTxt} in the ${CUP_NAME}.`
    : `You're out of the ${CUP_NAME}, beaten by ${them.s} ${result.hg}-${result.ag}${pensTxt}.`);
  cupFinishStage(G, ties);
}
function cupDueNow(G) {
  const c = G.cup;
  return !c.done && c.stage < CUP_AT.length && G.round >= CUP_AT[c.stage];
}
function bumpCurDayForCup(G) {
  const c = G.cup;
  if (c.done || c.stage >= CUP_AT.length) return;
  const r = CUP_AT[c.stage] - 1;
  const d = new Date(dateForRound(r, G.season) + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 3);
  const dayIdx = Math.round((d.getTime() - seasonStartUTC(G.season)) / 86400000);
  G.curDay = Math.max(G.curDay || 0, dayIdx) + 1;
}
function myCupTieThisRound(G) {
  const c = G.cup;
  if (c.done || c.stage >= CUP_AT.length || G.round + 1 < CUP_AT[c.stage]) return null;
  if (c.mine) return c.mine;
  if (!c.pendingTies) cupPairStage(G);
  return c.pendingTies.find(p => p.h === G.myTeam || p.a === G.myTeam) || null;
}
function playCupRound(G, skipMine) {
  const c = G.cup;
  if (c.done) return null;
  if (c.mine) { const r = cupResolveTie(G, c.mine.h, c.mine.a, c.stage); finishMyCupTie(G, r); return c.ties; }
  if (!c.pendingTies) cupPairStage(G);
  const others = [];
  let mine = null;
  c.pendingTies.forEach(p => {
    if (skipMine && (p.h === G.myTeam || p.a === G.myTeam)) { mine = p; return; }
    others.push(cupResolveTie(G, p.h, p.a, c.stage));
  });
  if (mine) { c.mine = mine; c.resolved = others; return null; }
  cupFinishStage(G, others);
  return others;
}

/* ---------------- match ---------------- */
function createMatchTeams(H, A, neutral) {
  const sh = teamStrength(H), sa = teamStrength(A);
  ensureSetPieces(H); ensureSetPieces(A);
  return {
    h: H.id, a: A.id, neutral: !!neutral, hg: 0, ag: 0, ev: [],
    sh, sa, subsH: 0, subsA: 0,
    xiH: sh.xi.slice(), xiA: sa.xi.slice(), startH: sh.xi.slice(), startA: sa.xi.slice(),
    slotsH: sh.slots.slice(), slotsA: sa.slots.slice(),
    luckH: gauss() * 2.2, luckA: gauss() * 2.2, minute: 0,     tacH: tacForMatch(G, H, sh, sa), tacA: tacForMatch(G, A, sa, sh),      roleH: H.id === G.myTeam ? tacRoleFx(H, sh.xi, sh.slots) : null, roleA: A.id === G.myTeam ? tacRoleFx(A, sa.xi, sa.slots) : null,     hmH: H.id === G.myTeam ? moodHarmFx(H) : 0, hmA: A.id === G.myTeam ? moodHarmFx(A) : 0,     markA: H.id === G.myTeam ? oppFocusTarget(H, A) : null, markH: A.id === G.myTeam ? oppFocusTarget(A, H) : null
  };
}
function createMatch(G, hId, aId, neutral) {
  aiCover(G, G.teams[hId]); aiCover(G, G.teams[aId]);   const ctx = createMatchTeams(G.teams[hId], G.teams[aId], neutral);
  const side = forfeitSide(G, G.teams[hId], G.teams[aId]);
  if (side) { ctx.forfeit = side; ctx.hg = side === 'h' ? 0 : 3; ctx.ag = side === 'a' ? 0 : 3; }
  return ctx;
}
/* a team down to ten (or fewer) plays worse, in attack and defence */ const RED_PEN = 4; function offIds(ctx) { return new Set(ctx.ev.filter(e => e.type === 'card' && e.card === 'red').map(e => e.scorer)); } function isFit(p, t) { return p.inj <= 0 && !(p.dty > 0) && !(t && p.banTid === t.id && p.banMP > (t.mp || 0)); } function banLeft(p, t) { return t && p.banTid === t.id ? Math.max(0, p.banMP - (t.mp || 0)) : 0; } function refreshStrength(G, ctx) {   const off = ctx._off || offIds(ctx);   const rate = (xi, slots) => {     let att = 0, aw = 0, def = 0, dw = 0, n = 0, gkOff = false;     xi.forEach((p, i) => {       const slot = slots[i] || p.pos;       if (off.has(p.id)) { n++; if (slot === 'GK') gkOff = true; return; }       const e = effRating(p, slot);       att += e * POS_ATT[slot]; aw += POS_ATT[slot];       def += e * POS_DEF[slot]; dw += POS_DEF[slot];     });     const pen = RED_PEN * n + (gkOff ? 6 : 0);     return { att: att / (aw || 1) - pen, def: def / (dw || 1) - pen };   };   const rh = rate(ctx.xiH, ctx.slotsH), ra = rate(ctx.xiA, ctx.slotsA);   ctx.sh.att = rh.att; ctx.sh.def = rh.def - (ctx.markA ? 1.2 : 0);   ctx.sa.att = ra.att; ctx.sa.def = ra.def - (ctx.markH ? 1.2 : 0); } /* every match counts towards a club's total; red cards (and five yellows) mean a ban */ function applyCardBans(G, ctx) {   [ctx.h, ctx.a].forEach(id => { const t = teamById(G, id); if (t) t.mp = (t.mp || 0) + 1; });   ctx.ev.forEach(e => {     if (e.type !== 'card') return;     const t = teamById(G, e.team); if (!t) return;     const p = t.squad.find(x => x.id === e.scorer); if (!p) return;     let n = 0, why = '';     if (e.card === 'red') { n = e.second ? 1 : rint(1, 3); why = e.second ? 'two bookings' : 'a straight red card'; }     else if ((p.yellow || 0) > 0 && p.yellow % 5 === 0) { n = 1; why = 'a fifth yellow card'; }     if (!n) return;     const left = banLeft(p, t);     p.banTid = t.id; p.banMP = (t.mp || 0) + left + n;     if (e.team === G.myTeam) {       const opp = teamById(G, e.team === ctx.h ? ctx.a : ctx.h);       mail(G, { cat: 'discipline', from: 'Assistant Manager', p, club: t, status: `Banned · ${n} match${n === 1 ? '' : 'es'}`, flag: true,         subject: `Suspended: ${p.name}`,         body: [`${p.name} ${e.card === 'red' ? 'was sent off' : 'picked up a booking'} against ${opp.n} (${e.min}').`,           `He is banned for ${n} match${n === 1 ? '' : 'es'} after ${why}.${left ? ' That adds to his existing ban.' : ''}`],         rows: [['Reason', why], ['Ban', `${n} match${n === 1 ? '' : 'es'}`], ['Yellow cards this season', p.yellow || 0], ['Red cards this season', p.red || 0]] });     }   }); } function refreshStrengthOld(G, ctx) {
  const rate = (xi, slots) => {
    let att = 0, aw = 0, def = 0, dw = 0;
    xi.forEach((p, i) => {
      const slot = slots[i] || p.pos, e = effRating(p, slot);
      att += e * POS_ATT[slot]; aw += POS_ATT[slot];
      def += e * POS_DEF[slot]; dw += POS_DEF[slot];
    });
    return { att: att / (aw || 1), def: def / (dw || 1) };
  };
  const rh = rate(ctx.xiH, ctx.slotsH), ra = rate(ctx.xiA, ctx.slotsA);
  ctx.sh.att = rh.att; ctx.sh.def = rh.def;
  ctx.sa.att = ra.att; ctx.sa.def = ra.def;
}
function poisson(lam) { const L = Math.exp(-lam); let k = 0, p = 1; do { k++; p *= rnd(); } while (p > L); return k - 1; }

/* ================= TACTICS: instructions, roles, setups, scouting ================= */ const TAC_DEFAULT = { ment: 'bal', press: 'mid', tempo: 'norm' }; const TAC_MENT = {   def: { l: 'Defensive', att: -3.2, def: 2.7, cards: 0.9, d: 'Fewer chances at both ends. Helps the underdog stay in the game.' },   bal: { l: 'Balanced', att: 0, def: 0, cards: 1, d: 'No shift in attack or defence.' },   atk: { l: 'Attacking', att: 2.7, def: -3.2, cards: 1.05, d: 'More goals at both ends. Pays off for the stronger side.' } }; const TAC_PRESS = {   low: { l: 'Low block', att: -1.3, def: 1.2, cards: 0.85, d: 'Sit deep and stay compact. Fewer cards.' },   mid: { l: 'Mid block', att: 0, def: 0, cards: 1, d: 'The standard shape.' },   high: { l: 'High press', att: 1.6, def: -0.6, cards: 1.3, d: 'Wins the ball high, best against weaker sides. The legs go after about 60 minutes and cards rise.' } }; const TAC_TEMPO = {   slow: { l: 'Slow', pace: 0.88, d: 'Fewer goals in the match. Pace is shared, so it only counts if the other side plays differently.' },   norm: { l: 'Normal', pace: 1, d: 'The standard pace.' },   fast: { l: 'Fast', pace: 1.12, d: 'More goals in the match. Pace is shared, so it only counts if the other side plays differently.' } }; const TAC_ROLE_GROUP = { RB: 'fb', LB: 'fb', RWB: 'fb', LWB: 'fb', CDM: 'mid', CM: 'mid', CAM: 'mid', RM: 'mid', LM: 'mid', ST: 'fwd', CF: 'fwd', RW: 'fwd', LW: 'fwd' }; const TAC_ROLES = {   overlap: { l: 'Overlap', g: 'fb', att: 0.6, def: -0.7, sc: 1.6, as: 1.5, d: 'Bombs forward: more attack, less cover. Scores and assists more.' },   hold: { l: 'Hold', g: 'fb', att: -0.7, def: 0.6, d: 'Stays home: more cover, less attack.' },   playmaker: { l: 'Playmaker', g: 'mid', att: 0.7, def: -0.8, as: 1.8, d: 'Dictates play: more attack, creates far more assists.' },   destroyer: { l: 'Destroyer', g: 'mid', att: -0.8, def: 0.7, d: 'Breaks up play: more cover, less attack.' },   poacher: { l: 'Poacher', g: 'fwd', att: 0.8, def: -0.9, sc: 1.5, d: 'Lives in the box: more attack, scores more, does no defending.' },   presser: { l: 'Presser', g: 'fwd', att: -0.6, def: 0.5, d: 'Leads the press: more cover, less attack.' } }; const TAC_NOROLE = { att: 0, def: 0, w: {} }; function tacOf(t) { return Object.assign({}, TAC_DEFAULT, t && t.tac); } function tacCode(tac) { return { ment: tac.ment, press: tac.press, tempo: tac.tempo }; } function tacText(tac) { return `${(TAC_MENT[tac.ment] || TAC_MENT.bal).l} · ${(TAC_PRESS[tac.press] || TAC_PRESS.mid).l} · ${(TAC_TEMPO[tac.tempo] || TAC_TEMPO.norm).l}`; } /* the instructions a club uses in a match: yours as set, the AI's chosen from the strength gap */ function tacForMatch(G, T, sT, sO) {   if (T.id === G.myTeam) return tacCode(tacOf(T));   const d = (sT.ovr || 0) - (sO.ovr || 0);   return { ment: d > 6 ? 'atk' : d < -6 ? 'def' : 'bal', press: d > 4 ? 'high' : d < -4 ? 'low' : 'mid', tempo: 'norm' }; } function tacRoleFx(t, xi, slots) {   const out = { att: 0, def: 0, w: {} };   if (!t || !t.roles) return out;   xi.forEach((p, i) => {     const r = TAC_ROLES[t.roles[i]];     if (!r || TAC_ROLE_GROUP[slots[i]] !== r.g) return;     const q = clamp(p.rating / 70, 0.85, 1.2);     out.att += r.att * q; out.def += r.def * q;     if (r.sc || r.as) out.w[p.id] = { sc: r.sc || 1, as: r.as || 1 };   });   out.att = clamp(out.att, -3, 3); out.def = clamp(out.def, -3, 3);   return out; } function tacW(ctx, side, pid, k) { const r = side === 'h' ? ctx.roleH : ctx.roleA; return (r && r.w[pid] && r.w[pid][k]) || 1; } /* ---------- set-piece takers ---------- */ function ensureSetPieces(t) {   t.setPieces = t.setPieces || {};   const xi = lineupOf(t).filter(p => p.pos !== 'GK');   if (!xi.length) return;   const best = fn => xi.slice().sort((a, b) => fn(b) - fn(a))[0].id;   if (!t.setPieces.pen || !xi.some(p => p.id === t.setPieces.pen)) t.setPieces.pen = best(p => p.rating + (p.pos === 'ST' || p.pos === 'CF' ? 3 : 0));   if (!t.setPieces.fk || !xi.some(p => p.id === t.setPieces.fk)) t.setPieces.fk = best(p => p.rating + (['CAM', 'CM', 'LW', 'RW'].includes(p.pos) ? 2 : 0));   if (!t.setPieces.corner || !xi.some(p => p.id === t.setPieces.corner)) t.setPieces.corner = best(p => p.rating + (['CM', 'CAM', 'RM', 'LM', 'RW', 'LW'].includes(p.pos) ? 1 : 0)); } function setPieceTakersHTML(t, xi) {   ensureSetPieces(t);   const pool = xi.filter(p => p.pos !== 'GK');   if (!pool.length) return '';   const sel = (key, label) => `<div class="rolerow"><span class="who"><b>${label}</b></span><span class="tacch">     <select data-sp="${key}">${pool.map(p => `<option value="${p.id}" ${t.setPieces[key] === p.id ? 'selected' : ''}>${esc(p.last || p.name)} (${p.rating})</option>`).join('')}</select>   </span></div>`;   return `<div class="panel tacp"><h3>Set-piece takers<span class="sub">who steps up for penalties, free kicks and corners</span></h3><div class="pad">     ${sel('pen', 'Penalties')}${sel('fk', 'Free kicks')}${sel('corner', 'Corners')}   </div></div>`; } /* ---------- opposition instructions ---------- */ function oppFocusTarget(myTeam, oppTeam) {   const f = myTeam.oppFocus;   if (!f || f.oppId !== oppTeam.id) return null;   const inXi = lineupOf(oppTeam).some(p => p.id === f.pid);   myTeam.oppFocus = null;   return inXi ? f.pid : null; } function tacMarkMul(ctx, side, pid) {   const mark = side === 'h' ? ctx.markH : ctx.markA;   return mark === pid ? 0.55 : 1; } function oppInstructionsHTML(t) {   const nx = myFixture(G.round);   if (!nx) return '';   const oppId = nx.h === G.myTeam ? nx.a : nx.h, opp = teamById(G, oppId);   if (!opp) return '';   const oppXi = lineupOf(opp).slice().sort((a, b) => b.rating - a.rating).filter(p => p.pos !== 'GK');   if (!oppXi.length) return '';   const cur = t.oppFocus && t.oppFocus.oppId === oppId ? t.oppFocus.pid : null;   const curP = cur ? oppXi.find(p => p.id === cur) : null;   return `<div class="panel tacp"><h3>Opposition instructions<span class="sub">next up: ${esc(opp.n)} · costs a touch of your own defensive shape</span></h3><div class="pad">     <div class="tacch">${oppXi.map(p => `<button class="chip" data-mark="${p.id}" data-markopp="${oppId}" aria-pressed="${cur === p.id}">${esc(p.last || p.name)} · ${p.rating}</button>`).join('')}</div>     <p class="hint" style="margin:8px 0 0">${curP ? `Marking ${esc(curP.name)} out of the game — expect him to go quiet, at the cost of a little defensive solidity elsewhere.` : 'Pick a player to man-mark for your next match. Clears automatically once that match is played.'}</p>   </div></div>`; } function tacCardMul(ctx, side) { return tacFx(side === 'h' ? ctx.tacH : ctx.tacA, 45, 0).cards; } /* attack / defence shift from instructions at a given minute; pressing works better against weaker sides and tires late */ function tacFx(tac, minute, ovrDiff) {   tac = tac || TAC_DEFAULT;   const m = TAC_MENT[tac.ment] || TAC_MENT.bal, p = TAC_PRESS[tac.press] || TAC_PRESS.mid;   let att = m.att + p.att, def = m.def + p.def;   if (tac.press === 'high') {     att += clamp(ovrDiff * 0.08, -0.8, 0.8);     if (minute > 62) { const k = Math.min(1, (minute - 62) / 20); att -= 3.2 * k; def -= 2.2 * k; }   }   return { att, def, cards: m.cards * p.cards }; } function tacAvgFx(tac, lo, hi, diff) {   const n = 5; let att = 0, def = 0, cards = 1;   for (let i = 0; i < n; i++) { const f = tacFx(tac, lo + (hi - lo) * (i + 0.5) / n, diff); att += f.att; def += f.def; cards = f.cards; }   return { att: att / n, def: def / n, cards }; } function xgFor(ctx, a, b) {   const homeAdv = ctx.neutral ? 0 : 2.6;   const lo = a == null ? 1 : a, hi = b == null ? 92 : b;   const fh = tacAvgFx(ctx.tacH, lo, hi, ctx.sh.ovr - ctx.sa.ovr), fa = tacAvgFx(ctx.tacA, lo, hi, ctx.sa.ovr - ctx.sh.ovr);   const rh = ctx.roleH || TAC_NOROLE, ra = ctx.roleA || TAC_NOROLE;   const pace = Math.sqrt(((TAC_TEMPO[(ctx.tacH || TAC_DEFAULT).tempo] || TAC_TEMPO.norm).pace) * ((TAC_TEMPO[(ctx.tacA || TAC_DEFAULT).tempo] || TAC_TEMPO.norm).pace));   const hh = ctx.hmH || 0, ha = ctx.hmA || 0;   const dH = (ctx.sh.att + fh.att + rh.att + hh + homeAdv + ctx.luckH) - (ctx.sa.def + fa.def + ra.def + ha);   const dA = (ctx.sa.att + fa.att + ra.att + ha + ctx.luckA) - (ctx.sh.def + fh.def + rh.def + hh);   return [clamp(1.12 * Math.pow(1.062, dH) * pace, 0.15, 4.4), clamp(1.12 * Math.pow(1.062, dA) * pace, 0.12, 4.4)]; } /* expected goals per period, kept so the report can show xG; a re-rolled stretch replaces what it overlaps */ function tacLogXG(ctx, a, b, xh, xa) {   const out = [];   (ctx.xgP || []).forEach(r => {     if (r.b < a || r.a > b) { out.push(r); return; }     const len = r.b - r.a + 1;     if (r.a < a) { const k = (a - r.a) / len; out.push({ a: r.a, b: a - 1, h: r.h * k, x: r.x * k }); }     if (r.b > b) { const k = (r.b - b) / len; out.push({ a: b + 1, b: r.b, h: r.h * k, x: r.x * k }); }   });   out.push({ a, b, h: xh, x: xa });   ctx.xgP = out; } function tacSumXG(ctx) { const L = ctx.xgP || []; return [L.reduce((s, r) => s + r.h, 0), L.reduce((s, r) => s + r.x, 0)].map(v => Math.round(v * 100) / 100); }  /* ---------- strength + expected result ---------- */ function tacStrengthNow(t) {   const s = teamStrength(t), f = tacAvgFx(tacOf(t), 1, 92, 0), r = tacRoleFx(t, s.xi, s.slots);   return { ovr: s.ovr, att: s.att, def: s.def, tatt: s.att + f.att + r.att, tdef: s.def + f.def + r.def }; } const TAC_GH = [[0, 0.5333333333], [1.3556261800, 0.2220759220], [-1.3556261800, 0.2220759220], [2.8569700139, 0.0112574113], [-2.8569700139, 0.0112574113]]; function tacPoissonGrid(lh, la) {   const pm = (l, k) => { let p = Math.exp(-l); for (let i = 1; i <= k; i++) p *= l / i; return p; };   let w = 0, d = 0, l = 0;   for (let i = 0; i <= 9; i++) for (let j = 0; j <= 9; j++) { const p = pm(lh, i) * pm(la, j); if (i > j) w += p; else if (i === j) d += p; else l += p; }   const s = w + d + l; return [w / s, d / s, l / s]; } /* the same maths the engine uses, with the luck swing averaged out */ function tacPreview(G, t, opp, home) {   const sm = teamStrength(t), so = teamStrength(opp);   const mine = { sh: home ? sm : so, sa: home ? so : sm };   const tm = tacForMatch(G, t, sm, so), to = tacForMatch(G, opp, so, sm);   const rm = tacRoleFx(t, sm.xi, sm.slots);   let xm = 0, xo = 0, win = 0, dr = 0, loss = 0;   TAC_GH.forEach(([zh, wh]) => TAC_GH.forEach(([za, wa]) => {     const ctx = { neutral: false, sh: { att: mine.sh.att, def: mine.sh.def, ovr: mine.sh.ovr }, sa: { att: mine.sa.att, def: mine.sa.def, ovr: mine.sa.ovr },       luckH: zh * 2.2, luckA: za * 2.2, hmH: home ? moodHarmFx(t) : 0, hmA: home ? 0 : moodHarmFx(t), tacH: home ? tm : to, tacA: home ? to : tm, roleH: home ? rm : null, roleA: home ? null : rm };     const [xh, xa] = xgFor(ctx, 1, 92), w8 = wh * wa;     const my = home ? xh : xa, th = home ? xa : xh;     xm += my * w8; xo += th * w8;     const [pw, pd, pl] = tacPoissonGrid(my, th); win += pw * w8; dr += pd * w8; loss += pl * w8;   }));   return { xm, xo, win, dr, loss, sm, so, tm, to }; }  /* ---------- tactics screen: instructions, roles, setups, best-fit subs ---------- */ let tacLast = null; function tacChipsHTML(key, map, cur) {   return Object.keys(map).map(k => `<button class="chip" data-tac="${key}:${k}" aria-pressed="${cur === k}" title="${esc(map[k].d)}">${map[k].l}</button>`).join(''); } function tacControlsHTML(tac) {   return `<div class="tacctl">     <div class="tacrow"><span>Mentality</span><div class="tacch">${tacChipsHTML('ment', TAC_MENT, tac.ment)}</div></div>     <div class="tacrow"><span>Pressing</span><div class="tacch">${tacChipsHTML('press', TAC_PRESS, tac.press)}</div></div>     <div class="tacrow"><span>Tempo</span><div class="tacch">${tacChipsHTML('tempo', TAC_TEMPO, tac.tempo)}</div></div>     <p class="hint tacdesc">${esc((TAC_MENT[tac.ment] || TAC_MENT.bal).d)} ${esc((TAC_PRESS[tac.press] || TAC_PRESS.mid).d)} ${esc((TAC_TEMPO[tac.tempo] || TAC_TEMPO.norm).d)}</p></div>`; } function tacBindControls(root, tac, onChange) {   root.querySelectorAll('[data-tac]').forEach(b => b.onclick = () => { const [k, v] = b.dataset.tac.split(':'); tac[k] = v; onChange(tac); }); } function tacBarsHTML(t) {   const s = tacStrengthNow(t), prev = tacLast && tacLast.id === t.id ? tacLast : null;   const tier = G.teams.filter(x => x.tier === t.tier);   let aA = 0, aD = 0; tier.forEach(x => { const q = teamStrength(x); aA += q.att; aD += q.def; }); aA /= tier.length || 1; aD /= tier.length || 1;   const pct = v => Math.max(4, Math.min(100, (v - 45) / 45 * 100));   const arrow = (cur, old) => { if (old == null) return ''; const d = cur - old; return Math.abs(d) < 0.05 ? '' : `<em class="${d > 0 ? 'up' : 'dn'}">${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}</em>`; };   const eff = (v, tv) => Math.abs(tv - v) < 0.05 ? '' : `<small class="${tv > v ? 'up' : 'dn'}">${tv.toFixed(1)} with instructions</small>`;   const bar = (l, v, tv, avg, old) => `<div class="tb"><span>${l}</span><div class="bar"><i style="width:${pct(v)}%"></i><u style="left:${pct(avg)}%" title="League average"></u></div><b>${v.toFixed(1)}</b>${arrow(v, old)}${eff(v, tv)}</div>`;   const html = `<div class="tacbars">${bar('Attack', s.att, s.tatt, aA, prev && prev.att)}${bar('Defence', s.def, s.tdef, aD, prev && prev.def)}${bar('Overall', s.ovr, s.ovr, (aA + aD) / 2, prev && prev.ovr)}</div>`;   tacLast = { id: t.id, att: s.att, def: s.def, ovr: s.ovr };   return html; } function tacPanelsHTML(t, xi, slots) {   const tac = tacOf(t), roles = t.roles || [], rfx = tacRoleFx(t, xi, slots), presets = t.presets || [];   const roleRows = xi.map((p, i) => {     const g = TAC_ROLE_GROUP[slots[i]]; if (!g) return '';     const opts = Object.keys(TAC_ROLES).filter(k => TAC_ROLES[k].g === g);     return `<div class="rolerow"><span class="who">${faceSVG(p, 26, t.c1)}<b>${esc(p.last || p.name)}</b><small>${slots[i]}</small></span><span class="tacch">${opts.map(k => `<button class="chip" data-role="${i}:${k}" aria-pressed="${roles[i] === k}" title="${esc(TAC_ROLES[k].d)}">${TAC_ROLES[k].l}</button>`).join('')}</span></div>`;   }).join('');   const presetRows = [0, 1, 2].map(i => { const p = presets[i]; return `<div class="presetrow"><b>Setup ${i + 1}</b><span class="hint">${p ? `${esc(p.formation)} · ${esc(tacText(p.tac))}` : 'Empty'}</span><span class="tacch"><button class="chip" data-psave="${i}">Save current</button>${p ? `<button class="chip" data-pload="${i}">Load</button>` : ''}</span></div>`; }).join('');   const fx = (rfx.att || rfx.def) ? `Roles add ${rfx.att >= 0 ? '+' : ''}${rfx.att.toFixed(1)} attack and ${rfx.def >= 0 ? '+' : ''}${rfx.def.toFixed(1)} defence.` : 'No roles set.';   return `<div class="panel tacp"><h3>Team strength<span class="sub">${esc(t.formation)} · ${esc(tacText(tac))}</span></h3>${tacBarsHTML(t)}       <p class="hint" style="margin:8px 12px 10px">Bars show the XI's raw rating. The gold tick is the league average. Instructions and roles change how that rating plays in a match.</p></div>     <div class="panel tacp"><h3>Instructions<span class="sub">used in every match · changeable live and at half-time</span></h3><div class="pad" id="tacCtl">${tacControlsHTML(tac)}</div></div>     <div class="panel tacp"><h3>Player roles<span class="sub">tap a role to set it, tap again to clear</span></h3><div class="pad">${roleRows || '<div class="empty">No slots in this formation can take a role.</div>'}<p class="hint" style="margin:8px 0 0">${fx} Roles belong to the slot and reset when you change formation.</p></div></div>     <div class="panel tacp"><h3>Saved setups<span class="sub">formation, instructions and roles; the strongest XI is picked on load</span></h3><div class="pad">${presetRows}</div></div>`; } function tacSubsHTML(t, bench, slots) {   const slot = selSpot != null ? slots[selSpot] : null, cur = slot ? lineupOf(t)[selSpot] : null, curEff = cur ? effRating(cur, slot) : 0;   const rows = bench.map(p => ({ p, eff: slot ? effRating(p, slot) : p.rating })).sort((a, b) => b.eff - a.eff);   return rows.map(({ p, eff }, i) => {     const d = slot ? Math.round(eff - curEff) : 0;     const tag = slot ? `<i class="fsubd ${d > 0 ? 'up' : d < 0 ? 'dn' : ''}">${d > 0 ? '+' : ''}${d}</i>` : '';     return `<button class="fsub" data-sub="${p.id}">${faceSVG(p, 40, t.c1)}<b>${Math.round(eff)}</b>${tag}${slot && i === 0 ? '<em class="bestfit">Best fit</em>' : ''}<small>${[p.pos].concat(p.alt || []).join('/')} · ${esc(p.last || p.name)}</small></button>`;   }).join('') + (slot ? `<p class="hint" style="flex-basis:100%;margin:6px 0 0">Ratings shown are how each sub would play at ${slot}, with the change against your current player.</p>` : ''); } function viewTactics() { viewTacticsBase(); try { tacEnhance(); } catch (e) { console.error('Tactics enhance error', e); } } function tacEnhance() {   const v = $('#v-squad'), t = me(); if (!v || !t) return;   ensureLineup(t);   const slots = FORMATIONS[t.formation], xi = lineupOf(t), bench = benchOf(t);   const extraPanels = tacPanelsHTML(t, xi, slots) + setPieceTakersHTML(t, xi) + oppInstructionsHTML(t);   const pitch = v.querySelector('.fifa'), fp = pitch && pitch.closest('.panel');   const sub = v.querySelector('.fsubs'), subPanel = sub && sub.closest('.panel');   if (subPanel) subPanel.insertAdjacentHTML('afterend', extraPanels); else if (fp) fp.insertAdjacentHTML('afterend', extraPanels);   if (sub) {     sub.innerHTML = tacSubsHTML(t, bench, slots);     sub.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => {       if (selSpot === null) { playerModal(+b.dataset.sub); return; }       t.lineup[selSpot] = +b.dataset.sub; selSpot = null; save(); render();     });   }   v.querySelectorAll('[data-sp]').forEach(sel => sel.onchange = () => { t.setPieces = t.setPieces || {}; t.setPieces[sel.dataset.sp] = +sel.value; save(); });   v.querySelectorAll('[data-mark]').forEach(b => b.onclick = () => {     const pid = +b.dataset.mark, oppId = +b.dataset.markopp;     t.oppFocus = (t.oppFocus && t.oppFocus.pid === pid && t.oppFocus.oppId === oppId) ? null : { oppId, pid };     save(); viewTactics();   });   const fs = $('#formSel'); if (fs) { const o = fs.onchange; fs.onchange = e => { t.roles = null; o(e); }; }   const ctl = $('#tacCtl');   if (ctl) tacBindControls(ctl, tacOf(t), tac => { t.tac = tacCode(tac); save(); viewTactics(); });   v.querySelectorAll('[data-role]').forEach(b => b.onclick = () => {     const [i, k] = b.dataset.role.split(':'); t.roles = t.roles || [];     t.roles[+i] = t.roles[+i] === k ? '' : k; save(); viewTactics();   });   v.querySelectorAll('[data-psave]').forEach(b => b.onclick = () => {     const i = +b.dataset.psave; t.presets = t.presets || [null, null, null];     t.presets[i] = { formation: t.formation, tac: tacCode(tacOf(t)), roles: (t.roles || []).slice() };     save(); toastGood(`Setup ${i + 1} saved.`); viewTactics();   });   v.querySelectorAll('[data-pload]').forEach(b => b.onclick = () => {     const p = (t.presets || [])[+b.dataset.pload]; if (!p || !FORMATIONS[p.formation]) return;     t.formation = p.formation; t.tac = tacCode(p.tac); t.roles = (p.roles || []).slice(); t.lineup = autoLineup(t); selSpot = null;     save(); toastGood('Setup loaded. The strongest XI is picked for it.'); render();   }); }  /* ---------- scouting report on the matchday screen ---------- */ 	function viewMatchBase() { viewMatchBase(); try { tacScout(); } catch (e) { console.error('Scout error', e); } try { rotationScout(); } catch (e) { console.error('Rotation error', e); } } /* ---- rotation advice: tired starters and fresh alternatives, shown on the match screen ---- */
function rotationScout() {
  const v = $('#v-match'), nx = myFixture(G.round); if (!v || !nx || liveState || G.finished) return;
  const hero = v.querySelector('.hero'); if (!hero) return;
  const t = me(), xi = lineupOf(t), bench = benchOf(t).filter(p => !p.reserve && p.pos !== 'GK');
  const used = new Set(), rows = [];
  xi.filter(p => staOf(p) < STA_TIRED + 10 && POS_GROUP[p.pos] !== 'GK').sort((a, b) => staOf(a) - staOf(b)).forEach(p => {
    const opts = bench.filter(b => !used.has(b.id) && staOf(b) >= staOf(p) + 20 && b.rating >= p.rating - 7 && POS_GROUP[b.pos] === POS_GROUP[p.pos])
      .sort((a, b) => (b.pos === p.pos) - (a.pos === p.pos) || (b.rating + staOf(b) * 0.05) - (a.rating + staOf(a) * 0.05));
    const sub = opts[0]; if (sub) used.add(sub.id);
    rows.push(`<div class="res" style="grid-template-columns:1fr auto;gap:8px"><div class="h"><b>${esc(p.name)}</b> <span class="hint">${esc(p.pos)} · ${p.rating}</span> <span class="tag" style="color:${staColor(staOf(p))};border-color:${staColor(staOf(p))}">${Math.round(staOf(p))}%</span>
      ${sub ? `<div class="hint">Rest him for ${esc(sub.name)} (${esc(sub.pos)} · ${sub.rating} · ${Math.round(staOf(sub))}% fit)</div>` : '<div class="hint">No fresh cover in the squad.</div>'}</div>
      <div class="a">${sub ? `<button class="btn sm" data-rot="${p.id}:${sub.id}">Swap</button>` : ''}</div></div>`);
  });
  if (!rows.length) return;
  hero.insertAdjacentHTML('afterend', `<div class="panel" id="rotPanel"><h3>Rotation advice<span class="sub">tired starters risk a poor game and injury</span></h3><div class="pad">${rows.join('')}</div></div>`);
  v.querySelectorAll('[data-rot]').forEach(b => b.onclick = () => {
    const [o, n] = b.dataset.rot.split(':').map(Number), i = t.lineup.indexOf(o);
    if (i < 0) return;
    t.lineup[i] = n; save(); toast('Lineup updated.'); render();
  });
} function tacScout() {   const v = $('#v-match'), nx = myFixture(G.round); if (!v || !nx || liveState || G.finished) return;   const hero = v.querySelector('.hero'); if (!hero) return;   const t = me(), home = nx.h === G.myTeam, opp = G.teams[home ? nx.a : nx.h];   const pv = tacPreview(G, t, opp, home);   const grp = st => { const o = { GK: [], DEF: [], MID: [], ATT: [] }; st.xi.forEach((p, i) => { const g = POS_GROUP[st.slots[i]]; if (o[g]) o[g].push(effRating(p, st.slots[i])); }); const r = {}; Object.keys(o).forEach(k => r[k] = o[k].length ? o[k].reduce((a, b) => a + b, 0) / o[k].length : 0); return r; };   const gm = grp(pv.sm), go = grp(pv.so);   const rows = [['GK', 'Keeper'], ['DEF', 'Defence'], ['MID', 'Midfield'], ['ATT', 'Attack']].map(([k, l]) => { const d = gm[k] - go[k]; return `<tr><td>${l}</td><td class="num">${gm[k].toFixed(1)}</td><td class="num">${go[k].toFixed(1)}</td><td class="num ${d > 1 ? 'up' : d < -1 ? 'dn' : ''}">${d > 0 ? '+' : ''}${d.toFixed(1)}</td></tr>`; }).join('');   const key = pv.so.xi.map((p, i) => ({ p, s: pv.so.slots[i] })).sort((a, b) => b.p.rating - a.p.rating).slice(0, 3);   const gap = pv.sm.ovr - pv.so.ovr, tips = [];   if (gap >= 5) tips.push('You are clear favourites. An attacking mentality and a high press turn that edge into goals.');   else if (gap <= -5) tips.push('You are the underdogs. A defensive mentality and a low block shrink the gap.');   else tips.push('Evenly matched. Balanced instructions are hard to beat; a fast tempo adds goals at both ends.');   if (go.ATT - gm.DEF >= 4) tips.push(`Their attackers (${go.ATT.toFixed(0)}) outrate your defenders (${gm.DEF.toFixed(0)}). Keep your full-backs at home.`);   if (gm.ATT - go.DEF >= 4) tips.push(`Their defence (${go.DEF.toFixed(0)}) is the weak spot against your attack (${gm.ATT.toFixed(0)}). Push forward.`);   if (go.MID - gm.MID >= 4) tips.push('They have the stronger midfield. A destroyer in the middle helps hold them off.');   const pc = x => Math.round(x * 100);   hero.insertAdjacentHTML('afterend', `<div class="panel tacp scout"><h3>Scouting report<span class="sub">${esc(opp.s)} · ${esc(opp.formation)}</span></h3><div class="pad">     <div class="wdl"><span class="w" style="flex:${pv.win}">Win ${pc(pv.win)}%</span><span class="d" style="flex:${pv.dr}">Draw ${pc(pv.dr)}%</span><span class="l" style="flex:${pv.loss}">Loss ${pc(pv.loss)}%</span></div>     <p class="xgline">Expected goals <b>${pv.xm.toFixed(2)}</b> – <b>${pv.xo.toFixed(2)}</b> <small>(model estimate, luck not included)</small></p>     <p class="hint" style="margin:0 0 10px">They are likely to play ${esc(tacText(pv.to))}. You are set to ${esc(tacText(pv.tm))}.</p>     <table class="tbl"><thead><tr><th>Line</th><th>You</th><th>Them</th><th>Edge</th></tr></thead><tbody>${rows}</tbody></table>     <h4 style="margin:12px 0 6px">Players to watch</h4>     ${key.map(({ p, s }) => `<div class="prow" style="grid-template-columns:auto auto 1fr auto">${faceSVG(p, 28, opp.c1)}${ratingTag(p.rating)}<span class="who"><b>${esc(p.name)}</b><small>${s}</small></span>${posTag(p.pos)}</div>`).join('')}     <h4 style="margin:12px 0 6px">Advice</h4>${tips.map(x => `<p class="hint" style="margin:0 0 4px">• ${esc(x)}</p>`).join('')}</div></div>`); }  /* ---------- post-match numbers ---------- */ function tacStatsHTML(m) {   if (!m || !m.xg) return '';   const [xh, xa] = m.xg, sh = Math.max(m.hg + 1, Math.round(xh / 0.105)), sa = Math.max(m.ag + 1, Math.round(xa / 0.105));   const row = (l, a, b, fmt) => { const tot = (a + b) || 1; return `<div class="tsrow"><b>${fmt(a)}</b><div class="tsbar"><i style="width:${a / tot * 100}%"></i><i class="o" style="width:${b / tot * 100}%"></i></div><b>${fmt(b)}</b><span>${l}</span></div>`; };   const mineH = m.h === G.myTeam, mine = mineH ? m.hg : m.ag, theirs = mineH ? m.ag : m.hg, xm = mineH ? xh : xa, xt = mineH ? xa : xh;   let note = '';   if (mine > theirs && xm + 0.35 < xt) note = 'The result flattered you. The chances favoured them.';   else if (mine < theirs && xm > xt + 0.35) note = 'Unlucky. You created more than you conceded.';   else if (mine >= theirs && xm > xt) note = 'Deserved. You were the better side on chances.';   const my = m.tc ? (mineH ? m.tc.h : m.tc.a) : null;   return `<div class="tacstats"><div class="tshead">Match numbers</div>     ${row('Expected goals', xh, xa, v => v.toFixed(2))}${row('Shots', sh, sa, v => String(v))}     ${my ? `<p class="hint" style="margin:6px 12px 0">Your approach: ${esc(tacText(my))}</p>` : ''}${note ? `<p class="hint" style="margin:2px 12px 8px">${esc(note)}</p>` : '<div style="height:8px"></div>'}</div>`; }  /* ---------- changing instructions during a match ---------- */ function liveControlsBase() {   const ls = liveState, c = $('#liveCtl');   if (!ls || !c || ls.ft || ls.interlude || !ls.started) return;   c.insertAdjacentHTML('beforeend', '<button class="chip" id="liveTac">Tactics</button>');   const b = $('#liveTac'); if (b) b.onclick = openLiveTactics; } function openLiveTactics() {   const ls = liveState; if (!ls || ls.ft || !ls.started) return;   if (ls.minute >= (ls.half === 1 ? 45 : 92)) { toast('Too late for a change.'); return; }   const wasRunning = !ls.paused; if (wasRunning) livePause();   const side = ls.mySide, tac = () => side === 'h' ? ls.ctx.tacH : ls.ctx.tacA;   openModal('Tactics', `<p class="hint" style="margin:0 0 8px">${esc(G.teams[ls.ctx.h].s)} ${ls.ctx.hg}–${ls.ctx.ag} ${esc(G.teams[ls.ctx.a].s)} · ${ls.minute}'. Changes apply from this minute.</p><div id="ltBody"></div>`, `<button class="btn sm" id="ltDone">Back to the match</button>`);   const back = () => { closeModal(); if (wasRunning && liveState === ls && ls.paused && !ls.ft) livePause(); };   $('#modal .x').onclick = back; $('#ltDone').onclick = back;   const paint = () => {     const box = $('#ltBody'); box.innerHTML = tacControlsHTML(tac());     tacBindControls(box, tac(), t => { me().tac = tacCode(t); rerollRemainder(ls); updateLiveScore(); save(); toast('Now: ' + tacText(t)); paint(); });   };   paint();   const htGo = $('#htGo');   if (htGo) htGo.onclick = resume; } function tacHalfTime() {   const ls = liveState, body = $('#modal .body'); if (!ls || !body) return;   const side = ls.mySide, tac = () => side === 'h' ? ls.ctx.tacH : ls.ctx.tacA;   body.insertAdjacentHTML('afterbegin', `<div class="panel tacp" style="margin:0 0 10px"><h3>Instructions for the second half</h3><div class="pad" id="htTacBody"></div></div>`);   const paint = () => { const box = $('#htTacBody'); box.innerHTML = tacControlsHTML(tac()); tacBindControls(box, tac(), t => { me().tac = tacCode(t); save(); paint(); }); };   paint(); } function xgForOld(ctx) {
  const homeAdv = ctx.neutral ? 0 : 2.6;
  const dH = (ctx.sh.att + homeAdv + ctx.luckH) - ctx.sa.def;
  const dA = (ctx.sa.att + ctx.luckA) - ctx.sh.def;
  return [clamp(1.12 * Math.pow(1.062, dH), 0.15, 4.4), clamp(1.12 * Math.pow(1.062, dA), 0.12, 4.4)];
}

/* plays minutes t0..t1, adding goals and cards to ctx.ev */
function runPeriod(G, ctx, t0, t1) {   if (ctx.forfeit) return;   /* forfeited: nothing is played */   const made = [];   const off = offIds(ctx);                                   /* already sent off earlier in this match */   const frac = (t1 - t0 + 1) / 90;   const sides = [['h', ctx.xiH, ctx.slotsH, ctx.h], ['a', ctx.xiA, ctx.slotsA, ctx.a]];   const CARD_W = { GK: 0.3, CB: 1.6, CDM: 1.7, RB: 1.3, LB: 1.3, RWB: 1.2, LWB: 1.2, CM: 1.2, CAM: 0.9, RM: 0.8, LM: 0.8, RW: 0.8, LW: 0.8, CF: 0.8, ST: 0.9 };   const booked = id => ctx.ev.concat(made).some(e => e.type === 'card' && e.scorer === id);   /* 1. cards and injuries are rolled first, so a red card can split the period */   sides.forEach(([side, xi, slots, teamId]) => {     const cand = xi.map((q, i) => ({ q, slot: slots[i] || q.pos })).filter(x => !off.has(x.q.id));     if (!cand.length) return;     if (rnd() < 0.9 * frac * 2 * tacCardMul(ctx, side)) {       const c = wpick(cand, x => (CARD_W[x.slot] || 1) * (booked(x.q.id) ? 0.25 : 1)).q;       const second = booked(c.id);       made.push({ min: rint(t0, t1), type: 'card', card: second || rnd() < 0.02 ? 'red' : 'yellow', second, side, team: teamId, scorer: c.id, sName: c.name });     }     if (rnd() < 0.09 * frac * 2) {       const p = pick(cand).q;       made.push({ min: rint(t0, t1), type: 'injury', side, team: teamId, scorer: p.id, sName: p.name });       p.pendingInj = rint(1, 5);     }   });   /* 2. goals, with the period split at each red card (that team plays a man down afterwards) */   const addGoals = (n, side, a, b) => {     const xi = side === 'h' ? ctx.xiH : ctx.xiA;     const slots = side === 'h' ? ctx.slotsH : ctx.slotsA;     const teamId = side === 'h' ? ctx.h : ctx.a;     const spTeam = teamById(G, teamId), sp = spTeam && spTeam.setPieces;     for (let i = 0; i < n; i++) {       const cand = xi.map((p, idx) => ({ p, slot: slots[idx] || p.pos })).filter(x => !off.has(x.p.id));       if (!cand.length) break;       const spRoll = rnd(), isPen = spRoll < 0.07, isFk = !isPen && spRoll < 0.11, isCorner = !isPen && !isFk && spRoll < 0.21;       let sc;       if (isPen && sp && sp.pen && cand.some(x => x.p.id === sp.pen)) sc = cand.find(x => x.p.id === sp.pen).p;       else if (isFk && sp && sp.fk && cand.some(x => x.p.id === sp.fk) && rnd() < 0.6) sc = cand.find(x => x.p.id === sp.fk).p;       else sc = wpick(cand, x => POS_ATT[x.slot] * Math.pow(x.p.rating / 68, 1.8) * tacW(ctx, side, x.p.id, 'sc') * tacMarkMul(ctx, side, x.p.id)).p;       const helpers = cand.filter(x => x.p !== sc && x.slot !== 'GK');       let as = null;       if (!isPen) {         if (isCorner && sp && sp.corner && helpers.some(x => x.p.id === sp.corner) && rnd() < 0.55) as = helpers.find(x => x.p.id === sp.corner).p;         else if (rnd() < 0.7 && helpers.length) as = wpick(helpers, x => (POS_ATT[x.slot] * 0.7 + 0.5) * tacW(ctx, side, x.p.id, 'as') * tacMarkMul(ctx, side, x.p.id)).p;       }       made.push({ min: rint(a, b), type: 'goal', side, team: teamId, scorer: sc.id, sName: sc.name, assist: as ? as.id : null, aName: as ? as.name : null, penalty: isPen });       if (side === 'h') ctx.hg++; else ctx.ag++;     }   };   const seg = (a, b) => {     if (b < a) return;     ctx._off = new Set(off);     refreshStrength(G, ctx);     const [xgH, xgA] = xgFor(ctx, a, b);     const f = (b - a + 1) / 90;     tacLogXG(ctx, a, b, xgH * f, xgA * f);     addGoals(Math.min(poisson(xgH * f), 6), 'h', a, b);     addGoals(Math.min(poisson(xgA * f), 6), 'a', a, b);   };   let cursor = t0;   made.filter(e => e.type === 'card' && e.card === 'red').sort((x, y) => x.min - y.min)     .forEach(e => { seg(cursor, e.min); off.add(e.scorer); cursor = Math.min(t1, e.min + 1); });   seg(cursor, t1);   ctx._off = null;   made.sort((x, y) => x.min - y.min);   ctx.ev = ctx.ev.concat(made);   return made; } function runPeriodOld(G, ctx, t0, t1) {
  refreshStrength(G, ctx);
  const [xgH, xgA] = xgFor(ctx);
  const frac = (t1 - t0 + 1) / 90;
  const made = [];
  const addGoals = (n, side) => {
    const xi = side === 'h' ? ctx.xiH : ctx.xiA;
    const slots = side === 'h' ? ctx.slotsH : ctx.slotsA;
    const teamId = side === 'h' ? ctx.h : ctx.a;
    for (let i = 0; i < n; i++) {
      const cand = xi.map((p, idx) => ({ p, slot: slots[idx] || p.pos }));
      const sc = wpick(cand, x => POS_ATT[x.slot] * Math.pow(x.p.rating / 68, 1.8)).p;
      const helpers = cand.filter(x => x.p !== sc && x.slot !== 'GK');
      const as = rnd() < 0.7 && helpers.length ? wpick(helpers, x => POS_ATT[x.slot] * 0.7 + 0.5).p : null;
      const e = {
        min: rint(t0, t1), type: 'goal', side, team: teamId,
        scorer: sc.id, sName: sc.name, assist: as ? as.id : null, aName: as ? as.name : null
      };
      made.push(e);
      if (side === 'h') ctx.hg++; else ctx.ag++;
    }
  };
  addGoals(Math.min(poisson(xgH * frac), 6), 'h');
  addGoals(Math.min(poisson(xgA * frac), 6), 'a');
  /* cards and injuries */
  [['h', ctx.xiH, ctx.h], ['a', ctx.xiA, ctx.a]].forEach(([side, xi, teamId]) => {
    if (rnd() < 0.55 * frac * 2) {
      const p = pick(xi);
      made.push({ min: rint(t0, t1), type: 'card', card: rnd() < 0.035 ? 'red' : 'yellow', side, team: teamId, scorer: p.id, sName: p.name });
    }
if (rnd() < 0.9 * frac * 2) {
      const sl = side === 'h' ? ctx.slotsH : ctx.slotsA;
      const p = wpick(xi.map((q, i) => ({ q, slot: sl[i] || q.pos })), x => ({ GK: 0.3, CB: 1.6, CDM: 1.7, RB: 1.3, LB: 1.3, RWB: 1.2, LWB: 1.2, CM: 1.2, CAM: 0.9, RM: 0.8, LM: 0.8, RW: 0.8, LW: 0.8, CF: 0.8, ST: 0.9 }[x.slot] || 1)).q;
      made.push({ min: rint(t0, t1), type: 'injury', side, team: teamId, scorer: p.id, sName: p.name });
      p.pendingInj = rint(1, 5);
    }
  });
  made.sort((x, y) => x.min - y.min);
  ctx.ev = ctx.ev.concat(made);
  return made;
}

function makeSub(ctx, side, outId, inPlayer) {
  const xi = side === 'h' ? ctx.xiH : ctx.xiA;
  const i = xi.findIndex(p => p.id === outId);
  if (i < 0) return false;
  const slots = side === 'h' ? ctx.slotsH : ctx.slotsA;
  (ctx.subbedOff || (ctx.subbedOff = new Set())).add(xi[i].id);   xi[i] = inPlayer;
  ctx.ev.push({ min: ctx.minute || 45, type: 'sub', side, team: side === 'h' ? ctx.h : ctx.a, sName: inPlayer.name, outName: null });
  if (side === 'h') ctx.subsH++; else ctx.subsA++;
  inPlayer._subbedIn = true; (ctx.subbedIn || (ctx.subbedIn = new Set())).add(inPlayer.id);
  return true;
}

/* AI opposition makes half-time changes if losing */
function aiSubs(G, ctx) {   if (ctx.forfeit) return;
  const side = 'a';
  if (ctx.ag < ctx.hg) {
    const T = G.teams[ctx.a];
    const bench = T.squad.filter(p => !ctx.xiA.includes(p) && isFit(p, T)).sort((x, y) => y.rating - x.rating);
    for (let i = 0; i < Math.min(2, bench.length); i++) {
      const weakest = ctx.xiA.filter(p => ctx.slotsA[ctx.xiA.indexOf(p)] !== 'GK' && !offIds(ctx).has(p.id))
        .sort((x, y) => x.rating - y.rating)[0];
      if (weakest && bench[i].rating > weakest.rating) makeSub(ctx, side, weakest.id, bench[i]);
    }
  }
}

function computeMatchRatings(G, ctx) {
  const goalsBy = {}, assistsBy = {}, cardsBy = {};
  ctx.ev.forEach(e => {
    if (e.type === 'goal') { goalsBy[e.scorer] = (goalsBy[e.scorer] || 0) + 1; if (e.assist) assistsBy[e.assist] = (assistsBy[e.assist] || 0) + 1; }
    if (e.type === 'card') cardsBy[e.scorer] = e.card;
  });
  const monthBucket = Math.floor((G.round || 0) / 3);
  const ratings = {};
  let potm = null;
  const rateSide = (xi, conceded, resultDelta) => {
    xi.forEach(p => {
      let r = 6.0;
      r += (goalsBy[p.id] || 0) * 1.0;
      r += (assistsBy[p.id] || 0) * 0.6;
      if (conceded === 0 && (POS_GROUP[p.pos] === 'GK' || POS_GROUP[p.pos] === 'DEF')) r += 0.5;
      if (cardsBy[p.id] === 'yellow') r -= 0.3;
      if (cardsBy[p.id] === 'red') r -= 1.2;
      r += resultDelta;
      r += (p.rating - 65) * 0.012;
      r += gauss() * 0.45;
      r = Math.round(clamp(r, 3.5, 10) * 10) / 10;
      ratings[p.id] = r;
      p.ratingSum = (p.ratingSum || 0) + r; p.ratingApps = (p.ratingApps || 0) + 1;
      p.monthRatings = p.monthRatings || {};
      p.monthRatings[monthBucket] = p.monthRatings[monthBucket] || { sum: 0, apps: 0 };
      p.monthRatings[monthBucket].sum += r; p.monthRatings[monthBucket].apps++;
      if (!potm || r > potm.rating) potm = { id: p.id, rating: r, goals: goalsBy[p.id] || 0, assists: assistsBy[p.id] || 0 };
    });
  };
  const resH = ctx.hg > ctx.ag ? 0.2 : ctx.hg < ctx.ag ? -0.2 : 0;
  const resA = ctx.ag > ctx.hg ? 0.2 : ctx.ag < ctx.hg ? -0.2 : 0;
  rateSide(matchSquad(ctx.startH, ctx.xiH), ctx.ag, resH);
  rateSide(matchSquad(ctx.startA, ctx.xiA), ctx.hg, resA);
  ctx.ratings = ratings;
  ctx.potm = potm;
}
  /* everyone who took part: the starting XI plus anyone who came on */
function matchSquad(start, xi) { const s = start || []; return s.concat(xi.filter(p => !s.includes(p))); }
function appsTxt(p) { const s = p.sApps || 0; return s ? `${(p.apps || 0) - s}(${s})` : `${p.apps || 0}`; }
function appsTxtN(a, s) { return s ? `${a - s}(${s})` : `${a}`; }
/* simulated matches: both sides make 2-5 changes, injured and tired players go off first */
function simSubs(G, ctx) {
  if (ctx.forfeit) return;
  const m0 = ctx.minute;
  ['h', 'a'].forEach(side => {
    const T = G.teams[side === 'h' ? ctx.h : ctx.a]; if (!T || !T.squad) return;
    const xi = side === 'h' ? ctx.xiH : ctx.xiA, slots = side === 'h' ? ctx.slotsH : ctx.slotsA;
    const hurt = new Set(ctx.ev.filter(e => e.type === 'injury' && e.side === side).map(e => e.scorer));
    const gone = offIds(ctx);
    let bench = T.squad.filter(p => !xi.includes(p) && isFit(p, T) && !p.reserve && p.pos !== 'GK' && !(ctx.subbedOff && ctx.subbedOff.has(p.id)));
    const n = Math.min(rint(2, 5), bench.length);
    for (let k = 0; k < n; k++) {
      const cands = xi.map((p, i) => ({ p, slot: slots[i] || p.pos })).filter(x => !gone.has(x.p.id) && x.slot !== 'GK');
      if (!cands.length) break;
      cands.forEach(x => { x.s = (hurt.has(x.p.id) ? 100 : 0) + (100 - staOf(x.p)) * 0.5 + (70 - x.p.rating) * 0.1 + gauss() * 6; });
      cands.sort((a, b) => b.s - a.s);
      let done = false;
      for (const c of cands) {
        const g = POS_GROUP[c.slot];
        const opts = bench.filter(b => POS_GROUP[b.pos] === g).sort((a, b) => (b.rating + gauss() * 4) - (a.rating + gauss() * 4));
        if (!opts.length) continue;
        ctx.minute = rint(55, 80);
        if (makeSub(ctx, side, c.p.id, opts[0])) { ctx.ev[ctx.ev.length - 1].outName = c.p.name; bench = bench.filter(b => b !== opts[0]); done = true; break; }
      }
      if (!done) break;
    }
  });
  ctx.minute = m0;
}
function finishMatch(G, ctx) {
  if (ctx.forfeit) { settleForfeit(G, ctx); return; }
  const played = new Set();
  const credit = (xi, conceded, teamId) => {
    xi.forEach(p => {
      if (played.has(p.id)) return;
      played.add(p.id);
      p.apps++; p.cApps++; if (ctx.subbedIn && ctx.subbedIn.has(p.id)) p.sApps = (p.sApps || 0) + 1;
      p.earned = Math.round((p.earned + p.wage / 34) * 1000) / 1000;
      if (POS_GROUP[p.pos] === 'GK' && conceded === 0) p.cs++;
      p.form *= 0.72; p.sta = Math.max(0, staOf(p) - STA_DRAIN); p.stp = 1;
      if (p.pendingInj) { p.inj = p.pendingInj; p.injLen = p.inj; delete p.pendingInj; }
    });
  };
  credit(matchSquad(ctx.startH, ctx.xiH), ctx.ag, ctx.h);
  credit(matchSquad(ctx.startA, ctx.xiA), ctx.hg, ctx.a);
  computeMatchRatings(G, ctx);
  const teamOf = id => G.teams[id] || (G.africa && G.africa.squadCache && G.africa.squadCache[id]);
  ctx.ev.forEach(e => {
    if (e.type !== 'goal') return;
    const t = teamOf(e.team);
    if (!t) return;
    const sc = t.squad.find(p => p.id === e.scorer);
    if (sc) { sc.goals++; sc.cG++; sc.form = clamp(sc.form + 1.2, -4, 5); }
    if (e.assist) { const as = t.squad.find(p => p.id === e.assist); if (as) { as.assists++; as.cA++; as.form = clamp(as.form + 0.7, -4, 5); } }
  });
  ctx.ev.forEach(e => {     if (e.type !== 'card') return;     const ct = teamOf(e.team); if (!ct) return;     const cp = ct.squad.find(p => p.id === e.scorer);     if (!cp) return;     if (e.card === 'red') cp.red = (cp.red || 0) + 1; else cp.yellow = (cp.yellow || 0) + 1;   });   applyCardBans(G, ctx);   /* hat-trick note */
  const tally = {};
  ctx.ev.filter(e => e.type === 'goal').forEach(e => { tally[e.scorer] = (tally[e.scorer] || 0) + 1; });
  Object.entries(tally).forEach(([id, n]) => {
    if (n >= 3) {
      const e = ctx.ev.find(x => x.scorer === +id);
      const et = teamOf(e.team);
      if (et) news(G, 'match', `${e.sName} scores a hat-trick for ${et.s}.`);
    }
  });
}

function injWeeks(p) { return Math.max(1, Math.round((p.inj || 0) * DAYS_PER_ROUND / 7)); } function injBack(p) { const d = new Date(new Date(currentDateISO() + 'T12:00:00Z').getTime() + (p.inj || 0) * DAYS_PER_ROUND * 86400000); return `${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()].slice(0, 3)}`; } function tickInjuries(G) { G.teams.forEach(t => t.squad.forEach(p => { const was = p.inj > 0; if (p.dty > 0) p.dty--; if (p.inj > 0) p.inj--; p.sta = Math.min(100, staOf(p) + STA_REC + (p.stp ? 0 : STA_REST)); delete p.stp; if (was && p.inj <= 0) { if ((p.injLen || 0) >= 4) { p.sta = Math.min(p.sta, 50); if (t.id === G.myTeam) news(G, 'match', `${p.name} is back after ${p.injLen} matches out, but not match fit. Ease him back in.`); } p.injLen = 0; } })); }
/* ---- board and fans: confidence and loyalty react to runs of form, mails mark the big moments ---- */
function boardFansTick(G, m) {
  if (G.jobless || (m.h !== G.myTeam && m.a !== G.myTeam)) return;
  const t = G.teams[G.myTeam], f = t.form || [], last = f[f.length - 1], st = stadiumOf(t), rd = G.round + 1;
  const bump = d => { G.board = clamp((G.board != null ? G.board : 62) + d, 0, 100); };
  const loy = d => { st.loyalty = clamp((st.loyalty != null ? st.loyalty : 50) + d, 0, 100); };
  const k = x => `bf:${G.season}:${x}`;
  bump(last === 'W' ? 0.6 : last === 'L' ? -0.8 : 0);
  const l5 = f.slice(-5), l4 = f.slice(-4), n = f.length;
  if (n >= 5 && l5.every(x => x === 'W') && (n < 6 || f[0] !== 'W') &&
    mail(G, { cat: 'general', from: 'Supporters Trust', key: k('win' + rd), subject: 'The fans are buzzing', body: [`Five wins in a row has the stands rocking. The supporters believe something special is building at ${t.n}.`, 'The board are delighted with the run.'] })) { bump(3); loy(3); }
  if (n >= 5 && !l5.includes('W') && (n < 6 || f[0] === 'W') &&
    mail(G, { cat: 'general', from: 'Board of Directors', flag: true, key: k('dry' + rd), subject: 'Pressure is building', body: [`Five matches without a win. The board expect an improvement, and the fans are growing restless.`, 'A win soon would settle things down.'] })) { bump(-4); loy(-3); }
  if (n >= 4 && l4.every(x => x === 'L') && (n < 5 || f[n - 5] !== 'L') &&
    mail(G, { cat: 'general', from: 'Supporters Trust', flag: true, key: k('lose' + rd), subject: 'The fans are angry', body: [`Four defeats in a row. Banners have gone up outside the ground calling for answers.`, 'Turn the form around before the board lose patience.'] })) { bump(-3); loy(-4); }
  const pos = posOfTeam(G, t.id);
  if (rd >= 8 && pos === 1 && mail(G, { cat: 'general', from: 'Board of Directors', key: k('top'), subject: 'Top of the table', body: [`${t.n} sit top of the table. The board and the supporters are delighted.`, 'Keep it going.'] })) { bump(2); loy(2); }
  if (rd >= 8 && pos >= TIER_SIZE - 2 && mail(G, { cat: 'general', from: 'Board of Directors', flag: true, key: k('drop' + Math.floor(rd / 8)), subject: 'Concern over the league position', body: [`${t.n} are ${ordinal(pos)} and the board are worried about the drop.`, 'They expect the team to climb the table.'] })) { bump(-3); loy(-2); }
}
function tableUpdate(G, tier, m) {
  const tb = G.tables[tier];
  const rh = tb.find(r => r.id === m.h), ra = tb.find(r => r.id === m.a);
  rh.p++; ra.p++; rh.gf += m.hg; rh.ga += m.ag; ra.gf += m.ag; ra.ga += m.hg;
  if (m.hg > m.ag) { rh.w++; ra.l++; rh.pts += 3; }
  else if (m.hg < m.ag) { ra.w++; rh.l++; ra.pts += 3; }
  else { rh.d++; ra.d++; rh.pts++; ra.pts++; }
  const f = m.hg > m.ag ? 'W' : m.hg < m.ag ? 'L' : 'D';
  G.teams[m.h].form.push(f); G.teams[m.a].form.push(f === 'W' ? 'L' : f === 'L' ? 'W' : 'D');
  [m.h, m.a].forEach(id => { if (G.teams[id].form.length > 6) G.teams[id].form.shift(); });   try { boardFansTick(G, m); } catch (e) { console.error('boardFans', e); }   try { recMatch(G, m); } catch (e) { console.error('records', e); }
  /* gate money */
   { const ht = G.teams[m.h], k = Math.min(ht.tier, 4);     matchdayIncome(G, ht, m);     /* hospitality is now part of matchdayIncome */     const star = clamp((Math.max.apply(null, ht.squad.map(p => p.rating)) - 70) / 50, 0, 0.5);     const shirts = [0.24, 0.05, 0.015, 0.006, 0.003][k] * (0.6 + ht.rep * 0.08) * (1 + star) * kitBoost(ht);     payIncome(G, ht.id, shirts, 'sponsor', 'Shirt sales');     payIncome(G, ht.id, shirts * 0.35, 'sponsor', 'Club shop & merchandise'); }
  /* match bonus: win = full, draw = a third each */
  const wb = [0.5, 0.14, 0.05, 0.02, 0.01][tier] || 0.01;
  if (m.hg > m.ag) payPrize(G, m.h, wb, 'win bonus');
  else if (m.hg < m.ag) payPrize(G, m.a, wb, 'win bonus');
  else { payPrize(G, m.h, wb / 3, 'draw bonus'); payPrize(G, m.a, wb / 3, 'draw bonus'); }
}

function sortTable(G, tier) {
  return G.tables[tier].slice().sort((a, b) =>
    b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf || G.teams[a.id].n.localeCompare(G.teams[b.id].n));
}
function posOfTeam(G, id) { return sortTable(G, G.teams[id].tier).findIndex(r => r.id === id) + 1; }

function myMatchIndex(G, round) {
  const t = G.teams[G.myTeam];
  const rd = G.fixtures[t.tier][round];
  if (!rd) return -1;
  return rd.findIndex(m => m.h === G.myTeam || m.a === G.myTeam);
}

function commitMatch(G, tier, m, ctx) {
  m.hg = ctx.hg; m.ag = ctx.ag; m.played = true;   if (ctx.forfeit) { m.forfeit = ctx.forfeit; m.fine = ctx.fine || 0; }
  m.ev = ctx.ev.filter(e => e.type === 'goal');
  m.allEv = ctx.ev;
  m.potm = ctx.potm || null; m.rt = (ctx.h === G.myTeam || ctx.a === G.myTeam) ? ctx.ratings : null;   if (ctx.h === G.myTeam || ctx.a === G.myTeam) {     if (ctx.xgP) m.xg = tacSumXG(ctx);     m.tc = { h: tacCode(ctx.tacH || TAC_DEFAULT), a: tacCode(ctx.tacA || TAC_DEFAULT) };   }
  tableUpdate(G, tier, m);
}

/* plays every fixture in the current round. skipMine = the user's match was played live */
function playRound(G, skipMine) {
if (G.round >= totalRounds(G)) return null;
  if (cupDueNow(G) || contPending()) return null;
  tickInjuries(G);
  try { intlRoundHook(G); } catch (e) { console.error('intl', e); }
  const out = { round: G.round + 1, tiers: TIER_NAMES.map(() => []), cup: null };
  for (let tier = 0; tier < TIER_NAMES.length; tier++) {
    G.fixtures[tier][G.round].forEach(m => {
      if (m.played) { out.tiers[tier].push(m); return; }
      if (skipMine && (m.h === G.myTeam || m.a === G.myTeam)) { out.tiers[tier].push(m); return; }
      const ctx = createMatch(G, m.h, m.a, false);
      runPeriod(G, ctx, 1, 45);
      simSubs(G, ctx);
      runPeriod(G, ctx, 46, 92);
      finishMatch(G, ctx);
      commitMatch(G, tier, m, ctx);
      out.tiers[tier].push(m);
    });
  }
  G.round++;
  /* keep the calendar in step with the matchday just played */
  G.curDay = Math.max(G.curDay || 0, (G.round - 1) * DAYS_PER_ROUND) + 1;
  G.teams.forEach(t => { t.fin.wages += t.wageBill / totalRounds(G); payIncome(G, t.id, TV_BASE[Math.min(t.tier, 4)] / totalRounds(G), 'sponsor', 'TV: League broadcast rights'); });
  if (G.round % 3 === 0) {
    G.teams.forEach(t => {
      const sp = t.currentSponsor;
      if (sp && sp.freq === 'monthly' && sp.paidSoFar < sp.amount - 0.001) {
        const per = Math.round((sp.amount / sp.installments) * 100) / 100;
        const pay = Math.min(per, Math.round((sp.amount - sp.paidSoFar) * 100) / 100);
        t.budget = Math.round((t.budget + pay) * 100) / 100;
        t.fin.sponsor = Math.round(((t.fin.sponsor || 0) + pay) * 100) / 100; noteInc(t, 'Shirt sponsor: ' + sp.name, pay);
        sp.paidSoFar = Math.round((sp.paidSoFar + pay) * 100) / 100;
      }
    });
  }
  try { trainingTick(G); } catch (e) { console.error('Training error', e); }
  africaRound(G);
  if (S8_AT.includes(G.round)) out.s8 = playKnockoutRound(G, G.super8, S8_ROUNDS, 6);
  if (KO_AT.includes(G.round)) out.ko = playKnockoutRound(G, G.knockout, KO_ROUNDS, 7);
  if (CAF_AT.includes(G.round) && !contHold(G, 'caf')) out.caf = playCAFRound(G);
  if (CONFED_AT.includes(G.round) && !contHold(G, 'confed')) out.confed = playConfedRound(G);
  if (G.round >= totalRounds(G)) {
    let guard = 0;
    while (!G.cup.done && guard++ < 10) playCupRound(G);
    guard = 0; while (!G.super8.done && guard++ < 6) playKnockoutRound(G, G.super8, S8_ROUNDS, 6);
    guard = 0; while (!G.knockout.done && guard++ < 8) playKnockoutRound(G, G.knockout, KO_ROUNDS, 7);
    guard = 0; while (G.africa.caf && !G.africa.caf.done && guard++ < 8) playCAFRound(G);
    guard = 0; while (G.africa.confed && !G.africa.confed.done && guard++ < 8) playConfedRound(G);
    while (G.africa.leagues[0].round < G.africa.leagues[0].fixtures.length) africaRound(G);
    G.finished = true;
  }
  aiTransferTick(G);
  moraleTick(G);
  try { if (!G.jobless) inboxTick(G); } catch (e) { console.error('Inbox error', e); }   try { personalFlavorTick(G); } catch (e) { console.error('Personal mail error', e); }   try { managerTick(G); } catch (e) { console.error('Manager tick error', e); }   try { bthTick(G); } catch (e) { console.error('Bathini tick error', e); }   return out; }  function personalFlavorTick(G) {   const t = G.teams[G.myTeam]; if (!t) return;   const sender = () => pick(['Mom', 'Dad', 'Your Brother', 'Your Sister', 'An Old Friend', 'Your Cousin']);   if (G.manager.dob) {     const cur = dateForRound(G.round, G.season);     const cy = cur.split('-')[0], cm = cur.split('-')[1], cd = cur.split('-')[2];     const bm = G.manager.dob.split('-')[1], bd = G.manager.dob.split('-')[2];     if (cm === bm && cd === bd) {       mail(G, { key: 'bday_' + cy, cat: 'personal', from: sender(), subject: 'Happy Birthday!', flag: true,         body: [`Happy birthday! Hope ${t.n} are treating you well.`, `We've sent something in the post for you — should arrive any day now. Have a great one.`] });     }   }   if ((G.manager.clubs || []).length > 1 && rnd() < 0.015) {     const prev = G.manager.clubs[G.manager.clubs.length - 2];     const prevClub = G.teams[prev.id];     if (prevClub) mail(G, { key: 'oldboss_' + G.season, cat: 'personal', from: `Former Chairman, ${prevClub.n}`, subject: 'Just checking in',       body: [`Thought I'd drop you a line to see how things are going at ${t.n}.`, `We still talk about your time here at ${prevClub.n}. The door's always open if you ever fancy a reunion.`] });   }   if ((G.manager.clubs || []).length > 1 && rnd() < 0.015) {     const prev = G.manager.clubs[rint(0, G.manager.clubs.length - 2)];     const prevClub = G.teams[prev.id];     if (prevClub) {       const nm = personName(prevClub.squad && prevClub.squad[0] ? prevClub.squad[0].nat : 'ZA');       mail(G, { key: 'oldplayer_' + G.season, cat: 'personal', from: `${nm.first} ${nm.last}`, subject: 'Thank you, Boss',         body: [`You probably don't remember me, but you gave me one of my first chances back at ${prevClub.n}.`, `Just wanted to say thank you — I think about that often. Hope you're doing well.`] });     }   } }  /* ---------------- morale / unrest ---------------- */ /* ================= PLAYER MOOD, PERSONALITY & DRESSING-ROOM HARMONY ================= */ const MOOD_TRAITS = {   pro: { l: 'Professional', d: 'Keeps his head down. Bad news hits him less, and he steadies the dressing room.' },   amb: { l: 'Ambitious', d: 'Wants to win things. Cares a lot about the club\'s level, its league position and his own progress.' },   loy: { l: 'Loyal', d: 'Attached to the club. Forgives a lot, loves playing for the club that raised him, and rarely asks to leave.' },   mer: { l: 'Mercenary', d: 'Follows the money. Very sensitive to his wage and to what his teammates earn.' },   tem: { l: 'Temperamental', d: 'Wears his heart on his sleeve. Bad news hits harder, and he can clash with rivals for his place.' },   lea: { l: 'Leader', d: 'A natural captain. Lifts the dressing room when settled and wants the armband.' },   tea: { l: 'Team player', d: 'Happy to rotate. Cares more about the team\'s results than his own minutes.' },   hun: { l: 'Hungry', d: 'Needs to play. Playing time, and being dropped, affect him far more.' },   men: { l: 'Mentor', d: 'From 26 he guides the younger players, lifting their mood and settling the group.' },   hom: { l: 'Homesick', d: 'Misses home. Struggles if there is no countryman in the squad.' } }; const MOOD_TRAIT_W = [['pro', 14], ['amb', 12], ['loy', 10], ['mer', 8], ['tem', 7], ['lea', 6], ['tea', 12], ['hun', 9], ['men', 6], ['hom', 6]]; const MOOD_CLASH = { loy: ['mer'], mer: ['loy', 'tea'], pro: ['tem'], tem: ['pro'], tea: ['mer', 'hun'], hun: ['tea'] }; const MOOD_TR = new Map(); function moodHash(n) { let h = (n * 2654435761) >>> 0; h ^= h >>> 15; h = Math.imul(h, 2246822519) >>> 0; h ^= h >>> 13; return h >>> 0; } /* a player's personality never changes: it comes from his id, so old saves and every club have it */ function traitsOf(p) {   let r = MOOD_TR.get(p.id); if (r) return r;   let h = moodHash(p.id * 7919 + 17); const out = [];   const pool = MOOD_TRAIT_W.filter(([k]) => !(k === 'hom' && p.nat === 'ZA'));   for (let n = 0; n < 2; n++) {     const bad = out.reduce((a, k) => a.concat(MOOD_CLASH[k] || []), []);     const opts = pool.filter(([k]) => !out.includes(k) && !bad.includes(k));     const tot = opts.reduce((s, [, w]) => s + w, 0);     let x = (h % 1000) / 1000 * tot; h = moodHash(h + 101);     for (const [k, w] of opts) { if ((x -= w) < 0) { out.push(k); break; } }   }   MOOD_TR.set(p.id, out); return out; } function mhas(p, k) { return traitsOf(p).includes(k); } function moodLabel(m) {   return m >= 82 ? ['Delighted', 'm5'] : m >= 68 ? ['Happy', 'm4'] : m >= 52 ? ['Content', 'm3'] : m >= 38 ? ['Unsettled', 'm2'] : m >= 24 ? ['Unhappy', 'm1'] : ['Furious', 'm0']; } function harmLabel(v) { return v >= 75 ? 'Harmonious' : v >= 60 ? 'Good' : v >= 45 ? 'Fine' : v >= 30 ? 'Strained' : 'Toxic'; } function moodCtx(G, t) {   const sorted = t.squad.filter(p => !p.reserve).slice().sort((a, b) => b.rating - a.rating), rank = {};   sorted.forEach((p, i) => { rank[p.id] = i + 1; }); t.squad.forEach(p => { if (rank[p.id] == null) rank[p.id] = 99; });   const nat = {}; t.squad.forEach(p => { nat[p.nat] = (nat[p.nat] || 0) + 1; });   return { xi: new Set(t.lineup || []), rank, nat, N: G.teams.filter(x => x.tier === t.tier).length, pos: posOfTeam(G, t.id),     mentors: t.squad.filter(p => p.age >= 26 && mhas(p, 'men')), form: (t.form || []).slice(-5), slots: FORMATIONS[t.formation] || [], idx: (t.lineup || []).slice() }; } /* every reason a player is happy or unhappy right now, and how much it moves his mood */ function moodTarget(G, t, p, c) {   const F = [], clampv = (v, a, b) => v < a ? a : v > b ? b : v;   const add = (k, s, w, mult, text) => { const v = s * w * mult; if (Math.abs(v) >= 1.5) F.push({ k, v, text }); };   const has = k => mhas(p, k), r = Math.max(1, G.round), rank = c.rank[p.id] || 99, inXI = c.xi.has(p.id);   /* playing time */   let exp = rank <= 11 ? 0.72 : rank <= 16 ? 0.3 : 0.15; if (p.age <= 20) exp = Math.min(exp, 0.15);   let s = G.round < 4 ? (inXI ? 0.5 : rank <= 16 ? 0 : -0.2) : clampv((Math.min(1, p.apps / r) - exp) / 0.35, -1, 1);   if (p.inj > 0) s = Math.max(s, -0.2);   if (p.reserve) s = Math.min(s, -0.6);   const mPlay = (has('hun') ? 1.5 : 1) * (has('tea') ? 0.6 : 1) * (has('loy') && s < 0 ? 0.85 : 1);   add('play', s, 30, mPlay, s >= 0.45 ? `A regular in the team (${p.apps} appearances)` : s >= 0.15 ? 'Getting enough game time' : p.reserve ? 'Moved to the reserves' : p.apps === 0 ? `Has not played in ${G.round} games and expected more` : `Only ${p.apps} appearance${p.apps === 1 ? '' : 's'} in ${G.round} games and expected more`);   /* pay */   const fair = wageFor(p.rating, p.age, t.tier != null ? t.tier : 0), ratio = p.wage / (fair || 1);   const sw = ratio >= 1.5 ? 0.8 : ratio >= 1.15 ? 0.4 : ratio >= 0.8 ? 0 : ratio >= 0.6 ? -0.5 : -1;   add('wage', sw, 16, (has('mer') ? 1.8 : 1) * (has('loy') && sw < 0 ? 0.7 : 1), sw > 0 ? 'Well paid for his level' : `Underpaid: earns ${money(p.wage)}, worth about ${money(fair)}`);   let jq = null; t.squad.forEach(q => { if (q !== p && q.wage > p.wage * 1.45 && q.rating <= p.rating - 3 && (!jq || q.wage / p.wage > jq.wage / p.wage)) jq = q; });   if (jq) add('jeal', -clampv((jq.wage / p.wage - 1.4) / 1.2, 0.3, 1), 10, (has('mer') ? 1.5 : 1) * (has('tem') ? 1.3 : 1), `Earns far less than ${jq.name}, who is rated lower`);   /* contract */   if (p.contract >= 4) add('contract', 0.4, 8, 1, 'Secure long-term contract');   else if (p.contract <= 1 && G.round >= 6) add('contract', -0.5, 8, (has('mer') ? 1.3 : 1) * (has('loy') ? 0.6 : 1), 'Contract is running down with no new deal');   /* club ambition */   const rel = c.N > 1 ? 1 - (c.pos - 1) / (c.N - 1) : 0.5; let sa = (rel - 0.5) * 2; if (G.round < 5) sa *= 0.4;   const gap = p.rating - clubLevel(t); if (gap > 5) sa -= clampv((gap - 5) / 12, 0, 0.8);   add('amb', sa, 9, (has('amb') ? 1.4 : 1) * (has('loy') && sa < 0 ? 0.7 : 1) * (has('mer') ? 0.9 : 1), sa >= 0 ? `The club is flying: ${ordinal(c.pos)} in the table` : gap > 8 ? 'Feels he has outgrown the club' : `Unhappy with the club's league position (${ordinal(c.pos)})`);   /* courted: other clubs are circling */   courtedFactor(G, t, p, add, has);   /* results */   if (c.form.length >= 3) { const sf = c.form.reduce((a, f) => a + (f === 'W' ? 1 : f === 'L' ? -1 : 0), 0) / c.form.length; add('res', sf, 6, has('tea') ? 1.4 : 1, sf > 0 ? 'The team is in great form' : 'The poor run of results is hurting him'); }   /* position and role */   const ix = c.idx.indexOf(p.id);   if (ix >= 0) {     const slot = c.slots[ix], pen = slot ? posPenalty(p, slot) : 0, role = t.roles && t.roles[ix];     if (pen > 0) add('fit', -clampv(pen / 8, 0, 1), 10, has('pro') ? 0.6 : 1, `Playing out of position at ${slot}`);     else if (role && TAC_ROLES[role] && TAC_ROLE_GROUP[slot] === TAC_ROLES[role].g) add('fit', 0.5, 10, 1, `Enjoying his role as a ${TAC_ROLES[role].l.toLowerCase()}`);     else add('fit', 0.25, 10, 1, 'Settled in his best position');   }   /* status */   if (t.captainId === p.id) add('status', 0.9, 8, has('lea') ? 1.6 : 1, 'Proud to wear the armband');   else if (t.viceCaptainId === p.id) add('status', 0.4, 8, 1, 'Trusted as vice-captain');   else if (has('lea') && p.age >= 26 && rank <= 3) add('status', -0.5, 8, 1.6, 'Feels he should be captain');   /* injury */   if (p.inj > 6) add('inj', -0.4, 6, (has('pro') ? 0.5 : 1) * (has('tea') ? 0.7 : 1), 'Frustrated by a long injury layoff');   /* development */   if (p.age <= 23) {     const gr = p.rating - (p.startRating || p.rating);     if (gr >= 3) add('dev', 0.7, 8, has('amb') ? 1.4 : 1, `Developing quickly (+${gr} this season)`);     else if (gr <= 0 && (p.pot || p.rating) - p.rating >= 6 && G.round >= 10) add('dev', -0.5, 8, has('amb') ? 1.4 : 1, 'Feels he is not progressing');   }   /* roots */   if (developedBy(p) === t.id) add('home', 0.5, 6, has('loy') ? 1.8 : 1, 'Playing for the club that raised him');   if (isClubLegend(G, p, t.id)) add('legend', 0.6, 6, 1, 'A club legend, adored by the fans');   if (p.nat !== 'ZA') {     const mates = (c.nat[p.nat] || 1) - 1;     if (!mates) add('iso', -0.4, 6, has('hom') ? 2.2 : 1, 'Feels isolated with no countryman in the squad');     else if (mates >= 2) add('iso', 0.3, 6, 1, 'Settled among his countrymen');   }   /* mentors */   if (p.age <= 21 && c.mentors.some(m => m !== p)) { const m = c.mentors.filter(x => x !== p).sort((a, b) => (b.mood || 0) - (a.mood || 0))[0]; add('mentor', 0.5, 6, 1, `Learning from ${m.name}`); }   else if (has('men') && p.age >= 26 && t.squad.some(q => q.age <= 21)) add('mentor', 0.3, 6, 1, 'Enjoys guiding the young players');   /* short-lived events: awards, bust-ups, dropped, new deals, promises */   (p.mv || []).forEach(e => F.push({ k: e.k, v: e.v, text: e.txt, ev: true }));   /* personality shapes how bad news lands */   const neg = (has('pro') ? 0.8 : 1) * (has('tem') ? 1.25 : 1);   F.forEach(f => { if (f.v < 0) f.v *= neg; });   const sum = F.reduce((a, f) => a + f.v, 0);   const eff = sum > 0 ? 34 * (1 - Math.exp(-sum / 34)) : sum;   return { mood: clampv(56 + eff, 3, 97), factors: F.sort((a, b) => b.v - a.v) }; } function moodShown(G, t, p, c) {   const st = moodTarget(G, t, p, c || moodCtx(G, t));   return { mood: p.mood != null ? p.mood : st.mood, factors: st.factors }; } function moodWorst(F, noEv) { return F.filter(f => f.v < 0 && !(noEv && f.ev)).sort((a, b) => a.v - b.v)[0]; } function moodAddEv(p, k, v, left, txt) { p.mv = (p.mv || []).filter(e => e.k !== k); p.mv.push({ k, v, left, txt }); } function moodHarmFx(t) { return t && t.harm ? Math.max(-2.2, Math.min(1.4, (t.harm.v - 62) / 35 * 1.6)) : 0; } function harmonyOf(G, t, c) {   const list = t.squad.filter(p => p.mood != null), parts = [];   if (!list.length) return { v: 62, parts };   const top = list.slice().sort((a, b) => b.rating - a.rating).slice(0, 18), w = p => c.xi.has(p.id) ? 1 : 0.6;   let v = top.reduce((s, p) => s + p.mood * w(p), 0) / top.reduce((s, p) => s + w(p), 0); parts.push(['Average squad mood', Math.round(v), true]);   const note = (txt, d) => { if (!d) return; v += d; parts.push([txt, d]); };   const unh = list.filter(p => p.mood < 30).length; if (unh) note(`${unh} unhappy player${unh > 1 ? 's' : ''}`, -Math.min(18, unh * 4));   const tem = list.filter(p => mhas(p, 'tem') && p.mood < 45).length; if (tem) note(`${tem} temperamental player${tem > 1 ? 's' : ''} on edge`, -Math.min(12, tem * 5));   const calm = list.filter(p => (mhas(p, 'lea') || mhas(p, 'pro')) && p.mood >= 60).length; if (calm) note('Leaders and professionals keep order', Math.min(9, calm * 3));   if (list.some(p => mhas(p, 'men') && p.age >= 26 && p.mood >= 55) && list.some(p => p.age <= 21)) note('Mentors guide the youngsters', 3);   const cap = list.find(p => p.id === t.captainId);   if (cap && cap.mood >= 70) note(`Captain ${cap.last || cap.name} is settled`, 3); else if (cap && cap.mood < 38) note(`Captain ${cap.last || cap.name} is unhappy`, -6);   const iso = list.filter(p => p.nat !== 'ZA' && !list.some(q => q !== p && q.nat === p.nat)).length; if (iso >= 3) note('Foreign players feel isolated', -3);   return { v: Math.max(0, Math.min(100, v)), parts }; } function moodLastMatch(G, t) {   const rd = G.fixtures[t.tier] && G.fixtures[t.tier][G.round - 1];   return rd ? rd.find(m => m.played && (m.h === t.id || m.a === t.id)) : null; } function moraleTick(G) {   moraleTickBase(G);   try { moodTick(G); } catch (e) { console.error('Mood error', e); } } /* ---- promises: starts count in full, substitute appearances as half ---- */
function playPts(p) { return (p.apps || 0) - (p.sApps || 0) * 0.5; }
function promiseTag(p) { const pr = p.pr; if (!pr) return ''; return pr.k === 'min' ? `${Math.max(0, Math.min(pr.need, playPts(p) - pr.a0))}/${pr.need}` : 'pay'; }
function promiseText(p) {
  const pr = p.pr; if (!pr) return '';
  const left = Math.max(0, pr.by - G.round), lt = `${left} match${left === 1 ? '' : 'es'} left`;
  return pr.k === 'min' ? `${Math.max(0, Math.min(pr.need, playPts(p) - pr.a0))} of ${pr.need} starts so far, ${lt}` : `a better contract or wage within ${lt}`;
} function moodTick(G) {   const t = G.teams[G.myTeam]; if (!t) return;   let c = moodCtx(G, t); const last = moodLastMatch(G, t), ev = last ? (last.allEv || []) : [];   t.squad.forEach(p => {     if (p.mood == null) { p.mood = Math.round(moodTarget(G, t, p, c).mood); p.trust = 60; p.mv = []; p.cw = [p.contract, p.wage]; p.apa = p.apps; p.ps = 0; return; }     /* what happened since the last matchday */     const played = p.apps > (p.apa || 0), fit = p.inj <= 0 && !banLeft(p, t);     if (played) { if ((p.ps || 0) <= -3 && !p.reserve) moodAddEv(p, 'recalled', 6, 2, 'Back in the team'); p.ps = (p.ps || 0) > 0 ? p.ps + 1 : 1; }     else { if ((p.ps || 0) >= 3 && fit && !p.reserve) moodAddEv(p, 'dropped', mhas(p, 'tea') ? -4 : mhas(p, 'hun') ? -13 : -9, 3, 'Dropped from the starting XI'); p.ps = (p.ps || 0) < 0 ? p.ps - 1 : -1; }     p.apa = p.apps;     if (last && last.potm && last.potm.id === p.id) moodAddEv(p, 'potm', 9, 4, 'Delighted after his Player of the Match display');     const g = ev.filter(e => e.type === 'goal' && e.scorer === p.id).length; if (g >= 2) moodAddEv(p, 'goals', 7, 3, 'Buzzing after his goals');     if (ev.some(e => e.type === 'card' && e.card === 'red' && e.scorer === p.id)) moodAddEv(p, 'red', mhas(p, 'pro') ? -6 : -10, 3, 'Furious with himself after being sent off');     if (p.contract > p.cw[0] || p.wage > p.cw[1] * 1.04) moodAddEv(p, 'newdeal', 12, 8, 'Delighted with his new contract');     p.cw = [p.contract, p.wage];     /* promises made in a one-to-one */     if (p.pr) {       const pr = p.pr, kept = pr.k === 'min' ? playPts(p) - pr.a0 >= pr.need : (p.wage >= pr.w0 * 1.05 || p.contract > pr.c0);       if (kept || G.round >= pr.by) {         if (kept) { moodAddEv(p, 'kept', 10, 6, 'Pleased that you kept your word'); p.trust = Math.min(100, (p.trust || 60) + 10); }         else {           moodAddEv(p, 'broken', -16, 8, 'Let down by a broken promise'); p.trust = Math.max(5, (p.trust || 60) - 25);           mail(G, { key: 'brk_' + p.id + '_' + G.round, cat: 'request', from: p.name, p, club: t, status: 'Promise broken', flag: true, subject: `Broken promise: ${p.name}`,             body: [`Boss, you did not keep your word about ${pr.k === 'min' ? 'giving me more game time' : 'a new contract'}.`, 'It will be harder for me to trust your promises next time. Open my profile to see how I feel.'], act: 'squad' });         }         p.pr = null;       }     }     p.mv = (p.mv || []).map(e => Object.assign({}, e, { left: e.left - 1 })).filter(e => e.left > 0);   });   c = moodCtx(G, t); const unhCand = [];   t.squad.forEach(p => {     const tg = moodTarget(G, t, p, c).mood; p.mood = Math.round(p.mood + (tg - p.mood) * 0.45);     p.unh = (p.mood < 27 || courtedRestless(G, t, p)) ? (p.unh || 0) + 1 : Math.max(0, (p.unh || 0) - 1);     if (p.wantsOut && p.mood >= 62 && !p.unh) p.wantsOut = false;     if (p.unh >= 5 && !p.wantsOut) {       p.wantsOut = true;       const w = moodWorst(moodTarget(G, t, p, c).factors);       news(G, 'transfer', `${p.name} asks to leave ${t.s}.`);       mail(G, { key: 'unhreq_' + p.id + '_' + G.season, cat: 'request', from: p.name, p, club: t, status: 'Wants to leave', flag: true, subject: `Transfer Request: ${p.name}`,         body: [`Boss, I have been unhappy for weeks and I would like to leave ${t.n}.`, w ? `The main issue: ${w.text.charAt(0).toLowerCase() + w.text.slice(1)}.` : 'I feel the situation will not improve.', 'You can have a word with me, or listen to offers.'], act: 'squad' });     } else if (p.mood < 34 && (p.umr == null || G.round - p.umr >= 12) && !p.wantsOut) unhCand.push(p);   });   /* only the unhappiest player writes in each matchday, so the inbox is not flooded */   const worstP = unhCand.sort((a, b) => a.mood - b.mood)[0];   if (worstP) {     const p = worstP; p.umr = G.round; const w = moodWorst(moodTarget(G, t, p, c).factors);     mail(G, { cat: 'request', from: p.name, p, club: t, status: 'Unhappy', flag: true, subject: `Unhappy: ${p.name}`,       body: [`Boss, I am unhappy at ${t.n}.`, w ? `The main issue: ${w.text.charAt(0).toLowerCase() + w.text.slice(1)}.` : 'I have a number of small grievances.', 'Open my profile and have a word with me before it gets worse.'], act: 'squad' });   }   /* dressing-room incidents: at most one a matchday */   const live = t.squad.filter(p => p.mood != null && p.inj <= 0);   const incident = () => {     if (G.round - (t.lastInc == null ? -99 : t.lastInc) < 6) return false;     const tems = live.filter(p => mhas(p, 'tem') && p.mood < 60);     for (const a of tems) {       const b = live.find(q => q !== a && POS_GROUP[q.pos] === POS_GROUP[a.pos] && Math.abs(q.rating - a.rating) <= 5 && q.mood < 65);       if (b && rnd() < 0.2) {         moodAddEv(a, 'clash', -9, 4, `Bust-up with ${b.name}`); moodAddEv(b, 'clash', -9, 4, `Bust-up with ${a.name}`);         mail(G, { cat: 'discipline', from: 'Assistant Manager', p: a, club: t, status: 'Training ground bust-up', flag: true, subject: `Bust-up: ${a.name} and ${b.name}`,           body: [`${a.name} and ${b.name} clashed in training. Both are fighting for the same place and tempers are short.`, 'Their mood has dropped for a few matches. Rotating them, or having a word, will help.'], act: 'squad' });         return true;       }     }     const lk = live.filter(p => mhas(p, 'tem') && p.mood < 28)[0];     if (lk && rnd() < 0.15) { news(G, 'transfer', `${lk.name} airs his frustrations in the press at ${t.s}.`); live.forEach(p => moodAddEv(p, 'press', -2, 3, 'Unsettled by negative headlines')); return true; }     const men = live.find(p => mhas(p, 'men') && p.age >= 26 && p.mood >= 55), yg = men && live.find(p => p.age <= 21 && !p.pm && p !== men);     if (men && yg && rnd() < 0.12) {       yg.pm = G.season; moodAddEv(yg, 'mentored', 7, 8, `Inspired by ${men.name}'s guidance`);       mail(G, { key: 'mnt_' + yg.id + '_' + G.season, cat: 'general', from: 'Assistant Manager', p: yg, club: t, status: 'Settling in well', subject: `${men.name} takes ${yg.name} under his wing`,         body: [`${men.name} has been spending extra time with ${yg.name} and the young player is thriving on it.`, 'Having senior players like this is good for the dressing room.'], act: 'squad' });       return true;     }     const lead = live.find(p => mhas(p, 'lea') && p.mood >= 60);     if (lead && c.form.length >= 3 && c.form.slice(-3).every(f => f === 'L') && rnd() < 0.5) {       live.forEach(p => moodAddEv(p, 'rally', 5, 3, `Rallied by ${lead.name}'s words`));       mail(G, { cat: 'general', from: 'Assistant Manager', p: lead, club: t, status: 'Takes charge', subject: `${lead.name} rallies the squad`, body: [`After the run of defeats, ${lead.name} gathered the players for a frank talk.`, 'The mood in the camp has lifted.'], act: 'squad' });       return true;     }     return false;   };   if (incident()) t.lastInc = G.round;   t.harm = harmonyOf(G, t, moodCtx(G, t)); }  /* ---------- player profile: mood, personality, a word with him ---------- */ function moodPanelHTML(p, t) {   const tr = traitsOf(p), chips = tr.map(k => `<span class="mtrait" title="${esc(MOOD_TRAITS[k].d)}">${MOOD_TRAITS[k].l}</span>`).join('');   const desc = tr.map(k => `<p class="hint" style="margin:0 0 3px"><b>${MOOD_TRAITS[k].l}.</b> ${esc(MOOD_TRAITS[k].d)}</p>`).join('');   const inClub = t && t.squad.includes(p);   if (!inClub) return `<div class="panel moodp"><h3>Personality</h3><div class="pad"><div class="moodtraits">${chips}</div>${desc}</div></div>`;   const mine = t.id === G.myTeam, st = moodShown(G, t, p), [lab, cls] = moodLabel(st.mood);   const pip = v => { const n = Math.abs(v) >= 12 ? 3 : Math.abs(v) >= 6 ? 2 : 1; return '●'.repeat(n) + '○'.repeat(3 - n); };   const li = arr => arr.length ? arr.map(f => `<div class="mi ${f.v > 0 ? 'up' : 'dn'}"><span class="pips">${pip(f.v)}</span>${esc(f.text)}</div>`).join('') : '<div class="hint">Nothing in particular.</div>';   const ups = st.factors.filter(f => f.v > 0), downs = st.factors.filter(f => f.v < 0).reverse();   return `<div class="panel moodp"><h3>Mood<span class="sub">${mine ? 'how he feels at the club right now' : 'estimated from his situation at ' + esc(t.s)}</span></h3><div class="pad">     <div class="moodhead"><b class="mlabel ${cls}">${lab}</b><div class="mbar"><i class="${cls}" style="width:${Math.round(st.mood)}%"></i></div><span>${Math.round(st.mood)}</span></div>     <div class="moodcols"><div><h4>Happy about</h4>${li(ups)}</div><div><h4>Unhappy about</h4>${li(downs)}</div></div>     <h4 style="margin:12px 0 6px">Personality</h4><div class="moodtraits">${chips}</div>${desc}     ${mine ? `<div style="margin-top:10px"><button class="btn ghost sm" data-mood-talk="${p.id}">Have a word</button></div>` : ''}</div></div>`; } function moodTalk(pid) {   const t = me(), p = t.squad.find(x => x.id === pid); if (!p) return;   const c = moodCtx(G, t), st = moodTarget(G, t, p, c), worst = moodWorst(st.factors, true);   const trustMul = Math.max(0.4, Math.min(1.3, (p.trust == null ? 60 : p.trust) / 60));   const cool = p.talkAt != null && G.round - p.talkAt < 4;   const opts = [];   const k = worst ? worst.k : null;   if (k === 'play') {     opts.push(['Promise him a run in the team', 'He starts at least two of the next four matches (a substitute appearance counts as half), or he feels let down.', () => { p.pr = { k: 'min', need: 2, a0: playPts(p), by: G.round + 4 }; moodAddEv(p, 'talk', Math.round(10 * trustMul), 6, 'Reassured by your promise'); }]);     opts.push(['Tell him to earn his place', 'Honest, but not what he wants to hear.', () => { moodAddEv(p, 'talk', mhas(p, 'hun') || mhas(p, 'amb') ? -7 : mhas(p, 'pro') || mhas(p, 'tea') ? 3 : -3, 3, 'Told to earn his place'); p.trust = Math.min(100, (p.trust || 60) + 3); }]);   } else if (k === 'wage' || k === 'jeal' || k === 'contract') {     opts.push(['Promise a contract review', 'He expects improved terms within eight matches, or he feels let down.', () => { p.pr = { k: 'pay', w0: p.wage, c0: p.contract, by: G.round + 8 }; moodAddEv(p, 'talk', Math.round(9 * trustMul), 6, 'Reassured by your promise'); }]);     opts.push(['Explain the wage structure', 'Sensible, though a mercenary will not like it.', () => { moodAddEv(p, 'talk', mhas(p, 'mer') ? -5 : mhas(p, 'pro') ? 3 : -2, 2, 'Told how the wage structure works'); p.trust = Math.min(100, (p.trust || 60) + 3); }]);   } else if (k === 'amb') {     opts.push(['Sell him the project', 'Talk up where the club is going.', () => moodAddEv(p, 'talk', Math.round((mhas(p, 'amb') ? 3 : 6) * trustMul), 5, 'Sold on the club\'s plans')]);     opts.push(['Be honest about the club\'s level', 'Straight talk: it builds trust, but stings.', () => { moodAddEv(p, 'talk', -3, 3, 'Told the club\'s level'); p.trust = Math.min(100, (p.trust || 60) + 4); }]);   } else if (worst) {     opts.push(['Reassure him', 'Tell him you value him.', () => moodAddEv(p, 'talk', Math.round(5 * trustMul), 4, 'Reassured by the manager')]);     opts.push(['Explain your thinking', 'Professionals take it well.', () => { moodAddEv(p, 'talk', mhas(p, 'pro') ? 5 : 2, 4, 'Understands the manager\'s thinking'); p.trust = Math.min(100, (p.trust || 60) + 2); }]);   }   opts.push(['Praise him', 'A pat on the back always helps.', () => { moodAddEv(p, 'praise', Math.round(4 * trustMul), 4, 'Pleased by the manager\'s praise'); p.trust = Math.min(100, (p.trust || 60) + 2); }]);   const [lab] = moodLabel(p.mood != null ? p.mood : st.mood);   const body = cool ? `<p>You spoke to ${esc(p.name)} recently. He wants to see action, not more talk.</p>`     : `<p style="margin:0 0 8px">${esc(p.name)} is <b>${lab.toLowerCase()}</b>.${worst ? ` The main issue: ${esc(worst.text.charAt(0).toLowerCase() + worst.text.slice(1))}.` : ' He has no real complaints.'}</p>       ${p.pr ? `<p class="hint" style="margin:0 0 8px">You have already made him a promise: ${promiseText(p)}.</p>` : ''}       ${opts.map((o, i) => `<button class="prow" data-mt="${i}" style="grid-template-columns:1fr;text-align:left"><span class="who"><b>${esc(o[0])}</b><small>${esc(o[1])}</small></span></button>`).join('')}       <p class="hint" style="margin:8px 0 0">Trust ${Math.round(p.trust == null ? 60 : p.trust)}/100. Broken promises cost trust, and a player who does not trust you is hard to reassure.</p>`;   openModal(`A word with ${esc(p.name)}`, body, `<button class="btn sm" id="mtClose">Close</button>`);   $('#mtClose').onclick = () => playerModal(p.id);   document.querySelectorAll('#modal [data-mt]').forEach(b => b.onclick = () => {     if (p.mood == null) return;     opts[+b.dataset.mt][2](); p.talkAt = G.round;     const tg = moodTarget(G, t, p, moodCtx(G, t)).mood; p.mood = Math.round(p.mood + (tg - p.mood) * 0.6);     t.harm = harmonyOf(G, t, moodCtx(G, t)); save(); toast(`${p.name} is now ${moodLabel(p.mood)[0].toLowerCase()}.`); playerModal(p.id);   }); } document.addEventListener('click', e => { const b = e.target && e.target.closest && e.target.closest('[data-mood-talk]'); if (b) moodTalk(+b.dataset.moodTalk); });  /* ---------- squad hub: Dressing room tab ---------- */ function viewSquadHub() {   const v = $('#v-squad'); v.classList.add('mmx', 'sqv');   if (squadTab === 'dressing') { try { viewDressing(); } catch (e) { console.error('Dressing room error', e); squadTab = 'squad'; viewSquadHubBase(); } } else viewSquadHubBase(); } function viewDressing() {   const v = $('#v-squad'), t = me(), c = moodCtx(G, t);   const rows = t.squad.map(p => { const st = moodShown(G, t, p, c); return { p, m: st.mood, w: moodWorst(st.factors, true) || moodWorst(st.factors), b: st.factors.filter(f => f.v > 0)[0] }; }).sort((a, b) => a.m - b.m);   const h = t.harm || harmonyOf(G, t, c), fx = moodHarmFx({ harm: h });   const unh = rows.filter(r => r.m < 38).length, calm = t.squad.filter(p => (mhas(p, 'lea') || mhas(p, 'pro')) && (p.mood == null ? 60 : p.mood) >= 60).length;   v.innerHTML = sqTabsHTML(t) + sqTiles([['Harmony', `${harmLabel(h.v)} (${Math.round(h.v)})`, h.v >= 60 ? '#3ddc84' : h.v < 45 ? '#ff6b6b' : ''], ['Match effect', `${fx >= 0 ? '+' : ''}${fx.toFixed(1)}`, fx > 0.2 ? '#3ddc84' : fx < -0.2 ? '#ff6b6b' : ''], ['Unhappy players', unh, unh ? '#ff6b6b' : '#3ddc84'], ['Steadying figures', calm]]) +     `<div class="panel moodp"><h3>What is shaping the dressing room<span class="sub">harmony nudges every match: up to +1.4, down to −2.2 rating points</span></h3><div class="pad">       ${h.parts.length ? h.parts.map(([txt, d, base]) => `<div class="mi ${base ? '' : d > 0 ? 'up' : 'dn'}"><span class="pips">${base ? String(d) : (d > 0 ? '+' : '') + d}</span>${esc(txt)}</div>`).join('') : '<div class="hint">Play a matchday and the mood of the squad will start to show.</div>'}       <p class="hint" style="margin:8px 0 0">Keep your starters happy, give fringe players some minutes, and watch the temperamental ones. A settled captain and a few professionals help a lot.</p></div></div>     <div class="panel moodp"><h3>Squad mood<span class="sub">unhappiest first · tap a player to see why and have a word</span></h3>       ${rows.map(({ p, m, w, b }) => { const [lab, cls] = moodLabel(m); return `<button class="prow drow" data-pid="${p.id}">${faceSVG(p, 30, t.c1)}<span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${esc(w ? w.text : b ? b.text : 'No real complaints')}</small></span><span class="dtr">${traitsOf(p).map(k => `<i title="${esc(MOOD_TRAITS[k].d)}">${MOOD_TRAITS[k].l}</i>`).join('')}</span><span class="dm"><span class="mlabel ${cls}">${lab}</span><span class="mbar sm"><i class="${cls}" style="width:${Math.round(m)}%"></i></span></span></button>`; }).join('')}</div>`;   bindSqTabs(v);   v.querySelectorAll('[data-pid]').forEach(b => b.onclick = () => playerModal(+b.dataset.pid)); } function moraleTickBase(G) {
  G.teams.forEach(t => {
    t.squad.forEach(p => {
      const gap = p.rating - clubLevel(t);
      const wasOut = p.wantsOut;
p.wantsOut = G.round >= 8 && ((gap > 11 && p.age < 31 && rnd() < 0.5) || (p.contract <= 1 && p.apps < 3 && rnd() < 0.2));
       if (p.wantsOut && !wasOut && t.id === G.myTeam) {         news(G, 'transfer', `${p.name} hands in a transfer request at ${t.s}.`);         const why = p.rating - clubLevel(t) > 11 ? 'he believes he has outgrown the club and wants a bigger stage' : `he is frustrated at a lack of playing time (${p.apps} appearances)`;         mail(G, { cat: 'request', from: `${p.name}'s Agent`, p, club: t, status: 'Wants to leave', flag: true,           subject: `Transfer Request: ${p.name}`,           body: [`${p.name} has asked to leave ${t.n}; ${why}.`, 'You can talk him round with an improved contract from his profile, or listen to offers.'],           rows: [['Current wage', money(p.wage) + ' a season'], ['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} left`], ['Appearances', p.apps]], act: 'contract' });       }
      if (t.id === G.myTeam && !p.wantsOut) {
        /* wants more game time */
        if (G.round >= 8 && p.apps <= Math.floor(G.round * 0.25) && p.rating >= clubLevel(t) - 6 && p.age <= 30 && rnd() < 0.12) {
          mail(G, { key: 'games_' + p.id + '_' + G.season, cat: 'request', from: p.name, p, club: t, status: 'Wants more game time', flag: true,
            subject: `Playing Time: ${p.name}`,
            body: [`Boss, I am unsettled about my lack of first-team action: just ${p.apps} appearance${p.apps === 1 ? '' : 's'} this season.`, `I feel I'm good enough to be featuring regularly and I want reassurance about my role, or I may push for a move.`],
            rows: [['Appearances this season', p.apps], ['Rating', p.rating], ['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} left`]], act: 'squad' });
        }
        /* wants a loan */
        if (p.age <= 21 && G.round >= 10 && p.apps <= 3 && p.contract >= 2 && rnd() < 0.10) {
          mail(G, { key: 'loan_' + p.id + '_' + G.season, cat: 'request', from: p.name, p, club: t, status: 'Wants a loan move', flag: true,
            subject: `Loan Request: ${p.name}`,
            body: [`Boss, first-team chances are hard to come by for me at ${t.n}. I'd like to go out on loan to get regular football elsewhere.`, 'You can arrange a loan move from my profile, or ask me to be patient and fight for my place.'],
            rows: [['Age', p.age], ['Appearances this season', p.apps], ['Potential', potTxt(p)]], act: 'loan' });
        }
        /* wants more money */
        const fairWage = wageFor(p.rating, p.age, t.tier != null ? t.tier : t.t);
        if (p.contract >= 2 && p.apps >= 5 && p.wage < fairWage * 0.6 && rnd() < 0.10) {
          mail(G, { key: 'wage_' + p.id + '_' + G.season, cat: 'request', from: `${p.name}'s Agent`, p, club: t, status: 'Wants a pay rise', flag: true,
            subject: `Wage Review: ${p.name}`,
            body: [`${p.name}'s form has moved him well past his current terms — he feels he is underpaid for his level and is asking for improved wages.`, 'You can open contract talks from his profile to offer new terms, or risk him growing unhappy.'],
            rows: [['Current wage', money(p.wage) + ' a season'], ['Estimated fair wage', money(fairWage) + ' a season'], ['Rating', p.rating]], act: 'contract' });
        }
        /* happy & wants to extend his stay */
        if (p.contract <= 2 && p.contract >= 1 && p.apps >= 10 && p.rating <= clubLevel(t) + 4 && p.age <= 32 && rnd() < 0.12) {
          mail(G, { key: 'stay_' + p.id + '_' + G.season, cat: 'request', from: `${p.name}'s Agent`, p, club: t, status: 'Wants to stay', flag: true,
            subject: `Contract Talks: ${p.name}`,
            body: [`${p.name} has enjoyed his football at ${t.n} this season and has asked his agent to open talks over a new contract.`, 'You can offer him fresh terms from his profile whenever you’re ready.'],
            rows: [['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} left`], ['Appearances this season', p.apps], ['Rating', p.rating]], act: 'contract' });
        }
        /* grateful for game time */
        if (G.round >= 10 && p.apps >= Math.floor(G.round * 0.75) && p.age <= 33 && rnd() < 0.10) {
          mail(G, { key: 'thanks_' + p.id + '_' + G.season, cat: 'request', from: p.name, p, club: t, status: 'Grateful for his chances', flag: false,
            subject: `A Word of Thanks: ${p.name}`,
            body: [`Boss, I wanted to say thanks for the faith you've shown in me this season.`, `I appreciate every minute you're giving me. I'll keep working hard.`],
            rows: [['Appearances this season', p.apps], ['Rating', p.rating]] });
        }
      }
    });
  });
  scoutTick(G);
}
function scoutWonderkid(G) {
  const pool = [];
  G.teams.forEach(x => { if (x.id !== G.myTeam) x.squad.forEach(p => { if (p.age <= 20 && p.pot >= 76 && p.pot - p.rating >= 8 && !(G.mailKeys || {})['wk_' + p.id]) pool.push([p, x]); }); });
  if (!pool.length) return false;
  const [p, x] = pick(pool);
  mail(G, { key: 'wk_' + p.id, cat: 'scout', from: 'Chief Scout', p, club: x, status: `At ${x.s}`, flag: true, act: 'shortlist',
    subject: `Wonderkid Alert: ${p.name}`,
    body: [`Boss, I've found a special talent. ${p.name} is a ${p.age}-year-old ${p.pos} at ${x.n}.`, `He is rated ${p.rating} now but I believe he can reach ${potTxt(p)}. Move quickly before bigger clubs do.`],
    rows: [['Club', x.n], ['Rating / potential', `${p.rating} / ${potTxt(p)}`], ['Estimated value', money(p.value)], ['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} left`]] });
  return true;
}
function scoutTick(G) {
  try { scoutNetTick(G); } catch (e) { }
  if (rnd() > 0.14) return;
  const t = G.teams[G.myTeam];
  if (rnd() < 0.5 && scoutWonderkid(G)) return;
  const gems = t.youth.filter(p => p.pot - p.rating >= 14 && p.pot >= 72);
  if (gems.length) {
    const g = pick(gems);
    news(G, 'youth', `Chief scout's report: keep an eye on ${g.name}, ${g.age} — he says there's a real player in there.`);     mail(G, { cat: 'scout', from: 'Chief Scout', p: g, club: t, status: 'In your academy', subject: `Academy Gem: ${g.name}`,       body: [`Boss, keep an eye on ${g.name} in the academy. He is ${g.age}, a ${g.pos}, and I think there is a real player in there.`, `He is rated ${g.rating} today with a ceiling of ${potTxt(g)}.`] });
    return;
  }
  const stars = t.squad.filter(p => p.rating >= 78 && p.age <= 29);
  if (stars.length && rnd() < 0.5) {
    const s = pick(stars);
    const abroad = pick(['a club in Europe', 'a club in the Gulf', 'scouts from Asia', 'an agent representing clubs abroad']);
       news(G, 'transfer', `${abroad} are said to be watching ${s.name} closely.`);     mail(G, { cat: 'news', from: 'Press Office', p: s, club: t, status: 'Reported interest', subject: `Breaking News: interest in ${s.name}`,       body: [`${abroad} are said to be watching ${s.name} closely.`, 'It may be worth tying him down to a new contract before someone makes a move.'], act: 'contract' });
  }
}

/* ---------------- season rollover ---------------- */
/* ---------------- ageing curve ----------------    Climb: steady, spread over the years left until he peaks (27, give or take a year of    "bloom"), so nobody hits their potential at 19-20. Prime ~24-27, a plateau to 30,    then a gentle, steady decline from 31. */ function stoch(x) { const f = Math.floor(x); return f + (rnd() < x - f ? 1 : 0); } function seasonDelta(p) {   const a = p.age, gap = Math.max(0, p.pot - p.rating);   if (p.bloom == null) p.bloom = rint(-1, 1);   const peak = 27 + p.bloom;   const form = p.apps > 20 ? 0.5 : p.apps < 6 ? -0.5 : 0;   if (a <= peak) return stoch(clamp(gap / (peak - a + 1) + (rnd() - 0.5) * 1.2 + form, 0, gap));   if (a <= 30) return rint(-1, 1);   const lo = a <= 31 ? 0 : a <= 35 ? 1 : 2, hi = a <= 33 ? 2 : a <= 36 ? 3 : 4;   return Math.min(0, -rint(lo, hi) + (p.apps > 20 && rnd() < 0.5 ? 1 : 0)); } /* chance of retiring this summer, by (effective) age; keepers last two years longer */ const RETIRE_CURVE = [0.04, 0.07, 0.12, 0.20, 0.30, 0.40, 0.50, 0.65, 0.80, 0.92]; /* ages 35..44 */ function retireChance(p) {   const ea = p.pos === 'GK' ? p.age - 2 : p.age;   if (ea >= 45) return 1;   let c = ea < 35 ? 0 : RETIRE_CURVE[ea - 35];   if (p.age >= 33 && p.rating < 50) c += 0.3;   return Math.min(1, c); } function personalSeasonMail(G, sum) {   const t = G.teams[G.myTeam]; if (!t) return;   const sender = () => pick(['Mom', 'Dad', 'Your Brother', 'Your Sister', 'An Old Friend', 'Your Cousin']);   if (sum.champions.includes(G.myTeam)) {     mail(G, { key: 'fam_champ_' + sum.season, cat: 'personal', from: sender(), subject: 'You did it!!', flag: true,       body: [`CHAMPIONS! We saw the news about ${t.n} winning the league and we are so, so proud of you.`, `Call us when you get a chance, we want to hear all about it.`] });   }   if (sum.cup === G.myTeam) {     mail(G, { key: 'fam_cup_' + sum.season, cat: 'personal', from: sender(), subject: 'Cup winners!', flag: true,       body: [`A cup win! We watched the final and couldn't stop cheering.`, `So happy for you — you deserve this.`] });   }   if (sum.promoted.includes(G.myTeam)) {     mail(G, { key: 'fam_promo_' + sum.season, cat: 'personal', from: sender(), subject: 'Promotion!', flag: true,       body: [`Heard the news about ${t.n} going up — congratulations!`, `Knew you could do it.`] });   }   if (sum.relegated.includes(G.myTeam)) {     mail(G, { key: 'fam_releg_' + sum.season, cat: 'personal', from: sender(), subject: 'Thinking of you',       body: [`Sorry to hear about the relegation. It's a tough business.`, `Don't be too hard on yourself — we know how much work you put in. Chin up.`] });   }   if (sum.fired) {     mail(G, { key: 'fam_fired_' + sum.season, cat: 'personal', from: sender(), subject: 'We\u2019re here for you',       body: [`Heard ${t.n} let you go. That's rough, and it's not fair after everything you put in.`, `Take some time, then get back out there. We believe in you.`] });   } } 
function endSeason(G) {   try { snapClubRank(G); } catch (e) { console.error('rank snapshot', e); }
  const N_TIERS = TIER_NAMES.length;
  const repSnap = {}; G.teams.forEach(t => { repSnap[t.id] = t.rep; });
  const sum = { season: G.season, champions: [], promoted: [], relegated: [], cup: G.cup.winner, retired: [], breakout: [] };
  const tables = [];
  for (let tier = 0; tier < N_TIERS; tier++) {
    const st = sortTable(G, tier);
    tables.push(st);
    const champ = G.teams[st[0].id];
    champ.trophies.push({ season: G.season, name: TIER_NAMES[tier] });
    sum.champions.push(champ.id);
    st.forEach((r, i) => {
      const t = G.teams[r.id];
      t.history.push({ season: G.season, tier, pos: i + 1, pts: r.pts, w: r.w, d: r.d, l: r.l, gf: r.gf, ga: r.ga });
      const prizeScale = [24, 7, 2.6, 1.1, 0.5][tier] || 0.4;
      const prizeStep = [1.2, 0.32, 0.12, 0.05, 0.02][tier] || 0.02;
      const prize = Math.max(prizeScale * 0.14, prizeScale - i * prizeStep);
      payPrize(G, t.id, prize, 'prize money for finishing #' + (i + 1));
      const spons = [6, 4, 1.6, 0.6, 0.25][tier] || 0.2;
      payIncome(G, t.id, spons, 'sponsor', 'League sponsorship share');       payIncome(G, t.id, TV_BASE[Math.min(tier, 4)] * 0.5 * (1 - i / (TIER_SIZE - 1)), 'sponsor', 'TV: Merit payment');       commercialSeasonEnd(G, t, tier);       stadiumSeasonEnd(G, t);       stadiumSeasonEnd(G, t);
      const mid = (TIER_SIZE - 1) / 2;
      t.rep = clamp(t.rep + (mid - i) * 0.035, 3.2, 9.9);
    });
  }
  sum.awards = computeSeasonAwards(G, G.teams[G.myTeam] ? G.teams[G.myTeam].tier : 0, repSnap);
  announceSeasonAwards(G, sum.awards);
  /* promotion and relegation cascades through every adjacent pair of tiers */
  const promoted = [], relegated = [];
  const playoffs = [];
  for (let tier = 0; tier < N_TIERS; tier++) {
    const st = tables[tier];
    if (tier > 0) {
      promoted.push(...st.slice(0, AUTO_PROMOTED).map(r => r.id));
      const contenders = st.slice(AUTO_PROMOTED, AUTO_PROMOTED + PLAYOFF_SPOTS).map(r => r.id);
      if (contenders.length === PLAYOFF_SPOTS) {
        const po = (G.poPlayed && G.poPlayed.season === G.season && G.poPlayed.tier === tier && G.poPlayed.winner != null) ? G.poPlayed : runPromotionPlayoff(G, contenders);
        promoted.push(po.winner);
        playoffs.push({ tier, contenders, semis: po.semis, final: po.final, winner: po.winner });
      }
    }
    if (tier < N_TIERS - 1) relegated.push(...st.slice(TIER_SIZE - RELEGATED).map(r => r.id));
  }
  sum.playoffs = playoffs; G.poPlayed = null;
  const move = (ids, dir) => ids.forEach(id => {
    const t = G.teams[id];
    t.tier = clamp(t.tier + dir, 0, N_TIERS - 1);
    if (dir < 0) { t.budget += t.tier === 0 ? 16 : t.tier === 1 ? 6 : 2; t.rep = clamp(t.rep + 0.55, 3.2, 9.9); t.wageBudget = Math.round(t.wageBudget * 1.35 * 100) / 100; }
    else { t.budget = Math.max(0.5, t.budget * 0.5); t.rep = clamp(t.rep - 0.35, 3.2, 9.9); t.wageBudget = Math.max(t.wageBill, Math.round(t.wageBudget * 0.6 * 100) / 100); }
  });
  move(relegated, 1); move(promoted, -1);
  sum.relegated = relegated; sum.promoted = promoted;
   sum.promoted.forEach(id => news(G, 'season', `${G.teams[id].n} are promoted to the ${TIER_SHORT[G.teams[id].tier]}.`));
  sum.relegated.forEach(id => news(G, 'season', `${G.teams[id].n} drop into the ${TIER_SHORT[G.teams[id].tier]}.`));
  sum.playoffs.forEach(po => {
    const w = G.teams[po.winner];
    news(G, 'season', `${w.n} win the ${TIER_SHORT[po.tier]} promotion playoff final to claim the last promotion spot.`);
  });

  endSeasonLoans(G);
  /* players: wages paid, ageing, growth, retirement, contracts */
  G.teams.forEach(t => {
    t.fin.wages = t.wageBill;
    t.budget -= t.wageBill;
    t.squad.forEach(p => {
      p.career.push({ season: G.season, club: t.id, tier: t.tier, apps: p.apps, sApps: p.sApps || 0, g: p.goals, a: p.assists, rating: p.rating, cs: p.cs || 0 });       if (p.career.length > 20) p.career.shift();
      p.age++;
      const before = p.rating;
      p.rating = Math.round(clamp(p.rating + seasonDelta(p), 32, Math.max(p.pot, 40)));
      p.lastGrowth = p.rating - before;
      if (p.age >= 31) p.pot = p.rating;
      p.contract--;
      p.wage = wageFor(p.rating, p.age, t.tier);
      p.value = valueOf(p);
      if (p.lastGrowth >= 5 && p.age <= 21 && p.rating >= 66) {
        sum.breakout.push({ name: p.name, club: t.id, rating: p.rating, pot: p.pot });
        news(G, 'youth', `${p.name} (${p.age}) has exploded at ${t.s} — now rated ${p.rating} with ${potTxt(p)} potential.`, { pid: p.id, toId: t.id });
      }
    });
    const retiring = t.squad.filter(p => rnd() < retireChance(p));
    retiring.forEach(p => {
      try { legendRetire(G, p, t); } catch (e) { console.error('legend', e); } sum.retired.push({ club: t.id, name: p.name, age: p.age, apps: p.cApps, goals: p.cG });
      news(G, 'retire', `${p.name} retires at ${p.age} after ${p.cApps} career appearances and ${p.cG} goals.`);       if (t.id === G.myTeam) mail(G, { cat: 'leaving', from: 'Chief Executive', p, club: null, status: 'Retired', subject: `[Info] ${p.name} retires`,         body: [`${p.name} has called time on his career at ${p.age}.`, `He made ${p.cApps} career appearances and scored ${p.cG} goals. Thank you for everything, ${p.name}.`] });
    });
    t.squad = t.squad.filter(p => !retiring.includes(p));
    /* contracts: AI clubs re-sign the players they rate, the user must do it by hand */
    const expiring = t.squad.filter(p => p.contract <= 0);
    expiring.forEach(p => {
      const unhappy = p.wantsOut || p.apps < 6;
      const keep = (p.rating > t.rep * 6.6 - 8 || p.age < 24) && !(unhappy && rnd() < 0.7);
      if (keep) {
        p.contract = rint(2, 4);
        p.wage = Math.round(wageFor(p.rating, p.age, t.tier) * 1.12 * 100000) / 100000;
        if (t.id === G.myTeam) {
          news(G, 'contract', `${p.name} agrees fresh terms at ${t.s} on ${money(p.wage)} a season.`);
          mail(G, { cat: 'contract', from: 'Chief Executive', p, club: t, status: 'Fresh terms agreed', subject: `[Info] Fresh Terms: ${p.name}`,
            body: [`${p.name} has agreed fresh terms at ${t.n}.`],
            rows: [['Wage', money(p.wage) + ' a season'], ['Contract length', `${p.contract} years`], ['Expires', `June ${G.season + 1 + p.contract}`]] });
        }
      }
    });
    const leaving = t.squad.filter(p => p.contract <= 0);
    leaving.forEach(p => {       p.contract = 0; G.freeAgents.push(p); news(G, 'transfer', `${p.name} leaves ${t.s} as a free agent.`);       if (t.id === G.myTeam) mail(G, { cat: 'leaving', from: 'Chief Executive', p, club: null, status: 'Left on a free transfer', flag: true, subject: `Contract Expired: ${p.name} has left`,         body: [`${p.name}'s contract ran out and he has left ${t.n} as a free agent.`, 'Renew key players before their final six months to avoid losing them for nothing.'],         rows: [['Rating / potential', `${p.rating} / ${potTxt(p)}`], ['Last wage', money(p.wage) + ' a season'], ['This season', `${appsTxt(p)} apps, ${p.goals} goals`]] });     });
    t.squad = t.squad.filter(p => !leaving.includes(p));
    if (t.id !== G.myTeam) fillSquad(G, t);   /* AI clubs top up to a full squad; yours is left exactly as it finished, minus expired contracts and retirements */
    else if (t.squad.length < MIN_SENIOR) {
      const msg = `${t.s} begin the new season with only ${t.squad.length} senior players. You need at least ${MIN_SENIOR} (and ${MIN_TO_PLAY} fit players to play a match), so sign players before you sell or release anyone.`;
      news(G, 'contract', msg);
      mail(G, { cat: 'career', from: 'Chief Executive', flag: true, subject: 'Squad below the minimum', body: [msg, 'Until you are back to 15 you cannot sell, release or loan out anyone, and if you cannot field 11 fit players for a match it is forfeited and you are fined.'],
        rows: [['Senior players', String(t.squad.length)], ['Minimum', String(MIN_SENIOR)], ['Fit players needed to play', String(MIN_TO_PLAY)]] });
    }
    t.wageBill = wageOf(t);
    const wageGrowth = 1 + clamp(finNet(t.fin) / Math.max(1, t.wageBudget) * 0.15, -0.12, 0.18);
    t.wageBudget = Math.round(clamp(t.wageBudget * wageGrowth, t.wageBill, t.wageBill * 3) * 100) / 100;
    t.budget = Math.max(0, Math.round(t.budget * 10) / 10);     if (t.id !== G.myTeam) {       const floor = [4, 1.5, 0.8, 0.4, 0.2][Math.min(t.tier, 4)];       if (t.budget < floor) { const g = Math.round((floor - t.budget) * 100) / 100; t.budget = Math.round((t.budget + g) * 100) / 100; t.fin.sponsor += g; noteInc(t, 'League solidarity grant', g); }     }
    t.finHistory.push({ season: G.season, ...t.fin, net: finNet(t.fin) });
    ensureLineup(t);
  });
  G.freeAgents = G.freeAgents.slice(-30);
  const soon = G.teams[G.myTeam].squad.filter(p => p.contract <= 1).sort((a, b) => b.rating - a.rating);
  if (soon.length) news(G, 'contract', `${soon.length} ${TIER_SHORT[G.teams[G.myTeam].tier]} contract${soon.length === 1 ? '' : 's'} at ${G.teams[G.myTeam].s} run out within a year — ${soon.slice(0, 3).map(p => p.name).join(', ')}${soon.length > 3 ? ' and others' : ''}.`);

  const finalT1 = sortTable(G, 0);
  G.records.seasons.push({
    season: G.season, champ: sum.champions[0], champ2: sum.champions[1], champ3: sum.champions[2],
    runnerUp: finalT1[1].id, topEight: finalT1.slice(0, 8).map(r => r.id),
    cup: G.cup.winner, s8: G.super8.winner, ko: G.knockout.winner,
    caf: G.africa.caf && G.africa.caf.winner ? cafName(G, G.africa.caf.winner) : null,
    confed: G.africa.confed && G.africa.confed.winner ? cafName(G, G.africa.confed.winner) : null,
    afcon: G.africa.afcon && G.africa.afcon.winner ? G.africa.afcon.winner : null,
    awards: sum.awards
  });
  sum.caf = G.africa.caf && G.africa.caf.winner ? cafName(G, G.africa.caf.winner) : null;
  sum.confed = G.africa.confed && G.africa.confed.winner ? cafName(G, G.africa.confed.winner) : null;
  sum.s8 = G.super8.winner; sum.ko = G.knockout.winner;
  africaSeasonEnd(G);
  if (G.africa.afcon.phase === 'qualifiers') { runQualifiers(G); sum.afcon = null; }
  else if (G.africa.afcon.phase === 'qualified') { runAfconFinals(G); sum.afcon = G.africa.afcon.winner; }
  if (!G.jobless) updateReputation(G, sum);
  sum.fired = G.jobless ? false : updateBoard(G, sum);
  if (!G.jobless) personalSeasonMail(G, sum);
  try { updateLegends(G); } catch (e) { console.error('legends', e); }   sum.board = G.board;
  sum.offers = G.jobless ? [] : (sum.fired ? rescueOffers(G) : jobOffers(G));   try { managerSeasonEnd(G, sum); } catch (e) { console.error('Manager season end error', e); }
  G.season++;
  buildSeason(G);
  seedAiClauses(G);
  try { updateOutgoingScouting(G); } catch (e) { console.error('scouting', e); }
  if (!sum.fired) { try { setBoardObjectives(G); } catch (e) { console.error('objectives', e); } }
  return sum;
}

function fillSquad(G, t) {
  const need = { GK:3, RB:2, CB:4, LB:2, RWB:1, LWB:1, CDM:2, CM:3, CAM:2, RM:1, LM:1, RW:1, LW:1, ST:2, CF:1 };;
  const foreign = t.squad.filter(p => p.nat !== 'ZA').length;
  Object.entries(need).forEach(([pos, min]) => {
    let have = t.squad.filter(p => p.pos === pos).length;
    while (have < min) {
      const wantForeign = t.squad.filter(p => p.nat !== 'ZA').length < 6;
      const youth = t.youthClub ? rnd() < 0.7 : rnd() < 0.42;
      const p = makePlayer({
        nat: natFor(t, wantForeign), pos,
        age: youth ? rint(17, 20) : rint(22, 29),
        strength: t.base - (youth ? (t.youthClub ? 0.3 : 0.9) : 0.4),
        season: G.season, contract: rint(2, 4), tier: t.tier
      });
      p.clubs.push({ id: t.id, from: G.season });
      t.squad.push(p); have++;
    }
  });
}

/* ---------------- Youth Academy ---------------- */
const ACADEMY_CAP = 15;
function generateYouth(G) {
  G.teams.forEach(t => {
    t.youth = t.youth || [];
    const leaving = [];
    t.youth.forEach(p => {
      p.academySeasons = (p.academySeasons || 0) + 1;
      if (p.age >= 21 || (p.academySeasons >= 3 && rnd() < 0.4)) leaving.push(p);
    });
    leaving.forEach(p => {
      t.youth = t.youth.filter(x => x.id !== p.id);
      const dest = pick(G.teams.filter(x => x.id !== t.id && x.id !== G.myTeam));   /* graduates never land in your squad unasked */
      p.clubs.push({ id: dest.id, from: G.season });
      p.contract = rint(2, 3);
      dest.squad.push(p);
      dest.wageBill = wageOf(dest);
      if (t.id === G.myTeam || dest.id === G.myTeam)
        news(G, 'youth', `${p.name} leaves the ${t.s} academy for ${dest.s} on a free transfer after going unpromoted.`);
    });
    const n = Math.max(1, Math.round(t.academy * (t.youthClub ? 1.2 : 0.7)));
    for (let i = 0; i < n; i++) {
      const p = makePlayer({
        nat: rnd() < 0.9 ? 'ZA' : natFor(t, true), pos: pick(POS_LIST),
        age: rint(16, 18), strength: t.base - 2 + t.academy * 0.35 + (t.youthClub ? 0.6 : 0),
        season: G.season, contract: 3, tier: t.tier
      });
      p.pot = Math.round(clamp(p.rating + rint(6, 20) + t.academy + scoutNetBonus(t, p.nat), p.rating, 94)); p.product = t.id;
      p.value = valueOf(p);
      p.academySeasons = 0;
      t.youth.push(p);
    }
    if (t.youth.length > ACADEMY_CAP) {
      t.youth.sort((a, b) => b.rating - a.rating);
      const cut = t.youth.slice(ACADEMY_CAP);
      t.youth = t.youth.slice(0, ACADEMY_CAP);
      if (t.id === G.myTeam && cut.length) news(G, 'youth', `${cut.length} academy prospect${cut.length === 1 ? '' : 's'} released to stay within the ${ACADEMY_CAP}-player academy limit.`);
    }
    if (t.id === G.myTeam) {
      const gem = t.youth.filter(p => p.pot >= 80)[0];
      if (gem) news(G, 'youth', `Academy report: ${gem.name} (${p2age(gem)}) could reach ${potTxt(gem)}.`);
    } else if (rnd() < 0.10) {
      const gem = t.youth.slice().sort((a, b) => b.pot - a.pot)[0];
      if (gem && gem.pot >= 82) news(G, 'youth', `Scouts rave about ${gem.name}, a ${gem.age}-year-old ${gem.pos} at ${t.s}, tipped to reach ${potTxt(gem)}.`);
    }
  });
}
function p2age(p) { return p.age; }

function promoteYouth(G, pid) {
  const t = G.teams[G.myTeam];
  const i = t.youth.findIndex(p => p.id === pid);
  if (i < 0) return { ok: false, msg: 'Not in the academy.' };
const p = t.youth.splice(i, 1)[0]; p.reserve = firstTeamFull(t);
  p.clubs.push({ id: t.id, from: G.season });
  t.squad.push(p);
  t.wageBill = wageOf(t);
  news(G, 'youth', `${t.s} promote ${p.name} from the academy.`, { pid: p.id, toId: t.id });
  return { ok: true, msg: `${p.name} joins the senior squad.` };
}
function releaseYouthOld(G, pid) {
  const t = G.teams[G.myTeam];
  t.youth = t.youth.filter(p => p.id !== pid);
  return { ok: true, msg: 'Released.' };
}
/* ---------------- Development Centre ----------------    Age-group pools below the official academy (t.youth). Under-16s have no face yet (a    silhouette is shown); a face is assigned the summer they turn 16, when they can be    promoted into the academy and from there to the first team. Academy level decides which    age groups exist, how big the centre can be and how many recruits arrive each summer;    the manager decides how many he actually wants to hold (t.dev.cap). */ const DEV_GROUPS = [   { key: 'u11', label: 'Under 11s', ages: '10\u201311', entry: 11, unlock: 3 },   { key: 'u13', label: 'Under 13s', ages: '12\u201313', entry: 13, unlock: 2 },   { key: 'u15', label: 'Under 15s', ages: '14\u201315', entry: 15, unlock: 1 } ]; const DEV_MAXCAP = [0, 3, 4, 6, 8, 10];   /* youngsters per age group, by academy level */ const DEV_INTAKE = [0, 1, 1, 2, 2, 3];    /* new recruits per age group each summer */   function devMakeKid(G, t, age) {   const nat = rnd() < 0.92 ? 'ZA' : natFor(t, true);   const p = makePlayer({ nat, pos: pick(POS_LIST), age: 16, strength: 3, season: G.season, contract: 3, tier: t.tier });   if (p.portrait) PORTRAIT_USE[p.portrait] = Math.max(0, (PORTRAIT_USE[p.portrait] || 1) - 1);   const pot = Math.round(clamp(50 + (t.academy || 1) * 2.5 + t.base * 1.2 + (t.youthClub ? 2 : 0) + gauss() * 8.5 + scoutNetBonus(t, nat), 45, 95));   const r16 = Math.max(26, pot - rint(10, 22));   const rating = Math.round(clamp(pot - (pot - r16) * (27 - age) / 11 + rint(-2, 2), 18, pot - 2));   Object.assign(p, { age, rating, pot, startRating: rating, startPot: pot, portrait: null, face: null, noFace: true, product: t.id, origin: 'dev', wage: 0, apps: 10, dob: birthDate(age, G.season) });   p.value = valueOf(p);   return p; } function devIntake(G, t, seed) {   const d = t.dev, lvl = t.academy || 1, cap = Math.min(d.cap, DEV_MAXCAP[lvl] || 3), made = [];   DEV_GROUPS.forEach(g => {     if (lvl < g.unlock) return;     const free = Math.max(0, cap - d[g.key].length);     const want = seed ? DEV_INTAKE[lvl] + 1 : DEV_INTAKE[lvl] + (t.youthClub && lvl > 1 ? 1 : 0);     for (let i = 0; i < Math.min(free, want); i++) { const k = devMakeKid(G, t, seed ? g.entry - rint(0, 1) : g.entry); d[g.key].push(k); made.push(k); }   });   return made; } function ensureDev(G, t) {   if (!t.dev) { t.dev = { cap: Math.min(3, DEV_MAXCAP[t.academy || 1] || 3), u11: [], u13: [], u15: [], grad: [] }; devIntake(G, t, true); }   return t.dev; } function devGrowOld(p) {   p.age++;   const a0 = p.apps; p.apps = 10;   p.rating = Math.round(clamp(p.rating + seasonDelta(p), 15, Math.max(p.pot, 20)));   p.apps = a0;   p.value = valueOf(p); } function devGiveFace(p) {   const grp = p.eth || ethnicGroupFor(p.nat);   p.face = makeFace(p.nat, grp); p.portrait = portraitFromGroup(grp); p.noFace = false; } /* start of every season: everyone grows a year, groups move up, unpromoted 17s leave, new recruits arrive */ function devCentreSeason(G) {   G.teams.forEach(t => {     (t.youth || []).forEach(p => devGrow(p, G, t));                       /* academy prospects develop too */     const d = t.dev; if (!d) return;     const mine = t.id === G.myTeam;     ['u11', 'u13', 'u15', 'grad'].forEach(k => d[k].forEach(p => devGrow(p, G, t)));     d.grad.forEach(p => {                                    /* not promoted in time */       const dest = pick(G.teams.filter(x => x.id !== t.id));       p.academySeasons = 0; p.contract = 3; p.wage = wageFor(p.rating, p.age, dest.tier);       p.clubs = p.clubs || []; p.clubs.push({ id: dest.id, from: G.season });       dest.youth = dest.youth || []; dest.youth.push(p);       if (mine) news(G, 'youth', `${p.name} (${p.age}) leaves the ${t.s} development centre for ${dest.s} after not being promoted.`);     });     d.grad = [];     d.u15.filter(p => p.age >= 16).forEach(p => { if (p.noFace) devGiveFace(p); d.grad.push(p); if (mine) news(G, 'youth', `${p.name} turns 16 and is ready to join the ${t.s} academy.`); });     d.u15 = d.u15.filter(p => p.age < 16);     d.u13.filter(p => p.age > 13).forEach(p => d.u15.push(p)); d.u13 = d.u13.filter(p => p.age <= 13);     d.u11.filter(p => p.age > 11).forEach(p => d.u13.push(p)); d.u11 = d.u11.filter(p => p.age <= 11);     if (mine) devIntake(G, t, false).filter(p => p.pot >= 80).forEach(p => news(G, 'youth', `Development centre: ${p.name} (${p.age}), a ${p.pos}, is tipped to reach ${p.pot}.`));   });   const my = G.teams[G.myTeam]; if (my && !my.dev) ensureDev(G, my);   alumniTick(G); } function promoteDev(G, pid) {   const t = G.teams[G.myTeam], d = ensureDev(G, t);   const i = d.grad.findIndex(p => p.id === pid);   if (i < 0) return { ok: false, msg: 'He has to be 16 before he can join the academy.' };   if (t.youth.length >= ACADEMY_CAP) return { ok: false, msg: `The academy is full (${ACADEMY_CAP}). Promote or release someone first.` };   const p = d.grad.splice(i, 1)[0];   p.academySeasons = 0; p.contract = 3; p.wage = wageFor(p.rating, p.age, t.tier);   t.youth.push(p);   news(G, 'youth', `${t.s} promote ${p.name} from the development centre to the academy.`);   return { ok: true, msg: `${p.name} joins the academy.` }; } function releaseDevOld(G, pid) {   const d = ensureDev(G, G.teams[G.myTeam]);   ['u11', 'u13', 'u15', 'grad'].forEach(k => { d[k] = d[k].filter(p => p.id !== pid); }); } function setDevCap(G, delta) {   const t = G.teams[G.myTeam], d = ensureDev(G, t);   d.cap = clamp((d.cap || 0) + delta, 0, DEV_MAXCAP[t.academy || 1] || 3); } /* ---------------- Youth progress, alumni and the 3D silhouette ---------------- */ let _silN = 0; function silhouetteSVG(s, kit) {   const k = kit || '#586172', n = ++_silN;   return `<svg class="face" width="${s}" height="${s}" viewBox="0 0 40 40"><defs>     <radialGradient id="sb${n}" cx=".5" cy=".28" r=".95"><stop offset="0" stop-color="${shade(k, -25)}"/><stop offset="1" stop-color="${shade(k, -90)}"/></radialGradient>     <radialGradient id="sh${n}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#b4bfd3"/><stop offset=".55" stop-color="#6c7a93"/><stop offset="1" stop-color="#303a4d"/></radialGradient>     <linearGradient id="sn${n}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#4a566d"/><stop offset=".5" stop-color="#7b88a0"/><stop offset="1" stop-color="#37425a"/></linearGradient>     <linearGradient id="ss${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>     <radialGradient id="sg${n}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>     <rect width="40" height="40" rx="8" fill="url(#sb${n})"/><ellipse cx="20" cy="38" rx="15" ry="3" fill="url(#sg${n})"/>     <path d="M4.5 40c0-9.2 6-14 15.5-14s15.5 4.8 15.5 14z" fill="${k}"/><path d="M4.5 40c0-9.2 6-14 15.5-14s15.5 4.8 15.5 14z" fill="url(#ss${n})"/>     <path d="M16 25.6l4 5 4-5" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="1.2" stroke-linejoin="round"/>     <rect x="16.6" y="19.5" width="6.8" height="7.5" rx="3" fill="url(#sn${n})"/><ellipse cx="20" cy="22.2" rx="4" ry="1.6" fill="#000" opacity=".28"/>     <circle cx="20" cy="14" r="7.6" fill="url(#sh${n})"/><path d="M25.6 9.6a7.6 7.6 0 0 1 .9 8.4" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.1" stroke-linecap="round"/></svg>`; } /* a year of progress: rating and potential both move; no movement at all = stalled */ function devGrow(p, G, t) {   p.baseR = p.rating; p.baseP = p.pot;   p.age++;   const a0 = p.apps; p.apps = 10;   p.rating = Math.round(clamp(p.rating + seasonDelta(p), 15, Math.max(p.pot, 20)));   p.apps = a0;   if (p.age <= 20) {                                   /* coaching moves the ceiling: up with good facilities, down without */     const lvl = t ? trainLevel(G, t) : 2;     p.pot = Math.round(clamp(p.pot + clamp(Math.round(gauss() + (lvl - 2.5) * 0.25), -3, 3), p.rating, 95));   }   if (p.noFace && p.age >= 16) devGiveFace(p);   p.value = valueOf(p); } function youthTrend(p) {   if (p.baseR == null) return '<span class="growth flat">new</span>';   const dr = p.rating - p.baseR, dp = p.pot - p.baseP;   const cell = (d, lab) => d > 0 ? `<span class="growth up">\u25B2 +${d} ${lab}</span>` : d < 0 ? `<span class="growth down">\u25BC ${d} ${lab}</span>` : '';   if (!dr && !dp) return '<span class="growth flat" title="No change in rating or potential over the last year">\u23F8 stalled</span>';   return [cell(dr, 'ovr'), cell(dp, 'pot')].filter(Boolean).join(' '); } function releaseDev(G, pid) {   const t = G.teams[G.myTeam], d = ensureDev(G, t);   let p = null;   ['u11', 'u13', 'u15', 'grad'].forEach(k => { const f = d[k].find(x => x.id === pid); if (f) p = f; d[k] = d[k].filter(x => x.id !== pid); });   if (!p) return;   if (p.age >= 16) {                                   /* old enough to sign pro elsewhere: the Alumni tab follows him */     const dest = pick(G.teams.filter(x => x.id !== t.id));     p.academySeasons = 0; p.contract = 3; p.wage = wageFor(p.rating, p.age, dest.tier);     p.clubs = p.clubs || []; p.clubs.push({ id: dest.id, from: G.season });     dest.youth = dest.youth || []; dest.youth.push(p);     news(G, 'youth', `${p.name} (${p.age}), released by the ${t.s} development centre, joins ${dest.s}.`, { pid: p.id });   } else {                                             /* too young to sign anywhere: keep a record */     t.alumni = t.alumni || [];     t.alumni.unshift({ id: p.id, name: p.name, nat: p.nat, pos: p.pos, from: 'Development centre', left: G.season, leftAge: p.age, hist: [[G.season, p.age, p.rating, p.pot]], news: 0, fixed: true });   } } function releaseYouth(G, pid) {   const t = G.teams[G.myTeam], p = t.youth.find(x => x.id === pid);   t.youth = t.youth.filter(x => x.id !== pid);   if (p) {     if (p.product == null) p.product = t.id;     const dest = pick(G.teams.filter(x => x.id !== t.id));     p.clubs = p.clubs || []; p.clubs.push({ id: dest.id, from: G.season }); p.contract = rint(2, 3);     dest.squad.push(p); dest.wageBill = wageOf(dest);     news(G, 'youth', `${p.name} (${p.age}), released by the ${t.s} academy, signs pro with ${dest.s}.`, { pid: p.id });   }   return { ok: true, msg: 'Released.' }; } /* everyone in the league world, by id */ function alumniIndex(G) {   const idx = new Map(), add = (p, club) => idx.set(p.id, { p, club });   G.teams.forEach(x => { x.squad.forEach(p => add(p, x)); (x.youth || []).forEach(p => add(p, x)); });   (G.freeAgents || []).forEach(p => add(p, null));   return idx; } /* once a season: spot new departures and log every alumnus's year; he stays "ours" for life */ function alumniTick(G) {   const t = G.teams[G.myTeam]; if (!t) return;   t.alumni = t.alumni || [];   (t.youth || []).forEach(p => { if (p.product == null) p.product = t.id; });   const idx = alumniIndex(G), known = new Set(t.alumni.map(a => a.id));   idx.forEach(({ p, club }) => {     if (p.product !== t.id || known.has(p.id) || (club && club.id === t.id)) return;     t.alumni.unshift({ id: p.id, name: p.name, nat: p.nat, pos: p.pos, from: p.origin === 'dev' ? 'Development centre' : 'Academy', left: G.season, leftAge: p.age, hist: [], news: 0 });     if (club) news(G, 'youth', `${p.name} (${p.age}), raised at ${t.s}, signs pro with ${club.s}.`, { pid: p.id });   });   t.alumni.forEach(a => {     if (a.fixed) return;     const f = idx.get(a.id);     if (!f) { a.retired = true; return; }     a.retired = false;     a.hist.push([G.season, f.p.age, f.p.rating, f.p.pot]); if (a.hist.length > 30) a.hist.shift();     if (f.club && f.club.id !== t.id) {       const r = f.p.rating;       if (r >= 88 && a.news < 88) { a.news = 88; news(G, 'youth', `${f.p.name}, a former ${t.s} youngster, is now rated ${r} at ${f.club.s}. The one that got away!`, { pid: f.p.id }); }       else if (r >= 80 && a.news < 80) { a.news = 80; news(G, 'youth', `Former ${t.s} youngster ${f.p.name} is now rated ${r} at ${f.club.s}.`, { pid: f.p.id }); }     }   }); } function sparkSVG(vals, w, h) {   if (vals.length < 2) return '';   const lo = Math.min(...vals), hi = Math.max(...vals), span = Math.max(1, hi - lo);   const pts = vals.map((v, i) => [(i / (vals.length - 1) * (w - 6) + 3).toFixed(1), (h - 4 - (v - lo) / span * (h - 8)).toFixed(1)]);   return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="flex:0 0 auto"><polyline points="${pts.map(q => q.join(',')).join(' ')}" fill="none" stroke="#f5c518" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="2.3" fill="#f5c518"/></svg>`; } function leaversPanelHTML(t) {   const al = (t.alumni || []).filter(a => !a.fixed).slice(0, 3);   if (!al.length) return '';   const idx = alumniIndex(G);   return `<div class="panel"><h3>Recent departures<span class="sub">followed for life in the Alumni tab</span></h3>` + al.map(a => {     const f = idx.get(a.id), c = f && f.club;     return `<div class="prow" style="grid-template-columns:1fr auto"><span class="who"><b>${esc(a.name)} ${flagSVG(a.nat)}</b><small>${a.pos} · ${a.from} · ${c ? `now at ${c.c1 ? crestHTML(c, 14) : ''} <b>${esc(c.s)}</b>` : f ? 'free agent' : 'retired'}</small></span>${f ? ratingTag(f.p.rating) : ''}</div>`;   }).join('') + `</div>`; } function viewAlumni() {   const v = $('#v-youth'), t = me();   t.alumni = t.alumni || [];   const idx = alumniIndex(G);   const items = t.alumni.map(a => {     const f = idx.get(a.id), p = f ? f.p : null, last = a.hist.length ? a.hist[a.hist.length - 1] : null;     return { a, p, club: f ? f.club : null, rating: p ? p.rating : last ? last[2] : 0, age: p ? p.age : last ? last[1] : a.leftAge };   }).sort((x, y) => y.rating - x.rating);   const elsewhere = items.filter(i => i.p && !(i.club && i.club.id === t.id));   const stars = elsewhere.filter(i => i.rating >= 80).length;   const badge = i => i.a.retired ? '<span class="growth flat" style="margin-left:6px">Retired</span>'     : i.rating >= 88 && i.club && i.club.id !== t.id ? '<span class="potglow" style="margin-left:6px;font-size:11px">\u2605 The one that got away</span>'     : i.rating >= 80 ? '<span class="potglow" style="margin-left:6px;font-size:11px">\u2605 Star</span>'     : i.rating >= 70 ? '<span class="growth up" style="margin-left:6px">Rising</span>' : '';   const row = i => {     const { a, p, club } = i;     const where = a.fixed ? `Released at ${a.leftAge}` : a.retired ? 'Retired' : club ? (club.id === t.id ? 'Back with us' : `${club.c1 ? crestHTML(club, 14) : ''} <b>${esc(club.s)}</b>`) : 'Free agent';     const path = a.hist.slice(-7).map(h => `${h[1]}: ${h[2]}`).join(' \u203A ');     return `<div class="prow" style="grid-template-columns:auto auto 1fr auto">       ${faceSVG(p || { noFace: true }, 34, club && club.c1 ? club.c1 : '#586172')}${ratingTag(i.rating)}       <span class="who"><b>${esc(a.name)} ${flagSVG(a.nat)}</b>${badge(i)}<small>${a.pos} · ${i.age} years old · ${where}${p && !a.retired ? ` · potential <b class="potglow">${potTxt(p)}</b>` : ''}</small>         <small style="opacity:.8">${a.from} · left in ${a.left}${path ? ` · ${path}` : ''}</small></span>       ${sparkSVG(a.hist.map(h => h[2]), 70, 26)}</div>`;   };   v.innerHTML = yhTabsHTML(t) +     sqTiles([['Left the club', items.length], ['Playing elsewhere', elsewhere.length], ['Stars (80+)', stars], ['Best now', items.length ? items[0].rating : '—']]) +     `<div class="panel"><h3>Alumni<span class="sub">always a product of ${esc(t.s)}</span></h3>` +       (items.length ? items.map(row).join('') : '<div class="empty">Nobody has left yet. Anyone raised in your development centre or academy who signs for another club is followed here for the rest of his career \u2014 so you can see who got away.</div>') + `</div>`;   bindYhTabs(v); } function upgradeAcademy(G) {
  const t = G.teams[G.myTeam];
  if (t.academy >= 5) return { ok: false, msg: 'The academy is already top of the range.' };
  const cost = [0, 6, 12, 22, 36][t.academy] || 36;
  if (t.budget < cost) return { ok: false, msg: `You need ${money(cost)} to upgrade.` };
  t.budget = Math.round((t.budget - cost) * 100) / 100;
  t.fin.buys += cost;
  t.academy++;
  return { ok: true, msg: `Academy upgraded to level ${t.academy}.` };
}

/* ---------------- stats ---------------- */
function statList(G, tier, key) {
  const list = [];
  G.teams.forEach(t => {
    if (tier != null && t.tier !== tier) return;
    t.squad.forEach(p => {
      if (p[key] > 0) list.push({ p, club: t, v: p[key] });
    });
  });
  return list;
}
function ratingPool(G, tier, monthBucket) {   const list = [];   G.teams.forEach(t => {     if (tier != null && t.tier !== tier) return;     t.squad.forEach(p => {       let sum, apps;       if (monthBucket != null) {         const mr = p.monthRatings && p.monthRatings[monthBucket];         if (!mr || mr.apps < 2) return;         sum = mr.sum; apps = mr.apps;       } else {         if (!p.ratingApps || p.ratingApps < 8) return;         sum = p.ratingSum; apps = p.ratingApps;       }       list.push({ p, club: t, avg: Math.round((sum / apps) * 100) / 100, apps });     });   });   return list; } function pickFormationXI(pool) {   const buckets = { GK: [], DEF: [], MID: [], ATT: [] };   pool.forEach(x => { const g = POS_GROUP[x.p.pos]; if (buckets[g]) buckets[g].push(x); });   Object.keys(buckets).forEach(k => buckets[k].sort((a, b) => b.avg - a.avg || b.apps - a.apps));   const need = { GK: 1, DEF: 4, MID: 3, ATT: 3 };   const xi = [];   Object.keys(need).forEach(g => { for (let i = 0; i < need[g] && buckets[g][i]; i++) xi.push(buckets[g][i]); });   return xi; } function xiCardsHTML(xi) {   if (!xi.length) return '<div class="empty">Not enough matches played yet.</div>';   const C = FORM_COORDS['4-3-3'], g = { GK: [], DEF: [], MID: [], ATT: [] };   xi.forEach(x => { const k = POS_GROUP[x.p.pos]; if (g[k]) g[k].push(x); });   const dw = { RB: 0, RWB: 0, CB: 1, LB: 2, LWB: 2 };   g.DEF.sort((a, b) => (dw[a.p.pos] ?? 1) - (dw[b.p.pos] ?? 1));   g.MID.sort((a, b) => (a.p.pos === 'CDM' ? 0 : 1) - (b.p.pos === 'CDM' ? 0 : 1));   const plan = [['GK', [0]], ['DEF', [1, 2, 3, 4]], ['MID', [5, 6, 7]], ['ATT', [9, 8, 10]]];   const men = [];   plan.forEach(([k, slots]) => g[k].forEach((x, i) => { if (slots[i] != null) men.push({ x, c: C[slots[i]] }); }));   const spots = men.map(({ x, c }) => `<button class="fpl totSpot${x.club.id === G.myTeam ? ' sel' : ''}" data-pid="${x.p.id}" style="left:${8 + c[0] * 0.84}%;top:${8 + (100 - c[1]) * 0.84}%">       <div class="prow3"><span class="prate">${x.avg.toFixed(1)}</span><div class="pface" style="--pring:${x.club.c1}">${faceSVG(x.p, 30, x.club.c1)}</div><span class="ppos">${x.p.pos}</span></div>       <span class="fnm2">${esc(x.p.last || x.p.name)}</span>       <span class="totCrest">${crestHTML(x.club, 14)}</span></button>`).join('');   return `<div class="totPitch"><div class="totHead"><b>4-3-3</b><span>rating shown is the average match rating</span></div>     <div class="fifa"><i class="hl"></i><i class="cc"></i><i class="bx1"></i><i class="bx2"></i>${spots}</div></div>`; } function xiCardsHTMLOld(xi) {   if (!xi.length) return '<div class="empty">Not enough matches played yet.</div>';   const order = { GK: 0, DEF: 1, MID: 2, ATT: 3 };   const sorted = xi.slice().sort((a, b) => order[POS_GROUP[a.p.pos]] - order[POS_GROUP[b.p.pos]]);   return '<div class="totmGrid">' + sorted.map(x => `<button class="totmCard${x.club.id === G.myTeam ? ' mine' : ''}" data-pid="${x.p.id}">       ${faceSVG(x.p, 48, x.club.c1)}       <b>${esc(x.p.name)}</b>       ${posTag(x.p.pos)}       <span class="totmClub">${crestHTML(x.club, 15)}<span>${esc(x.club.s)}</span></span>       <span class="totmAvg">${x.avg.toFixed(1)}</span>     </button>`).join('') + '</div>'; } function topScorers(G, tier, n) {
  return statList(G, tier, 'goals').sort((a, b) => b.v - a.v || b.p.assists - a.p.assists || a.p.apps - b.p.apps).slice(0, n || 20);
}
function topAssists(G, tier, n) {
  return statList(G, tier, 'assists').sort((a, b) => b.v - a.v || b.p.goals - a.p.goals).slice(0, n || 15);
}
function cleanSheets(G, tier, n) {
  return statList(G, tier, 'cs').filter(x => POS_GROUP[x.p.pos] === 'GK').sort((a, b) => b.v - a.v).slice(0, n || 12);
}

/* ---------------- end-of-season awards ---------------- */
function computeSeasonAwards(G, tier, repSnap) {
  const scorers = topScorers(G, tier, 1);
  const goldenBoot = scorers[0] ? {
    pid: scorers[0].p.id, name: scorers[0].p.name, clubId: scorers[0].club.id, clubName: scorers[0].club.n, goals: scorers[0].v
  } : null;

  const pool = ratingPool(G, tier, null).sort((a, b) => b.avg - a.avg || b.apps - a.apps);
  const pos = pool[0];
  const playerOfSeason = pos ? {
    pid: pos.p.id, name: pos.p.name, clubId: pos.club.id, clubName: pos.club.n, avg: pos.avg, goals: pos.p.goals, assists: pos.p.assists
  } : null;

  const yp = pool.find(x => x.p.age <= 23);
  const youngPlayerOfSeason = yp ? {
    pid: yp.p.id, name: yp.p.name, clubId: yp.club.id, clubName: yp.club.n, avg: yp.avg, age: yp.p.age
  } : null;

  /* Manager of the Season: biggest gap between pre-season reputation rank and final league position */
  const teams = G.teams.filter(t => t.tier === tier);
  const repRanked = teams.slice().sort((a, b) => (repSnap[b.id] ?? b.rep) - (repSnap[a.id] ?? a.rep));
  const repRankOf = {}; repRanked.forEach((t, i) => { repRankOf[t.id] = i; });
  const table = sortTable(G, tier);
  let manager = null, bestDelta = -Infinity;
  table.forEach((r, i) => {
    const rr = repRankOf[r.id] ?? i;
    const delta = rr - i;
    if (delta > bestDelta) { bestDelta = delta; manager = { clubId: r.id, clubName: G.teams[r.id].n, pos: i + 1, expectedPos: rr + 1, delta }; }
  });

  return { tier, goldenBoot, playerOfSeason, youngPlayerOfSeason, manager };
}
function announceSeasonAwards(G, awards) {
  if (!awards) return;
  const { tier, goldenBoot, playerOfSeason, youngPlayerOfSeason, manager } = awards;
  const tierName = TIER_SHORT[tier];
  if (goldenBoot) {
    news(G, 'season', `${goldenBoot.name} wins the ${tierName} Golden Boot with ${goldenBoot.goals} goals for ${goldenBoot.clubName}.`, { pid: goldenBoot.pid });
    if (goldenBoot.clubId === G.myTeam) { const f = findPlayer(G, goldenBoot.pid); if (f) mail(G, { cat: 'award', from: 'Chief Executive', p: f.p, club: f.t, status: 'Golden Boot', flag: true, subject: `Golden Boot: ${goldenBoot.name}`, body: [`${goldenBoot.name} finished the season as the ${tierName}'s top scorer with ${goldenBoot.goals} goals.`, `A brilliant season in front of goal.`] }); }
  }
  if (playerOfSeason) {
     news(G, 'season', `${playerOfSeason.name} (${playerOfSeason.clubName}) is named ${tierName} Player of the Season, averaging ${playerOfSeason.avg.toFixed(2)} per match.`, { pid: playerOfSeason.pid });
    if (playerOfSeason.clubId === G.myTeam) { const f = findPlayer(G, playerOfSeason.pid); if (f) mail(G, { cat: 'award', from: 'Chief Executive', p: f.p, club: f.t, status: 'Player of the Season', flag: true, subject: `Player of the Season: ${playerOfSeason.name}`, body: [`${playerOfSeason.name} has been named ${tierName} Player of the Season, averaging ${playerOfSeason.avg.toFixed(2)} a match.`, `A season to remember.`] }); }
  }
  if (youngPlayerOfSeason) {
     news(G, 'season', `${youngPlayerOfSeason.name} (${youngPlayerOfSeason.clubName}, ${youngPlayerOfSeason.age}) is named ${tierName} Young Player of the Season.`, { pid: youngPlayerOfSeason.pid });
    if (youngPlayerOfSeason.clubId === G.myTeam) { const f = findPlayer(G, youngPlayerOfSeason.pid); if (f) mail(G, { cat: 'award', from: 'Chief Executive', p: f.p, club: f.t, status: 'Young Player of the Season', flag: true, subject: `Young Player of the Season: ${youngPlayerOfSeason.name}`, body: [`${youngPlayerOfSeason.name} (${youngPlayerOfSeason.age}) has been named ${tierName} Young Player of the Season.`, `The future looks bright.`] }); }
  }
  if (manager && manager.delta > 0) {
    news(G, 'season', `${manager.clubName} are named ${tierName} Manager of the Season, finishing ${ordinal(manager.pos)} after being tipped for ${ordinal(manager.expectedPos)}.`);
    if (manager.clubId === G.myTeam) mail(G, { cat: 'award', from: 'Chief Executive', status: 'Manager of the Season', flag: true, subject: `Manager of the Season`, body: [`You have been named ${tierName} Manager of the Season after guiding ${manager.clubName} to ${ordinal(manager.pos)}, well ahead of pre-season expectations.`, `The board is delighted.`] });
  }
}

/* ---------------- transfers ---------------- */
function teamById(G, id) { return G.teams[id] || (G.africa && G.africa.squadCache && G.africa.squadCache[id]) || null; }
function findPlayer(G, pid) {
  for (const t of G.teams) { const p = t.squad.find(x => x.id === pid); if (p) return { p, t }; }
  if (G.africa && G.africa.squadCache) {
    for (const id of Object.keys(G.africa.squadCache)) {
      const t = G.africa.squadCache[id];
      const p = t.squad.find(x => x.id === pid);
      if (p) return { p, t };
    }
  }
  return null;
}
/* ---- squad size and forfeits ---- */ const MIN_SENIOR = 15;      /* a club may never go below this many senior players */ const MIN_TO_PLAY = 11;     /* fewer fit, unsuspended players than this and the match is forfeited */ const FORFEIT_FINE = [1.5, 0.5, 0.2, 0.08, 0.04];   /* base fine by division, in rand millions */ const AI_MIN_FIT = 14;   /* AI clubs always have at least this many fit players available, so they never forfeit */ const AI_NEED = { GK: 3, RB: 2, CB: 4, LB: 2, RWB: 1, LWB: 1, CDM: 2, CM: 3, CAM: 2, RM: 1, LM: 1, RW: 1, LW: 1, ST: 2, CF: 1 }; function aiRestock(G, t) { if (t && t.id !== G.myTeam) fillSquad(G, t); }   /* after a sale or loan, an AI club brings its squad straight back to full depth */ function aiCover(G, t) {   if (!t || t.id === G.myTeam || G.teams[t.id] !== t) return;   let guard = 0;   while (fitCount(t) < AI_MIN_FIT && guard++ < 16) {     /* injuries or bans: sign cover for the position with the thinnest fit depth */     let pos = 'CM', worst = -99;     Object.entries(AI_NEED).forEach(([ps, min]) => { const gap = min - t.squad.filter(x => x.pos === ps && isFit(x, t)).length; if (gap > worst) { worst = gap; pos = ps; } });     const np = makePlayer({ nat: natFor(t, false), pos, age: rint(20, 29), strength: t.base - 0.5, season: G.season, contract: 1, tier: t.tier });     np.clubs.push({ id: t.id, from: G.season });     t.squad.push(np);   }   if (guard) t.wageBill = wageOf(t); } function fitCount(t) { return t.squad.filter(p => isFit(p, t)).length; } function forfeitSide(G, H, A) {   if (!H || !A || G.teams[H.id] !== H || G.teams[A.id] !== A) return null;   /* domestic clubs only */ if (H.id === G.myTeam) return fitCount(H) < MIN_TO_PLAY ? 'h' : null; if (A.id === G.myTeam) return fitCount(A) < MIN_TO_PLAY ? 'a' : null; return null; /* only your club can forfeit; AI clubs are kept stocked (see aiCover) */   const fh = fitCount(H), fa = fitCount(A), sh = fh < MIN_TO_PLAY, sa = fa < MIN_TO_PLAY;   if (!sh && !sa) return null;   return sh && sa ? (fa < fh ? 'a' : 'h') : (sh ? 'h' : 'a');   /* both short: the emptier side forfeits */ } function forfeitFine(t) {   const base = FORFEIT_FINE[Math.min(t.tier, FORFEIT_FINE.length - 1)];   return Math.round(base * (1 + 0.5 * Math.min(3, (t.fin && t.fin.forfeits) || 0)) * 100) / 100; } function settleForfeit(G, ctx) {   const loser = G.teams[ctx.forfeit === 'h' ? ctx.h : ctx.a], winner = G.teams[ctx.forfeit === 'h' ? ctx.a : ctx.h];   const fine = forfeitFine(loser);   ctx.fine = fine;   loser.budget = Math.max(0, Math.round((loser.budget - fine) * 100) / 100);   loser.fin.fines = Math.round(((loser.fin.fines || 0) + fine) * 100) / 100;   loser.fin.forfeits = (loser.fin.forfeits || 0) + 1;   news(G, 'match', `${loser.s} forfeit against ${winner.s}: fewer than ${MIN_TO_PLAY} fit players. ${winner.s} are awarded a 3-0 win and ${loser.s} are fined ${money(fine)}.`);   if (loser.id === G.myTeam) {     toastWarn(`Forfeit! Fewer than ${MIN_TO_PLAY} fit players. 3-0 to ${winner.s} and you are fined ${money(fine)}.`);     mail(G, { cat: 'career', from: 'Chief Executive', flag: true, subject: `Match forfeited against ${winner.s}`, body: [`We could not field ${MIN_TO_PLAY} fit, available players, so the match was forfeited and awarded 3-0 to ${winner.s}.`, `The league has fined the club ${money(fine)}. Repeat offences in the same season cost more.`],       rows: [['Result', '0-3 defeat (awarded)'], ['Fine', money(fine)], ['Forfeits this season', String(loser.fin.forfeits)]] });   }   else if (winner.id === G.myTeam) toastGood(`${loser.s} could not field ${MIN_TO_PLAY} players. You are awarded a 3-0 win.`); } function forfeitNoteHTML(m) {   if (!m || !m.forfeit) return '';   const loserId = m.forfeit === 'h' ? m.h : m.a, mineLost = loserId === G.myTeam;   const L = G.teams[loserId], W = G.teams[m.forfeit === 'h' ? m.a : m.h], col = mineLost ? 'var(--down)' : 'var(--up)';   return `<div style="margin:10px 0;padding:10px 12px;border:1px solid ${col};border-radius:var(--r);background:rgba(0,0,0,.28)">     <b style="color:${col}">Match forfeited</b>     <p class="hint" style="margin:4px 0 0;color:#d5d9de">${esc(L.s)} could not field ${MIN_TO_PLAY} fit, available players (injuries and suspensions). ${esc(W.s)} are awarded a 3–0 win${mineLost ? ` and you are fined ${money(m.fine || 0)}` : ''}.</p></div>`; } function minAtPos(pos) { return { GK:2, RB:1, CB:3, LB:1, RWB:0, LWB:0, CDM:1, CM:2, CAM:1, RM:0, LM:0, RW:0, LW:0, ST:1, CF:1 }[pos] ?? 1; }

/* ---------------- found a custom club ---------------- */
function foundClub(G, opts) {
  const candidates = G.teams.filter(t => t.tier === opts.tier && t.id !== G.myTeam).sort((a, b) => a.rep - b.rep);
  const target = candidates[0] || G.teams.filter(t => t.tier === opts.tier)[0];
  target.n = opts.name; target.s = opts.name.length > 16 ? opts.name.slice(0, 16) : opts.name;
  target.nick = 'The Newcomers'; target.city = opts.city;
  target.c1 = opts.c1; target.c2 = opts.c2; target.icon = opts.icon; target.shape = opts.shape;
  target.badge = null; target.youthClub = false;
  target.base = clamp(target.base, 2.2, 6.5);
  target.squad = makeSquad(target, G.season);
  target.squad.forEach(p => p.clubs.push({ id: target.id, from: G.season }));
  target.budget = [10, 4, 1.6, 0.9, 0.4][target.tier] || 0.4;
  target.wageBill = wageOf(target);
  target.trophies = []; target.history = []; target.rep = target.base; target.youth = [];
  ensureLineup(target);
  news(G, 'career', `${target.n} are founded in the ${TIER_SHORT[target.tier]}.`);
  return target.id;
}

function clubCareerStats(G, p, clubId) {
  let apps = 0, goals = 0, assists = 0;
  (p.career || []).forEach(c => { if (c.club === clubId) { apps += c.apps; goals += c.g; assists += c.a; } });
  const current = (p.clubs || []).length ? p.clubs[p.clubs.length - 1].id : null;
  if (current === clubId) { apps += p.apps; goals += p.goals; assists += p.assists; }
  return { apps, goals, assists };
}
function isClubLegend(G, p, clubId) {
  const s = clubCareerStats(G, p, clubId);
  return s.apps >= 300 && s.goals >= 100;
}
function developedBy(p) {
  return (p.clubs && p.clubs.length) ? p.clubs[0].id : null;
}

function interestedIn(G, p, sellerId) {
  /* clubs roughly at this player's level, using the same scale player ratings are generated on */
  const fit = G.teams.filter(t => t.id !== sellerId && t.budget > p.value * 0.55 &&
    Math.abs(clubLevel(t) - p.rating) < 11);
  const pool = fit.length >= 2 ? fit : G.teams.filter(t => t.id !== sellerId && t.budget > p.value * 0.45);
  return shuffle(pool.slice()).slice(0, Math.min(4, pool.length)).map(t => t.id);
}

function buildLoanMarket(G) {   G.loanMarket = [];   G.teams.forEach(t => {     t.squad.slice().sort((a, b) => b.rating - a.rating).forEach((p, i) => {       if (p.loan || (G.market || []).some(m => m.pid === p.id)) return;       if (t.captainId === p.id || t.viceCaptainId === p.id) return;       if (rnd() < (i > 14 ? 0.3 : 0.04) + (p.age <= 21 ? 0.12 : 0)) G.loanMarket.push({ pid: p.id, from: t.id });     });   }); } function isLoanListed(pid) { return (G.loanMarket || []).some(m => m.pid === pid); } function loanReqFromList(pid) { const f = findPlayer(G, pid); if (f && f.t) loanOfferModal(f.p.id, f.t); } function listedHTML(t) {   if (!G.loanMarket) buildLoanMarket(G);   const grab = arr => arr.map(m => { const f = findPlayer(G, m.pid); return f && f.t && f.t.id !== G.myTeam && !f.p.loan ? { p: f.p, club: f.t } : null; }).filter(Boolean).sort((a, b) => b.p.rating - a.p.rating);   const tl = grab(G.market || []), ll = grab(G.loanMarket || []);   const head = last => `<thead><tr><th></th><th>Player</th><th>Pos</th><th>Age</th><th>Rat</th><th>Pot</th><th>Club</th><th>${last}</th><th></th></tr></thead>`;   const loanRow = x => `<tr><td></td><td class="txp">${faceSVG(x.p, 26, x.club.c1)}<div><b>${esc(x.p.name)} ${flagSVG(x.p.nat)}</b><div class="hint">loan listed</div></div></td><td style="white-space:nowrap">${posTag(x.p.pos)}</td><td class="num">${x.p.age}</td><td class="num">${ratingTag(x.p.rating)}</td><td class="num"><b class="potglow">${potTxt(x.p)}</b></td><td>${crestHTML(x.club, 13)} ${esc(x.club.s)}</td><td class="num"><span class="hint">loan</span></td><td><button class="btn ghost sm" data-pid="${x.p.id}">View</button> <button class="btn sm" onclick="loanReqFromList(${x.p.id})">Ask for loan</button></td></tr>`;   return `<div class="panel"><h3>Transfer listed<span class="sub">${tl.length} players other clubs will sell</span></h3>     ${tl.length ? `<div class="tw"><table class="tbl txtbl">${head('Asking')}<tbody>${tl.map(x => txRow(x.p, x.club)).join('')}</tbody></table></div>` : '<div class="empty">Nobody is transfer listed right now.</div>'}</div>     <div class="panel"><h3>Loan listed<span class="sub">${ll.length} players other clubs will lend out</span></h3>     ${ll.length ? `<div class="tw"><table class="tbl txtbl">${head('')}<tbody>${ll.map(loanRow).join('')}</tbody></table></div>` : '<div class="empty">Nobody is loan listed right now.</div>'}</div>`; } function buildMarket(G) {
  G.market = [];
  G.teams.forEach(t => {
    const ranked = t.squad.slice().sort((a, b) => b.rating - a.rating);
    ranked.forEach((p, i) => {
      const fringe = i > 15;
      const chance = (fringe ? 0.42 : 0.09) + (p.contract <= 1 ? 0.25 : 0) + (p.age > 32 ? 0.12 : 0) + (p.wantsOut ? 0.4 : 0);
      if (rnd() < chance) {
        G.market.push({
          pid: p.id, from: t.id,
          ask: Math.round(p.value * (0.85 + rnd() * 0.6) * 100) / 100,
          interest: interestedIn(G, p, t.id)
        });
      }
    });
  });
  for (let i = 0; i < 6; i++) {
    const p = makePlayer({ nat: rnd() < 0.7 ? 'ZA' : natFor({ scout: pick(['AFR','AFR','SAM','EUR','ASIA','NAM']) }, true), pos: pick(POS_LIST), strength: rint(4, 7), season: G.season, contract: 0, tier: 2 });
    G.freeAgents.push(p);
  }
  G.freeAgents = G.freeAgents.slice(-24); buildLoanMarket(G);
}

function lastMoveHTML(G, p) {   const lm = p.lastMove, cl = p.clubs || [];   let from = lm ? lm.from : null, to = lm ? lm.to : null, fee = lm ? lm.fee : null, free = lm ? !!lm.free : false, season = lm ? lm.season : null;   if (!lm || to == null) {   /* older saves: work it out from club history */     if (cl.length < 2) return '';     from = cl[cl.length - 2].id; to = cl[cl.length - 1].id; season = cl[cl.length - 1].from; fee = null;   } else if (from == null) {     if (cl.length >= 2) from = cl[cl.length - 2].id;   }   const a = from != null ? teamById(G, from) : null, b = to != null ? teamById(G, to) : null;   if (!b) return '';   const price = free ? 'free transfer' : fee == null ? '' : fee > 0 ? 'for ' + money(fee) : 'fee undisclosed';   const chip = t => `<span style="display:inline-flex;align-items:center;gap:5px;vertical-align:middle">${crestHTML(t, 20)}<b>${esc(t.s)}</b></span>`;   return `<p style="margin:0 0 6px;font-size:13px;color:var(--dim);display:flex;align-items:center;flex-wrap:wrap;gap:6px">Last move: ${a ? chip(a) : '<b>Free agent</b>'} ➡️ ${chip(b)}${price ? ' <span>' + price + '</span>' : ''}${season != null ? ' <span>· ' + seasonLabel(season) + '</span>' : ''}</p>`; } function logTransfer(G, p, fromId, toId, fee) {   p.lastMove = { from: fromId, to: toId, fee: fee || 0, season: G.season };
  G.transferLog.unshift({ season: G.season, round: G.round, name: p.name, pos: p.pos, nat: p.nat, rating: p.rating, from: fromId, to: toId, fee });
  if (G.transferLog.length > 80) G.transferLog.pop();
}

function setReleaseClause(G, pid, amount) {
  const me = G.teams[G.myTeam];
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  p.releaseClause = amount > 0 ? Math.round(amount * 100) / 100 : null;
  return { ok: true, msg: p.releaseClause ? `Release clause set at ${money(p.releaseClause)} — ${clauseThreatText(p)}.` : 'Release clause removed.' };
}
function triggerReleaseClause(G, pid) {
  const f = findPlayer(G, pid);
  if (!f || !f.p.releaseClause) return { ok: false, msg: 'No release clause on this player.' };
  return buyPlayer(G, pid, f.p.releaseClause, true);
}

/* ================= release clauses: the AI side ================= */
const AI_CLAUSE_SHARE = 0.25; // share of other clubs' players who carry a release clause (set 0 to switch it off)

/* Gives a stable slice of other clubs' players a clause priced well above
   their value, and re-prices them once a season as values move. Uses hashS
   rather than rnd() so it never disturbs the game's random stream. */
function seedAiClauses(G) {
  if (G.aiClauseSeason === G.season) return;
  G.aiClauseSeason = G.season;
  if (!AI_CLAUSE_SHARE) return;
  G.teams.forEach(t => {
    if (t.id === G.myTeam) return;
    t.squad.forEach(p => {
      if (p.loan) return;
      const has = hashS(p.id + '_hc') < AI_CLAUSE_SHARE;
      if (!has && !p.releaseClause) return;
      const floor = (p.value || valueOf(p)) * (2 + hashS(p.id + '_cm') * 1.2);
      p.releaseClause = Math.max(p.releaseClause || 0, Math.round(floor * 100) / 100);
    });
  });
}

/* A club bidding for a player whose clause is cheaper would just pay the clause. */
function capToClause(p, fee) { return p.releaseClause ? Math.min(fee, p.releaseClause) : fee; }

/* Clubs that both want him and could actually pay his clause, keenest first. */
function clauseSuitors(G, p) {
  if (!p.releaseClause) return [];
  return interestRanking(p, G.myTeam).filter(x => x.t.budget >= p.releaseClause && x.t.squad.length < 31);
}
function clauseThreatText(p) {
  const n = clauseSuitors(G, p).length;
  return n ? `${n} interested club${n === 1 ? '' : 's'} can afford it` : 'no interested club can meet it right now';
}

/* Strongly-wanted players with a clause that's cheap next to their value get
   it paid outright — no bid, no negotiation. At most one per matchday, and
   only while a window is open. */
function aiClauseTriggers(G) {
  if (!inTransferWindow(G)) return;
  const me = G.teams[G.myTeam];
  if (me.squad.length <= MIN_SENIOR) return;                  // the minimum-squad rule applies to clause moves too
  if (me.squad.length <= MIN_SENIOR) return;                  // the minimum-squad rule applies to clause moves too
  if (me.squad.length <= MIN_SENIOR) return;                  // the minimum-squad rule applies to clause moves too
  for (const p of me.squad.slice()) {
    if (!p.releaseClause || p.loan || signLockLeft(p) > 0) continue;
    if (p.pos === 'GK' && me.squad.filter(x => x.pos === 'GK').length <= 1) continue; // never strip you of your only keeper
    const suitors = clauseSuitors(G, p);
    if (!suitors.length) continue;
    const clause = p.releaseClause;
    // Only ~6-7 matchdays a season fall inside a window, so these are small
    // per-matchday odds: a cheap clause on a wanted player is a real risk over
    // a season, a clause at 2x+ his value mostly isn't.
    const price = clause <= p.value ? 1.6 : clause <= p.value * 1.5 ? 1 : clause <= p.value * 2.2 ? 0.3 : 0.1;
    let chance = (0.02 + Math.min(12, Math.max(0, suitors[0].s - 3)) * 0.008 + Math.min(5, suitors.length - 1) * 0.008) * price;
    if (p.wantsOut) chance *= 1.5;
    if (rnd() < Math.min(0.2, chance)) {
      const buyer = wpick(suitors, x => 1 + x.s).t;
      const r = sellPlayer(G, p.id, clause, buyer.id, true);
      if (r.ok) { try { toast(`${buyer.s} triggered ${p.name}'s release clause (${money(clause)}).`); } catch (e) { } return; }
    }
  }
}

/* ================= outgoing scouting: who YOUR club is watching ================= */

/* The weakest current starter in each slot position of your formation —
   the bar a target has to clear to actually get into your XI. */
function weakestStarters(me) {
  const slots = FORMATIONS[me.formation] || FORMATIONS['4-4-2'];
  const out = {};
  slots.forEach((pos, i) => {
    const pl = me.squad.find(x => x.id === (me.lineup || [])[i]);
    const r = pl ? pl.rating : 0;
    out[pos] = out[pos] == null ? r : Math.min(out[pos], r);
  });
  return out;
}
/* The slot in your formation this player would fill, or null if your shape has no room for him. */
function scoutSlot(p, need) {
  if (need[p.pos] != null) return p.pos;
  return (p.alt || []).find(a => need[a] != null) || null;
}

/* How good a target is this opposition player for you? null = not realistic. */
function scoutFit(G, p, t, need) {
  const me = G.teams[G.myTeam];
  if (t.squad.length <= MIN_SENIOR) return null;             // a club at the minimum squad size can't sell anyone
  if (t.squad.length <= MIN_SENIOR) return null;             // a club at the minimum squad size can't sell anyone
  if (t.squad.length <= MIN_SENIOR) return null;             // a club at the minimum squad size can't sell anyone
  const clauseOk = !!p.releaseClause && p.releaseClause <= me.budget;
  const locked = p.joinedSeason === G.season;
  if (locked && !clauseOk) return null;                      // too recently signed to be sold on
  const slot = scoutSlot(p, need);
  if (!slot) return null;                                    // your formation has no room for him
  const d = p.rating - need[slot];
  if (d < 2) return null;                                    // wouldn't really improve your XI there
  const stepDown = p.rating > clubLevel(me) + 10 && !p.wantsOut;
  if (stepDown && !clauseOk) return null;                    // would turn you down flat
  const cost = (locked || stepDown) ? p.releaseClause : Math.min(p.value, p.releaseClause || Infinity);
  const ratio = cost / Math.max(me.budget, 0.05);
  if (ratio > 1.5) return null;                              // far beyond your means
  let s = Math.min(d, 12);
  if (p.age <= 23) s += Math.min(4, Math.max(0, p.pot - p.rating) * 0.25);
  if (p.wantsOut) s += 2.5;
  if (p.contract <= 1) s += 2;
  if (p.age >= 33) s -= 2;
  s += ratio < 0.5 ? 1 : ratio > 1 ? -(ratio - 1) * 6 : 0;
  if (me.wageBill + wageFor(p.rating, p.age, me.tier) > me.wageBudget) s -= 3;
  const thin = t.squad.filter(x => x.pos === p.pos).length <= minAtPos(p.pos);
  if (thin) s -= 4;
  s += (hashS(p.id + '_ob_' + G.round) - 0.5) * 4;           // a little week-to-week churn
  return { s, d, slot, thin, clauseOk };
}

/* Short plain-English reasons a player is on your board. */
function scoutWhy(G, p, t) {
  const me = G.teams[G.myTeam], need = weakestStarters(me);
  const slot = scoutSlot(p, need) || p.pos;
  const d = p.rating - (need[slot] != null ? need[slot] : starterRatingAt(me, p.pos));
  const out = [`would start at ${slot} (+${d} on who's there now)`];
  if (p.wantsOut) out.push(`unsettled at ${t.s}`);
  else if (p.contract <= 1) out.push('contract runs down this season');
  if (p.age <= 23 && p.pot - p.rating >= 6) out.push(`young, could reach ${potTxt(p)}`);
  if (p.releaseClause && p.releaseClause <= me.budget) out.push(`clause ${money(p.releaseClause)} is within reach`);
  else if (p.value <= me.budget * 0.6) out.push('easy on the budget');
  else if (p.value > me.budget) out.push('a stretch for your budget');
  return out.slice(0, 3);
}

/* Keeps G.scoutBoard — your scouts' standing shortlist of realistic targets,
   with how long each has been tracked. Players stay on it until they stop
   being realistic (a looser bar than getting on), but scouts also move on
   from long-tracked names and a clearly better find can bump the weakest
   entry, so it doesn't sit frozen all season. */
function updateOutgoingScouting(G) {
  const me = G.teams[G.myTeam];
  const board = G.scoutBoard = G.scoutBoard || {};
  ensureLineup(me);
  const need = weakestStarters(me), live = {};
  G.teams.forEach(t => {
    if (t.id === me.id) return;
    t.squad.forEach(p => { if (p.loan) return; const fit = scoutFit(G, p, t, need); if (fit) live[p.id] = { p, t, fit }; });
  });
  Object.keys(board).forEach(pid => {
    const e = live[pid];
    if (!e || e.fit.s < 3.5) delete board[pid]; else { board[pid].s = e.fit.s; board[pid].club = e.t.id; }
  });
  // scouts move on: names outside the top three that have been tracked a while sometimes drop off
  Object.keys(board).sort((a, c) => board[c].s - board[a].s).slice(3).forEach(pid => {
    const b = board[pid], old = b.season !== G.season || G.round - b.since >= 8;
    if (old && hashS(pid + '_rot_' + G.round) < (b.season !== G.season ? 0.25 : 0.15)) delete board[pid];
  });
  const CAP = 8;
  const tally = () => {
    const g = {}, sl = {};
    Object.keys(board).forEach(pid => { const e = live[pid]; g[POS_GROUP[e.p.pos]] = (g[POS_GROUP[e.p.pos]] || 0) + 1; sl[e.fit.slot] = (sl[e.fit.slot] || 0) + 1; });
    return { g, sl };
  };
  let { g: perGroup, sl: perSlot } = tally();
  const fresh = Object.values(live).filter(e => !board[e.p.id] && e.fit.s >= 6).sort((a, c) => c.fit.s - a.fit.s);
  let mailed = 0;
  for (const e of fresh) {
    const grp = POS_GROUP[e.p.pos], slot = e.fit.slot;
    let drop = null;
    if (Object.keys(board).length >= CAP) {
      drop = Object.keys(board).sort((a, c) => board[a].s - board[c].s)[0];
      if (!(e.fit.s > board[drop].s + 3)) break;             // list is sorted, so nobody later beats the weakest either
    }
    const dg = drop ? POS_GROUP[live[drop].p.pos] : null, ds = drop ? live[drop].fit.slot : null;
    if ((perGroup[grp] || 0) - (dg === grp ? 1 : 0) >= 4 || (perSlot[slot] || 0) - (ds === slot ? 1 : 0) >= 2) continue;   // keep the board varied
    if (drop) delete board[drop];
    board[e.p.id] = { since: G.round, season: G.season, s: e.fit.s, club: e.t.id };
    ({ g: perGroup, sl: perSlot } = tally());
    if (!mailed && e.fit.s >= 9) {
      const p = e.p, t = e.t; mailed++;
      mail(G, { key: 'ob_' + p.id + '_' + G.season, cat: 'scout', from: 'Chief Scout', p, club: t, status: 'Scouting target', act: 'shortlist',
        subject: `Scouting Report: ${p.name}`,
        body: [`Boss, ${p.name} (${p.age}) at ${t.n} would walk into your side at ${slot}.`, scoutWhy(G, p, t).join('; ') + '.'],
        rows: [['Club', t.n], ['Rating / potential', `${p.rating} / ${potTxt(p)}`], ['Estimated value', money(p.value)], ['Release clause', p.releaseClause ? money(p.releaseClause) : 'None'], ['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} left`]] });
    }
  }
}

function scoutBoardList(G) {
  const b = G.scoutBoard || {};
  return Object.keys(b).map(pid => { const f = findPlayer(G, +pid); return f ? { p: f.p, t: f.t, e: b[pid] } : null; })
    .filter(Boolean).sort((a, c) => c.e.s - a.e.s);
}

function scoutBoardHTML() {
  const me = G.teams[G.myTeam], list = scoutBoardList(G);
  const tracked = e => { if (e.season !== G.season) return 'tracked since last season'; const w = Math.max(0, G.round - e.since); return w === 0 ? 'new this week' : `tracked ${w} wk`; };
  const rows = list.map(({ p, t, e }) => {
    const watched = (G.watchlist || []).includes(p.id);
    const clauseOk = p.releaseClause && p.releaseClause <= me.budget;
    const thin = t.squad.filter(x => x.pos === p.pos).length <= minAtPos(p.pos);
    const outlook = thin ? ['Club reluctant', 'out'] : (p.wantsOut || p.contract <= 1) ? ['Likely to sell', 'xi'] : ['Negotiable', ''];
    return `<tr>
      <td><button class="star ${watched ? 'on' : ''}" data-star="${p.id}" title="Keep an eye on him" aria-label="Keep an eye on him">${watched ? '★' : '☆'}</button></td>
      <td class="txp">${faceSVG(p, 26, t.c1)}<div><b>${esc(p.name)} ${flagSVG(p.nat)}</b> <span class="tag ${outlook[1]}">${outlook[0]}</span><div class="hint" style="max-width:340px;white-space:normal">${tracked(e)} · ${scoutWhy(G, p, t).map(x => esc(x)).join(' · ')}</div></div></td>
      <td style="white-space:nowrap">${posTag(p.pos)}</td>
      <td class="num">${p.age}</td>
      <td class="num">${ratingTag(p.rating)}</td>
      <td class="num"><b class="potglow">${potTxt(p)}</b></td>
      <td>${crestHTML(t, 13)} ${esc(t.s)}</td>
      <td class="num">${money(p.value)}${p.releaseClause ? `<div class="hint">clause ${money(p.releaseClause)}</div>` : ''}</td>
      <td style="white-space:nowrap"><button class="btn ghost sm" data-pid="${p.id}">View</button> <button class="btn sm" data-buy="${p.id}" data-ask="${p.value}" ${me.budget < p.value * 0.6 ? 'disabled' : ''}>Bid</button>${clauseOk ? ` <button class="btn ghost sm" data-clause="${p.id}">Clause</button>` : ''}</td>
    </tr>`;
  }).join('');
  return `<div class="panel"><h3>Scouting board<span class="sub">${list.length} realistic target${list.length === 1 ? '' : 's'} — would improve your XI, and you could actually get them</span></h3>` +
    (list.length
      ? `<div class="tw"><table class="tbl txtbl"><thead><tr><th></th><th>Player</th><th>Pos</th><th>Age</th><th>Rat</th><th>Pot</th><th>Club</th><th>Price</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`
      : '<div class="empty">Your scouts have not flagged anyone worth chasing right now. The board refreshes every matchday as budgets, form and squads change.</div>') + `</div>`;
}

function scoutStripHTML() {
  const list = scoutBoardList(G).slice(0, 3);
  if (!list.length) return '';
  return `<div class="panel"><h3>Your scouts suggest<span class="sub">best fits for your XI right now</span></h3>` +
    list.map(({ p, t }) => `<div class="prow" style="grid-template-columns:auto 1fr auto auto"><span>${ratingTag(p.rating)}</span>
      <span class="who"><b>${esc(p.name)} ${flagSVG(p.nat)}</b><small>${p.pos} · ${p.age} · ${esc(t.s)} · ${esc(scoutWhy(G, p, t)[0])}</small></span>
      <span class="val">${money(p.value)}</span><button class="btn ghost sm" data-pid="${p.id}">View</button></div>`).join('') +
    `<div class="pad"><button class="btn ghost sm" data-txsec="scout">See the full scouting board</button></div></div>`;
}

function buyPlayer(G, pid, fee, viaClause, terms) {
  const me = G.teams[G.myTeam], f = findPlayer(G, pid);
  if (!f) return { ok: false, msg: 'He has already moved on.' };
  if (f.t.id === me.id) return { ok: false, msg: 'He already plays for you.' };
  if (!viaClause && !inTransferWindow(G)) return { ok: false, msg: `The transfer window is shut. It reopens in ${roundsToNextWindow(G)} day${roundsToNextWindow(G) === 1 ? '' : 's'}.` };
  if (me.budget < fee) return { ok: false, msg: 'Not enough in the transfer budget.' };
  if (me.wageBill + (terms ? terms.wage : f.p.wage) > me.wageBudget) return { ok: false, msg: `Wage budget won't stretch to ${f.p.name} — ${money(me.wageBill)} of ${money(me.wageBudget)} is already committed. Move funds from the transfer budget in Club & Manager, or free up wages first.` };
  if (f.p.nat !== 'ZA' && me.squad.filter(p => p.nat !== 'ZA').length >= MAX_FOREIGN)
    return { ok: false, msg: `You already have ${MAX_FOREIGN} foreign players. Sell or release one before signing another.` };
  /* no 15-player floor on AI clubs: they restock after a sale (see aiRestock) */
  if (!viaClause) {
    if (f.p.joinedSeason === G.season && f.t.id !== me.id)
      return { ok: false, msg: `${f.p.name} joined ${f.t.s} too recently this season to be sold on (under six months) — a loan is still possible.` };
    if (f.t.squad.filter(p => p.pos === f.p.pos).length <= minAtPos(f.p.pos))
      return { ok: false, msg: `${f.t.s} won't sell — they'd have no cover at ${f.p.pos}.` };
    if (f.p.rating > clubLevel(me) + 10 && !f.p.wantsOut)
      return { ok: false, msg: `${f.p.name} sees ${me.s} as a step down and turns the move down.` };
  }
  f.t.squad = f.t.squad.filter(p => p.id !== pid); aiRestock(G, f.t);
  f.t.budget += fee; f.t.fin.sales += fee;
f.p.contract = terms ? terms.years : rint(2, 4); if (terms) f.p.wage = terms.wage; f.p.fee = fee; f.p.joinedSeason = G.season; f.p.wantsOut = false; f.p.releaseClause = null;
     f.p.clubs.push({ id: me.id, from: G.season });   if (G.pendingSellOn && G.pendingSellOn.pid === pid) { f.p.sellOn = { club: G.pendingSellOn.club, pct: G.pendingSellOn.pct }; G.pendingSellOn = null; }
   f.p.reserve = firstTeamFull(me); me.squad.push(f.p);
  me.budget = Math.round((me.budget - fee) * 100) / 100;
  me.fin.buys += fee;
  me.wageBill = wageOf(me); f.t.wageBill = wageOf(f.t);
  G.market = G.market.filter(m => m.pid !== pid);
  ensureLineup(me);
  logTransfer(G, f.p, f.t.id, me.id, fee);
  news(G, 'transfer', `${f.p.name} signs for ${me.s} from ${f.t.s} for ${money(fee)}.`, { pid: f.p.id, fromId: f.t.id, toId: me.id });   mailSigning(G, f.p, fee, f.t.n);
   return { ok: true, msg: `${f.p.name} signs for ${me.s}.${f.p.reserve ? ' Your first team is full, so he starts in the reserves.' : ''}` };
}

function sellPlayer(G, pid, fee, buyerId, viaClause) {
  const me = G.teams[G.myTeam];
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (me.squad.length <= MIN_SENIOR) return { ok: false, msg: `You can't sell ${p.name}: you must keep at least ${MIN_SENIOR} senior players.` };
  if (me.captainId === pid) me.captainId = null;
  if (me.viceCaptainId === pid) me.viceCaptainId = null;
  // no cover check: if you leave a position empty, you pay for it on the pitch
  const buyer = G.teams[buyerId != null ? buyerId : pickBuyer(G, p)];
  me.squad = me.squad.filter(x => x.id !== pid);
  me.budget = Math.round((me.budget + fee) * 100) / 100;
  me.fin.sales += fee;
  if (p.sellOn && G.teams[p.sellOn.club]) { const cut = Math.round(fee * p.sellOn.pct) / 100, sc = G.teams[p.sellOn.club]; if (cut > 0) { me.budget = Math.round((me.budget - cut) * 100) / 100; sc.budget += cut; news(G, 'transfer', `${sc.s} receive ${money(cut)} from ${p.name}'s sale under their ${p.sellOn.pct}% sell-on clause.`); } p.sellOn = null; }
  buyer.squad.push(p);
  p.clubs.push({ id: buyer.id, from: G.season });
p.contract = rint(2, 4); p.wantsOut = false; p.releaseClause = null; p.tl = false; p.ll = false;
  buyer.budget = Math.max(0, buyer.budget - fee); buyer.fin.buys += fee;
  me.wageBill = wageOf(me); buyer.wageBill = wageOf(buyer);
  ensureLineup(me); ensureLineup(buyer);
  logTransfer(G, p, me.id, buyer.id, fee);
  news(G, 'transfer', viaClause ? `${buyer.s} trigger ${p.name}'s release clause and sign him from ${me.s} for ${money(fee)}.` : `${p.name} leaves ${me.s} for ${buyer.s}. Fee: ${money(fee)}.`, { pid: p.id, fromId: me.id, toId: buyer.id });
mail(G, { cat: 'leaving', from: 'Chief Executive', p, club: buyer, flag: !!viaClause, status: viaClause ? `Release clause triggered by ${buyer.s}` : `Sold to ${buyer.s}`, subject: viaClause ? `[Alert] Release Clause Triggered: ${p.name} leaves` : `[Info] Transfer Completed: ${p.name} leaves`,
    body: viaClause ? [`${buyer.n} have paid the release clause in ${p.name}'s contract and the move has gone through — there was no negotiation and no chance to turn it down.`, 'The fee has been added to your transfer budget. If you would rather not leave players exposed like this, remove or raise the clause on his profile next time.'] : [`${p.name} has left ${me.n} and joined ${buyer.n}.`, 'The fee has been added to your transfer budget.'],
    rows: [['Buyer', buyer.n], ['Fee received', money(fee)], ['Transfer budget now', money(me.budget)], ['Wages freed', money(p.wage) + ' a season'], ['This season', `${p.apps} apps, ${p.goals} goals`]] });
  G.pendingBids = (G.pendingBids || []).filter(b => b.pid !== pid); /* other clubs' offers for him are withdrawn */   return { ok: true, msg: `${p.name} sold to ${buyer.s} for ${money(fee)}.` };
}

function pickBuyer(G, p) {
  // Prefer a club that's genuinely a plausible suitor — the same ones that
  // would show up under "Interested clubs" — weighted toward the better
  // fits rather than a flat coin toss between them.
  const interested = interestedClubs(p, G.myTeam, 6);
  if (interested.length) {
    return wpick(interested, t => 1 + Math.max(0, clubLevel(t) - clubLevel(G.teams[G.myTeam]) + 10)).id;
  }
  const c = G.teams.filter(t => t.id !== G.myTeam && t.budget > p.value * 0.8);
  return (c.length ? pick(c) : pick(G.teams.filter(t => t.id !== G.myTeam))).id;
}

function negotiateContract(G, pid, wage, years) {
  const me = G.teams[G.myTeam];
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  const gap = p.rating - clubLevel(me);
  if (p.wantsOut && gap > 24) {
    return { ok: false, msg: `${p.name} says no amount of money changes his mind — he has his heart set on a bigger club.` };
  }
  const marketWage = wageFor(p.rating, p.age, me.tier);
  const raiseRatio = wage / (p.wage || marketWage);
  const bonus = Math.round(wage * 0.7 * 100) / 100;
  const wageAfter = Math.round((me.wageBill - p.wage + wage) * 100) / 100;
  if (wageAfter > me.wageBudget) return { ok: false, msg: `That wage would take you to ${money(wageAfter)} against a ${money(me.wageBudget)} wage budget. Offer less, or move funds from the transfer budget in Club & Manager.` };
  if (me.budget < bonus) return { ok: false, msg: `A signing-on fee of ${money(bonus)} is beyond the budget.` };
  let chance = p.wantsOut
    ? clamp(0.1 + (raiseRatio - 1) * 0.85 - Math.max(0, gap) * 0.018, 0.04, 0.9)
    : clamp(0.55 + (raiseRatio - 1) * 0.6, 0.25, 0.97);
  if (years < 2 && p.wantsOut) chance *= 0.7;
  if (rnd() > chance) {
    return { ok: false, msg: p.wantsOut ? `${p.name} isn't convinced and still wants a move.` : `${p.name} turns down those terms.` };
  }
  me.budget = Math.round((me.budget - bonus) * 100) / 100;
  me.fin.buys += bonus;
  p.wage = Math.round(wage * 100000) / 100000; p.contract = Math.min(6, Math.max(1, years)); p.wantsOut = false;
  me.wageBill = wageOf(me);
  // Recommitting quiets the transfer talk for a while — scouts who were
  // circling back off, and interest rebuilds gradually from here rather
  // than picking straight back up next matchday.
  p.contractSignedRound = G.round;
  p.scouts = {};
  const verb = p.wantsOut === false ? 'agrees to stay' : 'signs a new deal';
   news(G, 'contract', `${p.name} ${verb} at ${me.s} — ${p.contract}y at ${money(p.wage)} a season.`);   mail(G, { cat: 'contract', from: 'Chief Executive', p, club: me, status: 'New contract', subject: `[Info] Contract Agreed: ${p.name}`,     body: [`${p.name} has put pen to paper on a new deal at ${me.n}.`],     rows: [['Wage', money(p.wage) + ' a season'], ['Contract length', `${p.contract} year${p.contract === 1 ? '' : 's'}`], ['Expires', `June ${G.season + p.contract}`], ['Signing-on fee', money(bonus)], ['Wage bill', `${money(me.wageBill)} of ${money(me.wageBudget)}`]] });
  return { ok: true, msg: `${p.name} signs on for ${p.contract} year${p.contract === 1 ? '' : 's'} at ${money(p.wage)} a season.` };
}

function renewContract(G, pid) {
  const me = G.teams[G.myTeam];
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  const rise = p.wantsOut ? 1.55 : p.rating > clubLevel(me) ? 1.35 : 1.18;
  const newWage = Math.round(p.wage * rise * 100) / 100;
  return negotiateContract(G, pid, newWage, Math.min(5, p.contract + rint(2, 3)));
}

function releasePlayer(G, pid) {
  const me = G.teams[G.myTeam];
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (me.squad.length <= MIN_SENIOR) return { ok: false, msg: `You can't release ${p.name}: you must keep at least ${MIN_SENIOR} senior players.` };
  if (me.captainId === pid) me.captainId = null;
  if (me.viceCaptainId === pid) me.viceCaptainId = null;
  const payoff = Math.round(p.wage * Math.max(0, p.contract) * 0.5 * 100) / 100;
  me.squad = me.squad.filter(x => x.id !== pid);
  me.budget = Math.round((me.budget - payoff) * 100) / 100;
  me.fin.buys += payoff;
  me.wageBill = wageOf(me);
  p.contract = 0;
  G.freeAgents.push(p);
  ensureLineup(me);
   news(G, 'contract', `${me.s} release ${p.name}.`);   mail(G, { cat: 'leaving', from: 'Chief Executive', p, club: null, status: 'Released: free agent', subject: `[Info] Contract Terminated: ${p.name}`,     body: [`${p.name} has been released from ${me.n} and is now a free agent.`],     rows: [['Pay-off', money(payoff)], ['Wages freed', money(p.wage) + ' a season'], ['This season', `${p.apps} apps, ${p.goals} goals`]] });
  return { ok: true, msg: `${p.name} released. Pay-off: ${money(payoff)}.` };
}

function ensurePastClubs(G, p, exceptId) {   p.clubs = p.clubs || [];   if (p.clubs.length || p.age < 19) return;   /* only players with no history at all, and not teenagers */   const n = p.age >= 26 ? rint(2, 3) : p.age >= 22 ? rint(1, 2) : 1;   let pool = G.teams.filter(t => t.id !== exceptId && Math.abs(clubLevel(t) - p.rating) < 16);   if (pool.length < n) pool = G.teams.filter(t => t.id !== exceptId);   const picks = shuffle(pool.slice()).slice(0, n);   const start = G.season - Math.min(n * 2, Math.max(1, p.age - 18));   picks.forEach((t, i) => p.clubs.push({ id: t.id, from: start + i * 2 })); } function signFreeAgent(G, pid, terms) {
  const me = G.teams[G.myTeam];
  const i = G.freeAgents.findIndex(p => p.id === pid);
  if (i < 0) return { ok: false, msg: 'He signed elsewhere.' };
  if (!inTransferWindow(G)) return { ok: false, msg: `The transfer window is shut. It reopens in ${roundsToNextWindow(G)} day${roundsToNextWindow(G) === 1 ? '' : 's'}.` };
  const cand = G.freeAgents[i];
  if (cand.nat !== 'ZA' && me.squad.filter(p => p.nat !== 'ZA').length >= MAX_FOREIGN)
    return { ok: false, msg: `You already have ${MAX_FOREIGN} foreign players. Sell or release one before signing another.` };
  if (terms && terms.bonus > me.budget) return { ok: false, msg: `You can't afford a ${money(terms.bonus)} signing-on fee.` };   if (me.wageBill + (terms ? terms.wage : cand.wage) > me.wageBudget) return { ok: false, msg: `Wage budget won't stretch to ${cand.name} — ${money(me.wageBill)} of ${money(me.wageBudget)} is already committed.` };
  const p = G.freeAgents.splice(i, 1)[0];
  p.contract = terms ? terms.years : rint(1, 3); p.wantsOut = false; p.lastMove = { from: (p.clubs && p.clubs.length ? p.clubs[p.clubs.length - 1].id : null), to: me.id, fee: 0, free: true, season: G.season }; p.reserve = firstTeamFull(me);   if (terms) { p.wage = terms.wage; me.budget = Math.round((me.budget - terms.bonus) * 100) / 100; me.fin.buys += terms.bonus; }
  p.clubs.push({ id: me.id, from: G.season });
  me.squad.push(p);
  me.wageBill = wageOf(me);
  ensureLineup(me);
    news(G, 'transfer', `${me.s} sign free agent ${p.name}.`, { pid: p.id, toId: me.id });    mailSigning(G, p, 0, null, terms ? terms.bonus : 0);
  return { ok: true, msg: `${p.name} joins on a free transfer.${p.reserve ? ' First team is full, so he starts in the reserves.' : ''}` };
}

const AI_NEED_N = { GK: 1, DEF: 4, MID: 4, ATT: 3 }; function aiTopAvg(t, grp, n) {   const a = t.squad.filter(p => POS_GROUP[p.pos] === grp).map(p => p.rating).sort((x, y) => y - x).slice(0, n);   return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 40; } function aiCanLose(t, p) { return t.squad.length > 22 && t.squad.filter(x => x.pos === p.pos).length > minAtPos(p.pos); } function aiRelease(G, t, p) {   t.squad = t.squad.filter(x => x.id !== p.id); p.contract = 0; p.wantsOut = false;   G.freeAgents.push(p); G.freeAgents = G.freeAgents.slice(-40);   t.wageBill = wageOf(t); ensureLineup(t); } function aiMove(G, p, seller, buyer, fee) {   if (seller) { seller.squad = seller.squad.filter(x => x.id !== p.id); seller.budget += fee; seller.fin.sales += fee; seller.wageBill = wageOf(seller); ensureLineup(seller); }   else { G.freeAgents = G.freeAgents.filter(x => x.id !== p.id); p.wage = faAskWage(p); p.lastMove = { from: null, to: buyer.id, fee: 0, free: true, season: G.season }; }   ensurePastClubs(G, p, buyer.id); p.clubs = p.clubs || []; p.clubs.push({ id: buyer.id, from: G.season }); p.wantsOut = false; p.contract = rint(2, 4);   buyer.squad.push(p); buyer.budget -= fee; buyer.fin.buys += fee; buyer.wageBill = wageOf(buyer); ensureLineup(buyer);   G.market = G.market.filter(m => m.pid !== p.id);   if (seller) {     logTransfer(G, p, seller.id, buyer.id, fee);     if (fee >= 6 || p.rating >= 76) news(G, 'transfer', `${p.name} moves from ${seller.s} to ${buyer.s} for ${money(fee)}.`, { pid: p.id, fromId: seller.id, toId: buyer.id });   } else if (p.rating >= 58 || buyer.tier === me().tier) news(G, 'transfer', `${p.name} has joined ${buyer.s} on a free transfer.`, { pid: p.id, toId: buyer.id }); } function aiBooksTick(G) {   G.teams.forEach(t => {     if (t.id === G.myTeam) return;     for (let n = 0; n < 2 && t.squad.length > 29; n++) {       const out = t.squad.slice().sort((a, b) => a.rating - b.rating).find(p => aiCanLose(t, p)); if (out) aiRelease(G, t, out); else break;     }     const last = t.finHistory && t.finHistory[t.finHistory.length - 1], bleeding = last && last.net < -0.2;     if ((t.budget < 0.5 || (bleeding && t.budget < 3)) && t.squad.length > 24 && rnd() < 0.6) {       const top = t.squad.slice().sort((a, b) => b.rating - a.rating).slice(0, 14).map(p => p.id);       const fringe = t.squad.filter(p => !top.includes(p.id) && aiCanLose(t, p)).sort((a, b) => b.wage - a.wage);       const p = fringe[0]; if (!p) return;       let sold = false;       if (inTransferWindow(G)) {         const fee = Math.round(p.value * 0.7 * 100) / 100;         const buyers = G.teams.filter(b => b.id !== G.myTeam && b.id !== t.id && b.squad.length < 30 && b.budget > fee * 1.5 && b.wageBill + p.wage <= b.wageBudget && Math.abs(clubLevel(b) - p.rating) < 9);         if (buyers.length && fee > 0.02) { aiMove(G, p, t, pick(buyers), fee); sold = true; }       }       if (!sold) aiRelease(G, t, p);     }   }); } function aiTransferTick(G) {   aiBooksTick(G);   if (!inTransferWindow(G)) return;   const ai = G.teams.filter(t => t.id !== G.myTeam);   for (let k = 0; k < 16; k++) {     const buyers = ai.filter(t => t.budget > 1 && t.squad.length < 30);     if (!buyers.length) return;     const buyer = wpick(buyers, t => 1 + Math.sqrt(t.budget));     const lvl = clubLevel(buyer);     let grp = null, worst = 0;     GROUP_ORDER.forEach(g => { const gap = lvl - aiTopAvg(buyer, g, AI_NEED_N[g]) + rnd() * 3; if (gap > worst) { worst = gap; grp = g; } });     if (!grp) continue;     const have = aiTopAvg(buyer, grp, AI_NEED_N[grp]);     if (buyer.squad.length < 25 || rnd() < 0.3) {       const fa = G.freeAgents.filter(p => POS_GROUP[p.pos] === grp && p.rating >= have - 2 && buyer.wageBill + p.wage <= buyer.wageBudget).sort((a, b) => b.rating - a.rating)[0];       if (fa) { aiMove(G, fa, null, buyer, 0); continue; }     }     const pool = [];     ai.forEach(s => {       if (s.id === buyer.id || s.squad.length <= 22) return;       s.squad.forEach(p => { if (POS_GROUP[p.pos] === grp && p.rating > have + 1 && p.rating <= lvl + 8 && p.age <= 34) pool.push({ p, s }); });     });     if (!pool.length) continue;     const c = wpick(pool, x => Math.pow(1.25, x.p.rating - have)), p = c.p, s = c.s;     const listed = G.market.find(m => m.pid === p.id);     const fee = Math.round(p.value * (listed ? listed.ask / p.value : 1.05 + rnd() * 0.35) * 100) / 100;     if (fee > buyer.budget * 0.6 || buyer.budget - fee < Math.max(0.3, buyer.wageBill * 0.12) || buyer.wageBill + p.wage > buyer.wageBudget || !aiCanLose(s, p)) continue;     const star = s.squad.slice().sort((a, b) => b.rating - a.rating).slice(0, 3).some(x => x.id === p.id);     if (star && (fee < p.value * 1.3 || rnd() > 0.35)) continue;     aiMove(G, p, s, buyer, fee);   } } function aiTransferTickOld(G) {
  if (!inTransferWindow(G)) return;
  for (let k = 0; k < 2; k++) {
    if (rnd() < 0.5) continue;
    const buyer = pick(G.teams.filter(t => t.id !== G.myTeam && t.budget > 2));
    const offers = G.market.filter(m => m.from !== buyer.id && m.from !== G.myTeam && m.ask < buyer.budget * 0.45);
    if (!offers.length) continue;
    const deal = pick(offers);
    const f = findPlayer(G, deal.pid);
    if (!f || f.t.squad.length <= 20 || buyer.squad.length >= 30) continue;
    if (f.t.squad.filter(p => p.pos === f.p.pos).length <= minAtPos(f.p.pos)) continue;
    f.t.squad = f.t.squad.filter(p => p.id !== deal.pid);
    f.t.budget += deal.ask; f.t.fin.sales += deal.ask;
    f.p.clubs.push({ id: buyer.id, from: G.season });
    f.p.wantsOut = false; f.p.contract = rint(2, 4);
    buyer.squad.push(f.p);
    buyer.budget -= deal.ask; buyer.fin.buys += deal.ask;
    buyer.wageBill = wageOf(buyer); f.t.wageBill = wageOf(f.t);
    ensureLineup(buyer); ensureLineup(f.t);
    G.market = G.market.filter(m => m.pid !== deal.pid);
    logTransfer(G, f.p, f.t.id, buyer.id, deal.ask);
    news(G, 'transfer', `${f.p.name} moves from ${f.t.s} to ${buyer.s} for ${money(deal.ask)}.`, { pid: f.p.id, fromId: f.t.id, toId: buyer.id });
  }
}

/* ---------------- part-exchange / swap deals ----------------
   How keen a selling club is to accept a given player as part of a deal:
   higher when that player fills a position they're genuinely short in and
   is a decent fit for their level, lower for an off-position makeweight
   or a player well below their standard. */
function sellerSwapFactor(seller, swapPlayer) {
  const lvl = clubLevel(seller);
  const grp = POS_GROUP[swapPlayer.pos] || 'MID';
  const haveAvg = aiTopAvg(seller, grp, AI_NEED_N[grp] || 3);
  const need = clamp((lvl - haveAvg) / 10, -0.3, 0.3);
  const ratingGap = clamp((swapPlayer.rating - (lvl - 8)) / 15, -0.4, 0.2);
  return clamp(0.55 + need + ratingGap, 0.25, 1.1);
}
/* When a club wants to buy one of your players, decide whether they'd
   also offer one of their own as a makeweight — a fringe player, not
   one of their better ones, worth a sensible slice of the deal. */
function pickSwapOffer(buyer, targetPlayer, totalValue) {
  if (buyer.squad.length < 20 || rnd() > 0.35) return null;
  const candidates = buyer.squad.filter(x => x.id !== targetPlayer.id && aiCanLose(buyer, x) &&
    x.value < totalValue * 0.85 && x.value > totalValue * 0.12);
  if (!candidates.length) return null;
  return pick(candidates);
}
function makeBid(buyer, p) {
const totalValue = capToClause(p, Math.round(p.value * (p.tl ? 0.65 + rnd() * 0.5 : 1 + rnd() * 0.7) * 100) / 100);
  const swap = pickSwapOffer(buyer, p, totalValue);
  const bid = { pid: p.id, name: p.name, rating: p.rating, pos: p.pos, nat: p.nat, from: buyer.id, fee: capToClause(p, totalValue), round: G.round };
  if (swap) {
    const swapCredit = Math.round(swap.value * 0.9 * 100) / 100;
    bid.fee = Math.max(0, Math.round((totalValue - swapCredit) * 100) / 100);
    bid.swapPid = swap.id; bid.swapName = swap.name; bid.swapPos = swap.pos; bid.swapRating = swap.rating; bid.swapValue = swap.value;
  }
  return bid;
}
/* Completes the incoming half of an accepted swap deal: moves the makeweight
   player from the buying club into your squad, no extra cash either way —
   their value was already netted into the reduced cash fee. */
function completeSwapLeg(G, buyerId, swapPid) {
  if (swapPid == null) return null;
  const buyer = G.teams[buyerId];
  const sp = buyer && buyer.squad.find(x => x.id === swapPid);
  if (!sp) return null;
  const myClub = G.teams[G.myTeam];
  if (sp.nat !== 'ZA' && myClub.squad.filter(x => x.nat !== 'ZA').length >= MAX_FOREIGN) return { blocked: true, name: sp.name };
  buyer.squad = buyer.squad.filter(x => x.id !== sp.id);
  myClub.squad.push(sp);
  sp.clubs.push({ id: myClub.id, from: G.season }); sp.signedAt = currentDateISO(); sp.tl = false;
  sp.contract = Math.max(sp.contract, 1);
  buyer.wageBill = wageOf(buyer); myClub.wageBill = wageOf(myClub);
  ensureLineup(buyer); ensureLineup(myClub);
  logTransfer(G, sp, buyer.id, myClub.id, 0);
  return { name: sp.name };
}
/* The outgoing half: you buy pid as normal (fee is just the cash top-up),
   then one of your own players moves the other way for no extra cash. */
function buyPlayerWithSwap(G, pid, fee, swapOutPid, terms) {
  const buyerClub = G.teams[G.myTeam];
  const target = findPlayer(G, pid);
  if (!target) return { ok: false, msg: 'He has already moved on.' };
  const sellerClub = target.t;
  const swapPlayer = swapOutPid != null ? buyerClub.squad.find(x => x.id === swapOutPid) : null;
  if (swapOutPid != null && !swapPlayer) return { ok: false, msg: 'That player is no longer in your squad.' };
  const res = buyPlayer(G, pid, fee, false, terms);
  if (!res.ok) return res;
  if (swapPlayer) {
    buyerClub.squad = buyerClub.squad.filter(x => x.id !== swapPlayer.id);
    sellerClub.squad.push(swapPlayer);
    swapPlayer.clubs.push({ id: sellerClub.id, from: G.season });
    swapPlayer.contract = Math.max(swapPlayer.contract, 1);
    buyerClub.wageBill = wageOf(buyerClub); sellerClub.wageBill = wageOf(sellerClub);
    ensureLineup(buyerClub); ensureLineup(sellerClub);
    logTransfer(G, swapPlayer, buyerClub.id, sellerClub.id, 0);
    res.msg += ` ${swapPlayer.name} heads the other way as part of the deal.`;
  }
  return res;
}
/* Interested clubs is a broad, flavour-text "who's admiring him" list for
   the player profile. An actual bid needs a tighter bar than that — a club
   that genuinely rates him well above their current option and has reason
   to move now, not just mild admiration — so most weeks most players draw
   nothing at all. */
const OFFER_EXPIRE_ROUNDS = 5; // a club waiting this many matchdays with no answer walks away
function genuineBuyers(p, ownerId) {
  return interestRanking(p, ownerId).filter(x => x.s >= 6.5 && (p.rating - starterRatingAt(x.t, p.pos)) >= 3);
}
function generateBids(G, scale) {
  if (!inTransferWindow(G)) return []; // clubs don't submit formal bids outside the window — scouting continues, offers don't
  const me = G.teams[G.myTeam], bids = [];
  me.squad.forEach(p => {
    if (p.notForSale || signLockLeft(p) > 0) return;     const suitors = p.tl ?    interestRanking(p, me.id).filter(x => x.s >= 3 && (p.rating - starterRatingAt(x.t, p.pos)) >= -1) : genuineBuyers(p, me.id);
    const interest = suitors.length;
    if (!interest) return; // nobody seriously in for him this week — no offer, full stop
    const base = p.tl ? 0.55 : (p.wantsOut ? 0.16 : 0.035);
    const interestBoost = Math.min(0.12, interest * 0.03);
    const chance = (base + interestBoost + (p.rating > 78 ? 0.04 : 0)) * (scale || 1);
    if (rnd() < chance) {
      const buyerId = wpick(suitors, x => Math.max(0.5, x.s)).t.id, buyer = G.teams[buyerId];
      bids.push(makeBid(buyer, p));
      // A genuinely hot prospect can draw a second, rival bid in the same
      // window — a real bidding war rather than always a single lone offer.
      if (interest >= 3 && rnd() < 0.25) {
        const rivals = suitors.filter(x => x.t.id !== buyerId);
        if (rivals.length) {
          const rival = wpick(rivals, x => Math.max(0.5, x.s)).t;
          bids.push(makeBid(rival, p));
        }
      }
    }
  });
  return bids.slice(0, 6);
}
/* ---------------- loan offers (incoming) ----------------
   Clubs sometimes come asking to borrow a player who isn't nailed on in
   your first XI — young squad depth, reserves, fringe men — never your
   captain or a key starter. Genuine need only, same as transfer bids:
   it's entirely possible a week passes with no loan interest at all. */
function loanEligible(t, p) {
  if (p.loan) return false;
  if (t.captainId === p.id || t.viceCaptainId === p.id) return false;
  const inXI = (t.lineup || []).includes(p.id);
  return p.ll || p.reserve || !inXI || p.age <= 21;
}
function loanInterestRanking(p, ownerId) {
  const owner = G.teams[ownerId], ptier = owner.tier;
  const windowOpen = inTransferWindow(G);
  const out = [];
  for (const t of G.teams) {
    if (t.id === ownerId || t.squad.length >= 30) continue;
    if (Math.abs(t.tier - ptier) > 2) continue;
    const d = p.rating - starterRatingAt(t, p.pos);
    if (d < -4) continue;
    if (p.nat !== 'ZA' && t.squad.filter(pl => pl.nat !== 'ZA').length >= MAX_FOREIGN) continue;
    let s = d + (t.tier > ptier ? 2 : 0);
    s += (hashS(p.id + '_loan_' + t.id + '_' + G.round) - 0.5) * 6;
    if (!windowOpen) s -= 4;
    out.push({ t, s });
  }
  return out.filter(x => x.s >= 1).sort((a, b) => b.s - a.s);
}
function dedupOffers(list) { const seen = new Set(); return list.filter(o => { const k = o.pid + '|' + o.from; if (seen.has(k)) return false; seen.add(k); return true; }); } function makeLoanOffer(club, p) {
  const seasons = rnd() < 0.25 ? 2 : 1;
  const need = p.rating - starterRatingAt(club, p.pos);
  let wageShare = 0.4 + Math.min(0.35, Math.max(0, need) * 0.03) + (rnd() - 0.5) * 0.1;
  wageShare = Math.max(0.25, Math.min(0.85, Math.round(wageShare * 20) / 20));
  return { pid: p.id, name: p.name, rating: p.rating, pos: p.pos, nat: p.nat, from: club.id, seasons, wageShare, round: G.round };
}
function generateLoanOffers(G) {
  const me = G.teams[G.myTeam], offers = [];
  if (!inTransferWindow(G)) return offers;
  const xi = lineupOf(me);
  me.squad.forEach(p => {
    if (p.notForSale || !loanEligible(me, p)) return;
    const interested = loanInterestRanking(p, me.id).slice(0, 6).map(x => x.t);
    if (!interested.length) return;
    if (!p.ll && xi.includes(p)) return;   /* regular starters don't get unsolicited loan requests */     const fit = p.age >= 30 ? 0.12 : p.age >= 27 ? 0.45 : (p.age <= 23 || p.reserve) ? 1.6 : 1;   /* mostly young and fringe players */     const chance = p.ll ? Math.min(0.6, 0.25 + interested.length * 0.05) : Math.min(0.08, (0.02 + interested.length * 0.01) * fit);
    if (rnd() < chance) {
      const club = wpick(interested, t => 1 + Math.max(0, clubLevel(t) - clubLevel(me) + 10));
      if ((G.pendingLoanOffers || []).some(o => o.pid === p.id && o.from === club.id)) return;       offers.push(makeLoanOffer(club, p));
    }
  });
  return offers.slice(0, 4);
}
function acceptLoanOffer(G, pid, from) {
  const me = G.teams[G.myTeam];
  const offer = (G.pendingLoanOffers || []).find(o => o.pid === pid && o.from === from);
  if (!offer) return { ok: false, msg: 'That loan offer is no longer available.' };
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (me.squad.length <= MIN_SENIOR) return { ok: false, msg: `You can't loan ${p.name} out: you must keep at least ${MIN_SENIOR} senior players.` };
  if (me.captainId === pid || me.viceCaptainId === pid) return { ok: false, msg: `${p.name} is captain or vice-captain — can't be loaned out.` };
  const club = teamById(G, from);
  if (!club) return { ok: false, msg: 'That club is unavailable.' };
  p.loan = { from: me.id, seasons: offer.seasons, wageShare: offer.wageShare }; p.ll = false;
  me.squad = me.squad.filter(x => x.id !== pid);
  club.squad.push(p);
  p.clubs.push({ id: club.id, from: G.season, loan: true });
  me.wageBill = wageOf(me); club.wageBill = wageOf(club);
  ensureLineup(me); ensureLineup(club);
  G.pendingLoanOffers = (G.pendingLoanOffers || []).filter(o => o.pid !== pid);
  news(G, 'transfer', `${p.name} joins ${club.s} on loan from ${me.s}.`, { pid: p.id, fromId: me.id, toId: club.id });
  mail(G, { cat: 'leaving', from: 'Chief Executive', p, club, status: `On loan at ${club.s}`, subject: `[Info] Loan Agreed: ${p.name}`,
    body: [`${p.name} has joined ${club.n} on loan.`, `You can recall him from the Squad screen if you need him back.`],
    rows: [['Loan club', club.n], ['Length', `${offer.seasons} season${offer.seasons === 1 ? '' : 's'}`], ['Wage share paid by borrower', Math.round(offer.wageShare * 100) + '%']] });
  return { ok: true, msg: `${p.name} goes out on loan to ${club.s}.` };
}
/* Keep a running record of which clubs have been watching each of your
   players, and since when — not just a fresh re-roll every time someone
   opens a profile. Also drops a quiet transfer-news line the first time a
   player of some note picks up a scout. Call once per matchday. */
function updateScouting(G) {
  const me = G.teams[G.myTeam];
  const notable = [], courted = [];
  me.squad.forEach(p => {
    p.scouts = p.scouts || {};
    const hadAny = Object.keys(p.scouts).length > 0;
    const hadBigger = biggerSuitors(G, me, p).length;
    const nowWatching = interestedClubs(p, me.id, 6).map(t => t.id);
    const nowSet = new Set(nowWatching);
    Object.keys(p.scouts).forEach(cid => { if (!nowSet.has(+cid)) delete p.scouts[cid]; });
    nowWatching.forEach(cid => { if (!p.scouts[cid]) p.scouts[cid] = { since: G.round }; });
    if (!hadAny && nowWatching.length && p.rating >= 65) notable.push(p);
    if (hadBigger < 2 && biggerSuitors(G, me, p).length >= 2) courted.push(p);
  });
  notable.forEach(p => {
    const names = Object.keys(p.scouts).map(cid => G.teams[+cid].s).slice(0, 2).join(' and ');
    news(G, 'transfer', `Scouts from ${names} have been watching ${p.name}.`, { pid: p.id });
  });
  // His agent's heads-up, the first time a regular is being courted by two or more bigger clubs
  const top = me.squad.slice().sort((a, b) => b.rating - a.rating).slice(0, 14).map(x => x.id);
  courted.filter(p => top.includes(p.id) && p.rating >= 60).slice(0, 1).forEach(p => {
    const big = biggerSuitors(G, me, p);
    const names = suitorNames(big, 'n');
    mail(G, { key: 'courted_' + p.id + '_' + G.season, cat: 'request', from: `${p.name}'s Agent`, p, club: me, status: 'Being courted',
      subject: `Interest in ${p.name}`,
      body: [`${names} are monitoring ${p.name}, and word has reached his camp.`, 'Tying him to a new deal quietens the speculation. Left alone, it can start to unsettle him.'],
      rows: [['Interested', big.map(c => c.s).join(', ')], ['Current wage', money(p.wage) + ' a season'], ['Contract', `${p.contract} year${p.contract === 1 ? '' : 's'} left`]].concat(p.mood != null ? [['Mood', moodLabel(p.mood)[0]]] : []), act: 'contract' });
  });
  try { warnExposedClauses(G); } catch (e) { console.error('clause warning', e); }
}

/* "Maccabi and Umoya", or "Maccabi, Umoya and 2 more" */
function suitorNames(list, key) {
  return list.length <= 2 ? list.map(c => c[key]).join(' and ') : `${list[0][key]}, ${list[1][key]} and ${list.length - 2} more`;
}

/* Clubs watching him that are a step up from yours: a higher division, or clearly stronger. */
function biggerSuitors(G, t, p) {
  if (!p.scouts) return [];
  const lvl = clubLevel(t);
  return Object.keys(p.scouts).map(cid => G.teams[+cid]).filter(c => c && (c.tier < t.tier || clubLevel(c) > lvl + 2));
}

/* Mood factor: being courted by bigger clubs unsettles him — more if he's ambitious
   or in it for the money, much less if he's loyal, and it builds the longer it drags on.
   Signing him to a new deal clears his suitors, so it lifts straight away. */
function courtedFactor(G, t, p, add, has) {
  if (t.id !== G.myTeam) return;
  const big = biggerSuitors(G, t, p);
  if (!big.length) return;
  // how long the longest-standing bigger suitor has been circling (a season rollover counts as long)
  const dur = Math.max(...big.map(c => { const w = G.round - p.scouts[c.id].since; return w < 0 ? 20 : w; }));
  const time = 1 + 0.8 * Math.min(1, dur / 20);              // builds by ~80% over ~20 matchdays with no new deal
  // it only really gets to a player who has outgrown his club; one no better than the level around him barely notices
  const outgrown = Math.max(0.2, Math.min(1, (p.rating - clubLevel(t)) / 8 + 0.4));
  const s = -Math.min(0.8, 0.2 + 0.2 * big.length) * time * outgrown;
  const names = suitorNames(big, 's');
  add('courted', s, 9, (has('amb') ? 1.5 : 1) * (has('mer') ? 1.2 : 1) * (has('loy') ? 0.4 : 1),
    dur >= 10 ? `Restless after weeks of interest from ${names}` : `Tempted by interest from ${names}`);
}

/* The one case where being courted counts toward an actual transfer request: a player who has
   genuinely outgrown the club, isn't happy, and has had two or more bigger clubs circling for
   weeks with no new deal. It speeds up the existing "unhappy for several matchdays" clock. */
function courtedRestless(G, t, p) {
  if (t.id !== G.myTeam || p.mood == null || p.mood >= 48) return false;
  if (p.rating - clubLevel(t) < 6) return false;
  const big = biggerSuitors(G, t, p);
  if (big.length < 2) return false;
  return Math.max(...big.map(c => { const w = G.round - p.scouts[c.id].since; return w < 0 ? 20 : w; })) >= 12;
}

/* A clause that's cheap next to his value, with clubs able to pay it, deserves a heads-up — once a season per player. */
function warnExposedClauses(G) {
  if (!inTransferWindow(G)) return;
  const me = G.teams[G.myTeam];
  let sent = 0;
  me.squad.forEach(p => {
    if (sent >= 2 || !p.releaseClause || p.loan || p.releaseClause > p.value * 1.5) return;
    const n = clauseSuitors(G, p).length;
    if (n < 2) return;
    const m = mail(G, { key: 'clausewarn_' + p.id + '_' + G.season, cat: 'leaving', from: 'Chief Executive', p, club: me, flag: true, status: 'Release clause exposed',
      subject: `[Warning] Release clause exposed: ${p.name}`,
      body: [`${p.name}'s release clause of ${money(p.releaseClause)} is low enough that ${n} interested club${n === 1 ? '' : 's'} could pay it right now.`, 'If one of them does, the move goes through with no negotiation and no chance to refuse. Raise or remove the clause from his profile if you want to keep him.'],
      rows: [['Release clause', money(p.releaseClause)], ['Market value', money(p.value)], ['Interested clubs who can pay', n]], act: 'squad' });
    if (m) sent++;
  });
}

/* ---------------- news ---------------- */
    /* ---- shortlist alerts: contract running down, listed, free agent, or moved club ---- */
function watchlistAlerts(G) {
  G.wlClub = G.wlClub || {};
  (G.watchlist || []).forEach(pid => {
    const f = findPlayer(G, pid); if (!f) return;
    const p = f.p || f, club = f.t || null;
    if (club && club.id === G.myTeam) return;
    const send = (tag, subject, lines) => mail(G, { cat: 'scout', from: 'Scouting Department', subject, body: lines, p, club: club || undefined, key: `wl:${tag}:${pid}:${G.season}` });
    const prev = G.wlClub[pid], cur = club ? club.id : 'FA';
    if (prev != null && prev !== cur) {
      if (cur === 'FA') send('fa' + G.round, `${p.name} is a free agent`, [`${p.name} (${p.pos}, ${p.rating}) has left ${prev !== 'FA' && G.teams[prev] ? G.teams[prev].n : 'his club'} and is available on a free.`, 'You can sign him from the Free agents list without a transfer fee.']);
      else send('mv' + G.round, `${p.name} has joined ${club.n}`, [`Your shortlisted target ${p.name} (${p.pos}, ${p.rating}) is now at ${club.n}.`]);
    }
    G.wlClub[pid] = cur;
    if (!club) return;
    if (p.contract <= 1) send('ct', `${p.name}: contract running down`, [`${p.name}'s deal at ${club.n} ends this season. He could be a free agent soon, or cheap to buy.`]);
    if (p.tl || p.ll || p.wantsOut) send('tl', `${p.name} is available`, [`${club.n} are willing to let ${p.name} (${p.pos}, ${p.rating}) go.`, 'Now could be a good time to make an offer.']);
  });
}
function news(G, kind, text, meta) {
  G.news.unshift({ season: G.season, round: G.round, kind, text, meta: meta || null }); try { bthOnNews(G, kind, text, meta); } catch (e) { console.error('Bathini', e); }
  if (G.news.length > 60) G.news.pop();   const myT = G.teams && G.teams[G.myTeam];   if (myT && (kind === 'career' || kind === 'season' || kind === 'cup' || kind === 'nation' || /sponsor/i.test(text)) && (text.includes(myT.n) || text.includes(myT.s))) {     mail(G, { cat: 'news', from: 'Press Office', subject: 'Breaking News: ' + (text.length > 48 ? text.slice(0, 46) + '…' : text), body: [text] });   }
}

/* ============================================================
   Mzansi Manager — continent, national teams, extra cups, career
   ============================================================ */

function clubRating(str) { return Math.round(44 + str * 3.6); }

/* ---------------- African leagues ---------------- */
function initAfrica(G) {
  G.africa = {
    leagues: AFRICAN_LEAGUES.map(L => ({
      code: L.code, name: L.name, nat: L.nat, rank: L.rank,
      clubs: L.clubs.map(([n, s], i) => ({ id: L.code + i, n, str: s, rating: clubRating(s) })),
      table: L.clubs.map(([n], i) => ({ id: L.code + i, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 })),
      round: 0, fixtures: null, champion: null, lastChampion: null, lastRunnerUp: null
    })),
    caf: null, confed: null, afcon: null, afconHistory: [], cafHistory: [], confedHistory: [],
    squadCache: {}
  };
  G.africa.leagues.forEach(L => L.fixtures = roundRobin(L.clubs.map(c => c.id)));
}
function afrClub(G, id) {
  for (const L of G.africa.leagues) { const c = L.clubs.find(x => x.id === id); if (c) return c; }
  return null;
}
function afrLeagueOf(G, id) { return G.africa.leagues.find(L => L.clubs.some(c => c.id === id)); }

function afrLeagueOf(G, id) { return G.africa.leagues.find(L => L.clubs.some(c => c.id === id)); }

/* lazily build (and cache for the season) a full squad for a foreign African club,
   so CAF/Confed ties can be simulated through the real match engine */
function buildForeignClub(G, id) {
  G.africa.squadCache = G.africa.squadCache || {};
  if (G.africa.squadCache[id]) return G.africa.squadCache[id];
  const c = afrClub(G, id), L = afrLeagueOf(G, id);
  if (!c || !L) return null;
  const season = G.season;
  const tier = c.str >= 8.6 ? 0 : c.str >= 7.3 ? 1 : c.str >= 6.2 ? 2 : 3;
  const colors = colorsForClub(c.n);
  const pseudo = { nat: L.nat, base: c.str, tier, scout: 'AFR' };
  const t = {
    id, n: c.n, s: c.n.length > 16 ? c.n.slice(0, 16) : c.n, nat: L.nat, city: L.name,
    base: c.str, fin: clamp(c.str * 5, 12, 140), youth: 2,
    c1: colors.c1, c2: colors.c2,
    squad: makeSquad(pseudo, season),
    budget: clamp(c.str * 5, 12, 140), wageBudget: 0, wageBill: 0,
    formation: pick(Object.keys(FORMATIONS)), lineup: null,
    trophies: [], history: [], form: [], rep: c.rating / 10,
    captainId: null, viceCaptainId: null
  };
  t.squad.forEach(p => p.clubs.push({ id, from: season }));
  t.wageBill = wageOf(t);
  t.wageBudget = Math.round(t.wageBill * 1.4 * 100) / 100;
  ensureLineup(t);
  const ranked = t.squad.slice().sort((a, b) => b.rating - a.rating);
  if (ranked[0]) t.captainId = ranked[0].id;
  if (ranked[1]) t.viceCaptainId = ranked[1].id;
  G.africa.squadCache[id] = t;
  return t;
}

function simAbstract(ra, rb, homeAdv) {
  const dH = ra + (homeAdv || 0) - rb + gauss() * 2.4;
  const dA = rb - ra - (homeAdv || 0) + gauss() * 2.4;
  const xgH = clamp(1.12 * Math.pow(1.062, dH), 0.15, 4.4);
  const xgA = clamp(1.12 * Math.pow(1.062, dA), 0.12, 4.4);
  return [Math.min(poisson(xgH), 7), Math.min(poisson(xgA), 7)];
}

function africaRound(G) {
  G.africa.leagues.forEach(L => {
    if (L.round >= L.fixtures.length) return;
    L.fixtures[L.round].forEach(m => {
      const A = afrClub(G, m.h), B = afrClub(G, m.a);
      const [hg, ag] = simAbstract(A.rating, B.rating, 2.6);
      const rh = L.table.find(r => r.id === m.h), ra = L.table.find(r => r.id === m.a);
      rh.p++; ra.p++; rh.gf += hg; rh.ga += ag; ra.gf += ag; ra.ga += hg;
      if (hg > ag) { rh.w++; ra.l++; rh.pts += 3; } else if (ag > hg) { ra.w++; rh.l++; ra.pts += 3; } else { rh.d++; ra.d++; rh.pts++; ra.pts++; }
    });
    L.round++;
  });
}
function afrTable(L) {
  return L.table.slice().sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
}
function africaSeasonEnd(G) {
  G.africa.leagues.forEach(L => {
    const st = afrTable(L);
    L.lastChampion = st[0].id; L.lastRunnerUp = st[1].id;
    L.champion = st[0].id;
    L.table = L.clubs.map(c => ({ id: c.id, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }));
    L.round = 0;
    L.fixtures = roundRobin(shuffle(L.clubs.map(c => c.id)));
    /* clubs drift a little */
    L.clubs.forEach(c => { c.str = clamp(c.str + (rnd() - 0.5) * 0.4, 5.6, 9.9); c.rating = clubRating(c.str); });
  });
}

/* ---------------- CAF Champions League ---------------- */
const CAF_AT = [6, 12, 19, 25];
const CONFED_AT = [7, 13, 20, 26];
const CAF_ROUNDS = ['Round of 16', 'Quarter-final', 'Semi-final', 'Final'];
const CONFED_NAME = 'African Football Cup';

function entrantSA(G, rank) {
  const prev = G.records.seasons[G.records.seasons.length - 1];
  if (prev && rank <= 1) return rank === 0 ? prev.champ : (prev.runnerUp != null ? prev.runnerUp : prev.champ);
  if (prev && prev.topEight && prev.topEight[rank] != null && G.teams[prev.topEight[rank]]) return prev.topEight[rank];   // last season's final table
  /* first season: there is no table yet, so the strongest top-flight clubs get the continental places */
  const strong = G.teams.filter(t => t.tier === 0).sort((a, b) => ((b.base || 0) - (a.base || 0)) || (teamOverall(b) - teamOverall(a)));
  return (strong[rank] || strong[strong.length - 1]).id;
}
function buildCAF(G) {
  const A = G.africa;
  const list = [];
  list.push({ sa: true, id: entrantSA(G, 0) });
  const second = entrantSA(G, 1);
  list.push({ sa: true, id: second === list[0].id ? sortTable(G, 0)[1].id : second });
  const byRank = A.leagues.slice().sort((a, b) => a.rank - b.rank);
  const need = 16 - list.length;
  byRank.slice(0, need).forEach(L => {
    const champ = L.lastChampion || afrTable(L)[0].id;
    list.push({ sa: false, id: champ });
  });
  /* pad with next-best-ranked runners-up in case a league had no valid champion
     (should not trigger with a full continental dataset, but keeps this robust) */
  if (list.length < 16) {
    byRank.forEach(L => {
      if (list.length >= 16) return;
      const ru = L.lastRunnerUp || (afrTable(L)[1] && afrTable(L)[1].id);
      if (ru != null && !list.some(x => !x.sa && x.id === ru)) list.push({ sa: false, id: ru });
    });
  }
  A.caf = { stage: 0, alive: shuffle(list.slice(0, 16)), log: [], winner: null, done: false };
}
function buildConfed(G) {
  const A = G.africa;
  const list = [];
  /* 3rd to 5th in last season's table (or the strongest clubs in season one), never a club already in the Champions League */
  const inCaf = new Set((A.caf && A.caf.alive ? A.caf.alive : []).filter(x => x.sa).map(x => x.id));
  for (let r = 2; list.length < 3 && r < 14; r++) {
    const id = entrantSA(G, r);
    if (id != null && !inCaf.has(id) && !list.some(x => x.sa && x.id === id)) list.push({ sa: true, id });
  }
  const byRank = A.leagues.slice().sort((a, b) => a.rank - b.rank);
  const cafIds = new Set((A.caf && A.caf.alive ? A.caf.alive : []).filter(x => !x.sa).map(x => x.id));
  const need = 16 - list.length;
  const candidates = [];
  byRank.forEach(L => {
    const champ = L.lastChampion || afrTable(L)[0].id;
    if (cafIds.has(champ)) {
      const ru = L.lastRunnerUp || (afrTable(L)[1] && afrTable(L)[1].id);
      if (ru != null) candidates.push({ sa: false, id: ru });
    } else {
      candidates.push({ sa: false, id: champ });
    }
  });
  candidates.slice(0, need).forEach(c => list.push(c));
  if (list.length < 16) {
    byRank.forEach(L => {
      if (list.length >= 16) return;
      const third = afrTable(L)[2];
      if (third && !list.some(x => !x.sa && x.id === third.id)) list.push({ sa: false, id: third.id });
    });
  }
  A.confed = { stage: 0, alive: shuffle(list.slice(0, 16)), log: [], winner: null, done: false };
}
function cafName(G, e) { return e.sa ? G.teams[e.id].n : afrClub(G, e.id).n; }
function cafShort(G, e) { return e.sa ? G.teams[e.id].s : afrClub(G, e.id).n; }
function cafRating(G, e) { return e.sa ? teamOverall(G.teams[e.id]) : afrClub(G, e.id).rating; }

function cafLeg(G, home, away) {
  const H = home.sa ? G.teams[home.id] : buildForeignClub(G, home.id);
  const A = away.sa ? G.teams[away.id] : buildForeignClub(G, away.id);
  if (!H || !A) { const [hg, ag] = simAbstract(cafRating(G, home), cafRating(G, away), 2.6); return [hg, ag]; }
  const ctx = createMatchTeams(H, A, false);
  runPeriod(G, ctx, 1, 90);
  finishMatch(G, ctx);
  if (!home.sa) { const Hc = G.africa.squadCache[home.id]; if (Hc) Hc.squad.forEach(p => { p.inj = 0; p.pendingInj = 0; }); }
  if (!away.sa) { const Ac = G.africa.squadCache[away.id]; if (Ac) Ac.squad.forEach(p => { p.inj = 0; p.pendingInj = 0; }); }
  return [ctx.hg, ctx.ag];
}

function playContinentalRound(G, key, trophyName, prizeAmt, historyKey, newsKind) {
  const c = G.africa[key];
  if (!c || c.done) return null;
  const ids = c.alive.slice(), ties = [];
  for (let i = 0; i < ids.length; i += 2) {
    const A = ids[i], B = ids[i + 1];
    if (!B) { ties.push({ a: A, b: A, bye: true, winner: A, stage: c.stage }); continue; }
    const LL = contLiveLegs(G, key, c.stage, A, B);
    const leg1 = LL ? LL[0] : cafLeg(G, A, B);
    const leg2 = c.stage === 3 ? [0, 0] : (LL ? LL[1] : cafLeg(G, B, A));
    const aggA = leg1[0] + leg2[1], aggB = leg1[1] + leg2[0];
    let winner, pens = null;
    if (aggA === aggB) {
      let pa = 0, pb = 0;
      do { pa += rnd() < 0.75 ? 1 : 0; pb += rnd() < 0.74 ? 1 : 0; } while (pa === pb);
      pens = [pa + 3, pb + 3]; winner = pa > pb ? A : B;
    } else winner = aggA > aggB ? A : B;
    ties.push({ a: A, b: B, leg1, leg2, aggA, aggB, pens, winner, stage: c.stage, single: c.stage === 3 });
  }
  c.log.push({ stage: c.stage, ties });   ties.forEach(t => {     if (t.bye || !(t.a.sa || t.b.sa)) return;     const w = t.winner, l = w === t.a ? t.b : t.a, hi = Math.max(t.aggA, t.aggB), lo = Math.min(t.aggA, t.aggB), rd = (CAF_ROUNDS[t.stage] || 'round').toLowerCase();     news(G, newsKind, t.pens ? `${cafShort(G, w)} edge ${cafShort(G, l)} on penalties (${hi}–${lo} on aggregate) in the ${trophyName} ${rd}.` : `${cafShort(G, w)} beat ${cafShort(G, l)} ${hi}–${lo} on aggregate in the ${trophyName} ${rd}.`, {});   });   ties.forEach(t => { if (!t.bye && t.winner.sa) payPrize(G, t.winner.id, prizeAmt * 0.04 * (c.stage + 1), trophyName + ' round prize'); });
  c.alive = ties.map(t => t.winner);
  if (c.alive.length === 1) {
    c.done = true; c.winner = c.alive[0];
    const w = c.winner;
    const nm = cafName(G, w);
    if (w.sa) { G.teams[w.id].trophies.push({ season: G.season, name: trophyName }); payPrize(G, w.id, prizeAmt, trophyName + ' winners prize'); }
    news(G, newsKind, `${nm} win the ${trophyName}.`);
    G.africa[historyKey].push({ season: G.season, winner: nm });
  }
  c.stage++;
  return ties;
}
function playCAFRound(G) { return playContinentalRound(G, 'caf', CAF_NAME, 45, 'cafHistory', 'caf'); }
function playConfedRound(G) { return playContinentalRound(G, 'confed', CONFED_NAME, 20, 'confedHistory', 'caf'); }

/* ---------------- domestic cups ---------------- */
/* Mzansi8: last season's top eight of the Premiership, played early.
   Bayakhala Knockout: all 32 clubs of the top two divisions, mid-season. */
const S8_AT = [2, 5, 9];
const KO_AT = [15, 20, 24, 29];

function buildExtraCups(G) {
  const st = sortTable(G, 0);
  const prev = G.records.seasons[G.records.seasons.length - 1];
  let eight;
  if (prev && prev.topEight) eight = prev.topEight.slice();
  else eight = st.slice(0, 8).map(r => r.id);
  eight = eight.filter(id => G.teams[id]);
  while (eight.length < 8) { const cand = st.find(r => !eight.includes(r.id)); eight.push(cand.id); }
  G.super8 = { name: SUPER8, alive: shuffle(eight.slice(0, 8)), stage: 0, log: [], winner: null, done: false };
  const ko = G.teams.filter(t => t.tier <= 1).map(t => t.id);
  G.knockout = { name: KNOCKOUT, alive: shuffle(ko), stage: 0, log: [], winner: null, done: false };
}
const S8_ROUNDS = ['Quarter-final', 'Semi-final', 'Final'];
const KO_ROUNDS = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];

function playKnockoutRound(G, comp, rounds, prize) {
  if (!comp || comp.done) return null;
  const ids = comp.alive.slice(), ties = [];
  for (let i = 0; i < ids.length; i += 2) {
    const h = ids[i], a = ids[i + 1];
    if (a == null) { comp.alive = [h]; continue; }
    const ctx = createMatch(G, h, a, true);
    runPeriod(G, ctx, 1, 90);
    let winner, pens = null;
    if (ctx.hg === ctx.ag) {
      let ph = 0, pa = 0;
      do { ph += rnd() < 0.76 ? 1 : 0; pa += rnd() < 0.74 ? 1 : 0; } while (ph === pa);
      pens = [ph + 3, pa + 3]; winner = ph > pa ? h : a;
    } else winner = ctx.hg > ctx.ag ? h : a;
    finishMatch(G, ctx);
    ties.push({ h, a, hg: ctx.hg, ag: ctx.ag, pens, winner, stage: comp.stage });
  }
  if (ties.length) {
    comp.log.push({ stage: comp.stage, ties });       ties.forEach(t => payPrize(G, t.winner, prize * 0.04 * (comp.stage + 1), comp.name + ' round prize'));     if (ties.length === 1) { const t0 = ties[0]; payPrize(G, t0.winner === t0.h ? t0.a : t0.h, prize * 0.4, comp.name + ' runners-up prize'); }
    comp.alive = ties.map(t => t.winner);
  }
  if (comp.alive.length === 1) {
    comp.done = true; comp.winner = comp.alive[0];
    const w = G.teams[comp.winner];
    w.trophies.push({ season: G.season, name: comp.name });
    payPrize(G, w.id, prize, comp.name + ' winners prize');
    news(G, 'cup', `${w.n} win the ${comp.name}.`);
  }
  comp.stage++;
  return ties;
}

/* ---------------- national teams / AFCON ---------------- */
function natSquad(G, code) {
  const pool = [];
  G.teams.forEach(t => t.squad.forEach(p => { if (p.nat === code) pool.push({ p, t }); }));
  return pool.sort((a, b) => b.p.rating - a.p.rating).slice(0, 23);
}
function natRating(G, code) {
  const base = NAT_STRENGTH[code] || 5;
  let r = 44 + base * 3.9;
  const sq = natSquad(G, code);
  if (sq.length >= 11) {
    const top = sq.slice(0, 11).reduce((s, x) => s + x.p.rating, 0) / 11;
    r = r * 0.55 + top * 0.45;
  }
  return Math.round(r);
}

function initAfcon(G) {
  G.africa.afcon = { phase: 'qualifiers', season: G.season, groups: [], qualified: [], finals: null, winner: null, round: 0 };
  const nations = shuffle(CAF_NATIONS.slice());
  const groups = [];
  for (let i = 0; i < 12; i++) groups.push([]);
  nations.forEach((n, i) => groups[i % 12].push(n));
  G.africa.afcon.groups = groups.map(g => ({
    teams: g, table: g.map(c => ({ c, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }))
  }));
}
function runQualifiers(G) {
  const A = G.africa.afcon;
  A.groups.forEach(g => {
    for (let i = 0; i < g.teams.length; i++) {
      for (let j = i + 1; j < g.teams.length; j++) {
        for (let leg = 0; leg < 2; leg++) {
          const h = leg ? g.teams[j] : g.teams[i], a = leg ? g.teams[i] : g.teams[j];
          const [hg, ag] = simAbstract(natRating(G, h), natRating(G, a), 2.8);
          const rh = g.table.find(r => r.c === h), ra = g.table.find(r => r.c === a);
          rh.p++; ra.p++; rh.gf += hg; rh.ga += ag; ra.gf += ag; ra.ga += hg;
          if (hg > ag) { rh.w++; ra.l++; rh.pts += 3; } else if (ag > hg) { ra.w++; rh.l++; ra.pts += 3; } else { rh.d++; ra.d++; rh.pts++; ra.pts++; }
        }
      }
    }
    g.table.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
  });
  A.qualified = [];
  A.groups.forEach(g => { A.qualified.push(g.table[0].c, g.table[1].c); });
  A.phase = 'qualified';
  const za = A.qualified.includes('ZA');
  news(G, 'nation', za ? `Bafana Bafana qualify for the ${AFCON_NAME}.` : `Bafana Bafana miss out on the ${AFCON_NAME}.`);
}

function runAfconFinals(G) {
  const A = G.africa.afcon;
  const teams = A.qualified.slice(0, 24);
  const groups = [];
  for (let i = 0; i < 6; i++) groups.push({ teams: [], table: [] });
  shuffle(teams).forEach((c, i) => groups[i % 6].teams.push(c));
  groups.forEach(g => {
    g.table = g.teams.map(c => ({ c, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }));
    for (let i = 0; i < g.teams.length; i++) for (let j = i + 1; j < g.teams.length; j++) {
      const [hg, ag] = simAbstract(natRating(G, g.teams[i]), natRating(G, g.teams[j]), 0);
      const rh = g.table.find(r => r.c === g.teams[i]), ra = g.table.find(r => r.c === g.teams[j]);
      rh.p++; ra.p++; rh.gf += hg; rh.ga += ag; ra.gf += ag; ra.ga += hg;
      if (hg > ag) { rh.w++; ra.l++; rh.pts += 3; } else if (ag > hg) { ra.w++; rh.l++; ra.pts += 3; } else { rh.d++; ra.d++; rh.pts++; ra.pts++; }
    }
    g.table.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
  });
  const last16 = [];
  groups.forEach(g => last16.push(g.table[0].c, g.table[1].c));
  const thirds = groups.map(g => g.table[2]).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga)).slice(0, 4);
  thirds.forEach(t => last16.push(t.c));
  const rounds = [], names = ['Round of 16', 'Quarter-final', 'Semi-final', 'Final'];
  let alive = shuffle(last16);
  for (let s = 0; s < 4; s++) {
    const ties = [];
    for (let i = 0; i < alive.length; i += 2) {
      const a = alive[i], b = alive[i + 1];
      let [ag, bg] = simAbstract(natRating(G, a), natRating(G, b), 0);
      let pens = null, winner;
      if (ag === bg) {
        let pa = 0, pb = 0;
        do { pa += rnd() < 0.75 ? 1 : 0; pb += rnd() < 0.74 ? 1 : 0; } while (pa === pb);
        pens = [pa + 3, pb + 3]; winner = pa > pb ? a : b;
      } else winner = ag > bg ? a : b;
      ties.push({ a, b, ag, bg, pens, winner });
    }
    rounds.push({ name: names[s], ties });
    alive = ties.map(t => t.winner);
  }
  A.finals = { groups, rounds };
  A.winner = alive[0];
  A.phase = 'done';
  A.lastFinals = { rounds: A.finals.rounds, winner: alive[0], season: G.season };   try { intlAfconCredit(G); } catch (e) { console.error('intl', e); }
  G.africa.afconHistory.push({ season: G.season, winner: A.winner, runnerUp: rounds[3].ties[0].winner === A.winner ? (rounds[3].ties[0].a === A.winner ? rounds[3].ties[0].b : rounds[3].ties[0].a) : null });
  news(G, 'nation', `${natName(A.winner)} win the ${AFCON_NAME}.`);
  const za = natSquad(G, 'ZA').filter(x => x.t.id === G.myTeam);
  if (za.length) news(G, 'nation', `${za.length} ${G.teams[G.myTeam].s} player${za.length === 1 ? '' : 's'} featured for Bafana Bafana at the finals.`);
}

/* ---------------- manager reputation and job offers ---------------- */
function repFor(G, pos, tier, trophies, promoted, relegated) {
  const target = tier === 0 ? 8 : TIER_SIZE - 4;
  let pts = (target - pos) * (tier === 0 ? 1.7 : tier === 1 ? 1.25 : 0.95);
  pts += trophies * 13;
  if (promoted) pts += 18;
  if (relegated) pts -= 22;
  if (pos <= 3) pts += 6;
  return pts;
}
function updateReputation(G, sum) {
  const my = G.teams[G.myTeam];
  const last = my.history[my.history.length - 1];
  const won = my.trophies.filter(t => t.season === sum.season).length;
  const gain = repFor(G, last.pos, last.tier, won, sum.promoted.includes(G.myTeam), sum.relegated.includes(G.myTeam));
  G.manager.rep = Math.round(clamp((G.manager.rep || 40) * 0.82 + gain, 0, 100));
  G.manager.seasons = (G.manager.seasons || 0) + 1;
  G.manager.trophies = (G.manager.trophies || 0) + won;
  G.manager.clubs = G.manager.clubs || [{ id: G.myTeam, from: sum.season }];
  G.manager.wage = G.manager.wage || Math.max(0.3, my.rep * 1.1);
  G.manager.careerEarnings = Math.round(((G.manager.careerEarnings || 0) + G.manager.wage) * 100) / 100;
}
function askForRaise(G) {
  const my = G.teams[G.myTeam];
  const last = my.history[my.history.length - 1];
  const doingWell = last && last.pos <= boardTargetFor(my);
  const chance = doingWell ? 0.6 : 0.2;
  if (rnd() > chance) return { ok: false, msg: 'The board turn down your request for a rise.' };
  const rise = 1.15 + rnd() * 0.15;
  const wage = Math.round(G.manager.wage * rise * 100) / 100;
  return { ok: true, wage };
}
function jobOffers(G) {
  // Unsolicited approaches only — never a step up to a better division than
  // the one you're already in. You earn promotion on the pitch, not a call
  // from an agent. A club below you needs to be clearly punching above its
  // own division's weight to make the leap worth it.
  const my = G.teams[G.myTeam], rep = G.manager.rep || 40;
  if (rep < 58) return [];
  if (G.round - (G.lastJobOfferRound || -99) < 10) return [];
  const cands = G.teams.filter(t => {
    if (t.id === G.myTeam) return false;
    if (t.tier < my.tier) return false;
    const gap = t.tier > my.tier ? 3.5 : 2.5;
    return t.rep > my.rep + gap;
  });
  if (!cands.length) return [];
  shuffle(cands);
  return cands.slice(0, rnd() < 0.7 ? 1 : 2).map(t => ({ id: t.id, wage: mgrWage(t) }));
}
function rescueOffers(G) {
  const my = G.teams[G.myTeam];
  const sameOrLower = G.teams.filter(t => t.id !== G.myTeam && t.tier >= my.tier);
  const cands = sameOrLower.filter(t => t.rep <= my.rep + 1.2).sort((a, b) => b.rep - a.rep);
  const pool = cands.length ? cands : sameOrLower;
  return shuffle(pool.slice()).slice(0, 3).map(t => ({ id: t.id, wage: mgrWage(t, 0.92) }));
}
let CTR_STYLE_DONE = false; /* ---- contract look: a white letterhead with sky blue and black, same layout as before ---- */
(function () {
  const st = document.createElement('style'); st.id = 'contractTheme';
  st.textContent = `
  body .ctrCard{background:#fff;border:0;border-radius:6px;overflow:hidden;color:#1f2933;padding:30px 18px 26px;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 24px 60px rgba(0,0,0,.7),0 0 50px rgba(27,165,234,.35)}
  body .ctrCard::before{content:"";position:absolute;left:0;right:0;top:0;height:14px;background:linear-gradient(115deg,#1ba5ea 0,#1ba5ea 84%,#0b0b0c 84%,#0b0b0c 100%)}
  body .ctrCard::after{content:"";position:absolute;left:0;right:0;bottom:0;height:10px;background:#1ba5ea}
  body .ctrInner{border:1px solid #dde4eb}
  body .ctrCorner::before,body .ctrCorner::after{background:#1ba5ea}
  body .ctrHead{border-bottom:1px solid #dde4eb}
  body .ctrHead h2{color:#0b0b0c}
  body .ctrDate{color:#6b7785}
  body .ctrBody{color:#3b4654}
  body .ctrBody b{color:#0b8dd0}
  body .ctrBody::-webkit-scrollbar-thumb{background:#c9d3dc}
  body .ctrOpts,body .ctrOpt,body .ctrConfirmWrap{border-color:#dde4eb}
  body .ctrOpt{color:#6b7785}
  body .ctrOpt:hover,body .ctrOpt.on{color:#0b0b0c}
  body .ctrOpt .dot{border-color:#b8c3ce}
  body .ctrOpt.on .dot{border-color:#0b8dd0;background:linear-gradient(180deg,#3bb8f2,#0b8dd0)}
  body .ctrOpt .dot svg *{stroke:#fff}
  body .ctrConfirm{background:linear-gradient(180deg,#34b6f0,#0b8dd0);color:#fff;box-shadow:0 2px 0 #0873b0}
  body .ctrSigPath{stroke:#0b0b0c}
  body .ctrMgrSigText{fill:#0b0b0c}
  body .ctrSignCol .line{border-top-color:#9aa6b2}
  body .ctrSignCol span{color:#6b7785}
  body .jnCard,body .sgCard{background:#fff;border:0;border-radius:6px;color:#1f2933;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 24px 60px rgba(0,0,0,.7),0 0 50px rgba(27,165,234,.35)}
  body .jnHead,body .sgHead{background:#fff linear-gradient(115deg,transparent 0,transparent 88%,#0b0b0c 88%,#0b0b0c 100%);border-bottom:4px solid #1ba5ea}
  body .jnHead h3,body .sgHead h3{color:#0b0b0c}
  body .jnHead small,body .sgHead small,body .sgWho small{color:#6b7785}
  body .jnX{color:#fff}
  body .jnBody p{color:#3b4654}
  body .jnBody p b{color:#0b8dd0!important}
  body .jnBody label,body .jnVal{color:#6b7785}
  body .jnVal b{color:#0b0b0c}
  body .jnBar{background:#e3e9ef}
  body .jnFoot,body .sgFoot{background:#f4f7fa;border-top:1px solid #dde4eb}
  body .jnFoot .btn,body .sgFoot .btn{background:#1ba5ea;border-color:#1ba5ea;color:#fff}
  body .jnFoot .btn.ghost{background:#fff;color:#1f2933;border-color:#c9d3dc}
  body .jnCard .range{accent-color:#1ba5ea;background:transparent}
  body .jnCard input[type=range]::-webkit-slider-runnable-track{height:5px;border-radius:3px;background:#cfd8e1}
  body .jnCard input[type=range]::-moz-range-track{height:5px;border-radius:3px;background:#cfd8e1}
  body .jnCard input[type=range]::-webkit-slider-thumb{margin-top:-5.5px;background:#1ba5ea;border:2px solid #fff;box-shadow:0 0 0 2px #0b8dd0,0 1px 4px rgba(0,0,0,.3)}
  body .jnCard input[type=range]::-moz-range-thumb{background:#1ba5ea;border:2px solid #fff}
  body .sgWho b,body .sgTerms b{color:#0b0b0c}
  body .sgTerms div{color:#6b7785;border-bottom-color:#dde4eb}
  body .sgInk{stroke:#0b0b0c}
  body .sgLine{border-top-color:#9aa6b2}
  body .sgCol span{color:#6b7785}
  body .sgStamp{color:#12a150;border-color:#12a150}
  #modal.ctrNeg{border-color:#1ba5ea!important;box-shadow:0 0 0 6px rgba(27,165,234,.14),0 0 44px rgba(27,165,234,.3),0 24px 60px rgba(0,0,0,.8)!important}
  #modal.ctrNeg header{border-bottom-color:#1ba5ea!important}`;
  document.head.appendChild(st);
})();
  function ctrInjectStyle() {   if (CTR_STYLE_DONE) return; CTR_STYLE_DONE = true;   const css = `   .ctrScrim{position:fixed;inset:0;background:rgba(2,4,8,.9);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:999;display:flex;align-items:center;justify-content:center;padding:18px;animation:ctrFade .25s ease}   @keyframes ctrFade{from{opacity:0}to{opacity:1}}   .ctrCard{position:relative;width:100%;max-width:480px;background:linear-gradient(180deg,#27303c 0%,#1a2029 100%);border:2px solid #f2b928;border-radius:10px;box-shadow:0 0 0 6px rgba(242,185,40,.14),0 0 44px rgba(242,185,40,.3),0 24px 60px rgba(0,0,0,.8);padding:18px;color:#e6e9ed;font-family:var(--body);animation:ctrPop .3s cubic-bezier(.2,.9,.3,1.2)}   @keyframes ctrPop{from{opacity:0;transform:scale(.92) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}   .ctrInner{border:1px solid #2a3037;border-radius:2px;padding:16px 16px 14px}   .ctrCorner{position:absolute;width:15px;height:15px;pointer-events:none}   .ctrCorner::before,.ctrCorner::after{content:"";position:absolute;background:#e8a812}   .ctrCorner::before{width:100%;height:2px;top:0;left:0}   .ctrCorner::after{width:2px;height:100%;top:0;left:0}   .ctrCorner.tl{top:6px;left:6px}   .ctrCorner.tr{top:6px;right:6px;transform:scaleX(-1)}   .ctrCorner.bl{bottom:6px;left:6px;transform:scaleY(-1)}   .ctrCorner.br{bottom:6px;right:6px;transform:scale(-1,-1)}   .ctrHead{display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid #2a3037;margin-bottom:12px}   .ctrHead h2{margin:0;font-family:var(--head);font-size:19px;letter-spacing:.04em;font-weight:700;text-transform:uppercase;flex:1;color:#e6e9ed}   .ctrDate{font-size:11px;color:#9aa3ad;white-space:nowrap;align-self:flex-start;margin-top:2px}   .ctrBody{max-height:34vh;overflow-y:auto;font-size:13px;line-height:1.55;color:#dfe3e8;padding-right:8px;margin-bottom:10px}   .ctrBody p{margin:0 0 10px}   .ctrBody b{color:#f8cd4b}   .ctrBody::-webkit-scrollbar{width:5px}   .ctrBody::-webkit-scrollbar-thumb{background:#2a3037;border-radius:3px}   .ctrOpts{border-top:1px solid #2a3037;margin-bottom:4px}   .ctrOpt{display:flex;align-items:center;gap:10px;padding:9px 2px;cursor:pointer;border-bottom:1px solid #2a3037;font-size:13px;color:#9aa3ad}   .ctrOpt:hover{color:#e6e9ed}   .ctrOpt .dot{width:16px;height:16px;border-radius:50%;border:2px solid #4b525b;flex:0 0 auto;display:flex;align-items:center;justify-content:center;transition:border-color .15s}   .ctrOpt.on{color:#e6e9ed}   .ctrOpt.on .dot{border-color:#e8a812;background:linear-gradient(180deg,#f8cd4b,#e8a812)}   .ctrOpt .dot svg{width:10px;height:10px;opacity:0;transition:opacity .15s}   .ctrOpt.on .dot svg{opacity:1}   .ctrConfirmWrap{text-align:center;padding:12px 0 14px;border-bottom:1px solid #2a3037;margin-bottom:14px}   .ctrConfirm{background:linear-gradient(180deg,#f8cd4b,#e8a812);color:#1c1505;border:none;border-radius:8px;padding:10px 26px;font-family:var(--head);font-size:17px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;cursor:pointer;box-shadow:0 2px 0 #c89a0e;transition:transform .12s}   .ctrConfirm:hover{transform:translateY(-1px)}   .ctrConfirm:disabled{opacity:.4;cursor:default;transform:none}   .ctrSign{display:flex;gap:14px}   .ctrSignCol{flex:1;text-align:center}   .ctrSigBox{height:34px;display:flex;align-items:flex-end;justify-content:center;margin-bottom:4px}   .ctrSigBox svg{width:100%;height:30px;max-width:150px}   .ctrSigPath{fill:none;stroke:#e6e9ed;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}   .ctrSigPath.draw{stroke-dasharray:300;stroke-dashoffset:300;animation:ctrDraw 1.15s ease forwards}   @keyframes ctrDraw{to{stroke-dashoffset:0}}   .ctrMgrSigText{fill:#e6e9ed;opacity:0;font-family:'Dancing Script','Segoe Script','Brush Script MT',cursive;font-weight:700}   .ctrMgrSigText.draw{animation:ctrSignText 1.1s ease forwards}   @keyframes ctrSignText{0%{opacity:0;clip-path:inset(0 100% 0 0)}12%{opacity:1}100%{opacity:1;clip-path:inset(0 0% 0 0)}}   .ctrSignCol .line{border-top:1px solid #2a3037;margin:0 10px 4px}   .ctrSignCol span{font-size:10.5px;color:#9aa3ad;text-transform:uppercase;letter-spacing:.05em}   `;   const el = document.createElement('style'); el.textContent = css; document.head.appendChild(el); } const CTR_SIG_CEO = 'M4 24 C10 10 14 8 18 16 C21 23 24 12 28 10 C32 8 33 20 38 18 C43 16 45 9 50 11 C55 13 54 22 60 20 C68 17 70 8 78 12 C84 15 82 22 90 19 C98 16 100 10 108 13';const CTR_SIG_MGR = 'M3 22 C8 6 13 6 16 15 C19 24 22 9 27 8 C33 7 31 21 37 19 C44 17 47 6 53 10 C58 13 55 23 62 20 C71 16 70 7 79 11 C86 14 83 23 92 19 C102 15 104 9 113 13';
function sigTextFor(name) {
  const nm = (name || 'Manager');
  const n = nm.length;
  const fs = n <= 7 ? 19 : n <= 10 ? 16 : n <= 13 ? 14 : n <= 16 ? 12 : n <= 19 ? 10 : n <= 22 ? 9 : 8;
  return `<text class="ctrMgrSigText" id="ctrMgrSig" x="57" y="23" font-size="${fs}" text-anchor="middle">${esc(nm)}</text>`;
}
function ctrDateStr(iso) {   const d = new Date(iso + 'T12:00:00Z');   return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCFullYear()}`; } function openContractOffer(cfg) {   if (G && G.manager && cfg.team && (cfg.heading === 'Contract Offer' || cfg.heading === 'Contract Extension')) return jobNegotiation(cfg);   return openContractOfferOld(cfg); } function ctrCardRaw(cfg) {   ctrInjectStyle();   const old = document.querySelector('.ctrScrim'); if (old) old.remove();   let selected = cfg.defaultKey || (cfg.options[0] && cfg.options[0].key);   const scrim = document.createElement('div');   scrim.className = 'ctrScrim';   scrim.innerHTML = `<div class="ctrCard"><i class="ctrCorner tl"></i><i class="ctrCorner tr"></i><i class="ctrCorner bl"></i><i class="ctrCorner br"></i>     <div class="ctrInner">       <div class="ctrHead">         ${crestHTML(cfg.team, 40)}         <h2>${esc(cfg.heading)}</h2>         <div class="ctrDate">${ctrDateStr(cfg.dateISO)}</div>       </div>       <div class="ctrBody">${cfg.paragraphs.map(p => `<p>${p}</p>`).join('')}</div>       <div class="ctrOpts">${cfg.options.map(o => `<label class="ctrOpt" data-k="${o.key}"><i class="dot"><svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" fill="none" stroke="#06240f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></i>${esc(o.label)}</label>`).join('')}</div>       <div class="ctrConfirmWrap"><button class="ctrConfirm">${esc(cfg.confirmLabel || 'Confirm')}</button></div>       <div class="ctrSign">         <div class="ctrSignCol"><div class="ctrSigBox"><svg viewBox="0 0 115 32"><path class="ctrSigPath" d="${CTR_SIG_CEO}"/></svg></div><div class="line"></div><span>Chief Executive</span></div>         <div class="ctrSignCol"><div class="ctrSigBox"><svg viewBox="0 0 115 32">${sigTextFor(cfg.mgrName || (G && G.manager && G.manager.name))}</svg></div><div class="line"></div><span>Manager</span></div>       </div>     </div></div>`;   document.body.appendChild(scrim);   const rows = scrim.querySelectorAll('.ctrOpt');   const paint = () => rows.forEach(r => r.classList.toggle('on', r.dataset.k === selected));   paint();   rows.forEach(r => r.onclick = () => { selected = r.dataset.k; paint(); });   const confirmBtn = scrim.querySelector('.ctrConfirm');   confirmBtn.onclick = () => {     confirmBtn.disabled = true;     if (selected === 'accept') {       const sig = scrim.querySelector('#ctrMgrSig');       sig.style.opacity = '1'; sig.classList.add('draw');       setTimeout(() => { scrim.remove(); cfg.onChoice('accept'); }, 1250);     } else {       scrim.remove(); cfg.onChoice(selected);     }   }; } function jobFitChance(G, target) {   const my = G.teams[G.myTeam], rep = G.manager.rep || 40;   if (target.id === G.myTeam) return 0;   const last = my.history && my.history.length ? my.history[my.history.length - 1] : null;   const doingWell = last && last.pos <= boardTargetFor(my);   const cap = (rep / 100) * 7 + 3.2 + (doingWell ? 0.7 : 0);   if (target.rep <= my.rep + 0.4) return 0.85;   if (target.rep > cap) {     const over = target.rep - cap;     return clamp(0.12 - over * 0.05, 0.01, 0.12);   }   const span = Math.max(0.1, cap - (my.rep + 0.4));   const pos = (target.rep - (my.rep + 0.4)) / span;   return clamp(0.75 - pos * 0.55, 0.15, 0.75); } function jobFitLabel(c) {   if (c >= 0.6) return { txt: 'Well within your reach', cls: 'xi' };   if (c >= 0.3) return { txt: 'A realistic step up', cls: '' };   if (c >= 0.12) return { txt: 'A big stretch', cls: 'out' };   return { txt: 'Extremely unlikely', cls: 'inj' }; } function applyForJob(G, id) {   const my = G.teams[G.myTeam], target = G.teams[id];   if (id === G.myTeam) return { ok: false, msg: `You already manage ${target.n}.` };   if (G.lastApplyRound === G.round) return { ok: false, msg: `You've only just gone for a job — wait until next matchday to try again.` };   G.lastApplyRound = G.round;   const chance = jobFitChance(G, target);   if (rnd() > chance) {     const gap = target.rep - my.rep;     const msg = gap > 2.5       ? `${target.n} don't think you're ready for a club of their size yet — build your reputation and try again later.`       : `${target.n} thank you for your interest but appoint another candidate.`;     return { ok: false, msg };   }   const wage = Math.round(target.rep * 1.3 * 10) / 10;   return { ok: true, id, wage, msg: `${target.n} appoint you as their new manager.` }; } /* ---------------- manager careers: contracts, vacancies, unemployment ---------------- */ const JOBLESS_BLOCKED = ['squad', 'tactics', 'youth', 'training', 'transfers', 'club', 'finances', 'commercial']; function mgrWage(t, mult) {   const rep = G.manager.rep || 40;   const club = Math.max(0.3, t.rep * 1.1);   return Math.max(0.25, Math.round(club * (0.7 + rep / 100 * 0.7) * (mult || 1) * 100) / 100); } function ensureMgr(G) {   const m = G.manager;   if (m.contractEnd == null && !G.jobless) m.contractEnd = G.season + 2;   G.vac = G.vac || []; G.vacApps = G.vacApps || []; G.vacOffers = G.vacOffers || []; } function newAiMgr(t) {   const nat = pick(['ZA', 'ZA', 'ZA', 'ZA', 'ZW', 'NG', 'GH', 'CM', 'ZM', 'MW']);   const nm = personName(nat);   return { name: nm.first + ' ' + nm.last, nat }; } function clubMgr(t) {   if (!t.mgr) t.mgr = Object.assign(newAiMgr(t), { since: G.season - rint(0, 3), apptDay: -999 });   return t.mgr; } function mgrReasonText(G, t, kind) {   const m = clubMgr(t).name;   const rows = sortTable(G, t.tier), size = rows.length;   const pos = rows.findIndex(r => r.id === t.id) + 1, r = rows.find(x => x.id === t.id) || { p: 0, w: 0 };   const exp = G.teams.filter(x => x.tier === t.tier).sort((a, b) => teamOverall(b) - teamOverall(a)).findIndex(x => x.id === t.id) + 1;   if (kind === 'sacked') {     if (pos >= size - 2) return `${m} was sacked with ${t.s} ${ordinal(pos)} in the ${TIER_SHORT[t.tier]}, deep in the relegation fight.`;     if (pos - exp >= 4) return `${m} was sacked after a poor run. ${t.s} have the ${ordinal(exp)}-best squad in the ${TIER_SHORT[t.tier]} but sit ${ordinal(pos)}.`;     if (r.p >= 6 && r.w <= 2) return `${m} was sacked after just ${r.w} win${r.w === 1 ? '' : 's'} in ${r.p} games.`;     return pick([`The board lost patience with ${m} after a run of bad results.`, `${m} was sacked following a string of poor performances at home.`, `${m} was dismissed after the board lost faith in his tactics.`]);   }   if (kind === 'resigned') return pick([`${m} resigned after a row with the board over transfer funds.`, `${m} quit, saying the club lacked ambition.`, `${m} resigned after clashing with senior players.`]);   if (kind === 'left') return pick([`${m} left to join a club abroad.`, `${m} was poached by a bigger club.`, `${m} left to take the national team job.`]);   if (kind === 'health') return `${m} stepped down for health reasons.`;   if (kind === 'retired') return `${m} retired from management.`;   if (kind === 'mutual') return `${m} left by mutual consent after a poor start.`;   if (kind === 'contract') return `${m}'s contract ran out and was not renewed.`;   return `${m} is no longer the manager.`; } function openVacancy(G, tid, kind, text, opts) {   ensureMgr(G);   if (G.vac.some(v => v.tid === tid)) return null;   const t = G.teams[tid];   const v = { tid, kind, text, season: G.season, round: G.round, day: G.curDay || 0, hireIn: rint(3, 7), blocked: !!(opts && opts.blocked) };   G.vac.push(v);   news(G, 'career', `${t.n} are looking for a new manager. ${text}`);   return v; } function fillVacancy(G, v) {   const t = G.teams[v.tid];   const nm = newAiMgr(t);   t.mgr = Object.assign(nm, { since: G.season, apptDay: G.curDay || 0 });   news(G, 'career', `${t.n} appoint ${nm.name} as their new manager.`);   G.vac = G.vac.filter(x => x !== v);   G.vacOffers = G.vacOffers.filter(o => o.tid !== v.tid);   G.vacApps.forEach(a => {     if (a.tid === v.tid && a.status === 'pending') {       a.status = 'filled';       mail(G, { cat: 'career', from: `${t.n} Board`, subject: `Position filled: ${t.n}`, body: [`Thank you for applying. ${t.n} have appointed ${nm.name} as their new manager.`] });     }   }); } function applyChance(G, v) {   const t = G.teams[v.tid], rep = G.manager.rep || 40;   let c = 0.55 + (rep - (10 + t.rep * 5.5)) / 45;   if (G.jobless) c += 0.12;   if (v.kind === 'sacked') { const rows = sortTable(G, t.tier); if (rows.findIndex(r => r.id === t.id) + 1 >= rows.length - 3) c += 0.08; }   return clamp(c, 0.04, 0.95); } function applyHint(c) { return c >= 0.7 ? ['Strong candidate', '#3ddc84'] : c >= 0.4 ? ['Decent chance', '#f2b928'] : c >= 0.2 ? ['Long shot', '#ff9f43'] : ['Unlikely', '#ff6b6b']; } function applyVacancy(G, tid) {   ensureMgr(G);   const v = G.vac.find(x => x.tid === tid);   if (!v) return { ok: false, msg: 'That job has been filled.' };   if (v.blocked) return { ok: false, msg: `${G.teams[tid].n} will not consider you right now.` };   if (G.vacApps.some(a => a.tid === tid && a.status === 'pending')) return { ok: false, msg: 'You have already applied.' };   if (v.rejectedMe) return { ok: false, msg: 'They have already turned you down for this job.' };   G.vacApps.push({ tid, due: G.round + 1, status: 'pending', round: G.round });   return { ok: true, msg: `Application sent to ${G.teams[tid].n}. Expect an answer after the next matchday.` }; } function resolveApp(G, a) {   const t = G.teams[a.tid], v = G.vac.find(x => x.tid === a.tid);   if (!v) { a.status = 'filled'; return; }   if (v.hold) { a.status = 'rejected'; mail(G, { cat: 'career', from: `${t.n} Board`, subject: `Application update: ${t.n}`, body: ['The board are already in talks with another candidate. Thank you for your interest.'] }); return; }   if (rnd() < applyChance(G, v)) {     a.status = 'offer'; v.hold = true;     G.vacOffers.push({ tid: t.id, wage: mgrWage(t, G.jobless ? 0.95 : 1.05), years: 2, expires: G.round + 3 });     mail(G, { cat: 'career', from: `${t.n} Board`, flag: true, subject: `Job offer: ${t.n}`,       body: [`Following your application, ${t.n} would like to appoint you as their new manager.`, 'The offer is open for three matchdays. You can negotiate your terms from Manager › Job offers.'] });   } else {     a.status = 'rejected'; v.rejectedMe = true;     mail(G, { cat: 'career', from: `${t.n} Board`, subject: `Application unsuccessful: ${t.n}`,       body: [`Thank you for applying for the ${t.n} job. ${pick(['They have gone for a more experienced manager.', 'The board wanted someone with a better record at this level.', 'They have decided to look at other candidates.', 'They felt another candidate was a better fit.'])}`] });   } } function ensureMinVacancies(G, n) {   ensureMgr(G);   let guard = 0;   while (G.vac.length < n && guard++ < 40) {     const pool = G.teams.filter(x => x.id !== G.myTeam && !G.vac.some(v => v.tid === x.id));     if (!pool.length) break;     const t = pick(pool), kind = pick(['sacked', 'resigned', 'left', 'contract', 'mutual', 'health']);     openVacancy(G, t.id, kind, mgrReasonText(G, t, kind));   } } function newVacancies(G) {   const tierRank = {};   [0, 1, 2, 3, 4].forEach(ti => { G.teams.filter(x => x.tier === ti).sort((a, b) => teamOverall(b) - teamOverall(a)).forEach((x, i) => { tierRank[x.id] = i + 1; }); });   G.teams.forEach(t => {     if (G.vac.length >= 8 || t.id === G.myTeam || G.vac.some(v => v.tid === t.id)) return;     const m = clubMgr(t);     if ((G.curDay || 0) - (m.apptDay || -999) < 60) return;     const rows = sortTable(G, t.tier), pos = rows.findIndex(r => r.id === t.id) + 1;     const poor = pos - tierRank[t.id];     const pSack = 0.0012 + Math.max(0, poor - 2) * 0.0035 + (pos > rows.length - 3 ? 0.008 : 0);     if (rnd() < pSack) { openVacancy(G, t.id, 'sacked', mgrReasonText(G, t, 'sacked')); return; }     const r = rnd();     if (r < 0.0014) openVacancy(G, t.id, 'resigned', mgrReasonText(G, t, 'resigned'));     else if (r < 0.0026) openVacancy(G, t.id, 'left', mgrReasonText(G, t, 'left'));     else if (r < 0.0032) openVacancy(G, t.id, 'health', mgrReasonText(G, t, 'health'));     else if (r < 0.0036) openVacancy(G, t.id, 'mutual', mgrReasonText(G, t, 'mutual'));   }); } function managerTick(G) {   ensureMgr(G);   G.vacApps.filter(a => a.status === 'pending' && G.round >= a.due).forEach(a => resolveApp(G, a));   G.vacOffers = G.vacOffers.filter(o => {     if (o.expires >= G.round) return true;     const v = G.vac.find(x => x.tid === o.tid); if (v) v.hold = false;     mail(G, { cat: 'career', from: `${G.teams[o.tid].n} Board`, subject: `Offer withdrawn: ${G.teams[o.tid].n}`, body: ['You took too long to respond, so the board have withdrawn their offer.'] });     return false;   });   G.vac.slice().forEach(v => { if (v.hold) return; v.hireIn--; if (v.hireIn <= 0) fillVacancy(G, v); });   if ((G.curDay || 0) >= 91 || G.jobless) newVacancies(G);   if (G.jobless) ensureMinVacancies(G, 3);   else renewalTick(G); } /* ----- the manager's own contract ----- */ function renewalTick(G) {   const m = G.manager;   if (m.contractEnd == null || G.season < m.contractEnd || G.round < 14) return;   if (m.renewal && m.renewal.season === G.season) { if (m.renewal.status === 'declined') reconsiderRenewal(G, false); return; }   decideRenewal(G); } function reconsiderRenewal(G, final) {   const m = G.manager, t = me(), rn = m.renewal;   if (!rn || rn.status !== 'declined' || rn.season !== G.season) return;   if (!final && G.round - (rn.rc == null ? 14 : rn.rc) < 5) return;   rn.rc = G.round;   const pos = posOfTeam(G, t.id), target = boardTargetFor(t), board = G.board != null ? G.board : 62;   const p = renewalChance(board, target, pos);   const win = p >= 1 || (final ? (pos <= target && rnd() < p) : (p >= 0.55 && rnd() < (p - 0.4) * 0.6));   if (!win) return;   m.renewal = { season: G.season, status: 'offered', wage: mgrWage(t, 1.08), years: 3 };   mail(G, { cat: 'career', from: 'Board of Directors', flag: true, subject: 'Contract talks: the board have changed their minds',     body: [`After the recent results, the board at ${t.n} have reconsidered and now want to keep you.`, `Their offer is ${money(m.renewal.wage)} a season for ${m.renewal.years} years. You can negotiate from Manager › Contract.`] }); } /* ---- ask the board to reconsider a refused renewal: available again every 3 months ---- */
function reconDaysLeft(rn) {
  const from = G.manager.reconAt || (rn && rn.at); if (!from) return 0;
  const diff = Math.floor((Date.parse(currentDateISO() + 'T12:00:00Z') - Date.parse(from + 'T12:00:00Z')) / 86400000);
  return Math.max(0, 90 - diff);
}
function reconOdds(rn) {
  const t = me(), pos = posOfTeam(G, t.id), target = boardTargetFor(t), board = G.board != null ? G.board : 62;
  let p = 0.5 + ((board - 50) / 50 + (target - pos) / 6) * 0.5;
  if (rn && rn.pos0 != null) p += clamp((rn.pos0 - pos) * 0.04, -0.15, 0.2);
  if (rn && rn.board0 != null) p += clamp((board - rn.board0) / 100, -0.15, 0.2);
  const f = (t.form || []).slice(-5);
  p += (f.filter(x => x === 'W').length - 2) * 0.04 - f.filter(x => x === 'L').length * 0.02;
  if (target - pos >= 3 && board >= 30) return 1; return clamp(p - 0.1, 0.03, 0.9);
}
function reconBtn(rn) {
  const left = reconDaysLeft(rn), p = reconOdds(rn);
  const mood = p > 0.65 ? 'The board look open to it.' : p > 0.4 ? 'It could go either way.' : 'The board are not convinced yet.';
  return left > 0
    ? ` <button class="btn ghost sm" disabled>Ask the board to reconsider</button><p class="hint" style="margin:8px 0 0">You can ask again in ${left} day${left === 1 ? '' : 's'}.</p>`
    : ` <button class="btn ghost sm" id="mgrRecon">Ask the board to reconsider</button><p class="hint" style="margin:8px 0 0">${mood} They weigh your results, league position and board confidence since they said no.</p>`;
}
function askBoardReconsider() {
  const m = G.manager, t = me(), rn = m.renewal;
  if (!rn || rn.status !== 'declined' || reconDaysLeft(rn) > 0) return;
  const p = reconOdds(rn); m.reconAt = currentDateISO();
  if (rnd() < p) {
    m.renewal = { season: G.season, status: 'offered', wage: mgrWage(t, 1.08), years: 3 };
    mail(G, { cat: 'career', from: 'Board of Directors', flag: true, subject: 'Contract talks: the board have changed their minds',
      body: [`After looking at the recent results, the board at ${t.n} have reconsidered and want to keep you.`, `Their offer is ${money(m.renewal.wage)} a season for ${m.renewal.years} years. You can negotiate from Manager › Contract.`] });
    toast('The board have changed their minds and made you an offer.');
  } else toast(p < 0.3 ? 'The board are not impressed. Come back after a few more results.' : 'The board want to see more before they change their minds.');
  save(); viewManager();
}
  /* the board's chance of keeping you: always, when you are clearly beating their target */ function renewalChance(board, target, pos) {   const ex = target - pos;   let p = 0.5 + ((board - 50) / 50 + ex / 6) * 0.5;   if (ex >= 3 && board >= 30) return 1;   if (ex >= 1) p = Math.max(p, 0.7); else if (ex >= 0) p = Math.max(p, 0.5);   return clamp(p, 0.05, 0.97); } function decideRenewal(G) {   const m = G.manager, t = me();   const pos = posOfTeam(G, t.id), target = boardTargetFor(t), board = G.board != null ? G.board : 62;   const p = renewalChance(board, target, pos);   if (rnd() < p) {     m.renewal = { season: G.season, status: 'offered', wage: mgrWage(t, 1.08), years: 3 };     mail(G, { cat: 'career', from: 'Board of Directors', flag: true, subject: 'Contract talks: the board want to keep you',       body: [`The board at ${t.n} are impressed and would like to extend your contract.`, `Their offer is ${money(m.renewal.wage)} a season for ${m.renewal.years} years. You can negotiate from Manager › Contract.`] });   } else {     m.renewal = { season: G.season, status: 'declined', at: currentDateISO(), pos0: pos, board0: board };     mail(G, { cat: 'career', from: 'Board of Directors', flag: true, subject: 'Contract talks: no extension',       body: [`The board at ${t.n} have decided not to extend your contract beyond this season.`, 'You can look for a new club in Manager › Vacancies, or see out your deal and leave at the end of the season.'] });   }   return m.renewal; } function signExtension(terms) {   const m = G.manager, t = me();   m.contractEnd = G.season + terms.years; m.wage = terms.wage;   if (m.renewal) m.renewal.status = 'signed';   mail(G, { cat: 'career', from: 'Board of Directors', subject: 'Contract extended', body: [`You have signed a new deal at ${t.n}.`],     rows: [['Wage', money(terms.wage) + ' a season'], ['Length', `${terms.years} year${terms.years === 1 ? '' : 's'}`], ['Runs until', `June ${m.contractEnd + 1}`]] });   news(G, 'career', `${m.name} signs a ${terms.years}-year extension at ${t.s}.`); } function managerSeasonEnd(G, sum) {   ensureMgr(G);   const m = G.manager;   G.vacApps = []; G.vacOffers = []; G.vac = [];   if (G.jobless) { m.rep = Math.max(10, (m.rep || 40) - 3); sum.jobless = true; return; }   if (sum.fired) return;   if (sum.season >= m.contractEnd) {     try { reconsiderRenewal(G, true); } catch (e) { console.error(e); }     sum.contractEnded = true;     sum.renewal = (m.renewal && m.renewal.season === sum.season && m.renewal.status === 'offered') ? m.renewal : null;   } } /* ----- being out of work ----- */ function goJobless(reason) {   ensureMgr(G);   if (G.jobless) return;   const m = G.manager, old = G.teams[G.myTeam];   G.jobless = true; G.joblessSince = { season: G.season, day: G.curDay || 0 };   m.lastWage = m.wage; m.wage = 0; m.contractEnd = null; m.renewal = null;   G._liveBefore = G.liveMode; G.liveMode = false;   G.pendingJobOffers = null;   const kind = reason === 'sacked' ? 'sacked' : reason === 'resigned' ? 'resigned' : 'contract';   const text = reason === 'sacked' ? `${m.name} was sacked after the board lost patience.` : reason === 'resigned' ? `${m.name} resigned.` : `${m.name}'s contract expired and was not renewed.`;   openVacancy(G, old.id, kind, text, { blocked: true });   mail(G, { cat: 'career', from: 'Your Agent', flag: true, subject: 'You are out of work',     body: [`Your time at ${old.n} is over. Your wage stops until you find a new club.`, 'Check Manager › Vacancies for clubs looking for a manager and apply. Reputation fades slowly while you are out of work.'] });   news(G, 'career', `${m.name} leaves ${old.s} and is now looking for a new club.`); } function goJoblessUI(reason) { goJobless(reason); save(); render(); goSub('manager', 'vacancies'); } function viewJoblessGate() {   const v = $('#v-' + tab); if (!v) return;   v.innerHTML = `<div class="mb"><div class="mb-empty" style="padding:44px 16px"><div style="font:700 22px var(--head);color:#fff;margin-bottom:8px">You are between jobs</div>     <p style="max-width:440px;margin:0 auto 14px;color:#9aa3ad">You don't have a club to look after right now. Find a vacancy, apply, and this screen comes back to life.</p>     <button class="btn sm" id="jgGo">Find a job</button></div></div>`;   $('#jgGo').onclick = () => goSub('manager', 'vacancies'); } function joblessBanner(v) {   v.insertAdjacentHTML('afterbegin', `<div class="jobbar"><span><b>You are unemployed.</b> Your old club is run by the board until you find a new one.</span><button class="btn sm" id="jbGo">Vacancies</button></div>`);   const b = v.querySelector('#jbGo'); if (b) b.onclick = () => goSub('manager', 'vacancies'); } function showJoblessSeason(sum) {   openModal('Another season on the sidelines', `<p style="margin:0 0 8px;color:var(--dim)">${seasonLabel(sum.season)} is over and you are still without a club. Your reputation has slipped a little.</p>     <p style="margin:0;color:var(--dim)">Check the vacancies and apply for a job.</p>`,     `<button class="btn sm" id="jsGo">See vacancies</button>`);   $('#jsGo').onclick = () => { closeModal(); save(); ensureMinVacancies(G, 3); goSub('manager', 'vacancies'); }; } function showContractEnded(sum) {   ensureMgr(G);   const m = G.manager, old = G.teams[G.myTeam];   const ren = sum.renewal;   const declined = m.renewal && m.renewal.season === sum.season && m.renewal.status === 'declined';   const leave = () => { closeModal(); goJobless(declined ? 'declined' : 'contract'); save(); render(); goSub('manager', 'vacancies'); };   const body = `<p style="margin:0 0 10px;color:var(--dim)">Your contract at ${esc(old.n)} has run out. ${declined ? 'The board decided not to renew it.' : ren ? "The board's offer to extend it is still on the table." : 'No new deal was agreed.'}</p>` +     (ren ? `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(old, 26)}<span class="who"><b>Stay at ${esc(old.n)}</b><small>${money(ren.wage)} a season · ${ren.years} years</small></span><button class="btn sm" id="ceStay">Negotiate</button></div>` : '') +     ((sum.offers || []).length ? `<p style="margin:12px 0 6px;font-weight:600">Clubs who want you:</p>` : '') +     (sum.offers || []).map(o => { const t = G.teams[o.id]; return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(t, 26)}       <span class="who"><b>${esc(t.n)}</b><small>${TIER_SHORT[t.tier]} · squad rated ${teamOverall(t)} · budget ${money(t.budget)}</small></span><button class="btn sm" data-ceoffer="${o.id}">Negotiate</button></div>`; }).join('');   openModal('Your contract has expired', body, `<button class="btn ghost sm" id="ceLeave">Leave and look for work</button>`);   $('#ceLeave').onclick = leave; $('#modal .x').onclick = leave;   const st = $('#ceStay'); if (st) st.onclick = () => jobNegotiation({ team: old, heading: 'Contract Extension', wage: ren.wage, years: ren.years, onChoice: (k, terms) => {     if (k !== 'accept') return;     signExtension(terms); closeModal(); save(); render(); showSponsors();   } });   document.querySelectorAll('[data-ceoffer]').forEach(b => b.onclick = () => {     const t = G.teams[+b.dataset.ceoffer];     jobNegotiation({ team: t, heading: 'Contract Offer', onChoice: (k) => {       if (k !== 'accept') return;       takeJob(G, t.id); G.board = 55; G.boardFired = false;       closeModal(); save(); tableTier = me().tier; statTier = Math.min(me().tier, 2);       toast(`You are the new manager of ${me().n}.`); showSponsors();     } });   }); } /* ----- contract negotiation (job offers and extensions) ----- */ /* ---- signing ceremony (shown after a contract or signing is agreed) ---- */ const SG_QUEUE = []; let sgBusy = false; function sgQueue(cfg) { SG_QUEUE.push(cfg); if (!sgBusy) setTimeout(sgNext, 450); } function sgNext() {   if (sgBusy) return;   const c = SG_QUEUE.shift(); if (!c) return;   sgBusy = true;   signCeremony(c, () => { sgBusy = false; if (SG_QUEUE.length) setTimeout(sgNext, 250); }); } function signCeremony(cfg, done) {   let finished = false;   const finish = () => { if (finished) return; finished = true; if (done) { try { done(); } catch (e) { console.error(e); try { toastWarn('Contract error: ' + (e && e.message)); } catch (e2) { } } } };   try {     ctrInjectStyle();     const old = document.querySelector('.ctrScrim.signCer'); if (old) old.remove();     const t = cfg.team;     const who = cfg.manager ? ((G && G.manager && G.manager.name) || 'Manager') : (cfg.p ? cfg.p.name : 'Player');     const heading = cfg.manager ? (cfg.ext ? 'Contract Extension Signed' : 'Contract Signed') : (cfg.renewal ? 'New Contract Signed' : 'Signing Complete');     const yrs = cfg.years || 1;     const lines = [];     if (cfg.manager) lines.push(`<p><b>${esc(who)}</b> has signed ${cfg.ext ? 'a contract extension' : 'a contract'} with <b>${esc(t.n)}</b>.</p>`);     else if (cfg.renewal) lines.push(`<p><b>${esc(who)}</b> has signed a new contract with <b>${esc(t.n)}</b>.</p>`);     else lines.push(`<p><b>${esc(who)}</b> has signed for <b>${esc(t.n)}</b>.</p>`);     if (cfg.wage != null) lines.push(`<p>Wage: <b>${money(cfg.wage)}</b> a season · Contract: <b>${yrs} year${yrs === 1 ? '' : 's'}</b>${cfg.fee ? ` · Signing bonus: <b>${money(cfg.fee)}</b>` : ''}</p>`);     const sc = document.createElement('div'); sc.className = 'ctrScrim signCer';     sc.innerHTML = `<div class="ctrCard"><i class="ctrCorner tl"></i><i class="ctrCorner tr"></i><i class="ctrCorner bl"></i><i class="ctrCorner br"></i>       <div class="ctrInner">         <div class="ctrHead">${crestHTML(t, 40)}<h2>${esc(heading)}</h2></div>         <div class="ctrBody">${lines.join('')}</div>         <div class="ctrSign">           <div class="ctrSignCol"><div class="ctrSigBox"><svg viewBox="0 0 115 32"><path class="ctrSigPath draw" d="${CTR_SIG_CEO}"/></svg></div><div class="line"></div><span>Chief Executive</span></div>           <div class="ctrSignCol"><div class="ctrSigBox"><svg viewBox="0 0 115 32">${sigTextFor(who)}</svg></div><div class="line"></div><span>${cfg.manager ? 'Manager' : 'Player'}</span></div>         </div>       </div></div>`;     document.body.appendChild(sc);     const sig = sc.querySelector('#ctrMgrSig'); if (sig) { sig.style.opacity = '1'; sig.classList.add('draw'); }     const close = () => { if (!sc.parentNode) return; sc.style.transition = 'opacity .3s'; sc.style.opacity = '0'; setTimeout(() => { sc.remove(); finish(); }, 320); };     sc.addEventListener('click', close);     setTimeout(close, 1900);   } catch (e) { console.error(e); finish(); } } function jobNegotiation(cfg) {   const t = cfg.team, ext = cfg.heading === 'Contract Extension';   const wage = Math.round((cfg.wage != null ? cfg.wage : mgrWage(t, cfg.mult || 1)) * 100) / 100, years = cfg.years || 2;   openContractOfferOld({     team: t, heading: cfg.heading, dateISO: dateForRound(G.round, G.season),     paragraphs: [       ext ? `${esc(t.n)} want to keep you as their manager.` : `${esc(t.n)} want you as their manager.`,       `The deal is worth <b>${money(wage / 12)}</b> a month — <b>${money(wage)}</b> a season for <b>${years} year${years === 1 ? '' : 's'}</b>.`     ],     options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }], defaultKey: 'accept',     onChoice: (k) => {       if (k !== 'accept') { if (cfg.onChoice) cfg.onChoice('reject'); return; }       window.__jobTerms = { tid: t.id, wage, years };       try { cfg.onChoice('accept', { wage, years }); } finally { window.__jobTerms = null; }     }   }); } /* ---- manager contracts: first offers run 3 years, and every offer can be negotiated ---- */
function ctrDealLine(wage, years, fixed) {
  return `The deal is worth <b>${money(wage / 12)}</b> a month — <b>${money(wage)}</b> a season${fixed ? '' : ` for <b>${years} year${years === 1 ? '' : 's'}</b>`}.`;
}
function openContractOfferOld(cfg) {
  if (cfg.wage == null) return ctrCardRaw(cfg);
  const years = cfg.years || 3, tries = cfg.negTries == null ? 3 : cfg.negTries, deal = ctrDealLine(cfg.wage, years, cfg.fixedYears);
  let had = false;
  const paragraphs = (cfg.paragraphs || []).map(p => /worth <b>/.test(p) ? (had = true, deal) : p);
  if (!had) paragraphs.push(deal);
  if (cfg.agreed) paragraphs.push('They have agreed to your terms.');
  const options = (cfg.options || []).filter(o => o.key !== 'negotiate');
  if (tries > 0) { const i = options.findIndex(o => o.key === 'reject'); options.splice(i < 0 ? options.length : i, 0, { key: 'negotiate', label: 'Negotiate' }); }
  ctrCardRaw(Object.assign({}, cfg, {
    years, paragraphs, options,
    onChoice: k => {
      if (k === 'negotiate') {
        contractNegotiate({ team: cfg.team, wage: cfg.wage, years, fixedYears: cfg.fixedYears, tries }, r =>
          openContractOfferOld(Object.assign({}, cfg, r.agreed ? { wage: r.wage, years: r.years, defaultKey: 'accept', agreed: true, negTries: r.tries } : { years, negTries: r.tries })));
        return;
      }
      if (k === 'accept') { window.__ctrTerms = { wage: cfg.wage, years }; try { cfg.onChoice('accept', { wage: cfg.wage, years }); } finally { window.__ctrTerms = null; } }
      else cfg.onChoice(k);
    }
  }));
}
function jobNegotiation(cfg) {
  const t = cfg.team, ext = cfg.heading === 'Contract Extension';
  const wage = Math.round((cfg.wage != null ? cfg.wage : mgrWage(t, cfg.mult || 1)) * 100) / 100, years = cfg.years || 3;
  openContractOfferOld({
    team: t, heading: cfg.heading, dateISO: dateForRound(G.round, G.season), wage, years,
    paragraphs: [ext ? `${esc(t.n)} want to keep you as their manager.` : `${esc(t.n)} want you as their manager.`],
    options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }], defaultKey: 'accept',
    onChoice: (k, terms) => {
      if (k !== 'accept') { if (cfg.onChoice) cfg.onChoice('reject'); return; }
      const w = terms ? terms.wage : wage, y = terms ? terms.years : years;
      window.__jobTerms = { tid: t.id, wage: w, years: y };
      try { cfg.onChoice('accept', { wage: w, years: y }); } finally { window.__jobTerms = null; }
    }
  });
}
/* ask for more or less money, or a longer or shorter deal. Three counter-offers, then they stop moving */
function contractNegotiate(cfg, cb) {
  const t = cfg.team, base = cfg.wage, years0 = cfg.years; let offerW = base, tries = cfg.tries, note = '';
  const old = document.querySelector('.jnScrim'); if (old) old.remove();
  const sc = document.createElement('div'); sc.className = 'jnScrim'; document.body.appendChild(sc);
  const fin = r => { sc.remove(); cb(Object.assign({ tries }, r)); };
  const draw = () => {
    const lo = base * 0.8, hi = base * 1.5;
    sc.innerHTML = `<div class="jnCard"><div class="jnHead">${crestHTML(t, 38)}<div><h3>Negotiate</h3><small>${esc(t.n)} · ${TIER_SHORT[t.tier != null ? t.tier : t.t]}</small></div><button class="jnX" aria-label="Close">×</button></div>
      <div class="jnBody">
        <p>Their offer: <b style="color:#fff">${money(offerW)}</b> a season${cfg.fixedYears ? '' : ` for <b style="color:#fff">${years0} year${years0 === 1 ? '' : 's'}</b>`}. Ask for more or for less.</p>
        ${note ? `<p style="color:#f2b928">${esc(note)}</p>` : ''}
        <label>Wage a season</label>
        <input class="range" type="range" id="cnW" min="${lo.toFixed(2)}" max="${hi.toFixed(2)}" step="0.01" value="${offerW.toFixed(2)}">
        <div class="jnVal"><span>Wage</span><b id="cnWV"></b></div>
        ${cfg.fixedYears ? '' : `<label>Contract length</label>
        <input class="range" type="range" id="cnY" min="1" max="5" step="1" value="${years0}">
        <div class="jnVal"><span>Years</span><b id="cnYV"></b></div>`}
        <div class="jnBar"><i id="cnBar"></i></div>
        <p id="cnOdds" style="margin:6px 0 0;font-size:13px;color:#8f98a2"></p>
        <p style="margin:8px 0 0;font-size:12.5px;color:#6b737c">${tries} counter-offer${tries === 1 ? '' : 's'} left.</p>
      </div>
      <div class="jnFoot"><button class="btn ghost sm" id="cnBack">Back to the offer</button><button class="btn sm" id="cnGo">Counter-offer</button></div></div>`;
    const wr = sc.querySelector('#cnW'), yr = sc.querySelector('#cnY');
    const chance = (w, y) => {
      let c = w <= offerW ? 1 : 1 - (w / offerW - 1) * 2.4;
      c -= Math.max(0, y - years0) * 0.03; c += Math.max(0, years0 - y) * 0.02;
      return clamp(c, 0.04, 0.97);
    };
    const upd = () => {
      const w = +wr.value, y = yr ? +yr.value : years0, c = chance(w, y);
      sc.querySelector('#cnWV').textContent = money(w);
      if (yr) sc.querySelector('#cnYV').textContent = y + (y === 1 ? ' year' : ' years');
      const bar = sc.querySelector('#cnBar'); bar.style.width = (c * 100).toFixed(0) + '%'; bar.style.background = c > 0.66 ? '#3ddc84' : c > 0.33 ? '#f2b928' : '#ff6b6b';
      sc.querySelector('#cnOdds').textContent = c > 0.85 ? 'They should be happy with this.' : c > 0.5 ? 'They might go for it.' : c > 0.2 ? 'A stretch. They may refuse.' : 'Far too much. They will not pay this.';
    };
    wr.oninput = upd; if (yr) yr.oninput = upd; upd();
    sc.querySelector('.jnX').onclick = sc.querySelector('#cnBack').onclick = () => fin({ agreed: false });
    sc.querySelector('#cnGo').onclick = () => {
      const w = Math.round(+wr.value * 100) / 100, y = yr ? +yr.value : years0;
      if (rnd() < chance(w, y)) { tries--; fin({ agreed: true, wage: w, years: y }); return; }
      tries--;
      if (tries <= 0) { toastWarn(`${t.s} will not move any further.`); fin({ agreed: false }); return; }
      offerW = Math.round(offerW * 1.02 * 100) / 100; note = `${t.s} stand firm but nudge their offer up slightly.`; draw();
    };
  };
  draw();
}
  /* ---- contract negotiation v2: fits short phone screens, and says clearly what was agreed ---- */
function openContractOfferOld(cfg) {
  if (cfg.wage == null) return ctrCardRaw(cfg);
  const years = cfg.years || 3, tries = cfg.negTries == null ? 3 : cfg.negTries, deal = ctrDealLine(cfg.wage, years, cfg.fixedYears);
  let had = false;
  const paragraphs = (cfg.paragraphs || []).map(p => /worth <b>/.test(p) ? (had = true, deal) : p);
  if (!had) paragraphs.push(deal);
  if (cfg.agreedNote) paragraphs.push(cfg.agreedNote);
  const options = (cfg.options || []).filter(o => o.key !== 'negotiate');
  if (tries > 0) { const i = options.findIndex(o => o.key === 'reject'); options.splice(i < 0 ? options.length : i, 0, { key: 'negotiate', label: 'Negotiate' }); }
  ctrCardRaw(Object.assign({}, cfg, {
    years, paragraphs, options,
    onChoice: k => {
      if (k === 'negotiate') {
        contractNegotiate({ team: cfg.team, wage: cfg.wage, years, fixedYears: cfg.fixedYears, tries }, r => {
          const note = r.agreed ? `<b>Agreed.</b> ${money(r.wage)} a season${cfg.fixedYears ? '' : ' for ' + r.years + ' year' + (r.years === 1 ? '' : 's')} (it was ${money(cfg.wage)}${cfg.fixedYears ? '' : ', ' + years + ' year' + (years === 1 ? '' : 's')}). Accept to sign.` : '';
          openContractOfferOld(Object.assign({}, cfg, r.agreed ? { wage: r.wage, years: r.years, defaultKey: 'accept', agreedNote: note, negTries: r.tries } : { years, agreedNote: '', negTries: r.tries }));
        });
        return;
      }
      if (k === 'accept') { window.__ctrTerms = { wage: cfg.wage, years }; try { cfg.onChoice('accept', { wage: cfg.wage, years }); } finally { window.__ctrTerms = null; } }
      else cfg.onChoice(k);
    }
  }));
}
function contractNegotiate(cfg, cb) {
  if (!document.getElementById('cnStyle')) {
    const st = document.createElement('style'); st.id = 'cnStyle';
    st.textContent = `.cnRows{display:block}.cnCol{margin-top:2px}.cnNote{margin:6px 0 0;font-size:13px;color:#d13b3b;font-weight:600}
      @media (max-height:480px){
        body .jnCard .jnHead{padding:6px 12px}body .jnCard .jnHead h3{font-size:14px;margin:0}body .jnCard .jnHead svg,body .jnCard .jnHead img{width:28px;height:28px}
        body .jnCard .jnBody{padding:8px 12px}body .jnCard .jnBody p{margin:0 0 4px;font-size:12px}
        .cnRows{display:flex;gap:18px}.cnCol{flex:1;min-width:0}
        body .jnCard .jnVal b{font-size:15px}body .jnCard .jnBar{margin-top:6px}
        body .jnCard .jnFoot{padding:6px 12px}}`;
    document.head.appendChild(st);
  }
  const t = cfg.team, base = cfg.wage, years0 = cfg.years; let offerW = base, tries = cfg.tries, note = '';
  const old = document.querySelector('.jnScrim'); if (old) old.remove();
  const sc = document.createElement('div'); sc.className = 'jnScrim'; document.body.appendChild(sc);
  const fin = r => { sc.remove(); cb(Object.assign({ tries }, r)); };
  const draw = () => {
    const lo = base * 0.8, hi = base * 1.5;
    sc.innerHTML = `<div class="jnCard"><div class="jnHead">${crestHTML(t, 38)}<div><h3>Negotiate</h3><small>${esc(t.n)} · ${TIER_SHORT[t.tier != null ? t.tier : t.t]}</small></div><button class="jnX" aria-label="Close">×</button></div>
      <div class="jnBody">
        <p>Their offer: <b>${money(offerW)}</b> a season${cfg.fixedYears ? '' : ` for <b>${years0} year${years0 === 1 ? '' : 's'}</b>`}. Move a slider, then press Counter-offer.</p>
        <div class="cnRows">
          <div class="cnCol"><label>Wage a season</label>
            <input class="range" type="range" id="cnW" min="${lo.toFixed(2)}" max="${hi.toFixed(2)}" step="0.01" value="${offerW.toFixed(2)}">
            <div class="jnVal"><span>Wage</span><b id="cnWV"></b></div></div>
          ${cfg.fixedYears ? '' : `<div class="cnCol"><label>Contract length</label>
            <input class="range" type="range" id="cnY" min="1" max="5" step="1" value="${years0}">
            <div class="jnVal"><span>Years</span><b id="cnYV"></b></div></div>`}
        </div>
        <div class="jnBar"><i id="cnBar"></i></div>
        <p id="cnOdds" style="margin:4px 0 0;font-size:12.5px;color:#6b7785"></p>
        ${note ? `<p class="cnNote">${esc(note)}</p>` : ''}
        <p style="margin:4px 0 0;font-size:12px;color:#8a95a1">${tries} counter-offer${tries === 1 ? '' : 's'} left.</p>
      </div>
      <div class="jnFoot"><button class="btn ghost sm" id="cnBack">Back to the offer</button><button class="btn sm" id="cnGo">Counter-offer</button></div></div>`;
    const wr = sc.querySelector('#cnW'), yr = sc.querySelector('#cnY');
    const chance = (w, y) => {
      let c = w <= offerW ? 1 : 1 - (w / offerW - 1) * 2.4;
      c -= Math.max(0, y - years0) * 0.03; c += Math.max(0, years0 - y) * 0.02;
      return clamp(c, 0.04, 0.97);
    };
    const upd = () => {
      const w = +wr.value, y = yr ? +yr.value : years0, c = chance(w, y);
      sc.querySelector('#cnWV').textContent = money(w);
      if (yr) sc.querySelector('#cnYV').textContent = y + (y === 1 ? ' year' : ' years');
      const bar = sc.querySelector('#cnBar'); bar.style.width = (c * 100).toFixed(0) + '%'; bar.style.background = c > 0.66 ? '#3ddc84' : c > 0.33 ? '#f2b928' : '#ff6b6b';
      sc.querySelector('#cnOdds').textContent = c > 0.85 ? 'They should be happy with this.' : c > 0.5 ? 'They might go for it.' : c > 0.2 ? 'A stretch. They may refuse.' : 'Far too much. They will not pay this.';
    };
    wr.oninput = upd; if (yr) yr.oninput = upd; upd();
    sc.querySelector('.jnX').onclick = sc.querySelector('#cnBack').onclick = () => fin({ agreed: false });
    sc.querySelector('#cnGo').onclick = () => {
      const w = Math.round(+wr.value * 100) / 100, y = yr ? +yr.value : years0;
      if (Math.abs(w - offerW) < 0.005 && y === years0) { note = 'Nothing has changed. Move the wage or the length first.'; draw(); return; }
      if (rnd() < chance(w, y)) { tries--; fin({ agreed: true, wage: w, years: y }); return; }
      tries--;
      if (tries <= 0) { toastWarn(`${t.s} will not move any further.`); fin({ agreed: false }); return; }
      offerW = Math.round(offerW * 1.02 * 100) / 100; note = `${t.s} said no, but nudged their offer up a little.`; draw();
    };
  };
  draw();
}
  function jobNegotiationFancy(cfg) {   if (!window.__jnErr) { window.__jnErr = 1; window.addEventListener('error', e => { try { toastWarn('Error: ' + e.message); } catch (x) { } }); }   const t = cfg.team, ext = cfg.heading === 'Contract Extension';   const wage0 = cfg.wage != null ? cfg.wage : mgrWage(t, cfg.mult || 1);   const years0 = cfg.years || 2;   let offerW = wage0, tries = 3, note = '';   const old = document.querySelector('.jnScrim'); if (old) old.remove();   const sc = document.createElement('div'); sc.className = 'jnScrim'; document.body.appendChild(sc);   const done = (k, terms) => {     sc.remove();     if (k === 'accept') { signCeremony({ manager: true, team: t, wage: terms.wage, years: terms.years, ext }, () => { window.__jobTerms = { tid: t.id, wage: terms.wage, years: terms.years }; try { cfg.onChoice('accept', terms); } finally { window.__jobTerms = null; } }); }     else if (cfg.onChoice) cfg.onChoice('reject');   };   const draw = () => {     const lo = offerW * 0.8, hi = offerW * 1.5;     sc.innerHTML = `<div class="jnCard"><div class="jnHead">${crestHTML(t, 38)}<div><h3>${esc(cfg.heading)}</h3><small>${esc(t.n)} · ${TIER_SHORT[t.tier]}</small></div><button class="jnX" aria-label="Close">×</button></div>       <div class="jnBody">         <p>${ext ? `${esc(t.n)} want to keep you.` : `${esc(t.n)} want you as their manager.`} Their offer: <b style="color:#fff">${money(offerW)}</b> a season for <b style="color:#fff">${years0} year${years0 === 1 ? '' : 's'}</b>.</p>         ${note ? `<p style="color:#f2b928">${esc(note)}</p>` : ''}         <label>Wage a season</label>         <input class="range" type="range" id="jnW" min="${lo.toFixed(2)}" max="${hi.toFixed(2)}" step="0.01" value="${offerW.toFixed(2)}">         <div class="jnVal"><span>Wage</span><b id="jnWV"></b></div>         <label>Contract length</label>         <input class="range" type="range" id="jnY" min="1" max="5" step="1" value="${years0}">         <div class="jnVal"><span>Years</span><b id="jnYV"></b></div>         <div class="jnBar"><i id="jnBar"></i></div>         <p id="jnOdds" style="margin:6px 0 0;font-size:13px;color:#8f98a2"></p>         <p style="margin:8px 0 0;font-size:12.5px;color:#6b737c">${tries} counter-offer${tries === 1 ? '' : 's'} left before they walk away.</p>       </div>       <div class="jnFoot"><button class="btn ghost sm" id="jnNo">Walk away</button><button class="btn ghost sm" id="jnAcc">Accept their offer</button><button class="btn sm" id="jnCtr">Counter-offer</button></div></div>`;     const wr = sc.querySelector('#jnW'), yr = sc.querySelector('#jnY');     const chance = (w, y) => {       let c = w <= offerW ? 1 : 1 - (w / offerW - 1) * 2.4;       c -= Math.max(0, y - years0) * 0.03; c += Math.max(0, years0 - y) * 0.02;       return clamp(c, 0.04, 0.97);     };     const upd = () => {       const w = +wr.value, y = +yr.value, c = chance(w, y);       sc.querySelector('#jnWV').textContent = money(w);       sc.querySelector('#jnYV').textContent = y + (y === 1 ? ' year' : ' years');       const bar = sc.querySelector('#jnBar'); bar.style.width = (c * 100).toFixed(0) + '%'; bar.style.background = c > 0.66 ? '#3ddc84' : c > 0.33 ? '#f2b928' : '#ff6b6b';       sc.querySelector('#jnOdds').textContent = c > 0.85 ? 'They should be happy with this.' : c > 0.5 ? 'They might go for it.' : c > 0.2 ? 'A stretch. They may refuse.' : 'Far too much. They will not pay this.';     };     wr.oninput = upd; yr.oninput = upd; try { upd(); } catch (e) { console.error(e); }     sc.querySelector('.jnX').onclick = () => done('reject');     sc.querySelector('#jnNo').onclick = () => done('reject');     sc.querySelector('#jnAcc').onclick = () => done('accept', { wage: Math.round(offerW * 100) / 100, years: years0 });     sc.querySelector('#jnCtr').onclick = () => {       const w = Math.round(+wr.value * 100) / 100, y = +yr.value;       if (Math.random() < chance(w, y)) { done('accept', { wage: w, years: y }); return; }       tries--;       if (tries <= 0) { sc.remove(); toastWarn(`${t.s} lose patience and withdraw their offer.`); if (cfg.onChoice) cfg.onChoice('reject'); return; }       offerW = Math.round(offerW * 1.02 * 100) / 100; note = `${t.s} stand firm but nudge their offer up slightly.`;       draw();     };   };   draw(); } function takeJob(G, id, wage, years) {   ensureMgr(G);   const m = G.manager, oldClub = G.teams[G.myTeam], wasJobless = !!G.jobless;   const T = window.__jobTerms && window.__jobTerms.tid === id ? window.__jobTerms : null;   if (T) { wage = T.wage; years = T.years; }   if (wage == null) wage = mgrWage(G.teams[id]);   years = years || 3;   if (!wasJobless) {     const kind = G.boardFired ? 'sacked' : 'left';     const txt = G.boardFired ? `${m.name} was sacked.` : `${m.name} left to take charge of ${G.teams[id].n}.`;     openVacancy(G, oldClub.id, kind, txt, { blocked: true });   }   G.vac = G.vac.filter(v => v.tid !== id);   G.vacApps = []; G.vacOffers = [];   G.myTeam = id; G.jobless = false;   if (G._liveBefore != null) { G.liveMode = G._liveBefore; G._liveBefore = null; }   m.clubs = m.clubs || [];   m.clubs.push({ id, from: G.season });   m.wage = wage; m.contractEnd = G.season + years - 1; m.renewal = null; m.lastWage = null;   const t = G.teams[id]; t.mgr = Object.assign(newAiMgr(t), { name: m.name, since: G.season, apptDay: G.curDay || 0 });   news(G, 'career', wasJobless ? `${m.name} is appointed manager of ${t.n}.` : `${m.name} leaves ${oldClub.s} to take charge of ${t.n}.`);   mail(G, { cat: 'career', from: 'Board of Directors', subject: `Welcome to ${t.n}`, body: [`You are the new manager of ${t.n}.`],     rows: [['Wage', money(wage) + ' a season'], ['Contract', `${years} year${years === 1 ? '' : 's'}`], ['Runs until', `June ${m.contractEnd + 1}`]] });   mail(G, { cat: 'personal', from: pick(['Mom', 'Dad', 'Your Brother', 'Your Sister', 'An Old Friend']), subject: 'Congratulations on the New Job!',     body: [`Just heard you're taking over at ${t.n} — congratulations!`, `We're all so proud of you. Go show them what you can do.`] }); } function takeJobOld(G, id, wage) {
  const oldClub = G.teams[G.myTeam];
  G.myTeam = id;
  G.manager.clubs = G.manager.clubs || [];
  G.manager.clubs.push({ id, from: G.season });
  if (wage != null) G.manager.wage = wage;
  news(G, 'career', `${G.manager.name} leaves ${oldClub.s} to take charge of ${G.teams[id].n}.`);
  mail(G, { cat: 'personal', from: pick(['Mom', 'Dad', 'Your Brother', 'Your Sister', 'An Old Friend']), subject: 'Congratulations on the New Job!',
    body: [`Just heard you're taking over at ${G.teams[id].n} — congratulations!`, `We're all so proud of you. Go show them what you can do.`] });
}

/* ---------------- sponsors ---------------- */
const SPONSORS = [
{ name: 'panar.co.za', base: 22, c1: '#29e0ff', c2: '#0b1a22', icon: 'globe', img: 'brands/panar.webp' },
  { name: "Wesley's Theory Holdings", base: 14, c1: '#c9a227', c2: '#1c1200', icon: 'bank' },
  { name: 'Sana Logistics', base: 14, c1: '#ff8a00', c2: '#231200', icon: 'truck' },
  { name: 'Haibo (Pty) Ltd', base: 9, c1: '#39ff8c', c2: '#031b10', icon: 'building' },
{ name: '@brightntuliart', base: 9, c1: '#ff2d6e', c2: '#22030d', icon: 'brush', img: 'brands/brightntuliart.webp' },
{ name: 'Fatcat Clothing', base: 3.6, c1: '#a970ff', c2: '#160a26', icon: 'shirt', img: 'brands/fatcat.webp' },
  { name: 'Thenga X', base: 3.6, c1: '#ffe14d', c2: '#241d00', icon: 'bolt' },   { name: 'Ama Artist', base: 5, c1: '#c9a227', c2: '#111111', icon: 'brush' },   { name: 'The GBVF Action Hub', base: 2.5, c1: '#8e44ad', c2: '#1a0a24', icon: 'globe' },
  { name: 'Football Is Life Organisation', base: 1.4, c1: '#3ddc84', c2: '#04150b', icon: 'ball' }
];
function sponsorLogoSVG(s, size) {
  size = size || 56;
  const bi = s.img || BRAND_IMG[s.name]; if (bi) return `<img src="${bi}" width="${size}" height="${size}" style="border-radius:12px;object-fit:cover;display:block;background:#fff" alt="">`;
  const icons = {
    globe: `<circle cx="28" cy="28" r="16" fill="none" stroke="${s.c1}" stroke-width="3"/><ellipse cx="28" cy="28" rx="16" ry="7" fill="none" stroke="${s.c1}" stroke-width="2"/><line x1="12" y1="28" x2="44" y2="28" stroke="${s.c1}" stroke-width="2"/><line x1="28" y1="12" x2="28" y2="44" stroke="${s.c1}" stroke-width="2"/>`,
    bank: `<rect x="12" y="30" width="32" height="6" rx="1" fill="${s.c1}"/><polygon points="28,10 46,22 10,22" fill="${s.c1}"/><rect x="15" y="22" width="4" height="8" fill="${s.c1}"/><rect x="24" y="22" width="4" height="8" fill="${s.c1}"/><rect x="33" y="22" width="4" height="8" fill="${s.c1}"/>`,
    truck: `<rect x="8" y="22" width="24" height="12" rx="1" fill="${s.c1}"/><path d="M32 26h8l6 6v2h-14z" fill="${s.c1}"/><circle cx="16" cy="36" r="3.4" fill="${s.c2}" stroke="${s.c1}" stroke-width="2"/><circle cx="38" cy="36" r="3.4" fill="${s.c2}" stroke="${s.c1}" stroke-width="2"/>`,
    building: `<rect x="14" y="12" width="12" height="30" fill="${s.c1}"/><rect x="28" y="20" width="12" height="22" fill="${s.c1}" opacity=".75"/><rect x="18" y="17" width="3" height="3" fill="${s.c2}"/><rect x="18" y="24" width="3" height="3" fill="${s.c2}"/><rect x="18" y="31" width="3" height="3" fill="${s.c2}"/>`,
    brush: `<path d="M36 10c4 0 6 2 6 6 0 5-8 9-14 15l-6-6c6-6 10-15 14-15z" fill="${s.c1}"/><path d="M22 25l6 6-4 10-9-3z" fill="${s.c1}" opacity=".7"/>`,
    shirt: `<path d="M20 12l8-3 8 3 6 6-5 5-3-2v22H22V21l-3 2-5-5z" fill="${s.c1}"/>`,
    bolt: `<polygon points="30,8 16,30 26,30 22,46 40,22 28,22" fill="${s.c1}"/>`,
    ball: `<circle cx="28" cy="28" r="16" fill="${s.c1}"/><polygon points="28,18 34,23 32,30 24,30 22,23" fill="${s.c2}"/><line x1="28" y1="12" x2="28" y2="18" stroke="${s.c2}" stroke-width="2"/><line x1="14" y1="22" x2="22" y2="23" stroke="${s.c2}" stroke-width="2"/><line x1="18" y1="40" x2="24" y2="30" stroke="${s.c2}" stroke-width="2"/><line x1="38" y1="40" x2="32" y2="30" stroke="${s.c2}" stroke-width="2"/><line x1="42" y1="22" x2="34" y2="23" stroke="${s.c2}" stroke-width="2"/>`
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 56 56"><rect width="56" height="56" rx="12" fill="${s.c2}"/>${icons[s.icon] || icons.globe}</svg>`;
}
function sponsorOffersCached(G) {   const t = G.teams[G.myTeam], key = G.season + '|' + t.id;   if (!G.spOffers || G.spOffers.key !== key) G.spOffers = { key, list: buildSponsorOffers(G) };   return G.spOffers.list; } function sponsorScaled(o) {   const f = Math.max(0.15, Math.min(1, 1 - ((G.round || 1) - 1) / Math.max(1, totalRounds(G))));   return Object.assign({}, o, { amount: Math.max(0.1, Math.round(o.amount * f * 100) / 100) }); } function signShirtSponsor(o0) {   const t = me(), o = sponsorScaled(o0), installments = 10;   const firstPay = o.freq === 'monthly' ? Math.round((o.amount / installments) * 100) / 100 : o.amount;   t.currentSponsor = { name: o.name, icon: o.icon, img: o.img, c1: o.c1, c2: o.c2, amount: o.amount, freq: o.freq, paidSoFar: firstPay, installments };   t.budget = Math.round((t.budget + firstPay) * 100) / 100;   t.fin.sponsor = (t.fin.sponsor || 0) + firstPay;   noteInc(t, 'Shirt sponsor: ' + o.name, firstPay);   news(G, 'transfer', o.freq === 'monthly'     ? `${t.s} sign a sponsorship deal with ${o.name} worth ${money(o.amount)} this season, paid monthly.`     : `${t.s} sign a sponsorship deal with ${o.name} worth ${money(o.amount)}.`);   try { playSound('coin'); } catch (e) { }   save(); toast(`Signed with ${o.name}: ${money(o.amount)}.`); } function buildSponsorOffers(G) {
  const t = me_(G);
  const tierMult = [1, 0.42, 0.16, 0.06, 0.02][t.tier] || 0.02;
  const repMult = 0.6 + (t.rep / 10) * 0.8;
  const mult = {};
  const SP_R = { 'panar.co.za': 1.0, "Wesley's Theory Holdings": 0.94, 'Sana Logistics': 0.93, 'Haibo (Pty) Ltd': 0.9, 'Ama Artist': 0.89, '@brightntuliart': 0.88, 'Fatcat Clothing': 0.87, 'Thenga X': 0.86, 'The GBVF Action Hub': 0.85, 'Football Is Life Organisation': 0.84 };   const pan = SPONSORS.filter(x => x.name === 'panar.co.za'), rest = shuffle(SPONSORS.filter(x => x.name !== 'panar.co.za'));   const pool = shuffle(SPONSORS.slice());   return pool.map(s => {
    const fq = rnd() < 0.5 ? 'monthly' : 'upfront', noise = 0.84 + rnd() * 0.32;
    const amount = Math.max(0.15, Math.round(14 * (SP_R[s.name] || 0.85) * noise * (fq === 'monthly' ? 1.06 : 1) * tierMult * repMult * 100) / 100);
    const freq = fq;
    return { name: s.name, icon: s.icon, img: s.img, c1: s.c1, c2: s.c2, amount, freq };
  });
}
function me_(G) { return G.teams[G.myTeam]; }

/* ---------------- player loans ---------------- */
function loanOut(G, pid, seasons) {
  const me = G.teams[G.myTeam];
  const p = me.squad.find(x => x.id === pid);
  if (!p) return { ok: false, msg: 'Not in your squad.' };
  if (me.squad.length <= MIN_SENIOR) return { ok: false, msg: `You can't loan ${p.name} out: you must keep at least ${MIN_SENIOR} senior players.` };
  if (!inTransferWindow(G)) return { ok: false, msg: `The transfer window is shut. It reopens in ${roundsToNextWindow(G)} day${roundsToNextWindow(G) === 1 ? '' : 's'}.` };
  if (me.captainId === pid || me.viceCaptainId === pid) return { ok: false, msg: `${p.name} is captain or vice-captain — can't be loaned out.` };
  const dest = G.teams.filter(t => t.id !== me.id && Math.abs(clubLevel(t) - p.rating) < 14);
  const club = dest.length ? pick(dest) : pick(G.teams.filter(t => t.id !== me.id));
  p.loan = { from: me.id, seasons: seasons || 1, wageShare: 0.5 };
  me.squad = me.squad.filter(x => x.id !== pid);
  club.squad.push(p);
  p.clubs.push({ id: club.id, from: G.season, loan: true });
  me.wageBill = wageOf(me); club.wageBill = wageOf(club);
  ensureLineup(me); ensureLineup(club);
  news(G, 'transfer', `${p.name} joins ${club.s} on loan from ${me.s}.`, { pid: p.id, fromId: me.id, toId: club.id });   mail(G, { cat: 'leaving', from: 'Chief Executive', p, club, status: `On loan at ${club.s}`, subject: `[Info] Loan Agreed: ${p.name}`,     body: [`${p.name} has joined ${club.n} on loan.`, `You can recall him from the Squad screen if you need him back.`],     rows: [['Loan club', club.n], ['Length', `${p.loan.seasons} season${p.loan.seasons === 1 ? '' : 's'}`], ['Wage share paid by borrower', Math.round(p.loan.wageShare * 100) + '%']] });
  return { ok: true, msg: `${p.name} goes out on loan to ${club.s}.` };
}
function recallLoan(G, pid) {
  const found = findPlayer(G, pid);
  if (!found || !found.p.loan || found.p.loan.from !== G.myTeam) return { ok: false, msg: 'Not out on loan from you.' };
  const me = G.teams[G.myTeam], club = found.t, p = found.p;
  club.squad = club.squad.filter(x => x.id !== pid);
  delete p.loan;
  me.squad.push(p);
  me.wageBill = wageOf(me); club.wageBill = wageOf(club);
  ensureLineup(me); ensureLineup(club);
  news(G, 'transfer', `${p.name} is recalled from his loan at ${club.s}.`);
  mail(G, { cat: 'player', from: 'Chief Executive', p, club: me, status: 'Back from loan', subject: `[Info] ${p.name} recalled from loan`, body: [`${p.name} is back at ${me.n} after being recalled from ${club.n}.`] });
  return { ok: true, msg: `${p.name} is back at ${me.s}.` };
}
function endSeasonLoans(G) {
  G.teams.forEach(t => {
    t.squad.filter(p => p.loan).forEach(p => {
      p.loan.seasons--;
      if (p.loan.seasons <= 0) {
        const home = G.teams[p.loan.from];
        if (home && home.id !== t.id) {
          t.squad = t.squad.filter(x => x.id !== p.id);
          delete p.loan;
          home.squad.push(p);
          t.wageBill = wageOf(t); home.wageBill = wageOf(home);
          ensureLineup(t); ensureLineup(home);
            if (home.id === G.myTeam || t.id === G.myTeam) {             news(G, 'transfer', `${p.name}'s loan spell at ${t.s} ends — back to ${home.s}.`);             mail(G, { cat: home.id === G.myTeam ? 'player' : 'leaving', from: 'Chief Executive', p, club: home, status: `Back at ${home.s}`, subject: `[Info] Loan Ended: ${p.name}`,               body: [`${p.name}'s loan spell at ${t.n} has ended and he returns to ${home.n}.`] });           }
        }
      }
    });
  });
}

/* ---------------- board of directors ---------------- */
function boardTargetFor(t) {
  const lo = G.obj && G.obj.team === t.id && G.obj.season === G.season ? G.obj.items.find(i => i.kind === 'league') : null;
  if (lo) return lo.target;
  if (t.tier === 0) return 8;
  return TIER_SIZE - 4;
}
function updateBoard(G, sum) {
  const t = G.teams[G.myTeam];
  const last = t.history[t.history.length - 1];
  const target = boardTargetFor(t);
  const won = t.trophies.filter(x => x.season === sum.season).length;
  let delta = (target - last.pos) * 4.2 + won * 18;
  if (sum.relegated.includes(G.myTeam)) delta -= 55;
  if (sum.promoted.includes(G.myTeam)) delta += 20;
  const fin = t.finHistory[t.finHistory.length - 1];
  if (fin && fin.net < 0) delta -= 8;
  let objRes = null, objBonus = 0;
  if (G.obj && G.obj.season === G.season && G.obj.team === G.myTeam) {
    const adj = { cup: [5, -5], money: [3, -6], youth: [3, -2] };
    objRes = G.obj.items.map(it => ({ kind: it.kind, label: it.label, met: evalObjective(G, it, true).state === 'met' }));
    objRes.forEach(r => { if (r.kind !== 'league') delta += r.met ? adj[r.kind][0] : adj[r.kind][1]; });
    const metN = objRes.filter(r => r.met).length;
    if (!sum.relegated.includes(G.myTeam)) objBonus = Math.round(t.wageBill * (metN === objRes.length ? 0.3 : (metN >= objRes.length - 1 && objRes[0].met ? 0.12 : 0)) * 100) / 100;
    if (objBonus > 0) t.budget += objBonus;
  }
  G.board = clamp((G.board != null ? G.board : 62) + delta * 0.6, 0, 100);
  if (objRes) {
    G.objLog = G.objLog || []; G.objLog.push({ season: G.season, club: t.s, results: objRes, pos: last.pos, board: G.board, bonus: objBonus }); if (G.objLog.length > 25) G.objLog.shift();
    const metN = objRes.filter(r => r.met).length;
    mail(G, { key: 'objres_' + G.season + '_' + t.id, cat: 'career', from: 'Board of Directors', subject: `Season Review ${seasonLabel(G.season)}`, flag: metN < objRes.length,
      body: [metN === objRes.length ? 'The board are delighted: you met every objective this season.' : metN === 0 ? 'The board are deeply disappointed: none of the objectives were met this season.' : `The board note that you met ${metN} of ${objRes.length} objectives this season.`, `Board confidence is now ${Math.round(G.board)} out of 100 (${boardLabel(G.board)}).`],
      rows: objRes.map(r => [OBJ_NAMES[r.kind], r.label + ' · ' + (r.met ? 'Met' : 'Not met')]).concat(objBonus > 0 ? [['Board bonus', money(objBonus) + ' added to your transfer budget']] : []) });
  }
  G.boardFired = G.board <= 20;
  return G.boardFired;
}
function boardMaxGrant(G) {
  const t = G.teams[G.myTeam];
  const board = G.board != null ? G.board : 62;
  const last = t.history[t.history.length - 1];
  const doingWell = last && last.pos <= boardTargetFor(t);
  const tierScale = [14, 5, 1.8, 0.7, 0.3][t.tier] || 0.3;
  let mult = 0.15 + (board / 100) * 0.55 + (doingWell ? 0.25 : 0);
  mult *= 0.6 + (G.manager.rep || 40) / 100 * 0.8;
  return Math.max(0.1, Math.round(tierScale * mult * 100) / 100);
}
function askBoardForFunds(G, amount) {
  const t = G.teams[G.myTeam];
  amount = Math.max(0, Math.round(amount * 100) / 100);
  if (amount <= 0) return { ok: false, msg: 'Ask for a real amount first.' };
  if (G.lastBoardAsk === G.season) return { ok: false, msg: 'You already went to the board this season — try again next season.' };
  const board = G.board != null ? G.board : 62;
  if (board < 20) { G.lastBoardAsk = G.season; return { ok: false, msg: 'The board have no confidence in you right now and refuse outright.' }; }
  const max = boardMaxGrant(G);
  G.lastBoardAsk = G.season;
  if (amount > max * 1.15) {
    const counter = Math.max(0.1, Math.round(max * (0.55 + rnd() * 0.3) * 100) / 100);
    t.budget = Math.round((t.budget + counter) * 100) / 100;
    news(G, 'career', `The board reject ${G.manager.name}'s ask for ${money(amount)} but release ${money(counter)} instead.`);
    return { ok: true, countered: true, granted: counter, msg: `${money(amount)} was too rich for them — they'll stretch to ${money(counter)} instead.` };
  }
  const chance = clamp(0.35 + (board - 50) / 90 - (amount / max) * 0.25, 0.08, 0.95);
  if (rnd() > chance) {
    return { ok: false, msg: `The board turn down your request for ${money(amount)}.` };
  }
  t.budget = Math.round((t.budget + amount) * 100) / 100;
  news(G, 'career', `The board back ${G.manager.name} with an extra ${money(amount)} for the transfer budget.`);
  return { ok: true, granted: amount, msg: `The board agree — ${money(amount)} lands in the transfer budget.` };
}

/* ============================================================
   Mzansi Manager — artwork generators
   ============================================================ */

let FACE_UID = 0, KIT_UID = 0;

function clampN(v, a, b) { return v < a ? a : v > b ? b : v; }
function shade(hex, amt) {
  const c = (hex || '#888888').replace('#', '');
  let r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
  r = Math.round(clampN(r + amt, 0, 255)); g = Math.round(clampN(g + amt, 0, 255)); b = Math.round(clampN(b + amt, 0, 255));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
function isDark(hex) {
  const c = (hex || '#888888').replace('#', '');
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

/* ---------------- hair ---------------- */
function hairPath(style, hc, id) {
  const hi = shade(hc, 34), lo = shade(hc, -14);
  const cap = `<path d="M11.2 17.6c0-6.4 3.7-9.9 8.8-9.9s8.8 3.5 8.8 9.9c-.6-3.2-1.6-5-2.8-5.6-3.4-1.7-10.6-1.7-14 0-1.2.6-2.2 2.4-2.8 5.6z" fill="url(#hg${id})"/>`;
  switch (style) {
    case 'bald': return `<path d="M13 12.4q7-3.4 14 0-1-1.2-2.2-1.9-4.8-2.2-9.6 0-1.2.7-2.2 1.9z" fill="#ffffff" opacity=".08"/>`;
    case 'buzz': return `<path d="M11.4 17.4c0-5.8 3.6-9.1 8.6-9.1s8.6 3.3 8.6 9.1c-1.1-3.6-4.2-5.2-8.6-5.2s-7.5 1.6-8.6 5.2z" fill="url(#hg${id})" opacity=".92"/>`;
    case 'fade': return cap + `<rect x="11.5" y="15.6" width="17" height="1.4" fill="${lo}" opacity=".5"/>`;
    case 'lineup': return `<path d="M11.3 17.2c0-6.2 3.6-9.6 8.7-9.6s8.7 3.4 8.7 9.6V13.2H11.3z" fill="url(#hg${id})"/><rect x="11.3" y="12.6" width="17.4" height="1" fill="${hi}" opacity=".45"/>`;
    case 'afro': return `<ellipse cx="20" cy="12" rx="11.6" ry="8.8" fill="url(#hg${id})"/><ellipse cx="20" cy="15.4" rx="10" ry="6.6" fill="url(#hg${id})"/><ellipse cx="16" cy="8.6" rx="3.6" ry="2.4" fill="${hi}" opacity=".32"/>`;
    case 'hightop': return `<path d="M12.2 17c0-4.8 2.8-7 7.8-7s7.8 2.2 7.8 7z" fill="url(#hg${id})"/><rect x="13.2" y="2.8" width="13.6" height="8.4" rx="2.4" fill="url(#hg${id})"/><rect x="14.4" y="3.6" width="3" height="6" rx="1.4" fill="${hi}" opacity=".3"/>`;
    case 'mohawk': return `<path d="M12.2 17.2c0-4 2.6-6 7.8-6s7.8 2 7.8 6c-.8-2.4-2-3.4-3.4-3.8-1.6-.5-7.2-.5-8.8 0-1.4.4-2.6 1.4-3.4 3.8z" fill="${lo}" opacity=".55"/><path d="M17.2 3.8q2.8-2.2 5.6 0v9.4h-5.6z" fill="url(#hg${id})"/>`;
    case 'dreads': return `<ellipse cx="20" cy="12.6" rx="10.2" ry="7.6" fill="url(#hg${id})"/>` +
      [8.2, 10.6, 26.6, 29].map((x, i) => `<rect x="${x}" y="12.6" width="2.6" height="${10 + (i % 2) * 5}" rx="1.3" fill="${i % 2 ? hc : lo}"/>`).join('');
    case 'locs': return `<ellipse cx="20" cy="12.4" rx="10.4" ry="7.2" fill="url(#hg${id})"/>` +
      [8, 10.4, 26.8, 29.2].map((x, i) => `<rect x="${x}" y="12.6" width="2.3" height="${15 + (i % 2) * 6}" rx="1.15" fill="${i % 2 ? hc : lo}"/>`).join('');
    case 'braids': return cap + [13.2, 16, 19, 22, 24.9].map(x =>
      `<rect x="${x}" y="8.2" width="1.2" height="9" rx=".6" fill="${lo}" opacity=".85"/>`).join('');
    case 'cornrows': return cap + [10.6, 12.6, 14.6, 16.4].map(y =>
      `<path d="M12.4 ${y}q7.6-2.8 15.2 0" stroke="${lo}" stroke-opacity=".8" stroke-width=".8" fill="none"/>`).join('');
    case 'curls': return `<path d="M11.4 17c0-6 3.6-9.4 8.6-9.4s8.6 3.4 8.6 9.4z" fill="url(#hg${id})"/>` +
      [[12.9, 10.4, 2.6], [15.9, 8.2, 2.8], [20, 7.2, 3], [24.1, 8.2, 2.8], [27.1, 10.4, 2.6]].map(([x, y, r]) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#hg${id})"/>`).join('') +
      `<circle cx="16.4" cy="8.4" r="1.1" fill="${hi}" opacity=".4"/>`;
    default: return cap;
  }
}

function eyeGroup(cx, cy, browTilt, hc) {
  const w = 2.05, hTop = 1.15, hBot = 0.62;
  const sclera = `M ${cx - w} ${cy} Q ${cx} ${cy - hTop} ${cx + w} ${cy} Q ${cx} ${cy + hBot} ${cx - w} ${cy} Z`;
  const irisCx = cx + (cx < 20 ? 0.15 : -0.15);
  const browY = cy - 2.7 - browTilt * 1.2;
  return `
    <path d="${sclera}" fill="#f2ede4"/>
    <clipPath id="ec${++FACE_UID}"><path d="${sclera}"/></clipPath>
    <g clip-path="url(#ec${FACE_UID})">
      <circle cx="${irisCx}" cy="${cy}" r="1.1" fill="#3b2415"/>
      <circle cx="${irisCx}" cy="${cy}" r="1.1" fill="none" stroke="#20140c" stroke-width=".18"/>
      <circle cx="${irisCx}" cy="${cy}" r=".46" fill="#0e0906"/>
      <circle cx="${irisCx - .35}" cy="${cy - .4}" r=".26" fill="#fff" opacity=".85"/>
    </g>
    <path d="${sclera}" fill="none" stroke="#00000022" stroke-width=".3"/>
    <path d="M ${cx - w} ${cy} Q ${cx} ${cy - hTop} ${cx + w} ${cy}" fill="none" stroke="#00000030" stroke-width=".45"/>
    <path d="M ${cx - w * 0.85} ${browY} Q ${cx} ${browY - 0.9 - browTilt} ${cx + w * 0.9} ${browY + 0.35}" fill="none" stroke="${hc}" stroke-width="1.15" stroke-linecap="round" opacity=".92"/>`;
}
function silhouetteSVGOld(s, kit) {
  return `<svg class="face" width="${s}" height="${s}" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#2b3340"/><circle cx="20" cy="15" r="7" fill="#586172"/><path d="M6 40c0-9 6-14 14-14s14 5 14 14z" fill="${kit || '#586172'}" opacity=".85"/></svg>`;
} /* ---- team colours around player pictures ---- */
function faceTeam(p, kit) {
  let t = null;
  try { if (typeof G !== 'undefined' && G && G.teams && p && p.clubs && p.clubs.length) { const t0 = G.teams[p.clubs[p.clubs.length - 1].id]; if (t0 && t0.squad.includes(p)) t = t0; } } catch (e) { }
  const c1 = t ? t.c1 : (kit || '#586172'), c2 = t ? t.c2 : shade(c1, -40);
  const lum = h => { const n = parseInt(String(h).replace('#', '').slice(0, 6), 16) || 0; return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
  const ring = lum(c1) > 0.2 ? c1 : (lum(c2) > 0.2 ? c2 : shade(c1, 80));
  const far = Math.abs(lum(c1) - lum(c2)) > 0.18;
  const bg = far ? c2 : shade(c1, -45);
  return { ring, bgA: shade(bg, 28), bgB: shade(bg, -55) };
}
function faceSVG(p, size, kit) {
  const s = size || 38;
  if (p && p.noFace) return silhouetteSVG(s, kit);
  if (p && p.portrait) return `<img class="face" src="players/${p.portrait}.jpg" width="${s}" height="${s}" style="object-fit:cover;outline:2px solid ${faceTeam(p, kit).ring};outline-offset:-2px" loading="lazy" alt="" data-pr="${p.portrait}" data-pl="${p.id}" onerror="portraitFail(this)">`;
  const f = (p && p.face) || { sk: '#5c3620', hr: 'fade', hc: '#1d1713', bd: 0, ey: 1, nose: 1 };
  const id = ++FACE_UID;
  const sk = f.sk, hc = f.hc;
  const skHi = shade(sk, 30), skLo = shade(sk, -34), skDeep = shade(sk, -58);
  const shirt = kit || '#41525d'; const FT = faceTeam(p, kit);
  const beard = f.bd === 1
    ? `<path d="M12.5 20.6c.5 5.9 3.4 9.2 7.5 9.2s7-3.3 7.5-9.2c-1.3 3.6-4 5.3-7.5 5.3s-6.2-1.7-7.5-5.3z" fill="${hc}" opacity=".88"/>`
    : f.bd === 2
      ? `<path d="M15.2 25.1h9.6c-.9 3.1-2.7 4.7-4.8 4.7s-3.9-1.6-4.8-4.7z" fill="${hc}" opacity=".9"/><path d="M16.9 22.2h6.2v1.7h-6.2z" fill="${hc}" opacity=".9"/>`
      : f.bd === 3
        ? `<path d="M17 22.1h6v1.6h-6z" fill="${hc}" opacity=".9"/>` : '';
  const eyeY = 19.2, eo = 0.1 + (f.ey || 0) * 0.12;
  return `<svg class="face" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true">
  <defs>
    <radialGradient id="sg${id}" cx="38%" cy="30%" r="78%">
      <stop offset="0" stop-color="${skHi}"/><stop offset="62%" stop-color="${sk}"/><stop offset="1" stop-color="${skLo}"/>
    </radialGradient>
    <linearGradient id="hg${id}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${shade(hc, 26)}"/><stop offset="1" stop-color="${shade(hc, -16)}"/>
    </linearGradient>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(shirt, 22)}"/><stop offset="1" stop-color="${shade(shirt, -34)}"/>
    </linearGradient>
    <clipPath id="cp${id}"><circle cx="20" cy="20" r="20"/></clipPath>
  </defs>
  <g clip-path="url(#cp${id})">
    <linearGradient id="tb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${FT.bgA}"/><stop offset="1" stop-color="${FT.bgB}"/></linearGradient><rect width="40" height="40" fill="url(#tb${id})"/>
    <rect y="22" width="40" height="18" fill="#000" opacity=".06"/>
    <path d="M16.5 24.5h7v7.5h-7z" fill="${skLo}"/>
    <path d="M16.5 27.6q3.5 2.6 7 0v4.4h-7z" fill="${skDeep}" opacity=".55"/>
    <path d="M4.4 41c1.3-7.6 6.9-10.9 15.6-10.9S34.3 33.4 35.6 41z" fill="url(#bg${id})"/>
    <path d="M15.4 30.6q4.6 4.2 9.2 0l1.8.7q-5.2 5.4-12.8 0z" fill="#fff" opacity=".14"/>
    <ellipse cx="11.3" cy="20.6" rx="1.9" ry="2.5" fill="${skLo}"/>
    <ellipse cx="28.7" cy="20.6" rx="1.9" ry="2.5" fill="${skLo}"/>
    <path d="M20 8.9c5.3 0 8.7 3.8 8.7 9.8 0 4-1.3 7.6-3.3 9.8-1.6 1.7-3.4 2.6-5.4 2.6s-3.8-.9-5.4-2.6c-2-2.2-3.3-5.8-3.3-9.8 0-6 3.4-9.8 8.7-9.8z" fill="url(#sg${id})"/>
    <path d="M20 8.9c5.3 0 8.7 3.8 8.7 9.8 0 4-1.3 7.6-3.3 9.8-.4.4-.8.8-1.2 1.1 1.3-2.4 2-5.6 2-9.2 0-6-2.6-9.8-7.9-9.8z" fill="${skLo}" opacity=".4"/>
    ${beard}
    ${eyeGroup(16.4, eyeY, eo, hc)}
    ${eyeGroup(23.6, eyeY, eo, hc)}
    <path d="M19.7 ${eyeY + 0.6}q.3 1.7-.1 2.6-.3.7-1 .9" stroke="${skLo}" stroke-width=".85" fill="none" stroke-linecap="round" opacity=".75"/>
    <ellipse cx="18.9" cy="${eyeY + 4.1}" rx=".55" ry=".32" fill="${skDeep}" opacity=".55"/>
    <ellipse cx="21.1" cy="${eyeY + 4.1}" rx=".55" ry=".32" fill="${skDeep}" opacity=".55"/>
    <path d="M18.3 23.1q1.7 1 3.4 0" stroke="${skDeep}" stroke-width=".7" fill="none" stroke-linecap="round" opacity=".65"/>
    <path d="M17.3 25.3q2.7-1.15 5.4 0-2.7 2.3-5.4 0z" fill="${shade(sk, -46)}"/>
    <path d="M17.5 25.5q2.5-.9 5 0-1 .55-2.5.6-1.5-.05-2.5-.6z" fill="${shade(sk, 14)}" opacity=".5"/>
    ${hairPath(f.hr, hc, id)}
  </g>
  <circle cx="20" cy="20" r="19.4" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>
</svg>`;
}

/* ---------------- manager avatars ---------------- */
function avatarSVG(id, size) {
  const s = size || 46;
  return `<img class="face" src="managers/${id}.jpg" width="${s}" height="${s}" style="object-fit:cover" alt="">`;
}

function cafWinsByName(name) {   return (G && G.africa && G.africa.cafHistory) ? G.africa.cafHistory.filter(h => h.winner === name).length : 0; } function cafStars(t) {   if (!t) return 0;   let n = t.trophies ? t.trophies.filter(x => x.name === CAF_NAME).length : 0;   if (G && G.africa && G.africa.squadCache && G.africa.squadCache[t.id] === t) n = Math.max(n, cafWinsByName(t.n));   return n; } function afrStarsHTML(name) {   const n = Math.min(5, cafWinsByName(name));   if (!n) return '';   const star = '<svg viewBox="0 0 24 24" width="11" height="11" style="flex:0 0 auto"><path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.5 5.6 21.1 7 14l-5.3-5 7.2-.9z" fill="#f5c518" stroke="#8a5f10" stroke-width="1.2" stroke-linejoin="round"/></svg>';   return `<span title="${n}x ${CAF_NAME} winners" style="display:inline-flex;gap:1px;margin-left:5px;vertical-align:middle">${star.repeat(n)}</span>`; }
function crestArcPts(cx, cy, r) {
  const pts = [];
  for (let d = -115; d <= 115; d += 5) { const a = d * Math.PI / 180; pts.push([cx + r * Math.sin(a), cy - r * Math.cos(a)]); }
  return pts;
}
function crestTopContour(t, s) {
  const sc = (k, pts) => pts.map(p => [p[0] * k, p[1] * k]);
  if (t.badge === 'bright') return crestArcPts(s / 2, s / 2, s / 2);
  if (t.icon) {
    const k = s / 24, shape = t.shape || 'shield';
    if (shape === 'circle') return crestArcPts(12 * k, 12 * k, 11.2 * k);
    if (shape === 'diamond') return sc(k, [[1.5, 12], [12, 1], [22.5, 12]]);
    if (shape === 'hexagon') return sc(k, [[3, 6.5], [12, 1], [21, 6.5]]);
    if (shape === 'pentagon') return sc(k, [[1.5, 8.8], [12, 1], [22.5, 8.8]]);
    if (shape === 'roundsquare') {
      const pts = [[1.5, 12]];
      for (let d = -90; d <= 0; d += 15) { const a = d * Math.PI / 180; pts.push([7.5 + 6 * Math.sin(a), 7.5 - 6 * Math.cos(a)]); }
      for (let d = 0; d <= 90; d += 15) { const a = d * Math.PI / 180; pts.push([16.5 + 6 * Math.sin(a), 7.5 - 6 * Math.cos(a)]); }
      pts.push([22.5, 12]);
      return sc(k, pts);
    }
    return sc(k, [[2.4, 4.6], [12, 1.4], [21.6, 4.6]]);
  }
  return sc(s / 40, [[2, 7], [20, 1], [38, 7]]);
}
function crestStarsSVG(t, s, h, n) {
  const pts = crestTopContour(t, s), cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = cum[cum.length - 1];
  const st = Math.max(6, Math.min(Math.round(s * 0.26), Math.round(s / (1 + 1.12 * (n - 1)))));
  const sp = st * 1.12;
  const at = d => {
    let i = 1;
    if (d <= 0) { const a = pts[0], b = pts[1], L = cum[1]; return [a[0] + (b[0] - a[0]) * d / L, a[1] + (b[1] - a[1]) * d / L]; }
    if (d >= total) { const m = pts.length - 1, a = pts[m - 1], b = pts[m], L = cum[m] - cum[m - 1], e = d - total; return [b[0] + (b[0] - a[0]) * e / L, b[1] + (b[1] - a[1]) * e / L]; }
    while (cum[i] < d) i++;
    const a = pts[i - 1], b = pts[i], f = (d - cum[i - 1]) / (cum[i] - cum[i - 1]);
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  };
  const k = st / 24, lift = st * 0.53 + s * 0.02;
  let out = '';
  for (let i = 0; i < n; i++) {
    const d = total / 2 + (i - (n - 1) / 2) * sp;
    const p = at(d), p1 = at(d - sp * 0.5), p2 = at(d + sp * 0.5);
    const tx = p2[0] - p1[0], ty = p2[1] - p1[1], len = Math.hypot(tx, ty) || 1;
    const ux = tx / len, uy = ty / len;
    const x = p[0] + uy * lift, y = p[1] - ux * lift, deg = Math.atan2(uy, ux) * 180 / Math.PI;
    out += `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg.toFixed(1)}) scale(${k.toFixed(4)}) translate(-12 -12)"><path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.5 5.6 21.1 7 14l-5.3-5 7.2-.9z" fill="#f5c518" stroke="#8a5f10" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  }
  return `<svg viewBox="0 0 ${s} ${h}" width="${s}" height="${h}" style="position:absolute;left:0;top:0;overflow:visible;pointer-events:none;z-index:2;filter:drop-shadow(0 1px 1px rgba(0,0,0,.6))">${out}</svg>`;
}
function crestHTML(t, size) {
  const base = crestBaseHTML(t, size), n = Math.min(5, cafStars(t)), sz = size || 22;
  if (!n || sz < 14) return base;
  const h = (t.badge !== 'bright' && !t.icon) ? Math.round(sz * 1.15) : sz;
  return `<span class="cstars" title="${cafStars(t)}x ${CAF_NAME} winners" style="position:relative;display:inline-block;flex:0 0 auto;line-height:0;vertical-align:middle">${base}${crestStarsSVG(t, sz, h, n)}</span>`;
}
function crestBaseHTML(t, size) {   const _S = Math.round((size || 22) * 1.5), _p = Math.max(1, Math.round(_S * 0.04));   const _plain = !t.icon && t.badge !== 'bright' && !CREST_IMGS[t.n + '|' + t.s];   const _in = Math.round((_S - 2 * _p) / (_plain ? 1.15 : 1));   return `<span class="cbx" style="display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;box-sizing:border-box;width:${_S}px;height:${_S}px;padding:${_p}px;background:#fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4);vertical-align:middle">${crestRawHTML(t, _in)}</span>`; } function crestRawHTML(t, size) {
  const s = size || 22;
  const _k = t.n + '|' + t.s, _ci = (window.CREST_EXTRA || {})[_k] || CREST_IMGS[_k];   if (_ci && t.badge !== 'bright' && !t.icon) {     return `<span class="crest img" style="width:${s}px;height:${s}px;border-radius:0;background-image:url('${_ci}')"></span>`;   }   if (t.badge === 'bright') {
    return `<span class="crest img" style="width:${s}px;height:${s}px;background-image:url('${IMG_BRIGHT}')"></span>`;
  }
  if (t.icon) return crestCustomHTML(t, s);
  const id = ++CREST_UID;
  const initials = t.s.replace(/[^A-Za-z ]/g, '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const dark = isDark(t.c1);
  const h = Math.round(s * 1.15);
  return `<span class="crest" style="width:${s}px;height:${h}px;border:none;border-radius:0;background:none">
    <svg viewBox="0 0 40 46" width="${s}" height="${h}">
      <defs><clipPath id="cb${id}"><path d="M20 1L38 7V22C38 33 30 41 20 45C10 41 2 33 2 22V7Z"/></clipPath></defs>
      <path d="M20 1L38 7V22C38 33 30 41 20 45C10 41 2 33 2 22V7Z" fill="${t.c1}"/>
      <g clip-path="url(#cb${id})"><rect x="0" y="27" width="40" height="20" fill="${t.c2}"/></g>
      <path d="M20 1L38 7V22C38 33 30 41 20 45C10 41 2 33 2 22V7Z" fill="none" stroke="${t.c2}" stroke-width="2"/>
      <text x="20" y="24" text-anchor="middle" font-family="Big Shoulders Display,Impact,Arial Narrow,sans-serif" font-weight="800" font-size="${initials.length > 2 ? 12 : 15}" fill="${dark ? '#fff' : '#111'}">${initials}</text>
    </svg>
  </span>`;
}

/* ---------------- kits ---------------- */
/* deterministic colour pair for a foreign club that has no explicit c1/c2 */
const CLUB_COLOR_PAIRS = [
  ['#d4af00', '#111111'], ['#0b7a3b', '#f9e300'], ['#8e1b2f', '#f2c200'], ['#1a1a1a', '#eeeeee'],
  ['#0f5fa8', '#f2f2f2'], ['#e5534b', '#2a0d0b'], ['#046a38', '#f6d327'], ['#123f8c', '#e8b21a'],
  ['#5aa9ff', '#08162b'], ['#ff8a00', '#231200'], ['#29c28b', '#07211a'], ['#b57cff', '#170b29']
];
function colorsForClub(name) {
  const str = name || '';
  let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const pair = CLUB_COLOR_PAIRS[h % CLUB_COLOR_PAIRS.length];
  return { c1: pair[0], c2: pair[1] };
}
const KIT_STYLE_OVERRIDE = {
  'Botshabelo United|Botshabelo': 1,
  'Graaff-Reinet City|Graaff-Reinet': 1,
  'Lephalale City|Lephalale': 1,
  'Sebokeng United|Sebokeng': 1,
  'Secunda United|Secunda': 1,
  "Sing About Me I'm Dying Of Thirst FC|SAMIDOT FC": 1,
  'Zola FC|Zola FC': 1,
  'Zwelitsha FC|Zwelitsha': 2,
  'FC Venda|Venda': 3,
  'Tembisa FC|Tembisa': 3,
  'Beaufort West FC|Beaufort West': 5,
  'Greytown United|Greytown': 6,
  'Mandela United|Mandela Utd': 6,
  'Giyani FC|Giyani FC': 7
};
function kitStyleOf(t) {
  const key = (t.n || '') + '|' + (t.s || '');
  if (KIT_STYLE_OVERRIDE.hasOwnProperty(key)) return KIT_STYLE_OVERRIDE[key];
  const str = t.id || t.s || '';
  let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 5;
}
function kitColors(t, away) { return away ? { body: t.a1 || t.c2, trim: t.a2 || t.c1 } : { body: t.c1, trim: t.c2 }; } function bigKitSVG(t, away, size) {
  const w = size || 200;
  const id = ++KIT_UID;
  const _kc = kitColors(t, away), body = _kc.body;
  const trim = _kc.trim;
  const clipId = 'kitClip' + id;
  const styleIdx = kitStyleOf(t);

  // More realistic football-shirt proportions: broad shoulders,
  // shaped sleeves, fitted torso and a gently curved hem.
  const shirt = `
    M73 32
    L48 40
    L29 49
    L8 88
    L35 103
    L49 79
    L49 199
    Q110 210 171 199
    L171 79
    L185 103
    L212 88
    L191 49
    L172 40
    L147 32
    Q110 52 73 32 Z`;

  let pattern = '';

  if (styleIdx === 1) {
    let lines = '';
    for (let x = 60; x < 170; x += 18) {
      lines += `<rect x="${x}" y="25" width="9" height="185"
        fill="${trim}" opacity=".92"/>`;
    }
    pattern = lines;
  } else if (styleIdx === 2) {
    let lines = '';
    for (let y = 64; y < 200; y += 28) {
      lines += `<rect x="0" y="${y}" width="220" height="12"
        fill="${trim}" opacity=".82"/>`;
    }
    pattern = lines;
  } else if (styleIdx === 3) {
    pattern = `
      <path d="M42 56 L81 56 L150 198 L111 205 Z"
        fill="${trim}" opacity=".9"/>
      <path d="M32 83 L43 64 L101 201 L83 204 Z"
        fill="#fff" opacity=".08"/>`;
  } else if (styleIdx === 4) {
    pattern = `
      <path d="M110 20 H230 V215 H110 Z"
        fill="${trim}" opacity=".88"/>`;
  } else if (styleIdx === 5) {
    let cells = '';
    const cs = 22;
    for (let y = 20, row = 0; y < 216; y += cs, row++) {
      for (let x = 0, col = 0; x < 220; x += cs, col++) {
        if ((row + col) % 2 === 0) cells += `<rect x="${x}" y="${y}" width="${cs}" height="${cs}" fill="${trim}" opacity=".85"/>`;
      }
    }
    pattern = cells;
  } else if (styleIdx === 6) {
    pattern = `
      <rect x="0" y="20" width="110" height="97" fill="${trim}" opacity=".88"/>
      <rect x="110" y="117" width="110" height="98" fill="${trim}" opacity=".88"/>`;
  } else if (styleIdx === 7) {
    let bands = '';
    for (let k = -1; k < 5; k++) {
      const xt = -10 + k * 46, xb = xt - 95;
      bands += `<path d="M${xt} 15 L${xt + 22} 15 L${xb + 22} 215 L${xb} 215 Z" fill="${trim}" opacity=".85"/>`;
    }
    pattern = bands;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg"
      width="${w}" height="${w}" viewBox="0 0 220 220"
      role="img" aria-label="${away ? 'Away' : 'Home'} football shirt">
    <defs>
      <linearGradient id="kitBody${id}" x1="0" y1="0" x2="1" y2=".4">
        <stop offset="0" stop-color="${shade(body, 24)}"/>
        <stop offset=".22" stop-color="${body}"/>
        <stop offset=".52" stop-color="${shade(body, 8)}"/>
        <stop offset=".78" stop-color="${body}"/>
        <stop offset="1" stop-color="${shade(body, -34)}"/>
      </linearGradient>

      <linearGradient id="kitTrim${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${shade(trim, 20)}"/>
        <stop offset=".5" stop-color="${trim}"/>
        <stop offset="1" stop-color="${shade(trim, -24)}"/>
      </linearGradient>

      <linearGradient id="kitLight${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
        <stop offset=".35" stop-color="#fff" stop-opacity=".035"/>
        <stop offset=".72" stop-color="#000" stop-opacity=".015"/>
        <stop offset="1" stop-color="#000" stop-opacity=".2"/>
      </linearGradient>

      <linearGradient id="kitFold${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity=".14"/>
        <stop offset=".15" stop-color="#fff" stop-opacity=".06"/>
        <stop offset=".5" stop-color="#000" stop-opacity=".035"/>
        <stop offset=".82" stop-color="#fff" stop-opacity=".055"/>
        <stop offset="1" stop-color="#000" stop-opacity=".13"/>
      </linearGradient>

      <clipPath id="${clipId}">
        <path d="${shirt}"/>
      </clipPath>
    </defs>

    <!-- Main shirt body -->
    <path d="${shirt}" fill="url(#kitBody${id})"
      stroke="rgba(0,0,0,.58)" stroke-width="1.5"
      stroke-linejoin="round"/>

    <g clip-path="url(#${clipId})">
      ${pattern}

      <!-- Natural fabric highlights and side shadows -->
      <rect x="0" y="25" width="220" height="190"
        fill="url(#kitLight${id})"/>
      <rect x="0" y="25" width="220" height="190"
        fill="url(#kitFold${id})"/>

      <!-- Subtle fabric folds -->
      <path d="M53 82 Q62 116 55 157 L60 196"
        fill="none" stroke="#fff" stroke-opacity=".09"
        stroke-width="2.5"/>
      <path d="M166 82 Q158 120 165 155 L160 196"
        fill="none" stroke="#000" stroke-opacity=".12"
        stroke-width="3"/>
      <path d="M78 53 Q110 61 142 53"
        fill="none" stroke="#fff" stroke-opacity=".1"
        stroke-width="1.5"/>

      <!-- Side seams -->
      <path d="M49 88 L49 198 M171 88 L171 198"
        fill="none" stroke="#000" stroke-opacity=".22"
        stroke-width="1.2"/>

      <!-- Sleeve trim -->
      <path d="M9 86 L35 99 L40 90 L16 76 Z"
        fill="url(#kitTrim${id})"/>
      <path d="M211 86 L185 99 L180 90 L204 76 Z"
        fill="url(#kitTrim${id})"/>

      <!-- Bottom hem -->
      <path d="M50 194 Q110 205 170 194 L171 201
        Q110 212 49 201 Z"
        fill="url(#kitTrim${id})"/>

      <path d="M53 199 Q110 208 167 199"
        fill="none" stroke="#fff" stroke-opacity=".24"
        stroke-width="1"/>
    </g>

    <!-- Ribbed collar -->
    <path d="M73 32 Q110 52 147 32
      L140 39 Q110 57 80 39 Z"
      fill="url(#kitTrim${id})"
      stroke="rgba(0,0,0,.28)" stroke-width=".8"/>

    <path d="M82 37 Q110 54 138 37"
      fill="none" stroke="#fff" stroke-opacity=".3"
      stroke-width="1"/>

    <!-- Shoulder seams -->
    <path d="M73 34 L48 43 M147 34 L172 43"
      fill="none" stroke="#fff" stroke-opacity=".22"
      stroke-width="1.2"/>

    <!-- Sleeve and torso seam details -->
    <path d="M35 99 L49 79 M185 99 L171 79"
      fill="none" stroke="#000" stroke-opacity=".3"
      stroke-width="1"/>

    <!-- Small inner-collar label -->
    <path d="M97 42 Q110 47 123 42 L120 48 Q110 51 100 48 Z"
      fill="#000" opacity=".2"/>
  </svg>`;
}

function kitSVG(t, away, size) {
  const s = size || 76, id = ++KIT_UID;
  const _kc = kitColors(t, away), body = _kc.body;
  const trim = _kc.trim;
  let stripes = '';
  for (let x = 13; x < 47; x += 4) stripes += `<rect x="${x}" y="13" width="1.8" height="42" fill="#000" opacity=".08"/>`;
  return `<svg width="${s}" height="${s}" viewBox="0 0 60 60" aria-hidden="true">
    <defs>
      <linearGradient id="kb${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${shade(body, 26)}"/><stop offset="45%" stop-color="${body}"/><stop offset="1" stop-color="${shade(body, -38)}"/>
      </linearGradient>
      <linearGradient id="kt${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${shade(trim, 22)}"/><stop offset="1" stop-color="${shade(trim, -24)}"/>
      </linearGradient>
    </defs>
    <path d="M20 9 L12 13 L6 24 L14 28 L14 55 Q30 58 46 55 L46 28 L54 24 L48 13 L40 9 Q30 15.5 20 9 Z" fill="url(#kb${id})" stroke="rgba(0,0,0,.45)" stroke-width=".9"/>
    ${stripes}
    <path d="M14 28 L14 55 Q22 56.6 30 57 L30 28 Z" fill="#fff" opacity=".07"/>
    <path d="M30 28 L30 57 Q38 56.6 46 55 L46 28 Z" fill="#000" opacity=".1"/>
    <path d="M20 9 Q30 17.4 40 9 L37.4 8 Q30 13.6 22.6 8 Z" fill="url(#kt${id})"/>
    <path d="M22 10.6 Q30 19 38 10.6 L38 13.2 Q30 21 22 13.2 Z" fill="url(#kt${id})"/>
    <path d="M6 24 L12 13 L16 11 L10.6 23 Z" fill="url(#kt${id})"/>
    <path d="M54 24 L48 13 L44 11 L49.4 23 Z" fill="url(#kt${id})"/>
    <rect x="14" y="51" width="32" height="4" fill="url(#kt${id})" opacity=".9"/>
    <path d="M20 9 L12 13 L6 24 L9 25.5 L14.6 13.9 Z" fill="#fff" opacity=".12"/>
  </svg>`;
}

/* ---------------- icon crests (for created/lower-league clubs) ---------------- */
const CREST_ICONS = {
  ball: '<circle cx="12" cy="12" r="7.2" fill="#fff"/><path d="M12 6.4 15.6 9v5l-3.6 2.6L8.4 14V9Z" fill="#111"/><path d="M12 4.9v2.6M4.9 12h2.6M19.1 12h-2.6M6.4 6.4l1.9 1.9M17.6 6.4l-1.9 1.9M6.4 17.6l1.9-1.9M17.6 17.6l-1.9-1.9" stroke="#111" stroke-width=".7"/>',
  lion: '<circle cx="12" cy="12" r="7" fill="none"/><path d="M12 6.5c1 0 1.9.5 2.4 1.3.9-.4 2 .1 2.1 1.2.1.8-.4 1.4-1 1.7.5.4.8 1 .7 1.7-.2 1.1-1.3 1.6-2.3 1.3-.2 1.2-1.2 2.1-2.4 2.3-1.2-.2-2.2-1.1-2.4-2.3-1 .3-2.1-.2-2.3-1.3-.1-.7.2-1.3.7-1.7-.6-.3-1.1-.9-1-1.7.1-1.1 1.2-1.6 2.1-1.2.5-.8 1.4-1.3 2.4-1.3Z" fill="#fff"/><circle cx="10.5" cy="12" r=".6" fill="#111"/><circle cx="13.5" cy="12" r=".6" fill="#111"/><path d="M12 12.6v1.1l-.8.6h1.6l-.8-.6Z" fill="#111"/>',
  star: '<path d="M12 5.4 13.8 10l4.8.2-3.8 3 1.4 4.6L12 15.1 7.8 17.8l1.4-4.6-3.8-3 4.8-.2Z" fill="#fff"/>',
  crown: '<path d="M5.5 15.5 5 9l3.2 2.4L12 6.8l3.8 4.6L19 9l-.5 6.5Z" fill="#fff"/><rect x="5.3" y="15.8" width="13.4" height="1.8" fill="#fff"/>',
  flame: '<path d="M12 5.2c.4 2 2.6 3 2.6 5.6 0 .9-.3 1.6-.7 2.2 1-.2 1.9-1.1 2-2.3.9 1.2 1.4 2.6 1.4 3.8 0 3-2.4 5.2-5.3 5.2s-5.3-2.2-5.3-5c0-2.4 1.4-3.7 2.6-5 .1 1 .5 1.7 1.1 2.1-.2-2.4.6-4.4 1.6-6.6Z" fill="#fff"/>',
  wave: '<path d="M4.5 10c1.3-1.2 2.7-1.2 4 0s2.7 1.2 4 0 2.7-1.2 4 0 2.7-1.2 4-0" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M4.5 14.2c1.3-1.2 2.7-1.2 4 0s2.7 1.2 4 0 2.7-1.2 4 0 2.7-1.2 4 0" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M4.5 18.4c1.3-1.2 2.7-1.2 4 0s2.7 1.2 4 0 2.7-1.2 4 0 2.7-1.2 4 0" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".6"/>',
  building: '<rect x="6" y="8" width="4.6" height="10.5" fill="#fff"/><rect x="11.4" y="4.8" width="4.6" height="13.7" fill="#fff" opacity=".92"/><rect x="16.6" y="10.5" width="3.6" height="8" fill="#fff" opacity=".85"/>' +
    [7,8.6,7,8.6,12.2,13.8,12.2,13.8,17.4,18.6].map((x,i)=>`<rect x="${x}" y="${9.6+ (i%4)*2.2}" width="1" height="1" fill="#111"/>`).join(''),
  flower: [0,60,120,180,240,300].map(a=>`<ellipse cx="12" cy="8.4" rx="1.9" ry="3.1" fill="#fff" transform="rotate(${a} 12 12)"/>`).join('') + '<circle cx="12" cy="12" r="1.6" fill="#111"/>',
  eagle: '<path d="M12 6.5c2.6 1 4.6 1 7-.4-1 2-2.6 3.2-4.4 3.6l1.8 6.8-2.4-1.6-2 1.6-2.4-1.6-2.4 1.6 1.8-6.8C7.6 9.3 6 8.1 5 6.1c2.4 1.4 4.4 1.4 7 .4Z" fill="#fff"/>',
  shield: '<path d="M12 5.6 17 7.4v4.2c0 3.4-2.1 6-5 7-2.9-1-5-3.6-5-7V7.4Z" fill="#fff"/>',
  antelope: '<path d="M8 9c-1.5-2-1-4 .5-5M16 9c1.5-2 1-4-.5-5M9 9c0 2 1.3 3 3 3s3-1 3-3" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/><circle cx="12" cy="13" r="3.4" fill="#fff"/>',
  mountain: '<path d="M3 17 8.5 8l3 4.5L14.5 7 21 17Z" fill="#fff"/>',
  sun: '<circle cx="12" cy="12" r="4" fill="#fff"/><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M5.6 18.4l1.7-1.7M16.7 7.3l1.7-1.7" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>',
  drum: '<path d="M8 6h8l-1.4 12H9.4Z" fill="#fff"/><ellipse cx="12" cy="6" rx="4" ry="1.6" fill="#fff"/>',
  paw: '<circle cx="12" cy="14.5" r="3.4" fill="#fff"/><circle cx="7.3" cy="10.2" r="1.7" fill="#fff"/><circle cx="16.7" cy="10.2" r="1.7" fill="#fff"/><circle cx="9.3" cy="6.8" r="1.4" fill="#fff"/><circle cx="14.7" cy="6.8" r="1.4" fill="#fff"/>',
  bolt: '<path d="M13 2 5 13h5l-1 9 8-12h-5Z" fill="#fff"/>'
};
function crestShapeClip(shape) {
  if (shape === 'circle') return `<circle cx="12" cy="12" r="11.2"/>`;
  if (shape === 'diamond') return `<path d="M12 1 22.5 12 12 23 1.5 12Z"/>`;
  if (shape === 'hexagon') return `<path d="M12 1 21 6.5V17.5L12 23 3 17.5V6.5Z"/>`;
  if (shape === 'pentagon') return `<path d="M12 1 22.5 8.8 18.5 21.5H5.5L1.5 8.8Z"/>`;
  if (shape === 'roundsquare') return `<rect x="1.5" y="1.5" width="21" height="21" rx="6"/>`;
  return `<path d="M12 1.4 21.6 4.6V12c0 5.6-3.9 9.7-9.6 11.6C6.3 21.7 2.4 17.6 2.4 12V4.6Z"/>`;
}
function crestShapeOutline(shape) {
  if (shape === 'circle') return `<circle cx="12" cy="12" r="11.2" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`;
  if (shape === 'diamond') return `<path d="M12 1 22.5 12 12 23 1.5 12Z" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`;
  if (shape === 'hexagon') return `<path d="M12 1 21 6.5V17.5L12 23 3 17.5V6.5Z" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`;
  if (shape === 'pentagon') return `<path d="M12 1 22.5 8.8 18.5 21.5H5.5L1.5 8.8Z" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`;
  if (shape === 'roundsquare') return `<rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`;
  return `<path d="M12 1.4 21.6 4.6V12c0 5.6-3.9 9.7-9.6 11.6C6.3 21.7 2.4 17.6 2.4 12V4.6Z" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`;
}
let CREST_UID = 0;
function crestCustomHTML(t, size) {
  const s = size || 22, id = ++CREST_UID;
  const shape = t.shape || 'shield';
  const icon = CREST_ICONS[t.icon] || CREST_ICONS.ball;
  const dark = isDark(t.c1);
  const initials = (t.s || t.n || '?').replace(/[^A-Za-z ]/g, '').split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  return `<span style="display:inline-block;width:${s}px;height:${s}px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">
    <svg viewBox="0 0 24 24" width="${s}" height="${s}">
      <defs>
        <linearGradient id="cg${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${shade(t.c1, 26)}"/><stop offset="55%" stop-color="${t.c1}"/><stop offset="1" stop-color="${shade(t.c1, -30)}"/>
        </linearGradient>
        <clipPath id="cc${id}">${crestShapeClip(shape)}</clipPath>
      </defs>
      <g clip-path="url(#cc${id})">
        <rect width="24" height="24" fill="url(#cg${id})"/>
        <rect y="15.5" width="24" height="8.5" fill="${t.c2}"/>
        <g opacity=".95">${icon}</g>
        <text x="12" y="21.3" font-family="Saira Condensed, sans-serif" font-size="4.6" font-weight="700"
          text-anchor="middle" fill="${isDark(t.c2) ? '#fff' : '#111'}">${svgEscA(initials)}</text>
        ${crestShapeOutline(shape)}
      </g>
    </svg></span>`;
}
function svgEscA(s) { return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

/* ============================================================
   Mzansi Manager 2026 — interface
   ============================================================ */
const SAVE_PREFIX = 'mzansi_manager_2026_slot_';
const SLOTNAME_PREFIX = 'mzansi_manager_2026_slotname_';
const SLOT_COUNT = 3; (function cleanupOldSlots() {   try {     localStorage.removeItem(SAVE_PREFIX + '4'); localStorage.removeItem(SAVE_PREFIX + '5');     localStorage.removeItem(SLOTNAME_PREFIX + '4'); localStorage.removeItem(SLOTNAME_PREFIX + '5');   } catch (e) { } })();
const LAST_SLOT_KEY = 'mzansi_manager_2026_last';
const BACKUP_KEY = 'mzansi_manager_2026_lastgood';
let slot = 1; let leavingApp = false;
let G = null, tab = 'match';
let pickTier = 2, pickClub = null, pickAvatar = 'mgr-01';
let squadQ = '', squadGrp = 'ALL', squadFlag = 'ALL', squadSort = 'rating', txFilter = 'ALL', txSearch = '', tableTier = 0, tableSeason = 'current', fxRound = 0, statTier = 0, newsFilter = 'ALL';
let selSpot = null;
let navStack = ['match'], navIdx = 0, navSkip = false;

const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const me = () => G.teams[G.myTeam];
function mgrAgeOn(dob, iso) {   if (!dob) return null;   const [by, bm, bd] = dob.split('-').map(Number), [y, m, d] = iso.split('-').map(Number);   let a = y - by; if (m < bm || (m === bm && d < bd)) a--; return a; } let _bdayTimer = null; function checkManagerBirthday() {   if (!G || !G.manager || !G.manager.dob) return;   const now = currentDateISO(), dob = G.manager.dob;   const last = G.bdayChecked || now; G.bdayChecked = now;   if (last < now) {     for (let y = +last.slice(0, 4); y <= +now.slice(0, 4); y++) {       let md = dob.slice(5, 10); const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;       if (md === '02-29' && !leap) md = '03-01';       const iso = y + '-' + md, age = y - +dob.slice(0, 4);       if (iso > last && iso <= now && age > 0) {         G.bdayPending = { age, iso, year: y };         const t = G.teams[G.myTeam], who = ['Mom', 'Dad', 'Your Brother', 'Your Sister', 'An Old Friend', 'Your Cousin'];         mail(G, { key: 'bday_' + y, cat: 'personal', from: pick(who), subject: `Happy ${ordinal(age)} birthday!`, flag: true,           body: [`Happy ${ordinal(age)} birthday, ${G.manager.name}! 🎂`, `Hope ${t ? t.n : 'life'} ${t ? 'are' : 'is'} treating you well. We've sent something in the post, so keep an eye out. Have a great one.`] });       }     }   }   if (G.bdayPending && !_bdayTimer) _bdayTimer = setTimeout(showBirthdayPopup, 1200); } function showBirthdayPopup() {   _bdayTimer = null;   if (!G || !G.bdayPending) return;   if (liveState || modalLock || !$('#scrim').hidden) { _bdayTimer = setTimeout(showBirthdayPopup, 3000); return; }   const b = G.bdayPending, m = G.manager, t = G.teams[G.myTeam], jl = !!G.jobless;   const club = jl ? 'your friends' : t.n;   const lines = b.age % 10 === 0     ? [`A new decade, and still the sharpest mind in the dugout.`, `${b.age} years young. The squad insists the grey hairs are tactical genius.`]     : [`The squad at ${club} have signed a card. Someone also hid the training cones as a prank.`, `Rumour has it ${jl ? 'there is a cake waiting at home' : 'the kit man has baked a cake, and it is mostly icing'}.`, `Another year older, another year wiser. Hopefully the touchline suit still fits.`, `Somewhere, a chairman is pretending to remember it was your birthday.`, `The fans sang for you at the weekend. Well, they sang. Close enough.`];   const line = lines[b.age % lines.length];   const bits = Array.from({ length: 26 }, (_, i) => `<i class="bdc" style="left:${(i * 37) % 100}%;animation-delay:${((i * 53) % 18) / 10}s;animation-duration:${3 + (i % 5) * 0.6}s">${['🎉', '🎈', '✨', '🎊', '⚽'][i % 5]}</i>`).join('');   const body = `<style>.bdWrap{position:relative;text-align:center;padding:18px 8px 6px;overflow:hidden}.bdc{position:absolute;top:-24px;font-style:normal;font-size:18px;animation:bdFall linear infinite;opacity:.9}@keyframes bdFall{to{transform:translateY(330px) rotate(300deg);opacity:0}}.bdCake{font-size:64px;animation:bdPop .7s cubic-bezier(.2,1.4,.4,1)}@keyframes bdPop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}.bdAge{font-family:var(--head);font-size:54px;color:#f2b928;line-height:1}</style>     <div class="bdWrap">${bits}<div class="bdCake">🎂</div><div style="color:var(--dim);margin-top:6px">Today is your birthday</div><div class="bdAge">${ordinal(b.age)}</div>     <h3 style="margin:8px 0 10px">Happy birthday, ${esc(m.name)}!</h3><p style="margin:0 auto;max-width:440px;color:var(--dim)">${line}</p></div>`;   openLockedModal('Happy Birthday 🎉', body, `<button class="btn sm" id="bdThanks">Thank you!</button>`);   try { seasonSting('promo'); } catch (e) { }   $('#bdThanks').onclick = () => modalSwap(() => { G.bdayPending = null; save(); render(); }); } function ordinal(n) { const s = ['th','st','nd','rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
function ratingClass(r) { return r >= 82 ? 'r-elite' : r >= 75 ? 'r-good' : r >= 68 ? 'r-ok' : r >= 60 ? 'r-mid' : 'r-low'; }
function ratingTag(r) { return `<span class="rating ${ratingClass(r)}">${r}</span>`; }
function posTag(pos) { return `<span class="tag ${POS_GROUP[pos].toLowerCase() === 'att' ? 'att' : POS_GROUP[pos].toLowerCase()}">${pos}</span>`; }
function formHtml(f) { return '<span class="form">' + f.slice(-5).map(x => `<i class="${x}">${x}</i>`).join('') + '</span>'; }
function growthHtml(p) {
  const d = p.rating - (p.startRating || p.rating);
  if (d > 0) return `<span class="growth up">+${d}</span>`;
  if (d < 0) return `<span class="growth down">${d}</span>`;
  return `<span class="growth flat">–</span>`;
}
/* Potential is shown as a range. Your own players are known better, so their range is narrower. */ function potRange(p) {   if (p.potLo != null && p.potHi != null) return [p.potLo, p.potHi];   const scL = G && G.scouting && G.scouting.known ? (G.scouting.known[p.id] || 0) : 0;   if (scL) { const ws = [3, 2, 1, 1, 0][Math.min(5, scL) - 1]; if (p.rating >= p.pot) return [p.pot, p.pot]; const k = Math.floor(hashS(p.id + '_scp') * (ws + 1)); const lo = Math.max(p.rating, p.pot - k); let hi = Math.min(99, lo + ws); if (hi < p.pot) hi = p.pot; return [lo, hi]; }   const my = G && G.teams && G.teams[G.myTeam];   const known = !!(my && (my.squad.some(x => x.id === p.id) || (my.youth || []).some(x => x.id === p.id) || (my.dev && ['u11', 'u13', 'u15', 'grad'].some(k => my.dev[k].some(x => x.id === p.id)))));   const base = p.age <= 19 ? 6 : p.age <= 21 ? 5 : p.age <= 23 ? 4 : p.age <= 26 ? 3 : 2;   const w = known ? Math.max(2, base - 2) : base;   if (p.rating >= p.pot) return [p.pot, p.pot];   const k = Math.floor(hashS(p.id + '_potr') * (w + 1));   const lo = Math.max(p.rating, p.pot - k);   let hi = Math.min(99, lo + w);   if (hi < p.pot) hi = p.pot;   return [lo, hi]; } function potTxt(p) { const r = potRange(p); return r[0] === r[1] ? '' + r[0] : r[0] + '-' + r[1]; } function potMid(p) { const r = potRange(p); return (r[0] + r[1]) / 2; } function potTag(p) { return `<span class="rating pot">${potTxt(p)}</span>`; }
function potGrowthHtml(p) {
  const d = p.pot - (p.startPot != null ? p.startPot : p.pot);
  if (d > 0) return `<span class="growth up">+${d}</span>`;
  if (d < 0) return `<span class="growth down">${d}</span>`;
  return `<span class="growth flat">–</span>`;
}

/* ---------------- sound ---------------- */
let audioCtx = null, soundOn = true, musicOn = true, musicVol = 1, sfxVol = 1, crowdVol = 1, musicKeep = false; try { const _ap = JSON.parse(localStorage.getItem('mm_audio') || 'null'); if (_ap) { soundOn = _ap.sfx !== false; musicOn = _ap.music !== false; if (_ap.mv != null) musicVol = _ap.mv; if (_ap.sv != null) sfxVol = _ap.sv; if (_ap.cv != null) crowdVol = _ap.cv; if (_ap.kp != null) musicKeep = !!_ap.kp; } } catch (e) { } function saveAudioPrefs() { try { localStorage.setItem('mm_audio', JSON.stringify({ sfx: soundOn, music: musicOn, mv: musicVol, sv: sfxVol, cv: crowdVol, kp: musicKeep })); } catch (e) { } }
function ac() {
  if (!soundOn || document.hidden) return null;
  try { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; } catch (e) { return null; }
}
function tone(ctx, freq, t0, dur, type, gain) {   if (sfxVol <= 0) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + t0);
  g.gain.linearRampToValueAtTime((gain || 0.12) * sfxVol, ctx.currentTime + t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t0 + dur);
  o.connect(g); g.connect(ctx.destination);
  o.start(ctx.currentTime + t0); o.stop(ctx.currentTime + t0 + dur + 0.02);
}
function pTone(ctx, f, t0, dur, vol, type) {
  if (sfxVol <= 0) return;
  const t = ctx.currentTime + t0;
  const o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
  o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
  lp.type = 'lowpass'; lp.frequency.value = 5200; lp.Q.value = 0.5;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol * sfxVol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(lp); lp.connect(g); g.connect(ctx.destination);
  o.start(t); o.stop(t + dur + 0.03);
}
function pBell(ctx, f, t0, dur, vol) {
  pTone(ctx, f, t0, dur, vol, 'sine');
  pTone(ctx, f * 2, t0, dur * 0.6, vol * 0.28, 'sine');
  pTone(ctx, f * 3.01, t0, dur * 0.35, vol * 0.1, 'sine');
}
const _snd = { ui: 0, money: 0 };
function uiSound(name) {
  const ctx = ac(); if (!ctx) return;
  try {
    if (ctx.state === 'suspended') ctx.resume();
    const now = performance.now();
    if (name === 'tap' || name === 'open') {
      if (now - _snd.ui < 140) return;
      if (name === 'open' && now - _snd.money < 700) return;
      _snd.ui = now;
    } else {
      if (_snd[name] && now - _snd[name] < 250) return;
      _snd[name] = now;
    }
    if (name === 'moneyIn' || name === 'moneyOut') _snd.money = now;
    if (name === 'success' && now - _snd.money < 2600) return;
    if (name === 'tap') { pBell(ctx, 1320, 0, .09, .055); }
    else if (name === 'open') { pBell(ctx, 660, 0, .22, .05); pBell(ctx, 990, .07, .26, .045); }
    else if (name === 'moneyIn') { pBell(ctx, 1046.5, 0, .35, .09); pBell(ctx, 1318.5, .08, .35, .09); pBell(ctx, 1568, .16, .5, .09); pBell(ctx, 2093, .24, .6, .06); }
    else if (name === 'moneyOut') { pBell(ctx, 784, 0, .3, .08); pBell(ctx, 587.3, .1, .4, .08); pBell(ctx, 392, .2, .5, .06); }
    else if (name === 'success') { pBell(ctx, 880, 0, .3, .08); pBell(ctx, 1318.5, .09, .45, .07); }
    else if (name === 'warn') { pTone(ctx, 330, 0, .16, .09, 'triangle'); pTone(ctx, 262, .12, .22, .09, 'triangle'); }
    else if (name === 'big') { pBell(ctx, 523.25, 0, .35, .08); pBell(ctx, 659.25, .1, .35, .08); pBell(ctx, 783.99, .2, .4, .08); pBell(ctx, 1046.5, .3, .8, .08); }
    else if (name === 'whistle2') { tone(ctx, 2000, 0, .14, 'square', .045); tone(ctx, 2000, .2, .14, 'square', .045); tone(ctx, 2000, .4, .5, 'square', .045); }
  } catch (e) { }
}
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('button, .navlink, .chip, .btn, .prow, tr[data-pid], .club, .avbtn, [role="button"]');
  if (!b || b.disabled) return;
  uiSound('tap');
});
const _gb = {}, _gFade = { 'goal.mp3': 1.4, 'goal2.mp3': 2.6 }; function loadGoalBuf(f) {   const ctx = ac(); if (!ctx || _gb[f]) return; _gb[f] = 1;   fetch(f).then(r => r.arrayBuffer()).then(b => new Promise((ok, no) => ctx.decodeAudioData(b, ok, no))).then(buf => { _gb[f] = buf; }).catch(() => { delete _gb[f]; }); } document.addEventListener('click', () => { try { ['goal.mp3', 'goal2.mp3'].forEach(loadGoalBuf); } catch (e) { } }, { once: true }); function playGoalClip() {   if (sfxVol <= 0) return true;   const f = Math.random() < 0.2 ? 'goal2.mp3' : 'goal.mp3', ctx = ac(), vol = 0.35 * sfxVol;   try {     if (ctx && _gb[f] && _gb[f].duration) {       if (ctx.state === 'suspended') ctx.resume();       const s = ctx.createBufferSource(), g = ctx.createGain(), t = ctx.currentTime, d = _gb[f].duration, fo = _gFade[f];       s.buffer = _gb[f];       g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.06);       g.gain.setValueAtTime(vol, t + d - fo); g.gain.linearRampToValueAtTime(0.0001, t + d);       s.connect(g); g.connect(ctx.destination); s.start(t);       return true;     }     loadGoalBuf(f);     const a = new Audio(f); a.volume = Math.min(1, vol);     a.addEventListener('timeupdate', () => { const left = a.duration - a.currentTime; if (isFinite(left) && left < _gFade[f]) a.volume = Math.max(0, Math.min(1, vol) * left / _gFade[f]); });     const p = a.play(); if (p && p.catch) p.catch(() => { });     return true;   } catch (e) { return false; } } function playSound(name) {
  const ctx = ac(); if (!ctx) return;
  try {
    if (name === 'goal') { playGoalClip(); }
    else if (name === 'whistle') { tone(ctx, 1800, 0, .18, 'square', .07); tone(ctx, 1800, .22, .18, 'square', .07); }
    else if (name === 'click') { uiSound('tap'); }
    else if (name === 'coin') { uiSound('moneyIn'); }
    else if (name === 'card') { tone(ctx, 220, 0, .18, 'sawtooth', .06); }
  } catch (e) { }
}
const MUSIC_TRACKS = ['menu.mp3', 'menu2.mp3', 'menu3.mp3', 'menu4.mp3', 'menu5.mp3', 'menu6.mp3', 'menu7.mp3', 'menu8.mp3', 'menu9.mp3', 'menu10.mp3', 'menu11.mp3', 'menu12.mp3', 'menu13.mp3', 'menu14.mp3', 'menu15.mp3', 'menu16.mp3', 'menu17.mp3', 'menu18.mp3', 'menu19.mp3', 'menu20.mp3', 'menu21.mp3', 'menu22.mp3', 'menu23.mp3', 'menu24.mp3', 'menu25.mp3', 'menu26.mp3', 'menu27.mp3', 'menu28.mp3', 'menu29.mp3', 'menu30.mp3', 'menu31.mp3', 'menu32.mp3'];
let bgMusic = null, musicQueue = [], musicLast = null, musicFails = 0;
function nextMusicTrack() {
  if (!musicQueue.length) {
    musicQueue = MUSIC_TRACKS.slice();
    for (let i = musicQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [musicQueue[i], musicQueue[j]] = [musicQueue[j], musicQueue[i]];
    }
    if (musicQueue.length > 1 && musicQueue[0] === musicLast) musicQueue.push(musicQueue.shift());
  }
  if (musicLast) { musicHist.push(musicLast); if (musicHist.length > 30) musicHist.shift(); }
  musicLast = musicQueue.shift();
  return musicLast;
}
function startBgMusic() {
  if (bgMusic || !musicOn) return;
  try {
    bgMusic = new Audio(nextMusicTrack());
    bgMusic.volume = 0.25 * musicVol;
    const playNext = () => {
      bgMusic.src = musicSrc(nextMusicTrack()); musicPrefetch(musicQueue[0]);
      bgMusic.play().catch(() => { });
    };
    bgMusic.addEventListener('ended', playNext);
    bgMusic.addEventListener('playing', () => { musicFails = 0; musicPrefetch(musicQueue[0]); musicPrefetch(musicQueue[1]); });
    bgMusic.addEventListener('error', () => { if (++musicFails < MUSIC_TRACKS.length) playNext(); });
    bgMusic.play().catch(() => { });
  } catch (e) { }
}
document.addEventListener('click', function initBgMusicOnce() {
  startBgMusic();
  document.removeEventListener('click', initBgMusicOnce);
}, { once: true });

let _crowdA = null; function killCrowdClip() {   const c = _crowdA; _crowdA = null; if (!c) return;   try { c.a.pause(); c.a.removeAttribute('src'); c.a.load(); } catch (e) { }   try { c.src.disconnect(); } catch (e) { } } function fadeOutCrowd() {   const c = _crowdA; if (!c) return;   try { const ctx = audioCtx, now = ctx.currentTime; c.g.gain.cancelScheduledValues(now); c.g.gain.setValueAtTime(c.g.gain.value, now); c.g.gain.linearRampToValueAtTime(0.0001, now + 2.5); setTimeout(() => { if (_crowdA === c) killCrowdClip(); }, 2700); } catch (e) { killCrowdClip(); } } setInterval(() => { if (_crowdA && !liveState) killCrowdClip(); }, 1000); function startCrowdClip() {   killCrowdClip();   try { ['goal.mp3', 'goal2.mp3'].forEach(loadGoalBuf); } catch (e) { }   const ctx = ac(); if (!ctx || !liveState) return false;   try {     const a = new Audio('crowd.mp3'); a.loop = true; a.preload = 'auto';     a.addEventListener('loadedmetadata', () => { try { a.currentTime = Math.random() * Math.max(0, a.duration - 30); } catch (e) { } });     const src = ctx.createMediaElementSource(a);     const g = ctx.createGain(); g.gain.value = 0.028;     const k = ctx.createGain(); k.gain.value = 6;     const cm = ctx.createGain(); cm.gain.value = crowdVol;     src.connect(g); g.connect(k); k.connect(cm); cm.connect(ctx.destination);     a.play().catch(() => { });     _crowdA = { a, src, g };     liveState.crowd = { src: { stop() { killCrowdClip(); } }, g, cm, clip: true };     return true;   } catch (e) { return false; } } function startCrowd() {   if (startCrowdClip()) return;
  const ctx = ac(); if (!ctx || !liveState) return;
  try {
    const dur = 4, n = dur * ctx.sampleRate;
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    const fade = Math.round(ctx.sampleRate * 0.25);
    for (let i = 0; i < n; i++) {
      let v = Math.random() * 2 - 1;
      if (i < fade) v *= i / fade;
      else if (i > n - fade) v *= (n - i) / fade;
      d[i] = v;
    }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 160;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1100; lp.Q.value = 0.4;
    const g = ctx.createGain(); g.gain.value = 0.028;
    const cm = ctx.createGain(); cm.gain.value = crowdVol;     src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(cm); cm.connect(ctx.destination);
    src.start();
    liveState.crowd = { src, g, cm };
  } catch (e) { }
}
function stopCrowd() {   killCrowdClip();
  if (liveState && liveState.crowd) {
    try { liveState.crowd.src.stop(); } catch (e) { }
    liveState.crowd = null;
  }
}
                                                        function crowdHush() {
  const ctx = ac(); if (!ctx || !liveState) return;
  try {
    tone(ctx, 196, 0, .35, 'triangle', .05);
    tone(ctx, 147, .18, .5, 'triangle', .05);
    if (!liveState.crowd) return;
    const g = liveState.crowd.g, now = ctx.currentTime;
    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(g.gain.value, now);
    g.gain.linearRampToValueAtTime(0.004, now + 0.35);
    g.gain.linearRampToValueAtTime(0.004, now + 1.6);
    g.gain.linearRampToValueAtTime(liveState.crowdBase || 0.028, now + 3.6);     liveState.crowdBusyUntil = performance.now() + 3800;
  } catch (e) { }
}     
  function crowdMood() {
  const ls = liveState, ctx = ac(); if (!ctx || !ls || !ls.crowd) return;
  if (ls.crowdBusyUntil && performance.now() < ls.crowdBusyUntil) return;
  const m = ls.minute;
  const goals = ls.ctx.ev.filter(e => e.type === 'goal' && e.min <= m);
  const diff = Math.abs(goals.filter(e => e.side === 'h').length - goals.filter(e => e.side === 'a').length);
  let base = 0.026 + Math.min(m, 90) / 90 * 0.014;
  if (m >= 75 && diff <= 1) base += 0.016;
  ls.crowdBase = base;
  ls.crowd.g.gain.setTargetAtTime(base, ctx.currentTime, 2.5);
}
  let _evSndT = 0;
function evSound(type) {
  const ctx = ac(); if (!ctx) return;
  const now = performance.now();
  if (now - _evSndT < 350) return;
  _evSndT = now;
  try {
    if (type === 'card') { tone(ctx, 1900, 0, .1, 'sine', .04); tone(ctx, 1900, .14, .1, 'sine', .04); tone(ctx, 140, .02, .2, 'triangle', .05); }
    else if (type === 'injury') { tone(ctx, 262, 0, .3, 'sine', .05); tone(ctx, 220, .2, .4, 'sine', .045); }
    else if (type === 'sub') { tone(ctx, 1046, 0, .08, 'sine', .035); tone(ctx, 1318, .08, .1, 'sine', .03); }
  } catch (e) { }
}
function fullTimeSting(my, opp) {
  const ctx = ac(); if (!ctx) return;
  try {
    if (my > opp) {
      tone(ctx, 523, 0, .3, 'sine', .06); tone(ctx, 659, .12, .3, 'sine', .06);
      tone(ctx, 784, .24, .35, 'sine', .06); tone(ctx, 1046, .38, .9, 'sine', .06);
      tone(ctx, 130, .38, .9, 'triangle', .035);
    } else if (my < opp) {
      tone(ctx, 440, 0, .35, 'triangle', .05); tone(ctx, 349, .2, .35, 'triangle', .05);
      tone(ctx, 293, .4, .8, 'triangle', .05);
    } else {
      tone(ctx, 587, 0, .3, 'sine', .045); tone(ctx, 440, .18, .6, 'sine', .045);
    }
  } catch (e) { }
}
     function bidPing() {
  const ctx = ac(); if (!ctx) return;
  try {
    tone(ctx, 1175, 0, .25, 'sine', .05);
    tone(ctx, 1568, .13, .45, 'sine', .05);
    tone(ctx, 2350, .13, .25, 'sine', .014);
  } catch (e) { }
} 
  function dealStamp() {
  const ctx = ac(); if (!ctx) return;
  try {
    tone(ctx, 110, 0, .16, 'triangle', .09);
    tone(ctx, 1500, .005, .05, 'sine', .03);
    tone(ctx, 90, .02, .2, 'sine', .06);
  } catch (e) { }
}
['buyPlayer', 'sellPlayer', 'signFreeAgent'].forEach(name => {
  const orig = window[name];
  if (typeof orig !== 'function') return;
  window[name] = function () {
    const r = orig.apply(this, arguments);
    if (r && r.ok) dealStamp();
    return r;
  };
});
     let _winTickKey = '';
function windowTickCheck(winOpen) {
  try {
    if (!winOpen || windowCloses(G) !== 1) return;
    const key = G.season + ':' + currentDateISO();
    if (key === _winTickKey) return;
    _winTickKey = key;
    const ctx = ac(); if (!ctx) return;
    tone(ctx, 1400, 0, .04, 'sine', .05);
    tone(ctx, 1050, .45, .04, 'sine', .05);
    tone(ctx, 1400, .9, .04, 'sine', .05);
  } catch (e) { }
}  
  function seasonSting(kind) {
  const ctx = ac(); if (!ctx || !kind) return;
  try {
    if (kind === 'trophy') {
      tone(ctx, 523, 0, .4, 'sine', .06); tone(ctx, 659, .14, .4, 'sine', .06);
      tone(ctx, 784, .28, .4, 'sine', .06); tone(ctx, 1046, .42, .5, 'sine', .06);
      tone(ctx, 523, .62, 1.5, 'sine', .05); tone(ctx, 659, .62, 1.5, 'sine', .05);
      tone(ctx, 784, .62, 1.5, 'sine', .05); tone(ctx, 1318, .62, 1.5, 'sine', .035);
      tone(ctx, 131, .62, 1.5, 'triangle', .04);
    } else if (kind === 'promo') {
      tone(ctx, 523, 0, .3, 'sine', .055); tone(ctx, 659, .15, .3, 'sine', .055);
      tone(ctx, 784, .3, .9, 'sine', .055); tone(ctx, 1046, .3, .9, 'sine', .03);
    } else if (kind === 'down') {
      tone(ctx, 330, 0, .6, 'triangle', .05); tone(ctx, 294, .45, .6, 'triangle', .05);
      tone(ctx, 247, .9, 1.2, 'triangle', .05); tone(ctx, 123, .9, 1.2, 'sine', .035);
    }
  } catch (e) { }
}
  function newSeasonSwell() {
  const ctx = ac(); if (!ctx) return;
  try {
    tone(ctx, 262, 0, .9, 'sine', .04);
    tone(ctx, 330, .2, .9, 'sine', .04);
    tone(ctx, 392, .4, .9, 'sine', .045);
    tone(ctx, 523, .6, 1.4, 'sine', .05);
    tone(ctx, 131, .6, 1.4, 'triangle', .03);
  } catch (e) { }
}
  function breakoutNote() {
  const ctx = ac(); if (!ctx) return;
  try {
    tone(ctx, 1568, 0, .25, 'sine', .05);
    tone(ctx, 2093, .1, .35, 'sine', .05);
    tone(ctx, 2637, .2, .6, 'sine', .04);
  } catch (e) { }
}
  function matchdayChime() {
  const ctx = ac(); if (!ctx) return;
  try {
    tone(ctx, 659, 0, .35, 'sine', .05);
    tone(ctx, 880, .17, .55, 'sine', .05);
    tone(ctx, 1760, .17, .3, 'sine', .012);
  } catch (e) { }
}
  let _musicFadeT = null;
function musicFade(target, ms) {
  if (!bgMusic) return;
  clearInterval(_musicFadeT);
  const from = bgMusic.volume, steps = Math.max(1, Math.round((ms || 1000) / 50));
  let i = 0;
  _musicFadeT = setInterval(() => {
    i++;
    try { bgMusic.volume = Math.max(0, Math.min(1, from + (target - from) * (i / steps))); } catch (e) { }
    if (i >= steps) clearInterval(_musicFadeT);
  }, 50);
}
  let _musicWasPlaying = false;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (!musicKeep && bgMusic && !bgMusic.paused) { bgMusic.pause(); _musicWasPlaying = true; }
    try { if (audioCtx && audioCtx.state === 'running') audioCtx.suspend(); } catch (e) { }
  } else {
    if (_musicWasPlaying && musicOn && bgMusic) bgMusic.play().catch(() => { });
    _musicWasPlaying = false;
    try { if (audioCtx) audioCtx.resume(); } catch (e) { }
  }
});
      let _tickT = 0;
document.addEventListener('input', e => {
  const r = e.target;
  if (!r || r.type !== 'range') return;
  const now = performance.now();
  if (now - _tickT < 55) return;
  _tickT = now;
  const ctx = ac(); if (!ctx) return;
  const min = +r.min || 0, max = +r.max || 100, f = max > min ? (r.value - min) / (max - min) : 0;
  try { tone(ctx, 600 + f * 700, 0, .035, 'sine', .035); } catch (e2) { }
});
document.addEventListener('change', e => {
  const c = e.target;
  if (!c || c.type !== 'checkbox') return;
  const ctx = ac(); if (!ctx) return;
  try {
    if (c.checked) { tone(ctx, 700, 0, .05, 'sine', .04); tone(ctx, 1050, .05, .07, 'sine', .04); }
    else { tone(ctx, 1050, 0, .05, 'sine', .04); tone(ctx, 700, .05, .07, 'sine', .04); }
  } catch (e2) { }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
function crowdRoar() {
  const ctx = ac(); if (!ctx || !liveState || !liveState.crowd) return;
  const g = liveState.crowd.g, now = ctx.currentTime;
  g.gain.cancelScheduledValues(now);
  g.gain.setValueAtTime(g.gain.value, now);
  g.gain.linearRampToValueAtTime(liveState.crowd.clip ? 0.17 : 0.32, now + 0.12);
   g.gain.linearRampToValueAtTime(liveState.crowdBase || 0.028, now + 2.6);   liveState.crowdBusyUntil = performance.now() + 2800;
}
let goalVoice = null;
function pickGoalVoice() {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => /male|david|daniel|alex|fred|mark|george|james|guy|ryan/i.test(v.name) && !/female/i.test(v.name))
    || voices.find(v => v.lang && v.lang.startsWith('en'))
    || voices[0] || null;
}
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => { goalVoice = pickGoalVoice(); };
  goalVoice = pickGoalVoice();
}
function shoutGoal() {
   if (!soundOn || document.hidden || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance('Goaaal!');
    if (goalVoice) u.voice = goalVoice;
    u.pitch = 0.55; u.rate = 1.2; u.volume = sfxVol;
    window.speechSynthesis.speak(u);
  } catch (e) { }
}

/* ---------------- toast / modal ---------------- */
function toastSpawn(msg, cls, life) {
  const r = $('#toast-root'); if (!r) return;
  const d = document.createElement('div');
  d.className = 'toast' + (cls ? ' ' + cls : '') + (/^\s*[-−–]/.test(msg) ? ' out' : /^\s*\+/.test(msg) ? ' in' : '');
  d.textContent = msg;
  r.appendChild(d);   if (cls === 'good') uiSound('success'); else if (cls === 'warn') uiSound('warn'); else if (cls === 'big') uiSound('big');
  setTimeout(() => d.remove(), life);
}
function toast(msg) { toastSpawn(msg, '', 3200); }
function toastWarn(msg) { toastSpawn(msg, 'warn', 3800); }
function toastBig(msg) { toastSpawn(msg, 'big', 5000); }
function toastGood(msg) { toastSpawn(msg, 'good', 3800); }
  /* ---- global search: players, teams and any page or tab, even ones inside other tabs ---- */
let _gsStyle = false;
function gsInjectStyle() {
  if (_gsStyle) return; _gsStyle = true;
  const st = document.createElement('style');
  st.textContent = `
  .gsScrim{position:fixed;inset:0;z-index:2100;background:rgba(2,4,8,.9);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;justify-content:center;align-items:flex-start;padding:calc(env(safe-area-inset-top,0px) + 14px) 12px 12px;animation:sgFade .2s ease}
  .gsBox{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;background:linear-gradient(180deg,#27303c,#1a2029);border:2px solid #f2b928;border-radius:10px;box-shadow:0 0 0 6px rgba(242,185,40,.12),0 0 40px rgba(242,185,40,.25),0 24px 60px rgba(0,0,0,.8);overflow:hidden}
  .gsTop{display:flex;gap:8px;align-items:center;padding:10px 12px;border-bottom:1px solid #3a444f}
  .gsTop input{flex:1;min-width:0;background:#11161c;border:1px solid #3a444f;border-radius:6px;color:#fff;padding:11px 12px;font-size:16px;outline:none}
  .gsTop input:focus{border-color:#f2b928}
  .gsRes{overflow:auto;padding:4px 0 10px}
  .gsHd{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;padding:10px 14px 4px}
  .gsRow{display:flex;gap:10px;align-items:center;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.05);color:#eef1f4;padding:9px 14px;cursor:pointer;font:inherit}
  .gsRow:hover,.gsRow:focus{background:rgba(242,185,40,.12);outline:none}
  .gsRow b{display:block;font-weight:700}
  .gsRow small{color:#9aa3ad}
  .gsRow .gsR{margin-left:auto;font:700 16px var(--head);color:#f2b928}
  .gsEmpty{padding:18px 14px;color:#9aa3ad}`;
  document.head.appendChild(st);
}
function gsNorm(x) { return String(x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
/* every page the menu can reach, including the tabs inside other tabs */
function gsPages() {
  const out = [];
  MENU_SECTIONS.forEach(sec => sec[1].forEach(it => {
    out.push({ id: it[0], key: null, label: it[1], path: sec[0] });
    (NAV_SUBS[it[0]] || []).forEach(sb => out.push({ id: it[0], key: sb[0], label: sb[1], path: it[1] }));     if (it[0] === 'cups') [['cup', 'Thatbank Cup'], ['s8', 'Mzansi8'], ['ko', 'Bayakhala Knockout'], ['caf', 'African Champions League'], ['confed', 'African Football Cup']].forEach(c => [['bracket', 'Bracket'], ['results', 'Results'], ['history', 'History']].forEach(x => out.push({ id: 'cups', key: c[0] + '|' + x[0], label: c[1] + ' · ' + x[1], path: it[1] })));
    if (it[0] === 'cups') [['cup', 'Thatbank Cup'], ['s8', 'Mzansi8'], ['ko', 'Bayakhala Knockout'], ['caf', 'African Champions League'], ['confed', 'African Football Cup']].forEach(c => [['bracket', 'Bracket'], ['results', 'Results'], ['history', 'History']].forEach(x => out.push({ id: 'cups', key: c[0] + '|' + x[0], label: c[1] + ' · ' + x[1], path: it[1] })));
  }));
  return out;
}
function gsPlayers(q) {
  const res = [];
  G.teams.forEach(t => t.squad.forEach(p => { if (gsNorm(p.name).includes(q)) res.push({ p, t }); }));
  (G.freeAgents || []).forEach(p => { if (gsNorm(p.name).includes(q)) res.push({ p, t: null }); });
  return res.sort((a, b) => b.p.rating - a.p.rating).slice(0, 10);
}
function openGlobalSearch() {
  if (typeof G === 'undefined' || !G) return;
  gsInjectStyle();
  const old = document.querySelector('.gsScrim'); if (old) { old.remove(); return; }
  const tt = s => (typeof tr === 'function' ? tr(s) : s);
  const sc = document.createElement('div'); sc.className = 'gsScrim';
  sc.innerHTML = `<div class="gsBox"><div class="gsTop"><input id="gsQ" type="search" placeholder="${esc(tt('Search players, teams and pages'))}" autocomplete="off"><button class="btn ghost sm" id="gsX">${esc(tt('Close'))}</button></div><div class="gsRes" id="gsRes"></div></div>`;
  document.body.appendChild(sc);
  const close = () => sc.remove();
  const pages = gsPages(), res = sc.querySelector('#gsRes'), inp = sc.querySelector('#gsQ');
  const go = {
    page: pg => { close(); if (pg.id === 'soundsettings') { openSoundModal(); return; } if (pg.id === 'regional' && typeof openRegionalModal === 'function') { openRegionalModal(); return; } if (pg.key) goSub(pg.id, pg.key); else goTo(pg.id); },
    team: t => { close(); if (t.id === G.myTeam) { goTo('club'); return; } ocTier = t.tier; ocPick = t.id; goTo('otherclubs'); },
    player: id => { close(); playerModal(id); }
  };
  const draw = () => {
    const q = gsNorm(inp.value.trim()); let html = '', n = 0; const acts = [];
    const add = (cls, inner, fn) => { acts.push(fn); html += `<button class="gsRow" data-i="${acts.length - 1}">${inner}</button>`; n++; };
    const hd = t => { html += `<div class="gsHd">${esc(tt(t))}</div>`; };
    if (q.length >= 2) {
      const pl = gsPlayers(q);
      if (pl.length) { hd('Players'); pl.forEach(x => add('p', `${x.t ? crestHTML(x.t, 22) : '<span style="width:22px"></span>'}<span><b>${esc(x.p.name)}</b><small>${esc(x.t ? x.t.s : tt('Free agents'))} · ${esc(x.p.pos)} · ${x.p.age}</small></span><span class="gsR">${x.p.rating}</span>`, () => go.player(x.p.id))); }
      const tm = G.teams.filter(t => gsNorm(t.n).includes(q) || gsNorm(t.s).includes(q) || gsNorm(t.city).includes(q)).sort((a, b) => a.tier - b.tier).slice(0, 6);
      if (tm.length) { hd('Teams'); tm.forEach(t => add('t', `${crestHTML(t, 22)}<span><b>${esc(t.n)}</b><small>${esc(TIER_SHORT[t.tier])}${t.city ? ' · ' + esc(t.city) : ''}</small></span>`, () => go.team(t))); }
    }
    const pg = (q ? pages.filter(x => gsNorm(x.label).includes(q) || gsNorm(tt(x.label)).includes(q) || gsNorm(x.path).includes(q)) : pages.filter(x => !x.key)).slice(0, q ? 12 : 30);
    if (pg.length) { hd('Pages'); pg.forEach(x => add('g', `<span><b>${esc(tt(x.label))}</b><small>${esc(x.key ? tt(x.path) + ' › ' + tt(x.label) : tt(x.path))}</small></span>`, () => go.page(x))); }
    res.innerHTML = n ? html : `<div class="gsEmpty">${esc(tt('No results.'))}</div>`;
    res.querySelectorAll('.gsRow').forEach(b => b.onclick = () => acts[+b.dataset.i]());
    res._first = acts[0];
  };
  inp.oninput = draw;
  inp.onkeydown = e => { if (e.key === 'Enter' && res._first) res._first(); if (e.key === 'Escape') close(); };
  sc.querySelector('#gsX').onclick = close;
  sc.onclick = e => { if (e.target === sc) close(); };
  draw(); setTimeout(() => inp.focus(), 60);
}
document.addEventListener('click', e => { if (e.target.closest && e.target.closest('#searchBtn')) openGlobalSearch(); });
function openModal(title, body, footer) { modalLock = false; $('#modal').style.pointerEvents = '';   $('#modal').className = 'modal';   $('#modal').classList.add('mmx');   if (/^(Negotiate|Loan terms|Cash only|Your contract|You have been sacked|Contract)/.test(String(title).replace(/<[^>]*>/g, ''))) $('#modal').classList.add('ctrNeg');
  $('#modal').innerHTML = `<header><h3>${title}</h3><button class="x" aria-label="Close">&times;</button></header>
    <div class="body">${body}</div>` + (footer ? `<footer>${footer}</footer>` : '');
  $('#scrim').hidden = false;   uiSound('open');
  $('#modal .x').onclick = closeModal;
}
let modalLock = false; function closeModal() { modalLock = false; $('#scrim').hidden = true; } function openLockedModal(title, body, footer) {   openModal(title, body, footer);   modalLock = true;   const x = $('#modal .x'); if (x) x.style.display = 'none';   $('#modal').classList.add('mmIn'); } function modalSwap(next) {   const m = $('#modal');   if (!m || $('#scrim').hidden) { next(); return; }   m.style.pointerEvents = 'none'; m.classList.add('mmOut');   setTimeout(() => { closeModal(); next(); }, 260); }
$('#scrim').addEventListener('click', e => { if (e.target.id === 'scrim' && !modalLock) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !liveState && !modalLock) closeModal(); }); function liveKeyOK(e) {   if (!liveState || e.ctrlKey || e.metaKey || e.altKey) return false;   const t = e.target, tag = t && t.tagName;   if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return false;   const scrim = $('#scrim'); if (scrim && !scrim.hidden) return false;   return true; } document.addEventListener('keydown', e => {   if (!liveKeyOK(e)) return;   const k = e.key.toLowerCase();   const press = sel => { const b = $(sel); if (b) b.click(); };   if (k === ' ') { e.preventDefault(); if (!e.repeat) press($('#liveGo') ? '#liveGo' : '#livePause'); }   else if (k === 'enter') { if ($('#liveDone')) { e.preventDefault(); if (!e.repeat) press('#liveDone'); } else if ($('#liveGo')) { e.preventDefault(); if (!e.repeat) press('#liveGo'); } }   else if (k.length === 1 && k >= '1' && k <= '4') press('[data-sp="' + [1, 2, 4, 8][+k - 1] + '"]');   else if (k === 's') press('#liveSkip');   else if (k === 'b') press('#liveSubs'); }); document.addEventListener('keyup', e => { if (e.key === ' ' && liveKeyOK(e)) e.preventDefault(); }); function footerHTML() {   const socials = [     ['YouTube', 'https://www.youtube.com/@mzansimanager', '<path d="M23.5 6.2c-.3-1-1-1.8-2-2C19.6 3.7 12 3.7 12 3.7s-7.6 0-9.5.5c-1 .3-1.7 1-2 2C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.7 2 2 1.9.5 9.5.5 9.5.5s7.6 0 9.5-.5c1-.3 1.7-1 2-2 .5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z"/>'],     ['Instagram', 'https://www.instagram.com/mzansimanager', '<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.4.5.6.2 1 .5 1.5 1 .4.4.7.8 1 1.5.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.4-.2.6-.5 1-1 1.5-.4.4-.8.7-1.5 1-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.4-.5-.6-.2-1-.5-1.5-1-.4-.4-.7-.8-1-1.5-.2-.5-.4-1.2-.5-2.4C2.1 15.6 2.1 15.2 2.1 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.4.2-.6.5-1 1-1.5.4-.4.8-.7 1.5-1 .5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-1.9.4-.5.2-.8.4-1.2.7-.3.3-.5.6-.7 1.2-.1.3-.3.9-.4 1.9-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 1.9.2.5.4.8.7 1.2.3.3.6.5 1.2.7.3.1.9.3 1.9.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 1.9-.4.5-.2.8-.4 1.2-.7.3-.3.5-.6.7-1.2.1-.3.3-.9.4-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-1.9-.2-.5-.4-.8-.7-1.2-.3-.3-.6-.5-1.2-.7-.3-.1-.9-.3-1.9-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm4.7-2a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1z"/>'],     ['TikTok', 'https://www.tiktok.com/@mzansimanager', '<path d="M13.5 2h2.8c.2 1.4.9 2.6 2 3.4.8.6 1.8 1 2.9 1v2.9c-1.5 0-2.9-.4-4.1-1.2v6.6c0 3.2-2.6 5.8-5.8 5.8S5.5 17 5.5 13.7c0-3 2.3-5.5 5.2-5.8v2.9c-1.3.3-2.3 1.5-2.3 2.9 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9V2z"/>'],     ['Facebook', 'https://www.facebook.com/mzansimanager', '<path d="M14.5 21v-7.8h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.1C17.3 4 16.3 4 15.2 4c-2.3 0-3.9 1.4-3.9 4v2.2H8.7v3h2.6V21h3.2z"/>'],     ['Twitter', 'https://twitter.com/mzansimanager', '<path d="M18.9 3H22l-7.2 8.2L23 21h-6.6l-5.1-6.6L5.3 21H2.2l7.7-8.8L2 3h6.7l4.6 6.1L18.9 3zm-1.2 16h1.8L7.4 4.9H5.5L17.7 19z"/>']   ];   const iconLinks = socials.map(([name, url, path]) =>     `<a href="${url}" target="_blank" rel="noopener" aria-label="${name}" title="${name}"><svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg></a>`).join('');   return `<footer class="sitefooter">     <div class="social"><span style="align-self:center;margin-right:4px;font:600 13px var(--head);letter-spacing:.08em;color:#f2b928;white-space:nowrap">FOLLOW US &#8594;</span>${iconLinks}</div>     <div class="links">       <a href="terms/">Terms of Service</a>       <a href="privacy/">Privacy Policy</a>       <a href="about/">About</a> <a href="how-to-play/">How to play</a> <a href="contact/">Contact</a> <button type="button" onclick="location.href='mailto:mzansimanager@gmail.com?subject=Mzansi%20Manager'">Email us</button>     </div>     <p class="legalline">Every player in this game is fictional and generated from South African and global regional names. The game is not affiliated with the PSL, SAFA, CAF or any club. Bright PMB FC badge used with the owner's permission. Mzansi Manager works on your phone and on a computer ( if you are using a phone, click the 3 dots on browser and check "desktop site" + rotate your phone)..</p>     <p class="copyline">&copy; ${new Date().getFullYear()} Mzansi Manager. Built by Amagemu.</p>   </footer>`; } function mountFooters() {   document.querySelectorAll('[data-footer]').forEach(el => {     el.innerHTML = footerHTML();     el.querySelectorAll('[data-legalpage]').forEach(b => b.onclick = () => openLegalModal(b.dataset.legalpage));   }); } function openLegalModal(page) {   const pages = {     terms: ['Terms of Service', `       <p>By playing Mzansi Manager you agree to these terms.</p>       <p><b>1. The game.</b> Mzansi Manager is a free, fictional football management simulation. Clubs, competitions and player names are either invented or used in a fictional context. Any resemblance to real players is coincidental.</p>       <p><b>2. Your data.</b> Careers are saved in your own browser's local storage. We don't run accounts or servers, so we can't recover a save if you clear your browser data.</p>       <p><b>3. Fair use.</b> Don't attempt to disrupt, reverse-engineer for malicious purposes, or resell this game.</p>       <p><b>4. No warranty.</b> The game is provided as-is, without guarantees it will be free of bugs or always available.</p>       <p><b>5. Changes.</b> These terms may be updated as the game develops.</p>`],     privacy: ['Privacy Policy', `       <p>Mzansi Manager does not require an account and does not collect personal information to let you play.</p>       <p><b>Local storage.</b> Your career saves live only in your browser's local storage on your device. We never see this data.</p>       <p><b>Advertising.</b> This site may show ads from third-party networks, which can use cookies or similar technology to serve relevant ads. We don't control what those networks collect.</p>       <p><b>Sign-in.</b> If you choose to sign in with Google, only your name is used to personalise the game locally — it is not sent anywhere or stored on a server.</p>       <p><b>Contact.</b> Questions about this policy can be sent to our email mzansimanager@gmail.com</p>`],     about: ['About Mzansi Manager', `       <p>Mzansi Manager is a free South African football management game — five divisions, live matches, transfers, academies and continental football, playable on mobile and PC.</p>       <p>Designed and developed by Amagemu <a href="https://panar.co.za" target="_blank" rel="noopener">PANAR</a>.</p>`]  };    const [title, body] = pages[page] || pages.about;   openModal(title, body, `<button class="btn sm" onclick="closeModal()">Close</button>`); } mountFooters();

/* ---------------- start screen ---------------- */
$('#heroLogo').src = 'mm-logo.jpg'; $('#enterGameBtn').onclick = () => {   if (document.getElementById('mmEnter')) return;   const go = () => { $('#landing').style.display = 'none'; $('#start').style.display = 'block'; window.scrollTo(0, 0); };   if (!document.getElementById('mmEnterCss')) {     const st = document.createElement('style'); st.id = 'mmEnterCss';     st.textContent = `#mmEnter{position:fixed;inset:0;z-index:99999;background:#000;overflow:hidden;display:flex;align-items:center;justify-content:center;transition:opacity .55s ease} #mmEnter.out{opacity:0;pointer-events:none} #mmEnter .wall{position:absolute;inset:-6%;display:flex;flex-wrap:wrap;gap:1.4vmin;justify-content:center;align-content:center;animation:mmDrift 3.6s cubic-bezier(.5,0,.9,.6) forwards} #mmEnter .wall>span{display:inline-flex;width:clamp(34px,7.2vmin,76px);height:clamp(34px,7.2vmin,76px);align-items:center;justify-content:center;opacity:0;animation:mmPop .7s cubic-bezier(.2,1.4,.4,1) forwards} #mmEnter .vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(0,0,0,.88) 0%,rgba(0,0,0,.6) 38%,rgba(0,0,0,.05) 85%)} #mmEnter .mid{position:relative;text-align:center;color:#fff;padding:0 20px} #mmEnter .mid .big{font:800 clamp(26px,6vw,58px)/1.05 var(--head,system-ui);letter-spacing:.12em;text-transform:uppercase;animation:mmBeat 1.1s ease-in-out infinite} #mmEnter .mid .big i{font-style:normal;color:var(--gold,#f2b928)} #mmEnter .bar{margin:22px auto 0;width:min(320px,70vw);height:5px;border-radius:5px;background:rgba(255,255,255,.18);overflow:hidden} #mmEnter .bar b{display:block;height:100%;width:0;background:var(--gold,#f2b928);border-radius:5px;animation:mmFill 3.1s ease-in-out forwards} #mmEnter .url{position:absolute;left:0;right:0;bottom:calc(22px + env(safe-area-inset-bottom));text-align:center;color:var(--gold,#f2b928);font:700 clamp(13px,2.4vmin,20px) var(--head,system-ui);letter-spacing:.18em} #mmEnter .dots span{animation:mmDot 1.2s infinite;opacity:.2}#mmEnter .dots span:nth-child(2){animation-delay:.2s}#mmEnter .dots span:nth-child(3){animation-delay:.4s} @keyframes mmPop{0%{opacity:0;transform:scale(.15) rotate(-12deg)}60%{opacity:1;transform:scale(1.25) rotate(3deg)}100%{opacity:.62;transform:scale(1) rotate(0)}} @keyframes mmDrift{from{transform:scale(1)}to{transform:scale(1.5)}} @keyframes mmBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}} @keyframes mmFill{from{width:0}to{width:100%}} @keyframes mmDot{0%,100%{opacity:.2}50%{opacity:1}} @media (prefers-reduced-motion:reduce){#mmEnter .wall,#mmEnter .mid .big{animation:none}#mmEnter .wall>span{animation-duration:.01s}}`;     document.head.appendChild(st);   }   const ov = document.createElement('div'); ov.id = 'mmEnter';   const order = CLUBS.map((c, i) => i).sort(() => Math.random() - .5);   ov.innerHTML = '<div class="wall">' + order.map(i => { const c = CLUBS[i], k = c.n + '|' + c.s; const u = c.badge === 'bright' ? IMG_BRIGHT : ((window.CREST_EXTRA || {})[k] || CREST_IMGS[k] || ''); return `<span style="animation-delay:${(Math.random() * 1.5).toFixed(2)}s;background:${u ? `url('${u}') center/contain no-repeat` : 'none'}"></span>`; }).join('') + '</div><div class="vig"></div><div class="mid"><div class="big" id="mmEnterTxt">Loading <i>game</i></div><div class="dots" style="margin-top:10px;font-size:26px;color:#fff"><span>•</span> <span>•</span> <span>•</span></div><div class="bar"><b></b></div></div><div class="url">MZANSIMANAGER.CO.ZA</div>';   document.body.appendChild(ov);   let done = false;   const finish = () => { if (done) return; done = true; go(); ov.classList.add('out'); setTimeout(() => ov.remove(), 650); };   setTimeout(() => { const t = document.getElementById('mmEnterTxt'); if (t) t.innerHTML = 'Entering <i>game</i>'; }, 4000);   setTimeout(finish, 7000);   ov.addEventListener('click', finish); };
(function checkGoogleSetup() {
  const onload = document.getElementById ? document.getElementById('g_id_onload') : null;
  const el2 = onload || $('#g_id_onload');
  if (el2 && el2.getAttribute && el2.getAttribute('data-client_id') === 'YOUR_GOOGLE_CLIENT_ID') {
    const signinBtn = document.querySelector('.g_id_signin');
    if (signinBtn) signinBtn.style.display = 'none';
    if (el2.parentNode) el2.style.display = 'none';
    const hint = $('#googleHint');
    if (hint) hint.textContent = 'Google sign-in isn\'t configured for this site yet.';
  }
})();
function handleGoogleSignIn(resp) {
  try {
    const payload = JSON.parse(atob(resp.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.given_name || payload.name) {
      const nm = $('#mgrName');
      if (nm) nm.value = payload.given_name || payload.name;
      const hint = $('#googleHint');
      if (hint) hint.textContent = `Signed in as ${payload.name || payload.email}. This only sets your manager name — saves still live in this browser.`;
      toast(`Welcome, ${payload.given_name || payload.name}.`);
    }
  } catch (e) { }
}
window.handleGoogleSignIn = handleGoogleSignIn;
$('#favicon').href = 'mm-logo.jpg';

function buildAvatars() {
  const w = $('#avPick'); w.innerHTML = '';
  MANAGER_AVATARS.forEach(id => {
    const b = el('button', 'avbtn', avatarSVG(id, 60));
    b.setAttribute('aria-pressed', pickAvatar === id);
    b.title = 'Avatar';
    b.onclick = () => { pickAvatar = id; buildAvatars(); };
    w.appendChild(b);
  });
}
function buildTierChips() {
  const bar = $('#pickTierBar'); if (!bar) return;
  bar.innerHTML = '';
  TIER_SHORT.forEach((name, i) => {
    const b = el('button', 'chip', esc(TIER_NAMES[i]));
    b.setAttribute('aria-pressed', i === pickTier);
    b.dataset.tier = i;
    b.onclick = () => {
      pickTier = i;
      bar.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', +x.dataset.tier === pickTier));
      buildClubGrid();
    };
    bar.appendChild(b);
  });
}
function buildClubGrid() {
  const g = $('#clubGrid'); g.innerHTML = '';
  if (pickClub != null) { $('#startBtn').disabled = false; $('#startBtn').removeAttribute('disabled'); }
  CLUBS.forEach((c, i) => {
    if (c.t !== pickTier) return;
    const b = el('button', 'club');
    b.setAttribute('aria-pressed', pickClub === i);
    b.innerHTML = `${crestHTML(c, 46)}<span style="min-width:0"><b>${esc(c.n)}</b><small>${esc(c.nick)} · ${esc(c.city)}</small></span>`;
    b.onclick = () => {
      pickClub = i; buildClubGrid();
      $('#startBtn').disabled = false;
      $('#startBtn').removeAttribute('disabled');
      $('#startHint').textContent = `${c.n} — ${TIER_SHORT[c.t]}${c.youthClub ? ', the game\'s default youth-first club' : ''}.`;
    };
    g.appendChild(b);
  });
}
buildTierChips();
(function defaultClub() {
  const bright = CLUBS.findIndex(c => c.s === 'Bright PMB');
  if (bright >= 0) {
    pickClub = bright; pickTier = CLUBS[bright].t;
    const bar = $('#pickTierBar');
    if (bar) bar.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', +x.dataset.tier === pickTier));
    const hint = $('#startHint');
  }
})();
(function deepLink(){ try { const q = new URLSearchParams(location.search), c = q.get('club');
  if (c) { const i = CLUBS.findIndex(x => x.s.toLowerCase() === c.toLowerCase() || x.n.toLowerCase() === c.toLowerCase());
    if (i >= 0) { pickClub = i; pickTier = CLUBS[i].t; const bar = $('#pickTierBar'); if (bar) bar.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', +x.dataset.tier === pickTier)); buildClubGrid(); $('#startBtn').disabled = false; $('#startBtn').removeAttribute('disabled'); const h = $('#startHint'); if (h) h.textContent = CLUBS[i].n + ' - ' + TIER_SHORT[CLUBS[i].t] + '.'; } }
  if (c || q.has('start')) { $('#landing').style.display = 'none'; $('#start').style.display = 'block'; window.scrollTo(0, 0); } } catch (e) { } })();
$('#startBtn').onclick = () => {
  const nm = ($('#mgrName').value || '').trim() || 'Coach';
  const nat = ($('#mgrNat') && $('#mgrNat').value) || 'ZA';
  const dob = ($('#mgrDob') && $('#mgrDob').value) || '1988-06-15';
  if (slotInfo(slot)) slot = firstFreeSlot();
  const c = CLUBS[pickClub];
  const wage = Math.max(0.3, c.base * 1.1);
  openContractOffer({
    team: c, heading: 'Contract Offer', mgrName: nm, wage, years: 3, dateISO: new Date().toISOString().slice(0, 10),
    paragraphs: [
      `After carefully reviewing your application, the board are pleased to offer you the position of <b>Head Coach</b> for <b>${esc(c.n)}</b>.`,
      `The deal is worth <b>${money(wage / 12)}</b> a month — <b>${money(wage)}</b> a season.`,
      `You will be taking charge in the ${esc(TIER_NAMES[c.t])}.`
    ],
    options: [{ key: 'accept', label: 'Accept Offer' }, { key: 'reject', label: 'Reject Offer' }],
    defaultKey: 'accept',
    onChoice: (k) => {
      if (k !== 'accept') return;
      G = newGame(pickClub, { name: nm, avatar: pickAvatar, nat, dob }); if (window.__ctrTerms) { G.manager.wage = window.__ctrTerms.wage; G.manager.contractEnd = G.season + window.__ctrTerms.years - 1; } setTimeout(() => { try { showSponsors(); } catch (e) { } }, 1500);
      enterApp(); save();
    }
  });
};
(function buildMgrNat() {
  const sel = $('#mgrNat'); if (!sel) return;
  const codes = Object.keys(NATIONS);
  sel.innerHTML = codes.map(c => `<option value="${c}" ${c === 'ZA' ? 'selected' : ''}>${natName(c)}</option>`).join('');
  const flagEl = $('#mgrNatFlag');
  const paintFlag = () => { if (flagEl) flagEl.innerHTML = flagSVG(sel.value, 22); };
  paintFlag();
  sel.onchange = paintFlag;
})();

const RESIGN_REASONS = [   { id: 'challenge', label: 'I want a new challenge' },   { id: 'ambition', label: "I'm unhappy with the club's ambition" },   { id: 'bigger', label: 'I want to manage a bigger club' },   { id: 'done', label: "I've taken this club as far as I can" },   { id: 'personal', label: 'Personal reasons' } ]; function openResignModal() {   const t = me();   const body = `<p class="hint" style="margin:0 0 10px">The board want to understand before they let you go. Why do you want to leave ${esc(t.n)}?</p>` +     RESIGN_REASONS.map(r => `<button class="btn ghost sm" data-reason="${r.id}" style="display:block;width:100%;text-align:left;margin-bottom:6px">${esc(r.label)}</button>`).join('');   openModal('Resign as manager', body, `<button class="btn ghost sm" onclick="closeModal()">Stay for now</button>`);   document.querySelectorAll('[data-reason]').forEach(b => b.onclick = () => resignFromClub(b.dataset.reason)); } function resignFromClub(reasonId) {   const oldClub = me();   const offers = jobOffers(G);   closeModal();   if (!offers.length) {     openModal('No suitors yet', '<p style="margin:0;color:var(--dim)">You raise it with the board, but no club has come forward for you right now. Build your reputation a little more and try again.</p>',       `<button class="btn ghost sm" onclick="closeModal()">Stay for now</button><button class="btn sm" onclick="closeModal();goJoblessUI('resigned')">Resign anyway</button>`);     return;   }   const REASON_RESPONSES = {     challenge: `The board accept your decision and wish you well in a new challenge.`,     ambition: `The board acknowledge they haven't always matched your ambition, and part on good terms.`,     bigger: `The board understand — some managers outgrow a club, just like players do.`,     done: `The board agree you've taken ${esc(oldClub.n)} as far as you fairly could, and thank you for everything.`,     personal: `The board respect your reasons and thank you for your honesty.`   };   const offerRows = offers.map(o => { const ot = G.teams[o.id]; return `<div class="prow" style="grid-template-columns:auto 1fr auto">${crestHTML(ot, 26)}       <span class="who"><b>${esc(ot.n)}</b><small>${TIER_SHORT[ot.tier]} · squad rated ${teamOverall(ot)} · budget ${money(ot.budget)}</small></span>       <button class="btn sm" data-resigntake="${ot.id}" data-wage="${o.wage}">Take the job</button></div>`; }).join('');   openModal('Goodbye, and hello', `<p style="margin:0 0 10px;color:var(--dim)">${REASON_RESPONSES[reasonId] || REASON_RESPONSES.challenge}</p>     <p style="margin:0 0 8px;font-weight:600">${offers.length === 1 ? 'A club has' : 'Clubs have'} already come forward:</p>` + offerRows,     `<button class="btn ghost sm" id="resignBrowse">Resign and look for work</button>`);   document.querySelectorAll('[data-resigntake]').forEach(b => b.onclick = () => {     takeJob(G, +b.dataset.resigntake, +b.dataset.wage);     G.board = 55; G.boardFired = false;     G.pendingJobOffers = null; G.jobOffersSeen = false;     tableTier = me().tier; statTier = Math.min(me().tier, 2);     toast(`You are the new manager of ${me().n}.`);     closeModal(); save(); render();   });   const browse = $('#resignBrowse'); if (browse) browse.onclick = () => { closeModal(); goJoblessUI('resigned'); }; } function gameConfirm(title, message, okLabel, onOk) {   openModal(title, `<p style="margin:0;color:var(--dim)">${esc(message)}</p>`,     `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="gcOk">${esc(okLabel || 'Confirm')}</button>`);   const ok = $('#gcOk'); if (ok) ok.onclick = () => { closeModal(); onOk(); }; } function confirmQuit() {
  if (liveState) { toast('The match is still running.'); return; }
  save();
  openModal('Back to Choose Your Club?', '<p style="margin:0;color:var(--dim)">Your career stays saved in this slot. This just takes you back to the landing page.</p>',
    `<button class="btn ghost sm" onclick="closeModal()">Stay in this career</button><button class="btn sm" id="homeYes">Go to Choose Your Club</button>`);
  const yes = $('#homeYes');
  if (yes) yes.onclick = () => { leavingApp = true; try { localStorage.removeItem(LAST_SLOT_KEY); } catch (e) { } location.reload(); };
}
$('#homeBtn').onclick = () => goTo('bathini');
$('#backBtn').onclick = navBack;
$('#fwdBtn').onclick = navFwd;
$('#careerBtn').onclick = openCareerModal; function headerContinue() {   if (autoSimTimer) { stopAutoSim(); return; }   if (liveState) { goTo('match'); return; }   if (G.finished) { doEndSeason(); return; }   if (G.jobless) { startAutoSim(); return; }   if (isCupDayToday()) { goTo('match'); if (G.liveMode) startCupMatchday(); else { bumpCurDayForCup(G); const ties = playCupRound(G, false); afterCupMatchday({ cup: ties }); } return; }   if (isMatchdayToday()) { goTo('match'); if (G.liveMode) startLive(); else simRounds(1); return; }   startAutoSim(); } $('#contBtn').onclick = headerContinue;
window.addEventListener('beforeunload', e => {
  if (!G || leavingApp) return;
  save();
  if (liveState) { e.preventDefault(); e.returnValue = ''; return ''; }
});

function enterApp() { try { inboxTick(G); } catch (e) { } $('#landing').style.display = 'none'; $('#start').style.display = 'none'; $('#app').style.display = 'block'; $('#appLogo').src = 'mm-logo.jpg'; buildSideNav(); render(); window.scrollTo(0, 0); setTimeout(maybeStartGuide, 1200); } function renderTicker() {   const t = $('#tickerTrack'); if (!t || !G || !G.news) return;   const items = G.news.slice(0, 12);   if (!items.length) { $('#ticker').style.display = 'none'; return; }   $('#ticker').style.display = '';   const NEWS_ICON = { match: '⚽', transfer: '🔁', contract: '📝', youth: '🌱', retire: '👋', cup: '🏆', nation: '🌍', season: '📅', career: '📣' };   const html = items.map(n => `<span class="tk-item">${NEWS_ICON[n.kind] || '📰'} <b>MD${n.round + 1}</b>${esc(n.text)}</span>`).join('');   t.innerHTML = html + html; t.style.animationDuration = Math.max(150, Math.round(t.scrollWidth / 22)) + 's'; }

/* ---------------- save slots ---------------- */
const LZ_MAX = 0xD000; function lzCompress(str) {   const b = new TextEncoder().encode(str);   if (!b.length) return '';   const codes = new Uint16Array(b.length + 1); let n = 0;   let dict = new Map(), next = 256, w = b[0];   for (let i = 1; i < b.length; i++) {     const c = b[i], key = w * 256 + c, hit = dict.get(key);     if (hit !== undefined) { w = hit; continue; }     codes[n++] = w;     if (next < LZ_MAX) dict.set(key, next++); else { dict = new Map(); next = 256; }     w = c;   }   codes[n++] = w;   let out = '';   for (let i = 0; i < n; i += 8192) out += String.fromCharCode.apply(null, codes.subarray(i, Math.min(n, i + 8192)));   return out; } function lzDecompress(s) {   const n = s.length; if (!n) return '';   const pre = new Int32Array(LZ_MAX), suf = new Uint8Array(LZ_MAX), len = new Int32Array(LZ_MAX);   let out = new Uint8Array(Math.max(1024, n * 16)), op = 0, next = 256, prev = -1;   const firstOf = c => { while (c >= 256) c = pre[c]; return c; };   const write = c => {     const l = c < 256 ? 1 : len[c];     if (op + l > out.length) { const g = new Uint8Array(Math.max(out.length * 2, op + l)); g.set(out); out = g; }     let p = op + l; op = p;     while (true) { if (c < 256) { out[--p] = c; break; } out[--p] = suf[c]; c = pre[c]; }   };   for (let i = 0; i < n; i++) {     const cur = s.charCodeAt(i);     if (prev === -1) { write(cur); prev = cur; continue; }     if (next === LZ_MAX) { next = 256; write(cur); prev = cur; continue; }     const first = cur < next ? firstOf(cur) : firstOf(prev);     pre[next] = prev; suf[next] = first; len[next] = (prev < 256 ? 1 : len[prev]) + 1; next++;     write(cur); prev = cur;   }   return new TextDecoder().decode(out.subarray(0, op)); } function packSave(obj) {   const json = JSON.stringify(obj);   try { return 'LZ1:' + lzCompress(json); } catch (e) { return json; } } function unpackSave(raw) {   if (!raw) return null;   try {     const d = JSON.parse((raw.slice(0, 4) === 'LZ1:' ? lzDecompress(raw.slice(4)) : raw).split('CAF Champions League').join('African Champions League').split('CAF Confederation Cup').join('African Football Cup').split('Confederation Cup').join('African Football Cup'));     return (d && d.G && d.G.teams) ? d : null;   } catch (e) { return null; } } function saveMeta(k) {   try {     const t = G.teams[G.myTeam];     localStorage.setItem(SAVE_PREFIX + 'meta_' + k, JSON.stringify({ club: t.n, tier: t.tier, season: G.season, round: G.round, manager: (G.manager && G.manager.name) || 'Coach', trophies: t.trophies.length, saved: Date.now() }));   } catch (e) { } } function slotInfo(n) {   try {     const raw = localStorage.getItem(slotKey(n)); if (!raw) return null;     let m = null; try { m = JSON.parse(localStorage.getItem(SAVE_PREFIX + 'meta_' + n) || 'null'); } catch (e) { }     if (!m) {       const d = unpackSave(raw); if (!d) return null;       const t = d.G.teams[d.G.myTeam];       m = { club: t.n, tier: t.tier, season: d.G.season, round: d.G.round, manager: (d.G.manager && d.G.manager.name) || 'Coach', trophies: t.trophies.length, saved: d.saved || 0 };     }     return Object.assign({ n, name: getSlotName(n) }, m);   } catch (e) { return null; } } let _saveSoonTimer = null; function saveSoon() { if (_saveSoonTimer) return; _saveSoonTimer = setTimeout(() => { _saveSoonTimer = null; if (G) save(); }, 1500); } const STORE_QUOTA_KB = window.indexedDB ? 200000 : 5000; let _storeWarned = false; function storageGuard() {   if (_storeWarned || storageUsageKB() < STORE_QUOTA_KB * 0.8) return;   _storeWarned = true;   toastWarn('Browser storage is getting full. Open Save & Load → Export career file to back up, or delete an old slot.'); } function slotKB(n) { try { return Math.round((localStorage.getItem(slotKey(n)) || '').length / 1024); } catch (e) { return 0; } } function shrinkAllSlots() {   let freed = 0;   for (let i = 1; i <= SLOT_COUNT; i++) {     try {       const raw = localStorage.getItem(slotKey(i));       if (!raw || raw.slice(0, 4) === 'LZ1:') continue;       const d = unpackSave(raw); if (!d) continue;       const packed = packSave(d); localStorage.setItem(slotKey(i), packed); freed += raw.length - packed.length;     } catch (e) { }   }   return Math.round(freed / 1024); } function storageReportHTML() {   const used = storageUsageKB(), pct = Math.min(100, Math.round(used / STORE_QUOTA_KB * 100)), col = pct > 80 ? '#ff5a5a' : pct > 55 ? '#f2b928' : '#34c471';   return `<div style="flex-basis:100%;margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:12px"><span>Browser storage</span><b>${used > 1024 ? (used / 1024).toFixed(1) + ' MB' : used + ' KB'} of about ${STORE_QUOTA_KB / 1000} MB</b></div>     <div style="height:6px;background:#2c2c2e;border-radius:4px;overflow:hidden;margin-top:3px"><i style="display:block;height:100%;width:${pct}%;background:${col}"></i></div>     <div class="hint" style="margin-top:4px">This career: ${slotKB(slot)} KB${pct > 80 ? ' · nearly full, export a backup' : ''}</div></div>`; } function exportCareer() {   save();   const raw = localStorage.getItem(slotKey(slot)); if (!raw) { toast('Nothing to export yet.'); return; }   const name = ('mzansi-' + me().s + '-' + seasonLabel(G.season)).replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.mmsave';   const url = URL.createObjectURL(new Blob([raw], { type: 'text/plain' }));   const a = document.createElement('a'); a.href = url; a.download = name;   document.body.appendChild(a); a.click(); document.body.removeChild(a);   setTimeout(() => URL.revokeObjectURL(url), 4000);   toast('Career file saved: ' + name); } function importCareer() {   const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.mmsave,.txt,.json,text/plain';   inp.onchange = async () => {     const f = inp.files && inp.files[0]; if (!f) return;     try { const raw = (await f.text()).trim(), d = unpackSave(raw); if (!d) throw new Error('bad'); chooseImportSlot(raw, d); }     catch (e) { toast('That file is not a Mzansi Manager career.'); }   };   inp.click(); } function chooseImportSlot(raw, d) {   const t = d.G.teams[d.G.myTeam];   const rows = []; for (let i = 1; i <= SLOT_COUNT; i++) { const s = slotInfo(i); rows.push(`<button class="btn ${s ? 'ghost ' : ''}sm" data-imp="${i}" style="display:block;width:100%;margin:6px 0;text-align:left">Slot ${i} — ${s ? 'replace ' + esc(s.club) + ' (' + seasonLabel(s.season) + ')' : 'empty'}</button>`); }   openModal('Import career', `<p style="margin:0 0 8px"><b>${esc(t.n)}</b> · ${seasonLabel(d.G.season)} · managed by ${esc((d.G.manager && d.G.manager.name) || 'Coach')}</p><p class="hint" style="margin:0 0 6px">Pick a slot. The game restarts into the imported career.</p>${rows.join('')}`,     `<button class="btn ghost sm" onclick="closeModal()">Cancel</button>`);   document.querySelectorAll('[data-imp]').forEach(b => b.onclick = () => {     const i = +b.dataset.imp;     try {       localStorage.setItem(slotKey(i), raw.slice(0, 4) === 'LZ1:' ? raw : packSave(d));       localStorage.setItem(SAVE_PREFIX + 'meta_' + i, JSON.stringify({ club: t.n, tier: t.tier, season: d.G.season, round: d.G.round, manager: (d.G.manager && d.G.manager.name) || 'Coach', trophies: t.trophies.length, saved: d.saved || Date.now() }));       localStorage.setItem(LAST_SLOT_KEY, String(i));     } catch (e) { toastWarn('Not enough storage to import. Delete an old slot first.'); return; }     leavingApp = true; location.reload();   }); } function slotKey(n) { return SAVE_PREFIX + n; }
/* ---- small "Saved" pill so you know the game has saved ---- */
let _sfT = 0;
function saveFlash() {
  const now = Date.now(); if (now - _sfT < 4000) return; _sfT = now;
  let e = document.getElementById('saveFlash');
  if (!e) { e = document.createElement('div'); e.id = 'saveFlash'; e.textContent = '✓ Saved'; e.style.cssText = 'position:fixed;top:calc(env(safe-area-inset-top,0px) + 8px);right:10px;z-index:9999;padding:4px 10px;border-radius:999px;background:rgba(20,26,34,.92);border:1px solid rgba(255,255,255,.15);color:#3ddc84;font:600 12px sans-serif;opacity:0;transition:opacity .25s;pointer-events:none'; document.body.appendChild(e); }
  e.style.opacity = 1; clearTimeout(e._t); e._t = setTimeout(() => { e.style.opacity = 0; }, 1400);
}
function save(n) {
  const k = n || slot;
  let payload;
  try { payload = packSave({ G, seed: SEED, pid: PID, saved: Date.now() }); }
  catch (e) { console.error('save() stringify failed:', e); toastWarn('Could not save — try again.'); return false; }
  try {
    localStorage.setItem(slotKey(k), payload);
localStorage.setItem(LAST_SLOT_KEY, String(k)); saveMeta(k); storageGuard();
    try { saveFlash(); } catch (e) { }
    return true;
  } catch (e) {
    console.error('save() failed:', e && e.name, e && e.message, 'approx size (KB):', (payload.length / 1024).toFixed(0));
    toastWarn('Storage is full — this save did NOT go through. Delete an old career slot to free up space.');
    return false;
  }
}
function slotNameKey(n) { return SLOTNAME_PREFIX + n; }
function getSlotName(n) { try { return localStorage.getItem(slotNameKey(n)) || ''; } catch (e) { return ''; } }
function setSlotName(n, name) { try { if (name) localStorage.setItem(slotNameKey(n), name); else localStorage.removeItem(slotNameKey(n)); } catch (e) { } }
function slotInfoOld(n) {
  try {
    const raw = localStorage.getItem(slotKey(n)); if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d.G || !d.G.teams) return null;
    const t = d.G.teams[d.G.myTeam];
    return { n, club: t.n, tier: t.tier, season: d.G.season, round: d.G.round, name: getSlotName(n),
      manager: (d.G.manager && d.G.manager.name) || 'Coach', trophies: t.trophies.length, saved: d.saved || 0 };
  } catch (e) { return null; }
}
function load(n) {
  const want = n || slot;
   const tryParse = unpackSave;
  try {
    let d = null;
    const raw = localStorage.getItem(slotKey(want));
    if (raw) d = tryParse(raw);
    if (!d) {
      try {
        const meta = JSON.parse(localStorage.getItem(BACKUP_KEY) || 'null');
        if (meta && meta.slot === want) d = tryParse(localStorage.getItem(BACKUP_KEY + '_data'));
      } catch (eb) { }
    }
    if (!d) return false;
    G = d.G; SEED = d.seed; PID = d.pid; slot = want; try { kitFixAll(G); } catch (e) { } try { ensureMM(G); } catch (e) { }
    G.teams.forEach(t => { t.fin = t.fin || newFin(); t.youth = t.youth || []; t.squad.forEach(p => { p.value = valueOf(p); if (p.portrait) PORTRAIT_USE[p.portrait] = (PORTRAIT_USE[p.portrait] || 0) + 1; }); ensureLineup(t); });     G.watchlist = G.watchlist || []; G.pendingBids = G.pendingBids || []; G.pendingLoanOffers = G.pendingLoanOffers || []; seedAiClauses(G); try { updateOutgoingScouting(G); } catch (e) { }
    if (!G.africa) { initAfrica(G); initAfcon(G); buildCAF(G); }
    if (!G.super8) buildExtraCups(G);     if (!G.watchlist) G.watchlist = [];
    G.manager.rep = G.manager.rep || 40;     G.curDay = Math.max(G.curDay != null ? G.curDay : 0, Math.max(0, G.round - 1) * DAYS_PER_ROUND + (G.round > 0 ? 1 : 0));
    try { localStorage.setItem(LAST_SLOT_KEY, String(slot)); } catch (e) { }
    return true;
  } catch (e) { return false; }
}
function deleteSlot(n) {   try { localStorage.removeItem(slotKey(n)); } catch (e) { }   try { const meta = JSON.parse(localStorage.getItem(BACKUP_KEY) || 'null'); if (meta && meta.slot === n) { localStorage.removeItem(BACKUP_KEY); localStorage.removeItem(BACKUP_KEY + '_data'); } } catch (e) { }   setSlotName(n, ''); }
function firstFreeSlot() { for (let i = 1; i <= SLOT_COUNT; i++) if (!slotInfo(i)) return i; return 1; }
function anySave() { for (let i = 1; i <= SLOT_COUNT; i++) if (slotInfo(i)) return true; return false; }

function storageUsageKB() {
  let total = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf('mzansi_manager_2026_') === 0) total += (localStorage.getItem(k) || '').length + k.length;
    }
  } catch (e) { }
  return Math.round(total / 1024);
}
function buildSlots() {
  const w = $('#slotList'); if (!w) return;
  const note = $('#storageNote');
  if (note) { const kb = storageUsageKB(); note.textContent = `~${kb > 1024 ? (kb / 1024).toFixed(1) + 'MB' : kb + 'KB'} of local storage used by Mzansi Manager saves on this browser.`; }
  w.innerHTML = '';
  for (let i = 1; i <= SLOT_COUNT; i++) {
    const s = slotInfo(i);
    const d = document.createElement('div');
    d.className = 'slot';
    if (s) {
      d.innerHTML = `<b>${s.name ? esc(s.name) : 'Slot ' + i} <span class="hint" style="font-weight:400">${s.name ? '· slot ' + i : ''}</span></b>
        <small>${esc(s.club)} · ${esc(s.manager)} · ${TIER_SHORT[s.tier]} · ${seasonLabel(s.season)} · matchday ${Math.min(s.round + 1, 30)}</small>
        <small>${s.trophies} troph${s.trophies === 1 ? 'y' : 'ies'}${s.saved ? ' · saved ' + new Date(s.saved).toLocaleDateString() : ''}</small>
        <span class="acts"><button class="btn sm" data-resume="${i}">Continue</button>
        <button class="btn ghost sm" data-rename="${i}">Rename</button>
        <button class="btn ghost sm" data-wipe="${i}">Delete</button></span>`;
    } else {
      d.innerHTML = `<b>Slot ${i}</b><small>Empty</small>
        <span class="acts"><button class="btn ghost sm" data-use="${i}" aria-pressed="${slot === i}">${slot === i ? 'Selected for a new career' : 'Use this slot'}</button></span>`;
    }
    w.appendChild(d);
  }
  const impBtn = document.createElement('button'); impBtn.className = 'btn ghost sm'; impBtn.textContent = 'Import a career file'; impBtn.style.gridColumn = '1 / -1'; impBtn.onclick = importCareer; w.appendChild(impBtn);   w.querySelectorAll('[data-resume]').forEach(b => b.onclick = () => { if (load(+b.dataset.resume)) enterApp(); else toast('That save could not be read.'); });
  w.querySelectorAll('[data-use]').forEach(b => b.onclick = () => { slot = +b.dataset.use; buildSlots(); });
  w.querySelectorAll('[data-rename]').forEach(b => b.onclick = () => {
    const n = +b.dataset.rename;
    openModal('Name slot ' + n, `<input type="text" id="slotNameI" maxlength="24" value="${esc(getSlotName(n))}" placeholder="e.g. My Bright PMB save" style="width:100%">`,
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="slotNameGo">Save</button>`);
    $('#slotNameGo').onclick = () => { setSlotName(n, $('#slotNameI').value.trim()); closeModal(); buildSlots(); };
  });
  w.querySelectorAll('[data-wipe]').forEach(b => b.onclick = () => {
    openModal('Delete slot ' + b.dataset.wipe + '?', '<p style="margin:0;color:var(--dim)">That career is gone for good.</p>',
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn danger sm" id="delYes">Delete</button>`);
    $('#delYes').onclick = () => { deleteSlot(+b.dataset.wipe); closeModal(); buildSlots(); };
  });
}

/* ---------------- tabs ---------------- */
const MENU_SECTIONS = [
  ['Career', [['inbox','Inbox'],['bathini','Bathini'],['match','Matchday'],['calendar','Calendar'],['table','League tables & fixtures']]],
  ['Squad', [['squad','Squad & Tactics'], ['youth','Academy & Training'],['transfers','Transfers'],['otherclubs','Other Clubs'],['watchlist','Shortlist'],['scouting','Scouting']]],
  ['Competitions', [['cups','Cups'],['africa','Continental football'],['nations','Nations'],['world','World players'],['clubrank','Club rankings'],['cities','Club Cities'],['stats','Player Stats']]],
  ['Club', [['club','Club & Finances'],['mmcoins','MM Coins'],['commercial','Sponsors & Commercial'],['stadium','Stadium & tickets'],['board','Board & objectives'], ['trophies','Trophy room'],['legends','MM Legends'],['manager','Manager'],['news','News']]],
  ['More', [['careerfile','Save & Load'],['soundsettings','Music & sound effects'],['regional','Language & currency'],['info','How to play'],['getadded','Get added to the game']]]
];
function navLabel() { for (const sec of MENU_SECTIONS) for (const it of sec[1]) if (it[0] === tab) return it[1]; return 'Menu'; } function updateNavToggle() { const t = document.querySelector('#sideNav .navToggle'); if (t) t.innerHTML = '<span>☰ Menu</span><b>' + esc(navLabel()) + '</b>'; } function closeNavMenu() { const c = document.querySelector('#sideNav'); if (c) c.classList.remove('open'); } function navLabel() { for (const sec of MENU_SECTIONS) for (const it of sec[1]) if (it[0] === tab) return it[1]; return 'Menu'; } function updateNavToggle() { const t = document.querySelector('#sideNav .navToggle'); if (t) t.innerHTML = '<span>☰ Menu</span><b>' + esc(navLabel()) + '</b>'; } function closeNavMenu() { const c = document.querySelector('#sideNav'); if (c) c.classList.remove('open'); } const NAV_SUBS = {   inbox: [['emails', 'Emails'], ['players', 'Player conversations'], ['archive', 'Message archive']],   squad: [['squad', 'Squad'], ['tactics', 'Tactics']],   youth: [['academy', 'Academy'], ['training', 'Training']],   transfers: [['search', 'Player search'], ['fa', 'Free agents'], ['bids', 'Offers'], ['sell', 'Sell players'], ['watch', 'Shortlist'], ['loans', 'Loans'], ['hist', 'Transfer history'], ['top', 'Leaderboards']],   africa: [['rank', 'Rankings'], ['tables', 'League tables'], ['caf', 'Champions League'], ['confed', 'Football Cup']],   cups: [['cup', 'Thatbank Cup'], ['s8', 'Mzansi8'], ['ko', 'Bayakhala Knockout'], ['caf', 'African Champions League'], ['confed', 'African Football Cup']],   stats: [['goals', 'Goals'], ['assists', 'Assists'], ['cs', 'Clean sheets'], ['yellow', 'Yellow cards'], ['red', 'Red cards']],   club: [['overview', 'Overview'], ['finances', 'Finances'], ['history', 'History'], ['records', 'Club records'], ['save', 'Save & Load']],   manager: [['profile', 'Profile'], ['contract', 'Contract'], ['career', 'Career'], ['offers', 'Job offers'], ['vacancies', 'Vacancies']] }; const NAV_SET = {   inbox: k => { inboxTab = k; inboxSel = null; inboxOpen = false; },   squad: k => { squadTab = k; selSpot = null; }, youth: k => { youthTab = k; }, transfers: k => { txSection = k; },   africa: k => { afrTab = k; }, cups: k => { const q = String(k).split('|'); cupSel = q[0]; cupSub = q[1] || 'bracket'; }, stats: k => { statTab = k; statLimit = 20; }, club: k => { clubTab = k; }, manager: k => { mgrTab = k; } }; const NAV_GET = { inbox: () => inboxTab, squad: () => squadTab, youth: () => youthTab, transfers: () => txSection,   africa: () => afrTab, cups: () => cupSel, stats: () => statTab, club: () => clubTab, manager: () => mgrTab }; let navOpen = {}; function navSubCount(id, k) {   if (typeof G === 'undefined' || !G) return 0;   if (id === 'transfers' && k === 'bids') return (G.pendingBids || []).length;   if (id === 'transfers' && k === 'watch') return (G.watchlist || []).length;   if (id === 'inbox' && k === 'emails') return unreadCount(G);   if (id === 'manager' && k === 'offers') return (G.pendingJobOffers || []).length + (G.vacOffers || []).length;   return 0; } function syncNav() {   document.querySelectorAll('.navgrp').forEach(g => {     const id = g.dataset.grp, open = navOpen[id] === true || (navOpen[id] === undefined && tab === id);     g.classList.toggle('open', open);     const cb = g.querySelector('.navchev'); if (cb) cb.setAttribute('aria-expanded', open ? 'true' : 'false');     const cur = tab === id && NAV_GET[id] ? NAV_GET[id]() : null;     g.querySelectorAll('.navsublink').forEach(b => {       const k = b.dataset.sub.split(':')[1];       b.classList.toggle('on', cur != null && cur === k);       const n = navSubCount(id, k);       let bd = b.querySelector('.nsb');       if (n) { if (!bd) { bd = document.createElement('i'); bd.className = 'nsb'; b.appendChild(bd); } bd.textContent = n; }       else if (bd) bd.remove();     });   }); } function goSub(id, key) {   if (liveState && id !== 'match') { toast('The match is still running — skip to the result first.'); return; }   if (NAV_SET[id]) NAV_SET[id](key);   if (id !== tab) { navStack = navStack.slice(0, navIdx + 1); navStack.push(id); navIdx = navStack.length - 1; }   tab = id; render(); window.scrollTo({ top: 0 }); } document.addEventListener('click', () => setTimeout(() => { try { syncNav(); } catch (e) { } }, 0)); function buildSideNav() {   const c = $('#sideNav'); if (!c) return;   try { navOpen = JSON.parse(localStorage.getItem('mm_navopen') || '{}') || {}; } catch (e) { navOpen = {}; }   const chev = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';   c.innerHTML = MENU_SECTIONS.map(([label, items]) =>     `<h4>${label}</h4>` + items.map(([id, name]) => {       const row = `<button class="navlink" data-tab="${id}"><span>${esc(name)}</span></button>`;       const subs = NAV_SUBS[id];       if (!subs) return row;       return `<div class="navgrp" data-grp="${id}"><div class="navrow">${row}<button class="navchev" data-chev="${id}" aria-expanded="false" aria-label="Show sections of ${esc(name)}">${chev}</button></div>         <div class="navsub">${subs.map(([k, l]) => `<button class="navsublink" data-sub="${id}:${k}"><span>${esc(l)}</span></button>`).join('')}</div></div>`;     }).join('')   ).join('');   c.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => {     if (b.dataset.tab === 'careerfile') { openCareerModal(); return; }     if (b.dataset.tab === 'soundsettings') { openSoundModal(); return; }     if (b.dataset.tab === 'regional') { openRegionalModal(); return; }     goTo(b.dataset.tab);   });   c.querySelectorAll('[data-chev]').forEach(b => b.onclick = e => {     e.stopPropagation();     const id = b.dataset.chev, g = b.closest('.navgrp'), isOpen = g.classList.contains('open');     navOpen[id] = !isOpen;     try { localStorage.setItem('mm_navopen', JSON.stringify(navOpen)); } catch (er) { }     syncNav();   });   c.querySelectorAll('[data-sub]').forEach(b => b.onclick = () => { const p = b.dataset.sub.split(':'); goSub(p[0], p[1]); });   const hd = document.querySelector('header.top');   if (hd) document.documentElement.style.setProperty('--hdrH', hd.offsetHeight + 'px'); } function buildSideNavOld() {
  const c = $('#sideNav'); if (!c) return;
  c.innerHTML = MENU_SECTIONS.map(([label, items]) =>
    `<h4>${label}</h4>` + items.map(([id, name]) =>
      `<button class="navlink" data-tab="${id}"><span>${esc(name)}</span></button>`).join('')
  ).join('');
  c.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => {
    if (b.dataset.tab === 'careerfile') { openCareerModal(); return; }
    if (b.dataset.tab === 'soundsettings') { openSoundModal(); return; }     if (b.dataset.tab === 'regional') { openRegionalModal(); return; }
    goTo(b.dataset.tab);
  });
  const tg = document.createElement('button'); tg.type = 'button'; tg.className = 'navToggle'; tg.onclick = () => c.classList.toggle('open'); c.insertBefore(tg, c.firstChild); updateNavToggle();
  const hd = document.querySelector('header.top');
  if (hd) document.documentElement.style.setProperty('--hdrH', hd.offsetHeight + 'px');
}
function goTo(id) {   if (id === 'manager') mgrTab = G.jobless ? 'vacancies' : ((G.pendingJobOffers && G.pendingJobOffers.length) || (G.vacOffers && G.vacOffers.length)) ? 'offers' : 'profile';   if (id === 'finances') { clubTab = 'finances'; id = 'club'; } else if (id === 'club') clubTab = 'overview';   if (id === 'training') { youthTab = 'training'; id = 'youth'; } else if (id === 'youth') youthTab = 'academy';   if (id === 'tactics') { squadTab = 'tactics'; id = 'squad'; } else if (id === 'squad') squadTab = 'squad';
  if (liveState && id !== 'match') { toast('The match is still running — skip to the result first.'); return; }
  if (id !== tab) {
    navStack = navStack.slice(0, navIdx + 1);
    navStack.push(id);
    navIdx = navStack.length - 1;
  }
  tab = id; render(); window.scrollTo({ top: 0 });
}
function navBack() {
  if (liveState) { toast('The match is still running — skip to the result first.'); return; }
  if (navIdx <= 0) return;
  navIdx--; navSkip = true;
  tab = navStack[navIdx]; render(); window.scrollTo({ top: 0 });
}
function navFwd() {
  if (liveState) { toast('The match is still running — skip to the result first.'); return; }
  if (navIdx >= navStack.length - 1) return;
  navIdx++; navSkip = true;
  tab = navStack[navIdx]; render(); window.scrollTo({ top: 0 });
}
function renderHistoryBtns() {
  const b = $('#backBtn'), f = $('#fwdBtn');
  if (b) { b.disabled = navIdx <= 0; if (navIdx <= 0) b.setAttribute('disabled', ''); else b.removeAttribute('disabled'); }
  if (f) { f.disabled = navIdx >= navStack.length - 1; if (navIdx >= navStack.length - 1) f.setAttribute('disabled', ''); else f.removeAttribute('disabled'); }
}
document.addEventListener('click', e => {}, false);

/* ---------------- render ---------------- */
function render() { try { checkManagerBirthday(); } catch (e) { } try { updateNavToggle(); closeNavMenu(); } catch (e) { } try { updateNavToggle(); closeNavMenu(); } catch (e) { }   $('#mgrFace').innerHTML = avatarSVG(G.manager.avatar, 42);   $('#mgrNameTop').textContent = G.manager.name;   renderTicker();   const curD = new Date(currentDateISO() + 'T12:00:00Z');   $('#statDate').textContent = `${MONTH_NAMES[curD.getUTCMonth()]} ${curD.getUTCFullYear()}`;   const cb = $('#contBtn'); if (cb) cb.textContent = (isMatchdayToday() || isCupDayToday()) ? 'Play match' : 'Continue';   const winOpen = inTransferWindow(G), winPill = $('#winPill'); windowTickCheck(winOpen);   if (winPill) {     winPill.className = 'winpill ' + (winOpen ? 'open' : 'shut');     winPill.textContent = winOpen       ? `${currentWindowName(G)} open, ${windowCloses(G)} ${windowCloses(G) === 1 ? 'day' : 'days'} left`       : `${currentWindowName(G)} opens in ${roundsToNextWindow(G)} ${roundsToNextWindow(G) === 1 ? 'day' : 'days'}`;   }   const contBtn = $('#contBtn');   if (contBtn) {     contBtn.textContent = G.finished ? `Start ${seasonLabel(G.season + 1)}` : (autoSimTimer ? 'Stop' : ((isMatchdayToday() || isCupDayToday()) ? 'Play match' : 'Continue'));     contBtn.disabled = !!liveState;   }
  const t = me();
  $('#myCrest').innerHTML = G.jobless ? '<div style="width:30px;height:30px;border-radius:50%;background:#fff;flex:none"></div>' : crestHTML(t, 30);
  $('#myName').textContent = G.jobless ? 'Unemployed' : t.n;
  $('#mySub').textContent = (G.jobless ? 'Looking for a club' : TIER_SHORT[t.tier]) + (document.querySelector('header.top .tmgr') && getComputedStyle(document.querySelector('header.top .tmgr')).display === 'none' ? ' · ' + G.manager.name : '');
  $('#statOvr').textContent = teamOverall(t);
  $('#statPos').textContent = ordinal(posOfTeam(G, G.myTeam));
  $('#statSquad').textContent = `${t.squad.length}/32`;
  $('#statBudget').textContent = money(t.budget); try { mmRefreshChip(); } catch (e) { }
  document.querySelectorAll('.navlink').forEach(b => b.classList.toggle('on', b.dataset.tab === tab)); try { updateInboxBadge(); } catch (e) { } try { syncNav(); } catch (e) { }   const navBadges = { watchlist: (G.watchlist || []).length, youth: me().youth.length, transfers: (G.pendingBids || []).length, manager: (G.pendingJobOffers || []).length, bathini: (typeof bthUnread === 'function') ? bthUnread() : 0, mmcoins: (typeof mmCanClaim === 'function' && mmCanClaim()) ? 1 : 0 };   Object.keys(navBadges).forEach(tabId => {     const btn = document.querySelector(`.navlink[data-tab="${tabId}"]`); if (!btn) return;     const n = navBadges[tabId];     let badge = btn.querySelector('.nb');     if (n) { if (!badge) { badge = document.createElement('span'); badge.className = 'nb'; btn.appendChild(badge); } badge.textContent = n; }     else if (badge) badge.remove();   });
  document.querySelectorAll('.view').forEach(v => v.classList.remove('on'));
  const active = $('#v-' + tab);
  if (active) active.classList.add('on');
  const dispatch = { match: viewMatch, table: viewTable, fixtures: viewFixtures, squad: viewSquadHub, tactics: viewSquadHub, finances: viewFinances, trophies: viewTrophies,
     transfers: viewTransfers, youth: viewYouthHub, training: viewYouthHub, inbox: viewInbox, bathini: viewBathini, stats: viewStats, news: viewNews,
      cups: viewCups, africa: viewAfrica, nations: viewNations, world: viewWorld, clubrank: viewClubRank, cities: viewCities, commercial: viewCommercial, stadium: viewStadium, board: viewBoard, legends: viewLegends, stadium: viewStadium, calendar: viewCalendar, watchlist: viewWatchlist, scouting: viewScouting,
     info: viewInfo, getadded: viewGetAdded, createclub: viewCreateClub, manager: viewManager, otherclubs: viewOtherClubs, club: viewClub, mmcoins: viewMMCoins };
  try {
    if (G.jobless && JOBLESS_BLOCKED.indexOf(tab) >= 0) viewJoblessGate(); else (dispatch[tab] || viewMatch)();     if (G.jobless && active && JOBLESS_BLOCKED.indexOf(tab) < 0 && tab !== 'manager') joblessBanner(active);
  } catch (err) {
    if (active) active.innerHTML = `<div class="empty">This screen hit a snag. <button class="btn ghost sm" id="recoverBtn" style="margin-left:8px">Back to matchday</button></div>`;
    const rb = $('#recoverBtn'); if (rb) rb.onclick = () => { tab = 'match'; render(); };
    if (typeof console !== 'undefined' && console.error) console.error('Mzansi Manager view error:', tab, err);
  }
  try { renderActions(); } catch (e) { if (typeof console !== 'undefined') console.error(e); }
  try { renderHistoryBtns(); } catch (e) {}
  if (tab === 'calendar' && autoSimTimer) { const vc = $('#v-calendar'); if (vc) vc.scrollIntoView({ block: 'center' }); }
}

function myFixture(round) {
  const t = me(), rd = G.fixtures[t.tier][round];
  if (!rd) return null;
  return rd.find(m => m.h === G.myTeam || m.a === G.myTeam);
}

function openCareerModal() {
  const t = me();
  const body = `<div class="mb"><div class="pad">
    <dl class="kv" style="padding:0 0 10px">
      <dt>Slot</dt><dd>${slot}${getSlotName(slot) ? ' — ' + esc(getSlotName(slot)) : ''}</dd>
      <dt>Club</dt><dd>${esc(t.n)}</dd>
      <dt>Season</dt><dd>${seasonLabel(G.season)}</dd>
    </dl>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn ghost sm" id="cmSave">Save now</button>
      <button class="btn ghost sm" id="cmRename">Rename slot</button>
      <button class="btn ghost sm" id="cmSwitch">Switch save slot</button>       <button class="btn ghost sm" id="cmExport">Export career file</button>       <button class="btn ghost sm" id="cmImport">Import career file</button>       <button class="btn ghost sm" id="cmShrink">Shrink old saves</button>       <div id="cmStore" style="flex-basis:100%">${storageReportHTML()}</div>
    </div>
  </div></div>`;
  openModal('Save & Load', body, `<button class="btn ghost sm" onclick="closeModal()">Close</button>`);
  $('#cmSave').onclick = () => { if (save()) { toast('Saved.'); $('#cmStore').innerHTML = storageReportHTML(); } };   $('#cmExport').onclick = exportCareer;   $('#cmImport').onclick = importCareer;   $('#cmShrink').onclick = () => { const kb = shrinkAllSlots(); toast(kb > 0 ? 'Freed about ' + kb + ' KB.' : 'Your saves are already compressed.'); $('#cmStore').innerHTML = storageReportHTML(); };
  $('#cmRename').onclick = () => {
    openModal('Name slot ' + slot, `<input type="text" id="slotNameI2" maxlength="24" value="${esc(getSlotName(slot))}" placeholder="e.g. My Bright PMB save" style="width:100%">`,
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="slotNameGo2">Save</button>`);
    $('#slotNameGo2').onclick = () => { setSlotName(slot, $('#slotNameI2').value.trim()); closeModal(); toast('Slot renamed.'); };
  };
  $('#cmSwitch').onclick = () => {
    save();
    openModal('Switch save slot', '<p style="margin:0 0 10px;color:var(--dim)">This leaves your current career saved and returns to the club picker.</p>',
      `<button class="btn ghost sm" onclick="closeModal()">Cancel</button><button class="btn sm" id="switchYes2">Go to selection</button>`);
    $('#switchYes2').onclick = () => { leavingApp = true; try { localStorage.removeItem(LAST_SLOT_KEY); } catch (e) { } location.reload(); };
  };
}
const MUSIC_NAMES = { 'menu.mp3': 'Beautiful Dream', 'menu2.mp3': 'Driving Ambition', 'menu3.mp3': 'Hazy After Hours', 'menu4.mp3': 'Serene View', 'menu5.mp3': 'Tech House Vibes', 'menu15.mp3': 'In Dreamland', 'menu16.mp3': 'A Quiet Courtyard', 'menu18.mp3': 'Home', 'menu19.mp3': 'Found', 'menu20.mp3': 'Let It Be', 'menu21.mp3': 'Anxiety', 'menu22.mp3': 'White Love', 'menu23.mp3': 'Chemistry', 'menu24.mp3': 'Bliss', 'menu25.mp3': 'Ego', 'menu26.mp3': 'Apologies', 'menu27.mp3': 'Let Them', 'menu28.mp3': 'Space Aquarium', 'menu29.mp3': 'Summer Breeze', 'menu30.mp3': 'I Wonder', 'menu31.mp3': 'SAMIDOT', 'menu32.mp3': 'Rose Water' };
const musicName = f => MUSIC_NAMES[f] || ('Track ' + (MUSIC_TRACKS.indexOf(f) + 1));
let musicHist = [];
const _mdur = {};
function fmtTime(sec) { if (!isFinite(sec) || sec < 0) return '–:––'; sec = Math.floor(sec); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }
const _mblob = {}, _mfetch = {};
function musicPrefetch(f) {
  if (!f || _mblob[f] || _mfetch[f] || typeof fetch !== 'function') return;
  _mfetch[f] = true;
  fetch(f).then(r => r.ok ? r.blob() : Promise.reject()).then(b => {
    _mblob[f] = URL.createObjectURL(b);
    const keys = Object.keys(_mblob);
    if (keys.length > 6) {
      const old = keys.find(k => k !== musicLast && k !== f);
      if (old) { URL.revokeObjectURL(_mblob[old]); delete _mblob[old]; }
    }
  }).catch(() => { }).then(() => { delete _mfetch[f]; });
}
const musicSrc = f => _mblob[f] || f;
function musicNext() {
  if (!bgMusic) return;
  bgMusic.src = musicSrc(nextMusicTrack()); bgMusic.play().catch(() => { });
  musicPrefetch(musicQueue[0]);
}
function musicPrev() {
  if (!bgMusic) return;
  if (bgMusic.currentTime > 3 || !musicHist.length) { bgMusic.currentTime = 0; return; }
  musicLast = musicHist.pop(); bgMusic.src = musicSrc(musicLast); bgMusic.play().catch(() => { });
}
function musicPick(f) {
  if (!bgMusic) return;
  if (f === musicLast) { bgMusic.currentTime = 0; bgMusic.play().catch(() => { }); return; }
  musicHist.push(musicLast); musicQueue = musicQueue.filter(t => t !== f); musicLast = f;
  bgMusic.src = musicSrc(f); bgMusic.play().catch(() => { });
}
function loadMusicDurations(done) {
  MUSIC_TRACKS.forEach(f => {
    if (_mdur[f] != null) return;
    _mdur[f] = 0;
    const a = new Audio(); a.preload = 'metadata';
    a.addEventListener('loadedmetadata', () => { _mdur[f] = a.duration; done(); });
    a.src = f;
  });
}
function mpTick() {
  const nameEl = $('#mpName'); if (!nameEl) return false;
  const on = !!(musicOn && bgMusic);
  const d = on ? bgMusic.duration : NaN, t = on ? bgMusic.currentTime : 0;
  nameEl.textContent = on ? ((!bgMusic.paused && bgMusic.readyState < 3 ? 'Loading… ' : '') + musicName(musicLast)) : 'Music is off';
  $('#mpTime').textContent = on ? fmtTime(t) + ' / ' + fmtTime(d) : '';
  $('#mpBar').style.width = (on && isFinite(d) && d > 0 ? Math.min(100, t / d * 100) : 0) + '%';
  $('#mpPlay').textContent = on && !bgMusic.paused ? 'Pause' : 'Play';
  ['mpPrev', 'mpPlay', 'mpNext'].forEach(id => { $('#' + id).disabled = !on; });
  document.querySelectorAll('#mpList [data-mf]').forEach(b => {
    const cur = on && b.dataset.mf === musicLast;
    b.style.background = cur ? 'var(--panel2)' : '';
    b.style.boxShadow = cur ? 'inset 0 0 0 1px var(--gold)' : '';
  });
  document.querySelectorAll('#mpList [data-md]').forEach(sp => { const x = _mdur[sp.dataset.md]; sp.textContent = x ? fmtTime(x) : '…'; });
  return true; 
}
function openSoundModal() {
  const row = (id, label, val) => `<div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>${label}</span><span class="hint" id="${id}Val">${Math.round(val * 100)}%</span></div><input type="range" id="${id}" min="0" max="100" value="${Math.round(val * 100)}" style="width:100%;accent-color:var(--gold)"></div>`;
  const mpRows = MUSIC_TRACKS.map((f, i) => `<button class="prow" data-mf="${f}" style="grid-template-columns:22px 1fr auto;padding:5px 8px;text-align:left"><span class="hint">${i + 1}</span><span class="who"><b>${esc(musicName(f))}</b></span><span class="hint" data-md="${f}">…</span></button>`).join('');
  const body = `<div class="mb"><div class="pad" style="display:flex;flex-direction:column;gap:14px">
      <label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="musicChk" ${musicOn ? 'checked' : ''}> Background music</label>
       ${row('musicVolR', 'Music volume', musicVol)}       <label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="keepChk" ${musicKeep ? 'checked' : ''}> Keep music playing when I leave the game</label>
      <div style="border:1px solid var(--line);border-radius:var(--r);padding:10px 12px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><b id="mpName" style="font-family:var(--head);font-size:16px"></b><span class="hint" id="mpTime"></span></div>
        <div id="mpBarWrap" style="cursor:pointer;padding:4px 0"><div class="bar"><i id="mpBar" style="width:0%"></i></div></div>
        <div style="display:flex;gap:8px;justify-content:center"><button class="btn ghost sm" id="mpPrev">⏮ Previous</button><button class="btn ghost sm" id="mpPlay">Pause</button><button class="btn ghost sm" id="mpNext">Next ⏭</button></div>
        <div id="mpList" style="max-height:190px;overflow:auto;display:flex;flex-direction:column;gap:2px">${mpRows}</div>
      </div>
      <label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="sfxChk" ${soundOn ? 'checked' : ''}> Sound effects</label>
      ${row('sfxVolR', 'Effects volume', sfxVol)}
      ${row('crowdVolR', 'Crowd volume', crowdVol)}
  </div></div>`;
  openModal('Music & sound effects', body, `<button class="btn ghost sm" onclick="closeModal()">Close</button>`);
  $('#musicChk').onchange = e => {
    musicOn = e.target.checked; saveAudioPrefs();
    if (musicOn) { startBgMusic(); if (bgMusic) bgMusic.play().catch(() => { }); }
    else if (bgMusic) bgMusic.pause();
    mpTick();
  };
    $('#keepChk').onchange = e => { musicKeep = e.target.checked; saveAudioPrefs(); };   $('#sfxChk').onchange = e => { soundOn = e.target.checked; saveAudioPrefs(); if (soundOn) playSound('click'); };
  const bind = (id, apply) => {
    const r = $('#' + id), v = $('#' + id + 'Val');
    r.oninput = () => { const x = r.value / 100; v.textContent = r.value + '%'; apply(x); saveAudioPrefs(); };
  };
  bind('musicVolR', x => { musicVol = x; if (bgMusic) bgMusic.volume = (liveState ? 0.05 : 0.25) * musicVol; });
  bind('sfxVolR', x => { sfxVol = x; });
  bind('crowdVolR', x => { crowdVol = x; if (liveState && liveState.crowd && liveState.crowd.cm) liveState.crowd.cm.gain.value = crowdVol; });
  $('#sfxVolR').onchange = () => playSound('coin');
  $('#mpPrev').onclick = () => { musicPrev(); mpTick(); };
  $('#mpNext').onclick = () => { musicNext(); mpTick(); };
  $('#mpPlay').onclick = () => { if (!bgMusic) return; if (bgMusic.paused) bgMusic.play().catch(() => { }); else bgMusic.pause(); mpTick(); };
  $('#mpBarWrap').onclick = e => {
    if (!bgMusic || !isFinite(bgMusic.duration)) return;
    const r = e.currentTarget.getBoundingClientRect();
    bgMusic.currentTime = bgMusic.duration * Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    mpTick();
  };
  document.querySelectorAll('#mpList [data-mf]').forEach(b => { b.onpointerdown = () => musicPrefetch(b.dataset.mf); b.onclick = () => { musicPick(b.dataset.mf); mpTick(); }; });
  const mpT = setInterval(() => { if (!mpTick()) clearInterval(mpT); }, 500);
  mpTick(); loadMusicDurations(mpTick);
}
let autoSimTimer = null; function autoSimBody() {   const d = new Date(currentDateISO() + 'T12:00:00Z');   return `<div style="text-align:center;padding:20px 0">     <div style="font-family:var(--head);font-size:12px;letter-spacing:.5px;color:var(--faint);text-transform:uppercase">Simulating</div>     <div style="font-family:var(--head);font-size:30px;margin:6px 0">${DOW_NAMES[d.getUTCDay()]} ${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCFullYear()}</div>     <div class="hint">${isMatchdayToday() ? 'Matchday reached' : 'No match today'}</div>   </div>`; } /* ---- Continue: moves day by day and stops when something important happens ---- */
function contSnap() {
  return { seq: G.mailSeq || 0, jobs: (G.pendingJobOffers || []).length, jobless: !!G.jobless, bids: (G.pendingBids || []).length, loans: (G.pendingLoanOffers || []).length };
}
/* what happened since the snapshot: a reason to stop, or null to keep going */
function contWhy(a) {
  if (G.jobless && !a.jobless) return 'You have lost your job.';
  if ((G.pendingJobOffers || []).length > a.jobs) return 'A club wants to talk: you have a job offer.';
  const fresh = (G.inbox || []).filter(m => m.id > a.seq);
  const bid = fresh.find(m => /^Transfer Offer/.test(m.subject || ''));
  if (bid) return 'Offer for your player: ' + String(bid.subject).replace(/^Transfer Offer:\s*/, '');
  if ((G.pendingBids || []).length > a.bids) return 'A club has made an offer for one of your players.';
  if ((G.pendingLoanOffers || []).length > a.loans) return 'A club wants one of your players on loan.';
  const imp = fresh.find(m => m.flag);
  if (imp) return (imp.from === 'Board of Directors' ? 'Message from the board: ' : 'Important message: ') + imp.subject;
  if ($('#scrim') && !$('#scrim').hidden) return 'Something needs your attention.';
  return null;
} /* while days are simulated, show only the calendar, centred: the results and fixtures panels come back when it stops */
function calFocus(on) {
  if (!document.getElementById('calFocusCss')) {
    const st = document.createElement('style'); st.id = 'calFocusCss';
    st.textContent = '#v-calendar.simming>:not(:first-child){display:none!important}#v-calendar.simming.on{display:flex;flex-direction:column;justify-content:center;min-height:calc(100vh - 190px)}';
    document.head.appendChild(st);
  }
  const v = document.getElementById('v-calendar'); if (v) v.classList.toggle('simming', !!on);
}
/* ---- simulating days: the calendar stays put and only today moves forward ---- */
function calCenter() {
  const c = document.querySelector('#v-calendar .cd.today'); if (c && c.scrollIntoView) c.scrollIntoView({ block: 'center', inline: 'nearest' });
}
function calMark() { const v = $('#v-calendar'); if (v) { v.dataset.cy = String(calY); v.dataset.cm = String(calM); } }
function calAdvance() {
  const v = $('#v-calendar'); if (!v) return;
  const d = new Date(currentDateISO() + 'T12:00:00Z'), y = d.getUTCFullYear(), m = d.getUTCMonth(), dd = d.getUTCDate();
  if (v.dataset.cy !== String(y) || v.dataset.cm !== String(m)) { viewCalendar(); v.dataset.cy = String(y); v.dataset.cm = String(m); calCenter(); return; }
  v.querySelectorAll('.cd').forEach(c => {
    if (c.classList.contains('pad')) return;
    const n = parseInt((c.querySelector('.dn') || {}).textContent, 10); if (!n) return;
    c.classList.toggle('today', n === dd); c.classList.toggle('past', n < dd);
  });
}
/* one day on: refresh only what changes (the date and the window pill) instead of rebuilding the whole screen */
function autoTickRender() {
  if (!autoSimTimer) return;
  if (tab !== 'calendar') { render(); return; }
  try {
    const curD = new Date(currentDateISO() + 'T12:00:00Z');
    $('#statDate').textContent = `${MONTH_NAMES[curD.getUTCMonth()]} ${curD.getUTCFullYear()}`;
    const winOpen = inTransferWindow(G), winPill = $('#winPill'); windowTickCheck(winOpen);
    if (winPill) {
      winPill.className = 'winpill ' + (winOpen ? 'open' : 'shut');
      winPill.textContent = winOpen ? `${currentWindowName(G)} open, ${windowCloses(G)} ${windowCloses(G) === 1 ? 'day' : 'days'} left` : `${currentWindowName(G)} opens in ${roundsToNextWindow(G)} ${roundsToNextWindow(G) === 1 ? 'day' : 'days'}`;
    }
  } catch (e) { }
  calAdvance();
}
   function startAutoSim() {   if (autoSimTimer || isMatchdayToday() || isCupDayToday()) return;   const d0 = new Date(currentDateISO() + 'T12:00:00Z');   calY = d0.getUTCFullYear(); calM = d0.getUTCMonth();   autoSimTimer = setInterval(() => {      if (isMatchdayToday() || isCupDayToday() || G.finished) { const md = isMatchdayToday() || isCupDayToday(); stopAutoSim(); if (md) { toast('Matchday today.'); matchdayChime(); } return; }     const _cs = contSnap(); advanceOneDay(); const _cw = contWhy(_cs); if (_cw) { stopAutoSim(); toast(_cw); try { matchdayChime(); } catch (e) { } }     const d = new Date(currentDateISO() + 'T12:00:00Z');     calY = d.getUTCFullYear(); calM = d.getUTCMonth();     autoTickRender();   }, 250);   if (tab === 'table' || tab === 'transfers') render(); else { goTo('calendar'); calMark(); calFocus(true); setTimeout(calCenter, 150); } } function stopAutoSim() { if (autoSimTimer) { clearInterval(autoSimTimer); autoSimTimer = null; } calFocus(false); render(); } function stepDayOnCalendar() {   if (autoSimTimer || isMatchdayToday() || G.finished) return;   const d0 = new Date(currentDateISO() + 'T12:00:00Z');   calY = d0.getUTCFullYear(); calM = d0.getUTCMonth();   goTo('calendar');   setTimeout(() => {     advanceOneDay();     const d = new Date(currentDateISO() + 'T12:00:00Z');     calY = d.getUTCFullYear(); calM = d.getUTCMonth();     render();     toast(isMatchdayToday() ? 'Matchday today.' : 'No match today.'); if (isMatchdayToday()) matchdayChime();   }, 300); } 
function renderActions() {
  const a = $('#actions'); a.innerHTML = '';
  if (liveState) return;
  const bb = el('button', 'navbtn', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>');
  bb.title = 'Back'; bb.setAttribute('aria-label', 'Back'); bb.disabled = navIdx <= 0; bb.onclick = navBack; a.appendChild(bb);
  const fb = el('button', 'navbtn', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>');
  fb.title = 'Forward'; fb.setAttribute('aria-label', 'Forward'); fb.disabled = navIdx >= navStack.length - 1; fb.onclick = navFwd; a.appendChild(fb);
  if (autoSimTimer) { const sb = el('button', 'btn', 'Stop'); sb.onclick = stopAutoSim; a.appendChild(sb); a.appendChild(el('span', 'hint', 'Simulating days…')); return; }
  if (G.finished) {
    const b = el('button', 'btn', `Start ${seasonLabel(G.season + 1)}`);
    b.onclick = doEndSeason; a.appendChild(b);
    a.appendChild(el('span', 'hint', 'Promotion, relegation, contracts and the academy intake are settled next.'));
    return;
  }
  if (G.jobless) {
    const jb = el('button', 'btn', 'Continue'); jb.onclick = headerContinue; a.appendChild(jb);
    a.appendChild(el('span', 'hint', 'Looking for a new club — keep going until an offer or a response comes in.'));
    return;
  }
const ndBtn = el('button', 'btn ghost', 'Next day'); ndBtn.disabled = isMatchdayToday(); ndBtn.title = isMatchdayToday() ? 'Play today\'s match first' : 'Advance one day'; ndBtn.disabled = false; ndBtn.title = ''; ndBtn.textContent = (isMatchdayToday() || isCupDayToday()) ? 'Play match' : 'Continue'; ndBtn.className = 'btn'; ndBtn.onclick = headerContinue; a.appendChild(ndBtn);
  if (cupLikeNext() === 'cont') {
    const L = contPending(), home = (L.stage === 3 || L.leg === 1) ? L.a : L.b, atHome = contMine(home), oppE = contMine(L.a) ? L.b : L.a;
    const b1 = el('button', 'btn cupBtn', `🌍 ${G.liveMode ? 'Play' : 'Sim'} ${contName(L)} — ${contRoundLabel(L)}`);
    b1.onclick = () => startCupMatchday();
    a.appendChild(b1);
    const b2 = el('button', 'btn ghost', 'Quick sim'); b2.onclick = () => contQuickSim(); a.appendChild(b2);
    a.appendChild(el('span', 'hint cupHint', `🌍   ${atHome ? 'Home to' : 'Away to'} ${cafShort(G, oppE)} in the ${contName(L)}`));
    return;
  }
  if (cupDueNow(G)) {
    if (!G.cup.pendingTies) cupPairStage(G);
    const mine = G.cup.pendingTies.find(p => p.h === G.myTeam || p.a === G.myTeam);
    const roundName = CUP_ROUNDS[G.cup.stage] || 'Round';
    const b1 = el('button', 'btn cupBtn', `🏆 ${G.liveMode ? 'Play' : 'Sim'} ${CUP_NAME} — ${roundName}`);
    b1.onclick = () => startCupMatchday();
    a.appendChild(b1);
    const b2 = el('button', 'btn ghost', 'Quick sim'); b2.onclick = () => { bumpCurDayForCup(G); const ties = playCupRound(G, false); afterCupMatchday({ cup: ties }); }; a.appendChild(b2);
    if (mine) {
      const copp = G.teams[mine.h === G.myTeam ? mine.a : mine.h];
      a.appendChild(el('span', 'hint cupHint', `🏆   ${mine.h === G.myTeam ? 'Home to' : 'Away to'} ${copp.s} in the ${CUP_NAME} · ${stadiumName(G.teams[mine.h])}`));
    } else {
      a.appendChild(el('span', 'hint cupHint', `🏆 ${CUP_NAME} — ${roundName} (no tie for you this round)`));
    }
    return;
  }
  const nx = myFixture(G.round);
  const b2 = el('button', 'btn ghost', 'Quick sim');
  if (isMatchdayToday()) { b2.onclick = () => simRounds(1); }
  else { b2.disabled = true; b2.title = 'Only on matchday'; }
  a.appendChild(b2);
  const b3 = null;
  if (nx) {
    const opp = G.teams[nx.h === G.myTeam ? nx.a : nx.h];
    a.appendChild(el('span', 'hint', `${nx.h === G.myTeam ? 'Home to' : 'Away to'} ${opp.s} (${teamOverall(opp)}) · ${stadiumName(G.teams[nx.h])}`));

  }
}

/* ---------------- quick sim ---------------- */
function simRounds(n) {
  const played = [];
  let cupPlayed = false;
  withPrizeSummary(() => {
    for (let i = 0; i < n && !G.finished; i++) {
      while (cupDueNow(G)) { playCupRound(G, false); cupPlayed = true; }
      const r = playRound(G); if (r) played.push(r);
    }
  });
  if (!played.length) { if (cupPlayed) { afterRound(); toast(`${CUP_NAME} results are in — check the cup tab.`); } return; }
  afterRound();
  if (played.length === 1) showMatchdayModal(played[0]); else showRunModal(played);
}
function simToRoundAnimated(targetRound) {
  if (autoSimTimer || liveState || G.finished) return;
  if (targetRound <= G.round) return;
  const playedAll = [];
  let cupPlayed = false;
  const ownBatch = !PRIZE_BATCH;
  if (ownBatch) PRIZE_BATCH = { total: 0, n: 0, last: '', lastAmt: 0 };
  const d0 = new Date(currentDateISO() + 'T12:00:00Z');
  calY = d0.getUTCFullYear(); calM = d0.getUTCMonth();
  goTo('calendar');
  autoSimTimer = setInterval(() => {
    if (G.finished || G.round >= targetRound) {
      autoSimTimer && clearInterval(autoSimTimer); autoSimTimer = null;
      if (ownBatch) {
        const b = PRIZE_BATCH; PRIZE_BATCH = null;
        if (b.n === 1) toastGood('+' + money(b.lastAmt) + ' ' + b.last);
        else if (b.n > 1) toastGood('+' + money(b.total) + ' in bonuses and prize money (' + b.n + ' payments)');
      }
      render();
      if (playedAll.length) { afterRound(); if (playedAll.length === 1) showMatchdayModal(playedAll[0]); else showRunModal(playedAll); }
      else if (cupPlayed) { afterRound(); toast(`${CUP_NAME} results are in — check the cup tab.`); }
      return;
    }
    if (cupDueNow(G)) { playCupRound(G, false); cupPlayed = true; }
    else if (isMatchdayToday()) { const r = playRound(G); if (r) playedAll.push(r); }
    else { advanceOneDay(); }
    const d = new Date(currentDateISO() + 'T12:00:00Z');
    calY = d.getUTCFullYear(); calM = d.getUTCMonth();
    render();
  }, 60);
}
