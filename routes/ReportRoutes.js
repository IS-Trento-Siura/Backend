import express from "express";
import {createReport, deleteReport, getReport, getAllReports, updateReport, getUserReports} from "../controllers/ReportController.js";
import { authMiddleware } from "../middleware/middleware.js"; 



const router = express.Router();

router.post("/report", authMiddleware, createReport);       // crete report
router.delete("/:reportId", authMiddleware, deleteReport);  // delete report
router.get("/reports", getAllReports);                      // get all reports
router.patch("/:reportId", authMiddleware, updateReport);   // update report
router.get("/mine", authMiddleware, getUserReports);        // get user reports
router.get("/:reportId", authMiddleware, getReport);        // get report by id




export default router;