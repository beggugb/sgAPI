const express = require('express');
const tipoController = require("../controllers/tipoController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',tipoController.getData)
router.get('/:id',tipoController.getItem)
router.put('/:id/:tipo',tipoController.setUpdate)
router.post('/:tipo',tipoController.setCreate)
router.delete('/:id',tipoController.setDelete)
router.get('/listas/items',tipoController.getItems)
router.post('/search/lista',tipoController.getSearch)
module.exports = router;