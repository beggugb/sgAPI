const express = require('express');
const volumenController = require("../controllers/volumenController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',volumenController.getData)
router.get('/:id',volumenController.getItem)
router.put('/:id/:tipo',volumenController.setUpdate)
router.post('/:tipo',volumenController.setCreate)
router.delete('/:id',volumenController.setDelete)
router.get('/listas/items',volumenController.getItems)
router.post('/search/lista',volumenController.getSearch)
module.exports = router;