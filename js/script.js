const divModal = document.getElementById("inscription");
const boutton = document.getElementById("btn-link");
const user = document.querySelectorAll("#Username");
const fastname = document.getElementById("fastname");
const usermail = document.getElementById("usermail");

window.addEventListener("load", () => {
  setTimeout(() => {
    const chargement = document.getElementById("chargement");
    chargement.classList.add("fondu-out");
  }, 3300);
});

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Animation de disparition
  const formContainer = document.querySelector(".form-container");
  formContainer.classList.add("fade-out");

  // Redirection ou action après 0.5s (durée de l'animation)
  setTimeout(() => {
    // Ici vous pouvez ajouter votre logique de soumission
    alert("Formulaire envoyé avec succès!");
    formContainer.style.display = "none"; // Cache définitivement
  }, 500);
});

let produits = JSON.parse(localStorage.getItem("products")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("total-products").innerText = produits.length;
document.getElementById("total-users").innerText = users.length;

boutton.addEventListener("click", function () {
  divModal.style.display = "block";
});

const close = document.getElementById("close-modal");
close.addEventListener("click", function () {
  divModal.style.display = "none";
});

let container = document.getElementById("container");

const form = document.getElementById("myForm");

let btn = document.querySelector(".btn-inscription");

let titre = document.getElementById("titre");
let errorElement = document.getElementById("errorElement");
errorElement.style.display = "none";

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page
  // Récupération des valeurs des champs du formulaire
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("motdepasse").value;

  let userData = {
    prenom: prenom,
    nom: nom,
    email: email,
    password: password,
    image: imgUser.src,
  };

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  if (nom && prenom && email && password && img) {
    user[0].textContent = prenom;
    user[1].textContent = prenom;
    user[1].style.fontWeight = "normal";
    fastname.textContent = nom;
    fastname.style.fontWeight = "normal";
    usermail.textContent = email;
    usermail.style.color = "#007BFF";
    usermail.style.fontWeight = "normal";

    divModal.style.display = "none";
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});

// récupération de l'élément input de type file
let img = document.getElementById("file");
let imgUser = document.getElementById("preview");

img.addEventListener("change", function (event) {
  const file = this.files[0]; // Récupère le premier fichier
  if (file) {
    const url = URL.createObjectURL(file); // Crée une URL temporaire
    imgUser.src = url; // Affecte l'URL à l'image
  }
  imgUser.style.display = "block"; // Affiche l'image
});
