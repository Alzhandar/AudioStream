import { Router } from 'express';
import { createArtist, getArtists } from '../controllers/artistController';

const router = Router();

router.post('/artists', createArtist);
router.get('/artists', getArtists);

export default router;
