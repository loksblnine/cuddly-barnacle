/**
 * imageRouter.ts
 * */

import express from "express";
import * as ImageController from "../controllers/imageController";
import {isUserAuthMiddleware} from "../middlewares/authMiddlewares";
import {isUsersImage} from "../middlewares/validateMiddlewares";

const router = express.Router();

router
  .route('/feed')
  .get(ImageController.getFeed);


router
  .route('/:id')
  .delete(isUserAuthMiddleware, isUsersImage, ImageController.deleteImage);

export default router;
