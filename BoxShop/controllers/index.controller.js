const { Product, ProductType, Category } = require("../database/models");

module.exports = {
  home: async (req, res) => {
    try {
      // Traer productos desde la base de datos
      const products = await Product.findAll({
        include: [
          { model: ProductType, as: "productType" },
          { model: Category, as: "categories", through: { attributes: [] } }
        ]
      });

      // Crear un array de imágenes para el carrusel
      const productImages = products.map(product => ({
        image: "/Images/" + product.image,
        alt: product.alt || "Imagen de producto",
        title: product.name || "Producto"
      }));

      const carouselImages = productImages.slice(0, 3); // solo 3 imágenes

      res.render("home", { products, productImages, carouselImages });
    } catch (error) {
      console.error("Error al cargar productos en home:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  homeADM: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          { model: ProductType, as: "productType" },
          { model: Category, as: "categories", through: { attributes: [] } }
        ]
      });

      res.json(products);
    } catch (error) {
      console.error("Error al cargar productos en homeADM:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
};
