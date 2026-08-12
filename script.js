(async function () {
  const bookEl = document.getElementById('book');
  const bookScaleEl = document.getElementById('bookScale');
  const bookWrapEl = document.querySelector('.book-wrap');
  const status = document.getElementById('status');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const firstBtn = document.getElementById('firstBtn');
  const lastBtn = document.getElementById('lastBtn');
  const slider = document.getElementById('pageSlider');
  const pageNumEl = document.getElementById('pageNum');
  const pageTotalEl = document.getElementById('pageTotal');

  function setStatus(msg) {
    status.textContent = msg;
    status.style.display = msg ? 'flex' : 'none';
  }

  // Detecta as imagens sozinho, tentando carregar page-01, page-02, ...
  // até não achar mais nenhuma. Não precisa rodar nada nem gerar manifesto.
  const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
  const MAX_PAGES = 500;

  function tryLoad(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function detectPages() {
    const found = [];
    for (let n = 1; n <= MAX_PAGES; n++) {
      const num = String(n).padStart(2, '0');
      let hit = null;
      for (const ext of EXTENSIONS) {
        const src = `page-${num}.${ext}`;
        try {
          await tryLoad(src);
          hit = src;
          break;
        } catch (e) { /* extensão não existe, tenta a próxima */ }
      }
      if (!hit) break;
      found.push(hit);
    }
    return found;
  }

  const list = await detectPages();

  if (list.length < 2) {
    setStatus(
      'Nenhuma imagem encontrada.\n' +
      'Coloque "page-01.jpg", "page-02.jpg", ... na mesma pasta do index.html\n' +
      '(no mínimo 2: capa + contracapa) e recarregue a página.'
    );
    return;
  }

  setStatus('');

  // === Motor de flip: StPageFlip (mesmo tipo de curva/curvatura do AnyFlip) ===
  // Tamanho fixo em pixels (nítido) + escala via CSS transform calculada em JS,
  // assim o livro sempre cabe na tela disponível, sem depender do cálculo
  // "stretch" da própria lib (que deriva a altura da largura e pode estourar
  // em janelas baixas).
  const PAGE_W = 1000;
  const PAGE_H = 1414; // mantém a proporção 1240×1754 da arte

  const pageFlip = new St.PageFlip(bookEl, {
    width: PAGE_W,
    height: PAGE_H,
    size: 'fixed',
    showCover: true,       // 1ª e última imagem viram capa/contracapa "duras"
    usePortrait: true,     // telas estreitas mostram 1 página; telas largas, espalhado
    mobileScrollSupport: true,
    flippingTime: 700,
    maxShadowOpacity: 0.6,
  });

  pageFlip.loadFromImages(list);

  // A lib sempre define #book com width:100% (esticando pro container) assim
  // que é construída. Sobrescrevemos logo em seguida com um tamanho nativo
  // fixo (nítido) e usamos CSS transform para encaixar no espaço disponível —
  // assim ela nunca estoura a altura da tela nem depende do cálculo "stretch".
  function applySize() {
    const availW = bookWrapEl.clientWidth;
    const availH = bookWrapEl.clientHeight;

    // decide manualmente se cabe página dupla (espalhado) ou só uma página
    const singleAspect = PAGE_W / PAGE_H;
    const wantsSpread = availW / availH > singleAspect * 1.15;
    const totalW = wantsSpread ? PAGE_W * 2 : PAGE_W;

    bookEl.style.width = totalW + 'px';
    bookEl.style.minWidth = PAGE_W + 'px';
    bookEl.style.maxWidth = (PAGE_W * 2) + 'px';

    const scale = Math.min(availW / totalW, availH / PAGE_H);
    bookEl.style.transform = `scale(${scale})`;
    bookScaleEl.style.width = (totalW * scale) + 'px';
    bookScaleEl.style.height = (PAGE_H * scale) + 'px';

    pageFlip.update();
  }

  function updateUI(pageIndex) {
    const total = pageFlip.getPageCount();
    pageNumEl.textContent = String(pageIndex + 1);
    pageTotalEl.textContent = String(total);
    slider.max = String(total);
    slider.value = String(pageIndex + 1);
    prevBtn.disabled = pageIndex <= 0;
    nextBtn.disabled = pageIndex >= total - 1;
    firstBtn.disabled = pageIndex <= 0;
    lastBtn.disabled = pageIndex >= total - 1;
  }

  applySize();

  pageFlip.on('init', (e) => { applySize(); updateUI(e.data.page); });
  pageFlip.on('flip', (e) => updateUI(e.data));
  window.addEventListener('resize', applySize);

  nextBtn.addEventListener('click', () => pageFlip.flipNext());
  prevBtn.addEventListener('click', () => pageFlip.flipPrev());
  firstBtn.addEventListener('click', () => pageFlip.turnToPage(0));
  lastBtn.addEventListener('click', () => pageFlip.turnToPage(pageFlip.getPageCount() - 1));
  slider.addEventListener('change', () => pageFlip.turnToPage(parseInt(slider.value, 10) - 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') pageFlip.flipNext();
    if (e.key === 'ArrowLeft') pageFlip.flipPrev();
  });
})();
