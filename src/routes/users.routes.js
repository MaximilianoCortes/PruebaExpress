import { Router } from 'express';
import { createUser, getUsers, login } from '../controllers/user.controller.js';
import { getMessagesByUserId } from '../controllers/message.controller.js';

const router = Router();

router.post('/auth/register', createUser);
router.get('/users', getUsers)
router.post('/auth/login', login);
router.get('/users/:userId/messages', getMessagesByUserId)

export { router };