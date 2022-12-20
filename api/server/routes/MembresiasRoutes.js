import { Router } from 'express';
import MembresiaController from '../controllers/MembresiaController';

const router = Router();
router.post('/', MembresiaController.add);
router.get('/:id', MembresiaController.getItem);
router.put('/:id', MembresiaController.update);
router.get('/detalle/:page/:num/:id', MembresiaController.getDetalle);
router.get('/listadetalle/:page/:num/:id',MembresiaController.listadetalle)
router.delete('/:id', MembresiaController.delete);

router.get('/data/:page/:num/:prop/:orden',MembresiaController.lista)

export default router;
