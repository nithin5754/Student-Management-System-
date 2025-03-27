import express from "express";
import { StudentLogin } from "../controllers/authentication.controller";
import { GetStudentDetails } from "../controllers/student.controller";
import { authenticateMiddleware } from "../middlewares/auth.middleware";
import { GetAllTasks, updateTask } from "../controllers/task.controller";
import isStudentMiddleWare from "../middlewares/isStudent.middleware";

const router = express.Router();

router.post("/login", StudentLogin);
router.use(authenticateMiddleware);
router.use(isStudentMiddleWare);
router.get("/details", GetStudentDetails);
router.get("/tasks", GetAllTasks);
router.patch("/task/update/:taskId", updateTask);

export default router;
