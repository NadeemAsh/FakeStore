const cartButton = document.querySelector("#cartButton");
const dropdown = document.querySelector(".dropdown");

//Cart Toggle
cartButton.addEventListener("click", function () {
  if (!dropdown.classList.contains("active")) {
    dropdown.classList.add("active");
  } else {
    dropdown.classList.remove("active");
  }
});
