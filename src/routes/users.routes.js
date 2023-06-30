import { Router } from 'express';
import { login, register, getUsers, editProfile,getUserById, getProfileByUserId} from '../controllers/user.controller.js';
import { checkToken, isAdmin } from '../middlewares.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',checkToken, isAdmin, getUsers)
router.put('/edit_profile/:userId', editProfile)
router.get('/current', checkToken, getUserById)
router.get('/current/:userId/profile',getProfileByUserId)

export { router };