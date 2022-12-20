import { Router } from 'express';
import KeyToken from './keyToken'
import TareaController from '../controllers/TareaController';

const router = Router();

/*Lista protegida
router.post('/lista', TareaController.lista);
router.post('/', TareaController.add);
router.put('/:id', TareaController.update);*/

router.post('/lista/items', TareaController.getData);
router.post('/:tipo', TareaController.setCreate);
router.get('/:id', TareaController.getItem);
router.put('/:id/:tipo',TareaController.setUpdate)
router.post('/search/lista',TareaController.getDelete)

export default router;
