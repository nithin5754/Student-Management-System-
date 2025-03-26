
import express from 'express'
import { StudentLogin } from '../controllers/authentication.controller'
import { studentOnly } from '../middlewares/auth.middleware'

const router=express.Router()

router.post('/login',StudentLogin)
router.use(studentOnly)

export default router