const container = document.querySelector(".container");
const vaults = [
  { namev: "Nike Dunk Low White/Blue", imagev: "images/1.png", prices: "250" },
  { namev: "Nike Dunk Low Yellow/Blue", imagev: "images/2.png", prices: "300" },
  { namev: "Nike Dunk Low Blue/White", imagev: "images/3.png", prices: "150" },
  {
    namev: "Nike Dunk Low Orange/White",
    imagev: "images/4.png",
    prices: "200",
  },
  { namev: "Nike Dunk Low Black/White", imagev: "images/5.png", prices: "225" },
  {
    namev: "Nike Dunk Low Orange/Green",
    imagev: "images/6.png",
    prices: "230",
  },
  { namev: "Nike Dunk Low Pink/Green", imagev: "images/7.png", prices: "310" },
  { namev: "Nike Dunk Low Tosca/White", imagev: "images/8.png", prices: "240" },
  { namev: "Nike Dunk Low Olive/Green", imagev: "images/9.png", prices: "270" },
];

const showVaults = () => {
  let output = "";
  vaults.forEach(({ namev, imagev, prices }) => {
    output += `
      <div class="card">
        <img class="card--avatar" src=${imagev} />
        <h1 class="card--title">${namev}</h1>
        <a class="card--link" data-name="${namev}" data-price="${prices}">$${prices}</a>
      </div>
    `;
  });
  container.innerHTML = output;
  setupCart();
};

document.addEventListener("DOMContentLoaded", showVaults);

// Setup cart functionality
function setupCart() {
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#close-cart");
  const buyButton = document.querySelector(".btn-buy");

  cartIcon.onclick = () => {
    cart.classList.add("active");
  };

  closeCart.onclick = () => {
    cart.classList.remove("active");
  };

  buyButton.onclick = () => {
    buyButtonClicked();
  };

  const removeCartButtons = document.querySelectorAll(".cart-remove");
  removeCartButtons.forEach((button) => {
    button.onclick = (event) => {
      removeCartItem(event);
    };
  });

  const quantityInputs = document.querySelectorAll(".cart-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChanged);
  });

  const addCartLinks = document.querySelectorAll(".card--link");
  addCartLinks.forEach((link) => {
    link.onclick = (event) => {
      addCartClicked(event);
    };
  });
}

function buyButtonClicked() {
  alert("Your order is placed");
  const cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
}

function addCartClicked(event) {
  const link = event.target;
  const namev = link.dataset.name;
  const prices = link.dataset.price;
  const imagev = link.parentElement.querySelector(".card--avatar").src;
  addProductToCart(namev, prices, imagev);
}

function addProductToCart(namev, prices, imagev) {
  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  const cartItems = document.querySelector(".cart-content");
  const cartItemsNames = cartItems.querySelectorAll(".card--title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == namev) {
      alert("You have already added this item to the cart");
      return;
    }
  }
  const cartBoxContent = `
    <img src="${imagev}" alt="" class="card--avatar">
    <div class="detail-box">
      <div class="card--title">${namev}</div>
      <div class="card--price">${prices}</div>
    </div>
    <i class='bx bxs-trash-alt cart-remove'></i>
  `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.querySelector(".cart-remove").onclick = (event) => {
    removeCartItem(event);
  };
}
