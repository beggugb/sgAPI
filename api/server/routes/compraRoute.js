import { Router } from 'express'
import compraController from '../controllers/compraController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',compraController.getData)
router.get('/item/:id',compraController.getItem)
router.put('/:id/:tipo',compraController.setUpdate)
router.post('/:tipo',compraController.setCreate)
router.delete('/:id',compraController.setDelete)
router.post('/search/lista',compraController.getSearch)

router.put('/aprobar/:id/:tipo',compraController.setAprobar)
export default router;
