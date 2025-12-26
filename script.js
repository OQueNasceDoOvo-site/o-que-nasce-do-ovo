/* =========================
   CARROSSEL (cada um independente)
========================= */
function iniciarCarrossel(carrossel) {
  const itens = Array.from(carrossel.querySelectorAll('.carrossel-item'));
  const setaEsq = carrossel.querySelector('.seta.esquerda');
  const setaDir = carrossel.querySelector('.seta.direita');

  // Se o carrossel estiver vazio, desabilita as setas e para
  if (itens.length === 0) {
    if (setaEsq) setaEsq.disabled = true;
    if (setaDir) setaDir.disabled = true;
    return;
  }

  let indice = itens.findIndex(i => i.classList.contains('ativo'));
  if (indice < 0) indice = 0;

  function mostrar(novoIndice) {
    itens.forEach(i => i.classList.remove('ativo'));
    itens[novoIndice].classList.add('ativo');
    indice = novoIndice;
  }

  setaEsq.addEventListener('click', () => {
    mostrar((indice - 1 + itens.length) % itens.length);
  });

  setaDir.addEventListener('click', () => {
    mostrar((indice + 1) % itens.length);
  });

  // Clique na imagem → abre lightbox
  itens.forEach((img, i) => {
    img.addEventListener('click', () => abrirLightbox(itens, i));
  });
}

/* =========================
   LIGHTBOX
========================= */
let lightboxItens = [];
let lightboxIndice = 0;

const lightbox = document.getElementById('lightbox');
const lightboxContent = lightbox.querySelector('.lightbox-content');
const btnVoltar = lightbox.querySelector('.lightbox-voltar');
const setaLbEsq = lightbox.querySelector('.lightbox-seta.esq');
const setaLbDir = lightbox.querySelector('.lightbox-seta.dir');

function abrirLightbox(itens, indice) {
  lightboxItens = itens;
  lightboxIndice = indice;
  mostrarLightbox();
  lightbox.classList.add('ativo');
  lightbox.setAttribute('aria-hidden', 'false');
}

function mostrarLightbox() {
  const original = lightboxItens[lightboxIndice];
  const img = document.createElement('img');
  img.src = original.src;
  img.alt = original.alt || '';

  lightboxContent.innerHTML = '';
  lightboxContent.appendChild(img);
}

btnVoltar.addEventListener('click', () => {
  lightbox.classList.remove('ativo');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxContent.innerHTML = '';
});

setaLbEsq.addEventListener('click', () => {
  lightboxIndice = (lightboxIndice - 1 + lightboxItens.length) % lightboxItens.length;
  mostrarLightbox();
});

setaLbDir.addEventListener('click', () => {
  lightboxIndice = (lightboxIndice + 1) % lightboxItens.length;
  mostrarLightbox();
});

/* =========================
   INICIALIZAÇÃO
========================= */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carrossel-container').forEach(iniciarCarrossel);
});
