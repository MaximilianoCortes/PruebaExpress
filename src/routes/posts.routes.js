import { Router } from 'express';
import { createPost, deletePostById , allPosts, reaction} from '../controllers/posts.controller.js';
import { checkToken } from '../middlewares.js';

const router = Router();

router.post('/new_post',checkToken, createPost);
router.delete('/:post_id',checkToken, deletePostById);
router.get('/all_posts', checkToken,allPosts );
router.put('/like',checkToken, reaction );


export { router };