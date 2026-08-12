(async function () {
  const status = document.getElementById('status');
  const pagesEl = document.getElementById('pages');

  function setStatus(msg) {
    status.textContent = msg;
    status.style.display = msg ? 'block' : 'none';
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
      'Coloque "page-01.jpg", "page-02.jpg", ... (1240x1754px) na mesma pasta do index.html\n' +
      '(no mínimo 2: capa + contracapa) e recarregue a página.'
    );
    return;
  }

  setStatus('');

  list.forEach((src, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'page';

    const img = document.createElement('img');
    img.src = src;
    img.alt = i === 0 ? 'Capa' : i === list.length - 1 ? 'Contracapa' : `Página ${i + 1}`;
    img.loading = i < 2 ? 'eager' : 'lazy';
    wrap.appendChild(img);

    pagesEl.appendChild(wrap);
  });
})();
