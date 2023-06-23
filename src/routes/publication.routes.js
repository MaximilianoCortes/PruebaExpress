import { Router } from 'express';
import { createMessage, deleteMessageById } from '../controllers/publication.controller.js';

const router = Router();

router.post('', createMessage);
router.delete('/:messageId', deleteMessageById);

export { router };