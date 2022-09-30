// Création variable produits
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColor = document.getElementById("colors");
let productQuantity = document.getElementById("quantity");

// Récupération de la chaine de requête depuis l'URL
const urlId = window.location.search;
console.log(urlId);

//  Extraction de l'id par la méthode urlSearchParams
const extractionId = new URLSearchParams(urlId);
console.log(extractionId);

const productId = extractionId.get("id");
console.log(productId);

let productAPI = "http://localhost:3000/api/products/";
let listCart = JSON.parse(localStorage.getItem('productItems'));

let productItems = {
  id : productId,
  // Multiplie par 1 pour que la valeur de quantité ne sont plus string mais number
  quantity : productQuantity*1,
  color : productColor,
}

for(productItems of listCart) {
    productAPI = productAPI + productId;
    fetch(productAPI)
    .then((res) => res.json())
    .then((promise) => {
        productItems = promise;
        let carthtml = document.getElementById("cart__items");
        carthtml.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${products.imageURL}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${products.name}</h2>
            <p>${productItems.color}</p>
            <p>${products.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>${productItems.quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    })
}


// let buttonProductCart = document.querySelector(`data-id="{product-ID}" data-color="{product-color}.deleteItem`);

// buttonProductCart.addEventListener("click", () => {

// });