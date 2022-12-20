const express = require('express');
const marcaController = require("../controllers/marcaController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',marcaController.getData)
router.get('/:id',marcaController.getItem)
router.put('/:id/:tipo',marcaController.setUpdate)
router.post('/:tipo',marcaController.setCreate)
router.delete('/:id',marcaController.setDelete)
router.get('/listas/items',marcaController.getItems)
router.get('/listas/items/:id',marcaController.getList)
router.post('/search/lista',marcaController.getSearch)
module.exports = router;