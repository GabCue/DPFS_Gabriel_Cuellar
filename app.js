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

app.use("/", homeRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes); 

app.listen(port, async () => {
  await db.sequelize.sync({ force: false });
  console.log("All models were synchronized successfully.");
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
