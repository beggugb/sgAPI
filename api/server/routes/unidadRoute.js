const express = require('express');
const unidadController = require("../controllers/unidadController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',unidadController.getData)
router.get('/:id',unidadController.getItem)
router.put('/:id/:tipo',unidadController.setUpdate)
router.post('/:tipo',unidadController.setCreate)
router.delete('/:id',unidadController.setDelete)
router.get('/listas/items',unidadController.getItems)
router.post('/search/lista',unidadController.getSearch)
module.exports = router;