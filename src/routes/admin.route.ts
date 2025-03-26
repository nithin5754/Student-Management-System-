




import express from 'express'

import { AdminLogin } from '../controllers/authentication.controller'
import { adminOnly, authenticateMiddleware } from '../middlewares/auth.middleware'
import { hello } from '../controllers/admin.controller'




const router=express.Router()

router.post('/login',AdminLogin)

router.use(authenticateMiddleware)
router.use(adminOnly)

router.get('/hello',hello)


export default router