function order() {
    const location = window.location.search;
    const url = new URLSearchParams(location);
    const urlId = url.get("id");
    let confirmation = document.getElementById("orderId");
    confirmation.innerText = urlId;
    console.log(urlId);
}
order();


