import { Router } from 'express';
import SucursalController from '../controllers/SucursalController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',SucursalController.lista)
router.get('/lista',SucursalController.listas)
router.get('/:id',SucursalController.item)
router.post('/', SucursalController.add);
router.put('/:id', SucursalController.update);
router.delete('/:id', SucursalController.delete);

export default router;
