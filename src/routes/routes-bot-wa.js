import express from 'express';
import { botWa } from '../controllers/index.js';

const router = express.Router();

router.get('/', botWa.indexPage);
router.post('/upload-photo', botWa.uploadPhoto);

export default router;
