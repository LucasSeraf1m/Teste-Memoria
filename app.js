require('dotenv').config(); // para usar variaveis de ambiente (tentar excluir p/ ver se funciona)

// importando dependencias
const express = require("express");
const cookieParser = require("cookie-parser");

// importanto as rotas
const indexRouter = require("./js/index");
const authRouter = require("./js/auth");

const PORT = 8080;

const app = express(); // criando o express app

// adicionando middleware para:
app.use(express.json()); // parsear o body do request como JSON
app.use(express.urlencoded({ extended: false })); // parsear o body do request como query string
app.use(cookieParser()); // parsear os cookies

// adicionando rotas
app.use("/", indexRouter);
app.use("/auth", authRouter);

// iniciando o servidor
app.listen(PORT, function () {
  console.log(`🚀 Listening on port ${PORT}`);
});

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, { // conectar com o banco de dados
    useNewUrlParser: "true", // string de conexão
    useUnifiedTopology: true, // objeto que contém opções usadas para configurar a conexão 
  })
  .then(() => {
    console.log("Sucesso na conexão com MongoDB!");
  });