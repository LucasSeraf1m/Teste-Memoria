const dados = require('../public/dados/testes.json') 
const bodyParser = require('body-parser')
const express = require("express");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    fetch('http://localhost:8081/add', {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({"email": "email", "senha": "senha"})
    })
    res.send(dados)
})

router.post('/add', async (req, res) => {
    console.log(req.body.nometeste)
    res.send("TExtto" + req.body.nometeste)
})


// fs.writeFile('../public/dados/teste.json', JSON.stringify(json), 'utf-8', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });

module.exports = router;