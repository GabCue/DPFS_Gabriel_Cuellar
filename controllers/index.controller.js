const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

module.exports = {
  home: (req, res) => {
    // Leer el archivo de productos
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    // Crear un array de imágenes para el carrusel
    const productImages = products.map(product => ({
      image: "/Images/" + product.imagen,  // Ruta pública para la imagen
      alt: product.alt || "Imagen de producto",  // Usar la propiedad alt en lugar de imgAlt
      title: product.nombre || "Producto"  // Usar el nombre del producto como título
    }));

    // Si quieres solo las 3 primeras imágenes para el carrusel
    const carouselImages = productImages.slice(0, 3);

    // Pasar los datos a la vista
    res.render("home", { products, productImages, carouselImages });
  },

  homeADM: (req, res) => {
    // Devuelve todos los productos en formato JSON para administración
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    res.json(products);
  }
};
