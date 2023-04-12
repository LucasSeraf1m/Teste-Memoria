var express = require("express");
var router = express.Router();
const { hash } = require("bcryptjs");

const Usuario = require("./usuario"); // importando o modelo do usuario

// request de sign up
router.post("/signup", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email: email }); // 1. checa se o usuario já existe
        
        // se o usuario ja existe retorna erro
        if(usuario){
            return res.status(500).json({
                message: "Usuario já existe! Tente fazer login",
                type: "warning",
            });
        };
        // 2. se o usuario não existe, cria um novo
        // hashing da senha
        const hashSenha = await hash(senha, 10);
        const novoUsuario = new Usuario({
            email: email,
            senha: hashSenha,
        });
        // 3. salva o usuario na base de dados
        await novoUsuario.save();
        // 4. envia a resposta
        res.status(200).json({
            message: "Usuario criado com sucesso!",
            type: "sucess",
        });
    } catch(error) {
        res.status(500).json({
            type: "error",
            message: "Erro criando usuario!",
            error,
        });
    }
});

module.exports = router;