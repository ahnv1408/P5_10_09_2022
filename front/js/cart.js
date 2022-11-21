// Création variable produits
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColor = document.getElementById("colors");
let productQuantity = document.getElementById("quantity");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");

let firstName = "";
let lastName = "";


// Récupération de la chaine de requête depuis l'URL
const urlId = window.location.search;
console.log(urlId);

//  Extraction de l'id par la méthode urlSearchParams
const extractionId = new URLSearchParams(urlId);
console.log(extractionId);

const productId = extractionId.get("id");
console.log(productId);

let productItems = {
  id : productId,
  // Multiplie par 1 pour que la valeur de quantité ne sont plus string mais number
  quantity : productQuantity*1,
  color : productColor,
}


const cart = [];
let order = {};
let orderProducts = [];
let contact = {};

const productAPI = 'http://localhost:3000/api/products/';
let listCart = JSON.parse(localStorage.getItem('productItems'));
console.log(listCart);
console.log("test2");

// totalPce();   

//  Affichage des produits du panier
  for(let i = 0; i < listCart.length; i++)  {
    fetch(productAPI + listCart[i].id)
    .then((res) => res.json())
    .then ((data) => {
      console.log(data);
      let productData = data;    
      console.log(productData);
      totalPce(); 
      if (listCart === null || listCart == ""){
      localStorage.clear();
      document.querySelector(".cart").innerHTML = "<h1>Votre panier est vide</h1>"
      }else {
        let carthtml = document.getElementById("cart__items");
        console.log(carthtml);
       
        carthtml.innerHTML += `<article class="cart__item" data-id="${listCart[i].id}" data-color="${listCart[i].color}">
        <div class="cart__item__img">
          <img src="${productData.imageUrl}" alt="alt="${productData.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.name}</h2>
            <p>${listCart[i].color}</p>
            <p>${productData.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${listCart[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
        </article>` 

      }
    })     
  };

// Fonction qui permet de modifier la quantité dans le panier
function changeQty(i) {        
  const btnChangeQty = document.querySelectorAll(".cart__item__content__settings__quantity .itemQuantity");
  console.log(btnChangeQty);
  btnChangeQty.forEach((item) => {
    item.addEventListener("change", () => {      
      console.log(item.closest('article'));
      let findArticle = item.closest('article');
      let dataId = findArticle.getAttribute('data-id');
      let dataColor = findArticle.getAttribute('data-color');    
        if(listCart[i].id == dataId && listCart[i].color == dataColor) {
          listCart[i].quantity = item.value;
        }
          localStorage.setItem("productItems", JSON.stringify(listCart));
          totalQty();
          totalPce();
        })      
    
  })
}

// Fonction qui permet de supprimer un produit
function deleteItem(i) {
  const buttonDelete = document.querySelectorAll('.cart__item .deleteItem');
  buttonDelete.forEach((buttonDelete) => {
  buttonDelete.addEventListener("click", () => {    
    console.log(buttonDelete.closest('article'));
    console.log(listCart);
    buttonDelete.closest('article').remove();
    listCart.splice(i, 1);
    localStorage.setItem("productItems", JSON.stringify(listCart));
    window.location.reload();
    totalQty();
    totalPce();
  })
})
}

//  Fonction qui permet de calculer et d'afficher la quantité totale
function totalQty() {
  const totalQty = document.getElementById("totalQuantity");
  let total = 0;
  for(let i = 0; i < listCart.length; i++) {
    total += JSON.parse(listCart[i].quantity)
    console.log(total);
  }
  totalQty.textContent = total;
};
totalQty();

// Fonction qui permet de calculer et afficher le prix total
function totalPce() {
  let total = 0;
  // GArantie que le numéro est entier
  console.log(listCart);
  for(let i = 0; i < listCart.length; i++) {
    fetch(productAPI + listCart[i].id)
    .then((res) => res.json())
    .then ((data) => {    
      let productData = data;   
      console.log(data);
      let totalPriceArticle = listCart[i].quantity * `${productData.price}`;
      total += totalPriceArticle;
      console.log(total);  
      document.getElementById('totalPrice').innerText = total;
    })
  }
};

//  Boucle et fetch pour appeler mes fonctions
for(let i = 0; i < listCart.length; i++){
  fetch(productAPI + listCart[i].id)
  .then((res) => res.json())
  .then ((promise) => {
    console.log(promise);
    changeQty(i);
    totalQty(i);
    totalPce(i);
    deleteItem(i);   
  })
}

              //  RECUPERATION DONNEES FORMULAIRE !!


let btncommande = document.getElementById('order');
console.log(btncommande);

const itemQuantity = document.querySelectorAll('.itemQuantity');

// REGEX


let firstNameId = document.getElementById('firstName')

firstNameId.addEventListener('change', (e) => {
  firstName = validFirstName(e.target.value);
  console.log(firstName);
});

let lastNameId = document.getElementById('lastName');
lastNameId.addEventListener('change', (e) => {
   lastName = validLastName(e.target.value);

});

let address = "";
let addressId = document.getElementById('address');
addressId.addEventListener('change', (e) => {  
   address = validAdress(e.target.value);
});

let city = "";
let cityId = document.getElementById('city');
cityId.addEventListener('change', (e) => { 
   city =  validCity(e.target.value);
});

let email = "";
let emailId = document.getElementById('email');
emailId.addEventListener('change', (e) => {
  //  Valie les éléments que l'utilisateurs est entrain d'écrire
  
   email = validEmail(e.target.value);
});

class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}


const validFirstName = function(inputFirstName) {
  let firstNameRegExp = new RegExp ('^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$');
  let testFirstName = firstNameRegExp.test(inputFirstName.value);

  let errorFirstName =document.getElementById('firstNameErrorMsg');
  if(testFirstName == true) {
    errorFirstName.innerHTML = 'FirstName valide';
    console.log(inputFirstName);
    return (inputFirstName);
  }else {
    errorFirstName.innerHTML = 'FirstName non valide';
  }
};

const validLastName = function(inputLastName) {
  let lastNameRegExp = new RegExp ('^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$');
  let testLastName = lastNameRegExp.test(inputLastName.value);

  let errorLastName =document.getElementById('lastNameErrorMsg');
  if(testLastName == true) {
    errorLastName.innerHTML = 'LastName valide';
    console.log(inputLastName);
    return (inputLastName);
  }else {
    errorLastName.innerHTML = 'LastName non valide';
  }
};

const validAdress = function(inputAdress) {
  let addressRegExp = new RegExp('^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$');
  let testAddress = addressRegExp.test(inputAdress.value);

  let errorAddress = document.getElementById('addressErrorMsg');
  if(testAddress == true) {
    errorAddress.innerHTML = 'Address valide';
    return (inputAdress);
  }else {
    errorAddress.innerHTML = 'Address non valide';
  }
};

const validCity = function(inputCity) {
  let CityRegExp = new RegExp('^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$');
  let testCity = CityRegExp.test(inputCity.value);

  let errorCity = document.getElementById('cityErrorMsg');
  if(testCity == true) {
    errorCity.innerHTML = 'City valide';
    return (inputCity);
  }else {
    errorCity.innerHTML = 'City non valide';
  }
};

const validEmail = function(inputEmail) {
  // regex : a le droit d'ecrire de a jusqua z, de 0 à 9 etc ...
   let emailRegExp = new RegExp ('^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$');
   let testEmail = emailRegExp.test(inputEmail.value);
  //  Récupération de la balise en dessous l'input
  //  let errorEmail = inputEmail.nextElementSibling;
  let errorEmail = document.getElementById("emailErrorMsg");
   console.log(testEmail);
   if(testEmail == true){
    errorEmail.innerHTML ='Adresse valide';
    errorEmail.classList.remove('text-danger');
    errorEmail.classList.add('text-success');
    return (inputEmail);
   }else {
    errorEmail.innerHTML = 'Adresse non valide';
    errorEmail.classList.remove('text-success');
    errorEmail.classList.add('text-danger');
   }
};

//  Création de l'objet product
function productsInArray() {
  let products = listCart;
  for( let product in products) {
    console.log(products[product].id);
    product = {
      id: products[product].id, 
      quantity: products[product].quantity,
      color: products[product].color,
    };
    console.log(product.id);
    orderProducts.push(product.id);
    console.log(orderProducts);
  }
}

//  méthode post
btncommande.addEventListener('click', (e) => {
  productsInArray();
  contact = new Contact(firstName, lastName, address, city, email);
  order = {
    contact, 
    products: orderProducts,
  }
  console.log(contact);
  console.log(orderProducts);
  console.log(order);
  e.preventDefault();

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { Accept: "application/json",
      "Content-Type" : "application/json"},
    body: JSON.stringify( 
      order),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.orderId);
      window.location.href = `./confirmation.html?id=${data.orderId}`;
    });
});

