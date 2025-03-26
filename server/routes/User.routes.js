import { Router } from "express";
import { loginUser, RegisterController, sendContactEmail } from "../controller/user.controller.js";
const router=Router();


router.post('/register',RegisterController);
router.post('/login',loginUser);
router.post("/contact", sendContactEmail);


export default router;