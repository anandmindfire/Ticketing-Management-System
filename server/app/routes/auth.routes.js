// Example usage of authentication controller in Express routes
import express from 'express';
import { registerUser, loginUser, getUserById, updateUserById } from '../controllers/auth.controller.js';

const router = express.Router();

// Routes for user authentication
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:userId', getUserById);
router.patch('/:userId', updateUserById);

export default router;
