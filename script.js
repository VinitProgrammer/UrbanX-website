  // Shared script: logo scaling, countdown, cart across pages (localStorage), checkout demo
(function(){
  // Logo scaling on scroll (works on all pages)
  const brand = document.querySelector('.brand');
  window.addEventListener('scroll', ()=>{
    if(!brand) return;
    const y = window.scrollY;
    const min = 1, max = 1.5;
    const t = Math.min(1, y / 300);
    brand.style.transform = 'scale(' + (min + (max-min)*t) + ')';
  });

  // Countdown (if exists)
  const target = new Date('2025-11-15T00:02:00');
  function updateCountdown(){
    const elDays = document.getElementById('cd-days');
    if(!elDays) return;
    const now = new Date();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1*60*60*24));
    const hours = Math.floor((diff / (1*60*60)) % 24);
    const mins = Math.floor((diff / (1*60)) % 60);
    const secs = Math.floor((diff / ( 1% 60);
    <span id="cd-days"></span> days
<span id="cd-hours"></span> hours
<span id="cd-mins"></span> mins
<span id="cd-secs"></span> secs

  window.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

  // Cart (shared via localStorage)
  function loadCart(){ return JSON.parse(localStorage.getItem('ux_cart')||'[]'); }
  function saveCart(c){ localStorage.setItem('ux_cart', JSON.stringify(c)); }
  function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }

  let cart = loadCart();

  function updateCartBadge(){
    const badge = document.getElementById('cartBadge');
    if(badge) badge.textContent = cart.reduce((a,b)=>a+b.qty,0);
  }

  function renderCartPanel(){
    const panel = document.getElementById('cartPanelItems');
    if(!panel) return;
    panel.innerHTML = '';
    let subtotal = 0;
    cart.forEach(item=>{
      const row = document.createElement('div'); row.className='cart-item';
      row.innerHTML = `<img src="${item.img}" alt="${item.title}"><div style="flex:1"><strong>${item.title}</strong><div style="color:var(--muted);font-size:13px">Qty: ${item.qty}</div></div><div><div style="font-weight:900">${formatINR(item.price*item.qty)}</div></div>`;
      panel.appendChild(row);
      subtotal += item.price*item.qty;
    });
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const totalEl = document.getElementById('cartTotal');
    if(subtotalEl) subtotalEl.textContent = formatINR(subtotal);
    if(taxEl) taxEl.textContent = formatINR(Math.round(subtotal*0.18));
    if(totalEl) totalEl.textContent = formatINR(Math.round(subtotal*1.18));
  }

  // Add to cart buttons
  document.querySelectorAll('.add-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id; const price = Number(btn.dataset.price);
      const existing = cart.find(c=>c.id===id);
      if(existing) existing.qty += 1; else cart.push({id, title: 'Urban X — Standard Edition', price, qty:1, img:'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop'});
      saveCart(cart); updateCartBadge(); renderCartPanel();
      document.getElementById('cartOverlay').style.display='flex';
    });
  });

  // Cart open/close
  document.querySelectorAll('[data-open-cart]').forEach(b=> b.addEventListener('click', ()=> document.getElementById('cartOverlay').style.display='flex'));
  document.querySelectorAll('[data-close-cart]').forEach(b=> b.addEventListener('click', ()=> document.getElementById('cartOverlay').style.display='none'));

  // Checkout (demo)
  document.getElementById('checkoutForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    // show success modal
    document.getElementById('cartOverlay').style.display='none';
    document.getElementById('confirmModal').style.display='flex';
    // clear cart
    cart = []; saveCart(cart); updateCartBadge(); renderCartPanel();
  });

  document.getElementById('confirmClose')?.addEventListener('click', ()=> document.getElementById('confirmModal').style.display='none');

  // Demo launch btn
  document.querySelectorAll('.play-demo').forEach(b=> b.addEventListener('click', ()=> alert('Launching Urban X Demo (demo only). Full game launches 8 Jan 2026!')));

  // initialize UI
  updateCartBadge(); renderCartPanel();

})();
