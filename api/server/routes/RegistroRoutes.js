import { Router } from 'express';
import RegistroController from '../controllers/RegistroController';

const router = Router();
router.post('/',RegistroController.add)
export default router;
