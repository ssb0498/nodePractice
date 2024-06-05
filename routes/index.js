import express from 'express';
import userRouter from './user.js'
import authRouter from './auth.js'
import boardRouter from './board.js'

const router = express.Router();



router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/board', boardRouter);


export default router;