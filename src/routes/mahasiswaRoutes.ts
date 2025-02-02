import { Router } from "express";
import { fetchAndSaveMahasiswa } from "../controller/mahasiswaController";

const router = Router();

// Endpoint untuk sinkronisasi data mahasiswa
router.get("/sync", fetchAndSaveMahasiswa);

export default router;
