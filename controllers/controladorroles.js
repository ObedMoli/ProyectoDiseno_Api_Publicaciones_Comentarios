import { obtenerRoles } from '../models/role.js';
import { ok, internalError } from '../utils/utils.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await obtenerRoles();
    return res.status(200).json(ok('Lista de roles obtenida', roles));
  } catch (error) {
    console.error('Error al obtener roles:', error);
    return res.status(500).json(internalError('No se pudo obtener la lista de roles', error.message));
  }
};
