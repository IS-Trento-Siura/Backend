import express from "express";
import {register, login, logout, deleteUser} from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/middleware.js"; 



const router = express.Router();

router.post("/user", register);
router.post("/session", login);
router.post("/logout", authMiddleware, logout); //Just to try postman
router.delete("/user/:id", authMiddleware, deleteUser);


router.get("/protected", authMiddleware, (req, res) => { //Just to test auth
    res.status(200).json({ message: `Welcome, ${req.user.username}` });
  });

export default router;