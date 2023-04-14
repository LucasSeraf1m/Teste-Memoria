const { sign } = require("jsonwebtoken");

// assina o access token
const criarAccessToken = (id) => {
    return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 15 * 60,
    });
}

// assina o refresh token
const criarRefreshToken = (id) => {
    return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "90d",
    });
}

// enviando o access token ao cliente
const enviarAccessToken = (_req, res, accesstoken) => {
    res.json({
        accesstoken,
        message: "Sucesso no sign in!",
        type: "success",
    });
}

// envia o refresh token para o cliente como um cookie
const enviarRefreshToken = (res, refreshtoken) => {
    res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
    });
}

module.exports = {
    criarAccessToken,
    criarRefreshToken,
    enviarAccessToken,
    enviarRefreshToken,
}