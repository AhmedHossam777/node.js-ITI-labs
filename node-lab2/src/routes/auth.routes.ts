import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { createUserSchema } from "../validations/user.validation";
import { loginSchema } from "../validations/auth.validation";

const router = Router();

router.route("/signup").post(validate(createUserSchema), authController.signup);
router.route("/login").post(validate(loginSchema), authController.login);

export default router;
