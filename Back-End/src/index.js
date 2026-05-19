import express from 'express';
import conexao from '../config/db.js';
import routers from './rotas/routers.js';
import verificarToken from '../src/middlewares/token.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();


app.use(express.json());
app.use(cors()); //Biblioteca para permitir a comunicação http de servidores externos (web)
//app.use(routers);

const swaggerDocument = YAML.load('./src/swagger.yaml');

// Swagger
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

//Verificação de rotas na API
app.use('/api', verificarToken);

app.use('/', routers);

conexao.query("select 1")
    .then(() => {
        console.log("Sucesso");
        app.listen(3001, () => {

            console.log("Servidor rodando na url: http://localhost:3001");

            console.log('Swagger disponivel em:');
            console.log('http://localhost:3001/docs');
        });
    })
    .catch(erro => console.log("Falha na conexão \n" + erro));