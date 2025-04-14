const fs = require("fs");
const path = require("path");

const db = require("../database/models");
const { Product, Category, ProductType } = db;

const productsPath = path.join(__dirname, "../data/products.json");

module.exports = {
  addForm: (req, res) => {
    res.render("products/add");
  },

  store: async (req, res) => {
    try {
      const { name, description, category_id, price, available } = req.body;

      const categoryDb = await Category.findByPk(category_id);

      if (!categoryDb) {
        return res.status(400).send("Categoría no válida");
      }

      const newProduct = await Product.create({
        name,
        description,
        category_id: categoryDb.id,
        price,
        available,
        image: req.file?.filename || "default.png",
      });

      // 👇 Guardar también en el archivo JSON
      const productsFile = fs.readFileSync(productsPath, "utf-8");
      const productsArray = JSON.parse(productsFile);

      const productForJson = {
        id: newProduct.id,
        name: newProduct.name,
        description: newProduct.description,
        category_id: newProduct.category_id,
        price: newProduct.price,
        available: newProduct.available,
        image: newProduct.image,
      };

      productsArray.push(productForJson);

      fs.writeFileSync(productsPath, JSON.stringify(productsArray, null, 2));

      res.redirect("/");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  detail: async (req, res) => {
    try {
      const prodFound = await Product.findByPk(req.params.id, {
        include: [{
          model: Category, 
          as: "categories", 
          through: { attributes: [] } 
        }],
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
      const products = await Product.findAll();
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
      const { name, description, price, available, product_type_id, categories } = req.body;
      const prodFound = await Product.findByPk(req.params.id);
  
      if (!prodFound) {
        return res.status(404).send("Producto no encontrado");
      }
  
   
      await prodFound.update({
        name,
        description,
        price,
        available,
        product_type_id,
      });
  
    
      if (categories && categories.length > 0) {
       
        await prodFound.setCategories([]); 
  
      
        await prodFound.setCategories(categories); 
      } else {
        
        const currentCategories = await prodFound.getCategories();
        await prodFound.setCategories(currentCategories); 
      }
  
    
      res.redirect(`/products/detail/${prodFound.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
  
  
  destroy: async (req, res) => {
    try {
      await Product.destroy({
        where: { id: req.params.id },
      });
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
};
