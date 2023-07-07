import { Router } from 'express';
import {createReport,banUserPERMANENTLY,allReport,allReportUsers,dismissReport} from '../controllers/report.controller.js'
import { checkToken,isAdmin } from '../middlewares.js';

const router = Router();

router.post('/report',checkToken,createReport);
router.post('/ban/:user_id',checkToken,isAdmin("Admin"), banUserPERMANENTLY);
router.get('/reported_posts',checkToken,isAdmin("Admin"),allReport );
router.get('/reported_users',checkToken,checkToken,isAdmin("Admin"),allReportUsers );
router.delete('/dismiss_report/:report_id',checkToken,isAdmin("Admin"), dismissReport );

export { router };