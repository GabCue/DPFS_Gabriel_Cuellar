const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

module.exports = {
  
  index: (req, res) => {
    try {
      let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
      res.render("products/list", { products });
    } catch (error) {
      res.status(500).send("Error al leer los productos");
    }
  },

  addForm: (req, res) => {
    res.render("products/add");
  },

 
  store: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const { nombre, tipo_de_producto, precio, categoria, alt } = req.body;

    const newProduct = {
      id: products.length + 1, 
      nombre,
      tipo_de_producto,
      precio,
      categoria,
      imagen: req.file ? req.file.filename : "default.png", 
      alt,
    };

    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), "utf-8");


    res.redirect(`/products/detail/${newProduct.id}`);
  },


  detail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const product = products.find((prod) => prod.id == req.params.id);
    
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("products/detail", { product });
  },

  // Mostrar formulario para editar un producto
  editForm: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const product = products.find((prod) => prod.id == req.params.id);
    
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("products/edit", { product });
  },

  update: (req, res) => {
    console.log("Solicitud recibida en UPDATE:", req.method);
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const { nombre, tipo_de_producto, precio, categoria, alt, descripción } = req.body;

    let prodFound = products.find((prod) => prod.id == req.params.id);

    if (!prodFound) {
      return res.status(404).send("Producto no encontrado");
    }

    prodFound.nombre = nombre || prodFound.nombre;
    prodFound.tipo_de_producto = tipo_de_producto || prodFound.tipo_de_producto;
    prodFound.precio = precio || prodFound.precio;
    prodFound.categoria = categoria || prodFound.categoria;
    prodFound.descripción = descripción || prodFound.descripción;
    prodFound.alt = alt || prodFound.alt;
    

    if (req.file) {
      prodFound.imagen = req.file.filename;
      prodFound.alt = alt || prodFound.alt;
    }

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), "utf-8");


    res.redirect(`/products/detail/${prodFound.id}`);
  },


  destroy: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const prodIndex = products.findIndex((prod) => prod.id == req.params.id);
    if (prodIndex === -1) {
      return res.status(404).send("Producto no encontrado");
    }
    const productToDelete = products[prodIndex];
    if (productToDelete.imagen !== "default.png") {
      fs.unlinkSync(path.join(__dirname, `../public/images/products/${productToDelete.imagen}`));
    }
    products.splice(prodIndex, 1);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), "utf-8");
    res.redirect("/products");
  },
};
