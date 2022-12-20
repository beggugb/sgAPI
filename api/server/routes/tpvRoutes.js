import { Router } from 'express';
import TpvController from '../controllers/TpvController';

const router = Router();

router.post('/:tipo', TpvController.crear);

export default router;
