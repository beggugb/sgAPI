const express = require('express');
/*const categoriaController = require("../controllers/categoriaController");*/
import categoriaController from '../controllers/categoriaController';

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',categoriaController.getData)
router.get('/:id',categoriaController.getItem)
router.put('/:id/:tipo',categoriaController.setUpdate)
router.post('/:tipo',categoriaController.setCreate)
router.delete('/:id',categoriaController.setDelete)
router.post('/search/lista',categoriaController.getSearch)
router.get('/listas/items',categoriaController.getItems)
module.exports = router;