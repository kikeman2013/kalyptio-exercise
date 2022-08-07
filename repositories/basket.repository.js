const { save, BD } = require("../helpers/bd.basket.helper");
const productsRepository = require("../repositories/products.repository");

class BasketRepository {
  insertBasket = async (data) => {
    BD.baskets.push(data);
    save(BD);
    return {
      status: true,
      message: `Basket created whit id: ${data.basketId}`,
      data: data,
    };
  };
  get = async (basketId) => {
    const basket = BD.baskets.filter(
      (basket) => basket.basketId === basketId
    )[0];
    return { status: true, message: "Basket Found", data: basket };
  };
  getTotal = async (basketId) => {
    //regresar el total
    let items = BD.baskets.filter((basket) => basket.basketId === basketId)[0]
      .items;
    let total = 0;
    for (const item of items) {
      total += await this.getTotalUnitOffer(item);
    }
    return {
      status: true,
      message: `Total Price to Basket`,
      data: total,
    };
  };

  updateBasket = async (data) => {
    let { basketId, cart } = data;
    BD.baskets.forEach((basket) => {
      if (basket.basketId === basketId) {
        basket.items = cart.items || basket.items;
        data = basket;
      }
    });

    save(BD);
    return {
      status: true,
      message: `Basket ${data.basketId} updated`,
      data: data,
    };
  };

  deleteBasket = async (data) => {
    BD.baskets = BD.baskets.filter(
      (basket) => basket.basketId !== data.basketId
    );
    save(BD);
    return {
      status: true,
      message: `Basket ${data.basketId} deleted`,
      data: data,
    };
  };

  //funcion helpers
  getTotalUnitOffer = async ({ code, count }) => {
    let price = 0;
    let offer = 0;
    const items = await productsRepository.getProducts("");
    const item = items.find((elem) => elem.code == code);
    switch (item.code) {
      case "PEN":
        offer = Math.trunc(count / 3);
        price = (count - offer) * item.price;
        break;
      case "TSHIRT":
        offer = count >= 3 ? item.price * 0.75 : item.price;
        price = count * offer;
        break;
      case "MUG":
        price = count * item.price;
        break;
    }
    return price;
  };
}
module.exports = new BasketRepository();
