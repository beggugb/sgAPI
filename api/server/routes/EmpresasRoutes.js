import { Router } from 'express';
import EmpresaController from '../controllers/EmpresaController';

const router = Router();
router.put('/:id', EmpresaController.update);
router.get('/:id/:tipo', EmpresaController.item);
export default router;
