import mongoose, { Document } from "mongoose";

// Definisi interface untuk mahasiswa
export interface IMahasiswa extends Document {
  ID_SISWA: string;
  NO_DAFTAR: string;
  NPM: string;
  NAMA_LENGKAP: string;
  JENIS_KELAMIN: string;
  TGL_LAHIR: Date;
  TEMPAT_LAHIR: string;
  ALAMAT: string;
  PROVINSI: string;
  KABKOTA: string;
  KELAS: string;
  ANGKATAN: number;
  FAKULTAS: string;
  ID_PRODI: number;
  SINGKATAN_PRODI: string;
  PRODI: string;
  EMAIL: string;
  TAHUN_MASUK: number;
  ASAL_SEKOLAH: string;
  PROVINSI_SEKOLAH: string;
  KABKOTA_SEKOLAH: string;
  STATUS_AKTIF: string;
  TGL_MASUK: Date;
  TGL_LULUS?: string; // Optional
}

// Skema mahasiswa
const mahasiswaSchema = new mongoose.Schema<IMahasiswa>(
  {
    ID_SISWA: { type: String, required: true },
    NO_DAFTAR: { type: String, required: true },
    NPM: { type: String, required: true },
    NAMA_LENGKAP: { type: String, required: true },
    JENIS_KELAMIN: { type: String, required: true },
    TGL_LAHIR: { type: Date, required: true },
    TEMPAT_LAHIR: { type: String, required: true },
    ALAMAT: { type: String },
    PROVINSI: { type: String },
    KABKOTA: { type: String },
    KELAS: { type: String, required: true },
    ANGKATAN: { type: Number, required: true },
    FAKULTAS: { type: String, required: true },
    ID_PRODI: { type: Number, required: true },
    SINGKATAN_PRODI: { type: String, required: true },
    PRODI: { type: String, required: true },
    EMAIL: { type: String, required: true, unique: true },
    TAHUN_MASUK: { type: Number, required: true },
    ASAL_SEKOLAH: { type: String },
    PROVINSI_SEKOLAH: { type: String },
    KABKOTA_SEKOLAH: { type: String },
    STATUS_AKTIF: { type: String, required: true },
    TGL_MASUK: { type: Date, required: true },
    TGL_LULUS: { type: String },
  },
  { timestamps: true } // Menambahkan createdAt dan updatedAt secara otomatis
);

// Model mahasiswa
export const Mahasiswa = mongoose.model<IMahasiswa>("Mahasiswa", mahasiswaSchema);
