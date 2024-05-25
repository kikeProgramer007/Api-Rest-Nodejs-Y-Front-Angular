import { Router } from 'express';
import { getProducts, GetProduct, NewProduct, UpdateProduct, DeleteProduct } from '../controllers/product';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getProducts)
router.get('/:id',validateToken, GetProduct)
router.post('/',validateToken, NewProduct)
router.put('/:id',validateToken, UpdateProduct)
router.delete('/:id',validateToken, DeleteProduct)

export default router;