import { Router } from 'express'
import ventaController from '../controllers/ventaController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',ventaController.getData)
router.get('/item/:id',ventaController.getItem)
router.put('/:id/:tipo',ventaController.setUpdate)
router.post('/:tipo',ventaController.setCreate)
router.delete('/:id',ventaController.setDelete)
router.post('/search/lista',ventaController.getSearch)

router.put('/aprobar/:id/:tipo',ventaController.setAprobar)
export default router;