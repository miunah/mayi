# Relatório de Conversão — Mayinab Web

**Data:** 16 de fevereiro de 2026  
**Objetivo:** Identificar oportunidades para aumentar a taxa de conversão (downloads do app) no site mayinab.com.

---

## 1. Resumo Executivo

O site do Mayinab é bem estruturado, com boa cobertura SEO, blog extenso com 80+ artigos, e uma landing page rica em features. Porém, existem **gargalos claros de conversão** que estão provavelmente impedindo visitantes de baixar o app. Este relatório mapeia os principais problemas e propõe ações concretas.

---

## 2. Pontos Fortes Atuais

- **Blog SEO-first massivo**: ~90 artigos cobrindo concursos, vestibular, alternativas a apps concorrentes, técnicas de estudo. Excelente para tráfego orgânico.
- **Bilíngue (EN/PT)**: Toda a landing page e blog estão traduzidos.
- **Proposta de valor clara**: "Study notes reimagined as chat" é memorável e diferenciadora.
- **Tabela comparativa forte**: Comparação com Discord, WhatsApp, Notion e Anki mostra superioridade visual.
- **Structured data / Schema.org**: Bem implementado para SoftwareApplication e FAQPage.
- **Zero-friction messaging**: "No account required", "No ads ever", "100% offline" são argumentos poderosos.

---

## 3. Problemas Críticos de Conversão

### 3.1. Falta de Prova Social
**Impacto: ALTO**

O site **não tem nenhum indicador de tração**:
- Zero depoimentos ou reviews de usuários
- Sem contagem de downloads
- Sem rating da Play Store / stars
- Sem menções de comunidade ou redes sociais
- Sem logos de instituições ou embaixadores

**Recomendação:**
- Adicionar seção "What students say" com 3-5 depoimentos reais (mesmo que de beta testers)
- Puxar e exibir a nota da Play Store automaticamente (ou manualmente)
- Mostrar contagem de downloads (ex: "5,000+ students studying with Mayinab")
- Adicionar um badge "Open Beta on Google Play" com ícone oficial

### 3.2. CTAs do Blog Fracos e Genéricos
**Impacto: ALTO**

Cada artigo do blog termina com um CTA genérico como:
> "Download Mayinab for free."

Problemas:
- Não há **CTA flutuante/sticky** visível durante a leitura
- O CTA final leva ao `/#download`, que joga o leitor para outra página e região
- Não existe **inline CTA** no meio do artigo, onde o engajamento é mais alto
- Artigos longos (10-14 min) perdem a atenção antes do CTA final

**Recomendação:**
- Inserir um **CTA inline** após ~40% do artigo (ex: box com screenshot + "Try Mayinab Free")
- Adicionar **banner sticky no topo ou bottom** do blog ("Download Mayinab — Free, Offline, No Ads → ⬇")
- CTAs específicos por contexto do artigo (ex: artigo sobre Anki → "Import your Anki decks in 30 seconds")
- Incluir links diretos para Play Store / download, e não apenas para `/#download`

### 3.3. Seção de Download com Plataformas "Coming Soon"
**Impacto: ALTO**

Na seção de download:
- **macOS**: Coming Soon
- **iOS**: Coming Soon
- Android está em **Open Beta**

Isso causa 3 problemas:
1. Visitantes de Mac/iPhone (público premium) **não podem converter** — e não há alternativa
2. "Coming Soon" sem data parece abandonware
3. "Open Beta" pode passar insegurança para quem busca estabilidade

**Recomendação:**
- Para iOS/macOS: trocar "Coming Soon" por data estimada (ex: "Q2 2026") ou "Join waitlist"
- Mover o formulário de notificação iOS para mais perto da seção de download (hoje está separado)
- Considerar trocar "Open Beta" por "Free on Google Play" — beta soa instável
- Adicionar badge/link direto do Google Play com ícone oficial (imagem "Get it on Google Play")

### 3.4. Hero Stats São Abstratos
**Impacto: MÉDIO**

As stats do hero são:
> 7 Note types · 5 Platforms · ∞ Offline use · 0 Ads

"7 note types" e "5 platforms" são features, não resultados. Não geram emoção nem urgência. "∞ Offline use" é confuso.

**Recomendação:**
- Trocar por métricas de tração ou impacto: "5,000+ downloads", "4.8★ rating", "60+ features", "0 ads, ever"
- Se não houver métricas ainda, usar stats voltados ao benefício: "< 30s to start studying", "Works on 5 platforms", "0 accounts needed"

### 3.5. Ausência de Vídeo Demo / GIF Animado
**Impacto: MÉDIO-ALTO**

O hero usa um **mockup estático em CSS puro** (phone-mockup com HTML). Não há:
- Vídeo demonstrativo do app
- GIF animado mostrando o fluxo real
- Screenshots interativas (carrossel clicável)

O mockup CSS é bonito, mas não mostra o produto real. O visitante não tem confiança de como o app funciona.

**Recomendação:**
- Criar um **GIF/vídeo curto (15-30s)** mostrando: criar nota → criar flashcard → revisar com SRS
- Colocar no hero ou logo abaixo como seção "See it in action"
- A seção de screenshots existe, mas usa imagens estáticas que não mostram o *fluxo* — poderia virar um carrossel interativo

### 3.6. Página de Download do Windows Perde Conversões
**Impacto: MÉDIO**

A página [thanks.html](thanks.html) (pós-download Windows):
- Está toda em português hardcoded (`lang="pt"`)
- Mostra warning do SmartScreen que pode **assustar** o usuário
- Não tem link para Play Store / outras plataformas
- Não incentiva nenhuma ação secundária (ex: deixar review, seguir newsletter, instalar no celular também)

**Recomendação:**
- Tornar bilíngue como o resto do site
- Reformular o warning do SmartScreen com tom positivo: "Why Windows shows a warning (and why it's safe)"
- Adicionar after-download CTAs: "Also on Android?" + link Play Store; "Join our community"
- Adicionar tracking de download bem-sucedido (evento de conversão)

---

## 4. Problemas Secundários

### 4.1. Blog Não Tem Sidebar com CTA
Todos os artigos do blog usam layout full-width sem sidebar. Em desktop, uma **sidebar fixa com CTA de download** + screenshot é uma oportunidade de conversão visual constante durante a leitura.

### 4.2. Sem Urgência ou Escassez
O site não cria nenhum senso de urgência:
- Sem "limited beta spots"
- Sem "new features this week"
- Sem changelog/update recente visível na home

**Recomendação:** Adicionar um badge tipo "🆕 v1.0.6 — Scribble Pad, Video Flashcards" na home, linkando para changelog. Mostra que o projeto é ativo.

### 4.3. Sem Presença em Redes Sociais
O footer e o site não linkam para nenhuma rede social:
- Sem Twitter/X, Reddit, Discord, YouTube, Instagram
- Sem comunidade onde potenciais usuários poderiam se engajar

**Recomendação:** Criar pelo menos um canal (Discord community ou subreddit) e linkar no footer + blog.

### 4.4. FAQ Não Responde a Objeções de Conversão
O FAQ atual foca em features técnicas. Falta responder objeções comuns pré-download:
- "É seguro instalar?" (especialmente no Windows com SmartScreen)
- "Como é comparado ao Anki para quem já usa?"
- "Meus dados ficam presos no app?"
- "E se o projeto parar de ser mantido?"

### 4.5. Todos os Artigos do Blog Têm a Mesma Data
Todos os artigos mostram "Feb 13/15, 2026". Isso indica que foram todos publicados de uma vez, o que:
- Parece artificial/gerado em massa para Google
- Não mostra atividade contínua do blog
- Prejudica re-crawling e freshness no SEO

**Recomendação:** Distribuir datas ao longo do tempo, mesmo retroativamente. Publicar novos artigos regularmente (1-2/semana) e atualizar os existentes.

### 4.6. Related Articles com Bugs
No artigo [blog/anki-alternative.html](blog/anki-alternative.html), a seção "Related Articles" mostra nomes de arquivo raw como título:
> `flashcard-app-windows.html`

Em vez do título real do artigo. Isso prejudica cliques em artigos relacionados.

---

## 5. Funil de Conversão — Análise por Etapa

```
Visitante Orgânico (blog/SEO)
    │
    ├── Lê artigo (80+ artigos cobrindo keywords)        ✅ Bom
    │       │
    │       └── CTA no final do artigo → /#download       ⚠️ Fraco
    │               │
    │               └── Seção de download na home          ⚠️ Fricção alta
    │                       │
    │                       ├── Android: Play Store link    ✅ OK
    │                       ├── Windows: thanks.html        ⚠️ SmartScreen scare
    │                       ├── Linux: AppImage direto      ✅ OK
    │                       ├── macOS: Coming Soon           ❌ Sem conversão
    │                       └── iOS: Coming Soon             ❌ Sem conversão
    │
Visitante Direto (home)
    │
    ├── Hero: "Download Free" → #download                  ✅ Bom
    ├── Features, Screenshots, Comparison                  ✅ Bom
    └── CTA final: "Ready to study smarter?"               ⚠️ Genérico
```

---

## 6. Top 10 Ações por Prioridade

| # | Ação | Impacto | Esforço |
|---|------|---------|---------|
| 1 | Adicionar prova social (depoimentos, contagem downloads, rating Play Store) | 🔴 Alto | Médio |
| 2 | Inserir CTAs inline e sticky nos artigos do blog | 🔴 Alto | Baixo |
| 3 | Criar vídeo demo / GIF do app em ação (15-30s) | 🔴 Alto | Médio |
| 4 | Trocar "Coming Soon" por waitlist com data estimada (iOS/macOS) | 🟡 Médio | Baixo |
| 5 | Mudar "Open Beta" para "Free on Google Play" + badge oficial | 🟡 Médio | Baixo |
| 6 | Adicionar badge de versão recente na home ("New in v1.0.6") | 🟡 Médio | Baixo |
| 7 | Corrigir thanks.html: tornar bilíngue + melhorar tom do SmartScreen | 🟡 Médio | Baixo |
| 8 | Corrigir títulos broken nos "Related Articles" do blog | 🟢 Baixo | Baixo |
| 9 | Criar canal de comunidade (Discord/Reddit) e linkar no site | 🟡 Médio | Médio |
| 10 | Distribuir datas dos artigos do blog e iniciar cadência regular | 🟡 Médio | Baixo |

---

## 7. Conclusão

O site Mayinab tem uma base técnica sólida e excelente cobertura de conteúdo SEO. O que falta para converter mais visitantes em downloads são: **prova social**, **CTAs estrategicamente posicionados**, e **demonstração visual do produto real**. As 3 primeiras ações da tabela acima têm o maior potencial de impacto e devem ser priorizadas imediatamente.

O produto é forte — o site precisa refletir isso com mais confiança, evidência e urgência.
