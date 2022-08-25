import { Router } from 'express';
import * as controller from '../../controllers/order.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router: Router = Router();

// GET: all orders by user id
router.get('/:user_id', requireAuth, controller.getOrdersByUserId);

// GET: current order by user id
router.get('/current/:user_id', controller.getCurrentUserOrder);

// GET: active orders by user id
router.get('/active/:user_id', controller.getActiveOrdersByUserId);

// GET: completed orders by user id
router.get('/completed/:user_id', controller.getCompletedOrdersByUserId);

// PATCH: update order status.
router.patch('/', controller.updateOrderStatus);

// POST: create order
router.post('/', requireAuth, controller.createOrder);

// DELETE: order by order id
router.delete('/:id', requireAuth, controller.deleteOrder);

export default router;