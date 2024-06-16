import { Request, Response } from 'express';
import Song from '../models/Song';

export const createSong = async (req: Request, res: Response) => {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error: any) { 
    res.status(400).json({ message: error.message });
  }
};

export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error: any) {  
    res.status(500).json({ message: error.message });
  }
};

export const getSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error: any) { 
    res.status(500).json({ message: error.message });
  }
};

export const updateSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error: any) {  
    res.status(400).json({ message: error.message });
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (song) {
      res.json({ message: 'Song deleted successfully' });
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error: any) {  
    res.status(500).json({ message: error.message });
  }
};

export const searchSongs = async (req: Request, res: Response) => {
  try {
    const query = typeof req.query.query === 'string' ? req.query.query : '';
    const songs = await Song.find({ $text: { $search: query } });
    res.json(songs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
