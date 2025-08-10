import { z } from 'zod';

const emptyToNull = (v) => {
  if (v === '' || v === undefined || v === null) return null;
  return String(v).trim();
};

export const publicacionSchema = z.object({
  title: z.string().min(3),
  content_line1: z.string().min(3),
  content_line2: z.string().nullable() ,
  image: z.string().url().nullable(),
  category_title: z.string()
});
