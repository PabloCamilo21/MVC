import express from 'express';
import controllerRaiz from '../controller/controllerRoot.js';
import usuarioController from '../controller/controllerUsuario.js';
import controllerProduto from '../controller/controllerProduto.js';

const router = express.Router();

//Rotas usuário
router.get('/', controllerRaiz.raiz);
router.post('/cadastro', usuarioController.cadastrar);
router.post('/login', usuarioController.login);

//Rotas produto
router.post('/cadastro-produto', controllerProduto.cadastrar);
router.get('/listar-produtos', controllerProduto.listar);
router.get('/listar-produtos/:id', controllerProduto.listarPorId);
router.put('/editar-produto/:id', controllerProduto.editar);
router.delete('/deletar-produto/:id', controllerProduto.deletar);
export default router;

