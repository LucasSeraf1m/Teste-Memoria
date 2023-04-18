const { verify } = require("jsonwebtoken");
const Usuario = require("./usuario");

const protected = async (req, res, next) => {
    const autorizacao = req.headers["authorization"]; // pega o token do header

    // se não possui token, retorna erro
    if(!autorizacao){
        return res.status(500).json({
            message: "Nenhum token",
            type: "error",
        });
    }

    // se possui token, verifica ele
    const token = autorizacao.split(" ")[1];
    let id;
    try{
        id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    } catch{
        return res.status(500).json({
            message: "Token inválido",
            type: "error",
        });
    }

    // se o token é inválido, retorna erro
    if(!id){
        return res.status(500).json({
            message: "Token inválido",
            type: "error",
        });
    }

    const usuario = await Usuario.findById(id); // se o token é válido, checa se o usuario existe

    // se o usuário não existe, retorna erro
    if(!usuario){
        return res.status(500).json({
            message: "Usuário não existe",
            type: "error",
        });
    }

    req.usuario = usuario; // se o usuario existe, adiciona o novo campo "usuario" no request

    next(); // chama o próximo middleware
}

module.exports = { protected }