import express from 'express';
import { getPublicaciones } from '../controllers/publicacionController.js';
import { postPublicacion } from '../controllers/publicacionController.js';
import { verifyToken } from '../middlewares/verify_token.js';
import { getPublicacionPorId } from '../controllers/publicacionController.js';
import { putPublicacion } from '../controllers/publicacionController.js';

const router = express.Router();

router.get('/', getPublicaciones); // GET /api/publicaciones
router.post('/', verifyToken, postPublicacion); // POST /api/publicaciones
router.get('/:id', getPublicacionPorId);    // GET /api/publicaciones/:id
router.put('/:id', verifyToken, putPublicacion); // PUT /api/publicaciones/:id
export default router;
