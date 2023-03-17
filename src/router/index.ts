/**
 * router.ts
 * */

import express from "express";
import authRouter from "./authRouter";
import portfolioRouter from "./portfolioRouter";
import imageRouter from "./imageRouter";

const router: express.Router = express.Router();

router.use('/auth', authRouter);
router.use('/portfolio', portfolioRouter);
router.use('/image', imageRouter)

export default router;
