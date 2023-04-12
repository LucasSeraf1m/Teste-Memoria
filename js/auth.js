var express = require("express");
var router = express.Router();
const { hash, compare } = require("bcryptjs");

const Usuario = require("./usuario"); // importando o modelo do usuario
const{
    criarAccessToken,
    criarRefreshToken,
    enviarAcessToken,
    enviarRefreshToken,
} = require("./tokens");

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
            message: "Erro criando usuario",
            error,
        });
    }
});

// request de sign in
router.post("/signin", async (req, res) => {
    try{
        const{ email, senha } = req.body;
        const usuario = await Usuario.findOne({ email: email}); // 1. checa se o usuario existe

        // se usuario não existe, retorna erro
        if(!usuario){
            return res.status(500).json({
                message: "Usuario não existe",
                type: "error",
            });
        };
        
        const seCorresponde = await compare(senha, usuario.senha); // 2. se o usuario existe, checa se a senha esta correta

        // se a senha não está correta, retorna erro
        if(!seCorresponde){
            return res.status(500).json({
                message: "Senha está incorreta",
                type: "error",
            });
        };

        // 3. se a senha está correta, cria os tokens
        const accessToken = criarAccessToken(usuario._id);
        const refreshToken = criarRefreshToken(usuario._id);

        // 4. coloca refresh token na base de dados
        usuario.refreshtoken = refreshToken;
        await usuario.save();

        enviarRefreshToken(res, refreshToken);
        enviarAcessToken(req, res, accessToken);
    } catch(error){
        res.status(500).json({
            type: "error",
            message: "Erro ao fazer sign in",
            error,
        });
    }
});

module.exports = router;