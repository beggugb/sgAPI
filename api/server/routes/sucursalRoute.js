const express = require('express');
const sucursalController = require("../controllers/sucursalController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',sucursalController.getData)
router.get('/:id',sucursalController.getItem)
router.put('/:id/:tipo',sucursalController.setUpdate)
router.post('/:tipo',sucursalController.setCreate)
router.delete('/:id/:tipo',sucursalController.setDelete)
router.get('/listas/items',sucursalController.getItems)
router.post('/search/lista',sucursalController.getSearch)

/**Compuesto 
router.post('/search/lista',sucursalController.listaStock)
router.get('/list/:name/:value', sucursalController.getList);*/
module.exports = router;

