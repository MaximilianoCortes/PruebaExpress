import { Router } from 'express';
import { createPost, deletePostById} from '../controllers/posts.controller.js';

const router = Router();

router.post('', createPost);
router.delete('/:postId', deletePostById);


export { router };