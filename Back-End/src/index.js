import express from 'express';
import conexao from '../config/db.js';
import routers from './rotas/routers.js';

const app = express();

app.use(express.json());
app.use(routers);

conexao.query("select 1")
.then(()=>{
    console.log("Sucesso");
    app.listen(3001, ()=>{
        console.log("Servidor rodando na url: http://localhost:3001");
    });
})
.catch(erro => console.log("Falha na conexão \n" + erro));