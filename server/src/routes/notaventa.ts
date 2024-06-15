import { Router } from 'express';
import { getNotaventas, GetNotaventa, NewNotaventa, UpdateNotaventa, DeleteNotaventa } from '../controllers/notaventa';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getNotaventas)
router.get('/:id',validateToken, GetNotaventa)
router.post('/',validateToken, NewNotaventa)
router.put('/:id',validateToken, UpdateNotaventa)
router.delete('/:id',validateToken, DeleteNotaventa)

export default router;