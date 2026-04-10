import express from 'express';
import controllerRaiz from '../controller/controllerRoot.js';
import usuarioController from '../controller/controllerUsuario.js';

const router = express.Router();

router.get('/', controllerRaiz.raiz);
router.post('/usuario', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
export default router;

