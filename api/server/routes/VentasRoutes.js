import { Router } from 'express';
import VentaController from '../controllers/VentaController';

const router = Router();
router.post('/', VentaController.add);
export default router;
