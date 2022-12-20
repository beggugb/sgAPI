import { Router } from 'express'
import stockController from '../controllers/stockController';

const router = Router();
router.post('/items',stockController.getSearchItems)
export default router;