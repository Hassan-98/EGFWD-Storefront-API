import { Router } from 'express';
import * as controller from '../../controllers/product.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router: Router = Router();

// GET: all products
router.get('/', requireAuth, controller.getProducts);

// GET: product by id
router.get('/:id', controller.getProductById);

// GET: products by category
router.get('/category/:category', controller.getProductsByCategory);

// POST: Create product
router.post('/', requireAuth, controller.createProduct);

// DELETE: product by id
router.delete('/:id', requireAuth, controller.deleteProduct);

export default router;