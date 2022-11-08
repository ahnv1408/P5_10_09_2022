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

totalPce();   

// function deleteItemSelect() {  

//   for(let i = 0; i < listCart.length; i++) {
//     fetch(productAPI + listCart[i].id)
//     .then((res) => res.json())
//     .then ((data) => {    
//       let productData = data; 
//       console.log(productData);
//       let productRemove = listCart.length;
//       console.log(productRemove);
//       buttonDelete = document.querySelectorAll(".deleteItem");
//       for(button in buttonDelete) {
//       button.addEventListener("click", () => {
//         productRemove.remove();
//       })
//     }
//     });
//   }
// }



//   buttonDelete = document.getElementsByClassName('deleteItem');
//   for(button in buttonDelete){
//     // on pointe le parent hiérarchique article du lien supprimer
//     let remove = buttonDelete.closest(".deleteItem");
//       remove.addEventListener('click', () => {
//         let totalProductRemove = listCart.length;
//         console.log(totalProductRemove);

//         if(totalProductRemove == 1) {
//           return (
//             localStorage.removeItem("productItems"),
//             console.log("removoe panier"),
//             (location.href = "cart.html")
//           );
//         }else {
//           let someProduct = [];
//           someProduct = listCart.filter((i) => {
//             if (
//               button.productItems.id != listCart[i].id || button.productItems.color != listCart[i].color
//             ) {
//               return true;
//             }
//           });
//           console.log(someProduct);
//           localStorage.setItem("productItems",JSON.stringify(listCart));
//           totalPce();
//           totalQty();
//           location.href = "cart.html";
//       }
//     });
//   }
// }
// const buttonDelete = document.querySelectorAll('.deleteItem');
// for(button in buttonDelete){
//   button.addEventListener('click', () => {
//     const itemToDelete = listCart.findIndex(
//       (product) => product.id === productItems.id && product.color === productItems.color)
//     listCart.splice(itemToDelete, 1)
//     localStorage.setItem("productItems", JSON.stringify(listCart));
  
//     const item = document.querySelector(`[data-id="${productItems.id}"][data-color="${productItems.color}"]`);
//     item.remove();
//     totalPce()
//     totalQty()
//   });
// }
// }
// deleteItemSelect();



// const divDelete = document.getElementsByClassName("cart__item__content__settings__delete");
// let sup = document.createElement("p");
// Object.assign(sup, {className: ".deleteItem", innerText: "Supprimer"});

// document.getElementsByClassName("cart__item__content__settings__delete").appendChild(sup);





//     for(button in buttonDelete){
//       console.log(buttonDelete[button]);
   
//       // on pointe le parent hiérarchique article du lien supprimer
//       let remove = buttonDelete[button].closest(".deleteItem");
//       // console.log(buttonDelete[button]);
//       // console.log(remove);
//       remove.addEventListener("click", () => {   
//           let removeItem = remove.closest("article");
//           console.log(remove.closest("article"));
//           removeItem.remove();
//           console.log(listCart[i]);
//           listCart.splice(i,1);         
//           console.log(remove);          
//           // location.reload();
//           alert("Ce produit va être supprimé de votre panier");
//           localStorage.setItem("item",JSON.stringify(listCart));
//           totalQty();
//           totalPce();    
//     });
//   }
// }

  


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
       
        carthtml.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
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

      // deleteItem(i);

    }
    //  deleteItemSelect();   
    // const buttonDelete = document.querySelector(`[data-id="${product._id}"][data-color="${product.color}"] .deleteItem`);
    // buttonDelete.addEventListener("click", () => {

    //   totalPce();
    //   totalQty();
    // }); 
    }     
  )};

// const divDelete = document.getElementsByClassName("cart__item__content__settings__delete");
// let sup = document.createElement("p");
// Object.assign(sup, {className: ".deleteItem", innerText: "Supprimer"});

// document.getElementsByClassName("cart__item__content__settings__delete").appendChild(sup);

  // recuperation element parent puis dans le fetch faire boucle for key div delete puis travaille apres

// function deleteItem(item) {
  
//   const sup = document.getElementsByClassName('deleteItem');
//   console.log(sup);
//   for (const key in sup) {
//     console.log(sup[key]);
//     sup[key].addEventListener("click", () => {
//       console.log("merci");
//     })
//   }

  
//   //   iterator.addEventListener("click", () => {
//   //   console.log(sup[iterator]);
//   //   // let index = listCart.indexOf();
//   // })
// }
function deleteItem(i) {
  const buttonDelete = document.querySelectorAll('.cart__item .deleteItem');
  console.log(buttonDelete);
  console.log(buttonDelete[0].closest('.deleteItem'));
  buttonDelete.forEach((buttonDelete) => {
  buttonDelete.addEventListener("click", () => {    
  console.log(buttonDelete.closest('article'));
  console.log(listCart);
  buttonDelete.closest('article').remove();
  listCart.splice(i, 1);
  localStorage.setItem("productItems", JSON.stringify(listCart));
  totalQty();
  totalPce();
// for(let i = 0; i < listCart.length; i++) {
//   console.log(listCart[i]);
// }
})

})
}

for(let i = 0; i < listCart.length; i++){
  fetch(productAPI + listCart[i].id)
  .then((res) => res.json())
  .then ((promise) => {
    console.log(promise);
    totalQty(i);
    totalPce(i);
    deleteItem(i);
  })
}

              //  RECUPERATION DONNEES FORMULAIRE !!

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let commandeProducts = JSON.parse(localStorage.getItem('commande'));
console.log(commandeProducts);

let btncommande = document.getElementById('order');
console.log(btncommande);

btncommande.addEventListener('click', () => {
  // Récupérer les données du formulaire
  // Stocker les saisies dans le local storage
  // let formCart = JSON.parse(localStorage.getItem('allForm'));
  // console.log(formCart);
  // formCart.push(allForm);
  // localStorage.setItem('allForm',JSON.stringify(formCart));  
  localStorage.setItem("firstName", firstName.value);
  localStorage.setItem("lastName", lastName.value);
  localStorage.setItem("address", address.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("email", email.value);
  location.href = "confirmation.html"; 

  fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify( 
      {contact: {
      firstName : firstName.value,
      lastName : lastName.value,
      address: address.value,
      city : city.value,
      email : email.value,
    },
    // products: listCart.map(product => product._id)
  }),
  })
  .then((res) => res.json())
  .then((data) => {
    let orderId = data.orderId;
    console.log(responseServeur);
    // localStorage.clear('cart');
    window.location.href = "confirmation.html" + "?orderId" + orderId
    // document.location= `confirmation.html?id=${orderId}`

  }); 
});

function pushIdInCart() {
  const id = [];
  for(let i = 0; i < listCart.length; i++) {
    id.push(listCart[i].id)
  }
  return id;
}


  // Récupération du formulaire
//   let formulaire = document.getElementsByClassName('cart__order__form');
//   console.log(formulaire);

// for (const formu of formulaire) {
//   formu.addEventListener('submit', () => {

//   if (contact != null) {
//     const commandeFinal = JSON.parse(localStorage.getItem('productItems'));
//     let commandeId = [];    
//     console.log(commandeFinal);
//     console.log(commandeId);

//     commandeFinal.forEach((commande) => {
//       commandeId.push(commande.id);
//     });

    const data = {
      contact: {
        firstName : firstName.value,
        lastName : lastName.value,
        address: address.value,
        city : city.value,
        email : email.value,
      },
      products : pushIdInCart()
    };

//     console.log(commandeId);

//   }


//     const dataCommande = {contact: responseServeur.contact,
//       order : responseServeur.orderId,
//     };
//     if(commandeProducts == null) {
//       commandeProducts = [];
//       commandeProducts.push(dataCommande)
//       localStorage.setItem(('commande'), JSON.stringify(commandeProducts));
//     }else if (commandeProducts != null) {
//       commandeProducts.push(dataCommande);
//       localStorage.setItem(('commande'), JSON.stringify(commandeProducts));
//     }
//     localStorage.removeItem('productItems');
//     location.href = "confirmation.html";
//   });
//   firstName.value = "";
//   lastName.value = "";
//   address.value = "";
//   city.value = "";
//   email.value = "";
//   }else {
//     alert("Veuillez remplir le formulaire correctement");
//   }

// }
// }


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

//  PRix total

function totalPce() {
  let total = 0;
  // GArantie que le numéro est entier
  // let totalPrice = new Int1.NumberFormat();
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


const itemQuantity = document.querySelectorAll('.itemQuantity');

// for(itemQty in itemQuantity) {
// itemQty.addEventListener("input", () => {  
//   function updatePriceQuantity(id) {
//     console.log(id);
//     const updateProductItem = listCart.find((item) => item.id === id);
//     console.log(updateProductItem);
//     updateProductItem.quantity = Number(newValue);
//     totalPce();
//     totalQty();
//   };
// });
// };
// updatePriceQuantity(id);


// REGEX



let firstNameId = document.getElementById('firstName')

firstNameId.addEventListener('change', (e) => {
  validFirstName(e.target.value);
  console.log(validFirstName(e.target.value));
});

let lastNameId = document.getElementById('lastName');
lastNameId.addEventListener('change', (e) => {
  validLastName(e.target.value);
});

let addressId = document.getElementById('address');
addressId.addEventListener('change', (e) => {
  validAdress(e.target.value);
});

let cityId = document.getElementById('city');
cityId.addEventListener('change', (e) => {
  validCity(e.target.value);
});

let emailId = document.getElementById('email');
emailId.addEventListener('change', (e) => {
  //  Valie les éléments que l'utilisateurs est entrain d'écrire
  validEmail(e.target.value);
});




const validFirstName = function(inputFirstName) {
  let firstNameRegExp = new RegExp ('^[A-Z][A-Za-z\é\è\ê\-]+$');
  let testFirstName = firstNameRegExp.test(inputFirstName.value);

  let errorFirstName =document.getElementById('firstNameErrorMsg');
  if(testFirstName == true) {
    errorFirstName.innerHTML = 'FirstName valide';
  }else {
    errorFirstName.innerHTML = 'FirstName non valide';
  }
};

const validLastName = function(inputLastName) {
  let lastNameRegExp = new RegExp ('^[A-Z][A-Za-z\é\è\ê\-]+$');
  let testLastName = lastNameRegExp.test(inputLastName.value);

  let errorLastName =document.getElementById('lastNameErrorMsg');
  if(testLastName == true) {
    errorLastName.innerHTML = 'LastName valide';
  }else {
    errorLastName.innerHTML = 'LastName non valide';
  }
};

const validAdress = function(inputAdress) {
  let addressRegExp = new RegExp('([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)');
  let testAddress = addressRegExp.test(inputAdress.value);

  let errorAddress = document.getElementById('addressErrorMsg');
  if(testAddress == true) {
    errorAddress.innerHTML = 'Address valide';
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
  }else {
    errorCity.innerHTML = 'City non valide';
  }
};

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

//     // CHANGER QUANTITE
//     function changeQuantity(elementQuantity) {
//         let cart = getCart();
//         //  Gérer l quantité : find va chercher dans le panir si il y a un produit qui est le même que l'id du produit que je veux ajouter
//         let foundProduct = basket.find(p => p.id == productId);
//         if(foundProduct != undefined) {
//             foundProduct.elementQuantity += elementQuantity;
//             if(foundProduct.elementQuantity <= 0) {
//                 removeCart(foundProduct);
//             }
//             else{
//                 saveCart(cart);
//             }
//         }
       
//     }