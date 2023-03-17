/**
 * portfolioRouter.ts
 * */

import express from "express";
import * as PortfolioController from "../controllers/portfolioController";
import {isUserAuthMiddleware} from "../middlewares/authMiddlewares";
import {isUsersPortfolio} from "../middlewares/validateMiddlewares";

const router = express.Router();

router
  .route('/')
  .post(isUserAuthMiddleware, PortfolioController.createPortfolio);

router
  .route('/:id/photo')
  .post(isUserAuthMiddleware, isUsersPortfolio, PortfolioController.uploadImage);

router
  .route('/:id')
  .delete(isUserAuthMiddleware, isUsersPortfolio, PortfolioController.deletePortfolio);

export default router;
