import { Router } from 'express';
import CajaItemController from '../controllers/CajaItemController';

const router = Router();

router.post('/', CajaItemController.add);
router.get('/listadetalle/:page/:num/:id',CajaItemController.listadetalle)



export default router;
