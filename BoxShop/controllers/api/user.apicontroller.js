const db = require("../../database/models");

module.exports = {
 getUsers: async (req, res) => {
    try {
      let users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
          include: [
            [
              db.sequelize.literal(
                `CONCAT('http://localhost:4000/images/users/', avatar)`
              ),
              "urlAvatar",
            ],
            [
              db.sequelize.literal(
                `CONCAT('http://localhost:4000/api/users/profile/', id)`
              ),
              "url",
            ],
          ],
        },
   
      });



      res.json({
        count: users.length,
    
        users: users,
      });
    } catch (error) {
      console.log(error);
    }
  },

profile: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id, {
        attributes: {
          exclude: ["password"],
          //! include: [
          //! ["http://localhost:4000/images/users/default.png", "urlAvatar"],
          //! ["http://localhost:4000/api/users/","url"]]
        },
      });
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};
