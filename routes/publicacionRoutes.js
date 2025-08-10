import express from 'express';
import { getPublicaciones,postPublicacion,getPublicacionPorId,deletePublicacion,putPublicacion,getCategorias } from '../controllers/publicacionController.js';
import { verifyToken } from '../middlewares/verify_token.js';

// Rutas para manejar publicaciones
const router = express.Router();

router.get('/', getPublicaciones); // GET /api/publicaciones
router.post('/', verifyToken, postPublicacion); // POST /api/publicaciones
router.get('/:id', getPublicacionPorId);    // GET /api/publicaciones/:id
router.put('/:id', verifyToken, putPublicacion); // PUT /api/publicaciones/:id
router.delete('/:id', verifyToken, deletePublicacion); // DELETE /api/publicaciones/:id
router.get('/categoria/:id', getCategorias); // GET /api/categorias
export default router;
