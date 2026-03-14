import {Router} from 'express'
import { getTasks, postTask, editTask, deleteTask } from '../controllers/taskController.js'

const taskRouter = Router()

taskRouter.get('/projects/:project_id/tasks',getTasks);

taskRouter.post('/projects/:project_id/tasks', postTask);

taskRouter.put('/tasks/:id',editTask);

taskRouter.delete('/tasks/:id',deleteTask);

export default taskRouter