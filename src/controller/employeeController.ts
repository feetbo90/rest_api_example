import { Request, Response } from 'express';
import axios from "axios";
import { Employee, IEmployee } from '../models/employee';

// Fetch data employee from external API
const fetchEmployeeData = async (): Promise<IEmployee[]> => {
  try {
    const response = await axios.get("https://api.umsu.ac.id/simakad/dirdosen?prodi=86");
    if (response.data.status) {
      console.log("Employee data successfully fetched.");
      return response.data.data; // Extract the 'data' property from the response
    } else {
      console.error("Failed to fetch employee data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error occurred while fetching employee data:", error);
    return [];
  }
};

// Save employee data to MongoDB
const saveEmployeeData = async (data: IEmployee[]) => {
  try {
    const result = await Employee.insertMany(data, { ordered: false });
    console.log(`${result.length} employee records successfully saved.`);
    return result;
  } catch (error) {
    console.error("Failed to save employee data:", error);
    throw error;
  }
};

// Controller to fetch and save employee data
export const fetchAndSaveEmployees = async (req: Request, res: Response) => {
  try {
    // Fetch employee data from external API
    const employeeData = await fetchEmployeeData();

    // Check if data was retrieved
    if (employeeData.length === 0) {
      res.status(404).json({
        status: false,
        message: "No employee data found from the API.",
      });
    }

    // Save data to MongoDB
    const savedData = await saveEmployeeData(employeeData);

    // Send success response
    res.status(200).json({
      status: true,
      message: "Employee data successfully fetched and saved.",
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occurred while fetching or saving employee data.",
      error,
    });
  }
};

export default { fetchAndSaveEmployees };
