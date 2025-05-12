import express from "express";
import {createReport, deleteReport} from "../controllers/ReportController.js";


const router = express.Router();
router.post("/report", createReport);
router.delete("/report/:reportId", deleteReport); //SOLO COME PROVA PER POSTMAN


export default router;