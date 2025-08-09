import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth_routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import publicacionRoutes from './routes/publicacionRoutes.js';
import comentarioRoutes from './routes/comentarioRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3308'
  ],

  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Bearer']
}));

// Users routes
app.use('/api/auth', authRoutes);


// Publicaciones routes
app.use('/api/publicaciones', publicacionRoutes);

// Comentarios routes
app.use('/api', comentarioRoutes);


// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
