import { Router } from 'express';
import { getDetalleventas, GetDetalleventa, NewDetalleventa, UpdateDetalleventa, DeleteDetalleventa,PDFDetalleVenta } from '../controllers/detalleventa';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getDetalleventas)
router.get('/:id',validateToken, GetDetalleventa)
router.get('/pdf/:id',validateToken, PDFDetalleVenta) //VerPDF
router.post('/',validateToken, NewDetalleventa)
router.put('/:id',validateToken, UpdateDetalleventa)
router.delete('/:id',validateToken, DeleteDetalleventa)

export default router;