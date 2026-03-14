import {Router} from 'express'
import { getProjects,getProjectById, postProject, deleteProject } from '../controllers/projectController.js'

const projectRouter = Router()

projectRouter.get('/projects',getProjects)

projectRouter.get('/projects/:id',getProjectById);

projectRouter.post('/projects',postProject);

projectRouter.delete('/projects/:id',deleteProject);

export default projectRouter;
