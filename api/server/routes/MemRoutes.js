import { Router } from 'express';
import MembresiaController from '../controllers/MembresiaController';

const router = Router();
router.get('/data/:page/:num/:prop/:orden',MembresiaController.lista)
router.get('/:id/:tipo', MembresiaController.getIItem);
router.put('/:id', MembresiaController.updateMembresia);
router.post('/search',MembresiaController.searchMembresia);

/*router.post('/', MembresiaController.add);
router.get('/:id', MembresiaController.getItem);
router.put('/:id', MembresiaController.update);
router.get('/detalle/:page/:num/:id', MembresiaController.getDetalle);
router.get('/listadetalle/:page/:num/:id',MembresiaController.listadetalle)
router.delete('/:id', MembresiaController.delete);
*/

export default router;
