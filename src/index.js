const bodyParser = require("body-parser");
const database = require("./database");
const app = require("express")()
const port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
require("./app/controllers/index")(app);
(async () => {
  await database.connect();
})();
