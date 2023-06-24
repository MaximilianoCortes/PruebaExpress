import { Router } from 'express';
import { createUser, getUsers, editProfile,getUserById, getProfileByUserId} from '../controllers/user.controller.js';

const router = Router();

router.post('/register', createUser);
router.get('/users', getUsers)
router.put('/edit_profile/:userId', editProfile)
router.get('/current/:userId', getUserById)
router.get('/current/:userId/profile',getProfileByUserId)

export { router };