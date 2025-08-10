import { z } from 'zod';



export const publicacionSchema = z.object({
  title: z.string().min(3),
  content_line1: z.string().min(3),
  content_line2: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
  category_title: z.string().min(2)
});
