class ProductsRepository {
  insertProducts = async (data) => {
    //aqui se insertaria la data a la base de datos
    console.log("se inserto un nuevo item");
    return ok;
  };

  getProducts = async (itemId) => {
    //aqui se obtendria la data de la base de datos
    //data fake

    let dataFake = [
      {
        itemId: "0509ed98-da97-47d5-8476-8be25c6b793d",
        code: "PEN",
        name: "Kalyptio Pen",
        description: "New Pen, Waterproof and Long life",
        price: 500,
        stock: 20,
        img: "https://appelboom.com/image/cache/catalog/Parker/51/Premium/parker-51-premium-black-gt-ballpoint-1100x1100.jpg",
      },
      {
        itemId: "0509ed98-8476-47d5-8476-47d5sc6b793d",
        code: "TSHIRT",
        name: "Kalyptio T-Shirt",
        description: "New Blue T-shir, Size M for Men",
        price: 2000,
        stock: 25,
        img: "https://http2.mlstatic.com/D_NQ_NP_895681-MLM48681706718_122021-W.jpg",
      },
      {
        itemId: "b793dd98-47d5-da97-8476-8be250509ed9",
        code: "MUG",
        name: "Kalyptio Coffee Mug",
        description: "Delicius Coffe , Life is too short to drink bad coffees.",
        price: 750,
        stock: 50,
        img: "https://www.kindpng.com/picc/m/280-2804802_transparent-taza-png-taza-de-ceramica-png-png.png",
      },
    ];

    if (itemId) dataFake = dataFake.filter((i) => i.itemId === itemId)[0];

    return dataFake;
  };

  updateProducts = async (data) => {
    //aqui se actualizaria los items en la base de datos
    return ok;
  };

  deleteProducts = async (data) => {
    //aqui se borrarian o deshabilitarian los items en la base de datos
    return ok;
  };
}
module.exports = new ProductsRepository();
