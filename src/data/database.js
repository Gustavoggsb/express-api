const mongoose = require("mongoose");
require ('dotenv/config')

const url = process.env.DATABASE_URL

module.exports = {
    connect: async () => {
        console.log(url)
        try {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Conexão com o MongoDB estabelecida");
        } catch (error) {
            console.error("Erro ao conectar com o MongoDB"); 
            process.exit(1);
        }
    },
    users: mongoose.model("users", {
        _id: String,
        name: String,
        birthDate: String,
        cellphone: String,
        phone: String,
        email: String,
        occupation: String,
        state: String,
        createdAt: String,
    }),
};