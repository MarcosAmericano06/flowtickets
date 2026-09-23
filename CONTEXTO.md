# Contexto — FlowTickets

> Projeto paralelo do Marcos (não tem relação com a PassHub). Landing page + painel para a **FlowTickets**, plataforma de venda de ingressos de um amigo dele. Concorrentes de referência: **Maré Ticket** (mareticket.com.br) e **Repassa Ticket** (repassaticket.com.br).
>
> Última atualização deste arquivo: 05/08/2026.

---

## 1. O que é

Marcos está montando o site e o painel da **FlowTickets**, plataforma de ingressos de um amigo dele. Começou como protótipo (15/07/2026) e, em 29/07/2026, o dono da marca decidiu fazer o site **"pra valer"**.

- **Local:** `vibe.code/flowtickets/` (movido em 29/07/2026 para fora de `codigo.passhub/`, para não misturar com o PassHub).
- **Stack:** HTML único, sem build. Dados dos eventos em `localStorage` do navegador.
- **Arquivos:**
  - `index.html` — a landing/vitrine de eventos (HTML único, renderiza os cards via JS a partir do `localStorage`).
  - `admin.html` — painel da equipe (adicionar/editar/remover eventos, promoters, configs, backup).
  - `eventos.js` — dados e funções compartilhados entre `index.html` e `admin.html`.
  - `.claude/` — config do Claude Code para esse projeto.

---

## 2. Identidade da marca

- **Cores:** fundo escuro com gradiente **roxo → magenta** (+ toques de **laranja**). Confirmadas pelo dono em 29/07.
- **Wordmark:** FLOW branca em CAPS.
- **Tagline:** "Máquina de Distribuição para Entretenimento".
- **Fonte:** geométrica — usei **Archivo** (Google Fonts) como aproximação.
- **Logo:** ainda só existe em print (falta arquivo SVG/PNG).
- **WhatsApp oficial:** **+55 11 97689-2592** (`5511976892592`).
- **Instagram:** **@flowticketss** (instagram.com/flowticketss).
- **Domínio, CNPJ e e-mail:** ainda NÃO existem.
- Operação com ~10–15 eventos rodando.

---

## 3. Referência de estrutura (Maré Ticket)

mareticket.com.br é WordPress + Elementor Pro + Astra + WooCommerce/FooEvents. Estrutura de referência:
- Busca no topo.
- Hero com CTA "Ver Eventos".
- Faixa branca com 3 destaques.
- Botões-filtro (Essa Semana / Réveillon / Carnaval...).
- Vitrine de eventos.

---

## 4. Regras e definições do dono da marca (29/07/2026)

- Esgotado = selo **"SOLD OUT"**.
- Mostrar no site: **preço**, **lote ativo**, **line-up**, **classificação etária** e **regras**.
- **Promoters:** cada um tem link próprio `index.html?p=nome` para rastrear cliques/contatos por promoter. A mensagem do WhatsApp já vai com "(Indicação: nome)".
- **Painel** é usado pela equipe Flow. Login pretendido: `flowtickett@gmail.com` / senha `Sucessoflow00` — **AINDA sem login real**: hoje qualquer um que abrir `admin.html` edita. Login de verdade só na Fase 2, com backend.
- Números que o dono quer acompanhar: entrada/fluxo, quem comprou × quem só entrou, origem do tráfego, comparativo de eventos (qual flyer/festa converte mais).
  - ⚠️ **Limitação real:** a venda fecha no WhatsApp E em plataformas diferentes por evento → o site NÃO sabe "quem comprou" sozinho. Começar medindo **cliques + origem + promoter**; a equipe marca a venda manualmente.
- **Frases de boas-vindas** que o dono mandou (🎟️ "Seja bem-vindo... Conte com a nossa equipe" + 3 variações) parecem ser **resposta automática da equipe / saudação do WhatsApp Business**, não o texto que o cliente envia.
  - ⚠️ **PENDENTE confirmar com o Marcos** onde usar. Por ora, deixei o texto pré-preenchido do cliente como específico do evento.

---

## 5. Plano acordado — 3 fases

1. **Fase 1:** site no ar com preço/lotes/line-up/SOLD OUT/WhatsApp/domínio.
2. **Fase 2:** painel com login + cadastro de eventos/promoters.
3. **Fase 3:** números (acessos/cliques por evento e promoter, origem, comparativo).

⚠️ Fases 2 e 3 **exigem backend + hospedagem + banco de dados**. Hoje é tudo `localStorage` (só no navegador de quem edita).

---

## 6. Estado atual / o que já funciona

- Cards de eventos renderizados via JS a partir do `localStorage`.
- Botão "Comprar" abre o WhatsApp com mensagem pronta e específica do evento.
- Ficha de cada evento com preço (gradiente) + tag de lote, line-up, classificação etária e regras no bloco "Sobre o evento".
- Selo **SOLD OUT** para esgotados.
- **Rastreio por promoter:** link `?p=nome` conta cliques (`flow_cliques_promoter`), mostra faixa de aviso quando o visitante chega por link de promoter, e injeta "(Indicação: nome)" na mensagem do WhatsApp.
- **Admin (`admin.html`):**
  - Resumo (total / à venda / esgotados / cliques em Comprar).
  - Formulário adicionar/editar/remover evento (com campos: preço, lote, idade, line-up, regras).
  - Seção **Promoters** (gera link `?p=nome`) + tabela de **cliques por promoter**.
  - Nº WhatsApp configurável, backup JSON, restaurar padrão.

### Detalhes técnicos de `eventos.js` (reescrito em 29/07)
- Número novo, campos novos (`preco`, `lote`, `idade`, `lineup`, `regras`).
- Rastreio por promoter: `flow_cliques_promoter`, `flowPromoterAtual()` lê `?p=`.
- Mensagem padrão específica do evento.
- Eventos padrão = reais da Maré (Balburdia, Mixed by Mixed, We Make Better Days, Saralina, Ostras Frescas, Rodeio de Itu + Réveillon/Carnaval antigos), com nomes e **flyers reais** (hotlink de mareticket.com.br/wp-content/...). **Data/preço/lote são PLACEHOLDERS** — a equipe ajusta no painel.

---

## 7. Limitações conhecidas / pendências antes de publicar

- **`localStorage`** = dados só existem no navegador de quem edita. Para publicar de verdade, precisa de backend.
- **Sem login real** no admin.
- **Data/preço/lote** dos eventos padrão são placeholders.
- **Imagens** são hotlink dos flyers da Maré/Repassa (Cloudinary) → **trocar por próprias antes de publicar**.
- Confirmar com o Marcos onde usam as **frases de boas-vindas** (item 4).
- Falta arquivo da **logo** (SVG/PNG), **domínio**, **CNPJ** e **e-mail**.

---

## 8. Fontes de dados de eventos (para importar depois)

- **Repassa Ticket** tem **API pública**: `https://repassaticket.com.br/api/events` — retorna JSON com nome, data, cidade, venue, imagem (Cloudinary), `ticket_types`, disponibilidade e descrição. **Melhor fonte** se quiser puxar automático.
- **Maré Ticket** e **Repassa** bloqueiam scraping via WebFetch (403/JS). Consegui eventos da Maré via `curl` com User-Agent de navegador + parse de `og:title`/`og:image` (preço/data/lote NÃO vêm no HTML, são JS).

---

## 9. Histórico

- **15/07/2026:** versão básica criada. Botões "Comprar" abrindo WhatsApp; ícones emoji → SVG; seção "Sobre nós" (manifesto + 4 diferenciais: atendimento humano no WhatsApp, curadoria, compra segura, entrega rápida). Admin criado (`admin.html` + `eventos.js`). Marcos editou por fora (filtros JS + 3 eventos fictícios). Eventos reais importados da Repassa via API (6 eventos com selos de disponibilidade).
- **29/07/2026:** decisão de fazer "pra valer". Pasta movida para `vibe.code/flowtickets/`. `eventos.js`, `index.html` e `admin.html` reescritos com os campos novos, promoters, SOLD OUT, preço/lote/line-up. WhatsApp e IG atualizados.
