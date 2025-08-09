import express from 'express';
import {
  obtenerTodosLosComentarios,
  obtenerComentarios,
  publicarComentario
} from '../controllers/comentarioController.js';
import { verifyToken } from '../middlewares/verify_token.js';
import { validarComentarios } from '../middlewares/validarComentarios.js';

const router = express.Router();

router.get('/comentarios', obtenerTodosLosComentarios);

router.get('/publicaciones/:id/comentarios', obtenerComentarios);

router.post('/publicaciones/:id/comentarios', verifyToken, validarComentarios, publicarComentario);

export default router;
