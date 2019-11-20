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

export class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
}
