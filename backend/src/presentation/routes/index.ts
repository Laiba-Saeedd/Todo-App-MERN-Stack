import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { TodoController } from "../controllers/TodoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/todos", authMiddleware, TodoController.create);
router.get("/todos", authMiddleware, TodoController.getTodos);
router.put("/todos/:id", authMiddleware, TodoController.update);
router.delete("/todos/:id", authMiddleware, TodoController.delete);

export default router;
