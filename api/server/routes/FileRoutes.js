import { Router } from 'express';
import FileController from '../controllers/FileController';

const router = Router();

router.put('/upload/item/:id', FileController.upload);
router.put('/uploads/item/:id', FileController.uploads);


export default router;

