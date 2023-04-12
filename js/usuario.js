const { Schema, model } = require("mongoose");

const schemaUsuario = new Schema({ // define o schema do usuario
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

module.exports = model("Usuario", schemaUsuario); // exporta o modelo do usuario