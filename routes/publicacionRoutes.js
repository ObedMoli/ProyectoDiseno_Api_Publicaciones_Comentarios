import express from 'express';
import { getPublicaciones } from '../controllers/publicacionController.js';
import { postPublicacion } from '../controllers/publicacionController.js';
import { verifyToken } from '../middlewares/verify_token.js';


const router = express.Router();

router.get('/', getPublicaciones); // GET /api/publicaciones
router.post('/', verifyToken, postPublicacion); // POST /api/publicaciones

export default router;
