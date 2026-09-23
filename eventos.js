// Dados e funções compartilhados entre o site (index.html) e o painel (admin.html).
// Os eventos editados no admin ficam salvos no navegador (localStorage);
// estes abaixo são os eventos "de fábrica", usados na primeira visita ou ao restaurar.
//
// OBS (jul/2026): os eventos abaixo foram montados a partir dos nomes e flyers reais
// que aparecem hoje na Maré Ticket. Data, preço e lote são PLACEHOLDERS realistas —
// a equipe Flow ajusta os valores exatos pelo painel (admin.html).

var FLOW_WHATS_PADRAO = '5511976892592';

// Mensagem que já vai preenchida no WhatsApp quando o cliente clica em comprar.
// (As frases de "boas-vindas" que vocês mandaram servem para a resposta automática
//  da equipe / saudação do WhatsApp Business — falar com o Marcos sobre onde usar.)
function flowMensagemPadrao(ev) {
  if (ev.esgotado) {
    return '🎟️ Olá! Vi que ' + ev.nome + ' está esgotado. Quero ser avisado(a) se abrir ingresso.';
  }
  return '🎟️ Olá! Quero garantir meu ingresso para ' + ev.nome +
         (ev.data ? ' (' + ev.data + ')' : '') + '. Pode me ajudar?';
}

var EVENTOS_PADRAO = [
  {
    id: 'balburdia-sp',
    nome: 'Balburdia São Paulo',
    data: 'Sáb · 09 Ago · 23h às 6h',
    local: '',
    cidade: 'São Paulo · SP',
    tipos: 'Pista · Open Bar',
    preco: 'A partir de R$ 70',
    lote: '2º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Obrigatório documento com foto. Open bar conforme o ingresso.',
    categoria: 'essa-semana',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: 'https://mareticket.com.br/wp-content/uploads/2025/08/1755880447.408351.jpg',
    descricao: 'A Balburdia chega a São Paulo com energia, liberdade e diversão sem limites. Open bar, line de peso e a pista que não para até o amanhecer.',
    msg: ''
  },
  {
    id: 'mixed-by-mixed-sp',
    nome: 'Mixed by Mixed São Paulo',
    data: 'Sáb · 09 Ago · 22h às 5h',
    local: '',
    cidade: 'São Paulo · SP',
    tipos: 'Pista · VIP',
    preco: 'A partir de R$ 60',
    lote: '1º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Obrigatório documento com foto.',
    categoria: 'essa-semana',
    selo: 'Últimos ingressos',
    esgotado: false,
    imagem: 'https://mareticket.com.br/wp-content/uploads/2025/01/mixed-sp.webp',
    descricao: 'Uma das noites mais aguardadas de São Paulo. Line-up cheio, produção impecável e a pista sempre lotada.',
    msg: ''
  },
  {
    id: 'we-make-better-days-sp',
    nome: 'We Make Better Days São Paulo',
    data: 'Sáb · 16 Ago · 22h às 6h',
    local: '',
    cidade: 'São Paulo · SP',
    tipos: 'Pista · Premium Open Bar',
    preco: 'A partir de R$ 90',
    lote: '2º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Premium open bar conforme o ingresso. Documento com foto obrigatório.',
    categoria: 'semana-que-vem',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: 'https://mareticket.com.br/wp-content/uploads/2024/11/448550806_1158052112009808_8068829373659087857_n.jpg',
    descricao: 'A festa que eleva a celebração a outro nível: premium open bar, música de qualidade e uma energia inesquecível.',
    msg: ''
  },
  {
    id: 'saralina',
    nome: 'Saralina',
    data: 'Sex · 22 Ago · 23h às 6h',
    local: '',
    cidade: 'São Paulo · SP',
    tipos: 'Pista',
    preco: 'A partir de R$ 50',
    lote: '1º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Documento com foto obrigatório.',
    categoria: 'semana-que-vem',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: 'https://mareticket.com.br/wp-content/uploads/2025/03/Imagem-do-WhatsApp-de-2025-03-17-as-11.36.54_43c48b36.jpg',
    descricao: 'Saralina em São Paulo: uma noite pensada para quem gosta de música boa e pista cheia do começo ao fim.',
    msg: ''
  },
  {
    id: 'ostras-frescas',
    nome: 'Ostras Frescas',
    data: 'Sáb · 30 Ago · 16h às 23h',
    local: '',
    cidade: 'São Paulo · SP',
    tipos: 'Pista · Área Premium',
    preco: 'A partir de R$ 80',
    lote: '2º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Documento com foto obrigatório.',
    categoria: 'proximas',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: 'https://mareticket.com.br/wp-content/uploads/2025/06/ostras-frescas-1.png',
    descricao: 'Ostras Frescas em São Paulo: clima de day festa, som selecionado e uma vibe diferente das noites tradicionais.',
    msg: ''
  },
  {
    id: 'rodeio-de-itu',
    nome: 'Rodeio de Itu',
    data: 'Set · 2026 · vários dias',
    local: 'Parque de Exposições',
    cidade: 'Itu · SP',
    tipos: 'Arena · Camarote',
    preco: 'A partir de R$ 60',
    lote: '1º lote',
    idade: '18 anos (menores com responsável)',
    lineup: '',
    regras: 'Consultar a programação de shows por dia.',
    categoria: 'proximas',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: 'https://mareticket.com.br/wp-content/uploads/2025/05/rodeio-itu-1.webp',
    descricao: 'Há 19 anos entre os cinco maiores eventos de sertanejo do Brasil. Grandes shows, arena e camarotes com estrutura completa.',
    msg: ''
  },
  {
    id: 'reveillon-sampa',
    nome: 'Réveillon Sampa Festival 2027',
    data: 'Qui · 31 Dez · 22h à virada',
    local: 'Sonora Garden · Canindé',
    cidade: 'São Paulo · SP',
    tipos: 'Open Bar · Open Food',
    preco: 'A partir de R$ 420',
    lote: '1º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Open bar e open food a noite inteira conforme o ingresso.',
    categoria: 'reveillon',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: '',
    descricao: 'A virada de ano mais aguardada de São Paulo. Open bar e open food a noite inteira, grandes atrações e show de meia-noite com queima de fogos para começar 2027 no flow.',
    msg: ''
  },
  {
    id: 'camarote-essepe',
    nome: 'Camarote Amstel Essepê 2027',
    data: '6 a 9 Fev · Carnaval 2027',
    local: 'Sambódromo do Anhembi',
    cidade: 'São Paulo · SP',
    tipos: 'All Inclusive',
    preco: 'A partir de R$ 430',
    lote: '1º lote',
    idade: '18 anos',
    lineup: '',
    regras: 'Serviço all inclusive conforme o ingresso.',
    categoria: 'carnaval',
    selo: 'Ingressos abertos',
    esgotado: false,
    imagem: '',
    descricao: 'O camarote mais completo do Carnaval de São Paulo, no Sambódromo do Anhembi. Quatro dias de folia, shows de grandes artistas, vista para os desfiles e serviço premium all inclusive.',
    msg: ''
  }
];

var FLOW_CATEGORIAS = {
  'essa-semana':    'Essa semana',
  'semana-que-vem': 'Semana que vem',
  'proximas':       'Próximas festas',
  'reveillon':      'Réveillon',
  'carnaval':       'Carnaval',
  'universitarias': 'Festas Universitárias',
  'eletronica':     'Eletrônica',
  'labels':         'Labels'
};

// ===== Categorias automáticas por data ======================================
// "Essa semana" e "Semana que vem" NÃO são cadastradas à mão: saem da data do
// evento, recalculadas toda vez que a página abre. Semana = segunda a domingo.
// A data vem do campo `dataISO` (AAAA-MM-DD, escolhido no calendário do painel);
// se ele estiver vazio, tentamos ler o texto livre de `data`
// ("Sex · 25 Set · 23h", "3 de outubro de 2026", "27, 28 e 31 de dezembro"...).

var FLOW_CATS_AUTOMATICAS = ['essa-semana', 'semana-que-vem'];
var FLOW_MESES_ABREV = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function flowHoje() {
  var d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Lê a data do texto livre. Retorna { inicio, fim } (Date à meia-noite) ou null.
function flowLerDataTexto(txt, hoje) {
  if (!txt) return null;
  hoje = hoje || flowHoje();
  var s = String(txt).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  var anoSolto = (s.match(/\b(20\d{2})\b/) || [])[1];
  var datas = [];

  function adicionar(dia, mes, ano) {
    var semAno = !ano;
    ano = ano ? +ano : (anoSolto ? +anoSolto : hoje.getFullYear());
    var d = new Date(ano, mes - 1, dia);
    if (d.getMonth() !== mes - 1) return; // dia inválido (ex.: 31 Set)
    // Sem ano escrito e já passou há mais de 6 meses? Então é do ano que vem.
    if (semAno && !anoSolto && (hoje - d) > 182 * 86400000) d = new Date(ano + 1, mes - 1, dia);
    datas.push(d);
  }

  // "27, 28 e 31 de dezembro de 2026", "Sex · 25 Set", "6 a 9 Fev"
  var re = /\b((?:\d{1,2}\s*(?:,|e|a|-|–)\s*)*\d{1,2})\s*(?:de\s+)?(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[a-z]*\.?(?:\s*(?:de\s+)?(\d{4}))?/g;
  var m;
  while ((m = re.exec(s))) {
    var mes = FLOW_MESES_ABREV.indexOf(m[2]) + 1;
    m[1].match(/\d{1,2}/g).forEach(function (dia) { adicionar(+dia, mes, m[3]); });
  }
  // "25/09" ou "25/09/2026"
  if (!datas.length) {
    var re2 = /\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/g;
    while ((m = re2.exec(s))) {
      var a = m[3] ? (m[3].length === 2 ? '20' + m[3] : m[3]) : null;
      if (+m[2] >= 1 && +m[2] <= 12) adicionar(+m[1], +m[2], a);
    }
  }
  if (!datas.length) return null;
  datas.sort(function (x, y) { return x - y; });
  return { inicio: datas[0], fim: datas[datas.length - 1] };
}

// Período do evento: { inicio, fim } ou null se não der para saber a data.
function flowPeriodoEvento(ev, hoje) {
  var m = String(ev.dataISO || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    return { inicio: d, fim: d };
  }
  return flowLerDataTexto(ev.data, hoje);
}

// Categorias escolhidas no painel. Compatível com eventos antigos, que só
// tinham `categoria` (uma só). As automáticas de data são ignoradas aqui.
function flowCategoriasManuais(ev) {
  var lista = Array.isArray(ev.categorias) ? ev.categorias : (ev.categoria ? [ev.categoria] : []);
  return lista.filter(function (c, i) {
    return c && FLOW_CATS_AUTOMATICAS.indexOf(c) === -1 && lista.indexOf(c) === i;
  });
}

// Todas as categorias em que o evento aparece no site (manuais + automáticas).
function flowCategoriasDoEvento(ev, hoje) {
  hoje = hoje || flowHoje();
  var cats = flowCategoriasManuais(ev);

  // Label/tipo "Eletrônico(a)" já coloca o evento em Eletrônica.
  if (cats.indexOf('eletronica') === -1 && /eletr[oô]nic/i.test((ev.labels || '') + ' ' + (ev.tipos || ''))) {
    cats.push('eletronica');
  }

  var p = flowPeriodoEvento(ev, hoje);
  if (p && p.fim >= hoje) {
    var diaSemana = (hoje.getDay() + 6) % 7; // 0 = segunda
    var domingo = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + (6 - diaSemana));
    var proxSegunda = new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1);
    var proxDomingo = new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 7);
    if (p.inicio <= domingo) cats.push('essa-semana');
    if (p.inicio <= proxDomingo && p.fim >= proxSegunda) cats.push('semana-que-vem');
  }
  return cats;
}

function flowCarregarEventos() {
  try {
    var salvos = JSON.parse(localStorage.getItem('flow_eventos'));
    if (Array.isArray(salvos)) return salvos;
  } catch (e) {}
  return JSON.parse(JSON.stringify(EVENTOS_PADRAO));
}

function flowSalvarEventos(lista) {
  localStorage.setItem('flow_eventos', JSON.stringify(lista));
}

// Config agora guarda VÁRIOS números de WhatsApp:
//   { whats: '<número padrão>', numeros: [ { id, label, numero }, ... ] }
// `whats` = número padrão (usado por eventos que não escolheram um específico).
// Mantém compatibilidade com a config antiga que só tinha { whats }.
function flowCarregarConfig() {
  var cfg = null;
  try { cfg = JSON.parse(localStorage.getItem('flow_config')); } catch (e) {}
  if (!cfg || typeof cfg !== 'object') cfg = {};
  if (!cfg.whats) cfg.whats = FLOW_WHATS_PADRAO;
  if (!Array.isArray(cfg.numeros) || !cfg.numeros.length) {
    cfg.numeros = [{ id: 'principal', label: 'Principal', numero: cfg.whats }];
  }
  // Set/2026: o número principal mudou. Configs salvas com o antigo passam a
  // usar o novo (no site e no painel; ao salvar no painel, o novo fica gravado).
  var FLOW_WHATS_ANTIGO = '5511996400247';
  if (cfg.whats === FLOW_WHATS_ANTIGO) cfg.whats = FLOW_WHATS_PADRAO;
  cfg.numeros.forEach(function (n) {
    if (n.numero === FLOW_WHATS_ANTIGO) n.numero = FLOW_WHATS_PADRAO;
  });
  return cfg;
}

// Resolve o número que recebe os pedidos de um evento.
// Usa o número escolhido no evento (ev.whatsId); se não houver (ou tiver sido
// removido), cai para o número padrão.
function flowNumeroDoEvento(ev) {
  var cfg = flowCarregarConfig();
  if (ev && ev.whatsId) {
    for (var i = 0; i < cfg.numeros.length; i++) {
      if (cfg.numeros[i].id === ev.whatsId && cfg.numeros[i].numero) {
        return cfg.numeros[i].numero;
      }
    }
  }
  return cfg.whats;
}

function flowSalvarConfig(cfg) {
  localStorage.setItem('flow_config', JSON.stringify(cfg));
}

// ===== Rastreio de cliques (por evento) =====
function flowCarregarCliques() {
  try {
    var c = JSON.parse(localStorage.getItem('flow_cliques'));
    if (c && typeof c === 'object') return c;
  } catch (e) {}
  return {};
}

// ===== Rastreio por promoter =====
// Estrutura: { "joao": { "balburdia-sp": 3, "saralina": 1 }, ... }
function flowCarregarCliquesPromoter() {
  try {
    var c = JSON.parse(localStorage.getItem('flow_cliques_promoter'));
    if (c && typeof c === 'object') return c;
  } catch (e) {}
  return {};
}

// Lê o promoter da URL (?p=nome) e guarda para a visita.
function flowPromoterAtual() {
  try {
    var p = new URLSearchParams(window.location.search).get('p');
    if (p) {
      p = p.trim().toLowerCase();
      localStorage.setItem('flow_promoter_atual', p);
      return p;
    }
    return localStorage.getItem('flow_promoter_atual') || '';
  } catch (e) {
    return '';
  }
}

function flowRegistrarClique(id) {
  var c = flowCarregarCliques();
  c[id] = (c[id] || 0) + 1;
  localStorage.setItem('flow_cliques', JSON.stringify(c));

  var promoter = flowPromoterAtual();
  if (promoter) {
    var cp = flowCarregarCliquesPromoter();
    if (!cp[promoter]) cp[promoter] = {};
    cp[promoter][id] = (cp[promoter][id] || 0) + 1;
    localStorage.setItem('flow_cliques_promoter', JSON.stringify(cp));
  }
}

function flowMensagemWhats(ev, extra) {
  var base = ev.msg ? ev.msg : flowMensagemPadrao(ev);
  if (extra) {
    base += '\n' + extra;
  }
  var promoter = flowPromoterAtual();
  if (promoter) {
    base += '\n(Indicação: ' + promoter + ')';
  }
  return base;
}

// extra (opcional) = linha adicional na mensagem, ex.: qual forma de pagamento
// o cliente escolheu ("desconto Flow" ou "Pix sem taxa").
function flowLinkWhats(ev, extra) {
  return 'https://wa.me/' + flowNumeroDoEvento(ev) + '?text=' + encodeURIComponent(flowMensagemWhats(ev, extra));
}

// Preço com o desconto Flow (10% sobre o lote atual), arredondado.
function flowPrecoDesconto(precoLote) {
  return Math.round(precoLote * 0.9);
}

// ===== Lotes (protótipo) ===============================================
// Hoje o cadastro guarda só o preço-base ("A partir de R$ 70") e o lote
// atual ("2º lote"). A função abaixo MONTA uma tabela de lotes estimada a
// partir desses dois campos, só para o protótipo da tela de detalhe:
//   - lotes anteriores  = ENCERRADOS (mais baratos)
//   - lote atual        = VIGENTE
//   - lotes seguintes   = EM BREVE (mais caros)
// ⚠️ Valores são PLACEHOLDER. Numa fase futura, a equipe cadastra os
//    valores reais de cada lote no painel.

// "A partir de R$ 1.290" -> 1290 ; retorna null se não achar número.
function flowPrecoBase(ev) {
  var m = (ev.preco || '').replace(/\./g, '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// "2º lote" -> 2 (padrão 1 se não informado).
function flowLoteAtualNum(ev) {
  var m = (ev.lote || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 1;
}

function flowLotes(ev) {
  var base = flowPrecoBase(ev);
  if (base == null) return [];
  var atual = flowLoteAtualNum(ev);
  // degrau entre lotes: ~20% do preço-base, arredondado a múltiplos de 5 (mín. R$ 15)
  var passo = Math.max(15, Math.round(base * 0.2 / 5) * 5);
  var total = Math.max(atual + 1, 3); // sempre pelo menos 1 lote futuro
  var lotes = [];
  for (var i = 1; i <= total; i++) {
    var preco = base + (i - atual) * passo;
    if (preco < 10) preco = 10;
    var status = i < atual ? 'encerrado' : (i === atual ? 'vigente' : 'em-breve');
    if (ev.esgotado) status = 'encerrado';
    lotes.push({ num: i, nome: i + 'º lote', preco: preco, status: status });
  }
  return lotes;
}
