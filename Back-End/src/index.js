import express from 'express';
import conexao from '../config/db.js';
import routers from './rotas/routers.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors()); //Biblioteca para permitir a comunicação http de servidores externos (web)
app.use(routers);

conexao.query("select 1")
.then(()=>{
    console.log("Sucesso");
    app.listen(3001, ()=>{
        console.log("Servidor rodando na url: http://localhost:3001");
    });
})
.catch(erro => console.log("Falha na conexão \n" + erro));