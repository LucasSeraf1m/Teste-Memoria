const { Schema, model } = require("mongoose");

const schemaUsuario = new Schema({ // definindo o schema do usuário
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    refreshtoken: {
        type: String,
    },
});

module.exports = model("Usuario", schemaUsuario); // exportando o modelo do usuário