import { z } from 'zod';

export const publicacionSchema = z.object({
  title: z.string().min(3),
  content_line1: z.string().min(3),
  content_line2: z.string().optional(),
  image: z.string().url().optional(),
  category_category_id: z.number()
});
