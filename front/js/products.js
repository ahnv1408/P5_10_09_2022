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

// Récupération des éléments à partir de l'API
const fetchProducts = fetch(productAPI)
    .then((res) => res.json())
    .then(pageProducts => {        
            // Récupération de la class Products
            let products = new Product(pageProducts);
            document.querySelector(".item__img").innerHTML += `<img src="${products.imageUrl}" alt="${products.altTxt}">`
            document.getElementById("title").innerHTML += `<h1 id="title">${products.name}</h1>`
            document.getElementById("price").innerHTML += `<p><span id="price">${products.price}</span></p>`
            document.getElementById("description").innerHTML += `<p id="description">${products.description}</p>`
            document.getElementById("colors").innerHTML += `<option>${products.colors[0]}</option>
                                                            <option>${products.colors[1]}</option><option>${products.colors[2]}</option>`
        
});

// `http://localhost:3000/api/products/${urlId}`

                        // AJOUT AU PANIER
let colors = document.getElementById("colors");
let quantity = document.getElementById("quantity");
let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", fonction() {
    // Condition d'une couleur et d'une quantité
    if (colors.value == "" || quantity.value < 1) {
        alert("Veuillez choisir une couleur ainsi qu'une quantité")
    };
        // Quand on clique sur le bouton ajouter au panier, récupérer les données du produit
        let cartList = localStorage.getItem("cart");
    
});


