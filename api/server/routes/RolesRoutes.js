import { Router } from 'express';
import RolController from '../controllers/RolController';

const router = Router();
router.get('/lista',RolController.lista)

export default router;
