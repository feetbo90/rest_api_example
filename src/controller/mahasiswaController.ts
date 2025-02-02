import { Request, Response } from 'express';
import axios from "axios";
import { User } from '../models/user';
import bcrypt from 'bcryptjs';  
import { Mahasiswa, IMahasiswa } from '../models/mahasiswa';
import generateToken from '../utils/generateToken';

// Fetch data mahasiswa dari API eksternal
const fetchMahasiswaData = async (): Promise<IMahasiswa[]> => {
  try {
    const response = await axios.get("https://api.umsu.ac.id/simakad/mahasiswa?idProdi=86&idAngkatan=2022");
    if (response.data.status) {
      console.log("Data mahasiswa berhasil diambil.");
      return response.data.data; // Mengambil properti 'data' dari response
    } else {
      console.error("Gagal mengambil data mahasiswa:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data mahasiswa:", error);
    return [];
  }
};

// Simpan data mahasiswa ke MongoDB
const saveMahasiswaData = async (data: IMahasiswa[]) => {
  try {
    const result = await Mahasiswa.insertMany(data, { ordered: false });
    console.log(`${result.length} data mahasiswa berhasil disimpan.`);
    return result;
  } catch (error) {
    console.error("Gagal menyimpan data mahasiswa:", error);
    throw error;
  }
};

// Controller untuk mengambil data dari API dan menyimpannya
export const fetchAndSaveMahasiswa = async (req: Request, res: Response) => {
  try {
    // Ambil data mahasiswa dari API eksternal
    const mahasiswaData = await fetchMahasiswaData();

    // Periksa apakah ada data yang diambil
    if (mahasiswaData.length === 0) {
      res.status(404).json({
        status: false,
        message: "Tidak ada data mahasiswa yang ditemukan dari API.",
      });
    }

    // Simpan data ke MongoDB
    const savedData = await saveMahasiswaData(mahasiswaData);

    // Kirim respon sukses
    res.status(200).json({
      status: true,
      message: "Data mahasiswa berhasil diambil dan disimpan.",
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat mengambil atau menyimpan data mahasiswa.",
      error,
    });
  }
};


export default { fetchAndSaveMahasiswa };