import express from "express";
import { AdminLogin } from "../controllers/authentication.controller";
import {
  authenticateMiddleware,


} from "../middlewares/auth.middleware";
import { AddStudent, AddTask } from "../controllers/admin.controller";
import { GetAllStudents } from "../controllers/student.controller";
import isAdminMiddleWare from "../middlewares/isAdmin.middleware";

const router = express.Router();

router.post("/login", AdminLogin);
router.use(authenticateMiddleware);
router.use(isAdminMiddleWare);
router.post("/student/add", AddStudent);
router.post('/task/add',AddTask)
router.get("/student/all",GetAllStudents)

export default router;
  