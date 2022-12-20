import { Router } from 'express';
import PlanController from '../controllers/PlanController';

const router = Router();
router.put('/:id', PlanController.update);
export default router;
