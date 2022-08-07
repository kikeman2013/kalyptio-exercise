const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname + "/dist")));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//contection to bd
//require("./helpers/mongooseConnection.helper");

// Routes
app.use(require("./routes/index.routes"));

// Server running
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
