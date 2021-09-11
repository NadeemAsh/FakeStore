class Cart {
  constructor() {
    this.cartList = [];
    this.cartLength = 0;
  }

  getListOfCartItems() {
    if (this.cartLength === 0) {
      return "Nothing in Cart";
    } else {
      return this.cartList;
    }
  }

  getCountOfItemsInCart() {
    return this.cartLength;
  }

  addItemToCart(item) {
    this.cartList.push(item);
    this.cartLength++;
  }

  increaseItemCount(id) {
    let index = this.cartList.indexOf(id);
    index.quantity++;
    this.cartLength++;
  }

  decreaseItemCount(id) {
    let index = this.cartList.indexOf(id);
    index.quantity--;
    this.cartLength--;
  }

  //This removes the complete item and not the quantity
  removeItemFromCart(item) {
    if (this.cartList.indexOf(item) > -1) {
      return "Remove from Cart";
    }
  }



  calculateTotal() {
    return "total";
  }
}
