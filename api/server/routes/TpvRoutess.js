import { Router } from 'express';
import TpvController from '../controllers/TpvController';

const router = Router();
router.get('/listas/:page/:num/:categoria',TpvController.listas)
export default router;
