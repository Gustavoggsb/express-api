const mongoose = require("mongoose");
require("dotenv/config");

const url = process.env.DATABASE_URL;
mongoose.Promise = global.Promise;

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log("Conexão com o MongoDB estabelecida");
    } catch (error) {
      console.error("Erro ao conectar com o MongoDB");
      console.error(error);
      process.exit(1);
    }
  },
};
