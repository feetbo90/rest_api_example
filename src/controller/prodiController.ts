import { Request, Response } from 'express';
import axios from "axios";
import { Prodi, IProdi } from '../models/prodi';

// Fetch data prodi from external API
const fetchProdiData = async (): Promise<IProdi[]> => {
  try {
    const response = await axios.get("https://api.umsu.ac.id/simakad/prodi");
    if (response.data.status) {
      console.log("Prodi data successfully fetched.");
      return response.data.data; // Extract the 'data' property from the response
    } else {
      console.error("Failed to fetch prodi data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error occurred while fetching prodi data:", error);
    return [];
  }
};

// Save prodi data to MongoDB
const saveProdiData = async (data: IProdi[]) => {
  try {
    const result = await Prodi.insertMany(data, { ordered: false });
    console.log(`${result.length} prodi records successfully saved.`);
    return result;
  } catch (error) {
    console.error("Failed to save prodi data:", error);
    throw error;
  }
};

// Controller to fetch and save prodi data
export const fetchAndSaveProdi = async (req: Request, res: Response) => {
  try {
    // Fetch prodi data from external API
    const prodiData = await fetchProdiData();

    // Check if data was retrieved
    if (prodiData.length === 0) {
      res.status(404).json({
        status: false,
        message: "No prodi data found from the API.",
      });
    }

    // Save data to MongoDB
    const savedData = await saveProdiData(prodiData);

    // Send success response
    res.status(200).json({
      status: true,
      message: "Prodi data successfully fetched and saved.",
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occurred while fetching or saving prodi data.",
      error,
    });
  }
};

export default { fetchAndSaveProdi };
