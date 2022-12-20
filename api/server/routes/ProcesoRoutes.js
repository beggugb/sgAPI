import { Router } from 'express';
import KeyToken from './keyToken'
import ProcesoController from '../controllers/ProcesoController';

const router = Router();
/*enlaces protegidos*/
/*router.get('/lista/:id', ProcesoController.lista);*/

export default router;
