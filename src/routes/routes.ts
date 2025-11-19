import { Router } from 'express';
import { productsController } from '../controllers/product.controller';

const router = Router();

router.get('/', productsController.getAllProducts);
router.get("/:id", productsController.getById);
router.post("/", productsController.postProduct)
router.put("/:id", productsController.putProduct);
router.delete("/:id", productsController.delete);


export default router;