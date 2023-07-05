import { Router } from 'express';
import { login, register, getUsers, editProfile,getUserById,getUserCurrent ,getProfileByUserId} from '../controllers/user.controller.js';
import { checkToken } from '../middlewares.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',checkToken, getUsers)
router.put('/edit_profile',checkToken, editProfile)
router.get('/:userId/user', checkToken, getUserById)
router.get('/current', checkToken, getUserCurrent)
router.get('/:userId/profile',checkToken,getProfileByUserId)

export { router };