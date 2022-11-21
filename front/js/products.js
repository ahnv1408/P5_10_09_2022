class Product{
    constructor(jsonProducts){
        // Technique pour récupérer toute les données de mes produits
        // Object.assign permet d'assigner tout les les objets de jsonproduct dans this et this représente une instance de la class product
        jsonProducts && Object.assign(this, jsonProducts);
    }
}

// Récupération de la chaine de requête depuis l'URL
const urlId = window.location.search;
console.log(urlId);

//  Extraction de l'id par la méthode urlSearchParams
const extractionId = new URLSearchParams(urlId);
console.log(extractionId);

const productId = extractionId.get("id");
console.log(productId);

//  Création variable qui requête l'API selon l'id
let productAPIId = 'http://localhost:3000/api/products/';
productAPIId = productAPIId + productId;
console.log(productAPIId);
let productData = [];

// Création variable produits
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColor = document.getElementById("colors");
let productQuantity = document.getElementById("quantity");

console.log(productData);

// Récupération des éléments à partir de l'API
const fetchProducts = fetch(productAPIId)
    .then((res) => res.json())
    .then((promise) => {   
            productData = promise;     
            // Récupération de la class Products
            let products = new Product(productData);
            productImg.innerHTML += `<img src="${products.imageUrl}" alt="${products.altTxt}">`
            productTitle.innerHTML += `<h1 id="title">${products.name}</h1>`
            productPrice.innerHTML += `<p><span id="price">${products.price}</span></p>`
            productDescription.innerHTML += `<p id="description">${products.description}</p>`
            productColor.innerHTML += `<option>${products.colors[0]}</option>
                                       <option>${products.colors[1]}</option><option>${products.colors[2]}</option>`

                                          
});

// `http://localhost:3000/api/products/${urlId}`

                        // AJOUT AU PANIER

let buttonCart = document.getElementById("addToCart");
let elementColor = document.querySelector("#colors");
    console.log(elementColor);
let elementQuantity = document.querySelector("#quantity");
     console.log(elementQuantity);


let addTocart = document.getElementById("addToCart");


addTocart.addEventListener("click", () => { 
    // Si on clique sur le bouton ajouter au panier, on récupère les données    
    let listCart = JSON.parse(localStorage.getItem('productItems'));
    let productItems = {
        id : productId,
        // Multiplie par 1 pour que la valeur de quantité ne sont plus string mais number
        quantity : productQuantity.value*1,
        color : productColor.value,
    }
    if(productColor.value == "" || productQuantity.value < 1) {
        alert("Veuillez sélectionner une couleur ainsi qu'une quantité");
        // document.location.reload();   
    }else {
            // Si listCart (données du tableau récupéré dans le localstorage) est différente de null
            if (listCart !== null) {
                // Parcourir tout le tableau
                var ok = 0;
                for(var i = 0; i < listCart.length; i++) {
                    //  Si mon id et ma couleur sont les mêmes que l'id et la couleur de listCart alors
                    if((productItems.id === listCart[i].id) && (productItems.color === listCart[i].color)){
                         ok += 1;
                         listCart[i].quantity = parseInt(listCart[i].quantity);
                         listCart[i].quantity += productItems.quantity;
                         console.log('mettre a jour la quantité');
                        localStorage.setItem('productItems',JSON.stringify(listCart));
                        alert("L'article a bien été ajouté à votre panier");                     
                                           
                    }
                }
                    if (ok === 0) {          
                        // Pas même id ni meme couleur  
                        
                        listCart.push(productItems);                      
                        localStorage.setItem('productItems',JSON.stringify(listCart));                       
                        console.log('pas meme id ni meme couleur');       
                        alert("L'article a été ajouté à votre panier");    
                    }          
        }else {
               // si on ajoute le premier article on déclare le listCart comme tableau
               console.log('on a pas trouvé des articles dans le localStorage');
               listCart = [];
               listCart.push(productItems);
               localStorage.setItem('productItems',JSON.stringify(listCart));   
        }
    
    }
    
});