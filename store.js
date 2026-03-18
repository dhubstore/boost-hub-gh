let selectedProduct = null;

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

        <button class="purchase-btn" onclick="startOrder('${p.name}',${p.price})">
          Order Now
        </button>
      </div>
    </div>`;
  });
}

/* START ORDER */
function startOrder(name, price){
  const val = document.getElementById(`i-${name}`).value;

  if(!val){
    alert("Enter username/link");
    return;
  }

  selectedProduct = {name, price, username: val};

  document.getElementById("paymentModal").style.display = "flex";
}

/* CONFIRM PAYMENT */
function confirmPayment(){
  const phone = "233509329683";

  const msg = `Hello 👋, I have made payment via Telecel Cash.

Service: ${selectedProduct.name}
Price: GHC ${selectedProduct.price}
Username/Link: ${selectedProduct.username}

Please confirm and process my order.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");

  closeModal();
}

/* CLOSE MODAL */
function closeModal(){
  document.getElementById("paymentModal").style.display = "none";
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
