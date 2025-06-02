const { where } = require("sequelize");
const db = require("../../database/models");

module.exports = {
  getProducts: async (req, res) => {
    let products = await db.Product.findAll({
      include: ["productType", "categories"],
      attributes: {
        exclude: ["alt"],
        include: [
          [
            db.sequelize.literal(
              `CONCAT('${process.env.SV_HOST}:${process.env.PORT}/images/products/', Product.image)`
            ),
            "urlAvatar",
          ],
          [
            db.sequelize.literal(
              `CONCAT('${process.env.SV_HOST}:${process.env.PORT}/api/products/detail/', Product.id)`
            ),
            "url",
          ],
        ],
      },
    });

    // Para contar productos por categoría correctamente:
    const countByCategory = await db.Product.findAll({
      attributes: [
        [db.sequelize.col("categories.name"), "categoryName"],
        [db.sequelize.fn("COUNT", db.sequelize.col("Product.id")), "count"],
      ],
      include: [
        {
          model: db.Category,
          as: "categories",
          attributes: [],
          through: { attributes: [] },
        },
      ],
      group: ["categories.name"],
      raw: true,
    });

    let countObject = {};
    countByCategory.forEach((item) => {
      countObject[item["categoryName"]] = parseInt(item.count);
    });

    res.json({
      count: products.length,
      countByCategory: countObject,
      products,
    });
  },

  detail: async (req, res) => {
    try {
      let prodFound = await db.Product.findByPk(req.params.id, {
        include: ["productType", "categories"],
        attributes: {
          exclude: ["product_type_id"], // Cambiar esto según tus columnas reales
        },
      });

      res.json(prodFound);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error en el servidor" });
    }
  },

  lastProduct: async (req, res) => {
    try {
      let prodFound = await db.Product.findOne({
        include: ["productType", "categories"],
        attributes: {
          exclude: ["product_type_id"],
        },
        order: [["id", "DESC"]],
      });

      res.json(prodFound);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error en el servidor" });
    }
  },
};
