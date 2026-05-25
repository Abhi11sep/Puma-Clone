let cont = document.getElementById("cont");
let wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart= JSON.parse(localStorage.getItem("cart")) || [];

function showWishlist(wishList) {
   
    cont.innerHTML = "";
    wishList.forEach(el=>{
        let box=document.createElement("div");
        box.setAttribute("class","box");
        let title=document.createElement("h1");
        title.innerText=el.title;
        let img=document.createElement("img");
        img.src=el.image;
        let btm_box=document.createElement("div");
        let price=document.createElement("p");
        price.innerText=el.price
        let rm_btn=document.createElement("button")
        rm_btn.innerText="Remove";
        rm_btn.addEventListener("click",()=>{
            let x=wishList.findIndex(item=>item.id===el.id); //item always be there (not -1)
            wishList.splice(x,1)
            localStorage.setItem("wishlist",JSON.stringify(wishList));
            showWishlist(wishList)
        })
         let cart_btn=document.createElement("button")
          cart_btn.innerText="move to cart";
           cart_btn.addEventListener("click",()=>{
            let x=wishList.findIndex(item=>item.id===el.id); //item always be there (not -1)
            cart.push({...el,qty:1});
            wishList.splice(x,1)
            localStorage.setItem("wishlist",JSON.stringify(wishList));
            localStorage.setItem("cart",JSON.stringify(cart));
            showWishlist(wishList)
        })
        btm_box.append(price,rm_btn,cart_btn)
        box.append(img,title,btm_box);
        cont.append(box);
    })

}

showWishlist(wishList)