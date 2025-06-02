const db = require("../../database/models");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await db.Category.findAll({
        attributes: ["id", "name"], // solo traemos id y nombre de la categoría
        include: [
          {
            model: db.Product,
            as: "products",
            attributes: ["id", "name", "price", "image"], 
            through: { attributes: [] }, 
          },
        ],
      });

      res.json({
        count: categories.length,
        categories,
      });
    } catch (error) {
      console.error("Error al obtener categorías con productos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
