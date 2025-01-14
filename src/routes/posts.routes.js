import { Router } from 'express';
import { createPost, deletePostById , allPosts, reaction, getPostById,getPostsByUser} from '../controllers/posts.controller.js';
import { checkToken } from '../middlewares.js';

const router = Router();

router.post('/new_post',checkToken, createPost);
router.delete('/:post_id',checkToken, deletePostById);
router.get('/all_posts', checkToken,allPosts );
router.put('/like',checkToken, reaction );
router.post('/getPost',checkToken, getPostById );
router.post('/getUserPosts',checkToken, getPostsByUser );

export { router };