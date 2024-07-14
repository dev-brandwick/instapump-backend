import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetNewsSchema, NewsSchema } from '@/api/news/newsModel';
import { newsService } from '@/api/news/newsService';
import { UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const newsRegistry = new OpenAPIRegistry();

newsRegistry.register('News', NewsSchema);

export const newsRouter: Router = (() => {
  const router = express.Router();

  newsRegistry.registerPath({
    method: 'get',
    path: '/news',
    tags: ['News'],
    responses: createApiResponse(z.array(NewsSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await newsService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  newsRegistry.registerPath({
    method: 'get',
    path: '/news/{id}',
    tags: ['News'],
    request: { params: GetNewsSchema.shape.params },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetNewsSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await newsService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
