var express = require("express");
var router = express.Router();
const { hash, compare } = require("bcryptjs");
const { verify } = require("jsonwebtoken")

const Usuario = require("./usuario"); // importando o modelo do usuario
const{
    criarAccessToken,
    criarRefreshToken,
    enviarAccessToken,
    enviarRefreshToken,
} = require("./tokens");
const { protected } = require("./protegido");

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
        }
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
        const usuario = await Usuario.findOne({ email: email }); // 1. checa se o usuario existe

        // se usuario não existe, retorna erro
        if(!usuario){
            return res.status(500).json({
                message: "Usuario não existe",
                type: "error",
            });
        }
        
        const seCorresponde = await compare(senha, usuario.senha); // 2. se o usuario existe, checa se a senha esta correta

        // se a senha não está correta, retorna erro
        if(!seCorresponde){
            return res.status(500).json({
                message: "Senha está incorreta",
                type: "error",
            });
        } 

        // 3. se a senha está correta, cria os tokens
        const accessToken = criarAccessToken(usuario._id);
        const refreshToken = criarRefreshToken(usuario._id);

        // 4. coloca refresh token na base de dados
        usuario.refreshtoken = refreshToken;
        await usuario.save();

        // 5. envia a resposta
        enviarRefreshToken(res, refreshToken);
        enviarAccessToken(req, res, accessToken);
    } catch(error){
        res.status(500).json({
            type: "error",
            message: "Erro ao fazer sign in",
            error,
        });
    }
});

// requisição de sign out
router.post("/logout", (_req, res) => {
    //limpa cookies
    res.clearCookie("refreshtoken");
    return res.json({
        message: "Sucesso no log out!",
        type: "success",
    });
});

// requisição do refresh token
router.post("/refresh_token", async (req, res) => {
    try{
        const{ refreshtoken } = req.cookies;

        // se não tem um refresh token, retorna erro
        if(!refreshtoken){
            return res.status(500).json({
                message: "Nenhum refresh token",
                type: "error",
            });
        }

        // se tem um refresh token, verifica ele
        let id;
        try{
            id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
        } catch(error){
            return res.status(500).json({
                message: "Refresh token inválido",
                type: "error",
            });
        }

        // se o refresh token é inválido, retornar erro
        if(!id){
            return res.status(500).json({
                message: "Refresh token inválido",
                type: "error",
            });
        }

        const usuario = await Usuario.findById(id); // se o refresh token é válido, checa se o usuario existe

        // se o usuario não existe, retorna erro
        if(!usuario){
            return res.status(500).json({
                message: "Usuario não existe",
                type: "error",
            });
        }

        // se o usuario existe, checa se o refresh token está correto, retorna erro se não estiver
        if(usuario.refreshtoken !== refreshtoken){
            return res.status(500).json({
                message: "Refresh token inválido",
                type: "error",
            });
        }

        // se o refresh token está correto, cria os novos tokens
        const accessToken = criarAccessToken(usuario._id);
        const refreshToken = criarRefreshToken(usuario._id);

        // atualiza o refresh token na base de dados
        usuario.refreshtoken = refreshToken;

        // envia os novos tokens como resposta
        enviarRefreshToken(res, refreshToken);
        return res.json({
            message: "Atualizado com sucesso!",
            type: "sucess",
            accessToken,
        });
    } catch(error){
        res.status(500).json({
            type: 'error',
            message: "Erro atualizando token",
            error,
        });
    }
});

router.get("/protected", protected, async (req, res) => {
    try{
        // se o usuario existe na requisição, envia os dados
        if(req.usuario){
            return res.json({
                message: "Você está logado!",
                type: "success",
                usuario: req.usuario,
            });
        }

        // se o usuario não existe, retorna erro
        return res.status(500).json({
            message: "Você não está logado",
            type: "error",
        });
    } catch(error){
        res.status(500).json({
            message: "Erro acessando rota protegida",
            type: "error",
            error,
        });
    }
});

module.exports = router;