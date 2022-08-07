const basketRepository = require("../repositories/basket.repository");
const { ifExist } = require("../helpers/bd.basket.helper");

const { v4: uuid } = require("uuid");
class BasketService {
  insertBasket = async (data) => {
    let { cart } = data;
    cart = { basketId: uuid(), ...cart };
    const result = await basketRepository.insertBasket(cart);
    return result;
  };
  get = async (data) => {
    const { basketId } = data;
    if (!ifExist(basketId))
      throw { status: false, message: "basketId dont exist" };
    const result = await basketRepository.get(basketId);
    return result;
  };
  getTotal = async (data) => {
    const { basketId } = data;
    if (!ifExist(basketId))
      throw { status: false, message: "basketId dont exist" };
    const result = await basketRepository.getTotal(basketId);
    return result;
  };
  updateBasket = async (data) => {
    const result = await basketRepository.updateBasket(data);
    return result;
  };
  deleteBasket = async (data) => {
    const result = await basketRepository.deleteBasket(data);
    return result;
  };
  getExist = async ({ basketId }) => {
    return ifExist(basketId);
  };
}
module.exports = new BasketService();
