import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',CategoriaController.listas)
router.post('/',CategoriaController.add)
router.put('/:id',CategoriaController.update)
router.get('/lista',CategoriaController.lista)

export default router;
