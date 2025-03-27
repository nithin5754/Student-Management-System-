
import express from 'express'
import { StudentLogin } from '../controllers/authentication.controller'
import { GetStudentDetails } from '../controllers/student.controller'
import { authenticateMiddleware } from '../middlewares/auth.middleware'
import { GetAllTasks, updateTask } from '../controllers/task.controller'


const router=express.Router()

router.post('/login',StudentLogin)
// router.use(studentOnly)
router.use(authenticateMiddleware);
router.get('/details/:studentId',GetStudentDetails)
router.get('/tasks/:studentId',GetAllTasks)
router.patch('/task/update/:studentId/:taskId',updateTask)

export default router