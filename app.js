const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port = 4000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method; 
    return method;
  }
}));


app.use((req, res, next) => {
  console.log(`Método: ${req.method}, Ruta: ${req.url}`);
  console.log("Body:", req.body);
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const homeRoutes = require("./routes/index.routes");
const productRoutes = require("./routes/products.routes");

app.use("/", homeRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
