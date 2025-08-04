import express from 'express';
import { getRoles } from '../controllers/controladorroles.js';

const router = express.Router();

router.get('/', getRoles); // GET /api/roles

export default router;
