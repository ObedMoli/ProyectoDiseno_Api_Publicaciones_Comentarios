import { comentarioSchema } from "../schemas/comentariValidacion.js";

export const validarComentarios = (req, res, next) => {
  try {
    const parsed = comentarioSchema.parse(req.body);
    req.validated = parsed;
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors ?? err,
    });
  }
};
