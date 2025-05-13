import express from "express";
import {register, login} from "../controllers/OrgController.js";
import { authMiddleware } from "../middleware/middleware.js"; 



const router = express.Router();


router.post("/admin", register);
router.post("/session", login);




export default router;