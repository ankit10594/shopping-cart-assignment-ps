const dropdownBtn = document.getElementById("mobile-category-dropdown-id");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
let cartItemsEle = document.getElementById("cartItems");
const alreadyItems = localStorage.getItem("cartValues") || "[]";
const alreadyItemsJson = JSON.parse(alreadyItems);
let cartItems = alreadyItemsJson.length;
cartItemsEle.innerHTML = cartItems;
(function () {
  dropdownBtn?.addEventListener("change", (e) => {
    e.preventDefault();
    window.location.href = "/products?filter=" + e.target.value;
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    var errors = validate(loginForm, {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 5,
        },
      },
    });
    if (!errors) {
      loginForm.submit();
    } else {
      Object.keys(errors).forEach((item) => {
        const node = document.createElement("span");
        const textnode = document.createTextNode(errors[item][0]);
        node.appendChild(textnode);
        const inputItem = document.getElementById(item);
        inputItem.insertAdjacentElement("afterend", node);
      });
    }
  });

  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    var errors = validate(loginForm, {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
        },
      },
      "conf-password": {
        presence: true,
        equality: {
          attribute: "password",
          message: "^The passwords does not match",
        },
      },
      "first-name": {
        presence: true,
      },
      "last-name": {
        presence: true,
      },
    });
    if (!errors) {
      registerForm.submit();
    } else {
      Object.keys(errors).forEach((item) => {
        const node = document.createElement("span");
        const textnode = document.createTextNode(errors[item][0]);
        node.appendChild(textnode);
        const inputItem = document.getElementById(item);
        inputItem.insertAdjacentElement("afterend", node);
      });
    }
  });
});

const addToCart = (product) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  console.log(product.name);
  fetch("http://localhost:5000/addToCart", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("Res", result);
      if (result.response === "Success") {
        cartItems++;
        cartItemsEle.innerHTML = cartItems;
        const alreadyItems = localStorage.getItem("cartValues") || "[]";
        const alreadyItemsJson = JSON.parse(alreadyItems);
        alreadyItemsJson.push(product);
        localStorage.setItem("cartValues", JSON.stringify(alreadyItemsJson));
        alert(result.responseMessage);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    })
    .catch((error) => console.log("error", error));
};
