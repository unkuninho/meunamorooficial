# Jornal Folheável

Site **estático** que exibe um jornal digital em que cada página é uma imagem, com efeito de folhear realista (curva de página com sombra dinâmica), no mesmo estilo do [AnyFlip](https://anyflip.com/). Em telas largas mostra páginas espalhadas lado a lado (como um livro aberto); em telas estreitas/celular mostra uma página por vez.

O efeito de virar página usa a biblioteca [**StPageFlip**](https://github.com/Nodlik/StPageFlip) (MIT), embutida localmente em `vendor-page-flip.js` — sem CDN, sem dependência externa.

**Não precisa rodar nada.** Coloque as imagens na pasta e dê duplo clique no `index.html`.

## Especificação da arte (tamanho das páginas)

- **Dimensão:** 1240 × 1754 px (retrato, proporção A4)
- **Formato:** `.jpg`, `.png` ou `.webp`
- **Resolução:** pensada para tela (não para impressão). Se quiser imprimir depois, recrie em 300dpi (2480 × 3508 px) mantendo a mesma proporção.

## Como nomear e organizar os arquivos

Coloque as imagens direto na mesma pasta do `index.html`, nomeadas assim:

```
page-01.jpg   ← capa
page-02.jpg
page-03.jpg
...
page-NN.jpg   ← contracapa (a última imagem sempre é a contracapa)
```

- Use sempre 2 dígitos (ou mais, se passar de 99 páginas) para manter a ordem correta.
- O site abre a pasta, tenta carregar `page-01`, `page-02`, `page-03`... (testando as extensões jpg/jpeg/png/webp) e para automaticamente na primeira que não existir — o número de páginas é sempre igual à quantidade de imagens que estiverem lá.
- É preciso de no mínimo 2 imagens (capa + contracapa).
- Não pode pular números (ex.: ter `page-01` e `page-03` sem `page-02`) — a busca para no primeiro número que faltar.

## Como usar

1. Coloque as imagens `page-01.jpg`, `page-02.jpg`, ... na pasta.
2. Dê duplo clique em **index.html**. Pronto — abre no navegador e já funciona.

Sempre que adicionar, remover ou renomear imagens, é só recarregar a página (F5).

### Publicar online

Como o site é 100% estático (HTML/CSS/JS + imagens), basta subir a pasta inteira em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, S3, etc.). Nenhum backend é necessário.

### Servidor local (opcional)

Isso só existe caso você prefira testar via `http://` em vez de `file://` (por exemplo, para simular exatamente como ficaria hospedado). Não é obrigatório:
```
node server.js
```
(ou `npm start`) e abra `http://localhost:8080`.

## Navegação no site

- **Arraste o canto/ponta da página** para curvá-la e virar, ou dê um clique/toque rápido perto da borda — igual ao AnyFlip.
- Setas `←` `→` do teclado.
- Funciona com toque em celular/tablet (swipe).
- Barra inferior com atalho para capa, contracapa e um slider para pular direto para qualquer página.
