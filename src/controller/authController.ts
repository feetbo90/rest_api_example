import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
  const { npm, password } = req.body;

  if (!npm || !password) {
    res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Cek apakah pengguna sudah ada
    const userExists = await User.findOne({ npm });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await User.create({
      npm,
      password: hashedPassword,
    });

    if (!user) {
      res.status(500).json({ message: 'Failed to create user' });
    }

    // Kembalikan response dengan token
    res.status(201).json({
      _id: user._id,
      npm: user.npm,
      token: generateToken(`${user._id}`),
    });
  } catch (error) {
    // Penanganan error
    res.status(500).json({
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
  

export const loginUser = async (req: Request, res: Response) => {
  const { npm, password } = req.body;

  try {
    const user = await User.findOne({ npm });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        npm: user.npm,
        token: generateToken(`${user._id}`),
      });
    } else {
      res.status(401).json({ message: 'Invalid npm or password' });
    }
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    }
  }
};

export default { registerUser, loginUser };
