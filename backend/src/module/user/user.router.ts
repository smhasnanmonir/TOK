import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();
router.post("/create-user", userController.userCreateController);
router.get("/user/:email", userController.userFindByEmailController);
export const userRouter = router;
