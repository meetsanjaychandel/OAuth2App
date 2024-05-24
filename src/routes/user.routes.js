const express = require('express');

import userController from "../controllers/user.controllers.js";

import { upload } from "../middlewares/upload.middlewares.js";

const router = express.Router();

// Get current user profile
router.get('/me', authMiddleware.ensureAuthenticated, userController.getProfile);

// Edit user profile
router.put('/me', authMiddleware.ensureAuthenticated, upload, userController.editProfile);

// Toggle public/private profile
router.put('/me/privacy', authMiddleware.ensureAuthenticated, userController.toggleProfilePrivacy);

// Get user profile by ID
router.get('/:id', authMiddleware.ensureAuthenticated, userController.getUserProfile);

// Admin - Get all user profiles
router.get('/', authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, userController.getAllProfiles);

export default router;
