import { Request, Response } from 'express';
import User from '../models/User';

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.file) {
      return res.status(400).json({ message: 'Missing user information or file' });
    }
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, { avatarUrl: req.file.path }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};