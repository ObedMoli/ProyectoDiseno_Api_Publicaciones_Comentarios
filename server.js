import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
