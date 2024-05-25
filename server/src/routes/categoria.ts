import { Router } from 'express';
import { GetLista, Buscar, Crear, Modificar, Eliminar } from '../controllers/categoria';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, GetLista)
router.get('/:id',validateToken, Buscar)
router.post('/',validateToken, Crear)
router.put('/:id',validateToken, Modificar)
router.delete('/:id',validateToken, Eliminar)

export default router;