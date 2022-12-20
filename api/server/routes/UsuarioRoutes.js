import { Router } from 'express';
import KeyToken from './keyToken'
import UserController from '../controllers/UserController';

const router = Router();
router.post('/login', UserController.login);
//privadas
router.get('/listas/:page/:num/:prop/:orden',UserController.lista)
router.delete('/:id', UserController.delete);
router.post('/search',UserController.search);
router.post('/', UserController.registro);
router.get('/:id/:tipo', UserController.item);
router.put('/:id', UserController.update);
router.get('/testing/:id', UserController.testing);
/*router.get('/items/lista',UserController.listas)*/
router.get('/intro/listas/items',UserController.getItems)
export default router;
