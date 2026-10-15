// Tela de detalhe de um evento — usada em dois lugares:
//   - index.html: dentro da janela (modal) que abre ao clicar num card;
//   - evento.html / páginas /e/<slug>/: a página própria do link direto.
// Os botões mudam conforme o status do evento (ver flowStatusEvento em eventos.js).
// Depende de eventos.js.

function flowEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

var FLOW_ICONES = {
  grupo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  seta: '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  cadeado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  sino: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  concierge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 11V9"/><path d="M10 9h4"/><path d="M2 21h20"/></svg>',
  compartilhar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'
};

// Botão de comunidade (do evento ou da Flow), no padrão dos botões grandes.
function flowBotaoComunidade(href, titulo, sub) {
  return '<a class="btn-comprar-grande comunidade" target="_blank" rel="noopener" href="' + flowEsc(href) + '">' +
    FLOW_ICONES.grupo +
    '<span class="textos"><span class="rotulo">' + titulo + '</span><span class="sub">' + sub + '</span></span>' +
    FLOW_ICONES.seta +
  '</a>';
}

// "Fique por dentro": leva à comunidade oficial da Flow.
function flowBotaoFiquePorDentro(ev, titulo, sub) {
  var msg = '🎟️ Olá! Quero ficar por dentro de ' + ev.nome + ' e das próximas edições.';
  return '<a class="btn-comprar-grande flow fique" target="_blank" rel="noopener" href="' +
      flowEsc(flowLinkComunidadeFlow(msg)) + '" data-comprar="1">' +
    FLOW_ICONES.sino +
    '<span class="textos"><span class="rotulo">' + titulo + '</span><span class="sub">' + sub + '</span></span>' +
  '</a>';
}

function flowHtmlCompra(ev, status) {
  var temComunidade = /^https?:\/\//i.test(ev.comunidade || '');
  var html = '';

  if (status === 'pos') {
    html =
      '<div class="aviso-status pos"><b>Este evento já aconteceu.</b> As vendas estão encerradas.</div>' +
      flowBotaoFiquePorDentro(ev, 'Fique por dentro', 'Saiba das próximas edições na comunidade Flow') +
      (temComunidade ? flowBotaoComunidade(ev.comunidade, 'Comunidade do evento', '<b>Grupo oficial</b> · próximas edições') : '');
  } else if (status === 'proximo') {
    html =
      '<div class="aviso-status proximo"><b>Vendas em breve.</b> Entre na comunidade e seja avisado(a) na abertura.</div>' +
      flowBotaoFiquePorDentro(ev, 'Fique por dentro', 'Avise-me sobre a abertura das vendas') +
      (temComunidade ? flowBotaoComunidade(ev.comunidade, 'Entrar na comunidade', '<b>Grupo oficial</b> · novidades e avisos') : '');
  } else if (ev.esgotado) {
    html =
      '<a class="btn-comprar-grande flow" target="_blank" rel="noopener" href="' + flowEsc(flowLinkWhats(ev)) + '" data-comprar="1">' +
        '<span class="rotulo">Quero ser avisado</span>' +
      '</a>' +
      (temComunidade ? flowBotaoComunidade(ev.comunidade, 'Entrar na comunidade', '<b>Grupo oficial</b> · novidades e avisos') : '') +
      '<div class="modal-obs">Evento esgotado — avisamos você se abrir novo lote.</div>';
  } else {
    // Link do "Comprar com desconto Flow": o link cadastrado no painel
    // (ev.linkCompra); se não houver, cai no WhatsApp.
    var linkDesconto = ev.linkCompra
      ? ev.linkCompra
      : flowLinkWhats(ev, 'Quero comprar com o desconto Flow (10% OFF).');
    html =
      '<a class="btn-comprar-grande flow" target="_blank" rel="noopener" href="' + flowEsc(linkDesconto) + '" data-comprar="1">' +
        '<span class="rotulo">Comprar com desconto Flow <span class="off">10% OFF</span></span>' +
      '</a>' +
      '<a class="btn-comprar-grande pix" target="_blank" rel="noopener" href="' +
          flowEsc(flowLinkWhats(ev, 'Quero comprar no Pix, sem taxa.')) + '" data-comprar="1">' +
        '<span class="rotulo">Comprar no Pix <span class="tag-pix">sem taxa</span></span>' +
      '</a>' +
      // Concierge: só nos eventos marcados no painel.
      (ev.concierge
        ? '<a class="btn-comprar-grande concierge" target="_blank" rel="noopener" href="' +
              flowEsc(flowLinkWhats(ev, 'Quero comprar pelo CONCIERGE Flow (Pix sem taxa de serviço).')) + '" data-comprar="1">' +
            FLOW_ICONES.concierge +
            '<span class="textos"><span class="rotulo">Concierge</span>' +
              '<span class="sub">Atendimento exclusivo · <b>Pix sem taxa de serviço</b></span></span>' +
            FLOW_ICONES.seta +
          '</a>'
        : '') +
      (temComunidade ? flowBotaoComunidade(ev.comunidade, 'Entrar na comunidade', '<b>Grupo oficial</b> · novidades e avisos') : '') +
      '<div class="modal-obs modal-seguro">' + FLOW_ICONES.cadeado +
        'Compra segura e dados protegidos. Você fecha direto com a nossa equipe.' +
      '</div>';
  }

  html +=
    '<div class="modal-duvida">Ficou com alguma dúvida? ' +
      '<a target="_blank" rel="noopener" href="' +
        flowEsc('https://wa.me/' + flowNumeroDoEvento(ev) + '?text=' + encodeURIComponent(
          '🎟️ Olá! Tenho uma dúvida sobre o evento ' + ev.nome + '.' +
          (flowPromoterAtual() ? '\n(Indicação: ' + flowPromoterAtual() + ')' : ''))) +
      '">Falar com a Flow</a>' +
    '</div>';
  return html;
}

// Conteúdo de dentro do cartão do evento (capa + informações + compra).
function flowHtmlDetalhe(ev) {
  var status = flowStatusEvento(ev);
  var lotes = status === 'ativo' ? flowLotes(ev) : [];

  var linhasLote = lotes.map(function (l) {
    var tag = l.status === 'vigente' ? 'Lote atual' : l.status === 'encerrado' ? 'Encerrado' : 'Em breve';
    return '<div class="lote-linha ' + l.status + '">' +
             '<span class="lote-nome">' + flowEsc(l.nome) + '</span>' +
             '<span class="lote-tag">' + tag + '</span>' +
           '</div>';
  }).join('');

  var chips = '';
  if (ev.tipos) ev.tipos.split('·').forEach(function (t) {
    t = t.trim(); if (t) chips += '<span class="modal-chip">' + flowEsc(t) + '</span>';
  });
  if (ev.idade) chips += '<span class="modal-chip">' + flowEsc(ev.idade) + '</span>';
  if (ev.labels) ev.labels.split(/[,·]/).forEach(function (t) {
    t = t.trim(); if (t) chips += '<span class="modal-chip">' + flowEsc(t) + '</span>';
  });

  var ficha = '';
  if (ev.lineup) ficha += '<div><b>Line-up:</b> ' + flowEsc(ev.lineup) + '</div>';
  if (ev.regras) ficha += '<div><b>Regras:</b> ' + flowEsc(ev.regras) + '</div>';

  var selo = status === 'pos' ? 'Evento encerrado'
           : status === 'proximo' ? 'Vendas em breve'
           : ev.esgotado ? 'SOLD OUT' : (ev.selo || 'Ingressos abertos');
  var seloClasse = (status === 'pos' || ev.esgotado) ? ' esgotado' : '';
  var localTxt = ev.local ? ev.local + ' · ' + ev.cidade : ev.cidade;

  return (
    '<div class="modal-capa">' +
      (ev.imagem ? '<img src="' + flowEsc(ev.imagem) + '" alt="' + flowEsc(ev.nome) + '">' : '') +
      '<span class="modal-selo' + seloClasse + '">' + flowEsc(selo) + '</span>' +
    '</div>' +
    '<div class="modal-corpo">' +
      (ev.data ? '<div class="modal-data">' + flowEsc(ev.data) + '</div>' : '') +
      '<h2>' + flowEsc(ev.nome) + '</h2>' +
      '<div class="modal-local">' + flowEsc(localTxt) + '</div>' +
      '<button type="button" class="btn-compartilhar" data-compartilhar="1">' +
        FLOW_ICONES.compartilhar + '<span>Compartilhar evento</span>' +
      '</button>' +
      (chips ? '<div class="modal-chips">' + chips + '</div>' : '') +
      (ev.descricao ? '<div class="modal-secao"><h4>Sobre o evento</h4><p>' + flowEsc(ev.descricao) + '</p></div>' : '') +
      (lotes.length ? '<div class="modal-secao"><h4>Lotes</h4>' + linhasLote + '</div>' : '') +
      (ficha ? '<div class="modal-secao"><h4>Informações</h4><div class="modal-ficha">' + ficha + '</div></div>' : '') +
    '</div>' +
    '<div class="modal-compra">' + flowHtmlCompra(ev, status) + '</div>'
  );
}

// Liga os botões do detalhe já desenhado dentro de `raiz`.
function flowLigarDetalhe(raiz, ev) {
  // Registra o clique em qualquer botão de compra (rastreio por evento/promoter)
  raiz.querySelectorAll('[data-comprar]').forEach(function (btn) {
    btn.addEventListener('click', function () { flowRegistrarClique(ev.id); });
  });

  var btnComp = raiz.querySelector('[data-compartilhar]');
  if (btnComp) btnComp.addEventListener('click', function () {
    var url = flowLinkEvento(ev);
    var promoter = flowPromoterAtual();
    if (promoter) url += '?p=' + encodeURIComponent(promoter); // mantém a indicação
    var rotulo = btnComp.querySelector('span');
    function copiado() {
      rotulo.textContent = 'Link copiado!';
      setTimeout(function () { rotulo.textContent = 'Compartilhar evento'; }, 2200);
    }
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      navigator.share({ title: ev.nome + ' — Flow Tickets', text: ev.nome + (ev.data ? ' · ' + ev.data : ''), url: url })
        .catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(copiado, function () { prompt('Copie o link do evento:', url); });
    } else {
      prompt('Copie o link do evento:', url);
    }
  });
}
