import { Router } from 'express';
import FilesController from '../controllers/FilesController';

const router = Router();
router.put('/cliente/item/:id', FilesController.clientes);
router.put('/articulo/item/:id', FilesController.articulos);
/*router.put('/empresa/item/:id', FilesController.empresas);*/
export default router;
