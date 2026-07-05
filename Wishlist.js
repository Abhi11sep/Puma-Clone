let cont = document.getElementById("cont");
let wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showWishlist(wishList) {
    let container = document.getElementById("container")
    container.innerHTML = null


    wishList.forEach(el => {
        let box = document.createElement("div");
        box.setAttribute("class", "box_div");

        let img = document.createElement("img");
        img.src = el.image;
        let title = document.createElement("h3");
        title.setAttribute('class', 'title')
        title.innerText = el.title;

        let priceAndHeart = document.createElement('div');
        priceAndHeart.setAttribute('class', 'priceAndHeart')

        let price = document.createElement("p");
        price.setAttribute('class', 'price')
        price.innerText = el.price;

        let HeartAndRating = document.createElement('div');
        HeartAndRating.setAttribute('class', 'HeartAndRating')

        let rm_btn = document.createElement("button")
        rm_btn.setAttribute('class', 'rm_btn')
        rm_btn.innerText = "Remove";
        rm_btn.addEventListener("click", () => {
            let x = wishList.findIndex(item => item.id === el.id); //item always be there (not -1)
            wishList.splice(x, 1)
            localStorage.setItem("wishlist", JSON.stringify(wishList));
            showWishlist(wishList)
        })
        let cart_btn = document.createElement("button")
        cart_btn.setAttribute('class', 'cart_btn')
        cart_btn.innerText = "move to cart";
        cart_btn.addEventListener("click", () => {
            let x = wishList.findIndex(item => item.id === el.id); //item always be there (not -1)
            cart.push({ ...el, qty: 1 });
            wishList.splice(x, 1)
            localStorage.setItem("wishlist", JSON.stringify(wishList));
            localStorage.setItem("cart", JSON.stringify(cart));
            showWishlist(wishList)
        })

        priceAndHeart.append(price, cart_btn, rm_btn)
        box.append(img, title, priceAndHeart);
        container.append(box)

    })
}

showWishlist(wishList)

//href pages

document.getElementById("userIcon").addEventListener("click", () => {
    window.location = "./UserPage.html"
})

document.getElementById("cartIcon").addEventListener("click", () => {
    window.location = "./Cart.html"
})

document.getElementById("navBar1").addEventListener("click", () => {
    window.location = "./index.html"
})