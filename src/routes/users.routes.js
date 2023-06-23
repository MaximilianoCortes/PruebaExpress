import { Router } from 'express';
import { createUser, getUsers, login, editProfile } from '../controllers/user.controller.js';
import { getPostsByUserId } from '../controllers/posts.controller.js';

const router = Router();

router.post('/register', createUser);
router.get('/users', getUsers)
router.post('/login', login);
router.get('/users/:userId/posts', getPostsByUserId)
router.put('/edit_profile', editProfile)

export { router };