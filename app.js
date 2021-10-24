import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appRoute from './src/routes/routes-bot-wa.js';

dotenv.config({
  path: '.env',
});
const app = express();

app.use(cors());
app.use(express.json({limit: 52428800}));

app.use('/api', appRoute);

app.listen(process.env.SERVE_PORT | 3000, () => {
  console.log(`Server Berjalan pada port : ${process.env.SERVE_PORT}`);
});
