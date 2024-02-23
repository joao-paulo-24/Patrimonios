var mongoose = require("mongoose");
var User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require("../jwt_secret/config");

var sessionController = {};

// redireciona para o login de users
sessionController.login = function (req, res) {
  if (false) {
    console.log("Erro a ler");
    res.redirect("/error");
  } else {
    res.render("paginainicial/loginUser");
  }
};

// apos ser submetido o login, verifica tudo o necessário para fazer o login ou entao redireciona novamente para a pagina de login
sessionController.loginSub = async function (req, res, next) {
  const usernameInput = req.body.userName;
  const passwordInput = req.body.password;
  const user = await User.findOne({ userName: usernameInput });

  if (user) {
    await bcrypt.compare(passwordInput, user.password).then(function (result) {
      if (result == true) {
        const jwtToken = jwt.sign(
          { userName: user.userName, tipoUser: user.tipoUser },
          config.secret,
          { expiresIn: 86000 }
        );
        var raw = user.toObject();
        delete raw.password;
        res.cookie("sessionToken", jwtToken, { maxAge: 700000 });
        if (user.tipoUser == "Administrador") {
          res.cookie("utilizador", raw, { maxAge: 700000 });
          res.redirect("/admin");
        } else if (user.tipoUser == "Empregado") {
          res.cookie("utilizador", raw, { maxAge: 700000 });
          res.redirect("/emp");
        }else{
          res.clearCookie("sessionToken");
          res.clearCookie("utilizador");
          res.redirect("/login/login");
        }
      } else {
        res.redirect("/login/login");
      }
    });
  } else {
    res.redirect("/login/login");
  }
};

// usada para, ao carregar no botao de "sair", levar para a pagina de login
sessionController.logout = function (req, res, next) {
  res.clearCookie("sessionToken");
  res.clearCookie("utilizador");
  res.redirect("/login/login");
};

// redireciona para o registo de users
sessionController.registo = function (req, res) {
  if (false) {
    console.log("Erro a ler");
    res.redirect("/error");
  } else {
    res.render("paginainicial/registoUser");
  }
};

// cria 1 user como resposta a um post de um form
sessionController.create = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  var user = new User(req.body);
  user.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/");
    }
  });
};

// verifica se o ha um usuario logado
sessionController.verifyLoginUser = function (req, res, next) {
  const authToken = req.cookies["sessionToken"];
  if (authToken) {
    jwt.verify(authToken, config.secret, function (err, decoded) {
      req.userName = decoded;
      req.tipoUser = decoded;
      next();
    });
  } else {
    res.redirect("/login/login");
  }
};

////////////////// CONTROLLERS DA REST API //////////////////

sessionController.loginREST = function (req, res) {
  User.findOne({ userName: req.body.userName }, function (err, user) {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (!user) {
      return res.status(404).send("No user found");
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86000,
    });

    const utilizador = user;

    res.status(200).send({ auth: true, token: token, utilizador: utilizador });
  });
};

sessionController.createREST = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;

  User.create(
    {
      nome: req.body.nome,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      tipoUser: "Cliente",
      pontos: 0,
    },
    function (err, user) {
      console.log(user);
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(user);
    }
  );

};

sessionController.verifyLoginUserREST = function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    // if everything is good, save to request for use in other routes
    req._id = decoded.id;
    next();
  });
};

module.exports = sessionController;
