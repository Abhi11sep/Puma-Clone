// FETCH DATA ONLINE

let container=document.getElementById('container');
document.addEventListener("DOMContentLoaded", () => {

    fetch(`https://fakestoreapi.com/products`)
        .then((res) => { return res.json()})
        .then((data) => {
            console.log(data)
          
            data.forEach(ele => { 
            let box=document.createElement("div");
            box.setAttribute("class","box_div")
            let img=document.createElement('img')
               img.src=ele.image;
            let title=document.createElement('h2')
               title.innerText=ele.title;
            let price=document.createElement('p')
              price.innerText=ele.price;
              box.append(img,title,price)
             container.append(box)
            });
        })
        .catch((err) => console.log(err))
})
