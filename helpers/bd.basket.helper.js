//constante para obtener la base de datos(puede ser la conexion en caso de ser otro SGBD)
const BD = require("../bd/bd.json");
//constante para la librearia de gestor de archivos
const fs = require("fs");

//Funcion para guardar a la base de datos
const save = (BD) => {
  //funcion para reescribir la base de datos ya con los nuevos cambios hechos
  fs.writeFileSync("./bd/bd.json", JSON.stringify(BD, null, 2), {
    encoding: "utf-8",
  });
};

//funcion para comprobar si existe una canasta en la base de datos
const ifExist = (basketId) => {
  return BD.baskets.findIndex((basket) => basket.basketId === basketId) > -1;
};

//exportacion de las funciones y constante BD
module.exports = {
  save,
  ifExist,
  BD,
};
