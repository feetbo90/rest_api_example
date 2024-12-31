import express from 'express';
import { createPost } from '../controller/postController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Endpoint untuk membuat post baru
router.post('/create', protect, createPost);

export default router;
