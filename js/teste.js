const dados = require('../public/dados/testes.json') 

const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(dados)
})

module.exports = router;