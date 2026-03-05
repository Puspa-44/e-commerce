'use strict';
/* =============================================
   KITZONE — script.js
   Payment flow: Details → Method → Send → Place Order
   NO transaction ID required
============================================= */

const PRODUCTS = [
  { id:8,  img:'assets/1.jpg',  club:'Real Madrid',       name:'Home Jersey 2024/25',  player:'Benzema #9',     price:3800, oldPrice:4500, league:'laliga',   badge:'Best Seller', badgeClass:'gold', featured:true,  sizes:['S','M','L','XL','XXL'], desc:'Real Madrid classic all-white home jersey 2024/25. Hala Madrid!' },
  { id:9,  img:'assets/2.jpg',  club:'Real Madrid',       name:'Away Jersey 2024/25',  player:'Modric #10',     price:3800, oldPrice:4500, league:'laliga',   badge:'',            badgeClass:'',     featured:false, sizes:['S','M','L','XL','XXL'], desc:'Real Madrid 2024/25 away kit. Modric edition.' },
  { id:1,  img:'assets/3.jpg',  club:'Real Madrid',       name:'Third Jersey 2024/25', player:'Vinicius #7',    price:3600, oldPrice:4200, league:'laliga',   badge:'New',         badgeClass:'new',  featured:false, sizes:['S','M','L','XL'],       desc:'Real Madrid third kit 2024/25.' },
  { id:10, img:'assets/4.jpg',  club:'FC Barcelona',      name:'Home Jersey 2024/25',  player:'Lewandowski #9', price:3700, oldPrice:4400, league:'laliga',   badge:'Hot',         badgeClass:'',     featured:true,  sizes:['S','M','L','XL','XXL'], desc:'FC Barcelona blaugrana home jersey 2024/25. Visca el Barça!' },
  { id:11, img:'assets/5.jpg',  club:'FC Barcelona',      name:'Away Jersey 2024/25',  player:'Pedri #8',       price:3700, oldPrice:4400, league:'laliga',   badge:'',            badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'FC Barcelona 2024/25 away kit.' },
  { id:12, img:'assets/6.jpg',  club:'Portugal',          name:'Home Jersey 2024',     player:'Ronaldo #7',     price:3500, oldPrice:4200, league:'national', badge:'Legend',      badgeClass:'gold', featured:true,  sizes:['S','M','L','XL','XXL'], desc:'Portugal national team home jersey 2024. CR7 edition!' },
  { id:13, img:'assets/7.jpg',  club:'Portugal',          name:'Home Jersey 2024',     player:'B.Fernandes #8', price:3200, oldPrice:3900, league:'national', badge:'',            badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'Portugal national team 2024. Bruno Fernandes edition.' },
  { id:14, img:'assets/8.jpg',  club:'Brazil',            name:'Home Jersey 2024',     player:'Neymar #10',     price:3500, oldPrice:4200, league:'national', badge:'Fan Fav',     badgeClass:'gold', featured:false, sizes:['S','M','L','XL','XXL'], desc:'Brazil canarinha home jersey 2024. Neymar Jr. edition!' },
  { id:15, img:'assets/9.jpg',  club:'Brazil',            name:'Home Jersey 2024',     player:'Vinicius #9',    price:3400, oldPrice:4000, league:'national', badge:'New',         badgeClass:'new',  featured:false, sizes:['S','M','L','XL'],       desc:'Brazil 2024 home kit. Vinicius Jr. edition!' },
  { id:16, img:'assets/10.jpg', club:'Manchester United', name:'Home Jersey 2024/25',  player:'Rashford #10',   price:3500, oldPrice:4200, league:'epl',      badge:'Popular',     badgeClass:'',     featured:false, sizes:['S','M','L','XL','XXL'], desc:'Manchester United 2024/25 home jersey.' },
  { id:17, img:'assets/11.jpg', club:'Manchester United', name:'Home Jersey 2024/25',  player:'Mount #7',       price:3300, oldPrice:4000, league:'epl',      badge:'',            badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'Man United 2024/25 home kit. Mount edition.' },
  { id:18, img:'assets/12.jpg', club:'Manchester City',   name:'Home Jersey 2024/25',  player:'De Bruyne #17',  price:3600, oldPrice:4300, league:'epl',      badge:'Champions',   badgeClass:'gold', featured:false, sizes:['S','M','L','XL','XXL'], desc:'Man City sky blue home jersey 2024/25.' },
  { id:19, img:'assets/13.jpg', club:'Manchester City',   name:'Home Jersey 2024/25',  player:'Haaland #9',     price:3700, oldPrice:4400, league:'epl',      badge:'Hot',         badgeClass:'',     featured:false, sizes:['S','M','L','XL','XXL'], desc:'Man City 2024/25. Haaland edition!' },
  { id:20, img:'assets/16.jpg', club:'Arsenal FC',        name:'Home Jersey 2024/25',  player:'Saka #7',        price:3400, oldPrice:4000, league:'epl',      badge:'',            badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'Arsenal classic red 2024/25 home jersey.' },
  { id:21, img:'assets/17.jpg', club:'Arsenal FC',        name:'Home Jersey 2024/25',  player:'Jesus #9',       price:3300, oldPrice:3900, league:'epl',      badge:'Sale',        badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'Arsenal 2024/25. Gabriel Jesus edition.' },
  { id:22, img:'assets/14.jpg', club:'Nepal 🇳🇵',         name:'Home Jersey 2024',     player:'Bista #10',      price:2200, oldPrice:2800, league:'national', badge:'Local Pride', badgeClass:'new',  featured:true,  sizes:['S','M','L','XL','XXL'], desc:'Nepal national football team home jersey 2024. Represent your nation!' },
  { id:23, img:'assets/15.jpg', club:'Nepal 🇳🇵',         name:'Away Jersey 2024',     player:'Tamang #9',      price:2000, oldPrice:2600, league:'national', badge:'',            badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'Nepal away jersey 2024. Wear with pride!' },
  { id:24, img:'assets/18.jpg', club:'PSG',               name:'Home Jersey 2024/25',  player:'Mbappe #7',      price:3900, oldPrice:4800, league:'others',   badge:'Limited',     badgeClass:'gold', featured:false, sizes:['M','L','XL','XXL'],     desc:'PSG 2024/25 home jersey. Mbappe last edition!' },
  { id:25, img:'assets/19.jpg', club:'PSG',               name:'Away Jersey 2024/25',  player:'Asensio #10',    price:3600, oldPrice:4300, league:'others',   badge:'New',         badgeClass:'new',  featured:false, sizes:['S','M','L','XL','XXL'], desc:'PSG 2024/25. Marco Asensio edition!' },
  { id:2,  img:'assets/20.jpg', club:'Chelsea FC',        name:'Home Jersey 2024',     player:'Jackson #9',     price:3200, oldPrice:3800, league:'epl',      badge:'Sale',        badgeClass:'',     featured:false, sizes:['S','M','L','XL'],       desc:'Chelsea FC 2024/25 home kit. Blue is the color!' },
  { id:3,  img:'assets/21.jpg', club:'Juventus',          name:'Home Jersey 2024',     player:'Vlahovic #10',   price:3100, oldPrice:3800, league:'serie-a',  badge:'Classic',     badgeClass:'',     featured:false, sizes:['S','M','L','XL','XXL'], desc:'Juventus iconic black & white stripes 2024/25.' }
];

// ─── PAYMENT CONFIG ───
// आफ्नो actual number र MPIN यहाँ राख्नुस्
const PAYMENT = {
  esewa:  { number: '98XXXXXXXX', name: 'eSewa',  logo: '💚', mpin: '****' },
  khalti: { number: '98XXXXXXXX', name: 'Khalti', logo: '💜', mpin: '****' }
};

// ─── STATE ───
let cart          = JSON.parse(localStorage.getItem('kitzone_cart')   || '[]');
let orders        = JSON.parse(localStorage.getItem('kitzone_orders') || '[]');
let currentFilter = 'all';
let currentSearch = '';
let activeMethod  = 'esewa';

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderShop();
  updateCartUI();
  bindEvents();
  animateOnScroll();
});

// ─── RENDER ───
function renderFeatured() {
  const g = document.getElementById('featuredGrid');
  g.innerHTML = PRODUCTS.filter(p => p.featured).map(p => card(p, true)).join('');
  bindCardEvents(g);
}

function renderShop() {
  const g = document.getElementById('shopGrid');
  const list = PRODUCTS.filter(p => {
    const mF = currentFilter === 'all' || p.league === currentFilter;
    const mS = [p.club, p.name, p.player].join(' ').toLowerCase().includes(currentSearch);
    return mF && mS;
  });
  if (!list.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)"><div style="font-size:48px">🔍</div><p style="margin-top:12px">No jerseys found.</p></div>`;
    return;
  }
  g.innerHTML = list.map(p => card(p, false)).join('');
  bindCardEvents(g);
}

function card(p, featured) {
  const disc = Math.round((1 - p.price / p.oldPrice) * 100);
  return `
  <div class="product-card${featured ? ' featured' : ''}" data-id="${p.id}">
    <div class="card-img-wrap">
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
      ${p.badge ? `<span class="card-badge ${p.badgeClass}">${p.badge}</span>` : ''}
      <span class="card-discount-tag">-${disc}%</span>
      <div class="card-quick-view">Quick View 👁</div>
    </div>
    <div class="card-body">
      <div class="card-club">${p.club}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-player">${p.player}</div>
      <div class="card-bottom">
        <div>
          <div class="card-price">Rs ${p.price.toLocaleString()}</div>
          <div class="card-old-price">Rs ${p.oldPrice.toLocaleString()}</div>
        </div>
        <button class="card-add-btn" data-id="${p.id}">🛒 Add</button>
      </div>
    </div>
  </div>`;
}

function bindCardEvents(grid) {
  grid.querySelectorAll('.card-add-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      quickAddToCart(parseInt(this.dataset.id), this);
    });
  });
  grid.querySelectorAll('.product-card').forEach(c => {
    c.addEventListener('click', function(e) {
      if (e.target.closest('.card-add-btn')) return;
      openProductModal(parseInt(this.dataset.id));
    });
  });
}

// ─── QUICK VIEW ───
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const disc = Math.round((1 - p.price / p.oldPrice) * 100);

  document.getElementById('modalInner').innerHTML = `
    <div class="modal-img-wrap"><img src="${p.img}" alt="${p.name}"/></div>
    <div class="modal-info">
      <div class="card-club">${p.club}</div>
      <h2>${p.name}</h2>
      <div class="player-tag">👕 ${p.player}</div>
      <div class="modal-price">Rs ${p.price.toLocaleString()} <span class="modal-save-tag">-${disc}% OFF</span></div>
      <div class="modal-old">Was: Rs ${p.oldPrice.toLocaleString()}</div>
      <p style="font-size:13px;color:var(--muted);margin:12px 0 18px;line-height:1.6">${p.desc}</p>
      <label>Select Size</label>
      <div class="size-options">
        ${p.sizes.map((s, i) => `<button class="size-btn${i === 0 ? ' selected' : ''}" data-size="${s}">${s}</button>`).join('')}
      </div>
      <label style="margin-top:14px">Quantity</label>
      <div class="modal-qty">
        <button class="qty-btn" id="mMinus">−</button>
        <span class="qty-num" id="mQty">1</span>
        <button class="qty-btn" id="mPlus">+</button>
      </div>
      <button class="btn-primary modal-add-btn" id="mAddBtn">🛒 Add to Cart</button>
    </div>`;

  let sel = p.sizes[0], qty = 1;
  document.querySelectorAll('.size-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected'); sel = b.dataset.size;
    });
  });
  document.getElementById('mMinus').onclick = () => { if (qty > 1)  { qty--; document.getElementById('mQty').textContent = qty; } };
  document.getElementById('mPlus').onclick  = () => { if (qty < 10) { qty++; document.getElementById('mQty').textContent = qty; } };
  document.getElementById('mAddBtn').onclick = () => { addToCart(p, sel, qty); closeModal(); };

  showModal('modalOverlay', 'productModal');
}
function closeModal() { hideModal('modalOverlay', 'productModal'); }

// ─── CART ───
function quickAddToCart(id, btnEl) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p) addToCart(p, 'M', 1, btnEl);
}

function addToCart(product, size, qty, btnEl) {
  const key = `${product.id}-${size}`;
  const ex  = cart.find(i => i.key === key);
  if (ex) ex.qty = Math.min(ex.qty + qty, 10);
  else cart.push({ key, id: product.id, size, qty, price: product.price, name: product.name, club: product.club, img: product.img });
  saveCart(); updateCartUI();
  showToast(`✅ ${product.name} (${size}) added!`, 'success');

  const btn = btnEl || document.querySelector(`.card-add-btn[data-id="${product.id}"]`);
  if (btn) {
    btn.textContent = '✓ Added!';
    btn.style.background = 'var(--green)';
    setTimeout(() => { btn.textContent = '🛒 Add'; btn.style.background = ''; }, 1600);
  }
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart(); updateCartUI(); showToast('Removed from cart', 'error');
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (item) { item.qty = Math.max(1, Math.min(10, item.qty + delta)); saveCart(); updateCartUI(); }
}

function saveCart() { localStorage.setItem('kitzone_cart', JSON.stringify(cart)); }

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const itemsEl  = document.getElementById('cartItems');
  const emptyEl  = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');

  if (!cart.length) {
    emptyEl.style.display = 'flex'; footerEl.style.display = 'none';
    itemsEl.innerHTML = ''; itemsEl.appendChild(emptyEl); return;
  }
  emptyEl.style.display = 'none'; footerEl.style.display = 'flex';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.club} · Size: ${item.size}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.key}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.key}',1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <div class="cart-item-price">Rs ${(item.price * item.qty).toLocaleString()}</div>
        <button class="cart-item-del" onclick="removeFromCart('${item.key}')">🗑</button>
      </div>
    </div>`).join('');

  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const del = sub >= 2000 ? 0 : 100;
  document.getElementById('cartSubtotal').textContent = `Rs ${sub.toLocaleString()}`;
  document.getElementById('cartDelivery').textContent = del === 0 ? 'FREE 🎉' : `Rs ${del}`;
  document.getElementById('cartTotal').textContent    = `Rs ${(sub + del).toLocaleString()}`;
}

function openCart()  { document.getElementById('cartSidebar').classList.add('open'); document.getElementById('cartOverlay').classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('show'); document.body.style.overflow = ''; }

// ─── PAYMENT — 3 steps, NO TXN ID ───
function openPayment() {
  if (!cart.length) return showToast('Cart is empty!', 'error');
  closeCart();

  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const del = sub >= 2000 ? 0 : 100;
  const tot = sub + del;

  document.getElementById('paySummary').innerHTML =
    cart.map(i => `
      <div class="pay-item-row">
        <span>${i.name} ×${i.qty} (${i.size})</span>
        <span>Rs ${(i.price * i.qty).toLocaleString()}</span>
      </div>`).join('') +
    `<div class="pay-item-row pay-item-delivery">
       <span>Delivery</span><span>${del === 0 ? 'FREE 🎉' : 'Rs ' + del}</span>
     </div>
     <div class="pay-item-row pay-total-row">
       <span>Total</span><span>Rs ${tot.toLocaleString()}</span>
     </div>`;

  document.getElementById('payTotalBadge').textContent = `Rs ${tot.toLocaleString()}`;

  ['payerName', 'payerPhone', 'payerAddress'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });

  setPayMethod('esewa');
  showModal('payOverlay', 'payModal');
}

function setPayMethod(method) {
  activeMethod = method;
  const cfg = PAYMENT[method];
  document.getElementById('payNumber').textContent  = cfg.number;
  document.getElementById('payAppName').textContent = cfg.name;
  document.getElementById('payAppLogo').textContent = cfg.logo;
  document.getElementById('payMpin').textContent    = cfg.mpin;

  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const del = sub >= 2000 ? 0 : 100;
  document.getElementById('payAmount').textContent  = `Rs ${(sub + del).toLocaleString()}`;

  document.querySelectorAll('.pay-tab').forEach(t => t.classList.toggle('active', t.dataset.method === method));
}

function copyPayNumber() {
  const num = document.getElementById('payNumber').textContent;
  navigator.clipboard.writeText(num).then(() => {
    const btn = document.getElementById('payCopyBtn');
    btn.textContent = 'Copied ✓';
    btn.style.cssText = 'background:var(--green);color:#0a0a0f;border-color:var(--green)';
    setTimeout(() => { btn.textContent = 'Copy'; btn.style.cssText = ''; }, 2000);
    showToast('📋 Number copied!', 'success');
  }).catch(() => showToast('Copy failed', 'error'));
}

function closePayment() { hideModal('payOverlay', 'payModal'); }

// ─── CONFIRM ORDER (no TXN ID) ───
function confirmOrder() {
  const name    = document.getElementById('payerName').value.trim();
  const phone   = document.getElementById('payerPhone').value.trim();
  const address = document.getElementById('payerAddress').value.trim();

  if (!name)    return shakeField('payerName',    '⚠️ Full Name enter garnus!');
  if (!phone)   return shakeField('payerPhone',   '⚠️ Phone Number enter garnus!');
  if (!address) return shakeField('payerAddress', '⚠️ Delivery Address enter garnus!');

  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const del = sub >= 2000 ? 0 : 100;

  const order = {
    id:       'KZ' + Date.now(),
    date:     new Date().toLocaleString('en-NP'),
    customer: { name, phone, address },
    items:    [...cart],
    method:   activeMethod,
    total:    sub + del,
    status:   'Confirmed'
  };

  orders.push(order);
  localStorage.setItem('kitzone_orders', JSON.stringify(orders));
  cart = []; saveCart(); updateCartUI();
  closePayment();
  showSuccess(order);
}

function shakeField(fieldId, msg) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.classList.add('error');
    el.style.animation = 'shake 0.4s ease';
    el.focus();
    setTimeout(() => { el.style.animation = ''; el.classList.remove('error'); }, 800);
  }
  showToast(msg, 'error');
}

function showSuccess(order) {
  document.getElementById('successMsg').textContent = `Thank you ${order.customer.name}! Order confirmed 🎉`;
  document.getElementById('orderDetails').innerHTML = `
    <div><strong>Order ID:</strong> ${order.id}</div>
    <div><strong>Items:</strong> ${order.items.map(i => `${i.name} ×${i.qty} (${i.size})`).join(', ')}</div>
    <div><strong>Total:</strong> Rs ${order.total.toLocaleString()}</div>
    <div><strong>Payment via:</strong> ${PAYMENT[order.method].name} (${PAYMENT[order.method].number})</div>
    <div><strong>Deliver to:</strong> ${order.customer.address}</div>
    <div><strong>Phone:</strong> ${order.customer.phone}</div>
    <div style="margin-top:8px;color:var(--green)">📦 Expected: 1–3 business days</div>`;
  showModal('successOverlay', 'successModal');
}

function closeSuccess() { hideModal('successOverlay', 'successModal'); }

// ─── MODAL HELPERS ───
function showModal(overlayId, modalId) {
  document.getElementById(overlayId).classList.add('show');
  document.getElementById(modalId).classList.add('show');
  document.body.style.overflow = 'hidden';
}
function hideModal(overlayId, modalId) {
  document.getElementById(overlayId).classList.remove('show');
  document.getElementById(modalId).classList.remove('show');
  document.body.style.overflow = '';
}

// ─── EVENTS ───
function bindEvents() {
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', openPayment);
  document.getElementById('clearCartBtn').addEventListener('click', () => {
    if (confirm('Cart clear garnu sure xa?')) { cart = []; saveCart(); updateCartUI(); showToast('Cart cleared', 'error'); }
  });

  document.getElementById('hamburger').addEventListener('click', () =>
    document.getElementById('navLinks').classList.toggle('open'));

  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    let cur = '';
    document.querySelectorAll('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', closeModal);
  document.getElementById('payClose').addEventListener('click', closePayment);
  document.getElementById('payOverlay').addEventListener('click', closePayment);
  document.getElementById('successOverlay').addEventListener('click', closeSuccess);
  document.getElementById('confirmPay').addEventListener('click', confirmOrder);
  document.getElementById('payCopyBtn').addEventListener('click', copyPayNumber);

  document.querySelectorAll('.pay-tab').forEach(t =>
    t.addEventListener('click', () => setPayMethod(t.dataset.method)));

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderShop();
    });
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    currentSearch = e.target.value.toLowerCase(); renderShop();
  });

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message sent! We will contact you soon.', 'success');
    e.target.reset();
  });

  document.querySelector('.newsletter button').addEventListener('click', () => {
    const inp = document.querySelector('.newsletter input');
    if (inp.value) { showToast('📧 Subscribed! Thank you.', 'success'); inp.value = ''; }
    else showToast('Email enter garnus!', 'error');
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('navLinks').classList.remove('open');
      }
    });
  });
}

// ─── SCROLL ANIMATIONS ───
function animateOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.product-card,.feat-item,.review-card,.about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

// ─── TOAST ───
let toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// Expose globals
window.changeQty      = changeQty;
window.removeFromCart = removeFromCart;
window.closeCart      = closeCart;
window.closeSuccess   = closeSuccess;