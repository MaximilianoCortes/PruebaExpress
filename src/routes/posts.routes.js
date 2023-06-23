import { Router } from 'express';
import { createPost, deletePostById , allPosts} from '../controllers/posts.controller.js';

const router = Router();

router.post('/new_post', createPost);
router.delete('/:post_id', deletePostById);
router.get('/all_posts', allPosts );


export { router };