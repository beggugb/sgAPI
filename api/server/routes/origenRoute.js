const express = require('express');
const origenController = require("../controllers/origenController.js");

const router = express.Router();

router.get('/data/:page/:num/:prop/:value',origenController.getData)
router.get('/:id',origenController.getItem)
router.put('/:id/:tipo',origenController.setUpdate)
router.post('/:tipo',origenController.setCreate)
router.delete('/:id',origenController.setDelete)
router.get('/listas/items',origenController.getItems)
router.post('/search/lista',origenController.getSearch)
module.exports = router;