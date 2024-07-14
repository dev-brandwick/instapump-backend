import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const TABLE_NAME = 'ip-collections';
export type Collection = z.infer<typeof CollectionSchema>;
export const CollectionSchema = z.object({
  collectionId: z.string(),
  instapostId: z.string(),
  tickerName: z.string(),
  bondingCurveAddress: z.string(),
  tokenAddress: z.string(),
  creator: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

// Input Validation for 'GET news/:id' endpoint
export const GetCollectionSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
