import { Router } from "express";
import { fetchAndSaveProdi } from "../controller/prodiController";

const router = Router();

// Endpoint untuk sinkronisasi data mahasiswa
router.get("/sync", fetchAndSaveProdi);

export default router;
