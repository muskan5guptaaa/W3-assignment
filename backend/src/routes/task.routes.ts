import { Router } from 'express';
import cors from 'cors';
import { getTasks, generateTasksWithGemini,createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middlwares/auth.middleware';


const router = Router();
//router.use(authenticate)
router.post('/generate',generateTasksWithGemini)
router.get('/get',getTasks);
router.post('/create',createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
export default router;
