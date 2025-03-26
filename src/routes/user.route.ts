
import express from 'express'
import { StudentLogin } from '../controllers/authentication.controller'

const router=express.Router()

router.post('/login',StudentLogin)


export default router