//Document Selectors

//Cart Count
const cartCount = document.querySelector(".cartCount");

//Products Section
const productsRoot = document.querySelector(".products");

//Dropdown Cart
const checkOutButton = document.querySelector(".checkoutButton");
const cartItemList = document.querySelector(".cartItemList");

//Initialize Cart
let cart = new Cart();

if (cart.getCountOfItemsInCart() === 0) {
  disbaleCheckOut();
} else {
  enableCheckOut();
}

window.addEventListener("DOMContentLoaded", checkPath);

function checkPath() {
  let currentPath = window.location.href;
  if (currentPath.trim() === "http://127.0.0.1:5500/pages/products.html") {
    fetchData();
  }
}

//Fetch API
async function fetchData() {
  let data = [];
  await fetch("../products.json")
    .then((res) => res.json())
    .then((json) => (data = json));
  data.map((item, key) => {
    let card = createProductCards(item);
    productsRoot.appendChild(card);
  });
}

function updateCartCount() {
  cartCount.innerHTML = cart.getCountOfItemsInCart();
}

function addToCart(item) {
  cart.addItemToCart(item);
  updateCartCount();
  updateCartList();
}

function updateCartList() {
  cartItemList.innerHTML = "";
  cart.cartList.map((item) => {
    let cartListItem = createCartListElement(item);
    cartItemList.appendChild(cartListItem);
  });
  enableCheckOut();
}

function enableCheckOut() {
  if (checkOutButton.classList.contains("disable")) {
    checkOutButton.classList.remove("disable");
  }
  updateCartCount();
}

function disbaleCheckOut() {
  cartItemList.innerHTML = "";
  let message = document.createElement("p");
  message.style.textAlign = "center";
  message.style.fontSize = "20px";
  message.innerHTML = "There's nothing in cart";
  cartItemList.appendChild(message);
  if (!checkOutButton.classList.contains("disable")) {
    checkOutButton.classList.add("disable");
  }
  updateCartCount();
}

//Create our DOM Elements
function createProductCards(item, key) {
  let rootLi = document.createElement("li");
  rootLi.classList.add("card");
  let image = document.createElement("img");
  image.src = item.image;

  let heading = document.createElement("h1");
  heading.innerText = returnTrimmedString(item.title);

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("cardInfo");

  let category = document.createElement("p");
  category.classList.add("category");
  category.innerText = item.category;
  let price = document.createElement("p");
  price.classList.add("price");
  price.innerText = `₹ ${converToRupee(item.price)}`;

  infoDiv.appendChild(category);
  infoDiv.appendChild(price);

  let button = document.createElement("button");
  button.classList.add("addToCartButton");
  button.innerText = "Add to cart";
  //add to our cart
  button.addEventListener("click", function () {
    let itemObj = {
      id: item.id,
      title: item.title,
      price: converToRupee(item.price),
      category: item.category,
      image: item.image,
      quantity: 1,
    };
    addToCart(itemObj);
  });

  //Add all this to parent
  rootLi.appendChild(image);
  rootLi.appendChild(heading);
  rootLi.appendChild(infoDiv);
  rootLi.appendChild(button);

  return rootLi;
}

function createCartListElement(item) {
  let rootLi = document.createElement("li");
  rootLi.classList.add("cartItem");
  let image = document.createElement("img");
  image.classList.add("itemImage");
  image.src = item.image;

  //append this to RootLi
  rootLi.appendChild(image);

  //create the Div
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("itemDetails");

  let heading = document.createElement("h4");
  let category = document.createElement("h5");
  let price = document.createElement("span");

  heading.innerHTML = returnTrimmedString(item.title);
  category.innerHTML = item.category;
  price.innerHTML = `₹ ${item.price}`;

  let button = document.createElement("button");
  button.classList.add("removeFromCart");
  button.innerText = "Remove";
  //add to our cart
  button.addEventListener("click", function () {
    console.log(item);
  });

  infoDiv.appendChild(heading);
  infoDiv.appendChild(category);
  infoDiv.appendChild(price);
  infoDiv.appendChild(button);

  //finally append this to root
  rootLi.appendChild(infoDiv);
  return rootLi;
}

//Check if the length is greater than 25
function returnTrimmedString(string) {
  if (string.length > 25) {
    return string.substr(0, 28) + "...";
  } else {
    return string;
  }
}

function converToRupee(num) {
  return Math.floor(num * 73.53);
}
