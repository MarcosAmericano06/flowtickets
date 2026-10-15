#!/usr/bin/env python3
"""Gera as páginas do LINK DIRETO de cada evento: e/<slug>/index.html.

Lê os eventos publicados no Firestore (leitura pública), copia o modelo
evento.html para cada evento trocando a prévia (título, descrição e flyer que
aparecem ao colar o link no WhatsApp/Instagram) e embutindo os dados do evento
para a página abrir na hora. Também gera o 404.html (o mesmo modelo, sem
prévia), que abre links de eventos novos antes desta geração rodar.

Roda sozinho pelo GitHub Actions (.github/workflows/paginas-eventos.yml).
Para rodar à mão:  python3 scripts/gerar_paginas_eventos.py
Só usa a biblioteca padrão do Python.
"""
import html
import json
import os
import re
import shutil
import sys
import unicodedata
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://flowtickets.cloud'
DOC_URL = ('https://firestore.googleapis.com/v1/projects/flowtickets-2608142153'
           '/databases/(default)/documents/flow/dados')
PASTA = os.path.join(RAIZ, 'e')


def valor_firestore(v):
    """Converte um valor tipado do Firestore REST em Python puro."""
    if 'stringValue' in v:
        return v['stringValue']
    if 'booleanValue' in v:
        return v['booleanValue']
    if 'integerValue' in v:
        return int(v['integerValue'])
    if 'doubleValue' in v:
        return v['doubleValue']
    if 'nullValue' in v:
        return None
    if 'arrayValue' in v:
        return [valor_firestore(x) for x in v['arrayValue'].get('values', [])]
    if 'mapValue' in v:
        return {k: valor_firestore(x) for k, x in v['mapValue'].get('fields', {}).items()}
    return None


def slugify(txt):
    # Mesma regra de flowSlugify em eventos.js.
    s = unicodedata.normalize('NFD', str(txt or '').lower())
    s = re.sub('[̀-ͯ]', '', s)
    s = re.sub('[^a-z0-9]+', '-', s).strip('-')
    s = s[:60].rstrip('-')
    return s or 'evento'


def garantir_slugs(eventos):
    # Mesma regra de flowGarantirSlugs em eventos.js.
    usados = {ev['slug'] for ev in eventos if ev.get('slug')}
    for ev in eventos:
        if ev.get('slug'):
            continue
        base = slugify(ev.get('nome'))
        s, n = base, 2
        while s in usados:
            s = '%s-%d' % (base, n)
            n += 1
        ev['slug'] = s
        usados.add(s)


def bloco_meta(ev, slug):
    nome = ev.get('nome') or 'Evento'
    local = ' · '.join(x for x in [ev.get('local'), ev.get('cidade')] if x)
    descricao = ' · '.join(x for x in [ev.get('data'), local] if x) or 'Ingressos com a Flow Tickets.'
    imagem = ev.get('imagem') or (SITE + '/flow-capa-desktop.jpg')
    url = '%s/e/%s/' % (SITE, slug)
    e = lambda x: html.escape(str(x), quote=True)
    return '\n'.join([
        '<!--FLOW-META-->',
        '  <title>%s — Flow Tickets</title>' % e(nome),
        '  <meta name="description" content="%s">' % e(descricao),
        '  <link rel="canonical" href="%s">' % e(url),
        '  <meta property="og:type" content="website">',
        '  <meta property="og:site_name" content="Flow Tickets">',
        '  <meta property="og:url" content="%s">' % e(url),
        '  <meta property="og:title" content="%s — Flow Tickets">' % e(nome),
        '  <meta property="og:description" content="%s">' % e(descricao),
        '  <meta property="og:image" content="%s">' % e(imagem),
        '  <meta name="twitter:card" content="summary_large_image">',
        '  <!--/FLOW-META-->',
    ])


def trocar(modelo, marca, novo):
    ini = modelo.index('<!--%s-->' % marca)
    fim = modelo.index('<!--/%s-->' % marca) + len('<!--/%s-->' % marca)
    return modelo[:ini] + novo + modelo[fim:]


def escrever(caminho, conteudo):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    antigo = None
    if os.path.exists(caminho):
        with open(caminho, encoding='utf-8') as f:
            antigo = f.read()
    if antigo != conteudo:
        with open(caminho, 'w', encoding='utf-8') as f:
            f.write(conteudo)


def main():
    with open(os.path.join(RAIZ, 'evento.html'), encoding='utf-8') as f:
        modelo = f.read()

    req = urllib.request.Request(DOC_URL, headers={'User-Agent': 'flowtickets-paginas'})
    with urllib.request.urlopen(req, timeout=30) as r:
        doc = json.load(r)
    eventos = valor_firestore({'mapValue': doc})['eventos'] or []
    if not eventos:
        # Não apaga as páginas por causa de uma leitura vazia/estranha.
        print('Nenhum evento lido — nada alterado.')
        return 1
    garantir_slugs(eventos)

    escrever(os.path.join(RAIZ, '404.html'), modelo)

    feitos = set()
    for ev in eventos:
        slug = ev['slug']
        dados = json.dumps(ev, ensure_ascii=False).replace('</', '<\\/')
        pagina = trocar(modelo, 'FLOW-META', bloco_meta(ev, slug))
        pagina = trocar(pagina, 'FLOW-DADOS',
                        '<script>window.FLOW_EVENTO_PRE = %s;</script>' % dados)
        escrever(os.path.join(PASTA, slug, 'index.html'), pagina)
        feitos.add(slug)

    # Evento removido do painel: apaga a página (o link passa a cair no 404,
    # que mostra "evento não encontrado").
    if os.path.isdir(PASTA):
        for nome in os.listdir(PASTA):
            if nome not in feitos and os.path.isdir(os.path.join(PASTA, nome)):
                shutil.rmtree(os.path.join(PASTA, nome))

    print('%d páginas de evento geradas.' % len(feitos))
    return 0


if __name__ == '__main__':
    sys.exit(main())
