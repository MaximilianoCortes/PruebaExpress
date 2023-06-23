import { Router } from 'express';
import { createPost, deletePostById,getPosts} from '../controllers/posts.controller.js';

const router = Router();

router.post('/new_post', createPost);
router.delete('/:postId', deletePostById);
router.get('/list_posts', getPosts );


export { router };