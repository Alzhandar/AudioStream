import { Router } from 'express';
import Song from '../models/Song';
import path from 'path';
import { protect } from '../middleware/authMiddleware';
import { getSongs, createSong, getSong, updateSong, deleteSong, searchSongs } from '../controllers/songController';

const router = Router();

router.route('/').get(protect, getSongs).post(protect, createSong);
router.route('/:id').get(protect, getSong).put(protect, updateSong).delete(protect, deleteSong);
router.get('/search', searchSongs);
router.get('/stream/:songId', async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song || !song.filePath) {
      return res.status(404).send('Song not found or file path missing');
    }
    res.set('Content-Type', 'audio/mp3');
    res.sendFile(path.resolve(song.filePath));
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
