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
app.use(cors());
// Auth routes
app.use('/api/auth', authRoutes);


// Publicaciones routes
app.use('/api/publicaciones', publicacionRoutes);
app.use('/api/categorias', publicacionRoutes);
// Comentarios routes
app.use('/api', comentarioRoutes);


// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
