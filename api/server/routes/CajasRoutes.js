import { Router } from 'express';
import CajaController from '../controllers/CajaController';

const router = Router();

router.post('/', CajaController.add);
router.get('/listadetalle/:page/:num/:id',CajaController.listadetalle)
router.put('/:id', CajaController.update);
router.get('/:id', CajaController.item);
router.get('/items/:id', CajaController.items);

/*router.get('/todu/cajas/actualizacion', CajaController.todu);*/

export default router;
