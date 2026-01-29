import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { createUserSchema } from "../validations/user.validation";

const router = Router();

router.route("/signup").post(validate(createUserSchema), authController.signup);

export default router;
