const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const db = require("../database/models"); 
const usersPath = path.join(__dirname, "../data/users.json");

module.exports = {
  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.isEmpty()) {
      let userToLogin;

      try {
       
        userToLogin = await db.User.findOne({ where: { email: req.body.email.trim().toLowerCase() } });
      } catch (error) {
        console.error('Error al buscar el usuario en la base de datos', error);
      }

      if (!userToLogin) {

        const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
        userToLogin = users.find((user) => user.email === req.body.email.trim().toLowerCase());
      }

      if (userToLogin) {
        const passOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (passOk) {
          delete userToLogin.password;
          userToLogin.avatar = userToLogin.avatar || "default.jpg";

          req.session.userLogged = userToLogin;

          if (req.body.rememberme === "on") {
            res.cookie("email", userToLogin.email, { maxAge: 60 * 1000 * 60 });
          }

          return res.redirect("/users/profile");
        }

        return res.render("users/login", {
          errors: {
            password: { msg: "Credenciales inválidas" },
          },
          old: req.body,
        });
      } else {
        return res.render("users/login", {
          errors: {
            email: { msg: "El email no se encuentra registrado" },
          },
          old: req.body,
        });
      }
    } else {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        old: req.body,
      });
    }
  },

  register: (req, res) => {
    res.render("users/register");
  },

  processRegister: async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

   
    try {
      const newUser = await db.User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        avatar: "default.jpg", 
      });

      let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
      users.push({
        id: newUser.id,
        first_name,
        last_name,
        email,
        password: hashedPassword,
        avatar: "default.jpg",
      });
      fs.writeFileSync(usersPath, JSON.stringify(users, null, "  "));

      res.redirect("/");
    } catch (error) {
      console.error('Error al registrar el usuario en la base de datos', error);
      res.render("users/register", {
        errors: {
          email: { msg: "Este email ya está registrado" },
        },
        old: req.body,
      });
    }
  },

  profile: (req, res) => {
    const user = req.session.userLogged;
  
    if (!user.avatar) {
      user.avatar = "default.jpg";
    }
  
    res.render("users/profile", { user });
  },

  edit: async (req, res) => {
    let userFound;

    try {
      
      userFound = await db.User.findByPk(req.params.id);
    } catch (error) {
      console.error('Error al buscar el usuario en la base de datos', error);
    }

    if (!userFound) {
      
      const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
      userFound = users.find((user) => user.id == req.params.id);
    }

    if (userFound) {
      return res.render("users/edit", { user: userFound });
    }
    return res.status(404).render("not-found", { title: "Usuario no encontrado" });
  },

  processUpdate: async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    let userFound;

    try {
      userFound = await db.User.findByPk(req.params.id);
    } catch (error) {
      console.error('Error al buscar el usuario en la base de datos', error);
    }

    if (userFound) {
      userFound.first_name = first_name;
      userFound.last_name = last_name;
      userFound.email = email;
      userFound.password = password === "" ? userFound.password : bcryptjs.hashSync(password, 10);

      if (req.file) {
        userFound.avatar = req.file.filename;
      } else if (!userFound.avatar || userFound.avatar.trim() === "") {
        userFound.avatar = "default.jpg";
      }

      try {
        await userFound.save();
        req.session.userLogged = { ...userFound.get(), password: undefined };
        res.redirect("/users/profile");
      } catch (error) {
        console.error('Error al actualizar el usuario en la base de datos', error);
      }
    } else {
      return res.status(404).render("not-found", { title: "Usuario no encontrado" });
    }
  },

  destroy: async (req, res) => {
    let users;

    try {
      users = await db.User.findAll();
      await db.User.destroy({ where: { id: req.params.id } });

      res.clearCookie("email");
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  },

  logout: (req, res) => {
    res.clearCookie("email");
    req.session.destroy();
    res.redirect("/users/login");
  },
};
