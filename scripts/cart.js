class Cart {
  getListOfCartItems() {
    if (localStorage.getItem("CartLength") === 0) {
      console.log("Nothing in Cart");
    }
  }

  getCountOfItemsInCart() {
    if (!localStorage.getItem("CartLength")) {
      return 0;
    }
    return localStorage.getItem("CartLength");
  }

  addItemToCart(item, id) {
    if (!localStorage.getItem(id) && !localStorage.getItem("CartLength")) {
      localStorage.setItem(id, JSON.stringify(item));
      let idList = [];
      idList.push(id);
      localStorage.setItem("InCart", JSON.stringify(idList));
      let count = 0;
      localStorage.setItem("CartLength", count + 1);
    } else {
      if (localStorage.getItem(id)) {
        this.increaseItemCount(id);
      } else {
        localStorage.setItem(id, JSON.stringify(item));
        let idList = JSON.parse(localStorage.InCart);
        idList.push(id);
        localStorage.setItem("InCart", JSON.stringify(idList));
        this.increaseLength();
      }
    }
  }

  increaseItemCount(id) {
    let current = JSON.parse(localStorage.getItem(id));
    current.quantity += 1;
    localStorage.setItem(id, JSON.stringify(current));
    this.increaseLength();
  }

  decreaseItemCount(id) {
    let current = JSON.parse(localStorage.id);
    if (current.quantity === 1) {
      this.removeItemFromCart(id);
    } else {
      current.quantity -= 1;
      localStorage.setItem(id, JSON.stringify(current));
    }
    this.decreaseLength();
  }

  increaseLength() {
    localStorage.CartLength++;
    return;
  }

  decreaseLength() {
    localStorage.CartLength--;
    return;
  }

  //This removes the complete item and not the quantity
  removeItemFromCart(id) {
    if (localStorage.getItem(id)) {
      let itemsInCart = JSON.parse(localStorage.InCart);
      itemsInCart.splice(id, 1);
      localStorage.setItem("InCart", itemsInCart);
      localStorage.removeItem(id);
      this.decreaseLength();
    }
  }

  calculateTotal() {
    if (!localStorage.InCart) {
      return 0;
    } else {
      let itemList = JSON.parse(localStorage.InCart);
      let sum = 0;
      for (let i = 0; i < itemList.length; i++) {
        let item = JSON.parse(localStorage.getItem(itemList[i]));
        console.log(item);
        sum += item.price * item.quantity;
      }
      console.log(sum);
      return sum;
    }
  }
}
