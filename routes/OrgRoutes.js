import express from "express";
import {register, login, getAllUsers} from "../controllers/OrgController.js";
import { authMiddleware, requireOrg} from "../middleware/middleware.js"; 



const router = express.Router();


router.post("", register);
router.post("/session", login);
router.get("", authMiddleware, requireOrg, getAllUsers);




export default router;