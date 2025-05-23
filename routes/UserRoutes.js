import express from "express";
import {register, login, logout, deleteUser, editUser} from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/middleware.js"; 



const router = express.Router();

router.post("", register);
router.post("/session", login);
router.post("/logout", authMiddleware, logout); // Just to try postman
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id", authMiddleware, editUser); // put o patch?


router.get("/protected", authMiddleware, (req, res) => { //Just to test auth
    res.status(200).json({ message: `Welcome, ${req.user.username}` });
  });

export default router;