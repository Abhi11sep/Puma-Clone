let product = JSON.parse(localStorage.getItem("clicked product"));

document.getElementById("productImage").src = product.image;
document.getElementById("title").innerText = product.title;
document.getElementById("price").innerText = "₹ " + product.price;
document.getElementById("description").innerText = product.description;

let selectedSize = "";

const sizeBtns = document.querySelectorAll(".size-btn");

// sizeBtns.forEach(btn => {

//     btn.addEventListener("click", () => {

//         sizeBtns.forEach(b => b.classList.remove("active"));

//         btn.classList.add("active");

//         selectedSize = btn.innerText;

//     });

// });

sizeBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        selectedSize = btn.innerText;

        sizeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        updateButtons();

    });

});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


const cartBtn = document.getElementById("cartBtn");
const favBtn = document.getElementById("favBtn");


favBtn.addEventListener("click", () => {

    const index = wishlist.findIndex(item => item.id === product.id);

    if (index !== -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateButtons();
});

const heartIcon = document.getElementById("heartIcon");

function updateButtons() {

    // const inCart = cart.some(item => item.id === product.id && item.size === selectedSize);
    const inWish = wishlist.some(item => item.id === product.id);

    let inCart = false;

    if (selectedSize !== "") {
        inCart = cart.some(item =>
            item.id === product.id &&
            item.size === selectedSize
        );
    }

    cartBtn.innerText = inCart
        ? "Remove From Cart"
        : "Add To Cart";

    heartIcon.classList.toggle("fa-solid", inWish);
    heartIcon.classList.toggle("fa-regular", !inWish);

    favBtn.classList.toggle("active", inWish);
}

updateButtons();

cartBtn.addEventListener("click", () => {

    if (selectedSize === "") {

        showToast("Please select a size", "error");
        return;

    }

    const index = cart.findIndex(item =>
        item.id === product.id &&
        item.size === selectedSize
    );

    if (index !== -1) {

        cart.splice(index, 1);
        showToast("Removed from Cart", "info");

    } else {

        cart.push({
            ...product,
            size: selectedSize,
            qty: 1
        });

        showToast("Added to Cart", "success");
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateButtons();

});

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

function updateFavourite() {

    const exists = wishlist.some(item => item.id === product.id);

    const heartIcon = document.getElementById("heartIcon");

    if (inWish) {
        favBtn.classList.add("active");
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
    } else {
        favBtn.classList.remove("active");
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
    }

}


sizeGuideBtn.onclick = () => {

    sizeModal.style.display = "flex";

}

closeModal.onclick = () => {

    sizeModal.style.display = "none";

}
























//href pages

document.getElementById("userIcon").addEventListener("click", () => {
    window.location = "./UserPage.html"
})

document.getElementById("wishIcon").addEventListener("click", () => {
    window.location = "./Wishlist.html"
})

document.getElementById("cartIcon").addEventListener("click", () => {
    window.location = "./Cart.html"
})

document.getElementById("navBar1").addEventListener("click", () => {
    window.location = "./index.html"
})