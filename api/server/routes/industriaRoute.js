const express = require('express');
const industriaController = require("../controllers/industriaController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',industriaController.getData)
router.get('/:id',industriaController.getItem)
router.put('/:id/:tipo',industriaController.setUpdate)
router.post('/:tipo',industriaController.setCreate)
router.delete('/:id',industriaController.setDelete)
router.get('/listas/items',industriaController.getItems)
router.post('/search/lista',industriaController.getSearch)
module.exports = router;