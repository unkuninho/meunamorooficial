# Jornal

Site **estático** e simples: mostra as páginas do jornal em sequência, cada
uma como uma imagem de **1240×1754px**, de cima pra baixo, como se você
estivesse rolando pelo jornal.

**Não precisa rodar nada.** Coloque as imagens na pasta e dê duplo clique no `index.html`.

## Especificação da arte

- **Dimensão:** 1240 × 1754 px (retrato, proporção A4)
- **Formato:** `.jpg`, `.png` ou `.webp`

## Como nomear os arquivos

Coloque as imagens direto na mesma pasta do `index.html`, nomeadas assim:

```
page-01.jpg   ← capa
page-02.jpg
page-03.jpg
...
page-NN.jpg   ← contracapa (a última imagem sempre é a contracapa)
```

- Use sempre 2 dígitos (ou mais, se passar de 99 páginas).
- O site tenta carregar `page-01`, `page-02`, `page-03`... (testando jpg/jpeg/png/webp) e para automaticamente na primeira que não existir — o número de páginas é sempre igual à quantidade de imagens que estiverem lá.
- É preciso de no mínimo 2 imagens (capa + contracapa).
- Não pode pular números (ex.: ter `page-01` e `page-03` sem `page-02`).

## Como usar

1. Coloque as imagens `page-01.jpg`, `page-02.jpg`, ... na pasta.
2. Dê duplo clique em **index.html**.

Sempre que adicionar, remover ou renomear imagens, é só recarregar a página (F5).

## Publicar online

Como o site é só HTML/CSS/JS + imagens, basta subir a pasta inteira em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, etc.). Nenhum backend é necessário.
