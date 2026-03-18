let products = [
  {name:"1K TIKTOK LIKES", price:10, category:"TikTok"},
  {name:"1K TIKTOK VIEWS", price:5, category:"TikTok"},
  {name:"500 TIKTOK FOLLOWERS", price:25, category:"TikTok"},
  {name:"1K TIKTOK FOLLOWERS", price:45, category:"TikTok"},

  {name:"1K INSTAGRAM LIKES", price:23, category:"Instagram"},
  {name:"1K INSTAGRAM VIEWS", price:8, category:"Instagram"},

  {name:"1K FACEBOOK FOLLOWERS", price:30, category:"Facebook"}
];

/* DISPLAY PRODUCTS */
function renderProducts(cat="all"){
  const box = document.querySelector(".products-list");
  box.innerHTML = "";

  let filtered = cat==="all" ? products : products.filter(p=>p.category===cat);

  filtered.forEach(p=>{
    box.innerHTML += `
    <div class="product-card">
      <b>${p.name}</b>
      <small style="color:#94a3b8;">Instant Delivery</small>

      <span class="price">GHC ${p.price}</span>

      <div class="order-section">
        <input id="i-${p.name}" placeholder="Enter username/link">

        <button class="purchase-btn" onclick="orderWhatsApp('${p.name}',${p.price})">
          Order via WhatsApp
        </button>
      </div>
    </div>`;
  });
}

/* WHATSAPP ORDER */
function orderWhatsApp(name, price){
  const val = document.getElementById(`i-${name}`).value;

  if(!val){
    alert("Enter username/link");
    return;
  }

  const phone = "233509329683";

  const message = `Hello 👋, I want to order:

Service: ${name}
Price: GHC ${price}
Username/Link: ${val}

Please how do I pay?`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* NAV FILTER */
document.querySelectorAll("nav a").forEach(a=>{
  a.onclick = (e)=>{
    e.preventDefault();
    renderProducts(a.dataset.category);
  }
});

/* INIT */
renderProducts();
