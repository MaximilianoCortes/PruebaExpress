import { Router } from 'express';
import {createReport,banUserPERMANENTLY,allReport} from '../controllers/report.controller.js'
import { checkToken } from '../middlewares.js';

const router = Router();

router.post('/report',checkToken, createReport);
router.post('/ban',checkToken, banUserPERMANENTLY);
router.get('/reported_posts',checkToken, allReport );

export { router };