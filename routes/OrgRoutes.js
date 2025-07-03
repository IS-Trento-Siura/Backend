import express from "express";
import {register, login, getAllUsers, editOrg, deleteReport, updateReport} from "../controllers/OrgController.js";
import { authMiddleware, requireOrg} from "../middleware/middleware.js"; 



const router = express.Router();


router.post("", register);
router.post("/session", login);
router.get("", authMiddleware, requireOrg, getAllUsers);
router.put("/:id", authMiddleware, requireOrg, editOrg);
router.delete("/:reportId", authMiddleware, requireOrg, deleteReport);
router.patch("/:reportId", authMiddleware, requireOrg, updateReport);




export default router;