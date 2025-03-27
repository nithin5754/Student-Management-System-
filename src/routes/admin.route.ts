import express from "express";
import { AdminLogin } from "../controllers/authentication.controller";
import {
  authenticateMiddleware,


} from "../middlewares/auth.middleware";
import { AddStudent, AddTask } from "../controllers/admin.controller";
import { GetAllStudents } from "../controllers/student.controller";

const router = express.Router();

router.post("/login", AdminLogin);
router.use(authenticateMiddleware);
// router.use(adminOnly);
router.post("/student/add", AddStudent);
router.get("/student/all",GetAllStudents)
router.post('/task/add',AddTask)

export default router;
