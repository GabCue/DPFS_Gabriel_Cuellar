const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const db = require("./database/models");

const app = express();
const port = 4000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


app.use(session({
  secret: "mensaje secreto",
  resave: false,
  saveUninitialized: true
}));

const userInView = require('./middlewares/userInView');
app.use(userInView);


const homeRoutes = require("./routes/index.routes");
const productRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/user.routes"); 

const userapiRoutes = require("./routes/api/user.apiroutes");
const productsApiRoutes = require("./routes/api/products.apiroutes");
const categoriesApiRoutes = require("./routes/api/categories.apiroutes");


app.use("/", homeRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes); 

app.use("/api/users",userapiRoutes);
app.use("/api/products", productsApiRoutes);
app.use("/api/categories", categoriesApiRoutes);

app.listen(port, async () => {
  //await db.sequelize.sync({ force: false });
  //console.log("All models were synchronized successfully.");
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
