import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const TABLE_NAME = 'ip-users';
export const ROLES = ['admin', 'user'] as const;
export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES),
  username: z.string(),
  authType: z.string(),
  walletAddress: z.string(),
  avatarUri: z.string(),
  mintCount: z.number(),
  tradeCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  headers: z.object({ 'x-user-id': commonValidations.id }),
});
