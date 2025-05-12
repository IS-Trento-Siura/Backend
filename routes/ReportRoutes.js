import express from "express";
import {createReport, deleteReport, getReport, getAllReports} from "../controllers/ReportController.js";
import { authMiddleware } from "../middleware/middleware.js"; 



const router = express.Router();

router.post("/report", authMiddleware, createReport);
router.delete("/:reportId", authMiddleware, deleteReport); 
router.get("/:reportId", authMiddleware, getReport);
router.get("/reports", getAllReports); 



export default router;