import { Router } from 'express';
import cors from 'cors';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middlwares/auth.middleware';

const router = Router();
//router.use(authenticate)
router.get('/get',authMiddleware,getTasks);
router.post('/create', authMiddleware,createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
export default router;
