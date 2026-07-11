const slide = document.getElementById('slides');
const images = document.querySelectorAll('.slides img');
const blk_btns = document.querySelectorAll('.blk_btn');

blk_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = './New.html';
    });
});

const gotoProducts = () => {
    window.location.href = './New.html';
}

let index = 0;
function showSlide() {
    slide.style.transform = `translateX(-${index * 100}%)`;
}

let next = document.getElementById('next');
let prev = document.getElementById('prev');
prev.style.display = 'none'

next.addEventListener("click", () => {
    index++;
    if (index >= (images.length / 4) - 1) {
        next.style.display = 'none'
    }
    prev.style.display = 'block'
    showSlide();
});

prev.addEventListener("click", () => {
    if (index <= 1) {
        prev.style.display = 'none'
    }
    next.style.display = 'block'
    index--;
    showSlide();
});

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