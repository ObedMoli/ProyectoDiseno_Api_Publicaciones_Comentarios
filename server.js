import express from 'express';
import dotenv from 'dotenv';
import roleRoutes from './routes/routasroles.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/roles', roleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
