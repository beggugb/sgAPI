const express = require('express');
const proveedorController = require("../controllers/proveedorController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',proveedorController.getData)
router.get('/item/:id',proveedorController.getItem)
router.put('/:id/:tipo',proveedorController.setUpdate)
router.post('/:tipo',proveedorController.setCreate)
router.delete('/:id',proveedorController.setDelete)
router.post('/search/lista',proveedorController.getSearch)
router.get('/listas/items',proveedorController.getItems)
module.exports = router;