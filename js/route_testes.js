const fs = require("fs")
const dados = require('../public/dados/testes.json') 
const dadosResult = require('../public/dados/resultados.json') 
const bodyParser = require('body-parser')
const express = require("express");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())


router.get('/', (req, res) => {
    res.send(dados)
})

router.get('/result', (req, res) => {
    res.send(dadosResult)
})

router.put('/add', async (req, res) => {
    var testes = req.body
    fs.unlinkSync('public/dados/testes.json')
    fs.writeFileSync('public/dados/testes.json', JSON.stringify(testes, null, 2), {encoding: "utf-8", flag: "a"})
})

router.put('/addResult', async (req, res) => {
    var testes = req.body
    fs.unlinkSync('public/dados/resultados.json')
    fs.writeFileSync('public/dados/resultados.json', JSON.stringify(testes, null, 2), {encoding: "utf-8", flag: "a"})
})

module.exports = router;