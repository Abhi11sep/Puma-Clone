let wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showWishlist(wishList) {
    let container = document.getElementById("container")
    container.innerHTML = null

    if (wishList.length === 0) {

        container.classList.add("empty");

        container.innerHTML = `
        <div class="empty-wishlist">
            <i class="fa-regular fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Save your favourite products here and shop them later.</p>
            <button id="shopNowBtn">Continue Shopping</button>
        </div>
    `;

        document.getElementById("shopNowBtn").addEventListener("click", () => {
            window.location = "./new.html";
        });

        return;
    }

    container.classList.remove("empty");


    wishList.forEach(el => {
        let box = document.createElement("div");
        box.setAttribute("class", "box_div");

        let img = document.createElement("img");
        img.src = el.image;
        let title = document.createElement("h3");
        title.setAttribute('class', 'title')
        title.innerText = el.title;

        img.addEventListener('click', () => {
            localStorage.setItem('clicked product', JSON.stringify(el))
            window.location = './SingleProduct.html'

        })

        title.addEventListener('click', () => {
            localStorage.setItem('clicked product', JSON.stringify(el))
            window.location = './SingleProduct.html'

        })

        const sizeSelect = document.createElement("select");
        sizeSelect.className = "size_select";

        ["Select Size", "XS", "S", "M", "L", "XL", "XXL"].forEach(size => {
            const option = document.createElement("option");
            option.value = size;
            option.innerText = size;
            sizeSelect.append(option);
        });

        let priceAndHeart = document.createElement('div');
        priceAndHeart.setAttribute('class', 'priceAndHeart')

        let price = document.createElement("p");
        price.setAttribute('class', 'price')
        price.innerText = el.price;

        let HeartAndRating = document.createElement('div');
        HeartAndRating.setAttribute('class', 'HeartAndRating')


        let rm_btn = document.createElement("button");
        rm_btn.className = "icon-btn remove-btn";
        rm_btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        rm_btn.addEventListener("click", () => {
            let x = wishList.findIndex(item => item.id === el.id); //item always be there (not -1)
            wishList.splice(x, 1)
            localStorage.setItem("wishlist", JSON.stringify(wishList));
            showWishlist(wishList)
        })
        let cart_btn = document.createElement("button");
        const inCart = cart.some(item => item.id === el.id);
        cart_btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
        cart_btn.className = "icon-btn cart-btn";

        if (inCart) {
            cart_btn.classList.add("active");
        }
        cart_btn.addEventListener("click", () => {

            if (sizeSelect.value === "Select Size") {
                showToast("Please select a size", "error");
                return;
            }

            const alreadyInCart = cart.some(item =>
                item.id === el.id && item.size === sizeSelect.value
            );

            if (alreadyInCart) {
                showToast("Product already exists in cart");
                return;
            }

            cart.push({
                ...el,
                qty: 1,
                size: sizeSelect.value
            });

            const index = wishList.findIndex(item => item.id === el.id);
            wishList.splice(index, 1);

            localStorage.setItem("wishlist", JSON.stringify(wishList));
            localStorage.setItem("cart", JSON.stringify(cart));

            showToast("Moved to Cart", "success");

            showWishlist(wishList);

        });

        const actions = document.createElement("div");
        actions.className = "wishlist-actions";

        actions.append(sizeSelect, cart_btn, rm_btn);

        priceAndHeart.append(price, actions);
        box.append(img, title, priceAndHeart);
        container.append(box)

    })
}

showWishlist(wishList)

const toast = document.getElementById("toast");

function showToast(message, type = "info") {

    toast.innerText = message;

    toast.className = "";

    toast.classList.add(type);
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}

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