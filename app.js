import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appRoute from './src/routes/routes-bot-wa.js';

dotenv.config({
  path: '.env',
});
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', appRoute);

app.listen(process.env.SERVE_PORT, () => {
  console.log(`Server Berjalan pada port : ${process.env.SERVE_PORT}`);
});
