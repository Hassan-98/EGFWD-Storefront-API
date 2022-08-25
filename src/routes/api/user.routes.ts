import { Router } from 'express';
import * as controller from '../../controllers/user.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router: Router = Router();

// GET: all users
router.get('/', requireAuth, controller.getUsers);

// GET: user by id
router.get('/:id', requireAuth, controller.getUserById);

// POST: create a user
router.post('/create', requireAuth, controller.createUser);

// DELETE: user by id
router.delete('/:id', requireAuth, controller.deleteUser);

export default router;