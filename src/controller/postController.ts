import { Request, Response } from 'express';
import Post from '../models/post';

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  try {
    // Pastikan req.user diisi oleh middleware `protect`
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
    }

    const post = await Post.create({
      title,
      content,
      user: req.user._id, // Assosiasikan dengan pengguna
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
