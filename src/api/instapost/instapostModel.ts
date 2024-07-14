import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const TABLE_NAME = 'ip-instaposts';
export type Instapost = z.infer<typeof InstapostSchema>;
export const InstapostSchema = z.object({
  instapostId: z.string(),
  imageUri: z.string(),
  expiryTime: z.date(),
  instaUsername: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

// Input Validation for 'GET news/:id' endpoint
export const GetInstapostSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
