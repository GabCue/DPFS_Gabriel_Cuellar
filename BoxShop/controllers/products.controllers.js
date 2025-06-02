const fs = require("fs");
const path = require("path");
const { uploadProd } = require("../middlewares/multer");
const db = require("../database/models");
const { Product, Category, ProductType } = db;

const productsPath = path.join(__dirname, "../data/products.json");

module.exports = {
addForm: async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("products/add", { categories, product: {} });

  } catch (error) {
    console.error("Error al cargar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
},


store: async (req, res) => {
  try {
    const { name, description, price, available, product_type_id, category_ids, alt } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price: parseInt(price, 10),
      available: available === "true",
      product_type_id: parseInt(product_type_id, 10),
      alt,
      image: req.file ? req.file.filename : null, 
    });

    if (category_ids) {
      const categoriesArray = Array.isArray(category_ids) ? category_ids : [category_ids];
      await newProduct.setCategories(categoriesArray.map((id) => parseInt(id, 10)));
    }

    return res.redirect(`/products/detail/${newProduct.id}`);
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).send("Error interno del servidor");
  }
},


detail: async (req, res) => {
  try {
    const prodFound = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
        },
        {
          model: ProductType,
          as: "productType", 
        },
      ],
    });

    if (!prodFound) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("products/detail", { product: prodFound });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
},

  

list: async (req, res) => {
  try {
      const products = await Product.findAll({
      include: [
        { model: ProductType, as: "productType" },
        { model: Category, as: "categories", through: { attributes: [] } }
      ],
    });
    products.forEach(p => {
      console.log(`Producto: ${p.name}, Tipo: ${p.productType ? p.productType.name : 'Sin tipo'}`);
    });

    res.render("products/list", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al listar los productos");
  }
},



  editForm: async (req, res) => {
    try {
      const prodFound = await Product.findByPk(req.params.id, {
        include: {
          model: Category,
          as: "categories", 
          through: { attributes: [] }, 
        },
      });
  
      if (!prodFound) {
        return res.status(404).send("Producto no encontrado");
      }

      const categories = await Category.findAll(); 
      res.render("products/edit", { product: prodFound, categories: categories });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
  
  update: async (req, res) => {
  try {
    const { name, description, price, product_type_id, category_ids, alt } = req.body;
    const prodFound = await Product.findByPk(req.params.id);

    if (!prodFound) {
      return res.status(404).send("Producto no encontrado");
    }

    await prodFound.update({
      name,
      description,
      price: parseInt(price, 10),
      product_type_id: parseInt(product_type_id, 10),
      alt,
      image: req.file ? req.file.filename : prodFound.image, // Si hay nueva imagen, se reemplaza
    });

    if (category_ids) {
      const categoriesArray = Array.isArray(category_ids) ? category_ids : [category_ids];
      await prodFound.setCategories(categoriesArray.map((id) => parseInt(id, 10)));
    } else {
      await prodFound.setCategories([]);
    }

    res.redirect(`/products/detail/${prodFound.id}`);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
},


  
  
destroy: async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/products/list"); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
},

};
