/**
 * authRouter.ts
 * */

import express from "express";
import * as AuthController from "../controllers/authController";
import {authMiddleware, isUserMiddleware} from "../middlewares/authMiddlewares";
import {
  isUserExist,
  validateEmailMiddleware,
  validateNameMiddleware,
  validatePasswordMiddleware
} from "../middlewares/validateMiddlewares";

const router = express.Router();

router
  .route('/sign-up')
  .post(validateEmailMiddleware, validatePasswordMiddleware, validateNameMiddleware, isUserExist, AuthController.registerUser);

router
  .route("/log-in")
  .put(authMiddleware, AuthController.regenerateTokens)
  .post(AuthController.loginUser);

router
  .route("/log-out")
  .post(isUserMiddleware, AuthController.logoutUser);

router
  .route("/")
  .delete(isUserMiddleware, AuthController.deleteAccount);

export default router;
