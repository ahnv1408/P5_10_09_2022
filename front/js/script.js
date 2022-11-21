   
fetch("http://localhost:3000/api/products")
    // Récupération en format text
    .then( data => data.json())
    // Récupération en format json en créant une variable jsonlistproducts
    .then( jsonListProducts => {
        // Boucle qui va permettre d'afficher les éléments, qui va parcourir le tableau et pour chaque case crée une variable jsonproducts qu'on va pouvoir manipuler
        for(let jsonProducts of jsonListProducts){
            // Récupération de la class PRoducts
            let products = new Product(jsonProducts);
            // Sélection de la class items (ou doit figurer les articles) plus ajout de la carte products (en commentaire dans HTML)
            document.querySelector(".items").innerHTML +=`<a class="link_products" href="./product.html?id=${products._id}">
                                                            <article>
                                                            <img src="${products.imageUrl}" alt="${products.altTxt}">
                                                            <h3 class="productName">${products.name}</h3>
                                                            <p class="productDescription">${products.description}</p>
                                                            </article>
                                                        </a>`
        }
    });







