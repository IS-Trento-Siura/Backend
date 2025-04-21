import express from "express";
import {registerUser, loginUser, logoutUser} from "../controllers/UserController.js";
import { authMiddleware } from "../utils/middleware.js"; 


const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user.username}` });
  });

export default router;