import { Route, Router } from 'express'
import fileController from '../controllers/fileController'

const router = Router()
router.put('/cliente/item/:id',fileController.cliente)
router.put('/producto/item/:id',fileController.producto)
router.put('/empresa/item/:id',fileController.empresa)
router.put('/usuario/item/:id',fileController.usuario)
router.put('/proveedor/item/:id',fileController.proveedor)

export default router;