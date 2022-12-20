import { Router } from 'express';
import PaqueteController from '../controllers/PaqueteController';

const router = Router();
router.get('/lista',PaqueteController.listas)
router.get('/listas/:page/:num/:prop/:orden',PaqueteController.getAll)
router.post('/', PaqueteController.add);

router.get('/:id/:tipo', PaqueteController.item);
router.put('/:id', PaqueteController.actualizar);
router.delete('/:id', PaqueteController.borrar);

export default router;
