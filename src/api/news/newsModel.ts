import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const TABLE_NAME = 'ip-news';
export type News = z.infer<typeof NewsSchema>;
export const NewsSchema = z.object({
  newsId: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  ctaLink: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

// Input Validation for 'GET news/:id' endpoint
export const GetNewsSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
