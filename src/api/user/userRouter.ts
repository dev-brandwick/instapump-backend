import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { CreateUserSchema, GetUserSchema, User, UserSchema } from '@/api/user/userModel';
import { userService } from '@/api/user/userService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { randomUUID } from 'crypto';

export const userRegistry = new OpenAPIRegistry();

userRegistry.register('User', UserSchema);

export const userRouter: Router = (() => {
  const router = express.Router();

  userRegistry.registerPath({
    method: 'get',
    path: '/users',
    tags: ['User'],
    responses: createApiResponse(z.array(UserSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  userRegistry.registerPath({
    method: 'get',
    path: '/users/{id}',
    tags: ['User'],
    request: { params: GetUserSchema.shape.params },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetUserSchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  userRegistry.registerPath({
    method: 'get',
    path: '/users/profile',
    tags: ['User', 'Profile'],
    request: { headers: GetUserSchema.shape.headers },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/profile', validateRequest(GetUserSchema), async (req: Request, res: Response) => {
    const id = req.headers['x-user-id'] as string;
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  userRegistry.registerPath({
    method: 'post',
    path: '/users/create',
    tags: ['User'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateUserSchema.shape.body,
          },
        },
      },
    },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.post('/create', validateRequest(CreateUserSchema), async (req: Request, res: Response) => {
    const user: User = {
      ...req.body,
      userId: randomUUID(),
      mintCount: 0,
      tradeCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const serviceResponse = await userService.create(user);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
