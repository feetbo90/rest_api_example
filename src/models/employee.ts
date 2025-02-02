import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Employee document
interface IEmployee extends Document {
    Employee_Id: number;
    Nidn: string;
    Full_Name: string;
    Department_Id: number;
    Department_Name: string;
    Birth_Place: string;
    Birth_Date?: Date | null;
    Address: string;
    Email_Corporate: string;
    Phone_Mobile: string;
}

// Create a schema for the Employee
const EmployeeSchema: Schema = new Schema({
    Employee_Id: { type: Number, required: true },
    Nidn: { type: String, required: true },
    Full_Name: { type: String, required: true },
    Department_Id: { type: Number, required: true },
    Department_Name: { type: String, required: true },
    Birth_Place: { type: String, required: true },
    Birth_Date: { type: Date, required: false, default: null },
    Address: { type: String, required: true },
    Email_Corporate: { type: String, required: true },
    Phone_Mobile: { type: String, required: true },
});

// Create the Employee model
const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { Employee, IEmployee };
