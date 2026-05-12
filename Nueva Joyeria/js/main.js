/* ===================================
   MAZAL JOYERÍA – JavaScript Principal
   =================================== */

/* 🟢 CONFIG MONEDA */
const tasaEuroCOP = 4500;

function formatCOP(valor) {
  return `$${valor.toLocaleString('es-CO')}`;
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ── Scroll to top ── */
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) a.style.color = 'var(--gold)';
  });
});

/* =============================================
   CONVERTIR PRECIOS EN HTML
   ============================================= */
function convertirPreciosHTML() {
  document.querySelectorAll('.product-card').forEach(producto => {
    const precioEuro = parseFloat(
      producto.querySelector('.add-to-cart').dataset.price
    );

    const precioCOP = precioEuro * tasaEuroCOP;

    const precioHTML = producto.querySelector('.product-price');
    if (precioHTML) {
      precioHTML.textContent = formatCOP(precioCOP);
    }
  });
}

/* =============================================
   FILTER PRODUCTS
   ============================================= */
const filterBtns   = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeIn 0.4s ease';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* Animación */
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);

/* =============================================
   CARRITO
   ============================================= */
let cart = JSON.parse(localStorage.getItem('mazal_cart') || '[]');

const cartBtn     = document.getElementById('cart-btn');
const cartDrawer  = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart   = document.getElementById('close-cart');
const cartCount   = document.getElementById('cart-count');
const cartItems   = document.getElementById('cart-items');
const cartFooter  = document.getElementById('cart-footer');
const cartTotal   = document.getElementById('cart-total');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

/* Thumbnails */
const thumbGradients = {};

/* Render carrito */
function renderCart() {
  const totalEuro = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCOP = totalEuro * tasaEuroCOP;

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = formatCOP(totalCOP);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty-msg">Tu cesta está vacía.<br>Añade joyas para comenzar.</p>';
    cartFooter.hidden = true;
    return;
  }

  cartFooter.hidden = false;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-thumb"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatCOP(item.price * tasaEuroCOP)}</div>
        <div class="cart-item-qty">
          <button class="qty-dec" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button class="qty-inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">🗑️</button>
    </div>
  `).join('');

  cartItems.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.id, -1));
  });
  cartItems.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.id, +1));
  });
  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('mazal_cart', JSON.stringify(cart));
}

/* Añadir al carrito */
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const { id, name, price } = btn.dataset;
    const existing = cart.find(i => i.id === id);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price: parseFloat(price), qty: 1 });
    }

    saveCart();
    renderCart();
    showToast(`🛍️ "${name}" añadido`);
  });
});

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  convertirPreciosHTML();
  renderCart();
});

/* =============================================
   TOAST
   ============================================= */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/*PAGO VIA WHATSAPP*/
/* =============================================
   CHECKOUT WHATSAPP (COLOMBIA)
   ============================================= */

const telefono = "573116917528"; // tu número sin espacios

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }

  let mensaje = "🛍️ *Pedido Mazal Joyería*%0A%0A";

  let totalEuro = 0;

  cart.forEach(item => {
    const precioCOP = item.price * tasaEuroCOP;
    totalEuro += item.price * item.qty;

    mensaje += `• ${item.name}%0A`;
    mensaje += `  Cantidad: ${item.qty}%0A`;
    mensaje += `  Precio: ${formatCOP(precioCOP)}%0A%0A`;
  });

  const totalCOP = totalEuro * tasaEuroCOP;

  mensaje += `💰 *Total: ${formatCOP(totalCOP)}*%0A%0A`;
  mensaje += "Métodos de pago:%0A";
  mensaje += "• Nequi%0A• Bancolombia%0A%0A";
  mensaje += "📍 Envío o recogida:%0A";

  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(url, '_blank');
});

/* =============================================
   FORMULARIO CONTACTO → WHATSAPP
   ============================================= */

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Completa los campos obligatorios');
      return;
    }

    let texto = `✨ *Mensaje desde la web - Mazal Joyería* \n\n`;
    texto += `👤 Nombre: ${name}\n`;
    texto += `📧 Email: ${email}\n`;
    texto += `📞 Teléfono: ${phone || 'No especificado'}\n\n`;
    texto += `💬 Mensaje:\n${message}`;

    const numero = "573116917528";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');

    contactForm.reset();
    showToast('✅ Abriendo WhatsApp...');
  });
}