import express from 'express';
import { obtenerComentarios } from '../controllers/comentarioController.js';

const router = express.Router();

router.get('/publicaciones/:id/comentarios', obtenerComentarios);

export default router;
