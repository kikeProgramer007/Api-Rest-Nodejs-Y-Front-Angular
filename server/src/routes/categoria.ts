import { Router } from 'express';
import { GetLista, Buscar, Crear, Modificar, Eliminar } from '../controllers/categoria';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, GetLista)//obtner lista
router.get('/:id',validateToken, Buscar)//buscar
router.post('/',validateToken, Crear) //Crear
router.put('/:id',validateToken, Modificar)//modificar
router.delete('/:id',validateToken, Eliminar)

export default router;