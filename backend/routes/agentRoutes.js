import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createAgent, getAgent, getAllAgents } from '../controllers/agentController.js';

const router = express.Router();

router.post('/create', authenticate, createAgent);
router.get('/all', authenticate, getAllAgents);
router.get('/:id', authenticate, getAgent);

export default router;