const app = require('./config/express')();
const port = process.env.PORT || app.get('port');
const database = require('./src/data/database')

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});

database.connect();