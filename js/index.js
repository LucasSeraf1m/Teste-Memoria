var express = require("express");
var router = express.Router(); // cria o router

// GET pagina home 
router.get("/", function (req, res) {
    res.send("Olá Express!! 👋");
});

// GET auth
router.get("/auth", function (req, res) {
    res.send("Router do auth");
});

// GET login
router.get("/login", function (req, res) {
    res.sendFile('./html/login.html', { root: '.' });
});

module.exports = router;