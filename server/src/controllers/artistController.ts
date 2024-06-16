import { Request, Response } from 'express';
import Artist from '../models/Artist';

export const createArtist = async (req: Request, res: Response) => {
  try {
    const { name, bio, photoUrl } = req.body;
    const artist = new Artist({ name, bio, photoUrl });
    await artist.save();
    res.status(201).json(artist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
