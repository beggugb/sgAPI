import { Router } from 'express';
import MarcaController from '../controllers/MarcaController';

const router = Router();
router.get('/lista',MarcaController.lista)

export default router;
