import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import taskRoutes from './routes/task.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
