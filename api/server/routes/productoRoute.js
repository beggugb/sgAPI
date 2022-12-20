import { Router } from 'express'
import productoController from '../controllers/productoController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',productoController.getData)
router.get('/item/:id',productoController.getItem)
router.put('/:id/:tipo',productoController.setUpdate)
router.post('/:tipo',productoController.setCreate)
router.delete('/:id',productoController.setDelete)
router.get('/lista/items',productoController.getItems)
router.post('/search/lista',productoController.getSearch)
router.get('/item/copiar/:id',productoController.setCopiar)
// new end point
router.post('/search/items',productoController.getSearchItems)
export default router;