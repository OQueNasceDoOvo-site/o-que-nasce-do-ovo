function iniciarCarrossel(container) {
  const items = Array.from(container.querySelectorAll('.carrossel-item'));
  const btnEsq = container.querySelector('.seta.esquerda');
  const btnDir = container.querySelector('.seta.direita');

  if (items.length === 0) return;

  let idx = items.findIndex(el => el.classList.contains('ativo'));
  if (idx < 0) idx = 0;

  function mostrar(i) {
    items.forEach(el => el.classList.remove('ativo'));
    items[i].classList.add('ativo');
    idx = i;
  }

  btnEsq.addEventListener('click', () => {
    mostrar((idx - 1 + items.length) % items.length);
  });

  btnDir.addEventListener('click', () => {
    mostrar((idx + 1) % items.length);
  });
}

function alternarDupla(duplaId) {
  // botões
  document.querySelectorAll('.btn-dupla').forEach(btn => {
    const ativo = btn.dataset.dupla === duplaId;
    btn.classList.toggle('ativo', ativo);
    btn.setAttribute('aria-selected', ativo ? 'true' : 'false');
  });

  // carrosseis
  document.querySelectorAll('.carrossel-container').forEach(c => {
    const mostrar = c.dataset.dupla === duplaId;
    c.classList.toggle('escondido', !mostrar);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carrossel-container').forEach(iniciarCarrossel);

  document.querySelectorAll('.btn-dupla').forEach(btn => {
    btn.addEventListener('click', () => alternarDupla(btn.dataset.dupla));
  });
});
