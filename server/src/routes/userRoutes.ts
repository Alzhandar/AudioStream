import { Router } from 'express';
import { updateAvatar } from '../controllers/userController';
import { upload } from '../config/multerConfig'; 

const router = Router();

router.post('/update-avatar', upload.single('avatar'), updateAvatar);

export default router;
