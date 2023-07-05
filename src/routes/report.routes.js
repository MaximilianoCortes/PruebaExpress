import { Router } from 'express';
import {createReport,banUserPERMANENTLY,allReport,allReportUsers,dismissReport} from '../controllers/report.controller.js'
import { checkToken } from '../middlewares.js';

const router = Router();

router.post('/report',checkToken, createReport);
router.post('/ban/:user_id',checkToken, banUserPERMANENTLY);
router.get('/reported_posts',checkToken, allReport );
router.get('/reported_users',checkToken, allReportUsers );
router.delete('/dismiss_report/:report_id',checkToken, dismissReport );

export { router };