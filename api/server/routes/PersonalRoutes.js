import { Router } from 'express';
import PersonalController from '../controllers/PersonalController';

const router = Router();
router.get('/listas/:page/:num/:prop/:orden',PersonalController.lista)
router.get('/:id',PersonalController.item)
router.post('/registro', PersonalController.registro);
router.post('/', PersonalController.add);
router.put('/:id', PersonalController.update);
router.delete('/:id', PersonalController.delete);
router.post('/search',PersonalController.search);
export default router;
