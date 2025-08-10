import { z } from 'zod';

const emptyToNull = (v) => {
  if (v === '' || v === undefined || v === null) return null;
  return String(v).trim();
};

export const publicacionSchema = z.object({
  title: z.string().min(3),
  content_line1: z.string().min(3),
  content_line2: z.preprocess(emptyToNull,z.string().min(1).optional()).nullable(),
  // cadena vacía => null; si trae algo, debe ser URL válida
  image: z.preprocess(emptyToNull,z.string().url('La imagen debe ser una URL válida').optional()).nullable(),
  // ahora trabajamos por nombre de categoría
  category_title: z.string().trim().min(1, 'La categoría es obligatoria'),
});
