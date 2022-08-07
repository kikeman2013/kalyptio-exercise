const mongoose = require("mongoose");
const urlConnection = "";
//Conexion a mongodb
connection = async () => {
  mongoose
    .connect(urlConnection, function () {
      console.log("Conexión realizada a BD");
    })
    .catch((err) => {
      console.error("Error iniciando App: ", err.stack);
      process.exit(1);
    });
};

connection();
