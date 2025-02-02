import { Router } from "express";
import { fetchAndSaveEmployees } from "../controller/employeeController";

const router = Router();

// Endpoint untuk sinkronisasi data mahasiswa
router.get("/sync", fetchAndSaveEmployees);

export default router;
