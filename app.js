require('dotenv').config(); // para usar variaveis de ambiente (tentar excluir p/ ver se funciona)

// importando dependencias
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// importanto as rotas
const indexRouter = require("./js/index");
const authRouter = require("./js/auth");
const loginRouter = require("./js/route_login");
const cadastroTesteRouter = require("./js/route_cadastro_teste")
const teste = require('./js/route_testes')

const PORT = 8080;
const PORTeste = 8081;

const app = express(); // criando o express app
const appTeste = express();

//habilitar segurança para requisição de outros sites
appTeste.use(cors())

// adicionando middleware para:
app.use(express.json()); // parsear o body do request como JSON
app.use(express.urlencoded({ extended: false })); // parsear o body do request como query string
app.use(cookieParser()); // parsear os cookies
app.use(express.static("./public")) // pegar os css funcoes
app.use(express.static("./public/dados")) // Verificar possibilidade de apagar linha

// adicionando rotas
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);
app.use("/cadastrodetestes", cadastroTesteRouter);
appTeste.use("/", teste)

//iniciando o servidor
app.listen(PORT, function () {
  console.log(`🚀 Escutando na porta ${PORT}`);
});

appTeste.listen(PORTeste, () => {
  console.log(`🚀 Escutando na porta ${PORTeste}`);
})

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, { // conecta com o banco de dados
    useNewUrlParser: "true", // string de conexão
    useUnifiedTopology: true, // objeto que contém opções usadas para configurar a conexão 
  })
  .then(() => {
    console.log("Sucesso na conexão com MongoDB!");
  });