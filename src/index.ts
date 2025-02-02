import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import mahasiswaRoutes from './routes/mahasiswaRoutes';
import employeeRoutes from './routes/employeeRoutes';
import prodiRoutes from './routes/prodiRoutes';
// import './src/types/express';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/mahasiswa', mahasiswaRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/prodi', prodiRoutes);

// dotenv
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

