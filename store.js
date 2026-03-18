let products = [];

/* LOAD PRODUCTS FROM FIREBASE */
async function loadProducts(){
  const snapshot = await db.collection("products").get();
  products = snapshot.docs.map(doc => doc.data());
  renderProducts();
}

/* DISPLAY PRODUCTS */
function renderProducts(cat="all"){
  const box = document.querySelector(".products-list");
  box.innerHTML = "";

  let filtered = cat==="all" ? products : products.filter(p=>p.category===cat);

  filtered.forEach(p=>{
    box.innerHTML += `
    <div class="product-card">
      <b>${p.name}</b><br>
      <span class="price">GHC ${p.price}</span>

      <div class="order-section">
        <input id="i-${p.name}" placeholder="Enter username/link">

        <div class="btn-group">
          <button class="purchase-btn" onclick="buy('${p.name}',${p.price})">Order</button>
        </div>
      </div>
    </div>`;
  });
}

/* SAVE ORDER ONLINE */
async function buy(name, price){
  const val = document.getElementById(`i-${name}`).value;

  if(!val){
    alert("Enter username/link");
    return;
  }

  try{
    await db.collection("orders").add({
      service: name,
      price: price,
      username: val,
      status: "pending",
      date: new Date()
    });

    alert("✅ Order placed successfully!");
  }catch(e){
    alert("Error placing order");
    console.log(e);
  }
}

/* NAV FILTER */
document.querySelectorAll("nav a").forEach(a=>{
  a.onclick = (e)=>{
    e.preventDefault();
    renderProducts(a.dataset.category);
  }
});

/* INIT */
loadProducts();
