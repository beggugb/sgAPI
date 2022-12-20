import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const router = Router();
router.get('/data/:page/:num/:prop/:orden',ClienteController.lista)
router.get('/:id/:tipo',ClienteController.item)
router.post('/registro', ClienteController.registro);
router.post('/', ClienteController.add);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);
router.post('/search',ClienteController.search);
/*router.get('/lista',CategoriaController.lista)*/
/*router.get('/listas/items',ClienteController.getItems)*/
export default router;
