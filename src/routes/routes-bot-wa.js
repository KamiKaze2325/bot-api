import express from 'express';
import { botWa } from '../controllers/index.js';
import { upload } from '../utils/multer-upload.js';
const router = express.Router();

router.get('/', botWa.indexPage);
router.post('/upload-photo', upload.single('file'), botWa.uploadPhoto);
router.get('/image/:file',botWa.downloadFile)

export default router;
