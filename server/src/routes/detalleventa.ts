import { Router } from 'express';
import { getDetalleventas, GetDetalleventa, NewDetalleventa, UpdateDetalleventa, DeleteDetalleventa } from '../controllers/detalleventa';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getDetalleventas)
router.get('/:id',validateToken, GetDetalleventa)
router.post('/',validateToken, NewDetalleventa)
router.put('/:id',validateToken, UpdateDetalleventa)
router.delete('/:id',validateToken, DeleteDetalleventa)

export default router;