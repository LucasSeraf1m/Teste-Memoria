const dados = require('../public/dados/testes.json') 

const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send(dados)
})

router.post('/addTeste', (req, res) => {
    const { title } = req.body
})
// fs.writeFile('../public/dados/teste.json', JSON.stringify(json), 'utf-8', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });

module.exports = router;