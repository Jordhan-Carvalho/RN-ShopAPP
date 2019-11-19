export class Product {
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export class CartItem {
  constructor(quantity, price, title, sum) {
    this.quantity = quantity;
    this.price = price;
    this.title = title;
    this.sum = sum;
  }
}
