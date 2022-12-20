const express = require('express');
const modeloController = require("../controllers/modeloController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',modeloController.getData)
router.get('/:id',modeloController.getItem)
router.put('/:id/:tipo',modeloController.setUpdate)
router.post('/:tipo',modeloController.setCreate)
router.delete('/:id',modeloController.setDelete)
router.get('/listas/items',modeloController.getItems)
router.get('/listas/items/:id',modeloController.getList)
router.post('/search/lista',modeloController.getSearch)
module.exports = router;