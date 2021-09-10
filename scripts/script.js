window.addEventListener("DOMContentLoaded", fetchData);

//Fetch API
async function fetchData() {
  let response = await fetch("./products.json");
  let data = response.json();
  console.log(data);
}
