import { z } from "zod";

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;")
   .replace(/'/g, "&#39;");

export const comentarioSchema = z.object({
  content: z.string({ required_error: "El contenido es obligatorio" })
    .min(1, "El comentario no puede estar vacío")
    .max(1000, "Máximo 1000 caracteres")
    .transform((v) => v.trim())
    .transform((v) => escapeHtml(v))
    .refine((v) => v.length > 0, {
      message: "El comentario no puede quedar vacío tras limpiar",
    }),
});
