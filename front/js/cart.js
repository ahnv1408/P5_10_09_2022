// Création variable produits
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColor = document.getElementById("colors");
let productQuantity = document.getElementById("quantity");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");

// Récupération de la chaine de requête depuis l'URL
const urlId = window.location.search;
console.log(urlId);

//  Extraction de l'id par la méthode urlSearchParams
const extractionId = new URLSearchParams(urlId);
console.log(extractionId);

const productId = extractionId.get("id");
console.log(productId);

// let productAPI = "http://localhost:3000/api/products/";
// let listCart = JSON.parse(localStorage.getItem('productItems'));

let productItems = {
  id : productId,
  // Multiplie par 1 pour que la valeur de quantité ne sont plus string mais number
  quantity : productQuantity*1,
  color : productColor,
}


const cart = [];

const productAPI = 'http://localhost:3000/api/products/';
let listCart = JSON.parse(localStorage.getItem('productItems'));
console.log(listCart);
console.log("test2");
console.log(listCart.length);

for(let i = 0; i < listCart.length; i++) {
  
  console.log("test1");
    async function getProduct(i) {
      console.log("test");
      fetch(productAPI + listCart[i].id)
      .then ((res) => res.json())
      .then ((data) => {
        let productData = data;    
        console.log(productData);
        if (listCart != null) {
        let carthtml = document.getElementById("cart__items");
        carthtml.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${productData.imageURL}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.name}</h2>
            <p>${listCart[i].color}</p>
            <p>${productData.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>${listCart[i].quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`

 
      // Suppression article 
      const buttonDelete = document.querySelector(".deleteItem");
      buttonDelete.addEventListener("click", () => {    
          // deleteProduct(listCart);  
          delProduct(i);
        })
     }
     else {
      cartNull();
     }
   
    }
  )}
  getProduct(i);
};

// function deleteProduct(listCart) {
//   const productToDelete = listCart.find(
//    (productItems) => (productItems.id === listCart.id) && (productItems.color === listCart.color)
//   )
//   productItems.splice(productToDelete, 1)
//   localStorage.setItem("productItems", JSON.stringify(listCart))
// }

delProduct = (i) =>{
  //Récupérer le tableau
  productData.splice(i, 1);
  // vider le localstorage
  localStorage.clear();
  // Mettre à jour le locl storage avec le nouveau panier
  localStorage.setItem('productItems', JSON.stringify(listCart));
  window.location.reload();
};

// function delArticle(productItems) {
//   let carthtml = document.getElementById("cart__items");
//   carthtml.removechild(productItems);
// }

// function cartNull() {
//   if (listCart === null) {
//       totalPrice.innerText = 0;
//       totalQuantity.innerText = 0;
//       const newContent = document.createElement("h2");
//       newContent.setAttribute("style", "text-align: center");
//       newContent.textContent = "Panier vide";
//       carthtml.appendChild(newContent);
//   }
//   // else {
//   //     totalQty.innerText = cartList.map(item => parseInt(item.qty)).reduce((compteur, valeur) => compteur + valeur, 0);
//   //     totalPrice.innerText = allArticlePrice.map(item => parseInt(item.total)).reduce((compteur, valeur) => compteur + valeur, 0);

//   // }
// };

// function totalQuantity() {
//   const totalQty = document.getElementById("totalQuantity");
//   let total = 0;
//   for(let i = 0; i < listCart.length; i++) {
//     total += JSON.parse(listCart[i].quantity)
//   }
//   totalQty.textContent = total;
// }

//  PRix total

// function totalPrice() {
//   const totalPrc = document.getElementById('totalPrice');
//   const total = listCart.reduce((total, productItems) => total += productItems.price * productItems.quantity, 0);
//   totalPrc.textContent = total;
// }


// REGEX

// Récupération du formulaire
let form = document.getElementById('cart__order__form');

form.email.addEventListener('change', () => {
  //  Valie les éléments que l'utilisateurs est entrain d'écrire
  validEmail(this);
});

form.firstName.addEventListener('change', () => {
  validFirstName(this);
});

form.password.addEventListener('change', () => {
  validPassword(this);
});

const validEmail = function(inputEmail) {
  // regex : a le droit d'ecrire de a jusqua z, de 0 à 9 etc ...
   let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2;10}$', 'g');
   let testEmail = emailRegExp.test(inputEmail.value);
  //  Récupération de la balise en dessous l'input
  //  let errorEmail = inputEmail.nextElementSibling;
  let errorEmail = document.getElementById("emailErrorMsg");
   console.log(testEmail);
   if(testEmail == true){
    errorEmail.innerHTML ='Adresse valide';
    errorEmail.classList.remove('text-danger');
    errorEmail.classList.add('text-success');
   }else {
    errorEmail.innerHTML = 'Adresse non valide';
    errorEmail.classList.remove('text-success');
    errorEmail.classList.add('text-danger');
   }
};

// const validFirstName = function(inputFirstName) {

// };

const validPassword = function(inputPassword) {
  // Au moins 3 characteres, au moins une majuscule, au moins une minuscule et au moin un chiffre
  let msg;
  let valid = false;
  if(inputPassword.value.length < 3){
    msg = 'Le mot de passe doit contenir au moins 3 caractères';
  }
  else if(!/[A-Z]/.test(inputPassword.value)) {
    msg = 'Le mot de passe doit contenir au moins une majuscule';
  }
  else if(!/[a-z]/.test(inputPassword.value)){
    msg = 'Le mot de passe doit contenir au moins une minuscule';
  }
  else if(!/[0-9]/.test(inputPassword.value)){
    msg = 'Le mot de passe doit contenir au moins un chiffre';
  }
  // Mot de passe valide
  else{
    msg = 'Le mot de passe est valide';
    valid = true;
  }

  // Affichage
    //  Récupération de la balise en dessous l'input
    let errorPassword = inputPassword.nextElementSibling;

    if(valid){
     errorPassword.innerHTML ='Mot de passe valide';
     errorPassword.classList.remove('text-danger');
     errorPassword.classList.add('text-success');
    }else {
     errorPassword.innerHTML = msg;
     errorPassword.classList.remove('text-success');
     errorPassword.classList.add('text-danger');
    }
};