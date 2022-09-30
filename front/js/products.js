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
let productAPI = "http://localhost:3000/api/products/";
productAPI = productAPI + productId;
console.log(productAPI);
let productData = [];

// Création variable produits
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColor = document.getElementById("colors");
let productQuantity = document.getElementById("quantity");

let allProducts = productImg + productId + productColor + productDescription + productPrice + productTitle + productQuantity;

console.log(productData);

// Récupération des éléments à partir de l'API
const fetchProducts = fetch(productAPI)
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
let elementColor = document.querySelector("#colors").value;
    console.log(elementColor);
let elementQuantity = document.querySelector("#quantity").value;
     console.log(elementQuantity);

// buttonCart.addEventListener("click", () => {

//     // function saveCart(cart) {
//     //     // Sauvegarde des données dans le local storage, utilisation de json pour transformer tableau en chaine de caractère
//     //     localStorage.setItem("cart", JSON.stringify(cart));
//     // }

//     function getCart() {
//         // Récupération des données 
//         let cart = localStorage.getItem("cart");
//         if(elementColor == "" || elementQuantity < 1) {
//             alert("Veuillez sélectionner une couleur ainsi qu'une quantité")  
//         }
//         else {
//             // parse : retransforme en objet
//             return JSON.parse(cart);
//         }
//     }

//     function addCart(productFormat){
//         let cart = getCart();
//         //  Gérer l quantité : find va chercher dans le panir si il y a un produit qui est le même que l'id du produit que je veux ajouter
//         let foundProduct = basket.find(p => p.id == productId);
//         if(foundProduct != undefined) {
//             foundProduct.elementQuantity++;
//         }else {
//             elementQuantity = 1;
//             cart.push(productFormat);
//         }
//         cart.push(productFormat);
//         saveCart(cart);
//     }

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

//     // SUPPRIMER ARTICLE
//     function removeCart(productFormat) {
//         let cart = getCart();
//         // filter : filtre le tzbleau par rapport à une condition
//         cart = cart.filter(p => p.id != productId);
//         saveCart(cart);
//     }

//     // CALCULER LA QUANTITE 

//     function getNumberProduct() {
//         let cart = getCart();
//         let number = 0;
//         for(let productFormat of cart) {
//             number += productFormat.elementQuantity;
//         }
//         return number;
//     }

//     //  CALCULER PRIX TOTAL

//     function getTotalPrice() {
//         let cart = getCart();
//         let total = 0;
//         for(let productFormat of cart) {
//             total += productFormat.elementQuantity * productPrice;
//         }
//         return total;
//     }

// });

let addTocart = document.getElementById("addToCart");
// console.log(JSON.parse(localStorage["item"]));

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
        alert("Veuillez sélectionner une couleur ainsi qu'une quantité")     
    }
    else {
        // Si listCart (données du tableau récupéré dans le localstorage) est différente de null
        if (listCart != null) {
            // Parcourir tout le tableau
            for(let i = 0; i<listCart.lenght; i++) {
                //  Si mon id et ma couleur sont les mêmes que l'id et la couleur de listCart alors
                if((productItems.id == listCart[i].id) && (productItems.color == listCart[i].color)){
                    return listCart[i].quantity++;
                    
                    
                    // listCart[i].quantity += productItems.quantity;
                    
                    
                    // let foundProduct = listCart.find(p => p.id == productItems.id);
                    // if(foundProduct != undefined) {
                        // foundProduct.productItems.quantity += listCart[i].quantity;
                        // foundProduct.productItem.quantity++;
                        // if(foundProduct.productItems.quantity <= 0) {
                        //     removeCart(foundProduct)
                        // }
                    // }
                    //     else {
                    //         productItems.quantity = 1
                    //         listCart.push(productItems);
                    //     }
                    
                //    productItems.quantity ++ listCart[i].quantity;
                    // ajouter une quantité additionner productitems.quantité à listcart[i] qauntité
                    }                
            
            }
            // meme id mais pas meme couleur ajouter une ligne pour stocket productItem dans le localstorage(push et set item)
            // Si pas pareil alors on push les éléments dans le panier 
            listCart.push(productItems);
            localStorage.setItem('productItems',JSON.stringify(listCart));
            alert("L'artcile a bien été ajouté à votre panier");
            
        }else {
            // si on ajoute le premier article on déclare le listCart comme tableau
            listCart = [];
            listCart.push(productItems);
            localStorage.setItem('productItems',JSON.stringify(listCart));        
        }
      
    }
    return (listCart = JSON.parse(localStorage.getItem('productItems')));
});

    // if(listCart) {
        //     let valueCart = JSON.parse(listCart);
        //     console.log(valueCart);            
        //     //  Verification du contenue du panier
        //     if (returnCart){
        //         returnCart.productQuantity += parseInt(elementQuantity);
        //         alert('La quantité de votre articlé dans le panier a été mis à jour');
        //         elementQuantity = 1;
        //     }
        //     else {
        //         valueCart.push(productFormat(listCart));
        //         alert("L'article a été ajouté à votre panier.");
        //         elementQuantity = 1;
        //     }
        //     saveCart(valueCart);
           
        // }
        // else {
        //     let valueCart = [];
        //     valueCart.push(productFormat(listCart));
        //     // saveCart(valueCart);
        //     alert("L'article a bien été ajouté au panier");
        //     elementQuantity = 1;
        // }

// Ajouter au panier un produit
// function saveCart () {
//     localStorage.setItem('productCart', JSON.stringify(listCart));
    // console.log(listCart);
    // console.log(listCart == null);

    // for(let i = 0; i<listCart.length; i++) {
    //     console.log(listCart[i]);
    // }    
    // let listCart = localStorage.getItem('productCart');

// saveCart();
// console.log(localStorage.length);
// for(let i = 0; i<localStorage.length; i++) {
//     console.log(localStorage.key(i));
// }

// Convertir en object pour insérer dans le LocalStorage
// function productFormat (data) {
//     return productFormat = {
//     product_Id: data._id,
//     productColor: colors.value,
//     productQuantity: parseInt(productQuantity.value)
//     };
// };









// // const addToCart = () => {
//     // Récupérer le bouton ajouter au panier
//     let addbutton = document.getElementById("addToCart");
//     console.log(addbutton);
//     //  Evenement quand on clique sur le bouton
//     addbutton.addEventListener("click", () => {
//         let cartList = localStorage.getItem('cart');
//         let products = new Product;
//         // Vérifier si une couleur et une quantité on bien été ajouté sinon message d'erreur
//         if(productColor.value == "" || productQuantity.value < 1){
//             alert("Veuillez sélectionner une couleur ainsi qu'une quantité")
//         }
//         else {
//             if(cartList) { 
//                 let cartValue = JSON.parse(cartList);
//                 console.log(cartValue);
//             }
//             else {
//                 let cartValue = [];
//                 cartValue.push(productFormat(products))
//                 cartAjout(cartValue);
//                 alert("L'article a été ajouté à votre panier");
//             }          
//             // tableau des données à récupérer pour le localstorage
//             let productsArray = JSON.parse(localStorage.getItem('products'));
//             console.log(productsArray);
//         }
//     }
// );

// 



    // Conditions
    // if(productsArray == null) {
    //     let products = new Product;
    //     productsArray= []
    //     productsArray.push(products = new Product);
    //     console.log(productsArray);
    //     localStorage.setItem("products", JSON.stringify(productsArray));
    //     }
    //     else {
    //         alert("veuilliez sélectionner")
    //     }
    


// products.imageUrl, products._id, productColor.value, products.description, products.price, products.title, productQuantity.value
// productImg, productId, productColor.value, productDescription, productPrice, productTitle, productQuantity.value

// function addCart(allProducts){
    //     let cartList = getCart();
    //     cartList.push(allProducts);
    //     saveCart(cartList);
    // }
    
    // function getCart() {
    //     let cartList= localStorage.getItem("cartList");
    //     if(cartList == null) {
    //         return [];
    //     }
    //     else {
    //         return JSON.parse(cartList);
    //     }
    // }
    
    // function saveCart(cartList) {
    //     localStorage.setItem("cartList", JSON.stringify(cartList));
    // }
    
    // addbutton.addEventListener("click", () => {
    //     addCart(this.dateset.id)
    //     });