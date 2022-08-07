const productsRepository = require("../repositories/products.repository");
const { v4: uuid } = require("uuid");
class ProductsService {
  insertProducts = async (data) => {
    data = { itemId: uuid(), ...data };
    //const result = await productsRepository.insertProducts(data);
    //return result;
    return { status: true, message: "Product Added", data };
  };
  getProduct = async (data) => {
    const { itemId } = data;
    const result = await productsRepository.getProducts(itemId);
    return { status: true, message: "Product Found", data: result };
  };
  getAllProducts = async () => {
    const result = await productsRepository.getProducts("");
    return { status: true, message: "Product Found(s)", data: result };
  };
  updateProducts = async (data) => {
    //const result = await productsRepository.updateProducts(data);
    //return result;
    return { status: true, message: "Product Updated", data: "ok" };
  };
  deleteProducts = async (data) => {
    //const result = await productsRepository.deleteProducts(data);
    //return result;
    return { status: true, message: "Product Deleted", data: "ok" };
  };
}
module.exports = new ProductsService();
