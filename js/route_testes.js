const fs = require("fs")
const dados = require('../public/dados/testes.json') 
const bodyParser = require('body-parser')
const express = require("express");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.send(dados)
})

router.put('/add', async (req, res) => {
    var testes = req.body
    fs.unlinkSync('public/dados/testes.json')
    fs.writeFileSync('public/dados/testes.json', JSON.stringify(testes, null, 2), {encoding: "utf-8", flag: "a"})
})

module.exports = router;