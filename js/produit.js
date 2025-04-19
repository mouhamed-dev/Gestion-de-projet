let products = JSON.parse(localStorage.getItem("products")) || [];

// récupérer les éléments du DOM
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const textInput = document.getElementById("description");
const productList = document.getElementById("product-list");
const notification = document.getElementById("notification");
let productToEdit = null;

window.addEventListener("load", () => {
  setTimeout(() => {
    const chargement = document.getElementById("chargement");
    chargement.classList.add("fondu-out");
  }, 1100); // 2.5 secondes
});

// sauvegarder les produits dans le localStorage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

  function renderProducts() {
    const productsList = document.getElementById("products-list");
    productsList.innerHTML = ""; // Vider le tableau
  
    products.forEach((product, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price} FCFA</td>
        <td>${product.description || "Aucune"}</td>
        <td>
        <button id="modif" onclick="editProduct(${index}); scrollToForm()">Modifier</button>
        <button id="sup" onclick="deleteProduct(${index})">Supprimer</button>
        </td>
      `;
  
      productsList.appendChild(row);
    });
  }

function deleteProduct(index) {
  products.splice(index, 1);
  showNotification("Produit supprimé 🟥")
  saveProducts();
  renderProducts();
}

let showNotification = (message) => {
  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => {
  notification.classList.remove("show");
  }, 3000);
}

function editProduct(index) {
  const prod = products[index];
  nameInput.value = prod.name;
  priceInput.value = prod.price;
  quantityInput.value = prod.quantity;
  textInput.value = prod.description;

  productToEdit = index;

  form.onsubmit = function (e) {
    e.preventDefault();
    prod.name = nameInput.value;
    prod.quantity = quantityInput.value;
    prod.price = priceInput.value;
    prod.description = textInput.value;
    products[index] = prod;
    showNotification("Produit modifié avec succès ✅");
    saveProducts();
    renderProducts();
    form.reset();
    form.onsubmit = addProduct; // remet l'ajout
  };
}

function trierProduits() {
  const critere = document.getElementById("tri").value;

  if (critere === "nom") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (critere === "prix") {
    products.sort((a, b) => a.price - b.price);
  }

  renderProducts(); // Met à jour l’affichage
}


function addProduct(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const price = parseFloat(priceInput.value);
  const description = textInput.value.trim();
  if (!name || isNaN(quantity) || isNaN(price) || !description) {
    alert("Remplis correctement les champs.");
    return;
  }
  if (productToEdit !== null) {

    products[productToEdit] = { name, quantity, price, description };
    productToEdit = null;
  } else {
    
    products.push({ name, quantity, price, description });
  }
  showNotification("Produit ajouté avec succès ✅");
  saveProducts();
  renderProducts();
  form.reset();
  
}

form.onsubmit = addProduct;

renderProducts();

function scrollToForm() {
  document.getElementById("section-product");
}
console.log("products", products);
