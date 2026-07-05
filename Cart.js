let cont = document.getElementById("cont");
let tot_div = document.getElementById("total_div")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].qty)
}

function showCartlist(cart) {

    cont.innerHTML = "";
    tot_div.innerHTML = "";
    cart.forEach(el => {
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        let title = document.createElement("h3");
        title.setAttribute('id', 'title')
        title.innerText = el.title;
        let img = document.createElement("img");
        img.src = el.image;
        let price = document.createElement("h3");
        price.setAttribute('id', 'price')
        price.innerHTML = `&#8377 ${el.price}`
        let rm_btn = document.createElement("button")
        rm_btn.setAttribute('class', 'rm_btn')
        rm_btn.innerText = "Remove";
        rm_btn.addEventListener("click", () => {
            let x = cart.findIndex(item => item.id === el.id); //item always be there (not -1)
            cart.splice(x, 1)
            total = total - (el.price * el.qty)
            localStorage.setItem("cart", JSON.stringify(cart));
            showCartlist(cart)
        })


        let inc_btn = document.createElement("button")
        inc_btn.setAttribute('id', 'inc_btn')
        inc_btn.innerText = "+";
        inc_btn.addEventListener("click", () => {
            let x = cart.findIndex(item => item.id === el.id); //item always be there (not -1)
            cart[x].qty++;
            localStorage.setItem("cart", JSON.stringify(cart));
            total = total + (el.price)
            showCartlist(cart)
        })

        let qty = document.createElement("p");
        qty.setAttribute('class', 'qty')
        qty.innerText = el.qty;

        let dec_btn = document.createElement("button")
        dec_btn.setAttribute('id', 'dec_btn')
        dec_btn.innerText = "-";
        dec_btn.addEventListener("click", () => {
            let x = cart.findIndex(item => item.id === el.id); //item always be there (not -1)
            if (cart[x].qty === 1) {
                cart.splice(x, 1)
            } else {
                cart[x].qty--;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            total = total - (el.price)
            showCartlist(cart)
        })
        let details = document.createElement("div");
        details.setAttribute("class", "details")

        let btm_box = document.createElement("div");
        btm_box.setAttribute("class", "btm_box")

        let qty_box = document.createElement("div");
        qty_box.setAttribute("class", "qty_box")


        qty_box.append(dec_btn, qty, inc_btn)
        btm_box.append(price, rm_btn, qty_box)
        details.append(title, btm_box)
        box.append(img, details);
        cont.append(box);
    })

    let total1_div = document.createElement("h2");
    let total2_div = document.createElement("p");
    total1_div.innerHTML = `Your subtotal is: ${total}`;
    total2_div.innerHTML = `The shipment will take 7 working days to arrive!!`;

    let total3_div = document.createElement("p");
    total3_div.innerHTML = `You're just one step away from your order. Verify your billing details, choose your preferred payment method, and place your order with confidence.`;

    let total5_div = document.createElement("p");
    total5_div.innerHTML = `<h3>Safe & Secure Payment</h3>
All transactions are protected using industry-standard encryption. Your privacy and payment information are always kept secure.`;

    let total6_div = document.createElement("p");
    total6_div.innerHTML = `Thank you for shopping with us. Review your order, enter your billing information, and complete your purchase through our secure checkout for a seamless experience.`;


    let pay_btn = document.createElement("button")
    pay_btn.setAttribute("class", "btn")
    pay_btn.addEventListener('click', () => {
        window.location = "./Payment.html"
    })
    pay_btn.innerText = "Make Payment (UPI / Cards)";
    let cod_btn = document.createElement("button")
    cod_btn.addEventListener('click', () => {
        window.location = "./Payment.html"
    })
    cod_btn.setAttribute("class", "btn")
    cod_btn.innerText = "Cash On Delivery pay mode";

    tot_div.append(total2_div, total1_div, total3_div, total5_div, pay_btn, cod_btn, total6_div)

}

showCartlist(cart)

//href pages

document.getElementById("userIcon").addEventListener("click", () => {
    window.location = "./UserPage.html"
})

document.getElementById("wishIcon").addEventListener("click", () => {
    window.location = "./Wishlist.html"
})

document.getElementById("navBar1").addEventListener("click", () => {
    window.location = "./index.html"
})