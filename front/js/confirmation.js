function order() {
    const location = window.location.search;
    const url = new URLSearchParams(location);
    const urlId = url.get("urlId");
    let confirmation = document.getElementById("orderId");
    confirmation.innerText = urlId;
    console.log(urlId);
    const orderDisplay = document.getElementById('orderId');
    orderDisplay.textContent = urlId;

}
order();

