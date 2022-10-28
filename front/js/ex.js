if (listCart != null) {
    for(let i = 0; i<listCart.lenght; i++) {
        if((productItems.id == listCart[i].id) && (productItems.color == listCart[i].color)){
            // productItems.Qty ++ listCart[i].Qty;
                           // ajouter une quantité additionner productitems.quantité à listcart[i] qauntité
            } 
               
    
    }
    // meme id mais pas meme couleur ajouter une ligne pour stocket productItem dans le localstorage(push et set item)
            
    listCart.push(productItems);
    localStorage.setItem('productItems',JSON.stringify(listCart));
    
}else {
    // si on ajoute le premier article on déclare le listCart comme tableau
    listCart = [];
    // 
    listCart.push(productItems);
    localStorage.setItem('productItems',JSON.stringify(listCart));

}


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


const productAPIId = 'http://localhost:3000/api/products/';
//  let listCart = JSON.parse(localStorage.getItem('productItems'));

