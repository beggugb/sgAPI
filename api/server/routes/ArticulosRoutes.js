import { Router } from 'express';
import ArticuloController from '../controllers/ArticuloController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',ArticuloController.lista)
router.post('/registro', ArticuloController.add);
router.put('/:id', ArticuloController.update);
router.get('/:id',ArticuloController.item);
router.post('/search',ArticuloController.search);
router.post('/search',ArticuloController.search);
export default router;
