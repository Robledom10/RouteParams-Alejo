import { Router } from 'express';
import { productsController } from '../controllers/product.controller';

const router = Router();

router.get('/', productsController.getAllProducts);

export default router;