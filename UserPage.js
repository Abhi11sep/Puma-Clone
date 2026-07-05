
let login = false;
let container = document.getElementById("container");
function renderForm() {
    if (login) {
        container.innerHTML = `
         <form>
        <h1>USER LOGIN DETAILS</h1>
        <P>Will are happy to see you again...</P>
        <div id="form_inputs">
       <div><span>Mobile Number : </span> <input id="mobile" type="number" placeholder="Enter Mobile number" /></div>
        <div><span>Password : </span> <input id="password"  autocomplete="new-password" type="password" placeholder="Enter password"/></div> 
        </div>
        <input id="submit" type="submit" value="Login"/>
    </form>`;
        loginLogic();

    } else {
        container.innerHTML = ` <form>
        <h1>USER SIGNUP DETAILS</h1>
        <P>Will we be very happy to see you as partener of our journey towards excellence...</P>
        <div id="form_inputs">
       <div><span>Name : </span> <input id="name" type="text" placeholder="Enter Name" /></div>
       <div><span>Mobile Number : </span> <input id="mobile" type="number" placeholder="Enter Mobile number" /></div>
        <div><span>Password : </span> <input id="password"  autocomplete="new-password" type="password" placeholder="Enter password"/></div> 
        </div>
        <input id="submit" type="submit" value="Sign up"/>
        <p>If your are already connected with us.. <a id="goto_link">Login here</a></p>
    </form>`;
        signupLogic();
    }
}

function signupLogic() {

    let user_name = document.getElementById("name")
    let mob = document.getElementById("mobile")
    let pswd = document.getElementById("password")
    let submit = document.getElementById("submit")

    document.getElementById("goto_link").addEventListener("click", () => {
        login = true;
        renderForm()
    })

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (user_name.value !== "" && mob.value !== "" && pswd.value !== "") {
            formSubmit()
        } else {
            alert("Plaese Fill All The Fields")
        }
    })

    let formSubmit = (e) => {
        let user = JSON.parse(localStorage.getItem("User data")) || []

        if (!Array.isArray(user)) {
            user = []
        }

        let userData = {
            name: user_name.value,
            mobile: mob.value,
            password: pswd.value
        }
        //   let addData=[...user,userData]
        user.push(userData)
        localStorage.setItem("User data", JSON.stringify(user));
        alert("Sign Up successfull, please login..")
        login = true;
        console.log("data stored");
        user_name.value = "";
        mob.value = "";
        pswd.value = "";
        login = true;
        renderForm()
    }
}


function loginLogic() {

    let mob = document.getElementById("mobile")
    let pswd = document.getElementById("password")
    let submit = document.getElementById("submit")
    let auth = false;

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (mob.value !== "" && pswd.value !== "") {
            formSubmit()
        } else {
            alert("Plaese Fill All The Fields")
        }
    })

    let formSubmit = (e) => {
        let user = JSON.parse(localStorage.getItem("User data")) || [];

        if (!Array.isArray(user)) {
            user = [];
            alert("no users are here")
            login = false;
            renderForm();
        } else {
            for (let { mobile, password } of user) {
                if (mobile == mob.value && password == pswd.value) {
                    auth = true;
                    mob.value = "";
                    pswd.value = "";
                    break;
                }
            }
        }
        if (auth) {
            alert("Welcome, redirecting to home page... ")
            window.location.href = "index.html";
        } else {
            alert("signup first, not a member");
            login = false;
            renderForm();
        }

    }


}

renderForm();

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
