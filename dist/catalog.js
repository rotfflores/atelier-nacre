const careProducts = [
  {id:'cuticle-oil',name:'Elixir de cutículas',tag:'NUTRE TU RITUAL',size:'15 ml',price:220,kind:'dropper',color:'#d9b989',description:'Un aceite de textura ligera para acompañar el cuidado diario de tus uñas y cutículas.',use:'Aplica una gota sobre cada cutícula y masajea suavemente. Ideal como último paso de tu rutina de manos.'},
  {id:'hand-cream',name:'Crema de manos velouté',tag:'UNA PAUSA DE SUAVIDAD',size:'50 ml',price:280,kind:'tube',color:'#cdb5b3',description:'Una crema de manos de acabado suave, pensada para llevar en tu bolsa y usar a lo largo del día.',use:'Aplica una pequeña cantidad sobre las manos limpias y masajea hasta que se absorba. Repite cuando lo necesites.'},
  {id:'nail-serum',name:'Sérum nail glow',tag:'EL DETALLE FINAL',size:'12 ml',price:320,kind:'bottle',color:'#b4b8a3',description:'Un sérum de cuidado para completar tu ritual de uñas naturales con un brillo sutil.',use:'Aplica una capa fina sobre las uñas naturales limpias y secas. Sigue las indicaciones del producto definitivo.'},
  {id:'hand-scrub',name:'Exfoliante soft touch',tag:'TU SPA, EN CASA',size:'100 g',price:350,kind:'jar',color:'#c6a18b',description:'Un exfoliante de textura cremosa para convertir el cuidado de tus manos en un pequeño ritual.',use:'Masajea suavemente sobre manos húmedas y enjuaga. Completa tu rutina con crema de manos.'},
  {id:'glass-file',name:'Lima de cristal',tag:'PEQUEÑOS BÁSICOS',size:'Con estuche protector',price:180,kind:'file',color:'#b7b4c7',description:'Una lima de cristal con estuche para acompañarte y mantener la forma de tus uñas entre visitas.',use:'Lima con movimientos suaves, siguiendo la forma de tu uña. Limpia y guarda en su estuche después de usarla.'},
  {id:'ritual-kit',name:'Kit everyday care',tag:'UN REGALO PARA TI',size:'Aceite + crema + lima',price:590,kind:'kit',color:'#b39b83',description:'Nuestros esenciales reunidos en una caja: aceite de cutículas, crema de manos y lima de cristal.',use:'Da forma a tus uñas, hidrata tus manos y termina con un masaje de aceite sobre las cutículas.'}
];
const productGrid = document.querySelector('#product-grid');
if (productGrid) productGrid.innerHTML = careProducts.map(product => `<article class="product-card"><button class="product-visual" data-product="${product.id}" aria-label="Ver ${product.name}"><img src="assets/product-${product.id}.svg" alt="Presentación ilustrativa de ${product.name}" width="600" height="500" loading="lazy"><span class="product-expand">${NacreIcons('arrow-up-right')}</span></button><div class="product-meta"><p class="eyebrow">${product.tag}</p><h3>${product.name}</h3><p class="product-size">${product.size}</p><div class="product-bottom"><span>${money(product.price)} <small>MXN</small></span><button class="text-link" data-product="${product.id}">Ver producto <span>${NacreIcons('arrow-up-right')}</span></button></div></div></article>`).join('');
const productDialog = document.querySelector('#product-dialog');
let currentProduct = null;
document.addEventListener('click', event => {
  const button = event.target.closest('[data-product]');
  if (!button) return;
  currentProduct = careProducts.find(product => product.id === button.dataset.product);
  document.querySelector('#product-title').textContent = currentProduct.name;
  document.querySelector('#product-description').textContent = currentProduct.description;
  document.querySelector('#product-use').textContent = currentProduct.use;
  document.querySelector('#product-price').textContent = `${money(currentProduct.price)} MXN`;
  document.querySelector('#product-size').textContent = currentProduct.size;
  const image = document.querySelector('#product-image');
  image.src = `assets/product-${currentProduct.id}.svg`; image.alt = `Presentación ilustrativa de ${currentProduct.name}`;
  NacreMotion.openDialog(productDialog);
});
document.querySelector('#product-add-note').addEventListener('click', async () => {
  if (!currentProduct) return;
  const notes = document.querySelector('#booking-notes');
  const note = `Me interesa conocer el producto: ${currentProduct.name}.`;
  if (!notes.value.includes(note)) notes.value = [notes.value.trim(),note].filter(Boolean).join('\n').slice(0,500);
  await NacreMotion.closeDialog(productDialog);
  openBooking();
  notes.focus();
});
