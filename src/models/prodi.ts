import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Prodi document
interface IProdi extends Document {
    ID_FAKULTAS: number;
    KODE_FAKULTAS: string;
    SINGKATAN_FAKULTAS: string;
    NAMA_FAKULTAS: string;
    ID_PRODI: number;
    SINGKATAN_PRODI: string;
    NAMA_PRODI: string;
}

// Create a schema for the Prodi
const ProdiSchema: Schema = new Schema({
    ID_FAKULTAS: { type: Number, required: true },
    KODE_FAKULTAS: { type: String, required: true },
    SINGKATAN_FAKULTAS: { type: String, required: true },
    NAMA_FAKULTAS: { type: String, required: true },
    ID_PRODI: { type: Number, required: true },
    SINGKATAN_PRODI: { type: String, required: true },
    NAMA_PRODI: { type: String, required: true },
});

// Create the Prodi model
const Prodi = mongoose.model<IProdi>('Prodi', ProdiSchema);

export { Prodi, IProdi };